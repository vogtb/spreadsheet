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

var ACCRINT = Formula["ACCRINT"];
var BIN2DEC = Formula["BIN2DEC"];
var BIN2HEX = Formula["BIN2HEX"];
var BIN2OCT = Formula["BIN2OCT"];
var DECIMAL = Formula["DECIMAL"];
var COMBIN = Formula["COMBIN"];
var CONVERT = Formula["CONVERT"];
var CORREL = Formula["CORREL"];
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
var DEC2HEX = Formula["DEC2HEX"];
var DEC2OCT = Formula["DEC2OCT"];
var DEGREES = Formula["DEGREES"];
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
var SQRTPI = Formula["SQRTPI"];
var SUMPRODUCT = Formula["SUMPRODUCT"];
var SUMX2MY2 = Formula["SUMX2MY2"];
var SUMX2PY2 = Formula["SUMX2PY2"];
var YEARFRAC = Formula["YEARFRAC"];

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
var DEC2BIN = function (...values) {
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
  DECIMAL,
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
  YEARFRAC
}