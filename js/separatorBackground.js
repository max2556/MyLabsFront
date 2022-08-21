const separator = document.querySelector('div.separator')
const canvas = separator.querySelector('canvas.background')
const ctx = canvas.getContext('2d')



class Line {
  fs = 20 //font-size
  length = 30 //string max length
  X = 0 //X coord
  Y = 0 //Y coord
  string = '' //Text content
  
  bias = 0;
  deltaBias = 0;

  constructor(x_pos, y_pos) {
    this.X = x_pos
    this.Y = y_pos
    
    this.length = canvas.height*5/this.fs;

    for (let i = 0; i < this.length; i++) {
      let newChar = Math.random() < 0.5 ? '0' : '1'
      this.string = this.string.concat(newChar)
    }

    this.deltaBias = Math.round(Math.random()*7)/1000 + 0.001
  }

  update() {
    this.bias += this.deltaBias;

    if (this.bias > 0.7) replaceLine(this)
  }

  draw(ctx) {
    ctx.font = `${this.fs}px sans-serif`
    let width = ctx.measureText(this.string).width * 2

    ctx.shadowColor = '#37feff'
    ctx.shadowBlur = 1;
    ctx.fillStyle = getGradient(width, this.fs, this.bias)
    ctx.fillText(this.string, this.Y, -this.X)
  }
}

const lines = []
const lineCount = 50;


;(function init() {
  canvas.width = separator.clientWidth
  canvas.height = separator.clientHeight
  ctx.rotate(Math.PI / 2)


  getLines(lineCount)

  const deltaTime = 50 //ms
  setInterval(updateAllLines, deltaTime)
  setInterval(drawAllLines, deltaTime)
})()

function getGradient(w, h, bias) {
  let gradient = ctx.createLinearGradient(0, 0, w, h)

  gradient.addColorStop(0+bias, 'rgba(168,222,255,0.1)')
  gradient.addColorStop(0.05+bias, 'rgba(215,253,255,1)')
  gradient.addColorStop(0.1+bias, 'rgba(168,222,255,0.1)')

  return gradient
}

function updateAllLines() {
  for (let line of lines) {
    line.update()
  }
}

function drawAllLines() {
  clearCanvas()

  for (let line of lines) {
    line.draw(ctx)
  }
}

function clearCanvas() {
  ctx.fillStyle = '#060137'
  ctx.fillRect(0, 0, canvas.height, -canvas.width)
}

function replaceLine(line) {
  let pos = lines.findIndex((element)=>{
    return element === line
  })
  lines.splice(pos, 1)
  getLine()
}

function getLine() {
  let newX = Math.round(Math.random() * canvas.width)
  let newY = -(1 + Math.random()*0.2)*canvas.height
  lines.push(new Line(newX, newY))
}

function getLines(number) {
  if(lines.length<number)
  setTimeout(()=>{
    getLines(number)
  }, 6.66)

  getLine();
}