/// <reference path="../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import * as Formula from "formulajs"
import { CellError } from "./Errors"
import * as ERRORS from "./Errors"


/**
 * Checks to see if the arguments are of the correct length.
 * @param args to check length of
 * @param length expected length
 */
function checkArgumentsLength(args: any, length: number) {
  if (args.length !== length) {
    throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ABS. Expected 1 arguments, but got " + args.length + " arguments.");
  }
}

/**
 * Checks to see if the arguments are at least a certain length.
 * @param args to check length of
 * @param length expected length
 */
function checkArgumentsAtLeastLength(args: any, length: number) {
  if (args.length < length) {
    throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ABS. Expected 1 arguments, but got " + args.length + " arguments.");
  }
}


/**
 * Converts any value to a number or throws an error if it cannot coerce it to the number type
 * @param value to convert
 * @returns {number} to return. Will always return a number or throw an error. Never returns undefined.
 */
function valueToNumber(value: any) : number {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    if (value.indexOf(".") > -1) {
      var fl = parseFloat(value);
      if (isNaN(fl)) {
        throw new CellError(ERRORS.VALUE_ERROR, "Function ____ parameter 1 expects number values, but is text and cannot be coerced to a number.");
      }
      return fl;
    }
    var fl = parseInt(value);
    if (isNaN(fl)) {
      throw new CellError(ERRORS.VALUE_ERROR, "Function ____ parameter 1 expects number values, but is text and cannot be coerced to a number.");
    }
    return fl;
  } else if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return 0;
}

/**
 * Returns the absolute value of a number.
 * @param value to get the absolute value of.
 * @returns {number} absolute value
 * @constructor
 */
var ABS = function (value?) {
  checkArgumentsLength(arguments, 1);
  value = valueToNumber(value);
  return Math.abs(value);
};

var ACCRINT = function (issue, first, settlement, rate, par, frequency, basis) {
  // Return error if either date is invalid
  if (!moment(issue).isValid() || !moment(first).isValid() || !moment(settlement).isValid()) {
    return '#VALUE!';
  }

  // Set default values
  par = (typeof par === 'undefined') ? 0 : par;
  basis = (typeof basis === 'undefined') ? 0 : basis;

  // Return error if either rate or par are lower than or equal to zero
  if (rate <= 0 || par <= 0) {
    return '#NUM!';
  }

  // Return error if frequency is neither 1, 2, or 4
  if ([1, 2, 4].indexOf(frequency) === -1) {
    return '#NUM!';
  }

  // Return error if basis is neither 0, 1, 2, 3, or 4
  if ([0, 1, 2, 3, 4].indexOf(basis) === -1) {
    return '#NUM!';
  }

  // Return error if issue greater than or equal to settlement
  if (moment(issue).diff(moment(settlement)) >= 0) {
    return '#NUM!';
  }

  // Compute accrued interest
  var factor : any = 0;
  switch (basis) {
    case 0:
      // US (NASD) 30/360
      factor = YEARFRAC(issue, settlement, basis);
      break;
    case 1:
      // Actual/actual
      factor = YEARFRAC(issue, settlement, basis);
      break;
    case 2:
      // Actual/360
      factor = YEARFRAC(issue, settlement, basis);
      break;
    case 3:
      // Actual/365
      factor = YEARFRAC(issue, settlement, basis);
      break;
    case 4:
      // European 30/360
      factor = YEARFRAC(issue, settlement, basis);
      break;
  }
  return par * rate * factor;
};

/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns {number} inverse cosine of value
 * @constructor
 */
var ACOS = function (value?) {
  checkArgumentsLength(arguments, 1);
  value = valueToNumber(value);
  if (value === -1) {
    return Math.PI;
  } else if (value > 1 || value < -1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function ____ parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
  }
  return Math.acos(value);
};

/**
 * Returns the inverse hyperbolic cosine of a number.
 * @param value The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @returns {number} to find the inverse hyperbolic cosine for.
 * @constructor
 */
var ACOSH = function (value?) {
  checkArgumentsLength(arguments, 1);
  value = valueToNumber(value);
  if (value < 1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function ____ parameter 1 value is " + value + ". It should be greater than or equal to 1.");
  }
  return Math.log(value + Math.sqrt(value * value - 1));
};

/**
 * Calculate the hyperbolic arc-cotangent of a value
 * @param value number not between -1 and 1 inclusively.
 * @returns {number} hyperbolic arc-cotangent
 * @constructor
 */
var ACOTH = function (value?) {
  checkArgumentsLength(arguments, 1);
  value = valueToNumber(value);
  if (value <= 1 && value >= -1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function ____ parameter 1 value is " + value + ". Valid values cannot be between -1 and 1 inclusive.")
  }
  return 0.5 * Math.log((value + 1) / (value - 1));
};


/**
 * Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.
 * @param values At least one expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean} if all values are logically true.
 * @constructor
 */
var AND = function (...values) {
  checkArgumentsAtLeastLength(values, 1);
  var result = true;
  for (var i = 0; i < values.length; i++) {
    if (typeof values[i] === "string") {
      throw new CellError(ERRORS.VALUE_ERROR, "AND expects boolean values. But '" + values[i] + "' is a text and cannot be coerced to a boolean.")
    } else if (values[i] instanceof Array) {
      if (!AND.apply(this, values[i])) {
        result = false;
        break;
      }
    } else if (!values[i]) {
      result = false;
      break;
    }
  }
  return result;
};


/**
 * Computes the value of a Roman numeral.
 * @param text The Roman numeral to format, whose value must be between 1 and 3999, inclusive.
 * @returns {number} value in integer format
 * @constructor
 */
var ARABIC = function (text?) {
  checkArgumentsLength(arguments, 1);
  if (typeof text !== "string") {
    throw new CellError(ERRORS.VALUE_ERROR, 'Invalid roman numeral in ARABIC evaluation.');
  }
  var negative = false;
  if (text[0] === "-") {
    negative = true;
    text = text.substr(1);
  }
  // Credits: Rafa? Kukawski
  if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
    throw new CellError(ERRORS.VALUE_ERROR, 'Invalid roman numeral in ARABIC evaluation.');
  }
  var r = 0;
  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
    r += {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1}[i];
  });
  if (negative) {
    return r * -1;
  }
  return r;
};

/**
 * Returns the inverse sine of a value, in radians.
 * @param value The value for which to calculate the inverse sine. Must be between -1 and 1, inclusive.
 * @returns {number} inverse sine of input value
 * @constructor
 */
var ASIN = function (value?) {
  checkArgumentsLength(arguments, 1);
  value = valueToNumber(value);
  if (value === -1) {
    return Math.PI;
  } else if (value > 1 || value < -1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function ____ parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
  }
  return Math.asin(value);
};

/**
 * Returns the inverse hyperbolic sine of a number.
 * @param value The value for which to calculate the inverse hyperbolic sine.
 * @returns {number} inverse hyperbolic sine of input
 * @constructor
 */
var ASINH = function (value?) {
  checkArgumentsLength(arguments, 1);
  value = valueToNumber(value);
  return Math.log(value + Math.sqrt(value * value + 1));
};


/**
 * Returns the inverse tangent of a value, in radians.
 * @param value The value for which to calculate the inverse tangent.
 * @returns {number} inverse tangent of input value
 * @constructor
 */
var ATAN = function (value?) {
  checkArgumentsLength(arguments, 1);
  value = valueToNumber(value);
  if (value === -1) {
    return Math.PI;
  } else if (value > 1 || value < -1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function ____ parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
  }
  return Math.atan(value);
};


/**
 * Returns the angle between the x-axis and a line segment from the origin (0,0) to specified coordinate pair (x,y), in radians.
 * @param x The x coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis.
 * @param y The y coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis.
 * @returns {number} angle in radians
 * @constructor
 */
var ATAN2 = function (x, y) {
  checkArgumentsLength(arguments, 2);
  x = valueToNumber(x);
  y = valueToNumber(y);
  if (x === 0 && y === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function ATAN2 caused a divide by zero error.");
  }
  return Math.atan2(y, x);
};


/**
 * Returns the inverse hyperbolic tangent of a number.
 * @param value The value for which to calculate the inverse hyperbolic tangent. Must be between -1 and 1, exclusive.
 * @returns {number} inverse hyperbolic tangent of input
 * @constructor
 */
var ATANH = function (value?) : number {
  checkArgumentsLength(arguments, 1);
  value = valueToNumber(value);
  if (value >= 1 || value <= -1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function ATANH parameter 1 value is " + value + ". Valid values are between -1 and 1 exclusive.");
  }
  if (Math.abs(value) < 1) {

  }
  return Math["atanh"](value);
};


var AVEDEV = Formula["AVEDEV"];
var AVERAGE = Formula["AVERAGE"];
var AVERAGEA = Formula["AVERAGEA"];
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
var CHAR = Formula["CHAR"];
var CODE = Formula["CODE"];
var COMBIN = Formula["COMBIN"];
var COMBINA = Formula["COMBINA"];
var COMPLEX = Formula["COMPLEX"];
var CONCATENATE = Formula["CONCATENATE"];
var CONVERT = Formula["CONVERT"];
var CORREL = Formula["CORREL"];
var COS = Formula["COS"];
var PI = function () {
  return Math.PI;
};
var COSH = Formula["COSH"];
var COT = Formula["COT"];
var COTH = Formula["COTH"];
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
var EVEN = Formula["EVEN"];
var EXACT = Formula["EXACT"];
var EXPONDIST = Formula["EXPONDIST"];
var FALSE = Formula["FALSE"];
var __COMPLEX = {
  "F.DIST": Formula["FDIST"],
  "F.INV": Formula["FINV"]
};
var FISHER = Formula["FISHER"];
var FISHERINV = Formula["FISHERINV"];
var IF = Formula["IF"];
var INT = Formula["INT"];
var ISEVEN = Formula["ISEVEN"];
var ISODD = Formula["ISODD"];
var LN = Formula["LN"];
var LOG = Formula["LOG"];
var LOG10 = Formula["LOG10"];
var MAX = Formula["MAX"];
var MAXA = Formula["MAXA"];
var MEDIAN = Formula["MEDIAN"];
var MIN = Formula["MIN"];
var MINA = Formula["MINA"];
var MOD = Formula["MOD"];
var TRUE = Formula["TRUE"];
var NOT = Formula["NOT"];
var ODD = Formula["ODD"];
var OR = Formula["OR"];
var POWER = Formula["POWER"];
var ROUND = Formula["ROUND"];
var ROUNDDOWN = Formula["ROUNDDOWN"];
var ROUNDUP = Formula["ROUNDUP"];
var SIN = function (rad) {
  return rad === Math.PI ? 0 : Math.sin(rad);
};
var SINH = Formula["SINH"];
var SPLIT = Formula["SPLIT"];
var SQRT = Formula["SQRT"];
var SQRTPI = Formula["SQRTPI"];
var SUM = Formula["SUM"];
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