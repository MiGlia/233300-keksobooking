'use strict';
(function () {
  // var mapFilter = document.querySelectorAll('.map__filter');
  var filterForm = document.querySelector('.map__filters');
  var filterHouseType = filterForm.querySelector('#housing-type');
  var filterHousePrice = filterForm.querySelector('#housing-price');
  var filterHouseRooms = filterForm.querySelector('#housing-rooms');
  var filterHouseGuests = filterForm.querySelector('#housing-guests');
  var housingFeature = filterForm.querySelectorAll('#housing-features input');
  var PIN_IN_MAP = 5;
  var nearbyOffers = [];
  var housingFeatures = Array.from(housingFeature);


  // фильтр по удобствам
  function isFilterFeature(elem) {
    return housingFeatures.every(function (feature) {
      if (!feature.checked) {
        return true;
      }

      if (elem.offer.features.indexOf(feature.value) !== -1) {
        return true;
      }
      return false;
    });
  }

  // фильтр по цене
  function getPrice(price) {
    var lowPrice = 10000;
    var highPrice = 50000;
    if (price <= lowPrice) {
      return 'low';
    } else if (price >= highPrice) {
      return 'high';
    } else {
      return 'middle';
    }
  }

  // система фильтров
  function isFilterOffer(elem) {
    if ((filterHouseType.value === 'any' || filterHouseType.value === elem.offer.type) &&
(filterHousePrice.value === 'any' || filterHousePrice.value === getPrice(elem.offer.price)) &&
(filterHouseRooms.value === 'any' || +filterHouseRooms.value === elem.offer.rooms) &&
(filterHouseGuests.value === 'any' || +filterHouseGuests.value === elem.offer.guests)) {
      return true;
    }
    return false;
  }

  var arrTemp = nearbyOffers.slice();

  function getFilter(arr) {
    var filteredArr = arr.filter(function (elem) {
      return isFilterFeature(elem) && isFilterOffer(elem);
    });
    return filteredArr.slice(0, PIN_IN_MAP);
  }

  arrTemp = getFilter(arrTemp);

  window.filterMap = {
    getFilter: getFilter,
    arrTemp: arrTemp
  };
})();
