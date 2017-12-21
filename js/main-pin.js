'use strict';
(function () {
  var mainPin = window.pin.mapParamSearch.querySelector('.map__pin--main');
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

  window.mainPin = {
    mainPin: mainPin,
    inputAddress: inputAddress
  };

})();
