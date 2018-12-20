'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var AllHousingPrice = {
    low: {
      minPrice: 0,
      maxPrice: 10000
    },
    middle: {
      minPrice: 10000,
      maxPrice: 50000
    },
    heigh: {
       minPrice: 50000,
       maxPrice: Infinity
    }
  };

  // изменение типа
  var getChangeType = function (data) {
    if (typeSelect.value === 'any') {
      return true;
    } else {
      return data.offer.type === typeSelect.value;
    }
  };

  // изменение цен
  var getChangePrice = function (data) {
  switch (housingPrice.value) {
    case 'low':
      return data.offer.price <= AllHousingPriceValue.low.maxPrice;
    case 'middle':
      return data.offer.price >= AllHousingPriceValue.middle.minPrice && data.offer.price <= AllHousingPriceValue.middle.maxPrice;
    case 'heigh':
      return data.offer.price >= AllHousingPriceValue.heigh.minPrice;
    default:
      return true;
    }
  };

  // изменение колличества комнат
  var getChangeRooms = function (data) {
    if (roomsSelect.value === 'any') {
      return true;
    }

    return data.offer.rooms === Number(roomsSelect.value);
  }
  // изменение колличества гостей
  var getChangeGuests = function (data) {
    if (guestsSelect.value === 'any') {
      return true;
    }

    return data.offer.guests === Number(roomsSelect.value);
  };

  // фичи
  var getChangeFeature = function (data) {
    for (var i = 0; i < featuresCheckboxes.length; i++) {
      if (housingFeatures[i].checked && data.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }
    return true;
  }

  var fulterPins = function (data) {
    data = window.data.get();
    var newPinsArray = [];

    return newPinsArray;
  }
})();

