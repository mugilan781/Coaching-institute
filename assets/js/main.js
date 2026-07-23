/* ============================================
   COACHING INSTITUTE - Core JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // SVG icon helpers
  const SVG_MOON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const SVG_SUN  = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const SVG_EYE        = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const SVG_EYE_OFF    = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

  // ============================================
  // THEME TOGGLE (Light/Dark Mode)
  // ============================================
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  const storedTheme = localStorage.getItem('theme');

  if (storedTheme) {
    html.setAttribute('data-theme', storedTheme);
    if (themeToggle) themeToggle.innerHTML = storedTheme === 'dark' ? SVG_SUN : SVG_MOON;
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeToggle.innerHTML = next === 'dark' ? SVG_SUN : SVG_MOON;
    });
  }

  // ============================================
  // RTL TOGGLE
  // ============================================
  const rtlToggle = document.querySelector('.rtl-toggle');
  const storedDir = localStorage.getItem('dir');

  if (storedDir) {
    html.setAttribute('dir', storedDir);
    if (rtlToggle) rtlToggle.textContent = storedDir === 'rtl' ? 'LTR' : 'RTL';
  }

  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      const current = html.getAttribute('dir') || 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      html.setAttribute('dir', next);
      localStorage.setItem('dir', next);
      rtlToggle.textContent = next === 'rtl' ? 'LTR' : 'RTL';
    });
  }

  // ============================================
  // PROFILE DROPDOWN
  // ============================================
  const profileBtn = document.querySelector('.profile-btn');
  const profileMenu = document.querySelector('.profile-menu');

  if (profileBtn && profileMenu) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') profileMenu.classList.remove('open');
    });
  }

  // ============================================
  // MOBILE NAVIGATION
  // ============================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  let navOverlay = document.querySelector('.nav-overlay');

  // Create backdrop overlay if it doesn't exist
  if (!navOverlay) {
    navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);
  }

  function toggleNav(open) {
    navToggle.classList.toggle('active', open);
    navLinks.classList.toggle('open', open);
    navOverlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      toggleNav(!isOpen);
    });

    navOverlay.addEventListener('click', () => {
      toggleNav(false);
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleNav(false);
      });
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ============================================
  // HERO SLIDER
  // ============================================
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const indicators = heroSlider.querySelectorAll('.hero-indicator');
    const prevBtn = heroSlider.querySelector('.hero-arrow.prev');
    const nextBtn = heroSlider.querySelector('.hero-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      indicators.forEach(i => i.classList.remove('active'));
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoSlide() {
      clearInterval(slideInterval);
    }

    if (indicators.length) {
      indicators.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          goToSlide(i);
          stopAutoSlide();
          startAutoSlide();
        });
      });
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });

    goToSlide(0);
    startAutoSlide();
  }

  // ============================================
  // SCROLL REVEAL (Intersection Observer)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count')) || parseInt(el.textContent.replace(/[^0-9]/g, ''));
          const suffix = el.textContent.replace(/[0-9]/g, '').trim();
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current.toLocaleString() + (suffix ? ' ' + suffix : '');
            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          }

          requestAnimationFrame(updateCounter);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ============================================
  // ACTIVE NAV LINK
  // ============================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // FORM VALIDATION (Basic)
  // ============================================
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const required = this.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--crimson)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      if (!valid) e.preventDefault();
    });
  });

  // ============================================
  // BACK TO TOP
  // ============================================
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================
  // PROGRESS BAR ANIMATION
  // ============================================
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  if (progressBars.length) {
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width') || entry.target.style.width || '0%';
          entry.target.style.width = '0%';
          setTimeout(() => { entry.target.style.width = width; }, 100);
          progressObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(p => progressObserver.observe(p));
  }

  // ============================================
  // PASSWORD TOGGLE
  // ============================================
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (input) {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        btn.innerHTML = type === 'password' ? SVG_EYE : SVG_EYE_OFF;
      }
    });
  });

  // ============================================
  // DASHBOARD CHART PLACEHOLDER
  // ============================================
  const dashChart = document.getElementById('dashChart');
  if (dashChart) {
    const ctx = dashChart.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(30,58,138,0.4)');
    gradient.addColorStop(1, 'rgba(30,58,138,0)');

    const data = [65, 78, 82, 70, 88, 92, 85, 96];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const width = dashChart.width;
    const height = dashChart.height;
    const padding = 30;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    const maxVal = 100;
    const stepX = chartW / (data.length - 1);

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(100,116,139,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Area
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    data.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = padding + chartH - (val / maxVal) * chartH;
      ctx.lineTo(x, y);
    });
    ctx.lineTo(padding + (data.length - 1) * stepX, height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = padding + chartH - (val / maxVal) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#1E3A8A';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Dots
    data.forEach((val, i) => {
      const x = padding + i * stepX;
      const y = padding + chartH - (val / maxVal) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#1E3A8A';
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  }

  // ============================================
  // PREVENT DEFAULT FOR EMPTY LINKS
  // ============================================
  document.querySelectorAll('a[href="#"]').forEach(a => {
    a.addEventListener('click', e => e.preventDefault());
  });

  // ============================================
  // FOOTER NEWSLETTER SUBSCRIPTION
  // ============================================
  document.querySelectorAll('.footer-newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      if (input && button) {
        input.disabled = true;
        button.disabled = true;
        button.textContent = 'Subscribed!';
        
        const successMsg = document.createElement('p');
        successMsg.className = 'newsletter-success';
        successMsg.textContent = 'Thank you! You have subscribed successfully.';
        successMsg.style.color = '#10B981'; // Emerald/Green color
        successMsg.style.fontSize = '0.85rem';
        successMsg.style.marginTop = '10px';
        successMsg.style.fontWeight = '500';
        
        const existing = form.parentElement.querySelector('.newsletter-success');
        if (existing) existing.remove();
        
        form.parentElement.appendChild(successMsg);
        
        successMsg.style.opacity = '0';
        successMsg.style.transition = 'opacity 0.3s ease';
        setTimeout(() => successMsg.style.opacity = '1', 50);
      }
    });
  });

});

