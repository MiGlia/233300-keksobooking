'use strict';
(function () {
  var OFFER_TITLES = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
  var HOUSE_TYPE = [ 'palace', 'flat', 'house', 'bungalo'];
  var TIME_IN = ['12:00', '13:00', '14:00'];
  var TIME_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var newOffer = [];

  function getOfferArray(count) {
    for (var i = 0; i < count.length; i++) {
      newOffer.push(
{
  "author": {
    "avatar": 'img/avatars/user0' +   window.util.getRandomValue +  '.png'
  },

  "offer": {
    "title": window.util.getIndividRandomValueFromArray(OFFER_TITLES),
    "address": 'location.x, location.y',
    "price":  getRandomValue(1000, 1000000),
    "type": getRandomValueFromArray(HOUSE_TYPE),
    "rooms": getRandomValue(1, 5),
    "guests": getRandomValue(1, 3),
    "checkin": getRandomValueFromArray(TIME_IN),
    "checkout": getRandomValueFromArray(TIME_OUT),
    "features": getRandomArray(FEATURES),
    "description": '',
    "photos":
  },

  "location": {
    "x":
    "y":
  }
}
      );
    }

  }

})();
