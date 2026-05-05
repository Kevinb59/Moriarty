import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faArrowTrendUp,
  faBolt,
  faCalendarDays,
  faCartShopping,
  faCircleCheck,
  faEarListen,
  faEnvelope,
  faGears,
  faGift,
  faGlobe,
  faHandshake,
  faHandHoldingHand,
  faMapLocationDot,
  faPalette,
  faPaintbrush,
  faQrcode,
  faStore,
  faLaptopCode,
  faShieldHalved,
  faSliders,
  faSwatchbook,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/moriarty-homepage.css";
import {
  brandLogoSrc,
  clientLogos,
  clientSubtitleFont,
  digitalServices,
  faqs,
  includedIdentityServices,
  packs,
  particleSettings,
  physicalServices,
  projects,
  steps,
  targetProfiles,
  techTools,
  timelineRows,
  trianglifyConfig,
} from "../data/moriartyHomepageData.js";
import { slugify } from "../utils/slugify.js";

const svgIcons = {
  desktop: (
    <svg viewBox="0 0 640 512" className="h-[1em] w-[1em] fill-current" aria-hidden="true">
      <path d="M128 64h384c17.7 0 32 14.3 32 32v224H96V96c0-17.7 14.3-32 32-32Zm-32 288h448v32c0 17.7-14.3 32-32 32H384l16 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H176c-17.7 0-32-14.3-32-32s14.3-32 32-32h64l16-32H128c-17.7 0-32-14.3-32-32v-32Z" />
    </svg>
  ),
  sliders: (
    <svg viewBox="0 0 512 512" className="h-[1em] w-[1em] fill-current" aria-hidden="true">
      <path d="M0 96c0-17.7 14.3-32 32-32h176c11.1-19.1 31.7-32 55.3-32s44.2 12.9 55.3 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H318.6c-11.1 19.1-31.7 32-55.3 32s-44.2-12.9-55.3-32H32C14.3 128 0 113.7 0 96Zm0 160c0-17.7 14.3-32 32-32h48c11.1-19.1 31.7-32 55.3-32s44.2 12.9 55.3 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H190.6c-11.1 19.1-31.7 32-55.3 32s-44.2-12.9-55.3-32H32c-17.7 0-32-14.3-32-32Zm0 160c0-17.7 14.3-32 32-32h272c11.1-19.1 31.7-32 55.3-32s44.2 12.9 55.3 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32h-65.4c-11.1 19.1-31.7 32-55.3 32s-44.2-12.9-55.3-32H32c-17.7 0-32-14.3-32-32Z" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 576 512" className="h-[1em] w-[1em] fill-current" aria-hidden="true">
      <path d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24h45.5c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34.2 36.4 58.5 71.2 58.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H200.2c-11.5 0-21.4-8.1-23.6-19.4L172 292h297.8c32.6 0 61.1-21.8 69.6-53.3l33-122.2C577.8 96.5 562.7 77 542 77H125.7l-6.5-34C114.9 18.1 93.2 0 67.9 0H24Zm168 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96Zm288 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96Z" />
    </svg>
  ),
  // ==========================================================================
  // SVG calendrier (offre Planning)
  // Purpose: Satisfaire la carte smoke test svgIcons[pack.icon] si fallback SVG.
  // Key variables: chemin type Font Awesome « calendar-days », viewBox 448×512.
  // Logic flow: Font Awesome prioritaire dans Icon ; ce SVG est secours + tests.
  // ==========================================================================
  calendar: (
    <svg viewBox="0 0 448 512" className="h-[1em] w-[1em] fill-current" aria-hidden="true">
      <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V176 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" />
    </svg>
  ),
  codeWindow: (
    <svg viewBox="0 0 640 512" className="h-[1em] w-[1em] fill-current" aria-hidden="true">
      <path d="M64 32h512c35.3 0 64 28.7 64 64v320c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96c0-35.3 28.7-64 64-64Zm0 96h512V96H64v32Zm172.7 96.7c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L195.3 256l41.4-31.3Zm166.6-45.3c-12.5 12.5-12.5 32.8 0 45.3L444.7 256l-41.4 51.3c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0ZM352.7 178.5c-16.9-5.1-34.8 4.5-39.9 21.4l-48 160c-5.1 16.9 4.5 34.8 21.4 39.9s34.8-4.5 39.9-21.4l48-160c5.1-16.9-4.5-34.8-21.4-39.9Z" />
    </svg>
  ),
};

const icons = {
  arrow: "→",
  badge: "✓",
  braces: "{}",
  calendar: "◷",
  check: "✓",
  code: "</>",
  database: "▦",
  euro: "€",
  external: "↗",
  gauge: "◌",
  globe: "◎",
  layout: "▣",
  mail: "✉",
  menu: "☰",
  click: "⌁",
  palette: "◐",
  shield: "◇",
  sparkles: "✦",
  store: "▤",
  wand: "✦",
  close: "×",
  zap: "⚡",
  print: "▧",
  profile: "☻",
  map: "⌖",
  qr: "▦",
  gift: "◇",
};

// ==========================================================================
// Font Awesome targeted mapping
// Purpose: Remplacer progressivement certaines icônes textuelles par des icônes solides.
// Key variables: clés métier existantes (shield, zap, badge, calendar).
// Logic flow: si une clé existe ici -> rendu FontAwesomeIcon, sinon fallback legacy.
// ==========================================================================
const fontAwesomeIcons = {
  desktop: faStore,
  sliders: faSliders,
  cart: faCartShopping,
  codeWindow: faLaptopCode,
  palette: faPalette,
  print: faAddressCard,
  badge: faSwatchbook,
  gift: faGift,
  profile: faUser,
  map: faMapLocationDot,
  globe: faGlobe,
  qr: faQrcode,
  mail: faEnvelope,
  earListen: faEarListen,
  paintbrush: faPaintbrush,
  gears: faGears,
  handHoldingHand: faHandHoldingHand,
  shield: faShieldHalved,
  zap: faBolt,
  calendar: faCalendarDays,
  check: faCircleCheck,
};

const revealDirections = {
  up: "opacity-0 translate-y-10 blur-sm",
  down: "opacity-0 -translate-y-10 blur-sm",
  left: "opacity-0 -translate-x-10 blur-sm",
  right: "opacity-0 translate-x-10 blur-sm",
  zoom: "opacity-0 scale-95 blur-sm",
};

function Icon({ name, className = "", size = "text-base" }) {
  const faIcon = fontAwesomeIcons[name];

  // ==========================================================================
  // Icon rendering strategy
  // Purpose: Prioriser Font Awesome pour les clés migrées, puis SVG custom, puis fallback.
  // Key variables: svgIcons, fontAwesomeIcons, icons fallback.
  // Logic flow: fontawesome -> custom svg -> caractère -> point de secours.
  // ==========================================================================
  const content = (faIcon ? <FontAwesomeIcon icon={faIcon} className="h-[1em] w-[1em]" /> : null)
    || svgIcons[name]
    || icons[name]
    || "•";

  return (
    <span aria-hidden="true" className={`inline-flex select-none items-center justify-center font-semibold leading-none ${size} ${className}`}>
      {content}
    </span>
  );
}

function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const hiddenClass = revealDirections[direction] || revealDirections.up;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} will-change-transform transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
        visible ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0" : hiddenClass
      }`}
    >
      {children}
    </div>
  );
}

const smokeTests = [
  ["slug accents", slugify("Réalisations") === "realisations"],
  ["slug method", slugify("Méthode") === "methode"],
  ["brand logo", Boolean(brandLogoSrc)],
  ["target profiles", targetProfiles.length >= 8],
  ["packs count", packs.length === 5],
  ["projects count", projects.length >= 3],
  ["project images", projects.every((project) => Boolean(project.imageSrc && project.imageAlt))],
  ["client marquee", clientLogos.length >= 8],
  ["client font styles", clientLogos.every((client) => Boolean(client.fontFamily))],
  ["client subtitle font", Boolean(clientSubtitleFont)],
  ["tech tools", techTools.length >= 8],
  ["trianglify background", trianglifyConfig.cellSize > 0 && trianglifyConfig.palette.length >= 4],
  ["particle background", particleSettings.count > 0 && particleSettings.linkDistance > 0],
  ["icons fallback", Boolean(icons.arrow && icons.check)],
  ["offer svg icons", packs.every((pack) => Boolean(svgIcons[pack.icon]))],
  ["highlight pack", packs.some((pack) => pack.highlight)],
  ["offer badges", packs.some((pack) => pack.badge === "Économique") && packs.some((pack) => pack.badge === "Populaire")],
  ["reveal directions", ["up", "left", "right", "zoom"].every((key) => Boolean(revealDirections[key]))],
  ["included identity services", includedIdentityServices.length >= 3],
  ["physical services", physicalServices.length >= 3],
  ["digital services", digitalServices.length >= 5],
  ["plain digital wording", !digitalServices.flat().join(" ").toLowerCase().includes("seo") && !digitalServices.flat().join(" ").toLowerCase().includes("mockup")],
  ["timeline rows", timelineRows.length === 3 && timelineRows[0].length === 4 && timelineRows[1].length === 4 && timelineRows[2].length === 2],
];

// ==========================================================================
// 1) DEV-ONLY SMOKE TESTS
// Purpose: Éviter tout coût de vérification en production.
// Key variables: import.meta.env.DEV, tableau smokeTests.
// Logic flow: exécution console.warn uniquement en mode développement.
// ==========================================================================
if (import.meta.env.DEV && typeof console !== "undefined") {
  smokeTests.forEach(([name, pass]) => {
    if (!pass) console.warn(`Moriarty light homepage smoke test failed: ${name}`);
  });
}

function Badge({ children, strong = false }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur ${strong ? "border-cyan-200 bg-cyan-50 text-cyan-900" : "border-slate-200 bg-white/80 text-slate-700"}`}>
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-cyan-700">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{text}</p>}
    </div>
  );
}

function ParticleNetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldDisable = reducedMotion || window.innerWidth < particleSettings.disableBelowWidth;

    if (shouldDisable) {
      canvas.style.display = "none";
      return undefined;
    }

    let animationFrame = 0;
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastFrameTime = 0;
    let isPageVisible = !document.hidden;
    const frameInterval = 1000 / particleSettings.targetFps;

    const createParticles = () => {
      const densityRatio = Math.max(0.45, Math.min(1.25, (width * height) / (particleSettings.densityArea * 1000)));
      const count = Math.round(particleSettings.count * densityRatio);

      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const velocity = (particleSettings.speed / 20) * (0.45 + Math.random() * 0.9);
        const radius = particleSettings.sizeRandom ? 0.7 + Math.random() * particleSettings.size : particleSettings.size;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          baseR: radius,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, particleSettings.maxDpr);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const buildSpatialGrid = () => {
      const cellSize = particleSettings.linkDistance;
      const grid = new Map();

      particles.forEach((particle, index) => {
        const cellX = Math.floor(particle.x / cellSize);
        const cellY = Math.floor(particle.y / cellSize);
        const key = `${cellX}:${cellY}`;
        const bucket = grid.get(key);

        if (bucket) bucket.push(index);
        else grid.set(key, [index]);
      });

      return { grid, cellSize };
    };

    const draw = (time = 0) => {
      animationFrame = window.requestAnimationFrame(draw);
      if (!isPageVisible || time - lastFrameTime < frameInterval) return;
      lastFrameTime = time;

      context.clearRect(0, 0, width, height);
      context.shadowBlur = 0;

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      });

      const { grid, cellSize } = buildSpatialGrid();

      particles.forEach((particle, index) => {
        const cellX = Math.floor(particle.x / cellSize);
        const cellY = Math.floor(particle.y / cellSize);

        for (let x = cellX - 1; x <= cellX + 1; x += 1) {
          for (let y = cellY - 1; y <= cellY + 1; y += 1) {
            const bucket = grid.get(`${x}:${y}`);
            if (!bucket) continue;

            bucket.forEach((otherIndex) => {
              if (otherIndex <= index) return;

              const other = particles[otherIndex];
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distanceSquared = dx * dx + dy * dy;
              const maxDistanceSquared = particleSettings.linkDistance * particleSettings.linkDistance;

              if (distanceSquared < maxDistanceSquared) {
                const distance = Math.sqrt(distanceSquared);
                const opacity = (1 - distance / particleSettings.linkDistance) * particleSettings.lineOpacity;
                context.strokeStyle = `rgba(${particleSettings.lineColor}, ${opacity})`;
                context.lineWidth = 1;
                context.beginPath();
                context.moveTo(particle.x, particle.y);
                context.lineTo(other.x, other.y);
                context.stroke();
              }
            });
          }
        }
      });

      context.fillStyle = `rgba(${particleSettings.particleColor}, ${particleSettings.particleOpacity})`;
      particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.baseR, 0, Math.PI * 2);
        context.fill();
      });
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };

    resize();
    animationFrame = window.requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" aria-hidden="true" />;
}

function createSeededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function TrianglifyBackground() {
  const polygons = useMemo(() => {
    const random = createSeededRandom(trianglifyConfig.seed);
    const { width, height, cellSize, variance, palette } = trianglifyConfig;
    const cols = Math.ceil(width / cellSize) + 3;
    const rows = Math.ceil(height / cellSize) + 3;
    const points = [];

    for (let y = -1; y < rows; y += 1) {
      const row = [];
      for (let x = -1; x < cols; x += 1) {
        const offsetX = (random() - 0.5) * cellSize * variance;
        const offsetY = (random() - 0.5) * cellSize * variance;
        row.push({
          x: x * cellSize + offsetX,
          y: y * cellSize + offsetY,
        });
      }
      points.push(row);
    }

    const colorForTriangle = (centroidX, centroidY) => {
      const nx = centroidX / width;
      const ny = centroidY / height;
      const dx = nx - trianglifyConfig.lightCenter.x;
      const dy = ny - trianglifyConfig.lightCenter.y;
      // ==========================================================================
      // Triangles shading tuning
      // Purpose: Appliquer les réglages de lumière/relief pilotés en config.
      // Key variables: lightDistanceMultiplier, noiseAmplitude, microFacet params.
      // Logic flow: distance -> bruit -> micro-relief -> clamp palette index.
      // ==========================================================================
      const distanceFromLight = Math.min(1, Math.sqrt(dx * dx + dy * dy) * trianglifyConfig.lightDistanceMultiplier);
      const facetNoise = (random() - 0.5) * trianglifyConfig.noiseAmplitude;
      const microFacet =
        Math.sin((nx * trianglifyConfig.microFacetFrequencyX + ny * trianglifyConfig.microFacetFrequencyY) * Math.PI) *
        trianglifyConfig.microFacetAmplitude;
      const value = Math.max(0, Math.min(1, distanceFromLight + facetNoise + microFacet));
      const index = Math.round(value * (palette.length - 1));
      return palette[Math.max(0, Math.min(palette.length - 1, index))];
    };

    const output = [];
    for (let y = 0; y < points.length - 1; y += 1) {
      for (let x = 0; x < points[y].length - 1; x += 1) {
        const p1 = points[y][x];
        const p2 = points[y][x + 1];
        const p3 = points[y + 1][x];
        const p4 = points[y + 1][x + 1];
        const flip = random() > 0.5;
        const triangles = flip ? [[p1, p2, p4], [p1, p4, p3]] : [[p1, p2, p3], [p2, p4, p3]];

        triangles.forEach((triangle) => {
          const centroidX = (triangle[0].x + triangle[1].x + triangle[2].x) / 3;
          const centroidY = (triangle[0].y + triangle[1].y + triangle[2].y) / 3;
          output.push({
            points: triangle.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" "),
            color: colorForTriangle(centroidX, centroidY),
          });
        });
      }
    }

    return output;
  }, []);

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${trianglifyConfig.width} ${trianglifyConfig.height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="100%" height="100%" fill="#f8fafc" />
      {polygons.map((polygon, index) => (
        <polygon key={index} points={polygon.points} fill={polygon.color} />
      ))}
      <rect width="100%" height="100%" fill="url(#moriartyTrianglifyFade)" />
      <defs>
        <linearGradient id="moriartyTrianglifyFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="48%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.24)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BrandBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <TrianglifyBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_32%,rgba(255,255,255,0.24)_0%,transparent_28%),radial-gradient(circle_at_18%_8%,rgba(186,230,253,0.10)_0%,transparent_30%),radial-gradient(circle_at_84%_18%,rgba(191,219,254,0.08)_0%,transparent_32%),linear-gradient(180deg,rgba(240,251,255,0.04)_0%,rgba(255,255,255,0.08)_42%,rgba(248,250,252,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,116,144,0.045),transparent_22%,rgba(30,64,175,0.035)_48%,transparent_78%)]" />
      <ParticleNetworkBackground />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Offres", "Identité", "Budget", "Réalisations", "Méthode", "À propos", "Contact"];
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const sectionIds = links.map((link) => slugify(link));
    let ticking = false;

    const updateActiveSection = () => {
      const readingLine = window.scrollY + window.innerHeight * 0.36;
      let currentSection = "";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= readingLine) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveSection);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [links]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-0 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={brandLogoSrc}
            alt="Logo Moriarty Design"
            className="h-16 w-16 object-contain transition duration-300 hover:rotate-3 hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          <div className="flex w-[5.6rem] flex-col justify-center leading-none">
            <p className="moriarty-brand-wordmark text-center text-3xl text-slate-950">Moriarty</p>
            <p className="moriarty-brand-subtitle -mt-1 w-full text-center text-[10px] font-bold uppercase text-cyan-700">Design</p>
          </div>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => {
            const id = slugify(link);
            const isActive = activeSection === id;

            return (
              <a
                key={link}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={`relative text-[13px] font-semibold transition after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-cyan-700 after:transition-all hover:text-slate-950 hover:after:w-full ${
                  isActive ? "text-cyan-700 after:w-full" : "text-slate-600 after:w-0"
                }`}
              >
                {link}
              </a>
            );
          })}
          <a href="#contact" className="rounded-full bg-slate-950 px-4 py-1.5 text-[13px] font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-cyan-700">Demander un devis</a>
        </nav>

        <button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 text-slate-950 md:hidden" aria-label="Ouvrir le menu">
          <Icon name={open ? "close" : "menu"} size="text-xl" />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
          <div className="grid gap-3">
            {links.map((link) => {
              const id = slugify(link);
              const isActive = activeSection === id;

              return (
                <a
                  key={link}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-xl px-3 py-2 font-medium transition ${isActive ? "bg-cyan-50 text-cyan-700" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  {link}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

function HeroVisual() {
  // ==========================================================================
  // Hero colonne droite — aperçu « navigateur »
  // Purpose: Titre + 3 promesses ; icônes thumbs-up, handshake, arrow-trend-up (FA).
  // Key variables: libellés en text-sm standard ; cartes compactes (padding réduit).
  // Logic flow: ordre des icônes aligné sur la demande éditoriale ligne par ligne.
  // ==========================================================================
  const heroVisualFeatures = [
    { icon: faThumbsUp, label: "Prise en main simple" },
    { icon: faHandshake, label: "Suivi après livraison" },
    { icon: faArrowTrendUp, label: "Évolutions possibles" },
  ];

  return (
    <div className="moriarty-float relative mx-auto mt-12 max-w-5xl lg:mt-0">
      <div className="absolute -inset-6 rounded-[3rem] bg-cyan-200/40 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white/80 p-4 shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4 sm:p-5">
          {/* ==========================================================================
              Barre type navigateur
              Purpose: Pastilles fenêtre + URL collée à droite des points (pas centrée).
              Key variables: gap horizontal léger entre points et pilule domaine.
              Logic flow: flex row align-items center, URL en shrink avec truncate si besoin.
              ========================================================================== */}
          <div className="flex items-center gap-2 border-b border-slate-200/80 pb-4 sm:gap-3">
            <div className="flex shrink-0 gap-2">
              <span className="h-3 w-3 rounded-full bg-red-300" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-300" />
            </div>
            <span className="min-w-0 truncate rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 sm:px-4 sm:py-1.5">moriarty-design.fr</span>
          </div>

          <div className="flex flex-col items-center gap-10 px-2 py-8 text-center sm:gap-12 sm:px-6 sm:py-10">
            <h2 className="mx-auto max-w-[52rem] text-[clamp(1.2rem,2.65vw,2.1rem)] font-semibold leading-snug tracking-tight text-slate-950 sm:leading-[1.12]">
              Bien plus qu’un simple site.
              <span className="mt-0.5 block bg-gradient-to-r from-[#00bcd4] to-[#3b82f6] bg-clip-text text-transparent">
                Un outil clé en main.
              </span>
            </h2>

            <p className="mx-auto max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
              Nous vous accompagnons de A à Z dans la création de votre solution digitale : conception du site, identité visuelle, fonctionnalités sur mesure, connexion aux services externes, tests, correctifs, maintenance et évolutions. L’objectif : vous livrer un outil clair, fiable et prêt à l’emploi.
            </p>

            <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
              {heroVisualFeatures.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/90 px-3 py-4 text-center shadow-sm"
                >
                  {/* ==========================================================================
                      Pastille icône (Font Awesome)
                      Purpose: Glyphes demandés (pouce, poignée de main, flèche tendance).
                      Key variables: conteneur 9×9, icône 1rem, couleur cyan-800 héritée.
                      Logic flow: libellé séparé en texte corps standard (pas de strong surdimensionné).
                      ========================================================================== */}
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-200/90 bg-cyan-50/90 text-cyan-800"
                  >
                    <FontAwesomeIcon icon={icon} className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-medium leading-snug text-slate-700">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackCard({ pack }) {
  return (
    <article className={`relative h-full overflow-hidden rounded-[2rem] border p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl ${pack.highlight ? "moriarty-light-border border-cyan-200 bg-cyan-50 shadow-cyan-100" : "border-slate-200 bg-white"}`}>
      {pack.badge && <div className={`absolute right-5 top-5 z-[4] rounded-full px-3 py-1 text-xs font-bold ${pack.highlight ? "bg-cyan-700 text-white" : "bg-emerald-100 text-emerald-700"}`}>{pack.badge}</div>}
      <div className="relative z-[3]">
        <div className={`inline-flex h-12 w-12 items-center justify-center transition duration-300 group-hover:scale-105 ${pack.highlight ? "text-cyan-700" : "text-slate-950"}`}><Icon name={pack.icon} size="text-4xl" /></div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-cyan-700">{pack.tag}</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950">{pack.name}</h3>
        <p className="mt-2 text-lg font-semibold text-slate-800">{pack.price}</p>
        <p className="mt-4 min-h-20 text-sm leading-7 text-slate-600">{pack.desc}</p>
        <ul className="mt-6 space-y-3">
          {pack.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-slate-700"><Icon name="check" className="mt-0.5 shrink-0 text-emerald-600" />{feature}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function BudgetMeter() {
  const rows = [
    ["Nom de domaine", "à partir de 15€/an", "Adresse web de votre site, à renouveler chaque année."],
    ["Hébergement, maintenance", "Compris dans votre formule", "Mise en ligne, suivi technique et maintien du site."],
    ["Emails de contact", "Gratuit", "Réception des messages envoyés depuis votre formulaire de contact."],
    ["Paiement en ligne", "1,5% + 0,25€ CB", "Ou 0,35€ par prélèvement SEPA selon le mode de paiement utilisé."],
    ["Base de données", "Gratuit", "Adaptée aux petits projets et aux besoins courants."],
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <Icon name="euro" className="text-cyan-700" size="text-3xl" />
        <h3 className="mt-6 text-3xl font-semibold text-slate-950">Des coûts techniques pensés pour rester bas.</h3>
        <p className="mt-5 leading-8 text-slate-600">
          Hors nom de domaine et abonnement Moriarty, la plupart des petits projets peuvent fonctionner avec des coûts techniques proches de 0€ : hébergement adapté, formulaires simples, outils gratuits ou inclus, et services choisis avec soin.
        </p>
        <p className="mt-4 leading-8 text-slate-600">
          Pour les projets avec de plus gros besoins, nous cherchons les solutions les plus adaptées et privilégions autant que possible les paiements à l’usage, afin de garder un coût efficace et cohérent avec votre activité.
        </p>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        {rows.map(([label, value, desc], index) => (
          <div key={label} className="grid gap-3 border-b border-slate-200 p-4 last:border-b-0 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-medium text-slate-950">{label}</p>
              <p className="mt-1 text-sm text-slate-500">{desc}</p>
            </div>
            <p className={`inline-flex h-7 w-max max-w-none shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-xs font-semibold leading-none shadow-sm md:justify-self-end ${
              value.toLowerCase().includes("gratuit") || value.toLowerCase().includes("compris")
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-cyan-200 bg-cyan-50 text-cyan-700"
            }`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdditionalServicesSection() {
  return (
    <section id="identite" className="relative overflow-hidden px-5 py-24 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/55 to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionTitle
            eyebrow="Identité & visibilité"
            title={<>Votre image ne s’arrête pas<br />à votre site</>}
            text="Nous pouvons vous accompagner sur l’identité visuelle, les supports physiques et la visibilité numérique afin de garder une présence cohérente partout où vos clients peuvent vous trouver."
          />
        </Reveal>

        <Reveal delay={90} direction="up">
          <div className="moriarty-light-border relative mt-14 overflow-hidden rounded-[2.5rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-indigo-50 p-7 shadow-xl shadow-cyan-100/50 md:p-8">
            <div className="relative z-[3] grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <Badge strong><Icon name="sparkles" className="mr-2" />Fourni pour toute commande</Badge>
                <h3 className="mt-6 text-3xl font-semibold text-slate-950 md:text-4xl">Une base graphique claire dès le départ.</h3>
                <p className="mt-5 leading-8 text-slate-600">
                  Chaque projet peut démarrer avec les éléments essentiels pour poser une image professionnelle, cohérente et réutilisable sur vos supports web comme physiques.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {includedIdentityServices.map(([icon, title, text], index) => (
                  <Reveal key={title} delay={index * 80} direction="up">
                    <div className="h-full rounded-[2rem] border border-white bg-white/75 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                      {/* ==========================================================================
                          Identity service icon style
                          Purpose: Afficher uniquement l'icône sans cadre/fond pour un rendu plus épuré.
                          Key variables: taille texte et couleur icône.
                          Logic flow: suppression du conteneur encadré -> rendu direct de l'icône.
                          ========================================================================== */}
                      <Icon name={icon} className="text-slate-900" size="text-3xl" />
                      <p className="mt-5 font-semibold text-slate-950">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal direction="left" delay={140}>
            <div className="h-full rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-sm md:p-8">
              <Badge>Supports physiques</Badge>
              <h3 className="mt-8 text-3xl font-semibold text-slate-950 md:text-4xl">Décliner votre identité dans le réel.</h3>
              <p className="mt-5 leading-8 text-slate-600">
                Pour vos impressions, événements, points de vente ou objets personnalisés, nous préparons des maquettes propres que vous pouvez ensuite commander auprès du prestataire de votre choix.
              </p>

              <div className="mt-8 grid gap-4">
                {physicalServices.map(([icon, title, text], index) => (
                  <Reveal key={title} delay={index * 80} direction="up">
                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg">
                      <div className="flex gap-4">
                        {/* ==========================================================================
                            Physical services icon style
                            Purpose: Uniformiser le rendu en affichant uniquement l'icône.
                            Key variables: couleur et taille de l'icône.
                            Logic flow: suppression du cadre -> icône seule dans le flux.
                            ========================================================================== */}
                        <Icon name={icon} className="shrink-0 text-slate-900" size="text-3xl" />
                        <div>
                          <p className="font-semibold text-slate-950">{title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={190}>
            <div className="h-full rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-sm md:p-8">
              <Badge>Visibilité numérique</Badge>
              <h3 className="mt-8 text-3xl font-semibold text-slate-950 md:text-4xl">Être trouvable, identifiable et contactable en ligne.</h3>
              <p className="mt-5 leading-8 text-slate-600">
                Nous vous aidons à rendre votre activité plus visible et plus facile à contacter en ligne : fiche bio Google, fiche établissement, QR codes, visuels pour les réseaux et supports de communication simples.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {digitalServices.map(([icon, title, text], index) => (
                  <Reveal key={title} delay={index * 80} direction="up">
                    <div className="h-full rounded-[2rem] border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg">
                      {/* ==========================================================================
                          Digital services icon style
                          Purpose: Retirer le fond/cadre pour un style visuel cohérent.
                          Key variables: teinte cyan + taille renforcée.
                          Logic flow: rendu direct de l'icône sans conteneur décoratif.
                          ========================================================================== */}
                      <Icon name={icon} className="text-cyan-700" size="text-3xl" />
                      <p className="mt-5 font-semibold text-slate-950">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ClientMarquee() {
  const marqueeRows = [clientLogos, clientLogos];

  return (
    <Reveal delay={220} direction="up" className="relative mt-16">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-11rem] bottom-[-6rem] -z-10 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-transparent via-white/55 to-white" />
        <div className="absolute inset-x-0 top-48 bottom-0 bg-white" />
      </div>
      <div className="overflow-hidden">
        <p className="mb-8 text-center text-sm font-bold uppercase tracking-[0.24em] text-cyan-700">Ils nous font confiance</p>

        <div className="relative overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="moriarty-marquee-track flex w-max items-center hover:[animation-play-state:paused]">
            {marqueeRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={rowIndex === 1}>
                {row.map((client) => (
                  <div key={`${client.name}-${rowIndex}`} className="flex min-w-[12rem] flex-col items-center justify-center opacity-70 transition duration-300 hover:-translate-y-0.5 hover:opacity-100">
                    <p
                      className="whitespace-nowrap text-center text-2xl leading-none text-slate-900 md:text-3xl"
                      style={{ fontFamily: client.fontFamily, letterSpacing: client.letterSpacing, fontWeight: client.weight }}
                    >
                      {client.name}
                    </p>
                    <p
                      className="mt-2 whitespace-nowrap text-center text-[10px] font-bold uppercase text-slate-400"
                      style={{ fontFamily: clientSubtitleFont, letterSpacing: client.subtitleSpacing }}
                    >
                      {client.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectCard({ project }) {
  // ==========================================================================
  // Project external link handling
  // Purpose: Ouvrir la vignette vers le site projet dans un nouvel onglet.
  // Key variables: project.url, projectHref normalisé en https.
  // Logic flow: normaliser l'URL -> envelopper la carte dans un lien sécurisé.
  // ==========================================================================
  const projectHref = project.url.startsWith("http") ? project.url : `https://${project.url}`;

  return (
    <a
      href={projectHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ouvrir le site ${project.name} dans un nouvel onglet`}
      className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className={`relative h-64 bg-gradient-to-br ${project.gradient} p-5`}>
        <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-sm transition duration-500 group-hover:scale-[1.02]">
          <div className="flex h-8 items-center gap-1.5 border-b border-slate-200 bg-white/90 px-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="ml-2 truncate text-[11px] font-medium text-slate-400">{project.url}</span>
          </div>
          <div className="relative h-[calc(100%-2rem)] bg-slate-100">
            <img
              src={project.imageSrc}
              alt={project.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-80" />
            <div className="absolute left-4 top-4">
              <span className={`rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm ${project.accent}`}>{project.type}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-2xl font-semibold text-white drop-shadow-sm">{project.name}</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-white/90">{project.url} <Icon name="external" /></p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="leading-7 text-slate-600">{project.desc}</p>
      </div>
    </a>
  );
}

function TechLogosNote() {
  return (
    <Reveal delay={260} direction="up" className="mt-12">
      <div className="mx-auto max-w-5xl border-t border-slate-200 pt-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-700">Outils utilisés</p>
          <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
            Pour tous nos projets, nous nous appuyons sur des solutions reconnues pour leurs performances, leur fiabilité, leur sécurité et leur capacité à évoluer sans alourdir inutilement votre budget.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          {techTools.map((tool, index) => (
            <Reveal key={tool.name} delay={index * 45} direction="zoom">
              <div className="group flex items-center gap-2.5 opacity-65 grayscale transition duration-300 hover:-translate-y-0.5 hover:opacity-100 hover:grayscale-0">
                <img
                  src={tool.logoSrc}
                  alt={`Logo ${tool.name}`}
                  loading="lazy"
                  className="h-5 w-5 object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <span className="text-sm font-semibold text-slate-700">{tool.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ContactMockup() {
  const contactApiUrl = "/api/contact";
  const fallbackContactEmail = "moriarty.webdesigner@gmail.com";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [detailValue, setDetailValue] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitFeedback, setSubmitFeedback] = useState("");

  // ==========================================================================
  // Contact detail field mode
  // Purpose: Afficher un champ contextuel à droite de l'objet.
  // Key variables: subject, isQuoteRequest, isOtherRequest.
  // Logic flow: "Demande de devis" => select ; "Autre" => textbox ; sinon désactivé.
  // ==========================================================================
  const isQuoteRequest = subject === "quote";
  const isOtherRequest = subject === "other";
  const genericErrorMessage = `Une erreur est survenue lors de l'envoi. Merci d'envoyer votre demande directement à ${fallbackContactEmail}.`;

  // ==========================================================================
  // Contact submit handler (Vercel API relay)
  // Purpose: Envoyer le formulaire vers l'API locale qui relaie vers GAS côté serveur.
  // Key variables: contactApiUrl, payload, submitStatus, submitFeedback.
  // Logic flow: validate local -> POST JSON -> afficher succès/erreur utilisateur.
  // ==========================================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus("idle");
    setSubmitFeedback("");

    if (!name.trim() || !email.trim() || !subject || !message.trim()) {
      setSubmitStatus("error");
      setSubmitFeedback("Merci de remplir les champs requis.");
      return;
    }

    if ((isQuoteRequest || isOtherRequest) && !detailValue.trim()) {
      setSubmitStatus("error");
      setSubmitFeedback("Merci de compléter le champ complémentaire.");
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject,
      detailValue: detailValue.trim(),
      message: message.trim(),
    };

    try {
      setIsSubmitting(true);
      // ==========================================================================
      // API relay request (strict mode)
      // Purpose: Ne confirmer l'envoi qu'en cas de réponse API exploitable et valide.
      // Key variables: response.ok, parsed body, payload JSON.
      // Logic flow: POST JSON vers /api/contact -> lecture réponse -> succès réel.
      // ==========================================================================
      const response = await fetch(contactApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      const rawResponse = await response.text();
      let parsed = null;
      try {
        parsed = rawResponse ? JSON.parse(rawResponse) : null;
      } catch (parseError) {
        parsed = null;
      }

      if (!response.ok || (parsed && parsed.ok === false)) {
        throw new Error("send_failed");
      }

      setSubmitStatus("success");
      setSubmitFeedback("Votre message a bien été envoyé.");
      setName("");
      setEmail("");
      setSubject("");
      setDetailValue("");
      setMessage("");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitFeedback(genericErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Votre nom"
          required
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 transition focus:border-cyan-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Votre email"
          required
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 transition focus:border-cyan-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
        />
      </div>

      {/* ==========================================================================
          Subject + dynamic detail line
          Purpose: Mettre l'objet et son champ dépendant sur la même rangée.
          Key variables: subject, detailValue, isQuoteRequest, isOtherRequest.
          Logic flow: choix objet -> rendu conditionnel du champ de droite.
          ========================================================================== */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <select
          value={subject}
          onChange={(event) => {
            setSubject(event.target.value);
            setDetailValue("");
          }}
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-cyan-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
        >
          <option value="">Objet de votre message</option>
          <option value="quote">Demande de devis</option>
          <option value="refonte">Refonte de site</option>
          <option value="print">Maquette pour impression</option>
          <option value="support">Assistance client</option>
          <option value="info">Demande d&apos;informations</option>
          <option value="other">Autre</option>
        </select>

        {/* ==========================================================================
            Champ contextuel de droite
            Purpose: Afficher uniquement le champ utile selon l'objet choisi.
            Key variables: isQuoteRequest, isOtherRequest.
            Logic flow: devis => select ; autre => textbox ; sinon aucun champ.
            ========================================================================== */}
        {isQuoteRequest && (
          <select
            value={detailValue}
            onChange={(event) => setDetailValue(event.target.value)}
            required={isQuoteRequest}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-cyan-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
          >
            <option value="">Type de devis</option>
            <option value="vitrine">Vitrine</option>
            <option value="evolutif">Evolutif</option>
            <option value="planning">Planning</option>
            <option value="ecommerce">E-commerce</option>
            <option value="webapp">Web App</option>
          </select>
        )}

        {isOtherRequest && (
          <input
            value={detailValue}
            onChange={(event) => setDetailValue(event.target.value)}
            placeholder="Raison de votre message"
            required={isOtherRequest}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 transition focus:border-cyan-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
          />
        )}
      </div>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Votre message"
        rows={5}
        required
        className="mt-4 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 transition focus:border-cyan-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(6,182,212,0.12)]"
      />
      {submitFeedback && (
        <p
          className={`mt-3 text-sm ${
            submitStatus === "success" ? "text-emerald-700" : "text-rose-700"
          }`}
        >
          {submitFeedback}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"} <Icon name="arrow" />
      </button>
    </form>
  );
}

export default function MoriartyRefonteHomepageLight() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main id="top" className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800">
      <BrandBackground />
      <Nav />

      <section className="relative px-5 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/55 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-200/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
          <Reveal direction="left" delay={80}>
            <div className="mb-6 flex flex-wrap gap-3">
              <Badge strong><Icon name="sparkles" className="mr-2" />Offre spéciale : profitez de 10% de remise sur la première année</Badge>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 md:text-7xl">
              Des sites web modernes, utiles et accessibles.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-600">
              Moriarty accompagne les particuliers, entrepreneurs, commerçants, artisans, créateurs et porteurs de projet qui veulent une présence professionnelle sans exploser leur budget : site vitrine, site évolutif, e-commerce ou application métier sur-mesure.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-2xl">
                Parler de votre projet <Icon name="arrow" />
              </a>
              <a href="#realisations" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 hover:shadow-lg">
                Voir les réalisations <Icon name="click" />
              </a>
            </div>
            <div className="mt-8 flex max-w-2xl flex-wrap gap-2">
              {targetProfiles.map((profile) => (
                <span key={profile} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                  {profile}
                </span>
              ))}
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              <div><p className="text-2xl font-semibold text-slate-950">5</p><p className="text-xs leading-5 text-slate-500">Formules à personnaliser</p></div>
              <div><p className="text-2xl font-semibold text-slate-950">0€</p><p className="text-xs leading-5 text-slate-500">Possible en coût technique <span className="block">(hors nom de domaine)</span></p></div>
              <div><p className="text-2xl font-semibold text-slate-950">100%</p><p className="text-xs leading-5 text-slate-500">Sur-mesure à vos besoins</p></div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={180}>
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      <section className="relative border-y border-slate-200/80 bg-slate-100/90 px-5 py-8 backdrop-blur-sm lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            ["shield", "Fiable", "Des outils connus, maintenables et adaptés."],
            ["zap", "Rapide", "Priorité à la clarté, aux performances et au mobile."],
            ["check", "Transparent", "Budget et limites expliqués avant développement."],
            ["calendar", "Durable", "Une solution pensée pour évoluer par étapes."],
          ].map(([icon, title, text], index) => (
            <Reveal key={title} delay={index * 90} direction="up">
              <div className="flex gap-4 rounded-2xl p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-lg">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-700"><Icon name={icon} size="text-xl" /></div>
                <div><p className="font-semibold text-slate-950">{title}</p><p className="mt-1 text-sm leading-6 text-slate-500">{text}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="offres" className="relative overflow-hidden border-y border-slate-200/70 bg-white/90 px-5 py-24 backdrop-blur-sm lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionTitle eyebrow="Offres" title={<>Des formules simples,<br />une personnalisation infinie</>} text="Chaque formule sert de base de départ. Le site est ensuite façonné sur-mesure : design, contenus, fonctionnalités, automatisations et évolutions possibles." />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {packs.map((pack, index) => (
              <Reveal key={pack.name} delay={index * 100} direction="up" className="h-full">
                <PackCard pack={pack} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={420} direction="up">
            <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-7 text-slate-600 md:text-base">
              Le choix d’une formule n’est jamais bloquant : si votre projet évolue, vos besoins aussi. Nous pouvons faire évoluer votre site progressivement et passer d’une formule à l’autre quand cela devient pertinent.
            </p>
          </Reveal>
        </div>
      </section>

      <AdditionalServicesSection />

      <section id="budget" className="relative border-y border-slate-200/70 bg-white/90 px-5 py-24 backdrop-blur-sm lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionTitle eyebrow="Budget" title={<>Des coûts maîtrisés,<br />sans sacrifier la qualité</>} text="Nous privilégions des solutions fiables, simples et évolutives pour créer un site professionnel sans frais inutiles." />
          </Reveal>
          <Reveal delay={140} direction="zoom" className="mt-14">
            <BudgetMeter />
          </Reveal>

          <TechLogosNote />
        </div>
      </section>

      <section id="realisations" className="relative overflow-hidden px-5 py-24 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal direction="left" className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-cyan-700">Réalisations</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">Dernières réalisations</h2>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition hover:text-slate-950">Toutes nos réalisations <Icon name="arrow" /></a>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.name} delay={index * 120} direction="up">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <ClientMarquee />
        </div>
      </section>

      <section id="methode" className="relative overflow-hidden border-y border-slate-200/70 bg-white/90 px-5 py-24 backdrop-blur-sm lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <SectionTitle eyebrow="Méthode" title={<>Un déroulement clair,<br />étape par étape</>} text="Chaque projet avance selon une chaîne simple : comprendre vos besoins, proposer une solution, construire, ajuster, puis mettre en ligne dans de bonnes conditions." />
          </Reveal>
          <div className="mt-16">
            <div className="relative hidden lg:grid lg:gap-12">
              {timelineRows.map((row, rowIndex) => (
                <div key={rowIndex} className="relative">
                  <div className={`absolute left-0 right-0 top-9 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent ${row.length === 2 ? "mx-auto max-w-xl" : ""}`} />
                  <div className={`grid gap-6 ${row.length === 4 ? "grid-cols-4" : "mx-auto max-w-2xl grid-cols-2"}`}>
                    {row.map(([num, title, text], index) => {
                      const globalIndex = rowIndex === 0 ? index : rowIndex === 1 ? index + 4 : index + 8;

                      return (
                        <Reveal key={num} delay={globalIndex * 70} direction="up">
                          <div className="group relative text-center">
                            {/* ==========================================================================
                                Pastille numéro timeline (desktop)
                                Purpose: Cercle parfait centré sur la ligne horizontale (top-9 = 2.25rem = moitié de 4.5rem).
                                Key variables: h/w fixes 4.5rem, shrink-0 pour éviter l'étirement en grille.
                                Logic flow: dimensions carrées explicites -> rounded-full -> alignement visuel avec la ligne.
                                ========================================================================== */}
                            <div className="relative z-10 mx-auto grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-full border border-cyan-200 bg-white shadow-lg shadow-cyan-100/60 transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-400 group-hover:shadow-xl">
                              <span className="text-sm font-bold text-cyan-700">{num}</span>
                            </div>
                            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white/85 p-4 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-cyan-200 group-hover:bg-white group-hover:shadow-lg">
                              <h3 className="text-base font-semibold text-slate-950">{title}</h3>
                              <p className="mt-3 text-xs leading-6 text-slate-500">{text}</p>
                            </div>
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative lg:hidden">
              <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-cyan-200 via-cyan-300 to-transparent" />
              <div className="grid gap-5">
                {steps.map(([num, title, text], index) => (
                  <Reveal key={num} delay={index * 80} direction="up">
                    <div className="relative pl-14">
                      <div className="absolute left-0 top-0 z-10 grid h-10 w-10 place-items-center rounded-full border border-cyan-200 bg-white shadow-md">
                        <span className="text-xs font-bold text-cyan-700">{num}</span>
                      </div>
                      <div className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="a-propos" className="px-5 py-24 lg:px-8">
        <Reveal direction="zoom">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-indigo-50 p-7 shadow-xl shadow-cyan-100/50 md:p-10 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-700">À propos</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950 md:text-5xl">Une approche humaine, créative et pragmatique.</h2>
              <div className="mt-6 space-y-4 leading-8 text-slate-600">
                <p>Moriarty est né d’une idée simple : rendre la création web plus accessible aux particuliers, indépendants, artisans, commerçants, créateurs et porteurs de projet.</p>
                <p>Nous concevons des sites et outils numériques utiles, esthétiques et adaptés à vos besoins réels, sans vous imposer de solutions trop lourdes ou trop coûteuses.</p>
                <p>Notre approche repose sur l’écoute, la créativité et le bon sens pratique : comprendre votre activité, simplifier ce qui peut l’être, automatiser ce qui vous fait gagner du temps, et construire une solution claire, durable et évolutive.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                // ==========================================================================
                // About section icon semantics
                // Purpose: Associer une icône qui correspond au sens de chaque valeur.
                // Key variables: clés d'icônes FA déjà mappées (user, palette, shield, check, calendar).
                // Logic flow: mapping explicite valeur -> icône métier lisible.
                // ==========================================================================
                ["earListen", "Écoute", "Comprendre votre activité, vos contraintes et vos priorités avant de proposer une solution."],
                ["paintbrush", "Design utile", "Créer une image professionnelle, moderne et cohérente, sans complexité inutile."],
                ["gears", "Technique maîtrisée", "Utiliser des outils fiables, performants et adaptés à votre budget."],
                ["check", "Simplicité", "Vous proposer un site facile à comprendre, à utiliser et à faire évoluer."],
                ["handHoldingHand", "Accompagnement", "Rester disponible après la mise en ligne pour la maintenance, les questions et les évolutions."],
              ].map(([icon, title, text], index) => (
                <Reveal key={title} delay={index * 90} direction="up">
                  <div className="rounded-[2rem] border border-white bg-white/75 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                    <Icon name={icon} className="text-cyan-700" size="text-2xl" />
                    <p className="mt-5 text-lg font-semibold text-slate-950">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <SectionTitle eyebrow="Questions" title={<>Les questions à lever<br />avant de se lancer</>} />
          </Reveal>
          <div className="mt-12 grid gap-4">
            {faqs.map(([q, a], index) => (
              <Reveal key={q} delay={index * 90} direction="up">
                <details className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-slate-950">
                    {q}<span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-50 text-cyan-700 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 leading-8 text-slate-600">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-slate-50 px-5 py-24 lg:px-8">
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal direction="left">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-700">Contact</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-6xl">Vos besoins, notre point de départ.</h2>
            <p className="mt-6 leading-8 text-slate-600">Expliquez-nous en quelques mots vos besoins et nous vous recontacterons pour fixer un rendez-vous en présentiel, par téléphone ou en visio.</p>
            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <p className="flex items-center gap-3"><Icon name="check" className="text-emerald-600" />Réponse sous 24h.</p>
              <p className="flex items-center gap-3"><Icon name="check" className="text-emerald-600" />Accompagnement personnel du début à la fin.</p>
              <p className="flex items-center gap-3"><Icon name="check" className="text-emerald-600" />Rendez-vous possible en présentiel, téléphone ou visio.</p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={140}>
            <ContactMockup />
          </Reveal>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200 bg-white px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-950">Moriarty</p>
            <p className="mt-2 text-sm text-slate-500">Création de sites web, identités visuelles et outils simples pour particuliers, indépendants et petites activités.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-950">Mentions légales</a>
            <a href="#" className="hover:text-slate-950">CGU / CGV</a>
            <a href="#" className="hover:text-slate-950">Confidentialité</a>
          </div>
          <p className="text-sm text-slate-400">© {year} Moriarty</p>
        </div>
      </footer>
    </main>
  );
}
