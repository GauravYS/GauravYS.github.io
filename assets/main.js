(function () {
  var root = document.documentElement;

  // ---- mobile menu ----
  var nav = document.getElementById("navlinks");
  document.getElementById("menu").addEventListener("click", function () { nav.classList.toggle("open"); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") nav.classList.remove("open"); });

  // ---- active nav link on scroll ----
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function onScroll() {
    var y = window.scrollY + 120, cur = 0;
    secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- news show more ----
  var newsBtn = document.getElementById("news-more");
  newsBtn.addEventListener("click", function () {
    var card = newsBtn.closest(".news");
    var open = card.classList.toggle("open");
    newsBtn.textContent = open ? "Show less ↑" : "Show all news ↓";
    newsBtn.setAttribute("aria-expanded", open);
  });

  // ---- publication filters ----
  var pubs = Array.prototype.slice.call(document.querySelectorAll(".pub"));
  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("on"); });
      btn.classList.add("on");
      var f = btn.getAttribute("data-f");
      pubs.forEach(function (p) {
        var show = f === "all" || (" " + p.getAttribute("data-cats") + " ").indexOf(" " + f + " ") > -1;
        p.classList.toggle("hide", !show);
      });
    });
  });

  // ---- abstract toggles ----
  document.querySelectorAll("[data-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var el = document.getElementById(btn.getAttribute("data-toggle"));
      var open = el.hasAttribute("hidden");
      if (open) el.removeAttribute("hidden"); else el.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", open);
    });
  });

  // ---- lightbox ----
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img"), lbCap = lb.querySelector("figcaption");
  function closeLb() { lb.setAttribute("hidden", ""); lbImg.removeAttribute("src"); document.body.style.overflow = ""; }
  document.querySelectorAll(".thumb[data-full]").forEach(function (t) {
    t.addEventListener("click", function () {
      lbImg.src = t.getAttribute("data-full");
      lbImg.alt = t.getAttribute("data-caption");
      lbCap.textContent = t.getAttribute("data-caption");
      lb.removeAttribute("hidden");
      document.body.style.overflow = "hidden";
    });
  });
  lb.addEventListener("click", closeLb);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hasAttribute("hidden")) closeLb(); });
})();
