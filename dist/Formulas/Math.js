"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Filter_1 = require("../Utilities/Filter");
var Serializer_1 = require("../Utilities/Serializer");
var CriteriaFunctionFactory_1 = require("../Utilities/CriteriaFunctionFactory");
var Errors_1 = require("../Errors");
var MathHelpers_1 = require("../Utilities/MathHelpers");
var Statistical_1 = require("./Statistical");
/**
 * Returns the greatest common divisor of one or more integers.
 * @param values - The values or ranges whose factors to consider in a calculation to find the greatest common divisor.
 * @returns {number} greatest common divisor.
 * @constructor
 */
var GCD = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "ABS");
    // Credits: Andrew Pociu
    for (var r, a, i = values.length - 1, result = values[i]; i;) {
        for (a = values[--i]; (r = a % result); a = result, result = r) {
            //empty
        }
    }
    return result;
};
exports.GCD = GCD;
/**
 * Returns the least common multiple of one or more integers.
 * @param values - The values or range whose factors to consider in a calculation to find the least common multiple.
 * @returns {number}
 * @constructor
 */
var LCM = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "LCM");
    // Credits: Jonas Raoni Soares Silva
    var o = Filter_1.Filter.flatten(values);
    for (var i, j, n, d, r = 1; (n = o.pop()) !== undefined;) {
        while (n > 1) {
            if (n % 2) {
                for (i = 3, j = Math.floor(Math.sqrt(n)); i <= j && n % i; i += 2) { }
                d = (i <= j) ? i : n;
            }
            else {
                d = 2;
            }
            for (n /= d, r *= d, i = o.length; i; (o[--i] % d) === 0 && (o[i] /= d) === 1 && o.splice(i, 1)) { }
        }
    }
    return r;
};
exports.LCM = LCM;
/**
 * Returns the the logarithm of a specified Gamma function, base e (Euler's number).
 * @param value - The input number. The natural logarithm of Gamma (value) will be returned. Must be positive.
 * @returns {number}
 * @constructor
 */
var GAMMALN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "GAMMALN");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (x <= 0) {
        throw new Errors_1.NumError("Function GAMMALN parameter 1 value is " + x + ". It should be greater than 0.");
    }
    return MathHelpers_1.gammaln(x);
};
exports.GAMMALN = GAMMALN;
/**
 * Returns the absolute value of a number.
 * @param value to get the absolute value of.
 * @returns {number} absolute value
 * @constructor
 */
var ABS = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ABS");
    var v = TypeConverter_1.TypeConverter.valueToNumber(value);
    return Math.abs(v);
};
exports.ABS = ABS;
/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns {number} inverse cosine of value
 * @constructor
 */
var ACOS = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ACOS");
    value = TypeConverter_1.TypeConverter.valueToNumber(value);
    if (value === -1) {
        return Math.PI;
    }
    else if (value > 1 || value < -1) {
        throw new Errors_1.NumError("Function ACOS parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
    }
    return Math.acos(value);
};
exports.ACOS = ACOS;
/**
 * Returns the inverse hyperbolic cosine of a number.
 * @param value The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @returns {number} to find the inverse hyperbolic cosine for.
 * @constructor
 */
var ACOSH = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ACOSH");
    value = TypeConverter_1.TypeConverter.valueToNumber(value);
    if (value < 1) {
        throw new Errors_1.NumError("Function ACOSH parameter 1 value is " + value + ". It should be greater than or equal to 1.");
    }
    return Math.log(value + Math.sqrt(value * value - 1));
};
exports.ACOSH = ACOSH;
/**
 * Calculate the hyperbolic arc-cotangent of a value
 * @param value number not between -1 and 1 inclusively.
 * @returns {number} hyperbolic arc-cotangent
 * @constructor
 */
var ACOTH = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ACOTH");
    value = TypeConverter_1.TypeConverter.valueToNumber(value);
    if (value <= 1 && value >= -1) {
        throw new Errors_1.NumError("Function ACOTH parameter 1 value is " + value + ". Valid values cannot be between -1 and 1 inclusive.");
    }
    return 0.5 * Math.log((value + 1) / (value - 1));
};
exports.ACOTH = ACOTH;
/**
 * Returns the inverse sine of a value, in radians.
 * @param value The value for which to calculate the inverse sine. Must be between -1 and 1, inclusive.
 * @returns {number} inverse sine of input value
 * @constructor
 */
var ASIN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ASIN");
    value = TypeConverter_1.TypeConverter.valueToNumber(value);
    if (value === -1) {
        return Math.PI;
    }
    else if (value > 1 || value < -1) {
        throw new Errors_1.NumError("Function ASIN parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
    }
    return Math.asin(value);
};
exports.ASIN = ASIN;
/**
 * Returns the inverse hyperbolic sine of a number.
 * @param value The value for which to calculate the inverse hyperbolic sine.
 * @returns {number} inverse hyperbolic sine of input
 * @constructor
 */
var ASINH = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ASINH");
    value = TypeConverter_1.TypeConverter.valueToNumber(value);
    return Math.log(value + Math.sqrt(value * value + 1));
};
exports.ASINH = ASINH;
/**
 * Returns the inverse tangent of a value, in radians.
 * @param value The value for which to calculate the inverse tangent.
 * @returns {number} inverse tangent of input value
 * @constructor
 */
var ATAN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ATAN");
    value = TypeConverter_1.TypeConverter.valueToNumber(value);
    if (value === -1) {
        return Math.PI;
    }
    else if (value > 1 || value < -1) {
        throw new Errors_1.NumError("Function ATAN parameter 1 value is " + value + ". Valid values are between -1 and 1 inclusive.");
    }
    return Math.atan(value);
};
exports.ATAN = ATAN;
/**
 * Returns the angle between the x-axis and a line segment from the origin (0,0) to specified coordinate pair (x,y), in radians.
 * @param x The x coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis.
 * @param y The y coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis.
 * @returns {number} angle in radians
 * @constructor
 */
var ATAN2 = function (x, y) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "ATAN2");
    x = TypeConverter_1.TypeConverter.valueToNumber(x);
    y = TypeConverter_1.TypeConverter.valueToNumber(y);
    if (x === 0 && y === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function ATAN2 caused a divide by zero error.");
    }
    return Math.atan2(y, x);
};
exports.ATAN2 = ATAN2;
/**
 * Returns the inverse hyperbolic tangent of a number.
 * @param value The value for which to calculate the inverse hyperbolic tangent. Must be between -1 and 1, exclusive.
 * @returns {number} inverse hyperbolic tangent of input
 * @constructor
 */
var ATANH = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ATANH");
    value = TypeConverter_1.TypeConverter.valueToNumber(value);
    if (value >= 1 || value <= -1) {
        throw new Errors_1.NumError("Function ATANH parameter 1 value is " + value + ". Valid values are between -1 and 1 exclusive.");
    }
    if (Math.abs(value) < 1) {
    }
    return Math["atanh"](value);
};
exports.ATANH = ATANH;
/**
 * Rounds a number up to the nearest even integer.
 * @param value The value to round to the next greatest even number.
 * @returns {number} next greatest even number
 * @constructor
 */
var EVEN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "EVEN");
    var X = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return X % 2 === 1 ? X + 1 : X;
};
exports.EVEN = EVEN;
/**
 * Returns the result of the modulo operator, the remainder after a division operation.
 * @param dividend The number to be divided to find the remainder.
 * @param divisor The number to divide by.
 * @returns {number}
 * @constructor
 */
var MOD = function (dividend, divisor) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "MOD");
    var oneN = TypeConverter_1.TypeConverter.valueToNumber(dividend);
    var twoN = TypeConverter_1.TypeConverter.valueToNumber(divisor);
    if (twoN === 0) {
        throw new Errors_1.DivZeroError("Function MOD parameter 2 cannot be zero.");
    }
    return oneN % twoN;
};
exports.MOD = MOD;
/**
 * Rounds a number up to the nearest odd integer.
 * @param value The value to round to the next greatest odd number.
 * @returns {number} value to round up to next greatest odd number.
 * @constructor
 */
var ODD = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ODD");
    var X = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return X % 2 === 1 ? X : X + 1;
};
exports.ODD = ODD;
/**
 * Returns a number raised to a power.
 * @param base - The number to raise to the exponent power.
 * @param exponent - The exponent to raise base to.
 * @returns {number} resulting number
 * @constructor
 */
var POWER = function (base, exponent) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "POWER");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(base);
    var p = TypeConverter_1.TypeConverter.firstValueAsNumber(exponent);
    return Math.pow(n, p);
};
exports.POWER = POWER;
/**
 * Returns the sum of a series of numbers and/or cells.
 * @param values The first number or range to add together.
 * @returns {number} The sum of the series
 * @constructor
 */
var SUM = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "SUM");
    var result = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            result = result + SUM.apply(this, values[i]);
        }
        else {
            if (values[i] === "") {
                throw new Errors_1.ValueError("Function SUM parameter " + i + " expects number values. But '" + values[i] + "' is a text and cannot be coerced to a number.");
            }
            result = result + TypeConverter_1.TypeConverter.valueToNumber(values[i]);
        }
    }
    return result;
};
exports.SUM = SUM;
/**
 * Returns the positive square root of a positive number.
 * @param value - The number for which to calculate the positive square root.
 * @returns {number} square root
 * @constructor
 */
var SQRT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "SQRT");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (x < 0) {
        throw new Errors_1.ValueError("Function SQRT parameter 1 value is " + x + ". It should be greater than or equal to 0.");
    }
    return Math.sqrt(x);
};
exports.SQRT = SQRT;
/**
 * Returns the positive square root of the product of Pi and the given positive number.
 * @param value - The number which will be multiplied by Pi and have the product's square root returned
 * @returns {number} the positive square root of the product of Pi and the given positive number.
 * @constructor
 */
var SQRTPI = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "SQRTPI");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (n < 0) {
        throw new Errors_1.NumError("Function SQRTPI parameter 1 value is " + n + ". It should be greater than or equal to 0.");
    }
    return Math.sqrt(n * Math.PI);
};
exports.SQRTPI = SQRTPI;
/**
 * Returns the cosine of an angle provided in radians.
 * @param value - The angle to find the cosine of, in radians.
 * @returns {number} cosine of angle
 * @constructor
 */
var COS = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "COS");
    var r = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return Math.cos(r);
};
exports.COS = COS;
/**
 * Returns the hyperbolic cosine of any real number.
 * @param value - Any real value to calculate the hyperbolic cosine of.
 * @returns {number} the hyperbolic cosine of the input
 * @constructor
 */
var COSH = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "COSH");
    var r = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return Math["cosh"](r);
};
exports.COSH = COSH;
/**
 * Returns the cotangent of any real number. Defined as cot(x) = 1 / tan(x).
 * @param value - number to calculate the cotangent for
 * @returns {number} cotangent
 * @constructor
 */
var COT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "COT");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (x === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function COT caused a divide by zero error.");
    }
    return 1 / Math.tan(x);
};
exports.COT = COT;
/**
 * Return the hyperbolic cotangent of a value, defined as coth(x) = 1 / tanh(x).
 * @param value - value to calculate the hyperbolic cotangent value of
 * @returns {number} hyperbolic cotangent
 * @constructor
 */
var COTH = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "COTH");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (x === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function COTH caused a divide by zero error.");
    }
    return 1 / Math["tanh"](x);
};
exports.COTH = COTH;
/**
 * Rounds a number down to the nearest integer that is less than or equal to it.
 * @param value -  The value to round down to the nearest integer.
 * @returns {number} Rounded number
 * @constructor
 */
var INT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "INT");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return Math.floor(x);
};
exports.INT = INT;
/**
 * Checks whether the provided value is even.
 * @param value - The value to be verified as even.
 * @returns {boolean} whether this value is even or not
 * @constructor
 */
var ISEVEN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ISEVEN");
    if (value === "") {
        throw new Errors_1.ValueError("Function ISEVEN parameter 1 expects boolean values. But '" + value + "' is a text and cannot be coerced to a boolean.");
    }
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return Math.floor(x) % 2 === 0;
};
exports.ISEVEN = ISEVEN;
/**
 * Checks whether the provided value is odd.
 * @param value - The value to be verified as odd.
 * @returns {boolean} whether this value is odd or not
 * @constructor
 */
var ISODD = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ISODD");
    if (value === "") {
        throw new Errors_1.ValueError("Function ISODD parameter 1 expects boolean values. But '" + value + "' is a text and cannot be coerced to a boolean.");
    }
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return Math.floor(x) % 2 === 1;
};
exports.ISODD = ISODD;
/**
 * Returns the sine of an angle provided in radians.
 * @param value - The angle to find the sine of, in radians.
 * @returns {number} Sine of angle.
 * @constructor
 */
var SIN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "SIN");
    var rad = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return rad === Math.PI ? 0 : Math.sin(rad);
};
exports.SIN = SIN;
/**
 * Returns the hyperbolic sine of any real number.
 * @param value - real number to find the hyperbolic sine of
 * @returns {number} hyperbolic sine
 * @constructor
 */
var SINH = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "SINH");
    var rad = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return Math["sinh"](rad);
};
exports.SINH = SINH;
/**
 * The value Pi.
 * @returns {number} Pi.
 * @constructor
 */
var PI = function () {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 0, "SINH");
    return Math.PI;
};
exports.PI = PI;
/**
 * Returns the the logarithm of a number, base 10.
 * @param value - The value for which to calculate the logarithm, base 10.
 * @returns {number} logarithm of the number, in base 10.
 * @constructor
 */
var LOG10 = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "LOG10");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (n < 1) {
        throw new Errors_1.NumError("Function LOG10 parameter 1 value is " + n + ". It should be greater than 0.");
    }
    var ln = Math.log(n);
    var lb = Math.log(10);
    return ln / lb;
};
exports.LOG10 = LOG10;
/**
 * Returns the the logarithm of a number given a base.
 * @param value - The value for which to calculate the logarithm given base.
 * @param base - The base to use for calculation of the logarithm. Defaults to 10.
 * @returns {number}
 * @constructor
 */
var LOG = function (value, base) {
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 2, "LOG");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var b = TypeConverter_1.TypeConverter.firstValueAsNumber(base);
    if (b < 1) {
        throw new Errors_1.NumError("Function LOG parameter 2 value is " + b + ". It should be greater than 0.");
    }
    if (b < 2) {
        throw new Errors_1.DivZeroError("Evaluation of function LOG caused a divide by zero error.");
    }
    var ln = Math.log(n);
    var lb = Math.log(b);
    if (lb === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function LOG caused a divide by zero error.");
    }
    return ln / lb;
};
exports.LOG = LOG;
/**
 * Returns the logarithm of a number, base e (Euler's number).
 * @param value - The value for which to calculate the logarithm, base e.
 * @returns {number} logarithm calculated
 * @constructor
 */
var LN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "LN");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (n < 1) {
        throw new Errors_1.NumError("Function LN parameter 1 value is " + n + ". It should be greater than 0.");
    }
    return Math.log(n);
};
exports.LN = LN;
/**
 * Returns the tangent of an angle provided in radians.
 * @param value - The angle to find the tangent of, in radians.
 * @returns {number} tangent in radians
 * @constructor
 */
var TAN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "TAN");
    var rad = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return rad === Math.PI ? 0 : Math.tan(rad);
};
exports.TAN = TAN;
/**
 * Returns the hyperbolic tangent of any real number.
 * @param value - Any real value to calculate the hyperbolic tangent of.
 * @returns {number} hyperbolic tangent
 * @constructor
 */
var TANH = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "TANH");
    var rad = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return Math["tanh"](rad);
};
exports.TANH = TANH;
/**
 * Rounds a number up to the nearest integer multiple of specified significance.
 * @param value The value to round up to the nearest integer multiple of factor.
 * @param factor - [ OPTIONAL ] The number to whose multiples value will be rounded.
 * @returns {number}
 * @constructor
 */
var CEILING = function (value, factor) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "CEILING");
    var num = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (factor === undefined) {
        return Math.ceil(num);
    }
    var significance = TypeConverter_1.TypeConverter.firstValueAsNumber(factor);
    if (significance === 0) {
        throw new Errors_1.DivZeroError("Function CEILING parameter 2 cannot be zero.");
    }
    var precision = -Math.floor(Math.log(significance) / Math.log(10));
    if (num >= 0) {
        return ROUND(Math.ceil(num / significance) * significance, precision);
    }
    else {
        return -ROUND(Math.floor(Math.abs(num) / significance) * significance, precision);
    }
};
exports.CEILING = CEILING;
/**
 * Rounds a number down to the nearest integer multiple of specified significance.
 * @param value - The value to round down to the nearest integer multiple of factor.
 * @param factor - The number to whose multiples value will be rounded.
 * @returns {number}
 * @constructor
 */
var FLOOR = function (value, factor) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "FLOOR");
    var num = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (factor === undefined) {
        return Math.floor(num);
    }
    var significance = TypeConverter_1.TypeConverter.firstValueAsNumber(factor);
    if (significance === 0) {
        throw new Errors_1.DivZeroError("Function FLOOR parameter 2 cannot be zero.");
    }
    significance = significance ? Math.abs(significance) : 1;
    var precision = -Math.floor(Math.log(significance) / Math.log(10));
    if (num >= 0) {
        return ROUND(Math.floor(num / significance) * significance, precision);
    }
    return -ROUND(Math.floor(Math.abs(num) / significance) * significance, precision);
};
exports.FLOOR = FLOOR;
/**
 * Returns one value if a logical expression is TRUE and another if it is FALSE.
 * @param logicalExpression - An expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE.
 * @param valueIfTrue - The value the function returns if logical_expression is TRUE
 * @param valueIfFalse - The value the function returns if logical_expression is FALSE.
 * @returns one value if a logical expression is TRUE and another if it is FALSE.
 * @constructor
 */
var IF = function (logicalExpression, valueIfTrue, valueIfFalse) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "IF");
    if (logicalExpression instanceof Array) {
        if (logicalExpression.length === 0) {
            throw new Errors_1.RefError("Reference does not exist.");
        }
        return IF(logicalExpression[0], valueIfTrue, valueIfFalse);
    }
    else if (logicalExpression === "") {
        return valueIfFalse;
    }
    return (TypeConverter_1.TypeConverter.valueToBoolean(logicalExpression)) ? valueIfTrue : valueIfFalse;
};
exports.IF = IF;
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
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "COUNTIF");
    if (!(range instanceof Array)) {
        range = [range];
    }
    var criteriaEvaluation = CriteriaFunctionFactory_1.CriteriaFunctionFactory.createCriteriaFunction(criteria);
    var count = 0;
    for (var i = 0; i < range.length; i++) {
        var x = range[i];
        if (x instanceof Array) {
            count = count + COUNTIF.apply(this, [x, criteria]);
        }
        else if (criteriaEvaluation(x)) {
            count++;
        }
    }
    return count;
};
exports.COUNTIF = COUNTIF;
/**
 * Returns the count of a range depending on multiple criteria.
 * @param values[0] criteria_range1 - The range to check against criterion1.
 * @param values[1] criterion1 - The pattern or test to apply to criteria_range1.
 * @param values[2...N] Repeated sets of ranges and criterion to check.
 * @returns {number} count
 * @constructor
 */
var COUNTIFS = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 2, "COUNTIFS");
    var criteriaEvaluationFunctions = values.map(function (criteria, index) {
        if (index % 2 === 1) {
            return CriteriaFunctionFactory_1.CriteriaFunctionFactory.createCriteriaFunction(criteria);
        }
        else {
            return function () { return false; };
        }
    });
    var filteredValues = [];
    // Flatten arrays/ranges
    for (var x = 0; x < values.length; x++) {
        // If this is an array/range parameter
        if (x % 2 === 0) {
            filteredValues.push(Filter_1.Filter.flatten(values[x]));
        }
        else {
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
                throw new Errors_1.ValueError("Array arguments to COUNTIFS are of different size.");
            }
            var criteriaEvaluation = criteriaEvaluationFunctions[x + 1];
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
exports.COUNTIFS = COUNTIFS;
/**
 * Rounds a number to a certain number of decimal places according to standard rules.
 * @param value - The value to round to places number of places.
 * @param places - The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUND = function (value, places) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "ROUND");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var d = TypeConverter_1.TypeConverter.firstValueAsNumber(places);
    return Math.round(n * Math.pow(10, d)) / Math.pow(10, d);
};
exports.ROUND = ROUND;
/**
 * Rounds a number to a certain number of decimal places, always rounding down to the next valid increment.
 * @param value - The value to round to places number of places, always rounding down.
 * @param places - (optional) The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUNDDOWN = function (value, places) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "ROUNDDOWN");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (places === undefined) {
        return Math.floor(n);
    }
    var d = TypeConverter_1.TypeConverter.firstValueAsNumber(places);
    return Math.floor(n * Math.pow(10, d)) / Math.pow(10, d);
};
exports.ROUNDDOWN = ROUNDDOWN;
/**
 * Rounds a number to a certain number of decimal places, always rounding up to the next valid increment.
 * @param value - The value to round to places number of places, always rounding up.
 * @param places - (optional) The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
var ROUNDUP = function (value, places) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "ROUNDUP");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (places === undefined) {
        return Math.ceil(n);
    }
    var d = TypeConverter_1.TypeConverter.firstValueAsNumber(places);
    return Math.ceil(n * Math.pow(10, d)) / Math.pow(10, d);
};
exports.ROUNDUP = ROUNDUP;
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
var SUMIF = function (range, criteria, sumRange) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "SUMIF");
    var criteriaEvaluation = CriteriaFunctionFactory_1.CriteriaFunctionFactory.createCriteriaFunction(criteria);
    var sum = 0;
    for (var i = 0; i < range.length; i++) {
        var x = range[i];
        if (x instanceof Array) {
            sum += SUMIF.apply(this, [x, criteria]);
        }
        else {
            if (sumRange && i > sumRange.length - 1) {
                continue;
            }
            if (arguments.length === 2 && TypeConverter_1.TypeConverter.canCoerceToNumber(x) && criteriaEvaluation(x)) {
                sum = sum + TypeConverter_1.TypeConverter.valueToNumber(x);
            }
            else if (arguments.length === 3 && TypeConverter_1.TypeConverter.canCoerceToNumber(sumRange[i]) && criteriaEvaluation(x)) {
                sum = sum + TypeConverter_1.TypeConverter.valueToNumber(sumRange[i]);
            }
        }
    }
    return sum;
};
exports.SUMIF = SUMIF;
/**
 * Returns the sum of the squares of a series of numbers and/or cells.
 * @param values  The values or range(s) whose squares to add together.
 * @returns {number} the sum of the squares if the input.
 * @constructor
 */
var SUMSQ = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "SUMSQ");
    var result = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            result = result + SUMSQ.apply(this, Filter_1.Filter.filterOutNonNumberValues(values[i]));
        }
        else {
            var n = TypeConverter_1.TypeConverter.valueToNumber(values[i]);
            result = result + (n * n);
        }
    }
    return result;
};
exports.SUMSQ = SUMSQ;
/**
 * Returns the product of two numbers. Equivalent to the `*` operator.
 * @param factor1 - The first multiplicand.
 * @param factor2 - The second multiplicand.
 * @constructor
 */
var MULTIPLY = function (factor1, factor2) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "MULTIPLY");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(factor1);
    var y = TypeConverter_1.TypeConverter.firstValueAsNumber(factor2);
    return x * y;
};
exports.MULTIPLY = MULTIPLY;
/**
 * Returns the result of the first number minus the second number. Equivalent to the `-` operator.
 * @param one - The first number.
 * @param two - the second number.
 * @returns {number}
 * @constructor
 */
var MINUS = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "MINUS");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(one);
    var y = TypeConverter_1.TypeConverter.firstValueAsNumber(two);
    return x - y;
};
exports.MINUS = MINUS;
/**
 * Returns true if two specified values are equal and true otherwise. Equivalent to the "=" operator.
 * @param one - First value to check.
 * @param two - Second value to check.
 * @returns {boolean} true if values are equal, false if they are not equal.
 * @constructor
 */
var EQ = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "EQ");
    var x = TypeConverter_1.TypeConverter.firstValue(one);
    var y = TypeConverter_1.TypeConverter.firstValue(two);
    return x === y;
};
exports.EQ = EQ;
/**
 * Returns true if the first argument is strictly greater than the second, and false otherwise. Equivalent to the `>`
 * operator.
 * @param one - The value to test as being greater than `two`.
 * @param two - The second value.
 * @returns {boolean}
 * @constructor
 */
var GT = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "GT");
    var x = TypeConverter_1.TypeConverter.firstValue(one);
    var y = TypeConverter_1.TypeConverter.firstValue(two);
    return x > y;
};
exports.GT = GT;
/**
 * Returns true if the first argument is greater than or equal to the second, and false otherwise. Equivalent to the
 * `>=` operator.
 * @param one - The value to test as being greater than or equal to `two`.
 * @param two -The second value.
 * @returns {boolean}
 * @constructor
 */
var GTE = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "GTE");
    var x = TypeConverter_1.TypeConverter.firstValue(one);
    var y = TypeConverter_1.TypeConverter.firstValue(two);
    return x >= y;
};
exports.GTE = GTE;
/**
 * Returns true if the first argument is strictly less than the second, and false otherwise. Equivalent to the `<`
 * operator.
 * @param one - The value to test as being less than `two`.
 * @param two - The second value.
 * @returns {boolean}
 * @constructor
 */
var LT = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "LT");
    var x = TypeConverter_1.TypeConverter.firstValue(one);
    var y = TypeConverter_1.TypeConverter.firstValue(two);
    return x < y;
};
exports.LT = LT;
/**
 * Returns true if the first argument is less than or equal to the second, and true otherwise. Equivalent to the
 * `<=` operator.
 * @param one - The value to test as being less than or equal to `two`.
 * @param two - The second value.
 * @constructor
 */
var LTE = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "LTE");
    var x = TypeConverter_1.TypeConverter.firstValue(one);
    var y = TypeConverter_1.TypeConverter.firstValue(two);
    return x <= y;
};
exports.LTE = LTE;
/**
 * Returns "TRUE" if two specified values are not equal and "FALSE" otherwise. Equivalent to the "<>" operator.
 * @param one - The value to test as being not equal to `two`.
 * @param two - The second valud.
 * @returns {boolean}
 * @constructor
 */
var NE = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "NE");
    var x = TypeConverter_1.TypeConverter.firstValue(one);
    var y = TypeConverter_1.TypeConverter.firstValue(two);
    return x !== y;
};
exports.NE = NE;
/**
 * Returns one number divided by another. Equivalent to the `/` operator.
 * @param dividend - The number to be divided.
 * @param divisor - The number to divide by, cannot be 0.
 * @returns {number} result of dividend / divisor.
 * @constructor
 */
var DIVIDE = function (dividend, divisor) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "DIVIDE");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(dividend);
    var y = TypeConverter_1.TypeConverter.firstValueAsNumber(divisor);
    if (y < 0) {
        throw new Errors_1.DivZeroError("Function DIVIDE parameter 2 cannot be zero.");
    }
    var result = x / y;
    if (result == Infinity) {
        throw new Errors_1.DivZeroError("Evaluation caused divide by zero error.");
    }
    else if (isNaN(result)) {
        throw new Errors_1.DivZeroError("Evaluation caused divide by zero error.");
    }
    return result;
};
exports.DIVIDE = DIVIDE;
/**
 * Returns a random number between 0 inclusive and 1 exclusive.
 * @returns {number}
 * @constructor
 */
var RAND = function () {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 0, "RAND");
    return Math.random();
};
exports.RAND = RAND;
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
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "RAND");
    low = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(low));
    high = Math.ceil(TypeConverter_1.TypeConverter.firstValueAsNumber(high));
    if (low > high) {
        throw new Errors_1.NumError("Function RANDBETWEEN parameter 2 value is " + low + ". It should be greater than or equal to "
            + high + ".");
    }
    var diff = Math.abs(low - high);
    return Math.round(low + (Math.random() * diff));
};
exports.RANDBETWEEN = RANDBETWEEN;
/**
 * Given an input number, returns `-1` if it is negative, `1` if positive, and `0` if it is zero.
 * @param value - The value to check the sign for
 * @returns {number} `-1` if it is negative, `1` if positive, and `0` if it is zero.
 * @constructor
 */
var SIGN = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "SIGN");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (x === 0) {
        return 0;
    }
    return x > 0 ? 1 : -1;
};
exports.SIGN = SIGN;
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
var TRUNC = function (value, places) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "TRUNC");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var digits = 0;
    if (places !== undefined) {
        digits = TypeConverter_1.TypeConverter.firstValueAsNumber(places);
    }
    var sign = (n > 0) ? 1 : -1;
    return sign * (Math.floor(Math.abs(n) * Math.pow(10, digits))) / Math.pow(10, digits);
};
exports.TRUNC = TRUNC;
/**
 * Converts an angle value in degrees to radians.
 * @param angle - The angle to convert from degrees to radians.
 * @returns {number} radians
 * @constructor
 */
var RADIANS = function (angle) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "RADIANS");
    var d = TypeConverter_1.TypeConverter.firstValueAsNumber(angle);
    return d * Math.PI / 180;
};
exports.RADIANS = RADIANS;
/**
 * Converts an angle value in radians to degrees.
 * @param angle - The angle to convert from radians to degrees.
 * @returns {number} degrees
 * @constructor
 */
var DEGREES = function (angle) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "DEGREES");
    var r = TypeConverter_1.TypeConverter.firstValueAsNumber(angle);
    return r * 180 / Math.PI;
};
exports.DEGREES = DEGREES;
/**
 * Returns the complementary Gauss error function of a value.
 * @param value - The number for which to calculate the complementary Gauss error function.
 * @returns {number} complementary Gauss error function of a value
 * @constructor
 */
var ERFC = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ERFC");
    var v = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return v === 0 ? 1 : 1 - MathHelpers_1.erf(v);
};
exports.ERFC = ERFC;
/**
 * Returns the error function integrated between lower_limit and upper_limit.
 * @param lowerLimit - The lower bound for integrating ERF.
 * @param upperLimit - [Optional]. The upper bound for integrating ERF. If omitted, ERF integrates between
 * zero and lower_limit.
 * @returns {number} error function integrated between lower_limit and upper_limit
 * @constructor
 */
var ERF = function (lowerLimit, upperLimit) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "ERF");
    var lower = TypeConverter_1.TypeConverter.firstValueAsNumber(lowerLimit);
    var upper = upperLimit !== undefined ? TypeConverter_1.TypeConverter.firstValueAsNumber(upperLimit) : 0;
    return upperLimit === undefined ? MathHelpers_1.erf(lower) : MathHelpers_1.erf(upper) - MathHelpers_1.erf(lower);
};
exports.ERF = ERF;
/**
 * Calculates the sum of the sums of the squares of values in two arrays.
 * @param arrayX - The array or range of values whose squares will be added to the squares of corresponding
 * entries in arrayY and added together.
 * @param arrayY - The array or range of values whose squares will be added to the squares of corresponding
 * entries in arrayX and added together.
 * @returns {number} sum of the sums of the squares
 * @constructor
 */
var SUMX2PY2 = function (arrayX, arrayY) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "SUMX2PY2");
    var arrOne = Filter_1.Filter.flattenAndThrow(arrayX);
    var arrTwo = Filter_1.Filter.flattenAndThrow(arrayY);
    if (arrOne.length !== arrTwo.length) {
        throw new Errors_1.NAError("Array arguments to SUMX2PY2 are of different size.");
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
exports.SUMX2PY2 = SUMX2PY2;
/**
 * Calculates the sum of the differences of the squares of values in two arrays.
 * @param arrayX - The array or range of values whose squares will be reduced by the squares of corresponding
 * entries in array_y and added together.
 * @param arrayY - The array or range of values whose squares will be subtracted from the squares of
 * corresponding entries in array_x and added together.
 * @returns {number} sum of the differences of the squares
 * @constructor
 */
var SUMX2MY2 = function (arrayX, arrayY) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "SUMX2MY2");
    var arrOne = Filter_1.Filter.flattenAndThrow(arrayX);
    var arrTwo = Filter_1.Filter.flattenAndThrow(arrayY);
    if (arrOne.length !== arrTwo.length) {
        throw new Errors_1.NAError("Array arguments to SUMX2MY2 are of different size.");
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
exports.SUMX2MY2 = SUMX2MY2;
// Private function that will recursively generate an array of the unique primitives
var _countUnique = function (values) {
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
        }
        else {
            uniques[Serializer_1.Serializer.serialize(values[i])] = true;
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
var COUNTUNIQUE = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "COUNTUNIQUE");
    var uniques = _countUnique(values);
    return Object.keys(uniques).length;
};
exports.COUNTUNIQUE = COUNTUNIQUE;
/**
 * Calculates the sum of the products of corresponding entries in two equal-sized arrays or ranges.
 * @param values Arrays or ranges whose entries will be multiplied with corresponding entries in the second such array
 * or range.
 * @returns {number} sum of the products
 * @constructor
 */
var SUMPRODUCT = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "SUMPRODUCT");
    // Ensuring that all values are array values
    for (var x = 0; x < values.length; x++) {
        if (!Array.isArray(values[x])) {
            values[x] = [values[x]];
        }
    }
    // Flatten any nested ranges (arrays) and check for mismatched range sizes
    var flattenedValues = [Filter_1.Filter.flattenAndThrow(values[0])];
    for (var x = 1; x < values.length; x++) {
        flattenedValues.push(Filter_1.Filter.flattenAndThrow(values[x]));
        if (flattenedValues[x].length !== flattenedValues[0].length) {
            throw new Errors_1.ValueError("SUMPRODUCT has mismatched range sizes. Expected count: "
                + flattenedValues[0].length + ". Actual count: " + flattenedValues[0].length + ".");
        }
    }
    // Do the actual math
    var result = 0;
    for (var i = 0; i < flattenedValues[0].length; i++) {
        var product = 1;
        for (var x = 0; x < flattenedValues.length; x++) {
            product *= TypeConverter_1.TypeConverter.valueToNumberGracefully(flattenedValues[x][i]);
        }
        result += product;
    }
    return result;
};
exports.SUMPRODUCT = SUMPRODUCT;
/**
 * Returns the number of ways to choose some number of objects from a pool of a given size of objects.
 * @param m - The size of the pool of objects to choose from.
 * @param k - The number of objects to choose.
 * @returns {number} number of ways
 * @constructor
 */
var COMBIN = function (m, k) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "COMBIN");
    var MEMOIZED_FACT = [];
    function fact(number) {
        var n = Math.floor(number);
        if (n === 0 || n === 1) {
            return 1;
        }
        else if (MEMOIZED_FACT[n] > 0) {
            return MEMOIZED_FACT[n];
        }
        else {
            MEMOIZED_FACT[n] = fact(n - 1) * n;
            return MEMOIZED_FACT[n];
        }
    }
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(m);
    var c = TypeConverter_1.TypeConverter.firstValueAsNumber(k);
    if (n < c) {
        throw new Errors_1.NumError("Function COMBIN parameter 2 value is "
            + c + ". It should be less than or equal to value of Function COMBIN parameter 1 with " + n + ".");
    }
    n = Math.floor(n);
    c = Math.floor(c);
    var div = fact(c) * fact(n - c);
    if (div === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function COMBIN caused a divide by zero error.");
    }
    return fact(n) / div;
};
exports.COMBIN = COMBIN;
/**
 * Multiply a series of numbers together.
 * @param values - values or range of values to multiply by each other.
 * @constructor
 */
var PRODUCT = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 2, "PRODUCT");
    var value = 1;
    var numbers = Filter_1.Filter.flattenAndThrow(values);
    for (var i = 0; i < numbers.length; i++) {
        value *= TypeConverter_1.TypeConverter.valueToNumber(numbers[i]);
    }
    return value;
};
exports.PRODUCT = PRODUCT;
/**
 * Divide one number by another
 * @param dividend - number to be divided by the divisor.
 * @param divisor - number to divide the dividend.
 * @returns {number}
 * @constructor
 */
var QUOTIENT = function (dividend, divisor) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "QUOTIENT");
    var dv = TypeConverter_1.TypeConverter.firstValueAsNumber(dividend);
    var ds = TypeConverter_1.TypeConverter.firstValueAsNumber(divisor);
    if (ds === 0) {
        throw new Errors_1.DivZeroError("Function QUOTIENT parameter 2 cannot be zero.");
    }
    return dv / ds;
};
exports.QUOTIENT = QUOTIENT;
/**
 * Returns a value, but does nothing to it. If given a range, will return first value.
 * @param value to return
 * @returns any value
 * @constructor
 */
var UPLUS = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "UPLUS");
    return TypeConverter_1.TypeConverter.firstValue(value);
};
exports.UPLUS = UPLUS;
/**
 * Returns the same number, but with the sign reversed.
 * @param value to reverse the sign on
 * @returns {number}
 * @constructor
 */
var UMINUS = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "UMINUS");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    return n * -1;
};
exports.UMINUS = UMINUS;
/**
 * Rounds a number to the nearest integer multiple of another.
 * @param value - value to round.
 * @param factor - multiple.
 * @returns {number}
 * @constructor
 */
var MROUND = function (value, factor) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "MROUND");
    var v = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var f = TypeConverter_1.TypeConverter.firstValueAsNumber(factor);
    if (v * f < 0) {
        throw new Errors_1.NumError("Parameters of MROUND must have same signs (both positive or both negative).");
    }
    if (f === 0) {
        return 0;
    }
    return Math.round(v / f) * f;
};
exports.MROUND = MROUND;
/**
 * Calculates the double-factorial of a number.
 * @param value - value or reference to calculate.
 * @returns {number}
 * @constructor
 */
var FACTDOUBLE = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "FACTDOUBLE");
    var n = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(value));
    function factDoublePrivate(n) {
        if (n <= 0) {
            return 1;
        }
        else {
            return n * factDoublePrivate(n - 2);
        }
    }
    if (n === 0) {
        return 0;
    }
    else if (n < 0) {
        throw new Errors_1.NumError("Function FACTDOUBLE parameter 1 value is '" + n
            + "'. It should be greater than or equal to 0.");
    }
    else {
        return factDoublePrivate(n);
    }
};
exports.FACTDOUBLE = FACTDOUBLE;
/**
 * Returns a value as a percentage where 100 is 1.0, and 0 is 0.
 * @param value - To convert.
 * @returns {number}
 * @constructor
 */
var UNARY_PERCENT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "UNARY_PERCENT");
    return TypeConverter_1.TypeConverter.firstValueAsNumber(value) / 100;
};
exports.UNARY_PERCENT = UNARY_PERCENT;
/**
 * Returns the factorial of the sum of the arguments divided by the product of the factorials of the arguments.
 * @param values - Range of numbers.
 * @returns {number}
 * @constructor
 */
var MULTINOMIAL = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "MULTINOMIAL");
    values = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber);
    var memoizeFact = [];
    function _fact(value) {
        var n = Math.floor(value);
        if (n === 0 || n === 1) {
            return 1;
        }
        else if (memoizeFact[n] > 0) {
            return memoizeFact[n];
        }
        else {
            memoizeFact[n] = _fact(n - 1) * n;
            return memoizeFact[n];
        }
    }
    var sum = 0;
    var divisor = 1;
    for (var i = 0; i < values.length; i++) {
        sum += arguments[i];
        divisor *= _fact(values[i]);
    }
    return _fact(sum) / divisor;
};
exports.MULTINOMIAL = MULTINOMIAL;
/**
 * Returns a sum of powers of the number x in accordance with the following formula.
 * @param x - The number as an independent variable.
 * @param n - The starting power.
 * @param m - The number to increment by
 * @param coefficients - A series of coefficients. For each coefficient the series sum is extended by one section. You
 * can only enter coefficients using cell references.
 * @returns {number}
 * @constructor
 */
var SERIESSUM = function (x, n, m, coefficients) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 4, "SERIESSUM");
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    n = TypeConverter_1.TypeConverter.firstValueAsNumber(n);
    m = TypeConverter_1.TypeConverter.firstValueAsNumber(m);
    coefficients = Filter_1.Filter.flattenAndThrow(coefficients).map(TypeConverter_1.TypeConverter.valueToNumber);
    var result = coefficients[0] * Math.pow(x, n);
    for (var i = 1; i < coefficients.length; i++) {
        result += coefficients[i] * Math.pow(x, n + i * m);
    }
    return result;
};
exports.SERIESSUM = SERIESSUM;
/**
 * Calculates subtotals. If a range already contains subtotals, these are not used for further calculations.
 * @param functionCode - A value that stands for another function: 1=AVERAGE, 2=COUNT, 3=COUNTA, 4=MAX, 5=MIN,
 * 6=PRODUCT, 7=STDEV, 8=STDEVP, 9=SUM, 10=VAR, 11=VARP.
 * @param values - The ranges whose cells are included.
 * @returns {Array}
 * @constructor
 */
var SUBTOTAL = function (functionCode) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 2, "SUBTOTAL");
    functionCode = TypeConverter_1.TypeConverter.firstValueAsNumber(functionCode);
    values = Filter_1.Filter.flattenAndThrow(values);
    switch (functionCode) {
        case 1:
            return Statistical_1.AVERAGE(values);
        case 2:
            return Statistical_1.COUNT(values);
        case 3:
            return Statistical_1.COUNTA(values);
        case 4:
            return Statistical_1.MAX(values);
        case 5:
            return Statistical_1.MIN(values);
        case 6:
            return PRODUCT.apply(this, values);
        case 7:
            return Statistical_1.STDEV(values);
        case 8:
            return Statistical_1.STDEVP(values);
        case 9:
            return SUM(values);
        case 10:
            return Statistical_1.VAR(values);
        case 11:
            return Statistical_1.VARP(values);
        default:
            throw new Errors_1.ValueError("Value '" + functionCode +
                "' does not correspond to a function for use in SUBTOTAL. Value should be between 1 to 11.");
    }
};
exports.SUBTOTAL = SUBTOTAL;
