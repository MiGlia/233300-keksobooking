'use strict';

// Создаем массивы с параметрами для меток на карте и карточек товара
var NUMBER_AVATAR_IMG = [];
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_PHOTOS = [];

// Заполняем массив NUMBER_AVATAR_IMG
function createArrayAvatar(Count) {
  for (var i = 0; i < Count; i++) {
    NUMBER_AVATAR_IMG.push([i + 1]);
  }
  return NUMBER_AVATAR_IMG;
}
createArrayAvatar(8);

// Возвращаем случайный элемент в массиве
function getRandomArrayIndex(Array) {
  return Array[Math.floor(Math.random() * Array.length)];
}

// Возвращаем случайный элемент в массиве и сразу его удаляем из массива
function getRandomNorepeatArrayIndex(Array) {
  return Array.splice(Math.floor(Math.random() * Array.length), 1);
}

// Возвращаем ислучайное число между min (включительно) и max (не включая max)
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Коприруем и возвращаем массив OFFER_FEATURES со случайной длиной
function getNewOfferFeatures() {
  var NewOfferFeatures = OFFER_FEATURES.slice();
  NewOfferFeatures.length = getRandomValue(1, 6);
  return NewOfferFeatures;
}

// Делаем копии массивов (На всякий случай, не знаю нужно ли)
function getCloneArray(Array) {
  var сloneArray = Array.slice();
  return сloneArray;
}

var mapParamSearch = document.querySelector('.map');
mapParamSearch.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var mapPinSimilar = document.querySelector('.map__pins');

// Копируем шаблон(идеальный элемент метку с классои map__pin) и заполняем его новыми данными из сгенерированного массива offers
function renderMapPin(nearbyOffers) {

  // Учитываем размеры метки на карте
  var pinHalfWidth = 23;
  var pinHeight = 64;

  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.querySelector('img').src = nearbyOffers.author.avatar;
  mapPinElement.style.left = (nearbyOffers.location.x - pinHalfWidth) + 'px';
  mapPinElement.style.top = (nearbyOffers.location.x - pinHeight) + 'px';

  return mapPinElement;
}

// находим шаблон для карточки с предложением аренды
var ElementCardtemplate = document.querySelector('template').content.querySelector('.map__card');

// Заполняем карточки данными из массив offers
function renderCardElement(nearbyOffers) {

// копируем шаблон для карточки с предложением аренды
  var mapElementCard = ElementCardtemplate.cloneNode(true);

  function getOfferType(value) {

    switch (value) {
      case 'flat':
        var newValue = 'Квартира';
        break;
      case 'bungalo':
        newValue = 'Бунгало';
        break;
      case 'house':
        newValue = 'Дом';
        break;
    }
    return newValue;
  }

  // Находим все теги li удаляем у них классы и добавляем классы в соответствии с массивом features
  function addItemClasses(array) {

    var featureLiClass = mapElementCard.querySelectorAll('.popup__features > li');
    for (var i = 0; i < array.length; i++) {
      featureLiClass[i].remove('feature', 'feature--' + array[i]);
      featureLiClass[i].classList.add('feature');
      featureLiClass[i].classList.add('feature--' + array[i]);
    }
    return featureLiClass;
  }

  mapElementCard.querySelector('h3').textContent = nearbyOffers.offer.title;
  mapElementCard.querySelector('p small').textContent = nearbyOffers.offer.address;
  mapElementCard.querySelector('.popup__price').textContent = nearbyOffers.offer.price + String.fromCharCode(8381);
  mapElementCard.querySelector('h4').textContent = getOfferType(nearbyOffers.offer.type);
  mapElementCard.querySelector('h4 + p').textContent = nearbyOffers.offer.rooms + ' комнаты для ' + nearbyOffers.offer.guests + ' гостей';
  mapElementCard.querySelector('h4 + p + p').textContent = ' Заезд после ' + nearbyOffers.offer.checkin + ' выезд до ' + nearbyOffers.offer.checkout;
  mapElementCard.querySelectorAll('.popup__features > li').textContent = addItemClasses(nearbyOffers.offer.features);
  mapElementCard.querySelector('.popup__features + p').textContent = nearbyOffers.offer.description;
  mapElementCard.querySelector('.popup__avatar').src = nearbyOffers.author.avatar;
  return mapElementCard;
}

var nearbyOffers = [];

// Заполняем массив, состоящий из 8 сгенерированных объектов:
function createArrayOffers(nearbyOffersCount) {

  // Создаем обьекты с max и min координатами X и Y, ценами, количеством комнат, числом гостей
  var coordinates = {
    x: {
      min: 300,
      max: 901
    },
    y: {
      min: 100,
      max: 501
    }
  };

  var numberOfrooms = {
    min: 1,
    max: 6
  };

  var numberOfguests = {
    min: 1,
    max: 4
  };

  var priceForRooms = {
    min: 1000,
    max: 1000001
  };

  for (var i = 0; i <= nearbyOffersCount - 1; i++) {

    // Случайные координаты
    var locationX = getRandomValue(coordinates.x.min, coordinates.x.max);
    var locationY = getRandomValue(coordinates.y.min, coordinates.y.max);

    nearbyOffers.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomNorepeatArrayIndex(NUMBER_AVATAR_IMG) + '.png'
      },
      offer: {
        title: getRandomNorepeatArrayIndex(getCloneArray(OFFER_TITLES)),
        address: locationX + ', ' + locationY,
        price: getRandomValue(priceForRooms.min, priceForRooms.max),
        type: getRandomArrayIndex(getCloneArray(OFFER_TYPES)),
        rooms: getRandomValue(numberOfrooms.min, numberOfrooms.max),
        guests: getRandomValue(numberOfguests.min, numberOfguests.max),
        checkin: getRandomArrayIndex(getCloneArray(OFFER_CHECKIN)),
        checkout: getRandomArrayIndex(getCloneArray(OFFER_CHECKOUT)),
        features: getNewOfferFeatures(),
        description: '',
        photos: OFFER_PHOTOS
      },
      location: {
        x: locationX,
        y: locationY
      }
    }
    );
  }
}
createArrayOffers(8);

// Группируем элементы(метку с классои map__pin), Вставляем заполненные элементы в DOM и отрсовываем их
function getRenderMapPin() {

  var fragmentMapPin = document.createDocumentFragment();
  for (var i = 0; i < nearbyOffers.length; i++) {
    fragmentMapPin.appendChild(renderMapPin(nearbyOffers[i]));
  }
  mapPinSimilar.appendChild(fragmentMapPin);
}
getRenderMapPin();

// Создаем новый пустой фрагмент для карточки
var fragmentCards = document.createDocumentFragment();

// Заполняем фрагмент данными из первого обьекта массива
fragmentCards.appendChild(renderCardElement(nearbyOffers[0]));

// Добавляем карточку недвижимости на страницу
mapParamSearch.appendChild(fragmentCards);
