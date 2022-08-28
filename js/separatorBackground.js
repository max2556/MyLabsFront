const separator = document.querySelector('div.separator')
const canvas = separator.querySelector('canvas.background')
let ctx = canvas.getContext('2d')
const SEPARATOR_STATE = {
  lines: [],
  //lines_count меняется в зависимости от размера экрана
  //маленький экран - 15
  //средний - 20
  //десктоп - 30
  lines_count: (() => {
    const small_screen = 15
    const medium_screen = 20
    const large_screen = 30

    if (window.innerWidth < 600) return small_screen
    if (window.innerWidth < 1100) return medium_screen
    return large_screen
  })(),
  isRunning: false,
  prevWidth: 0,
}

class Line {
  fs = 20 //font-size
  length = 30 //string max length
  X = 0 //X coord
  Y = 0 //Y coord
  string = '' //Text content

  bias = 0
  deltaBias = 0

  constructor(x_pos, y_pos) {
    this.X = x_pos
    this.Y = y_pos

    this.length = (canvas.height * 1.2) / this.fs

    for (let i = 0; i < this.length; i++) {
      let newChar = Math.random() < 0.5 ? '0' : '1'
      this.string = this.string.concat(newChar)
    }

    let speedRange = 2
    this.deltaBias = Math.round(Math.random() * speedRange) / 1000 + 0.001 //You can change speed by changing speedRange
    this.bias = Math.random() / 10
  }

  update() {
    this.bias += this.deltaBias

    if (this.bias > 0.7) this.bias = 0.1
  }

  draw(ctx) {
    ctx.font = `${this.fs}px sans-serif`
    let width = ctx.measureText(this.string).width * 2

    ctx.fillStyle = getGradient(width, this.fs, this.bias)
    ctx.fillText(this.string, this.Y, -this.X)
  }
}

;(function init() {
  canvas.width = separator.clientWidth
  canvas.height = separator.clientHeight * 3
  canvas.style.transform = 'translateY(-33%)'
  ctx.rotate(Math.PI / 2)

  SEPARATOR_STATE.prevWidth = separator.clientWidth

  getLines(SEPARATOR_STATE.lines_count)

  updateAllLines()
  drawAllLines()

  window.addEventListener('scroll', () => {
    if (isVisible(separator) && !SEPARATOR_STATE.isRunning) {
      updateAllLines()
      drawAllLines()
    }
  })
  window.addEventListener('resize', onresize)
})()

function getGradient(w, h, bias) {
  let gradient = ctx.createLinearGradient(0, 0, w, h)
  let delta = 0.07

  gradient.addColorStop(0 + bias, 'rgba(168,222,255,0.02)')
  gradient.addColorStop(delta + bias, 'rgba(215,253,255,1)')
  gradient.addColorStop(delta * 2 + bias, 'rgba(168,222,255,0.02)')

  return gradient
}

function updateAllLines() {
  SEPARATOR_STATE.isRunning = true
  for (let line of SEPARATOR_STATE.lines) {
    line.update()
  }
  if (isVisible(separator)) window.requestAnimationFrame(updateAllLines)
  else SEPARATOR_STATE.isRunning = false
}

function drawAllLines() {
  clearCanvas()

  ctx.shadowColor = '#37feff'
  ctx.shadowBlur = 1

  for (let line of SEPARATOR_STATE.lines) {
    line.draw(ctx)
  }
  if (isVisible(separator)) window.requestAnimationFrame(drawAllLines)
}

function clearCanvas() {
  ctx.fillStyle = '#060137'
  ctx.fillRect(0, 0, canvas.height, -canvas.width)
}

function getLine() {
  let newX = Math.round(Math.random() * canvas.width)
  let newY = Math.random() * 0.2 * canvas.height
  SEPARATOR_STATE.lines.push(new Line(newX, newY))
}

function getLines(number) {
  if (SEPARATOR_STATE.lines.length < number)
    setTimeout(() => {
      getLine()
      getLines(number)
    }, 50)
}

function onresize() {
  canvas.width = separator.clientWidth
  ctx = canvas.getContext('2d')
  ctx.rotate(Math.PI / 2)
  let currentWidth = separator.clientWidth

  if (true)
    SEPARATOR_STATE.lines.forEach((line) => {
      line.X = line.X * (currentWidth / SEPARATOR_STATE.prevWidth)
    })
  SEPARATOR_STATE.prevWidth = currentWidth
}
