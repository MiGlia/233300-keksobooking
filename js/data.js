// 'use strict';
// (function () {
// // Создаем массивы с параметрами для меток на карте и карточек товара
//   var NUMBER_AVATAR_IMG = [];
//   var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
//   var OFFER_TYPES = ['flat', 'house', 'bungalo'];
//   var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
//   var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
//   var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
//   var OFFER_PHOTOS = [];

  // Заполняем массив NUMBER_AVATAR_IMG
  // function createArrayAvatar(count) {
  //   for (var i = 0; i < count; i++) {
  //     NUMBER_AVATAR_IMG.push([i + 1]);
  //   }
  //   return NUMBER_AVATAR_IMG;
  // }
  // createArrayAvatar(8);

  // Возвращаем случайный элемент в массиве
  // function getRandomArrayIndex(arr) {
  //   return arr[Math.floor(Math.random() * arr.length)];
  // }
  //
  // // Возвращаем случайный элемент в массиве и сразу его удаляем из массива
  // function getRandomNorepeatArrayIndex(arr) {
  //   return arr.splice(Math.floor(Math.random() * arr.length), 1);
  // }
  //
  // // Возвращаем ислучайное число между min (включительно) и max (не включая max)
  // function getRandomValue(min, max) {
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }

  // Коприруем и возвращаем массив OFFER_FEATURES со случайной длиной
  // function getNewOfferFeatures() {
  //   var newOfferFeatures = OFFER_FEATURES.slice();
  //   newOfferFeatures.length = getRandomValue(1, 6);
  //   return newOfferFeatures;
  // }

  // Объявляем мвссив с данными
  // var nearbyOffers = [];
  // Заполняем массив, состоящий из 8 сгенерированных объектов:

//   function createArrayOffers(nearbyOffersCount) {
//     // Создаем обьекты с max и min координатами X и Y, ценами, количеством комнат, числом гостей
//     var coordinates = {
//       x: {
//         min: 300,
//         max: 901
//       },
//       y: {
//         min: 100,
//         max: 501
//       }
//     };
//
//     var numberOfrooms = {
//       min: 1,
//       max: 6
//     };
//
//     var numberOfguests = {
//       min: 1,
//       max: 4
//     };
//
//     var priceForRooms = {
//       min: 1000,
//       max: 1000001
//     };
//
//     for (var i = 0; i <= nearbyOffersCount - 1; i++) {
//
//       // Случайные координаты
//       var locationX = getRandomValue(coordinates.x.min, coordinates.x.max);
//       var locationY = getRandomValue(coordinates.y.min, coordinates.y.max);
//
//       nearbyOffers.push({
//         author: {
//           avatar: 'img/avatars/user0' + getRandomNorepeatArrayIndex(NUMBER_AVATAR_IMG) + '.png'
//         },
//         offer: {
//           title: getRandomNorepeatArrayIndex(OFFER_TITLES),
//           address: locationX + ', ' + locationY,
//           price: getRandomValue(priceForRooms.min, priceForRooms.max),
//           type: getRandomArrayIndex(OFFER_TYPES),
//           rooms: getRandomValue(numberOfrooms.min, numberOfrooms.max),
//           guests: getRandomValue(numberOfguests.min, numberOfguests.max),
//           checkin: getRandomArrayIndex(OFFER_CHECKIN),
//           checkout: getRandomArrayIndex(OFFER_CHECKOUT),
//           features: getNewOfferFeatures(),
//           description: '',
//           photos: OFFER_PHOTOS
//         },
//         location: {
//           x: locationX,
//           y: locationY
//         }
//       }
//       );
//     }
//     return nearbyOffers;
//   }
//
//   window.data = {
//     nearbyOffers: nearbyOffers,
//     createArrayOffers: createArrayOffers
//   };
// })();
