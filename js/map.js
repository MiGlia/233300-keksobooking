'use strict';
(function () {

  // Объявляем переменные
  var mainPin = window.pin.mapParamSearch.querySelector('.map__pin--main');
  var fragmentCards = document.createDocumentFragment();
  var fieldsetsList = window.form.noticeForm.querySelectorAll('fieldset');
  var pinsCount = 8;

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

  // Создаем и заполняем данными массив объектов недвижимости
  window.data.nearbyOffers = window.data.createArrayOffers(pinsCount);
  // Переносим данные из массива объектов во фрагмент с маркерами для вставки на страницу
  window.data.nearbyOffers.forEach(window.pin.renderMapPin);
  // Заполняем фрагмент данными из массива объектов для отрисовки карточки
  fragmentCards.appendChild(window.card.renderCardElement(window.data.nearbyOffers[0]));
  // Добавляем карточку недвижимости на страницу и скрываем ее
  window.pin.mapParamSearch.appendChild(fragmentCards);
  window.card.mapElementCard.classList.add('hidden');

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

  // =======================================

  var inputAddress = document.querySelector('#address');
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // начальные координаты
    var startcoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      // Смещение
      var shift = {
        x: startcoords.x - moveEvt.clientX,
        y: startcoords.y - moveEvt.clientY
      };
      // Новые начальные координаты
      startcoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      setMainPinLimitCoords();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      var addressX = mainPin.style.top;
      var addressY = mainPin.style.left;
      var houseLocation = 'x:' + addressY + ', ' + 'y:' + addressX;
      inputAddress.setAttribute('value', houseLocation);
      // удаляем обработчики события передвижения мыши и отпускания кнопки мыши
      window.pin.mapParamSearch.removeEventListener('mousemove', onMouseMove);
      window.pin.mapParamSearch.removeEventListener('mouseup', onMouseUp);

    }
    // добавляем обработчики события передвижения мыши и отпускания кнопки мыши
    window.pin.mapParamSearch.addEventListener('mousemove', onMouseMove);
    window.pin.mapParamSearch.addEventListener('mouseup', onMouseUp);

  });

  var limitCoords = {
    top: 100,
    bottom: 500
  };

  // ограничение по координатам
  function setMainPinLimitCoords() {
    if (mainPin.offsetTop < limitCoords.top) {
      mainPin.style.top = limitCoords.top + 'px';
    }
    if (mainPin.offsetTop > limitCoords.bottom) {
      mainPin.style.top = limitCoords.bottom + 'px';
    }
  }

  // функция показа карточки
  window.showCard();
})();
