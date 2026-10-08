import {renderEmail} from './email-templates.mjs';
const recipient = 'admin@vanduy.store';
const interests = {ai:'AI & Automation',web:'Website & Web App',manage:'Business Software',other:'New idea'};
const respond = (status, code) => Response.json({ok:status===200,code},{status,headers:{'Cache-Control':'no-store'}});
export async function handleContact(request, env, send = fetch) {
  if (request.method !== 'POST') return respond(405,'method');
  if (request.headers.get('origin') !== new URL(request.url).origin) return respond(403,'origin');
  if (!(request.headers.get('content-type')||'').startsWith('application/json')) return respond(415,'content_type');
  if (Number(request.headers.get('content-length'))>12000) return respond(413,'size');
  let data;
  try {const raw=await request.text();if(raw.length>12000)return respond(413,'size');data=JSON.parse(raw)}catch{return respond(400,'invalid')}
  if(!data || typeof data!=='object') return respond(400,'invalid');
  const {interest,email,idea,website}=data;
  if(website) return respond(400,'invalid');
  if(!Object.hasOwn(interests,interest) || typeof email!=='string' || email.length>254 || !/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(email) || typeof idea!=='string' || !idea.trim() || idea.length>2000) return respond(400,'invalid');
  if(!env.CLOUDFLARE_API_TOKEN || !env.CLOUDFLARE_ACCOUNT_ID || !env.EMAIL_FROM) return respond(503,'unconfigured');
  try {
    const response = await send(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(env.CLOUDFLARE_ACCOUNT_ID)}/email/sending/send`,{
      method:'POST',headers:{Authorization:`Bearer ${env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(12000),
      body:JSON.stringify({to:recipient,from:env.EMAIL_FROM,...renderEmail({audience:'admin',language:data.language,interest,email,idea}),reply_to:email})
    });
    const result=await response.json();
    const accepted=[...(result.result?.delivered||[]),...(result.result?.queued||[])].includes(recipient);
    if(!response.ok || result.success!==true || !accepted || result.result?.permanent_bounces?.includes(recipient)) return respond(502,'delivery_failed');
    let confirmationSent = false;
    try {
      const confirmation=await send(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(env.CLOUDFLARE_ACCOUNT_ID)}/email/sending/send`,{
        method:'POST',headers:{Authorization:`Bearer ${env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},signal:AbortSignal.timeout(12000),
        body:JSON.stringify({to:email,from:env.EMAIL_FROM,...renderEmail({language:data.language,interest,email,idea}),reply_to:recipient})
      });
      const delivery=await confirmation.json();
      confirmationSent=confirmation.ok && delivery.success===true && [...(delivery.result?.delivered||[]),...(delivery.result?.queued||[])].includes(email) && !delivery.result?.permanent_bounces?.includes(email);
    } catch { /* The admin inquiry was accepted; do not ask the customer to submit it again. */ }
    return Response.json({ok:true,code:'accepted',confirmationSent},{headers:{'Cache-Control':'no-store'}});
  }catch{return respond(502,'delivery_failed')}
}
