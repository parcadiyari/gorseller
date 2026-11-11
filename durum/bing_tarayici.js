// Bing görsel tarayıcı - bing.com sekmesinde çalıştırılır. Q = [[gid, sorgu, kod, marka], ...], START = başlangıç indeksi
(function(Q, START){
  const wsrc = `
  const BRAND={'OE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'IOE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'OPAR':/FIAT|MOPAR|OPAR|ALFA|LANCIA|STELLANTIS/i,'IOE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'OE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'BSG':/BSG/i};
  const BLOCK=/der-ersatzteile-profi|devosautodemontage|ovoko|webshopapp|proxyparts|shbdn|autoricambiusati|alicdn|drauto|verhoeven|recoautos|ahparts|izap24|boucherit|re-group|procaparts|autodily|dezmembrari|autotech24|drostonderdelen|mechantex|impergom|dtspare|avtonomiya|dgjauto|ebay|allegro|aliexpress|amazon|pinterest|facebook|youtube|ytimg|sprzedajemy|olx/i;
  const norm=s=>(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const dec=s=>s.replace(/&quot;/g,'"').replace(/&amp;/g,'&');
  let Q,i,stop=false;
  onmessage=async e=>{
    if(e.data.stop){stop=true;return;}
    Q=e.data.Q;i=e.data.start;
    while(i<Q.length&&!stop){
      const [g,q,code,marka]=Q[i];let hits=[];
      try{
        const r=await fetch('https://www.bing.com/images/async?q='+encodeURIComponent(q)+'&first=0&count=40&mmasync=1',{credentials:'include'});
        const t=await r.text();
        const re=/ m="(\\{[^"]*\\})"/g;let m;
        while((m=re.exec(t))&&hits.length<4){
          try{const j=JSON.parse(dec(m[1]));const u=j.murl||'';
            if(!u||BLOCK.test(u)||BLOCK.test(j.purl||''))continue;
            const hay=norm(u+' '+(j.t||'')+' '+(j.purl||''));
            if(!hay.includes(code))continue;
            if(code.length<8&&BRAND[marka]&&!BRAND[marka].test(u+' '+(j.t||'')+' '+(j.purl||'')))continue;
            if(!hits.includes(u))hits.push(u);
          }catch(_){}
        }
        postMessage({i:i,g:g,hits:hits});
      }catch(err){postMessage({i:i,g:g,err:String(err)});await new Promise(r=>setTimeout(r,30000));continue;}
      i++;
      await new Promise(r=>setTimeout(r,2500+Math.random()*1500));
    }
    postMessage({done:true,i:i});
  };`;
  if(window.__W&&window.__W.w)window.__W.w.terminate();
  const w=new Worker(URL.createObjectURL(new Blob([wsrc],{type:'text/javascript'})));
  window.__W={w:w,wi:START,res:{},err:0,done:false};
  w.onmessage=e=>{const d=e.data;
    if(d.done){__W.done=true;__W.wi=d.i;return;}
    __W.wi=d.i+1;if(d.err){__W.err++;return;}
    if(d.hits.length)__W.res[d.g]=d.hits;};
  w.postMessage({Q:Q,start:START});
  const bc=new BroadcastChannel('webx');window.__BC=bc;
  bc.onmessage=e=>{if(e.data&&e.data.get){bc.postMessage({txt:JSON.stringify(__W.res),i:__W.wi});}};
  return 'basladi '+START;
})
