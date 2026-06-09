// Funciones JavaScript para la colección UI/UX

// Copiar prompt al portapapeles
function copyPrompt(element) {
    const promptText = element.innerText.replace('Prompt: "', '').slice(0, -1);
    
    navigator.clipboard.writeText(promptText).then(() => {
        const originalText = element.innerHTML;
        element.innerHTML = '<strong>✓ ¡Copiado!</strong>';
        element.style.background = '#d4edda';
        element.style.borderColor = '#28a745';
        
        setTimeout(() => {
            element.innerHTML = originalText;
            element.style.background = '#f8f9fa';
            element.style.borderColor = '#e9ecef';
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to component cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.component-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});

// Tab functionality
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
}

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('active'), 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    }
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-backdrop.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        });
    }
});

// Lazy loading images
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imgObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imgObserver.observe(img);
    });
}

console.log('UI/UX Collection loaded successfully! 🎨');
