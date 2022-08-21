const headerEl = document.querySelector('.header')
const linksEl = headerEl.querySelector('.links')
const links = linksEl.querySelectorAll('.link')

const animationLength = 800 //in ms;

const HEADER_STATE = {
  last_active: null,
  scrollTimeoutID: null,
}

const TARGET_ELEMENTS = {}
const LINKS_DICT = {}
//Автовызывающаяся функция init()
;(function init() {
  getTargetElements()
  addActive(links[0])
  initLinks()

  document.addEventListener('wheel', (e) => {
    clearTimeout(HEADER_STATE.scrollTimeoutID)
    checkScroll()
  })
})()

function getTargetElements() {
  const blocksDiv = document.querySelector('main').children

  for (let block of blocksDiv) {
    if (!block.dataset) {
      console.log(
        `Warn! Block ${block.localName}.${block.className.replaceAll(
          ' ',
          '.',
        )} does not have 'data-' attributes!`,
      )
      continue
    }
    if (!block.dataset.move) {
      console.log(
        `Warn! Block ${block.localName}.${block.className.replaceAll(
          ' ',
          '.',
        )} does not have 'data-move' attribute!`,
      )
      continue
    }

    const moveAttr = block.dataset.move
    TARGET_ELEMENTS[moveAttr] = block
  }
}

/**
 * Активирует элемент el
 * @param {HTML_Element} el Элемент, которому добавляем класс active
 */
function addActive(el) {
  const activeClass = 'active'

  HEADER_STATE.last_active = el
  el.classList.add(activeClass)
}
/**
 * Снимает активацию с элемента
 * @param {HTML_Element} el элемент с которого снимается класс active
 */
function removeActive(el) {
  const activeClass = 'active'

  el.classList.remove(activeClass)
}

/**
 * Накладывает логику на каждую ссылку в header'е
 * Каждый link получает onclick callback меняющий стили ссылок и перематывающий scroll к указанному target блоку
 */
function initLinks() {
  for (let link of links) {
    LINKS_DICT[link.dataset.scrollto] = link
    link.addEventListener('click', () => {
      if (HEADER_STATE.last_active) removeActive(HEADER_STATE.last_active)
      addActive(link)
      let targetAttr = link.dataset.scrollto

      let targetEl = TARGET_ELEMENTS[targetAttr]
      if (!targetEl) {
        console.warn(`Can not go to ${targetAttr} block!`)
        return
      }

      let topValue = targetEl.offsetTop

      console.log(`Go to element with data-move="${targetAttr}"`)

      animateScroll(topValue)
    })
  }
}

/**
 * Анимированный скролл к точке value - может быть element.offsetTop или любое scrollY значение
 * @param {number} value точка к которой анимируем
 */
function animateScroll(value) {
  if (HEADER_STATE.scrollTimeoutID) {
    clearTimeout(HEADER_STATE.scrollTimeoutID)
  }

  const speedMult = 1
  const EPS = 10
  const baseDeltaTime = 10

  let current = window.scrollY
  let steps = animationLength / baseDeltaTime
  let deltaY = ((value - current) / steps) * speedMult
  let baseDeltaY = deltaY

  let direction = deltaY > 0 ? 'down' : 'up'

  const go = () => {
    current += deltaY
    window.scroll({
      top: current,
      left: 0,
      behavior: 'smooth',
    })
    if (
      (direction === 'down' && current < value) ||
      (direction === 'up' && current > value)
    )
      HEADER_STATE.scrollTimeoutID = setTimeout(go, baseDeltaTime)
  }
  go();
}

function checkScroll() {
  let target = null;
  for (let block in TARGET_ELEMENTS) {
    let visibility = isVisible(TARGET_ELEMENTS[block]);
    if (!visibility) continue
    target = block
  }

  removeActive(HEADER_STATE.last_active)
  addActive(LINKS_DICT[target])
}

function isVisible(el) {
  let targetPosition = {
      bottom: Math.min(el.getBoundingClientRect().bottom, el.getBoundingClientRect().bottom) + pageYOffset,
      top: Math.max(el.getBoundingClientRect().top, el.getBoundingClientRect().top) + pageYOffset
  };
  let windowPosition = {
      top: window.pageYOffset,
      bottom: window.pageYOffset + document.documentElement.clientHeight
  };
  return targetPosition.bottom > windowPosition.top &&
      targetPosition.top < windowPosition.bottom;
}
