import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {createHash} from 'node:crypto';
const root=resolve(import.meta.dirname,'..');
const read=path=>readFile(resolve(root,path),'utf8');
async function files(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,e.name);result.push(...(e.isDirectory()?await files(p):[p]));}return result;}
const exists=async path=>!!(await stat(path).catch(()=>false));
const sourceFiles=(await files(resolve(root,'src'))).filter(p=>/\.(js|jsx|scss|vert|frag)$/.test(p));

test('all copied template local module imports resolve',async()=>{
 for(const file of sourceFiles){const source=await readFile(file,'utf8');for(const m of source.matchAll(/(?:from\s+|import\s+|@import\s+)['"](@src\/[^'"]+)['"]/g)){
 const base=resolve(root,'src',m[1].slice(5));const candidates=[base,...['.js','.jsx','.scss','/Index.jsx','/index.jsx'].map(s=>base+s)];
 assert.ok((await Promise.all(candidates.map(exists))).some(Boolean),file+' → '+m[1]);
 }}
});
test('literal application media references resolve without creator portraits or project media',async()=>{
 for(const file of sourceFiles){const source=await readFile(file,'utf8');for(const m of source.matchAll(/["'](\/(?:images|fonts|other|model|logos|cv)\/[^"'`$]+\.(?:svg|png|webp|jpg|hdr|glb|woff2|pdf))["']/g))assert.ok(await exists(resolve(root,'public','.'+m[1])),file+' → '+m[1]);
 assert.doesNotMatch(source,/\/giats\/|\/project[1-5]\//);
 }
 for(const id of ['models','agents','discovery'])for(const kind of ['Tag','Band'])assert.ok(await exists(resolve(root,`public/model/${kind}${id}.png`)));
});
test('displayed source has the owner identity and no template placeholders',async()=>{
 for(const file of sourceFiles.filter(p=>/\.(js|jsx)$/.test(p))){const text=await readFile(file,'utf8');assert.doesNotMatch(text,/Evangelos|vaggelis|Giats2498|giats\.me|Thessaloniki|Greece|Lorem ipsum|Company [1-4]|example\.com/);}
 const head=await read('src/components/dom/CustomHead.jsx');assert.match(head,/profile\.person\.name/);assert.match(head,/AI Engineer & Independent Researcher/);
 const cv=await readFile(resolve(root,'public/cv/CV_Aayaann_Kausar.pdf'));assert.equal(cv.subarray(0,5).toString(),'%PDF-');
});
test('engineering and research data contain five actual works with consistent routes',async()=>{
 const module=await read('src/constants/projects.js');const projects=JSON.parse(module.slice(module.indexOf('['),module.lastIndexOf(']')+1));
 assert.deepEqual(projects.map(p=>p.id),['nexusagent','nova','voice-translator','sfp','qlora']);
 for(const p of projects){assert.equal(p.link,`/${p.kind==='research'?'research':'projects'}/${p.id}`);assert.ok(p.liveLink.startsWith('https://github.com/Akgithub2028/'));assert.ok(p.desc.length>=3);for(const image of p.images)assert.ok(await exists(resolve(root,'public','.'+image.src)));}
 for(const path of ['src/pages/index.page.jsx','src/pages/about/index.page.jsx','src/pages/projects/index.page.jsx','src/pages/projects/[id].page.jsx','src/pages/research/index.page.jsx','src/pages/research/[id].page.jsx','src/pages/contact/index.page.jsx','src/pages/competitions/index.page.jsx'])assert.ok(await exists(resolve(root,path)));
});
test('the supplied fluid solver and original scene engines are retained byte for byte',async()=>{
 const reference=resolve(root,'../Templates Portfolio/giats-portfolio/src');
 if(!await exists(reference))return;
 const paths=['components/canvas/fluid/Fluid.jsx','components/canvas/fluid/glsl/advection.frag','components/canvas/fluid/glsl/vorticity.frag','components/canvas/background/Background.jsx','pages/components/home/components/floatingMeshes/Index.jsx','pages/components/home/components/floatingMeshes/FloatRigidBody.jsx'];
 for(const path of paths)assert.equal(createHash('sha256').update(await readFile(resolve(root,'src',path))).digest('hex'),createHash('sha256').update(await readFile(resolve(reference,path))).digest('hex'),path+' matches the supplied template');
 const sourceStyles=(await files(resolve(root,'src'))).filter(p=>extname(p)==='.scss'&&!p.endsWith('footer.module.scss')&&!p.endsWith('pages/components/about/styles/about.module.scss')&&!p.endsWith('pages/competitions/competitions.module.scss')&&!p.endsWith('pages/components/quote/styles/quote.module.scss')&&!p.endsWith('pages/about/components/toolkit/styles/toolkit.module.scss'));
 for(const path of sourceStyles){const rel=path.slice(resolve(root,'src').length+1);let current=await readFile(path,'utf8');if(rel==='components/dom/navbar/styles/menuLinks.module.scss')current=current.replace("content: 'Find me online';","content: 'Follow Us';");assert.equal(current,await readFile(resolve(reference,rel),'utf8'),rel+' preserves the original template style');}
});
test('the lockfile matches the patched runtime manifest',async()=>{
 const pkg=JSON.parse(await read('package.json'));const lock=JSON.parse(await read('package-lock.json'));
 for(const group of ['dependencies','devDependencies']){assert.deepEqual(lock.packages[''][group],pkg[group]);for(const [name,version] of Object.entries(pkg[group]))assert.equal(lock.packages['node_modules/'+name].version,version,name+' is pinned consistently');}
 assert.equal(pkg.dependencies.react,'18.2.0');assert.equal(pkg.dependencies['react-dom'],'18.2.0');
 assert.equal(pkg.dependencies.next,'16.4.3');assert.equal(pkg.dependencies.sharp,'0.35.5');assert.equal(pkg.dependencies['react-use'],'17.6.1');
 assert.deepEqual(pkg.overrides,{postcss:'8.5.23','js-cookie':'3.0.7'});
 // Check the resolved graph, including nested copies, rather than just root declarations.
 const minimum={next:'16.4.3',postcss:'8.5.23',sharp:'0.35.5','react-use':'17.6.1','js-cookie':'3.0.7'};
 const compare=(a,b)=>{const aa=a.split('.').map(Number),bb=b.split('.').map(Number);for(let i=0;i<3;i++)if(aa[i]!==bb[i])return aa[i]-bb[i];return 0;};
 for(const [path,entry] of Object.entries(lock.packages)){const name=path.split('node_modules/').pop();if(minimum[name]){assert.ok(!entry.version.includes('-'),'no prerelease for '+path);assert.ok(compare(entry.version,minimum[name])>=0,path+' resolves to a vulnerable version: '+entry.version);}}

 const license=await read('public/licenses/giats-portfolio.txt');assert.match(license,/MIT License/);assert.match(license,/Evangelos Giatsidis/);
});

test('Next 16 keeps Webpack shader loading and template-compatible React',async()=>{
 const pkg=JSON.parse(await read('package.json'));
 for(const command of ['dev','preview','build'])assert.match(pkg.scripts[command],/--webpack/);
 assert.match(pkg.scripts.dev,/--hostname 127\.0\.0\.1/);assert.match(pkg.scripts.preview,/--hostname 127\.0\.0\.1/);
 const {createRequire}=await import('node:module');const require=createRequire(import.meta.url);const config=require('../next.config.js');
 assert.deepEqual(config.pageExtensions,['page.jsx']);assert.equal(config.images.unoptimized,true);
 const fixture={externals:[],module:{rules:[]}};config.webpack(fixture,{isServer:false});
 assert.ok(fixture.module.rules.some(rule=>rule.test.test('fluid.frag')&&rule.use.includes('raw-loader')));
});

test('production output includes the real research studies', {skip: !(await exists(resolve(root,'.next/prerender-manifest.json')))}, async()=>{
 const prerender=JSON.parse(await read('.next/prerender-manifest.json'));
 for(const route of ['/projects/nexusagent','/projects/nova','/projects/voice-translator','/research/sfp','/research/qlora'])assert.ok(prerender.routes[route],route+' was generated');
 for(const route of ['/research/nexusagent','/research/nova','/research/voice-translator'])assert.ok(!prerender.routes[route],route+' must not be generated as research');
 const pages=JSON.parse(await read('.next/server/pages-manifest.json'));
 for(const route of ['/','/about','/contact','/projects','/research','/competitions']){assert.ok(pages[route],route+' is published');assert.ok(await exists(resolve(root,'.next/server',pages[route])),route+' output exists');}
});

test('voice translation uses the supplied demo screenshot and keeps demo/source links separate',async()=>{
 const source=await read('src/constants/projects.js');const projects=JSON.parse(source.slice(source.indexOf('['),source.lastIndexOf(']')+1));
 const voice=projects.find(project=>project.id==='voice-translator');assert.equal(voice.demoLink,'https://real-time-ai-voice-translator.vercel.app/');assert.match(voice.liveLink,/github\.com\/Akgithub2028/);
 assert.equal(voice.img,voice.images[0].src);const png=await readFile(resolve(root,'public','.'+voice.img));assert.equal(png.subarray(1,4).toString(),'PNG');assert.ok(png.readUInt32BE(16)>1000);
});


test('SFP links to the bundled paper with inline PDF response headers',async()=>{
 const source=await read('src/constants/projects.js');const projects=JSON.parse(source.slice(source.indexOf('['),source.lastIndexOf(']')+1));
 const sfp=projects.find(project=>project.id==='sfp');assert.equal(sfp.paperLink,'/papers/sfp.pdf');assert.equal(sfp.sourceLabel,'READ PAPER');
 const pdf=await readFile(resolve(root,'public','.'+sfp.paperLink));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.ok(pdf.length>10000);
 const original=resolve(root,'sfp.pdf');if(await exists(original))assert.equal(createHash('sha256').update(pdf).digest('hex'),createHash('sha256').update(await readFile(original)).digest('hex'),'public paper matches the supplied PDF');
 const {createRequire}=await import('node:module');const require=createRequire(import.meta.url);const config=require('../next.config.js');const rules=await config.headers();
 const headers=Object.fromEntries(rules.find(rule=>rule.source===sfp.paperLink).headers.map(header=>[header.key.toLowerCase(),header.value]));assert.equal(headers['content-type'],'application/pdf');assert.match(headers['content-disposition'],/^inline;/);
});

test('Vercel configuration and lockfile agree on the production runtime',async()=>{
 const pkg=JSON.parse(await read('package.json'));const lock=JSON.parse(await read('package-lock.json'));const config=JSON.parse(await read('vercel.json'));
 assert.equal(pkg.engines.node,'24.x');assert.equal(lock.packages[''].engines.node,pkg.engines.node);assert.equal((await read('.nvmrc')).trim(),'24');
 assert.equal(config.framework,'nextjs');assert.equal(config.installCommand,'npm ci --include=dev');assert.equal(config.buildCommand,'npm run build');assert.equal(config.trailingSlash,undefined);assert.equal(config.outputDirectory,undefined);
});
