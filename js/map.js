'use strict';

var NUMBER_AVATAR_IMG = [1, 2, 3, 4, 5, 6, 7, 8];
var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPE = ['flat', 'house', 'bungalo'];
var OFFER_FEATURE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_PHOTOS = [];


// Находим случайный элемент в массиве
function getRandomArrayIndex(Array) {
  return Array[Math.floor(Math.random() * Array.length)];
}

var offers = [];

// Находим случайный элемент в массиве и сразу его удаляем из массива
function getRandomNorepeatArrayIndex(Array) {
  return Array.splice(Math.floor(Math.random() * Array.length), 1);
}

// Возвращает случайное число между min (включительно) и max (не включая max)
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getNew() {
var offerFeatures = OFFER_FEATURE.slice();
offerFeatures.length = getRandomValue(1, 6);
return offerFeatures;
}


// Заполняем массив объектами:
function createArrayOffers(offersCount) {

  for (var j = 0; j <= offersCount - 1; j++) {
    offers.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomNorepeatArrayIndex(NUMBER_AVATAR_IMG) + '.png'
      },
      offer: {
        title: getRandomNorepeatArrayIndex(OFFER_TITLE),
        address: ('location.x, location.y'),
        price: getRandomValue(1000, 1000001),
        type: getRandomNorepeatArrayIndex(OFFER_TYPE),
        rooms: getRandomValue(1, 6),
        guests: getRandomValue(1, 5),
        checkin: getRandomNorepeatArrayIndex(OFFER_CHECKIN),
        checkout: getRandomNorepeatArrayIndex(OFFER_CHECKOUT),
        features: getNew(),
        description: '',
        photos: OFFER_PHOTOS
      },
      location: {
        x: getRandomValue(300, 901),
        y: getRandomValue(100, 501)
      }
    }
    );
  }
}
createArrayOffers(8);
