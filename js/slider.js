const TYPES = {
  step: 'step',
  skip: 'skip',
}
const CONFIG = {
  screens: {
    middleScreen: 1575,
    lowScreen: 800,
  },
  autoscrollInterval: 5000,
}

const CURRENT_TYPE = TYPES.step

const STATE = {
  last_clicked: null,
  buttons: null,
  autoscrollID: null,
  slides: 0,
  prevScreen: 0,
  once_count: getOnceCount(),
}

//const controlButtons = document.querySelectorAll('.scroll-interface .move')
const blocks = document.querySelectorAll('.scroll-plate .blocks .block')
const slider = document.querySelector('.scroll-plate .blocks')

function one_slide(num) {
  const deltaX = -100 / STATE.once_count
  const movement = `translate(${num * deltaX}%,0)`
  slider.style.transform = movement
  slider.setAttribute('transform', movement)
}

function skip(num) {
  const deltaX = -100
  const movement = `translate(${num * deltaX}%,0)`
  slider.style.transform = movement
  slider.setAttribute('transform', movement)
}

buildSlider()
function buildSlider() {
  buildMainButtons()
  prepareArrowButtons()
  let autoscrollID = setInterval(autoscroll, CONFIG.autoscrollInterval)
  STATE.autoscrollID = autoscrollID

  window.addEventListener('resize', resizeEvent)
}
function buildMainButtons() {
  let slides
  switch (CURRENT_TYPE) {
    case TYPES.skip:
      slides = Math.ceil(blocks.length / STATE.once_count)
      prepare(skip, slides)
      break
    case TYPES.step:
    default:
      slides = blocks.length - (STATE.once_count - 1)
      prepare(one_slide, slides)
      break
  }
}

/**
 * Подготавливает слайдер в режиме переключения фиксированного количества блоков(пропускает 2 и более)
 */
function prepare(callback, slides) {
  STATE.slides = slides

  const buttons = generateButtons(blocks.length)

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    button.addEventListener('click', (event) => {
      callback(button.id)
      if (STATE.last_clicked) STATE.last_clicked.classList.remove('active')
      STATE.last_clicked = button
      button.classList.add('active')

      //Без клика - браузер считает isTrusted false
      //С кликом - true
      //Если нажатие вызвано пользователем - паузим автоскролл
      if (event.isTrusted) pauseAutoscroll()
    })
    if (i >= slides) button.style.display = 'none'
  }

  STATE.buttons = buttons
}

/**
 * Создает кнопки управления слайдером
 *
 * @param {int} count Количество кнопок
 * @returns массив кнопок
 */
function generateButtons(count) {
  const buttonsParentSelector = '.slider-control .buttons'
  const parent = document.querySelector(buttonsParentSelector)
  clearChildren(parent)
  for (let i = 0; i < count; i++) {
    let newButton = document.createElement('button')
    newButton.classList.add('move')
    newButton.id = i

    parent.append(newButton)
  }

  STATE.last_clicked = parent.children[0]
  parent.children[0].classList.add('active')
  return parent.children
}

function clearChildren(elem) {
  while (elem.children.length > 0) {
    let child = elem.children[0]
    child.remove()
  }
}

/**
 * Задает логику для крайних кнопок - стрелок, смещающих положение на один в нужную сторону
 */
function prepareArrowButtons() {
  const leftButton = document.querySelector('.slider-control .move-arrow.left')
  const rightButton = document.querySelector(
    '.slider-control .move-arrow.right',
  )

  if (!leftButton || !rightButton) {
    console.warn(
      `Could not find arrow buttons!\nMake sure that your index.html has <button> tags with .move-arrow.left and .move-arrow.right classes!`,
    )
    return
  }

  leftButton.addEventListener('click', () => {
    let currentId = STATE.last_clicked.id
    let newId = (STATE.slides + parseInt(currentId) - 1) % STATE.slides
    STATE.buttons[newId].click()

    pauseAutoscroll()
  })

  rightButton.addEventListener('click', () => {
    let currentId = STATE.last_clicked.id
    let newId = (STATE.slides + parseInt(currentId) + 1) % STATE.slides
    STATE.buttons[newId].click()

    pauseAutoscroll()
  })
}

/**
 * Функция автоскролла, вызывается в init() каждые CONFIG.autoscrollInterval милисекунд
 */
function autoscroll() {
  let currentId = STATE.last_clicked.id
  let newId = parseInt(currentId) + 1
  if (newId >= STATE.slides) newId = 0
  STATE.buttons[newId].click()
}

/**
 * Останавливает автоскролл
 * Возобновляет его через CONFIG.autoscrollInterval
 * @returns void
 */
function pauseAutoscroll() {
  if (!STATE.autoscrollID) return

  clearInterval(STATE.autoscrollID)
  setTimeout(() => {
    clearInterval(STATE.autoscrollID)
    STATE.autoscrollID = setInterval(autoscroll, CONFIG.autoscrollInterval)
  }, CONFIG.autoscrollInterval)
}

function resizeEvent() {
  if (!isChangeScreen()) return
  pauseAutoscroll()
  STATE.once_count = getOnceCount()
  buildMainButtons()


  STATE.buttons[0].click();
  STATE.prevScreen = window.innerWidth
}

function getOnceCount() {
  if (window.innerWidth < CONFIG.screens.lowScreen) return 1
  if (window.innerWidth < CONFIG.screens.middleScreen) return 2
  return 3
}

function isChangeScreen() {
  const current = window.innerWidth
  const prev = STATE.prevScreen

  const middleDeltaCurrent = current - CONFIG.screens.middleScreen
  const middleDeltaPrev = prev - CONFIG.screens.middleScreen

  const lowDeltaCurrent = current - CONFIG.screens.lowScreen
  const lowDeltaPrev = prev - CONFIG.screens.lowScreen

  return (
    middleDeltaCurrent * middleDeltaPrev < 0 ||
    lowDeltaCurrent * lowDeltaPrev < 0
  )
}
