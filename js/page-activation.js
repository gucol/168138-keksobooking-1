'use strict';

// Модуль, отвечающий за активацию карты

(function () {
  var centerPin = document.querySelector('.map__pin--main');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');

  // Функция, переключающая атрибут disabled у <input> и <select> в формах:
  var toggleFormStatus = function (form) {
    var formInputs = form.querySelectorAll('input');
    var formSelects = form.querySelectorAll('select');
    if (formInputs[0].getAttribute('disabled')) {
      for (var e = 0; e < formInputs.length; e++) {
        formInputs[e].disabled = false;
      }
      for (var u = 0; u < formSelects.length; u++) {
        formSelects[u].disabled = false;
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
    window.renderPins(window.similarAds);
  };

  window.pageActivation = {
    setsAddressValue: setsAddressValue,
    mapPinMouseupHandler: mapPinMouseupHandler
  };
})();
