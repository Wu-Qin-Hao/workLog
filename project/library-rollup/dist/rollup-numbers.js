var rollupNumbers = (function (exports) {
  'use strict';

  function numToWord() {
    console.log('111111111');
  }
  function wordToNum() {
    console.log('222222222');
  }

  exports.numToWord = numToWord;
  exports.wordToNum = wordToNum;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
