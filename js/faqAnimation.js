;(function init() {
  if(window.innerWidth >= 900) return;

  const faq_ul = document.querySelector('.about-us .info .FAQ ul')
  const li_block = faq_ul.querySelectorAll('.block') //блок, содержащий question и answer
  li_block[0].querySelector('.question').click();

  li_block.forEach((block, i) => {
    block.classList.add('wow', 'slideInUpOpacity')

    //data-wow-duration="0s" data-wow-delay="0s"
    const anim_len = 1.25

    const offset = i != (li_block.length-1) ? 200 : 100;

    block.setAttribute('data-wow-offset', offset)
    block.setAttribute('data-wow-delay', `${anim_len * 0}s`)
    block.setAttribute('data-wow-duration', `${anim_len}s`)
  })

  // window.addEventListener('wheel', (e) => {
  //   first_question_check()
  // })

  function first_question_check() {
    const firstBlock = li_block[0]
    const delta = window.scrollY - firstBlock.offsetTop
    const offset = window.innerHeight / 2
    if (delta > offset && !firstBlock.classList.contains('completed')) {
      firstBlock.querySelector('.question').click()
      firstBlock.classList.add('completed')
    }
  }
})()
