(function(){
  var pre=/\/(posts|category|tag|archive)\//.test(location.pathname)?"../":"";
  var cats=[["機能不全家族","fa-house-crack","dysfunctional-family"],["夜職と昼職","fa-moon","night-and-day-jobs"],["人間関係","fa-user-group","relationships"],["妊活・不妊治療","fa-seedling","fertility-treatment"],["妊娠・出産","fa-baby","pregnancy-birth"],["ステップファミリー","fa-mug-hot","stepfamily"],["子育て","fa-face-smile","parenting"],["健康管理","fa-heart-pulse","health"],["家計管理","fa-wallet","household-budget"],["日常vlog","fa-camera","daily-vlog"],["そのほか","fa-pen","others"]];
  var menu=[["ホーム","HOME",pre+"index.html"],["ノート","NOTE.COM","https://note.com/suilog_mag"],["プロフィール","PROFILE",pre+"profile.html"],["お問い合わせ","CONTACT",pre+"contact.html"]];
  var sns=[["fa-brands fa-instagram","私の人生","https://www.instagram.com/suilog_3rd/"],["fa-brands fa-instagram","今の日常","https://www.instagram.com/suilog_3tm/"],["fa-brands fa-instagram","ゲーム","https://instagram.com/sui_gamelog"],["fa-brands fa-tiktok","今の日常","https://www.tiktok.com/@suilog_mag"],["fa-brands fa-tiktok","ゲーム","https://www.tiktok.com/@sui_gamelog"],["ico ico-note","note","https://note.com/suilog_mag/membership"],["fa-brands fa-youtube","今の日常","https://youtube.com/@suilog_mag"],["fa-brands fa-youtube","ゲーム","https://youtube.com/@sui_gamelog"],["ico ico-radio","ラジオ","https://stand.fm/channels/68070aba2169b1fe6124266f"],["fa-brands fa-pinterest-p","Pinterest","https://pin.it/4FHcxBgEQ"],["fa-brands fa-amazon","欲しい物","https://www.amazon.co.jp/hz/wishlist/ls/6S7SB8APK0S5?ref_=wl_share"],["ico ico-room","ROOM","https://room.rakuten.co.jp/suilog_mag/"]];
  var pop=[["横断歩道で3回轢かれた話。両親はなぜか大喜びしていた。","posts/kega-3kai.html"],["禁煙外来の薬、不味すぎない？現役キャバ嬢で禁煙した話。","posts/kinen-gaikou.html"]];
  var h='<div class="bg"></div><div class="panel"><button class="close" type="button" aria-label="閉じる"><i class="fa-solid fa-xmark"></i></button>';
  h+='<p class="sec">メニュー</p>'+menu.map(function(m){return '<a class="mi" href="'+m[2]+'"><i class="fa-solid fa-chevron-right"></i>'+m[0]+' <small>'+m[1]+'</small></a>';}).join("");
  h+='<p class="sec">カテゴリ</p><div class="grid3">'+cats.map(function(c){return '<a href="'+pre+'category/'+c[2]+'.html"><i class="fa-solid '+c[1]+'"></i>'+c[0]+'</a>';}).join("")+'</div>';
  h+='<p class="sec">フォローしてね</p><div class="grid3">'+sns.map(function(c){return '<a href="'+c[2]+'"'+(c[2]!=="#"?' target="_blank" rel="noopener"':'')+'><i class="'+c[0]+'"></i>'+c[1]+'</a>';}).join("")+'</div>';
  h+='<a class="pill" href="https://marshmallow-qa.com/zpaymy4vzh4tpmq" target="_blank" rel="noopener">匿名質問箱（マシュマロ）</a><a class="pill" href="'+pre+'contact.html"><i class="fa-solid fa-envelope"></i>お問い合わせ</a>';
  h+='<p class="sec">人気記事</p><div class="pop">'+pop.map(function(p,i){return '<a href="'+pre+p[1]+'"><div class="th"><img src="'+pre+'assets/thumb-001.jpg" alt=""><span class="rk">'+(i+1)+'</span></div>'+p[0]+'</a>';}).join("")+'</div>';
  h+='<p class="sec">アーカイブ</p><select id="hd-arch"><option>月を選択</option><option value="2026-05">2026年5月</option></select></div>';
  var d=document.createElement("div");d.className="hd-drawer";d.innerHTML=h;document.body.appendChild(d);
  function close(){d.classList.remove("is-open");}
  var b=document.getElementById("hd-menu-btn");
  if(b)b.addEventListener("click",function(){d.classList.add("is-open");});
  d.querySelector(".bg").addEventListener("click",close);
  d.querySelector(".close").addEventListener("click",close);
  d.querySelector("#hd-arch").addEventListener("change",function(){if(this.value)location.href=pre+"archive/"+this.value+".html";});
  // 検索ボタン: トップ上なら検索欄へスクロール＆フォーカス
  var s=document.querySelector('a.hd-btn[href$="#search-block"]');
  var box=document.getElementById("search-block");
  if(s&&box){s.addEventListener("click",function(e){e.preventDefault();box.scrollIntoView({behavior:"smooth",block:"start"});var i=document.getElementById("site-search-input");if(i)setTimeout(function(){i.focus({preventScroll:true});},400);});}
  else if(location.hash==="#search-block"){var i2=document.getElementById("site-search-input");if(i2)setTimeout(function(){i2.focus({preventScroll:true});},300);}
})();
