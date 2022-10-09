; (function init() {
    const steps = document.querySelectorAll('.about-us .info .how_it_works .steps .step span');


    steps.forEach((step, i) => {
        const style = i % 2 == 0 ? 'slideInRightOpacity' : 'slideInLeftOpacity';

        step.classList.add('wow', style)

        //data-wow-duration="0s" data-wow-delay="0s"
        const anim_len = 1.25
        const half_height = window.innerHeight / 2;
        const offset = 200;

        const size = step.getBoundingClientRect();
        const margin = i % 2 == 0 ? size.width / 2 : -1 * size.width / 2;



        step.setAttribute('data-wow-offset', offset)
        step.setAttribute('data-wow-delay', `${anim_len * 0}s`)
        step.setAttribute('data-wow-duration', `${anim_len}s`)

        step.setAttribute('style', `margin-left:${margin}px`)
    })
})()
