// ========== Shared Header & Footer Components ==========

function getBasePath() {
  return document.documentElement.getAttribute('data-base') || './';
}

function renderHeader() {
  const base = getBasePath();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navItems = [
    { href: `${base}index.html`, label: 'Home', id: 'home' },
    { href: `${base}index.html#services`, label: 'Services', id: 'services' },
    { href: `${base}index.html#about`, label: 'About', id: 'about' },
    { href: `${base}index.html#projects`, label: 'Projects', id: 'projects' },
    { href: `${base}index.html#clients`, label: 'Clients', id: 'clients' },
  ];

  const isActive = (item) => {
    if (item.id === 'projects' && (currentPage === 'projects.html' || currentPage.startsWith('project'))) return true;
    if (item.id === 'home' && (currentPage === 'index.html' || currentPage === '')) return true;
    return false;
  };

  const desktopLinks = navItems.map(item =>
    `<a href="${item.href}" class="nav-link ${isActive(item) ? 'active' : ''} transition-colors text-sm font-medium">${item.label}</a>`
  ).join('');

  const mobileLinks = navItems.map(item =>
    `<a href="${item.href}" class="mobile-nav-link text-white text-2xl font-semibold hover:text-orange transition-colors">${item.label}</a>`
  ).join('');

  return `
  <header id="navbar" class="fixed top-0 left-0 w-full z-50" role="banner">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <a href="${base}index.html" class="flex-shrink-0" aria-label="Gapunda Civil Construction — Home">
          <img src="${base}assets/images/company-logo.png" alt="Gapunda Civil Construction" width="150" height="48" decoding="async" class="h-10 md:h-12 w-auto header-logo">
        </a>
        <nav class="hidden lg:flex items-center space-x-8" aria-label="Primary navigation">
          ${desktopLinks}
          <a href="${base}index.html#contact" class="bg-orange hover:bg-orange-dark text-white px-5 py-2.5 rounded-md text-sm font-semibold transition-colors">Get a Quote</a>
        </nav>
        <button id="menu-toggle" class="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 z-50" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu">
          <span class="hamburger-line w-6 h-0.5 bg-charcoal transition-all duration-300"></span>
          <span class="hamburger-line w-6 h-0.5 bg-charcoal transition-all duration-300"></span>
          <span class="hamburger-line w-6 h-0.5 bg-charcoal transition-all duration-300"></span>
        </button>
      </div>
    </div>
  </header>
  <nav id="mobile-menu" class="fixed inset-0 z-[60] bg-charcoal-dark/95 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden" aria-label="Mobile navigation">
    ${mobileLinks}
    <a href="${base}index.html#contact" class="mobile-nav-link bg-orange hover:bg-orange-dark text-white px-8 py-3 rounded-md text-xl font-semibold transition-colors mt-4">Get a Quote</a>
  </nav>`;
}

function renderFooter() {
  const base = getBasePath();
  return `
  <footer class="bg-charcoal-dark pt-12 md:pt-16 pb-6" role="contentinfo">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-10 border-b border-white/10">
        <div>
          <img src="${base}assets/images/company-logo.png" alt="Gapunda Civil Construction" width="125" height="40" loading="lazy" decoding="async" class="h-10 w-auto mb-4 footer-logo-invert">
          <p class="text-gray-400 text-sm leading-relaxed">Proudly Indigenous-owned civil construction company delivering quality workmanship across the Northern Territory.</p>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2.5">
            <li><a href="${base}index.html" class="text-gray-400 hover:text-orange text-sm transition-colors">Home</a></li>
            <li><a href="${base}index.html#services" class="text-gray-400 hover:text-orange text-sm transition-colors">Services</a></li>
            <li><a href="${base}index.html#about" class="text-gray-400 hover:text-orange text-sm transition-colors">About Us</a></li>
            <li><a href="${base}index.html#projects" class="text-gray-400 hover:text-orange text-sm transition-colors">Projects</a></li>
            <li><a href="${base}index.html#contact" class="text-gray-400 hover:text-orange text-sm transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white font-semibold mb-4">Contact Us</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-orange mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              866 Stuart Highway, Pinelands NT 0829
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-orange mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <a href="mailto:admin@gapundacivil.com.au" class="hover:text-orange transition-colors">admin@gapundacivil.com.au</a>
            </li>
            <li class="flex items-start gap-2">
              <svg class="w-4 h-4 text-orange mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Mon&ndash;Sat: 7:00 AM &ndash; 6:00 PM
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-between pt-6 gap-4">
        <p class="text-gray-500 text-xs">&copy; 2026 Gapunda Civil Construction. All rights reserved.</p>
        <a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" class="text-gray-500 hover:text-orange text-xs font-medium transition-colors">Back to Top &uarr;</a>
      </div>
    </div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const headerSlot = document.getElementById('header-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (headerSlot) headerSlot.innerHTML = renderHeader();
  if (footerSlot) footerSlot.innerHTML = renderFooter();
});
