// ===== CONFIGURACIÓN INICIAL =====
// La inicialización completa se encuentra al final del archivo para
// garantizar que todas las funciones estén definidas antes de ejecutarse.

// ===== MENÚ MÓVIL =====
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle del menú móvil
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Cambiar el ícono del botón
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        // Cerrar menú al hacer click en un enlace
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });

        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ===== ANIMACIONES =====
function initAnimations() {
    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para animar elementos cuando entran al viewport
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .advantage-item, .process-item, .testimonial-card');
        
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('fade-in-up', 'animated');
            }
        });
    }

    // Ejecutar animaciones al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

// ===== ENLACES DE CONTACTO =====
function initContactLinks() {
    // Configurar enlaces de WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Agregar tracking si es necesario
            console.log('WhatsApp link clicked');
        });
    });

    // Configurar enlaces de teléfono
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Phone link clicked');
        });
    });

    // Configurar enlaces de email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Email link clicked');
        });
    });
}

// ===== FUNCIONES UTILITARIAS =====

// Función para mostrar mensajes de éxito/error
function showMessage(message, type = 'success') {
    // Crear elemento de mensaje
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    
    // Estilos del mensaje
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;
    
    // Agregar al DOM
    document.body.appendChild(messageElement);
    
    // Animar entrada
    setTimeout(() => {
        messageElement.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        messageElement.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 300);
    }, 3000);
}

// Función para validar formularios
function validateForm(formData) {
    const errors = [];
    
    // Validar email
    if (formData.email && !isValidEmail(formData.email)) {
        errors.push('El email no es válido');
    }
    
    // Validar teléfono
    if (formData.phone && !isValidPhone(formData.phone)) {
        errors.push('El teléfono no es válido');
    }
    
    // Validar campos requeridos
    if (formData.name && formData.name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    return errors;
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para validar teléfono
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
    return phoneRegex.test(phone);
}

// Función para formatear números de teléfono
function formatPhoneNumber(phone) {
    // Remover todos los caracteres no numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Formatear según el país (Colombia)
    if (cleaned.length === 10) {
        return `+57 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('57')) {
        return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    
    return phone;
}

// Inicializar formulario de contacto
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        const phoneInput = form.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                this.value = formatPhoneNumber(this.value);
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const data = {
                name: form.name.value,
                phone: form.phone.value,
                message: form.message ? form.message.value : ''
            };

            const errors = validateForm(data);

            if (errors.length > 0) {
                showMessage(errors.join('\n'), 'error');
            } else {
                var text = 'Hola, soy ' + data.name + '.' +
                    (data.phone ? ' Mi contacto: ' + data.phone + '.' : '') +
                    (data.message ? ' Necesito: ' + data.message : '');
                var url = 'https://wa.me/573186997492?text=' + encodeURIComponent(text);
                window.open(url, '_blank', 'noopener');
                showMessage('\u00a1Abriendo WhatsApp!');
                form.reset();
            }
        });
    }
}

// Export for testing in Node environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports.formatPhoneNumber = formatPhoneNumber;
}

// ===== FUNCIONES DE TRACKING =====

// Función para trackear eventos
function trackEvent(eventName, eventData = {}) {
    // Aquí puedes integrar Google Analytics, Facebook Pixel, etc.
    console.log('Event tracked:', eventName, eventData);
    
    // Ejemplo con Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Ejemplo con Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
}

// Trackear clicks en botones de CTA
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.hero-button, .cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonType = this.classList.contains('hero-button-primary') ? 'primary' : 'secondary';
            
            trackEvent('cta_click', {
                button_text: buttonText,
                button_type: buttonType,
                page_section: this.closest('section')?.id || 'unknown'
            });
        });
    });
}

// ===== FUNCIONES DE PERFORMANCE =====

// Función para lazy loading de imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Función para precargar recursos críticos
function preloadCriticalResources() {
    const criticalImages = [
        'img/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash.jpg',
        'img/f.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// ===== FUNCIONES DE ACCESIBILIDAD =====

// Función para manejar navegación por teclado
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC para cerrar menú móvil
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        }
    });
}

// Función para mejorar el foco visual
function initFocusManagement() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #0599a9';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// ===== FAQ ACORDEÓN =====
function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = this.getAttribute('aria-expanded') === 'true';

            // Cerrar todos
            questions.forEach(function(q) {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('open');
            });

            // Abrir el clickeado si estaba cerrado
            if (!isOpen) {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });
}

// ===== INICIALIZACIÓN COMPLETA =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initSmoothScrolling();
    initScrollEffects();
    initAnimations();
    initContactLinks();
    initContactForm();
    initCTATracking();
    initLazyLoading();
    initKeyboardNavigation();
    initFocusManagement();
    initFAQ();

    // Precargar recursos críticos
    preloadCriticalResources();

    console.log('CyD Modulares - Landing Page cargada');
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    // Aquí puedes enviar el error a un servicio de monitoreo
});

// ===== FUNCIONES DE DEBUG =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Solo en desarrollo
    window.debugMode = true;
    
    // Función para mostrar información de debug
    window.showDebugInfo = function() {
        console.log('=== DEBUG INFO ===');
        console.log('User Agent:', navigator.userAgent);
        console.log('Screen Size:', window.screen.width + 'x' + window.screen.height);
        console.log('Viewport Size:', window.innerWidth + 'x' + window.innerHeight);
        console.log('Scroll Position:', window.scrollY);
        console.log('==================');
    };
} 