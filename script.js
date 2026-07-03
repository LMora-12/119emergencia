// Funciones de navegación
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Modales - Demo
function openDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.add('active');
}

function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.remove('active');
}

function submitDemoForm(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    showNotification('✓ Solicitud enviada correctamente', 'success');
    form.reset();
    closeDemoModal();
}

// Modales - Características
function openFeatureModal(title, description) {
    const modal = document.getElementById('featureModal');
    document.getElementById('featureTitle').textContent = title;
    document.getElementById('featureDescription').textContent = description;
    modal.classList.add('active');
}

function closeFeatureModal() {
    const modal = document.getElementById('featureModal');
    modal.classList.remove('active');
}

// Formulario de contacto
function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    
    showNotification('✓ Mensaje enviado correctamente', 'success');
    form.reset();
}

// Notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #06b6d4, #0052cc)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.4s ease;
        font-weight: 600;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Cerrar modales al hacer clic fuera
document.addEventListener('click', function(event) {
    const demoModal = document.getElementById('demoModal');
    const featureModal = document.getElementById('featureModal');
    
    if (event.target === demoModal) {
        closeDemoModal();
    }
    if (event.target === featureModal) {
        closeFeatureModal();
    }
});

// Cerrar modales con ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDemoModal();
        closeFeatureModal();
    }
});

// Intersection Observer para animaciones en scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos con animación
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card, .mobile-feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Animación de contador
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Agregar estilos de animación dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .notification {
        animation: slideInRight 0.4s ease !important;
    }
`;
document.head.appendChild(style);

// Funcionalidades de descargas
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const text = this.querySelector('div div:last-child').textContent;
        showNotification(`Redirigiendo a ${text}...`, 'info');
    });
});

// Activar efecto hover en cards
document.querySelectorAll('.feature-card, .benefit-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(6, 182, 212, 0.2)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

console.log('119 Emergencias - Landing Page Cargado ✓');

// boton de chat 
// Selectores
const toggleBtn = document.getElementById('chat-toggle');
const widget = document.getElementById('chat-widget');
const closeBtn = document.getElementById('chat-close');
const form = document.getElementById('chat-form');
const input = document.getElementById('chat-input');
const messages = document.getElementById('chat-messages');

let open = false;

function openChat() {
  widget.classList.remove('chat-closed');
  widget.classList.add('chat-open');
  toggleBtn.setAttribute('aria-expanded', 'true');
  widget.setAttribute('aria-hidden', 'false');
  open = true;
  setTimeout(() => input.focus(), 120); // foco en input al abrir
}

function closeChat() {
  widget.classList.remove('chat-open');
  widget.classList.add('chat-closed');
  toggleBtn.setAttribute('aria-expanded', 'false');
  widget.setAttribute('aria-hidden', 'true');
  open = false;
  toggleBtn.focus();
}

toggleBtn.addEventListener('click', () => {
  if (open) closeChat(); else openChat();
});

closeBtn.addEventListener('click', closeChat);

// Enviar mensajes (simulación local)
// Reemplaza la función sendToServer por fetch() si tienes backend.
function appendMessage(text, who='bot') {
  const div = document.createElement('div');
  div.className = who === 'user' ? 'user-msg' : 'bot-msg';
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function sendToServer(text) {
  // Ejemplo: enviar a tu API:
  // return fetch('/api/chat', {method:'POST', body:JSON.stringify({text}), headers:{'Content-Type':'application/json'}})
  //   .then(r=>r.json());
  // Aquí simulamos respuesta:
  return new Promise((res) => {
    setTimeout(() => res({reply: `Respuesta automática a: "${text}"`}), 900);
  });
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const txt = input.value.trim();
  if (!txt) return;
  appendMessage(txt, 'user');
  input.value = '';
  input.disabled = true;
  // Llamada a servidor / IA
  try {
    const resp = await sendToServer(txt);
    appendMessage(resp.reply || 'Lo siento, ocurrió un error.');
  } catch (err) {
    appendMessage('Error de conexión. Intente más tarde.');
    console.error(err);
  } finally {
    input.disabled = false;
    input.focus();
  }
});

// Permite enviar con Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    form.dispatchEvent(new Event('submit', {cancelable: true, bubbles: true}));
  }
});

// Cerrar con Escape cuando está abierto
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && open) closeChat();
});