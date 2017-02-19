import {
  ArgsChecker,
  CriteriaFunctionFactory,
  Filter,
  Serializer,
  TypeCaster
} from "./Utils";
import { CellError } from "../Errors";
import * as ERRORS from "../Errors";

/**
 * Returns the absolute value of a number.
 * @param values[0] to get the absolute value of.
 * @returns {number} absolute value
 * @constructor
 */
var ABS = function (...values) {
  ArgsChecker.checkLength(values, 1);
  var v = TypeCaster.valueToNumber(values[0]);
  return Math.abs(v);
};

/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns {number} inverse cosine of value
 * @constructor
 */
var ACOS = function (value?) {
  ArgsChecker.checkLength(arguments, 1);
  value = TypeCaster.valueToNumber(value);
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
  ArgsChecker.checkLength(arguments, 1);
  value = TypeCaster.valueToNumber(value);
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
  ArgsChecker.checkLength(arguments, 1);
  value = TypeCaster.valueToNumber(value);
  if (value <= 1 && value >= -1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function ____ parameter 1 value is " + value + ". Valid values cannot be between -1 and 1 inclusive.")
  }
  return 0.5 * Math.log((value + 1) / (value - 1));
};

/**
 * Computes the value of a Roman numeral.
 * @param text The Roman numeral to format, whose value must be between 1 and 3999, inclusive.
 * @returns {number} value in integer format
 * @constructor
 */
var ARABIC = function (text?) {
  ArgsChecker.checkLength(arguments, 1);
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
  ArgsChecker.checkLength(arguments, 1);
  value = TypeCaster.valueToNumber(value);
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
  ArgsChecker.checkLength(arguments, 1);
  value = TypeCaster.valueToNumber(value);
  return Math.log(value + Math.sqrt(value * value + 1));
};


/**
 * Returns the inverse tangent of a value, in radians.
 * @param value The value for which to calculate the inverse tangent.
 * @returns {number} inverse tangent of input value
 * @constructor
 */
var ATAN = function (value?) {
  ArgsChecker.checkLength(arguments, 1);
  value = TypeCaster.valueToNumber(value);
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
  ArgsChecker.checkLength(arguments, 2);
  x = TypeCaster.valueToNumber(x);
  y = TypeCaster.valueToNumber(y);
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
  ArgsChecker.checkLength(arguments, 1);
  value = TypeCaster.valueToNumber(value);
  if (value >= 1 || value <= -1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function ATANH parameter 1 value is " + value + ". Valid values are between -1 and 1 exclusive.");
  }
  if (Math.abs(value) < 1) {

  }
  return Math["atanh"](value);
};


/**
 * Returns the numerical average value in a dataset, ignoring text.
 * @param values The values or ranges to consider when calculating the average value.
 * @returns {number} the average value of this dataset.
 * @constructor
 */
var AVERAGE = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var result = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + TypeCaster.valueToNumber(values[i]);
      count++;
    }
  }
  return result / count;
};

/**
 * Calculates the average of the magnitudes of deviations of data from a dataset's mean.
 * @param values The value(s) or range(s)
 * @returns {number} average of the magnitudes of deviations of data from a dataset's mean
 * @constructor
 */
var AVEDEV = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);

  // Sort to array-values, and non-array-values
  var arrayValues = [];
  var nonArrayValues = [];
  for (var i = 0; i < values.length; i++) {
    var X = values[i];
    if (X instanceof Array) {
      if (X.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      arrayValues.push(X);
    } else {
      nonArrayValues.push(TypeCaster.valueToNumber(X));
    }
  }

  // Remove string values from array-values, but not from non-array-values, and concat.
  var flatValues = Filter.filterOutStringValues(Filter.flatten(arrayValues)).map(function (value) {
    return TypeCaster.valueToNumber(value);
  }).concat(nonArrayValues);

  // Calculating mean
  var result = 0;
  var count = 0;
  for (var i = 0; i < flatValues.length; i++) {
    result = result + TypeCaster.valueToNumber(flatValues[i]);
    count++;
  }
  var mean = result / count;

  for (var i = 0; i < flatValues.length; i++) {
    flatValues[i] = ABS(TypeCaster.valueToNumber(flatValues[i]) - mean);
  }
  return SUM(flatValues) / flatValues.length;
};

/**
 * Returns the numerical average value in a dataset, coercing text values in ranges to 0 values.
 * @param values value(s) or range(s) to consider when calculating the average value.
 * @returns {number} the numerical average value in a dataset
 * @constructor
 */
var AVERAGEA = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
  var result = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = Filter.stringValuesToZeros(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + TypeCaster.valueToNumber(values[i]);
      count++;
    }
  }
  return result / count;
};

/**
 * Rounds a number up to the nearest even integer.
 * @param values[0] The value to round to the next greatest even number.
 * @returns {number} next greatest even number
 * @constructor
 */
var EVEN = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  if (values[0] instanceof Array) {
    if (values[0].length === 0) {
      throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
    }
    return EVEN(values[0][0]);
  }
  var X = TypeCaster.valueToNumber(values[0]);
  return X % 2 === 1 ? X + 1 : X;
};

/**
 * Returns the maximum value in a numeric dataset.
 * @param values The values or range(s) to consider when calculating the maximum value.
 * @returns {number} the maximum value of the dataset
 * @constructor
 */
var MAX = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
  var maxSoFar = -Infinity;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(values[i]);
      if (filtered.length !== 0) {
        maxSoFar = Math.max(MAX.apply(this, filtered), maxSoFar);
      }
    } else {
      maxSoFar = Math.max(TypeCaster.valueToNumber(values[i]), maxSoFar);
    }
  }
  return maxSoFar;
};

/**
 * Returns the maximum numeric value in a dataset.
 * @param values The value(s) or range(s) to consider when calculating the maximum value.
 * @returns {number} maximum value of the dataset
 * @constructor
 */
var MAXA = function (...values) : number {
  return MAX.apply(this, values);
};


/**
 * Returns the median value in a numeric dataset.
 * @param values The value(s) or range(s) to consider when calculating the median value.
 * @returns {number} the median value of the dataset
 * @constructor
 */
var MEDIAN = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var sortedArray = [];
  values.forEach(function (currentValue) {
    if (currentValue instanceof Array) {
      if (currentValue.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(currentValue);
      sortedArray = sortedArray.concat(filtered);
    } else {
      sortedArray.push(currentValue);
    }
  });
  sortedArray = sortedArray.sort(function (a, b) {
    var aN = TypeCaster.valueToNumber(a);
    var bN = TypeCaster.valueToNumber(b);
    return aN - bN;
  });
  if (sortedArray.length === 1) {
    return TypeCaster.valueToNumber(sortedArray[0]);
  }
  if (sortedArray.length === 0) {
    throw new CellError(ERRORS.NUM_ERROR, "MEDIAN has no valid input data.");
  }
  // even number of values
  if (sortedArray.length % 2 === 0) {
    if (sortedArray.length === 2) {
      return AVERAGE(sortedArray[0], sortedArray[1]);
    }
    var top = sortedArray[sortedArray.length / 2];
    var bottom = sortedArray[(sortedArray.length / 2) - 1];
    return AVERAGE(top, bottom);
  } else {
    // odd number of values
    return sortedArray[Math.round(sortedArray.length / 2) - 1];
  }
};

/**
 * Returns the minimum value in a numeric dataset.
 * @param values The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value of the dataset
 * @constructor
 */
var MIN = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
  var minSoFar = Infinity;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(values[i]);
      if (filtered.length !== 0) {
        minSoFar = Math.min(MIN.apply(this, filtered), minSoFar);
      }
    } else {
      minSoFar = Math.min(TypeCaster.valueToNumber(values[i]), minSoFar);
    }
  }
  return minSoFar;
};


/**
 * Returns the minimum numeric value in a dataset.
 * @param values The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value in the dataset
 * @constructor
 */
var MINA = function (...values) : number {
  return MIN.apply(this, values);
};


/**
 * Returns the result of the modulo operator, the remainder after a division operation.
 * @param values[0] The number to be divided to find the remainder.
 * @param values[1] The number to divide by.
 * @returns {number}
 * @constructor
 */
var MOD = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var oneN = TypeCaster.valueToNumber(values[0]);
  var twoN =  TypeCaster.valueToNumber(values[1]);
  if (twoN === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Function MOD parameter 2 cannot be zero.");
  }
  return oneN % twoN;
};


/**
 * Rounds a number up to the nearest odd integer.
 * @param values[0] The value to round to the next greatest odd number.
 * @returns {number} value to round up to next greatest odd number.
 * @constructor
 */
var ODD = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  if (values[0] instanceof Array) {
    if (values[0].length === 0) {
      throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
    }
    return ODD(values[0][0]);
  }
  var X = TypeCaster.valueToNumber(values[0]);
  return X % 2 === 1 ? X : X + 1;
};

/**
 * Returns a number raised to a power.
 * @param values[0] The number to raise to the exponent power.
 * @param values[1] The exponent to raise base to.
 * @returns {number} resulting number
 * @constructor
 */
var POWER = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  var p = TypeCaster.firstValueAsNumber(values[1]);
  return Math.pow(n, p);
};

/**
 * Returns the sum of a series of numbers and/or cells.
 * @param values The first number or range to add together.
 * @returns {number} The sum of the series
 * @constructor
 */
var SUM = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var result = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      result = result + SUM.apply(this, values[i]);
    } else {
      if (values[i] === "") {
        throw new CellError(ERRORS.VALUE_ERROR, "Function SUM parameter "+i+" expects number values. But '"+values[i]+"' is a text and cannot be coerced to a number.");
      }
      result = result + TypeCaster.valueToNumber(values[i]);
    }
  }
  return result;
};

/**
 * Returns the positive square root of a positive number.
 * @param values[0] The number for which to calculate the positive square root.
 * @returns {number} square root
 * @constructor
 */
var SQRT = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var x = TypeCaster.firstValueAsNumber(values[0]);
  if (x < 0) {
    throw new CellError(ERRORS.VALUE_ERROR, "Function SQRT parameter 1 expects number values. But '" + values[0] + "' is a text and cannot be coerced to a number.");
  }
  return Math.sqrt(x);
};

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
 * Returns the cosine of an angle provided in radians.
 * @param values[0] The angle to find the cosine of, in radians.
 * @returns {number} cosine of angle
 * @constructor
 */
var COS = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var r = TypeCaster.firstValueAsNumber(values[0]);
  return Math.cos(r);
};

/**
 * Returns the hyperbolic cosine of any real number.
 * @param values[0] Any real value to calculate the hyperbolic cosine of.
 * @returns {number} the hyperbolic cosine of the input
 * @constructor
 */
var COSH = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var r = TypeCaster.firstValueAsNumber(values[0]);
  return Math["cosh"](r);
};

/**
 * Returns the cotangent of any real number. Defined as cot(x) = 1 / tan(x).
 * @param values[0] number to calculate the cotangent for
 * @returns {number} cotangent
 * @constructor
 */
var COT = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var x = TypeCaster.firstValueAsNumber(values[0]);
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
  ArgsChecker.checkLength(values, 1);
  var x = TypeCaster.firstValueAsNumber(values[0]);
  if (x === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function COTH caused a divide by zero error.");
  }
  return 1 / Math["tanh"](x);
};

/**
 * Rounds a number down to the nearest integer that is less than or equal to it.
 * @param values[0] The value to round down to the nearest integer.
 * @returns {number} Rounded number
 * @constructor
 */
var INT = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var x = TypeCaster.firstValueAsNumber(values[0]);
  return Math.floor(x);
};


/**
 * Checks whether the provided value is even.
 * @param values[0] The value to be verified as even.
 * @returns {boolean} whether this value is even or not
 * @constructor
 */
var ISEVEN = function (...values) : boolean {
  ArgsChecker.checkLength(values, 1);
  if (values[0] === "") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function ISEVEN parameter 1 expects boolean values. But '" + values[0] + "' is a text and cannot be coerced to a boolean.");
  }
  var x = TypeCaster.firstValueAsNumber(values[0]);
  return Math.floor(x) % 2 === 0;
};


/**
 * Checks whether the provided value is odd.
 * @param values[0] The value to be verified as odd.
 * @returns {boolean} whether this value is odd or not
 * @constructor
 */
var ISODD = function (...values) : boolean {
  ArgsChecker.checkLength(values, 1);
  if (values[0] === "") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function ISODD parameter 1 expects boolean values. But '" + values[0] + "' is a text and cannot be coerced to a boolean.");
  }
  var x = TypeCaster.firstValueAsNumber(values[0]);
  return Math.floor(x) % 2 === 1;
};

/**
 * Returns the sine of an angle provided in radians.
 * @param values[0] The angle to find the sine of, in radians.
 * @returns {number} Sine of angle.
 * @constructor
 */
var SIN = function (...values) {
  ArgsChecker.checkLength(values, 1);
  var rad = TypeCaster.firstValueAsNumber(values[0]);
  return rad === Math.PI ? 0 : Math.sin(rad);
};

/**
 * Returns the hyperbolic sine of any real number.
 * @param values[0] real number to find the hyperbolic sine of
 * @returns {number} hyperbolic sine
 * @constructor
 */
var SINH = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var rad = TypeCaster.firstValueAsNumber(values[0]);
  return Math["sinh"](rad);
};

/**
 * The value Pi.
 * @returns {number} Pi.
 * @constructor
 */
var PI = function () {
  return Math.PI;
};

/**
 * Returns the the logarithm of a number, base 10.
 * @param values[0] The value for which to calculate the logarithm, base 10.
 * @returns {number} logarithm of the number, in base 10.
 * @constructor
 */
var LOG10 = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var n = TypeCaster.firstValueAsNumber(values[0]);
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
  ArgsChecker.checkAtLeastLength(values, 1);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  var b = 10;
  if (values.length > 1) {
    b = TypeCaster.firstValueAsNumber(values[1]);
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
 * Returns the logarithm of a number, base e (Euler's number).
 * @param values[0] The value for which to calculate the logarithm, base e.
 * @returns {number} logarithm calculated
 * @constructor
 */
var LN = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (n < 1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function LN parameter 1 value is " + n + ". It should be greater than 0.");
  }
  return Math.log(n);
};

/**
 * Returns the tangent of an angle provided in radians.
 * @param values The angle to find the tangent of, in radians.
 * @returns {number} tangent in radians
 * @constructor
 */
var TAN = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var rad = TypeCaster.firstValueAsNumber(values[0]);
  return rad === Math.PI ? 0 : Math.tan(rad);
};

/**
 * Returns the hyperbolic tangent of any real number.
 * @param values[0] Any real value to calculate the hyperbolic tangent of.
 * @returns {number} hyperbolic tangent
 * @constructor
 */
var TANH = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var rad = TypeCaster.firstValueAsNumber(values[0]);
  return Math["tanh"](rad);
};

/**
 * Returns the average of a range depending on criteria.
 * @param values[0] criteria_range - The range to check against criterion.
 * @param values[1] criterion - The pattern or test to apply to criteria_range.
 * @param values[2] average_range - [optional] The range to average. If not included, criteria_range is used for the
 * average instead.
 * @returns {number}
 * @constructor
 * TODO: This needs to take nested range values.
 * TODO: This needs to also accept a third parameter "average_range"
 */
var AVERAGEIF = function (...values) {
  ArgsChecker.checkLength(values, 2);
  var range = values[0];
  var criteriaEvaluation = CriteriaFunctionFactory.createCriteriaFunction(values[1]);

  var result = 0;
  var count = 0;
  for (var i = 0; i < range.length; i++) {
    var val = TypeCaster.valueToNumber(range[i]);
    if (criteriaEvaluation(val)) {
      result = result + val;
      count++;
    }
  }
  if (count === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function AVERAGEIF caused a divide by zero error.");
  }
  return result / count;
};

/**
 * Rounds a number up to the nearest integer multiple of specified significance.
 * @param values[0] The value to round up to the nearest integer multiple of factor.
 * @param values[1] The number to whose multiples value will be rounded.
 * @returns {number}
 * @constructor
 */
var CEILING = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var num = TypeCaster.firstValueAsNumber(values[0]);
  if (values.length === 1) {
    return Math.ceil(num);
  }
  var significance = TypeCaster.firstValueAsNumber(values[1]);
  if (significance === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Function CEILING parameter 2 cannot be zero.");
  }
  var precision = -Math.floor(Math.log(significance) / Math.log(10));
  if (num >= 0) {
    return ROUND(Math.ceil(num / significance) * significance, precision);
  } else {
    return -ROUND(Math.floor(Math.abs(num) / significance) * significance, precision);
  }
};

/**
 * Rounds a number down to the nearest integer multiple of specified significance.
 * @param values[0] The value to round down to the nearest integer multiple of factor.
 * @param values[1] The number to whose multiples value will be rounded.
 * @returns {number}
 * @constructor
 */
var FLOOR = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var num = TypeCaster.firstValueAsNumber(values[0]);
  if (values.length === 1) {
    return Math.floor(num);
  }
  var significance = TypeCaster.firstValueAsNumber(values[1]);
  if (significance === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Function FLOOR parameter 2 cannot be zero.");
  }
  significance = significance ? Math.abs(significance) : 1;
  var precision = -Math.floor(Math.log(significance) / Math.log(10));
  if (num >= 0) {
    return ROUND(Math.floor(num / significance) * significance, precision);
  }
  return -ROUND(Math.floor(Math.abs(num) / significance) * significance, precision);
};

/**
 * Returns one value if a logical expression is TRUE and another if it is FALSE.
 * @param values[0] An expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE.
 * @param values[1] The value the function returns if logical_expression is TRUE
 * @param values[2] The value the function returns if logical_expression is FALSE.
 * @returns one value if a logical expression is TRUE and another if it is FALSE.
 * @constructor
 */
var IF = function (...values) : any {
  ArgsChecker.checkLength(values, 3);
  if (values[0] instanceof Array) {
    if (values[0].length === 0) {
      throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
    }
    return IF(values[0][0], values[1], values[2]);
  } else if (values[0] === "") {
    return values[2];
  }
  return (TypeCaster.valueToBoolean(values[0])) ? values[1] : values[2];
};

/**
 * Returns the a count of the number of numeric values in a dataset.
 * @param values The values or ranges to consider when counting.
 * @returns {number} number of numeric values in a dataset.
 * @constructor
 */
var COUNT = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length > 0) {
        count += COUNT.apply(this, values[i]);
      }
    } else if (TypeCaster.canCoerceToNumber(values[i])) {
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
 * TODO: This needs to take nested range values.
 */
var COUNTIF = function (...values) {
  ArgsChecker.checkLength(values, 2);
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
 * Returns the count of a range depending on multiple criteria.
 * @param values[0] criteria_range1 - The range to check against criterion1.
 * @param values[1] criterion1 - The pattern or test to apply to criteria_range1.
 * @param values[2...N] Repeated sets of ranges and criterion to check.
 * @returns {number} count
 * @constructor
 * TODO: This needs to take nested range values.
 */
var COUNTIFS = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 2);
  var criteriaEvaluationFunctions = values.map(function (criteria, index) {
    if (index % 2 === 1) {
      return CriteriaFunctionFactory.createCriteriaFunction(criteria);
    } else {
      return function () {return false;}
    }
  });

  var count = 0;
  // For every value in the range
  for (var i = 0; i < values[0].length; i++) {
    // check for criteria eval for other ranges and other criteria pairs
    var otherCriteriaEvaluationSuccessfulSoFar = true;
    for (var x = 0; x < values.length; x += 2) {
      if (values[x].length < values[0].length) {
        throw new CellError(ERRORS.VALUE_ERROR, "Array arguments to COUNTIFS are of different size.");
      }
      var criteriaEvaluation = criteriaEvaluationFunctions[x+1];
      if (otherCriteriaEvaluationSuccessfulSoFar) {
        if (!criteriaEvaluation(values[x][i])) { // evaluate THIS value with x+1 index, which is criteria
          otherCriteriaEvaluationSuccessfulSoFar = false;
        }
      }
    }
    if (otherCriteriaEvaluationSuccessfulSoFar) {
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
  ArgsChecker.checkAtLeastLength(values, 1);
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
  ArgsChecker.checkLengthWithin(values, 1, 2);
  if (values.length === 1) {
    return TypeCaster.valueToNumber(values[0]) === 0 ? 1 : 0;
  }
  return TypeCaster.valueToNumber(values[0]) === TypeCaster.valueToNumber(values[1]) ? 1 : 0;
};

/**
 * Rounds a number to a certain number of decimal places according to standard rules.
 * @param values[0] The value to round to places number of places.
 * @param values[1] The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUND = function (...values) {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (values.length === 1) {
    return Math.round(n);
  }
  var d = TypeCaster.firstValueAsNumber(values[1]);
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
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (values.length === 1) {
    return Math.floor(n);
  }
  var d = TypeCaster.firstValueAsNumber(values[1]);
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
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (values.length === 1) {
    return Math.ceil(n);
  }
  var d = TypeCaster.firstValueAsNumber(values[1]);
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
 * TODO: This needs to take nested range values.
 */
var SUMIF = function (...values) {
  ArgsChecker.checkLengthWithin(values, 2, 3);
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
    if (values.length === 2 && TypeCaster.canCoerceToNumber(x) && criteriaEvaluation(x)) {
      sum = sum + TypeCaster.valueToNumber(x);
    } else if (values.length === 3 && TypeCaster.canCoerceToNumber(sumRange[i]) && criteriaEvaluation(x)) {
      sum = sum + TypeCaster.valueToNumber(sumRange[i]);
    }
  }
  return sum;
};

/**
 * Returns the sum of the squares of a series of numbers and/or cells.
 * @param values  The values or range(s) whose squares to add together.
 * @returns {number} the sum of the squares if the input.
 * @constructor
 */
var SUMSQ = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
  var result = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      result = result + SUMSQ.apply(this, Filter.filterOutNonNumberValues(values[i]));
    } else {
      var n = TypeCaster.valueToNumber(values[i]);
      result = result + (n * n);
    }
  }
  return result;
};


/**
 * Truncates a number to a certain number of significant digits by omitting less significant digits.
 * @param values[0] The value to be truncated.
 * @param values[1]  [ OPTIONAL - 0 by default ] - The number of significant digits to the right of the decimal point to
 * retain. If places is greater than the number of significant digits in value, value is returned without modification.
 * places may be negative, in which case the specified number of digits to the left of the decimal place are changed to
 * zero. All digits to the right of the decimal place are discarded. If all digits of value are changed to zero, TRUNC
 * simply returns 0.
 * @returns {number} after truncation
 * @constructor
 */
var TRUNC = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  var digits = 0;
  if (values.length === 2) {
    digits = TypeCaster.firstValueAsNumber(values[1]);
  }
  var sign = (n > 0) ? 1 : -1;
  return sign * (Math.floor(Math.abs(n) * Math.pow(10, digits))) / Math.pow(10, digits);
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
 * Calculates the sum of squares of deviations based on a sample.
 * @param values The values or ranges of the sample.
 * @returns {number} sum of squares of deviations
 * @constructor
 */
var DEVSQ = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var range = Filter.flattenAndThrow(values);
  var result = 0;
  var count = 0;
  for (var i = 0; i < range.length; i++) {
    result = result + TypeCaster.valueToNumber(range[i]);
    count++;
  }
  var mean = result / count;
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    result += Math.pow((TypeCaster.valueToNumber(range[i]) - mean), 2);
  }
  return result;
};

/**
 * Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input x.
 * Alternately called Fisher-Snedecor distribution or Snecdor's F distribution.
 * @param values[0] x - The input to the F probability distribution function. The value at which to evaluate the function.
 * Must be a positive number.
 * @param values[1] degrees_freedom1 - The numerator degrees of freedom.
 * @param values[2] degrees_freedom2 - The denominator degrees of freedom.
 * @param values[3] cumulative - Logical value that determines the form of the function. If true returns the cumulative
 * distribution function. If false returns the probability density function.
 * @returns {number|undefined|boolean} left-tailed F probability distribution
 * @constructor
 * TODO: This function should be stricter in its return type.
 */
var FDIST$LEFTTAILED = function (...values) : number|undefined|boolean {
  function gammaln(x) {
    var j = 0;
    var cof = [
      76.18009172947146, -86.50532032941677, 24.01409824083091,
      -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
    ];
    var ser = 1.000000000190015;
    var xx, y, tmp;
    tmp = (y = xx = x) + 5.5;
    tmp -= (xx + 0.5) * Math.log(tmp);
    for (; j < 6; j++)
      ser += cof[j] / ++y;
    return Math.log(2.5066282746310005 * ser / xx) - tmp;
  }
  function gammafn(x) {
    var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
      629.3311553128184, 866.9662027904133, -31451.272968848367,
      -36144.413418691176, 66456.14382024054
    ];
    var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
      -3107.771671572311, 22538.118420980151, 4755.8462775278811,
      -134659.9598649693, -115132.2596755535];
    var fact;
    var n = 0;
    var xden = 0;
    var xnum = 0;
    var y = x;
    var i, z, yi, res;
    if (y <= 0) {
      res = y % 1 + 3.6e-16;
      if (res) {
        fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
        y = 1 - y;
      } else {
        return Infinity;
      }
    }
    yi = y;
    if (y < 1) {
      z = y++;
    } else {
      z = (y -= n = (y | 0) - 1) - 1;
    }
    for (i = 0; i < 8; ++i) {
      xnum = (xnum + p[i]) * z;
      xden = xden * z + q[i];
    }
    res = xnum / xden + 1;
    if (yi < y) {
      res /= yi;
    } else if (yi > y) {
      for (i = 0; i < n; ++i) {
        res *= y;
        y++;
      }
    }
    if (fact) {
      res = fact / res;
    }
    return res;
  }
  function betacf(x, a, b) {
    var fpmin = 1e-30;
    var m = 1;
    var qab = a + b;
    var qap = a + 1;
    var qam = a - 1;
    var c = 1;
    var d = 1 - qab * x / qap;
    var m2, aa, del, h;

    // These q's will be used in factors that occur in the coefficients
    if (Math.abs(d) < fpmin)
      d = fpmin;
    d = 1 / d;
    h = d;

    for (; m <= 100; m++) {
      m2 = 2 * m;
      aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      // One step (the even one) of the recurrence
      d = 1 + aa * d;
      if (Math.abs(d) < fpmin)
        d = fpmin;
      c = 1 + aa / c;
      if (Math.abs(c) < fpmin)
        c = fpmin;
      d = 1 / d;
      h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      // Next step of the recurrence (the odd one)
      d = 1 + aa * d;
      if (Math.abs(d) < fpmin)
        d = fpmin;
      c = 1 + aa / c;
      if (Math.abs(c) < fpmin)
        c = fpmin;
      d = 1 / d;
      del = d * c;
      h *= del;
      if (Math.abs(del - 1.0) < 3e-7)
        break;
    }

    return h;
  }
  function ibeta(x, a, b) {
    // Factors in front of the continued fraction.
    var bt = (x === 0 || x === 1) ?  0 :
      Math.exp(gammaln(a + b) - gammaln(a) -
        gammaln(b) + a * Math.log(x) + b *
        Math.log(1 - x));
    if (x < 0 || x > 1)
      return false;
    if (x < (a + 1) / (a + b + 2))
    // Use continued fraction directly.
      return bt * betacf(x, a, b) / a;
    // else use continued fraction after making the symmetry transformation.
    return 1 - bt * betacf(1 - x, b, a) / b;
  }
  function cdf(x, df1, df2) {
    return ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
  }
  function pdf(x, df1, df2) {
    if (x < 0) {
      return undefined;
    }
    return Math.sqrt((Math.pow(df1 * x, df1) * Math.pow(df2, df2)) /
        (Math.pow(df1 * x + df2, df1 + df2))) /
      (x * betafn(df1/2, df2/2));
  }
  function betaln(x, y) {
    return gammaln(x) + gammaln(y) - gammaln(x + y);
  }
  function betafn(x, y) {
    // ensure arguments are positive
    if (x <= 0 || y <= 0)
      return undefined;
    // make sure x + y doesn't exceed the upper limit of usable values
    return (x + y > 170) ? Math.exp(betaln(x, y)) : gammafn(x) * gammafn(y) / gammafn(x + y);
  }
  ArgsChecker.checkLength(values, 4);
  var x = TypeCaster.firstValueAsNumber(values[0]);
  if (x < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function F.DIST parameter 1 value is " + x + ". It should be greater than or equal to 0.");
  }
  var d1 = TypeCaster.firstValueAsNumber(values[1]);
  var d2 = TypeCaster.firstValueAsNumber(values[2]);
  var cumulative = TypeCaster.firstValueAsBoolean(values[3]);
  return (cumulative) ? cdf(x, d1, d2) : pdf(x, d1, d2);
};

/**
 * Returns the complementary Gauss error function of a value.
 * @param values[0] The number for which to calculate the complementary Gauss error function.
 * @returns {number} complementary Gauss error function of a value
 * @constructor
 */
var ERFC = function (...values) {
  ArgsChecker.checkLength(values, 1);
  var v = TypeCaster.firstValueAsNumber(values[0]);
  return v === 0 ? 1 : 1 - erf(v);
};


/**
 * Returns the error function integrated between lower_limit and upper_limit.
 * @param values[0] lower_limit - The lower bound for integrating ERF.
 * @param values[1] upper_limit - [Optional]. The upper bound for integrating ERF. If omitted, ERF integrates between
 * zero and lower_limit.
 * @returns {number} error function integrated between lower_limit and upper_limit
 * @constructor
 */
var ERF = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var lower = TypeCaster.firstValueAsNumber(values[0]);
  var upper = values.length === 2 ? TypeCaster.firstValueAsNumber(values[1]) : 0;
  return values.length === 1 ? erf(lower) : erf(upper) - erf(lower);
};

// erf function from jStat [http://www.jstat.org/]
function erf(x) {
  var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
    -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
    4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
    1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
    6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
    -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
    -6.886027e-12, 8.94487e-13, 3.13092e-13,
    -1.12708e-13, 3.81e-16, 7.106e-15,
    -1.523e-15, -9.4e-17, 1.21e-16,
    -2.8e-17];
  var j = cof.length - 1;
  var isneg = false;
  var d = 0;
  var dd = 0;
  var t, ty, tmp, res;

  if (x < 0) {
    x = -x;
    isneg = true;
  }

  t = 2 / (2 + x);
  ty = 4 * t - 2;

  for(; j > 0; j--) {
    tmp = d;
    d = ty * d - dd + cof[j];
    dd = tmp;
  }

  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
  return isneg ? res - 1 : 1 - res;
}


/**
 * Returns the inverse of the (right-tailed) F probability distribution. If p = FDIST(x,...), then FINV(p,...) = x. The
 * F distribution can be used in an F-test that compares the degree of variability in two data sets.
 * @param values[0] probability - A probability associated with the F cumulative distribution.
 * @param values[1] deg_freedom1 - Required. The numerator degrees of freedom.
 * @param values[2] deg_freedom2 - Required. The denominator degrees of freedom.
 * @returns {number} inverse of the (right-tailed) F probability distribution
 * @constructor
 * TODO: This function needs to be tested more thuroughly.
 */
var FINV = function (...values) : number {
  function betacf(x, a, b) {
    var fpmin = 1e-30;
    var m = 1;
    var qab = a + b;
    var qap = a + 1;
    var qam = a - 1;
    var c = 1;
    var d = 1 - qab * x / qap;
    var m2, aa, del, h;

    // These q's will be used in factors that occur in the coefficients
    if (Math.abs(d) < fpmin)
      d = fpmin;
    d = 1 / d;
    h = d;

    for (; m <= 100; m++) {
      m2 = 2 * m;
      aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      // One step (the even one) of the recurrence
      d = 1 + aa * d;
      if (Math.abs(d) < fpmin)
        d = fpmin;
      c = 1 + aa / c;
      if (Math.abs(c) < fpmin)
        c = fpmin;
      d = 1 / d;
      h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      // Next step of the recurrence (the odd one)
      d = 1 + aa * d;
      if (Math.abs(d) < fpmin)
        d = fpmin;
      c = 1 + aa / c;
      if (Math.abs(c) < fpmin)
        c = fpmin;
      d = 1 / d;
      del = d * c;
      h *= del;
      if (Math.abs(del - 1.0) < 3e-7)
        break;
    }

    return h;
  }
  function ibeta(x, a, b) : number {
    // Factors in front of the continued fraction.
    var bt = (x === 0 || x === 1) ?  0 :
      Math.exp(gammaln(a + b) - gammaln(a) -
        gammaln(b) + a * Math.log(x) + b *
        Math.log(1 - x));
    if (x < 0 || x > 1)
      // WARNING: I changed this to 0, because TS complains about doing numerical operations on boolean values.
      // Still safe in javascript, but not TS.
      return 0;
    if (x < (a + 1) / (a + b + 2))
    // Use continued fraction directly.
      return bt * betacf(x, a, b) / a;
    // else use continued fraction after making the symmetry transformation.
    return 1 - bt * betacf(1 - x, b, a) / b;
  }
  function gammaln(x) {
    var j = 0;
    var cof = [
      76.18009172947146, -86.50532032941677, 24.01409824083091,
      -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
    ];
    var ser = 1.000000000190015;
    var xx, y, tmp;
    tmp = (y = xx = x) + 5.5;
    tmp -= (xx + 0.5) * Math.log(tmp);
    for (; j < 6; j++)
      ser += cof[j] / ++y;
    return Math.log(2.5066282746310005 * ser / xx) - tmp;
  }
  function ibetainv(p, a, b) {
    var EPS = 1e-8;
    var a1 = a - 1;
    var b1 = b - 1;
    var j = 0;
    var lna, lnb, pp, t, u, err, x, al, h, w, afac;
    if (p <= 0)
      return 0;
    if (p >= 1)
      return 1;
    if (a >= 1 && b >= 1) {
      pp = (p < 0.5) ? p : 1 - p;
      t = Math.sqrt(-2 * Math.log(pp));
      x = (2.30753 + t * 0.27061) / (1 + t* (0.99229 + t * 0.04481)) - t;
      if (p < 0.5)
        x = -x;
      al = (x * x - 3) / 6;
      h = 2 / (1 / (2 * a - 1)  + 1 / (2 * b - 1));
      w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) *
        (al + 5 / 6 - 2 / (3 * h));
      x = a / (a + b * Math.exp(2 * w));
    } else {
      lna = Math.log(a / (a + b));
      lnb = Math.log(b / (a + b));
      t = Math.exp(a * lna) / a;
      u = Math.exp(b * lnb) / b;
      w = t + u;
      if (p < t / w)
        x = Math.pow(a * w * p, 1 / a);
      else
        x = 1 - Math.pow(b * w * (1 - p), 1 / b);
    }
    afac = -gammaln(a) - gammaln(b) + gammaln(a + b);
    for(; j < 10; j++) {
      if (x === 0 || x === 1)
        return x;
      err = ibeta(x, a, b) - p;
      t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
      u = err / t;
      x -= (t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))));
      if (x <= 0)
        x = 0.5 * (x + t);
      if (x >= 1)
        x = 0.5 * (x + t + 1);
      if (Math.abs(t) < EPS * x && j > 0)
        break;
    }
    return x;
  }
  function inv(x, df1, df2) {
    return df2 / (df1 * (1 / ibetainv(x, df1 / 2, df2 / 2) - 1));
  }
  ArgsChecker.checkLength(values, 3);
  var probability = TypeCaster.firstValueAsNumber(values[0]);
  if (probability <= 0.0 || probability > 1.0) {
    // TODO: Throw num error.
  }
  var d1 = TypeCaster.firstValueAsNumber(values[1]);
  var d2 = TypeCaster.firstValueAsNumber(values[2]);
  return inv(1.0 - probability, d1, d2);
};

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

/**
 * Calculates the annual effective interest rate given the nominal rate and number of compounding periods per year.
 * @param values[0] nominal_rate - The nominal interest rate per year.
 * @param values[1] periods_per_year - The number of compounding periods per year.
 * @returns {number} annual effective interest rate
 * @constructor
 */
var EFFECT = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var rate = TypeCaster.firstValueAsNumber(values[0]);
  var periods = TypeCaster.firstValueAsNumber(values[1]);
  if (rate <= 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function EFFECT parameter 1 value is " + rate + ". It should be greater than to 0");
  }
  if (periods < 1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function EFFECT parameter 2 value is " + periods + ". It should be greater than or equal to 1");
  }
  periods = Math.floor(periods);
  return Math.pow(1 + rate / periods, periods) - 1;
};


export {
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
}