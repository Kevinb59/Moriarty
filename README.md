# Moriarty v2

Landing page React structurée pour un workflow propre GitHub + Vercel.

## Stack

- React + Vite
- Tailwind CSS
- CSS dédié pour les animations/effets branding

## Structure

- `src/main.jsx` : point d'entrée React
- `src/App.jsx` : shell applicatif (rendu direct de la homepage)
- `src/styles/index.css` : base Tailwind
- `src/pages/MoriartyHomepage.jsx` : page principale
- `src/vcard/VCardPage.jsx` : page VCard mobile (QR code)
- `src/vcard/vcard.css` : styles dédiés VCard
- `src/data/moriartyHomepageData.js` : données statiques centralisées
- `src/config/backgroundEffectsConfig.js` : liste des paramètres des fonds triangles + particules
- `src/utils/slugify.js` : utilitaires réutilisables
- `src/styles/moriarty-homepage.css` : styles CSS dédiés (hors inline)

## Démarrage local

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## Déploiement Vercel

1. Pousser le dépôt sur GitHub.
2. Importer le repository dans Vercel.
3. Garder les réglages auto détectés Vite :
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Ajouter la variable d'environnement Vercel :
   - `GAS_URL_CONTACT` = URL de déploiement Web App Google Apps Script

## VCard (QR code)

- Entrée dédiée: `vcard.html`
- URL de production: `/vcard.html`
- Fichier contact VCF: `public/vcard/moriarty.vcf`
- Configuration rapide (nom, logo, téléphone, email): `src/vcard/VCardPage.jsx`
