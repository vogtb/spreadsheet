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
  TANH
} from "./Math";
import {
  AND,
  EXACT,
  TRUE,
  FALSE,
  NOT,
  OR
} from "./Logical";
import {
  CHAR,
  CODE
} from "./Misc";
import {
  checkArgumentsAtLeastLength,
  checkArgumentsAtWithin,
  valueCanCoerceToNumber,
  filterOutStringValues,
  CriteriaFunctionFactory,
  valueToNumber,
  checkArgumentsLength,
  firstValueAsNumber,
  firstValueAsString,
  valueToBoolean
} from "./Utils";
import { CellError } from "../Errors"
import * as ERRORS from "../Errors"

var ACCRINT = Formula["ACCRINT"];
var AVERAGEIF = Formula["AVERAGEIF"];
var BIN2DEC = Formula["BIN2DEC"];
var BIN2HEX = Formula["BIN2HEX"];
var BIN2OCT = Formula["BIN2OCT"];
var DECIMAL = Formula["DECIMAL"];
var CEILING = Formula["CEILING"];
var COMBIN = Formula["COMBIN"];
var CONCATENATE = Formula["CONCATENATE"];
var CONVERT = Formula["CONVERT"];
var CORREL = Formula["CORREL"];
var COUNTIFS = Formula["COUNTIFS"];
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
var IF = Formula["IF"];
var SPLIT = Formula["SPLIT"];
var SQRTPI = Formula["SQRTPI"];
var SUMPRODUCT = Formula["SUMPRODUCT"];
var SUMSQ = Formula["SUMSQ"];
var SUMX2MY2 = Formula["SUMX2MY2"];
var SUMX2PY2 = Formula["SUMX2PY2"];
var TRUNC = Formula["TRUNC"];
var YEARFRAC = Formula["YEARFRAC"];

/**
 * Returns the a count of the number of numeric values in a dataset.
 * @param values The values or ranges to consider when counting.
 * @returns {number} number of numeric values in a dataset.
 * @constructor
 */
var COUNT = function (...values) : number {
  checkArgumentsAtLeastLength(values, 1);
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length > 0) {
        count += COUNT.apply(this, values[i]);
      }
    } else if (valueCanCoerceToNumber(values[i])) {
      count++;
    }
  }
  return count;
};

/**
 * Returns a conditional count across a range.
 * @param values[0] range - The range that is tested against criterion., value[1];
 * @param values[1] criterion - The pattern or test to apply to range. If the range to check against contains text, this must be a
 * string. It can be a comparison based string (e.g. "=1", "<1", ">=1") or it can be a wild-card string, in which *
 * matches any number of characters, and ? matches the next character. Both ? and * can be escaped by placing a ~ in
 * front of them. If it is neither, it will compared with values in the range using equality comparison.
 * @returns {number}
 * @constructor
 */
var COUNTIF = function (...values) {
  checkArgumentsLength(values, 2);
  var range = values[0];
  var criteria = values[1];

  var criteriaEvaluation = CriteriaFunctionFactory.createCriteriaFunction(criteria);

  var count = 0;
  for (var i = 0; i < range.length; i++) {
    var x = range[i];
    if (criteriaEvaluation(x)) {
      count++;
    }
  }
  return count;
};

/**
 * Returns the a count of the number of values in a dataset.
 * @param values The values or ranges to consider when counting.
 * @returns {number} number of values in a dataset.
 * @constructor
 */
var COUNTA = function (...values) : number {
  checkArgumentsAtLeastLength(values, 1);
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length > 0) {
        count += COUNTA.apply(this, values[i]);
      } else {
        count++;
      }
    } else {
      count++;
    }
  }
  return count;
};

/**
 * Compare two numeric values, returning 1 if they're equal.
 * @param values[0] The first number to compare.
 * @param values[1] The second number to compare.
 * @returns {number} 1 if they're equal, 0 if they're not equal.
 * @constructor
 */
var DELTA = function (...values) : number {
  checkArgumentsAtWithin(values, 1, 2);
  if (values.length === 1) {
    return valueToNumber(values[0]) === 0 ? 1 : 0;
  }
  return valueToNumber(values[0]) === valueToNumber(values[1]) ? 1 : 0;
};

/**
 * Rounds a number to a certain number of decimal places according to standard rules.
 * @param values[0] The value to round to places number of places.
 * @param values[1] The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUND = function (...values) {
  checkArgumentsAtWithin(values, 1, 2);
  var n = firstValueAsNumber(values[0]);
  if (values.length === 1) {
    return Math.round(n);
  }
  var d = firstValueAsNumber(values[1]);
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
};

/**
 * Rounds a number to a certain number of decimal places, always rounding down to the next valid increment.
 * @param values[0] The value to round to places number of places, always rounding down.
 * @param values[1] (optional) The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUNDDOWN = function (...values) {
  checkArgumentsAtWithin(values, 1, 2);
  var n = firstValueAsNumber(values[0]);
  if (values.length === 1) {
    return Math.floor(n);
  }
  var d = firstValueAsNumber(values[1]);
  return Math.floor(n * Math.pow(10, d)) / Math.pow(10, d);
};

/**
 * Rounds a number to a certain number of decimal places, always rounding up to the next valid increment.
 * @param values[0] The value to round to places number of places, always rounding up.
 * @param values[1] (optional) The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUNDUP = function (...values) {
  checkArgumentsAtWithin(values, 1, 2);
  var n = firstValueAsNumber(values[0]);
  if (values.length === 1) {
    return Math.ceil(n);
  }
  var d = firstValueAsNumber(values[1]);
  return Math.ceil(n * Math.pow(10, d)) / Math.pow(10, d);
};

/**
 * Returns a conditional sum across a range.
 * @param values[0] The range which is tested against criterion.
 * @param values[1] The pattern or test to apply to range. If the range to check against contains text, this must be a
 * string. It can be a comparison based string (e.g. "=1", "<1", ">=1") or it can be a wild-card string, in which *
 * matches any number of characters, and ? matches the next character. Both ? and * can be escaped by placing a ~ in
 * front of them.
 * @param values[2] (optional) The range to be summed, if different from range.
 * @returns {number}
 * @constructor
 */
var SUMIF = function (...values) {
  checkArgumentsAtWithin(values, 2, 3);
  var range = values[0];
  var criteria = values[1];
  var sumRange = null;
  if (values.length === 3) {
    sumRange = values[2];
  }

  var criteriaEvaluation = CriteriaFunctionFactory.createCriteriaFunction(criteria);

  var sum = 0;
  for (var i = 0; i < range.length; i++) {
    var x = range[i];
    if (sumRange && i > sumRange.length-1) {
      continue;
    }
    if (values.length === 2 && valueCanCoerceToNumber(x) && criteriaEvaluation(x)) {
      sum = sum + x;
    } else if (values.length === 3 && valueCanCoerceToNumber(sumRange[i]) && criteriaEvaluation(x)) {
      sum = sum + sumRange[i];
    }
  }
  return sum;
};

/**
 * Exclusive or or exclusive disjunction is a logical operation that outputs true only when inputs differ.
 * @param values to check for exclusivity.
 * @returns {boolean} returns true if only one input is considered logically true.
 * @constructor
 */
var XOR = function (...values) {
  checkArgumentsAtLeastLength(values, 1);
  var alreadyTruthy = false;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      if (XOR.apply(this, values[i])) {
        if (alreadyTruthy) {
          return false;
        }
        alreadyTruthy = true;
      }
    } else if (valueToBoolean(values[i])) {
      if (alreadyTruthy) {
        return false;
      }
      alreadyTruthy = true;
    }
  }
  return alreadyTruthy;
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