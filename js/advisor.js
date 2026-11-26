SS.advise=(g,k)=>{let best=null;
 for(const id of g.p.hand)for(let li=0;li<3;li++){if(!g.can(id,li))continue;const c=SS.C[id],mine=g.p.b[li].concat(g.p.s[li]);let s=SS.score(g.p,g.o,id,li);
  if(k==='rex')s+=(c.t==='iptek'||c.t==='modal'?1:0)+(li===0?.8:0);
  if(k==='laras')s+=(c.t==='budaya'||c.t==='kritik'?1.5:0)+(c.fx.k==='shield'?1:0)+(li===2?.8:0)-(c.t==='modal'?.5:0);
  if(k==='bima')s+=(c.t==='adaptasi'?1.5:0)+(li===1?.8:0)+(mine.length===0?.7:0);
  if(!best||s>best.s)best={id,li,s,mine}}
 if(!best)return null;
 const c=SS.C[best.id],m2=best.mine.concat(best.id),lead=SS.calc(m2,g.o.b[best.li],best.li,g.p,g.o).tot-SS.calc(g.o.b[best.li],m2,best.li,g.o,g.p).tot,gl=SS.LOCS[best.li].n;
 const why={rex:(c.t==='iptek'||c.t==='modal')?'Gas! Koneksi dan modal itu bahan bakar ekspansi. Colok dunia!':'Batas negara itu tinggal garis di peta. Rebut peluangnya!',
  laras:(c.t==='budaya'||c.t==='kritik')?'Hmm, bagus. Jaga identitas, dan pertanyakan siapa yang diuntungkan Core.':'Hmm, perlu, supaya kita tidak ditindas Core. Tapi waspada ketergantungan.',
  bima:c.t==='adaptasi'?'Pelan-pelan ya. Serap yang global, rawat yang lokal.':'Coba ramu pelan-pelan, global dan lokal sama-sama dijaga.'}[k];
 best.txt=`${c.n} di ${gl} (aktif ${c.life} ronde). ${why} ${lead>0?'Unggul '+lead+'.':lead<0?'Tertinggal '+(-lead)+'.':'Imbang.'}`;
 return best};
SS.snap=g=>{g.a0={};Object.keys(SS.ADV).forEach(k=>g.a0[k]=SS.advise(g,k))};
SS.fb=(g,played)=>Object.keys(SS.ADV).map(k=>{const a=g.a0[k];if(!a)return{k,txt:'Tidak ada saran ronde ini.'};const h=played.find(x=>x.id===a.id);
 return{k,txt:h?(h.li===a.li?'Sejalan dengan saranku.':'Kartu tepat, tapi lokasinya beda; aku pilih '+SS.LOCS[a.li].n+'.'):'Aku akan pilih: '+a.txt}});
