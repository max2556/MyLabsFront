const URL = `https://serene-lowlands-60940.herokuapp.com`
const ROUTES = {
  reviews: {
    path: '/api/servicesrand',
    option: {
      method: 'POST', // Метод POST
      mode: 'cors', // Нужно гуглить
      headers: {
        //Заголовки
        'Content-Type': 'application/json', //В body будет json
      },
      body: null, // Пока что Null
    }
  },
  count: {
    path: `/api/servicescount`,
    option: {
      method: 'POST', // Метод POST
      mode: 'cors', // Нужно гуглить
      headers: {
        //Заголовки
        'Content-Type': 'application/json', //В body будет json
      },
      body: null, // Пока что Null
    }
  },
}


/**
 * Запрашивает данные о последних выполненных заказах
 * Количество заказов зависит от n 
 * 
 * Пример через promise: getReviews(4).then((data)=>{console.log(data)}) 
 * Пример через async/await: (async ()=>{console.log(await getReviews(4))})()
 * 
 * @param {int} n количество требуемых объектов
 * @returns массив json с данными о последних работах
 */
async function getReviews(n = 1) {
  let opt = ROUTES.reviews.option
  opt.body = JSON.stringify({ number: n })

  let url = URL + ROUTES.reviews.path;
  const response = await fetch(url, opt)
  const json = await response.json();
  return json.data // parses JSON response into native JavaScript objects
}


/**
 * async Функция по определению количества отзывов
 * 
 * Пример через promise: getCount().then((data)=>{console.log(data)}) 
 * Пример через async/await: (async ()=>{console.log(await getCount())})()
 * 
 * @returns Количество отзывов
 */
async function getCount() {
  let opt = ROUTES.count.option

  let url = URL + ROUTES.count.path;
  const response = await fetch(url, opt)
  return await response.json() // parses JSON response into native JavaScript objects
}




/*
Позже мб пересмотреть всю эту структуру, чтобы более по-человечески было
Пока так пусть будет
*/