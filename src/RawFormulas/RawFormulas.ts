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
  PI
} from "./Math";
import {
  AND,
  EXACT,
  TRUE,
  NOT
} from "./Logical";
import {
  CHAR,
  CODE
} from "./Misc";
import {
  checkArgumentsAtLeastLength,
  filterOutStringValues,
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
var COMBIN = Formula["COMBIN"];
var COMBINA = Formula["COMBINA"];
var COMPLEX = Formula["COMPLEX"];
var CONCATENATE = Formula["CONCATENATE"];
var CONVERT = Formula["CONVERT"];
var CORREL = Formula["CORREL"];
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
var LN = Formula["LN"];


/**
 * Returns the the logarithm of a number, base 10.
 * @param values[0] The value for which to calculate the logarithm, base 10.
 * @returns {number} logarithm of the number, in base 10.
 * @constructor
 */
var LOG10 = function (...values) : number {
  checkArgumentsLength(values, 1);
  var n = firstValueAsNumber(values[0]);
  if (n < 1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function LOG10 parameter 1 value is " + n + ". It should be greater than 0.");
  }
  var ln = Math.log(n);
  var lb = Math.log(10);
  return ln / lb;
};

/**
 * Returns the the logarithm of a number given a base.
 * @param values[0] The value for which to calculate the logarithm given base.
 * @param values[1] The base to use for calculation of the logarithm. Defaults to 10.
 * @returns {number}
 * @constructor
 */
var LOG = function (...values) : number {
  checkArgumentsAtLeastLength(values, 1);
  var n = firstValueAsNumber(values[0]);
  var b = 10;
  if (values.length > 1) {
    b = firstValueAsNumber(values[1]);
    if (b < 1) {
      throw new CellError(ERRORS.NUM_ERROR, "Function LOG parameter 2 value is " + b + ". It should be greater than 0.");
    }
  }
  if (b < 2) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function LOG caused a divide by zero error.");
  }
  var ln = Math.log(n);
  var lb = Math.log(b);
  if (lb === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function LOG caused a divide by zero error.");
  }
  return ln / lb;
};

/**
 * Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false.
 * TODO: Should this allow the acceptance of functions that return true or false?
 * @param values An expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean}
 * @constructor
 */
var OR = function (...values) {
  checkArgumentsAtLeastLength(values, 1);
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      if (OR.apply(this, values[i])) {
        return true;
      }
    } else if (valueToBoolean(values[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Returns a number raised to a power.
 * @param values[0] The number to raise to the exponent power.
 * @param values[1] The exponent to raise base to.
 * @returns {number} resulting number
 * @constructor
 */
var POWER = function (...values) : number {
  checkArgumentsLength(values, 2);
  var n = firstValueAsNumber(values[0]);
  var p = firstValueAsNumber(values[1]);
  return Math.pow(n, p);
};

var ROUND = Formula["ROUND"];
var ROUNDDOWN = Formula["ROUNDDOWN"];
var ROUNDUP = Formula["ROUNDUP"];
var SPLIT = Formula["SPLIT"];
var SQRTPI = Formula["SQRTPI"];
var SUMIF = Formula["SUMIF"];
var SUMPRODUCT = Formula["SUMPRODUCT"];
var SUMSQ = Formula["SUMSQ"];
var SUMX2MY2 = Formula["SUMX2MY2"];
var SUMX2PY2 = Formula["SUMX2PY2"];

/**
 * Returns the tangent of an angle provided in radians.
 * @param values The angle to find the tangent of, in radians.
 * @returns {number} tangent in radians
 * @constructor
 */
var TAN = function (...values) : number {
  checkArgumentsLength(values, 1);
  var rad = firstValueAsNumber(values[0]);
  return rad === Math.PI ? 0 : Math.tan(rad);
};

/**
 * Returns the hyperbolic tangent of any real number.
 * @param values[0] Any real value to calculate the hyperbolic tangent of.
 * @returns {number} hyperbolic tangent
 * @constructor
 */
var TANH = function (...values) : number {
  checkArgumentsLength(values, 1);
  var rad = firstValueAsNumber(values[0]);
  return Math["tanh"](rad);
};


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