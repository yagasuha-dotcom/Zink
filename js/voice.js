/* Suara advisor. Memilih suara paling natural yang ada di perangkat (bukan suara robotik ala Google),
   dan bisa dipilih manual lewat tombol Suara di menu. */
SS.V={on:true,talk:0,vs:[],pick:null,q:0,
picks:{},
get(k){try{return localStorage.getItem('ss.voice.'+k)}catch(e){return null}},
set(k,u){try{u?localStorage.setItem('ss.voice.'+k,u):localStorage.removeItem('ss.voice.'+k)}catch(e){}},
qual(v){const n=v.name+' '+(v.voiceURI||'');let s=0;
 if(/natural|neural|online/i.test(n))s+=100;
 if(/premium|enhanced|siri|apple/i.test(n))s+=60;
 if(/damayanti|gadis|ardi|andika|indah|sari/i.test(n))s+=40;
 if(v.localService)s+=10;
 if(/google/i.test(n))s-=120;
 if(/espeak|festival|mbrola/i.test(n))s-=200;
 return s},
gender(v){const n=v.name;if(/ardi|andika|male|pria|rizki|budi|david|mark|guy/i.test(n)&&!/female/i.test(n))return'm';return'f'},
label(v){const t=this.qual(v)>=100?'Natural':this.qual(v)>=40?'Bagus':this.qual(v)<0?'Standar':'Normal';
 return{n:v.name.replace(/^Microsoft\s+/i,'').replace(/\s*-\s*Indonesian.*$/i,'').replace(/\(Natural\)/i,'').trim(),t}},
init(){if(!window.speechSynthesis)return;
 const f=()=>{this.vs=speechSynthesis.getVoices().filter(v=>/^(id|in)([-_]|$)/i.test(v.lang)||/indonesia/i.test(v.name)).sort((a,b)=>this.qual(b)-this.qual(a));
  Object.keys(SS.ADV).forEach(k=>{const s=this.get(k);this.picks[k]=s&&this.vs.find(v=>v.voiceURI===s)||null})};
 f();speechSynthesis.onvoiceschanged=f},
/* tiap advisor dapat suara sendiri: pilihan manual > suara otomatis yang berbeda (pria/wanita) */
voiceFor(k){if(!this.vs.length)return null;if(this.picks[k])return this.picks[k];
 const ks=Object.keys(SS.ADV),mine=ks.indexOf(k),want=(SS.ADV[k].vo||{}).g||'f';
 const top=this.qual(this.vs[0]),good=this.vs.filter(v=>this.qual(v)>=top-30),
  same=good.filter(v=>this.gender(v)===want),pool=same.length?same:good;
 const rank=ks.filter(x=>((SS.ADV[x].vo||{}).g||'f')===want).indexOf(k);
 return pool[rank%pool.length]},
/* kalau beberapa advisor terpaksa memakai suara yang sama, bedakan lewat pitch dan tempo */
shared(k){const v=this.voiceFor(k);return Object.keys(SS.ADV).some(x=>x!==k&&this.voiceFor(x)===v)},
mark(on){this.talk=on;document.querySelectorAll('.ad,.ac.on').forEach(e=>e.classList.toggle('sp',!!on))},
/* pecah per kalimat/anak kalimat supaya intonasi lebih mengalir dan jeda terasa alami */
chunks(t){const o=[];t.replace(/[^.!?;:]+[.!?;:]*/g,m=>{m=m.trim();if(m)o.push(m)});
 const r=[];o.forEach(m=>{if(m.length>90){m.split(/,\s*/).forEach((x,i,a)=>r.push(x+(i<a.length-1?',':'')))}else r.push(m)});return r},
say(t,k){if(!this.on||!window.speechSynthesis||!t)return;this.stop();
 t=t.replace(/[^\p{L}\p{N}\s.,!?'-]/gu,' ').replace(/\s+/g,' ').trim();if(!t)return;
 const a=(SS.ADV[k]||SS.ADV.rex).vo,v=this.voiceFor(k),sh=this.shared(k),id=++this.q,parts=this.chunks(t);
 parts.forEach((p,i)=>{const u=new SpeechSynthesisUtterance(p);u.lang='id-ID';
  /* sengaja netral & pelan: pitch ekstrem yang bikin terdengar robotik */
  u.pitch=sh?Math.min(2,Math.max(.5,a.g==='m'?a.p*.8:a.p*(k==='rex'?1.18:1.04))):a.p;u.rate=sh?a.r*(k==='laras'?.92:k==='rex'?1.08:1):a.r;u.volume=1;if(v)u.voice=v;
  if(i===0)u.onstart=()=>{if(id===this.q)this.mark(1)};
  if(i===parts.length-1)u.onend=u.onerror=()=>{if(id===this.q)this.mark(0)};
  speechSynthesis.speak(u)})},
stop(){this.q++;if(window.speechSynthesis)speechSynthesis.cancel();this.mark(0)}};
