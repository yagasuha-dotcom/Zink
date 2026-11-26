SS.Art=(function(){
/* ---------- helpers ---------- */
const lg=(id,a,b,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const rg=(id,a,b,cx=.5,cy=.4,r=.7)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></radialGradient>`;
/* mata semi-realistis: putih mata, iris berlapis, kelopak, kilau */
const eye=(x,y,iris,lash=0,s=1)=>`<g class="bl"><path d="M${x-4.2*s} ${y}Q${x} ${y-3.6*s} ${x+4.2*s} ${y}Q${x} ${y+3*s} ${x-4.2*s} ${y}Z" fill="#fff"/><circle cx="${x}" cy="${y-.1}" r="${2.3*s}" fill="${iris}"/><circle cx="${x}" cy="${y-.1}" r="${1.2*s}" fill="#0b0b14"/><circle cx="${x+.8}" cy="${y-1}" r=".75" fill="#fff"/><path d="M${x-4.4*s} ${y+.1}Q${x} ${y-4*s} ${x+4.4*s} ${y+.1}" fill="none" stroke="#1b1230" stroke-width="${lash?1.4:1.1}" stroke-linecap="round"/>${lash?`<path d="M${x+4.2*s} ${y}l1.6-1.4" stroke="#1b1230" stroke-width="1" stroke-linecap="round"/>`:''}</g>`;
const brow=(x,y,w,c,t=1.6,tilt=0)=>`<path d="M${x-w} ${y+tilt}Q${x} ${y-1.8} ${x+w} ${y-tilt}" fill="none" stroke="${c}" stroke-width="${t}" stroke-linecap="round"/>`;
const face=(sk,sh,w=1)=>`<path d="M43 60V78Q50 84 57 78V60Z" fill="${sh}"/><ellipse cx="${50-17.5*w}" cy="46" rx="2.8" ry="4.4" fill="${sk}"/><ellipse cx="${50+17.5*w}" cy="46" rx="2.8" ry="4.4" fill="${sk}"/><path d="M${50-16.5*w} 40Q${50-16.5*w} 21 50 21Q${50+16.5*w} 21 ${50+16.5*w} 40Q${50+16.5*w} 55 ${50+9*w} 62Q50 67.5 ${50-9*w} 62Q${50-16.5*w} 55 ${50-16.5*w} 40Z" fill="${sk}"/><path d="M43 62Q50 68 57 62Q50 71 43 62Z" fill="${sh}" opacity=".35"/>`;
const nose=c=>`<path d="M49.4 47.5Q47.8 53 50 54.2Q51.6 54.2 51.4 53" fill="none" stroke="${c}" stroke-width="1.1" stroke-linecap="round" opacity=".55"/>`;
const blush=c=>`<circle cx="39.5" cy="54" r="4" fill="${c}" opacity=".28"/><circle cx="60.5" cy="54" r="4" fill="${c}" opacity=".28"/>`;
const bg=(id,a,b,deco='')=>`<defs>${lg('bg'+id,a,b,.3,1)}</defs><rect width="100" height="100" fill="url(#bg${id})"/><circle cx="82" cy="18" r="34" fill="#fff" opacity=".12"/><circle cx="14" cy="86" r="26" fill="#000" opacity=".1"/>${deco}`;
const wrap=(id,a,b,body,deco)=>`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${bg(id,a,b,deco)}<g>${body}</g></svg>`;

/* ---------- KIRA NOVA: founder startup, hiperglobalis ---------- */
const kira=wrap('kira','#22d3ee','#4338ca',`
<defs>${lg('kh','#8b5cf6','#3b1d8f',.2,1)}${lg('kj','#1e293b','#0b1020')}${lg('ks','#f6d3b8','#e8b998')}${lg('kc','#ffffff','#bcd0f5')}</defs>
<g class="fl">
<path d="M30 40Q26 62 34 72L40 66 38 44Z" fill="url(#kh)"/><path d="M70 40Q74 62 66 72L60 66 62 44Z" fill="url(#kh)"/>
<path d="M6 100Q8 82 33 76L50 87 67 76Q92 82 94 100Z" fill="url(#kj)"/>
<path d="M40 77L50 92 60 77" fill="#e8f1ff"/><path d="M50 87V100" stroke="#22d3ee" stroke-width="1.4"/><path d="M33 76Q40 80 50 90" stroke="#38bdf8" stroke-width="1.2" fill="none" opacity=".8"/><path d="M67 76Q60 80 50 90" stroke="#38bdf8" stroke-width="1.2" fill="none" opacity=".8"/>
${face('url(#ks)','#d9a888')}
<path d="M33 42Q31 20 50 18.5Q69 20 67 42Q66 31 56 27Q43 26 36 35Z" fill="url(#kh)"/><path d="M36 35Q46 27 58 28" stroke="#c4b5fd" stroke-width="1.4" fill="none" opacity=".7" stroke-linecap="round"/><path d="M33 42Q33 36 36 35Q34 40 35 46Z" fill="#5b2fc7"/>
${brow(43,39.6,4.4,'#2a1650',1.5,.4)}${brow(57,39.6,4.4,'#2a1650',1.5,-.4)}
${eye(43,45.5,'#0891b2',1)}${eye(57,45.5,'#0891b2',1)}${nose('#a8715a')}${blush('#fb7185')}
<path d="M44.5 58.4Q50 62.8 55.5 58.4Q50 60 44.5 58.4Z" fill="#b4375a"/><path d="M44.5 58.4Q50 62.8 55.5 58.4" stroke="#8f2447" stroke-width=".8" fill="none" stroke-linecap="round"/><path d="M46.5 60.2Q50 62 53.5 60.2" stroke="#fff" stroke-width=".9" fill="none" opacity=".55" stroke-linecap="round"/>
<path d="M30.5 46Q29 10 50 10.5Q71 10 69.5 46" fill="none" stroke="url(#kc)" stroke-width="3.2" stroke-linecap="round"/>
<rect x="26" y="38" width="8" height="17" rx="4" fill="url(#kc)"/><rect x="66" y="38" width="8" height="17" rx="4" fill="url(#kc)"/>
<rect x="28.2" y="41" width="3.6" height="11" rx="1.8" fill="#0e7490"/><rect x="68.2" y="41" width="3.6" height="11" rx="1.8" fill="#0e7490"/>
<rect class="gl" x="29" y="43" width="2" height="7" rx="1" fill="#67e8f9"/><rect class="gl" x="69" y="43" width="2" height="7" rx="1" fill="#67e8f9"/>
<path d="M30 53Q32 63 44 63" fill="none" stroke="#e2ebff" stroke-width="1.4" stroke-linecap="round"/><circle class="gl" cx="45" cy="63" r="2" fill="#22d3ee"/>
</g>`,`<g fill="#fff" opacity=".22"><circle cx="12" cy="14" r="1.3"/><circle cx="22" cy="14" r="1.3"/><circle cx="32" cy="14" r="1.3"/><circle cx="12" cy="24" r="1.3"/><circle cx="22" cy="24" r="1.3"/><circle cx="32" cy="24" r="1.3"/></g>`);

/* ---------- PAK DARMA: dosen, skeptis ---------- */
const darma=wrap('darma','#fbbf6a','#9a3412',`
<defs>${lg('ds','#c98d62','#a66c45')}${lg('db','#7c2d12','#431407')}${lg('dp','#2b2b33','#0d0d12')}</defs>
<g class="fl">
<path d="M5 100Q8 82 32 76L50 88 68 76Q92 82 95 100Z" fill="url(#db)"/>
<g opacity=".5" fill="#fcd34d"><path d="M16 94l3-4 3 4-3 4zM78 94l3-4 3 4-3 4zM27 85l2.5-3 2.5 3-2.5 3zM68 85l2.5-3 2.5 3-2.5 3zM48 98l2-3 2 3-2 3z"/></g>
<path d="M39 77L50 94 61 77Z" fill="#fef3c7"/><path d="M39 77L50 94M61 77L50 94" stroke="#d97706" stroke-width="1.2"/>
${face('url(#ds)','#8c5733',1.06)}
<path d="M32.5 44Q31 30 36 26L38 30Q34 36 35.5 48Z" fill="#cfd2d8"/><path d="M67.5 44Q69 30 64 26L62 30Q66 36 64.5 48Z" fill="#cfd2d8"/>
<path d="M36 33Q50 27 64 33" stroke="#7a4a2c" stroke-width=".8" fill="none" opacity=".3"/><path d="M38 29.5Q50 25.5 62 29.5" stroke="#7a4a2c" stroke-width=".8" fill="none" opacity=".25"/>
<path d="M31 25Q50 15 69 25L67 14Q50 8 33 14Z" fill="url(#dp)"/><rect x="31" y="22.5" width="38" height="3.2" rx="1.6" fill="#f2c14e"/>
${brow(43,40.2,5,'#d4d6db',2)}${brow(57,40.2,5,'#d4d6db',2)}
${eye(43,45.5,'#3b2414',0,.95)}${eye(57,45.5,'#3b2414',0,.95)}
<path d="M38.5 49.5Q43 51.5 47.5 49.5M52.5 49.5Q57 51.5 61.5 49.5" stroke="#7a4a2c" stroke-width=".8" fill="none" opacity=".4"/><path d="M33.5 44.5l-2-1M66.5 44.5l2-1" stroke="#7a4a2c" stroke-width=".8" opacity=".5" stroke-linecap="round"/>
${nose('#6b3f22')}
<path d="M42.5 56.5Q50 53.5 57.5 56.5Q54 59.2 50 57.8Q46 59.2 42.5 56.5Z" fill="#d7d9de"/>
<path d="M46 61Q50 63.4 54 61" stroke="#6b2d22" stroke-width="1.3" fill="none" stroke-linecap="round"/>
<circle cx="43" cy="45.5" r="7.2" fill="#fff" fill-opacity=".1" stroke="#d4a537" stroke-width="1.2"/><circle cx="57" cy="45.5" r="7.2" fill="#fff" fill-opacity=".1" stroke="#d4a537" stroke-width="1.2"/><path d="M50.2 45Q50 44 49.8 45" stroke="#d4a537" stroke-width="1.2" fill="none"/><path d="M35.8 44.5L33 43.5M64.2 44.5L67 43.5" stroke="#d4a537" stroke-width="1.1" stroke-linecap="round"/>
<path d="M38 41.5Q41 40 44 41" stroke="#fff" stroke-width="1" fill="none" opacity=".4" stroke-linecap="round"/>
</g>`,`<g fill="none" stroke="#fff" opacity=".16" stroke-width="1.2"><circle cx="82" cy="18" r="12"/><circle cx="82" cy="18" r="20"/></g>`);

/* ---------- SEKAR: perajin batik, transformasionalis ---------- */
const sekar=wrap('sekar','#5eead4','#15803d',`
<defs>${lg('ss','#e8b48a','#cf966d')}${lg('sh','#3a2218','#150b07',.3,1)}${lg('sk2','#16a34a','#064e3b')}${lg('sb','#fde68a','#f59e0b')}</defs>
<g class="fl">
<circle cx="50" cy="13" r="10.5" fill="url(#sh)"/><ellipse cx="50" cy="19.5" rx="7" ry="2.2" fill="#fff" opacity=".1"/>
<path d="M31 42Q29 62 36 72L42 64 37 44Z" fill="url(#sh)" opacity=".0"/>
<path d="M5 100Q8 82 31 76L50 88 69 76Q92 82 95 100Z" fill="url(#sk2)"/>
<path d="M29 77Q22 90 24 100H44Q38 90 40 80Z" fill="#7c2d12"/><path d="M29 77Q22 90 24 100H36Q31 90 33 79Z" fill="#9a3412"/>
<g stroke="#fcd34d" stroke-width="1" fill="none" opacity=".75"><path d="M26 86l3 3-3 3-3-3zM30 94l2.5 2.5L30 99l-2.5-2.5z"/></g>
<path d="M41 77L50 90 59 77" fill="#fef3c7" opacity=".0"/><path d="M38 77Q50 92 62 77" stroke="#fde68a" stroke-width="2.2" fill="none" stroke-linecap="round"/>
<circle cx="50" cy="90" r="2.4" fill="url(#sb)"/>
${face('url(#ss)','#bd8059')}
<path d="M32.5 44Q30 16 50 17Q70 16 67.5 44Q65 28 50 27Q35 28 32.5 44Z" fill="url(#sh)"/><path d="M50 17Q42 21 36 33" stroke="#fff" stroke-width="1" fill="none" opacity=".18" stroke-linecap="round"/>
<circle cx="36.5" cy="12" r="3.2" fill="#fb7185"/><circle cx="36.5" cy="12" r="1.2" fill="#fde68a"/><path d="M33 14.5Q30 17 32 19" stroke="#16a34a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
${brow(43,39.8,4.2,'#2a1810',1.4,.3)}${brow(57,39.8,4.2,'#2a1810',1.4,-.3)}
${eye(43,45.5,'#4a2c18',1)}${eye(57,45.5,'#4a2c18',1)}${nose('#9a6240')}${blush('#f43f5e')}
<path d="M44 58.2Q50 64 56 58.2Q50 60.4 44 58.2Z" fill="#b83a52"/><path d="M44 58.2Q50 64 56 58.2" stroke="#8c2640" stroke-width=".8" fill="none" stroke-linecap="round"/><path d="M45.8 59.8Q50 62.2 54.2 59.8" fill="#fff" opacity=".85"/>
<circle cx="31.8" cy="52" r="1.8" fill="url(#sb)"/><circle cx="68.2" cy="52" r="1.8" fill="url(#sb)"/>
</g>`,`<g fill="#fff" opacity=".18"><path d="M10 30Q22 22 30 34Q18 40 10 30Z"/><path d="M70 82Q84 72 92 86Q78 94 70 82Z"/></g>`);

/* ---------- HEGEMON AI: lawan ---------- */
const opp=wrap('opp','#a78bfa','#312e81',`
<defs>${lg('om','#e5e7ef','#8b90a8')}${lg('ov','#0b0b1c','#1e1b4b')}${lg('oa','#4c1d95','#1e1b4b')}</defs>
<g class="fl">
<path d="M5 100Q8 80 30 75L50 84 70 75Q92 80 95 100Z" fill="url(#oa)"/><path d="M30 75L50 84 70 75" stroke="#f0abfc" stroke-width="1.4" fill="none"/><path d="M16 96Q22 84 34 80M84 96Q78 84 66 80" stroke="#c084fc" stroke-width="1.2" fill="none" opacity=".7"/>
<rect x="43" y="62" width="14" height="16" rx="3" fill="#6b6f8a"/><path d="M43 68h14M43 72h14" stroke="#3f4261" stroke-width="1"/>
<path d="M30 30L36 12 43 24 50 8 57 24 64 12 70 30Z" fill="#fbbf24"/><path d="M30 30H70" stroke="#b45309" stroke-width="1.6"/>
<rect x="28" y="28" width="44" height="38" rx="16" fill="url(#om)"/><path d="M34 33Q50 28 66 33" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7" stroke-linecap="round"/>
<rect x="33" y="39" width="34" height="14" rx="7" fill="url(#ov)"/>
<rect class="gl" x="37" y="44.2" width="26" height="3.6" rx="1.8" fill="#f43f5e"/><rect x="37" y="44.2" width="26" height="3.6" rx="1.8" fill="#fb7185" opacity=".6"/>
<path d="M42 59h16" stroke="#6b6f8a" stroke-width="1.8" stroke-linecap="round"/><path d="M28 46h-3M72 46h3" stroke="#6b6f8a" stroke-width="3" stroke-linecap="round"/>
</g>`,`<g stroke="#fff" opacity=".12" stroke-width=".8" fill="none"><path d="M0 30H100M0 50H100M0 70H100M30 0V100M60 0V100"/></g>`);

/* ---------- KAMU: pemain ---------- */
const me=wrap('me','#fde047','#ea580c',`
<defs>${lg('ms','#f3cdb0','#e2ae8c')}${lg('mh','#2b1b14','#0f0a07',.3,1)}${lg('mj','#2563eb','#1e3a8a')}</defs>
<g class="fl">
<path d="M5 100Q8 82 32 76L50 86 68 76Q92 82 95 100Z" fill="url(#mj)"/><path d="M40 77L50 92 60 77Z" fill="#f8fafc"/><path d="M33 76L50 100M67 76L50 100" stroke="#93c5fd" stroke-width="1.2" opacity=".7"/>
${face('url(#ms)','#cf9d7b')}
<path d="M33 40Q30 18 50 17.5Q70 18 67 40Q66 30 60 26Q54 31 44 30Q37 31 33 40Z" fill="url(#mh)"/><path d="M40 24Q50 19 60 24" stroke="#fff" stroke-width="1" fill="none" opacity=".18" stroke-linecap="round"/>
<path d="M30 28Q50 18 70 28" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".0"/>
${brow(43,40,4.2,'#20130c',1.5,.3)}${brow(57,40,4.2,'#20130c',1.5,-.3)}
${eye(43,45.5,'#3b2a1e')}${eye(57,45.5,'#3b2a1e')}${nose('#b27a58')}${blush('#fb7185')}
<path d="M44 58Q50 63.4 56 58Q50 60 44 58Z" fill="#fff" stroke="#9a4a3a" stroke-width=".9" stroke-linejoin="round"/>
</g>`,`<g fill="#fff" opacity=".2"><circle cx="16" cy="20" r="2"/><circle cx="26" cy="12" r="1.2"/><circle cx="88" cy="70" r="1.6"/></g>`);

const A={rex:kira,laras:darma,bima:sekar,opp,me};

/* ---------- ikon garis (menggantikan emoji) ---------- */
const ic=(p,f)=>`<svg class="ic" viewBox="0 0 24 24" fill="${f||'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const I={
clock:ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
swords:ic('<path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/><path d="M19 21l2-2"/><path d="M14.5 6.5 18 3h3v3l-3.5 3.5"/><path d="M5 14l4 4"/><path d="M7 17l-3 3"/><path d="M3 19l2 2"/>'),
target:ic('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>'),
book:ic('<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>'),
sndOn:ic('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>'),
sndOff:ic('<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M22 9l-6 6M16 9l6 6"/>'),
voiceOn:ic('<path d="M3 10v4M7.5 6v12M12 3v18M16.5 7v10M21 10v4"/>'),
voiceOff:ic('<path d="M3 10v4M7.5 6v12M12 3v18M16.5 7v10M21 10v4" opacity=".4"/><path d="M3 3l18 18"/>'),
menu:ic('<path d="M4 7h16M4 12h16M4 17h16"/>'),
cards:ic('<rect x="3" y="6" width="12" height="15" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>'),
play:ic('<path d="M7 4.5v15l12-7.5z"/>','currentColor'),
swap:ic('<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>'),
star:ic('<path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/>','currentColor'),
x:ic('<path d="M18 6 6 18M6 6l12 12"/>'),
bolt:ic('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>','currentColor'),
check:ic('<path d="M20 6 9 17l-5-5"/>'),
mic:ic('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4"/>'),
chev:ic('<path d="m9 6 6 6-6 6"/>')};

return{farm:()=>'',adv:k=>A[k].replace("<svg",'<svg class="ap"'),opp:()=>A.opp,me:()=>A.me,I,
card:c=>`<img src="assets/c${c.id}.jpg" alt="${c.n}" draggable="false">`}})();
