/*
Пытаюсь не создать кринж
Не получается

Из идей - бить один h3 на много

Сравнивать ширину h3 с шириной блока, если больше - то создавать новый.

То что есть - ебланство
*/

;(function () {
  function text_fix() {
    const MAX_LINES = 2

    const blocks = document.querySelectorAll('.scroll-plate .blocks .block')

    for (let block of blocks) {
      const h3Elem = block.querySelector('h3')
      const styles = getComputedStyle(h3Elem)
      const letterRowCount = Math.ceil(
        h3Elem.clientWidth / parseInt(styles.fontSize),
      )

      let lines = h3Elem.clientHeight / parseInt(styles.lineHeight)
      if(lines <= MAX_LINES) return
      while (lines > MAX_LINES) {
        h3Elem.textContent = h3Elem.textContent.substring(
          0,
          h3Elem.textContent.length - 5,
        )
        lines = h3Elem.clientHeight / parseInt(styles.lineHeight)
      }

      h3Elem.textContent =
        h3Elem.textContent.substring(0, h3Elem.textContent.length - 3) + '...'
    }
  }

  function resize() {
    if (!isChangeScreen) return

    text_fix()
  }

  text_fix()
  window.addEventListener('resize', resize)
})()
