import * as Formula from "formulajs"

var ABS = Formula["ABS"];
var ACOS = Formula["ACOS"];
var ACOSH = Formula["ACOSH"];
var ACOTH = Formula["ACOTH"];
var AND = Formula["AND"];
var ARABIC = Formula["ARABIC"];
var ASIN = Formula["ASIN"];
var ASINH = Formula["ASINH"];
var ATAN = Formula["ATAN"];
var ATAN2 = function (x, y) {
  return Math.atan2(y, x);
};
var ATANH = Formula["ATANH"];
var AVEDEV = Formula["AVEDEV"];
var AVERAGE = Formula["AVERAGE"];
var AVERAGEA = Formula["AVERAGEA"];
var AVERAGEIF = Formula["AVERAGEIF"];
var BASE = Formula["BASE"];
var BIN2DEC = Formula["BIN2DEC"];

export {
  ABS,
  ACOS,
  ACOSH,
  ACOTH,
  AND,
  ARABIC,
  ASIN,
  ASINH,
  ATAN,
  ATAN2,
  ATANH,
  AVEDEV,
  AVERAGE,
  AVERAGEA,
  AVERAGEIF,
  BASE,
  BIN2DEC
}