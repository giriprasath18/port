// =========================================================
// DATA
// =========================================================
const GALLERY_ITEMS = [
  { type: "award", icon: "🏆", tag: "Award", img: "assets/gallery/codex_winner_certificate.jpg",
    title: "Winner — OpenAI Codex Hackathon 2026", desc: "Certificate of recognition from Cognizant × OpenAI's flagship hackathon, 'Engineering the Frontier,' for the winning team's AI-first solution." },
  { type: "award", icon: "🎉", tag: "Award", img: "assets/gallery/codex_stage.jpg",
    title: "On-stage recognition — Codex Hackathon", desc: "Receiving the winner's award on stage at the OpenAI Codex Hackathon 2026 finale." },
  { type: "award", icon: "🤝", tag: "Award", img: "assets/gallery/codex_banner.jpg",
    title: "Team Codex CoLab", desc: "Featured in Cognizant's internal spotlight: 'Six strangers, one challenge, one winning solution.'" },
  { type: "award", icon: "📧", tag: "Award", img: "assets/gallery/codex_win_internal.jpg",
    title: "Flagship hackathon winners announcement", desc: "Leadership email announcing the QEA team (POD 198) as winners of the Flagship OpenAI Codex Hackathon 2026, competing against 1,191 teams org-wide." },
  { type: "award", icon: "💡", tag: "Award", img: "assets/gallery/bluebolt1.jpg",
    title: "Bluebolt Excellence Awards 2025 — Business Innovation Winner", desc: "'LogiGenie' named Business Innovation Winner at Americold Logistics (ML-NA) in Cognizant's Best of Bluebolt Innovations." },
  { type: "certification", icon: "✨", tag: "Certification", img: "assets/gallery/ai_bridge.jpg",
    title: "AI Builder Talent Program — AI-Augmented Quality Engineer", desc: "Recognized among the first AI Builders in QEA for completing Cognizant's AI Builder Talent Program." },
  { type: "certification", icon: "🧪", tag: "Certification", img: "assets/gallery/github_auto.jpg",
    title: "QE AI-Augmented Web Automation Testing (GitHub / Tekstac)", desc: "Certificate of completion — Skill-based assessment, 201 Intermediate level, Cognizant Learning & Development." },
  { type: "appreciation", icon: "⭐", tag: "Appreciation", img: "assets/gallery/go_live1.jpg",
    title: "Go-live appreciation — Ornua to AMC EDI cutover", desc: "\"Heartfelt thanks for your exceptional support during our go-live... especially during the late-night hours.\" — WMS Analyst, Americold Logistics." },
  { type: "appreciation", icon: "⭐", tag: "Appreciation", img: "assets/gallery/go_live2.jpg",
    title: "Go-live appreciation — Cavendish Farms rollout", desc: "Thanked for weekend support during the multi-site Cavendish Farms production rollout (Brampton, Halifax, Calgary)." },
  { type: "appreciation", icon: "🙌", tag: "Appreciation", img: "assets/gallery/award1.jpg",
    title: "Cheers Award — Raise the Bar", desc: "Peer recognition from Anand Sivaramasubramony for invaluable contribution, under Cognizant's 'Raise the Bar' value pillar." },
  { type: "appreciation", icon: "🙌", tag: "Appreciation", img: "assets/gallery/award2.jpg",
    title: "Cheers Award — Dare to Innovate", desc: "Peer recognition from Vasanth Krishnamoorthy for invaluable contribution, under Cognizant's 'Dare to Innovate' value pillar." },
  { type: "appreciation", icon: "🙌", tag: "Appreciation", img: "assets/gallery/award3.jpg",
    title: "Cheers Award — Own It", desc: "Peer recognition from Dinesh E for invaluable contribution, under Cognizant's 'Own It' value pillar." },
];

const SKILLS = [
  { label: "Automation", value: 0.92 },
  { label: "WMS / EDI", value: 0.90 },
  { label: "Python", value: 0.82 },
  { label: "API Testing", value: 0.74 },
  { label: "AI Tooling", value: 0.68 },
  { label: "SQL", value: 0.76 },
];

const isTouch = window.matchMedia("(pointer: coarse)").matches;

// =========================================================
// NAV — mobile menu toggle
// =========================================================
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
});
mobileMenu?.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    navToggle.classList.remove("is-open");
  })
);

// =========================================================
// LIGHTWEIGHT CURSOR ACCENT (desktop only)
// =========================================================
function initCursor() {
  if (isTouch) return;
  const dot = document.getElementById("cursorDot");
  if (!dot) return;
  let shown = false;
  window.addEventListener("mousemove", e => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    if (!shown) { dot.classList.add("is-active"); shown = true; }
  }, { passive: true });

  document.querySelectorAll("a, button, .card, .gallery__card").forEach(el => {
    el.addEventListener("mouseenter", () => dot.classList.add("is-hovering"));
    el.addEventListener("mouseleave", () => dot.classList.remove("is-hovering"));
  });
}

// =========================================================
// GALLERY MARQUEE — single row, full-bleed
// =========================================================
function buildMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;
  const cardHTML = item => `
    <div class="marquee__card">
      <img src="${item.img}" alt="${item.title}" loading="lazy"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="marquee__card-fallback" style="display:none;">${item.icon}</div>
    </div>`;
  track.innerHTML = GALLERY_ITEMS.map(cardHTML).join("").repeat(2);
}

// =========================================================
// GALLERY GRID + FILTERS
// =========================================================
function buildGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = GALLERY_ITEMS.map((item, i) => `
    <article class="gallery__card reveal" data-type="${item.type}" data-index="${i}">
      <div class="gallery__card-visual">
        <img src="${item.img}" alt="${item.title}" loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="gallery__card-visual-fallback" style="display:none;">${item.icon}</div>
      </div>
      <div class="gallery__card-body">
        <span class="gallery__card-tag">${item.tag}</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    </article>`
  ).join("");

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      grid.querySelectorAll(".gallery__card").forEach(card => {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.type !== filter);
      });
    });
  });

  initReveal(); // catch newly injected cards

  grid.querySelectorAll(".gallery__card").forEach(card => {
    card.addEventListener("click", () => openLightbox(GALLERY_ITEMS[+card.dataset.index]));
  });
}

// =========================================================
// LIGHTBOX — open in-page, close via icon, click-outside, or Escape
// =========================================================
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightboxClose");
  if (!lightbox || !closeBtn) return;

  closeBtn.addEventListener("click", closeLightbox);

  // click outside the frame (on the dark backdrop) closes it
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
}

function openLightbox(item) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const tag = document.getElementById("lightboxTag");
  const title = document.getElementById("lightboxTitle");
  const desc = document.getElementById("lightboxDesc");
  if (!lightbox || !item) return;

  img.src = item.img;
  img.alt = item.title;
  tag.textContent = item.tag;
  title.textContent = item.title;
  desc.textContent = item.desc;

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// =========================================================
// RADAR CHART
// =========================================================
function buildRadar() {
  const svg = document.getElementById("radarChart");
  if (!svg) return;

  const W = 400, H = 400;
  const cx = 200, cy = 205, r = 92;
  const n = SKILLS.length;
  const angle = i => (Math.PI * 2 * i) / n - Math.PI / 2;
  const point = (i, scale) => {
    const a = angle(i);
    const x = cx + Math.cos(a) * r * scale;
    const y = cy + Math.sin(a) * r * scale;
    return [Number.isFinite(x) ? x : cx, Number.isFinite(y) ? y : cy];
  };

  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  let grid = "";
  let axes = "";
  let shape = "";
  let labels = "";
  let scaleLabels = "";

  // grid rings
  [0.25, 0.5, 0.75, 1].forEach(scale => {
    const pts = SKILLS.map((_, i) => point(i, scale).join(",")).join(" ");
    grid += `<polygon points="${pts}" fill="none" stroke="#E7E6EF" stroke-width="1"/>`;
  });

  // axes spokes
  SKILLS.forEach((_, i) => {
    const [x, y] = point(i, 1);
    axes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#E7E6EF" stroke-width="1"/>`;
  });

  // data shape + vertex dots
  const dataPts = SKILLS.map((s, i) => point(i, s.value).join(",")).join(" ");
  shape += `<polygon points="${dataPts}" fill="rgba(91,79,233,0.14)" stroke="#5B4FE9" stroke-width="2.5"/>`;
  SKILLS.forEach((s, i) => {
    const [x, y] = point(i, s.value);
    shape += `<circle cx="${x}" cy="${y}" r="4.5" fill="#5B4FE9" stroke="#fff" stroke-width="1.5"/>`;
  });

  // skill name + value labels — placed with enough margin to never clip
  SKILLS.forEach((s, i) => {
    const [x, y] = point(i, 1.32);
    const anchor = Math.abs(x - cx) < 6 ? "middle" : x > cx ? "start" : "end";
    labels += `<text x="${x}" y="${y - 6}" text-anchor="${anchor}" font-family="Inter, sans-serif" font-weight="600" font-size="13" fill="#14141F">${s.label}</text>`;
    labels += `<text x="${x}" y="${y + 10}" text-anchor="${anchor}" font-family="JetBrains Mono, monospace" font-size="10" fill="#5B4FE9">${Math.round(s.value * 100)}%</text>`;
  });

  // scale numbers (25/50/75/100) — drawn LAST with a white halo pill so they
  // stay legible even where the filled data shape sits underneath them
  [0.25, 0.5, 0.75, 1].forEach(scale => {
    const val = Math.round(scale * 100);
    const tx = cx + 10;
    const ty = cy - r * scale + 4;
    scaleLabels += `<rect x="${tx - 3}" y="${ty - 10}" width="${String(val).length * 7 + 6}" height="14" rx="4" fill="#FFFFFF" opacity="0.85"/>`;
    scaleLabels += `<text x="${tx}" y="${ty}" font-family="JetBrains Mono, monospace" font-size="10" fill="#8A8896">${val}</text>`;
  });

  svg.innerHTML = grid + axes + shape + labels + scaleLabels;
}

// =========================================================
// SCROLL REVEAL
// =========================================================
let revealObserver;
function initReveal() {
  const els = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!els.length) return;
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-visible"), i * 40);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  els.forEach(el => revealObserver.observe(el));
}

// =========================================================
// PRELOADER — aesthetic loading sequence, hides once content is built
// =========================================================
function runPreloader(onDone) {
  const preloader = document.getElementById("preloader");
  const fill = document.getElementById("preloaderFill");
  if (!preloader || !fill) { onDone(); return; }

  let progress = 0;
  const tick = setInterval(() => {
    progress = Math.min(progress + Math.random() * 18 + 6, 100);
    fill.style.width = progress + "%";
    if (progress >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        preloader.classList.add("is-hidden");
        document.body.classList.remove("is-loading");
        setTimeout(() => { preloader.style.display = "none"; }, 550);
        onDone();
      }, 220);
    }
  }, 140);
}

// =========================================================
// INIT
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  initCursor();
  buildMarquee();
  buildGallery();
  initLightbox();
  buildRadar();

  runPreloader(() => {
    initReveal();
  });

  // failsafe: never let the page get stuck mid-load or mid-reveal
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) { preloader.classList.add("is-hidden"); preloader.style.display = "none"; }
    document.body.classList.remove("is-loading");
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
  }, 4000);
});
