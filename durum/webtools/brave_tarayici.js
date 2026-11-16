(async function(START){
  const Q=window.__BQ||await (await fetch('https://raw.githubusercontent.com/parcadiyari/gorseller/main/durum/google_q.json')).json();
  const wsrc = `
  const BRAND={'OE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'IOE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'OPAR':/FIAT|MOPAR|OPAR|ALFA|LANCIA|STELLANTIS/i,'IOE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'OE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'M.MARELLI':/MARELLI/i,'IOE-RENAULT':/RENAULT|DACIA/i,'KALE BALATA':/KALE/i};
  const BLOCK=/der-ersatzteile-profi|devosautodemontage|ovoko|webshopapp|proxyparts|shbdn|autoricambiusati|alicdn|drauto|verhoeven|recoautos|ahparts|izap24|boucherit|re-group|procaparts|autodily|dezmembrari|autotech24|drostonderdelen|mechantex|impergom|dtspare|avtonomiya|dgjauto|ebay|allegro|aliexpress|amazon|pinterest|facebook|youtube|ytimg|sprzedajemy|olx|euroauto|avito|drom\\.ru|farpost|bibinet|vk\\.com|userapi|yildizlar|baza-|razbor|b-u-|bu-zapchasti|cikma|ikinciel|hurda|pejo|erdemoto|fiatparcacim|oemotoyedek|gknotoyedek|kornauto|zapask|parts77|sales24|abcp|parcageliyor|athousakis|autoline|franceavto|easyparts|ucuzler|ucaotomotiv|asryedek|4filtre|exist\\.ru|emex|zzap|autodoc\\.ru|exist|benimopel|opelline|vdopel|genelyedek|yeniotoparca|zapchast|autoopt|mobizap|plentycar|4garage|allparts|parautoparts|otoerdem|demiroto|copelli|zekkert|stellox|ecooparts|opisto|b-parts|bparts|recambio|desguace|autoparts24|rrr\\.lt|ovoko|autodoc\\.ru|kullanilan|used|gebraucht|occasion|segunda|tbn0|gstatic|arbstorage|arabam|recar\\.lt|sahibinden|shbd|letgo|dolap|ilanfoto|ikinci-el|2-el|second-hand|breakers|dismantl|salvage|schrott|pieces-occasion|lkq|partsouq/i;
  const norm=s=>(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const un=s=>s.replace(/\\\\u003d/g,'=').replace(/\\\\u0026/g,'&');
  const RX=/\\{title:"([^"]*)",url:"([^"]*)"[\\s\\S]{0,2500}?source:"([^"]*)"[\\s\\S]{0,900}?properties:\\{url:"([^"]+)"/g;
  let Q,i,stop=false,bk=0;
  onmessage=async e=>{
    if(e.data.stop){stop=true;return;}
    Q=e.data.Q;i=e.data.start;
    while(i<Q.length&&!stop){
      const [g,q,code,marka]=Q[i];let hits=[];
      try{
        const r=await fetch('https://search.brave.com/images?q='+encodeURIComponent(q),{credentials:'include',signal:AbortSignal.timeout(60000)});
        const t=await r.text();
        if(/captcha|challenge/i.test(r.url)){postMessage({captcha:true,i:i,st:r.status});return;}
        if(r.status==429||(t.indexOf('results:[')<0&&t.indexOf('properties:{url')<0)){bk=(bk||0)+1;if(bk>3){postMessage({captcha:true,i:i,st:r.status});return;}await new Promise(z=>setTimeout(z,600000));continue;}
        bk=0;
        let m;RX.lastIndex=0;
        while((m=RX.exec(t))&&hits.length<4){
          const ti=m[1],pg=m[2],u=m[4];
          const meta=pg+' '+ti;
          if(!/^https?:/.test(u)||BLOCK.test(u)||BLOCK.test(meta))continue;
                    if(!norm(u+' '+ti).includes(code))continue;
          if(/logo|placeholder|hazirlan|no-?image|noimage|nophoto|default|banner|arac-gorsel|marka-|brand|icon|sprite/i.test(u))continue;
          const bw=BRAND[marka]||new RegExp(marka.split(/[ .-]/)[0],'i');
          if(code.length<8&&!bw.test(u+' '+meta))continue;
          if(!hits.includes(u))hits.push(u);
        }
        postMessage({i:i,g:g,hits:hits});
      }catch(err){postMessage({i:i,g:g,err:String(err)});await new Promise(r=>setTimeout(r,30000));continue;}
      i++;
      await new Promise(r=>setTimeout(r,9000+Math.random()*6000));
    }
    postMessage({done:true,i:i});
  };`;
  if(window.__B&&window.__B.w)window.__B.w.terminate();
  const w=new Worker(URL.createObjectURL(new Blob([wsrc],{type:'text/javascript'})));
  window.__B={w:w,wi:START,res:{},err:0,done:false,captcha:false,n:Q.length};
  w.onmessage=e=>{const d=e.data;
    if(d.captcha){__B.captcha=true;__B.wi=d.i;return;}
    if(d.done){__B.done=true;__B.wi=d.i;return;}
    __B.wi=d.i+1;if(d.err){__B.err++;return;}
    if(d.hits.length)__B.res[d.g]=d.hits;};
  w.postMessage({Q:Q,start:START});
  if(window.__BSV)clearInterval(window.__BSV);
  window.__BSV=setInterval(()=>{try{localStorage.setItem('__BSAVE',JSON.stringify({i:__B.wi,res:__B.res,err:__B.err}))}catch(e){}},120000);
  window.addEventListener('message',e=>{if(e.data==='BGET'&&e.source)e.source.postMessage({bdata:JSON.stringify(__B.res),i:__B.wi},'*');});
  return 'basladi '+START+' / '+Q.length;
})