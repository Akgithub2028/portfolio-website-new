import test from 'node:test';
import assert from 'node:assert/strict';
import {createNavigationTransition} from '../src/lib/navigation-transition.mjs';

function fixture(reduced = false) {
  const timelines=[], calls=[], frames=new Map(); let frameID=0;
  const makeNode=name=>({name,dataset:{},attrs:new Map(),setAttribute(key,value){this.attrs.set(key,value);},removeAttribute(key){this.attrs.delete(key);}});
  const nodes=Object.fromEntries(['main','layout','loader','header','scrollbar'].map(name=>[name,makeNode(name)]));
  const gsap={set:(node,values)=>calls.push(['set',node.name,values]),timeline(options){
    const timeline={commands:[],to(node,values){this.commands.push([node.name,values]);return this;},set(node,values){this.commands.push([node.name,values]);return this;},finish(){options.onComplete?.();},kill(){options.onInterrupt?.();}};
    timelines.push(timeline);return timeline;
  }};
  const transition=createNavigationTransition({gsap,nodes,lenis:{stop:()=>calls.push(['stop']),start:()=>calls.push(['start']),scrollTo:()=>calls.push(['scroll'])},setLoading:value=>calls.push(['loading',value]),setMenuOpen:value=>calls.push(['menu',value]),setAbout:value=>calls.push(['about',value]),refresh:()=>calls.push(['refresh']),readPath:()=>'/about',reducedMotion:()=>reduced,schedule:fn=>{frames.set(++frameID,fn);return frameID;},cancel:id=>frames.delete(id)});
  const flush=()=>{const pending=[...frames.values()];frames.clear();pending.forEach(fn=>fn());};
  return {transition,timelines,calls,nodes,flush};
}

test('a click starts loading immediately, before a slow destination is ready',async()=>{
  const f=fixture();f.transition.begin('/research');
  assert.equal(f.nodes.loader.dataset.transition,'covering');assert.ok(f.calls.some(c=>c[0]==='loading'&&c[1]===true));assert.equal(f.nodes.main.attrs.get('aria-busy'),'true');
  assert.equal(f.timelines.length,1);f.timelines[0].finish();await Promise.resolve();f.flush();assert.equal(f.timelines.length,1,'wait for destination without an artificial timeout');
  f.transition.complete('/research');await Promise.resolve();f.flush();assert.equal(f.timelines.length,2);f.timelines[1].finish();assert.ok(f.calls.some(c=>c[0]==='start'));assert.equal(f.nodes.main.attrs.has('aria-busy'),false);f.transition.dispose();
});
test('a cached destination cannot reveal before the cover finishes',async()=>{
  const f=fixture();f.transition.begin('/projects');f.transition.complete('/projects');await Promise.resolve();f.flush();assert.equal(f.timelines.length,1);
  f.timelines[0].finish();await Promise.resolve();f.flush();assert.equal(f.timelines.length,2);f.timelines[1].finish();f.transition.dispose();
});
test('click feedback and routeChangeStart do not create competing exits',()=>{
  const f=fixture();f.transition.begin('/research');f.transition.begin('/research/');assert.equal(f.timelines.length,1);f.transition.dispose();
});
test('a failed route restores the current page and scrolling',async()=>{
  const f=fixture();f.transition.begin('/research');f.transition.error(new Error('offline'),'/research');f.timelines[0].finish();await Promise.resolve();f.flush();f.timelines[1].finish();
  assert.ok(f.calls.some(c=>c[0]==='loading'&&c[1]===false));assert.ok(f.calls.some(c=>c[0]==='about'&&c[1]===true));assert.ok(!f.calls.some(c=>c[0]==='scroll'));assert.ok(f.calls.some(c=>c[0]==='start'));f.transition.dispose();
});
test('an interrupted navigation cannot reveal over its replacement',async()=>{
  const f=fixture();f.transition.begin('/projects');f.transition.complete('/projects');f.transition.begin('/research');await Promise.resolve();f.flush();assert.equal(f.timelines.length,2);
  f.transition.error({cancelled:true},'/projects');f.timelines[1].finish();f.transition.complete('/research');await Promise.resolve();f.flush();assert.equal(f.timelines.length,3);f.timelines[2].finish();f.transition.dispose();
});
test('teardown cancels deferred reveals and reduced motion has zero duration',async()=>{
  const f=fixture(true);f.transition.begin('/projects');assert.ok(f.timelines[0].commands.every(([,v])=>v.duration===0));
  f.transition.complete('/projects');f.timelines[0].finish();f.transition.dispose();await Promise.resolve();f.flush();assert.equal(f.timelines.length,1);
});
