function homeBackgroundAppearance() {
    let svg = document.querySelector(".home_background svg");
    svg.classList.add("transition_disabled");
    let path = svg.querySelectorAll("g.lines path");
    path.forEach((el) => {
        let length = el.getTotalLength();
        el.style.strokeDasharray = length + "px";
        el.style.strokeDashoffset = length + "px";
        el.style.transitionDuration = (length / 800 * 6) + "s";
    });
    svg.classList.remove("transition_disabled");
    svg.classList.add("full");
}
function moveLines(svg) {
    let linesToMove = 10;
    let lines = svg.querySelectorAll("g.lines path");
    for (let i = 0; i < linesToMove; i++) {
        let el = lines[Math.floor(Math.random() * lines.length)];
        while (el.getAttribute("busy") == "1") {
            el = lines[Math.floor(Math.random() * lines.length)];
        }
        el.setAttribute("busy", "1");
        let sdo = Number(el.style.strokeDashoffset.slice(0, -2));
        let td = Number(el.style.transitionDuration.slice(0, -1));
        el.style.transitionDuration = td * 2 + "s";
        el.style.setProperty("stroke-dashoffset", sdo * 2 + "px", "important");
        setTimeout(function () {
            el.classList.add("transition_disabled");
            el.style.setProperty("stroke-dashoffset", sdo + "px");
            el.style.transitionDuration = td + "s";
            var triggerLayout = el.scrollHeight;
            el.classList.remove("transition_disabled");
            el.setAttribute("busy", "0");
        }, td * 2 * 1000);
    }
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
function homeBackgroundMovements() {
    let svg = document.querySelector(".home_background svg");
    let home = document.querySelector(".home_background");
    let intervalId = setInterval(function () {
        if (isVisible(home)) {
            moveLines(svg);
        }
    }, 2000);
}
homeBackgroundAppearance();
homeBackgroundMovements();
//# sourceMappingURL=homeBackground.js.map