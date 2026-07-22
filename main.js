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


  // Manus-style homepage hero carousel
  var heroSlides = Array.prototype.slice.call(document.querySelectorAll(".hero-slide"));
  if (heroSlides.length > 1) {
    var heroIndex = 0;
    window.setInterval(function () {
      heroSlides[heroIndex].classList.remove("active");
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add("active");
    }, 3750);
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
      var fieldLabels = {
        name: "Name",
        email: "Email",
        phone: "Phone",
        role: "Role",
        subject: "Subject",
        dealType: "Property or deal type",
        location: "Location",
        value: "Estimated value or range",
        timeline: "Timeline",
      };
      var lines = Object.keys(fieldLabels)
        .map(function (name) {
          var value = get(name);
          return value ? fieldLabels[name] + ": " + value : "";
        })
        .filter(Boolean);
      if (get("message")) {
        lines.push("", get("message"));
      }
      var subject = get("subject") || "Commercial inquiry from " + (get("name") || "magellancre.com");
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
