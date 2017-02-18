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
  COT,
  COTH,
  COSH,
  COS,
  EVEN,
  INT,
  ISEVEN,
  ISODD,
  MAX,
  MAXA,
  MEDIAN,
  MIN,
  MINA,
  MOD,
  ODD,
  SIN,
  SINH,
  SUM,
  SQRT,
  PI,
  POWER,
  LOG,
  LOG10,
  LN,
  TAN,
  TANH,
  AVERAGEIF,
  ROUND,
  ROUNDDOWN,
  ROUNDUP,
  SUMIF,
  FLOOR,
  IF,
  DELTA,
  COUNT,
  COUNTA,
  COUNTIF,
  COUNTIFS,
  CEILING,
  SUMSQ,
  TRUNC
} from "./Math";
import {
  AND,
  EXACT,
  TRUE,
  FALSE,
  NOT,
  OR,
  XOR
} from "./Logical";
import {
  CHAR,
  CODE,
  SPLIT,
  CONCATENATE
} from "./Misc";
import {
  CriteriaFunctionFactory,
  ArgsChecker,
  Filter,
  TypeCaster
} from "./Utils";
import { CellError } from "../Errors"
import * as ERRORS from "../Errors"
import {Cell} from "../Cell";

var ACCRINT = Formula["ACCRINT"];
var COMBIN = Formula["COMBIN"];
var CONVERT = Formula["CONVERT"];
var CORREL = Formula["CORREL"];
var COUNTUNIQUE = Formula["COUNTUNIQUE"];
var COVARIANCEP = Formula["COVARIANCEP"];
var COVARIANCES = Formula["COVARIANCES"];
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
var __COMPLEX = {
  "F.DIST": Formula["FDIST"],
  "F.INV": Formula["FINV"]
};
var FISHER = Formula["FISHER"];
var FISHERINV = Formula["FISHERINV"];
var SUMPRODUCT = Formula["SUMPRODUCT"];
var SUMX2MY2 = Formula["SUMX2MY2"];
var SUMX2PY2 = Formula["SUMX2PY2"];
var YEARFRAC = Formula["YEARFRAC"];


/**
 * Returns the positive square root of the product of Pi and the given positive number.
 * @param values[0] value - The number which will be multiplied by Pi and have the product's square root returned
 * @returns {number} the positive square root of the product of Pi and the given positive number.
 * @constructor
 */
var SQRTPI = function (...values) : number{
  ArgsChecker.checkLength(values, 1);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (n < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function SQRTPI parameter 1 value is " + n + ". It should be greater than or equal to 0.");
  }
  return Math.sqrt(n * Math.PI);
};


/**
 * Converts a signed binary number to decimal format.
 * @param values[0] signed_binary_number - The signed 10-bit binary value to be converted to decimal, provided as a
 * string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented
 * in two's complement format.
 * @returns {number}
 * @constructor
 */
var BIN2DEC = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  if (typeof TypeCaster.firstValue(values[0]) === "boolean") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function BIN2DEC parameter 1 expects text values. But '" + values[0] + "' is a boolean and cannot be coerced to a text.");
  }
  var n = TypeCaster.firstValueAsString(values[0]);
  if (!(/^[01]{1,10}$/).test(n)) {
    throw new CellError(ERRORS.NUM_ERROR, "Input for BIN2DEC ('"+n+"') is not a valid binary representation.");
  }

  if (n.length === 10 && n.substring(0, 1) === '1') {
    return parseInt(n.substring(1), 2) - 512;
  }
  return parseInt(n, 2);
};


/**
 * Converts a signed binary number to signed hexadecimal format.
 * @param values[0] signed_binary_number - The signed 10-bit binary value to be converted to signed hexadecimal,
 * provided as a string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are
 * represented in two's complement format.
 * @param values[1] significant_digits - [ OPTIONAL ] - The number of significant digits to ensure in the result.
 * @returns {string} string representation of a signed hexadecimal
 * @constructor
 */
var BIN2HEX = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  if (typeof TypeCaster.firstValue(values[0]) === "boolean") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function BIN2HEX parameter 1 expects text values. But '" + values[0] + "' is a boolean and cannot be coerced to a text.");
  }
  var n = TypeCaster.firstValueAsString(values[0]);
  var p = 10;
  if (values.length === 2) {
    p = TypeCaster.firstValueAsNumber(values[1]);
  }
  if (!(/^[01]{1,10}$/).test(n)) {
    throw new CellError(ERRORS.NUM_ERROR, "Input for BIN2HEX ('"+n+"') is not a valid binary representation.");
  }

  if (n.length === 10 && n.substring(0, 1) === '1') {
    return (1099511627264 + parseInt(n.substring(1), 2)).toString(16).toUpperCase();
  }

  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function BIN2HEX parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }
  p = Math.floor(p);
  // Convert decimal number to hexadecimal
  var result = parseInt(n.toString(), 2).toString(16).toUpperCase();
  if (p === 10) {
    return result;
  }
  var str = "";
  for (var i = 0; i < p - result.length; i++) {
    str += "0";
  }
  return str + result;
};


/**
 * Converts a signed binary number to signed octal format.
 * @param values[0] signed_binary_number - The signed 10-bit binary value to be converted to signed octal, provided as a
 * string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented
 * in two's complement format.
 * @param values[1] significant_digits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If
 * this is greater than the number of significant digits in the result, the result is left-padded with zeros until the
 * total number of digits reaches significant_digits.
 * @returns {string} number in octal format
 * @constructor
 */
var BIN2OCT = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  if (typeof TypeCaster.firstValue(values[0]) === "boolean") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function BIN2OCT parameter 1 expects text values. But '" + values[0] + "' is a boolean and cannot be coerced to a text.");
  }
  var n = TypeCaster.firstValueAsString(values[0]);
  var p = 10;
  if (values.length === 2) {
    p = TypeCaster.firstValueAsNumber(values[1]);
  }
  if (!(/^[01]{1,10}$/).test(n)) {
    throw new CellError(ERRORS.NUM_ERROR, "Input for BIN2OCT ('"+n+"') is not a valid binary representation.");
  }

  if (n.length === 10 && n.substring(0, 1) === '1') {
    return (1073741312 + parseInt(n.substring(1), 2)).toString(8);
  }

  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function BIN2OCT parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }
  p = Math.floor(p);
  var result = parseInt(n.toString(), 2).toString(8);
  if (p === 10) {
    return result;
  }
  if (p >= result.length) {
    var str = "";
    for (var i = 0; i < p - result.length - 1; i++) {
      str += "0";
    }
    return str + result;
  }
};



/**
 * Converts an angle value in degrees to radians.
 * @param values[0] angle - The angle to convert from degrees to radians.
 * @returns {number} radians
 * @constructor
 */
var RADIANS = function (...values) {
  ArgsChecker.checkLength(values, 1);
  var d = TypeCaster.firstValueAsNumber(values[0]);
  return d * Math.PI / 180;
};

/**
 * Converts an angle value in radians to degrees.
 * @param values[0] angle - The angle to convert from radians to degrees.
 * @returns {number} degrees
 * @constructor
 */
var DEGREES = function (...values) {
  ArgsChecker.checkLength(values, 1);
  var r = TypeCaster.firstValueAsNumber(values[0]);
  return r * 180 / Math.PI;
};


/**
 * Converts a decimal number to signed octal format.
 * @param values[0] decimal_number - The decimal value to be converted to signed octal,provided as a string. For this
 * function, this value has a maximum of 536870911 if positive, and a minimum of -53687092 if negative.
 * @param values[1] significant_digits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this
 * is greater than the number of significant digits in the result, the result is left-padded with zeros until the total
 * number of digits reaches significant_digits.
 * @returns {string} octal string representation of the decimal number
 * @constructor
 */
var DEC2OCT = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (n < 0) {
    n = Math.ceil(n);
  }
  if (n > 0) {
    n = Math.floor(n);
  }
  var p = 10;
  var placesPresent = false;
  if (values.length === 2) {
    p = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
    placesPresent = true;
  }
  if (n < -53687092 || n > 536870911) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2OCT parameter 1 value is " + n + ". Valid values are between -53687092 and 536870911 inclusive.");
  }
  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2OCT parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }
  if (n < 0) {
    return (1073741824 + n).toString(8).toUpperCase();
  }

  // Convert decimal number to hexadecimal
  var result = parseInt(n.toString(), 10).toString(8).toUpperCase();
  if (!placesPresent) {
    return result;
  }
  var str = "";
  for (var i = 0; i < p - result.length; i++) {
    str += "0";
  }
  return str + result.toUpperCase();
};


/**
 * Converts a decimal number to signed hexadecimal format.
 * @param values[0] decimal_number - The decimal value to be converted to signed hexadecimal, provided as a string. This
 * value has a maximum of 549755813887 if positive, and a minimum of -549755814888 if negative.
 * @param values[1] significant_digits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If
 * this is greater than the number of significant digits in the result, the result is left-padded with zeros until the
 * total number of digits reaches significant_digits. This value is ignored if decimal_number is negative.
 * @returns {string} hexadecimal string representation of the decimal number
 * @constructor
 */
var DEC2HEX = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (n < 0) {
    n = Math.ceil(n);
  }
  if (n > 0) {
    n = Math.floor(n);
  }
  var p = 10;
  var placesPresent = false;
  if (values.length === 2) {
    p = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
    placesPresent = true;
  }
  if (n < -549755813888 || n > 549755813887) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2HEX parameter 1 value is " + n + ". Valid values are between -549755813888 and 549755813887 inclusive.");
  }
  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2HEX parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }
  // Ignore places and return a 10-character hexadecimal number if number is negative
  if (n < 0) {
    return (1099511627776 + n).toString(16).toUpperCase();
  }

  // Convert decimal number to hexadecimal
  var result = parseInt(n.toString(), 10).toString(16).toUpperCase();
  if (!placesPresent) {
    return result;
  }
  var str = "";
  for (var i = 0; i < p - result.length; i++) {
    str += "0";
  }
  return str + result;
};

/**
 * Converts a decimal number to signed binary format.
 * @param values[0] decimal_number - The decimal value to be converted to signed binary, provided as a string. For this
 * function, this value has a maximum of 511 if positive, and a minimum of -512 if negative.
 * @param values[1] significant_digits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this
 * is greater than the number of significant digits in the result, the result is left-padded with zeros until the total
 * number of digits reaches significant_digits.
 * @returns {string} signed binary string representation of the input decimal number.
 * @constructor
 */
var DEC2BIN = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (n < 0) {
    n = Math.ceil(n);
  }
  if (n > 0) {
    n = Math.floor(n);
  }
  if (n === 0 || n === 1) {
    return n.toString();
  }
  var p = 10;
  var placesPresent = false;
  if (values.length === 2) {
    p = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
    placesPresent = true;
  }

  if (n < -512 || n > 511) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2BIN parameter 1 value is " + n + ". Valid values are between -512 and 511 inclusive.");
  }
  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2BIN parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }

  // Ignore places and return a 10-character binary number if number is negative
  if (n < 0) {
    var count = (9 - (512 + n).toString(2).length);
    var st = "";
    for (var i = 0; i < count; i++) {
      st += "0";
    }
    return "1" + st + (512 + n).toString(2);
  }

  // Convert decimal number to binary
  var result = parseInt(n.toString(), 10).toString(2);

  // Pad return value with leading 0s (zeros) if necessary
  if (p >= result.length) {
    var str = "";
    for (var i = 0; i < (p - result.length); i++) {
      str += "0";
    }
    var workingString = str + result;
    if (!placesPresent) {
      var returnString = "";
      for (var i = 0; i < workingString.length; i++) {
        var char = workingString[i];
        if (char === "1") {
          break;
        }
        returnString = workingString.slice(i+1);
      }
      return returnString;
    }
    return workingString;
  }
};



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
  BIN2DEC,
  BIN2HEX,
  BIN2OCT,
  CEILING,
  CHAR,
  CODE,
  COMBIN,
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
  COUNTUNIQUE,
  COVARIANCEP,
  COVARIANCES,
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
  FLOOR,
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
  YEARFRAC,
  RADIANS
}