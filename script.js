// =========================================================
// Shared state
// =========================================================
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// =========================================================
// Footer year
// =========================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// =========================================================
// Sticky nav shadow + mobile menu toggle
// =========================================================
const navEl = document.getElementById('site-nav');
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

if (navEl) {
  const onScroll = () => navEl.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// =========================================================
// Active nav link on scroll
// =========================================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__link');

if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.remove('is-active'));
        const activeLink = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('is-active');
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

// =========================================================
// Scroll-reveal
// =========================================================
const revealEls = document.querySelectorAll('.reveal');

if (prefersReduced || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

// =========================================================
// Hero formula-bar typewriter
// =========================================================
const roles = [
  "Civil Engineer", "Project Manager", "Construction Consultant"
];
const typewriterEl = document.getElementById('typewriter-role');

if (typewriterEl) {
  if (prefersReduced) {
    typewriterEl.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const TYPE_SPEED = 65;
    const DELETE_SPEED = 32;
    const HOLD_TIME = 1500;
    const GAP_TIME = 400;

    const tick = () => {
      const currentRole = roles[roleIndex];

      if (!deleting) {
        charIndex += 1;
        typewriterEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === currentRole.length) {
          deleting = true;
          setTimeout(tick, HOLD_TIME);
          return;
        }
        setTimeout(tick, TYPE_SPEED);
      } else {
        charIndex -= 1;
        typewriterEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, GAP_TIME);
          return;
        }
        setTimeout(tick, DELETE_SPEED);
      }
    };

    tick();
  }
}

// =========================================================
// Project modal ("View Project")
// =========================================================
const projectModal = document.getElementById('project-modal');
const viewProjectBtn = document.getElementById('view-project-btn');

if (projectModal && viewProjectBtn) {
  const closeTriggers = projectModal.querySelectorAll('[data-close]');
  const closeBtn = projectModal.querySelector('.project-modal__close');

  const openProjectModal = () => {
    projectModal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeProjectModal = () => {
    projectModal.hidden = true;
    document.body.style.overflow = '';
    viewProjectBtn.focus();
  };

  viewProjectBtn.addEventListener('click', openProjectModal);
  closeTriggers.forEach((el) => el.addEventListener('click', closeProjectModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !projectModal.hidden) closeProjectModal();
  });
}

// =========================================================
// Contact form (Formspree-compatible AJAX submit)
// =========================================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const statusEl = document.getElementById('form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Honeypot: if this hidden field has a value, silently ignore the submit.
    const honeypot = contactForm.elements.company;
    if (honeypot && honeypot.value) return;

    const action = contactForm.getAttribute('action') || '';
    if (action.includes('YOUR_FORM_ID')) {
      statusEl.textContent = 'Contact form is not connected yet. Add your Formspree endpoint in index.html (see README).';
      statusEl.className = 'form-status is-error';
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusEl.textContent = '';
    statusEl.className = 'form-status';

    try {
      const response = await fetch(action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      });

      if (response.ok) {
        statusEl.textContent = 'Message sent. I will get back to you soon.';
        statusEl.className = 'form-status is-success';
        contactForm.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please email me directly instead.';
      statusEl.className = 'form-status is-error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
