// ========================================
// UTILITIES - UI/UX Mega Collection
// ========================================

// Copy prompt to clipboard
function copyPrompt(element) {
    const code = element.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        showToast('✅ Prompt copiado al portapapeles!', 'success');
    }).catch(err => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('✅ Prompt copiado al portapapeles!', 'success');
    });
}

// Show toast notification
function showToast(message, type = '') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Toggle mobile menu
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// Switch horizontal tabs
function switchTab(event, tabId) {
    const container = event.target.closest('.component-card');
    
    // Remove active from all buttons
    container.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active to clicked button
    event.target.classList.add('active');
    
    // Hide all tab contents
    container.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    const targetContent = container.querySelector(`#${tabId}`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// Switch vertical tabs
function switchVTab(event, tabId) {
    const container = event.target.closest('.component-card');
    
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

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 UI/UX Mega Collection loaded successfully!');
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open menus
            const openMenus = document.querySelectorAll('.mobile-menu.active, .sidebar-menu.active');
            openMenus.forEach(menu => {
                menu.classList.remove('active');
            });
            
            const overlays = document.querySelectorAll('.sidebar-overlay.active');
            overlays.forEach(overlay => {
                overlay.classList.remove('active');
            });
        }
    });
});
