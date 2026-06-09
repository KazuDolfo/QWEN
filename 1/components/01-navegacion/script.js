// ========================================
// NAVEGACIÓN - JavaScript Específico
// ========================================

// Toggle mobile menu with animation
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const btn = event.target.closest('button');
    
    if (menu) {
        menu.classList.toggle('active');
        btn.classList.toggle('active');
    }
}

// Toggle sidebar with overlay
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Switch horizontal tabs with animation
function switchTab(event, tabId) {
    const container = event.target.closest('.component-card');
    
    if (!container) return;
    
    // Remove active from all buttons
    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    event.target.classList.add('active');
    
    // Hide all tab contents with fade out
    container.querySelectorAll('.tab-content').forEach(content => {
        content.style.opacity = '0';
        setTimeout(() => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
                setTimeout(() => {
                    content.style.opacity = '1';
                }, 50);
            }
        }, 300);
    });
}

// Switch vertical tabs
function switchVTab(event, tabId) {
    const container = event.target.closest('.component-card');
    
    if (!container) return;
    
    // Remove active from all buttons
    container.querySelectorAll('.v-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    event.target.classList.add('active');
    
    // Hide all tab contents
    container.querySelectorAll('.v-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    const targetContent = container.querySelector(`#${tabId}`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (sidebar && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
        
        // Close any open mobile menus
        document.querySelectorAll('.mobile-menu.active, .mobile-menu-slide.active').forEach(menu => {
            menu.classList.remove('active');
        });
        
        document.querySelectorAll('.hamburger-animated.active').forEach(btn => {
            btn.classList.remove('active');
        });
    }
});

// Add smooth scroll to breadcrumb links
document.addEventListener('DOMContentLoaded', () => {
    // Animate pagination dots on click
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', function() {
            this.parentElement.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add keyboard navigation to tabs
    document.querySelectorAll('.tabs-horizontal, .tabs-icon').forEach(tabContainer => {
        const buttons = tabContainer.querySelectorAll('.tab-btn, .icon-tab-btn');
        
        buttons.forEach((btn, index) => {
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % buttons.length;
                    buttons[nextIndex].focus();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + buttons.length) % buttons.length;
                    buttons[prevIndex].focus();
                }
            });
        });
    });
    
    // Dropdown breadcrumb close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-breadcrumb')) {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
});

console.log('🧭 Navegación module loaded successfully!');
