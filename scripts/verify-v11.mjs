import { build } from 'esbuild';
import Module from 'node:module';
import path from 'node:path';
const output=await build({entryPoints:['scripts/verify-v11.tsx'],bundle:true,write:false,platform:'node',format:'cjs',jsx:'automatic',packages:'external'});
const filename=path.resolve('scripts/verify-v11.compiled.cjs');
const compiled=new Module(filename);
compiled.filename=filename;
compiled.paths=Module._nodeModulePaths(path.dirname(filename));
compiled._compile(output.outputFiles[0].text,filename);

