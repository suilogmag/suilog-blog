(function(){
  var url=location.href.split('#')[0], t=encodeURIComponent(document.title.split('｜')[0]), u=encodeURIComponent(url);
  var map={
    fb:'https://www.facebook.com/sharer/sharer.php?u='+u,
    x:'https://twitter.com/intent/tweet?url='+u+'&text='+t,
    hatena:'https://b.hatena.ne.jp/entry/panel/?url='+u,
    line:'https://social-plugins.line.me/lineit/share?url='+u
  };
  document.querySelectorAll('[data-share]').forEach(function(el){
    var k=el.getAttribute('data-share');
    if(map[k]){el.href=map[k];return;}
    if(k==='copy'){
      el.addEventListener('click',function(){
        function done(){var m=document.createElement('div');m.className='copy-toast';m.textContent='URLをコピーしました';document.body.appendChild(m);setTimeout(function(){m.remove();},1800);}
        if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(done,done);}
        else{var ta=document.createElement('textarea');ta.value=url;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch(e){}ta.remove();done();}
      });
    }
  });
})();
