(async function(START){
  const Q=await (await fetch('https://raw.githubusercontent.com/parcadiyari/gorseller/main/durum/google_q.json')).json();
  const wsrc = `
  const BRAND={'OE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'IOE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'OPAR':/FIAT|MOPAR|OPAR|ALFA|LANCIA|STELLANTIS/i,'IOE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'OE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'M.MARELLI':/MARELLI/i,'IOE-RENAULT':/RENAULT|DACIA/i,'KALE BALATA':/KALE/i};
  const BLOCK=/der-ersatzteile-profi|devosautodemontage|ovoko|webshopapp|proxyparts|shbdn|autoricambiusati|alicdn|drauto|verhoeven|recoautos|ahparts|izap24|boucherit|re-group|procaparts|autodily|dezmembrari|autotech24|drostonderdelen|mechantex|impergom|dtspare|avtonomiya|dgjauto|ebay|allegro|aliexpress|amazon|pinterest|facebook|youtube|ytimg|sprzedajemy|olx|euroauto|avito|drom\\.ru|farpost|bibinet|vk\\.com|userapi|yildizlar|baza-|razbor|b-u-|bu-zapchasti|cikma|ikinciel|hurda|pejo|erdemoto|fiatparcacim|oemotoyedek|gknotoyedek|kornauto|zapask|parts77|sales24|abcp|parcageliyor|athousakis|autoline|franceavto|easyparts|ucuzler|ucaotomotiv|asryedek|4filtre|exist\\.ru|emex|zzap|autodoc\\.ru|exist|benimopel|opelline|vdopel|genelyedek|yeniotoparca|zapchast|autoopt|mobizap|plentycar|4garage|allparts|parautoparts|otoerdem|demiroto|copelli|zekkert|stellox|ecooparts|opisto|b-parts|bparts|recambio|desguace|autoparts24|rrr\\.lt|ovoko|autodoc\\.ru|kullanilan|used|gebraucht|occasion|segunda|tbn0|gstatic|arbstorage|arabam|recar\\.lt|sahibinden|shbd|letgo|dolap|ilanfoto|ikinci-el|2-el|second-hand|breakers|dismantl|salvage|schrott|pieces-occasion|lkq|partsouq/i;
  const norm=s=>(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const un=s=>s.replace(/\\\\u003d/g,'=').replace(/\\\\u0026/g,'&');
  const RX=/\\["https:\\/\\/encrypted-tbn[^"]+",\\d+,\\d+\\],\\["([^"]+)",(\\d+),(\\d+)\\][\\s\\S]{0,900}?"2003":\\[null,"[^"]*","([^"]*)","([^"]*)"/g;
  let Q,i,stop=false;
  onmessage=async e=>{
    if(e.data.stop){stop=true;return;}
    Q=e.data.Q;i=e.data.start;
    while(i<Q.length&&!stop){
      const [g,q,code,marka]=Q[i];let hits=[];
      try{
        const r=await fetch('https://www.google.com/search?udm=2&hl=tr&q='+encodeURIComponent(q),{credentials:'include'});
        const t=await r.text();
        if(/\\/sorry\\//.test(r.url)||/unusual traffic|captcha-form|g-recaptcha/i.test(t.slice(0,200000))&&t.indexOf('"2003":[null')<0){postMessage({captcha:true,i:i});return;}
        let m;RX.lastIndex=0;
        while((m=RX.exec(t))&&hits.length<4){
          const u=un(m[1]),w=+m[3],h=+m[2],pg=un(m[4]),ti=m[5];
          const meta=pg+' '+ti;
          if(!/^https?:/.test(u)||BLOCK.test(u)||BLOCK.test(meta))continue;
          if(Math.max(w,h)<250)continue;
          if(!norm(u+' '+meta).includes(code))continue;
          const bw=BRAND[marka]||new RegExp(marka.split(/[ .-]/)[0],'i');
          if(code.length<8&&!bw.test(u+' '+meta))continue;
          if(!hits.includes(u))hits.push(u);
        }
        postMessage({i:i,g:g,hits:hits});
      }catch(err){postMessage({i:i,g:g,err:String(err)});await new Promise(r=>setTimeout(r,30000));continue;}
      i++;
      await new Promise(r=>setTimeout(r,6000+Math.random()*5000));
    }
    postMessage({done:true,i:i});
  };`;
  if(window.__G&&window.__G.w)window.__G.w.terminate();
  const w=new Worker(URL.createObjectURL(new Blob([wsrc],{type:'text/javascript'})));
  window.__G={w:w,wi:START,res:{},err:0,done:false,captcha:false,n:Q.length};
  w.onmessage=e=>{const d=e.data;
    if(d.captcha){__G.captcha=true;__G.wi=d.i;return;}
    if(d.done){__G.done=true;__G.wi=d.i;return;}
    __G.wi=d.i+1;if(d.err){__G.err++;return;}
    if(d.hits.length)__G.res[d.g]=d.hits;};
  w.postMessage({Q:Q,start:START});
  if(window.__GSV)clearInterval(window.__GSV);
  window.__GSV=setInterval(()=>{try{localStorage.setItem('__GSAVE',JSON.stringify({i:__G.wi,res:__G.res,err:__G.err}))}catch(e){}},120000);
  window.addEventListener('message',e=>{if(e.data==='GGET'&&e.source)e.source.postMessage({gdata:JSON.stringify(__G.res),i:__G.wi},'*');});
  return 'basladi '+START+' / '+Q.length;
})