import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
const files={
  '/':['dist/index.html','text/html; charset=utf-8'],
  '/index.html':['dist/index.html','text/html; charset=utf-8'],
  '/styles.css':['dist/styles.css','text/css; charset=utf-8'],
  '/app.js':['dist/app.js','text/javascript; charset=utf-8'],
  '/turnstile.js':['dist/turnstile.js','text/javascript; charset=utf-8']
};
const assets={};
for(const [url,[file,type]] of Object.entries(files))assets[url]={body:await readFile(file,'utf8'),type};
await mkdir('dist/server',{recursive:true});
for(const file of ['contact.mjs','email-templates.mjs'])await copyFile(`server/${file}`,`dist/server/${file}`);
await writeFile('dist/server/index.js',`import {handleContact} from './contact.mjs';
const assets=${JSON.stringify(assets)};
export default {async fetch(request,env){
 const url=new URL(request.url);
 if(url.pathname==='/api/contact')return handleContact(request,env);
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
 if(url.pathname==='/api/contact/config')return Response.json({siteKey:env.TURNSTILE_SECRET_KEY?env.TURNSTILE_SITE_KEY||null:null},{headers:{'Cache-Control':'no-store'}});
 const asset=assets[url.pathname];if(!asset)return new Response('Not found',{status:404});
 return new Response(request.method==='HEAD'?null:asset.body,{headers:{'Content-Type':asset.type,'X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'}});
}};
`);
console.log('Built Worker modules and page assets.');
