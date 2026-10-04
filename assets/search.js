/* ==========================================================
   suilog blog — 記事のキーワード検索（サイト内、全部ブラウザ内で完結）
   ========================================================== */
(function () {
  var input = document.getElementById("site-search-input");
  var resultsBox = document.getElementById("site-search-results");
  var hint = document.getElementById("site-search-hint");
  if (!input || !resultsBox) return;

  var indexUrl = input.dataset.indexUrl || "assets/search-index.json";
  var posts = [];

  fetch(indexUrl)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      posts = data;
      var q = new URLSearchParams(location.search).get("q");
      if (q) {
        input.value = q;
        input.dispatchEvent(new Event("input"));
        var sb = document.getElementById("search-block");
        if (sb) sb.scrollIntoView();
      }
    })
    .catch(function () {
      if (hint) hint.textContent = "検索データの読み込みに失敗しました。";
    });

  function render(matches, query) {
    resultsBox.innerHTML = "";

    if (!query) {
      if (hint) hint.style.display = "block";
      resultsBox.style.display = "none";
      return;
    }

    if (hint) hint.style.display = "none";
    resultsBox.style.display = "flex";

    if (matches.length === 0) {
      var empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "「" + query + "」に一致する記事は見つかりませんでした。";
      resultsBox.appendChild(empty);
      return;
    }

    matches.forEach(function (post) {
      var a = document.createElement("a");
      a.className = "mini-post";
      a.href = (/\/(posts|category|tag|archive)\//.test(location.pathname) ? "../" : "") + post.url;
      a.innerHTML =
        '<div class="thumb">📝</div>' +
        "<div>" +
        '<p class="title"></p>' +
        '<p class="date"></p>' +
        "</div>";
      a.querySelector(".title").textContent = post.title;
      a.querySelector(".date").textContent = post.excerpt;
      resultsBox.appendChild(a);
    });
  }

  input.addEventListener("input", function () {
    var query = input.value.trim();
    if (!query) { render([], ""); return; }

    var q = query.toLowerCase();
    var matches = posts.filter(function (post) {
      var haystack = (
        post.title + " " + post.excerpt + " " + post.tags.join(" ")
      ).toLowerCase();
      return haystack.indexOf(q) !== -1;
    });
    render(matches, query);
  });
})();
