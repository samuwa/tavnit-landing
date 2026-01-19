// ==========================================
// TAVNIT LANDING PAGE - MAIN JAVASCRIPT
// Interactivity, Smooth Scroll, Tabs, Calculator
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if href is just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const header = document.querySelector('.header');
        const navHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // MOBILE NAVIGATION TOGGLE
  // ==========================================
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  // ==========================================
  // USE CASES TABS & CAROUSEL
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  const useCasesContent = document.querySelector('.use-cases-content');
  const useCasesDots = document.querySelectorAll('.use-cases-pagination .pagination-dot');

  // Desktop tab click handling
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and content
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');
      if (tabContents[index]) {
        tabContents[index].classList.add('active');
      }
    });
  });

  // Mobile carousel handling
  if (useCasesContent && useCasesDots.length > 0) {
    // Update active dot based on scroll position
    function updateActiveUseCaseDot() {
      const scrollLeft = useCasesContent.scrollLeft;
      const cardWidth = tabContents[0]?.offsetWidth || 0;
      const gap = 24; // var(--spacing-md) = 24px on mobile
      const index = Math.round(scrollLeft / (cardWidth + gap));

      useCasesDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Scroll to specific card when dot is clicked
    useCasesDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = tabContents[0]?.offsetWidth || 0;
        const gap = 24;
        const scrollPosition = index * (cardWidth + gap);

        useCasesContent.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      });
    });

    // Update active dot on scroll
    let useCaseScrollTimeout;
    useCasesContent.addEventListener('scroll', () => {
      clearTimeout(useCaseScrollTimeout);
      useCaseScrollTimeout = setTimeout(updateActiveUseCaseDot, 100);
    }, { passive: true });

    // Initialize on load
    updateActiveUseCaseDot();
  }

  // ==========================================
  // INTERSECTION OBSERVER - SCROLL ANIMATIONS
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger animation initialization if needed
        if (entry.target.id === 'hero-animation-container' && !entry.target.dataset.initialized) {
          entry.target.dataset.initialized = 'true';
          if (typeof initHeroAnimation === 'function') {
            initHeroAnimation();
          }
        }

        if (entry.target.id === 'process-animation-container' && !entry.target.dataset.initialized) {
          entry.target.dataset.initialized = 'true';
          if (typeof initProcessAnimation === 'function') {
            initProcessAnimation();
          }
        }

        // Initialize use case animations when tab becomes visible
        const useCaseAnimations = ['invoice-animation-container', 'contract-animation-container', 'form-animation-container', 'expense-animation-container'];
        if (useCaseAnimations.includes(entry.target.id) && !entry.target.dataset.initialized) {
          entry.target.dataset.initialized = 'true';
          if (typeof initUseCaseAnimation === 'function') {
            const animationType = entry.target.id.replace('-animation-container', '');
            initUseCaseAnimation(animationType);
          }
        }
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale');
  animatedElements.forEach(el => observer.observe(el));

  // Observe animation containers
  const animationContainers = document.querySelectorAll('#hero-animation-container, #process-animation-container, .use-case-animation');
  animationContainers.forEach(container => observer.observe(container));

  // ==========================================
  // STATS COUNTER ANIMATION
  // ==========================================
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateStats(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => statsObserver.observe(stat));

  function animateStats(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const hasPlus = text.includes('+');
    const numberMatch = text.match(/[\d,]+/);

    if (numberMatch) {
      const targetNumber = parseInt(numberMatch[0].replace(/,/g, ''));
      const duration = 2000;
      const step = targetNumber / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= targetNumber) {
          current = targetNumber;
          clearInterval(timer);
        }

        let displayValue = Math.round(current).toLocaleString();
        if (hasPlus) displayValue += '+';
        if (isPercentage) displayValue += '%';

        element.textContent = displayValue;
      }, 16);
    }
  }

  // ==========================================
  // NAVBAR SCROLL EFFECT
  // ==========================================
  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (header && currentScroll > 10) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else if (header) {
      header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });

  // ==========================================
  // PARALLAX EFFECT FOR GRADIENT ORBS
  // ==========================================
  const gradientOrbs = document.querySelectorAll('.gradient-orb');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    gradientOrbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.1;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // ==========================================
  // FORM VALIDATION (If contact form exists)
  // ==========================================
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Basic validation
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        // Form is valid, you can submit it here
        console.log('Form is valid, ready to submit');
        // this.submit(); // Uncomment when backend is ready
      }
    });
  });

  // ==========================================
  // LAZY LOAD ANIMATIONS
  // ==========================================
  // Only initialize animations when they come into view
  // This is handled by the Intersection Observer above

  // ==========================================
  // COPY TO CLIPBOARD (For code snippets)
  // ==========================================
  document.querySelectorAll('.integration-example code').forEach(codeBlock => {
    codeBlock.style.cursor = 'pointer';
    codeBlock.setAttribute('title', 'Click to copy');

    codeBlock.addEventListener('click', function() {
      const text = this.textContent;
      navigator.clipboard.writeText(text).then(() => {
        // Show feedback
        const originalTitle = this.getAttribute('title');
        this.setAttribute('title', 'Copied!');
        this.style.opacity = '0.7';

        setTimeout(() => {
          this.setAttribute('title', originalTitle);
          this.style.opacity = '1';
        }, 1000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });
  });

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================
  // Allow keyboard navigation for tabs
  tabButtons.forEach((button, index) => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextButton = tabButtons[index + 1] || tabButtons[0];
        nextButton.focus();
        nextButton.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevButton = tabButtons[index - 1] || tabButtons[tabButtons.length - 1];
        prevButton.focus();
        prevButton.click();
      }
    });
  });

  // ==========================================
  // ACCESSIBILITY - FOCUS MANAGEMENT
  // ==========================================
  // Add focus-visible polyfill behavior
  document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });

  // ==========================================
  // PERFORMANCE - DEBOUNCE SCROLL HANDLER
  // ==========================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll-heavy operations
  const debouncedScroll = debounce(() => {
    // Any expensive scroll operations go here
  }, 100);

  window.addEventListener('scroll', debouncedScroll);

  // ==========================================
  // CONSOLE EASTER EGG
  // ==========================================
  console.log('%cTavnit 🚀', 'font-size: 20px; font-weight: bold; color: #667eea;');
  console.log('%cBuilt with care for document extraction automation', 'font-size: 12px; color: #6b7280;');
  console.log('%cInterested in working with us? Check out https://tavnit.com/careers', 'font-size: 12px; color: #764ba2;');

  // ==========================================
  // INTEGRATION METHODS CAROUSEL (MOBILE)
  // ==========================================
  const integrationMethods = document.querySelector('.integration-methods');
  const integrationCards = document.querySelectorAll('.integration-method');
  const integrationDots = document.querySelectorAll('.integration-dot');

  if (integrationMethods && integrationDots.length > 0) {
    // Update active dot based on scroll position
    function updateActiveDot() {
      const scrollLeft = integrationMethods.scrollLeft;
      const cardWidth = integrationCards[0]?.offsetWidth || 0;
      const gap = 16; // var(--spacing-md) = 16px
      const index = Math.round(scrollLeft / (cardWidth + gap));

      integrationDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Scroll to specific card when dot is clicked
    integrationDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = integrationCards[0]?.offsetWidth || 0;
        const gap = 16;
        const scrollPosition = index * (cardWidth + gap);

        integrationMethods.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      });
    });

    // Update active dot on scroll
    let scrollTimeout;
    integrationMethods.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveDot, 100);
    }, { passive: true });

    // Initialize on load
    updateActiveDot();
  }

  // ==========================================
  // FEATURES CAROUSEL (MOBILE)
  // ==========================================
  const featuresGrid = document.querySelector('.features-grid');
  const featureCards = document.querySelectorAll('.feature-card');
  const featuresDots = document.querySelectorAll('.features-pagination .pagination-dot');

  if (featuresGrid && featuresDots.length > 0) {
    // Update active dot based on scroll position
    function updateActiveFeatureDot() {
      const scrollLeft = featuresGrid.scrollLeft;
      const cardWidth = featureCards[0]?.offsetWidth || 0;
      const gap = 24; // var(--spacing-md) = 24px on mobile
      const index = Math.round(scrollLeft / (cardWidth + gap));

      featuresDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // Scroll to specific card when dot is clicked
    featuresDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        const cardWidth = featureCards[0]?.offsetWidth || 0;
        const gap = 24;
        const scrollPosition = index * (cardWidth + gap);

        featuresGrid.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      });
    });

    // Update active dot on scroll
    let featureScrollTimeout;
    featuresGrid.addEventListener('scroll', () => {
      clearTimeout(featureScrollTimeout);
      featureScrollTimeout = setTimeout(updateActiveFeatureDot, 100);
    }, { passive: true });

    // Initialize on load
    updateActiveFeatureDot();
  }

  // ==========================================
  // INITIALIZE ON LOAD
  // ==========================================
  console.log('Tavnit landing page initialized successfully');

  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll position
function getScrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}
