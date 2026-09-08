const WHATSAPP_NUMBER = '5586994832401';

const PLANS = {
  'landing-essencial': {
    name: 'Landing Page Essencial',
    priceLabel: 'R$ 350',
    cta: 'Tenho interesse',
    features: ['Landing page profissional', 'Design responsivo', 'Integração com WhatsApp', 'Organização do conteúdo', 'Seções estratégicas', 'Publicação', '1 mês de manutenção após a entrega'],
  },
  'landing-plus': {
    name: 'Landing Page Plus',
    priceLabel: 'R$ 600',
    cta: 'Quero este plano',
    features: ['Tudo da Landing Page Essencial', '3 meses de manutenção', '3 meses de hospedagem incluída', 'Atualizações de textos, preços, imagens, links e contatos', 'Pequenos ajustes visuais'],
  },
  'loja-start': {
    name: 'Loja Virtual Start',
    priceLabel: 'R$ 800',
    cta: 'Tenho interesse',
    features: ['Catálogo de produtos', 'Página individual dos produtos', 'Imagens, descrições e preços', 'Carrinho e quantidades', 'Resumo do pedido', 'Finalização pelo WhatsApp', 'Design responsivo'],
  },
  'loja-pro': {
    name: 'Loja Virtual Pro',
    priceLabel: 'R$ 1.500',
    cta: 'Quero este plano',
    features: ['Tudo da Loja Virtual Start', 'Cadastro de clientes', 'Login e autenticação', 'Banco de dados', 'Área do cliente', 'Dados vinculados à conta', 'Carrinho vinculado ao usuário', 'Finalização pelo WhatsApp'],
  },
  'ecommerce-completo': {
    name: 'E-commerce Completo',
    priceLabel: 'A partir de R$ 2.500',
    cta: 'Solicitar orçamento',
    features: ['Site institucional + loja', 'Catálogo e páginas de produtos', 'Carrinho', 'Cadastro e login', 'Banco de dados e área do cliente', 'Checkout', 'Pagamento online, PIX e cartão', 'Integração com provedor de pagamento', 'Estrutura personalizada'],
    isQuote: true,
  },
};

function createWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

let selectedPlan = null;
let opener = null;
const interestModal = document.querySelector('#interest-modal');
const interestForm = document.querySelector('#interest-form');
const interestTitle = document.querySelector('#interest-title');
const interestPrice = document.querySelector('#interest-price');
const interestFeatures = document.querySelector('#interest-features');
const planButtons = document.querySelectorAll('[data-plan]');

function openInterestModal(planId, trigger) {
  const plan = PLANS[planId];
  if (!plan || !interestModal) return;
  selectedPlan = plan;
  opener = trigger;
  interestTitle.textContent = plan.name;
  interestPrice.textContent = plan.priceLabel;
  interestFeatures.innerHTML = plan.features.map((feature) => `<li>${feature}</li>`).join('');
  interestModal.showModal();
  document.querySelector('#project-name')?.focus();
}

planButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    openInterestModal(button.dataset.plan, button);
  });
});

function closeInterestModal() {
  if (!interestModal) return;
  interestModal.close();
  opener?.focus();
}

document.querySelector('[data-interest-close]')?.addEventListener('click', closeInterestModal);
interestModal?.addEventListener('click', (event) => {
  if (event.target === interestModal) closeInterestModal();
});
interestForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!selectedPlan) return;
  const formData = new FormData(interestForm);
  const projectName = formData.get('projectName')?.trim();
  const segment = formData.get('segment')?.trim();
  const need = formData.get('need')?.trim();
  const lines = [
    `Olá, João! Vim pelo site da JVM e tenho interesse ${selectedPlan.isQuote ? 'no' : 'na'} ${selectedPlan.name} ${selectedPlan.isQuote ? ', a partir de R$ 2.500' : 'de ' + selectedPlan.priceLabel}.`,
    projectName ? `Empresa: ${projectName}` : '',
    segment ? `Segmento: ${segment}` : '',
    need ? `Sobre o projeto:\\n${need}` : '',
    selectedPlan.isQuote ? 'Gostaria de solicitar um orçamento e conversar sobre as funcionalidades necessárias.' : 'Gostaria de conversar sobre meu projeto e entender os próximos passos.',
  ].filter(Boolean);
  window.open(createWhatsAppUrl(lines.join('\\n\\n')), '_blank', 'noopener,noreferrer');
  closeInterestModal();
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

const genericWhatsAppUrl = createWhatsAppUrl('Olá, João! Vi seu trabalho através do site da JVM e gostaria de conversar sobre um projeto.');
document.querySelectorAll('[data-contact]').forEach((link) => {
  link.href = genericWhatsAppUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

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
