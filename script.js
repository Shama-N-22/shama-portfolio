// ===========================================================
// Footer year
// ===========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ===========================================================
// Typed role text in hero
// ===========================================================
const roles = [
  'Software Engineer',
  'Full-Stack Developer',
  'AI/ML Enthusiast'
];
const typedEl = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

// ===========================================================
// Scroll progress bar
// ===========================================================
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// ===========================================================
// Back to top button
// ===========================================================
const toTopBtn = document.getElementById('toTop');
function updateToTop() {
  toTopBtn.classList.toggle('visible', window.scrollY > 400);
}
window.addEventListener('scroll', updateToTop, { passive: true });
updateToTop();

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================================================
// Mobile menu toggle
// ===========================================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===========================================================
// Active tab on scroll (scroll-spy)
// ===========================================================
const sections = document.querySelectorAll('main section[id]');
const tabs = document.querySelectorAll('.tab');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

function setActiveTab(id) {
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === id));
  mobileLinks.forEach(l => l.classList.toggle('active', l.dataset.tab === id));
}

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveTab(entry.target.id);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => spyObserver.observe(s));

// ===========================================================
// Reveal-on-scroll for cards and content blocks
// ===========================================================
const revealTargets = document.querySelectorAll(
  '.about__text, .fact-card, .project-card, .skill-group, .timeline__item, .ed-cert, .achievements, .contact-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 40);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));