;(async function init() {
  const data = await getCount()
  const separator = document.querySelector(`.separator`);
  const countText = separator.querySelector(`.count`);

  countText.textContent = data;
})()
