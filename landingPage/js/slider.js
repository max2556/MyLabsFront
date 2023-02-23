window.addEventListener('load', () => {
  buildSliders()
})

//functions of different types of scrolling
const TYPES = {
  step: (num, slider) => {
    const blocks = slider.querySelector(".scroll-blocks");
    const deltaX = -100 / STATES[slider.id].once_count
    const movement = `translate(${num * deltaX}%,0)`
    blocks.style.transform = movement
    blocks.setAttribute('transform', movement)
  },
  skip: (num, slider) => {
    const blocks = slider.querySelector(".scroll-blocks");
    const deltaX = -100
    const movement = `translate(${num * deltaX}%,0)`
    blocks.style.transform = movement
    blocks.setAttribute('transform', movement)
  },
}
//current type of scrolling function
const CURRENT_TYPE = TYPES.step;

//configuration data. low/middle screen for adjusting
const CONFIG = {
  screens: {
    middleScreen: 1575,
    lowScreen: 800,
  },
  autoscrollInterval: 5000,
  prevScreen: window.innerWidth,
  prevTouch: null
}

//States holder for all scrollers on the page
const STATES = {};

function getStateTemplate(slider) {
  const newState = {
    //last clicked button -> need for classList.remove(last_clicked)
    last_clicked: null,

    //all buttons of scroller
    buttons: null,

    //arrow buttons of scroller
    arrows: null,

    //autoscrollID - id number of setInterval() function. Need for clearInterval()
    autoscrollID: null,

    //count of slides
    slides: 0,

    //screen size before resize
    once_count: getOnceCount(slider), //TODO: each scroller would have different 'once_count' -> rework
  }
  return newState;
}

function buildSliders() {
  const slidersHolder = document.querySelectorAll(".scroll-holder");
  for (let slider of slidersHolder) {
    slider.id = Math.floor((Math.random()*15728639)+1048576).toString(16);
    buildSlider(slider);
  }
}

function buildSlider(slider) {
  STATES[slider.id] = getStateTemplate(slider);

  buildMainButtons(slider)
  prepareArrowButtons(slider)

  STATES[slider.id].autoscrollID = setInterval(autoscroll.bind(this, slider), CONFIG.autoscrollInterval);

  window.addEventListener('resize', resizeEvent)
  slider.addEventListener('touchstart', touchEventStart)
  slider.addEventListener('touchend', touchEventEnd)
  slider.addEventListener('touchmove', touchEventMove)
}

function buildMainButtons(slider) {
  const blocks = slider.querySelectorAll('.scroll-blocks .scroll-block');

  let slides;
  let func = CURRENT_TYPE;
  switch (CURRENT_TYPE) {
    case TYPES.skip:
      slides = Math.ceil(blocks.length / STATES[slider.id].once_count)
      break
    case TYPES.step:
    default:
      slides = blocks.length - (STATES[slider.id].once_count - 1)
      break
  }

  prepare(func, slider, blocks, slides);
}

function prepare(callback, slider, blocks, slides) {
  STATES[slider.id].slides = slides;

  const buttons = generateButtons(slider ,blocks.length);
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    button.addEventListener('click', (event) => {
      callback(button.id, slider);
      if (STATES[slider.id].last_clicked) STATES[slider.id].last_clicked.classList.remove('active')
      STATES[slider.id].last_clicked = button
      button.classList.add('active')

      //Без клика - браузер считает isTrusted false
      //С кликом - true
      //Если нажатие вызвано пользователем - паузим автоскролл
      if (event.isTrusted) pauseAutoscroll(slider)
    })
    if (i >= slides) button.style.display = 'none'
  }

  STATES[slider.id].buttons = buttons
}


/**
 * Создает кнопки управления слайдером
 *
 * @param {int} count Количество кнопок
 * @returns массив кнопок
 */
function generateButtons(slider, count) {
  const parent = slider.querySelector('.buttons');
  clearChildren(parent)
  for (let i = 0; i < count; i++) {
    let newButton = document.createElement('button')
    newButton.classList.add('move')
    newButton.id = i

    parent.append(newButton)
  }

  STATES[slider.id].last_clicked = parent.children[0]
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
function prepareArrowButtons(slider) {
  const leftButton = slider.querySelector('.slider-control .move-arrow.left')
  const rightButton = slider.querySelector(
    '.slider-control .move-arrow.right',
  )

  if (!leftButton || !rightButton) {
    console.warn(
      `Could not find arrow buttons!\nMake sure that your index.html has <button> tags with .move-arrow.left and .move-arrow.right classes!`,
    )
    return
  }

  leftButton.addEventListener('click', () => {
    let currentId = STATES[slider.id].last_clicked.id
    let newId = (STATES[slider.id].slides + parseInt(currentId) - 1) % STATES[slider.id].slides
    STATES[slider.id].buttons[newId].click()

    pauseAutoscroll(slider)
  })

  rightButton.addEventListener('click', () => {
    let currentId = STATES[slider.id].last_clicked.id
    let newId = (STATES[slider.id].slides + parseInt(currentId) + 1) % STATES[slider.id].slides
    STATES[slider.id].buttons[newId].click()

    pauseAutoscroll(slider)
  })

  STATES[slider.id].arrows = { left: leftButton, right: rightButton }
}

/**
 * Функция автоскролла, вызывается в init() каждые CONFIG.autoscrollInterval милисекунд
 */
function autoscroll(slider) {
  let currentId = STATES[slider.id].last_clicked.id
  let newId = parseInt(currentId) + 1
  if (newId >= STATES[slider.id].slides) newId = 0
  STATES[slider.id].buttons[newId].click()
}

/**
 * Останавливает автоскролл
 * Возобновляет его через CONFIG.autoscrollInterval
 * @returns void
 */
function pauseAutoscroll(slider) {
  if (!STATES[slider.id].autoscrollID) return

  clearInterval(STATES[slider.id].autoscrollID)
  setTimeout(() => {
    clearInterval(STATES[slider.id].autoscrollID)
    STATES[slider.id].autoscrollID = setInterval(()=>{autoscroll(slider)}, CONFIG.autoscrollInterval)
  }, CONFIG.autoscrollInterval)
}

function resizeEvent() {
  if (!isChangeScreen()) return
  
  for(let id in STATES)
  {
    const state = STATES[id];
    const slider = document.getElementById(id);

    pauseAutoscroll(slider)
    state.once_count = getOnceCount(slider)
    buildMainButtons(slider)
    
    state.buttons[0].click()
    state.prevScreen = window.innerWidth
  }
}

//TODO: rework
function getOnceCount(slider) {
  let sizes = slider.getAttribute("sizes");
  if(!sizes){
    console.warn("No sizes on slider! Always 1");
    return 1;
  }
  sizes = JSON.parse(sizes);

  if (window.innerWidth < CONFIG.screens.lowScreen) return sizes[2]
  if (window.innerWidth < CONFIG.screens.middleScreen) return sizes[1]
  return sizes[0];
}

function isChangeScreen() {
  const current = window.innerWidth
  const prev = CONFIG.prevScreen

  const middleDeltaCurrent = current - CONFIG.screens.middleScreen
  const middleDeltaPrev = prev - CONFIG.screens.middleScreen

  const lowDeltaCurrent = current - CONFIG.screens.lowScreen
  const lowDeltaPrev = prev - CONFIG.screens.lowScreen

  return (
    middleDeltaCurrent * middleDeltaPrev < 0 ||
    lowDeltaCurrent * lowDeltaPrev < 0
  )
}

function touchEventStart(e) {
  e.stopPropagation();

  const slider = e.currentTarget;
  pauseAutoscroll(slider)
  CONFIG.prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
}

function touchEventMove() {
  //pauseAutoscroll(slider)
}

function touchEventEnd(e) {
  e.stopPropagation();

  const slider = e.currentTarget;
  const deltaX = CONFIG.prevTouch.x - e.changedTouches[0].clientX
  const isRight = deltaX > 0
  const offset = 20 //px

  if (Math.abs(deltaX) < offset) return
  if (isRight) STATES[slider.id].arrows.right.click()
  else STATES[slider.id].arrows.left.click()
}
