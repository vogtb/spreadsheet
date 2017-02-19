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
  DEVSQ,
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
import {Cell} from "../Cell";

var ACCRINT = Formula["ACCRINT"];
var COMBIN = Formula["COMBIN"];
var CONVERT = Formula["CONVERT"];
var CORREL = Formula["CORREL"];
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
var YEARFRAC = Formula["YEARFRAC"];


/**
 * Calculates the depreciation of an asset for a specified period using the double-declining balance method.
 * @param values[0] cost - The initial cost of the asset.
 * @param values[1] salvage - The value of the asset at the end of depreciation.
 * @param values[2] life - The number of periods over which the asset is depreciated.
 * @param values[3] period - The single period within life for which to calculate depreciation.
 * @param values[4] factor - [ OPTIONAL - 2 by default ] - The factor by which depreciation decreases.
 * @returns {number} depreciation of an asset for a specified period
 * @constructor
 */
var DDB = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 4, 5);
  var cost = TypeCaster.firstValueAsNumber(values[0]);
  var salvage = TypeCaster.firstValueAsNumber(values[1]);
  var life = TypeCaster.firstValueAsNumber(values[2]);
  var period = TypeCaster.firstValueAsNumber(values[3]);
  var factor = values.length === 5 ? TypeCaster.firstValueAsNumber(values[4]) : 2;

  if (cost < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 1 value is "
      + cost + ". It should be greater than or equal to 0.");
  }
  if (salvage < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 2 value is "
      + salvage + ". It should be greater than or equal to 0.");
  }
  if (life < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 3 value is "
      + life + ". It should be greater than or equal to 0.");
  }
  if (period < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 4 value is "
      + period + ". It should be greater than or equal to 0.");
  }
  if (period > life) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 4 value is "
      + life + ". It should be less than or equal to value of Function DB parameter 3 with "+ period +".");
  }
  if (salvage >= cost) {
    return 0;
  }

  var total = 0;
  var current = 0;
  for (var i = 1; i <= period; i++) {
    current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
    total += current;
  }
  return current;
};


/**
 * Calculates the depreciation of an asset for a specified period using the arithmetic declining balance method.
 * @param values[0] cost - The initial cost of the asset.
 * @param values[1] salvage - The value of the asset at the end of depreciation.
 * @param values[2] life - The number of periods over which the asset is depreciated.
 * @param values[3] period - The single period within life for which to calculate depreciation.
 * @param values[4] month - [ OPTIONAL - 12 by default ] - The number of months in the first year of depreciation.
 * @returns {number} depreciated value
 * @constructor
 */
var DB = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 4, 5);
  var cost = TypeCaster.firstValueAsNumber(values[0]);
  var salvage = TypeCaster.firstValueAsNumber(values[1]);
  var life = TypeCaster.firstValueAsNumber(values[2]);
  var period = TypeCaster.firstValueAsNumber(values[3]);
  var month = values.length === 5 ? Math.floor(TypeCaster.firstValueAsNumber(values[4])) : 12;
  if (cost < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 1 value is "
      + cost + ". It should be greater than or equal to 0.");
  }
  if (salvage < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 2 value is "
      + salvage + ". It should be greater than or equal to 0.");
  }
  if (life < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 3 value is "
      + life + ". It should be greater than or equal to 0.");
  }
  if (period < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 4 value is "
      + period + ". It should be greater than or equal to 0.");
  }
  if (month > 12 || month < 1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 5 value is "
      + month + ". Valid values are between 1 and 12 inclusive.");
  }
  if (period > life) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 4 value is "
      + life + ". It should be less than or equal to value of Function DB parameter 3 with "+ period +".");
  }
  if (salvage >= cost) {
    return 0;
  }
  var rate = (1 - Math.pow(salvage / cost, 1 / life));
  var initial = cost * rate * month / 12;
  var total = initial;
  var current = 0;
  var ceiling = (period === life) ? life - 1 : period;
  for (var i = 2; i <= ceiling; i++) {
    current = (cost - total) * rate;
    total += current;
  }
  if (period === 1) {
    return initial;
  } else if (period === life) {
    return (cost - total) * rate;
  } else {
    return current;
  }
};



/**
 * Calculates the sum of the sums of the squares of values in two arrays.
 * @param values[0] array_x - The array or range of values whose squares will be added to the squares of corresponding
 * entries in array_y and added together.
 * @param values[1] array_y - The array or range of values whose squares will be added to the squares of corresponding
 * entries in array_x and added together.
 * @returns {number} sum of the sums of the squares
 * @constructor
 */
var SUMX2PY2 = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var arrOne = Filter.flattenAndThrow(values[0]);
  var arrTwo = Filter.flattenAndThrow(values[1]);
  if (arrOne.length !== arrTwo.length) {
    throw new CellError(ERRORS.NA_ERROR, "Array arguments to SUMX2PY2 are of different size.");
  }
  var result = 0;
  for (var i = 0; i < arrOne.length; i++) {
    // If either values at this index are anything but numbers, skip them. This is the behavior in GS at least.
    if (typeof arrOne[i] === "number" && typeof arrTwo[i] === "number") {
      result += arrOne[i] * arrOne[i] + arrTwo[i] * arrTwo[i];
    }
  }
  return result;
};

/**
 * Calculates the sum of the differences of the squares of values in two arrays.
 * @param values[0] array_x - The array or range of values whose squares will be reduced by the squares of corresponding
 * entries in array_y and added together.
 * @param values[1] array_y - The array or range of values whose squares will be subtracted from the squares of
 * corresponding entries in array_x and added together.
 * @returns {number} sum of the differences of the squares
 * @constructor
 */
var SUMX2MY2 = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var arrOne = Filter.flattenAndThrow(values[0]);
  var arrTwo = Filter.flattenAndThrow(values[1]);
  if (arrOne.length !== arrTwo.length) {
    throw new CellError(ERRORS.NA_ERROR, "Array arguments to SUMX2MY2 are of different size.");
  }
  var result = 0;
  for (var i = 0; i < arrOne.length; i++) {
    // If either values at this index are anything but numbers, skip them. This is the behavior in GS at least.
    if (typeof arrOne[i] === "number" && typeof arrTwo[i] === "number") {
      result += arrOne[i] * arrOne[i] - arrTwo[i] * arrTwo[i];
    }
  }
  return result;
};


/**
 * Counts the number of unique values in a list of specified values and ranges.
 * @param values The values or ranges to consider for uniqueness. Supports an arbitrary number of arguments for this
 * function.
 * @returns {number} of unique values passed in.
 * @constructor
 */
var COUNTUNIQUE = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);

  // Private function that will recursively generate an array of the unique primatives
  var countUniquePrivate = function (values: Array<any>) : Object {
    var uniques = {};
    for (var i = 0; i < values.length; i++) {
      if (Array.isArray(values[i])) {
        // For some reasons an empty range is converted to a range with a single empty string in it.
        if (values[i].length === 0) {
          values[i] = [""];
        }
        var uniquesOfArray = countUniquePrivate(values[i]);
        for (var key in uniquesOfArray) {
          uniques[key] = true;
        }
      } else {
        uniques[Serializer.serialize(values[i])] = true;
      }
    }
    return uniques;
  };

  var uniques = countUniquePrivate(values);
  return Object.keys(uniques).length;
};


/**
 * Calculates the sum of the products of corresponding entries in two equal-sized arrays or ranges.
 * @param values Arrays or ranges whose entries will be multiplied with corresponding entries in the second such array
 * or range.
 * @returns {number} sum of the products
 * @constructor
 */
var SUMPRODUCT = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  // Ensuring that all values are array values
  for (var x = 0; x < values.length; x++) {
    if (!Array.isArray(values[x])) {
      values[x] = [values[x]];
    }
  }

  // Flatten any nested ranges (arrays) and check for mismatched range sizes
  var flattenedValues = [Filter.flattenAndThrow(values[0])];
  for (var x = 1; x < values.length; x++) {
    flattenedValues.push(Filter.flattenAndThrow(values[x]));
    if (flattenedValues[x].length !== flattenedValues[0].length) {
      throw new CellError(ERRORS.VALUE_ERROR, "SUMPRODUCT has mismatched range sizes. Expected count: "
        + flattenedValues[0].length + ". Actual count: " + flattenedValues[0].length + ".");
    }
  }

  // Do the actual math
  var result = 0;
  for (var i = 0; i < flattenedValues[0].length; i++) {
    var product = 1;
    for (var x = 0; x < flattenedValues.length; x++) {
      product *= TypeCaster.valueToNumberGracefully(flattenedValues[x][i]);
    }
    result += product;
  }
  return result;
};



/**
 * Returns the Fisher transformation of a specified value.
 * @param values[0] value - The value for which to calculate the Fisher transformation.
 * @returns {number} Fisher transformation
 * @constructor
 */
var FISHER = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var x = TypeCaster.firstValueAsNumber(values[0]);
  if (x <= -1 || x >= 1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function FISHER parameter 1 value is " + x + ". Valid values are between -1 and 1 exclusive.");
  }
  return Math.log((1 + x) / (1 - x)) / 2;
};

/**
 * Returns the inverse Fisher transformation of a specified value.
 * @param values[0] value - The value for which to calculate the inverse Fisher transformation.
 * @returns {number} inverse Fisher transformation
 * @constructor
 */
var FISHERINV = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var y = TypeCaster.firstValueAsNumber(values[0]);
  var e2y = Math.exp(2 * y);
  return (e2y - 1) / (e2y + 1);
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