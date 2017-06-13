import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  TypeConverter
} from "../Utilities/TypeConverter";
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
import {
  erf, gammaln
} from "../Utilities/MathHelpers";


/**
 * Returns the greatest common divisor of one or more integers.
 * @param values - The values or ranges whose factors to consider in a calculation to find the greatest common divisor.
 * @returns {number} greatest common divisor.
 * @constructor
 */
var GCD = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "ABS");
  // Credits: Andrew Pociu
  for (var r, a, i = values.length - 1, result = values[i]; i;) {
    for (a = values[--i]; (r = a % result); a = result, result = r) {
      //empty
    }
  }
  return result;
};


/**
 * Returns the least common multiple of one or more integers.
 * @param values - The values or range whose factors to consider in a calculation to find the least common multiple.
 * @returns {number}
 * @constructor
 */
var LCM =  function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "LCM");
  // Credits: Jonas Raoni Soares Silva
  var o = Filter.flatten(values);
  for (var i, j, n, d, r = 1; (n = o.pop()) !== undefined;) {
    while (n > 1) {
      if (n % 2) {
        for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) {}
        d = (i <= j) ? i : n;
      } else {
        d = 2;
      }
      for (n /= d, r *= d, i = o.length; i; (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) {}
    }
  }
  return r;
};

/**
 * Returns the the logarithm of a specified Gamma function, base e (Euler's number).
 * @param value - The input number. The natural logarithm of Gamma (value) will be returned. Must be positive.
 * @returns {number}
 * @constructor
 */
var GAMMALN = function (value) {
  ArgsChecker.checkLength(arguments, 1, "GAMMALN");
  var x =  TypeConverter.firstValueAsNumber(value);
  if (x <= 0) {
    throw new NumError("Function GAMMALN parameter 1 value is " + x + ". It should be greater than 0.");
  }
  return gammaln(x);
};

/**
 * Returns the absolute value of a number.
 * @param value to get the absolute value of.
 * @returns {number} absolute value
 * @constructor
 */
var ABS = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ABS");
  var v = TypeConverter.valueToNumber(value);
  return Math.abs(v);
};

/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns {number} inverse cosine of value
 * @constructor
 */
var ACOS = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ACOS");
  value = TypeConverter.valueToNumber(value);
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
var ACOSH = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ACOSH");
  value = TypeConverter.valueToNumber(value);
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
var ACOTH = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ACOTH");
  value = TypeConverter.valueToNumber(value);
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
var ASIN = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ASIN");
  value = TypeConverter.valueToNumber(value);
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
var ASINH = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ASINH");
  value = TypeConverter.valueToNumber(value);
  return Math.log(value + Math.sqrt(value * value + 1));
};


/**
 * Returns the inverse tangent of a value, in radians.
 * @param value The value for which to calculate the inverse tangent.
 * @returns {number} inverse tangent of input value
 * @constructor
 */
var ATAN = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ATAN");
  value = TypeConverter.valueToNumber(value);
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
  ArgsChecker.checkLength(arguments, 2, "ATAN2");
  x = TypeConverter.valueToNumber(x);
  y = TypeConverter.valueToNumber(y);
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
var ATANH = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "ATANH");
  value = TypeConverter.valueToNumber(value);
  if (value >= 1 || value <= -1) {
    throw new NumError("Function ATANH parameter 1 value is " + value + ". Valid values are between -1 and 1 exclusive.");
  }
  if (Math.abs(value) < 1) {

  }
  return Math["atanh"](value);
};

/**
 * Rounds a number up to the nearest even integer.
 * @param value The value to round to the next greatest even number.
 * @returns {number} next greatest even number
 * @constructor
 */
var EVEN = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "EVEN");
  var X = TypeConverter.firstValueAsNumber(value);
  return X % 2 === 1 ? X + 1 : X;
};

/**
 * Returns the result of the modulo operator, the remainder after a division operation.
 * @param dividend The number to be divided to find the remainder.
 * @param divisor The number to divide by.
 * @returns {number}
 * @constructor
 */
var MOD = function (dividend, divisor) : number {
  ArgsChecker.checkLength(arguments, 2, "MOD");
  var oneN = TypeConverter.valueToNumber(dividend);
  var twoN =  TypeConverter.valueToNumber(divisor);
  if (twoN === 0) {
    throw new DivZeroError("Function MOD parameter 2 cannot be zero.");
  }
  return oneN % twoN;
};


/**
 * Rounds a number up to the nearest odd integer.
 * @param value The value to round to the next greatest odd number.
 * @returns {number} value to round up to next greatest odd number.
 * @constructor
 */
var ODD = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "ODD");
  var X = TypeConverter.firstValueAsNumber(value);
  return X % 2 === 1 ? X : X + 1;
};

/**
 * Returns a number raised to a power.
 * @param base - The number to raise to the exponent power.
 * @param exponent - The exponent to raise base to.
 * @returns {number} resulting number
 * @constructor
 */
var POWER = function (base, exponent) : number {
  ArgsChecker.checkLength(arguments, 2, "POWER");
  var n = TypeConverter.firstValueAsNumber(base);
  var p = TypeConverter.firstValueAsNumber(exponent);
  return Math.pow(n, p);
};

/**
 * Returns the sum of a series of numbers and/or cells.
 * @param values The first number or range to add together.
 * @returns {number} The sum of the series
 * @constructor
 */
var SUM = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "SUM");
  var result = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      result = result + SUM.apply(this, values[i]);
    } else {
      if (values[i] === "") {
        throw new ValueError("Function SUM parameter "+i+" expects number values. But '"+values[i]+"' is a text and cannot be coerced to a number.");
      }
      result = result + TypeConverter.valueToNumber(values[i]);
    }
  }
  return result;
};

/**
 * Returns the positive square root of a positive number.
 * @param value - The number for which to calculate the positive square root.
 * @returns {number} square root
 * @constructor
 */
var SQRT = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "SQRT");
  var x = TypeConverter.firstValueAsNumber(value);
  if (x < 0) {
    throw new ValueError("Function SQRT parameter 1 value is " + x + ". It should be greater than or equal to 0.");
  }
  return Math.sqrt(x);
};

/**
 * Returns the positive square root of the product of Pi and the given positive number.
 * @param value - The number which will be multiplied by Pi and have the product's square root returned
 * @returns {number} the positive square root of the product of Pi and the given positive number.
 * @constructor
 */
var SQRTPI = function (value) : number{
  ArgsChecker.checkLength(arguments, 1, "SQRTPI");
  var n = TypeConverter.firstValueAsNumber(value);
  if (n < 0) {
    throw new NumError("Function SQRTPI parameter 1 value is " + n + ". It should be greater than or equal to 0.");
  }
  return Math.sqrt(n * Math.PI);
};

/**
 * Returns the cosine of an angle provided in radians.
 * @param value - The angle to find the cosine of, in radians.
 * @returns {number} cosine of angle
 * @constructor
 */
var COS = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "COS");
  var r = TypeConverter.firstValueAsNumber(value);
  return Math.cos(r);
};

/**
 * Returns the hyperbolic cosine of any real number.
 * @param value - Any real value to calculate the hyperbolic cosine of.
 * @returns {number} the hyperbolic cosine of the input
 * @constructor
 */
var COSH = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "COSH");
  var r = TypeConverter.firstValueAsNumber(value);
  return Math["cosh"](r);
};

/**
 * Returns the cotangent of any real number. Defined as cot(x) = 1 / tan(x).
 * @param value - number to calculate the cotangent for
 * @returns {number} cotangent
 * @constructor
 */
var COT = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "COT");
  var x = TypeConverter.firstValueAsNumber(value);
  if (x === 0) {
    throw new DivZeroError("Evaluation of function COT caused a divide by zero error.");
  }
  return 1 / Math.tan(x);
};

/**
 * Return the hyperbolic cotangent of a value, defined as coth(x) = 1 / tanh(x).
 * @param value - value to calculate the hyperbolic cotangent value of
 * @returns {number} hyperbolic cotangent
 * @constructor
 */
var COTH = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "COTH");
  var x = TypeConverter.firstValueAsNumber(value);
  if (x === 0) {
    throw new DivZeroError("Evaluation of function COTH caused a divide by zero error.");
  }
  return 1 / Math["tanh"](x);
};

/**
 * Rounds a number down to the nearest integer that is less than or equal to it.
 * @param value -  The value to round down to the nearest integer.
 * @returns {number} Rounded number
 * @constructor
 */
var INT = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "INT");
  var x = TypeConverter.firstValueAsNumber(value);
  return Math.floor(x);
};


/**
 * Checks whether the provided value is even.
 * @param value - The value to be verified as even.
 * @returns {boolean} whether this value is even or not
 * @constructor
 */
var ISEVEN = function (value) : boolean {
  ArgsChecker.checkLength(arguments, 1, "ISEVEN");
  if (value === "") {
    throw new ValueError("Function ISEVEN parameter 1 expects boolean values. But '" + value + "' is a text and cannot be coerced to a boolean.");
  }
  var x = TypeConverter.firstValueAsNumber(value);
  return Math.floor(x) % 2 === 0;
};


/**
 * Checks whether the provided value is odd.
 * @param value - The value to be verified as odd.
 * @returns {boolean} whether this value is odd or not
 * @constructor
 */
var ISODD = function (value) : boolean {
  ArgsChecker.checkLength(arguments, 1, "ISODD");
  if (value === "") {
    throw new ValueError("Function ISODD parameter 1 expects boolean values. But '" + value + "' is a text and cannot be coerced to a boolean.");
  }
  var x = TypeConverter.firstValueAsNumber(value);
  return Math.floor(x) % 2 === 1;
};

/**
 * Returns the sine of an angle provided in radians.
 * @param value - The angle to find the sine of, in radians.
 * @returns {number} Sine of angle.
 * @constructor
 */
var SIN = function (value) {
  ArgsChecker.checkLength(arguments, 1, "SIN");
  var rad = TypeConverter.firstValueAsNumber(value);
  return rad === Math.PI ? 0 : Math.sin(rad);
};

/**
 * Returns the hyperbolic sine of any real number.
 * @param value - real number to find the hyperbolic sine of
 * @returns {number} hyperbolic sine
 * @constructor
 */
var SINH = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "SINH");
  var rad = TypeConverter.firstValueAsNumber(value);
  return Math["sinh"](rad);
};

/**
 * The value Pi.
 * @returns {number} Pi.
 * @constructor
 */
var PI = function () {
  ArgsChecker.checkLength(arguments, 0, "SINH");
  return Math.PI;
};

/**
 * Returns the the logarithm of a number, base 10.
 * @param value - The value for which to calculate the logarithm, base 10.
 * @returns {number} logarithm of the number, in base 10.
 * @constructor
 */
var LOG10 = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "LOG10");
  var n = TypeConverter.firstValueAsNumber(value);
  if (n < 1) {
    throw new NumError("Function LOG10 parameter 1 value is " + n + ". It should be greater than 0.");
  }
  var ln = Math.log(n);
  var lb = Math.log(10);
  return ln / lb;
};

/**
 * Returns the the logarithm of a number given a base.
 * @param value - The value for which to calculate the logarithm given base.
 * @param base - The base to use for calculation of the logarithm. Defaults to 10.
 * @returns {number}
 * @constructor
 */
var LOG = function (value, base) : number {
  ArgsChecker.checkAtLeastLength(arguments, 2, "LOG");
  var n = TypeConverter.firstValueAsNumber(value);
  var b = TypeConverter.firstValueAsNumber(base);
  if (b < 1) {
    throw new NumError("Function LOG parameter 2 value is " + b + ". It should be greater than 0.");
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
 * @param value - The value for which to calculate the logarithm, base e.
 * @returns {number} logarithm calculated
 * @constructor
 */
var LN = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "LN");
  var n = TypeConverter.firstValueAsNumber(value);
  if (n < 1) {
    throw new NumError("Function LN parameter 1 value is " + n + ". It should be greater than 0.");
  }
  return Math.log(n);
};

/**
 * Returns the tangent of an angle provided in radians.
 * @param value - The angle to find the tangent of, in radians.
 * @returns {number} tangent in radians
 * @constructor
 */
var TAN = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "TAN");
  var rad = TypeConverter.firstValueAsNumber(value);
  return rad === Math.PI ? 0 : Math.tan(rad);
};

/**
 * Returns the hyperbolic tangent of any real number.
 * @param value - Any real value to calculate the hyperbolic tangent of.
 * @returns {number} hyperbolic tangent
 * @constructor
 */
var TANH = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "TANH");
  var rad = TypeConverter.firstValueAsNumber(value);
  return Math["tanh"](rad);
};

/**
 * Rounds a number up to the nearest integer multiple of specified significance.
 * @param value The value to round up to the nearest integer multiple of factor.
 * @param factor - [ OPTIONAL ] The number to whose multiples value will be rounded.
 * @returns {number}
 * @constructor
 */
var CEILING = function (value, factor?) : number {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "CEILING");
  var num = TypeConverter.firstValueAsNumber(value);
  if (factor === undefined) {
    return Math.ceil(num);
  }
  var significance = TypeConverter.firstValueAsNumber(factor);
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
 * @param value - The value to round down to the nearest integer multiple of factor.
 * @param factor - The number to whose multiples value will be rounded.
 * @returns {number}
 * @constructor
 */
var FLOOR = function (value, factor?) : number {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "FLOOR");
  var num = TypeConverter.firstValueAsNumber(value);
  if (factor === undefined) {
    return Math.floor(num);
  }
  var significance = TypeConverter.firstValueAsNumber(factor);
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
 * @param logicalExpression - An expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE.
 * @param valueIfTrue - The value the function returns if logical_expression is TRUE
 * @param valueIfFalse - The value the function returns if logical_expression is FALSE.
 * @returns one value if a logical expression is TRUE and another if it is FALSE.
 * @constructor
 */
var IF = function (logicalExpression, valueIfTrue, valueIfFalse) : any {
  ArgsChecker.checkLength(arguments, 3, "IF");
  if (logicalExpression instanceof Array) {
    if (logicalExpression.length === 0) {
      throw new RefError("Reference does not exist.");
    }
    return IF(logicalExpression[0], valueIfTrue, valueIfFalse);
  } else if (logicalExpression === "") {
    return valueIfFalse;
  }
  return (TypeConverter.valueToBoolean(logicalExpression)) ? valueIfTrue : valueIfFalse;
};


/**
 * Returns a conditional count across a range.
 * @param range - The range that is tested against criterion., value[1];
 * @param criteria - The pattern or test to apply to range. If the range to check against contains text,
 * this must be a string. It can be a comparison based string (e.g. "=1", "<1", ">=1") or it can be a wild-card string,
 * in which * matches any number of characters, and ? matches the next character. Both ? and * can be escaped by placing
 * a ~ in front of them. If it is neither, it will compared with values in the range using equality comparison.
 * @returns {number}
 * @constructor
 */
var COUNTIF = function (range, criteria) {
  ArgsChecker.checkLength(arguments, 2, "COUNTIF");
  if (!(range instanceof Array)) {
    range = [range];
  }
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
  ArgsChecker.checkAtLeastLength(values, 2, "COUNTIFS");
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
 * @param value - The value to round to places number of places.
 * @param places - The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUND = function (value, places) {
  ArgsChecker.checkLength(arguments, 2, "ROUND");
  var n = TypeConverter.firstValueAsNumber(value);
  var d = TypeConverter.firstValueAsNumber(places);
  return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
};

/**
 * Rounds a number to a certain number of decimal places, always rounding down to the next valid increment.
 * @param value - The value to round to places number of places, always rounding down.
 * @param places - (optional) The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUNDDOWN = function (value, places?) {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "ROUNDDOWN");
  var n = TypeConverter.firstValueAsNumber(value);
  if (places === undefined) {
    return Math.floor(n);
  }
  var d = TypeConverter.firstValueAsNumber(places);
  return Math.floor(n * Math.pow(10, d)) / Math.pow(10, d);
};

/**
 * Rounds a number to a certain number of decimal places, always rounding up to the next valid increment.
 * @param value - The value to round to places number of places, always rounding up.
 * @param places - (optional) The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUNDUP = function (value, places?) {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "ROUNDUP");
  var n = TypeConverter.firstValueAsNumber(value);
  if (places === undefined) {
    return Math.ceil(n);
  }
  var d = TypeConverter.firstValueAsNumber(places);
  return Math.ceil(n * Math.pow(10, d)) / Math.pow(10, d);
};

/**
 * Returns a conditional sum across a range.
 * @param range -  The range which is tested against criterion.
 * @param criteria - The pattern or test to apply to range. If the range to check against contains text, this must be a
 * string. It can be a comparison based string (e.g. "=1", "<1", ">=1") or it can be a wild-card string, in which *
 * matches any number of characters, and ? matches the next character. Both ? and * can be escaped by placing a ~ in
 * front of them.
 * @param sumRange - (optional) The range to be summed, if different from range.
 * @returns {number}
 * @constructor
 */
var SUMIF = function (range, criteria, sumRange?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "SUMIF");

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
      if (arguments.length === 2 && TypeConverter.canCoerceToNumber(x) && criteriaEvaluation(x)) {
        sum = sum + TypeConverter.valueToNumber(x);
      } else if (arguments.length === 3 && TypeConverter.canCoerceToNumber(sumRange[i]) && criteriaEvaluation(x)) {
        sum = sum + TypeConverter.valueToNumber(sumRange[i]);
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
  ArgsChecker.checkAtLeastLength(values, 1, "SUMSQ");
  var result = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      result = result + SUMSQ.apply(this, Filter.filterOutNonNumberValues(values[i]));
    } else {
      var n = TypeConverter.valueToNumber(values[i]);
      result = result + (n * n);
    }
  }
  return result;
};


/**
 * Returns the product of two numbers. Equivalent to the `*` operator.
 * @param factor1 - The first multiplicand.
 * @param factor2 - The second multiplicand.
 * @constructor
 */
var MULTIPLY = function (factor1, factor2) {
  ArgsChecker.checkLength(arguments, 2, "MULTIPLY");
  var x = TypeConverter.firstValueAsNumber(factor1);
  var y = TypeConverter.firstValueAsNumber(factor1);
  return x * y;
};


/**
 * Returns the result of the first number minus the second number. Equivalent to the `-` operator.
 * @param one - The first number.
 * @param two - the second number.
 * @returns {number}
 * @constructor
 */
var MINUS = function (one, two) {
  ArgsChecker.checkLength(arguments, 2, "MINUS");
  var x = TypeConverter.firstValueAsNumber(one);
  var y = TypeConverter.firstValueAsNumber(two);
  return x - y;
};


/**
 * Returns true if two specified values are equal and true otherwise. Equivalent to the "=" operator.
 * @param one - First value to check.
 * @param two - Second value to check.
 * @returns {boolean} true if values are equal, false if they are not equal.
 * @constructor
 */
var EQ = function (one, two) {
  ArgsChecker.checkLength(arguments, 2, "EQ");
  var x = TypeConverter.firstValue(one);
  var y = TypeConverter.firstValue(two);
  return x === y;
};


/**
 * Returns true if the first argument is strictly greater than the second, and false otherwise. Equivalent to the `>`
 * operator.
 * @param one - The value to test as being greater than `two`.
 * @param two - The second value.
 * @returns {boolean}
 * @constructor
 */
var GT = function (one, two) {
  ArgsChecker.checkLength(arguments, 2, "GT");
  var x = TypeConverter.firstValue(one);
  var y = TypeConverter.firstValue(two);
  return x > y;
};


/**
 * Returns true if the first argument is greater than or equal to the second, and false otherwise. Equivalent to the
 * `>=` operator.
 * @param one - The value to test as being greater than or equal to `two`.
 * @param two -The second value.
 * @returns {boolean}
 * @constructor
 */
var GTE = function (one, two) {
  ArgsChecker.checkLength(arguments, 2, "GTE");
  var x = TypeConverter.firstValue(one);
  var y = TypeConverter.firstValue(two);
  return x >= y;
};


/**
 * Returns true if the first argument is strictly less than the second, and false otherwise. Equivalent to the `<`
 * operator.
 * @param one - The value to test as being less than `two`.
 * @param two - The second value.
 * @returns {boolean}
 * @constructor
 */
var LT = function (one, two) {
  ArgsChecker.checkLength(arguments, 2, "LT");
  var x = TypeConverter.firstValue(one);
  var y = TypeConverter.firstValue(two);
  return x < y;
};


/**
 * Returns true if the first argument is less than or equal to the second, and true otherwise. Equivalent to the
 * `<=` operator.
 * @param one - The value to test as being less than or equal to `two`.
 * @param two - The second value.
 * @constructor
 */
var LTE = function (one, two) {
  ArgsChecker.checkLength(arguments, 2, "LTE");
  var x = TypeConverter.firstValue(one);
  var y = TypeConverter.firstValue(two);
  return x <= y;
};


/**
 * Returns "TRUE" if two specified values are not equal and "FALSE" otherwise. Equivalent to the "<>" operator.
 * @param one - The value to test as being not equal to `two`.
 * @param two - The second valud.
 * @returns {boolean}
 * @constructor
 */
var NE =  function (one, two) {
  ArgsChecker.checkLength(arguments, 2, "NE");
  var x = TypeConverter.firstValue(one);
  var y = TypeConverter.firstValue(two);
  return x !== y;
};


/**
 * Returns one number divided by another. Equivalent to the `/` operator.
 * @param dividend - The number to be divided.
 * @param divisor - The number to divide by, cannot be 0.
 * @returns {number} result of dividend / divisor.
 * @constructor
 */
var DIVIDE = function (dividend, divisor) {
  ArgsChecker.checkLength(arguments, 2, "DIVIDE");
  var x = TypeConverter.firstValueAsNumber(dividend);
  var y = TypeConverter.firstValueAsNumber(divisor);
  if (y < 0) {
    throw new DivZeroError("Function DIVIDE parameter 2 cannot be zero.");
  }
  return x / y;
};


/**
 * Returns a random number between 0 inclusive and 1 exclusive.
 * @returns {number}
 * @constructor
 */
var RAND = function () {
  ArgsChecker.checkLength(arguments, 0, "RAND");
  return Math.random();
};


/**
 * Returns a uniformly random integer between two values, inclusive on high and low. Values with decimal parts may be
 * used for low and/or high; this will cause the least and greatest possible values to be the next integer greater than
 * low and/or the next integer less than high, respectively.
 * @param low - lowest value
 * @param high - highest value
 * @returns {number} between low and high.
 * @constructor
 */
var RANDBETWEEN = function (low, high) {
  ArgsChecker.checkLength(arguments, 2, "RAND");
  low = Math.floor(TypeConverter.firstValueAsNumber(low));
  high = Math.ceil(TypeConverter.firstValueAsNumber(high));
  if (low > high) {
    throw new NumError("Function RANDBETWEEN parameter 2 value is " + low + ". It should be greater than or equal to "
      + high + ".");
  }
  var diff = Math.abs(low - high);
  return Math.round(low + (Math.random() * diff));
};


/**
 * Given an input number, returns `-1` if it is negative, `1` if positive, and `0` if it is zero.
 * @param value - The value to check the sign for
 * @returns {number} `-1` if it is negative, `1` if positive, and `0` if it is zero.
 * @constructor
 */
var SIGN =  function (value) {
  ArgsChecker.checkLength(arguments, 1, "SIGN");
  var x = TypeConverter.firstValueAsNumber(value);
  if (x === 0) {
    return 0;
  }
  return x > 0 ? 1 : -1;
};


/**
 * Truncates a number to a certain number of significant digits by omitting less significant digits.
 * @param value - The value to be truncated.
 * @param places - [ OPTIONAL - 0 by default ] - The number of significant digits to the right of the decimal point to
 * retain. If places is greater than the number of significant digits in value, value is returned without modification.
 * places may be negative, in which case the specified number of digits to the left of the decimal place are changed to
 * zero. All digits to the right of the decimal place are discarded. If all digits of value are changed to zero, TRUNC
 * simply returns 0.
 * @returns {number} after truncation
 * @constructor
 */
var TRUNC = function (value, places?) : number {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "TRUNC");
  var n = TypeConverter.firstValueAsNumber(value);
  var digits = 0;
  if (places !== undefined) {
    digits = TypeConverter.firstValueAsNumber(places);
  }
  var sign = (n > 0) ? 1 : -1;
  return sign * (Math.floor(Math.abs(n) * Math.pow(10, digits))) / Math.pow(10, digits);
};


/**
 * Converts an angle value in degrees to radians.
 * @param angle - The angle to convert from degrees to radians.
 * @returns {number} radians
 * @constructor
 */
var RADIANS = function (angle) {
  ArgsChecker.checkLength(arguments, 1, "RADIANS");
  var d = TypeConverter.firstValueAsNumber(angle);
  return d * Math.PI / 180;
};

/**
 * Converts an angle value in radians to degrees.
 * @param angle - The angle to convert from radians to degrees.
 * @returns {number} degrees
 * @constructor
 */
var DEGREES = function (angle) {
  ArgsChecker.checkLength(arguments, 1, "DEGREES");
  var r = TypeConverter.firstValueAsNumber(angle);
  return r * 180 / Math.PI;
};


/**
 * Returns the complementary Gauss error function of a value.
 * @param value - The number for which to calculate the complementary Gauss error function.
 * @returns {number} complementary Gauss error function of a value
 * @constructor
 */
var ERFC = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ERFC");
  var v = TypeConverter.firstValueAsNumber(value);
  return v === 0 ? 1 : 1 - erf(v);
};


/**
 * Returns the error function integrated between lower_limit and upper_limit.
 * @param lowerLimit - The lower bound for integrating ERF.
 * @param upperLimit - [Optional]. The upper bound for integrating ERF. If omitted, ERF integrates between
 * zero and lower_limit.
 * @returns {number} error function integrated between lower_limit and upper_limit
 * @constructor
 */
var ERF = function (lowerLimit, upperLimit?) : number {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "ERF");
  var lower = TypeConverter.firstValueAsNumber(lowerLimit);
  var upper = upperLimit !== undefined ? TypeConverter.firstValueAsNumber(upperLimit) : 0;
  return upperLimit === undefined ? erf(lower) : erf(upper) - erf(lower);
};


/**
 * Calculates the sum of the sums of the squares of values in two arrays.
 * @param arrayX - The array or range of values whose squares will be added to the squares of corresponding
 * entries in arrayY and added together.
 * @param arrayY - The array or range of values whose squares will be added to the squares of corresponding
 * entries in arrayX and added together.
 * @returns {number} sum of the sums of the squares
 * @constructor
 */
var SUMX2PY2 = function (arrayX, arrayY) : number {
  ArgsChecker.checkLength(arguments, 2, "SUMX2PY2");
  var arrOne = Filter.flattenAndThrow(arrayX);
  var arrTwo = Filter.flattenAndThrow(arrayY);
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
 * @param arrayX - The array or range of values whose squares will be reduced by the squares of corresponding
 * entries in array_y and added together.
 * @param arrayY - The array or range of values whose squares will be subtracted from the squares of
 * corresponding entries in array_x and added together.
 * @returns {number} sum of the differences of the squares
 * @constructor
 */
var SUMX2MY2 = function (arrayX, arrayY) : number {
  ArgsChecker.checkLength(arguments, 2, "SUMX2MY2");
  var arrOne = Filter.flattenAndThrow(arrayX);
  var arrTwo = Filter.flattenAndThrow(arrayY);
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


// Private function that will recursively generate an array of the unique primitives
var _countUnique = function (values: Array<any>) : Object {
  var uniques = {};
  for (var i = 0; i < values.length; i++) {
    if (Array.isArray(values[i])) {
      // For some reasons an empty range is converted to a range with a single empty string in it.
      if (values[i].length === 0) {
        values[i] = [""];
      }
      var uniquesOfArray = _countUnique(values[i]);
      for (var key in uniquesOfArray) {
        uniques[key] = true;
      }
    } else {
      uniques[Serializer.serialize(values[i])] = true;
    }
  }
  return uniques;
};

/**
 * Counts the number of unique values in a list of specified values and ranges.
 * @param values The values or ranges to consider for uniqueness. Supports an arbitrary number of arguments for this
 * function.
 * @returns {number} of unique values passed in.
 * @constructor
 */
var COUNTUNIQUE = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "COUNTUNIQUE");

  var uniques = _countUnique(values);
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
  ArgsChecker.checkAtLeastLength(values, 1, "SUMPRODUCT");
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
      product *= TypeConverter.valueToNumberGracefully(flattenedValues[x][i]);
    }
    result += product;
  }
  return result;
};


/**
 * Returns the number of ways to choose some number of objects from a pool of a given size of objects.
 * @param m - The size of the pool of objects to choose from.
 * @param k - The number of objects to choose.
 * @returns {number} number of ways
 * @constructor
 */
var COMBIN = function (m, k) : number {
  ArgsChecker.checkLength(arguments, 2, "COMBIN");

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
  var n = TypeConverter.firstValueAsNumber(m);
  var c = TypeConverter.firstValueAsNumber(k);
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

/**
 * Multiply a series of numbers together.
 * @param values - values or range of values to multiply by each other.
 * @constructor
 */
var PRODUCT =  function (...values) {
  ArgsChecker.checkAtLeastLength(values, 2, "PRODUCT");
  var value = 1;
  var numbers = Filter.flattenAndThrow(values);
  for (var i = 0; i < numbers.length; i++) {
    value *= TypeConverter.valueToNumber(numbers[i]);
  }
  return value;
};


/**
 * Divide one number by another
 * @param dividend - number to be divided by the divisor.
 * @param divisor - number to divide the dividend.
 * @returns {number}
 * @constructor
 */
var QUOTIENT = function (dividend, divisor) {
  ArgsChecker.checkLength(arguments, 2, "QUOTIENT");
  var dv = TypeConverter.firstValueAsNumber(dividend);
  var ds = TypeConverter.firstValueAsNumber(divisor);
  if (ds === 0) {
    throw new DivZeroError("Function QUOTIENT parameter 2 cannot be zero.");
  }
  return dv / ds;
};


/**
 * Returns a value, but does nothing to it. If given a range, will return first value.
 * @param value to return
 * @returns any value
 * @constructor
 */
var UPLUS = function (value) : any {
  ArgsChecker.checkLength(arguments, 1, "UPLUS");
  return TypeConverter.firstValue(value);
};


/**
 * Returns the same number, but with the sign reversed.
 * @param value to reverse the sign on
 * @returns {number}
 * @constructor
 */
var UMINUS = function (value) {
  ArgsChecker.checkLength(arguments, 1, "UMINUS");
  var n = TypeConverter.firstValueAsNumber(value);
  return n * -1;
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
  MULTIPLY,
  MINUS,
  TAN,
  TANH,
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
  COUNTIF,
  COUNTIFS,
  CEILING,
  TRUNC,
  RADIANS,
  DEGREES,
  COMBIN,
  RAND,
  RANDBETWEEN,
  SIGN,
  DIVIDE,
  EQ,
  GT,
  GTE,
  LT,
  LTE,
  NE,
  GCD,
  LCM,
  GAMMALN,
  PRODUCT,
  QUOTIENT,
  UPLUS,
  UMINUS
}