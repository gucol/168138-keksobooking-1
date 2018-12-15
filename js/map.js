'use strict';

// Модуль, который управляет карточками объявлений и пинами: добавляет на страницу нужную карточку, отрисовывает пины и осуществляет взаимодействие карточки и метки на карте

(function () {
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GESTS = 1;
  var MAX_GESTS = 50;
  var NUMBER_OF_PINS = 8;
  var PIN_WIDTH = 50;
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

  window.similarAds = similarAds;


  // Функция находит на карте карточку. Если есть — удаляет:
  var removeExistingPopup = function () {
    var oldCard = map.querySelector('.map__card');
    if (oldCard) {
      oldCard.remove();
    }
  };

  window.map.removeExistingPopup = removeExistingPopup;

  var showCard = function (cardElement) {
    map.insertBefore(cardElement, map.querySelector('.map__filters-container'));
  };

  window.map.showCard = showCard;

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
})();

