import { createServer } from 'node:http';
import { createWriteStream } from 'node:fs';
import { link, mkdtemp, rm } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { once } from 'node:events';

const port = Number(process.env.PORT || 8183);
const imageDirectory = process.env.IMAGE_DIRECTORY || '/opt/turots-iiif/images';
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
const anonKey = process.env.SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || 'https://turots.qomaruddin.com,http://localhost:3005').split(',').map(value => value.trim()).filter(Boolean));
const maxBytes = 95 * 1024 * 1024;
const extensions = new Set(['.jpg', '.jpeg', '.png', '.tif', '.tiff', '.pdf']);

if (!supabaseUrl || !anonKey || !serviceRoleKey) throw new Error('SUPABASE_URL, SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY are required.');

function send(response, status, body, origin) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...(origin ? { 'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true', vary: 'Origin' } : {}) });
  response.end(JSON.stringify(body));
}

async function verifyAdmin(token) {
  const headers = { apikey: anonKey, authorization: `Bearer ${token}` };
  const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, { headers, signal: AbortSignal.timeout(10_000) });
  if (!authResponse.ok) return false;
  const user = await authResponse.json();
  if (!user?.id) return false;
  const adminResponse = await fetch(`${supabaseUrl}/rest/v1/turots_admins?select=user_id&user_id=eq.${encodeURIComponent(user.id)}&limit=1`, {
    headers: { apikey: serviceRoleKey, authorization: `Bearer ${serviceRoleKey}` },
    signal: AbortSignal.timeout(10_000),
  });
  if (!adminResponse.ok) throw new Error(`Admin-role lookup failed (${adminResponse.status}).`);
  return (await adminResponse.json()).length > 0;
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
    response.setHeader('access-control-allow-methods', 'POST, OPTIONS');
    response.setHeader('access-control-allow-headers', 'Authorization, Content-Type');
    response.setHeader('access-control-max-age', '600');
    response.setHeader('vary', 'Origin');
  }
  if (request.method === 'OPTIONS') return response.writeHead(204).end();
  if (request.method === 'GET' && request.url === '/health') return send(response, 200, { status: 'ok' }, origin);
  if (request.method !== 'POST') return send(response, 404, { error: 'not_found' }, origin);
  if (origin && !allowedOrigins.has(origin)) return send(response, 403, { error: 'origin_not_allowed' }, null);

  const token = request.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return send(response, 401, { error: 'authentication_required' }, origin);
  try {
    if (!(await verifyAdmin(token))) return send(response, 403, { error: 'admin_only' }, origin);
  } catch (error) {
    console.error('Admin verification failed:', error.message);
    return send(response, 503, { error: 'admin_verification_unavailable' }, origin);
  }

  let filename;
  try { filename = decodeURIComponent(new URL(request.url, 'http://localhost').pathname.slice('/admin-upload/'.length)); }
  catch { return send(response, 400, { error: 'invalid_filename' }, origin); }
  if (!filename || filename !== basename(filename) || filename.includes('..') || /[\\/\0\r\n]/.test(filename) || !/^[\p{L}\p{N}_. ()-]+$/u.test(filename)) return send(response, 400, { error: 'invalid_filename' }, origin);
  const extension = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  if (!extensions.has(extension)) return send(response, 415, { error: 'unsupported_image_type' }, origin);
  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > maxBytes) return send(response, 413, { error: 'file_too_large', maxBytes }, origin);

  let tempDirectory;
  let tempPath;
  try {
    tempDirectory = await mkdtemp(join(imageDirectory, '.turots-upload-'));
    tempPath = join(tempDirectory, randomUUID());
    const output = createWriteStream(tempPath, { flags: 'wx', mode: 0o644 });
    let bytes = 0;
    const head = [];
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        output.destroy();
        return send(response, 413, { error: 'file_too_large', maxBytes }, origin);
      }
      if (head.reduce((sum, item) => sum + item.length, 0) < 8) head.push(chunk.subarray(0, 8));
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
    return send(response, 201, { uploaded: true, filename, bytes }, origin);
  } catch (error) {
    if (!response.headersSent) send(response, 500, { error: 'upload_failed' }, origin);
    console.error('Upload failed:', error.message);
  } finally {
    if (tempDirectory) await rm(tempDirectory, { recursive: true, force: true }).catch(() => {});
  }
});

server.requestTimeout = 15 * 60 * 1000;
server.headersTimeout = 30_000;
server.listen(port, '0.0.0.0', () => console.log(`Turots upload service listening on ${port}`));
