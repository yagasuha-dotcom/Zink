SS.C={};SS.CARDS.forEach(c=>SS.C[c.id]=c);
SS.shuf=a=>{a=[...a];for(let i=a.length;i>1;i--){const j=Math.random()*i|0;[a[i-1],a[j]]=[a[j],a[i-1]]}return a};
SS.side=()=>{const d=SS.shuf(SS.CARDS.map(c=>c.id));return{hand:d.slice(0,6),q:d.slice(6),b:[[],[],[]],s:[[],[],[]],life:{},pas:[true,true,true]}};
SS.quiz=()=>SS.QZ.map((arr,li)=>{const q=arr[Math.random()*arr.length|0],ix=SS.shuf([0,1,2]);return{li,q:q.q,o:ix.map(i=>q.o[i]),a:ix.indexOf(q.a),e:q.e}});
/* sisa ronde aktif sebuah kartu; kartu yang belum dipasang dianggap masih penuh */
SS.lf=(S,id)=>S&&S.life[id]!=null?S.life[id]:SS.C[id].life;
/* hitung kekuatan satu lokasi. Pasif (efek kartu + bonus lokasi) mati jika S.pas[li]===false; kekuatan dasar tetap */
SS.calc=(mine,theirs,li,S,T)=>{const L=SS.LOCS[li],pas=!S||S.pas[li]!==false,tpas=!T||T.pas[li]!==false,per=[];let tot=0;
 mine.forEach((id,i)=>{const c=SS.C[id],f=c.fx;let p=c.p;
  if(pas){const oth=mine.filter((_,j)=>j!==i),lf=SS.lf(S,id);
   switch(f.k){
    case'loc':if(f.loc===li)p+=f.v;break;
    case'each':p+=f.v*oth.length;break;
    case'burst':if(lf===c.life)p+=f.v;break;
    case'last':if(lf===1)p+=f.v;break;
    case'grow':p+=f.v*(c.life-lf);break;
    case'solo':if(!oth.length)p+=f.v;break;
    case'pair':if(oth.some(o=>SS.C[o].t===c.t))p+=f.v;break;
    case'mimic':p=Math.max(p,...oth.map(o=>SS.C[o].p));break}
   oth.forEach(o=>{const g=SS.C[o].fx;if(g.k==='adj')p+=g.v});
   if(L.types.includes(c.t))p+=L.v}
  per.push(p);tot+=p});
 const sh=pas&&mine.some(id=>SS.C[id].fx.k==='shield');let dr=0;
 if(tpas&&!sh)theirs.forEach(id=>{const f=SS.C[id].fx;if(f.k==='drain')dr+=f.v;if(f.k==='scale')dr+=f.v*mine.length});
 return{per,tot:Math.max(0,tot-dr),shield:sh}};
SS.score=(S,T,id,li)=>{const mine=S.b[li].concat(S.s[li]),th=T.b[li],d=m=>SS.calc(m,th,li,S,T).tot-SS.calc(th,m,li,T,S).tot,b=d(mine),a=d(mine.concat(id));return a-b+(Math.abs(a)<=4?1.5:0)+(a>0?1:0)+.25*(SS.C[id].life-1)};
SS.full=(x,li)=>x.b[li].length+x.s[li].length>=SS.CAP;
SS.ai=g=>{const o=g.o,noise=g.mode==='train'?4:1.2;let en=3;
 if(g.mode!=='train')g.olost.forEach((lo,li)=>{if(!lo)return;for(let k=o.b[li].length-1;k>=0;k--){const id=o.b[li][k];let b=null;for(let t=0;t<3;t++){if(t===li||SS.full(o,t))continue;const sc=SS.score(o,g.p,id,t);if(!b||sc>b.sc)b={t,sc}}if(b&&b.sc>2){o.b[li].splice(k,1);o.b[b.t].push(id)}}});
 for(let n=0;n<6;n++){let best=null;
  for(const id of o.hand)for(let li=0;li<3;li++){if(en<1||SS.full(o,li))continue;
   const sc=SS.score(o,g.p,id,li)+Math.random()*noise;if(!best||sc>best.sc)best={id,li,sc}}
  if(!best||(g.mode==='train'&&Math.random()<.25))break;
  o.hand.splice(o.hand.indexOf(best.id),1);o.s[best.li].push(best.id);en--}};
SS.Game=class{
 constructor(mode){this.mode=mode;this.r=1;this.p=SS.side();this.o=SS.side();this.o.pas=[0,1,2].map(()=>Math.random()<(mode==='train'?.5:.75));this.done=false;this.res=null;this.lost=[0,0,0];this.olost=[0,0,0];this.mvd=[];this.gone=[]}
 left(){return 3-this.p.s.flat().length}
 room(li){return !SS.full(this.p,li)}
 can(id,li){return this.left()>0&&this.room(li)}
 stage(id,li){if(!this.can(id,li))return false;this.p.hand.splice(this.p.hand.indexOf(id),1);this.p.s[li].push(id);return true}
 canMv(li,k){return !!this.lost[li]&&!this.mvd.includes(this.p.b[li][k])}
 move(li,k,to){if(to===li||!this.canMv(li,k)||!this.room(to))return false;const id=this.p.b[li].splice(k,1)[0];this.p.b[to].push(id);this.mvd.push(id);return true}
 unstage(li,k){this.p.hand.push(this.p.s[li].splice(k,1)[0])}
 reveal(){SS.ai(this);for(const x of[this.p,this.o])x.s.forEach((s,i)=>{s.forEach(id=>x.life[id]=SS.C[id].life);x.b[i].push(...s);x.s[i]=[]});
  return this.res=[0,1,2].map(i=>{const a=SS.calc(this.p.b[i],this.o.b[i],i,this.p,this.o),b=SS.calc(this.o.b[i],this.p.b[i],i,this.o,this.p);return{a,b,w:a.tot>b.tot?'p':b.tot>a.tot?'o':null}})}
 settle(){this.lost=this.res.map(x=>x.w==='o');this.olost=this.res.map(x=>x.w==='p');this.mvd=[];this.gone=[];
  if(this.r>=6){this.done=true;const n=w=>this.res.filter(x=>x.w===w).length,s=w=>this.res.reduce((a,x)=>a+(w==='p'?x.a.tot:x.b.tot),0);
   const p=n('p'),o=n('o'),tp=s('p'),to=s('o');this.fin={p,o,tp,to,w:p!==o?(p>o?'p':'o'):tp!==to?(tp>to?'p':'o'):null}}
  else{
   /* masa aktif habis: kartu mundur ke dasar tumpukan (tidak hilang selamanya), lalu tarik kartu */
   for(const[k,x]of[['p',this.p],['o',this.o]])for(let i=0;i<3;i++)x.b[i]=x.b[i].filter(id=>{if(--x.life[id]>0)return true;delete x.life[id];x.q.push(id);this.gone.push({k,id,li:i});return false});
   this.r++;for(const x of[this.p,this.o])while(x.hand.length<6&&x.q.length)x.hand.push(x.q.shift())}}};
