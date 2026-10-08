import {test} from 'node:test';
import assert from 'node:assert/strict';
await import('../scripts/build.mjs');
const worker=(await import('../dist/server/index.js')).default;
const request=(path,method='GET')=>new Request(`https://vanduy.store${path}`,{method});
test('built Worker imports successfully and serves all client assets',async()=>{for(const path of ['/','/index.html','/styles.css','/app.js','/turnstile.js']){const response=await worker.fetch(request(path),{});assert.equal(response.status,200,path);assert.ok((await response.text()).length>0)}});
test('config exposes only the public site key',async()=>{const response=await worker.fetch(request('/api/contact/config'),{TURNSTILE_SITE_KEY:'public',TURNSTILE_SECRET_KEY:'private'});assert.deepEqual(await response.json(),{siteKey:'public'})});
test('Worker HEAD and missing paths behave correctly',async()=>{assert.equal(await(await worker.fetch(request('/','HEAD'),{})).text(),'');assert.equal((await worker.fetch(request('/missing'),{})).status,404);assert.equal((await worker.fetch(request('/api/contact/config','POST'),{})).status,405)});
