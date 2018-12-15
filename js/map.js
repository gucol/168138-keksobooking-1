'use strict';

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
var MIN_COORDINATE_X = 0;
var MAX_COORDINATE_X = document.querySelector('.map').offsetWidth - PIN_WIDTH;
var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;

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
  var randomNumber = window.util.randomNumberReturn(0, FEATURES.length - 1);
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
var centerPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilter = document.querySelector('.map__filters');
var addressInput = document.querySelector('#address');
var ESC_KEYCODE = 27;

// Объект, переводящий данные из type на русский язык:
var houseType = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

// Функция, собирающая случайный комплект свойств из объявленных выше массивов:
var madeSimilarAds = function (index) {
  var location = {
    x: window.util.randomNumberReturn(MIN_COORDINATE_X, MAX_COORDINATE_X),
    y: window.util.randomNumberReturn(MIN_COORDINATE_Y, MAX_COORDINATE_Y)
  };

  var similarAd = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },

    offer: {
      title: TITLES[index],
      address: location.x + ', ' + location.y,
      price: window.util.randomNumberReturn(MIN_PRICE, MAX_PRICE),
      type: window.util.randomIndexReturn(TYPES),
      rooms: window.util.randomNumberReturn(MIN_ROOMS, MAX_ROOMS),
      guests: window.util.randomNumberReturn(MIN_GESTS, MAX_GESTS),
      checkin: window.util.randomIndexReturn(TIMES),
      checkout: window.util.randomIndexReturn(TIMES),
      features: featuresList(),
      description: '',
      photos: window.util.shuffle(PHOTOS)
    },

    location: {
      x: location.x,
      y: location.y
    }
  };

  return similarAd;
};

var similarAds = [];
for (var i = 0; i < NUMBER_OF_PINS; i++) {
  similarAds.push(madeSimilarAds(i));
}

// Функция, передающая в метку необходимые данные:
var createPin = function (similarAd, callback) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = similarAd.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = similarAd.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = similarAd.author.avatar;
  pin.querySelector('img').alt = similarAd.offer.title;

  pin.addEventListener('click', function (evt) {
    // Про callback: https://ru.hexlet.io/blog/posts/javascript-what-the-heck-is-a-callback
    callback(evt);
  });
  return pin;
};

// Функция находит на карте карточку. Если есть — удаляет:
var removeExistingPopup = function () {
  var oldCard = map.querySelector('.map__card');
  if (oldCard) {
    oldCard.remove();
  }
};

var showCard = function (cardElement) {
  map.insertBefore(cardElement, map.querySelector('.map__filters-container'));
};

// Функция рендера меток на карте:
var renderPins = function (dataArray) {
  var fragment = document.createDocumentFragment();

  dataArray.forEach(function (ElemetOfArray) {
    var newPin = createPin(ElemetOfArray, function () {
      removeExistingPopup();
      var card = createCard(ElemetOfArray);
      showCard(card);
    });
    fragment.appendChild(newPin);
  });
  pinsList.appendChild(fragment);
};

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
  var mixedArray = window.util.shuffle(photos);
  for (var z = 0; z < photos.length; z++) {
    fragment.appendChild(createPhoto(mixedArray[z]));
  }
  return fragment;
};

var deleteCard = function () {
  map.removeChild(map.querySelector('.map__card'));
};

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
  card.querySelector('.popup__close').addEventListener('click', deleteCard);
  return card;
};

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (map.querySelector('.map__card') !== null) {
      deleteCard();
    }
  }
});

// Функция, переключающая атрибут disabled у <input> и <select> в формах:
var toggleFormStatus = function (form) {
  var formInputs = form.querySelectorAll('input');
  var formSelects = form.querySelectorAll('select');
  if (formInputs[0].getAttribute('disabled')) {
    for (var e = 0; e < formInputs.length; e++) {
      formInputs[i].disabled = false;
    }
    for (var u = 0; u < formSelects.length; u++) {
      formSelects[i].disabled = false;
    }
  }
};

// Метод, который устанавливает значения поля ввода адреса:
var setsAddressValue = function () {
  var centerPinCenterCoord = {
    x: parseInt(centerPin.style.left, 10) + PIN_WIDTH / 2,
    y: parseInt(centerPin.style.top, 10) + PIN_HEIGHT / 2
  };

  addressInput.value = centerPinCenterCoord.x + ', ' + centerPinCenterCoord.y;
};

var mapPinMouseupHandler = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  toggleFormStatus(adForm);
  toggleFormStatus(mapFilter);
  renderPins(similarAds);
};

/* Обработчик события mouseup на элемент .map__pin--main, вызывающий функцию, которая будет отменять
изменения DOM-элементов, описанные в пункте «Неактивное состояние» технического задания. */
// centerPin.addEventListener('mouseup', mapPinMouseupHandler);

// ВАЛИДАЦИЯ ФОРМЫ
var roomNumber = document.querySelector('#room_number option');
var capacity = document.querySelector('#capacity');

/* Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
что при выборе количества комнат вводятся ограничения на допустимые варианты выбора
количества гостей:*/
var changeRoomNumberAndCapacity = function () {
  var numberOfRooms = roomNumber.value;
  var numberOfGuests = capacity.value;
  // если количество комнат меньше 2 и не равно количеству гостей
  if (numberOfRooms < 2 && numberOfRooms !== numberOfGuests) {
    // то у количества гостей появляется надпись 'Введите допустимое количество гостей'
    capacity.setCustomValidity('Введите допустимое количество гостей');
    // иначе если количество комнат больше или равно 2 и при этом меньше чем колличество гостей
    // или количество гостей равно 0 (не для гостей)
  } else if (numberOfRooms >= 2 && (numberOfRooms < numberOfGuests || numberOfGuests === 0)) {
    // то для количества гостей появляется всё таже запись
    capacity.setCustomValidity('Введите допустимое количество гостей');
  } else {
    capacity.setCustomValidity('');
  }
};

changeRoomNumberAndCapacity();

// ПЕРЕМЕЩЕНИЕ ПИНА
centerPin.addEventListener('mousedown', function (evt) {
  // Сброс событий по умолчанию:
  evt.preventDefault();
  // Активируем карту:
  mapPinMouseupHandler();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var yCoord = centerPin.offsetTop - shift.y;
    var xCoord = centerPin.offsetLeft - shift.x;

    if (yCoord < MAX_COORDINATE_Y && yCoord > MIN_COORDINATE_Y) {
      centerPin.style.top = (centerPin.offsetTop - shift.y) + 'px';
    }

    if (xCoord < MAX_COORDINATE_X && xCoord > MIN_COORDINATE_X) {
      centerPin.style.left = (centerPin.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setsAddressValue();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
