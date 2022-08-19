const TYPES = {
  step: 'step',
  skip: 'skip',
}
const CONFIG = {
  skip: {
    once_count: 2,
  },
  autoscrollInterval: 5000,
}

const CURRENT_TYPE = TYPES.skip

const STATE = {
  last_clicked: null,
  buttons: null,
  autoscrollID: null,
}

//const controlButtons = document.querySelectorAll('.scroll-interface .move')
const blocks = document.querySelectorAll('.scroll-plate .blocks .block')
const slider = document.querySelector('.scroll-plate .blocks')

function skip(num) {
  const deltaX = -100
  const movement = `translate(${num * deltaX}%,0)`
  slider.style.transform = movement
  slider.setAttribute('transform', movement)
}

init()
function init() {
  switch (CURRENT_TYPE) {
    case TYPES.skip:
      prepareSkip()
      break
    case TYPES.step:
    default:
      //controlFunc = step
      break
  }

  prepareArrowButtons()
  let autoscrollID = setInterval(autoscroll, CONFIG.autoscrollInterval)
  STATE.autoscrollID = autoscrollID
}

/**
 * Подготавливает слайдер в режиме переключения фиксированного количества блоков(пропускает 2 и более)
 */
function prepareSkip() {
  const slides = Math.ceil(blocks.length / CONFIG.skip.once_count)
  const callback = skip

  const buttons = generateButtons(slides)

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
    let newId = (STATE.buttons.length + parseInt(currentId) - 1) % STATE.buttons.length
    STATE.buttons[newId].click()

    pauseAutoscroll();
  })

  rightButton.addEventListener('click', () => {
    let currentId = STATE.last_clicked.id
    let newId = (STATE.buttons.length + parseInt(currentId) + 1) % STATE.buttons.length
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
  if (newId >= STATE.buttons.length) newId = 0
  STATE.buttons[newId].click()
}

/**
 * Останавливает автоскролл
 * Возобновляет его через CONFIG.autoscrollInterval
 * @returns void
 */
function pauseAutoscroll() {
  if (!STATE.autoscrollID) return

  setTimeout(() => {
    clearInterval(STATE.autoscrollID)
    STATE.autoscrollID = setInterval(autoscroll, CONFIG.autoscrollInterval)
  }, CONFIG.autoscrollInterval)
}
