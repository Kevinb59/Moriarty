/**
 * Moriarty vCard — widget embarquable (vanilla JS, Shadow DOM).
 * ---------------------------------------------------------------------------
 * 1) Rôle global
 *    Purpose: ouvrir la même carte vCard que /vcard en popup sur les sites clients.
 *    Key variables: BASE_SITE (URLs absolues), config alignée sur VCardPage.jsx.
 *    Logic flow: clic [data-moriarty-vcard] -> overlay glass -> carte centrée.
 * ---------------------------------------------------------------------------
 */
(function moriartyVcardWidget() {
  // ==========================================================================
  // 2) Garde anti double initialisation
  // Purpose: éviter deux hosts si le script est inclus deux fois par erreur.
  // Key variables: flag sur document.
  // Logic flow: si déjà monté -> sortie immédiate.
  // ==========================================================================
  if (document.getElementById("moriarty-vcard-widget-host")) {
    return;
  }

  var BASE_SITE = "https://www.moriarty-design.fr";

  // ==========================================================================
  // 3) Config contenu (miroir src/vcard/VCardPage.jsx + URLs absolues)
  // Purpose: une seule source textes / liens pour la carte et le .vcf généré.
  // Key variables: identité, médias sur BASE_SITE, téléphone pour tel/sms.
  // Logic flow: constantes -> gabarits HTML / blob VCF / hrefs boutons.
  // ==========================================================================
  var vcardConfig = {
    brandName: "Moriarty",
    tagline: "VOTRE SITE WEB",
    logoSrc: BASE_SITE + "/media/Logo.webp",
    logoAlt: "Logo Moriarty",
    vcfDownloadName: "moriarty.vcf",
    websiteUrl: "https://www.moriarty-design.fr",
    phoneNumber: "+33000000000",
    email: "contact@moriarty-design.fr",
  };

  var rotatingWords = [
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
  // 4) Paramètres fonds (miroir src/config/backgroundEffectsConfig.js)
  // Purpose: triangles SVG + particules canvas identiques à la page vCard.
  // Key variables: trianglifyConfig, particleSettings.
  // Logic flow: lecture par les générateurs SVG / boucle requestAnimationFrame.
  // ==========================================================================
  var trianglifyConfig = {
    width: 1440,
    height: 1200,
    cellSize: 105,
    variance: 0.5,
    seed: 42,
    lightCenter: { x: 0.46, y: 0.32 },
    lightDistanceMultiplier: 1.55,
    noiseAmplitude: 0.34,
    microFacetAmplitude: 0.08,
    microFacetFrequencyX: 17.3,
    microFacetFrequencyY: 9.7,
    palette: [
      "rgba(255, 255, 255, 0.96)",
      "rgba(247, 252, 255, 0.94)",
      "rgba(232, 246, 255, 0.88)",
      "rgba(211, 236, 250, 0.76)",
      "rgba(184, 220, 242, 0.62)",
      "rgba(149, 193, 224, 0.46)",
      "rgba(95, 145, 195, 0.30)",
    ],
  };

  var particleSettings = {
    count: 205,
    densityArea: 1050,
    particleColor: "8, 145, 178",
    lineColor: "6, 182, 212",
    particleOpacity: 0.48,
    lineOpacity: 0.34,
    size: 2.6,
    sizeRandom: true,
    linkDistance: 140,
    speed: 4.6,
    maxDpr: 1.25,
    targetFps: 30,
  };

  // ==========================================================================
  // 5) Contenu .vcf (aligné sur public/vcard/moriarty.vcf)
  // Purpose: téléchargement fiable depuis domaines tiers sans dépendre du CORS.
  // Key variables: chaîne RFC-compatible.
  // Logic flow: clic « Ajouter aux contacts » -> Blob -> URL objet -> download.
  // ==========================================================================
  var VCF_FILE_BODY =
    "BEGIN:VCARD\r\n" +
    "VERSION:3.0\r\n" +
    "N:Moriarty;;;;\r\n" +
    "FN:Moriarty\r\n" +
    "ORG:Moriarty Design\r\n" +
    "TITLE:Votre site web\r\n" +
    "TEL;TYPE=CELL:+33000000000\r\n" +
    "EMAIL;TYPE=INTERNET:contact@moriarty-design.fr\r\n" +
    "URL:https://www.moriarty-design.fr\r\n" +
    "END:VCARD\r\n";

  // ==========================================================================
  // 6) Icônes Font Awesome solid (chemins officiels @fortawesome/free-solid-svg-icons)
  // Purpose: rendu identique aux <FontAwesomeIcon /> de la page React.
  // Key variables: viewBox + path unique par pictogramme.
  // Logic flow: SVG inline -> couleur currentColor comme en FA.
  // ==========================================================================
  var ICONS = {
    addressCard: {
      vb: "0 0 576 512",
      d: "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm80 256l64 0c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16L80 384c-8.8 0-16-7.2-16-16 0-44.2 35.8-80 80-80zm-24-96a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm240-48l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm0 96l112 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-112 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z",
    },
    phone: {
      vb: "0 0 512 512",
      d: "M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z",
    },
    commentSms: {
      vb: "0 0 512 512",
      d: "M256 480c141.4 0 256-107.5 256-240S397.4 0 256 0 0 107.5 0 240c0 54.3 19.2 104.3 51.6 144.5L2.8 476.8c-4.8 9-3.3 20 3.6 27.5s17.8 9.8 27.1 5.8l118.4-50.7C183.7 472.6 218.9 480 256 480zM140.8 172.8l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6s18.6-41.6 41.6-41.6zm188.8 41.6c0-23 18.6-41.6 41.6-41.6l19.2 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-19.2 0c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6c23 0 41.6 18.6 41.6 41.6s-18.6 41.6-41.6 41.6l-25.6 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l25.6 0c5.3 0 9.6-4.3 9.6-9.6s-4.3-9.6-9.6-9.6c-23 0-41.6-18.6-41.6-41.6zm-98.3-33.8l24.7 41.1 24.7-41.1c3.7-6.2 11.1-9.1 18-7.2s11.7 8.2 11.7 15.4l0 102.4c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-44.6-8.7 14.5c-2.9 4.8-8.1 7.8-13.7 7.8s-10.8-3-13.7-7.8l-8.7-14.5 0 44.6c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-102.4c0-7.2 4.8-13.5 11.7-15.4s14.3 1 18 7.2z",
    },
    envelope: {
      vb: "0 0 512 512",
      d: "M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z",
    },
    globe: {
      vb: "0 0 512 512",
      d: "M351.9 280l-190.9 0c2.9 64.5 17.2 123.9 37.5 167.4 11.4 24.5 23.7 41.8 35.1 52.4 11.2 10.5 18.9 12.2 22.9 12.2s11.7-1.7 22.9-12.2c11.4-10.6 23.7-28 35.1-52.4 20.3-43.5 34.6-102.9 37.5-167.4zM160.9 232l190.9 0C349 167.5 334.7 108.1 314.4 64.6 303 40.2 290.7 22.8 279.3 12.2 268.1 1.7 260.4 0 256.4 0s-11.7 1.7-22.9 12.2c-11.4 10.6-23.7 28-35.1 52.4-20.3 43.5-34.6 102.9-37.5 167.4zm-48 0C116.4 146.4 138.5 66.9 170.8 14.7 78.7 47.3 10.9 131.2 1.5 232l111.4 0zM1.5 280c9.4 100.8 77.2 184.7 169.3 217.3-32.3-52.2-54.4-131.7-57.9-217.3L1.5 280zm398.4 0c-3.5 85.6-25.6 165.1-57.9 217.3 92.1-32.7 159.9-116.5 169.3-217.3l-111.4 0zm111.4-48C501.9 131.2 434.1 47.3 342 14.7 374.3 66.9 396.4 146.4 399.9 232l111.4 0z",
    },
  };

  function createSeededRandom(seed) {
    var value = seed;
    return function seeded() {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  }

  // ==========================================================================
  // 7) Trianglify (port exact de VCardTrianglifyBackground)
  // Purpose: reproduire le maillage triangulaire et le dégradé de facettes.
  // Key variables: random graine fixe, boucles grille -> couples de triangles.
  // Logic flow: points jitter -> colorForTriangle -> chaîne <polygon>.
  // ==========================================================================
  function buildTrianglifySvgMarkup() {
    var random = createSeededRandom(trianglifyConfig.seed);
    var width = trianglifyConfig.width;
    var height = trianglifyConfig.height;
    var cellSize = trianglifyConfig.cellSize;
    var variance = trianglifyConfig.variance;
    var cols = Math.ceil(width / cellSize) + 3;
    var rows = Math.ceil(height / cellSize) + 3;
    var points = [];
    var y;
    var x;
    var row;
    var offsetX;
    var offsetY;

    for (y = -1; y < rows; y += 1) {
      row = [];
      for (x = -1; x < cols; x += 1) {
        offsetX = (random() - 0.5) * cellSize * variance;
        offsetY = (random() - 0.5) * cellSize * variance;
        row.push({
          x: x * cellSize + offsetX,
          y: y * cellSize + offsetY,
        });
      }
      points.push(row);
    }

    function colorForTriangle(centroidX, centroidY) {
      var nx = centroidX / width;
      var ny = centroidY / height;
      var dx = nx - trianglifyConfig.lightCenter.x;
      var dy = ny - trianglifyConfig.lightCenter.y;
      var distanceFromLight = Math.min(
        1,
        Math.sqrt(dx * dx + dy * dy) * trianglifyConfig.lightDistanceMultiplier
      );
      var facetNoise = (random() - 0.5) * trianglifyConfig.noiseAmplitude;
      var microFacet =
        Math.sin(
          (nx * trianglifyConfig.microFacetFrequencyX +
            ny * trianglifyConfig.microFacetFrequencyY) *
            Math.PI
        ) * trianglifyConfig.microFacetAmplitude;
      var value = Math.max(0, Math.min(1, distanceFromLight + facetNoise + microFacet));
      var palette = trianglifyConfig.palette;
      var index = Math.round(value * (palette.length - 1));
      return palette[Math.max(0, Math.min(palette.length - 1, index))];
    }

    var parts = [];
    parts.push(
      '<svg class="vcard-bg-svg" viewBox="0 0 ' +
        width +
        " " +
        height +
        '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    );
    parts.push('<defs>');
    parts.push(
      '<linearGradient id="moriartyVcardTriFade" x1="0" y1="0" x2="1" y2="1">'
    );
    parts.push('<stop offset="0%" stop-color="rgba(255,255,255,0.10)" />');
    parts.push('<stop offset="52%" stop-color="rgba(255,255,255,0.2)" />');
    parts.push('<stop offset="100%" stop-color="rgba(255,255,255,0.34)" />');
    parts.push("</linearGradient>");
    parts.push("</defs>");
    parts.push('<rect width="100%" height="100%" fill="#f8fafc" />');

    for (y = 0; y < points.length - 1; y += 1) {
      for (x = 0; x < points[y].length - 1; x += 1) {
        var p1 = points[y][x];
        var p2 = points[y][x + 1];
        var p3 = points[y + 1][x];
        var p4 = points[y + 1][x + 1];
        var flip = random() > 0.5;
        var triangles = flip
          ? [
              [p1, p2, p4],
              [p1, p4, p3],
            ]
          : [
              [p1, p2, p3],
              [p2, p4, p3],
            ];
        var tidx;
        for (tidx = 0; tidx < triangles.length; tidx += 1) {
          var triangle = triangles[tidx];
          var centroidX = (triangle[0].x + triangle[1].x + triangle[2].x) / 3;
          var centroidY = (triangle[0].y + triangle[1].y + triangle[2].y) / 3;
          var ptsStr = triangle
            .map(function mapPt(point) {
              return point.x.toFixed(1) + "," + point.y.toFixed(1);
            })
            .join(" ");
          parts.push(
            '<polygon points="' +
              ptsStr +
              '" fill="' +
              colorForTriangle(centroidX, centroidY) +
              '" />'
          );
        }
      }
    }

    parts.push('<rect width="100%" height="100%" fill="url(#moriartyVcardTriFade)" />');
    parts.push("</svg>");
    return parts.join("");
  }

  function iconSvgMarkup(iconKey, extraClass) {
    var meta = ICONS[iconKey];
    var cls = "vcard-fa-icon" + (extraClass ? " " + extraClass : "");
    return (
      '<svg class="' +
      cls +
      '" xmlns="http://www.w3.org/2000/svg" viewBox="' +
      meta.vb +
      '" aria-hidden="true" focusable="false"><path fill="currentColor" d="' +
      meta.d +
      '"/></svg>'
    );
  }

  // ==========================================================================
  // 8) Styles carte + overlay (vcard.css adapté — carte inchangée, page retirée)
  // Purpose: isoler le rendu dans le Shadow DOM sans pollution du site client.
  // Key variables: mêmes règles .vcard-* que src/vcard/vcard.css + popup shell.
  // Logic flow: typo Montserrat/Engagement -> shell -> boutons -> grille icônes.
  // ==========================================================================
  function buildWidgetCss() {
    return (
      ":host { font-family: Montserrat, Arial, sans-serif; }" +
      ".moriarty-vcard-layer {" +
      "  display: none;" +
      "  position: fixed;" +
      "  inset: 0;" +
      "  z-index: 2147483647;" +
      "}" +
      ".moriarty-vcard-layer.is-open {" +
      "  display: block;" +
      "}" +
      ".moriarty-vcard-backdrop {" +
      "  position: absolute;" +
      "  inset: 0;" +
      "  background: rgba(5, 20, 30, 0.35);" +
      "  -webkit-backdrop-filter: blur(8px);" +
      "  backdrop-filter: blur(8px);" +
      "}" +
      ".moriarty-vcard-center-wrap {" +
      "  position: absolute;" +
      "  inset: 0;" +
      "  display: flex;" +
      "  align-items: center;" +
      "  justify-content: center;" +
      "  padding: clamp(10px, 2.2vh, 18px);" +
      "  box-sizing: border-box;" +
      "  pointer-events: none;" +
      "}" +
      /* Dialog : plafond 900px aligné sur src/vcard/vcard.css (.vcard-shell) */
      ".moriarty-vcard-dialog {" +
      "  position: relative;" +
      "  pointer-events: auto;" +
      "  width: min(100%, 420px);" +
      "  height: min(900px, calc(100dvh - clamp(20px, 4vh, 36px)), calc(100vh - clamp(20px, 4vh, 36px)));" +
      "  max-height: min(900px, calc(100dvh - clamp(20px, 4vh, 36px)), calc(100vh - clamp(20px, 4vh, 36px)));" +
      "  box-sizing: border-box;" +
      "}" +
      ".moriarty-vcard-close {" +
      "  position: absolute;" +
      "  top: clamp(8px, 1.5vh, 14px);" +
      "  right: clamp(8px, 2vw, 14px);" +
      "  z-index: 4;" +
      "  width: 40px;" +
      "  height: 40px;" +
      "  border-radius: 999px;" +
      "  border: 1px solid rgba(8, 145, 178, 0.26);" +
      "  background: rgba(255, 255, 255, 0.95);" +
      "  color: #0e7490;" +
      "  cursor: pointer;" +
      "  font-size: 1.35rem;" +
      "  line-height: 1;" +
      "  display: grid;" +
      "  place-items: center;" +
      "  box-shadow: 0 8px 16px rgba(14, 116, 144, 0.12);" +
      "  padding: 0;" +
      "  margin: 0;" +
      "}" +
      ".moriarty-vcard-close:focus-visible {" +
      "  outline: 2px solid #0e7490;" +
      "  outline-offset: 2px;" +
      "}" +
      ".vcard-shell {" +
      "  width: 100%;" +
      "  height: 100%;" +
      "  max-height: 100%;" +
      "  border-radius: 24px;" +
      "  border: 1px solid rgba(8, 145, 178, 0.18);" +
      "  background:" +
      "    radial-gradient(circle at 22% 12%, rgba(186, 230, 253, 0.35) 0%, transparent 38%)," +
      "    radial-gradient(circle at 90% 8%, rgba(191, 219, 254, 0.25) 0%, transparent 34%)," +
      "    linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 249, 255, 0.95) 52%, rgba(255, 255, 255, 0.94) 100%);" +
      "  box-shadow: 0 0 0 1px rgba(8, 145, 178, 0.06), 0 22px 46px rgba(14, 116, 144, 0.18);" +
      "  -webkit-backdrop-filter: blur(8px);" +
      "  backdrop-filter: blur(8px);" +
      "  padding: clamp(16px, 3vh, 24px);" +
      "  box-sizing: border-box;" +
      "  display: block;" +
      "  overflow: hidden;" +
      "  position: relative;" +
      "}" +
      ".vcard-backgrounds {" +
      "  position: absolute;" +
      "  inset: 0;" +
      "  z-index: 0;" +
      "  pointer-events: none;" +
      "}" +
      ".vcard-bg-svg," +
      ".vcard-bg-canvas," +
      ".vcard-bg-overlay {" +
      "  position: absolute;" +
      "  inset: 0;" +
      "  width: 100%;" +
      "  height: 100%;" +
      "}" +
      ".vcard-bg-svg { opacity: 0.9; }" +
      ".vcard-bg-canvas { opacity: 0.65; }" +
      ".vcard-bg-overlay {" +
      "  background: linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.34) 48%, rgba(248, 250, 252, 0.46) 100%);" +
      "}" +
      ".vcard-content {" +
      "  position: relative;" +
      "  z-index: 1;" +
      "  min-height: 100%;" +
      "  height: 100%;" +
      "  display: flex;" +
      "  flex-direction: column;" +
      "  gap: clamp(10px, 1.8vh, 16px);" +
      "}" +
      ".vcard-header { text-align: center; }" +
      ".vcard-brand {" +
      "  margin: 0;" +
      '  font-family: "Engagement", cursive;' +
      "  font-size: clamp(4.2rem, 13.6vw, 6.3rem);" +
      "  line-height: 0.88;" +
      "  font-weight: 400;" +
      "  color: #0f172a;" +
      "  text-shadow: 0 2px 8px rgba(148, 163, 184, 0.22);" +
      "}" +
      ".vcard-tagline {" +
      "  margin: clamp(12px, 1.8vh, 18px) 0 0;" +
      "  font-weight: 800;" +
      "  font-size: clamp(0.98rem, 3.5vw, 1.18rem);" +
      "  letter-spacing: 0.08em;" +
      "  text-transform: uppercase;" +
      "  color: #0e7490;" +
      "}" +
      ".vcard-typewriter {" +
      "  margin: clamp(4px, 0.7vh, 8px) 0 0;" +
      "  min-height: 1.5em;" +
      "  font-size: clamp(0.98rem, 3.5vw, 1.18rem);" +
      "  font-weight: 800;" +
      "  letter-spacing: 0.08em;" +
      "  text-transform: uppercase;" +
      "  color: #0e7490;" +
      "}" +
      ".vcard-caret {" +
      "  margin-left: 2px;" +
      "  animation: moriarty-vcard-blink 0.9s steps(1, end) infinite;" +
      "}" +
      "@keyframes moriarty-vcard-blink {" +
      "  50% { opacity: 0; }" +
      "}" +
      ".vcard-logo-wrap {" +
      "  flex: 1;" +
      "  min-height: 0;" +
      "  display: flex;" +
      "  align-items: center;" +
      "  justify-content: center;" +
      "}" +
      ".vcard-logo {" +
      "  width: clamp(170px, 70vw, 318px);" +
      "  max-width: 100%;" +
      "  max-height: clamp(130px, 35vh, 320px);" +
      "  object-fit: contain;" +
      "  filter:" +
      "    drop-shadow(0 16px 26px rgba(14, 116, 144, 0.22))" +
      "    drop-shadow(0 6px 12px rgba(15, 23, 42, 0.16));" +
      "}" +
      ".vcard-actions {" +
      "  display: grid;" +
      "  justify-items: center;" +
      "  gap: clamp(10px, 1.4vh, 14px);" +
      "  width: 100%;" +
      "  align-self: end;" +
      "  margin-top: auto;" +
      "  padding-bottom: clamp(2px, 0.5vh, 8px);" +
      "}" +
      ".vcard-save-contact {" +
      "  display: inline-flex;" +
      "  align-items: center;" +
      "  justify-content: center;" +
      "  gap: 8px;" +
      "  min-height: clamp(42px, 5.6vh, 50px);" +
      "  padding: 0 clamp(14px, 4vw, 20px);" +
      "  border-radius: 999px;" +
      "  border: 1px solid rgba(8, 145, 178, 0.24);" +
      "  background: rgba(255, 255, 255, 0.92);" +
      "  color: #0f172a;" +
      "  font-size: clamp(0.9rem, 3.6vw, 1.08rem);" +
      "  font-weight: 700;" +
      "  text-decoration: none;" +
      "  box-shadow: 0 8px 18px rgba(14, 116, 144, 0.12);" +
      "  cursor: pointer;" +
      "  border-style: solid;" +
      "}" +
      ".vcard-quick-grid {" +
      "  display: grid;" +
      "  grid-template-columns: repeat(4, minmax(0, 1fr));" +
      "  gap: clamp(10px, 2.5vw, 14px);" +
      "}" +
      ".vcard-quick-button {" +
      "  width: clamp(44px, 11vw, 54px);" +
      "  height: clamp(44px, 11vw, 54px);" +
      "  border-radius: 999px;" +
      "  border: 1px solid rgba(8, 145, 178, 0.26);" +
      "  background: rgba(255, 255, 255, 0.95);" +
      "  color: #0e7490;" +
      "  display: grid;" +
      "  place-items: center;" +
      "  text-decoration: none;" +
      "  font-size: clamp(1rem, 4.8vw, 1.25rem);" +
      "  box-shadow: 0 8px 16px rgba(14, 116, 144, 0.12);" +
      "}" +
      ".vcard-fa-icon { height: 1em; width: auto; display: block; }" +
      ".vcard-save-contact .vcard-fa-icon--wide { width: 1.125em; }"
    );
  }

  // ==========================================================================
  // 9) Montage du Shadow DOM + HTML carte
  // Purpose: injecter police Google, styles, SVG trianglify, canvas, actions.
  // Key variables: host #moriarty-vcard-widget-host attachShadow mode open.
  // Logic flow: créer noeuds -> brancher particules / typewriter / handlers.
  // ==========================================================================
  var host = document.createElement("div");
  host.id = "moriarty-vcard-widget-host";
  // ==========================================================================
  // Host plein écran + pointer-events dynamiques
  // Purpose: garantir la zone cliquable du backdrop (éviter host 0×0 qui ignore les hits).
  // Key variables: fixed inset 100%, pointer-events none tant que la modale est fermée.
  // Logic flow: fermé -> clic traverse vers la page ; ouvert -> capture overlay + carte.
  // ==========================================================================
  host.style.position = "fixed";
  host.style.left = "0";
  host.style.top = "0";
  host.style.right = "0";
  host.style.bottom = "0";
  host.style.width = "100%";
  host.style.height = "100%";
  host.style.margin = "0";
  host.style.padding = "0";
  host.style.border = "0";
  host.style.background = "transparent";
  host.style.overflow = "visible";
  host.style.zIndex = "2147483647";
  host.style.pointerEvents = "none";

  var shadow = host.attachShadow({ mode: "open" });

  var fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Engagement&family=Montserrat:wght@500;600;700;800&display=swap";

  var styleEl = document.createElement("style");
  styleEl.textContent = buildWidgetCss();

  var digitsOnlyPhone = vcardConfig.phoneNumber.replace(/\s+/g, "");

  var layerHtml =
    '<div class="moriarty-vcard-layer" id="moriarty-vcard-layer" aria-hidden="true">' +
    '  <div class="moriarty-vcard-backdrop" id="moriarty-vcard-backdrop"></div>' +
    '  <div class="moriarty-vcard-center-wrap">' +
    '    <div class="moriarty-vcard-dialog" role="dialog" aria-modal="true" aria-labelledby="moriarty-vcard-brand" id="moriarty-vcard-dialog">' +
    '      <button type="button" class="moriarty-vcard-close" id="moriarty-vcard-close" aria-label="Fermer la carte de contact Moriarty">&times;</button>' +
    '      <section class="vcard-shell">' +
    '        <div class="vcard-backgrounds" aria-hidden="true">' +
    buildTrianglifySvgMarkup() +
    '          <canvas class="vcard-bg-canvas" id="moriarty-vcard-particles" aria-hidden="true"></canvas>' +
    '          <div class="vcard-bg-overlay"></div>' +
    "        </div>" +
    '        <div class="vcard-content">' +
    '          <header class="vcard-header">' +
    '            <h1 class="vcard-brand" id="moriarty-vcard-brand">' +
    vcardConfig.brandName +
    "</h1>" +
    '            <p class="vcard-tagline">' +
    vcardConfig.tagline +
    "</p>" +
    '            <p class="vcard-typewriter" aria-live="polite">' +
    '              <span id="moriarty-vcard-typewriter"></span>' +
    '              <span class="vcard-caret" aria-hidden="true">|</span>' +
    "            </p>" +
    "          </header>" +
    '          <div class="vcard-logo-wrap">' +
    '            <img class="vcard-logo" src="' +
    vcardConfig.logoSrc +
    '" alt="' +
    vcardConfig.logoAlt +
    '" />' +
    "          </div>" +
    '          <div class="vcard-actions">' +
    '            <button type="button" class="vcard-save-contact" id="moriarty-vcard-download">' +
    iconSvgMarkup("addressCard", "vcard-fa-icon--wide") +
    "              <span>Ajouter aux contacts</span>" +
    "            </button>" +
    '            <div class="vcard-quick-grid">' +
    '              <a class="vcard-quick-button" href="tel:' +
    digitsOnlyPhone +
    '" aria-label="Appeler" title="Appeler">' +
    iconSvgMarkup("phone") +
    "</a>" +
    '              <a class="vcard-quick-button" href="sms:' +
    digitsOnlyPhone +
    '" aria-label="SMS" title="SMS">' +
    iconSvgMarkup("commentSms") +
    "</a>" +
    '              <a class="vcard-quick-button" href="mailto:' +
    vcardConfig.email +
    '" aria-label="Email" title="Email">' +
    iconSvgMarkup("envelope") +
    "</a>" +
    '              <a class="vcard-quick-button" href="' +
    vcardConfig.websiteUrl +
    '" target="_blank" rel="noopener noreferrer" aria-label="Site web" title="Site web">' +
    iconSvgMarkup("globe") +
    "</a>" +
    "            </div>" +
    "          </div>" +
    "        </div>" +
    "      </section>" +
    "    </div>" +
    "  </div>" +
    "</div>";

  shadow.appendChild(fontLink);
  shadow.appendChild(styleEl);

  var templateWrap = document.createElement("div");
  templateWrap.innerHTML = layerHtml;
  shadow.appendChild(templateWrap.firstElementChild);

  document.documentElement.appendChild(host);

  var layer = shadow.getElementById("moriarty-vcard-layer");
  var backdrop = shadow.getElementById("moriarty-vcard-backdrop");
  var btnClose = shadow.getElementById("moriarty-vcard-close");
  var dialogEl = shadow.getElementById("moriarty-vcard-dialog");
  var typewriterEl = shadow.getElementById("moriarty-vcard-typewriter");
  var canvasParticles = shadow.getElementById("moriarty-vcard-particles");
  var btnDownload = shadow.getElementById("moriarty-vcard-download");

  var isOpen = false;
  var bodyScrollY = 0;
  var typewriterTimer = null;
  var twWordIndex = 0;
  var twText = "";
  var twDeleting = false;

  function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // ==========================================================================
  // 10) Machine à écrire (équivalent useTypewriter de VCardPage.jsx)
  // Purpose: animer les qualificatifs dans la carte comme sur la page dédiée.
  // Key variables: mot courant, mode effacement, timeouts aléatoires.
  // Logic flow: taper -> pause -> effacer -> mot suivant en boucle.
  // ==========================================================================
  function stepTypewriter() {
    if (!isOpen || !typewriterEl) return;

    var words = rotatingWords;

    // ==========================================================================
    // Passage au mot suivant après effacement complet (aligné sur useEffect React)
    // Purpose: quand twText est vide en mode suppression, incrémenter l’index mot.
    // Key variables: twWordIndex, twDeleting repasse à false.
    // Logic flow: mot suivant -> re-calcul currentWord avant frappe / pause tenue.
    // ==========================================================================
    if (twDeleting && twText.length === 0) {
      twDeleting = false;
      twWordIndex = (twWordIndex + 1) % words.length;
    }

    var currentWord = words[twWordIndex % words.length];
    var isComplete = twText === currentWord;

    var typingDelayMinMs = 70;
    var typingDelayMaxMs = 140;
    var deletingDelayMinMs = 35;
    var deletingDelayMaxMs = 75;
    var holdBeforeDeleteMs = 1000;

    function schedule(nextFn, delay) {
      typewriterTimer = window.setTimeout(nextFn, delay);
    }

    if (!twDeleting && isComplete) {
      schedule(function holdDone() {
        twDeleting = true;
        stepTypewriter();
      }, holdBeforeDeleteMs);
      return;
    }

    if (!twDeleting) {
      twText = currentWord.slice(0, twText.length + 1);
    } else {
      twText = currentWord.slice(0, twText.length - 1);
    }

    typewriterEl.textContent = twText;

    var delay = twDeleting
      ? randomDelay(deletingDelayMinMs, deletingDelayMaxMs)
      : randomDelay(typingDelayMinMs, typingDelayMaxMs);

    schedule(stepTypewriter, delay);
  }

  function clearTypewriterTimers() {
    if (typewriterTimer) {
      window.clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }
  }

  function resetTypewriter() {
    clearTypewriterTimers();
    twWordIndex = 0;
    twText = "";
    twDeleting = false;
    if (typewriterEl) typewriterEl.textContent = "";
  }

  // ==========================================================================
  // 11) Canvas particules (port de VCardParticleBackground)
  // Purpose: réseau de points + segments comme sur la vCard pleine page.
  // Key variables: tableau particles, distance lien, fps plafonné.
  // Logic flow: resize canvas -> animationFrame -> clear -> lignes -> points.
  // ==========================================================================
  var particleRaf = 0;

  function stopParticles() {
    if (particleRaf) {
      window.cancelAnimationFrame(particleRaf);
      particleRaf = 0;
    }
  }

  function startParticles() {
    var canvas = canvasParticles;
    if (!canvas) return;

    var context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    var particles = [];
    var width = 0;
    var height = 0;
    var dpr = 1;
    var lastFrameTime = 0;
    var isPageVisible = !document.hidden;
    var frameInterval = 1000 / particleSettings.targetFps;

    function createParticles() {
      var densityRatio = Math.max(
        0.45,
        Math.min(1.25, (width * height) / (particleSettings.densityArea * 1000))
      );
      var count = Math.round(particleSettings.count * densityRatio);
      particles = [];
      var i;
      for (i = 0; i < count; i += 1) {
        var angle = Math.random() * Math.PI * 2;
        var velocity = (particleSettings.speed / 20) * (0.45 + Math.random() * 0.9);
        var radius = particleSettings.sizeRandom
          ? 0.7 + Math.random() * particleSettings.size
          : particleSettings.size;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          baseR: radius,
        });
      }
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, particleSettings.maxDpr);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles();
    }

    function draw(time) {
      particleRaf = window.requestAnimationFrame(draw);
      if (!isOpen) return;
      if (!isPageVisible || time - lastFrameTime < frameInterval) return;
      lastFrameTime = time;

      context.clearRect(0, 0, width, height);

      var i;
      var j;
      var particle;
      var other;
      for (i = 0; i < particles.length; i += 1) {
        particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      }

      for (i = 0; i < particles.length; i += 1) {
        particle = particles[i];
        for (j = i + 1; j < particles.length; j += 1) {
          other = particles[j];
          var dx = particle.x - other.x;
          var dy = particle.y - other.y;
          var distanceSquared = dx * dx + dy * dy;
          var maxDistanceSquared =
            particleSettings.linkDistance * particleSettings.linkDistance;
          if (distanceSquared < maxDistanceSquared) {
            var distance = Math.sqrt(distanceSquared);
            var opacity =
              (1 - distance / particleSettings.linkDistance) *
              particleSettings.lineOpacity;
            context.strokeStyle =
              "rgba(" + particleSettings.lineColor + ", " + opacity + ")";
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      }

      context.fillStyle =
        "rgba(" +
        particleSettings.particleColor +
        ", " +
        particleSettings.particleOpacity +
        ")";
      for (i = 0; i < particles.length; i += 1) {
        particle = particles[i];
        context.beginPath();
        context.arc(particle.x, particle.y, particle.baseR, 0, Math.PI * 2);
        context.fill();
      }
    }

    function onVisibilityChange() {
      isPageVisible = !document.hidden;
    }

    stopParticles();
    resize();
    particleRaf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return function cleanupParticles() {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      stopParticles();
    };
  }

  var cleanupParticlesFn = null;

  // ==========================================================================
  // 12) Verrouillage scroll document (body fixe pendant dialogue ouvert)
  // Purpose: conformité UX modale et lecture Accessibilité demandée.
  // Key variables: position scroll sauvegardée pour restauration au pixel près.
  // Logic flow: ouverture -> fixed + top négatif -> fermeture -> scroll restore.
  // ==========================================================================
  function lockBodyScroll() {
    bodyScrollY = window.scrollY || window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = "-" + bodyScrollY + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }

  function unlockBodyScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, bodyScrollY);
  }

  function focusCloseButton() {
    window.setTimeout(function () {
      if (btnClose) btnClose.focus();
    }, 0);
  }

  function openWidget() {
    if (isOpen) return;
    isOpen = true;
    host.style.pointerEvents = "auto";
    layer.classList.add("is-open");
    layer.setAttribute("aria-hidden", "false");

    lockBodyScroll();

    resetTypewriter();
    stepTypewriter();

    if (cleanupParticlesFn) {
      cleanupParticlesFn();
      cleanupParticlesFn = null;
    }
    cleanupParticlesFn = startParticles();

    focusCloseButton();
  }

  function closeWidget() {
    if (!isOpen) return;
    isOpen = false;
    layer.classList.remove("is-open");
    layer.setAttribute("aria-hidden", "true");
    host.style.pointerEvents = "none";

    clearTypewriterTimers();
    resetTypewriter();

    if (cleanupParticlesFn) {
      cleanupParticlesFn();
      cleanupParticlesFn = null;
    } else {
      stopParticles();
    }

    unlockBodyScroll();
  }

  // ==========================================================================
  // 13) Téléchargement .vcf (Blob — fonctionne sur les domaines clients)
  // Purpose: même contenu que le fichier statique sans exposer le host au CORS GET.
  // Key variables: Blob text/vcard, lien temporaire, revokeObjectURL.
  // Logic flow: clic bouton -> création URL -> click programmatique -> nettoyage.
  // ==========================================================================
  function triggerVcfDownload(ev) {
    if (ev) ev.preventDefault();
    try {
      var blob = new Blob([VCF_FILE_BODY], {
        type: "text/vcard;charset=utf-8",
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = vcardConfig.vcfDownloadName;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      window.open(BASE_SITE + "/vcard/moriarty.vcf", "_blank", "noopener,noreferrer");
    }
  }

  if (btnDownload) {
    btnDownload.addEventListener("click", triggerVcfDownload);
  }

  if (backdrop) {
    backdrop.addEventListener("click", function onBackdropClick() {
      closeWidget();
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", function onCloseClick() {
      closeWidget();
    });
  }

  document.addEventListener(
    "keydown",
    function onDocKey(ev) {
      if (ev.key === "Escape" && isOpen) {
        ev.preventDefault();
        closeWidget();
      }
    },
    true
  );

  document.addEventListener(
    "click",
    function onTriggerClick(ev) {
      var trigger = ev.target && ev.target.closest && ev.target.closest("[data-moriarty-vcard]");
      if (!trigger) return;
      ev.preventDefault();
      openWidget();
    },
    true
  );

  window.MoriartyVcardWidget = {
    open: openWidget,
    close: closeWidget,
  };
})();
