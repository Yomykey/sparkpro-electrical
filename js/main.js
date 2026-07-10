// ==========================================================================
// SparkPro Electrical — Global JS (sticky header, mobile nav, AOS init)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ---- Sticky header scroll state ----
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---- Mobile nav ----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav-panel');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  const openNav = () => {
    hamburger.classList.add('open');
    mobileNav.classList.add('open');
    mobileNavOverlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeNav = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    mobileNav.classList.contains('open') ? closeNav() : openNav();
  });

  mobileNavClose.addEventListener('click', closeNav);
  mobileNavOverlay.addEventListener('click', closeNav);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeNav();
    }
  });

  // ---- Booking bar quote form (client-side only) ----
  const quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    const quoteSuccess = document.getElementById('quote-success');
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!quoteForm.checkValidity()) {
        quoteForm.reportValidity();
        return;
      }
      // TODO: wire to real form backend / email service when a client is attached
      quoteForm.hidden = true;
      quoteSuccess.hidden = false;
    });
  }

  // ---- Contact form (client-side only) ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const contactSuccess = document.getElementById('contact-success');
    const serviceSelect = document.getElementById('cf-service');

    const requestedService = new URLSearchParams(window.location.search).get('service');
    if (requestedService && serviceSelect && serviceSelect.querySelector(`option[value="${requestedService}"]`)) {
      serviceSelect.value = requestedService;
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      // TODO: wire to real form backend / email service when a client is attached
      contactForm.hidden = true;
      contactSuccess.hidden = false;
    });
  }

  // ---- AOS init (respects reduced motion) ----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof AOS !== 'undefined') {
    if (!prefersReducedMotion) {
      AOS.init({ duration: 500, easing: 'ease-out', once: true, offset: 60 });
    } else {
      AOS.init({ disable: true });
    }
  }
});
