'use strict';

// Модуль, который работает с формой объявления

(function () {
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number option');
  var capacity = form.querySelector('#capacity');

  /* Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
  что при выборе количества комнат вводятся ограничения на допустимые варианты выбора
  количества гостей:*/
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

  changeRoomNumberAndCapacity();

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

  var onErrorSubmit = function (message) {
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

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccessSubmit, onErrorSubmit);
    evt.preventDefault();
  });
})();
