// portfolio.js - Comprehensive solution for all pages

document.addEventListener("DOMContentLoaded", function () {
  // ======================
  // Core Functionality (Works on all pages)
  // ======================

  // 1. Mobile Menu Toggle
  const initMobileMenu = () => {
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (mobileMenuButton && mobileMenu) {
      const menuIcon = mobileMenuButton.querySelector("i");

      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("opacity-0");
        mobileMenu.classList.toggle("opacity-100");
        mobileMenu.classList.toggle("invisible");
        mobileMenu.classList.toggle("visible");

        if (menuIcon) {
          menuIcon.classList.toggle("fa-bars");
          menuIcon.classList.toggle("fa-times");
        }
      });

      // Close menu when clicking links
      document.querySelectorAll(".mobile-menu a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("opacity-0", "invisible");
          mobileMenu.classList.remove("opacity-100", "visible");
          if (menuIcon) {
            menuIcon.classList.add("fa-bars");
            menuIcon.classList.remove("fa-times");
          }
        });
      });
    }
  };

  // 2. Smooth Scrolling
  const initSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });

          // Update active nav link
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active-nav");
          });
          this.classList.add("active-nav");
        }
      });
    });
  };

  // 3. Intersection Observers (Animations)
  const initAnimations = () => {
    // Fade-in elements
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(".fade-in")
      .forEach((el) => fadeObserver.observe(el));

    // Skill bars (only on homepage)
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      const skillObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              document.querySelectorAll(".skill-bar").forEach((bar) => {
                const width =
                  bar.parentElement.previousElementSibling?.lastElementChild
                    ?.textContent || "0%";
                bar.style.width = width;
              });
            }
          });
        },
        { threshold: 0.5 }
      );
      skillObserver.observe(skillsSection);
    }
  };

  // ======================
  // Page-Specific Functionality
  // ======================

  // 1. Certificates Page
  const initCertificates = () => {
    const certCards = document.querySelectorAll(".cert-card");
    if (certCards.length === 0) return;

    certCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        if (!e.target.closest(".cert-btn")) {
          const link = card.querySelector(".cert-btn");
          if (link) link.click();
        }
      });
    });
  };

  // 2. Projects Page
  const initProjects = () => {
    const projectCards = document.querySelectorAll(".project-card");
    if (projectCards.length === 0) return;

    const isClickableElement = (element) => {
      return (
        element.tagName === "A" ||
        element.tagName === "BUTTON" ||
        element.closest("a, button, [onclick]")
      );
    };

    projectCards.forEach((card) => {
      const content = card.querySelector(".project-content");
      let isTouching = false;
      let touchTimer = null;

      // Desktop Hover
      card.addEventListener("mouseenter", () => {
        if (!isTouching) content.style.opacity = "1";
      });

      card.addEventListener("mouseleave", () => {
        if (!isTouching) content.style.opacity = "0";
      });

      // Mobile Touch
      let isScrolling = false;
      let touchStartY = 0;
      const SCROLL_THRESHOLD = 5;

      card.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
        isScrolling = false;
      });

      card.addEventListener("touchmove", (e) => {
        const yDiff = Math.abs(e.touches[0].clientY - touchStartY);
        if (yDiff > SCROLL_THRESHOLD) {
          isScrolling = true;
          content.style.opacity = "0";
        }
      });

      card.addEventListener("touchend", (e) => {
        if (!isScrolling && !isClickableElement(e.target)) {
          content.style.opacity = "1";
          touchTimer = setTimeout(() => (content.style.opacity = "0"), 2000);
        }
      });

      // Click handling
      content.addEventListener("click", (e) => {
        if (isClickableElement(e.target)) {
          clearTimeout(touchTimer);
          return true;
        }
      });

      // Scroll reveal
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isTouching) {
              content.style.opacity = "1";
              if (!("ontouchstart" in window)) {
                setTimeout(() => {
                  if (!isTouching) content.style.opacity = "0";
                }, 3000);
              }
            }
          });
        },
        {
          threshold: 0.3,
          rootMargin: "0px 0px -50px 0px",
        }
      );
      observer.observe(card);
    });
  };

  // ======================
  // Initialize Everything
  // ======================

  // Core functionality (always runs)
  initMobileMenu();
  initSmoothScrolling();
  initAnimations();

  // Page-specific functionality (only runs when elements exist)
  initCertificates();
  initProjects();
});
