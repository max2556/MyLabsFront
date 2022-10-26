const links_autoscrollable = document.querySelectorAll('.autoscrollable')
const links_header = document.querySelectorAll('header .autoscrollable')


//const homepageButton = document.querySelector('.home_wrapper .content .text a.button');

const animationLength = 800 //in ms;

const HEADER_STATE = {
  last_active: null,
  scrollTimeoutID: null,
}

const TARGET_ELEMENTS = {}
const LINKS_DICT = {}
//Автовызывающаяся функция init()
;(function init() {
  addActive(links_header[0])
  initLinks()

  document.addEventListener('wheel', (e) => {
    clearTimeout(HEADER_STATE.scrollTimeoutID)
    checkScroll()
  })
})()

/**
 * Активирует элемент el
 * @param {HTML_Element} el Элемент, которому добавляем класс active
 */
function addActive(el) {
  const activeClass = 'active'

  if (!el) return
  HEADER_STATE.last_active = el
  el.classList.add(activeClass)
}
/**
 * Снимает активацию с элемента
 * @param {HTML_Element} el элемент с которого снимается класс active
 */
function removeActive(el) {
  const activeClass = 'active'
  if (!el) return

  el.classList.remove(activeClass)
}

/**
 * Накладывает логику на каждую ссылку в header'е
 * Каждый link получает onclick callback меняющий стили ссылок и перематывающий scroll к указанному target блоку
 */
function initLinks() {
  for (let link of links_header) {
    LINKS_DICT[link.dataset.scrollto] = link
    TARGET_ELEMENTS[link.dataset.scrollto] = document.querySelector(
      '.' + link.dataset.scrollto,
    )
    link.addEventListener('click', () => {
      if (HEADER_STATE.last_active) removeActive(HEADER_STATE.last_active)
      addActive(link)
      let targetEl = TARGET_ELEMENTS[link.dataset.scrollto]
      if (!targetEl) return

      let topValue = targetEl.offsetTop
      animateScroll(topValue)
    })
  }

  for (let link of links_autoscrollable) {
    link.addEventListener('click', () => {
      if (HEADER_STATE.last_active) removeActive(HEADER_STATE.last_active)
      addActive(link)
      let targetEl = TARGET_ELEMENTS[link.dataset.scrollto]
      if (!targetEl) return

      let topValue = targetEl.offsetTop
      animateScroll(topValue)
    })
  }

 
}


/**
 * Анимированный скролл к точке value - может быть element.offsetTop или любое scrollY значение
 * @param {number} value точка к которой анимируем
 */
function animateScroll(value) {
  //Проверка на ширину экрана.
  //CONFIG лежит в slider.js
  if(window.innerWidth < CONFIG.screens.lowScreen){
    //Если экран маленький -> мгновенно переходим на нужное значение

    window.scrollTo(0, value);
    return;
  }
  
  if (HEADER_STATE.scrollTimeoutID) {
    clearTimeout(HEADER_STATE.scrollTimeoutID)
  }

  const speedMult = 6
  const EPS = 10
  const baseDeltaTime = 10

  let current = window.scrollY
  let steps = animationLength / baseDeltaTime
  let deltaY = ((value - current) / steps) * speedMult
  let baseDeltaY = deltaY

  let direction = deltaY > 0 ? 'down' : 'up'

  const go = () => {
    current += deltaY
    window.scrollTo(0, current)
    if (
      (direction === 'down' && current < value) ||
      (direction === 'up' && current > value)
    ) {
      //HEADER_STATE.scrollTimeoutID = setTimeout(go, 1000/24);
      HEADER_STATE.scrollTimeoutID = window.requestAnimationFrame(go)
    } else {
      window.scrollTo(0, value)
    }
  }
  HEADER_STATE.scrollTimeoutID = window.requestAnimationFrame(go)
}

function checkScroll() {
  let target = null
  for (let block in TARGET_ELEMENTS) {
    if (!block || !TARGET_ELEMENTS[block]) continue
    let visibility = isVisible(TARGET_ELEMENTS[block])
    if (!visibility) continue
    target = block
  }

  removeActive(HEADER_STATE.last_active)
  addActive(LINKS_DICT[target])
}

function isVisible(el) {
  let boundingRect = el.getBoundingClientRect()
  let targetPosition = {
    bottom: Math.min(boundingRect.bottom, boundingRect.bottom) + pageYOffset,
    top: Math.max(boundingRect.top, boundingRect.top) + pageYOffset,
  }
  let windowPosition = {
    top: window.pageYOffset,
    bottom: window.pageYOffset + document.documentElement.clientHeight,
  }
  return (
    targetPosition.bottom > windowPosition.top &&
    targetPosition.top < windowPosition.bottom
  )
}

function name(params) {
  
}
