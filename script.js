// Animate elements when they come into view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Animate skill bars when skills section is in view
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".skill-bar").forEach((bar) => {
          bar.style.width =
            bar.parentElement.previousElementSibling.lastElementChild.textContent;
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

skillObserver.observe(document.getElementById("skills"));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Update active nav link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active-nav");
    });
    this.classList.add("active-nav");
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  const content = card.querySelector(".project-content");
  let isTouching = false;
  let touchTimer = null;

  // Helper function to check if touch is on a clickable element
  const isClickableElement = (element) => {
    return (
      element.tagName === "A" ||
      element.tagName === "BUTTON" ||
      element.closest("a, button, [onclick]")
    );
  };

  // ===== 1. Desktop Hover Effect =====
  card.addEventListener("mouseenter", () => {
    if (!isTouching) {
      content.style.opacity = "1";
    }
  });

  card.addEventListener("mouseleave", () => {
    if (!isTouching) {
      content.style.opacity = "0";
    }
  });

  // ===== 2. Mobile Touch Effect =====
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
      content.style.opacity = "0"; // Hide if scrolling
    }
  });

  card.addEventListener("touchend", (e) => {
    if (!isScrolling && !isClickableElement(e.target)) {
      content.style.opacity = "1"; // Show only for taps
      setTimeout(() => (content.style.opacity = "0"), 2000);
    }
  });
  // Allow link clicks to work normally
  content.addEventListener("click", (e) => {
    if (isClickableElement(e.target)) {
      clearTimeout(touchTimer);
      return true;
    }
  });

  // ===== 3. Improved Scroll Effect =====
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

// Mobile menu functionality - declare these variables ONCE
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    const menuIcon = mobileMenuButton.querySelector("i");

    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("opacity-0");
      mobileMenu.classList.toggle("opacity-100");
      mobileMenu.classList.toggle("invisible");
      mobileMenu.classList.toggle("visible");

      if (menuIcon) {
        menuIcon.classList.toggle("fa-bars");
        menuIcon.classList.toggle("fa-times");
      }
    });
  }

  // Safe IntersectionObserver implementation
  function initObservers() {
    // Fade-in observer
    const fadeElements = document.querySelectorAll(".fade-in");
    if (fadeElements.length > 0) {
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

      fadeElements.forEach((el) => fadeObserver.observe(el));
    }

    // Skill bars observer
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
  }

  // Initialize observers
  initObservers();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
