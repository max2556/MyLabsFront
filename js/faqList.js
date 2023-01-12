(function faqInit() {
    const faq_holder = document.querySelector('.about-us .FAQ');
    const block_elements = faq_holder.querySelectorAll('.block');
    const question_elements = faq_holder.querySelectorAll('.question');
    const middle_screen_size = 900;


    for(let question of question_elements){
        question.onclick = () => {
            if(window.innerWidth > middle_screen_size) return;
            const parent = question.parentElement;
            const answer = parent.querySelector('.answer');

            const questionHeight = question.getBoundingClientRect().height+10;
            const spanSize = answer.querySelector('span').getBoundingClientRect().height;
            const answerSize = answer.getBoundingClientRect().height;

            const maxHeight = Math.max(spanSize, answerSize)+20;

            question.classList.toggle('active');

            const isActive = question.classList.contains('active');
            const delta = isActive ? maxHeight : 5;

            const answerTranslate = isActive ? questionHeight : 0;

            parent.setAttribute('style', `margin-bottom:${delta}px`);
            answer.setAttribute('style', `transform: translateY(${answerTranslate}px)`);
        }
    }
})();