/*
	ZeroFour by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

;(function ($) {
  var $window = $(window),
    $body = $('body')

  //==================================================
  // Breakpoints.
  //==================================================
  breakpoints({
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: [null, '736px']
  })

  //==================================================
  // Play initial animations on page load.
  //==================================================
  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload')
    }, 100)
  })

  //==================================================
  // Dropdowns.
  //==================================================
  $('#nav > ul').dropotron({
    offsetY: -22,
    mode: 'fade',
    noOpenerFade: true,
    speed: 300,
    detach: false
  })

  //==================================================
  // Nav.
  //==================================================

  //==================================================
  // Title Bar.
  //==================================================
  $(
    '<div id="titleBar">' +
      '<a href="#navPanel" class="toggle"></a>' +
      '<span class="title">' +
      $('#logo').html() +
      '</span>' +
      '</div>'
  ).appendTo($body)

  //==================================================
  // Panel.
  //==================================================
  $('<div id="navPanel">' + '<nav>' + $('#nav').navList() + '</nav>' + '</div>')
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: 'left',
      target: $body,
      visibleClass: 'navPanel-visible'
    })
})(jQuery)

//==================================================
// Typewriter
//==================================================

const words = [
  'pro à prix malin',
  'à votre image',
  'sur-mesure',
  'personnel',
  'responsive',
  'clé en main',
  'paramétrable',
  'optimisé',
  'professionnel',
  'accessible',
  'sécurisé',
  'adaptatif',
  'performant',
  'évolutif',
  'intuitif',
  'ergonomique'
]

const element = document.getElementById('typewriter-text')
if (element) {
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
}

//==================================================
// Socials
//==================================================

const description = document.getElementById('socials-description')

document.querySelectorAll('.social-box').forEach((box) => {
  box.addEventListener('mouseenter', () => {
    const text = box.getAttribute('data-desc')
    if (text) {
      description.textContent = text
      description.classList.add('visible')
    } else {
      description.textContent = ''
      description.classList.remove('visible')
    }
  })

  box.addEventListener('mouseleave', () => {
    description.classList.remove('visible')
    // Optionnel : nettoyage du texte après animation (attendre 300ms)
    setTimeout(() => {
      if (!description.classList.contains('visible')) {
        description.textContent = ''
      }
    }, 300)
  })
})

//==================================================
// Set subject
//==================================================

function setSubject(value) {
  const select = document.querySelector('select[name="subject"]')
  if (select) {
    select.value = ''
    const option = document.createElement('option')
    option.value = value
    option.textContent = value
    option.selected = true
    option.hidden = true
    select.appendChild(option)
  }

  setTimeout(() => {
    const contact = document.getElementById('contact')
    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
  }, 100)
}

//==================================================
// Formulaire de contact - Moriarty
//==================================================

function initContactForm() {
  const form = document.getElementById('contact-form')
  const rgpd = document.getElementById('rgpd')
  const submit = form?.querySelector('button[type="submit"]')

  const GAS_URL =
    'https://script.google.com/macros/s/AKfycby0isM4w5az_HlAaumPKGDJB9kS8x3HJ27Xx_YzxvKgPPliJ91U7YTis1PtYYhno7SufQ/exec'

  if (!form || !submit || !rgpd) return

  function setBtn(text, icon) {
    submit.innerHTML = `<span class="icon solid ${icon}"></span> ${text}`
  }

  function resetBtn() {
    setTimeout(() => {
      setBtn('Envoyer', 'fa-paper-plane')
      submit.disabled = false
      submit.classList.remove('disabled')
    }, 2500)
  }

  function checkRGPD() {
    const checked = rgpd.checked
    submit.disabled = !checked
    submit.classList.toggle('disabled', !checked)
  }

  rgpd.addEventListener('change', checkRGPD)
  checkRGPD()

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = form.querySelector('#name')?.value.trim()
    const email = form.querySelector('#email')?.value.trim()
    const subject = form.querySelector('#subject')?.value.trim()
    const message = form.querySelector('#message')?.value.trim()

    if (!rgpd.checked) {
      setBtn('RGPD requis', 'fa-exclamation-triangle')
      resetBtn()
      return
    }

    if (!name || !email || !message) {
      setBtn('Champs requis', 'fa-exclamation-triangle')
      resetBtn()
      return
    }

    setBtn('Envoi en cours...', 'fa-spinner fa-spin')
    submit.disabled = true

    try {
      const params = new URLSearchParams({ name, email, subject, message })
      const res = await fetch(`${GAS_URL}?${params.toString()}`)
      const result = await res.json()

      if (result.status === 'success') {
        setBtn('Message envoyé', 'fa-check')
        form.reset()
        checkRGPD()
      } else {
        setBtn("Erreur à l'envoi", 'fa-exclamation-triangle')
      }
    } catch (err) {
      setBtn('Erreur réseau', 'fa-exclamation-triangle')
    }

    resetBtn()
  })
}

// Sécurité : on attend que tout soit chargé
window.addEventListener('load', initContactForm)
