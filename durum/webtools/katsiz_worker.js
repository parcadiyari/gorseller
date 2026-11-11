
  const BRAND={'OE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'IOE-PSA':/PEUGEOT|CITRO|PSA|STELLANTIS/i,'OPAR':/FIAT|MOPAR|OPAR|ALFA|LANCIA|STELLANTIS/i,'IOE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'OE-OPEL':/OPEL|VAUXHALL|GM|GENERAL MOTORS/i,'BSG':/BSG/i};
  const BLOCK=/der-ersatzteile-profi|devosautodemontage|ovoko|webshopapp|proxyparts|shbdn|autoricambiusati|alicdn|drauto|verhoeven|recoautos|ahparts|izap24|boucherit|re-group|procaparts|autodily|dezmembrari|autotech24|drostonderdelen|mechantex|impergom|dtspare|avtonomiya|dgjauto|ebay|allegro|aliexpress|amazon|pinterest|facebook|youtube|ytimg|sprzedajemy|olx/i;
  const norm=s=>(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const dec=s=>s.replace(/&quot;/g,'"').replace(/&amp;/g,'&');
  let Q,i,stop=false;
  onmessage=async e=>{
    if(e.data.stop){stop=true;return;}
    Q=e.data.Q;i=e.data.start;
    while(i<Q.length&&!stop){
      let [g,q,code,marka]=Q[i];if(marka==='EUROREPAR'&&!/eurorepar/i.test(q))q='eurorepar '+q;let hits=[];
      try{
        const r=await fetch('https://www.bing.com/images/async?q='+encodeURIComponent(q)+'&first=0&count=40&mmasync=1',{credentials:'include'});
        const t=await r.text();
        if(r.status!==200||/captcha|challenge|unusual traffic/i.test(t.slice(0,5000))&&!/ m="/.test(t)){postMessage({blocked:r.status,i:i});return;}
        const re=/ m="(\{[^"]*\})"/g;let m;
        while((m=re.exec(t))&&hits.length<4){
          try{const j=JSON.parse(dec(m[1]));const u=j.murl||'';
            if(!u||BLOCK.test(u)||BLOCK.test(j.purl||''))continue;
            const hay=norm(u+' '+(j.t||'')+' '+(j.purl||''));
            if(!hay.includes(code))continue;
            const txt=u+' '+(j.t||'')+' '+(j.purl||'');
            if(BRAND[marka]){if(code.length<8&&!BRAND[marka].test(txt))continue;}
            else{const bn=norm(marka.split(/[ .-]/).sort((a,b)=>b.length-a.length)[0]);if(bn.length>=3&&!norm(txt).includes(bn))continue;}
            if(!hits.includes(u))hits.push(u);
          }catch(_){}
        }
        postMessage({i:i,g:g,hits:hits});
      }catch(err){postMessage({i:i,g:g,err:String(err)});await new Promise(r=>setTimeout(r,30000));continue;}
      i++;
      await new Promise(r=>setTimeout(r,5000+Math.random()*2000));
    }
    postMessage({done:true,i:i});
  };