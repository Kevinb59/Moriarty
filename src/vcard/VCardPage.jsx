import React, { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCommentSms, faEnvelope, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";
import { particleSettings, trianglifyConfig } from "../config/backgroundEffectsConfig.js";

// ==========================================================================
// 1) VCARD CONTENT CONFIG
// Purpose: Centraliser les infos facilement modifiables de la carte.
// Key variables: identité, contacts, chemins logo/vcf.
// Logic flow: cette config alimente tout le rendu sans hardcode dispersé.
// ==========================================================================
const vcardConfig = {
  brandName: "Moriarty",
  tagline: "VOTRE SITE WEB",
  logoSrc: "/media/Logo.webp",
  logoAlt: "Logo Moriarty",
  vcfDownloadHref: "/vcard/moriarty.vcf",
  websiteUrl: "https://www.moriarty-design.fr",
  phoneNumber: "+33770344332",
  email: "moriarty.webdesigner@gmail.com",
};

// ==========================================================================
// 2) TYPEWRITER WORDS
// Purpose: Définir la liste des qualificatifs à animer.
// Key variables: ordre des mots, ponctuation.
// Logic flow: boucle continue écriture -> pause -> effacement.
// ==========================================================================
const rotatingWords = [
  "personnel",
  "professionnel",
  "accessible",
  "securise",
  "adaptatif",
  "performant",
  "evolutif",
  "ergonomique",
  "parametrable",
  "responsive",
  "cle en main",
  "sur-mesure",
  "optimise",
];

// ==========================================================================
// 3) TYPEWRITER HOOK
// Purpose: Piloter l'effet machine à écrire/effacer.
// Key variables: wordIndex, text, isDeleting, delays.
// Logic flow: build text char by char -> hold -> delete -> next word.
// ==========================================================================
function useTypewriter(words) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const isComplete = text === currentWord;
    const isEmpty = text.length === 0;

    // ==========================================================================
    // Typewriter timing controls
    // Purpose: Appliquer des délais variables lettre par lettre + pause fixe avant effacement.
    // Key variables: typing range, deleting range, holdBeforeDeleteMs.
    // Logic flow: typing random -> hold 1s -> deleting random -> next word.
    // ==========================================================================
    const typingDelayMinMs = 70;
    const typingDelayMaxMs = 140;
    const deletingDelayMinMs = 35;
    const deletingDelayMaxMs = 75;
    const holdBeforeDeleteMs = 1000;

    const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const step = () => {
      if (!isDeleting) {
        setText(currentWord.slice(0, text.length + 1));
      } else {
        setText(currentWord.slice(0, text.length - 1));
      }
    };

    if (!isDeleting && isComplete) {
      const holdTimeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, holdBeforeDeleteMs);
      return () => window.clearTimeout(holdTimeout);
    }

    if (isDeleting && isEmpty) {
      setIsDeleting(false);
      setWordIndex((index) => (index + 1) % words.length);
    }

    const delay = isDeleting
      ? randomDelay(deletingDelayMinMs, deletingDelayMaxMs)
      : randomDelay(typingDelayMinMs, typingDelayMaxMs);

    const timeoutId = window.setTimeout(step, delay);
    return () => window.clearTimeout(timeoutId);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}

function createSeededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function VCardTrianglifyBackground() {
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
    <svg className="vcard-bg-svg" viewBox={`0 0 ${trianglifyConfig.width} ${trianglifyConfig.height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="100%" height="100%" fill="#f8fafc" />
      {polygons.map((polygon, index) => (
        <polygon key={index} points={polygon.points} fill={polygon.color} />
      ))}
      <rect width="100%" height="100%" fill="url(#vcardTrianglifyFade)" />
      <defs>
        <linearGradient id="vcardTrianglifyFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="52%" stopColor="rgba(255,255,255,0.2)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.34)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function VCardParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

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
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, particleSettings.maxDpr);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    };

    const draw = (time = 0) => {
      animationFrame = window.requestAnimationFrame(draw);
      if (!isPageVisible || time - lastFrameTime < frameInterval) return;
      lastFrameTime = time;

      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      });

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j];
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
        }
      }

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

  return <canvas ref={canvasRef} className="vcard-bg-canvas" aria-hidden="true" />;
}

export default function VCardPage() {
  const typedWord = useTypewriter(rotatingWords);

  // ==========================================================================
  // 4) CONTACT LINKS BUILD
  // Purpose: Construire des URLs d'action propres pour chaque bouton.
  // Key variables: tel/sms/mail/site à partir de la config centralisée.
  // Logic flow: sanitize phone -> compose hrefs -> inject into buttons list.
  // ==========================================================================
  const contactActions = useMemo(() => {
    const digitsOnlyPhone = vcardConfig.phoneNumber.replace(/\s+/g, "");
    return [
      {
        key: "call",
        label: "Appeler",
        href: `tel:${digitsOnlyPhone}`,
        icon: faPhone,
      },
      {
        key: "sms",
        label: "SMS",
        href: `sms:${digitsOnlyPhone}`,
        icon: faCommentSms,
      },
      {
        key: "email",
        label: "Email",
        href: `mailto:${vcardConfig.email}`,
        icon: faEnvelope,
      },
      {
        key: "website",
        label: "Site web",
        href: vcardConfig.websiteUrl,
        icon: faGlobe,
      },
    ];
  }, []);

  return (
    <main className="vcard-page">
      <section className="vcard-shell">
        <div className="vcard-backgrounds" aria-hidden="true">
          <VCardTrianglifyBackground />
          <VCardParticleBackground />
          <div className="vcard-bg-overlay" />
        </div>
        <div className="vcard-content">
        <header className="vcard-header">
          <h1 className="vcard-brand">{vcardConfig.brandName}</h1>
          <p className="vcard-tagline">{vcardConfig.tagline}</p>
          <p className="vcard-typewriter" aria-live="polite">
            {typedWord}
            <span className="vcard-caret" aria-hidden="true">
              |
            </span>
          </p>
        </header>

        <div className="vcard-logo-wrap">
          <img className="vcard-logo" src={vcardConfig.logoSrc} alt={vcardConfig.logoAlt} />
        </div>

        <div className="vcard-actions">
          <a className="vcard-save-contact" href={vcardConfig.vcfDownloadHref} download>
            <FontAwesomeIcon icon={faAddressCard} />
            <span>Ajouter aux contacts</span>
          </a>

          <div className="vcard-quick-grid">
            {contactActions.map((action) => (
              <a
                key={action.key}
                className="vcard-quick-button"
                href={action.href}
                target={action.key === "website" ? "_blank" : undefined}
                rel={action.key === "website" ? "noopener noreferrer" : undefined}
                aria-label={action.label}
                title={action.label}
              >
                <FontAwesomeIcon icon={action.icon} />
              </a>
            ))}
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
