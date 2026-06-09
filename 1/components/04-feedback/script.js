// FEEDBACK & NOTIFICACIONES - JAVASCRIPT

document.addEventListener('DOMContentLoaded', function() {
    initModals();
    initToasts();
    initAlerts();
    console.log('✅ Componentes Feedback inicializados');
});

// MODALES
function initModals() {
    const openButtons = document.querySelectorAll('.btn-show-modal');
    const closeButtons = document.querySelectorAll('.modal-close, .btn-cancel, .btn-primary');
    const overlays = document.querySelectorAll('.modal-overlay');

    openButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const overlay = document.getElementById(modalId);
            if (overlay) {
                overlay.classList.add('active');
                overlay.style.display = 'flex';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const overlay = this.closest('.modal-overlay');
            if (overlay) {
                overlay.classList.remove('active');
                setTimeout(() => { overlay.style.display = 'none'; }, 300);
            }
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                setTimeout(() => { overlay.style.display = 'none'; }, 300);
            }
        });
    });
}

// TOASTS
function initToasts() {
    const toastButtons = document.querySelectorAll('.btn-toast');
    
    toastButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            showToast(type);
        });
    });
}

function showToast(type) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
    const messages = { 
        success: '¡Operación exitosa!', 
        error: 'Ha ocurrido un error', 
        warning: 'Advertencia importante', 
        info: 'Información relevante' 
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type]}</span><span>${messages[type]}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ALERTAS
function initAlerts() {
    const closeButtons = document.querySelectorAll('.alert-close, .banner-close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const alert = this.closest('.alert') || this.closest('.banner-top');
            if (alert) {
                alert.style.opacity = '0';
                alert.style.transform = 'translateX(-20px)';
                setTimeout(() => alert.remove(), 300);
            }
        });
    });
}

window.copyPrompt = window.copyPrompt || function(element) {
    const code = element.querySelector('code');
    if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
            const hint = element.querySelector('.copy-hint');
            const original = hint.textContent;
            hint.textContent = '¡Copiado! ✓';
            hint.style.color = '#11998e';
            setTimeout(() => { hint.textContent = original; hint.style.color = ''; }, 2000);
        });
    }
};
