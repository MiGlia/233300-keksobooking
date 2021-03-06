'use strict';
(function () {
  // Объявляем переменные
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var mapParamSearch = document.querySelector('.map');
  var pinsContainer = mapParamSearch.querySelector('.map__pins');


  // Копируем шаблон(идеальный элемент метку с классои map__pin) и заполняем его новыми данными из сгенерированного массива offers
  function renderMapPin(nearbyOffers, i) {

  // Учитываем размеры метки на карте
    var pinHalfWidth = 23;
    var pinHeight = 64;

    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.querySelector('img').src = nearbyOffers.author.avatar;
    mapPinElement.style.left = (nearbyOffers.location.x - pinHalfWidth) + 'px';
    mapPinElement.style.top = (nearbyOffers.location.y - pinHeight) + 'px';
    mapPinElement.dataset.numPin = i;
    fragment.appendChild(mapPinElement);
    return mapPinElement;
  }

  window.pin = {
    fragment: fragment,
    renderMapPin: renderMapPin,
    mapParamSearch: mapParamSearch,
    pinsContainer: pinsContainer
  };
})();
