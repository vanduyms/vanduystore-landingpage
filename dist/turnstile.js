(() => {
  let siteKey, widget, token='', widgetLanguage, widgetSize, ready=false;
  const button=()=>document.querySelector('#contact-form button[type=submit]');
  const message=(vi,en)=>{
    document.querySelector('#verification-status').textContent=document.documentElement.lang==='en'?en:vi;
  };
  const clear=()=>{token='';button().disabled=true;};
  const unavailable=()=>{clear();message('Chưa xác minh được. Hãy tải lại trang hoặc liên hệ admin@vanduy.store.','Verification unavailable. Reload the page or contact admin@vanduy.store.');};
  const render=()=>{
    if (!ready || !siteKey) return;
    if (widget!==undefined) window.turnstile.remove(widget);
    clear();widgetLanguage=document.documentElement.lang;widgetSize=document.querySelector('#turnstile-widget').clientWidth<300?'compact':'flexible';
    message('Đang xác minh…','Verifying…');
    try {
      widget=window.turnstile.render('#turnstile-widget',{
        sitekey:siteKey,action:'contact',theme:'light',size:widgetSize,language:widgetLanguage,
        callback:value=>{token=value;if(document.querySelector('#contact-form').getAttribute('aria-busy')!=='true')button().disabled=false;message('Đã xác minh. Bạn có thể gửi yêu cầu.','Verified. You can send your inquiry.');},
        'expired-callback':()=>{clear();message('Xác minh đã hết hạn. Vui lòng xác minh lại.','Verification expired. Please verify again.');},
        'error-callback':()=>{unavailable();return true;},
        'timeout-callback':()=>{clear();message('Xác minh cần thêm thời gian. Vui lòng thử lại.','Verification timed out. Please try again.');}
      });
    } catch { unavailable(); }
  };
  window.vanduyVerification={
    get token(){return token;},
    reset(){clear();if(widget!==undefined&&window.turnstile){message('Đang xác minh…','Verifying…');window.turnstile.reset(widget);}},
    setLanguage(next){if(next!==widgetLanguage)render();},
    showRequired(){message('Vui lòng hoàn tất xác minh trước khi gửi.','Please complete verification before sending.');}
  };
  let resizeTimer;
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{const size=document.querySelector('#turnstile-widget').clientWidth<300?'compact':'flexible';if(ready&&size!==widgetSize&&document.querySelector('#contact-form').getAttribute('aria-busy')!=='true')render();},150);});
  fetch('/api/contact/config',{cache:'no-store'}).then(response=>{
    if(!response.ok)throw Error('config');return response.json();
  }).then(config=>{
    if(!config.siteKey){unavailable();return;}
    siteKey=config.siteKey;
    window.vanduyTurnstileLoaded=()=>{ready=true;render();};
    const script=document.createElement('script');
    script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=vanduyTurnstileLoaded&render=explicit';
    script.async=true;script.onerror=unavailable;document.head.appendChild(script);
  }).catch(unavailable);
})();
