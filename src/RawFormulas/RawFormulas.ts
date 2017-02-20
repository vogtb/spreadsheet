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
  COUNTUNIQUE,
  DEVSQ,
  DB,
  DDB,
  EFFECT,
  EVEN,
  ERF,
  ERFC,
  EXPONDIST,
  FDIST$LEFTTAILED,
  FINV,
  FISHER,
  FISHERINV,
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
  SQRTPI,
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
  SUMPRODUCT,
  SUMIF,
  SUMSQ,
  SUMX2MY2,
  SUMX2PY2,
  FLOOR,
  IF,
  DELTA,
  COUNT,
  COUNTA,
  COUNTIF,
  COUNTIFS,
  CEILING,
  TRUNC,
  RADIANS,
  DEGREES
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
  CONCATENATE,
  BIN2DEC,
  BIN2HEX,
  BIN2OCT,
  DEC2BIN,
  DEC2HEX,
  DEC2OCT
} from "./Misc";
import {
  CriteriaFunctionFactory,
  ArgsChecker,
  Filter,
  TypeCaster,
  Serializer
} from "./Utils";
import {CellError, NUM_ERROR} from "../Errors"
import * as ERRORS from "../Errors"

var ACCRINT = Formula["ACCRINT"];
var CONVERT = Formula["CONVERT"];
var CUMIPMT = Formula["CUMIPMT"];
var CUMPRINC = Formula["CUMPRINC"];
var DATE = Formula["DATE"];
var DATEVALUE = function (dateString: string) : Date {
  return new Date(dateString);
};
var DAY = Formula["DAY"];
var DAYS = Formula["DAYS"];
var DAYS360 = Formula["DAYS360"];
var DOLLAR = Formula["DOLLAR"];
var DOLLARDE = Formula["DOLLARDE"];
var DOLLARFR = Formula["DOLLARFR"];
var EDATE = function (start_date: Date, months) {
  return moment(start_date).add(months, 'months').toDate();
};
var EOMONTH = function (start_date, months) {
  var edate = moment(start_date).add(months, 'months');
  return new Date(edate.year(), edate.month(), edate.daysInMonth());
};
var __COMPLEX = {
  "F.DIST": FDIST$LEFTTAILED
};
var YEARFRAC = Formula["YEARFRAC"];


/**
 * Returns the number of ways to choose some number of objects from a pool of a given size of objects.
 * @param values[0] n - The size of the pool of objects to choose from.
 * @param values[1] k - The number of objects to choose.
 * @returns {number} number of ways
 * @constructor
 */
var COMBIN = function (...values) : number {
  var MEMOIZED_FACT = [];
  function fact(number) {
    var n = Math.floor(number);
    if (n === 0 || n === 1) {
      return 1;
    } else if (MEMOIZED_FACT[n] > 0) {
      return MEMOIZED_FACT[n];
    } else {
      MEMOIZED_FACT[n] = fact(n - 1) * n;
      return MEMOIZED_FACT[n];
    }
  }
  ArgsChecker.checkLength(values, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  var c = TypeCaster.firstValueAsNumber(values[1]);
  if (n < c) {
    throw new CellError(ERRORS.NUM_ERROR, "Function COMBIN parameter 2 value is "
        + c + ". It should be less than or equal to value of Function COMBIN parameter 1 with " + n + ".");
  }
  n = Math.floor(n);
  c = Math.floor(c);
  var div = fact(c) * fact(n - c);
  if (div === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function COMBIN caused a divide by zero error.");
  }
  return fact(n) / div;
};


/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. CORREL is synonymous with PEARSON.
 * @param values[0] data_y - The range representing the array or matrix of dependent data.
 * @param values[1] data_x - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var CORREL = function (...values) : number {
  function stdev(arr, flag) {
    return Math.sqrt(variance(arr, flag));
  }
  function variance(arr, flag) {
    if ((arr.length - (flag ? 1 : 0)) === 0) {
      throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function CORREL caused a divide by zero error.");
    }
    return sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
  }
  function sum(arr) {
    var sum = 0;
    var i = arr.length;
    while (--i >= 0) {
      sum += arr[i];
    }
    return sum;
  }
  function mean(arr) {
    return sum(arr) / arr.length;
  }
  function sumsqerr(arr) {
    var m = mean(arr);
    var sum = 0;
    var i = arr.length;
    var tmp;
    while (--i >= 0) {
      tmp = arr[i] - m;
      sum += tmp * tmp;
    }
    return sum;
  }
  function covariance(arr1, arr2) {
    var u = mean(arr1);
    var v = mean(arr2);
    var arr1Len = arr1.length;
    var sq_dev = new Array(arr1Len);
    for (var i = 0; i < arr1Len; i++) {
      sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
    }
    if ((arr1Len - 1) === 0) {
      throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function CORREL caused a divide by zero error.");
    }
    return sum(sq_dev) / (arr1Len - 1);
  }
  ArgsChecker.checkLength(values, 2);
  if (!Array.isArray(values[0])) {
    values[0] = [values[0]];
  }
  if (!Array.isArray(values[1])) {
    values[1] = [values[1]];
  }
  if (values[0].length !== values[1].length) {
    throw new CellError(ERRORS.NA_ERROR, "CORREL has mismatched argument count " + values[0] + " vs " + values[1] + ".");
  }
  var arr1 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(values[0]));
  var arr2 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(values[1]));
  var stdevArr1 = stdev(arr1, 1);
  var stdevArr2 = stdev(arr2, 1);
  if (stdevArr1 === 0 || stdevArr2 === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function CORREL caused a divide by zero error.");
  }
  return covariance(arr1, arr2) / stdev(arr1, 1) / stdev(arr2, 1);
};

/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. PEARSON is synonymous with CORREL.
 * @param values[0] data_y - The range representing the array or matrix of dependent data.
 * @param values[1] data_x - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var PEARSON = function (...values) {
  return CORREL.apply(this, values);
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
  PEARSON,
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
  FINV,
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