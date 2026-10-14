import { build } from 'esbuild';
const result = await build({ entryPoints: ['scripts/verify-metadata.ts'], bundle: true, write: false, platform: 'node', format: 'esm', define: { 'import.meta.env': '{}' } });
await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
