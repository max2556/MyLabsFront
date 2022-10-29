; (function () {
  function first() {
    const blocks = document.querySelectorAll('.scroll-plate .blocks .block')
    for (let block of blocks) {
      const title = block.querySelector('.title')
      title.alt = title.textContent
      title.title = title.textContent
    }
  }

  function text_adapt(titleElement) {
    const MAX_LINES = 2;

    const titleElementSize = titleElement.getBoundingClientRect();
    const titleElementHeight = titleElementSize.height;
    const titleElementWidth = titleElementSize.width;


    const fontSize = parseInt(getComputedStyle(titleElement).fontSize);
    const averageWigth = fontSize * 0.6;
    const textCharactersCount = titleElement.textContent.length;

    const maxWidth = titleElementWidth * MAX_LINES;
    const currentWidth = textCharactersCount * averageWigth;
      
    const countToRemove = Math.floor((currentWidth - maxWidth) / averageWigth) + 4;
    if (countToRemove > 0)
      titleElement.textContent = titleElement.title.substring(0, titleElement.textContent.length - countToRemove) + "...";
    else
      titleElement.textContent = titleElement.title

  }

  function set_datadelta(el, delta) {
    el.setAttribute('delta', delta)
  }
  function get_datadelta(el) {
    return el.getAttribute('delta')
  }

  function adaptBlocks() {
    const blocks = document.querySelectorAll('.scroll-plate .blocks .block')
    for (let block of blocks) {
      const title = block.querySelector('.title')

      //if (is_changed_delta(title))
      text_adapt(title)
    }
  }

  function resize() {
    adaptBlocks()
  }

  first()
  adaptBlocks();
  window.addEventListener('resize', resize)
})()
