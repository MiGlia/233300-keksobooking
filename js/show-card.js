'use strict';
(function () {
  // Объявляем переменные
  var mapCardClose = window.card.mapElementCard.querySelector('.popup__close');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  // Текущий маркер
  var currentPin = false;

  function showCard(elem, arrOffers, pin) {
    var clickedElement = elem;
    while (clickedElement !== pin) {
      if (clickedElement.tagName === 'BUTTON') {
        if (currentPin !== false) {
          currentPin.classList.remove('map__pin--active');
        }
        elem.classList.add('map__pin--active');
        clickedElement.classList.add('map__pin--active');
        currentPin = clickedElement;
        if (!clickedElement.classList.contains('map__pin--main')) {
          // Заполняем карточку данными из массива объектов
          window.card.renderCardElement(arrOffers[clickedElement.dataset.numPin]);
          openPopup();
        } else {
          window.card.mapElementCard.classList.add('hidden');
        }
      }
      clickedElement = clickedElement.parentNode;
    }
    return window.card.mapElementCard;
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
  window.pin.pinsContainer.addEventListener('click', showCard);
  // Закрытие карточки по нажатию мышки
  mapCardClose.addEventListener('click', onPopupCloseClick);
  // Закрытие карточки с клавиатуры
  mapCardClose.addEventListener('keydown', onPopupCloseEnterPress);
  // };

  window.showCard = {
    showCard: showCard
  };
})();
