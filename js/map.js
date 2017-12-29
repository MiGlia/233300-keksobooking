'use strict';
(function () {

// Объявляем переменные
  var fieldsetsList = window.form.noticeForm.querySelectorAll('fieldset');
  // var nearbyOffers = [];
  var filterHousing = document.querySelector('.map__filters');

  // функия акивации карты и формы
  var pageActive = function () {
    window.pin.mapParamSearch.classList.remove('map--faded');
    // Добавляем маркеры на страницу
    window.pin.pinsContainer.appendChild(window.pin.fragment);
    // убираем затемнение и disabled с полей
    window.form.noticeForm.classList.remove('notice__form--disabled');
    fieldsetsList.forEach(removeElementsAttribute);
    window.form.syncRoomsGuests();
  };

  // Успешная загрузка
  var successHandler = function (arrData) {
    arrData.slice(0, 5).forEach(window.pin.renderMapPin, window.pin.fragment);
    nearbyOffers = arrData;
  };

  // загрузка данных с сервера
  window.backend.load(successHandler, window.backend.errorHandler);

  // нажатие на метку открытие карточки
  var onPinClick = function (evt) {
    window.showCard.showCard(evt.target, window.pin.pinsContainer);
  };

  // акивации карты и формы после отжаития клавиши мыши
  window.mainPin.mainPin.addEventListener('mouseup', function () {
    pageActive();
  });

  // Добавление всем 'fieldset' атрибут disabled
  function addElementsAttribute(arr) {
    arr.disabled = true;
  }
  fieldsetsList.forEach(addElementsAttribute);
  // Убтраем атрибут disabled 'fieldset'
  function removeElementsAttribute(arr) {
    arr.disabled = false;
  }

  // Функция очистки контейнера с маркерами
  var clearMap = function () {
    while (window.pin.pinsContainer.childElementCount > 2) {
      window.pin.pinsContainer.removeChild(window.pin.pinsContainer.lastChild);
    }
  };

  // Событие изменения фильтра
  var onFilterHousingClick = function () {
    // var arrTemp = nearbyOffers.slice();
    // arrTemp = window.filterMap.getFilter(arrTemp);
    // Формируем маркеры для отфильтрованного списка
    window.filterMap.arrTemp.forEach(window.pin.renderMapPin, window.pin.fragment);
    // Очищаем контейнер с пинами от предыдущего результата
    clearMap();
    // Добавляем маркеры на страницу
    window.pin.pinsContainer.appendChild(window.pin.fragment);
  };

  // добавим карточку и на карту и скроем ее
  window.pin.mapParamSearch.appendChild(window.showCard.showCard(window.mainPin.mainPin, window.pin.pinsContainer));
  // обработчик на нажатие пина и окрытие карточки
  window.pin.pinsContainer.addEventListener('click', onPinClick);
  filterHousing.addEventListener('click', onFilterHousingClick);


})();
