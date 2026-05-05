// ==========================================================================
// 1) BACKGROUND EFFECTS - QUICK SETTINGS LIST
// Purpose: Rassembler tous les paramètres modifiables des 2 fonds visuels.
// Key variables: trianglesBackgroundSettings, particlesBackgroundSettings.
// Logic flow: définir une liste lisible -> exposer config runtime compatible.
// ==========================================================================

// ==========================================================================
// 2) TRIANGLES BACKGROUND (Trianglify-like)
// Purpose: Piloter la densité, forme et palette du fond triangulaire.
// Key variables:
// - canvas: dimensions de référence pour la génération SVG
// - mesh: taille des cellules + irrégularité
// - lighting: position de la lumière et intensité du contraste
// - palette: du plus clair au plus foncé (ordre important)
// Logic flow: ces valeurs alimentent la génération des triangles en runtime.
// ==========================================================================
export const trianglesBackgroundSettings = {
  canvas: {
    width: 1440,
    height: 1200
  },
  mesh: {
    cellSize: 105,
    variance: 0.5,
    seed: 42
  },
  lighting: {
    centerX: 0.46,
    centerY: 0.32,
    distanceMultiplier: 1.55,
    noiseAmplitude: 0.34,
    microFacetAmplitude: 0.08,
    microFacetFrequencyX: 17.3,
    microFacetFrequencyY: 9.7
  },
  palette: [
    'rgba(255, 255, 255, 0.96)',
    'rgba(247, 252, 255, 0.94)',
    'rgba(232, 246, 255, 0.88)',
    'rgba(211, 236, 250, 0.76)',
    'rgba(184, 220, 242, 0.62)',
    'rgba(149, 193, 224, 0.46)',
    'rgba(95, 145, 195, 0.30)'
  ]
}

// ==========================================================================
// 3) PARTICLES + LINES BACKGROUND
// Purpose: Régler le réseau de particules (quantité, liaison, vitesse, rendu).
// Key variables:
// - performance: contrôle qualité/fps/désactivation mobile
// - particles: quantité, taille, opacité, vitesse
// - links: distance de liaison, opacité et couleur des lignes
// Logic flow: ces paramètres sont consommés par l'animation canvas.
// ==========================================================================
export const particlesBackgroundSettings = {
  performance: {
    targetFps: 30,
    maxDpr: 1.25,
    disableBelowWidth: 768
  },
  particles: {
    count: 205,
    densityArea: 1050,
    colorRgb: '8, 145, 178',
    opacity: 0.48,
    size: 2.6,
    sizeRandom: true,
    speed: 4.6
  },
  links: {
    colorRgb: '6, 182, 212',
    opacity: 0.34,
    distance: 140
  }
}

// ==========================================================================
// 4) RUNTIME COMPAT EXPORTS
// Purpose: Garder la compatibilité avec les clés déjà utilisées dans la page.
// Key variables: trianglifyConfig, particleSettings.
// Logic flow: mapping des settings lisibles vers structure runtime existante.
// ==========================================================================
export const trianglifyConfig = {
  width: trianglesBackgroundSettings.canvas.width,
  height: trianglesBackgroundSettings.canvas.height,
  cellSize: trianglesBackgroundSettings.mesh.cellSize,
  variance: trianglesBackgroundSettings.mesh.variance,
  seed: trianglesBackgroundSettings.mesh.seed,
  lightCenter: {
    x: trianglesBackgroundSettings.lighting.centerX,
    y: trianglesBackgroundSettings.lighting.centerY
  },
  lightDistanceMultiplier:
    trianglesBackgroundSettings.lighting.distanceMultiplier,
  noiseAmplitude: trianglesBackgroundSettings.lighting.noiseAmplitude,
  microFacetAmplitude: trianglesBackgroundSettings.lighting.microFacetAmplitude,
  microFacetFrequencyX:
    trianglesBackgroundSettings.lighting.microFacetFrequencyX,
  microFacetFrequencyY:
    trianglesBackgroundSettings.lighting.microFacetFrequencyY,
  palette: trianglesBackgroundSettings.palette
}

export const particleSettings = {
  count: particlesBackgroundSettings.particles.count,
  densityArea: particlesBackgroundSettings.particles.densityArea,
  particleColor: particlesBackgroundSettings.particles.colorRgb,
  lineColor: particlesBackgroundSettings.links.colorRgb,
  particleOpacity: particlesBackgroundSettings.particles.opacity,
  lineOpacity: particlesBackgroundSettings.links.opacity,
  size: particlesBackgroundSettings.particles.size,
  sizeRandom: particlesBackgroundSettings.particles.sizeRandom,
  linkDistance: particlesBackgroundSettings.links.distance,
  speed: particlesBackgroundSettings.particles.speed,
  maxDpr: particlesBackgroundSettings.performance.maxDpr,
  targetFps: particlesBackgroundSettings.performance.targetFps,
  disableBelowWidth: particlesBackgroundSettings.performance.disableBelowWidth
}
