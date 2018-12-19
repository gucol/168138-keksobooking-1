'use strict';

// Модуль, который работает с формой объявления:

(function () {
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var changeRoomNumberAndCapacity = function () {
    var numberOfRooms = roomNumber.value;
    var numberOfGuests = capacity.value;

    if (numberOfRooms < 2 && numberOfRooms !== numberOfGuests) {
      capacity.setCustomValidity('Введите допустимое количество гостей');
    } else if (numberOfRooms >= 2 && (numberOfRooms < numberOfGuests || numberOfGuests === 0)) {
      capacity.setCustomValidity('Введите допустимое количество гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('change', function () {
    changeRoomNumberAndCapacity();
  });

  capacity.addEventListener('change', function () {
    changeRoomNumberAndCapacity();
  });

  var onSuccessSubmit = function () {
    var success = document.querySelector('#success').content.querySelector('.success');
    var successElement = success.cloneNode(true);
    document.querySelector('main').appendChild(successElement);
    document.addEventListener('keydown', closeSuccessMessage);
    successElement.addEventListener('click', closeSuccessMessage);
  };

  var closeSuccessMessage = function () {
    var modalSucces = document.querySelector('.success');
    document.querySelector('main').removeChild(modalSucces);
    document.removeEventListener('keydown', closeSuccessMessage);
    modalSucces.removeEventListener('click', closeSuccessMessage);
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccessSubmit, window.util.onError);
    evt.preventDefault();
  });
})();
