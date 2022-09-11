function initHeader() {
  const header = document.querySelector('header')
  const hamburgerEl = header.querySelector('.hamburger-menu')
  const main = document.querySelector('main')
  const footer = document.querySelector('footer')
  const prevent = header.querySelector('.prevent');

  hamburgerEl.addEventListener('click', () => {
    hamburgerEl.classList.toggle('active')
    main.classList.toggle('blured')
    main.classList.toggle('overflow_hidden')
    footer.classList.toggle('blured')
    
    prevent.classList.toggle('active');

    document.body.classList.toggle('overflow_hidden')
  })
}

;(function init() {
  initHeader()
})()
