// ============================================
// INFO & DATOS - FUNCIONALIDADES JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar acordeones
    initAccordions();
    
    // Inicializar tooltips
    initTooltips();
    
    // Inicializar tags removibles
    initRemovableTags();
    
    // Inicializar tablas ordenables
    initSortableTables();
    
    console.log('✅ Componentes Info & Datos inicializados');
});

// --- ACORDEONES ---
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-basic, .accordion-icons');
    
    accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');
        
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.closest('.accordion-item');
                const isActive = item.classList.contains('active');
                
                // Cerrar todos los items (modo acordeón)
                accordion.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                });
                
                // Si no estaba activo, abrirlo
                if (!isActive) {
                    item.classList.add('active');
                    const content = item.querySelector('.accordion-content');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    });
}

// --- TOOLTIPS ---
function initTooltips() {
    // Los tooltips CSS-only ya funcionan con hover
    // Aquí podemos agregar funcionalidades adicionales si se necesita
    const tooltipElements = document.querySelectorAll('[data-tooltip], [data-tooltip-title]');
    
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            // Podríamos agregar lógica adicional aquí
        });
    });
}

// --- TAGS REMOVIBLES ---
function initRemovableTags() {
    const closeButtons = document.querySelectorAll('.tag-close');
    
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const tag = this.closest('.tag-removable');
            
            // Animación de salida
            tag.style.transform = 'scale(0.8)';
            tag.style.opacity = '0';
            
            setTimeout(() => {
                tag.remove();
            }, 200);
        });
    });
}

// --- TABLAS ORDENABLES ---
function initSortableTables() {
    const sortableHeaders = document.querySelectorAll('.sortable');
    
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const table = this.closest('table');
            const column = Array.from(this.parentNode.children).indexOf(this);
            const isAscending = this.classList.contains('asc');
            
            // Remover clases de ordenamiento previo
            table.querySelectorAll('th').forEach(th => {
                th.classList.remove('asc', 'desc');
            });
            
            // Establecer nuevo orden
            this.classList.add(isAscending ? 'desc' : 'asc');
            
            // Aquí iría la lógica real de ordenamiento
            // Por ahora solo mostramos el cambio visual
            console.log(`Ordenando columna ${column}, ${isAscending ? 'descendente' : 'ascendente'}`);
        });
    });
}

// --- FUNCIÓN PARA COPIAR PROMPTS (compartida con utils.js) ---
function copyPrompt(element) {
    const code = element.querySelector('code');
    if (code) {
        const text = code.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            // Feedback visual
            const originalHint = element.querySelector('.copy-hint');
            const originalText = originalHint.textContent;
            
            originalHint.textContent = '¡Copiado! ✓';
            originalHint.style.color = '#11998e';
            
            setTimeout(() => {
                originalHint.textContent = originalText;
                originalHint.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    }
}

// --- ANIMACIÓN DE SCROLL PARA TIMELINE ---
function animateTimelineOnScroll() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}

// Llamar a la animación cuando la página cargue
window.addEventListener('load', animateTimelineOnScroll);

// --- FILTRO DE TABLAS ---
function filterTable(searchInput, tableSelector) {
    const input = document.querySelector(searchInput);
    const table = document.querySelector(tableSelector);
    const filter = input.value.toUpperCase();
    const tr = table.getElementsByTagName('tr');
    
    for (let i = 1; i < tr.length; i++) {
        let showRow = false;
        const td = tr[i].getElementsByTagName('td');
        
        for (let j = 0; j < td.length; j++) {
            if (td[j]) {
                const txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                    break;
                }
            }
        }
        
        tr[i].style.display = showRow ? '' : 'none';
    }
}

// Exportar funciones para uso global
window.copyPrompt = copyPrompt;
window.filterTable = filterTable;
