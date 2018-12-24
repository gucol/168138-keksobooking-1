'use strict';

(function () {
  var mapFiltersBlock = document.querySelector('.map__filters');
  var housingType = mapFiltersBlock.querySelector('#housing-type');
  var housingPrice = mapFiltersBlock.querySelector('#housing-price');
  var housingRooms = mapFiltersBlock.querySelector('#housing-rooms');
  var housingGuests = mapFiltersBlock.querySelector('#housing-guests');
  var housingFeatures = mapFiltersBlock.querySelectorAll('.map__checkbox');

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
    if (housingType.value === 'any') {
      return true;
    } else {
      return data.offer.type === housingType.value;
    }
  };

  // изменение цен
  var getChangePrice = function (data) {
    switch (housingPrice.value) {
      case 'low':
        return data.offer.price <= AllHousingPrice.low.maxPrice;
      case 'middle':
        return data.offer.price >= AllHousingPrice.middle.minPrice && data.offer.price <= AllHousingPrice.middle.maxPrice;
      case 'heigh':
        return data.offer.price >= AllHousingPrice.heigh.minPrice;
      default:
        return true;
    }
  };

  // изменение колличества комнат
  var getChangeRooms = function (data) {
    if (housingRooms.value === 'any') {
      return true;
    }

    return data.offer.rooms === Number(housingRooms.value);
  };

  // изменение колличества гостей
  var getChangeGuests = function (data) {
    if (housingGuests.value === 'any') {
      return true;
    }

    return data.offer.guests === Number(housingGuests.value);
  };

  // фичи
  var getChangeFeature = function (data) {
    housingFeatures.forEach(function (item) {
      if (item.checked && data.offer.features.indexOf(item.value) < 0) {
        return false;
      }      
    });
/*    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && data.offer.features.indexOf(housingFeatures[i].value) < 0) {
        return false;
      }
    }*/
    return true;
  };

  var fulterPins = function () {
    var newData = window.data.pins;
    var filteredArray = newData.filter(function (data) {
      return getChangeType(data) && getChangePrice(data) && getChangeRooms(data) && getChangeGuests(data) && getChangeFeature(data);
    });

    window.map.removePins();
    window.map.renderPins(filteredArray);
  };

  mapFiltersBlock.addEventListener('change', window.map.removeExistingPopup);
  mapFiltersBlock.addEventListener('change', window.util.debounce(fulterPins));
})();

