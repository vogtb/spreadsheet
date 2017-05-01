import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  TypeCaster
} from "../Utilities/TypeCaster";
import {
  Filter
} from "../Utilities/Filter";
import {
  Serializer
} from "../Utilities/Serializer";
import {
  CriteriaFunctionFactory
} from "../Utilities/CriteriaFunctionFactory";
import {
  NumError,
  DivZeroError,
  RefError,
  ValueError,
  NAError
} from "../Errors";

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
    throw new NumError("Function ACOS parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
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
    throw new NumError("Function ACOSH parameter 1 value is " + value + ". It should be greater than or equal to 1.");
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
    throw new NumError("Function ACOTH parameter 1 value is " + value + ". Valid values cannot be between -1 and 1 inclusive.")
  }
  return 0.5 * Math.log((value + 1) / (value - 1));
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
    throw new NumError("Function ASIN parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
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
    throw new NumError("Function ATAN parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
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
    throw new DivZeroError("Evaluation of function ATAN2 caused a divide by zero error.");
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
    throw new NumError("Function ATANH parameter 1 value is " + value + ". Valid values are between -1 and 1 exclusive.");
  }
  if (Math.abs(value) < 1) {

  }
  return Math["atanh"](value);
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
      throw new RefError("Reference does not exist.");
    }
    return EVEN(values[0][0]);
  }
  var X = TypeCaster.valueToNumber(values[0]);
  return X % 2 === 1 ? X + 1 : X;
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
    throw new DivZeroError("Function MOD parameter 2 cannot be zero.");
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
      throw new RefError("Reference does not exist.");
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
        throw new ValueError("Function SUM parameter "+i+" expects number values. But '"+values[i]+"' is a text and cannot be coerced to a number.");
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
    throw new ValueError("Function SQRT parameter 1 expects number values. But '" + values[0] + "' is a text and cannot be coerced to a number.");
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
    throw new NumError("Function SQRTPI parameter 1 value is " + n + ". It should be greater than or equal to 0.");
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
    throw new DivZeroError("Evaluation of function COT caused a divide by zero error.");
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
    throw new DivZeroError("Evaluation of function COTH caused a divide by zero error.");
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
    throw new ValueError("Function ISEVEN parameter 1 expects boolean values. But '" + values[0] + "' is a text and cannot be coerced to a boolean.");
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
    throw new ValueError("Function ISODD parameter 1 expects boolean values. But '" + values[0] + "' is a text and cannot be coerced to a boolean.");
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
    throw new NumError("Function LOG10 parameter 1 value is " + n + ". It should be greater than 0.");
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
      throw new NumError("Function LOG parameter 2 value is " + b + ". It should be greater than 0.");
    }
  }
  if (b < 2) {
    throw new DivZeroError("Evaluation of function LOG caused a divide by zero error.");
  }
  var ln = Math.log(n);
  var lb = Math.log(b);
  if (lb === 0) {
    throw new DivZeroError("Evaluation of function LOG caused a divide by zero error.");
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
    throw new NumError("Function LN parameter 1 value is " + n + ". It should be greater than 0.");
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
    throw new DivZeroError("Function CEILING parameter 2 cannot be zero.");
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
    throw new DivZeroError("Function FLOOR parameter 2 cannot be zero.");
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
      throw new RefError("Reference does not exist.");
    }
    return IF(values[0][0], values[1], values[2]);
  } else if (values[0] === "") {
    return values[2];
  }
  return (TypeCaster.valueToBoolean(values[0])) ? values[1] : values[2];
};


/**
 * Returns a conditional count across a range.
 * @param values[0] range - The range that is tested against criterion., value[1];
 * @param values[1] criterion - The pattern or test to apply to range. If the range to check against contains text,
 * this must be a string. It can be a comparison based string (e.g. "=1", "<1", ">=1") or it can be a wild-card string,
 * in which * matches any number of characters, and ? matches the next character. Both ? and * can be escaped by placing
 * a ~ in front of them. If it is neither, it will compared with values in the range using equality comparison.
 * @returns {number}
 * @constructor
 */
var COUNTIF = function (...values) {
  ArgsChecker.checkLength(values, 2);
  var range = values[0];
  if (!(range instanceof Array)) {
    range = [range];
  }
  var criteria = values[1];
  var criteriaEvaluation = CriteriaFunctionFactory.createCriteriaFunction(criteria);

  var count = 0;
  for (var i = 0; i < range.length; i++) {
    var x = range[i];
    if (x instanceof Array) {
      count = count + COUNTIF.apply(this, [x, criteria]);
    } else if (criteriaEvaluation(x)) {
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
  var filteredValues = [];
  // Flatten arrays/ranges
  for (var x = 0; x < values.length; x++) {
    // If this is an array/range parameter
    if (x % 2 === 0) {
      filteredValues.push(Filter.flatten(values[x]));
    } else {
      filteredValues.push(values[x]);
    }
  }
  var count = 0;
  // For every value in the range
  for (var i = 0; i < filteredValues[0].length; i++) {
    // Check for criteria eval for other ranges and other criteria pairs.
    var otherCriteriaEvaluationSuccessfulSoFar = true;
    for (var x = 0; x < filteredValues.length; x += 2) {
      if (filteredValues[x].length < filteredValues[0].length) {
        throw new ValueError("Array arguments to COUNTIFS are of different size.");
      }
      var criteriaEvaluation = criteriaEvaluationFunctions[x+1];
      if (otherCriteriaEvaluationSuccessfulSoFar) {
        if (!criteriaEvaluation(filteredValues[x][i])) { // evaluate THIS value with x+1 index, which is criteria.
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
    if (x instanceof Array) {
      sum += SUMIF.apply(this, [x, criteria]);
    } else {
      if (sumRange && i > sumRange.length-1) {
        continue;
      }
      if (values.length === 2 && TypeCaster.canCoerceToNumber(x) && criteriaEvaluation(x)) {
        sum = sum + TypeCaster.valueToNumber(x);
      } else if (values.length === 3 && TypeCaster.canCoerceToNumber(sumRange[i]) && criteriaEvaluation(x)) {
        sum = sum + TypeCaster.valueToNumber(sumRange[i]);
      }
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
        throw new RefError("Reference does not exist.");
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


/**
 * Returns the error function evaluated at x. See also:
 *
 * * http://jstat.github.io/special-functions.html#erf
 *
 * * https://github.com/jstat/jstat/search?utf8=%E2%9C%93&q=erf&type=
 *
 * @param x to evaluate
 * @returns {number} error
 */
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
    throw new NAError("Array arguments to SUMX2PY2 are of different size.");
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
    throw new NAError("Array arguments to SUMX2MY2 are of different size.");
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

  // Private function that will recursively generate an array of the unique primitives
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
      throw new ValueError("SUMPRODUCT has mismatched range sizes. Expected count: "
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
    throw new NumError("Function COMBIN parameter 2 value is "
      + c + ". It should be less than or equal to value of Function COMBIN parameter 1 with " + n + ".");
  }
  n = Math.floor(n);
  c = Math.floor(c);
  var div = fact(c) * fact(n - c);
  if (div === 0) {
    throw new DivZeroError("Evaluation of function COMBIN caused a divide by zero error.");
  }
  return fact(n) / div;
};

export {
  ABS,
  ACOS,
  ACOSH,
  ACOTH,
  ASIN,
  ASINH,
  ATAN,
  ATAN2,
  ATANH,
  COT,
  COTH,
  COSH,
  COS,
  COUNTUNIQUE,
  EVEN,
  ERF,
  ERFC,
  INT,
  ISEVEN,
  ISODD,
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
  ROUND,
  ROUNDDOWN,
  ROUNDUP,
  SUMPRODUCT, // Array?
  SUMIF,
  SUMSQ,
  SUMX2MY2, // Array?
  SUMX2PY2, // Array?
  FLOOR,
  IF,
  COUNTIF,
  COUNTIFS,
  CEILING,
  TRUNC,
  RADIANS,
  DEGREES,
  COMBIN
}