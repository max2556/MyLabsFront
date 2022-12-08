/****************************************************************** 
 * @file Файл с анимацией для числа в сепараторе
 * Использует CSS класс .js-number для обнаружения цели
 * 
 * @brief
 * 1) При загрузке страницы - проверяет нужно ли анимировать прямо сейчас
 * Если не нужно - создает eventListener на scroll
 * 
 * 2) Каждый scroll вызывает проверку на необходимость анимировать
 * 
 * 3) Проверка необходимости строится на isVisible(element), 
 * где element - это любой html элемент.
 * В данном случае - проверяется видимость тэга с числом в сепараторе
 * 
 * 4) Как только одна из проверок сработала - вызывается 
 * инициализация анимации. Число сбрасывается на 0 и изменяется на фиксированную величину
 * 
 * 5) При достижении изначального числа из тэга - анимация прекращается
 *****************************************************************/
(function init() {
    const animDelay = 300; //Задержка перед анимацией в ms(миллисекундах);
    
    const separatorNumberSelector = `.separator .content .block .js-number`;
    const separatorNumberEl = document.querySelector(separatorNumberSelector);

    window.addEventListener('load', ()=>{
        if(!animationCheck(separatorNumberEl)){
            window.addEventListener('scroll', onScrollAnimEvent);
        }
    })

    function onScrollAnimEvent() {
        animationCheck(separatorNumberEl);
    }

    function animationCheck(element) {
        let visibility = isVisible(element);
        if (!visibility) return false;

        window.removeEventListener("scroll", onScrollAnimEvent);
        setTimeout(() => {
            animationInit(parseInt(element.textContent), element);
        }, animDelay);

        return true;
    }

    function animationInit(target = 52, element) {

        const baseFrequency = 25;
        const time = 500;
        const start = 0;

        const _updates = time / 1000 * 25;
        let delta = parseInt(target / _updates);
        if (delta <= 0) delta = 1;


        element.textContent = start;
        let intervalID = setInterval(animate, time / baseFrequency);
        function animate() {
            const next = parseInt(element.textContent) + delta;

            if (element.textContent == target) clearInterval(intervalID);
            element.textContent = next < target ? next : target;
        }
    }
})()