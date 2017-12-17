'use strict';
(function () {
  window.showCard = function () {
  // Объявляем переменные
    var mapCardClose = window.card.mapElementCard.querySelector('.popup__close');
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    // Текущий маркер
    var currentPin = false;

    // клик на пин ловим на контейнере
    function show(evt) {
      var target = evt.target;
      // цикл двигается вверх от target к родителям до pinsContainer
      while (target !== window.pin.pinsContainer) {
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

    // Навешиваем обработчики событий (открытия)
    window.pin.pinsContainer.addEventListener('click', show);
    // Закрытие карточки по нажатию мышки
    mapCardClose.addEventListener('click', onPopupCloseClick);
    // Закрытие карточки с клавиатуры
    mapCardClose.addEventListener('keydown', onPopupCloseEnterPress);
  };
})();
