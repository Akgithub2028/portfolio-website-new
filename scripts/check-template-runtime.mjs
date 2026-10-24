import { readFile } from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('package.json',root),'utf8'));
const packages=['next','react','react-dom','@react-three/fiber','@react-three/drei','@react-three/rapier','sass','sharp','react-use'];
const mismatches=[];
const major=Number(process.versions.node.split('.')[0]);
const requiredMajor=Number.parseInt(manifest.engines.node,10);
if(major!==requiredMajor)mismatches.push(`Node.js ${requiredMajor}.x is required (found ${process.version}). Run nvm use.`);
for(const name of packages){
 const required=manifest.dependencies[name] || manifest.devDependencies[name];
 const installed=await readFile(new URL(`node_modules/${name}/package.json`,root),'utf8').then(text=>JSON.parse(text).version).catch(()=>null);
 if(installed!==required)mismatches.push(`${name}: expected ${required}; ${installed?'found '+installed:'not installed'}`);
}
if(mismatches.length){console.error('Use the project Node.js version with nvm use, then install the locked dependencies with npm ci.\n'+mismatches.join('\n'));process.exitCode=1;}
