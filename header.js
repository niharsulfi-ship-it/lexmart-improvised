(function () {
  "use strict";

  const services = [
    ["service-corporate-law.html", "Corporate Law", "building"],
    ["service-taxation.html", "Taxation", "rupee"],
    ["service-intellectual-property.html", "Intellectual Property", "shield"],
    ["service-business-compliance.html", "Business Compliance", "lock"],
    ["service-advisory.html", "Advisory & Startup Advisory", "zap"]
  ];
  const icons = {
    building: '<path d="M3 21h18M6 21V7l6-4 6 4v14M9 10h2m2 0h2M9 14h2m2 0h2M10 21v-3h4v3"/>',
    rupee: '<path d="M6 4h12M6 8h12M7 4c5 0 7 1.4 7 4s-2 4-7 4h-1l9 8"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>'
  };

  function icon(name) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + icons[name] + '</svg>';
  }
  function currentPage() {
    return window.location.pathname.split("/").pop().toLowerCase() || "index.html";
  }
  function activeClass(target, current) {
    if (target === "blogs.html" && current.indexOf("blog-detail") === 0) return " active";
    return target === current ? " active" : "";
  }

  function renderHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;
    const current = currentPage();
    const serviceActive = services.some(function (service) { return service[0] === current; });
    const serviceItems = services.map(function (service, index) {
      return (index === services.length - 1 ? '<div class="dropdown-divider"></div>' : "") +
        '<a href="' + service[0] + '" class="dropdown-item' + activeClass(service[0], current) + '">' +
          '<span class="di-icon">' + icon(service[2]) + '</span>' +
          '<span class="di-text"><strong>' + service[1] + '</strong></span>' +
        '</a>';
    }).join("");

    mount.innerHTML =
      '<header class="site-header"><div class="nav-wrap">' +
        '<a href="index.html" class="logo" aria-label="Lexmart home"><img src="images/lexmart_logo_header.png?v=20260907.2" width="500" height="132" alt="Lexmart"></a>' +
        '<nav class="links" aria-label="Primary navigation">' +
          '<a href="index.html" class="' + activeClass("index.html", current).trim() + '">Home</a>' +
          '<a href="about.html" class="' + activeClass("about.html", current).trim() + '">About</a>' +
          '<div class="nav-dropdown"><a href="service-corporate-law.html" class="' + (serviceActive ? "active" : "") + '">Services <svg class="header-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m5.5 7.5 4.5 4.5 4.5-4.5"/></svg></a>' +
            '<div class="nav-dropdown-menu">' + serviceItems + '</div></div>' +
          '<a href="team.html" class="' + activeClass("team.html", current).trim() + '">Team</a>' +
          '<a href="blogs.html" class="' + activeClass("blogs.html", current).trim() + '">Blogs</a>' +
          '<a href="contact.html" class="' + activeClass("contact.html", current).trim() + '">Contact</a>' +
        '</nav>' +
      '<a href="https://wa.me/919354274964?text=Hello%20Lexmart%2C%20I%20would%20like%20to%20book%20a%20consultation.%20I%20visited%20https%3A%2F%2Flexmart.brandmindz.in%2F%20and%20would%20like%20to%20know%20more%20about%20your%20legal%20services." class="btn-consult" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>Book a Consultation</a>' +        '<button class="hamburger" id="hamburgerBtn" type="button" aria-label="Open menu" aria-controls="mobileNav" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '</div></header>' +
      '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation" aria-hidden="true">' +
        '<button class="mobile-close" id="mobileClose" type="button" aria-label="Close menu">&times;</button>' +
        '<a href="index.html" class="' + activeClass("index.html", current).trim() + '">Home</a>' +
        '<a href="about.html" class="' + activeClass("about.html", current).trim() + '">About</a>' +
        '<button class="mobile-services-title' + (serviceActive ? " active" : "") + '" type="button" aria-expanded="false">Services <span class="svc-chevron" aria-hidden="true">▼</span></button>' +
        '<div class="mobile-sub-links">' + services.map(function (service) { return '<a href="' + service[0] + '" class="' + activeClass(service[0], current).trim() + '">' + service[1].replace(" & Startup Advisory", "") + '</a>'; }).join("") + '</div>' +
        '<a href="team.html" class="' + activeClass("team.html", current).trim() + '">Team</a>' +
        '<a href="blogs.html" class="' + activeClass("blogs.html", current).trim() + '">Blogs</a>' +
        '<a href="contact.html" class="' + activeClass("contact.html", current).trim() + '">Contact</a>' +
      '</nav>';

    const button = document.getElementById("hamburgerBtn");
    const menu = document.getElementById("mobileNav");
    const closeButton = document.getElementById("mobileClose");
    const servicesButton = menu.querySelector(".mobile-services-title");
    function setMenu(open) {
      menu.classList.toggle("open", open);
      button.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
      if (open) closeButton.focus();
    }
    button.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    closeButton.addEventListener("click", function () { setMenu(false); button.focus(); });
    menu.querySelectorAll("a").forEach(function (link) { link.addEventListener("click", function () { setMenu(false); }); });
    servicesButton.addEventListener("click", function () {
      const open = !servicesButton.classList.contains("open");
      servicesButton.classList.toggle("open", open);
      servicesButton.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("open")) setMenu(false);
    });

    const headerMount = document.getElementById("site-header");
    let scrollTicking = false;

    function updateHeaderOnScroll() {
      const currentScrollY = Math.max(window.scrollY, 0);
      if (currentScrollY >= 40) headerMount.classList.add("is-scrolled");
      else if (currentScrollY <= 8) headerMount.classList.remove("is-scrolled");
      scrollTicking = false;
    }

    window.addEventListener("scroll", function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateHeaderOnScroll);
        scrollTicking = true;
      }
    }, { passive: true });
    window.addEventListener("resize", updateHeaderOnScroll);
    updateHeaderOnScroll();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", renderHeader);
  else renderHeader();
})();
