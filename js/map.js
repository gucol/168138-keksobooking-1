'use strict';
/*
1. Создайте массив, состоящий из 8 сгенерированных JS объектов, 
которые будут описывать похожие объявления неподалёку. 
Структура объектов — в задании: https://up.htmlacademy.ru/javascript/16/tasks/13
*/

// массив значений для ключа title
var titles = [
  'Большая уютная квартира', 
  'Маленькая неуютная квартира', 
  'Огромный прекрасный дворец', 
  'Маленький ужасный дворец', 
  'Красивый гостевой домик', 
  'Некрасивый негостеприимный домик', 
  'Уютное бунгало далеко от моря', 
  'Неуютное бунгало по колено в воде'
]

//массив из строк для ключа photos в объекте
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// массив строк случайной длины для ключа features в объекте
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]

var featuresList = function () {
  var array;
  var randomNumber = randomNumberReturn(0, features.length);
  for (var i = 0; i < randomNumber; i++) {
    array.push[features[i]];
  }
  return array;
}

// массив значений для checkin и checkout
var times = [
  '12:00',
  '13:00',
  '14:00'
]

// строка с одним из четырёх фиксированных значений для ключа type
var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
]

// Функция, возвращающая случайный элемент массива:
var randomIndexReturn = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Функция, возвращающая случайное число из диапазона:
var randomNumberReturn = function ( min, max) {
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
}

// Функция, возвращающая элементы массива в случайном порядке (Фишер-Йетс):
var shuffle = function (array) {
  var randomItem;
  var box;
  for(var lastItem = arr.length - 1; lastItem > 0; lastItem--){
    randomItem = Math.floor(Math.random()*(lastItem + 1));
    box = array[randomItem];
    array[randomItem] = array[lastItem];
    array[lastItem] = box;
  }
  return array;
}

// Функция, собирающая случайный комплект свойств из объявленных выше массивов:
var madeSimilarAds = function () {
  var similarAd = {
    author: {
	  // Строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. 
	  // Например, 01, 02 и т. д. Адреса изображений не повторяются
      avatar: 'img/avatars/user0' + randomNumberReturn(1, 8) + '.png'
  	},

  	offer: {
  	  // строка, заголовок предложения, одно из фиксированных значений из массива titles. Значения не должны повторяться.
      title: randomIndexReturn(titles),
      // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      address:  similarAd.location.x + ', ' + similarAd.location.y,
      // число, случайная цена от 1000 до 1 000 000 (см формулу случайных чисел)
      price: randomNumberReturn(1000, 1000000),
      // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      type: randomIndexReturn(types),
      // число, случайное количество комнат от 1 до 5
      rooms: randomNumberReturn(1, 5),
      // число, случайное количество гостей, которое можно разместить (проверить)
      guests: randomNumberReturn(1, 50),
      // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      checkin: randomIndexReturn(times),
      checkout: randomIndexReturn(times), 
      // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      features: featuresList,
      // пустая строка
      description: '',
      // массив photos, элементы которого расположенны в произвольном порядке
      photos: shuffle(photos)
  	},

  	location: {
  	  // !!! случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      x: randomNumberReturn(130, 630),
      // случайное число, координата y метки на карте от 130 до 630.
      y: randomNumberReturn(130, 630)
  	}
  }

  return similarAd;
};

// Создание массива из восьми меток:
var similarAds = [];

for (var i = 0; i < 8; i++) {
  similarAds.push(madeSimilarAds());
}

//2. У блока .map уберите класс .map--faded
document.querySelector('.map').classList.remove('.map--faded');

/*
3. На основе данных, созданных в первом пункте, создайте DOM-элементы, 
соответствующие меткам на карте, и заполните их данными из массива. 
Итоговую разметку метки .map__pin можно взять из шаблона #pin.

У метки должны быть следующие данные:
Координаты:style="left: {{location.x}}px; top: {{location.y}}px;"
src="{{author.avatar}}"
alt="{{заголовок объявления}}"

4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки 
элементов используйте DocumentFragment.
*/

// Нахожу место, куда вставляем элементы
var pinsList = document.querySelector('.map__pins');

// нахожу шаблон и разметку
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

/*
Выведите заголовок объявления offer.title в заголовок .popup__title.
Выведите адрес offer.address в блок .popup__text--address.
Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.
В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.
Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, 2 комнаты для 3 гостей.
Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд до 12:00.
В список .popup__features выведите все доступные удобства в объявлении.
В блок .popup__description выведите описание объекта недвижимости offer.description.
В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
*/


/*
5. На основе первого по порядку элемента из сгенерированного массива и 
шаблона .map__card создайте DOM-элемент объявления, заполните его данными 
из объекта и вставьте полученный DOM-элемент в блок .map перед блоком
.map__filters-container:
*/
