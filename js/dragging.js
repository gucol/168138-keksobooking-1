'use strict';

// Модуль, отвечающий за перемещение пина

(function () {
  var centerPin = document.querySelector('.map__pin--main');
  var PIN_WIDTH = 50;
  var MIN_COORDINATE_X = 0;
  var MAX_COORDINATE_X = document.querySelector('.map').offsetWidth - PIN_WIDTH;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  centerPin.addEventListener('mousedown', function (evt) {
    // Сброс событий по умолчанию:
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // Активируем карту:
      window.pageActivation.mapPinMouseupHandler();

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
      window.map.renderPins(window.data);
      window.pageActivation.setsAddressValue();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
