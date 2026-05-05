// ==========================================================================
// 1) SLUGIFY HELPER
// Purpose: Transformer un label utilisateur en id d'ancre URL-friendly.
// Key variables: normalisation unicode, suppression accents, séparateurs.
// Logic flow: lowerCase -> normalize -> strip accents -> kebab-case.
// ==========================================================================
export function slugify(label) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
