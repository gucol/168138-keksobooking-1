'use strict';

// Модуль, который работает с формой объявления:

(function () {
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var inputType = form.querySelector('#type');
  var inputPrice = form.querySelector('#price');
  var timeFieldset = form.querySelector('.ad-form__element--time');
  var timeSelects = ['timein', 'timeout'];
  var formReset = form.querySelector('.ad-form__reset');

  // Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
  var AllocationType = {
    'bungalo': {
      min: '0',
      placeholder: '0'
    },
    'flat': {
      min: '1000',
      placeholder: '1000'
    },
    'house': {
      min: '5000',
      placeholder: '5000'
    },
    'palace': {
      min: '10000',
      placeholder: '10000'
    }
  };

  var synchPrice = function () {
    switch (inputType.value) {
      case 'bungalo':
        inputPrice.min = AllocationType.bungalo.min;
        inputPrice.placeholder = AllocationType.bungalo.placeholder;
        return;
      case 'flat':
        inputPrice.min = AllocationType.flat.min;
        inputPrice.placeholder = AllocationType.flat.placeholder;
        return;
      case 'house':
        inputPrice.min = AllocationType.house.min;
        inputPrice.placeholder = AllocationType.house.placeholder;
        return;
      default:
        inputPrice.min = AllocationType.palace.min;
        inputPrice.placeholder = AllocationType.palace.placeholder;
        return;
    }
  };

  inputType.addEventListener('change', synchPrice);

  timeFieldset.addEventListener('change', function (evt) {
    var target = evt.target;
    var selects = timeFieldset.querySelectorAll('select');
    for (var i = 0; i < selects.length; i++) {
      if (timeSelects.indexOf(selects[i].id) !== -1) {
        selects[i].value = target.value;
      }
    }
  });

  var changeRoomNumberAndCapacity = function () {
    var capacityOptions = capacity.querySelectorAll('option');
    var roomNumberOptions = roomNumber.querySelectorAll('option');

    capacityOptions.forEach(function (item) {
      item.disabled = false;
    });

    for (var t = 0; t < roomNumberOptions.length; t++) {
      if (roomNumberOptions[t].selected === true) {
        switch (roomNumberOptions[t].value) {
          case '1':
            capacityOptions[2].selected = true;
            capacityOptions[0].disabled = true;
            capacityOptions[1].disabled = true;
            capacityOptions[3].disabled = true;
            break;
          case '2':
            capacityOptions[1].selected = true;
            capacityOptions[0].disabled = true;
            capacityOptions[3].disabled = true;
            break;
          case '3':
            capacityOptions[0].selected = true;
            capacityOptions[3].disabled = true;
            break;
          case '100':
            capacityOptions[3].selected = true;
            capacityOptions[0].disabled = true;
            capacityOptions[1].disabled = true;
            capacityOptions[2].disabled = true;
            break;
        }
      }
    }
  };


  roomNumber.addEventListener('change', function () {
    changeRoomNumberAndCapacity();
  });

  capacity.addEventListener('change', function () {
    changeRoomNumberAndCapacity();
  });

  var onSuccessSubmit = function () {
    window.pageActivation.disativate();
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

  formReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.pageActivation.disativate();
  });
})();
