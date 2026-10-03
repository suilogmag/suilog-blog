/* 右下の「一番上に戻る」ボタン（全ページ共通） */
(function () {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("aria-label", "ページの一番上に戻る");
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 15l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(btn);

  function update() {
    if ((window.pageYOffset || document.documentElement.scrollTop) > 240) {
      btn.classList.add("is-show");
    } else {
      btn.classList.remove("is-show");
    }
  }
  window.addEventListener("scroll", update, { passive: true });
  update();

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
/* 目次などのページ内リンクだけ、なめらかにスクロール（再読み込み時の位置復元を邪魔しないため） */
document.addEventListener("click", function (e) {
  var a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  var id = a.getAttribute("href").slice(1);
  var t = id && document.getElementById(id);
  if (!t) return;
  e.preventDefault();
  t.scrollIntoView({ behavior: "smooth", block: "start" });
});
