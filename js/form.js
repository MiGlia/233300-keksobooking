'use strict';
(function () {
// Объявляем Переменные
  var fieldsetsList = noticeForm.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.notice__form');
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
  inputPriceForNight.setAttribute('value', 1000);

  // Синхронизируем поля типа жилья и минимальной цены
  // Устанавливаем мин и мах для каждого типа
  function sincPriceToNigth() {
    switch (selectTypeOfHouse.value) {
      case 'flat':
        inputPriceForNight.setAttribute('value', 1000);
        inputPriceForNight.setAttribute('min', 1000);
        inputPriceForNight.setAttribute('max', 1000000);
        break;
      case 'bungalo':
        inputPriceForNight.setAttribute('value', 0);
        inputPriceForNight.setAttribute('min', 0);
        inputPriceForNight.setAttribute('max', 1000000);
        break;
      case 'house':
        inputPriceForNight.setAttribute('value', 5000);
        inputPriceForNight.setAttribute('min', 5000);
        inputPriceForNight.setAttribute('max', 1000000);
        break;
      case 'palace':
        inputPriceForNight.setAttribute('value', 10000);
        inputPriceForNight.setAttribute('min', 10000);
        inputPriceForNight.setAttribute('max', 1000000);
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

})();
