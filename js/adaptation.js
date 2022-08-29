const main = document.querySelector('main')

function initHeader() {
  const header = document.querySelector('header')
  const hamburgerEl = header.querySelector('.hamburger-menu')

  hamburgerEl.addEventListener('click', () => {
    hamburgerEl.classList.toggle('active')
    main.classList.toggle('blured')
    main.classList.toggle('overflow_hidden')
    document.body.classList.toggle('overflow_hidden')
  })
}


;(function init() {
  initHeader()
})()
