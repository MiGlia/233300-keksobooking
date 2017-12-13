'use strict';
(function () {
// // Создаем массивы с параметрами для меток на карте и карточек товара
// var NUMBER_AVATAR_IMG = [];
// var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
// var OFFER_TYPES = ['flat', 'house', 'bungalo'];
// var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
// var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
// var OFFER_PHOTOS = [];
// var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;
// var pinsCount = 8;
//
// // Заполняем массив NUMBER_AVATAR_IMG
// function createArrayAvatar(count) {
//   for (var i = 0; i < count; i++) {
//     NUMBER_AVATAR_IMG.push([i + 1]);
//   }
//   return NUMBER_AVATAR_IMG;
// }
// createArrayAvatar(8);
//
// // Возвращаем случайный элемент в массиве
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
//
// // Коприруем и возвращаем массив OFFER_FEATURES со случайной длиной
// function getNewOfferFeatures() {
//   var newOfferFeatures = OFFER_FEATURES.slice();
//   newOfferFeatures.length = getRandomValue(1, 6);
//   return newOfferFeatures;
// }
  // var fragment = document.createDocumentFragment();
  var mapParamSearch = document.querySelector('.map');
  // var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');


  // // Копируем шаблон(идеальный элемент метку с классои map__pin) и заполняем его новыми данными из сгенерированного массива offers
  // function renderMapPin(nearbyOffers, i) {
  //
  // // Учитываем размеры метки на карте
  //   var pinHalfWidth = 23;
  //   var pinHeight = 64;
  //
  //   var mapPinElement = mapPinTemplate.cloneNode(true);
  //
  //   mapPinElement.querySelector('img').src = nearbyOffers.author.avatar;
  //   mapPinElement.style.left = (nearbyOffers.location.x - pinHalfWidth) + 'px';
  //   mapPinElement.style.top = (nearbyOffers.location.y - pinHeight) + 'px';
  //   mapPinElement.dataset.numPin = i;
  //   fragment.appendChild(mapPinElement);
  //   return mapPinElement;
  // }

  // // находим шаблон для карточки с предложением аренды
  // var elementCardtemplate = document.querySelector('template').content.querySelector('.map__card');
  // Объявляем Массив объектов недвижимости
  // var nearbyOffers = [];

  // // Сравниваем и заменяем тип жилья
  // function getOfferType(value) {
  //
  //   switch (value) {
  //     case 'flat':
  //       var newValue = 'Квартира';
  //       break;
  //     case 'bungalo':
  //       newValue = 'Бунгало';
  //       break;
  //     case 'house':
  //       newValue = 'Дом';
  //       break;
  //   }
  //   return newValue;
  // }

  // var mapElementCard = elementCardtemplate.cloneNode(true);
  // var mapCardPlist = mapElementCard.querySelectorAll('p');
  // var mapCardUlList = mapElementCard.querySelector('.popup__features');
  //
  // // Формирование списком удобства
  // var getStringFeatures = function (elem) {
  //   return '<li class="feature feature--' + elem + '"></li>';
  // };
  //
  // // Заполняем массив, состоящий из 8 сгенерированных объектов:
  // function createArrayOffers(nearbyOffersCount) {
  //
  //   // Создаем обьекты с max и min координатами X и Y, ценами, количеством комнат, числом гостей
  //   var coordinates = {
  //     x: {
  //       min: 300,
  //       max: 901
  //     },
  //     y: {
  //       min: 100,
  //       max: 501
  //     }
  //   };
  //
  //   var numberOfrooms = {
  //     min: 1,
  //     max: 6
  //   };
  //
  //   var numberOfguests = {
  //     min: 1,
  //     max: 4
  //   };
  //
  //   var priceForRooms = {
  //     min: 1000,
  //     max: 1000001
  //   };
  //
  //   for (var i = 0; i <= nearbyOffersCount - 1; i++) {
  //
  //     // Случайные координаты
  //     var locationX = getRandomValue(coordinates.x.min, coordinates.x.max);
  //     var locationY = getRandomValue(coordinates.y.min, coordinates.y.max);
  //
  //     nearbyOffers.push({
  //       author: {
  //         avatar: 'img/avatars/user0' + getRandomNorepeatArrayIndex(NUMBER_AVATAR_IMG) + '.png'
  //       },
  //       offer: {
  //         title: getRandomNorepeatArrayIndex(OFFER_TITLES),
  //         address: locationX + ', ' + locationY,
  //         price: getRandomValue(priceForRooms.min, priceForRooms.max),
  //         type: getRandomArrayIndex(OFFER_TYPES),
  //         rooms: getRandomValue(numberOfrooms.min, numberOfrooms.max),
  //         guests: getRandomValue(numberOfguests.min, numberOfguests.max),
  //         checkin: getRandomArrayIndex(OFFER_CHECKIN),
  //         checkout: getRandomArrayIndex(OFFER_CHECKOUT),
  //         features: getNewOfferFeatures(),
  //         description: '',
  //         photos: OFFER_PHOTOS
  //       },
  //       location: {
  //         x: locationX,
  //         y: locationY
  //       }
  //     }
  //     );
  //   }
  //   return nearbyOffers;
  // }
  // // Формирование карточки объекта
  // function renderCardElement(arr) {
  //
  //   mapElementCard.querySelector('h3').textContent = arr.offer.title;
  //   mapElementCard.querySelector('p small').textContent = arr.offer.address;
  //   mapElementCard.querySelector('.popup__price').textContent = arr.offer.price + String.fromCharCode(8381);
  //   mapElementCard.querySelector('h4').textContent = getOfferType(arr.offer.type);
  //   mapCardPlist[2].textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  //   mapCardPlist[3].textContent = ' Заезд после ' + arr.offer.checkin + ' выезд до ' + arr.offer.checkout;
  //   mapElementCard.querySelector('.popup__avatar').src = arr.author.avatar;
  //   mapCardPlist[4].textContent = arr.offer.description;
  //   mapCardUlList.innerHTML = '';
  //   mapCardUlList.insertAdjacentHTML('afterBegin', arr.offer.features.map(getStringFeatures).join(' '));
  //   mapElementCard.appendChild(mapCardUlList);
  //   return mapElementCard;
  // }

  // Переменные
  // var noticeForm = document.querySelector('.notice__form');
  var mainPin = mapParamSearch.querySelector('.map__pin--main');
  var pinsContainer = mapParamSearch.querySelector('.map__pins');
  var mapCardClose = mapElementCard.querySelector('.popup__close');
  var fragmentCards = document.createDocumentFragment();

  // // Добавление всем 'fieldset' атрибут disabled
  // function addElementsAttribute(arr) {
  //   for (var i = 0; i < arr.length; i++) {
  //     arr[i].disabled = true;
  //   }
  // }
  // addElementsAttribute(fieldsetsList);
  //
  // // Убтраем атрибут disabled 'fieldset'
  // function removeElementsAttribute(arr) {
  //   for (var i = 0; i < arr.length; i++) {
  //     arr[i].disabled = false;
  //   }
  // }

  // функия акивации карты и формы
  var pageActive = function () {
    mapParamSearch.classList.remove('map--faded');
    // Добавляем маркеры на страницу
    pinsContainer.appendChild(fragment);
    // убираем затемнение и disabled с полей
    noticeForm.classList.remove('notice__form--disabled');
    removeElementsAttribute(fieldsetsList);
  };

  // Создаем и заполняем данными массив объектов недвижимости
  nearbyOffers = createArrayOffers(pinsCount);
  // Переносим данные из массива объектов во фрагмент с маркерами для вставки на страницу
  nearbyOffers.forEach(renderMapPin);
  // Заполняем фрагмент данными из массива объектов для отрисовки карточки
  fragmentCards.appendChild(window.render.renderCardElement(nearbyOffers[0]));
  // Добавляем карточку недвижимости на страницу и скрываем ее
  mapParamSearch.appendChild(fragmentCards);
  mapElementCard.classList.add('hidden');

  // акивации карты и формы после отжаития клавиши мыши
  mainPin.addEventListener('mouseup', function () {
    pageActive();
  });

  // Добавление всем 'fieldset' атрибут disabled
  function addElementsAttribute(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  }
  addElementsAttribute(fieldsetsList);

  // Убтраем атрибут disabled 'fieldset'
  function removeElementsAttribute(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  }


  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  // Текущий маркер
  var currentPin = false;
  // клик на пин ловим на контейнере
  function pinClick(evt) {
    var target = evt.target;
    // цикл двигается вверх от target к родителям до pinsContainer
    while (target !== pinsContainer) {
      if (target.tagName === 'BUTTON') {
        if (currentPin !== false) {
          currentPin.classList.remove('map__pin--active');
        }
        target.classList.add('map__pin--active');
        currentPin = target;
        if (!target.classList.contains('map__pin--main')) {
        // Заполняем карточку данными из массива объектов
          window.render.renderCardElement(nearbyOffers[target.dataset.numPin]);
          openPopup();
        }
        return;
      }
      target = target.parentNode;
    }
  }

  // Реакция на нажатие ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  // Закрыть карточку мышкой
  var onPopupCloseClick = function () {
    closePopup();
  };

  // Закрыть карточку с клавиатуры
  var onPopupCloseEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  };

  // Открыть карточку с клавиатуры
  var openPopup = function () {
    mapElementCard.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Закрыть карточку
  var closePopup = function () {
    mapElementCard.classList.add('hidden');
    if (currentPin !== false) {
      currentPin.classList.remove('map__pin--active');
      currentPin = false;
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // Навешиваем обработчики событий (открытия)
  pinsContainer.addEventListener('click', pinClick);
  // Закрытие карточки по нажатию мышки
  mapCardClose.addEventListener('click', onPopupCloseClick);
  // Закрытие карточки с клавиатуры
  mapCardClose.addEventListener('keydown', onPopupCloseEnterPress);


// // Объявляем Переменные
// var selectChcekIn = noticeForm.querySelector('#timein');
// var selectChcekOut = noticeForm.querySelector('#timeout');
// var inputPriceForNight = noticeForm.querySelector('#price');
// var selectTypeOfHouse = noticeForm.querySelector('#type');
// var selectRoomNumber = noticeForm.querySelector('#room_number');
// var numberOfRooms = noticeForm.elements.rooms;
// var numberOfBedrooms = noticeForm.elements.capacity;
// var inputTitleOffer = noticeForm.querySelector('#title');
//
// // Синхронизируем времяя заезда-время выезда
// function syncCheckInOut(chcekInValue, chcekOutValue) {
//   switch (chcekInValue.value) {
//     case '12:00':
//       chcekOutValue.value = chcekInValue.value;
//       break;
//     case '13:00':
//       chcekOutValue.value = chcekInValue.value;
//       break;
//     case '14:00':
//       chcekOutValue.value = chcekInValue.value;
//       break;
//   }
// }
//
// // Сброс значения минимальной цены
// inputPriceForNight.setAttribute('value', 1000);
//
// // Синхронизируем поля типа жилья и минимальной цены
// // Устанавливаем мин и мах для каждого типа
// function sincPriceToNigth() {
//   switch (selectTypeOfHouse.value) {
//     case 'flat':
//       inputPriceForNight.setAttribute('value', 1000);
//       inputPriceForNight.setAttribute('min', 1000);
//       inputPriceForNight.setAttribute('max', 1000000);
//       break;
//     case 'bungalo':
//       inputPriceForNight.setAttribute('value', 0);
//       inputPriceForNight.setAttribute('min', 0);
//       inputPriceForNight.setAttribute('max', 1000000);
//       break;
//     case 'house':
//       inputPriceForNight.setAttribute('value', 5000);
//       inputPriceForNight.setAttribute('min', 5000);
//       inputPriceForNight.setAttribute('max', 1000000);
//       break;
//     case 'palace':
//       inputPriceForNight.setAttribute('value', 10000);
//       inputPriceForNight.setAttribute('min', 10000);
//       inputPriceForNight.setAttribute('max', 1000000);
//       break;
//   }
// }
//
// // Сбрасываем атрибуты disabled и selected при каждом именении options. Проверяем на наличие атрибута disabled и selected
// function setAllOptions() {
//   for (var j = 0; j < numberOfRooms.options.length; j++) {
//     if (numberOfBedrooms.options[j].hasAttribute('disabled', 'disabled')) {
//       numberOfBedrooms.options[j].removeAttribute('disabled', false);
//     }
//     if (numberOfBedrooms.options[j].hasAttribute('selected', true)) {
//       numberOfBedrooms.options[j].removeAttribute('selected');
//     }
//   }
// }
//
// //  Сравниваем атрибут value комнат, если равны то добавляем атрибут disabled
// // 1 комната — «для одного гостя»
// // 2 комнаты — «для 2-х или 1-го гостя»
// // 3 комнаты — «для 2-х, 1-го или 3-х гостей»
// // 100 комнат — «не для гостей»
// function syncRoomsGuests() {
//   setAllOptions();
//   switch (numberOfRooms.value) {
//     case '1':
//       numberOfBedrooms.options[0].disabled = true;
//       numberOfBedrooms.options[1].disabled = true;
//       numberOfBedrooms.options[3].disabled = true;
//       numberOfBedrooms.options[2].selected = true;
//       break;
//     case '2':
//       numberOfBedrooms.options[0].disabled = true;
//       numberOfBedrooms.options[3].disabled = true;
//       numberOfBedrooms.options[2].selected = true;
//       break;
//     case '3':
//       numberOfBedrooms.options[3].disabled = true;
//       numberOfBedrooms.options[2].selected = true;
//       break;
//     case '100':
//       numberOfBedrooms.options[0].disabled = true;
//       numberOfBedrooms.options[1].disabled = true;
//       numberOfBedrooms.options[2].disabled = true;
//       numberOfBedrooms.options[3].selected = true;
//       break;
//   }
// }
// // Проверка введенной заголовка на валидность
// var onInvalidInput = function () {
//   if (inputTitleOffer.validity.tooShort) {
//     inputTitleOffer.setCustomValidity('Заголовок должен быть не менее 30-ти символов');
//   } else if (inputTitleOffer.validity.tooLong) {
//     inputTitleOffer.setCustomValidity('Заголовок не должен превышать длинну в 100 символов');
//   } else if (inputTitleOffer.validity.valueMissing) {
//     inputTitleOffer.setCustomValidity('Обязательное поле');
//   } else {
//     inputTitleOffer.setCustomValidity('');
//   }
// };
//
// // Проверка введенной суммы на валидность
// var onInvalidInputPrice = function () {
//   if (inputPriceForNight.validity.rangeUnderflow) {
//     inputPriceForNight.setCustomValidity('Стоимость жилья не может быть ниже рекомендованной');
//   } else if (inputPriceForNight.validity.rangeOverflow) {
//     inputPriceForNight.setCustomValidity('Цена не должна превышать 1 000 000');
//   } else if (inputPriceForNight.validity.valueMissing) {
//     inputPriceForNight.setCustomValidity('Пожалуйста, введите цену');
//   } else {
//     inputPriceForNight.setCustomValidity('');
//   }
// };
//
// // Создаем объект с функциями на валидность форм
// var ValidationTargets = {
//   'title': onInvalidInput,
//   'price': onInvalidInputPrice
// };
//
// // обрабочик на валидноси функций onInvalidInputPrice и onInvalidInput(красная линия)
// noticeForm.addEventListener('invalid', function (evt) {
//   ValidationTargets[evt.target.id](evt.target);
//   evt.target.style.border = '2px solid red';
// }, true);
// inputTitleOffer.addEventListener('invalid', onInvalidInput);
// // оработчик Изменнеия соответствия времени и цены
// selectChcekIn.addEventListener('change', function () {
//   syncCheckInOut(selectChcekIn, selectChcekOut);
// });
// selectChcekOut.addEventListener('change', function () {
//   syncCheckInOut(selectChcekOut, selectChcekIn);
// });
// selectTypeOfHouse.addEventListener('change', sincPriceToNigth);
// // проверка ввода минимальной цены
// inputPriceForNight.addEventListener('invalid', onInvalidInputPrice);
// selectRoomNumber.addEventListener('change', syncRoomsGuests);
// // навесил обработчик, чтобы синкронизация гостей и комнат была сразу
// mainPin.addEventListener('click', syncRoomsGuests);
})();
