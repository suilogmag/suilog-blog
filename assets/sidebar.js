/* PC sidebar for posts / profile / privacy (hidden on mobile via CSS) */
(function(){
  var main=document.querySelector("main[data-side]");if(!main)return;
  var wrap=main.querySelector(".wrap");if(!wrap)return;
  var pre=/\/(posts|category|tag|archive)\//.test(location.pathname)?"../":"";
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  var cats=[["機能不全家族","dysfunctional-family"],["夜職と昼職","night-and-day-jobs"],["人間関係","relationships"],["妊活・不妊治療","fertility-treatment"],["妊娠・出産","pregnancy-birth"],["ステップファミリー","stepfamily"],["子育て","parenting"],["健康管理","health"],["家計管理","household-budget"],["日常vlog","daily-vlog"],["そのほか","others"]];
  var tags=[["毒親サバイバー","toxic-parents-survivor"],["DV","dv"],["夜職","night-work"],["キャバ嬢","hostess"],["フレネミー","frenemy"],["借金","debt"],["不妊治療","infertility-treatment"],["体外受精","ivf"],["子宮外妊娠","ectopic-pregnancy"],["採卵","egg-retrieval"],["ステップファミリー","stepfamily"],["未婚シングル","single-mother"],["養育費","child-support"]];
  var sns=[["fa-brands fa-x-twitter","X","https://x.com/suilog_mag"],["fa-brands fa-instagram","Instagram","https://www.instagram.com/suilog_3tm/"],["fa-brands fa-tiktok","TikTok","https://www.tiktok.com/@suilog_mag"],["ico ico-room","ROOM","https://room.rakuten.co.jp/suilog_mag/"],["ico ico-line","公式LINE","https://lin.ee/9OKmAWb"],["fa-brands fa-pinterest-p","Pinterest","https://pin.it/4FHcxBgEQ"],["fa-brands fa-youtube","YouTube","https://youtube.com/@suilog_mag"],["fa-brands fa-amazon","Amazon","https://www.amazon.co.jp/hz/wishlist/ls/6S7SB8APK0S5?ref_=wl_share"],["fa-regular fa-envelope","お問い合わせ",pre+"contact.html"]];

  // wrap existing content, add aside
  var inner=document.createElement("div");inner.className="side-main";
  while(wrap.firstChild)inner.appendChild(wrap.firstChild);
  wrap.appendChild(inner);
  wrap.classList.add("has-side");
  var aside=document.createElement("aside");aside.className="side-col";aside.setAttribute("aria-label","サイドバー");
  wrap.appendChild(aside);

  var h='';
  h+='<form class="sd-search" action="'+pre+'index.html" method="get"><input type="text" name="q" placeholder="検索" aria-label="キーワード検索"><button type="submit" aria-label="検索"><i class="fa-solid fa-magnifying-glass"></i></button></form>';
  h+='<div class="sd-profile"><img class="sd-photo" src="'+pre+'assets/profile-photo.png" alt="スイ"><p class="sd-name">スイ</p><p class="sd-bio">毒親育ちの未婚シングルマザーが、ステップファミリーを経て、幸せになる話を綴っています。</p><a class="sd-btn" href="'+pre+'profile.html">詳しいプロフィールはこちら</a><div class="sd-sns">'+sns.map(function(c){var ex=c[2].indexOf("http")===0?' target="_blank" rel="noopener"':'';return '<a href="'+c[2]+'"'+ex+' aria-label="'+c[1]+'"><i class="'+c[0]+'"></i></a>';}).join("")+'</div></div>';
  h+='<div class="sd-box"><p class="sd-title">応援ありがとうございます！</p><a class="sd-pill" href="https://room.rakuten.co.jp/suilog_mag/" target="_blank" rel="noopener"><i class="ico ico-room"></i>楽天ROOM</a><a class="sd-pill" href="https://www.amazon.co.jp/hz/wishlist/ls/6S7SB8APK0S5?ref_=wl_share" target="_blank" rel="noopener"><i class="fa-brands fa-amazon"></i>ほしいものリスト</a></div>';
  h+='<div class="sd-box" id="sd-pop"><p class="sd-title">人気記事</p><div class="sd-pop"></div></div>';
  h+='<div class="sd-box"><p class="sd-title">キーワード</p><div class="sd-tags">'+tags.map(function(t){return '<a href="'+pre+'tag/'+t[1]+'.html">'+esc(t[0])+'</a>';}).join("")+'</div></div>';
  h+='<div class="sd-box"><p class="sd-title">アーカイブ</p><select class="sd-arch" aria-label="月を選択"><option value="">月を選択</option><option value="'+pre+'archive/2026-05.html">2026年5月</option></select></div>';
  h+='<div class="sd-box" id="sd-cat"><p class="sd-title">カテゴリー</p><ul class="sd-cats">'+cats.map(function(c){return '<li><a href="'+pre+'category/'+c[1]+'.html"><i class="fa-solid fa-folder"></i>'+esc(c[0])+' <span data-cat="'+esc(c[0])+'"></span></a></li>';}).join("")+'</ul></div>';
  h+='<div class="sd-sticky"><div class="sd-box" id="sd-toc" hidden><p class="sd-title">目次</p><ul class="sd-toc"></ul></div><a class="sd-top" href="#" id="sd-top"><i class="fa-solid fa-house"></i>トップへ戻る<i class="fa-solid fa-arrow-right-long"></i></a></div>';
  aside.innerHTML=h;

  aside.querySelector(".sd-arch").addEventListener("change",function(){if(this.value)location.href=this.value;});
  aside.querySelector("#sd-top").addEventListener("click",function(e){e.preventDefault();window.scrollTo({top:0,behavior:"smooth"});});

  // TOC from headings
  var scope=inner.querySelector("article .body")||inner.querySelector(".page")||inner;
  var hs=scope.querySelectorAll("h2, h3");
  if(hs.length){
    var ul=aside.querySelector(".sd-toc"),out="",n=0;
    Array.prototype.forEach.call(hs,function(el){
      if(el.closest(".bubble,.cta-box,.share"))return;
      if(!el.id){n++;el.id="sd-h"+n;}
      out+='<li class="'+(el.tagName==="H3"?"sub":"")+'"><a href="#'+el.id+'">'+esc(el.textContent.trim())+'</a></li>';
    });
    if(out){ul.innerHTML=out;var tb=aside.querySelector("#sd-toc");tb.hidden=false;if(ul.children.length>12)tb.classList.add("compact");}
  }

  // popular + category counts from search index
  fetch(pre+"assets/search-index.json").then(function(r){return r.json();}).then(function(d){
    var counts={};d.forEach(function(p){counts[p.category]=(counts[p.category]||0)+1;});
    Array.prototype.forEach.call(aside.querySelectorAll("[data-cat]"),function(s){s.textContent="（"+(counts[s.getAttribute("data-cat")]||0)+"）";});
    var box=aside.querySelector(".sd-pop");
    box.innerHTML=d.slice(0,5).map(function(p,i){return '<a href="'+pre+p.url+'"><span class="th"><img src="'+pre+'assets/thumb-001.jpg" alt=""><b>'+(i+1)+'</b></span><span class="tt">'+esc(p.title)+'</span></a>';}).join("");
  }).catch(function(){var b=aside.querySelector("#sd-pop");if(b)b.hidden=true;});
})();
