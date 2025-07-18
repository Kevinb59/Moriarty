const words = [
  'pro à prix malin',
  'à votre image',
  'sur-mesure',
  'personnel',
  'responsive',
  'clé en main',
  'paramétrable',
  'optimisé',
  'accessible',
  'sécurisé',
  'adaptatif',
  'performant',
  'évolutif',
  'intuitif',
  'ergonomique'
]

const element = document.getElementById('typewriter-text')
let wordIndex = 0
let letterIndex = 0
let typing = true

function typeWriter() {
  const currentWord = words[wordIndex]

  if (typing) {
    element.textContent = currentWord.substring(0, letterIndex++) || '\u00A0'
    if (letterIndex > currentWord.length) {
      typing = false
      setTimeout(typeWriter, 1000)
      return
    }
  } else {
    element.textContent = currentWord.substring(0, letterIndex--) || '\u00A0'
    if (letterIndex < 0) {
      typing = true
      wordIndex = (wordIndex + 1) % words.length
    }
  }

  setTimeout(typeWriter, typing ? 80 : 40)
}

typeWriter()
