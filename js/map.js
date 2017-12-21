'use strict';
(function () {

  // Объявляем переменные
  var fieldsetsList = window.form.noticeForm.querySelectorAll('fieldset');
  var nearbyOffers = [];

  // функия акивации карты и формы
  var pageActive = function () {
    window.pin.mapParamSearch.classList.remove('map--faded');
    // Добавляем маркеры на страницу
    window.pin.pinsContainer.appendChild(window.pin.fragment);
    // убираем затемнение и disabled с полей
    window.form.noticeForm.classList.remove('notice__form--disabled');
    removeElementsAttribute(fieldsetsList);
    window.form.syncRoomsGuests();
  };
  // Успешная загрузка
  var successHandler = function (arrData) {
    arrData.forEach(window.pin.renderMapPin, window.pin.fragment);
    nearbyOffers = arrData;
  };
  // загрузка данных с сервера
  window.backend.load(successHandler, window.backend.errorHandler);
  // нажатие на метку открытие карточки
  var onPinClick = function (evt) {
    window.showCard.showCard(evt.target, nearbyOffers, window.pin.pinsContainer);
  };

  // акивации карты и формы после отжаития клавиши мыши
  window.mainPin.mainPin.addEventListener('mouseup', function () {
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
  // добавим карточку и на карту и скроем ее
  window.pin.mapParamSearch.appendChild(window.showCard.showCard(window.mainPin.mainPin, nearbyOffers[0], window.pin.pinsContainer));
  // обработчик на нажатие пина и окрытие карточки
  window.pin.pinsContainer.addEventListener('click', onPinClick);

})();
