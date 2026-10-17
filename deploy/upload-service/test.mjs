import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { once } from 'node:events';

const mock = createServer(async (request, response) => {
  if (request.url.startsWith('/rest/v1/turots_admins')) {
    const token = request.headers.authorization;
    if (token === 'Bearer invalid') { response.writeHead(401).end(); return; }
    response.writeHead(200, { 'content-type': 'application/json' }).end(token === 'Bearer nonadmin' ? '[]' : '[{"user_id":"admin-user"}]');
    return;
  }
  response.writeHead(404).end();
});
mock.listen(0, '127.0.0.1');
await once(mock, 'listening');
const mockPort = mock.address().port;
const portFinder = createServer();
portFinder.listen(0, '127.0.0.1');
await once(portFinder, 'listening');
const servicePort = portFinder.address().port;
await new Promise(resolve => portFinder.close(resolve));
const images = await mkdtemp(join(tmpdir(), 'turots-upload-test-'));
const child = spawn(process.execPath, [fileURLToPath(new URL('./server.mjs', import.meta.url))], {
  env: { ...process.env, PORT: String(servicePort), IMAGE_DIRECTORY: images, SUPABASE_URL: `http://127.0.0.1:${mockPort}`, SUPABASE_ANON_KEY: 'test-anon', ALLOWED_ORIGINS: 'https://turots.qomaruddin.com' },
  stdio: 'inherit',
});

try {
  const base = `http://127.0.0.1:${servicePort}`;
  let healthy = false;
  let healthError;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { const response = await fetch(`${base}/health`); healthy = response.ok; if (healthy) break; healthError = `HTTP ${response.status}: ${await response.text()}`; } catch (error) { healthError = `${error.message} (${error.cause?.code || error.cause?.message || ''})`; }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.equal(healthy, true, `upload service starts (${healthError})`);
  const origin = 'https://turots.qomaruddin.com';
  const options = await fetch(`${base}/admin-upload/test.jpg`, { method: 'OPTIONS', headers: { origin } });
  assert.equal(options.status, 204);
  assert.equal(options.headers.get('access-control-allow-origin'), origin);
  const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0x00, 0x01]);
  const request = (filename, token, body = jpeg) => fetch(`${base}/admin-upload/${encodeURIComponent(filename)}`, { method: 'POST', headers: { origin, authorization: `Bearer ${token}`, 'content-type': 'image/jpeg' }, body });
  assert.equal((await request('page.jpg', 'admin')).status, 201, 'admin image uploads');
  assert.deepEqual(await readFile(join(images, 'page.jpg')), jpeg, 'uploaded bytes are written intact');
  assert.equal((await request('Dokumen Penting (1).jpg', 'admin')).status, 201, 'parentheses in archival filenames are accepted');
  const pdf = Buffer.from('%PDF-1.7\nminimal test fixture');
  assert.equal((await request('EAP1564_DPQ_TBN_ONI_001.pdf', 'admin', pdf)).status, 201, 'PDF sources upload');
  assert.deepEqual(await readFile(join(images, 'EAP1564_DPQ_TBN_ONI_001.pdf')), pdf, 'PDF bytes are written intact');
  assert.equal((await request('page.jpg', 'admin')).status, 409, 'existing images are not overwritten');
  assert.equal((await request('invalid.jpg', 'admin', Buffer.from('not an image'))).status, 415, 'invalid image signatures are rejected');
  assert.equal((await request('forbidden.jpg', 'nonadmin')).status, 403, 'non-admin users cannot upload');
  assert.equal((await request('invalid-token.jpg', 'invalid')).status, 403, 'invalid Supabase sessions cannot upload');
  assert.equal((await request('../escape.jpg', 'admin')).status, 400, 'path traversal filenames are rejected');
  console.log('Upload service checks passed: CORS, admin auth, JPEG/PDF signatures, archival filenames, no-overwrite, and path safety.');
} finally {
  await new Promise(resolve => { if (child.exitCode !== null) resolve(); else { child.once('exit', resolve); child.kill(); } });
  mock.close();
  await rm(images, { recursive: true, force: true });
}
