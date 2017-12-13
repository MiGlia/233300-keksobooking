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
})();
