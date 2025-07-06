fetch('assets/css/images/moriarty-logo.svg')
  .then((response) => response.text())
  .then((svgContent) => {
    document.getElementById('logo-container').innerHTML = svgContent
  })
  .catch((error) => console.error('Erreur lors du chargement du SVG :', error))

// À la fin de logo-loader.js
setTimeout(() => {
  document.querySelectorAll('#logo-container path').forEach((path) => {
    path.classList.add('filled')
  })
}, 6500) // juste après l'animation de trait
