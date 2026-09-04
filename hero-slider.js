(function () {
  "use strict";

  const slider = document.querySelector(".hero-slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".hero-slide"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = 0;
  let timer = null;

  function stopVideos() {
    slides.forEach(function (slide) {
      const video = slide.querySelector("video");
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
  }

  function schedule() {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () { show(current + 1); }, 6000);
  }

  function show(index) {
    current = (index + slides.length) % slides.length;
    stopVideos();
    slides.forEach(function (slide, slideIndex) {
      const active = slideIndex === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    const video = slides[current].querySelector("video");
    if (video && !reduceMotion.matches) video.play().catch(function () {});
    schedule();
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) window.clearTimeout(timer);
    else schedule();
  });

  show(0);
}());
