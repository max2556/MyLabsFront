(function init() {

    window.addEventListener('load', () => { animationInit() })

    function animationInit(target = 52) {
        const separatorNum = document.querySelector(".separator .content .block .number");
        const baseFrequency = 25;
        const time = 500;
        const start = 0;

        const _updates = time / 1000 * 25;
        let delta = parseInt(target / _updates);
        if(delta <= 0) delta = 1;


        separatorNum.textContent = start;
        let intervalID = setInterval(animate, time / baseFrequency);
        function animate() {
            const next = parseInt(separatorNum.textContent) + delta;
    
            if(separatorNum.textContent == target) clearInterval(intervalID);
            separatorNum.textContent = next < target ? next : target;
        }
    }
})()