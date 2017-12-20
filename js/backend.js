'use strict';
(function () {
  function load(onLoad, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }
})();
