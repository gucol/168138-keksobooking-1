'use strict';

// Модуль, который отвечает за создание пина

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Функция, передающая в метку необходимые данные:
  var createPin = function (similarAd, callback) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = similarAd.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = similarAd.location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = similarAd.author.avatar;
    pin.querySelector('img').alt = similarAd.offer.title;

    pin.addEventListener('click', function (evt) {
      callback(evt);
    });
    return pin;
  };

  window.createPin = createPin;
})();
