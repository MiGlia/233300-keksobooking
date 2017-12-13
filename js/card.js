'use strict';
(function () {
  var mapCardPlist = mapElementCard.querySelectorAll('p');
  var mapCardUlList = mapElementCard.querySelector('.popup__features');
  // находим шаблон для карточки с предложением аренды
  var elementCardtemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapElementCard = elementCardtemplate.cloneNode(true);

  // Формирование списком удобства
  var getStringFeatures = function (elem) {
    return '<li class="feature feature--' + elem + '"></li>';
  };
  window.render = {
    // Формирование карточки объекта
    renderCardElement: function (arr) {

      mapElementCard.querySelector('h3').textContent = arr.offer.title;
      mapElementCard.querySelector('p small').textContent = arr.offer.address;
      mapElementCard.querySelector('.popup__price').textContent = arr.offer.price + String.fromCharCode(8381);
      mapElementCard.querySelector('h4').textContent = getOfferType(arr.offer.type);
      mapCardPlist[2].textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
      mapCardPlist[3].textContent = ' Заезд после ' + arr.offer.checkin + ' выезд до ' + arr.offer.checkout;
      mapElementCard.querySelector('.popup__avatar').src = arr.author.avatar;
      mapCardPlist[4].textContent = arr.offer.description;
      mapCardUlList.innerHTML = '';
      mapCardUlList.insertAdjacentHTML('afterBegin', arr.offer.features.map(getStringFeatures).join(' '));
      mapElementCard.appendChild(mapCardUlList);
      return mapElementCard;
    }
  };

  // Сравниваем и заменяем тип жилья
  function getOfferType(value) {

    switch (value) {
      case 'flat':
        var newValue = 'Квартира';
        break;
      case 'bungalo':
        newValue = 'Бунгало';
        break;
      case 'house':
        newValue = 'Дом';
        break;
    }
    return newValue;
  }
})();
