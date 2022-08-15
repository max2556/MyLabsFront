var backgroundSelector = '.info .how_it_works .background';
var MARGIN = 5;
var circleBias = 10;
function build() {
    //Ищем div с классом background
    var mountDiv = document.querySelector(backgroundSelector);
    var parentEl = mountDiv.parentElement; //Ищем блок .steps
    var svgEl = mountDiv.querySelector('svg'); //svg может быть не 1-м
    svgEl.attributes.getNamedItem('height').value = (parentEl.clientHeight -
        2 * MARGIN).toString();
    var svgFigures = svgEl.querySelectorAll('path');
    var figureLine = svgFigures[0]; //Может быть не 0
    var figureCircle = svgFigures[1]; //Может быть не 1
    var lineHeight = figureLine.getBBox().height;
    var lineWidth = figureLine.getBBox().width;
    var circleHeight = figureCircle.getBBox().height;
    var valueOfSteps = parentEl.children.length - 2; //В .steps находятся все шаги и background. Background нужно исключить
    for (var i = 0; i < valueOfSteps; i++) {
        var another = cloneSVG(figureCircle);
        var move = "translate(".concat(lineWidth * ((i + 1) % 2), ",").concat((lineHeight + circleBias) * (i + 1), ")");
        another.setAttribute('transform', move);
        svgEl.appendChild(another);
    }
}
function cloneSVG(from) {
    var result = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    for (var num in from.attributes) {
        var attr = from.attributes[num];
        result.setAttribute(attr.name, attr.value);
    }
    return result;
}
build();
//# sourceMappingURL=HowWorksBackgroud.js.map