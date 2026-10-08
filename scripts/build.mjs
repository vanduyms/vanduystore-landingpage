import { readFile, mkdir, writeFile } from "node:fs/promises";
const files = {
  "/": ["dist/index.html", "text/html; charset=utf-8"],
  "/index.html": ["dist/index.html", "text/html; charset=utf-8"],
  "/styles.css": ["dist/styles.css", "text/css; charset=utf-8"],
  "/app.js": ["dist/app.js", "text/javascript; charset=utf-8"],
};
const assets = {};
for (const [url, [file, type]] of Object.entries(files))
  assets[url] = { body: await readFile(file, "utf8"), type };
const templates = (
  await readFile("server/email-templates.mjs", "utf8")
).replace("export function", "function");
const contact = (await readFile("server/contact.mjs", "utf8"))
  .replace("import {renderEmail} from './email-templates.mjs';", "")
  .replace("export async function", "async function");
await mkdir("dist/server", { recursive: true });
await writeFile(
  "dist/server/index.js",
  `${templates}\n${contact}\nconst assets=${JSON.stringify(assets)};\nexport default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/api/contact')return handleContact(request,env);const asset=assets[url.pathname];if(!asset)return new Response('Not found',{status:404});if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});return new Response(request.method==='HEAD'?null:asset.body,{headers:{'Content-Type':asset.type,'X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'}})}};\n`,
);
console.log(
  "Built dependency-free Worker with contact endpoint and page assets.",
);
