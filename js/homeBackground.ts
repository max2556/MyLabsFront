function homeBackgroundAppearance(): void {
    let svg: SVGElement = document.querySelector(".home_background svg");
    svg.classList.add("transition_disabled");

    let path: NodeListOf<SVGPathElement> = svg.querySelectorAll("g.lines path");
    path.forEach((el: SVGPathElement) => {
        let length: number = el.getTotalLength();
        el.style.strokeDasharray = length + "px";
        el.style.strokeDashoffset = length + "px";
        el.style.transitionDuration = (length / 800 * 3) + "s";
    });

    svg.classList.remove("transition_disabled");
    svg.classList.add("full")
}

function moveLines(svg: Element): void {
    let linesToMove: number = 5;
    let lines: NodeListOf<SVGPathElement> = svg.querySelectorAll("g.lines path");

    let arr: Array<number> = Array<number>(5);
    for (let i = 0; i < linesToMove; i++) {
        let el: SVGPathElement = lines[Math.floor(Math.random() * lines.length)];
        while (el.getAttribute("busy") == "1") {
            arr[i] = Math.floor(Math.random() * lines.length);
            el = lines[arr[i]];
        }
        el.setAttribute("busy", "1");

        let sdo: number = Number(el.style.strokeDashoffset.slice(0, -2));
        let td: number = Number(el.style.transitionDuration.slice(0, -1));

        el.style.transitionDuration = td * 2 + "s";
        el.style.setProperty("stroke-dashoffset", sdo * 2 + "px", "important")

        setTimeout(function (): void {
            // el.style.transitionDuration = '0s';
            el.classList.add("transition_disabled");
            el.style.setProperty("stroke-dashoffset", sdo + "px")
            el.style.transitionDuration = td + "s";
            el.classList.remove("transition_disabled");
            el.setAttribute("busy", "0");
        }, td * 2 * 1000)
    }
}

function isVisible(el: Element): boolean {
    let targetPosition = {
        bottom: Math.min(el.getBoundingClientRect().bottom, el.getBoundingClientRect().bottom) + pageYOffset,
        top: Math.max(el.getBoundingClientRect().top, el.getBoundingClientRect().top) + pageYOffset
    }
    let windowPosition = {
        top: window.pageYOffset,
        bottom: window.pageYOffset + document.documentElement.clientHeight
    }
    return targetPosition.bottom > windowPosition.top &&
        targetPosition.top < windowPosition.bottom;
}

function homeBackgroundMovements(): void {
    let svg: Element = document.querySelector(".home_background svg");
    let home: Element = document.querySelector(".home_background");

    let intervalId = setInterval(function () {
        if (isVisible(home)) {
            moveLines(svg)
        }
    }, 2000)
}

homeBackgroundAppearance();
homeBackgroundMovements();
