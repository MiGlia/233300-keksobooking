'use strict';
(function () {
// Объявляем Переменные
  var noticeForm = document.querySelector('.notice__form');
  var selectChcekIn = noticeForm.querySelector('#timein');
  var selectChcekOut = noticeForm.querySelector('#timeout');
  var inputPriceForNight = noticeForm.querySelector('#price');
  var selectTypeOfHouse = noticeForm.querySelector('#type');
  var numberOfRooms = noticeForm.elements.rooms;
  var numberOfBedrooms = noticeForm.elements.capacity;
  var inputTitleOffer = noticeForm.querySelector('#title');
  var TYPES_OF_HOUSES = ['bungalo', 'flat', 'house', 'palace'];
  var MIN_PRICES = [0, 1000, 5000, 10000];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];

  // функции для синхронизации
  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

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

  // сброс данных при успешной отправуе
  function formReset() {
    inputTitleOffer.value = 'Милая, уютная квартирка в центре Токио';
    window.mainPin.inputAddress.value = window.mainPin.mainPin.value;
    selectTypeOfHouse.value = 'flat';
    inputPriceForNight.value = '1000';
    selectChcekIn.value = '12:00';
    selectChcekOut.value = '12:00';
    numberOfRooms.value = '1';
    numberOfBedrooms.value = '1';
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
  // Проверка введенной заголовка на валидность
  var onInvalidInput = function () {
    if (inputTitleOffer.validity.tooShort) {
      inputTitleOffer.setCustomValidity('Заголовок должен быть не менее 30-ти символов');
    } else if (inputTitleOffer.validity.tooLong) {
      inputTitleOffer.setCustomValidity('Заголовок не должен превышать длинну в 100 символов');
    } else if (inputTitleOffer.validity.valueMissing) {
      inputTitleOffer.setCustomValidity('Обязательное поле');
    } else {
      inputTitleOffer.setCustomValidity('');
    }
  };

  // Проверка введенной суммы на валидность
  var onInvalidInputPrice = function () {
    if (inputPriceForNight.validity.rangeUnderflow) {
      inputPriceForNight.setCustomValidity('Стоимость жилья не может быть ниже рекомендованной');
    } else if (inputPriceForNight.validity.rangeOverflow) {
      inputPriceForNight.setCustomValidity('Цена не должна превышать 1 000 000');
    } else if (inputPriceForNight.validity.valueMissing) {
      inputPriceForNight.setCustomValidity('Пожалуйста, введите цену');
    } else {
      inputPriceForNight.setCustomValidity('');
    }
  };

  // обработчик отправка данных на сервер
  noticeForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(noticeForm), formReset, window.backend.errorHandler);
    evt.preventDefault();
  });

  // Создаем объект с функциями на валидность форм
  var ValidationTargets = {
    'title': onInvalidInput,
    'price': onInvalidInputPrice
  };

  // обрабочик на валидноси функций onInvalidInputPrice и onInvalidInput(красная линия)
  noticeForm.addEventListener('invalid', function (evt) {
    ValidationTargets[evt.target.id](evt.target);
    evt.target.style.border = '2px solid red';
  }, true);
  inputTitleOffer.addEventListener('invalid', onInvalidInput);
  // Обработчики на Синхронизацию времени заезда-время
  //  поля типа жилья и минимальной цены
  selectChcekIn.addEventListener('change', function () {
    window.synchronizeFields(selectChcekIn, selectChcekOut, CHECK_TIMES, CHECK_TIMES, syncValues);
  });
  selectChcekOut.addEventListener('change', function () {
    window.synchronizeFields(selectChcekOut, selectChcekIn, CHECK_TIMES, CHECK_TIMES, syncValues);
  });
  selectTypeOfHouse.addEventListener('change', function () {
    window.synchronizeFields(selectTypeOfHouse, inputPriceForNight, TYPES_OF_HOUSES, MIN_PRICES, syncValueWithMin);
  });
  selectTypeOfHouse.addEventListener('change', function () {
    window.synchronizeFields(selectTypeOfHouse, inputPriceForNight, TYPES_OF_HOUSES, MIN_PRICES, syncValues);
  });

  // проверка ввода минимальной цены
  inputPriceForNight.addEventListener('invalid', onInvalidInputPrice);
  numberOfRooms.addEventListener('change', syncRoomsGuests);

  window.form = {
    noticeForm: noticeForm,
    syncRoomsGuests: syncRoomsGuests
  };
})();
