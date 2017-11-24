'use strict';

var NUMBER_AVATAR_IMG = [1, 2, 3, 4, 5, 6, 7, 8];
var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['flat', 'house', 'bungalo'];
var OFFER_FEATURE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];


// Находим случайный элемент в массиве
function getRandomArrayIndex(Array) {
  return Array[Math.floor(Math.random() * Array.length)];
}

var offers = [];

// Заполняем массив объектами параметрами:
function createArrayOffers(offersCount) {

  for (var j = 0; j <= offersCount - 1; j++) {
    offers.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomArrayIndex(NUMBER_AVATAR_IMG) + '.png'
      },
      offer: {
        title: getRandomArrayIndex(OFFER_TITLE)
      }
    });

  }
}
createArrayOffers(8);
