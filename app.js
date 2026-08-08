/* ------------------------------------------------------------------ */
/* Project data                                                        */
/* ------------------------------------------------------------------ */
const CATS = [
  { id: "games",    label: "Games",           color: "#a78bfa", emoji: "🎮" },
  { id: "cartoon",  label: "Cartoons & Portraits", color: "#34d399", emoji: "🐢" },
  { id: "design",   label: "Designs & Logos",    color: "#fbbf24", emoji: "🎨" },
  { id: "festival", label: "Festival Animations",  color: "#fb7185", emoji: "🎉" },
  { id: "utility",  label: "Utilities",       color: "#60a5fa", emoji: "🛠️" },
  { id: "security", label: "Security",        color: "#f87171", emoji: "🔐" },
  { id: "vision",   label: "Computer Vision", color: "#22d3ee", emoji: "👁️" },
];
const catOf = id => CATS.find(c => c.id === id);

/* emoji → gradient fallback when no screenshot exists */
const GRADS = {
  games:    "linear-gradient(135deg,#6d28d9,#4f46e5 55%,#7c3aed)",
  cartoon:  "linear-gradient(135deg,#065f46,#0d9488 55%,#059669)",
  design:   "linear-gradient(135deg,#92400e,#d97706 55%,#f59e0b)",
  festival: "linear-gradient(135deg,#9f1239,#e11d48 55%,#f43f5e)",
  utility:  "linear-gradient(135deg,#1e40af,#2563eb 55%,#3b82f6)",
  security: "linear-gradient(135deg,#7f1d1d,#dc2626 55%,#ef4444)",
  vision:   "linear-gradient(135deg,#155e75,#0891b2 55%,#06b6d4)",
};

/* p: preview image (optional), r: run from inside the folder, n: extra note */
const PROJECTS = [
  /* ------------------------------ Games ------------------------------ */
  { name: "Flappy Bird", cat: "games", emoji: "🐤", p: "Games/Flappy Bird Game/gallery/sprites/background.png",
    desc: "Classic Flappy Bird clone — dodge pipes, score points, survive as long as you can. Full sprite gallery, game-over and message screens included.",
    dir: "Games/Flappy Bird Game", main: "main.py", deps: ["pygame"], note: "Uses sprites from the local gallery folder." },
  { name: "Hangman", cat: "games", emoji: "🪢", p: "Games/hangman/img_9.png",
    desc: "Word-guessing Hangman game with pygame graphics — each wrong guess draws another part of the gallows.",
    dir: "Games/hangman", main: "main.py", deps: ["pygame"] },
  { name: "Ping Pong", cat: "games", emoji: "🏓",
    desc: "Two-player ping pong against an AI opponent — paddles, ball physics, score tracking and game-over handling.",
    dir: "Games/ping pong", main: "main.py", deps: ["pygame"] },
  { name: "Rock Paper Scissors", cat: "games", emoji: "✊",
    desc: "Console Rock–Paper–Scissors against the computer. Pure standard library, no dependencies.",
    dir: "Games/rms", main: "main.py", deps: [] },
  { name: "Snake Game", cat: "games", emoji: "🐍", p: "Games/Snake Game/Screen/Intro1.png",
    desc: "Polished Snake with intro/outro screens, high-score tracking and background music. Press Enter to start.",
    dir: "Games/Snake Game", main: "main.py", deps: ["pygame"], note: "Ships with its own music and screen assets." },
  { name: "Snake Game 2", cat: "games", emoji: "🐍",
    desc: "A second Snake variant — classic grid gameplay with food, growing snake and score display.",
    dir: "Games/snake game 2", main: "main.py", deps: ["pygame"] },

  /* --------------------- Cartoons & Portraits ------------------------ */
  { name: "Doraemon", cat: "cartoon", emoji: "🤖",
    desc: "Python-turtle sketch of Doraemon drawn stroke by stroke with layered fills.",
    dir: "Turtle/character", main: "Doraemon.py", deps: [] },
  { name: "Doraemon 2", cat: "cartoon", emoji: "🤖",
    desc: "Second turtle rendering of Doraemon with a slightly different drawing routine.",
    dir: "Turtle/character", main: "Doraemon2.py", deps: [] },
  { name: "Draw Rose", cat: "cartoon", emoji: "🌹",
    desc: "A turtle-drawn rose with petals and stem, built up with geometric arcs.",
    dir: "Turtle/character", main: "Draw Rose.py", deps: [] },
  { name: "Pikachu", cat: "cartoon", emoji: "⚡",
    desc: "Turtle sketch of Pikachu — round face, red cheeks and lightning tail.",
    dir: "Turtle/character", main: "Pikachu.py", deps: [] },
  { name: "Radha-Krishna", cat: "cartoon", emoji: "🦚",
    desc: "Turtle portrait of Radha-Krishna built from coordinate-plotted shapes.",
    dir: "Turtle/character", main: "Radha-krishna.py", deps: [] },
  { name: "Radha-Krishna 2", cat: "cartoon", emoji: "🦚",
    desc: "Second rendering of Radha-Krishna with an alternate drawing approach.",
    dir: "Turtle/character", main: "Radha-Krishna2.py", deps: [] },
  { name: "Shinchan", cat: "cartoon", emoji: "😜",
    desc: "Turtle sketch of Shinchan — trademark round head and cheeky grin.",
    dir: "Turtle/character", main: "Shinchan.py", deps: [] },
  { name: "Shinchan 2", cat: "cartoon", emoji: "😜",
    desc: "Alternate turtle drawing of Shinchan.",
    dir: "Turtle/character", main: "Shinchan2.py", deps: [] },
  { name: "Iron Man", cat: "cartoon", emoji: "🤖",
    desc: "Turtle-drawn Iron Man helmet with layered armor shapes.",
    dir: "Turtle/character", main: "ironman.py", deps: [] },
  { name: "Spider Mask", cat: "cartoon", emoji: "🕷️",
    desc: "Turtle sketch of a Spider-Man style mask with web-line details.",
    dir: "Turtle/character", main: "spidermask.py", deps: [] },
  { name: "Friends Intro", cat: "cartoon", emoji: "📺", p: "Friends intro/app.png",
    desc: "Tribute animation for the FRIENDS series — character GIFs parade across a black screen with music.",
    dir: "Friends intro", main: "application.py", deps: [], r: true, note: "Windows-only sound via winsound." },
  { name: "Hanuman Ji", cat: "cartoon", emoji: "🦍",
    desc: "Converts an SVG of Hanuman Ji into a turtle sketch path and redraws it line by line.",
    dir: "Turtle/HanumanJi", main: "hanumanji.py", deps: ["opencv-python", "svgpathtools", "numpy", "tqdm"] },
  { name: "Iron Man (RDJ)", cat: "cartoon", emoji: "🦾",
    desc: "One-liner sketch of Robert Downey Jr. using the sketchpy library's built-in drawing.",
    dir: "Turtle/ironman", main: "main.py", deps: ["sketchpy"] },
  { name: "Shiva Sketch", cat: "cartoon", emoji: "🕉️", p: "Turtle/Shiva Sketch/shiva.jpg",
    desc: "Edge-detects Lord Shiva's photo with OpenCV, then replays the edges as a turtle drawing.",
    dir: "Turtle/Shiva Sketch", main: "main.py", deps: ["opencv-python", "matplotlib", "numpy"] },
  { name: "Itachi Sketch", cat: "cartoon", emoji: "🦊", p: "Turtle/Itachi Sketch/itachi.jpg",
    desc: "Edge-detects Itachi Uchiha's photo with OpenCV, then replays the edges as a turtle drawing.",
    dir: "Turtle/Itachi Sketch", main: "main.py", deps: ["opencv-python", "matplotlib", "numpy"] },
  { name: "Chhatrapati Shivaji Maharaj", cat: "cartoon", emoji: "🐎",
    desc: "Coordinate-plotted turtle portrait of Chhatrapati Shivaji Maharaj on horseback.",
    dir: "Turtle/Chattrapati Shivaji Maharaj", main: "Chattrapati Shivaji Maharaj.py", deps: [] },

  /* ------------------------- Designs & Logos ------------------------- */
  { name: "Hexagon Spiral", cat: "design", emoji: "🔷",
    desc: "A spiraling chain of hexagons, each rotated as the turtle advances.",
    dir: "Turtle/design", main: "HexagonSpiral.py", deps: [] },
  { name: "Spiral Design", cat: "design", emoji: "🌀",
    desc: "Smooth multi-color spiral pattern drawn at full speed.",
    dir: "Turtle/design", main: "SpiralDesign.py", deps: [] },
  { name: "Square Spirograph", cat: "design", emoji: "⬜",
    desc: "Spirograph effect built from rotated squares.",
    dir: "Turtle/design", main: "Square Spirograph.py", deps: [] },
  { name: "Vibrant Circle", cat: "design", emoji: "⭕",
    desc: "Bold, colorful circle composition.",
    dir: "Turtle/design", main: "VibrantCircle.py", deps: [] },
  { name: "Circle Pattern", cat: "design", emoji: "⭕",
    desc: "Simple geometric circle pattern with turtle.",
    dir: "Turtle/design", main: "circle.py", deps: [] },
  { name: "Heart", cat: "design", emoji: "❤️",
    desc: "Classic turtle heart outline, perfect for greetings.",
    dir: "Turtle/design", main: "heart.py", deps: [] },
  { name: "Line Flower", cat: "design", emoji: "🌸",
    desc: "A flower assembled from fine line petals.",
    dir: "Turtle/design", main: "line flower.py", deps: [] },
  { name: "Rainbow Flower", cat: "design", emoji: "🌈",
    desc: "Rainbow-hued flower built with the colorsys module on a black canvas.",
    dir: "Turtle/design", main: "rainbow flower.py", deps: [] },
  { name: "Rainbow Star", cat: "design", emoji: "⭐",
    desc: "Rotating rainbow star pattern with shifting hues.",
    dir: "Turtle/design", main: "rainbowstar.py", deps: [] },
  { name: "Tesla Logo", cat: "design", emoji: "🔋",
    desc: "Draws the Tesla wordmark on a red background with turtle.",
    dir: "Turtle/logos", main: "Tesla.py", deps: [] },
  { name: "Avengers Logo", cat: "design", emoji: "🅰️",
    desc: "Turtle-drawn Avengers emblem.",
    dir: "Turtle/logos", main: "avengers.py", deps: [] },

  /* ----------------------- Festival Animations ----------------------- */
  { name: "Happy Diwali", cat: "festival", emoji: "🪔", p: "Turtle/Happy Diwali/app.png",
    desc: "Animated Diwali greeting — glowing diyas, bursting fireworks and a sparkling message.",
    dir: "Turtle/Happy Diwali", main: "application.py", deps: [], r: true, note: "Windows-only sound via winsound." },
  { name: "Happy Holi", cat: "festival", emoji: "🎨", p: "Turtle/Happy Holi/app.png",
    desc: "Holi celebration with color dribbles and fireworks across the screen.",
    dir: "Turtle/Happy Holi", main: "application.py", deps: [], r: true },
  { name: "Merry Christmas", cat: "festival", emoji: "🎄", p: "Turtle/Merry Christmas/app.png",
    desc: "Christmas animation — decorated tree, Santa GIFs, bells and scrolling wishes.",
    dir: "Turtle/Merry Christmas", main: "application.py", deps: [], r: true, note: "Windows-only sound via winsound." },
  { name: "Night Sky", cat: "festival", emoji: "🌙", p: "Turtle/Night Sky/app.png",
    desc: "Twinkling starfield with a glowing moon and drifting colors.",
    dir: "Turtle/Night Sky", main: "application.py", deps: [], r: true },
  { name: "Republic Day", cat: "festival", emoji: "🇮🇳", p: "Turtle/Republic Day/app.png",
    desc: "Republic Day tribute — waving Indian flag with the national anthem playing.",
    dir: "Turtle/Republic Day", main: "application.py", deps: [], r: true, note: "Windows-only sound via winsound." },

  /* ----------------------------- Utilities ---------------------------- */
  { name: "Calculator", cat: "utility", emoji: "🧮",
    desc: "Console calculator with add, subtract, multiply and divide operations.",
    dir: "Calculator", main: "Main.py", deps: [] },
  { name: "Calendar", cat: "utility", emoji: "📅",
    desc: "Tkinter GUI that prints any year's full calendar to the window.",
    dir: "calender", main: "calender.py", deps: [] },
  { name: "Love Calculator", cat: "utility", emoji: "💘",
    desc: "Tkinter GUI that computes a playful love-match percentage from two names.",
    dir: "Love Calculator", main: "main.py", deps: [] },
  { name: "XLSX to CSV", cat: "utility", emoji: "📊",
    desc: "Batch-converts every .xlsx file in an input folder to .csv with pandas.",
    dir: "xlsx to csv", main: "main.py", deps: ["pandas"], note: "Expects an 'xlsx' input folder next to the script." },

  /* ----------------------------- Security ----------------------------- */
  { name: "Hash to Password", cat: "security", emoji: "🔑",
    desc: "Brute-forces hashes back to plaintext using itertools, multiprocessing and threading.",
    dir: "Passwd Cracker/hash to password", main: "main.py", deps: [], note: "For education only — use on your own data." },
  { name: "Password Cracker", cat: "security", emoji: "🔓",
    desc: "Demo brute-force cracker that guesses a pyautogui-entered password with random attempts.",
    dir: "Passwd Cracker/passwd cracker", main: "main.py", deps: ["pyautogui"], note: "For education only." },
  { name: "WiFi Password Cracker", cat: "security", emoji: "📶",
    desc: "Lists saved Windows WiFi profiles and reveals their stored keys via netsh.",
    dir: "Passwd Cracker/wifi password cracker", main: "main.py", deps: [], note: "Windows only. For education only." },

  /* -------------------------- Computer Vision ------------------------- */
  { name: "Face Recognition", cat: "vision", emoji: "🧑", p: "Face Recognition/hero.jpg",
    desc: "Detects faces in an image with OpenCV's Haar cascade and draws bounding boxes.",
    dir: "Face Recognition", main: "face recognition.py", deps: ["opencv-python"], note: "Swap the image path on lines 9–10." },
];

/* ------------------------------------------------------------------ */
/* State + rendering                                                   */
/* ------------------------------------------------------------------ */
let activeCat = "all";
let query = "";

const $ = id => document.getElementById(id);

function runCommand(p) {
  return `uv run run-project "${p.name}"`;
}

function thumbStyle(p) {
  if (p.p) return `background-image:url('${p.p}');`;
  return `background:${GRADS[p.cat]};`;
}

function cardHTML(p, i) {
  const cat = catOf(p.cat);
  return `
    <button class="card" data-i="${i}" style="animation-delay:${Math.min(i * 35, 420)}ms" aria-label="View ${p.name}">
      <div class="thumb" style="${thumbStyle(p)}">
        <span class="cat-ribbon">${cat.emoji} ${cat.label}</span>
        ${p.p ? "" : `<span class="emoji">${p.emoji}</span>`}
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="card-meta">
          ${p.deps.length ? p.deps.map(d => `<span class="pill">📦 ${d}</span>`).join("") : `<span class="pill">✓ stdlib only</span>`}
        </div>
        <div class="run"><code>${runCommand(p)}</code> <span>▸</span></div>
      </div>
    </button>`;
}

function render() {
  const q = query.trim().toLowerCase();
  const list = PROJECTS.map((p, i) => ({ p, i }))
    .filter(({ p }) => activeCat === "all" || p.cat === activeCat)
    .filter(({ p }) => !q
      || (p.name + " " + p.desc + " " + p.dir + " " + p.deps.join(" ")).toLowerCase().includes(q));
  $("grid").innerHTML = list.map(({ p, i }) => cardHTML(p, i)).join("");
  $("empty").classList.toggle("show", list.length === 0);
}

function renderChips() {
  const counts = {};
  PROJECTS.forEach(p => counts[p.cat] = (counts[p.cat] || 0) + 1);
  const chips = [
    `<button class="chip active" data-cat="all">All <span class="count">${PROJECTS.length}</span></button>`,
    ...CATS.map(c => `<button class="chip" data-cat="${c.id}">${c.emoji} ${c.label} <span class="count">${counts[c.id]}</span></button>`)
  ].join("");
  $("chips").innerHTML = chips;
  document.querySelectorAll("#chips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      activeCat = chip.dataset.cat;
      document.querySelectorAll("#chips .chip").forEach(c => c.classList.toggle("active", c === chip));
      render();
    });
  });
}

function renderStats() {
  const cats = new Set(PROJECTS.map(p => p.cat));
  const hasDeps = PROJECTS.filter(p => p.deps.length).length;
  $("stats").innerHTML = `
    <div class="stat"><b data-count="${PROJECTS.length}">0</b><span>Projects</span></div>
    <div class="stat"><b data-count="${cats.size}">0</b><span>Categories</span></div>
    <div class="stat"><b data-count="${hasDeps}">0</b><span>Use libraries</span></div>
    <div class="stat"><b>3.10+</b><span>Python target</span></div>`;
  animateCounts();
}

function animateCounts() {
  const els = document.querySelectorAll(".stat b[data-count]");
  if (!els.length) return;
  const dur = 750;
  const t0 = performance.now();
  const tick = now => {
    const p = Math.min((now - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    els.forEach(el => { el.textContent = Math.round(Number(el.dataset.count) * eased); });
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------ */
/* Modal                                                               */
/* ------------------------------------------------------------------ */
const backdrop = $("backdrop");
let current = null;

function openModal(i) {
  const p = PROJECTS[i];
  if (!p) return;
  current = p;
  const cat = catOf(p.cat);
  $("modal-title").textContent = p.name;
  $("modal-thumb").style.cssText = thumbStyle(p) + "font-size:4rem;display:flex;align-items:center;justify-content:center;";
  $("modal-thumb").innerHTML = p.p ? "" : `<span class="emoji">${p.emoji}</span>`;
  $("modal-cat").innerHTML = `<span class="cat-badge" style="background:${cat.color}22;color:${cat.color};border:1px solid ${cat.color}55">${cat.emoji} ${cat.label}</span>`;
  $("modal-desc").textContent = p.desc;
  $("modal-dl").innerHTML = `
    <div><dt>Folder</dt><dd><code>${p.dir}</code></dd></div>
    <div><dt>Main file</dt><dd><code>${p.main}</code></dd></div>
    <div><dt>Dependencies</dt><dd>${p.deps.length ? p.deps.map(d => `<code>${d}</code>`).join(" ") : "None — standard library only"}</dd></div>
    ${p.note ? `<div><dt>Note</dt><dd>${p.note}</dd></div>` : ""}`;
  $("modal-run").textContent = runCommand(p);
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}

$("grid").addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) openModal(Number(card.dataset.i));
});
$("modal-close").addEventListener("click", closeModal);
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

$("modal-copy").addEventListener("click", async () => {
  if (!current) return;
  const text = runCommand(current);
  try {
    await navigator.clipboard.writeText(text);
    $("modal-copy").textContent = "Copied ✓";
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    $("modal-copy").textContent = "Copied ✓";
  }
  setTimeout(() => $("modal-copy").textContent = "Copy command", 1600);
});

$("search-input").addEventListener("input", e => {
  query = e.target.value;
  render();
});

/* ------------------------------------------------------------------ */
/* Installation tabs                                                   */
/* ------------------------------------------------------------------ */
function initTabs() {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.tab;
      document.querySelectorAll(".tab").forEach(t => {
        const on = t === tab;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on);
      });
      document.querySelectorAll(".tab-panel").forEach(panel => {
        const on = panel.id === `tab-${id}`;
        panel.classList.toggle("active", on);
        panel.hidden = !on;
      });
    });
  });
}

/* ------------------------------------------------------------------ */
/* Copy buttons in the installation docs                               */
/* ------------------------------------------------------------------ */
function initCopyButtons() {
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      const original = btn.textContent;
      btn.textContent = "Copied ✓";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 1600);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Nav: mobile toggle, scroll shadow, active-section highlight         */
/* ------------------------------------------------------------------ */
function initNav() {
  const nav = $("nav");
  const toggle = $("nav-toggle");
  const links = $("nav-links");
  const anchors = [...links.querySelectorAll('a[href^="#"]:not(.nav-cta)')];
  const sections = ["projects", "setup"].map(id => document.getElementById(id));

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 8);
    const y = window.scrollY + 180;
    let current = null;
    sections.forEach(el => { if (el && el.offsetTop <= y) current = el.id; });
    anchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  }, { passive: true });
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add("in"));
  }
}

/* ------------------------------------------------------------------ */
/* Init                                                                */
/* ------------------------------------------------------------------ */
renderStats();
renderChips();
render();
initTabs();
initCopyButtons();
initNav();
initReveal();
