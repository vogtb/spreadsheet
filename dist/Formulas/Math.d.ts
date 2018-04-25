/**
 * Returns the greatest common divisor of one or more integers.
 * @param values - The values or ranges whose factors to consider in a calculation to find the greatest common divisor.
 * @returns {number} greatest common divisor.
 * @constructor
 */
declare let GCD: (...values: any[]) => any;
/**
 * Returns the least common multiple of one or more integers.
 * @param values - The values or range whose factors to consider in a calculation to find the least common multiple.
 * @returns {number}
 * @constructor
 */
declare let LCM: (...values: any[]) => number;
/**
 * Returns the the logarithm of a specified Gamma function, base e (Euler's number).
 * @param value - The input number. The natural logarithm of Gamma (value) will be returned. Must be positive.
 * @returns {number}
 * @constructor
 */
declare let GAMMALN: (value: any) => number;
/**
 * Returns the absolute value of a number.
 * @param value to get the absolute value of.
 * @returns {number} absolute value
 * @constructor
 */
declare let ABS: (value: any) => number;
/**
 * Returns the inverse cosine of a value, in radians.
 * @param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive.
 * @returns {number} inverse cosine of value
 * @constructor
 */
declare let ACOS: (value: any) => number;
/**
 * Returns the inverse hyperbolic cosine of a number.
 * @param value The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1.
 * @returns {number} to find the inverse hyperbolic cosine for.
 * @constructor
 */
declare let ACOSH: (value: any) => number;
/**
 * Calculate the hyperbolic arc-cotangent of a value
 * @param value number not between -1 and 1 inclusively.
 * @returns {number} hyperbolic arc-cotangent
 * @constructor
 */
declare let ACOTH: (value: any) => number;
/**
 * Returns the inverse sine of a value, in radians.
 * @param value The value for which to calculate the inverse sine. Must be between -1 and 1, inclusive.
 * @returns {number} inverse sine of input value
 * @constructor
 */
declare let ASIN: (value: any) => number;
/**
 * Returns the inverse hyperbolic sine of a number.
 * @param value The value for which to calculate the inverse hyperbolic sine.
 * @returns {number} inverse hyperbolic sine of input
 * @constructor
 */
declare let ASINH: (value: any) => number;
/**
 * Returns the inverse tangent of a value, in radians.
 * @param value The value for which to calculate the inverse tangent.
 * @returns {number} inverse tangent of input value
 * @constructor
 */
declare let ATAN: (value: any) => number;
/**
 * Returns the angle between the x-axis and a line segment from the origin (0,0) to specified coordinate pair (x,y), in radians.
 * @param x The x coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis.
 * @param y The y coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis.
 * @returns {number} angle in radians
 * @constructor
 */
declare let ATAN2: (x: any, y: any) => number;
/**
 * Returns the inverse hyperbolic tangent of a number.
 * @param value The value for which to calculate the inverse hyperbolic tangent. Must be between -1 and 1, exclusive.
 * @returns {number} inverse hyperbolic tangent of input
 * @constructor
 */
declare let ATANH: (value: any) => number;
/**
 * Rounds a number up to the nearest even integer.
 * @param value The value to round to the next greatest even number.
 * @returns {number} next greatest even number
 * @constructor
 */
declare let EVEN: (value: any) => number;
/**
 * Returns the result of the modulo operator, the remainder after a division operation.
 * @param dividend The number to be divided to find the remainder.
 * @param divisor The number to divide by.
 * @returns {number}
 * @constructor
 */
declare let MOD: (dividend: any, divisor: any) => number;
/**
 * Rounds a number up to the nearest odd integer.
 * @param value The value to round to the next greatest odd number.
 * @returns {number} value to round up to next greatest odd number.
 * @constructor
 */
declare let ODD: (value: any) => number;
/**
 * Returns a number raised to a power.
 * @param base - The number to raise to the exponent power.
 * @param exponent - The exponent to raise base to.
 * @returns {number} resulting number
 * @constructor
 */
declare let POWER: (base: any, exponent: any) => number;
/**
 * Returns the sum of a series of numbers and/or cells.
 * @param values The first number or range to add together.
 * @returns {number} The sum of the series
 * @constructor
 */
declare let SUM: (...values: any[]) => number;
/**
 * Returns the positive square root of a positive number.
 * @param value - The number for which to calculate the positive square root.
 * @returns {number} square root
 * @constructor
 */
declare let SQRT: (value: any) => number;
/**
 * Returns the positive square root of the product of Pi and the given positive number.
 * @param value - The number which will be multiplied by Pi and have the product's square root returned
 * @returns {number} the positive square root of the product of Pi and the given positive number.
 * @constructor
 */
declare let SQRTPI: (value: any) => number;
/**
 * Returns the cosine of an angle provided in radians.
 * @param value - The angle to find the cosine of, in radians.
 * @returns {number} cosine of angle
 * @constructor
 */
declare let COS: (value: any) => number;
/**
 * Returns the hyperbolic cosine of any real number.
 * @param value - Any real value to calculate the hyperbolic cosine of.
 * @returns {number} the hyperbolic cosine of the input
 * @constructor
 */
declare let COSH: (value: any) => number;
/**
 * Returns the cotangent of any real number. Defined as cot(x) = 1 / tan(x).
 * @param value - number to calculate the cotangent for
 * @returns {number} cotangent
 * @constructor
 */
declare let COT: (value: any) => number;
/**
 * Return the hyperbolic cotangent of a value, defined as coth(x) = 1 / tanh(x).
 * @param value - value to calculate the hyperbolic cotangent value of
 * @returns {number} hyperbolic cotangent
 * @constructor
 */
declare let COTH: (value: any) => number;
/**
 * Rounds a number down to the nearest integer that is less than or equal to it.
 * @param value -  The value to round down to the nearest integer.
 * @returns {number} Rounded number
 * @constructor
 */
declare let INT: (value: any) => number;
/**
 * Checks whether the provided value is even.
 * @param value - The value to be verified as even.
 * @returns {boolean} whether this value is even or not
 * @constructor
 */
declare let ISEVEN: (value: any) => boolean;
/**
 * Checks whether the provided value is odd.
 * @param value - The value to be verified as odd.
 * @returns {boolean} whether this value is odd or not
 * @constructor
 */
declare let ISODD: (value: any) => boolean;
/**
 * Returns the sine of an angle provided in radians.
 * @param value - The angle to find the sine of, in radians.
 * @returns {number} Sine of angle.
 * @constructor
 */
declare let SIN: (value: any) => number;
/**
 * Returns the hyperbolic sine of any real number.
 * @param value - real number to find the hyperbolic sine of
 * @returns {number} hyperbolic sine
 * @constructor
 */
declare let SINH: (value: any) => number;
/**
 * The value Pi.
 * @returns {number} Pi.
 * @constructor
 */
declare let PI: () => number;
/**
 * Returns the the logarithm of a number, base 10.
 * @param value - The value for which to calculate the logarithm, base 10.
 * @returns {number} logarithm of the number, in base 10.
 * @constructor
 */
declare let LOG10: (value: any) => number;
/**
 * Returns the the logarithm of a number given a base.
 * @param value - The value for which to calculate the logarithm given base.
 * @param base - The base to use for calculation of the logarithm. Defaults to 10.
 * @returns {number}
 * @constructor
 */
declare let LOG: (value: any, base: any) => number;
/**
 * Returns the logarithm of a number, base e (Euler's number).
 * @param value - The value for which to calculate the logarithm, base e.
 * @returns {number} logarithm calculated
 * @constructor
 */
declare let LN: (value: any) => number;
/**
 * Returns the tangent of an angle provided in radians.
 * @param value - The angle to find the tangent of, in radians.
 * @returns {number} tangent in radians
 * @constructor
 */
declare let TAN: (value: any) => number;
/**
 * Returns the hyperbolic tangent of any real number.
 * @param value - Any real value to calculate the hyperbolic tangent of.
 * @returns {number} hyperbolic tangent
 * @constructor
 */
declare let TANH: (value: any) => number;
/**
 * Rounds a number up to the nearest integer multiple of specified significance.
 * @param value The value to round up to the nearest integer multiple of factor.
 * @param factor - [ OPTIONAL ] The number to whose multiples value will be rounded.
 * @returns {number}
 * @constructor
 */
declare let CEILING: (value: any, factor?: any) => number;
/**
 * Rounds a number down to the nearest integer multiple of specified significance.
 * @param value - The value to round down to the nearest integer multiple of factor.
 * @param factor - The number to whose multiples value will be rounded.
 * @returns {number}
 * @constructor
 */
declare let FLOOR: (value: any, factor?: any) => number;
/**
 * Returns one value if a logical expression is TRUE and another if it is FALSE.
 * @param logicalExpression - An expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE.
 * @param valueIfTrue - The value the function returns if logical_expression is TRUE
 * @param valueIfFalse - The value the function returns if logical_expression is FALSE.
 * @returns one value if a logical expression is TRUE and another if it is FALSE.
 * @constructor
 */
declare let IF: (logicalExpression: any, valueIfTrue: any, valueIfFalse: any) => any;
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
declare let COUNTIF: (range: any, criteria: any) => number;
/**
 * Returns the count of a range depending on multiple criteria.
 * @param values[0] criteria_range1 - The range to check against criterion1.
 * @param values[1] criterion1 - The pattern or test to apply to criteria_range1.
 * @param values[2...N] Repeated sets of ranges and criterion to check.
 * @returns {number} count
 * @constructor
 */
declare let COUNTIFS: (...values: any[]) => number;
/**
 * Rounds a number to a certain number of decimal places according to standard rules.
 * @param value - The value to round to places number of places.
 * @param places - The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
declare let ROUND: (value: any, places: any) => number;
/**
 * Rounds a number to a certain number of decimal places, always rounding down to the next valid increment.
 * @param value - The value to round to places number of places, always rounding down.
 * @param places - (optional) The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
declare let ROUNDDOWN: (value: any, places?: any) => number;
/**
 * Rounds a number to a certain number of decimal places, always rounding up to the next valid increment.
 * @param value - The value to round to places number of places, always rounding up.
 * @param places - (optional) The number of decimal places to which to round.
 * @returns {number}
 * @constructor
 */
declare let ROUNDUP: (value: any, places?: any) => number;
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
declare let SUMIF: (range: any, criteria: any, sumRange?: any) => number;
/**
 * Returns the sum of the squares of a series of numbers and/or cells.
 * @param values  The values or range(s) whose squares to add together.
 * @returns {number} the sum of the squares if the input.
 * @constructor
 */
declare let SUMSQ: (...values: any[]) => number;
/**
 * Returns the product of two numbers. Equivalent to the `*` operator.
 * @param factor1 - The first multiplicand.
 * @param factor2 - The second multiplicand.
 * @constructor
 */
declare let MULTIPLY: (factor1: any, factor2: any) => number;
/**
 * Returns the result of the first number minus the second number. Equivalent to the `-` operator.
 * @param one - The first number.
 * @param two - the second number.
 * @returns {number}
 * @constructor
 */
declare let MINUS: (one: any, two: any) => number;
/**
 * Returns true if two specified values are equal and true otherwise. Equivalent to the "=" operator.
 * @param one - First value to check.
 * @param two - Second value to check.
 * @returns {boolean} true if values are equal, false if they are not equal.
 * @constructor
 */
declare let EQ: (one: any, two: any) => boolean;
/**
 * Returns true if the first argument is strictly greater than the second, and false otherwise. Equivalent to the `>`
 * operator.
 * @param one - The value to test as being greater than `two`.
 * @param two - The second value.
 * @returns {boolean}
 * @constructor
 */
declare let GT: (one: any, two: any) => boolean;
/**
 * Returns true if the first argument is greater than or equal to the second, and false otherwise. Equivalent to the
 * `>=` operator.
 * @param one - The value to test as being greater than or equal to `two`.
 * @param two -The second value.
 * @returns {boolean}
 * @constructor
 */
declare let GTE: (one: any, two: any) => boolean;
/**
 * Returns true if the first argument is strictly less than the second, and false otherwise. Equivalent to the `<`
 * operator.
 * @param one - The value to test as being less than `two`.
 * @param two - The second value.
 * @returns {boolean}
 * @constructor
 */
declare let LT: (one: any, two: any) => boolean;
/**
 * Returns true if the first argument is less than or equal to the second, and true otherwise. Equivalent to the
 * `<=` operator.
 * @param one - The value to test as being less than or equal to `two`.
 * @param two - The second value.
 * @constructor
 */
declare let LTE: (one: any, two: any) => boolean;
/**
 * Returns "TRUE" if two specified values are not equal and "FALSE" otherwise. Equivalent to the "<>" operator.
 * @param one - The value to test as being not equal to `two`.
 * @param two - The second valud.
 * @returns {boolean}
 * @constructor
 */
declare let NE: (one: any, two: any) => boolean;
/**
 * Returns one number divided by another. Equivalent to the `/` operator.
 * @param dividend - The number to be divided.
 * @param divisor - The number to divide by, cannot be 0.
 * @returns {number} result of dividend / divisor.
 * @constructor
 */
declare let DIVIDE: (dividend: any, divisor: any) => number;
/**
 * Returns a random number between 0 inclusive and 1 exclusive.
 * @returns {number}
 * @constructor
 */
declare let RAND: () => number;
/**
 * Returns a uniformly random integer between two values, inclusive on high and low. Values with decimal parts may be
 * used for low and/or high; this will cause the least and greatest possible values to be the next integer greater than
 * low and/or the next integer less than high, respectively.
 * @param low - lowest value
 * @param high - highest value
 * @returns {number} between low and high.
 * @constructor
 */
declare let RANDBETWEEN: (low: any, high: any) => number;
/**
 * Given an input number, returns `-1` if it is negative, `1` if positive, and `0` if it is zero.
 * @param value - The value to check the sign for
 * @returns {number} `-1` if it is negative, `1` if positive, and `0` if it is zero.
 * @constructor
 */
declare let SIGN: (value: any) => 0 | 1 | -1;
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
declare let TRUNC: (value: any, places?: any) => number;
/**
 * Converts an angle value in degrees to radians.
 * @param angle - The angle to convert from degrees to radians.
 * @returns {number} radians
 * @constructor
 */
declare let RADIANS: (angle: any) => number;
/**
 * Converts an angle value in radians to degrees.
 * @param angle - The angle to convert from radians to degrees.
 * @returns {number} degrees
 * @constructor
 */
declare let DEGREES: (angle: any) => number;
/**
 * Returns the complementary Gauss error function of a value.
 * @param value - The number for which to calculate the complementary Gauss error function.
 * @returns {number} complementary Gauss error function of a value
 * @constructor
 */
declare let ERFC: (value: any) => number;
/**
 * Returns the error function integrated between lower_limit and upper_limit.
 * @param lowerLimit - The lower bound for integrating ERF.
 * @param upperLimit - [Optional]. The upper bound for integrating ERF. If omitted, ERF integrates between
 * zero and lower_limit.
 * @returns {number} error function integrated between lower_limit and upper_limit
 * @constructor
 */
declare let ERF: (lowerLimit: any, upperLimit?: any) => number;
/**
 * Calculates the sum of the sums of the squares of values in two arrays.
 * @param arrayX - The array or range of values whose squares will be added to the squares of corresponding
 * entries in arrayY and added together.
 * @param arrayY - The array or range of values whose squares will be added to the squares of corresponding
 * entries in arrayX and added together.
 * @returns {number} sum of the sums of the squares
 * @constructor
 */
declare let SUMX2PY2: (arrayX: any, arrayY: any) => number;
/**
 * Calculates the sum of the differences of the squares of values in two arrays.
 * @param arrayX - The array or range of values whose squares will be reduced by the squares of corresponding
 * entries in array_y and added together.
 * @param arrayY - The array or range of values whose squares will be subtracted from the squares of
 * corresponding entries in array_x and added together.
 * @returns {number} sum of the differences of the squares
 * @constructor
 */
declare let SUMX2MY2: (arrayX: any, arrayY: any) => number;
/**
 * Counts the number of unique values in a list of specified values and ranges.
 * @param values The values or ranges to consider for uniqueness. Supports an arbitrary number of arguments for this
 * function.
 * @returns {number} of unique values passed in.
 * @constructor
 */
declare let COUNTUNIQUE: (...values: any[]) => number;
/**
 * Calculates the sum of the products of corresponding entries in two equal-sized arrays or ranges.
 * @param values Arrays or ranges whose entries will be multiplied with corresponding entries in the second such array
 * or range.
 * @returns {number} sum of the products
 * @constructor
 */
declare let SUMPRODUCT: (...values: any[]) => number;
/**
 * Returns the number of ways to choose some number of objects from a pool of a given size of objects.
 * @param m - The size of the pool of objects to choose from.
 * @param k - The number of objects to choose.
 * @returns {number} number of ways
 * @constructor
 */
declare let COMBIN: (m: any, k: any) => number;
/**
 * Multiply a series of numbers together.
 * @param values - values or range of values to multiply by each other.
 * @constructor
 */
declare let PRODUCT: (...values: any[]) => number;
/**
 * Divide one number by another
 * @param dividend - number to be divided by the divisor.
 * @param divisor - number to divide the dividend.
 * @returns {number}
 * @constructor
 */
declare let QUOTIENT: (dividend: any, divisor: any) => number;
/**
 * Returns a value, but does nothing to it. If given a range, will return first value.
 * @param value to return
 * @returns any value
 * @constructor
 */
declare let UPLUS: (value: any) => any;
/**
 * Returns the same number, but with the sign reversed.
 * @param value to reverse the sign on
 * @returns {number}
 * @constructor
 */
declare let UMINUS: (value: any) => number;
/**
 * Rounds a number to the nearest integer multiple of another.
 * @param value - value to round.
 * @param factor - multiple.
 * @returns {number}
 * @constructor
 */
declare let MROUND: (value: any, factor: any) => number;
/**
 * Calculates the double-factorial of a number.
 * @param value - value or reference to calculate.
 * @returns {number}
 * @constructor
 */
declare let FACTDOUBLE: (value: any) => any;
/**
 * Returns a value as a percentage where 100 is 1.0, and 0 is 0.
 * @param value - To convert.
 * @returns {number}
 * @constructor
 */
declare let UNARY_PERCENT: (value: any) => number;
/**
 * Returns the factorial of the sum of the arguments divided by the product of the factorials of the arguments.
 * @param values - Range of numbers.
 * @returns {number}
 * @constructor
 */
declare let MULTINOMIAL: (...values: any[]) => number;
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
declare let SERIESSUM: (x: any, n: any, m: any, coefficients: any) => number;
/**
 * Calculates subtotals. If a range already contains subtotals, these are not used for further calculations.
 * @param functionCode - A value that stands for another function: 1=AVERAGE, 2=COUNT, 3=COUNTA, 4=MAX, 5=MIN,
 * 6=PRODUCT, 7=STDEV, 8=STDEVP, 9=SUM, 10=VAR, 11=VARP.
 * @param values - The ranges whose cells are included.
 * @returns {Array}
 * @constructor
 */
declare let SUBTOTAL: (functionCode: any, ...values: any[][]) => any;
export { ABS, ACOS, ACOSH, ACOTH, ASIN, ASINH, ATAN, ATAN2, ATANH, COT, COTH, COSH, COS, COUNTUNIQUE, EVEN, ERF, ERFC, INT, ISEVEN, ISODD, MOD, ODD, SIN, SINH, SUM, SQRT, SQRTPI, PI, POWER, LOG, LOG10, LN, MULTIPLY, MINUS, TAN, TANH, ROUND, ROUNDDOWN, ROUNDUP, SUMPRODUCT, SUMIF, SUMSQ, SUMX2MY2, SUMX2PY2, FLOOR, IF, COUNTIF, COUNTIFS, CEILING, TRUNC, RADIANS, DEGREES, COMBIN, RAND, RANDBETWEEN, SIGN, DIVIDE, EQ, GT, GTE, LT, LTE, NE, GCD, LCM, GAMMALN, PRODUCT, QUOTIENT, UPLUS, UMINUS, MROUND, FACTDOUBLE, UNARY_PERCENT, MULTINOMIAL, SERIESSUM, SUBTOTAL };
