'use strict';
(function () {
  //  универсальной функцией для синхронизации полей
  window.synchronizeFields = function (firstField, secondField, firstArray, secondArray, functSyncValues) {
    var index = firstArray.indexOf(firstField.value);
    functSyncValues(secondField, secondArray[index]);
  };
}());
