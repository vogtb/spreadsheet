import * as AllFormulas from "./Formulas/AllFormulas";

var Formulas = {
  exists: function(fn: string) {
    return ((fn in AllFormulas) || (fn in AllFormulas.__COMPLEX));
  },
  get: function(fn: string) {
    if (fn in AllFormulas) {
      return AllFormulas[fn];
    }
    if (fn in AllFormulas.__COMPLEX) {
      return AllFormulas.__COMPLEX[fn];
    }
  }
};

export {
  Formulas
}