/**
 * Переключает указанному элементу 'el' класс '.active'
 *
 * @param {HTML_Element} el - HTML элемент, который нужно "активировать"
 */
function toggleActive(el) {
  const activeClass = 'active'

  el.classList.toggle(activeClass)
}

/**
 * Инициализирует логику "активации" элементов '.link'. При наведении на любой из '.link' вызывается toggleActive, добавляющий под заданным элементом плоский индикатор.
 */
function linksInit() {
  const linkSelector = '.header .link'

  const headerLinks = document.querySelectorAll(linkSelector)
  for (let link of headerLinks) {
    link.addEventListener('mouseover', () => {
      toggleActive(link)
    })
    link.addEventListener('mouseleave', () => {
      toggleActive(link)
    })
  }
}

linksInit()

/*
function init() {
    //Можно сделать общую функцию. Мб потом нужно будет накладывать active на другие элементы
    const selectors = [
        '.header .link',
    '.something else',
    '#another one selector',
]
for (let selector of selectors) {
    const selectorElements = document.querySelectorAll(selector)
    for (let element of selectorElements) {
        element.addEventListener('mouseover', () => {
            toggleActive(element)
        })
        element.addEventListener('mouseleave', () => {
            toggleActive(element)
        })
    }
}
}
*/
