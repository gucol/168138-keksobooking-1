'use strict';

// Модуль со вспомогательными функциями

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var debounce = function (cb) {
    var lastTimeout;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    };
  };

  // Функция, возвращающая элементы массива в случайном порядке (Фишер-Йетс):
  var shuffle = function (sortedArray) {
    var randomItem;
    var box;
    for (var lastItem = sortedArray.length - 1; lastItem > 0; lastItem--) {
      randomItem = Math.floor(Math.random() * (lastItem + 1));
      box = sortedArray[randomItem];
      sortedArray[randomItem] = sortedArray[lastItem];
      sortedArray[lastItem] = box;
    }
    return sortedArray;
  };

  var onError = function (message) {
    var error = document.querySelector('#error').content.querySelector('.error');
    var errorElement = error.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorBtn = errorElement.querySelector('.error__button');

    errorMessage.textContent = message;

    document.querySelector('main').insertAdjacentElement('afterbegin', errorElement);
    document.addEventListener('keydown', closeErrorMessage);
    errorElement.addEventListener('click', closeErrorMessage);
    errorBtn.addEventListener('click', closeErrorMessage);
  };

  var closeErrorMessage = function () {
    var modalError = document.querySelector('.error');
    document.querySelector('main').removeChild(modalError);
    document.removeEventListener('keydown', closeErrorMessage);
    modalError.removeEventListener('click', closeErrorMessage);
  };

  window.util = {
    debounce: debounce,
    shuffle: shuffle,
    onError: onError
  };
})();
