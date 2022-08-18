const TYPES = {
  step: 'step',
  skip: 'skip',
}
const CONFIG = {
  skip: {
    once_count: 2,
  },
}

const CURRENT_TYPE = TYPES.skip

const STATE = {
  last_clicked: null,
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
}

function prepareSkip() {
  const slides = Math.ceil(blocks.length / CONFIG.skip.once_count)
  const callback = skip

  const buttons = generateButtons(slides)

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    button.addEventListener('click', () => {
      callback(button.id)
      if (STATE.last_clicked) STATE.last_clicked.classList.remove('active')
      STATE.last_clicked = button
      button.classList.add('active')
    })
  }
}

function generateButtons(count) {
  const parent = document.querySelector('.scroll-interface')
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
