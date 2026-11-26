var SS={};
SS.T={iptek:['IPTEK','#38bdf8'],modal:['Modal','#fbbf24'],budaya:['Budaya','#fb7185'],adaptasi:['Adaptasi','#34d399'],kritik:['Kritik','#a78bfa']};
SS.LOCS=[
{n:'Core',s:'Negara maju',c:'#fbbf24',types:['iptek','modal'],v:1,txt:'IPTEK & Modal +1',th:'Core: pusat modal, teknologi, dan keputusan ekonomi dunia.'},
{n:'Semi-Periphery',s:'Negara berkembang',c:'#a78bfa',types:['adaptasi'],v:2,txt:'Adaptasi +2',th:'Semi-Periphery: perantara yang meniru Core sekaligus memimpin Periphery.'},
{n:'Periphery',s:'Negara pinggiran',c:'#34d399',types:['budaya','kritik'],v:1,txt:'Budaya & Kritik +1',th:'Periphery: pemasok bahan mentah, rentan bergantung pada Core.'}];
SS.ADV={
rex:{n:'KIRA NOVA',r:'Hiperglobalis',c:'#22d3ee',q:'Gas! Dunia itu satu jaringan, tinggal colok!',pr:'Founder startup 27 tahun, nomaden digital. Percaya teknologi dan pasar bebas memperkecil dunia.',d:'Globalisasi menghubungkan dunia: batas negara memudar, perdagangan bebas dan teknologi membuka peluang. Sarannya: konek, inovasi, ekspansi.',vo:{p:1.05,r:.98,g:'f'},st:{w:'Yes! Koneksi kita makin luas!',l:'Santai, itu cuma bug. Kita patch di ronde depan!',t:'Imbang. Waktunya scale up!'},f:{w:'Dunia terbuka lebar, kamu menang! Gas terus!',l:'Kalah sekali, belajar seribu kali. Besok kita coba lagi!',t:'Seri! Dua-duanya sama kuat.'}},
laras:{n:'PAK DARMA',r:'Skeptis',c:'#fb923c',q:'Hmm... siapa yang sebenarnya untung?',pr:'Dosen ekonomi politik 60 tahun. Sudah lama mengamati ketimpangan Core dan Periphery.',d:'Menyoroti ketimpangan: Core mendominasi, Periphery bergantung (neokolonialisme ekonomi), westernisasi dan cultural lag mengancam budaya lokal. Sarannya: kritis pada risiko.',vo:{p:.92,r:.9,g:'m'},st:{w:'Bagus. Tapi jangan lengah, Nak.',l:'Nah, begitulah yang sering terjadi pada yang lemah. Catat baik-baik.',t:'Seri... dunia memang jarang adil.'},f:{w:'Kamu menang. Ingat, kemenangan tanpa kritik mudah jadi ketergantungan.',l:'Kalah. Ini pelajaran tentang dominasi, bukan akhir cerita.',t:'Seri. Timpang pun tidak, menarik.'}},
bima:{n:'SEKAR',r:'Transformasionalis',c:'#4ade80',q:'Pelan-pelan, kita ramu yang baik dari mana saja.',pr:'Perajin batik dan pegiat budaya 35 tahun. Memadukan teknologi global dengan akar lokal.',d:'Globalisasi adalah perubahan kompleks. Jawabannya adaptasi selektif (glokalisasi): padukan IPTEK global dengan identitas dan kebutuhan Nusantara.',vo:{p:1,r:.93,g:'f'},st:{w:'Alhamdulillah, ramuannya pas ya.',l:'Tidak apa-apa. Kita ubah racikannya pelan-pelan.',t:'Seimbang. Itu juga hasil yang baik.'},f:{w:'Selamat! Kamu pandai memilih yang global dan menjaga yang lokal.',l:'Belum menang, tapi kamu sudah belajar meramu. Coba lagi ya.',t:'Seri. Seimbang, seperti glokalisasi.'}}};
SS.CAP=6;
SS.CARDS=[
['Satelit','iptek',1,1,{k:'adj',v:1},'Kartu lain di sini +1','Teknologi komunikasi memadatkan ruang dan waktu.',3],
['Internet','iptek',3,3,{k:'each',v:1},'+1 per kartu lain di sini','Jaringan global menghubungkan semua pihak.',2],
['Startup Digital','iptek',2,2,{k:'burst',v:4},'Debut: +4 di ronde pertama dipasang','Inovasi bisa melompati batas negara, tapi cepat redup.',3],
['Perdagangan Bebas','modal',2,2,{k:'loc',loc:0,v:3},'+3 di Core','Hiperglobalis: pasar bebas menghapus batas.',3],
['Multinasional','modal',4,5,{k:'drain',v:2},'Total musuh di sini -2','Perusahaan lintas negara menguasai rantai pasok.',2],
['Pasar Bersama','modal',3,3,{k:'pair',v:2},'Sinergi: +2 jika ada kartu Modal lain di sini','Kerja sama regional memperluas pasar.',3],
['Neokolonialisme','modal',5,6,{k:'drain',v:3},'Total musuh di sini -3 (hanya 1 ronde)','Dominasi ekonomi tanpa penjajahan langsung.',1],
['Batik Nusantara','budaya',1,1,{k:'solo',v:3},'Sendirian di lokasi: +3','Budaya lokal bertahan sebagai identitas.',4],
['Kearifan Lokal','budaya',2,2,{k:'shield'},'Kebal efek kuras musuh di sini','Nilai lokal menjadi benteng identitas.',3],
['Gamelan Dunia','budaya',3,3,{k:'grow',v:1},'Tumbuh: +1 tiap ronde aktif','Budaya lokal makin dikenal di panggung global.',4],
['Westernisasi','budaya',3,4,{k:'drain',v:2},'Total musuh di sini -2','Gaya hidup Barat menggeser budaya lokal.',2],
['Glokalisasi','adaptasi',3,2,{k:'adj',v:2},'Kartu lain di sini +2','Menyerap yang global, menyesuaikan yang lokal.',3],
['Adaptasi Selektif','adaptasi',2,3,{k:'mimic'},'Meniru: kekuatan dasar = kartu terkuat lain di sini','Memilih unsur global yang sesuai kebutuhan.',3],
['Cultural Lag','kritik',2,1,{k:'last',v:5},'Efek tertunda: +5 di ronde terakhir aktif','Budaya non-material tertinggal dari teknologi.',3],
['Ketimpangan Global','kritik',4,5,{k:'scale',v:1},'Total musuh -1 tiap kartu musuh di sini','Kesenjangan antara Core dan Periphery.',2]
].map((a,i)=>({id:i,n:a[0],t:a[1],cost:a[2],p:a[3],fx:a[4],txt:a[5],th:a[6],life:a[7]}));
SS.QZ=[
[{q:'Dalam teori sistem dunia, negara maju yang menjadi pusat modal, teknologi, dan keputusan ekonomi dunia disebut ...',o:['Core','Semi-Periphery','Periphery'],a:0,e:'Core adalah pusat modal, teknologi, dan keputusan ekonomi dunia.'},
 {q:'Kaum hiperglobalis memandang globalisasi sebagai ...',o:['Proses yang memperkecil dunia: batas negara memudar karena pasar bebas dan teknologi','Ancaman tunggal yang harus dihentikan','Mitos yang tidak pernah terjadi'],a:0,e:'Hiperglobalis percaya pasar bebas dan teknologi membuat batas negara memudar.'},
 {q:'Siapa tokoh yang mengembangkan teori sistem dunia (world-system)?',o:['Immanuel Wallerstein','Auguste Comte','Emile Durkheim'],a:0,e:'Immanuel Wallerstein membagi dunia menjadi Core, Semi-Periphery, dan Periphery.'},
 {q:'Contoh peran negara Core dalam ekonomi dunia adalah ...',o:['Pusat inovasi teknologi dan pemilik modal besar','Hanya memasok bahan mentah murah','Tidak terhubung dengan perdagangan global'],a:0,e:'Core unggul pada teknologi, modal, dan pengambilan keputusan ekonomi.'}],
[{q:'Negara berkembang yang meniru Core sekaligus memimpin Periphery berada di zona ...',o:['Semi-Periphery','Core','Periphery'],a:0,e:'Semi-Periphery adalah perantara antara Core dan Periphery.'},
 {q:'Glokalisasi berarti ...',o:['Menyerap unsur global lalu menyesuaikannya dengan budaya dan kebutuhan lokal','Menolak semua pengaruh global','Meniru budaya asing sepenuhnya'],a:0,e:'Glokalisasi memadukan yang global dengan yang lokal.'},
 {q:'Kaum transformasionalis melihat globalisasi sebagai ...',o:['Perubahan kompleks yang dijawab dengan adaptasi selektif','Proses yang menyatukan dunia tanpa masalah','Penjajahan gaya baru semata'],a:0,e:'Transformasionalis menekankan perubahan yang rumit dan adaptasi selektif.'},
 {q:'Mana contoh adaptasi selektif?',o:['Memakai teknologi global sambil tetap menjaga batik dan nilai lokal','Menolak semua teknologi asing','Meninggalkan seluruh budaya lokal'],a:0,e:'Adaptasi selektif: memilih unsur global yang sesuai, menjaga identitas.'}],
[{q:'Negara pinggiran pemasok bahan mentah yang bergantung pada Core disebut ...',o:['Periphery','Core','Semi-Periphery'],a:0,e:'Periphery rentan bergantung pada Core.'},
 {q:'Neokolonialisme adalah ...',o:['Dominasi ekonomi dan politik tanpa penjajahan langsung','Penjajahan militer secara terbuka','Kerja sama setara antar negara'],a:0,e:'Neokolonialisme menguasai lewat ekonomi, bukan pendudukan langsung.'},
 {q:'Cultural lag (William Ogburn) adalah ...',o:['Budaya non-material tertinggal dari kemajuan teknologi','Teknologi tertinggal dari budaya','Budaya dan teknologi selalu berkembang seimbang'],a:0,e:'Cultural lag: nilai dan norma lambat menyesuaikan diri dengan teknologi.'},
 {q:'Kaum skeptis menyoroti bahwa globalisasi ...',o:['Memperlebar ketimpangan antara Core dan Periphery','Membuat semua negara setara','Tidak berpengaruh pada ekonomi'],a:0,e:'Skeptis kritis pada ketimpangan dan dominasi Core.'}]];
