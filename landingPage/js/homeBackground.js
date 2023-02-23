function findActiveBg(parent) {
    let svg = parent.querySelectorAll("svg");
    for (let i = 0; i < svg.length; i++) {
        if (getComputedStyle(svg[i]).display != "none") {
            return svg[i];
        }
    }
}
function computeLinesProps() {
    let home = document.querySelector(".home_background");
    home.classList.add("transition_disabled");
    let path = document.querySelector(".home_background").querySelectorAll("g.lines path");
    path.forEach((el) => {
        let length = el.getTotalLength();
        el.style.strokeDasharray = length + "px";
        el.style.strokeDashoffset = length + "px";
        el.style.transitionDuration = (length / 800 * 6) + "s";
    });
    home.classList.remove("transition_disabled");
    // home.getBoundingClientRect();
}
function homeBackgroundAppearance() {
    let svg = findActiveBg(document.querySelector(".home_background"));
    // svg.getBoundingClientRect();
    // let triggerLayout = svg.scrollHeight;
    svg.classList.add("full");
}
function addTransitionToSvg() {
    let svgs = document.querySelectorAll(".home_background svg");
    setTimeout(function () {
        for (let i = 0; i < svgs.length; i++) {
            svgs[i].classList.add("full");
        }
    }, 3000);
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
        let length = el.getTotalLength();
        let sdo = Math.floor(length * 100) / 100;
        let td = Math.floor((length / 800 * 6) * 100) / 100;
        el.style.transitionDuration = td * 2 + "s";
        el.style.setProperty("transition-duration", td * 2 + "s");
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
function isMobile() {
    return window.innerWidth <= 600;
}
function homeBackgroundMovements() {
    let home = document.querySelector(".home_background");
    let intervalId = setInterval(function () {
        if (isVisible(home)) {
            moveLines(findActiveBg(home));
        }
    }, 2000);
}
computeLinesProps();
homeBackgroundAppearance();
addTransitionToSvg();
homeBackgroundMovements();
//# sourceMappingURL=homeBackground.js.map