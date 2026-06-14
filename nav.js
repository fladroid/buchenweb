(function() {

// ── Verzija portala — bump na kraju svake sesije ──
const BB_VERSION = 's76';
const BB_VERSION_DATE = '14 Jun 2026';

const NAV_I18N = {
  en: { home:"Home", about:"About", stats:"X-Ray Stats", books:"Library",
        nlp:"NLP", reader:"Reader", learn:"Learn", geometry:"Geometry", art:"Art" },
  de: { home:"Startseite", about:"Über", stats:"X-Ray Statistik", books:"Bibliothek",
        nlp:"NLP", reader:"Leser", learn:"Lernen", geometry:"Geometrie", art:"Kunst" },
  it: { home:"Home", about:"Informazioni", stats:"Statistiche X-Ray", books:"Biblioteca",
        nlp:"NLP", reader:"Lettore", learn:"Impara", geometry:"Geometria", art:"Arte" },
  hr: { home:"Početna", about:"O projektu", stats:"X-Ray Statistike", books:"Knjižnica",
        nlp:"NLP", reader:"Čitač", learn:"Učenje", geometry:"Geometrija", art:"Umjetnost" },
  sr: { home:"Почетна", about:"О пројекту", stats:"X-Ray Статистике", books:"Библиотека",
        nlp:"NLP", reader:"Читач", learn:"Учење", geometry:"Геометрија", art:"Уметност" },
};

const NAV_LINKS = [
  { key:"home",     href:"index.html" },
  { key:"about",    href:"about.html" },
  { key:"stats",    href:"stats.html" },
  { key:"books",    href:"books.html" },
  { key:"nlp",      href:"nlp.html" },
  { key:"reader",   href:"reader.html" },
  { key:"learn",    href:"learn.html" },
  { key:"geometry", href:"geometry.html" },
  { key:"art",      href:"art.html" },
];

const LANG_LABELS = { en:'EN', de:'DE', it:'IT', hr:'HR', sr:'SR' };

// Theme init ODMAH — sprečava flash
const savedTheme = localStorage.getItem('bb-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Lang init
let uiLang = localStorage.getItem('bb-ui-lang') || 'en';

// Globalni BB_NAV API za stranice
window.BB_NAV = {
  version: BB_VERSION + ' \u00b7 ' + BB_VERSION_DATE,
  getLang: () => uiLang,
  t: (key) => (NAV_I18N[uiLang] || NAV_I18N.en)[key] || key,
  onLangChange: null,
};

function currentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function buildHeaderHTML() {
  const navHTML = NAV_LINKS.map(l => {
    const active = (currentPage() === l.href) ? ' active' : '';
    return `<a href="${l.href}" class="bb-nav-link${active}" data-navkey="${l.key}">${(NAV_I18N[uiLang]||NAV_I18N.en)[l.key]}</a>`;
  }).join('\n      ');

  const optionsHTML = Object.entries(LANG_LABELS).map(([val, label]) =>
    `<option value="${val}"${uiLang===val?' selected':''}>${label}</option>`
  ).join('');

  return `<div id="bb-header"><div id="bb-header-inner">
    <a href="index.html" id="bb-logo">Buchenberg</a>
    <nav id="bb-nav">\n      ${navHTML}\n    </nav>
    <div id="bb-header-controls">
      <select id="bb-lang-select" title="UI language">${optionsHTML}</select>
      <button id="bb-theme-toggle" title="Toggle dark mode">${savedTheme==='dark'?'☀️':'🌙'}</button>
      <button id="bb-burger" title="Menu">☰</button>
    </div>
  </div></div>`;
}

// Ubaci header SINHRONO — document.write dok je parser aktivan
document.write(buildHeaderHTML());

// Nakon što se DOM učita — privežemo event listenere
document.addEventListener('DOMContentLoaded', function() {

  // Theme toggle
  document.getElementById('bb-theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('bb-theme', next);
    document.getElementById('bb-theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
  });

  // Burger (mobile)
  const burger = document.getElementById('bb-burger');
  const nav = document.getElementById('bb-nav');
  burger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('.bb-nav-link').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open')));

  // Lang dropdown
  document.getElementById('bb-lang-select').addEventListener('change', function() {
    uiLang = this.value;
    localStorage.setItem('bb-ui-lang', uiLang);
    // Ažuriraj nav labele
    document.querySelectorAll('.bb-nav-link[data-navkey]').forEach(a => {
      a.textContent = (NAV_I18N[uiLang]||NAV_I18N.en)[a.dataset.navkey] || a.textContent;
    });
    // Obavijesti stranicu
    if (typeof window.BB_NAV.onLangChange === 'function') {
      window.BB_NAV.onLangChange(uiLang);
    }
  });

  // Key Concepts — about, geometry, art, nlp
  (function() {
    const CONCEPT_PAGES = ['about', 'geometry', 'art', 'nlp'];
    const page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    if (!CONCEPT_PAGES.includes(page)) return;
    const footer = document.getElementById('bb-footer');
    if (!footer) return;
    fetch('data/concepts.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => {
        const concepts = data[page];
        if (!concepts || !concepts.length) return;
        const section = document.createElement('section');
        section.id = 'bb-key-concepts';
        const title = document.createElement('div');
        title.className = 'bb-concepts-title';
        title.textContent = 'Key Concepts';
        section.appendChild(title);
        const grid = document.createElement('div');
        grid.className = 'bb-concepts-grid';
        concepts.forEach(function(c) {
          const card = document.createElement('div');
          card.className = 'bb-concept-card';
          card.innerHTML =
            '<span class="bb-concept-icon">' + c.icon + '</span>' +
            '<div class="bb-concept-body">' +
              '<a class="bb-concept-name" href="https://en.wikipedia.org/wiki/' + c.wiki + '" target="_blank" rel="noopener">' + c.name + '</a>' +
              '<span class="bb-concept-desc">' + c.description + '</span>' +
            '</div>';
          grid.appendChild(card);
        });
        section.appendChild(grid);
        footer.parentNode.insertBefore(section, footer);
      })
      .catch(function() {});
  })();

  // Footer — renderira se iz nav.js, HTML fajlovi imaju samo prazan <div id="bb-footer">
  const footer = document.getElementById('bb-footer');
  if (footer) {
    footer.innerHTML =
      '<div style="max-width:1200px;margin:0 auto;padding:0 16px;">' +
        'Buchenberg \u00b7 Open-source MT pipeline \u00b7 ' + BB_VERSION + ' (' + BB_VERSION_DATE + ')' +
      '</div>';
  }

});

})();
