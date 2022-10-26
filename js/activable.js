/**
 * Переключает указанному элементу 'el' класс '.active'
 *
 * @param {HTML_Element} el - HTML элемент, который нужно "активировать"
 */
function toggleActive(el) {
  const activeClass = 'active'
  const parent = el.parentNode

  if(el.className.includes(activeClass)){
    el.className = el.className.replace(activeClass, '');
    el.className = el.className.trim();
  }
  else
    el.className += ' '+activeClass;

  //el.classList.toggle(activeClass)
  if (!parent) return


  const val = parent.getAttribute('hasactive')
  if (val === 'true') {
    parent.setAttribute('hasactive', false)
  } else {
    parent.setAttribute('hasactive', true)
  }
}

/**
 * Инициализирует логику "активации" элементов '.link'. При наведении на любой из '.link' вызывается toggleActive, добавляющий под заданным элементом плоский индикатор.
 */
;(function init() {
  const selector_click = '.activable-click'
  const selector_hover = '.activable-hover'

  let objects_click = document.querySelectorAll(selector_click)
  let objects_hover = document.querySelectorAll(selector_hover)

  for (let obj of objects_click) {
    obj.addEventListener('click', () => {
      toggleActive(obj)
    })
  }

  for (let obj of objects_hover) {
    obj.addEventListener('mouseover', () => {
      toggleActive(obj)
    })
    obj.addEventListener('mouseleave', () => {
      toggleActive(obj)
    })
  }
})()
