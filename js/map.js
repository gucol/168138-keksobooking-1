'use strict';

var MIN_COORDINATE_X = 0;
var MAX_COORDINATE_X = 1200;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GESTS = 1;
var MAX_GESTS = 50;
var NUMBER_OF_PINS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// массив значений для ключа title
var TITLES = [
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
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// массив строк случайной длины для ключа features в объекте
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
]

var featuresList = function () {
  var innerArray = [];
  var randomNumber = randomNumberReturn(0, FEATURES.length);
  for (var i = 0; i < randomNumber; i++) {
    innerArray.push(FEATURES[i]);
  }
  return innerArray;
}

// массив значений для checkin и checkout
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
]

// строка с одним из четырёх фиксированных значений для ключа type
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
]

// Нахожу место, куда вставляем элементы
var map = document.querySelector('.map');
var pinsList = document.querySelector('.map__pins');

// Нахожу шаблон и разметку для метки и для карточки
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var 

// Функция, возвращающая случайный элемент массива:
var randomIndexReturn = function (processedArray) {
  var randomIndex = Math.floor(Math.random() * processedArray.length);
  return processedArray[randomIndex];
};

// Функция, возвращающая случайное число из диапазона:
var randomNumberReturn = function ( min, max) {
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
}

// Функция, возвращающая элементы массива в случайном порядке (Фишер-Йетс):
var shuffle = function (sortedArray) {
  var randomItem;
  var box;
  for(var lastItem = sortedArray.length - 1; lastItem > 0; lastItem--){
    randomItem = Math.floor(Math.random()*(lastItem + 1));
    box = sortedArray[randomItem];
    sortedArray[randomItem] = sortedArray[lastItem];
    sortedArray[lastItem] = box;
  }
  return sortedArray;
}

/*Функция, переводящая данные из type на русский язык.
Квартира для flat, Бунгало для bungalo, Дом для house, Дворец для palace.*/
var getCardType = function (type) {
  var translateType = 'Абы что';
    switch (type) {
      case 'flat':
        translateType = 'Квартира';
        break;
      case 'bungalo':
        translateType = 'Бунгало';
        break;
      case 'house':
        translateType = 'Дом';
        break;
      case 'palace':
        translateType = 'Дворец';
        break;
    }
    return translateType;
}

// Функция, собирающая случайный комплект свойств из объявленных выше массивов:
var madeSimilarAds = function (index) {
  var location = {
    x: randomNumberReturn(MIN_COORDINATE_X, MAX_COORDINATE_X),
    y: randomNumberReturn(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
  }
  var similarAd = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
  	},

  	offer: {
  	  // строка, заголовок предложения, одно из фиксированных значений из массива titles. Значения не должны повторяться.
      title: randomIndexReturn(TITLES[index]),
      // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      address:  location.x + ', ' + location.y,
      // число, случайная цена от 1000 до 1 000 000 (см формулу случайных чисел)
      price: randomNumberReturn(MIN_PRICE, MAX_PRICE),
      // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      type: randomIndexReturn(TYPES),
      // число, случайное количество комнат от 1 до 5
      rooms: randomNumberReturn(MIN_ROOMS, MAX_ROOMS),
      // число, случайное количество гостей, которое можно разместить (проверить)
      guests: randomNumberReturn(MIN_GESTS, MAX_GESTS),
      // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      checkin: randomIndexReturn(TIMES),
      checkout: randomIndexReturn(TIMES), 
      // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      features: featuresList(),
      // пустая строка
      description: '',
      // массив photos, элементы которого расположенны в произвольном порядке
      photos: shuffle(PHOTOS)
  	},

  	location: {
  	  // !!! случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      x: location.x,
      // случайное число, координата y метки на карте от 130 до 630.
      y: location.y
  	}
  }

  return similarAd;
};

// Создание массива из восьми меток:
var similarAds = [];

for (var i = 0; i < NUMBER_OF_PINS; i++) {
  similarAds.push(madeSimilarAds(i));
}


//2. У блока .map уберите класс .map--faded
map.classList.remove('.map--faded');

/*
3. На основе данных, созданных в первом пункте, создайте DOM-элементы, 
соответствующие меткам на карте, и заполните их данными из массива. 
Итоговую разметку метки .map__pin можно взять из шаблона #pin.

У метки должны быть следующие данные:
Координаты:style="left: {{location.x}}px; top: {{location.y}}px;"
src="{{author.avatar}}"
alt="{{заголовок объявления}}"
*/
// Функция, передающая в метку необходимые значения 
var getMapPin = function (similarAd) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = similarAd.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = similarAd.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = similarAd.author.avatar;
  pin.querySelector('img').alt = similarAd.offer.title;
  return pin;
};

// Функция рендера пина
var renderPins = function () {
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < similarAds.length; i++) {
		fragment.appendChild(getMapPin(similarAds[i]));
	}
	pinsList.appendChild(fragment);
}

/*
4. Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки 
элементов используйте DocumentFragment.
*/

var createFeature = function (feature) {
  var FeatureListItem = document.createElement('li');
  FeatureListItem.classList.add('popup__feature');
  return FeatureListItem;
}

var drawFeaturesList = function (features) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(createFeature(array[i]));
  }
  return fragment;
}


// Функция создаёт карточку
var createCard = function (ad) {
	var card = cardTemplate.cloneNode(true);
	// Выведите заголовок объявления offer.title в заголовок .popup__title.
	card.querySelector('.popup__title').textContent = ad.offer.title;
	// Выведите адрес offer.address в блок .popup__text--address.
	card.querySelector('.popup__text--address').textContent = ad.offer.address;
	// Выведите цену offer.price в блок .popup__text--price
	card.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
	// В блок .popup__type выведите тип жилья offer.type
	card.querySelector('.popup__type').textContent = getCardType(ad.offer.type); 
	/*Время заезда и выезда offer.checkin и offer.checkout в 
    блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, 
	выезд до {{offer.checkout}}. Например, заезд после 14:00, выезд 
	до 12:00.*/
	card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
	// В список .popup__features выведите все доступные удобства в объявлении.
	card.querySelector('.popup__features').appendChild(drawFeaturesList(ad.offer.features)); 
	// В блок .popup__description выведите описание объекта недвижимости offer.description.
	card.querySelector('.popup__description').textContent = ad.offer.description;
	/*В блок .popup__photos выведите все фотографии из списка offer.photos. 
	Каждая из строк массива photos должна записываться как src соответствующего изображения.*/
	// Что-то по аналогии со списком фич написать
	card.querySelector('.popup__photos').appendChild(drawPhotosList(ad.offer.photos)); 
	return card;
}

var renderCard = function (card) {
	map.insertBefore(card, map.querySelector('.map__filters-container'));
}

