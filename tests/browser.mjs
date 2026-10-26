// Dependency-free Chromium/CDP acceptance checks using Next's existing WebSocket client.
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const {WebSocket}=require('next/dist/compiled/ws');
const profile=await mkdtemp(join(tmpdir(),'portfolio-browser-'));
const chromePath=process.env.BROWSER_EXECUTABLE || '/home/aayaann-kausar/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome';
let chrome,server,ws,session;const pending=new Map();let id=0;const errors=[];
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
 chrome=spawn(chromePath,['--headless','--no-sandbox','--disable-dev-shm-usage','--enable-unsafe-swiftshader','--use-angle=swiftshader','--remote-debugging-port=0','--no-first-run','--disable-popup-blocking',`--user-data-dir=${profile}`,'about:blank'],{stdio:['ignore','ignore','pipe']});
 const endpoint=await new Promise((resolve,reject)=>{let log='';const timer=setTimeout(()=>reject(new Error('Chromium startup timed out')),15000);chrome.once('error',reject);chrome.once('exit',()=>{clearTimeout(timer);reject(new Error('Chromium unavailable: '+log.slice(-1200)));});chrome.stderr.on('data',chunk=>{log+=chunk;const match=log.match(/DevTools listening on (ws:\/\/[^\s]+)/);if(match){clearTimeout(timer);resolve(match[1]);}});});
 ws=new WebSocket(endpoint);await new Promise((resolve,reject)=>{ws.once('open',resolve);ws.once('error',reject);});
 ws.on('message',data=>{const message=JSON.parse(data);if(message.id){const request=pending.get(message.id);if(request){clearTimeout(request.timer);pending.delete(message.id);message.error?request.reject(new Error(message.error.message)):request.resolve(message.result);}}else if(message.method==='Runtime.exceptionThrown')errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);});
 const call=(method,params={},target=session)=>new Promise((resolve,reject)=>{const key=++id;const timer=setTimeout(()=>{pending.delete(key);reject(new Error(method+' timed out'));},20000);pending.set(key,{resolve,reject,timer});ws.send(JSON.stringify({id:key,method,params,...(target?{sessionId:target}:{})}));});
 const target=await call('Target.createTarget',{url:'about:blank'},null);session=(await call('Target.attachToTarget',{targetId:target.targetId,flatten:true},null)).sessionId;
 await call('Page.enable');await call('Runtime.enable');await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 const evaluate=async expression=>{const result=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true,userGesture:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);return result.result.value;};
 const wait=async(expression,timeout=12000)=>{const started=Date.now();while(Date.now()-started<timeout){if(await evaluate(expression))return;await sleep(80);}const diagnostic=await evaluate(`({url:location.href,body:document.body.innerText.slice(0,700),loader:document.querySelector('#loader')?.outerHTML,header:document.querySelector('header')?.outerHTML})`);console.error(JSON.stringify({errors,diagnostic}));const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-browser-failure.png',Buffer.from(shot.data,'base64'));throw new Error('Condition timed out: '+expression);};
 const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3131';
 if(!process.env.TEST_BASE_URL){server=spawn(process.argv.find(arg=>arg.startsWith('--server-node='))?.slice('--server-node='.length) || process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3131'],{stdio:['ignore','pipe','pipe']});await new Promise((resolve,reject)=>{let log='';const timer=setTimeout(()=>reject(new Error('Preview startup timed out')),15000);const capture=chunk=>{log+=chunk;if(log.includes('Ready in')){clearTimeout(timer);resolve();}};server.stdout.on('data',capture);server.stderr.on('data',capture);server.once('error',reject);server.once('exit',()=>{clearTimeout(timer);reject(new Error('Preview unavailable: '+log.slice(-1200)));});});}
 await call('Page.navigate',{url:base});await wait(`document.querySelector('header[role="banner"]') && getComputedStyle(document.querySelector('header[role="banner"]')).opacity > .95 && !document.querySelector('#loader h1')`,20000);
 const navigate=async(label,path)=>{
  await evaluate(`document.querySelector('[aria-label="Open Menu"]').click()`);
  await wait(`getComputedStyle(document.querySelector('#menu')).opacity > .95`);
  const feedback=await evaluate(`(()=>{const start=performance.now();document.querySelector('#menu [aria-label="Go ${label}"]').click();return {milliseconds:performance.now()-start,state:document.querySelector('#loader').dataset.transition,busy:document.querySelector('main').getAttribute('aria-busy')};})()`);
  assert.equal(feedback.state,'covering');assert.equal(feedback.busy,'true');assert.ok(feedback.milliseconds<100,'feedback starts within 100ms');
  await wait(`location.pathname === '${path}' && !document.querySelector('main').hasAttribute('aria-busy') && document.querySelector('#loader').dataset.transition==='idle'`);
  if(path==='/competitions'){
   await wait(`Number(getComputedStyle(document.querySelector('[data-rank]')).opacity)>.99`);
   const details=await evaluate(`(()=>{const root=document.querySelector('[aria-labelledby="wunder-title"]');const main=document.querySelector('main');return {text:root.textContent,cv:root.querySelector('a[aria-label="VIEW CV"]').getAttribute('href'),width:root.getBoundingClientRect().width,viewport:main.clientWidth,footer:[...document.querySelectorAll('footer a')].some(a=>a.getAttribute('href')==='/competitions')};})()`);
   for(const text of ['9th globally','5,000+','0.3920','0.3880','1,000','4-layer, 8-head','single CPU core'])assert.ok(details.text.includes(text),text+' is rendered from the CV');
   assert.equal(details.cv,'/cv/CV_Aayaann_Kausar.pdf');assert.ok(details.footer,'shared footer includes the new page');assert.ok(details.width<=details.viewport+1,'competition page fits the viewport');
   await mkdir('/tmp/portfolio-refinement-screenshots',{recursive:true});const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/competitions-'+(await evaluate('innerWidth'))+'.png',Buffer.from(shot.data,'base64'));
   await evaluate(`(()=>{const row=document.querySelector('[data-approach]');document.querySelector('main').scrollTop+=row.getBoundingClientRect().top-innerHeight*.6;})()`);await wait(`Number(getComputedStyle(document.querySelector('[data-approach]')).opacity)>.9`);
   assert.ok(await evaluate(`(()=>{const rows=[...document.querySelectorAll('[data-approach]')];return rows.some(row=>getComputedStyle(row).opacity>.9);})()`),'competition approach reveals on scroll');
   const approachShot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/competition-approach-'+(await evaluate('innerWidth'))+'.png',Buffer.from(approachShot.data,'base64'));
  }
  if(path==='/research'){
   const interests=await evaluate(`(()=>{const s=document.getElementById('research-interests');return {text:s.textContent,topics:[...s.querySelectorAll('dt')].map(n=>n.textContent),width:s.getBoundingClientRect().width,viewport:document.querySelector('main').clientWidth};})()`);
   assert.equal(interests.topics.length,4);assert.ok(interests.text.includes('open to exploring'),'topics are framed as future research interests');
   for(const topic of ['Autonomous Scientific Discovery','Self-Improving Agents','Large Language Models (LLMs)','Reinforcement Learning'])assert.ok(interests.topics.includes(topic));
   assert.ok(interests.width<=interests.viewport+1,'research interests fit the viewport');
   await evaluate(`(()=>{const s=document.getElementById('research-interests');document.querySelector('main').scrollTop+=s.getBoundingClientRect().top-70;})()`);await sleep(750);
   await mkdir('/tmp/portfolio-refinement-screenshots',{recursive:true});const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/research-interests-'+(await evaluate('innerWidth'))+'.png',Buffer.from(shot.data,'base64'));
  }
  if(path==='/about'){
   const toolkit=await evaluate(`(()=>{const s=document.getElementById('technical-toolkit');return {text:s.textContent,groups:s.querySelectorAll('dt').length,width:s.getBoundingClientRect().width,viewport:document.querySelector('main').clientWidth};})()`);
   for(const tool of ['PyTorch','QLoRA','LangGraph','FastAPI','Whisper','PostgreSQL','Docker','Lean 4','Also exploring'])assert.ok(toolkit.text.includes(tool),tool+' appears in the technical toolkit');
   assert.equal(toolkit.groups,7);assert.ok(toolkit.width<=toolkit.viewport+1);
   await evaluate(`(()=>{const s=document.getElementById('technical-toolkit');document.querySelector('main').scrollTop+=s.getBoundingClientRect().top-100;})()`);await sleep(750);
   await mkdir('/tmp/portfolio-refinement-screenshots',{recursive:true});const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/toolkit-'+(await evaluate('innerWidth'))+'.png',Buffer.from(shot.data,'base64'));
  }
  if(['/projects/nexusagent','/projects/nova','/projects/voice-translator','/contact'].includes(path)){
   await sleep(300);await mkdir('/tmp/portfolio-refinement-screenshots',{recursive:true});const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/copy-'+path.split('/').at(-1)+'-'+(await evaluate('innerWidth'))+'.png',Buffer.from(shot.data,'base64'));
  }
  return {label,...feedback};
 };
 const verifyPaper=async()=>{
  const link=await evaluate(`(()=>{const a=document.querySelector('main a[aria-label="READ PAPER"]');return {href:a.getAttribute('href'),target:a.target,download:a.hasAttribute('download')};})()`);
  assert.equal(link.href,'/papers/sfp.pdf');assert.equal(link.target,'_blank');assert.equal(link.download,false);
  const response=await evaluate(`(async()=>{const r=await fetch('/papers/sfp.pdf');const bytes=new Uint8Array(await r.arrayBuffer());return {status:r.status,type:r.headers.get('content-type'),disposition:r.headers.get('content-disposition'),magic:String.fromCharCode(...bytes.slice(0,5)),bytes:bytes.length};})()`);
  assert.equal(response.status,200);assert.match(response.type,/application\/pdf/);assert.match(response.disposition,/^inline;/);assert.equal(response.magic,'%PDF-');assert.ok(response.bytes>10000);
  await evaluate(`document.querySelector('main a[aria-label="READ PAPER"]').click()`);
  let paperTarget;const started=Date.now();while(!paperTarget&&Date.now()-started<12000){paperTarget=(await call('Target.getTargets',{},null)).targetInfos.find(t=>t.type==='page'&&t.url.endsWith('/papers/sfp.pdf'));if(!paperTarget)await sleep(80);}
  if(!paperTarget)console.error(JSON.stringify({targets:(await call('Target.getTargets',{},null)).targetInfos.map(t=>({type:t.type,url:t.url})),pdfViewer:await evaluate('navigator.pdfViewerEnabled'),link,response}));
  assert.ok(paperTarget,'paper opens as a PDF in a separate tab');assert.equal(await evaluate('location.pathname'),'/research/sfp','portfolio remains open in the original tab');await call('Target.closeTarget',{targetId:paperTarget.targetId},null);
  return {link,response,newTab:true};
 };
 async function runChecks(){
  if(process.argv.includes('--cv-only')){
   const results=[];
   const verifyCV=async(selector)=>{
    const link=await evaluate(`(()=>{const a=document.querySelector(${JSON.stringify(selector)});return {href:a.getAttribute('href'),target:a.target,download:a.hasAttribute('download')};})()`);
    assert.equal(link.href,'/cv/CV_Aayaann_Kausar.pdf');assert.equal(link.target,'_blank');assert.equal(link.download,false);
    const response=await evaluate(`(async()=>{const r=await fetch(${JSON.stringify(link.href)});const bytes=new Uint8Array(await r.arrayBuffer());return {status:r.status,type:r.headers.get('content-type'),disposition:r.headers.get('content-disposition'),magic:String.fromCharCode(...bytes.slice(0,5)),bytes:bytes.length};})()`);
    assert.equal(response.status,200,'CV URL serves the document rather than the homepage/404');assert.match(response.type,/application\/pdf/);assert.match(response.disposition,/^inline;/);assert.equal(response.magic,'%PDF-');assert.ok(response.bytes>10000);
    const originalPath=await evaluate('location.pathname');
    await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
    let pdfTarget;const started=Date.now();while(!pdfTarget&&Date.now()-started<12000){pdfTarget=(await call('Target.getTargets',{},null)).targetInfos.find(t=>t.type==='page'&&t.url.endsWith(link.href));if(!pdfTarget)await sleep(80);}
    assert.ok(pdfTarget,'CV click opens a PDF tab');await sleep(500);
    assert.equal((await call('Target.getTargetInfo',{targetId:pdfTarget.targetId},null)).targetInfo.url,base+link.href,'PDF tab does not redirect to the homepage');
    assert.equal(await evaluate('location.pathname'),originalPath,'original portfolio page stays open');assert.equal(await evaluate(`document.querySelector('main').hasAttribute('aria-busy')`),false);
    await call('Target.closeTarget',{targetId:pdfTarget.targetId},null);
    results.push({selector,width:await evaluate('innerWidth'),response,newTab:true});
   };
   for(const mobile of [false,true]){
    if(mobile)await call('Emulation.setDeviceMetricsOverride',{width:375,height:850,deviceScaleFactor:1,mobile:true});
    await navigate('Contact','/contact');await verifyCV('main a[aria-label="VIEW CV"]');
    await navigate('Competitions','/competitions');await verifyCV('main a[aria-label="VIEW CV"]');
    await verifyCV('footer a[aria-label="Go CV"]');
    await evaluate(`document.querySelector('[aria-label="Open Menu"]').click()`);await wait(`getComputedStyle(document.querySelector('#menu')).opacity>.95`);
    await verifyCV('#menu a[aria-label="Find me on CV"]');
    await evaluate(`document.querySelector('[aria-label="Close menu"]').click()`);await wait(`getComputedStyle(document.querySelector('#menu')).opacity<.05`);
   }
   const legacy=await evaluate(`(async()=>{const r=await fetch('/cv/Aayaann-Kausar-CV.pdf');return {status:r.status,url:r.url,type:r.headers.get('content-type'),magic:(await r.text()).slice(0,5)};})()`);
   assert.equal(legacy.status,200);assert.equal(legacy.url,base+'/cv/CV_Aayaann_Kausar.pdf');assert.match(legacy.type,/application\/pdf/);assert.equal(legacy.magic,'%PDF-');
   assert.deepEqual(errors,[]);console.log(JSON.stringify({cv:results,legacy,errors},null,2));return;
  }
  if(process.argv.includes('--paper-only')){
   const navigation=await navigate('Research','/research');await evaluate(`document.querySelector('main a[href="/research/sfp"]').click()`);await wait(`location.pathname==='/research/sfp' && !document.querySelector('main').hasAttribute('aria-busy') && document.querySelector('#loader').dataset.transition==='idle'`);
   const paper=await verifyPaper();assert.deepEqual(errors,[]);console.log(JSON.stringify({navigation,paper,errors},null,2));return;
  }
 const cardOnly=process.argv.includes('--card-only');
 const copyReview=process.argv.includes('--copy-review');
 const navigation=[];
 for(const [label,path] of (cardOnly?[]:copyReview?[['Research','/research'],['Home','/']]:[['Research','/research'],['Competitions','/competitions'],['About me','/about'],['Projects','/projects'],['NexusAgent','/projects/nexusagent'],['Nova','/projects/nova'],['Contact','/contact'],['Voice Translator','/projects/voice-translator'],['Home','/']])){
  navigation.push(await navigate(label,path));
  if(path==='/research'){
   for(const study of ['sfp','qlora']){
    if(await evaluate(`location.pathname!=='/research'`))await navigate('Research','/research');
    await evaluate(`document.querySelector('main a[href="/research/${study}"]').click()`);
    await wait(`location.pathname==='/research/${study}' && !document.querySelector('main').hasAttribute('aria-busy') && document.querySelector('#loader').dataset.transition==='idle'`);
    assert.ok(await evaluate(`document.querySelector('main a[aria-label="${study==='sfp'?'READ PAPER':'VIEW STUDY'}"]')!==null`),'research source link has an accurate label');if(study==='sfp')await verifyPaper();
    const shot=await call('Page.captureScreenshot',{format:'png'});await mkdir('/tmp/portfolio-refinement-screenshots',{recursive:true});await writeFile('/tmp/portfolio-refinement-screenshots/copy-'+study+'.png',Buffer.from(shot.data,'base64'));
   }
  }
 }

 const visual=await evaluate(`(()=>{const scroller=document.querySelector('main');const quote=document.getElementById('homepage-quote');const trigger=window.next?true:false;return {quote:!!quote,card:!!document.querySelector('img[alt="Aayaann Kausar personal monogram"]'),scrollHeight:scroller.scrollHeight,trigger};})()`);assert.ok(visual.quote&&visual.card);
 // Inspect the actual rendered card and reversible quote exit, not just their presence.
 const card=await evaluate(`(()=>{const card=document.querySelector('img[alt="Aayaann Kausar personal monogram"]').parentElement;const main=document.querySelector('main');main.scrollTop+=card.getBoundingClientRect().top-100;return true;})()`);
 assert.ok(card);await sleep(300);
 const cardRatio=await evaluate(`(()=>{const r=document.querySelector('img[alt="Aayaann Kausar personal monogram"]').getBoundingClientRect();return r.width/r.height;})()`);assert.ok(Math.abs(cardRatio-640/900)<.01,'card frame fits the SVG without a pale side surround');
 const point=await evaluate(`(()=>{const r=document.querySelector('img[alt="Aayaann Kausar personal monogram"]').parentElement.getBoundingClientRect();return {x:r.left+r.width*.7,y:r.top+Math.min(r.height*.3,300)};})()`);
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:point.x,y:point.y});await sleep(220);
 await wait(`document.querySelector('img[alt="Aayaann Kausar personal monogram"]').parentElement.dataset.active === 'true'`);
 await wait(`Number(getComputedStyle(document.querySelector('img[alt="Aayaann Kausar personal monogram"]').parentElement,'::after').opacity) > .9`);
 assert.notEqual(await evaluate(`getComputedStyle(document.querySelector('img[alt="Aayaann Kausar personal monogram"]')).animationName`),'none','hover activates the vibration');
 await mkdir('/tmp/portfolio-refinement-screenshots',{recursive:true});const foilShot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/card-foil.png',Buffer.from(foilShot.data,'base64'));
 await sleep(550);assert.equal(await evaluate(`document.querySelector('img[alt="Aayaann Kausar personal monogram"]').getAnimations().every(a=>a.playState==='finished')`),true,'vibration settles after its short pulse');
 await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:10,y:10});await wait(`!document.querySelector('img[alt="Aayaann Kausar personal monogram"]').parentElement.dataset.active`);
 await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await call('Input.dispatchMouseEvent',{type:'mouseMoved',...point});await sleep(150);
 assert.equal(await evaluate(`getComputedStyle(document.querySelector('img[alt="Aayaann Kausar personal monogram"]')).animationName`),'none','reduced motion disables the vibration');
 await call('Emulation.setEmulatedMedia',{features:[]});await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:10,y:10});

 if(!cardOnly){
 const quoteScroll=async progress=>evaluate(`(()=>{const root=document.getElementById('homepage-quote');const main=document.querySelector('main');main.scrollTop+=root.getBoundingClientRect().top+(root.offsetHeight-innerHeight)*${progress};})()`);
 const settledQuote=`(()=>[...document.querySelectorAll('#homepage-quote .word')].every(w=>{const m=new DOMMatrix(getComputedStyle(w).transform);return Math.hypot(m.m41,m.m42)<.1;}))()`;
 const wordPositions=()=>evaluate(`(()=>{const root=document.getElementById('homepage-quote');return [...root.querySelectorAll('.word')].map(w=>{const m=new DOMMatrix(getComputedStyle(w).transform);return {x:m.m41,y:m.m42};});})()`);
 await quoteScroll(.50);await wait(settledQuote);const assembled=await wordPositions();assert.ok(assembled.length>=10);
 assert.ok(await evaluate(`(()=>{const a=document.querySelector('#homepage-quote figcaption a');return a.textContent.includes('Demis Hassabis')&&a.textContent.includes('2026')&&a.href.includes('amacad.org/publication/daedalus/');})()`),'contemporary researcher quote has a visible primary-source attribution');
 const quoteShot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/quote-desktop.png',Buffer.from(quoteShot.data,'base64'));

 await quoteScroll(.15);await sleep(300);const entering=await wordPositions();
 await quoteScroll(.85);await sleep(300);const leaving=await wordPositions();
 assert.ok(leaving.some((p,i)=>Math.hypot(p.x-assembled[i].x,p.y-assembled[i].y)>2),'quote disperses on exit');
 assert.ok(leaving.every((p,i)=>Math.hypot(p.x-entering[i].x,p.y-entering[i].y)<1),'exit retraces the exact assembly positions');
 await quoteScroll(.50);await wait(settledQuote);const restored=await wordPositions();assert.ok(restored.every((p,i)=>Math.hypot(p.x-assembled[i].x,p.y-assembled[i].y)<1),'quote reassembles when scrolling back');
 await evaluate(`document.querySelector('[aria-label="Open Menu"]').click()`);await wait(`getComputedStyle(document.querySelector('#menu')).opacity>.95`);await evaluate(`document.querySelector('#menu [aria-label="Go Home"]').click()`);await wait(`getComputedStyle(document.querySelector('#menu')).opacity<.05`);assert.equal(await evaluate(`document.querySelector('main').hasAttribute('aria-busy')`),false,'same-page menu click does not leave a loader');
 await call('Emulation.setDeviceMetricsOverride',{width:375,height:850,deviceScaleFactor:1,mobile:true});
 await navigate('Research','/research');await navigate('Competitions','/competitions');await navigate('About me','/about');await navigate('Contact','/contact');await navigate('Voice Translator','/projects/voice-translator');await navigate('Home','/');
 await quoteScroll(.50);await wait(settledQuote);const mobileQuote=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/quote-mobile.png',Buffer.from(mobileQuote.data,'base64'));await evaluate(`document.querySelector('main').scrollTop=0`);await sleep(300);
 } else {
 await call('Emulation.setDeviceMetricsOverride',{width:375,height:850,deviceScaleFactor:1,mobile:true});
 await sleep(300);await evaluate(`(()=>{const card=document.querySelector('img[alt="Aayaann Kausar personal monogram"]').parentElement;document.querySelector('main').scrollTop+=card.getBoundingClientRect().top-70;})()`);await sleep(300);
 assert.equal(await evaluate(`document.querySelector('img[alt="Aayaann Kausar personal monogram"]').getAttribute('src')`),'/images/aayaann-card.svg');
 }
 await mkdir('/tmp/portfolio-refinement-screenshots',{recursive:true});const shot=await call('Page.captureScreenshot',{format:'png'});await writeFile('/tmp/portfolio-refinement-screenshots/mobile.png',Buffer.from(shot.data,'base64'));
 assert.deepEqual(errors,[],'no uncaught browser errors');await writeFile('/tmp/portfolio-refinement-screenshots/results.json',JSON.stringify({navigation,visual,errors},null,2));console.log(JSON.stringify({navigation,visual,errors},null,2));
 }
 await runChecks();
}finally{
 ws?.close();server?.kill();chrome?.kill();for(const request of pending.values())clearTimeout(request.timer);
 await sleep(200);await rm(profile,{recursive:true,force:true,maxRetries:3,retryDelay:100});
}
