import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { createReadStream, createWriteStream } from 'node:fs';
import { access, link, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';
import { spawn } from 'node:child_process';

const port = Number(process.env.PORT || 8183);
const imageDirectory = process.env.IMAGE_DIRECTORY || '/opt/turots-iiif/images';
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
const anonKey = process.env.SUPABASE_ANON_KEY;
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || 'https://turots.qomaruddin.com,http://localhost:3005').split(',').map(value => value.trim()).filter(Boolean));
const maxDirectBytes = 95 * 1024 * 1024;
const maxFileBytes = 1024 * 1024 * 1024;
const maxChunkBytes = 32 * 1024 * 1024;
const chunkRoot = join(imageDirectory, '.turots-upload-chunks');
const extensions = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.pdf']);
const maxConcurrentUploads = 8;
let activeUploads = 0;

if (!supabaseUrl || !anonKey) throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY are required.');

function send(response, status, body, origin) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...(origin ? { 'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true', vary: 'Origin' } : {}) });
  response.end(JSON.stringify(body));
}

async function verifyAdmin(token) {
  // PostgREST verifies the user's JWT, and the self-only RLS policy exposes
  // the user's admin row only when that verified user is an administrator.
  const adminResponse = await fetch(`${supabaseUrl}/rest/v1/turots_admins?select=user_id&limit=1`, {
    headers: { apikey: anonKey, authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(10_000),
  });
  if (adminResponse.status === 401) return false;
  if (adminResponse.status === 403) throw new Error('PostgREST rejected the admin-role lookup (403); check RLS grants and edge firewall rules.');
  if (!adminResponse.ok) throw new Error(`Admin-role lookup failed (${adminResponse.status}).`);
  return (await adminResponse.json())[0]?.user_id || false;
}

function validFilename(filename) {
  return Boolean(filename && filename === basename(filename) && !filename.includes('..') && !/[\\/\0\r\n]/.test(filename) && /^[\p{L}\p{N}_. ()-]+$/u.test(filename));
}

function getAdminUserId(request) {
  return request.adminUserId;
}

function getUploadDirectory(userId, uploadId) {
  return join(chunkRoot, userId, uploadId);
}

async function readUploadManifest(directory, filename) {
  try {
    const manifest = JSON.parse(await readFile(join(directory, 'manifest.json'), 'utf8'));
    return manifest.filename === filename ? manifest : null;
  } catch { return null; }
}

async function removeExpiredUploadChunks() {
  const expiry = Date.now() - 7 * 24 * 60 * 60 * 1000;
  for (const userId of await readdir(chunkRoot).catch(() => [])) {
    const userDirectory = join(chunkRoot, userId);
    for (const uploadId of await readdir(userDirectory).catch(() => [])) {
      const directory = join(userDirectory, uploadId);
      try {
        const manifest = JSON.parse(await readFile(join(directory, 'manifest.json'), 'utf8'));
        if (Date.parse(manifest.createdAt) < expiry) await rm(directory, { recursive: true, force: true });
      } catch { await rm(directory, { recursive: true, force: true }).catch(() => {}); }
    }
    if (!(await readdir(userDirectory).catch(() => [])).length) await rm(userDirectory, { recursive: true, force: true }).catch(() => {});
  }
}

async function pdfPageCount(filename) {
  const filePath = join(imageDirectory, filename);
  await access(filePath);
  return await new Promise((resolve, reject) => {
    const child = spawn('pdfinfo', [filePath], { stdio: ['ignore', 'pipe', 'ignore'] });
    let output = '';
    const timeout = setTimeout(() => { child.kill('SIGKILL'); reject(new Error('pdfinfo_timeout')); }, 120_000);
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', chunk => { if (output.length < 64_000) output += chunk; });
    child.once('error', error => { clearTimeout(timeout); reject(error); });
    child.once('close', code => {
      clearTimeout(timeout);
      const pages = output.match(/^Pages:\s+(\d+)\s*$/m);
      if (code !== 0 || !pages) return reject(new Error('pdf_page_count_unavailable'));
      resolve(Number(pages[1]));
    });
  });
}

async function saveChunk(request, response, origin, filename, userId, url) {
  const uploadId = url.searchParams.get('uploadId') || '';
  const chunkIndex = Number(url.searchParams.get('chunkIndex'));
  const totalChunks = Number(url.searchParams.get('totalChunks'));
  const fileSize = Number(url.searchParams.get('fileSize'));
  if (!/^[0-9a-f-]{36}$/i.test(uploadId) || !Number.isInteger(chunkIndex) || !Number.isInteger(totalChunks) || totalChunks < 1 || totalChunks > 32 || chunkIndex < 0 || chunkIndex >= totalChunks || !Number.isInteger(fileSize) || fileSize < 1 || fileSize > maxFileBytes || totalChunks !== Math.ceil(fileSize / maxChunkBytes)) {
    request.resume(); return send(response, 400, { error: 'invalid_chunk_metadata' }, origin);
  }
  const expectedBytes = chunkIndex === totalChunks - 1 ? fileSize - chunkIndex * maxChunkBytes : maxChunkBytes;
  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength !== expectedBytes || contentLength > maxChunkBytes) { request.resume(); return send(response, 413, { error: 'invalid_chunk_size', maxChunkBytes, expectedBytes }, origin); }
  if (activeUploads >= maxConcurrentUploads) { request.resume(); return send(response, 429, { error: 'upload_capacity_reached' }, origin); }

  const directory = getUploadDirectory(userId, uploadId);
  const manifestPath = join(directory, 'manifest.json');
  activeUploads += 1;
  let chunkPath;
  try {
    await mkdir(directory, { recursive: true, mode: 0o700 });
    const manifest = { filename, fileSize, totalChunks, owner: userId, createdAt: new Date().toISOString() };
    try { await writeFile(manifestPath, JSON.stringify(manifest), { flag: 'wx', mode: 0o600 }); }
    catch (error) {
      if (error.code !== 'EEXIST') throw error;
      const existing = await readUploadManifest(directory, filename);
      if (!existing || existing.fileSize !== fileSize || existing.totalChunks !== totalChunks || existing.owner !== userId || Date.parse(existing.createdAt) < Date.now() - 7 * 24 * 60 * 60 * 1000) return send(response, 409, { error: 'upload_session_conflict' }, origin);
    }
    chunkPath = join(directory, `part-${String(chunkIndex).padStart(2, '0')}`);
    const output = createWriteStream(chunkPath, { flags: 'wx', mode: 0o600 });
    let bytes = 0;
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > expectedBytes) { output.destroy(); request.resume(); await rm(chunkPath, { force: true }); return send(response, 413, { error: 'chunk_too_large' }, origin); }
      if (!output.write(chunk)) await once(output, 'drain');
    }
    output.end();
    await once(output, 'close');
    if (bytes !== expectedBytes) { await rm(chunkPath, { force: true }); return send(response, 400, { error: 'incomplete_chunk', receivedBytes: bytes, expectedBytes }, origin); }
    return send(response, 201, { chunkSaved: true, chunkIndex }, origin);
  } catch (error) {
    if (error.code === 'EEXIST') return send(response, 409, { error: 'chunk_already_exists', chunkIndex }, origin);
    if (chunkPath) await rm(chunkPath, { force: true }).catch(() => {});
    if (!response.headersSent) send(response, 500, { error: 'chunk_upload_failed' }, origin);
    console.error('Chunk upload failed:', error.message);
  } finally { activeUploads -= 1; }
}

async function getUploadStatus(response, origin, filename, userId, url) {
  const destination = join(imageDirectory, filename);
  try { await access(destination); return send(response, 200, { alreadyExists: true, filename }, origin); }
  catch {}
  const uploadId = url.searchParams.get('uploadId') || '';
  if (!/^[0-9a-f-]{36}$/i.test(uploadId)) return send(response, 200, { alreadyExists: false, receivedChunks: [] }, origin);
  const directory = getUploadDirectory(userId, uploadId);
  const manifest = await readUploadManifest(directory, filename);
  if (!manifest || manifest.owner !== userId) return send(response, 200, { alreadyExists: false, receivedChunks: [] }, origin);
  const names = await readdir(directory).catch(() => []);
  const receivedChunks = names.map(name => name.match(/^part-(\d{2})$/)?.[1]).filter(Boolean).map(Number).sort((a, b) => a - b);
  return send(response, 200, { alreadyExists: false, receivedChunks, totalChunks: manifest.totalChunks, fileSize: manifest.fileSize }, origin);
}

async function completeChunkUpload(response, origin, filename, userId, url) {
  const uploadId = url.searchParams.get('uploadId') || '';
  if (!/^[0-9a-f-]{36}$/i.test(uploadId)) return send(response, 400, { error: 'invalid_upload_id' }, origin);
  const directory = getUploadDirectory(userId, uploadId);
  const manifest = await readUploadManifest(directory, filename);
  if (!manifest || manifest.owner !== userId) return send(response, 404, { error: 'upload_session_not_found' }, origin);
  const chunks = [];
  for (let index = 0; index < manifest.totalChunks; index += 1) {
    const chunkPath = join(directory, `part-${String(index).padStart(2, '0')}`);
    try { const info = await stat(chunkPath); if (info.size !== (index === manifest.totalChunks - 1 ? manifest.fileSize - index * maxChunkBytes : maxChunkBytes)) return send(response, 409, { error: 'chunk_size_mismatch', chunkIndex: index }, origin); }
    catch { return send(response, 409, { error: 'chunk_missing', chunkIndex: index }, origin); }
    chunks.push(chunkPath);
  }
  if (activeUploads >= maxConcurrentUploads) return send(response, 429, { error: 'upload_capacity_reached' }, origin);
  activeUploads += 1;
  let tempDirectory;
  try {
    tempDirectory = await mkdtemp(join(imageDirectory, '.turots-upload-'));
    const tempPath = join(tempDirectory, randomUUID());
    const output = createWriteStream(tempPath, { flags: 'wx', mode: 0o644 });
    const hash = createHash('sha256');
    const head = [];
    let headBytes = 0;
    let bytes = 0;
    for (const chunkPath of chunks) {
      for await (const chunk of createReadStream(chunkPath)) {
        bytes += chunk.length;
        if (headBytes < 8) { const start = chunk.subarray(0, 8 - headBytes); head.push(start); headBytes += start.length; }
        hash.update(chunk);
        if (!output.write(chunk)) await once(output, 'drain');
      }
    }
    output.end();
    await once(output, 'close');
    const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
    if (bytes !== manifest.fileSize) return send(response, 400, { error: 'assembled_size_mismatch' }, origin);
    if (!hasValidSignature(extension, Buffer.concat(head))) return send(response, 415, { error: 'image_signature_mismatch' }, origin);
    try { await link(tempPath, join(imageDirectory, filename)); }
    catch (error) {
      if (error.code === 'EEXIST') { await rm(directory, { recursive: true, force: true }); return send(response, 409, { error: 'already_exists' }, origin); }
      throw error;
    }
    const result = { uploaded: true, filename, bytes, sha256: hash.digest('hex') };
    await rm(directory, { recursive: true, force: true });
    return send(response, 201, result, origin);
  } catch (error) {
    if (!response.headersSent) send(response, 500, { error: 'upload_finalize_failed' }, origin);
    console.error('Chunk assembly failed:', error.message);
  } finally {
    if (tempDirectory) await rm(tempDirectory, { recursive: true, force: true }).catch(() => {});
    activeUploads -= 1;
  }
}

function hasValidSignature(extension, header) {
  if (extension === '.jpg' || extension === '.jpeg') return header.length >= 3 && header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;
  if (extension === '.png') return header.length >= 8 && header.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (extension === '.tif' || extension === '.tiff') return header.length >= 4 && (header.subarray(0, 4).equals(Buffer.from([0x49, 0x49, 0x2a, 0x00])) || header.subarray(0, 4).equals(Buffer.from([0x4d, 0x4d, 0x00, 0x2a])) || header.subarray(0, 4).equals(Buffer.from([0x49, 0x49, 0x2b, 0x00])) || header.subarray(0, 4).equals(Buffer.from([0x4d, 0x4d, 0x00, 0x2b])));
  if (extension === '.pdf') return header.subarray(0, 5).equals(Buffer.from('%PDF-'));
  return false;
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('access-control-allow-origin', origin);
    response.setHeader('access-control-allow-credentials', 'true');
    response.setHeader('access-control-allow-methods', 'GET, POST, OPTIONS');
    response.setHeader('access-control-allow-headers', 'Authorization, Content-Type');
    response.setHeader('access-control-max-age', '600');
    response.setHeader('vary', 'Origin');
  }
  if (request.method === 'OPTIONS') return response.writeHead(204).end();
  if (request.method === 'GET' && request.url === '/health') return send(response, 200, { status: 'ok' }, origin);
  if (origin && !allowedOrigins.has(origin)) return send(response, 403, { error: 'origin_not_allowed' }, null);
  const url = new URL(request.url, 'http://localhost');
  const pathname = url.pathname;
  const supportedRoute = pathname.startsWith('/admin-upload/');
  if (!supportedRoute || !['GET', 'POST'].includes(request.method)) return send(response, 404, { error: 'not_found' }, origin);

  const token = request.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return send(response, 401, { error: 'authentication_required' }, origin);
  let adminUserId;
  try {
    adminUserId = await verifyAdmin(token);
    if (!adminUserId) return send(response, 403, { error: 'admin_only' }, origin);
  } catch (error) {
    console.error('Admin verification failed:', error.message);
    return send(response, 503, { error: 'admin_verification_unavailable' }, origin);
  }
  request.adminUserId = adminUserId;

  const encodedFilename = pathname.slice('/admin-upload/'.length);
  const action = url.searchParams.get('action');
  const supportedActions = new Set(['status', 'chunk', 'complete', 'pdf-info']);
  if (action && !supportedActions.has(action)) return send(response, 400, { error: 'unsupported_action' }, origin);
  const route = action || 'direct';
  let filename;
  try { filename = decodeURIComponent(encodedFilename); }
  catch { return send(response, 400, { error: 'invalid_filename' }, origin); }
  if (!validFilename(filename)) return send(response, 400, { error: 'invalid_filename' }, origin);
  const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  if (!extensions.has(extension)) return send(response, 415, { error: 'unsupported_image_type' }, origin);

  if (route === 'status' && request.method === 'GET') return getUploadStatus(response, origin, filename, adminUserId, url);
  if (route === 'chunk' && request.method === 'POST') return saveChunk(request, response, origin, filename, adminUserId, url);
  if (route === 'complete' && request.method === 'POST') return completeChunkUpload(response, origin, filename, adminUserId, url);
  if (route === 'pdf-info' && request.method === 'GET' && extension === '.pdf') {
    try { return send(response, 200, { filename, pages: await pdfPageCount(filename) }, origin); }
    catch (error) { return send(response, 422, { error: error.message === 'pdfinfo_timeout' ? 'pdf_page_count_timeout' : 'pdf_page_count_unavailable' }, origin); }
  }
  if (route !== 'direct' || request.method !== 'POST') return send(response, 404, { error: 'not_found' }, origin);

  const contentLength = Number(request.headers['content-length'] || 0);
  if (!Number.isFinite(contentLength) || contentLength < 0) { request.resume(); return send(response, 400, { error: 'invalid_content_length' }, origin); }
  if (contentLength > maxDirectBytes) { request.resume(); return send(response, 413, { error: 'file_too_large', maxBytes: maxDirectBytes, useChunkedUpload: true }, origin); }
  if (activeUploads >= maxConcurrentUploads) { request.resume(); return send(response, 429, { error: 'upload_capacity_reached' }, origin); }

  let tempDirectory;
  let tempPath;
  activeUploads += 1;
  try {
    tempDirectory = await mkdtemp(join(imageDirectory, '.turots-upload-'));
    tempPath = join(tempDirectory, randomUUID());
    const output = createWriteStream(tempPath, { flags: 'wx', mode: 0o644 });
    let bytes = 0;
    const hash = createHash('sha256');
    const head = [];
    let headBytes = 0;
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > maxDirectBytes) {
        output.destroy();
        request.resume();
        return send(response, 413, { error: 'file_too_large', maxBytes: maxDirectBytes, useChunkedUpload: true }, origin);
      }
      if (headBytes < 8) {
        const headerPart = chunk.subarray(0, 8 - headBytes);
        head.push(headerPart);
        headBytes += headerPart.length;
      }
      hash.update(chunk);
      if (!output.write(chunk)) await once(output, 'drain');
    }
    output.end();
    await once(output, 'close');
    if (!bytes) return send(response, 400, { error: 'empty_file' }, origin);
    if (!hasValidSignature(extension, Buffer.concat(head))) return send(response, 415, { error: 'image_signature_mismatch' }, origin);
    try { await link(tempPath, join(imageDirectory, filename)); }
    catch (error) {
      if (error.code === 'EEXIST') return send(response, 409, { error: 'already_exists' }, origin);
      throw error;
    }
    return send(response, 201, { uploaded: true, filename, bytes, sha256: hash.digest('hex') }, origin);
  } catch (error) {
    if (!response.headersSent) send(response, 500, { error: 'upload_failed' }, origin);
    console.error('Upload failed:', error.message);
  } finally {
    if (tempDirectory) await rm(tempDirectory, { recursive: true, force: true }).catch(() => {});
    activeUploads -= 1;
  }
});

server.requestTimeout = 15 * 60 * 1000;
server.headersTimeout = 30_000;
await mkdir(imageDirectory, { recursive: true });
await mkdir(chunkRoot, { recursive: true, mode: 0o700 });
await removeExpiredUploadChunks();
server.listen(port, '0.0.0.0', () => console.log(`Turots upload service listening on ${port}`));
