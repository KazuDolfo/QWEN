// ========================================
// NAVEGACIÓN - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Hamburger Menu Toggle
  const hamburgers = document.querySelectorAll('.hamburger');
  hamburgers.forEach(hamburger => {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      const mobileMenu = this.nextElementSibling;
      if (mobileMenu && mobileMenu.classList.contains('mobile-menu')) {
        mobileMenu.classList.toggle('active');
      }
    });
  });

  // Tabs Functionality
  const tabContainers = document.querySelectorAll('.tabs');
  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-button');
    const contents = container.querySelectorAll('.tab-content');
    
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active from all
        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));
        
        // Add active to clicked
        this.classList.add('active');
        const target = this.getAttribute('data-tab');
        const targetContent = container.querySelector(`#${target}`);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      });
    });
  });

  // Pagination Active State
  const paginationItems = document.querySelectorAll('.pagination-item:not(.disabled)');
  paginationItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.parentElement;
      parent.querySelectorAll('.pagination-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Sidebar Active State
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // e.preventDefault(); // Commented to allow navigation
      const parent = this.closest('.sidebar-menu');
      if (parent) {
        parent.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      }
      this.classList.add('active');
    });
  });

  // Breadcrumb Click Handler
  const breadcrumbItems = document.querySelectorAll('.breadcrumb-item:not(.active)');
  breadcrumbItems.forEach(item => {
    item.addEventListener('click', function(e) {
      console.log('Navigating to:', this.getAttribute('href'));
    });
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Navbar Scroll Effect
  const navbars = document.querySelectorAll('.navbar');
  navbars.forEach(navbar => {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  });

  // Mobile Menu Close on Outside Click
  document.addEventListener('click', function(e) {
    const mobileMenus = document.querySelectorAll('.mobile-menu');
    const hamburgers = document.querySelectorAll('.hamburger');
    
    mobileMenus.forEach((menu, index) => {
      const hamburger = hamburgers[index];
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // Keyboard Navigation for Tabs
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Responsive Sidebar Toggle
  const sidebarToggles = document.querySelectorAll('[data-sidebar-toggle]');
  sidebarToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const sidebarId = this.getAttribute('data-sidebar-toggle');
      const sidebar = document.getElementById(sidebarId);
      if (sidebar) {
        sidebar.classList.toggle('collapsed');
      }
    });
  });

  console.log('✅ Navegación components initialized');
});
