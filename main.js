// Magellan CRE — shared interactions

(function () {
  // Sticky header shadow
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Scroll reveals
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealed.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 }
    );
    revealed.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealed.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Footer year
  var year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Contact form -> opens the visitor's email app addressed to Max
  var form = document.querySelector(".inquiry-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var get = function (name) {
        var field = form.querySelector('[name="' + name + '"]');
        return field && field.value ? field.value.trim() : "";
      };
      var lines = [
        "Name: " + get("name"),
        "Email: " + get("email"),
        "Phone: " + get("phone"),
        "Role: " + get("role"),
        "Property or deal type: " + get("dealType"),
        "Location: " + get("location"),
        "Estimated value or range: " + get("value"),
        "Timeline: " + get("timeline"),
        "",
        get("message"),
      ];
      var subject = "Commercial inquiry from " + (get("name") || "magellancre.com");
      window.location.href =
        "mailto:max@ccim.net?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent =
          "Your email app should open with the details filled in. If it does not, email max@ccim.net directly.";
      }
    });
  }
})();
