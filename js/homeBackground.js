function homeBackground() {
    let svg = document.querySelector(".home_background svg");
    svg.classList.add("transition_disabled");
    let path = svg.querySelectorAll("g.lines path");
    path.forEach((el) => {
        let length = el.getTotalLength();
        el.style.strokeDasharray = length + "px";
        el.style.strokeDashoffset = length + "px";
        el.style.transitionDuration = (length / 800 * 3) + "s";
    });
    svg.classList.remove("transition_disabled");
    svg.classList.add("full");
}
homeBackground();
//# sourceMappingURL=homeBackground.js.map