// Navbar menu toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close navbar when a link is clicked (for mobile)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Typed.js animation
const typed = new Typed("#typed-text", {
  strings: [
    "Photographer",
    "Videographer",
    "Video Editor",
    "Graphic Designer",
    "Motion Animator",
  ],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 2000,
  loop: true,
});

// AOS animation init
AOS.init({
  duration: 1000,
  once: true,
});

// Language switcher
const langSwitcher = document.getElementById("lang-switcher");
const elementsToTranslate = document.querySelectorAll("[data-lang-id]");

function switchLanguage(lang) {
  elementsToTranslate.forEach((el) => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) el.textContent = text;
  });
}

// Default to Indonesian
switchLanguage("id");

langSwitcher.addEventListener("change", () => {
  switchLanguage(langSwitcher.value);
});

// Project Carousel Functionality
function initializeCarousels() {
  document.querySelectorAll(".project-carousel").forEach((carousel) => {
    const content = carousel.querySelector(".carousel-content");
    const items = content.children;
    const dotsContainer = carousel.querySelector(".carousel-nav");
    let currentIndex = 0;
    let autoSlideInterval;

    // Clear existing dots to prevent duplicates on re-initialization
    dotsContainer.innerHTML = "";

    // Create dots for navigation
    for (let i = 0; i < items.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        showSlide(i);
        startAutoSlide(); // Restart auto-slide on manual dot click
      });
      dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll(".dot");

    function showSlide(index) {
      if (index >= items.length) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = items.length - 1;
      } else {
        currentIndex = index;
      }
      content.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    function nextSlide() {
      showSlide(currentIndex + 1);
    }

    function startAutoSlide() {
      stopAutoSlide(); // Clear any existing interval
      autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Start auto-slide when carousel is visible
    if (carousel.closest(".project-item").classList.contains("visible")) {
      startAutoSlide();
    } else {
      stopAutoSlide(); // Stop if not visible
    }

    // Pause auto-slide on hover
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
  });
}

// Filter project buttons
const filterButtons = document.querySelectorAll(".project-filters button");
const projectItems = document.querySelectorAll(".project-item"); // All project items

function filterAndDisplayProjects(filter) {
  let visibleCount = 0;
  projectItems.forEach((item) => {
    // Stop carousel if item is about to be hidden
    const carousel = item.querySelector(".project-carousel");
    if (carousel) {
      const carouselInterval = carousel.__autoSlideInterval; // Access the stored interval ID
      if (carouselInterval) clearInterval(carouselInterval);
    }

    // Check if the item matches the filter
    const matchesFilter = filter === "all" || item.classList.contains(filter);

    // For 'all' category, limit to 8 items
    if (filter === "all") {
      if (matchesFilter && visibleCount < 8) {
        item.classList.add("visible");
        visibleCount++;
      } else {
        item.classList.remove("visible");
      }
    } else {
      // For specific categories, show all matching items
      if (matchesFilter) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    }
  });

  // Re-initialize carousels for visible items
  initializeCarousels();
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    filterAndDisplayProjects(filter);
  });
});

// Hire Me buttons scroll to contact
document.querySelectorAll(".hire-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    window.open("https://instagram.com/ari.yasaputra", "_blank");
  });
});

// View All Projects button opens new tab (ubah link sesuai kebutuhan)
const projectLinkBtn = document.querySelector(".project-link-btn");
if (projectLinkBtn) {
  projectLinkBtn.addEventListener("click", () => {
    window.open("https://sfl.gl/clgJB", "_blank");
  });
}

// Initialize on page load: default to 'all' and limit to 8
document.addEventListener("DOMContentLoaded", () => {
  filterAndDisplayProjects("all"); // Show initial 8 "all" projects
});
