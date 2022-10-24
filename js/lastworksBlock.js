;(function () {
  function first() {
    const blocks = document.querySelectorAll('.scroll-plate .blocks .block')
    for (let block of blocks) {
      const textarea = block.querySelector('textarea')
      textarea.alt = textarea.textContent
      textarea.title = textarea.textContent
    }
  }
  function text_fix() {
    const MAX_LINES = 2
    const blocks = document.querySelectorAll('.scroll-plate .blocks .block')

    for (let block of blocks) {
      const textarea = block.querySelector('textarea')

      text_adapt(textarea)
    }
  }

  function text_adapt(textarea) {
    const delta = textarea.clientHeight / textarea.scrollHeight

    if (abs(1-delta) < 0.1) {
      textarea.textContent =
        textarea.title.substring(0, textarea.title.length * delta - 3) + '...'
      set_datadelta(textarea, textarea.clientHeight / textarea.scrollHeight)
    }
    textarea.style.lineHeight =
      parseInt(parseInt(getComputedStyle(textarea).fontSize) * 1.1) + 'px'
  }

  function is_changed_delta(textarea) {
    const EPS = 0.05
    const delta = textarea.clientHeight / textarea.scrollHeight

    return Math.abs(delta - parseFloat(get_datadelta(textarea))) >= EPS
  }

  function set_datadelta(el, delta) {
    el.setAttribute('delta', delta)
  }
  function get_datadelta(el) {
    return el.getAttribute('delta')
  }

  function resize() {
    const blocks = document.querySelectorAll('.scroll-plate .blocks .block')
    for (let block of blocks) {
      const textarea = block.querySelector('textarea')

      //if (is_changed_delta(textarea))
      text_adapt(textarea)
    }
  }

  first()
  text_fix()
  window.addEventListener('resize', resize)
})()
