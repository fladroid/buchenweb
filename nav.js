(function() {

// ── Verzija portala — bump na kraju svake sesije ──
const BB_VERSION = 's72';
const BB_VERSION_DATE = '12 Jun 2026';

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

  return `<div id="bb-header"><div id="bb-header-inner">
    <a href="index.html" id="bb-logo">Buchenberg</a>
    <nav id="bb-nav">\n      ${navHTML}\n    </nav>
    <div id="bb-header-controls">
      <div id="bb-ui-lang-bar">
        <button class="bb-lang-btn${uiLang==='en'?' active':''}" data-lang="en">EN</button>
        <button class="bb-lang-btn${uiLang==='de'?' active':''}" data-lang="de">DE</button>
        <button class="bb-lang-btn${uiLang==='it'?' active':''}" data-lang="it">IT</button>
        <button class="bb-lang-btn${uiLang==='hr'?' active':''}" data-lang="hr">HR</button>
        <button class="bb-lang-btn${uiLang==='sr'?' active':''}" data-lang="sr">SR</button>
      </div>
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

  // Lang buttons
  document.querySelectorAll('.bb-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      uiLang = btn.dataset.lang;
      localStorage.setItem('bb-ui-lang', uiLang);
      // Ažuriraj nav labele
      document.querySelectorAll('.bb-nav-link[data-navkey]').forEach(a => {
        a.textContent = (NAV_I18N[uiLang]||NAV_I18N.en)[a.dataset.navkey] || a.textContent;
      });
      document.querySelectorAll('.bb-lang-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === uiLang));
      // Obavijesti stranicu
      if (typeof window.BB_NAV.onLangChange === 'function') {
        window.BB_NAV.onLangChange(uiLang);
      }
    });
  });

  // Footer: autorstvo + verzija — na svim stranicama
  const footer = document.getElementById('bb-footer');
  if (footer) {
    const line = document.createElement('div');
    line.style.cssText = 'max-width:1200px;margin:4px auto 0;padding:0 16px;font-size:11px;color:var(--text-muted);';
    line.innerHTML = 'Flavio \u00b7 X-Ray approach to machine translation \u00b7 ' + BB_VERSION + ' (' + BB_VERSION_DATE + ')';
    footer.appendChild(line);
  }
});

})();
