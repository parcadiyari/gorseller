(async function(START,QURL){
  const Q=await (await fetch(QURL)).json();
  const wsrc=`
  const norm=s=>(s||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  const dec=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"');
  let Q,i,stop=false;
  onmessage=async e=>{
    if(e.data.stop){stop=true;return;}
    Q=e.data.Q;i=e.data.start;
    while(i<Q.length&&!stop){
      const [g,q,code,brand]=Q[i];let hits=[];
      try{
        const r=await fetch('https://www.autodoc.co.uk/spares-search?keyword='+encodeURIComponent(q),{credentials:'include'});
        const t=await r.text();
        if(r.status!==200||(/challenge-platform|cf-chl|Just a moment|Bir dakika/i.test(t.slice(0,4000))&&t.indexOf('spares')<0)){postMessage({captcha:true,i:i,st:r.status});return;}
        const re=/<img[^>]*>/g;let m;
        while((m=re.exec(t))&&hits.length<2){
          const tag=m[0];const alt=dec((tag.match(/alt="([^"]*)"/)||[])[1]||'');
          const ss=dec((tag.match(/data-srcset="([^"]*)"/)||tag.match(/srcset="([^"]*)"/)||tag.match(/src="([^"]*)"/)||[])[1]||'');
          if(!/cdn\\.autodoc\\.de\\/thumb\\?id=/.test(ss))continue;
          if(!norm(alt).includes(code))continue;
          if(!norm(alt).includes(norm(brand).slice(0,4)))continue;
          let u=ss.split(/[ ,]/)[0].replace(/([?&])m=\\d+/,'$1m=0');
          if(!hits.includes(u))hits.push(u);
        }
        postMessage({i:i,g:g,hits:hits});
      }catch(err){postMessage({i:i,g:g,err:String(err)});await new Promise(r=>setTimeout(r,30000));continue;}
      i++;
      await new Promise(r=>setTimeout(r,4000+Math.random()*2500));
    }
    postMessage({done:true,i:i});
  };`;
  if(window.__A&&window.__A.w)window.__A.w.terminate();
  const w=new Worker(URL.createObjectURL(new Blob([wsrc],{type:'text/javascript'})));
  window.__A={w:w,wi:START,res:{},err:0,done:false,captcha:false,n:Q.length};
  w.onmessage=e=>{const d=e.data;
    if(d.captcha){__A.captcha=true;__A.wi=d.i;return;}
    if(d.done){__A.done=true;__A.wi=d.i;return;}
    __A.wi=d.i+1;if(d.err){__A.err++;return;}
    if(d.hits.length)__A.res[d.g]=d.hits.map(u=>u.replace(/\?/g,'__Q__').replace(/&/g,'__A__').replace(/=/g,'__E__'));};
  w.postMessage({Q:Q,start:START});
  return 'basladi '+START+' / '+Q.length;
})
