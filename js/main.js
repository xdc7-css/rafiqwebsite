/* ============================================
   رَفِيق — Premium Islamic App Landing Page
   Complete JavaScript (rewritten)
   ============================================ */

import { db, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from './firebase.js';

let CONFIG = {};
let REVIEWS_DATA = [];
let REVIEWS_CURRENT_INDEX = 0;
let REVIEWS_AUTOPLAY = null;
let REVIEW_RATING = 0;

/* ============================================
   CONFIG LOADING
   ============================================ */

async function loadConfig() {
  try {
    const res = await fetch('config.json?' + Date.now());
    CONFIG = await res.json();
  } catch (e) {
    CONFIG = getDefaultConfig();
  }
}

function getDefaultConfig() {
  return {
    app_name: 'رَفِيق', app_name_en: 'Rafiq',
    tagline: 'رفيقك اليومي في رحلتك الإيمانية',
    tagline_en: 'Your Daily Companion in Your Faith Journey',
    description: 'تطبيق ذكي يوفر لك الأذكار اليومية، أوقات الصلاة، السبحة الإلكترونية',
    description_en: 'A smart app providing daily Adhkar, prayer times, digital Tasbih, Quran, and Hadith.',
    version: '1.0.0', release_date: '2026-06-28', file_size: '12.4 MB',
    android_apk: '', ios_ipa: '',
    google_play_url: '', app_store_url: '',
    app_icon: 'assets/icons/logo.svg',
    screenshots: { hero: 'assets/icons/front.png' },
    release_notes: [], features: [], faq: [],
    contact_email: 'support@rafiq.app',
    github_url: '', privacy_url: '',
    social_links: {},
    stats: { downloads: 0, rating: 0, rating_count: 0, active_users: 0, countries: 0 },
    detailed_features: {
      prayer_times: { highlights: [] },
      quran: { highlights: [] },
      azkar: { highlights: [] },
      tasbeeh: { highlights: [] },
      qibla: { highlights: [] },
      ramadan: { highlights: [] }
    }
  };
}

/* ============================================
   THEME
   ============================================ */

function initTheme() {
  const saved = localStorage.getItem('rafiq-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setTheme(theme);

  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      
      // Add haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('rafiq-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.content = theme === 'dark' ? '#030C18' : '#F8F5F0';
  }
}

/* ============================================
   NAV
   ============================================ */

function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  if (window.scrollY > 30) nav.classList.add('scrolled');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

/* ============================================
   MOBILE MENU
   ============================================ */

function initMobileMenu() {
  const btn = document.getElementById('nav-mobile-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-overlay');
  if (!btn || !overlay) return;

  function openMenu() {
    btn.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeMenu() {
    btn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  btn.addEventListener('click', () => {
    if (overlay.classList.contains('active')) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  overlay.querySelectorAll('.mobile-lk').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  const mobileInstall = overlay.querySelector('.mobile-install');
  if (mobileInstall) {
    mobileInstall.addEventListener('click', () => {
      closeMenu();
      const heroBtn = document.querySelector('#hero-cta .btn');
      if (heroBtn) heroBtn.click();
    });
  }

  const navCta = document.getElementById('nav-cta');
  if (navCta) {
    navCta.addEventListener('click', () => {
      const heroBtn = document.querySelector('#hero-cta .btn');
      if (heroBtn) heroBtn.click();
    });
  }
}

/* ============================================
   CURSOR GLOW
   ============================================ */

function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || !window.matchMedia('(hover: hover)').matches) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

/* ============================================
   HERO STARS
   ============================================ */

function initHeroStars() {
  const container = document.getElementById('hero-stars');
  if (!container) return;

  const count = window.innerWidth < 768 ? 20 : 40;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    const size = Math.random() * 2.5 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDuration = (Math.random() * 15 + 10) + 's';
    star.style.animationDelay = (Math.random() * 15) + 's';
    container.appendChild(star);
  }
}

/* ============================================
   HERO CTA
   ============================================ */

function renderHeroCTA() {
  const key = Platform.getKey();
  const heroContainer = document.getElementById('hero-cta');
  const downloadContainer = document.getElementById('download-cta');
  if (!heroContainer) return;

  let html = '';

  if (key === 'android') {
    const apk = CONFIG.android_apk || CONFIG.google_play_url || '#';
    html = `<a href="${apk}" class="btn btn-primary" download>تحميل التطبيق</a>`;
  } else if (key === 'ios') {
    html = `<button class="btn btn-primary" onclick="showIOSModal()">تحميل التطبيق</button>`;
  } else if (Platform.shouldShowQR()) {
    html = `<button class="btn btn-primary" onclick="showQRModal()">تحميل التطبيق</button>`;
  } else {
    html = `<button class="btn btn-primary" onclick="showInstallGuide()">تحميل التطبيق</button>`;
  }

  heroContainer.innerHTML = html;
  if (downloadContainer) downloadContainer.innerHTML = html;
}

/* ============================================
   FEATURES — Asymmetric Bento Grid
   ============================================ */

function renderFeatures() {
  const grid = document.getElementById('features-grid');
  if (!grid) return;

  const items = CONFIG.features || [];
  if (items.length === 0) return;

  const sizes = ['card-lg', 'card-md', 'card-md', 'card-md', 'card-sm', 'card-wide'];
  const spans = [
    { col: 2, row: 2, rot: -1 },
    { col: 1, row: 2, rot: 1.5 },
    { col: 1, row: 1, rot: -0.5 },
    { col: 1, row: 1, rot: 2 },
    { col: 1, row: 1, rot: -2 },
    { col: 2, row: 1, rot: 0.5 }
  ];

  items.forEach((feature, i) => {
    const size = sizes[i % sizes.length];
    const span = spans[i % spans.length];
    const imgSrc = feature.image || CONFIG.screenshots?.hero || '';

    const card = document.createElement('div');
    card.className = `feature-card card-${size}`;
    card.style.gridColumn = `span ${span.col}`;
    card.style.gridRow = `span ${span.row}`;
    card.style.transform = `rotate(${span.rot}deg)`;
    card.innerHTML = `
      <div class="feature-card-glow"></div>
      <div class="feature-card-icon">${feature.icon || ''}</div>
      <div class="feature-card-title">${escapeHtml(feature.title || '')}</div>
      <div class="feature-card-desc">${escapeHtml(feature.description || '')}</div>
      <div class="feature-card-screenshot"><img src="${imgSrc}" alt="" loading="lazy"></div>
    `;
    grid.appendChild(card);
  });

  // Add floating phone mockups for unused assets: main.png, settings.png, Splash Screen.png
  const mockups = [
    {
      img: 'assets/icons/main.png',
      alt: 'الشاشة الرئيسية',
      col: 2, row: 2, cls: 'features-mockup features-mockup-main', rot: 3
    },
    {
      img: 'assets/icons/settings.png',
      alt: 'الإعدادات',
      col: 1, row: 1, cls: 'features-mockup features-mockup-settings', rot: -4
    },
    {
      img: 'assets/icons/Splash Screen.png',
      alt: 'شاشة البداية',
      col: 1, row: 1, cls: 'features-mockup features-mockup-splash', rot: 2
    }
  ];

  mockups.forEach(m => {
    const mockup = document.createElement('div');
    mockup.className = m.cls;
    mockup.style.gridColumn = `span ${m.col}`;
    mockup.style.gridRow = `span ${m.row}`;
    mockup.style.transform = `rotate(${m.rot}deg)`;
    mockup.innerHTML = `
      <div class="features-mockup-device">
        <div class="device-frame" style="background:linear-gradient(145deg,#0a1628,#071020)">
          <div class="device-notch"></div>
          <div class="device-screen">
            <img src="${m.img}" alt="${m.alt}" loading="lazy">
          </div>
          <div class="device-bar"></div>
        </div>
        <div class="device-reflection"></div>
      </div>
    `;
    grid.appendChild(mockup);
  });
}

/* ============================================
   QURAN FEATURES
   ============================================ */

function renderQuranFeatures() {
  const list = document.getElementById('quran-features');
  if (!list) return;

  const highlights = CONFIG.detailed_features?.quran?.highlights || [];
  highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    list.appendChild(li);
  });
}

/* ============================================
   QURAN FLOATING PARTICLES
   ============================================ */

function renderQuranParticles() {
  const container = document.getElementById('quran-particles');
  if (!container) return;
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'quran-particle';
    p.style.left = (10 + Math.random() * 80) + '%';
    p.style.top = (10 + Math.random() * 80) + '%';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
    container.appendChild(p);
  }
}

/* ============================================
   PRAYER PREVIEW
   ============================================ */

function renderPrayerPreview() {
  const container = document.getElementById('prayer-preview');
  if (!container) return;

  container.innerHTML = `
    <div class="prayer-preview-time" id="prayer-next-time">4:37</div>
    <div class="prayer-preview-label">صلاة الفجر</div>
    <div class="prayer-preview-countdown">متبقي ٢:١٥</div>
  `;
}

/* ============================================
   PRAYER HIGHLIGHTS
   ============================================ */

function renderPrayerHighlights() {
  const list = document.getElementById('prayer-highlights');
  if (!list) return;

  const highlights = CONFIG.detailed_features?.prayer_times?.highlights || [];
  highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    list.appendChild(li);
  });
}

/* ============================================
   AZKAR STRIP
   ============================================ */

function renderAzkarStrip() {
  const strip = document.getElementById('azkar-strip');
  if (!strip) return;

  const azkar = [
    { num: '٣٣', label: 'سبحان الله' },
    { num: '٣٣', label: 'الحمد لله' },
    { num: '٣٣', label: 'الله أكبر' },
    { num: '٣٣', label: 'لا إله إلا الله' }
  ];

  azkar.forEach(a => {
    const item = document.createElement('div');
    item.className = 'azkar-strip-item';
    item.innerHTML = `
      <div class="azkar-strip-num">${a.num}</div>
      <div class="azkar-strip-label">${a.label}</div>
    `;
    strip.appendChild(item);
  });
}

/* ============================================
   TASBIH — Highlights & Interactive Counter
   ============================================ */

const TASBIH_DHIKR = [
  { label: 'سبحان الله', target: 33 },
  { label: 'الحمد لله', target: 33 },
  { label: 'الله أكبر', target: 33 },
  { label: 'لا إله إلا الله', target: 33 },
];

let tasbihState = {
  currentDhikr: 0,
  count: 0,
  total: 0,
  beadsFilled: 0,
  dailyCount: parseInt(localStorage.getItem('rafiq_tasbih_daily') || '0'),
};

function renderTasbihHighlights() {
  const list = document.getElementById('tasbih-highlights');
  if (!list) return;

  const highlights = CONFIG.detailed_features?.tasbeeh?.highlights || [];
  highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    list.appendChild(li);
  });
}

function initTasbih() {
  renderTasbihHighlights();
  renderTasbihBeads();
  renderTasbihDhikrSelect();
  updateTasbihDisplay();
}

function renderTasbihBeads() {
  const container = document.getElementById('tasbih-beads');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 33; i++) {
    const bead = document.createElement('div');
    bead.className = 'tasbih-bead';
    container.appendChild(bead);
  }
}

function renderTasbihDhikrSelect() {
  const container = document.getElementById('tasbih-dhikr-select');
  if (!container) return;
  container.innerHTML = '';
  TASBIH_DHIKR.forEach((d, i) => {
    const btn = document.createElement('button');
    btn.className = 'tasbih-dhikr-btn' + (i === 0 ? ' active' : '');
    btn.textContent = d.label;
    btn.onclick = () => switchTasbihDhikr(i);
    container.appendChild(btn);
  });
}

function switchTasbihDhikr(index) {
  tasbihState.currentDhikr = index;
  tasbihState.count = 0;
  tasbihState.beadsFilled = 0;
  document.querySelectorAll('.tasbih-dhikr-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.tasbih-bead').forEach(b => {
    b.classList.remove('active', 'filled', 'bounce');
  });
  updateTasbihDisplay();
}

function incrementTasbih() {
  const dhikr = TASBIH_DHIKR[tasbihState.currentDhikr];
  if (!dhikr) return;

  tasbihState.count++;
  tasbihState.total++;
  tasbihState.dailyCount++;

  // Update beads
  const beads = document.querySelectorAll('.tasbih-bead');
  const beadIdx = tasbihState.count - 1;

  if (beadIdx < beads.length) {
    beads[beadIdx].classList.add('active', 'bounce');
    if (beadIdx > 0) beads[beadIdx - 1].classList.remove('active');
    if (beadIdx > 0) beads[beadIdx - 1].classList.add('filled');
    setTimeout(() => beads[beadIdx].classList.remove('bounce'), 300);
  }

  // Check if dhikr target reached
  if (tasbihState.count >= dhikr.target) {
    showToast('🕌 تم ' + dhikr.label + ' ' + dhikr.target + ' مرة', 'success');
    switchTasbihDhikr((tasbihState.currentDhikr + 1) % TASBIH_DHIKR.length);
    navigator.vibrate && navigator.vibrate(50);
  }

  // Save daily count
  localStorage.setItem('rafiq_tasbih_daily', String(tasbihState.dailyCount));

  updateTasbihDisplay();
}

function resetTasbih() {
  tasbihState.count = 0;
  tasbihState.beadsFilled = 0;
  document.querySelectorAll('.tasbih-bead').forEach(b => {
    b.classList.remove('active', 'filled', 'bounce');
  });
  updateTasbihDisplay();
}

function updateTasbihDisplay() {
  const totalEl = document.getElementById('tasbih-total');
  if (totalEl) {
    totalEl.textContent = formatArabicNumber(tasbihState.count);
    totalEl.classList.remove('pulse');
    void totalEl.offsetWidth;
    totalEl.classList.add('pulse');
  }
}

function formatArabicNumber(num) {
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
  return String(num).split('').map(c => arabicDigits[c] || c).join('');
}

/* ============================================
   QIBLA — Highlights & Compass
   ============================================ */

function renderQiblaHighlights() {
  const list = document.getElementById('qibla-highlights');
  if (!list) return;

  const highlights = CONFIG.detailed_features?.qibla?.highlights || [];
  highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    list.appendChild(li);
  });
}

function initQibla() {
  renderQiblaHighlights();
  updateQiblaCompass();
}

/* ============================================
   HADITH — Highlights
   ============================================ */

function renderHadithHighlights() {
  const list = document.getElementById('hadith-features');
  if (!list) return;

  const highlights = CONFIG.detailed_features?.hadith?.highlights || [
    'أحاديث صحيحة ومشهورة',
    'تخريج الأحاديث وذكر المصدر',
    'شرح ميسر لكل حديث',
    'إمكانية البحث والتصفح',
    'حفظ آخر حديث مقروء'
  ];
  highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    list.appendChild(li);
  });
}

function updateQiblaCompass() {
  const needle = document.getElementById('qibla-needle');
  const directionEl = document.getElementById('qibla-direction');
  const distanceEl = document.getElementById('qibla-distance');
  const accuracyEl = document.getElementById('qibla-accuracy');

  // Simulate Qibla direction (in production, use Geolocation API)
  // Default: approximate Qibla direction from Mecca (21.4°N, 39.8°E)
  const qiblaAngle = 138; // degrees from North (approximate for Cairo region)
  const distance = 1362; // km (approximate Cairo to Mecca)

  if (needle) {
    needle.style.transform = 'rotate(' + qiblaAngle + 'deg)';
  }

  if (directionEl) {
    directionEl.querySelector('.qibla-direction-value').textContent = qiblaAngle + '°';
  }

  if (distanceEl) {
    distanceEl.textContent = distance.toLocaleString() + ' كم إلى مكة';
  }

  if (accuracyEl) {
    accuracyEl.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> دقة GPS عالية ±5°';
  }

  // In production, use Geolocation API:
  // if ('geolocation' in navigator) {
  //   navigator.geolocation.getCurrentPosition(pos => {
  //     const angle = calculateQibla(pos.coords.latitude, pos.coords.longitude);
  //     needle.style.transform = 'rotate(' + angle + 'deg)';
  //   });
  // }
}

/* ============================================
   RAMADAN FEATURES
   ============================================ */

function renderRamadanFeatures() {
  const list = document.getElementById('ramadan-features');
  if (!list) return;

  const highlights = CONFIG.detailed_features?.ramadan?.highlights || [];
  highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    list.appendChild(li);
  });
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================
   STATS
   ============================================ */

function animateCounter(elId, target, isDecimal) {
  const el = document.getElementById(elId);
  if (!el) return;

  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    let current;
    if (isDecimal) {
      current = (eased * target).toFixed(1);
    } else if (target >= 1000000) {
      current = (eased * target).toFixed(0);
    } else if (target >= 1000) {
      current = Math.round(eased * target);
    } else {
      current = Math.round(eased * target);
    }

    el.textContent = formatStatNumber(Number(current));
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = isDecimal ? target.toFixed(1) : formatStatNumber(target);
    }
  }

  requestAnimationFrame(update);
}

function formatStatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    const k = (num / 1000).toFixed(1);
    return k.replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString('ar-SA');
}

function renderStats() {
  const stats = CONFIG.stats || {};
  animateCounter('stat-downloads', stats.downloads || 0, false);
  animateCounter('stat-rating', stats.rating || 0, true);
  animateCounter('stat-users', stats.active_users || 0, false);
  animateCounter('stat-countries', stats.countries || 0, false);
}

/* ============================================
   REVIEWS
   ============================================ */

async function fetchReviews() {
  try {
    const q = query(collection(db, "reviews"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    
    const reviews = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reviews.push({
        name: data.name,
        text: data.text,
        rating: data.rating,
        date: data.date ? data.date.toDate().toISOString() : new Date().toISOString(),
        verified: data.verified || false,
        version: data.version || '',
        device: data.device || '',
        country: data.country || ''
      });
    });
    
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

function buildReviewCard(review) {
  const name = review.name || 'مستخدم رَفِيق';
  const initial = name.charAt(0);
  const stars = renderStars(review.rating || 5);
  const date = review.date ? formatDate(review.date) : '';
  const text = review.text || '';
  const flag = review.country || '';
  const verified = review.verified !== false;
  const version = review.version || '';
  const device = review.device || '';

  return `
    <div class="review-card-header">
      <div class="review-card-avatar">
        ${initial}
        ${verified ? '<div class="review-card-verified">✓</div>' : ''}
      </div>
      <div class="review-card-info">
        <div class="review-card-name-row">
          <span class="review-card-name">${escapeHtml(name)}</span>
          ${verified ? '<svg class="review-card-verified-icon" width="12" height="12" viewBox="0 0 24 24" fill="#22c55e"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>' : ''}
        </div>
        <div class="review-card-meta">
          <span>${date}</span>
          ${version ? '<span class="review-card-meta-dot"></span><span class="review-card-meta-device"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> ' + escapeHtml(version) + '</span>' : ''}
          ${device ? '<span class="review-card-meta-dot"></span><span>' + escapeHtml(device) + '</span>' : ''}
        </div>
      </div>
      ${flag ? '<span class="review-card-flag">' + flag + '</span>' : ''}
    </div>
    <div class="review-card-stars">${stars}</div>
    <div class="review-card-text">${escapeHtml(text)}</div>
  `;
}

function renderStars(rating, size) {
  const full = Math.round(rating);
  const s = size || 16;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${i <= full ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  return html;
}

async function renderReviews() {
  const container = document.getElementById('reviews-bento');
  if (!container) return;

  const data = await fetchReviews();

  if (!data || data.length === 0) {
    container.innerHTML = '<p style="color:var(--text-tertiary);text-align:center;padding:40px;width:100%;grid-column:1/-1">لا توجد تقييمات بعد</p>';
    return;
  }

  REVIEWS_DATA = data;
  container.innerHTML = '';

  // Define card layout variants for organic bento grid
  const layouts = [
    { size: 'card-portrait', r: 'r-2', f: 'f-1', e: 'e-3', o: '' },
    { size: 'card-square', r: 'r-4', f: 'f-2', e: 'e-2', o: 'o-1' },
    { size: 'card-landscape', r: 'r-1', f: 'f-3', e: 'e-4', o: '' },
    { size: 'card-compact', r: 'r-6', f: 'f-1', e: 'e-1', o: 'o-2' },
    { size: 'card-wide', r: 'r-3', f: 'f-2', e: 'e-3', o: '' },
    { size: 'card-tall', r: 'r-5', f: 'f-3', e: 'e-4', o: 'o-3' },
    { size: 'card-square', r: 'r-7', f: 'f-1', e: 'e-2', o: '' },
    { size: 'card-landscape', r: 'r-8', f: 'f-2', e: 'e-3', o: 'o-4' },
  ];

  // Stats cards to intersperse
  const statsCards = [
    { value: '1M+', label: 'مستخدم', stars: true },
    { value: '99.8%', label: 'دقة القبلة', stars: false },
    { value: '١٩٠', label: 'دولة', stars: false },
    { value: '4.9', label: 'التقييم', stars: true },
  ];

  let statIdx = 0;
  let layoutIdx = 0;

  data.forEach((review, i) => {
    // Insert stats cards at positions 2, 5, 7, 9
    if (i === 2 || i === 4 || i === 6 || i === 7) {
      if (statIdx < statsCards.length) {
        const stat = statsCards[statIdx];
        const statCard = document.createElement('div');
        statCard.className = 'review-stats-card reveal';
        statCard.innerHTML = `
          ${stat.stars ? '<div class="review-stats-stars">' + renderStars(5, 20) + '</div>' : ''}
          <div class="review-stats-value">${stat.value}</div>
          <div class="review-stats-label">${stat.label}</div>
          <div class="review-stats-glow"></div>
        `;
        container.appendChild(statCard);
        statIdx++;
      }
    }

    // Add decorative divider between some cards
    if (i === 3) {
      const deco = document.createElement('div');
      deco.className = 'review-deco';
      deco.innerHTML = '<div class="review-deco-line"></div>';
      container.appendChild(deco);
    }

    // Build review card
    const layout = layouts[layoutIdx % layouts.length];
    layoutIdx++;

    const card = document.createElement('div');
    card.className = `review-card ${layout.size} ${layout.r} ${layout.f} e-${(i % 4) + 1} ${layout.o} reveal`;
    card.style.setProperty('--r', layout.r.replace('r-', '') + 'deg');
    card.style.animationDelay = `${(i * 0.08).toFixed(2)}s`;
    card.style.transitionDelay = `${(i * 0.06).toFixed(2)}s`;
    card.innerHTML = buildReviewCard(review);
    container.appendChild(card);
  });

  // Generate stars in background
  generateReviewsStars();
}

function generateReviewsStars() {
  const container = document.getElementById('reviews-stars');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.style.cssText = `
      position: absolute;
      width: ${Math.random() * 2 + 1}px;
      height: ${Math.random() * 2 + 1}px;
      background: rgba(212,175,55,${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: starFloat ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s;
    `;
    container.appendChild(star);
  }
}

/* ============================================
   REVIEW MODAL
   ============================================ */

function openReviewModal() {
  REVIEW_RATING = 0;
  const form = document.getElementById('review-form');
  if (form) form.reset();
  const label = document.getElementById('review-star-label');
  if (label) label.textContent = 'اختر التقييم';
  const error = document.getElementById('review-form-error');
  if (error) error.textContent = '';
  const count = document.getElementById('review-char-count');
  if (count) count.textContent = '0';
  document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('active'));
  const modal = document.getElementById('review-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  }
}

function closeReviewModal() {
  const modal = document.getElementById('review-modal');
  if (modal) modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

function setRating(val) {
  REVIEW_RATING = val;
  const labels = ['', 'سيئ', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز'];
  const label = document.getElementById('review-star-label');
  if (label) label.textContent = labels[val] || 'اختر التقييم';
  document.querySelectorAll('.star-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.value) <= val);
  });
}

function updateCharCount() {
  const textarea = document.getElementById('review-text');
  const count = document.getElementById('review-char-count');
  if (textarea && count) {
    count.textContent = textarea.value.length;
  }
}

async function submitReview(e) {
  e.preventDefault();
  const errorEl = document.getElementById('review-form-error');
  const submitBtn = document.getElementById('review-submit-btn');
  const name = document.getElementById('review-name')?.value.trim() || '';
  const text = document.getElementById('review-text')?.value.trim() || '';

  if (REVIEW_RATING === 0) {
    if (errorEl) errorEl.textContent = 'يرجى اختيار التقييم';
    return;
  }

  if (!text || text.length < 5) {
    if (errorEl) errorEl.textContent = 'يرجى كتابة تعليق (5 أحرف على الأقل)';
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'جاري الإرسال...';
  }

  try {
    await addDoc(collection(db, "reviews"), {
      name: name || 'مستخدم رَفِيق',
      text: text,
      rating: REVIEW_RATING,
      date: serverTimestamp(),
      approved: true,
      verified: false,
      version: '1.0.0',
      device: navigator.userAgent
    });

    closeReviewModal();
    showToast('تم إرسال تقييمك بنجاح! شكراً لك', 'success');
    await renderReviews();
  } catch (error) {
    console.error("Error adding review:", error);
    closeReviewModal();
    showToast('حدث خطأ أثناء إرسال التقييم، يرجى المحاولة مرة أخرى', 'error');
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'إرسال التقييم';
  }
}

/* ============================================
   DOWNLOAD META
   ============================================ */

function renderDownloadMeta() {
  const container = document.getElementById('download-meta');
  if (!container) return;

  const version = CONFIG.version || '1.0.0';
  const fileSize = CONFIG.file_size || '12.4 MB';
  const releaseDate = CONFIG.release_date ? formatDate(CONFIG.release_date) : '';

  container.innerHTML = `
    <span class="download-meta-item"><strong>الإصدار</strong> v${version}</span>
    <span class="download-meta-item"><strong>الحجم</strong> ${fileSize}</span>
    <span class="download-meta-item"><strong>التاريخ</strong> ${releaseDate}</span>
  `;
}

/* ============================================
   CONTACT SOCIAL
   ============================================ */

function renderContact() {
  const socialContainer = document.getElementById('contact-social');
  if (!socialContainer) return;

  const socials = CONFIG.social_links || {};

  const socialIcons = {
    twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    instagram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    telegram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'
  };

  Object.keys(socials).forEach(key => {
    if (socials[key]) {
      const link = document.createElement('a');
      link.href = socials[key];
      link.target = '_blank';
      link.rel = 'noopener';
      link.className = 'contact-social-link';
      link.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;background:rgba(11,31,58,0.5);border:1px solid rgba(212,175,55,0.1);color:var(--text-secondary);transition:all 0.3s var(--ease-out)';
      link.setAttribute('aria-label', key);
      link.innerHTML = socialIcons[key] || '';
      socialContainer.appendChild(link);
    }
  });
}

function renderFooter() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const privacyLink = document.getElementById('footer-privacy');
  if (privacyLink && CONFIG.privacy_url) {
    privacyLink.href = CONFIG.privacy_url;
  }
}

/* ============================================
   FORMAT DATE
   ============================================ */

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (_) {
    return dateStr;
  }
}

/* ============================================
   ESCAPE HTML
   ============================================ */

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ============================================
   TOAST
   ============================================ */

function showToast(message, type) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + (type || 'success');
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================
   CLIPBOARD & SHARE
   ============================================ */

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('تم النسخ إلى الحافظة', 'success');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('تم النسخ إلى الحافظة', 'success');
  } catch (_) {
    showToast('تعذر النسخ', 'error');
  }
  document.body.removeChild(ta);
}

function copyDownloadLink() {
  const key = Platform.getKey();
  let url = '';
  if (key === 'android') url = CONFIG.android_apk || CONFIG.google_play_url || window.location.href;
  else if (key === 'ios') url = CONFIG.ios_ipa || CONFIG.app_store_url || window.location.href;
  else url = CONFIG.google_play_url || CONFIG.app_store_url || window.location.href;
  copyToClipboard(url);
}

function shareApp() {
  const text = `تطبيق ${CONFIG.app_name || 'رَفِيق'} — ${CONFIG.tagline || ''}`;
  const url = CONFIG.google_play_url || CONFIG.app_store_url || window.location.href;

  if (navigator.share) {
    navigator.share({ title: CONFIG.app_name || 'رَفِيق', text, url }).catch(() => {});
  } else {
    copyToClipboard(url);
  }
}

function scrollToChapter(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ============================================
   PLATFORM / MODAL FUNCTIONS
   ============================================ */

function showQRModal() {
  const modal = document.getElementById('qr-modal');
  const canvas = document.getElementById('qr-canvas');
  const urlEl = document.getElementById('qr-url');
  if (!modal || !canvas) return;

  const url = CONFIG.android_apk || CONFIG.google_play_url || CONFIG.app_store_url || window.location.href;
  if (urlEl) urlEl.textContent = url;

  if (typeof QRCode !== 'undefined' && QRCode.toCanvas) {
    QRCode.toCanvas(canvas, url, {
      width: 200,
      margin: 2,
      color: { dark: '#D4AF37', light: '#030C18' }
    }, (err) => {
      if (err) console.error('QR error:', err);
    });
  }

  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeQRModal() {
  const modal = document.getElementById('qr-modal');
  if (modal) modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

function showIOSModal() {
  const modal = document.getElementById('ios-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeIOSModal() {
  const modal = document.getElementById('ios-modal');
  if (modal) modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

function downloadIPA() {
  const url = CONFIG.ios_ipa || '#';
  if (url && url !== '#') {
    window.open(url, '_blank');
  }
  closeIOSModal();
}

function showIOSGuide() {
  closeIOSModal();
  const guide = document.getElementById('ios-guide');
  if (guide) {
    guide.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    showToast('يرجى زيارة صفحة التعليمات', 'info');
  }
}

function showInstallGuide() {
  showToast('يرجى زيارة الموقع من هاتفك للتحميل', 'info');
}

/* ============================================
   SERVICE WORKER
   ============================================ */

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

/* ============================================
   SCROLL REVEAL
   ============================================ */

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ============================================
   ACTIVE NAV SECTION
   ============================================ */

function initActiveNav() {
  const sections = document.querySelectorAll('[data-chapter]');
  const navLinks = document.querySelectorAll('.nav-lk[data-chapter]');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const chapter = entry.target.getAttribute('data-chapter');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-chapter') === chapter);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ============================================
   REVIEW TEXTAREA LISTENER
   ============================================ */

function initReviewFormListeners() {
  const reviewText = document.getElementById('review-text');
  if (reviewText) {
    reviewText.addEventListener('input', updateCharCount);
  }
}

/* ============================================
   PREMIUM SHOWCASE CAROUSEL
   ============================================ */

const SHOWCASE_IMAGES = [
  { file: 'front.png', title: 'الرئيسية', desc: 'واجهة أنيقة تجمع كل خدماتك', icon: '🏠' },
  { file: 'quraann.png', title: 'القرآن الكريم', desc: 'مصحف كامل بتلاوة وتفسير ميسر', icon: '﴿' },
  { file: 'salaa.png', title: 'أوقات الصلاة', desc: 'مواقيت دقيقة مع أذانات وتنبيهات', icon: '🕌' },
  { file: 'qibla.png', title: 'القبلة', desc: 'بوصلة ذكية لتحديد اتجاه القبلة', icon: '🧭' },
  { file: 'adkar.png', title: 'الأذكار', desc: 'أذكار الصباح والمساء والمتنوعة', icon: '📿' },
  { file: 'ahadeth.png', title: 'الأحاديث', desc: 'موسوعة الأحاديث النبوية الشريفة', icon: '📜' },
  { file: 'sphaa.png', title: 'التسبيح', desc: 'سبحة إلكترونية مع عداد ذكي', icon: '☪️' },
  { file: 'main.png', title: 'الإعدادات', desc: 'تخصيص تجربتك بالكامل', icon: '⚙️' },
  { file: 'min1.png', title: 'رمضان', desc: 'وضع خاص بشهر رمضان المبارك', icon: '🌙' },
  { file: 'settings.png', title: 'الإعدادات', desc: 'تحكم كامل بالتطبيق', icon: '🔧' },
  { file: 'quraan.png', title: 'القرآن - القراءة', desc: 'وضع قراءة غامر ومريح', icon: '📖' }
];

let currentShowcaseSlide = 0;
let showcaseAutoplayTimer = null;
let isShowcaseDragging = false;
let showcaseStartX = 0;
let showcaseCurrentTranslate = 0;

function renderShowcase() {
  const track = document.getElementById('showcase-track');
  const dots = document.getElementById('showcase-dots');
  if (!track || !dots) return;

  track.innerHTML = '';
  dots.innerHTML = '';

  SHOWCASE_IMAGES.forEach((slide, i) => {
    // Create slide
    const el = document.createElement('div');
    el.className = 'showcase-slide' + (i === 0 ? ' active' : '');
    el.dataset.index = i;
    el.innerHTML = `
      <div class="showcase-slide-inner">
        <div class="showcase-iphone-frame">
          <div class="showcase-iphone-notch"></div>
          <div class="showcase-iphone-screen">
            <img class="showcase-slide-img" src="assets/icons/${slide.file}" alt="${slide.title}" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">
          </div>
          <div class="showcase-iphone-bar"></div>
        </div>
        <div class="showcase-slide-info">
          <span class="showcase-slide-icon">${slide.icon}</span>
          <div class="showcase-slide-title">${slide.title}</div>
          <div class="showcase-slide-desc">${slide.desc}</div>
        </div>
      </div>`;
    track.appendChild(el);

    // Create dot
    const dot = document.createElement('button');
    dot.className = 'showcase-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', slide.title);
    dot.addEventListener('click', () => goToShowcaseSlide(i));
    dots.appendChild(dot);
  });

  updateShowcaseSlides();
}

function updateShowcaseSlides() {
  const slides = document.querySelectorAll('.showcase-slide');
  const total = slides.length;

  slides.forEach((s, i) => {
    s.classList.remove('active', 'prev', 'next', 'hidden');
    const diff = (i - currentShowcaseSlide + total) % total;

    if (diff === 0) {
      s.classList.add('active');
    } else if (diff === 1 || diff === total - 1) {
      s.classList.add(diff === 1 ? 'next' : 'prev');
    } else {
      s.classList.add('hidden');
    }
  });

  const dots = document.querySelectorAll('.showcase-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentShowcaseSlide));
}

function goToShowcaseSlide(index) {
  const total = document.querySelectorAll('.showcase-slide').length;
  if (index < 0) index = total - 1;
  if (index >= total) index = 0;
  currentShowcaseSlide = index;
  updateShowcaseSlides();
  resetShowcaseAutoplay();
}

function nextShowcaseSlide() { goToShowcaseSlide(currentShowcaseSlide + 1); }
function prevShowcaseSlide() { goToShowcaseSlide(currentShowcaseSlide - 1); }

function resetShowcaseAutoplay() {
  clearInterval(showcaseAutoplayTimer);
  showcaseAutoplayTimer = setInterval(() => {
    const showcase = document.getElementById('showcase');
    if (!showcase || showcase.offsetParent === null) return;
    nextShowcaseSlide();
  }, 4000);
}

function initShowcase() {
  renderShowcase();

  // Navigation buttons
  const nextBtn = document.getElementById('showcase-next');
  const prevBtn = document.getElementById('showcase-prev');
  if (nextBtn) nextBtn.addEventListener('click', nextShowcaseSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevShowcaseSlide);

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;
  const stage = document.getElementById('showcase-stage');

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextShowcaseSlide();
      else prevShowcaseSlide();
    }
  }, { passive: true });

  // Mouse drag (desktop)
  let isDragging = false;
  let dragStartX = 0;
  let dragStartTranslate = 0;

  stage.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartTranslate = showcaseCurrentTranslate;
    stage.style.cursor = 'grabbing';
    stage.style.transition = 'none';
    clearInterval(showcaseAutoplayTimer);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    showcaseCurrentTranslate = dragStartTranslate + delta;
    stage.style.transform = `translateX(${showcaseCurrentTranslate}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    stage.style.cursor = 'grab';
    stage.style.transition = 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';

    const threshold = 80;
    if (showcaseCurrentTranslate < -threshold) {
      nextShowcaseSlide();
    } else if (showcaseCurrentTranslate > threshold) {
      prevShowcaseSlide();
    } else {
      // Snap back
      updateShowcaseSlides();
    }
    showcaseCurrentTranslate = 0;
    resetShowcaseAutoplay();
  });

  // Click on side slides to navigate
  stage.addEventListener('click', (e) => {
    const slide = e.target.closest('.showcase-slide');
    if (!slide || slide.classList.contains('active')) return;
    const idx = parseInt(slide.dataset.index);
    if (!isNaN(idx)) goToShowcaseSlide(idx);
  });

  // Pause autoplay on hover
  const showcase = document.getElementById('showcase');
  if (showcase) {
    showcase.addEventListener('mouseenter', () => clearInterval(showcaseAutoplayTimer));
    showcase.addEventListener('mouseleave', resetShowcaseAutoplay);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevShowcaseSlide();
    else if (e.key === 'ArrowRight') nextShowcaseSlide();
  });

  resetShowcaseAutoplay();
}

/* ============================================
   DOMContentLoaded INIT
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  await loadConfig();
  initTheme();
  initNav();
  initMobileMenu();
  initCursorGlow();
  initHeroStars();
  renderHeroCTA();
  renderFeatures();
  renderQuranFeatures();
  renderQuranParticles();
  renderPrayerPreview();
  renderPrayerHighlights();
  renderAzkarStrip();
  initTasbih();
  initQibla();
  renderHadithHighlights();
  renderRamadanFeatures();
  renderStats();
  renderReviews();
  renderDownloadMeta();
  renderContact();
  renderFooter();
  initReviewFormListeners();
  initShowcase();
  initScrollReveal();
  initActiveNav();
  initServiceWorker();
});
