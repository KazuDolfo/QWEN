/* ========================================
   FORMULARIOS - JavaScript Específico
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Auto-resize textarea
    const autoTextareas = document.querySelectorAll('.textarea-auto');
    autoTextareas.forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
    // Character counter for textarea
    const textareaCounter = document.getElementById('textarea-counter');
    if (textareaCounter) {
        const counterDisplay = textareaCounter.parentElement.querySelector('.char-count');
        const maxLength = parseInt(textareaCounter.getAttribute('maxlength')) || 200;
        
        textareaCounter.addEventListener('input', function() {
            const currentLength = this.value.length;
            counterDisplay.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength * 0.9) {
                counterDisplay.style.color = '#ef4444';
                counterDisplay.style.fontWeight = '700';
            } else {
                counterDisplay.style.color = '#6b7280';
                counterDisplay.style.fontWeight = 'normal';
            }
        });
    }
    
    // Range slider value display
    const rangeSliders = document.querySelectorAll('.range-slider:not(.vertical)');
    rangeSliders.forEach(slider => {
        const valueSpan = slider.parentElement.querySelector('.range-value');
        if (valueSpan) {
            slider.addEventListener('input', function() {
                valueSpan.textContent = `${this.value}%`;
            });
        }
    });
    
    // Double slider functionality (simulated)
    const doubleSlider = document.querySelector('.double-slider');
    if (doubleSlider) {
        const thumbMin = doubleSlider.querySelector('.thumb-min');
        const thumbMax = doubleSlider.querySelector('.thumb-max');
        const track = doubleSlider.querySelector('.slider-track');
        const minDisplay = doubleSlider.parentElement.querySelector('.range-min');
        const maxDisplay = doubleSlider.parentElement.querySelector('.range-max');
        
        let isDragging = false;
        let currentThumb = null;
        
        const updateSlider = (clientX) => {
            if (!currentThumb || !doubleSlider) return;
            
            const rect = doubleSlider.getBoundingClientRect();
            let percentage = ((clientX - rect.left) / rect.width) * 100;
            percentage = Math.max(0, Math.min(100, percentage));
            
            if (currentThumb === thumbMin && percentage < 75) {
                thumbMin.style.left = percentage + '%';
                track.style.left = percentage + '%';
                if (minDisplay) minDisplay.textContent = Math.round(percentage * 10);
            } else if (currentThumb === thumbMax && percentage > 25) {
                thumbMax.style.left = percentage + '%';
                track.style.right = (100 - percentage) + '%';
                if (maxDisplay) maxDisplay.textContent = Math.round(percentage * 10);
            }
        };
        
        thumbMin?.addEventListener('mousedown', (e) => {
            isDragging = true;
            currentThumb = thumbMin;
            e.preventDefault();
        });
        
        thumbMax?.addEventListener('mousedown', (e) => {
            isDragging = true;
            currentThumb = thumbMax;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSlider(e.clientX);
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            currentThumb = null;
        });
        
        // Touch support
        thumbMin?.addEventListener('touchstart', (e) => {
            isDragging = true;
            currentThumb = thumbMin;
        });
        
        thumbMax?.addEventListener('touchstart', (e) => {
            isDragging = true;
            currentThumb = thumbMax;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSlider(e.touches[0].clientX);
            }
        });
        
        document.addEventListener('touchend', () => {
            isDragging = false;
            currentThumb = null;
        });
    }
    
    // File upload drag and drop
    const uploadZones = document.querySelectorAll('.file-upload-zone, .upload-placeholder');
    uploadZones.forEach(zone => {
        const fileInput = zone.querySelector('.file-input');
        
        zone.addEventListener('click', () => {
            fileInput?.click();
        });
        
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.borderColor = 'var(--primary)';
            zone.style.background = 'rgba(79, 70, 229, 0.1)';
        });
        
        zone.addEventListener('dragleave', () => {
            zone.style.borderColor = '';
            zone.style.background = '';
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.borderColor = '';
            zone.style.background = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                console.log('Archivos recibidos:', files);
                alert(`${files.length} archivo(s) recibido(s)`);
            }
        });
        
        fileInput?.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                console.log('Archivos seleccionados:', files);
            }
        });
    });
    
    // Remove file buttons
    const removeButtons = document.querySelectorAll('.remove-file');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const fileItem = btn.closest('.file-item');
            if (fileItem) {
                fileItem.style.opacity = '0';
                fileItem.style.transform = 'translateX(-20px)';
                setTimeout(() => fileItem.remove(), 300);
            }
        });
    });
    
    // Tag removal in multi-select
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            setTimeout(() => tag.remove(), 300);
        });
    });
    
    // Dropdown search functionality
    const searchableDropdowns = document.querySelectorAll('.searchable-dropdown');
    searchableDropdowns.forEach(dropdown => {
        const input = dropdown.querySelector('.dropdown-input input');
        const list = dropdown.querySelector('.dropdown-list');
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        if (input && list) {
            input.addEventListener('focus', () => {
                list.style.display = 'block';
            });
            
            input.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    item.style.display = text.includes(searchTerm) ? 'block' : 'none';
                });
            });
            
            items.forEach(item => {
                item.addEventListener('click', function() {
                    const text = this.textContent.replace(/^[^\s]+\s/, '');
                    input.value = text;
                    list.style.display = 'none';
                });
            });
            
            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    list.style.display = 'none';
                }
            });
        }
    });
    
    // Floating label animation fix for autofill
    const floatingInputs = document.querySelectorAll('.input-floating input');
    floatingInputs.forEach(input => {
        input.addEventListener('animationstart', () => {
            input.classList.add('has-value');
        });
    });
    
    // Checkbox cards visual feedback
    const checkboxCards = document.querySelectorAll('.checkbox-card input[type="checkbox"]');
    checkboxCards.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const card = this.closest('.checkbox-card');
            const cardContent = card?.querySelector('.card-content');
            
            if (cardContent) {
                if (this.checked) {
                    if (!cardContent.querySelector('.check-indicator')) {
                        const indicator = document.createElement('span');
                        indicator.className = 'check-indicator';
                        indicator.textContent = '✓';
                        indicator.style.cssText = 'position: absolute; top: 10px; right: 10px; color: var(--primary); font-weight: bold; font-size: 1.5rem;';
                        cardContent.appendChild(indicator);
                    }
                } else {
                    const indicator = cardContent.querySelector('.check-indicator');
                    if (indicator) indicator.remove();
                }
            }
        });
    });
    
    // Radio button group visual feedback
    const radioGroups = document.querySelectorAll('.radio-group');
    radioGroups.forEach(group => {
        const radios = group.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                radios.forEach(r => {
                    const label = r.closest('.radio-custom');
                    if (label) {
                        if (r.checked) {
                            label.style.color = 'var(--primary)';
                            label.style.fontWeight = '700';
                        } else {
                            label.style.color = 'var(--gray-700)';
                            label.style.fontWeight = '500';
                        }
                    }
                });
            });
        });
    });
    
    // Toggle switch label update
    const switches = document.querySelectorAll('.switch');
    switches.forEach(sw => {
        const checkbox = sw.querySelector('input[type="checkbox"]');
        const label = sw.parentElement.querySelector('.switch-label');
        
        if (checkbox && label) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    label.textContent = 'Activado';
                    label.style.color = 'var(--success)';
                } else {
                    label.textContent = 'Desactivado';
                    label.style.color = 'var(--gray-700)';
                }
            });
        }
    });
    
    // Input validation real-time
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const wrapper = this.closest('.input-wrapper');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('input-error');
                this.classList.remove('input-success');
                
                let errorMsg = wrapper?.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('span');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = '❌ Email inválido';
                    wrapper?.appendChild(errorMsg);
                }
            } else if (this.value) {
                this.classList.remove('input-error');
                this.classList.add('input-success');
                
                const errorMsg = wrapper?.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
                
                let successMsg = wrapper?.querySelector('.success-message');
                if (!successMsg) {
                    successMsg = document.createElement('span');
                    successMsg.className = 'success-message';
                    successMsg.textContent = '✓ Email válido';
                    wrapper?.appendChild(successMsg);
                }
            }
        });
    });
    
    console.log('✅ Formularios inicializados correctamente');
});

// Copy prompt function
function copyPrompt(element) {
    const text = element.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
        const originalBg = element.style.background;
        const originalText = element.innerHTML;
        
        element.style.background = '#10b981';
        element.innerHTML = '✅ ¡Copiado al portapapeles!';
        
        setTimeout(() => {
            element.style.background = originalBg;
            element.innerHTML = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar. Por favor copia manualmente.');
    });
}
