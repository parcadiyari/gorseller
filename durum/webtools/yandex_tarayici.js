(async function(START){
  const Q=await (await fetch('https://raw.githubusercontent.com/parcadiyari/gorseller/main/durum/yandex_q.json')).json();
  const wsrc = `
  const BRAND={'OE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'IOE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'OPAR':/FIAT|MOPAR|OPAR|ALFA|LANCIA|STELLANTIS/i,'IOE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'OE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'BSG':/BSG/i};
  const BLOCK=/der-ersatzteile-profi|devosautodemontage|ovoko|webshopapp|proxyparts|shbdn|autoricambiusati|alicdn|drauto|verhoeven|recoautos|ahparts|izap24|boucherit|re-group|procaparts|autodily|dezmembrari|autotech24|drostonderdelen|mechantex|impergom|dtspare|avtonomiya|dgjauto|ebay|allegro|aliexpress|amazon|pinterest|facebook|youtube|ytimg|sprzedajemy|olx|euroauto|avito|drom\\.ru|farpost|bibinet|vk\\.com|userapi|yildizlar|baza-|razbor|b-u-|bu-zapchasti|cikma|ikinciel|hurda|pejo|erdemoto|fiatparcacim|oemotoyedek|gknotoyedek|kornauto|zapask|parts77|sales24|abcp|parcageliyor|athousakis|autoline|franceavto|easyparts|ucuzler|ucaotomotiv|asryedek|4filtre|exist\\.ru|emex|zzap|autodoc\\.ru|exist|benimopel|opelline|vdopel|genelyedek|yeniotoparca|zapchast|autoopt|mobizap|plentycar|4garage|allparts|parautoparts|otoerdem|demiroto|copelli|zekkert|stellox/i;
  const norm=s=>(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const dec=s=>s.replace(/&quot;/g,'"').replace(/&amp;/g,'&');
  const pick=(seg,k)=>{const m=seg.match(new RegExp('"'+k+'":"([^"]*)"'));return m?m[1]:'';};
  let Q,i,stop=false;
  onmessage=async e=>{
    if(e.data.stop){stop=true;return;}
    Q=e.data.Q;i=e.data.start;
    while(i<Q.length&&!stop){
      const [g,q,code,marka]=Q[i];let hits=[];
      try{
        const r=await fetch('https://yandex.com.tr/gorsel/search?text='+encodeURIComponent(q),{credentials:'include'});
        const t0=await r.text();
        if(/showcaptcha|captcha/i.test(r.url)||(t0.split('origUrl').length<2&&/captcha/i.test(t0))){postMessage({captcha:true,i:i});return;}
        const t=dec(t0);
        const parts=t.split('"origUrl":"');
        for(let k=1;k<parts.length&&hits.length<4;k++){
          const u=parts[k].slice(0,parts[k].indexOf('"'));
          const after=parts[k].slice(0,1500), before=parts[k-1].slice(-1200);
          const meta=pick(before,'alt')+' '+pick(after,'title')+' '+pick(after,'url')+' '+pick(after,'domain');
          if(!/^https?:/.test(u)||BLOCK.test(u)||BLOCK.test(meta))continue;
          if(!norm(u+' '+meta).includes(code))continue;
          if(code.length<8&&BRAND[marka]&&!BRAND[marka].test(u+' '+meta))continue;
          if(!hits.includes(u))hits.push(u);
        }
        postMessage({i:i,g:g,hits:hits});
      }catch(err){postMessage({i:i,g:g,err:String(err)});await new Promise(r=>setTimeout(r,30000));continue;}
      i++;
      await new Promise(r=>setTimeout(r,3500+Math.random()*2500));
    }
    postMessage({done:true,i:i});
  };`;
  if(window.__Y&&window.__Y.w)window.__Y.w.terminate();
  const w=new Worker(URL.createObjectURL(new Blob([wsrc],{type:'text/javascript'})));
  window.__Y={w:w,wi:START,res:{},err:0,done:false,captcha:false,n:Q.length};
  w.onmessage=e=>{const d=e.data;
    if(d.captcha){__Y.captcha=true;__Y.wi=d.i;return;}
    if(d.done){__Y.done=true;__Y.wi=d.i;return;}
    __Y.wi=d.i+1;if(d.err){__Y.err++;return;}
    if(d.hits.length)__Y.res[d.g]=d.hits;};
  w.postMessage({Q:Q,start:START});
  const bc=new BroadcastChannel('yx');window.__BCY=bc;
  bc.onmessage=e=>{if(e.data&&e.data.get){bc.postMessage({txt:JSON.stringify(__Y.res),i:__Y.wi});}};
  return 'basladi '+START+' / '+Q.length;
})
