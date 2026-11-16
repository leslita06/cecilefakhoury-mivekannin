(function(){
  var T={
    fr:{nav1:"L’exposition",nav2:"Œuvres",nav3:"Visiter",kick:"Exposition personnelle · Abidjan",dates:"5 novembre 2026 — 9 janvier 2027",cta:"Demander le dossier d’œuvres",see:"Voir les 14 œuvres",t1:"Texte de l’exposition",h2:"Les œuvres",h2s:"Quatorze peintures, acrylique sur velours libre noir, 2026.",price:"Prix sur demande",askone:"Demander le dossier de cette œuvre",h3:"Visiter la galerie",v1:"Jusqu’au",v1d:"9 janvier 2027",addr:"Cocody, boulevard Latrille, entre la Sodemi et l’immeuble Carbone",paris:"Showroom, sur rendez-vous uniquement",foot:"Images et textes : Galerie Cécile Fakhoury, cecilefakhoury.com. Courtesy de l’artiste et de la Galerie Cécile Fakhoury.",fh:"Demander le dossier d’œuvres",fs:"Recevez les images, les dimensions et les prix des œuvres disponibles.",l1:"Nom et prénom",l2:"E-mail",l3:"Téléphone (facultatif)",l4:"Œuvre(s) qui vous intéressent",l5:"Message (facultatif)",all:"Toute l’exposition",send:"Envoyer la demande",demo:"Formulaire de démonstration : aucune donnée n’est envoyée.",ok1:"Merci.",ok2:"Dans la version en service, la galerie reçoit votre demande et vous envoie le dossier d’œuvres par e-mail.",close:"Fermer"},
    en:{nav1:"Exhibition",nav2:"Artworks",nav3:"Visit",kick:"Solo exhibition · Abidjan",dates:"5 November 2026 — 9 January 2027",cta:"Request the works portfolio",see:"See the 14 works",t1:"Exhibition text",h2:"Artworks",h2s:"Fourteen paintings, acrylic on free black velvet, 2026.",price:"Price on request",askone:"Request the file for this work",h3:"Visit the gallery",v1:"Until",v1d:"9 January 2027",addr:"Cocody, boulevard Latrille, between Sodemi and the Carbone building",paris:"Showroom, by appointment only",foot:"Images and texts: Galerie Cécile Fakhoury, cecilefakhoury.com. Courtesy of the artist and Galerie Cécile Fakhoury.",fh:"Request the works portfolio",fs:"Receive images, dimensions and prices of the available works.",l1:"Full name",l2:"Email",l3:"Phone (optional)",l4:"Work(s) of interest",l5:"Message (optional)",all:"The whole exhibition",send:"Send request",demo:"Demonstration form: no data is sent.",ok1:"Thank you.",ok2:"In the live version, the gallery receives your request and emails you the works portfolio.",close:"Close"}
  };
  var lang='fr';
  function setLang(l){
    lang=l;document.documentElement.lang=l;
    document.querySelectorAll('[data-k]').forEach(function(e){var v=T[l][e.getAttribute('data-k')];if(v)e.textContent=v;});
    document.querySelectorAll('[data-fr]').forEach(function(e){e.textContent=e.getAttribute('data-'+l);});
    document.querySelectorAll('[data-lang-block]').forEach(function(e){e.hidden=e.getAttribute('data-lang-block')!==l;});
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.lang===l);});
    try{localStorage.setItem('cf-lang',l)}catch(e){}
  }
  document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){setLang(b.dataset.lang)})});
  var q=(location.search.match(/lang=(fr|en)/)||[])[1];var s=null;try{s=localStorage.getItem('cf-lang')}catch(e){}
  if(q||s)setLang(q||s);

  // visionneuse
  var works=[].slice.call(document.querySelectorAll('.work')),lb=document.getElementById('lb'),cur=0;
  function show(i){cur=(i+works.length)%works.length;var w=works[cur];
    lb.querySelector('img').src=w.querySelector('img').src;lb.querySelector('img').alt=w.querySelector('img').alt;
    lb.querySelector('figcaption').innerHTML=w.querySelector('.w-title').innerHTML+'<br>'+w.querySelector('.w-med').textContent+' · '+w.querySelector('.w-dim').textContent;}
  function openLb(i){show(i);lb.hidden=false;document.body.style.overflow='hidden';}
  function closeLb(){lb.hidden=true;document.body.style.overflow='';}
  works.forEach(function(w,i){w.querySelector('.work-img').addEventListener('click',function(){openLb(i)});});
  lb.querySelector('.lb-x').addEventListener('click',closeLb);
  lb.querySelector('.lb-p').addEventListener('click',function(){show(cur-1)});
  lb.querySelector('.lb-n').addEventListener('click',function(){show(cur+1)});
  lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
  var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(cur+(d<0?1:-1));tx=null});

  // formulaire de démonstration
  var m=document.getElementById('form'),f=m.querySelector('form'),sel=f.querySelector('select');
  function openF(idx){m.hidden=false;document.body.style.overflow='hidden';m.querySelector('.f-body').hidden=false;m.querySelector('.f-ok').hidden=true;sel.selectedIndex=idx||0;setTimeout(function(){f.querySelector('input').focus()},50);}
  function closeF(){m.hidden=true;document.body.style.overflow='';}
  document.querySelectorAll('[data-open=form]').forEach(function(b){b.addEventListener('click',function(){openF(0)})});
  works.forEach(function(w,i){w.querySelector('.w-ask').addEventListener('click',function(){openF(i+1)})});
  m.querySelector('.m-x').addEventListener('click',closeF);
  m.querySelector('[data-close]').addEventListener('click',closeF);
  m.addEventListener('click',function(e){if(e.target===m)closeF()});
  f.addEventListener('submit',function(e){e.preventDefault();var ok=true;
    f.querySelectorAll('[required]').forEach(function(i){var v=i.value.trim();var bad=!v||(i.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));i.classList.toggle('err',bad);if(bad)ok=false;});
    if(!ok)return;f.reset();m.querySelector('.f-body').hidden=true;m.querySelector('.f-ok').hidden=false;});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeLb();closeF();}if(!lb.hidden){if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1);}});
})();
