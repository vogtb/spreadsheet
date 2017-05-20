"use strict";
exports.__esModule = true;
var AllFormulas = require("./Formulas/AllFormulas");
var Formulas = {
    exists: function (fn) {
        return ((fn in AllFormulas) || (fn in AllFormulas.__COMPLEX));
    },
    get: function (fn) {
        if (fn in AllFormulas) {
            return AllFormulas[fn];
        }
        if (fn in AllFormulas.__COMPLEX) {
            return AllFormulas.__COMPLEX[fn];
        }
    }
};
exports.Formulas = Formulas;
