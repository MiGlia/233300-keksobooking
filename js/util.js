'use strict';
(function () {

// Находим случайное число включительно
  function getRandomValue(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }

  // Находим случайный элемент в массиве и сразу удаляем его
  function getIndividRandomValueFromArray(array) {
    return array.splice(Math.floor(Math.random() * array.length), 1);
  }

  // Нвходим случайный элемент массива
  function getRandomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Находим массив со случайной длиной
  function getRandomArray(array) {
    var arrayCopy = array.slice(0);
    arrayCopy.length = Math.floor(Math.random() * array.length);
    return arrayCopy;
  }

  window.util = {
    getRandomValue: getRandomValue,
    getIndividRandomValueFromArray: getIndividRandomValueFromArray,
    getRandomValueFromArray: getRandomValueFromArray,
    getRandomArray: getRandomArray
  };

})();
