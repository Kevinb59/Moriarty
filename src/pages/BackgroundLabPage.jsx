import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  particlesBackgroundSettings,
  trianglesBackgroundSettings,
} from "../config/backgroundEffectsConfig.js";

// ==========================================================================
// 1) DEFAULT STATE BUILDERS
// Purpose: Cloner les réglages sources pour éviter toute mutation globale.
// Key variables: trianglesBackgroundSettings, particlesBackgroundSettings.
// Logic flow: deep clone JSON -> état local indépendant de la config importée.
// ==========================================================================
function buildDefaultTrianglesState() {
  return JSON.parse(JSON.stringify(trianglesBackgroundSettings));
}

function buildDefaultParticlesState() {
  return JSON.parse(JSON.stringify(particlesBackgroundSettings));
}

function createSeededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function TrianglesPreview({ trianglesSettings }) {
  const trianglifyRuntime = useMemo(
    () => ({
      width: trianglesSettings.canvas.width,
      height: trianglesSettings.canvas.height,
      cellSize: trianglesSettings.mesh.cellSize,
      variance: trianglesSettings.mesh.variance,
      seed: trianglesSettings.mesh.seed,
      lightCenter: {
        x: trianglesSettings.lighting.centerX,
        y: trianglesSettings.lighting.centerY,
      },
      lightDistanceMultiplier: trianglesSettings.lighting.distanceMultiplier,
      noiseAmplitude: trianglesSettings.lighting.noiseAmplitude,
      microFacetAmplitude: trianglesSettings.lighting.microFacetAmplitude,
      microFacetFrequencyX: trianglesSettings.lighting.microFacetFrequencyX,
      microFacetFrequencyY: trianglesSettings.lighting.microFacetFrequencyY,
      palette: trianglesSettings.palette,
    }),
    [trianglesSettings]
  );

  // ==========================================================================
  // 2) TRIANGLE POLYGONS GENERATION
  // Purpose: Reproduire le fond triangulaire de la homepage avec paramètres live.
  // Key variables: width/height, cellSize, variance, palette, lighting runtime.
  // Logic flow: grille perturbée -> triangles -> shading -> rendu SVG.
  // ==========================================================================
  const polygons = useMemo(() => {
    const random = createSeededRandom(trianglifyRuntime.seed);
    const { width, height, cellSize, variance, palette } = trianglifyRuntime;
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
      const dx = nx - trianglifyRuntime.lightCenter.x;
      const dy = ny - trianglifyRuntime.lightCenter.y;
      const distanceFromLight = Math.min(
        1,
        Math.sqrt(dx * dx + dy * dy) * trianglifyRuntime.lightDistanceMultiplier
      );
      const facetNoise = (random() - 0.5) * trianglifyRuntime.noiseAmplitude;
      const microFacet =
        Math.sin(
          (nx * trianglifyRuntime.microFacetFrequencyX +
            ny * trianglifyRuntime.microFacetFrequencyY) *
            Math.PI
        ) * trianglifyRuntime.microFacetAmplitude;
      const value = Math.max(
        0,
        Math.min(1, distanceFromLight + facetNoise + microFacet)
      );
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
        const triangles = flip
          ? [
              [p1, p2, p4],
              [p1, p4, p3],
            ]
          : [
              [p1, p2, p3],
              [p2, p4, p3],
            ];

        triangles.forEach((triangle) => {
          const centroidX = (triangle[0].x + triangle[1].x + triangle[2].x) / 3;
          const centroidY = (triangle[0].y + triangle[1].y + triangle[2].y) / 3;
          output.push({
            points: triangle
              .map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`)
              .join(" "),
            color: colorForTriangle(centroidX, centroidY),
          });
        });
      }
    }

    return output;
  }, [trianglifyRuntime]);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${trianglifyRuntime.width} ${trianglifyRuntime.height}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="100%" height="100%" fill="#f8fafc" />
      {polygons.map((polygon, index) => (
        <polygon key={index} points={polygon.points} fill={polygon.color} />
      ))}
      <rect
        width="100%"
        height="100%"
        fill="url(#moriartyTrianglifyFadeLab)"
      />
      <defs>
        <linearGradient id="moriartyTrianglifyFadeLab" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="48%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.24)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ParticlesPreview({ particlesSettings }) {
  const canvasRef = useRef(null);

  // ==========================================================================
  // 3) PARTICLES ENGINE LIVE PREVIEW
  // Purpose: Réutiliser le réseau de particules avec mise à jour temps réel.
  // Key variables: count, densityArea, speed, link distance, opacities.
  // Logic flow: resize -> génération -> animation loop -> cleanup listeners/RAF.
  // ==========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return undefined;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const shouldDisable =
      reducedMotion || window.innerWidth < particlesSettings.performance.disableBelowWidth;

    if (shouldDisable) {
      canvas.style.display = "none";
      return undefined;
    }

    canvas.style.display = "block";

    let animationFrame = 0;
    let particles = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastFrameTime = 0;
    let isPageVisible = !document.hidden;
    const frameInterval = 1000 / particlesSettings.performance.targetFps;

    const createParticles = () => {
      const densityRatio = Math.max(
        0.45,
        Math.min(
          1.25,
          (width * height) / (particlesSettings.particles.densityArea * 1000)
        )
      );
      const count = Math.round(particlesSettings.particles.count * densityRatio);

      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const velocity =
          (particlesSettings.particles.speed / 20) *
          (0.45 + Math.random() * 0.9);
        const radius = particlesSettings.particles.sizeRandom
          ? 0.7 + Math.random() * particlesSettings.particles.size
          : particlesSettings.particles.size;

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
      dpr = Math.min(
        window.devicePixelRatio || 1,
        particlesSettings.performance.maxDpr
      );
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
      const cellSize = particlesSettings.links.distance;
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
              const maxDistanceSquared =
                particlesSettings.links.distance * particlesSettings.links.distance;

              if (distanceSquared < maxDistanceSquared) {
                const distance = Math.sqrt(distanceSquared);
                const opacity =
                  (1 - distance / particlesSettings.links.distance) *
                  particlesSettings.links.opacity;
                context.strokeStyle = `rgba(${particlesSettings.links.colorRgb}, ${opacity})`;
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

      context.fillStyle = `rgba(${particlesSettings.particles.colorRgb}, ${particlesSettings.particles.opacity})`;
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
  }, [particlesSettings]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
}

function BackgroundLabPage() {
  const [trianglesSettings, setTrianglesSettings] = useState(
    buildDefaultTrianglesState
  );
  const [particlesSettings, setParticlesSettings] = useState(
    buildDefaultParticlesState
  );
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  // ==========================================================================
  // 4) TRIANGLES CONTROL HANDLERS
  // Purpose: Mettre à jour un sous-ensemble précis sans casser le reste de l'état.
  // Key variables: section, key, value, previous nested object.
  // Logic flow: copie immuable -> écrasement ciblé -> rerender immédiat.
  // ==========================================================================
  const updateTriangle = (section, key, value) => {
    setTrianglesSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const updateParticles = (section, key, value) => {
    setParticlesSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const resetAll = () => {
    setTrianglesSettings(buildDefaultTrianglesState());
    setParticlesSettings(buildDefaultParticlesState());
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <TrianglesPreview trianglesSettings={trianglesSettings} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_32%,rgba(255,255,255,0.24)_0%,transparent_28%),radial-gradient(circle_at_18%_8%,rgba(186,230,253,0.10)_0%,transparent_30%),radial-gradient(circle_at_84%_18%,rgba(191,219,254,0.08)_0%,transparent_32%),linear-gradient(180deg,rgba(240,251,255,0.04)_0%,rgba(255,255,255,0.08)_42%,rgba(248,250,252,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,116,144,0.045),transparent_22%,rgba(30,64,175,0.035)_48%,transparent_78%)]" />
        <ParticlesPreview particlesSettings={particlesSettings} />
      </div>

      {/* ==========================================================================
          5) TOGGLE BUTTON (DISCREET CORNER)
          Purpose: Ouvrir/fermer le panneau de réglages sans gêner la prévisualisation.
          Key variables: isControlsOpen, bouton fixe en bas à droite.
          Logic flow: clic -> inversion d'état -> affichage/masquage du panneau.
          ========================================================================== */}
      <button
        type="button"
        onClick={() => setIsControlsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-30 rounded-full border border-white/30 bg-slate-900/75 px-3 py-2 text-xs font-semibold text-slate-100 backdrop-blur-md transition hover:bg-slate-800/85"
      >
        {isControlsOpen ? "Fermer réglages" : "Réglages"}
      </button>

      {isControlsOpen && (
        <main className="relative z-20 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-6">
        <header className="rounded-2xl border border-white/20 bg-slate-900/70 p-5 backdrop-blur-md">
          <h1 className="text-2xl font-semibold md:text-3xl">Background Lab</h1>
          <p className="mt-2 text-sm text-slate-200 md:text-base">
            Réglage en direct des fonds triangulaire et particules.
          </p>
          <p className="mt-1 text-xs text-slate-300">
            URL d&apos;accès : <span className="font-mono">/background-lab</span>
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/20 bg-slate-900/70 p-4 backdrop-blur-md">
            <h2 className="text-lg font-semibold">Triangles</h2>
            <div className="mt-4 grid gap-3">
              <label className="text-sm">
                Cell size ({trianglesSettings.mesh.cellSize})
                <input
                  type="range"
                  min="40"
                  max="220"
                  step="1"
                  value={trianglesSettings.mesh.cellSize}
                  onChange={(event) =>
                    updateTriangle("mesh", "cellSize", Number(event.target.value))
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Variance ({trianglesSettings.mesh.variance.toFixed(2)})
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={trianglesSettings.mesh.variance}
                  onChange={(event) =>
                    updateTriangle("mesh", "variance", Number(event.target.value))
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Seed ({trianglesSettings.mesh.seed})
                <input
                  type="number"
                  value={trianglesSettings.mesh.seed}
                  onChange={(event) =>
                    updateTriangle("mesh", "seed", Number(event.target.value || 1))
                  }
                  className="mt-1 w-full rounded border border-white/30 bg-slate-800 px-2 py-1"
                />
              </label>

              <label className="text-sm">
                Lumière X ({trianglesSettings.lighting.centerX.toFixed(2)})
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={trianglesSettings.lighting.centerX}
                  onChange={(event) =>
                    updateTriangle(
                      "lighting",
                      "centerX",
                      Number(event.target.value)
                    )
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Lumière Y ({trianglesSettings.lighting.centerY.toFixed(2)})
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={trianglesSettings.lighting.centerY}
                  onChange={(event) =>
                    updateTriangle(
                      "lighting",
                      "centerY",
                      Number(event.target.value)
                    )
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Intensité lumière (
                {trianglesSettings.lighting.distanceMultiplier.toFixed(2)})
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.01"
                  value={trianglesSettings.lighting.distanceMultiplier}
                  onChange={(event) =>
                    updateTriangle(
                      "lighting",
                      "distanceMultiplier",
                      Number(event.target.value)
                    )
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Palette (1 couleur RGBA par ligne)
                <textarea
                  value={trianglesSettings.palette.join("\n")}
                  onChange={(event) => {
                    const parsed = event.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean);
                    if (parsed.length >= 3) {
                      setTrianglesSettings((prev) => ({ ...prev, palette: parsed }));
                    }
                  }}
                  className="mt-1 h-28 w-full rounded border border-white/30 bg-slate-800 px-2 py-1 text-xs"
                />
              </label>
            </div>
          </article>

          <article className="rounded-2xl border border-white/20 bg-slate-900/70 p-4 backdrop-blur-md">
            <h2 className="text-lg font-semibold">Particules</h2>
            <div className="mt-4 grid gap-3">
              <label className="text-sm">
                Nombre ({particlesSettings.particles.count})
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="1"
                  value={particlesSettings.particles.count}
                  onChange={(event) =>
                    updateParticles(
                      "particles",
                      "count",
                      Number(event.target.value)
                    )
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Vitesse ({particlesSettings.particles.speed.toFixed(2)})
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={particlesSettings.particles.speed}
                  onChange={(event) =>
                    updateParticles(
                      "particles",
                      "speed",
                      Number(event.target.value)
                    )
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Taille ({particlesSettings.particles.size.toFixed(2)})
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.1"
                  value={particlesSettings.particles.size}
                  onChange={(event) =>
                    updateParticles("particles", "size", Number(event.target.value))
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Opacité particules (
                {particlesSettings.particles.opacity.toFixed(2)})
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.01"
                  value={particlesSettings.particles.opacity}
                  onChange={(event) =>
                    updateParticles(
                      "particles",
                      "opacity",
                      Number(event.target.value)
                    )
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Distance liens ({particlesSettings.links.distance})
                <input
                  type="range"
                  min="30"
                  max="280"
                  step="1"
                  value={particlesSettings.links.distance}
                  onChange={(event) =>
                    updateParticles("links", "distance", Number(event.target.value))
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Opacité liens ({particlesSettings.links.opacity.toFixed(2)})
                <input
                  type="range"
                  min="0.02"
                  max="1"
                  step="0.01"
                  value={particlesSettings.links.opacity}
                  onChange={(event) =>
                    updateParticles("links", "opacity", Number(event.target.value))
                  }
                  className="mt-1 w-full"
                />
              </label>

              <label className="text-sm">
                Couleur particules (RGB)
                <input
                  type="text"
                  value={particlesSettings.particles.colorRgb}
                  onChange={(event) =>
                    updateParticles("particles", "colorRgb", event.target.value)
                  }
                  className="mt-1 w-full rounded border border-white/30 bg-slate-800 px-2 py-1"
                />
              </label>

              <label className="text-sm">
                Couleur liens (RGB)
                <input
                  type="text"
                  value={particlesSettings.links.colorRgb}
                  onChange={(event) =>
                    updateParticles("links", "colorRgb", event.target.value)
                  }
                  className="mt-1 w-full rounded border border-white/30 bg-slate-800 px-2 py-1"
                />
              </label>
            </div>
          </article>
        </section>

        <section className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/20 bg-slate-900/70 p-4 backdrop-blur-md">
          <button
            type="button"
            onClick={resetAll}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Réinitialiser les réglages
          </button>
          <p className="text-xs text-slate-300">
            Astuce: copie ces valeurs dans `backgroundEffectsConfig.js` quand le rendu te convient.
          </p>
        </section>
        </main>
      )}
    </div>
  );
}

export default BackgroundLabPage;
