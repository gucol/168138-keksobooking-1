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
var CARD_PHOTO_WIDTH = 45;
var CARD_PHOTO_HEIGTH = 40;

// Массив значений для ключа title:
var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

// Массив из строк для ключа photos в объекте:
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Массив строк случайной длины для ключа features в объекте:
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// Функция, возвращающая массив фич случайной длины:
var featuresList = function () {
  var innerArray = [];
  var randomNumber = randomNumberReturn(0, FEATURES.length - 1);
  for (var i = 0; i < randomNumber; i++) {
    innerArray.push(FEATURES[i]);
  }
  return innerArray;
};

// Массив значений для checkin и checkout:
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

// Массив с одним из значений для ключа type:
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

// Переменные, хранящие ссылки на разметку:
var map = document.querySelector('.map');
var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// Функция, возвращающая случайный элемент массива:
var randomIndexReturn = function (processedArray) {
  var randomIndex = Math.floor(Math.random() * processedArray.length);
  return processedArray[randomIndex];
};

// Функция, возвращающая случайное число из диапазона:
var randomNumberReturn = function (min, max) {
  var rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
};

// Функция, возвращающая элементы массива в случайном порядке (Фишер-Йетс):
var shuffle = function (sortedArray) {
  var randomItem;
  var box;
  for (var lastItem = sortedArray.length - 1; lastItem > 0; lastItem--) {
    randomItem = Math.floor(Math.random() * (lastItem + 1));
    box = sortedArray[randomItem];
    sortedArray[randomItem] = sortedArray[lastItem];
    sortedArray[lastItem] = box;
  }
  return sortedArray;
};

// Объект, переводящий данные из type на русский язык:
var houseType = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
}

// Функция, собирающая случайный комплект свойств из объявленных выше массивов:
var madeSimilarAds = function (index) {
  var location = {
    x: randomNumberReturn(MIN_COORDINATE_X, MAX_COORDINATE_X),
    y: randomNumberReturn(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
  };

  var similarAd = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },

    offer: {
      title: TITLES[index],
      address: location.x + ', ' + location.y,
      price: randomNumberReturn(MIN_PRICE, MAX_PRICE),
      type: randomIndexReturn(TYPES),
      rooms: randomNumberReturn(MIN_ROOMS, MAX_ROOMS),
      guests: randomNumberReturn(MIN_GESTS, MAX_GESTS),
      checkin: randomIndexReturn(TIMES),
      checkout: randomIndexReturn(TIMES),
      features: featuresList(),
      description: '',
      photos: shuffle(PHOTOS)
    },

    location: {
      x: location.x,
      y: location.y
    }
  };

  return similarAd;
};

// Создание массива из восьми меток:
var similarAds = [];

for (var i = 0; i < NUMBER_OF_PINS; i++) {
  similarAds.push(madeSimilarAds(i));
}

// Функция, передающая в метку необходимые данные:
var getMapPin = function (similarAd) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = similarAd.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = similarAd.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = similarAd.author.avatar;
  pin.querySelector('img').alt = similarAd.offer.title;
  return pin;
};

// Функция рендера меток на карте:
var renderPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var x = 0; x < arr.length; x++) {
    fragment.appendChild(getMapPin(arr[x]));
  }
  pinsList.appendChild(fragment);
};

renderPins(similarAds);

// Функция создания одного из элементов списка фич:
var createFeature = function (feature) {
  var featureListItem = document.createElement('li');
  featureListItem.classList.add('popup__feature');
  var featureListItemClass = 'popup__feature--' + feature;
  featureListItem.classList.add(featureListItemClass);
  return featureListItem;
};

// Функция, создающая список фич:
var drawFeaturesList = function (features) {
  var fragment = document.createDocumentFragment();
  for (var y = 0; y < features.length; y++) {
    fragment.appendChild(createFeature(features[y]));
  }
  return fragment;
};

// Функция создания одной фотографии жилища:
var createPhoto = function (photoSrc) {
  var photoData = document.createElement('img');
  photoData.classList.add('popup__photo');
  photoData.width = CARD_PHOTO_WIDTH.toString();
  photoData.height = CARD_PHOTO_HEIGTH.toString();
  photoData.alt = 'Фотография жилища';
  photoData.src = photoSrc.toString();
  return photoData;
};

// Функция, создающая комплект фотографий жилья:
var drawPhotosList = function (photos) {
  var fragment = document.createDocumentFragment();
  var mixedArray = shuffle(photos);
  for (var z = 0; z < photos.length; z++) {
    fragment.appendChild(createPhoto(mixedArray[z]));
  }
  return fragment;
};

// Функция создания карточки:
var createCard = function (ad) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').innerHTML = ad.offer.price + '&#x20bd;<span>/ночь</span>';
  card.querySelector('.popup__type').textContent = houseType[ad.offer.type];
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  card.querySelector('.popup__features').appendChild(drawFeaturesList(ad.offer.features));
  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__photos').appendChild(drawPhotosList(ad.offer.photos));
  return card;
};

// Функция рендера карточки и постановки её в нужное место:
var renderCard = function (card) {
  map.insertBefore(card, map.querySelector('.map__filters-container'));
};

// Рендерим и создаём карточку:
renderCard(createCard(similarAds[0]));


var adForm = document.querySelector('.ad-form');
var mapFilter = document.querySelector('.map__filters');
/**/
var toggleMapStatus = function () {
  map.classList.toggle('map--faded');
};

var toggleFormStatus = function (form) {
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  var disabledClass = form.name + '--disabled';
  form.classList.toggle(disabledClass);
  if (formInputs[0].getAttribute(disabled)) {
    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = false;
    }
    for (var i = 0; i < formSelects.length; i++) {
      formSelects[i].disabled = false;
    }
  }
};

/* Функция, которая отменяет изменения DOM-элементов, описанные в пункте 
«Неактивное состояние» технического задания. */
var mapPinMouseupHandler = function () {
  // 1. Блок с картой .map содержит класс map--faded;
  toggleMapStatus();
  // 2. Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled; .map__filters аналогично
  toggleFormStatus(adForm);
  toggleFormStatus(mapFilter);
};
/*
Изменения DOM-элементов, описанные в пункте «Неактивное состояние» ТЗ:
1. Блок с картой .map содержит класс map--faded;
2. Форма заполнения информации об объявлении .ad-form содержит класс 
ad-form--disabled;
3. Все <input> и <select> формы .ad-form заблокированы с помощью атрибута 
disabled, добавленного на них или на их родительские блоки fieldset.
4. Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form.
*/
/* Нужно добавить обработчик события mouseup на элемент .map__pin--main.
Обработчик события mouseup должен вызывать функцию, которая будет отменять 
изменения DOM-элементов, описанные в пункте «Неактивное состояние» 
технического задания. */
var mapPin = document.querySelector('.map__pin--main');
mapPin.addEventListener('mouseup', mapPinMouseupHandler);