'use strict';

/* Модуль, который управляет карточками объявлений и пинами:
добавляет на страницу нужную карточку,
отрисовывает пины и осуществляет взаимодействие карточки
и метки на карте */
(function () {
  var PINS_COUNT = 5;
  var map = document.querySelector('.map');
  var pins = document.querySelector('.map__pins');

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
    var slicedArray = dataArray.slice(0, PINS_COUNT);

    slicedArray.forEach(function (item) {
      if (item.offer) {
        var newPin = window.createPin(item, function () {
          removeExistingPopup();
          var card = window.createCard(item);
          showCard(card);
        });
      }

      fragment.appendChild(newPin);
    });
    pins.appendChild(fragment);
  };


  var removePins = function () {
    var ordinaryPins = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    ordinaryPins.forEach(function (item) {
      pins.removeChild(item);
    });
  };

  window.map = {
    renderPins: renderPins,
    removePins: removePins,
    removeExistingPopup: removeExistingPopup
  };
})();
