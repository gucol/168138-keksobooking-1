'use strict';

// Модуль, отвечающий за активацию карты

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_COORD_X = 570;
  var PIN_COORD_Y = 375;

  var map = document.querySelector('.map');
  var centerPin = map.querySelector('.map__pin--main');
  var mapFilter = map.querySelector('.map__filters');
  var form = map.querySelector('.ad-form');
  var addressInput = map.querySelector('#address');
  var fieldsetForm = map.querySelectorAll('.ad-form fieldset');
  var mapFilterFieldset = map.querySelectorAll('.map__filters select');

  addressInput.value = PIN_COORD_X + ', ' + PIN_COORD_Y;

  var disableForm = function (data) {
    for (var i = 0; i < data.length; i++) {
      data[i].setAttribute('disabled', 'disabled');
    }
  };

  disableForm(fieldsetForm);
  disableForm(mapFilterFieldset);

  // Функция, переключающая атрибут disabled у <input> и <select> в формах:
  var toggleFormStatus = function (someForm) {
    var formInputs = someForm.querySelectorAll('input');
    var formSelects = someForm.querySelectorAll('select');
    var formFieldsets = someForm.querySelectorAll('fieldset');

    if (formInputs[0].getAttribute('disabled')) {
      for (var e = 0; e < formInputs.length; e++) {
        formInputs[e].disabled = false;
      }
    }
    if (formSelects[0].getAttribute('disabled')) {
      for (var u = 0; u < formSelects.length; u++) {
        formSelects[u].disabled = false;
      }
    }
    if (formFieldsets[0].getAttribute('disabled')) {
      for (var t = 0; t < formFieldsets.length; t++) {
        formFieldsets[t].disabled = false;
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

  var start = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    toggleFormStatus(form);
    toggleFormStatus(mapFilter);
  };

  var disativate = function () {
    map.classList.remove('map--faded');
    window.map.removePins();
    window.map.removeExistingPopup();
    centerPin.style.left = PIN_COORD_X + 'px';
    centerPin.style.top = PIN_COORD_Y + 'px';
    form.reset();
    setsAddressValue();
  };

  window.pageActivation = {
    setsAddressValue: setsAddressValue,
    start: start,
    disativate: disativate
  };
})();
