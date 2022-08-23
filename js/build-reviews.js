const COUNT = 4
const blockTemplate = document.querySelector('.lastworks template.block-template');
const blocksParent = document.querySelector('.lastworks div.blocks');


;(async function init() {
  if(!blockTemplate) {
    console.warn(`Нет template для создания блоков`)
  }
  
  const data = await getReviews(COUNT)
  if (!data) {
    console.warn(`Нет данных!`)
    return
  }


  
  for(let block of data){
    const newBlock = blockTemplate.content.cloneNode(true);
    newBlock.querySelector('.name').textContent = block.name;
    newBlock.querySelector('.time').textContent = block.time;
    newBlock.querySelector('.price').textContent = block.price;
    
    blocksParent.append(newBlock);
  }

  buildSlider();
})()
