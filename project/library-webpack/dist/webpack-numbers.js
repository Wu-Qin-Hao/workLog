var webpackNumbers;
webpackNumbers = (() => {
  "use strict";
  var e = {
      10: (e, o, r) => {
        function t() {
          console.log("111111111");
        }
        function n() {
          console.log("222222222");
        }
        r.r(o), r.d(o, { numToWord: () => t, wordToNum: () => n });
      },
    },
    o = {};
  function r(t) {
    if (o[t]) return o[t].exports;
    var n = (o[t] = { exports: {} });
    return e[t](n, n.exports, r), n.exports;
  }
  return (
    (r.d = (e, o) => {
      for (var t in o)
        r.o(o, t) &&
          !r.o(e, t) &&
          Object.defineProperty(e, t, { enumerable: !0, get: o[t] });
    }),
    (r.o = (e, o) => Object.prototype.hasOwnProperty.call(e, o)),
    (r.r = (e) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    r(10)
  );
})();
