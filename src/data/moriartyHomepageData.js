import {
  particleSettings,
  trianglifyConfig
} from '../config/backgroundEffectsConfig.js'

// ==========================================================================
// 1) HOMEPAGE DATA SOURCE
// Purpose: Centraliser toutes les données statiques de la homepage.
// Key variables: contenus métiers, cartes, FAQ, logos, configurations UI.
// Logic flow: exports nommés réutilisés par la page et les sections.
// ==========================================================================
export const brandLogoSrc = '/media/Logo.webp'

export const targetProfiles = [
  'Particuliers',
  'Entrepreneurs',
  'Commerçants',
  'Artisans',
  'Créateurs',
  'Indépendants',
  'Associations',
  'Porteurs de projet'
]

export const packs = [
  // ==========================================================================
  // Pack Vitrine
  // Purpose: Site de présentation ; pastille « Site vitrine », titre court Vitrine.
  // Key variables: features listées (pages, responsive, contact, emails, logo).
  // Logic flow: inchangé ; badge Économique conservé.
  // ==========================================================================
  {
    name: 'Vitrine',
    tag: 'Site vitrine',
    price: 'à partir de 19€/mois',
    desc: 'Un site clair, rapide et élégant pour présenter votre activité, vos services, vos coordonnées et inspirer confiance dès la première visite.',
    icon: 'desktop',
    features: [
      "Jusqu'à 5 pages",
      'Design responsive',
      'Formulaire de contact',
      'Emails professionnels',
      'Logo/Emblème inclus'
    ],
    badge: 'Économique'
  },
  // ==========================================================================
  // Pack Évolutif
  // Purpose: Site à contenus paramétrables ; pastille « Site évolutif ».
  // Key variables: highlight + badge Populaire inchangés.
  // Logic flow: contenu aligné sur le texte éditorial fourni.
  // ==========================================================================
  {
    name: 'Évolutif',
    tag: 'Site évolutif',
    price: 'à partir de 49€/mois',
    desc: 'Un site pensé pour grandir avec votre activité, avec des contenus que vous pouvez modifier ou faire évoluer plus facilement.',
    icon: 'sliders',
    features: [
      'Pages paramétrables',
      'Galeries et contenus modifiables',
      'Interface simple',
      'Accompagnement à la prise en main'
    ],
    badge: 'Populaire',
    highlight: true
  },
  // ==========================================================================
  // Pack Planning (ligne « Réservation en ligne »)
  // Purpose: Réservations, disponibilités, sync plateformes.
  // Key variables: 64€/mois, icône calendrier, 5 puces.
  // Logic flow: après Évolutif, avant e-commerce.
  // ==========================================================================
  {
    name: 'Planning',
    tag: 'Réservation en ligne',
    price: 'à partir de 64€/mois',
    desc: 'Une solution pour recevoir des demandes de réservation, proposer des créneaux disponibles et automatiser les confirmations.',
    icon: 'calendar',
    features: [
      'Gestion de vos prestations, lieux ou ressources réservables',
      'Formulaire adapté',
      'Gestion des disponibilités',
      'Emails automatiques',
      'Synchronisation Booking/Airbnb'
    ]
  },
  // ==========================================================================
  // Pack E-commerce (ligne « Boutique en ligne »)
  // Purpose: Vente en ligne, stocks, commandes.
  // Key variables: 89€/mois, icône panier.
  // Logic flow: texte descriptif et 5 puces fournis par l’éditeur.
  // ==========================================================================
  {
    name: 'E-commerce',
    tag: 'Boutique en ligne',
    price: 'à partir de 89€/mois',
    desc: 'Une solution pour vendre vos produits en ligne avec catalogue administrable, panier, paiement sécurisé et suivi des commandes.',
    icon: 'cart',
    features: [
      'Gestion de vos produits',
      'Gestion des stocks',
      'Panier et paiement sécurisé',
      'Emails automatiques',
      'Suivi des commandes'
    ]
  },
  // ==========================================================================
  // Pack Web APP (ligne « Application métier »)
  // Purpose: Outil métier sur-mesure, vision « tout-en-un ».
  // Key variables: sur devis, 4 puces (site, dashboard, auto, package).
  // Logic flow: dernière formule du tableau.
  // ==========================================================================
  {
    name: 'Web APP',
    tag: 'Application métier',
    price: 'sur devis',
    desc: 'Une application sur-mesure pour piloter toute votre activité.',
    icon: 'codeWindow',
    features: [
      'Site web',
      'Tableau de bord',
      'Automatisations',
      'Tout-en-un'
    ]
  }
]

export const includedIdentityServices = [
  [
    'palette',
    'Logo & emblème haute résolution',
    'Des fichiers propres et exploitables pour votre site, vos documents, vos réseaux et vos futurs supports.'
  ],
  [
    'print',
    'Modèle de carte de visite',
    'Une base graphique cohérente pour créer facilement vos premières cartes de visite ou supports professionnels.'
  ],
  [
    'badge',
    'Nuancier',
    'Une palette de couleurs claire pour garder une identité homogène sur votre site, vos visuels et vos documents.'
  ]
]

export const physicalServices = [
  [
    'print',
    'Supports imprimés',
    'Flyers, dépliants, affiches, menus, cartes de visite, documents commerciaux ou supports de présentation.'
  ],
  [
    'gift',
    'Objets & produits personnalisés',
    'Textile, stickers, goodies, packaging, signalétique ou tout support proposé par Vistaprint et autres prestataires.'
  ],
  [
    'palette',
    'Maquettes prêtes à commander',
    'Préparation de visuels adaptés pour faciliter la commande auprès de l’imprimeur ou du fournisseur choisi.'
  ]
]

export const digitalServices = [
  [
    'profile',
    'Fiche bio Google',
    'Accompagnement pour revendiquer, compléter ou améliorer une fiche Google liée à une personne, comme un auteur, artiste, créateur ou professionnel indépendant.'
  ],
  [
    'map',
    'Fiche établissement Google',
    'Création ou amélioration de votre fiche Google : horaires, photos, services, adresse, zone d’intervention et lien vers votre site.'
  ],
  [
    'globe',
    'Meilleure visibilité sur Google',
    'Ajout et réglage des informations invisibles du site, comme les titres Google, descriptions de pages et données utiles pour aider Google à mieux comprendre votre activité.'
  ],
  [
    'qr',
    'QR codes pratiques',
    'QR code vers votre menu, vos avis Google, un formulaire, une réservation, un paiement, une fiche contact ou une page de liens.'
  ],
  [
    'mail',
    'Visuels prêts à utiliser',
    'Images simples pour vos réseaux sociaux, votre signature mail, vos emails au style professionnel, vos annonces d’ouverture, vos bannières ou vos messages clients.'
  ]
]

// ==========================================================================
// 2) PROJECTS SHOWCASE
// Purpose: Alimenter la section "Dernières réalisations".
// Key variables: type, name, url, desc, imageSrc, imageAlt.
// Logic flow: Chaque objet représente une carte projet affichée.
// ==========================================================================
export const projects = [
  {
    type: 'E-commerce',
    name: 'SophieD',
    url: 'sophied-nailartist.fr',
    desc: 'Portfolio, gestion complète des prestations, système de réservation complet et possibilité de paiement en ligne.',
    imageSrc: '/media/sophied.webp',
    imageAlt:
      'Aperçu du site SophieD, e-commerce avec réservation et paiement en ligne',
    gradient: 'from-sky-100 via-cyan-50 to-indigo-100',
    accent: 'text-sky-700'
  },
  {
    type: 'E-commerce',
    name: 'Calypso Bay',
    url: 'calypso-bay.com',
    desc: 'Multilingue, API Google Maps, réservation et paiement en ligne, synchronisation Booking et Airbnb, mails automatisés et chatbot d’assistance.',
    imageSrc: '/media/calypsobay.webp',
    imageAlt:
      'Aperçu du site Calypso Bay, e-commerce multilingue avec réservation',
    gradient: 'from-rose-100 via-pink-50 to-orange-100',
    accent: 'text-rose-700'
  },
  {
    type: 'Evolutif',
    name: 'Damien Verhée',
    url: 'damienverhee.fr',
    desc: 'Boutique, articles et galerie dynamique. Newsletter stylisée. Calendrier dynamique des événements. Optimisation base de données.',
    imageSrc: '/media/damienverhee.webp',
    imageAlt:
      'Aperçu du site Damien Verhée, site évolutif avec boutique et contenus dynamiques',
    gradient: 'from-emerald-100 via-teal-50 to-cyan-100',
    accent: 'text-emerald-700'
  }
]

export const clientLogos = [
  {
    name: 'RENMOB',
    subtitle: 'Débarras & nettoyage',
    type: 'Services',
    fontFamily: '"Daggersquare", "Orbitron", "Eurostile", sans-serif',
    subtitleFont: '"Montserrat", sans-serif',
    letterSpacing: '0.26em',
    subtitleSpacing: '0.16em',
    weight: 800
  },
  {
    name: 'SophieD',
    subtitle: 'Nail Artist',
    type: 'Réservation',
    // ==========================================================================
    // Typography override - marquee "Ils nous font confiance"
    // Purpose: Appliquer la police demandée pour l'identité visuelle client.
    // Key variables: fontFamily avec fallback sécurisé.
    // Logic flow: police cible en premier, puis police de secours compatible.
    // ==========================================================================
    fontFamily: '"Themysion", "Great Vibes", "Brush Script MT", cursive',
    subtitleFont: '"Montserrat", sans-serif',
    letterSpacing: '0.01em',
    subtitleSpacing: '0.22em',
    weight: 400
  },
  {
    name: 'NaviSphere',
    subtitle: 'For tesla drivers',
    type: 'SaaS',
    fontFamily: '"Tesla by Dies", "Exo 2", "Montserrat", sans-serif',
    subtitleFont: '"Montserrat", sans-serif',
    letterSpacing: '0.04em',
    subtitleSpacing: '0.16em',
    weight: 800
  },
  {
    name: 'PBDR',
    subtitle: 'Carrosserie premium',
    type: 'Automobile',
    fontFamily: '"Orbitron", "Eurostile", sans-serif',
    subtitleFont: '"Montserrat", sans-serif',
    letterSpacing: '0.18em',
    subtitleSpacing: '0.14em',
    weight: 800
  },
  // ==========================================================================
  // Marquee order tuning
  // Purpose: Éviter d'afficher deux logos consécutifs avec la même police.
  // Key variables: position de "Calypso Bay" déplacée après "NaviSphere".
  // Logic flow: conserver la même typo, ajuster uniquement l'ordre d'affichage.
  // ==========================================================================
  {
    name: 'Calypso Bay',
    subtitle: 'Villa de standing',
    type: 'Location',
    fontFamily: '"Themysion", "Great Vibes", "Brush Script MT", cursive',
    subtitleFont: '"Montserrat", sans-serif',
    letterSpacing: '0.02em',
    subtitleSpacing: '0.18em',
    weight: 700
  },
  {
    name: 'Damien VERHÉE',
    subtitle: 'Auteur',
    type: 'Auteur',
    fontFamily: '"Cinzel", Georgia, serif',
    subtitleFont: '"Cormorant Garamond", Georgia, serif',
    letterSpacing: '0.08em',
    subtitleSpacing: '0.22em',
    weight: 700
  },
  {
    name: 'Jinja Music Center',
    subtitle: 'Association caritative',
    type: 'Association caritative',
    fontFamily: '"Montserrat", Arial, sans-serif',
    subtitleFont: '"Montserrat", sans-serif',
    letterSpacing: '0.02em',
    subtitleSpacing: '0.16em',
    weight: 800,
    plainName: true
  },
  {
    name: 'Smart-Z',
    subtitle: 'Coque personnalisée',
    type: 'E-commerce',
    fontFamily: '"Forte Regular", "Forte", "Montserrat", Arial, sans-serif',
    subtitleFont: '"Montserrat", sans-serif',
    letterSpacing: '0.03em',
    subtitleSpacing: '0.14em',
    weight: 800,
    plainName: true
  }
]

export const clientSubtitleFont = '"Montserrat", Arial, sans-serif'

export const techTools = [
  {
    name: 'GitHub',
    logoSrc: 'https://cdn.simpleicons.org/github/181717',
    role: 'Code & versions'
  },
  {
    name: 'Vercel',
    logoSrc: 'https://cdn.simpleicons.org/vercel/000000',
    role: 'Mise en ligne'
  },
  {
    name: 'Cloudinary',
    logoSrc: 'https://cdn.simpleicons.org/cloudinary/3448C5',
    role: 'Images & médias'
  },
  {
    name: 'Brevo',
    logoSrc: 'https://cdn.simpleicons.org/brevo/0B996E',
    role: 'Emails'
  },
  {
    name: 'Stripe',
    logoSrc: 'https://cdn.simpleicons.org/stripe/635BFF',
    role: 'Paiements'
  },
  {
    name: 'Google',
    logoSrc: 'https://cdn.simpleicons.org/google/4285F4',
    role: 'GAS & outils'
  },
  {
    name: 'Make',
    logoSrc: 'https://cdn.simpleicons.org/make/6D00CC',
    role: 'Automatisations'
  },
  {
    name: 'Vistaprint',
    logoSrc: '/media/vistaprint.svg',
    role: 'Supports imprimés'
  }
]

export const steps = [
  [
    '01',
    'Premier contact',
    'Dites-nous très simplement ce que vous souhaiteriez.'
  ],
  [
    '02',
    'Rendez-vous',
    'Nous échangeons pour vous proposer la meilleure solution en fonction de vos besoins, vos priorités et vos contraintes.'
  ],
  [
    '03',
    'Devis',
    'Nous vous proposons une solution complète incluant votre formule et les coûts techniques éventuels.'
  ],
  [
    '04',
    'Maquette',
    'Nous vous présentons une première maquette structurelle à valider.'
  ],
  ['05', 'Construction', 'Nous donnons vie à votre projet.'],
  [
    '06',
    'Présentation',
    'Nous vous présentons le résultat et nous vous aidons à le prendre en main.'
  ],
  [
    '07',
    'Corrections',
    'Nous effectuons d’éventuelles corrections si nécessaire.'
  ],
  [
    '08',
    'Mise en ligne',
    'Une fois le projet validé, votre site est mis en ligne.'
  ],
  [
    '09',
    'Maintenance',
    'Nous assurons la maintenance de votre site et fournissons une assistance en cas de problème ou de question.'
  ],
  [
    '10',
    'Évolution',
    'Si vos besoins changent, votre site suit. Nous restons à votre écoute si vous souhaitez faire évoluer votre offre.'
  ]
]

export const timelineRows = [
  steps.slice(0, 4),
  steps.slice(4, 8),
  steps.slice(8, 10)
]

export const faqs = [
  [
    'Quelle formule choisir pour mon projet ?',
    'Les formules servent surtout de point de départ. Si vous hésitez, nous vous aidons à choisir la solution la plus adaptée selon votre activité, vos besoins et votre budget.'
  ],
  [
    'Puis-je changer de formule plus tard ?',
    'Oui. Le choix d’une formule n’est pas bloquant. Si votre activité évolue, votre site peut évoluer avec elle : nouvelles pages, nouvelles fonctionnalités, e-commerce ou application métier.'
  ],
  [
    'Y a-t-il des frais techniques en plus de l’abonnement ?',
    'Sur les petits projets, les coûts techniques sont généralement de 0€, hors nom de domaine. Si votre projet nécessite des services payants, nous privilégions les solutions adaptées et les paiements à l’usage.'
  ],
  [
    'Le nom de domaine est-il inclus ?',
    'Le nom de domaine reste un coût séparé, généralement à partir d’environ 15€ par an. Nous pouvons vous accompagner pour le choisir et nous nous chargeons de le configurer.'
  ],
  [
    'Est-ce que je garde la main sur mon site ?',
    'Oui. Vous restez propriétaire de vos contenus, de vos données et des services externes utilisés pour votre projet : textes, images, médias, base de données, paiements, emails ou autres comptes créés à votre nom. Selon la formule et les options choisies, certaines parties du site peuvent aussi être rendues modifiables par vous-même : textes, images, prestations, produits, galeries ou contenus simples.'
  ],
  [
    'Que comprend la maintenance ?',
    'La maintenance comprend le suivi technique du site, les petits ajustements nécessaires, l’assistance en cas de problème et l’accompagnement si vous avez des questions.'
  ],
  [
    'Pouvez-vous aussi créer mon logo et mes supports de communication ?',
    'Oui. La création d’un logo et d’un emblème est comprise au minimum dans l’ensemble de nos formules. Nous proposons aussi différentes options, en abonnement ou en paiement à la tâche, pour créer des maquettes prêtes à l’usage : cartes de visite, flyers, dépliants, visuels pour réseaux sociaux, QR codes ou supports à commander chez un imprimeur.'
  ],
  [
    'Pouvez-vous améliorer ma visibilité sur Google ?',
    'Oui. Nous pouvons vous aider avec votre fiche établissement Google, votre fiche bio Google, le référencement naturel (SEO), les informations invisibles du site utiles à Google, ainsi que la mise en place de publicités Google si votre projet le nécessite.'
  ],
  [
    'Suis-je engagé sur une longue durée ?',
    'La première année correspond à un forfait initial de lancement, engagé sur 12 mois. Il couvre une partie de la création, la mise en ligne, la configuration et l’accompagnement initial du projet. À partir du 13ᵉ mois, vous pouvez continuer avec un abonnement de suivi et d’évolution, résiliable avec un préavis de 30 jours, incluant selon votre formule la maintenance, l’assistance, les modifications du site et certains besoins graphiques.'
  ]
]

export { trianglifyConfig, particleSettings }
