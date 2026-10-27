/* =============================================================
   main.js — behaviour shared by every page
   Covers: event handling, DOM manipulation, functions, arrays.
   ============================================================= */
(function () {
  "use strict";

  var body = document.body;

  /**
   * Open and close the full-screen menu used on phones and tablets.
   */
  function setUpMenu() {
    var button = document.querySelector(".menu-btn");
    var nav = document.getElementById("site-nav");
    if (!button || !nav) return;

    function setOpen(open) {
      body.classList.toggle("menu-open", open);
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
    }

    button.addEventListener("click", function () {
      setOpen(!body.classList.contains("menu-open"));
    });

    /* Close the menu after a link is chosen. */
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    /* Close the menu with the Escape key. */
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && body.classList.contains("menu-open")) {
        setOpen(false);
        button.focus();
      }
    });

    /* If the window grows back to desktop width, reset the menu. */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 880 && body.classList.contains("menu-open")) setOpen(false);
    });
  }

  /**
   * Highlight the navigation link for the page being viewed.
   */
  function markCurrentPage() {
    var current = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".nav__list a, .foot__nav a");

    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("href") === current) {
        links[i].classList.add("is-active");
        links[i].setAttribute("aria-current", "page");
      }
    }
  }

  /**
   * Reveal sections as they scroll into view.
   */
  function setUpReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (item) { observer.observe(item); });
  }

  /**
   * Keep the copyright year current.
   */
  function setYear() {
    var slot = document.getElementById("year");
    if (slot) slot.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    setUpMenu();
    markCurrentPage();
    setUpReveals();
    setYear();
  });
})();
