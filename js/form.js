'use strict';

// Модуль, который работает с формой объявления

(function () {
  var roomNumber = document.querySelector('#room_number option');
  var capacity = document.querySelector('#capacity');

  /* Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
  что при выборе количества комнат вводятся ограничения на допустимые варианты выбора
  количества гостей:*/
  var changeRoomNumberAndCapacity = function () {
    var numberOfRooms = roomNumber.value;
    var numberOfGuests = capacity.value;
    // если количество комнат меньше 2 и не равно количеству гостей
    if (numberOfRooms < 2 && numberOfRooms !== numberOfGuests) {
      // то у количества гостей появляется надпись 'Введите допустимое количество гостей'
      capacity.setCustomValidity('Введите допустимое количество гостей');
      // иначе если количество комнат больше или равно 2 и при этом меньше чем колличество гостей
      // или количество гостей равно 0 (не для гостей)
    } else if (numberOfRooms >= 2 && (numberOfRooms < numberOfGuests || numberOfGuests === 0)) {
      // то для количества гостей появляется всё таже запись
      capacity.setCustomValidity('Введите допустимое количество гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

  changeRoomNumberAndCapacity();
})();
