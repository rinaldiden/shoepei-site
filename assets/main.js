/* Shoepei — interazioni minime, niente dipendenze */
(function () {
  "use strict";

  /* nav: sfondo quando si scrolla */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* reveal allo scroll */
  var reveals = document.querySelectorAll(".reveal");

  /* l'hero parte subito al load (stagger via CSS delay) */
  var hero = document.querySelector(".hero");
  var fireHero = function () {
    hero.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  };
  if (document.readyState === "complete") fireHero();
  else window.addEventListener("load", fireHero);
  // fallback rapido
  requestAnimationFrame(function () { setTimeout(fireHero, 60); });

  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  reveals.forEach(function (el) {
    if (!el.closest(".hero")) io.observe(el);
  });
})();
