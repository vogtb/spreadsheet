import * as AllFormulas from "./Formulas/AllFormulas";
import {
  __TRY_CATCH_FORMULAS
} from "./Formulas/AllFormulas";

let Formulas = {
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
  },
  isTryCatchFormula: function (fn: string) : boolean {
    return __TRY_CATCH_FORMULAS[fn] !== undefined;
  }
};

export {
  Formulas
}