let ourskills: HTMLDivElement = document.querySelector(".our_skills")
let lines: NodeListOf<SVGPathElement> = document.querySelectorAll(".our_skills .skill_wrapper:not(:last-of-type) .skill_line path")
let skills: NodeListOf<HTMLDivElement> = document.querySelectorAll(".our_skills .skill")
let transitionDur: number = 500;
let transitionInterval: number = 1500;
let iterationInterval: number = 1000;

for (let i = 0; i < lines.length; i++) {
    lines[i].style.strokeDasharray = lines[i].getTotalLength() + "px";
    lines[i].style.strokeDashoffset = lines[i].getTotalLength() + "px";
    lines[i].style.animationDelay = i * transitionInterval + "ms";
}

function animLines(): void {
    let i = 0;
    (function setSDO() {
        let length: number = lines[i].getTotalLength();
        lines[i].style.setProperty("stroke-dashoffset", length * 2 + "px", "important");
        (function (el: SVGPathElement = lines[i]) {
            setTimeout(function () {
                el.style.setProperty("transition", "none");
                el.style.setProperty("stroke-dashoffset", length + "px")
                el.getBoundingClientRect();
                el.style.removeProperty("transition");
            }, transitionInterval)
        })();
        ++i;
        if (i < lines.length)
            setTimeout(setSDO, transitionInterval);
    })();
    setTimeout(animLines, transitionInterval * (skills.length - 1))
}

animLines();
