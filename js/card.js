'use strict';
(function () {
// Объявляем переменные
  var elementCardtemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapElementCard = elementCardtemplate.cloneNode(true);

  // Формирование списком удобства
  var getStringFeatures = function (elem) {
    return '<li class="feature feature--' + elem + '"></li>';
  };
  // Формирование фото предложений
  var getStringPicture = function (elem) {
    return '<li><img src="' + elem + '"></li>';
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


  function renderCardElement(arr) {
    var mapCardPlist = mapElementCard.querySelectorAll('p');
    var mapCardUlList = mapElementCard.querySelector('.popup__features');
    var mapCardPictureList = mapElementCard.querySelector('.popup__pictures');
    // находим шаблон для карточки с предложением аренды
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
    mapCardPictureList.innerHTML = '';
    mapCardPictureList.insertAdjacentHTML('afterBegin', arr.offer.photos.map(getStringPicture).join(' '));
    mapElementCard.appendChild(mapCardPictureList);
    return mapElementCard;
  }

  window.card = {
    mapElementCard: mapElementCard,
    renderCardElement: renderCardElement
  };
})();
