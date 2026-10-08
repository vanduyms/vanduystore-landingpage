import http from 'node:http';
import {existsSync} from 'node:fs';
if (existsSync('.env.local')) process.loadEnvFile('.env.local');
const worker=(await import('../dist/server/index.js')).default;
http.createServer(async(req,res)=>{
  try {
    const host=req.headers.host;
    const headers=new Headers();
    for(const [key,value] of Object.entries(req.headers))if(value)headers.set(key,Array.isArray(value)?value.join(','):value);
    const chunks=[];for await(const chunk of req)chunks.push(chunk);
    const request=new Request(`http://${host}${req.url}`,{method:req.method,headers,...(!['GET','HEAD'].includes(req.method)?{body:Buffer.concat(chunks)}:{})});
    const response=await worker.fetch(request,process.env);
    res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
  }catch{res.writeHead(500);res.end('Preview error')}
}).listen(8081,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:8081'));
