/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import * as Formula from "formulajs"
import {
  ABS,
  ACOS,
  ACOSH,
  ACOTH,
  ARABIC,
  ASIN,
  ASINH,
  ATAN,
  ATAN2,
  ATANH,
  AVERAGE,
  AVERAGEA,
  AVEDEV,
  EVEN,
  MAX,
  MAXA,
  MEDIAN,
  MIN,
  MINA,
  MOD,
  ODD,
  SUM,
  PI
} from "./Math";
import {
  AND,
  EXACT,
  TRUE,
  NOT
} from "./Logical"
import {checkArgumentsAtLeastLength, filterOutStringValues, valueToNumber, checkArgumentsLength, firstValueAsNumber, firstValueAsString} from "./Utils";
import { CellError } from "../Errors"
import * as ERRORS from "../Errors"

var ACCRINT = Formula["ACCRINT"];
var AVERAGEIF = Formula["AVERAGEIF"];
var BASE = Formula["BASE"];
var BIN2DEC = Formula["BIN2DEC"];
var BESSELI = Formula["BESSELI"];
var BESSELJ = Formula["BESSELJ"];
var BESSELK = Formula["BESSELK"];
var BESSELY = Formula["BESSELY"];
var BETADIST = Formula["BETADIST"];
var BETAINV = Formula["BETAINV"];
var BITAND = Formula["BITAND"];
var BITLSHIFT = Formula["BITLSHIFT"];
var BITOR = Formula["BITOR"];
var BITRSHIFT = Formula["BITRSHIFT"];
var BITXOR = Formula["BITXOR"];
var BIN2HEX = Formula["BIN2HEX"];
var BIN2OCT = Formula["BIN2OCT"];
var DECIMAL = Formula["DECIMAL"];
var CEILING = Formula["CEILING"];
var CEILINGMATH = Formula["CEILINGMATH"];
var CEILINGPRECISE = Formula["CEILINGPRECISE"];


/**
 * Convert a number into a character according to the current Unicode table.
 * @param values[0] The number of the character to look up from the current Unicode table in decimal format.
 * @returns {string} character corresponding to Unicode number
 * @constructor
 */
var CHAR = function (...values) : string {
  checkArgumentsLength(values, 1);
  var n = firstValueAsNumber(values[0]);
  if (n < 1 || n > 1114112) { //limit
    throw new CellError(ERRORS.NUM_ERROR, "Function CHAR parameter 1 value " + n + " is out of range.");
  }
  return String.fromCharCode(n);
};

/**
 * Returns the numeric Unicode map value of the first character in the string provided.
 * @param values[0] The string whose first character's Unicode map value will be returned.
 * @returns {number} number of the first character's Unicode value
 * @constructor
 */
var CODE = function (...values) : number {
  checkArgumentsLength(values, 1);
  var text = firstValueAsString(values[0]);
  if (text === "") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function CODE parameter 1 value should be non-empty.");
  }
  return text.charCodeAt(0);
};
var COMBIN = Formula["COMBIN"];
var COMBINA = Formula["COMBINA"];
var COMPLEX = Formula["COMPLEX"];
var CONCATENATE = Formula["CONCATENATE"];
var CONVERT = Formula["CONVERT"];
var CORREL = Formula["CORREL"];

/**
 * Returns the cosine of an angle provided in radians.
 * @param values[0] The angle to find the cosine of, in radians.
 * @returns {number} cosine of angle
 * @constructor
 */
var COS = function (...values) : number {
  checkArgumentsLength(values, 1);
  var r = firstValueAsNumber(values[0]);
  return Math.cos(r);
};

/**
 * Returns the hyperbolic cosine of any real number.
 * @param values[0] Any real value to calculate the hyperbolic cosine of.
 * @returns {number} the hyperbolic cosine of the input
 * @constructor
 */
var COSH = function (...values) : number {
  checkArgumentsLength(values, 1);
  var r = firstValueAsNumber(values[0]);
  return Math["cosh"](r);
};

/**
 * Returns the cotangent of any real number. Defined as cot(x) = 1 / tan(x).
 * @param values[0] number to calculate the cotangent for
 * @returns {number} cotangent
 * @constructor
 */
var COT = function (...values) : number {
  checkArgumentsLength(values, 1);
  var x = firstValueAsNumber(values[0]);
  if (x === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function COT caused a divide by zero error.");
  }
  return 1 / Math.tan(x);
};


/**
 * Return the hyperbolic cotangent of a value, defined as coth(x) = 1 / tanh(x).
 * @param values[0] value to calculate the hyperbolic cotangent value of
 * @returns {number} hyperbolic cotangent
 * @constructor
 */
var COTH = function (...values) : number {
  checkArgumentsLength(values, 1);
  var x = firstValueAsNumber(values[0]);
  if (x === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function COTH caused a divide by zero error.");
  }
  return 1 / Math["tanh"](x);
};


var COUNT = Formula["COUNT"];
var COUNTA = Formula["COUNTA"];
var COUNTIF = Formula["COUNTIF"];
var COUNTIFS = Formula["COUNTIFS"];
var COUNTIN = Formula["COUNTIN"];
var COUNTUNIQUE = Formula["COUNTUNIQUE"];
var COVARIANCEP = Formula["COVARIANCEP"];
var COVARIANCES = Formula["COVARIANCES"];
var CSC = Formula["CSC"];
var CSCH = Formula["CSCH"];
var CUMIPMT = Formula["CUMIPMT"];
var CUMPRINC = Formula["CUMPRINC"];
var DATE = Formula["DATE"];
var DATEVALUE = function (dateString: string) : Date {
  return new Date(dateString);
};
var DAY = Formula["DAY"];
var DAYS = Formula["DAYS"];
var DAYS360 = Formula["DAYS360"];
var DB = Formula["DB"];
var DDB = Formula["DDB"];
var DEC2BIN = Formula["DEC2BIN"];
var DEC2HEX = Formula["DEC2HEX"];
var DEC2OCT = Formula["DEC2OCT"];
var DEGREES = Formula["DEGREES"];
var DELTA = Formula["DELTA"];
var DEVSQ = Formula["DEVSQ"];
var DOLLAR = Formula["DOLLAR"];
var DOLLARDE = Formula["DOLLARDE"];
var DOLLARFR = Formula["DOLLARFR"];
var EDATE = function (start_date: Date, months) {
  return moment(start_date).add(months, 'months').toDate();
};
var EFFECT = Formula["EFFECT"];
var EOMONTH = function (start_date, months) {
  var edate = moment(start_date).add(months, 'months');
  return new Date(edate.year(), edate.month(), edate.daysInMonth());
};
var ERF = Formula["ERF"];
var ERFC = Formula["ERFC"];
var EXPONDIST = Formula["EXPONDIST"];
var FALSE = Formula["FALSE"];
var __COMPLEX = {
  "F.DIST": Formula["FDIST"],
  "F.INV": Formula["FINV"]
};
var FISHER = Formula["FISHER"];
var FISHERINV = Formula["FISHERINV"];
var IF = Formula["IF"];

/**
 * Rounds a number down to the nearest integer that is less than or equal to it.
 * @param values[0] The value to round down to the nearest integer.
 * @returns {number} Rounded number
 * @constructor
 */
var INT = function (...values) : number {
  checkArgumentsLength(values, 1);
  var x = firstValueAsNumber(values[0]);
  return Math.floor(x);
};


/**
 * Checks whether the provided value is even.
 * @param values[0] The value to be verified as even.
 * @returns {boolean} whether this value is even or not
 * @constructor
 */
var ISEVEN = function (...values) : boolean {
  checkArgumentsLength(values, 1);
  if (values[0] === "") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function ISEVEN parameter 1 expects boolean values. But '" + values[0] + "' is a text and cannot be coerced to a boolean.");
  }
  var x = firstValueAsNumber(values[0]);
  return Math.floor(x) % 2 === 0;
};


/**
 * Checks whether the provided value is odd.
 * @param values[0] The value to be verified as odd.
 * @returns {boolean} whether this value is odd or not
 * @constructor
 */
var ISODD = function (...values) : boolean {
  checkArgumentsLength(values, 1);
  if (values[0] === "") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function ISODD parameter 1 expects boolean values. But '" + values[0] + "' is a text and cannot be coerced to a boolean.");
  }
  var x = firstValueAsNumber(values[0]);
  return Math.floor(x) % 2 === 1;
};


var LN = Formula["LN"];
var LOG = Formula["LOG"];
var LOG10 = Formula["LOG10"];
var OR = Formula["OR"];
var POWER = Formula["POWER"];
var ROUND = Formula["ROUND"];
var ROUNDDOWN = Formula["ROUNDDOWN"];
var ROUNDUP = Formula["ROUNDUP"];

/**
 * Returns the sine of an angle provided in radians.
 * @param values[0] The angle to find the sine of, in radians.
 * @returns {number} Sine of angle.
 * @constructor
 */
var SIN = function (...values) {
  checkArgumentsLength(values, 1);
  var rad = firstValueAsNumber(values[0]);
  return rad === Math.PI ? 0 : Math.sin(rad);
};

/**
 * Returns the hyperbolic sine of any real number.
 * @param values[0] real number to find the hyperbolic sine of
 * @returns {number} hyperbolic sine
 * @constructor
 */
var SINH = function (...values) : number {
  checkArgumentsLength(values, 1);
  var rad = firstValueAsNumber(values[0]);
  return Math["sinh"](rad);
};


var SPLIT = Formula["SPLIT"];


/**
 * Returns the positive square root of a positive number.
 * @param values[0] The number for which to calculate the positive square root.
 * @returns {number} square root
 * @constructor
 */
var SQRT = function (...values) : number {
  checkArgumentsLength(values, 1);
  var x = firstValueAsNumber(values[0]);
  if (x < 0) {
    throw new CellError(ERRORS.VALUE_ERROR, "Function SQRT parameter 1 expects number values. But '" + values[0] + "' is a text and cannot be coerced to a number.");
  }
  return Math.sqrt(x);
};

var SQRTPI = Formula["SQRTPI"];
var SUMIF = Formula["SUMIF"];
var SUMPRODUCT = Formula["SUMPRODUCT"];
var SUMSQ = Formula["SUMSQ"];
var SUMX2MY2 = Formula["SUMX2MY2"];
var SUMX2PY2 = Formula["SUMX2PY2"];
var TAN = function (rad) {
  return rad === Math.PI ? 0 : Math.tan(rad);
};
var TANH = Formula["TANH"];
var TRUNC = Formula["TRUNC"];
var XOR = Formula["XOR"];
var YEARFRAC = Formula["YEARFRAC"];

export {
  __COMPLEX,

  ABS,
  ACOS,
  ACCRINT,
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
  BIN2DEC,
  BESSELI,
  BESSELJ,
  BESSELK,
  BESSELY,
  BETADIST,
  BETAINV,
  BITAND,
  BITLSHIFT,
  BITOR,
  BITRSHIFT,
  BITXOR,
  BIN2HEX,
  BIN2OCT,
  DECIMAL,
  CEILING,
  CEILINGMATH,
  CEILINGPRECISE,
  CHAR,
  CODE,
  COMBIN,
  COMBINA,
  COMPLEX,
  CONCATENATE,
  CONVERT,
  CORREL,
  COS,
  PI,
  COSH,
  COT,
  COTH,
  COUNT,
  COUNTA,
  COUNTIF,
  COUNTIFS,
  COUNTIN,
  COUNTUNIQUE,
  COVARIANCEP,
  COVARIANCES,
  CSC,
  CSCH,
  CUMIPMT,
  CUMPRINC,
  DATE,
  DATEVALUE,
  DAY,
  DAYS,
  DAYS360,
  DB,
  DDB,
  DEC2BIN,
  DEC2HEX,
  DEC2OCT,
  DEGREES,
  DELTA,
  DEVSQ,
  DOLLAR,
  DOLLARDE,
  DOLLARFR,
  EDATE,
  EFFECT,
  EOMONTH,
  ERF,
  ERFC,
  EVEN,
  EXACT,
  EXPONDIST,
  FALSE,
  FISHER,
  FISHERINV,
  IF,
  INT,
  ISEVEN,
  ISODD,
  LN,
  LOG,
  LOG10,
  MAX,
  MAXA,
  MEDIAN,
  MIN,
  MINA,
  MOD,
  TRUE,
  NOT,
  ODD,
  OR,
  POWER,
  ROUND,
  ROUNDDOWN,
  ROUNDUP,
  SIN,
  SINH,
  SPLIT,
  SQRT,
  SQRTPI,
  SUM,
  SUMIF,
  SUMPRODUCT,
  SUMSQ,
  SUMX2MY2,
  SUMX2PY2,
  TAN,
  TANH,
  TRUNC,
  XOR,
  YEARFRAC
}