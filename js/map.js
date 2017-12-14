'use strict';
(function () {

  // Объявляем переменные
  var mapParamSearch = document.querySelector('.map');
  var mainPin = mapParamSearch.querySelector('.map__pin--main');
  var pinsContainer = mapParamSearch.querySelector('.map__pins');
  var fragmentCards = document.createDocumentFragment();
  var fieldsetsList = window.form.noticeForm.querySelectorAll('fieldset');
  var pinsCount = 8;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // функия акивации карты и формы
  var pageActive = function () {
    mapParamSearch.classList.remove('map--faded');
    // Добавляем маркеры на страницу
    pinsContainer.appendChild(window.pin.fragment);
    // убираем затемнение и disabled с полей
    window.form.noticeForm.classList.remove('notice__form--disabled');
    removeElementsAttribute(fieldsetsList);
  };

  // Создаем и заполняем данными массив объектов недвижимости
  window.data.nearbyOffers = window.data.createArrayOffers(pinsCount);
  // Переносим данные из массива объектов во фрагмент с маркерами для вставки на страницу
  window.data.nearbyOffers.forEach(window.pin.renderMapPin);
  // Заполняем фрагмент данными из массива объектов для отрисовки карточки
  fragmentCards.appendChild(window.card.renderCardElement(window.data.nearbyOffers[0]));
  // Добавляем карточку недвижимости на страницу и скрываем ее
  mapParamSearch.appendChild(fragmentCards);
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
          window.card.renderCardElement(window.data.nearbyOffers[target.dataset.numPin]);
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
    window.card.mapElementCard.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Закрыть карточку
  var closePopup = function () {
    window.card.mapElementCard.classList.add('hidden');
    if (currentPin !== false) {
      currentPin.classList.remove('map__pin--active');
      currentPin = false;
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var mapCardClose = window.card.mapElementCard.querySelector('.popup__close');
  // Навешиваем обработчики событий (открытия)
  pinsContainer.addEventListener('click', pinClick);
  // Закрытие карточки по нажатию мышки
  mapCardClose.addEventListener('click', onPopupCloseClick);
  // Закрытие карточки с клавиатуры
  mapCardClose.addEventListener('keydown', onPopupCloseEnterPress);
  mainPin.addEventListener('click', window.form.syncRoomsGuests);

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
      mapParamSearch.removeEventListener('mousemove', onMouseMove);
      mapParamSearch.removeEventListener('mouseup', onMouseUp);

    }
    // добавляем обработчики события передвижения мыши и отпускания кнопки мыши
    mapParamSearch.addEventListener('mousemove', onMouseMove);
    mapParamSearch.addEventListener('mouseup', onMouseUp);


  });
  // КатЯ, ПОДСКАЖИ, ПОЖАЛУЙСТА ПОЧЕМУ ТАК У МЕНЯ НЕ РАБОТАЕ, ЧТО НЕПРАВИЛЬНО?
  // var pinHeigth = 87;
  // var limitCoords = {
  //   top: 100,
  //   bottom: 500 + pinHeigth
  // };
  //
  // var mainPinCoords = mainPin.getBoundingClientRect();
  // // ограничение по координатам
  // function setMainPinLimitCoords() {
  //   if (mainPinCoords.top < limitCoords.top) {
  //     mainPin.style.top = limitCoords.top + 'px';
  //   }
  //   if (mainPinCoords.bottom > limitCoords.bottom) {
  //     mainPin.style.top = limitCoords.bottom + 'px';
  //   }
  // }

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
})();
