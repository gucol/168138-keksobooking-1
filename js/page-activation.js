'use strict';

// Модуль, отвечающий за активацию карты

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_COORD_X = 570;
  var PIN_COORD_Y = 375;

  var map = document.querySelector('.map');
  var centerPin = document.querySelector('.map__pin--main');
  var mapFilter = map.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
  var fieldsetForm = form.querySelectorAll('.ad-form fieldset');
  var mapFilterFieldset = map.querySelectorAll('.map__filters select');


  // Метод, который устанавливает значения поля ввода адреса:
  var setsAddressValue = function () {
    var centerPinCenterCoord = {
      x: parseInt(centerPin.style.left, 10) + PIN_WIDTH / 2,
      y: parseInt(centerPin.style.top, 10) + PIN_HEIGHT / 2
    };

    addressInput.value = centerPinCenterCoord.x + ', ' + centerPinCenterCoord.y;
  };

  setsAddressValue();

  var disableForm = function (data) {
    data.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  disableForm(fieldsetForm);
  disableForm(mapFilterFieldset);

  // Функция, переключающая атрибут disabled у <input> и <select> в формах:
  var toggleFormStatus = function (someForm) {
    var formInputs = someForm.querySelectorAll('input');
    var formSelects = someForm.querySelectorAll('select');
    var formFieldsets = someForm.querySelectorAll('fieldset');

    if (formInputs[0].getAttribute('disabled')) {
      formInputs.forEach(function (item) {
        item.disabled = false;
      });
    }

    if (formSelects[0].getAttribute('disabled')) {
      formSelects.forEach(function (item) {
        item.disabled = false;
      });
    }

    if (formFieldsets[0].getAttribute('disabled')) {
      formFieldsets.forEach(function (item) {
        item.disabled = false;
      });
    }
  };

  var start = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    toggleFormStatus(form);
    toggleFormStatus(mapFilter);
  };

  var disativate = function () {
    disableForm(fieldsetForm);
    disableForm(mapFilterFieldset);
    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');
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
