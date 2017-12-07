'use strict';

// Создаем массивы с параметрами для меток на карте и карточек товара
var NUMBER_AVATAR_IMG = [];
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_PHOTOS = [];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Заполняем массив NUMBER_AVATAR_IMG
function createArrayAvatar(count) {
  for (var i = 0; i < count; i++) {
    NUMBER_AVATAR_IMG.push([i + 1]);
  }
  return NUMBER_AVATAR_IMG;
}
createArrayAvatar(8);

// Возвращаем случайный элемент в массиве
function getRandomArrayIndex(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Возвращаем случайный элемент в массиве и сразу его удаляем из массива
function getRandomNorepeatArrayIndex(arr) {
  return arr.splice(Math.floor(Math.random() * arr.length), 1);
}

// Возвращаем ислучайное число между min (включительно) и max (не включая max)
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Коприруем и возвращаем массив OFFER_FEATURES со случайной длиной
function getNewOfferFeatures() {
  var newOfferFeatures = OFFER_FEATURES.slice();
  newOfferFeatures.length = getRandomValue(1, 6);
  return newOfferFeatures;
}

var mapParamSearch = document.querySelector('.map');

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
  mapPinElement.style.top = (nearbyOffers.location.y - pinHeight) + 'px';

  return mapPinElement;
}

// находим шаблон для карточки с предложением аренды
var elementCardtemplate = document.querySelector('template').content.querySelector('.map__card');

// Заполняем карточки данными из массив offers
function renderCardElement(nearbyOffers) {

// копируем шаблон для карточки с предложением аренды
  var mapElementCard = elementCardtemplate.cloneNode(true);

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
  function addItemClasses(arr) {

    var featureLiClass = mapElementCard.querySelectorAll('.popup__features > li');
    for (var i = 0; i < arr.length; i++) {
      featureLiClass[i].remove('feature', 'feature--' + arr[i]);
      featureLiClass[i].classList.add('feature');
      featureLiClass[i].classList.add('feature--' + arr[i]);
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
        title: getRandomNorepeatArrayIndex(OFFER_TITLES),
        address: locationX + ', ' + locationY,
        price: getRandomValue(priceForRooms.min, priceForRooms.max),
        type: getRandomArrayIndex(OFFER_TYPES),
        rooms: getRandomValue(numberOfrooms.min, numberOfrooms.max),
        guests: getRandomValue(numberOfguests.min, numberOfguests.max),
        checkin: getRandomArrayIndex(OFFER_CHECKIN),
        checkout: getRandomArrayIndex(OFFER_CHECKOUT),
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
var fragmentMapPin = document.createDocumentFragment();

// Создаем новый пустой фрагмент для карточки
var fragmentCards = document.createDocumentFragment();

// Заполняем фрагмент данными из первого обьекта массива
function addDateToCard() {
  for (var i = 0; i < nearbyOffers.length; i++) {
    fragmentCards.appendChild(renderCardElement(nearbyOffers[i]));
  }
}
addDateToCard();

// Группируем элементы(метку с классои map__pin) и вставляем во фрагмент
function getRenderMapPin() {
  for (var i = 0; i < nearbyOffers.length; i++) {
    fragmentMapPin.appendChild(renderMapPin(nearbyOffers[i]));
  }
}
getRenderMapPin();

var noticeForm = document.querySelector('.notice__form');
var fieldsetsList = noticeForm.querySelectorAll('fieldset');
var mainPin = mapParamSearch.querySelector('.map__pin--main');

// Добавление всем 'fieldset' атрибут disabled
function addElementsAttribute(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = true;
  }
}

addElementsAttribute(fieldsetsList);

function removeElementsAttribute(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = false;
  }
}

// Добавляем карточку недвижимости на страницу.
mapParamSearch.appendChild(fragmentCards);

// Находим все карточки товаров и добавляем им класс hidden
var cardsList = mapParamSearch.querySelectorAll('.popup');

function addElementsClass(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].classList.add('hidden');
  }
}
addElementsClass(cardsList);

// функия акивации карты и формы
function mapActive() {
  mapParamSearch.classList.remove('map--faded');
  removeElementsAttribute(fieldsetsList);
  noticeForm.classList.remove('notice__form--disabled');
  // вставляем карточки и метки на страницу
  mapPinSimilar.appendChild(fragmentMapPin);
  mapParamSearch.appendChild(fragmentCards);
}

// акивации карты и формы после отжаития клавиши мыши
mainPin.addEventListener('mouseup', function () {
  mapActive();
}
);

// находим все метки '.map__pin'
var mapPinsList = fragmentMapPin.querySelectorAll('.map__pin');

// Открытие\закрытие карточек предложений (если обрабатывается событие на элемент[i], и не на главной метке, то..)
function openPopup(evt) {
  for (var i = 0; i < mapPinsList.length; i++) {
    if (evt.currentTarget === mapPinsList[i] && evt.currentTarget !== mainPin) {
      mapPinsList[i].classList.add('map__pin--active');
      cardsList[i].classList.remove('hidden');
    }
    // убираем классы pin--active с другой метки и скрываем карточку не активного элемента
    if (evt.currentTarget !== mapPinsList[i]) {
      mapPinsList[i].classList.remove('map__pin--active');
      cardsList[i].classList.add('hidden');
    }
    document.addEventListener('keydown', onPopupEscPress);
  }
}

// При закрытии если метка содержит класс 'map__pin--active' убираем ее, карточку товара скрываем
function closePopup() {
  for (var i = 0; i < mapPinsList.length; i++) {
    if (mapPinsList[i].classList.contains('map__pin--active')) {
      cardsList[i].classList.add('hidden');
      mapPinsList[i].classList.remove('map__pin--active');
    }
  }
  document.removeEventListener('keydown', onPopupEscPress);
}

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

// Навешиваем обработчики событий(я оставил в цикле, работает) (Но, если нельзя придется фунуции открытия закрыти как я понимаю переделывать:( )))
for (var i = 0; i < mapPinsList.length; i++) {
  var popupClose = cardsList[i].querySelector('.popup__close');
  mapPinsList[i].addEventListener('click', openPopup);
  popupClose.addEventListener('click', closePopup);
  popupClose.addEventListener('keydown', onPopupEnterPress);
}

// Объявляем Переменные
var selectChcekIn = noticeForm.querySelector('#timein');
var selectChcekOut = noticeForm.querySelector('#timeout');
var inputPriceForNight = noticeForm.querySelector('#price');
var selectTypeOfHouse = noticeForm.querySelector('#type');
var selectRoomNumber = noticeForm.querySelector('#room_number');
var numberOfRooms = noticeForm.elements.rooms;
var numberOfBedrooms = noticeForm.elements.capacity;
var inputTitleOffer = noticeForm.querySelector('#title');

// Синхронизируем времяя заезда-время выезда
function syncCheckInOut(chcekInValue, chcekOutValue) {
  switch (chcekInValue.value) {
    case '12:00':
      chcekOutValue.value = chcekInValue.value;
      break;
    case '13:00':
      chcekOutValue.value = chcekInValue.value;
      break;
    case '14:00':
      chcekOutValue.value = chcekInValue.value;
      break;
  }
}

// Сброс значения минимальной цены
inputPriceForNight.setAttribute('value', 0);

// Синхронизируем поля типа жилья и минимальной цены
function sincPriceToNigth() {
  switch (selectTypeOfHouse.value) {
    case 'flat':
      inputPriceForNight.setAttribute('value', 0);
      break;
    case 'bungalo':
      inputPriceForNight.setAttribute('value', 1000);
      break;
    case 'house':
      inputPriceForNight.setAttribute('value', 5000);
      break;
    case 'palace':
      inputPriceForNight.setAttribute('value', 10000);
      break;
  }
}

// Сбрасываем атрибуты disabled и selected при каждом именении options. Проверяем на наличие атрибута disabled и selected
function setAllOptions() {
  for (var j = 0; j < numberOfRooms.options.length; j++) {
    if (numberOfBedrooms.options[j].hasAttribute('disabled', 'disabled')) {
      numberOfBedrooms.options[j].removeAttribute('disabled', false);
    }
    if (numberOfBedrooms.options[j].hasAttribute('selected', true)) {
      numberOfBedrooms.options[j].removeAttribute('selected');
    }
  }
}

//  Сравниваем атрибут value комнат, если равны то добавляем атрибут disabled
// 1 комната — «для одного гостя»
// 2 комнаты — «для 2-х или 1-го гостя»
// 3 комнаты — «для 2-х, 1-го или 3-х гостей»
// 100 комнат — «не для гостей»
function syncRoomsGuests() {
  setAllOptions();
  switch (numberOfRooms.value) {
    case '1':
      numberOfBedrooms.options[0].disabled = true;
      numberOfBedrooms.options[1].disabled = true;
      numberOfBedrooms.options[3].disabled = true;
      numberOfBedrooms.options[2].selected = true;
      break;
    case '2':
      numberOfBedrooms.options[0].disabled = true;
      numberOfBedrooms.options[3].disabled = true;
      numberOfBedrooms.options[2].selected = true;
      break;
    case '3':
      numberOfBedrooms.options[3].disabled = true;
      numberOfBedrooms.options[2].selected = true;
      break;
    case '100':
      numberOfBedrooms.options[0].disabled = true;
      numberOfBedrooms.options[1].disabled = true;
      numberOfBedrooms.options[2].disabled = true;
      numberOfBedrooms.options[3].selected = true;
      break;
  }
}

// Выделение красным цветом рамки поля при ошибочном вводе
var setBorderColor = function (elem) {
  elem.style.borderWidth = '2px';
  elem.style.borderColor = 'red';
};

// Сброс красной рамки
var resetBorderColor = function (elem) {
  elem.style.borderWidth = '';
  elem.style.borderColor = '';
};

var onInvalidInput = function () {
  setBorderColor(inputTitleOffer);
  if (inputTitleOffer.validity.tooShort) {
    inputTitleOffer.setCustomValidity('Заголовок должен быть не менее 30-ти символов');
  } else if (inputTitleOffer.validity.tooLong) {
    inputTitleOffer.setCustomValidity('Заголовок не должен превышать длинну в 100 символов');
  } else if (inputTitleOffer.validity.valueMissing) {
    inputTitleOffer.setCustomValidity('Обязательное поле');
  } else {
    inputTitleOffer.setCustomValidity('');
    resetBorderColor(inputTitleOffer);
  }
};

// Проверка введенной суммы на валидность
var onInvalidInputPrice = function () {
  setBorderColor(inputPriceForNight);
  if (inputPriceForNight.validity.rangeUnderflow) {
    inputPriceForNight.setCustomValidity('Стоимость жилья не может быть ниже рекомендованной');
  } else if (inputPriceForNight.validity.rangeOverflow) {
    inputPriceForNight.setCustomValidity('Цена не должна превышать 1 000 000');
  } else if (inputPriceForNight.validity.valueMissing) {
    inputPriceForNight.setCustomValidity('Пожалуйста, введите цену');
  } else {
    inputPriceForNight.setCustomValidity('');
    resetBorderColor(inputPriceForNight);
  }
};

// Навешиваем обработчики событий
// проверка ввода заголовка
inputTitleOffer.addEventListener('invalid', onInvalidInput);
// оработчик Изменнеия соответствия времени и цены
selectChcekIn.addEventListener('change', function () {
  syncCheckInOut(selectChcekIn, selectChcekOut);
});
selectChcekOut.addEventListener('change', function () {
  syncCheckInOut(selectChcekOut, selectChcekIn);
});
selectTypeOfHouse.addEventListener('change', sincPriceToNigth);
// проверка ввода минимальной цены
inputPriceForNight.addEventListener('invalid', onInvalidInputPrice);
selectRoomNumber.addEventListener('change', syncRoomsGuests);
