'use strict';

// Модуль, который отвечает за создание карточки объявлений

(function () {
  var CARD_PHOTO_WIDTH = 45;
  var CARD_PHOTO_HEIGTH = 40;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  // Объект, переводящий данные из type на русский язык:
  var houseType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var getCardCapacityRooms = function (rooms) {
    var cardCapacityRooms = ' комнаты для ';
    if (rooms === 1) {
      cardCapacityRooms = ' комната для ';
    }
    if (rooms >= 5) {
      cardCapacityRooms = ' комнат для ';
    }
    return cardCapacityRooms;
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
    card.querySelector('.popup__photos').appendChild(drawPhotosList(ad.offer.photos));
    card.querySelector('.popup__close').addEventListener('click', deleteCard);

    if (ad.author.avatar === 0) {
      card.querySelector('.popup__avatar').remove();
    } else {
      card.querySelector('.popup__avatar').src = ad.author.avatar;
    }

    if (ad.offer.features === 0) {
      card.querySelector('.popup__features').remove();
    } else {
      card.querySelector('.popup__features').appendChild(drawFeaturesList(ad.offer.features));
    }

    if (ad.offer.rooms === 0 && ad.offer.guests === 0) {
      card.querySelector('.popup__text--capacity').remove();
    } else {
      card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + getCardCapacityRooms(ad.offer.rooms) + ad.offer.guests + (ad.offer.guests === 1 ? ' гостя' : ' гостей');
    }

    if(!ad.offer.description) {
      card.querySelector('.popup__description').remove();
    } else {
      card.querySelector('.popup__description').textContent = ad.offer.description;
    }

    return card;
  };

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (map.querySelector('.map__card') !== null) {
        deleteCard();
      }
    }
  });

  window.createCard = createCard;
})();
