;(function init() {
  const faq_ul = document.querySelector('.about-us .info .FAQ ul')
  const li_block = faq_ul.querySelectorAll('.block') //блок, содержащий question и answer
  first_question_check()

  li_block.forEach((block, i) => {
    block.classList.add('wow', 'slideInUp')

    //data-wow-duration="0s" data-wow-delay="0s"
    const anim_len = 0.25

    block.setAttribute('data-wow-offset', `0`)
    block.setAttribute('data-wow-delay', `${anim_len * 0}s`)
    block.setAttribute('data-wow-duration', `${anim_len}s`)
  })

  window.addEventListener('wheel', (e) => {
    first_question_check()
  })

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
