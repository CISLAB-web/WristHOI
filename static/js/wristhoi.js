// WristHOI project page — WACV 2027 redesign
(function () {
  "use strict";

  // Sticky nav appears after the hero; highlight the section in view.
  var nav = document.getElementById("topnav");
  var hero = document.querySelector(".hero");
  var links = Array.prototype.slice.call(document.querySelectorAll(".topnav-links a"));
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    nav.classList.toggle("is-visible", y > hero.offsetHeight - 80);
    var current = null;
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute("href"));
      if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) current = a;
    });
    links.forEach(function (a) { a.classList.toggle("is-active", a === current); });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  // Play muted videos only while visible (saves bandwidth and CPU).
  var vids = document.querySelectorAll("video[data-autoplay]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) {
          if (v.preload === "none") v.preload = "auto";
          var p = v.play(); if (p && p.catch) p.catch(function () {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    vids.forEach(function (v) { io.observe(v); });

    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); rv.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section-head, .feature, .media-frame, .figure-card, .steps, .quality, .bench, .stats-grid")
      .forEach(function (el) { el.classList.add("reveal"); rv.observe(el); });
  } else {
    vids.forEach(function (v) { v.autoplay = true; });
  }

  // Annotation-quality tabs (summary cards act as tabs).
  var qIds = ["qv-2d", "qv-3d", "qv-contact", "qv-depth", "qv-penetration", "qv-temporal"];
  function activateQuality(id) {
    qIds.forEach(function (q) {
      var panel = document.getElementById(q);
      if (!panel) return;
      var on = q === id;
      panel.classList.toggle("is-active", on);
      panel.hidden = !on;
      if (on) panel.querySelectorAll(".quality-progress-fill").forEach(function (f) {
        f.style.animation = "none"; void f.offsetWidth; f.style.animation = "";
      });
    });
    document.querySelectorAll("[data-quality-tab]").forEach(function (el) {
      var on = el.getAttribute("data-quality-tab") === id;
      el.classList.toggle("is-active", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
    });
  }
  document.querySelectorAll("[data-quality-tab]").forEach(function (el) {
    el.addEventListener("click", function () { activateQuality(el.getAttribute("data-quality-tab")); });
  });
  activateQuality("qv-2d");

  // Benchmark tables: segmented control.
  var blocks = document.querySelectorAll(".bench .paper-table-block");
  var segs = document.querySelectorAll(".seg-btn");
  function activateBench(k) {
    blocks.forEach(function (b, i) { b.classList.toggle("is-active", i === k); });
    segs.forEach(function (s, i) { s.classList.toggle("is-active", i === k); s.setAttribute("aria-selected", i === k ? "true" : "false"); });
  }
  segs.forEach(function (s) { s.addEventListener("click", function () { activateBench(+s.getAttribute("data-bench")); }); });
  activateBench(0);

  // Copy BibTeX.
  var btn = document.getElementById("copy-bibtex");
  btn.addEventListener("click", function () {
    var text = document.getElementById("bibtex-code").textContent;
    function done() {
      btn.classList.add("is-done"); btn.querySelector("span").textContent = "Copied";
      setTimeout(function () { btn.classList.remove("is-done"); btn.querySelector("span").textContent = "Copy"; }, 1800);
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done, function () {});
    } else {
      var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t);
      t.select(); document.execCommand("copy"); document.body.removeChild(t); done();
    }
  });
})();
