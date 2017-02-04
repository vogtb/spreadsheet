import { checkArgumentsLength, checkArgumentsAtLeastLength, valueToNumber, filterOutStringValues, flatten,
    stringValuesToZeros, firstValueAsNumber, valueToBoolean} from "./Utils"
import { CellError } from "../Errors"
import * as ERRORS from "../Errors"

/**
 * Returns the absolute value of a number.
 * @param values[0] to get the absolute value of.
 * @returns {number} absolute value
 * @constructor
 */
var ABS = function (...values) {
  checkArgumentsLength(values, 1);
  var v = valueToNumber(values[0]);
  return Math.abs(v);
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


/**
 * Returns the numerical average value in a dataset, ignoring text.
 * @param values The values or ranges to consider when calculating the average value.
 * @returns {number} the average value of this dataset.
 * @constructor
 */
var AVERAGE = function (...values) : number {
  checkArgumentsAtLeastLength(values, 1);
  var result = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = filterOutStringValues(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + valueToNumber(values[i]);
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
  checkArgumentsAtLeastLength(values, 1);

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
      nonArrayValues.push(valueToNumber(X));
    }
  }

  // Remove string values from array-values, but not from non-array-values, and concat.
  var flatValues = filterOutStringValues(flatten(arrayValues)).map(function (value) {
    return valueToNumber(value);
  }).concat(nonArrayValues);

  // Calculating mean
  var result = 0;
  var count = 0;
  for (var i = 0; i < flatValues.length; i++) {
    result = result + valueToNumber(flatValues[i]);
    count++;
  }
  var mean = result / count;

  for (var i = 0; i < flatValues.length; i++) {
    flatValues[i] = ABS(valueToNumber(flatValues[i]) - mean);
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
  checkArgumentsAtLeastLength(values, 1);
  var result = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = stringValuesToZeros(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + valueToNumber(values[i]);
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
  checkArgumentsLength(values, 1);
  if (values[0] instanceof Array) {
    if (values[0].length === 0) {
      throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
    }
    return EVEN(values[0][0]);
  }
  var X = valueToNumber(values[0]);
  return X % 2 === 1 ? X + 1 : X;
};

/**
 * Returns the maximum value in a numeric dataset.
 * @param values The values or range(s) to consider when calculating the maximum value.
 * @returns {number} the maximum value of the dataset
 * @constructor
 */
var MAX = function (...values) {
  checkArgumentsAtLeastLength(values, 1);
  var maxSoFar = -Infinity;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = filterOutStringValues(values[i]);
      if (filtered.length !== 0) {
        maxSoFar = Math.max(MAX.apply(this, filtered), maxSoFar);
      }
    } else {
      maxSoFar = Math.max(valueToNumber(values[i]), maxSoFar);
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
  checkArgumentsAtLeastLength(values, 1);
  var sortedArray = [];
  values.forEach(function (currentValue) {
    if (currentValue instanceof Array) {
      if (currentValue.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = filterOutStringValues(currentValue);
      sortedArray = sortedArray.concat(filtered);
    } else {
      sortedArray.push(currentValue);
    }
  });
  sortedArray = sortedArray.sort(function (a, b) {
    var aN = valueToNumber(a);
    var bN = valueToNumber(b);
    return aN - bN;
  });
  if (sortedArray.length === 1) {
    return valueToNumber(sortedArray[0]);
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
  checkArgumentsAtLeastLength(values, 1);
  var minSoFar = Infinity;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = filterOutStringValues(values[i]);
      if (filtered.length !== 0) {
        minSoFar = Math.min(MIN.apply(this, filtered), minSoFar);
      }
    } else {
      minSoFar = Math.min(valueToNumber(values[i]), minSoFar);
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
  checkArgumentsLength(values, 2);
  var oneN = valueToNumber(values[0]);
  var twoN =  valueToNumber(values[1]);
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
  checkArgumentsLength(values, 1);
  if (values[0] instanceof Array) {
    if (values[0].length === 0) {
      throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
    }
    return ODD(values[0][0]);
  }
  var X = valueToNumber(values[0]);
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
  checkArgumentsLength(values, 2);
  var n = firstValueAsNumber(values[0]);
  var p = firstValueAsNumber(values[1]);
  return Math.pow(n, p);
};

/**
 * Returns the sum of a series of numbers and/or cells.
 * @param values The first number or range to add together.
 * @returns {number} The sum of the series
 * @constructor
 */
var SUM = function (...values) : number {
  checkArgumentsAtLeastLength(values, 1);
  var result = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      result = result + SUM.apply(this, values[i]);
    } else {
      if (values[i] === "") {
        throw new CellError(ERRORS.VALUE_ERROR, "Function SUM parameter "+i+" expects number values. But '"+values[i]+"' is a text and cannot be coerced to a number.");
      }
      result = result + valueToNumber(values[i]);
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
  checkArgumentsLength(values, 1);
  var x = firstValueAsNumber(values[0]);
  if (x < 0) {
    throw new CellError(ERRORS.VALUE_ERROR, "Function SQRT parameter 1 expects number values. But '" + values[0] + "' is a text and cannot be coerced to a number.");
  }
  return Math.sqrt(x);
};

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
  OR,
  LOG,
  LOG10,
  TAN,
  TANH
}