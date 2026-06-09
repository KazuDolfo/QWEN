// ========================================
// UTILIDADES GLOBALES - UI/UX MEGA COLLECTION
// ========================================

/**
 * Copia el prompt al portapapeles y muestra notificación toast
 * @param {HTMLElement} element - Elemento prompt-box clickeado
 */
function copyPrompt(element) {
  const codeElement = element.querySelector('.prompt-code');
  if (!codeElement) return;
  
  const textToCopy = codeElement.textContent.trim();
  
  // Usar Clipboard API moderna
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('✅ ¡Prompt copiado al portapapeles!');
    }).catch(err => {
      console.error('Error al copiar:', err);
      fallbackCopy(textToCopy);
    });
  } else {
    // Fallback para navegadores antiguos
    fallbackCopy(textToCopy);
  }
}

/**
 * Método fallback para copiar texto
 * @param {string} text - Texto a copiar
 */
function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showToast('✅ ¡Prompt copiado al portapapeles!');
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showToast('❌ Error al copiar. Selecciona y copia manualmente.');
  }
  
  document.body.removeChild(textarea);
}

/**
 * Muestra notificación toast temporal
 * @param {string} message - Mensaje a mostrar
 */
function showToast(message) {
  let toast = document.getElementById('toast');
  
  // Crear toast si no existe
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  // Actualizar mensaje y mostrar
  toast.textContent = message;
  toast.classList.add('show');
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Detecta el modo oscuro del sistema
 * @returns {boolean} - True si el sistema está en modo oscuro
 */
function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Escucha cambios en la preferencia de modo oscuro
 * @param {Function} callback - Función a ejecutar cuando cambie la preferencia
 */
function watchDarkMode(callback) {
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      callback(e.matches);
    });
  }
}

/**
 * Añade clase smooth-scroll al html para navegación suave
 */
function enableSmoothScroll() {
  document.documentElement.style.scrollBehavior = 'smooth';
}

/**
 * Obtiene todos los elementos visibles en el viewport
 * @param {string} selector - Selector CSS de elementos a observar
 * @param {Function} callback - Callback cuando un elemento entra/sale del viewport
 */
function observeElements(selector, callback) {
  if (!'IntersectionObserver' in window) {
    // Fallback para navegadores sin IntersectionObserver
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => callback(el, true));
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      callback(entry.target, entry.isIntersecting);
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });
  
  document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

/**
 * Debounce para funciones que se ejecutan frecuentemente
 * @param {Function} func - Función a debouncear
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función debounceada
 */
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

/**
 * Throttle para limitar ejecución de funciones
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} - Función throttleada
 */
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

/**
 * Formatea números con separadores de miles
 * @param {number} number - Número a formatear
 * @param {string} locale - Locale para formato (ej: 'es-ES')
 * @returns {string} - Número formateado
 */
function formatNumber(number, locale = 'es-ES') {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Formatea fecha en formato legible
 * @param {Date|string} date - Fecha a formatear
 * @param {string} locale - Locale para formato
 * @returns {string} - Fecha formateada
 */
function formatDate(date, locale = 'es-ES') {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Genera ID único
 * @returns {string} - ID único generado
 */
function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Verifica si un elemento está en el viewport
 * @param {HTMLElement} element - Elemento a verificar
 * @returns {boolean} - True si está visible
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Scroll suave a un elemento
 * @param {string|HTMLElement} target - Selector o elemento destino
 * @param {Object} options - Opciones de scroll
 */
function scrollToElement(target, options = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;
  
  element.scrollIntoView({
    behavior: options.behavior || 'smooth',
    block: options.block || 'start',
    inline: options.inline || 'nearest'
  });
}

/**
 * Añade parallax effect a elementos
 * @param {string} selector - Selector de elementos
 * @param {number} speed - Velocidad del efecto (0-1)
 */
function addParallax(selector, speed = 0.5) {
  const elements = document.querySelectorAll(selector);
  
  window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    
    elements.forEach(element => {
      const offset = element.offsetTop;
      const rate = scrolled * speed;
      element.style.transform = `translateY(${rate}px)`;
    });
  }, 16));
}

/**
 * Inicializa lazy loading para imágenes
 * @param {string} selector - Selector de imágenes
 */
function initLazyLoad(selector = 'img[data-src]') {
  const images = document.querySelectorAll(selector);
  
  if ('IntersectionObserver' in window) {
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
  } else {
    // Fallback: cargar todas inmediatamente
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Auto-inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  enableSmoothScroll();
  console.log('✅ Utilidades globales inicializadas');
});

// Exportar funciones para uso global
window.utils = {
  copyPrompt,
  showToast,
  isDarkMode,
  watchDarkMode,
  debounce,
  throttle,
  formatNumber,
  formatDate,
  generateId,
  isInViewport,
  scrollToElement,
  addParallax,
  initLazyLoad
};
