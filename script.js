const CONFIG = {
  WHATSAPP_NUMBER: '',
  INSTAGRAM_URL: '',
  EMAIL: '',
};

const contactMessage = 'Olá, João! Vim pela JVM e gostaria de falar sobre um projeto.';
const contactLinks = document.querySelectorAll('[data-contact]');
contactLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    if (!CONFIG.WHATSAPP_NUMBER) {
      event.preventDefault();
      document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => window.alert('O WhatsApp ainda não foi configurado. Edite WHATSAPP_NUMBER no arquivo script.js.'), 250);
      return;
    }
    link.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  mainNav.classList.toggle('open', !isOpen);
});
mainNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  mainNav.classList.remove('open');
}));

const modal = document.querySelector('.terms-modal');
document.querySelector('[data-modal-open]')?.addEventListener('click', () => modal?.showModal());
document.querySelector('[data-modal-close]')?.addEventListener('click', () => modal?.close());
modal?.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

const steps = document.querySelectorAll('.process-step');
const process = document.querySelector('.process-track');
if (process && steps.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    let active = 0;
    const timer = window.setInterval(() => {
      steps.forEach((step, index) => step.classList.toggle('active', index === active));
      active = (active + 1) % steps.length;
    }, 1600);
    observer.disconnect();
    window.setTimeout(() => window.clearInterval(timer), 8500);
  }, { threshold: 0.35 });
  observer.observe(process);
}
