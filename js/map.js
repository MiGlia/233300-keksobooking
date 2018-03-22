'use strict';
(function () {
  // Переменные
  var OFFER_TITLES = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var TIME_IN = ['12:00', '13:00', '14:00'];
  var TIME_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var HOUSE_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var newOffer = [];

  var map = document.querySelector('.map');
  map.classList.remove('map--faded');

  var photoNumber = [];

  function createArrayPhotoNumber(count) {
    for (var i = 0; i < count; i++) {
      photoNumber.push(i + 1);
    }
    return photoNumber;
  }

  createArrayPhotoNumber(8);

  function getOfferArray(count) {
    for (var i = 0; i < count; i++) {
      newOffer.push(
          {
            author: {
              avatar: 'img/avatars/user0' + window.util.getIndividRandomValueFromArray(photoNumber) + '.png'
            },

            offer: {
              title: window.util.getIndividRandomValueFromArray(OFFER_TITLES),
              address: 'location.x, location.y',
              price: window.util.getRandomValue(1000, 1000000),
              type: window.util.getRandomValueFromArray(HOUSE_TYPE),
              rooms: window.util.getRandomValue(1, 5),
              guests: window.util.getRandomValue(1, 3),
              checkin: window.util.getRandomValueFromArray(TIME_IN),
              checkout: window.util.getRandomValueFromArray(TIME_OUT),
              features: window.util.getRandomArray(FEATURES),
              description: '',
              photos: HOUSE_PHOTO.sort(window.util.compareRandom)
            },

            location: {
              x: window.util.getRandomValue(300, 900),
              y: window.util.getRandomValue(150, 500)
            }
          }
      );
    }
  }

  getOfferArray(8);

  var simularPinTenplate = document.querySelector('template').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var mapParamSearch = document.querySelector('.map');
  var pinsContainer = mapParamSearch.querySelector('.map__pins');

  function renderPin(arr) {
    var pinElement = simularPinTenplate.cloneNode(true);

    pinElement.querySelector('img').src = arr.author.avatar;
    pinElement.style.left = arr.location.x + 'px';
    pinElement.style.top = arr.location.y + 'px';
    return pinElement;
  }

  // Функция для вставки фотографий во фрагмент и отрисовки мх на странице
  function drawPins(arr) {
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPin(arr[i]));
      pinsContainer.appendChild(fragment);
    }
  }
  drawPins(newOffer);
})();
