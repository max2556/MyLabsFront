var backgroundSelector = '.info .how_it_works .background';
var MARGIN = 5;
var circleBias = 10;
var mountDiv = document.querySelector(backgroundSelector);
var parentEl = mountDiv.parentElement; //Ищем блок .steps
var svgEl = mountDiv.querySelector('svg'); //svg может быть не 1-м
function resizeSvg() {
    svgEl.attributes.getNamedItem('height').value = (parentEl.clientHeight -
        2 * MARGIN).toString();
}
function transformGroups() {
    var deltaY = 172;
    var groups = svgEl.querySelectorAll('g');
    for (var i = 0; i < groups.length; i++) {
        var transformation = (i % 2 == 0) ? "translate(0, ".concat(deltaY * i, ")") : "scale(-1 1) translate(-195, ".concat(deltaY * i, ")");
        groups[i].setAttribute('transform', transformation);
    }
}
//window.addEventListener('resize', resizeSvg);
resizeSvg();
transformGroups();
/*
function build(): void {
  //Ищем div с классом background
  const mountDiv: HTMLDivElement = document.querySelector(backgroundSelector)
  const parentEl = mountDiv.parentElement //Ищем блок .steps
  const svgEl: SVGElement = mountDiv.querySelector('svg') //svg может быть не 1-м

  svgEl.attributes.getNamedItem('height').value = (
    parentEl.clientHeight -
    2 * MARGIN
  ).toString()

  const svgFigures = svgEl.querySelectorAll('path')

  const figureLine: SVGPathElement = svgFigures[0] //Может быть не 0
  const figureCircle = svgFigures[1] //Может быть не 1

  const lineHeight = figureLine.getBBox().height
  const lineWidth = figureLine.getBBox().width

  const circleHeight = figureCircle.getBBox().height

  const valueOfSteps = parentEl.children.length - 2 //В .steps находятся все шаги и background. Background нужно исключить

  for (let i = 0; i < valueOfSteps; i++) {
    let another: SVGElement = cloneSVG(figureCircle)
    let move = `translate(${lineWidth * ((i + 1) % 2)},${
      (lineHeight + circleBias) * (i + 1)
    })`
    another.setAttribute('transform', move)
    svgEl.appendChild(another)
  }
}

function cloneSVG(from: SVGElement): SVGElement {
  const result = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  for (let num in from.attributes) {
    let attr = from.attributes[num]
    result.setAttribute(attr.name, attr.value)
  }
  return result
}

build()
*/ 
//# sourceMappingURL=HowWorksBackgroud.js.map