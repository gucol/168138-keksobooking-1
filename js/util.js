'use strict';

// Модуль со вспомогательными функциями

(function () {
  // Функция, возвращающая случайный элемент массива:
  var randomIndexReturn = function (processedArray) {
    var randomIndex = Math.floor(Math.random() * processedArray.length);
    return processedArray[randomIndex];
  };

  // Функция, возвращающая случайное число из диапазона:
  var randomNumberReturn = function (min, max) {
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    return rand;
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

  window.util = {
    randomIndexReturn: randomIndexReturn,
    randomNumberReturn: randomNumberReturn,
    shuffle: shuffle
  };
})();
