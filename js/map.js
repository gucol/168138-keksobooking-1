'use strict';

/* Модуль, который управляет карточками объявлений и пинами:
добавляет на страницу нужную карточку,
отрисовывает пины и осуществляет взаимодействие карточки
и метки на карте */
(function () {
  var map = document.querySelector('.map');

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

  var pinsList = document.querySelector('.map__pins');

  // Функция рендера меток на карте:
  var renderPins = function (dataArray) {
    var fragment = document.createDocumentFragment();

    dataArray.forEach(function (ElemetOfArray) {
      if (ElemetOfArray.offer) {
        var newPin = window.createPin(ElemetOfArray, function () {
          removeExistingPopup();
          var card = window.createCard(ElemetOfArray);
          showCard(card);
        });
      }

      fragment.appendChild(newPin);
    });
    pinsList.appendChild(fragment);
  };

  window.map = {
    renderPins: renderPins
  };
})();
