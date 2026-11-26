SS.UI.init();
/* fit: HP portrait mengisi layar; layar lebar/landscape memakai bingkai 430x820 yang diskalakan menyesuaikan tinggi layar */
(function(){const R=document.documentElement,app=()=>document.getElementById('app');
function fit(){const a=app();if(!a)return;const W=innerWidth,H=innerHeight,card=W>520||W/H>.75;
 R.classList.toggle('fit',card);R.classList.toggle('land',card&&W>H);
 if(card){const pad=W>H&&H<500?6:32,z=Math.max(.5,Math.min(1.5,(H-pad)/820,(W-pad)/430));
  a.style.zoom=z;a.style.width='';a.style.height=''}
 else{const z=Math.min(1,H/680);a.style.zoom=z<1?z:'';a.style.height=z<1?(H/z)+'px':'';a.style.width=z<1?Math.min(480,W/z)+'px':''}}
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,200));fit()})();
