// ==========================================
// DOCUMENTATION INTERACTIVE FEATURES
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  // Mobile sidebar menu
  initMobileSidebar();
  // Navigation functionality
  initNavigation();
  // API sub-tabs
  initApiSubTabs();
  // Language toggle for code examples
  initLanguageToggle();
  // Copy button functionality
  initCopyButtons();
  // Handle initial hash
  handleInitialHash();
});

// ==========================================
// MOBILE SIDEBAR MENU
// ==========================================
function initMobileSidebar() {
  const menuToggle = document.getElementById('docs-menu-toggle');
  const sidebar = document.getElementById('docs-sidebar');
  const overlay = document.getElementById('docs-sidebar-overlay');
  const closeBtn = document.getElementById('sidebar-close-btn');
  const sidebarLinks = document.querySelectorAll('.sidebar-item, .sidebar-subitem');

  // Toggle sidebar on menu button click
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      toggleSidebar();
    });
  }

  // Close sidebar on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeSidebar();
    });
  }

  // Close sidebar on overlay click
  if (overlay) {
    overlay.addEventListener('click', function() {
      closeSidebar();
    });
  }

  // Close sidebar when clicking a link on mobile
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Only close on mobile/tablet
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    });
  });

  // Close sidebar on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Close sidebar if resizing to desktop
      if (window.innerWidth >= 1024 && sidebar.classList.contains('active')) {
        closeSidebar();
      }
    }, 250);
  });
}

function toggleSidebar() {
  const menuToggle = document.getElementById('docs-menu-toggle');
  const sidebar = document.getElementById('docs-sidebar');
  const overlay = document.getElementById('docs-sidebar-overlay');

  menuToggle.classList.toggle('active');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');

  // Prevent body scroll when sidebar is open
  if (sidebar.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeSidebar() {
  const menuToggle = document.getElementById('docs-menu-toggle');
  const sidebar = document.getElementById('docs-sidebar');
  const overlay = document.getElementById('docs-sidebar-overlay');

  menuToggle.classList.remove('active');
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
  // Sidebar navigation
  const sidebarItems = document.querySelectorAll('.sidebar-item, .sidebar-subitem');
  sidebarItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.dataset.section;
      navigateToSection(section);
    });
  });
}

function navigateToSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.doc-section');
  sections.forEach(s => s.classList.remove('active'));

  // Show target section
  let targetSection;
  if (sectionId === 'api-code' || sectionId === 'api-no-code') {
    // API sub-section
    targetSection = document.getElementById('api-integration');
    if (targetSection) {
      targetSection.classList.add('active');
      // Also activate the correct sub-tab
      const subTabBtn = document.querySelector(`.subtab-btn[data-subtab="${sectionId}"]`);
      if (subTabBtn) {
        subTabBtn.click();
      }
    }
  } else {
    targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
    }
  }

  // Update sidebar active state
  const sidebarItems = document.querySelectorAll('.sidebar-item, .sidebar-subitem');
  sidebarItems.forEach(item => item.classList.remove('active'));
  const activeItem = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeItem) {
    activeItem.classList.add('active');
    // If it's a sub-item, also activate parent
    if (activeItem.classList.contains('sidebar-subitem')) {
      const parentItem = document.querySelector('[data-section="api-integration"]');
      if (parentItem) {
        parentItem.classList.add('active');
      }
    }
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update URL hash
  history.pushState(null, null, `#${sectionId}`);
}

// ==========================================
// API SUB-TABS
// ==========================================
function initApiSubTabs() {
  const subTabBtns = document.querySelectorAll('.subtab-btn');
  subTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const subtab = this.dataset.subtab;

      // Update button states
      subTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Update sub-section visibility
      const subsections = document.querySelectorAll('.api-subsection');
      subsections.forEach(s => s.classList.remove('active'));
      const targetSubsection = document.getElementById(subtab);
      if (targetSubsection) {
        targetSubsection.classList.add('active');
      }

      // Update sidebar sub-item active state
      const sidebarSubitems = document.querySelectorAll('.sidebar-subitem');
      sidebarSubitems.forEach(item => item.classList.remove('active'));
      const activeSubitem = document.querySelector(`.sidebar-subitem[data-section="${subtab}"]`);
      if (activeSubitem) {
        activeSubitem.classList.add('active');
      }

      // Update URL hash
      history.pushState(null, null, `#${subtab}`);
    });
  });
}

// ==========================================
// LANGUAGE TOGGLE
// ==========================================
function initLanguageToggle() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;

      // Update button states
      langBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Update code example visibility
      const codeExamples = document.querySelectorAll('.code-example');
      codeExamples.forEach(ex => ex.classList.remove('active'));
      const targetExample = document.getElementById(`${lang}-code`);
      if (targetExample) {
        targetExample.classList.add('active');
      }
    });
  });
}

// ==========================================
// COPY BUTTONS
// ==========================================
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.code;
      const codeBlock = document.querySelector(`#${lang}-code code`);
      if (codeBlock) {
        const text = codeBlock.textContent;
        navigator.clipboard.writeText(text).then(() => {
          // Show feedback
          const originalText = this.innerHTML;
          this.innerHTML = `
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Copied!
          `;
          this.style.background = 'var(--success)';
          this.style.color = 'white';

          setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
            this.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Failed to copy:', err);
        });
      }
    });
  });
}

// ==========================================
// HANDLE INITIAL HASH
// ==========================================
function handleInitialHash() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    setTimeout(() => {
      navigateToSection(hash);
    }, 100);
  } else {
    // Default to getting-started
    navigateToSection('getting-started');
  }
}

// Handle browser back/forward
window.addEventListener('popstate', function() {
  handleInitialHash();
});
