// Funcionalidades interactivas para la galería de componentes UI/UX

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Animación de entrada para las tarjetas
    const cards = document.querySelectorAll('.component-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // 2. Copiar prompt al hacer click
    const promptBoxes = document.querySelectorAll('.prompt-box');
    
    promptBoxes.forEach(box => {
        box.style.cursor = 'pointer';
        box.title = 'Click para copiar el prompt';
        
        box.addEventListener('click', function() {
            const promptText = this.querySelector('p').textContent;
            
            navigator.clipboard.writeText(promptText).then(() => {
                // Feedback visual
                const originalBg = this.style.background;
                this.style.background = 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)';
                
                // Mostrar mensaje temporal
                const message = document.createElement('span');
                message.textContent = '✓ ¡Copiado!';
                message.style.cssText = `
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    background: #10b981;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    animation: fadeInOut 1.5s ease;
                `;
                
                this.style.position = 'relative';
                this.appendChild(message);
                
                setTimeout(() => {
                    this.style.background = originalBg;
                    message.remove();
                }, 1500);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    });
    
    // 3. Animación del spinner cuando es visible
    const spinner = document.querySelector('.spinner');
    if (spinner) {
        spinner.style.animationPlayState = 'running';
    }
    
    // 4. Toggle switch interactivo
    const toggles = document.querySelectorAll('.toggle-switch input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const state = this.checked ? 'ON' : 'OFF';
            console.log(`Toggle cambiado a: ${state}`);
        });
    });
    
    // 5. Botones con efecto ripple
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // 6. Progress bar animada
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        // Animación de carga inicial
        const targetWidth = progressBar.style.width;
        progressBar.style.width = '0%';
        
        setTimeout(() => {
            progressBar.style.width = targetWidth;
        }, 500);
    }
    
    // 7. Tooltip mejorado con seguimiento del mouse
    const tooltipContainers = document.querySelectorAll('.tooltip-container');
    tooltipContainers.forEach(container => {
        const tooltip = container.querySelector('.tooltip');
        
        container.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const xPos = x < rect.width / 2 ? 'left' : 'right';
            
            tooltip.style.left = xPos === 'left' ? '0%' : '100%';
            tooltip.style.transform = xPos === 'left' ? 'translateX(-50%)' : 'translateX(-50%)';
        });
    });
    
    // 8. Menu items interactivos
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 9. Search bar con feedback
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const value = this.value.trim();
            if (value.length > 0) {
                this.style.borderColor = 'var(--primary-color)';
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    }
    
    // 10. Avatar group con efecto hover mejorado
    const avatarGroups = document.querySelectorAll('.avatar-group');
    avatarGroups.forEach(group => {
        const avatars = group.querySelectorAll('.avatar');
        avatars.forEach(avatar => {
            avatar.addEventListener('mouseenter', function() {
                avatars.forEach(a => {
                    if (a !== this) {
                        a.style.opacity = '0.5';
                    }
                });
            });
            
            avatar.addEventListener('mouseleave', function() {
                avatars.forEach(a => {
                    a.style.opacity = '1';
                });
            });
        });
    });
    
    // 11. Floating label animation enhancement
    const formInputs = document.querySelectorAll('.form-group input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // 12. Toast notification demo (auto-dismiss)
    const toast = document.querySelector('.toast');
    if (toast) {
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease forwards';
        }, 3000);
    }
    
    // Agregar animación slideOut
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .nav-links a::after {
            content: '';
            display: block;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: width 0.3s ease;
        }
        
        .nav-links a:hover::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
    
    // 13. Contador de clicks en botones
    let clickCount = 0;
    buttons.forEach(button => {
        button.addEventListener('dblclick', function() {
            clickCount++;
            console.log(`Total double clicks: ${clickCount}`);
        });
    });
    
    // 14. Theme toggle (opcional - para futura expansión)
    console.log('🎨 Galería UI/UX cargada correctamente');
    console.log('💡 Tip: Haz click en cualquier prompt para copiarlo al portapapeles');
    
    // 15. Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Cerrar cualquier tooltip o elemento abierto
            const tooltips = document.querySelectorAll('.tooltip');
            tooltips.forEach(tooltip => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            });
        }
    });
    
    // 16. Smooth scroll para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 17. Lazy loading para imágenes (si se agregan)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 18. Performance monitoring
    const startTime = performance.now();
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`⚡ Página cargada en ${loadTime.toFixed(2)}ms`);
    });
    
    // 19. Add keyboard shortcut para copiar prompts (Ctrl/Cmd + C cuando está enfocado)
    promptBoxes.forEach(box => {
        box.setAttribute('tabindex', '0');
        box.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                const promptText = box.querySelector('p').textContent;
                navigator.clipboard.writeText(promptText);
            }
        });
    });
    
    // 20. Easter egg - Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s ease infinite';
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 5000);
        
        console.log('🌈 ¡Easter egg activado!');
    }
});

// Utility function para debounce
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

// Utility function para throttle
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Exportar funciones útiles para uso externo
window.UIGalleryUtils = {
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    },
    
    showNotification: (message, type = 'success') => {
        const notification = document.createElement('div');
        notification.className = `toast ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

console.log('✅ Todos los scripts cargados exitosamente');
