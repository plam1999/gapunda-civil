// ========== Gapunda Civil Construction — Main JS ==========

document.addEventListener('DOMContentLoaded', () => {

  // ========== Detect Page Type ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage === 'index.html' || currentPage === '') {
    document.body.classList.add('page-home');
  } else {
    document.body.classList.add('page-subpage');
  }

  // ========== Sticky Navbar ==========
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // ========== Mobile Menu ==========
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');

    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      menuToggle.classList.toggle('menu-open');
      document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', !isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ========== Scroll Reveal (Intersection Observer) ==========
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .counter-line');
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

  // ========== Active Nav Link Highlighting (home page only) ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length && currentPage === 'index.html') {
    const highlightNav = () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id ||
                link.getAttribute('href').endsWith('#' + id)) {
              link.classList.add('active');
            }
          });
        }
      });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
  }

  // ========== Project Filter Tabs ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden-card');
          } else {
            card.classList.add('hidden-card');
          }
        });
      });
    });
  }

  // ========== Stat Counter Animation ==========
  const counters = document.querySelectorAll('.counter');
  let counterAnimated = false;

  if (counters.length) {
    const animateCounters = () => {
      if (counterAnimated) return;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (!target) return;
        const duration = 1500;
        const start = performance.now();
        const update = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(target * eased) + '+';
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      });
      counterAnimated = true;
    };

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      counterObserver.observe(aboutSection);
    }
  }

  // ========== Lightbox Gallery ==========
  const lightbox = document.getElementById('lightbox');
  const galleryEl = document.getElementById('gallery');

  if (lightbox && galleryEl) {
    const lightboxContent = document.getElementById('lightbox-content');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentIndex = 0;
    let galleryItems = [];

    const getGalleryItems = () => {
      return Array.from(galleryEl.querySelectorAll('.gallery-item'));
    };

    const showLightbox = (index) => {
      galleryItems = getGalleryItems();
      if (!galleryItems.length) return;
      currentIndex = index;
      const item = galleryItems[currentIndex];
      const isVideo = item.getAttribute('data-type') === 'video';

      // Check if item has a real image or video
      const img = item.querySelector('img');
      const video = item.querySelector('video');

      if (img) {
        lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt || 'Project photo'}">`;
      } else if (video) {
        lightboxContent.innerHTML = `<video src="${video.src}" controls autoplay class="w-full"></video>`;
      } else {
        // Placeholder — show a larger version of the gradient
        const gradientClasses = item.className.match(/from-[\w-]+ to-[\w-]+/);
        lightboxContent.innerHTML = `
          <div class="w-[80vw] h-[60vh] max-w-4xl rounded-xl bg-gradient-to-br ${gradientClasses ? gradientClasses[0] : 'from-charcoal to-earth-brown'} relative flex items-center justify-center">
            <div class="absolute inset-0 dot-pattern opacity-10 rounded-xl"></div>
            <div class="text-center">
              <svg class="w-16 h-16 text-white/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <p class="text-white/40 text-sm">${isVideo ? 'Video placeholder' : 'Photo placeholder'}</p>
            </div>
          </div>`;
      }

      lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
      lightbox.classList.remove('hidden');
      // Force reflow for transition
      lightbox.offsetHeight;
      lightbox.classList.add('active');
      document.body.classList.add('lightbox-open');
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('lightbox-open');
      setTimeout(() => {
        lightbox.classList.add('hidden');
        lightboxContent.innerHTML = '';
        // Stop any playing video
      }, 300);
    };

    const showPrev = () => {
      galleryItems = getGalleryItems();
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      showLightbox(currentIndex);
    };

    const showNext = () => {
      galleryItems = getGalleryItems();
      currentIndex = (currentIndex + 1) % galleryItems.length;
      showLightbox(currentIndex);
    };

    // Event delegation for gallery clicks
    galleryEl.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      const index = parseInt(item.getAttribute('data-index'), 10);
      showLightbox(index);
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // ========== Phone Field — Numbers Only ==========
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9\s\+\(\)]/g, '');
    });
  }

  // ========== Form Validation ==========
  const contactForm = document.getElementById('contact-form');
  const emailInput = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showFieldError(input, message) {
    input.classList.add('border-red-400', 'bg-red-50');
    input.classList.remove('border-gray-300', 'bg-white');
    let err = input.parentNode.querySelector('.field-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'field-error text-red-400 text-xs mt-1';
      input.parentNode.appendChild(err);
    }
    err.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove('border-red-400', 'bg-red-50');
    input.classList.add('border-gray-300', 'bg-white');
    const err = input.parentNode.querySelector('.field-error');
    if (err) err.remove();
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      if (emailInput.value && !emailRegex.test(emailInput.value)) {
        showFieldError(emailInput, 'Please enter a valid email address');
      } else {
        clearFieldError(emailInput);
      }
    });
    emailInput.addEventListener('input', () => {
      if (!emailInput.value || emailRegex.test(emailInput.value)) {
        clearFieldError(emailInput);
      }
    });
  }

  if (contactForm) {
    // Clear errors on input for all fields
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => clearFieldError(field));
    });

    contactForm.addEventListener('submit', (e) => {
      let hasError = false;

      // Clear all previous errors first
      contactForm.querySelectorAll('input, textarea, select').forEach(field => {
        clearFieldError(field);
      });

      // Validate required fields
      contactForm.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          showFieldError(field, 'This field is required');
          hasError = true;
        }
      });

      // Validate email format (only if it has a value)
      if (emailInput && emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address');
        hasError = true;
      }

      if (hasError) {
        e.preventDefault();
        const firstError = contactForm.querySelector('.border-red-400');
        if (firstError) firstError.focus();
      }
    });
  }

  // ========== Contact Form Success Handler ==========
  if (window.location.hash === '#thank-you' || window.location.search.includes('success')) {
    const successMsg = document.getElementById('form-success');
    const form = document.getElementById('contact-form');
    if (successMsg && form) {
      form.style.display = 'none';
      successMsg.classList.remove('hidden');
    }
  }

});
