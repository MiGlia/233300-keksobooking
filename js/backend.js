'use strict';
(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var serverTime = 10000;
  var statusLoadOk = 200;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusLoadOk) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = serverTime; // 10s

    return xhr;
  };

  function load(onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 5px auto; text-align: center; background-color: red; border: 2px solid black';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler
  };

})();
