"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var CriteriaFunctionFactory_1 = require("../Utilities/CriteriaFunctionFactory");
var Filter_1 = require("../Utilities/Filter");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Errors_1 = require("../Errors");
var Math_1 = require("./Math");
var MathHelpers_1 = require("../Utilities/MathHelpers");
var MoreUtils_1 = require("../Utilities/MoreUtils");
/**
 * Calculates the sum of squares of deviations based on a sample.
 * @param values - The values or ranges of the sample.
 * @returns {number} sum of squares of deviations
 * @constructor
 */
var DEVSQ = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "DEVSQ");
    var range = Filter_1.Filter.flattenAndThrow(values);
    var result = 0;
    var count = 0;
    for (var i = 0; i < range.length; i++) {
        result = result + TypeConverter_1.TypeConverter.valueToNumber(range[i]);
        count++;
    }
    var mean = result / count;
    result = 0;
    for (var i = 0; i < range.length; i++) {
        result += Math.pow((TypeConverter_1.TypeConverter.valueToNumber(range[i]) - mean), 2);
    }
    return result;
};
exports.DEVSQ = DEVSQ;
/**
 * Returns the median value in a numeric dataset.
 * @param values - The value(s) or range(s) to consider when calculating the median value.
 * @returns {number} the median value of the dataset
 * @constructor
 */
var MEDIAN = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "MEDIAN");
    var sortedArray = [];
    values.forEach(function (currentValue) {
        if (currentValue instanceof Array) {
            if (currentValue.length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            var filtered = Filter_1.Filter.filterOutStringValues(currentValue);
            sortedArray = sortedArray.concat(filtered);
        }
        else {
            sortedArray.push(TypeConverter_1.TypeConverter.valueToNumber(currentValue));
        }
    });
    sortedArray = sortedArray.sort(function (a, b) {
        var aN = TypeConverter_1.TypeConverter.valueToNumber(a);
        var bN = TypeConverter_1.TypeConverter.valueToNumber(b);
        return aN - bN;
    });
    if (sortedArray.length === 1) {
        return TypeConverter_1.TypeConverter.valueToNumber(sortedArray[0]);
    }
    if (sortedArray.length === 0) {
        throw new Errors_1.NumError("MEDIAN has no valid input data.");
    }
    // even number of values
    if (sortedArray.length % 2 === 0) {
        if (sortedArray.length === 2) {
            return AVERAGE(sortedArray[0], sortedArray[1]);
        }
        var top_1 = sortedArray[sortedArray.length / 2];
        var bottom = sortedArray[(sortedArray.length / 2) - 1];
        return AVERAGE(top_1, bottom);
    }
    else {
        // odd number of values
        return sortedArray[Math.round(sortedArray.length / 2) - 1];
    }
};
exports.MEDIAN = MEDIAN;
/**
 * Returns the numerical average value in a dataset, ignoring text.
 * @param values - The values or ranges to consider when calculating the average value.
 * @returns {number} the average value of this dataset.
 * @constructor
 */
var AVERAGE = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "AVERAGE");
    var result = 0;
    var count = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            var filtered = Filter_1.Filter.filterOutStringValues(values[i]);
            result = result + Math_1.SUM.apply(this, filtered);
            count += filtered.length;
        }
        else {
            result = result + TypeConverter_1.TypeConverter.valueToNumber(values[i]);
            count++;
        }
    }
    return result / count;
};
exports.AVERAGE = AVERAGE;
/**
 * Calculates the average of the magnitudes of deviations of data from a dataset's mean.
 * @param values - The value(s) or range(s)
 * @returns {number} average of the magnitudes of deviations of data from a dataset's mean
 * @constructor
 */
var AVEDEV = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "AVEDEV");
    // Sort to array-values, and non-array-values
    var arrayValues = [];
    var nonArrayValues = [];
    for (var i = 0; i < values.length; i++) {
        var X = values[i];
        if (X instanceof Array) {
            if (X.length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            arrayValues.push(X);
        }
        else {
            nonArrayValues.push(TypeConverter_1.TypeConverter.valueToNumber(X));
        }
    }
    // Remove string values from array-values, but not from non-array-values, and concat.
    var flatValues = Filter_1.Filter.filterOutStringValues(Filter_1.Filter.flatten(arrayValues)).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    }).concat(nonArrayValues);
    // Calculating mean
    var result = 0;
    var count = 0;
    for (var i = 0; i < flatValues.length; i++) {
        result = result + TypeConverter_1.TypeConverter.valueToNumber(flatValues[i]);
        count++;
    }
    if (count === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function AVEDEV caused a devide by zero error.");
    }
    var mean = result / count;
    for (var i = 0; i < flatValues.length; i++) {
        flatValues[i] = Math_1.ABS(TypeConverter_1.TypeConverter.valueToNumber(flatValues[i]) - mean);
    }
    return Math_1.SUM(flatValues) / flatValues.length;
};
exports.AVEDEV = AVEDEV;
/**
 * Returns the numerical average value in a dataset, coercing text values in ranges to 0 values.
 * @param values - value(s) or range(s) to consider when calculating the average value.
 * @returns {number} the numerical average value in a dataset
 * @constructor
 */
var AVERAGEA = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "AVERAGEA");
    var result = 0;
    var count = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            var filtered = Filter_1.Filter.stringValuesToZeros(values[i]);
            result = result + Math_1.SUM.apply(this, filtered);
            count += filtered.length;
        }
        else {
            result = result + TypeConverter_1.TypeConverter.valueToNumber(values[i]);
            count++;
        }
    }
    if (count === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function AVEDEV caused a devide by zero error.");
    }
    return result / count;
};
exports.AVERAGEA = AVERAGEA;
/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. CORREL is synonymous with PEARSON.
 * @param dataY - The range representing the array or matrix of dependent data.
 * @param dataX - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var CORREL = function (dataY, dataX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "CORREL");
    if (!Array.isArray(dataY)) {
        dataY = [dataY];
    }
    if (!Array.isArray(dataX)) {
        dataX = [dataX];
    }
    if (dataY.length !== dataX.length) {
        throw new Errors_1.NAError("CORREL has mismatched argument count " + dataY + " vs " + dataX + ".");
    }
    var arr1 = Filter_1.Filter.filterOutNonNumberValues(Filter_1.Filter.flattenAndThrow(dataY));
    var arr2 = Filter_1.Filter.filterOutNonNumberValues(Filter_1.Filter.flattenAndThrow(dataX));
    var stdevArr1 = MathHelpers_1.stdev(arr1, 1);
    var stdevArr2 = MathHelpers_1.stdev(arr2, 1);
    if (stdevArr1 === 0 || stdevArr2 === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function CORREL caused a divide by zero error.");
    }
    return MathHelpers_1.covariance(arr1, arr2) / stdevArr1 / stdevArr2;
};
exports.CORREL = CORREL;
/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. PEARSON is synonymous with CORREL.
 * @param dataY - The range representing the array or matrix of dependent data.
 * @param dataX - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var PEARSON = function (dataY, dataX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "PEARSON");
    return CORREL.apply(this, [dataY, dataX]);
};
exports.PEARSON = PEARSON;
/**
 * Returns the value of the exponential distribution function with a specified lambda at a specified value.
 * @param x - The input to the exponential distribution function. If cumulative is TRUE then EXPONDIST returns
 * the cumulative probability of all values up to x.
 * @param lambda - The lambda to specify the exponential distribution function.
 * @param cumulative - Whether to use the exponential cumulative distribution.
 * @returns {number} value of the exponential distribution function.
 * @constructor
 */
var EXPONDIST = function (x, lambda, cumulative) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "EXPONDIST");
    function cdf(x, rate) {
        return x < 0 ? 0 : 1 - Math.exp(-rate * x);
    }
    function pdf(x, rate) {
        return x < 0 ? 0 : rate * Math.exp(-rate * x);
    }
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    lambda = TypeConverter_1.TypeConverter.firstValueAsNumber(lambda);
    cumulative = TypeConverter_1.TypeConverter.firstValueAsBoolean(cumulative);
    return (cumulative) ? cdf(x, lambda) : pdf(x, lambda);
};
exports.EXPONDIST = EXPONDIST;
/**
 * Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input x.
 * Alternately called Fisher-Snedecor distribution or Snecdor's F distribution.
 * @param x - The input to the F probability distribution function. The value at which to evaluate the function.
 * Must be a positive number.
 * @param degreesFreedom1 - The numerator degrees of freedom.
 * @param degreesFreedom2 - The denominator degrees of freedom.
 * @param cumulative - Logical value that determines the form of the function. If true returns the cumulative
 * distribution function. If false returns the probability density function.
 * @returns {number|boolean} left-tailed F probability distribution
 * @constructor
 * TODO: This function should be stricter in its return type.
 */
var FDIST$LEFTTAILED = function (x, degreesFreedom1, degreesFreedom2, cumulative) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 4, "FDIST$LEFTTAILED");
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    if (x < 0) {
        throw new Errors_1.NumError("Function F.DIST parameter 1 value is " + x + ". It should be greater than or equal to 0.");
    }
    var d1 = TypeConverter_1.TypeConverter.firstValueAsNumber(degreesFreedom1);
    var d2 = TypeConverter_1.TypeConverter.firstValueAsNumber(degreesFreedom2);
    var cum = TypeConverter_1.TypeConverter.firstValueAsBoolean(cumulative);
    return (cum) ? MathHelpers_1.cdf(x, d1, d2) : MathHelpers_1.pdf(x, d1, d2);
};
exports.FDIST$LEFTTAILED = FDIST$LEFTTAILED;
/**
 * Returns the inverse of the (right-tailed) F probability distribution. If p = FDIST(x,...), then FINV(p,...) = x. The
 * F distribution can be used in an F-test that compares the degree of variability in two data sets.
 * @param probability - A probability associated with the F cumulative distribution.
 * @param degFreedom1 - Required. The numerator degrees of freedom.
 * @param degFreedom2 - Required. The denominator degrees of freedom.
 * @returns {number} inverse of the (right-tailed) F probability distribution
 * @constructor
 */
var FINV = function (probability, degFreedom1, degFreedom2) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "FINV");
    probability = TypeConverter_1.TypeConverter.firstValueAsNumber(probability);
    if (probability <= 0.0 || probability > 1.0) {
        throw new Errors_1.NumError("Function FINV parameter 1 value is " + probability
            + ". It should be greater than or equal to 0, and less than 1.");
    }
    var d1 = TypeConverter_1.TypeConverter.firstValueAsNumber(degFreedom1);
    var d2 = TypeConverter_1.TypeConverter.firstValueAsNumber(degFreedom2);
    return MathHelpers_1.inv(1.0 - probability, d1, d2);
};
exports.FINV = FINV;
/**
 * Returns the Fisher transformation of a specified value.
 * @param value - The value for which to calculate the Fisher transformation.
 * @returns {number} Fisher transformation
 * @constructor
 */
var FISHER = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "FISHER");
    var x = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    if (x <= -1 || x >= 1) {
        throw new Errors_1.NumError("Function FISHER parameter 1 value is " + x + ". Valid values are between -1 and 1 exclusive.");
    }
    return Math.log((1 + x) / (1 - x)) / 2;
};
exports.FISHER = FISHER;
/**
 * Returns the inverse Fisher transformation of a specified value.
 * @param value - The value for which to calculate the inverse Fisher transformation.
 * @returns {number} inverse Fisher transformation
 * @constructor
 */
var FISHERINV = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "FISHERINV");
    var y = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var e2y = Math.exp(2 * y);
    return (e2y - 1) / (e2y + 1);
};
exports.FISHERINV = FISHERINV;
/**
 * Returns the maximum value in a numeric dataset.
 * @param values - The values or range(s) to consider when calculating the maximum value.
 * @returns {number} the maximum value of the dataset
 * @constructor
 */
var MAX = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "MAX");
    var maxSoFar = -Infinity;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            var filtered = Filter_1.Filter.filterOutStringValues(values[i]);
            if (filtered.length !== 0) {
                maxSoFar = Math.max(MAX.apply(this, filtered), maxSoFar);
            }
        }
        else {
            maxSoFar = Math.max(TypeConverter_1.TypeConverter.valueToNumber(values[i]), maxSoFar);
        }
    }
    return maxSoFar;
};
exports.MAX = MAX;
/**
 * Returns the maximum numeric value in a dataset.
 * @param values - The value(s) or range(s) to consider when calculating the maximum value.
 * @returns {number} maximum value of the dataset
 * @constructor
 */
var MAXA = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "MAXA");
    var maxSoFar = -Infinity;
    var filteredValues = Filter_1.Filter.stringValuesToZeros(values);
    for (var i = 0; i < filteredValues.length; i++) {
        if (filteredValues[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            var filtered = Filter_1.Filter.stringValuesToZeros(filteredValues[i]);
            if (filtered.length !== 0) {
                maxSoFar = Math.max(MAXA.apply(this, filtered), maxSoFar);
            }
        }
        else {
            maxSoFar = Math.max(TypeConverter_1.TypeConverter.valueToNumber(filteredValues[i]), maxSoFar);
        }
    }
    return maxSoFar;
};
exports.MAXA = MAXA;
/**
 * Returns the minimum value in a numeric dataset.
 * @param values - The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value of the dataset
 * @constructor
 */
var MIN = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "MIN");
    var minSoFar = Infinity;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            var filtered = Filter_1.Filter.filterOutStringValues(values[i]);
            if (filtered.length !== 0) {
                minSoFar = Math.min(MIN.apply(this, filtered), minSoFar);
            }
        }
        else {
            minSoFar = Math.min(TypeConverter_1.TypeConverter.valueToNumber(values[i]), minSoFar);
        }
    }
    return minSoFar;
};
exports.MIN = MIN;
/**
 * Returns the minimum numeric value in a dataset.
 * @param values - The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value in the dataset
 * @constructor
 */
var MINA = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "MINA");
    return MIN.apply(this, values);
};
exports.MINA = MINA;
/**
 * Returns the average of a range depending on criteria.
 * @param criteriaRange - The range to check against criterion.
 * @param criterion - The pattern or test to apply to criteria_range.
 * @param averageRange - [optional] The range to average. If not included, criteria_range is used for the
 * average instead.
 * @returns {number}
 * @constructor
 * TODO: This needs to also accept a third parameter "average_range"
 */
var AVERAGEIF = function (criteriaRange, criterion, averageRange) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "AVERAGEIF");
    var range = Filter_1.Filter.flatten(criteriaRange);
    var criteriaEvaluation = CriteriaFunctionFactory_1.CriteriaFunctionFactory.createCriteriaFunction(criterion);
    var result = 0;
    var count = 0;
    for (var i = 0; i < range.length; i++) {
        var val = TypeConverter_1.TypeConverter.valueToNumber(range[i]);
        if (criteriaEvaluation(val)) {
            result = result + val;
            count++;
        }
    }
    if (count === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function AVERAGEIF caused a divide by zero error.");
    }
    return result / count;
};
exports.AVERAGEIF = AVERAGEIF;
/**
 * Returns the a count of the number of numeric values in a dataset.
 * @param values - The values or ranges to consider when counting.
 * @returns {number} number of numeric values in a dataset.
 * @constructor
 */
var COUNT = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "COUNT");
    var count = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length > 0) {
                count += COUNT.apply(this, values[i]);
            }
        }
        else if (TypeConverter_1.TypeConverter.canCoerceToNumber(values[i])) {
            count++;
        }
    }
    return count;
};
exports.COUNT = COUNT;
/**
 * Returns the a count of the number of values in a dataset.
 * @param values - The values or ranges to consider when counting.
 * @returns {number} number of values in a dataset.
 * @constructor
 */
var COUNTA = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "COUNTA");
    var count = 0;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length > 0) {
                count += COUNTA.apply(this, values[i]);
            }
            else {
                count++;
            }
        }
        else {
            count++;
        }
    }
    return count;
};
exports.COUNTA = COUNTA;
/**
 * Returns the value at a given percentile of a set of data.
 * @param data -  The array or range containing the dataset to consider.
 * @param percent - percentile to be calculated and returned.
 * @returns {number}
 * @constructor
 */
var PERCENTILE = function (data, percent) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "PERCENTILE");
    var p = TypeConverter_1.TypeConverter.firstValueAsNumber(percent);
    if (p < 0 || p > 1) {
        throw new Errors_1.NumError("Function PERCENTILE parameter 2 value " + p + " is out of range.");
    }
    var range = Filter_1.Filter.flattenAndThrow(data).sort(function (a, b) {
        return a - b;
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    var n = range.length;
    var l = p * (n - 1);
    var fl = Math.floor(l);
    return MathHelpers_1.cleanFloat((l === fl) ? range[l] : range[fl] + (l - fl) * (range[fl + 1] - range[fl]));
};
exports.PERCENTILE = PERCENTILE;
/**
 * Returns a value nearest to a specified quartile of a set of data.
 * @param data -  The array or range containing the set of data to consider.
 * @param quartile - Which quartile value to return. 0 returns 0 percent mark, 1 returns 25 percent mark, 2 returns 50
 * percent mark, 3 returns 75 percent mark, 4 returns 100 percent mark.
 * @constructor
 */
var QUARTILE = function (data, quartile) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "QUARTILE");
    var q = TypeConverter_1.TypeConverter.firstValueAsNumber(quartile);
    if (q < 0 || q > 4) {
        throw new Errors_1.NumError("Function QUARTILE parameter 2 value " + q + " is out of range.");
    }
    var range = Filter_1.Filter.flattenAndThrow(data).sort(function (a, b) {
        return a - b;
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    switch (q) {
        case 0:
            return PERCENTILE(range, 0);
        case 1:
            return PERCENTILE(range, 0.25);
        case 2:
            return PERCENTILE(range, 0.5);
        case 3:
            return PERCENTILE(range, 0.75);
        case 4:
            return PERCENTILE(range, 1);
    }
};
exports.QUARTILE = QUARTILE;
/**
 * Calculates the standard deviation of a range, ignoring string values, regardless of whether they can be converted to
 * numbers.
 * @param values - Range of sample.
 * @returns {number}
 * @constructor
 */
var STDEV = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "STDEV");
    var range = Filter_1.Filter.flattenAndThrow(values);
    var n = range.length;
    var sigma = 0;
    var count = 0;
    var mean = AVERAGE(range);
    for (var i = 0; i < n; i++) {
        var value = TypeConverter_1.TypeConverter.firstValue(range[i]);
        if (typeof value !== "string") {
            sigma += Math.pow(TypeConverter_1.TypeConverter.valueToNumber(value) - mean, 2);
            count++;
        }
    }
    return Math.sqrt(sigma / (count - 1));
};
exports.STDEV = STDEV;
/**
 * Calculates the standard deviation of a range, converting string values to numbers, if possible. If a value cannot
 * be converted to a number, formula will throw a value error.
 * @param values - Range of sample.
 * @returns {number}
 * @constructor
 */
var STDEVA = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "STDEVA");
    var range = Filter_1.Filter.flattenAndThrow(values).map(function (value) {
        return TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    });
    var n = range.length;
    var sigma = 0;
    var m = MathHelpers_1.mean(range);
    for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - m, 2);
    }
    return Math.sqrt(sigma / (n - 1));
};
exports.STDEVA = STDEVA;
/**
 * Calculates the standard deviation of an entire population, ignoring string values, regardless of whether they can be
 * converted to numbers.
 * @param values - Entire sample.
 * @returns {number}
 * @constructor
 */
var STDEVP = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "STDEVP");
    var range = Filter_1.Filter.flattenAndThrow(values);
    var n = range.length;
    var sigma = 0;
    var count = 0;
    var m = AVERAGE(range);
    for (var i = 0; i < n; i++) {
        var value = TypeConverter_1.TypeConverter.firstValue(range[i]);
        if (typeof value !== "string") {
            sigma += Math.pow(value - m, 2);
            count++;
        }
    }
    return Math.sqrt(sigma / count);
};
exports.STDEVP = STDEVP;
/**
 * Calculates the standard deviation of an entire population, including text and boolean values, if possible. If a value
 * cannot be converted to a number, formula will throw a value error.
 * @param values - Entire sample.
 * @returns {number}
 * @constructor
 */
var STDEVPA = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "STDEVPA");
    var range = Filter_1.Filter.flattenAndThrow(values).map(function (value) {
        return TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    });
    var n = range.length;
    var sigma = 0;
    var count = 0;
    var m = AVERAGE(range);
    for (var i = 0; i < n; i++) {
        var value = TypeConverter_1.TypeConverter.firstValue(range[i]);
        if (typeof value !== "string") {
            sigma += Math.pow(value - m, 2);
            count++;
        }
    }
    return Math.sqrt(sigma / count);
};
exports.STDEVPA = STDEVPA;
/**
 * Returns the mean value of a range excluding some percentage of the range on the high and low ends of the range.
 * @param range - Array or range to consider.
 * @param percent - The portion of the data to exclude on both ends of the range.
 * @returns {number}
 * @constructor
 */
var TRIMMEAN = function (range, percent) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "TRIMMEAN");
    var p = TypeConverter_1.TypeConverter.firstValueAsNumber(percent);
    if (p < 0) {
        throw new Errors_1.NumError("Function TRIMMEAN parameter 2 value is " + p + ". It should be greater than or equal to 0.");
    }
    if (p >= 1) {
        throw new Errors_1.NumError("Function TRIMMEAN parameter 2 value is " + p + ". It should be less than 1.");
    }
    var data = Filter_1.Filter.flattenAndThrow(range).sort(function (a, b) {
        return a - b;
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    if (data.length === 0) {
        throw new Errors_1.RefError("TRIMMEAN has no valid input data.");
    }
    var trim = Math_1.FLOOR(data.length * p, 2) / 2;
    var tmp = data.slice(trim, data.length);
    return MathHelpers_1.mean(tmp.slice(0, tmp.length - trim));
};
exports.TRIMMEAN = TRIMMEAN;
/**
 * Returns the slope of the line calculated from linear regression of a range. Any text values passed in will be ignored
 * @param rangeY - The range or array representing the dependent data.
 * @param rangeX - The range or array representing the independent data.
 * @constructor
 */
var SLOPE = function (rangeY, rangeX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "SLOPE");
    var dataX = Filter_1.Filter.flattenAndThrow(rangeX).filter(function (value) {
        return typeof value !== "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    var dataY = Filter_1.Filter.flattenAndThrow(rangeY).filter(function (value) {
        return typeof value !== "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    if (dataX.length !== dataY.length) {
        throw new Errors_1.NAError("SLOPE has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
    }
    var xmean = MathHelpers_1.mean(dataX);
    var ymean = MathHelpers_1.mean(dataY);
    var n = dataX.length;
    var num = 0;
    var den = 0;
    for (var i = 0; i < n; i++) {
        num += (dataX[i] - xmean) * (dataY[i] - ymean);
        den += Math.pow(dataX[i] - xmean, 2);
    }
    if (den === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function SLOPE caused a divide by zero error.");
    }
    return num / den;
};
exports.SLOPE = SLOPE;
/**
 * Returns the normalized equivalent of a random variable given mean and standard deviation of the distribution.
 * @param value - Value to be standardized.
 * @param meanValue - Arithmetic mean of the distribution
 * @param std - The standard deviation of the distribution or range.
 * @returns {number}
 * @constructor
 */
var STANDARDIZE = function (value, meanValue, std) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "STANDARDIZE");
    value = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    meanValue = TypeConverter_1.TypeConverter.firstValueAsNumber(meanValue);
    std = TypeConverter_1.TypeConverter.firstValueAsNumber(std);
    if (std <= 0) {
        throw new Errors_1.NumError("Function STANDARDIZE parameter 3 value is " + std + ". It should be greater than 0.");
    }
    return (value - meanValue) / std;
};
exports.STANDARDIZE = STANDARDIZE;
/**
 * Returns the Nth smallest value in the range, ignoring text values.
 * @param range -  Range or data-set to consider.
 * @param n - N in 'Nth'.
 * @constructor
 */
var SMALL = function (range, n) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "SMALL");
    var data = Filter_1.Filter.flattenAndThrow(range).filter(function (value) {
        return typeof value != "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    }).sort(function (a, b) {
        return a - b;
    });
    if (n > data.length || n < 1) {
        throw new Errors_1.NumError("Function SMALL parameter 2 value " + n + " is out of range.");
    }
    return data[n - 1];
};
exports.SMALL = SMALL;
/**
 * Returns the Nth largest value in the range, ignoring text values.
 * @param range -  Range or data-set to consider.
 * @param n - N in 'Nth'.
 * @constructor
 */
var LARGE = function (range, n) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "LARGE");
    var data = Filter_1.Filter.flattenAndThrow(range).filter(function (value) {
        return typeof value != "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    }).sort(function (a, b) {
        return b - a;
    });
    if (n > data.length || n < 1) {
        throw new Errors_1.NumError("Function LARGE parameter 2 value " + n + " is out of range.");
    }
    return data[n - 1];
};
exports.LARGE = LARGE;
/**
 * Returns the kurtosis of a data set or range. Ignores text values.
 * @param values - data set or range to calculate. Must be at least 4 values.
 * @returns {number}
 * @constructor
 */
var KURT = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 4, "KURT");
    var range = Filter_1.Filter.flattenAndThrow(values).filter(function (value) {
        return typeof value !== "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    if (range.length < 4) {
        throw new Errors_1.DivZeroError("KURT requires more values in range. Expected: 4, found: " + range.length + ".");
    }
    var m = MathHelpers_1.mean(range);
    var n = range.length;
    var sigma = 0;
    for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - m, 4);
    }
    sigma = sigma / Math.pow(MathHelpers_1.stdev(range, true), 4);
    return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
};
exports.KURT = KURT;
/**
 * Calculates the y-value at which a line will intersect the y-axis by using known x-values and y-values. Any text
 * values will be ignored.
 * @param rangeY - Dependent range of values.
 * @param rangeX - Independent range of values.
 * @returns {number}
 * @constructor
 */
var INTERCEPT = function (rangeY, rangeX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "INTERCEPT");
    var dataX = Filter_1.Filter.flattenAndThrow(rangeX).filter(function (value) {
        return typeof value !== "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    var dataY = Filter_1.Filter.flattenAndThrow(rangeY).filter(function (value) {
        return typeof value !== "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    if (dataX.length !== dataY.length) {
        throw new Errors_1.NAError("INTERCEPT has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
    }
    var xMean = MathHelpers_1.mean(dataX);
    var yMean = MathHelpers_1.mean(dataY);
    var n = dataX.length;
    var num = 0;
    var den = 0;
    for (var i = 0; i < n; i++) {
        num += (dataX[i] - xMean) * (dataY[i] - yMean);
        den += Math.pow(dataX[i] - xMean, 2);
    }
    if (den === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function INTERCEPT caused a divide by zero error.");
    }
    var b = num / den;
    return yMean - b * xMean;
};
exports.INTERCEPT = INTERCEPT;
/**
 * Calculates the a future value using existing x-values and y-values. Any text values will be ignored.
 * @param x - The data point for which you would like to predict the value.
 * @param rangeY - Dependent range of values.
 * @param rangeX - Independent range of values.
 * @returns {number}
 * @constructor
 * TODO: This formula will fail to parse since the first argument is followed by an argument that is an array.
 * TODO (continued) This is a known issue.
 */
var FORECAST = function (x, rangeY, rangeX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "FORECAST");
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    var dataX = Filter_1.Filter.flattenAndThrow(rangeX).filter(function (value) {
        return typeof value !== "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    var dataY = Filter_1.Filter.flattenAndThrow(rangeY).filter(function (value) {
        return typeof value !== "string";
    }).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    if (dataX.length !== dataY.length) {
        throw new Errors_1.NAError("FORECAST has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
    }
    var xMean = MathHelpers_1.mean(dataX);
    var yMean = MathHelpers_1.mean(dataY);
    var n = dataX.length;
    var num = 0;
    var den = 0;
    for (var i = 0; i < n; i++) {
        num += (dataX[i] - xMean) * (dataY[i] - yMean);
        den += Math.pow(dataX[i] - xMean, 2);
    }
    if (den === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function FORECAST caused a divide by zero error.");
    }
    var b = num / den;
    var a = yMean - b * xMean;
    return a + b * x;
};
exports.FORECAST = FORECAST;
/**
 * Returns the Poisson distribution for the given number. Functions the same as POISSON.DIST.
 * @param x - Number to use.
 * @param meanValue - The middle value for the Poisson distribution.
 * @param cumulative - [OPTIONAL] - 0 calculates the density function, 1 calculates the distribution. Defaults to 0.
 * @returns {number}
 * @constructor
 */
var POISSON = function (x, meanValue, cumulative) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "POISSON");
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    meanValue = TypeConverter_1.TypeConverter.firstValueAsNumber(meanValue);
    cumulative = (cumulative === undefined) ? 0 : TypeConverter_1.TypeConverter.firstValueAsNumber(cumulative);
    if (x < 0) {
        throw new Errors_1.NumError("Function POISSON parameter 1 value is " + x + ". It should be greater than or equal to 0.");
    }
    if (meanValue < 0) {
        throw new Errors_1.NumError("Function POISSON parameter 2 value is " + x + ". It should be greater than or equal to 0.");
    }
    function factorial(n) {
        return n < 0 ? NaN : MathHelpers_1.gammafn(n + 1);
    }
    function poissonPDF(k, l) {
        return Math.pow(l, k) * Math.exp(-l) / factorial(k);
    }
    function poissonCDF(x, l) {
        var sumarr = [], k = 0;
        if (x < 0)
            return 0;
        for (; k <= x; k++) {
            sumarr.push(poissonPDF(k, l));
        }
        return MathHelpers_1.sum(sumarr);
    }
    ;
    return (cumulative) ? poissonCDF(x, meanValue) : poissonPDF(x, meanValue);
};
exports.POISSON = POISSON;
/**
 * Returns the percentage rank (percentile) of the given value in a sample. Functions the same as PERCENTRANK.INC.
 * @param data - The array or range of data in the sample.
 * @param x - The value.
 * @param significance - [OPTIONAL] - The number of significant digits to use in the calculation. Defaults to 3.
 * @returns {number}
 * @constructor
 */
var PERCENTRANK = function (data, x, significance) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "PERCENTRANK");
    data = Filter_1.Filter.flattenAndThrow(data).map(TypeConverter_1.TypeConverter.valueToNumber).sort(function (a, b) {
        return a - b;
    });
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    var uniques = Filter_1.Filter.unique(data);
    var n = data.length;
    var m = uniques.length;
    if (x < uniques[0] || x > uniques[m - 1]) {
        throw new Errors_1.NAError("PERCENTRANK does not have valid input data.");
    }
    if (m === 1 && uniques[0] === x) {
        return 1;
    }
    significance = (typeof significance === 'undefined') ? 3 : TypeConverter_1.TypeConverter.firstValueAsNumber(significance);
    var power = Math.pow(10, significance);
    var result = 0;
    var match = false;
    var i = 0;
    while (!match && i < m) {
        if (x === uniques[i]) {
            result = data.indexOf(uniques[i]) / (n - 1);
            match = true;
        }
        else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
            result = (data.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
            match = true;
        }
        i++;
    }
    var v = Math.floor(result * power) / power;
    if (isNaN(v)) {
        throw new Errors_1.NAError("PERCENTRANK does not have valid input data.");
    }
    return v;
};
exports.PERCENTRANK = PERCENTRANK;
/**
 * Returns the percentage rank (percentile) from 0 to 1 exclusive for a value in a sample.
 * @param data - The array or range of data in the sample.
 * @param x - The value
 * @param significance - [OPTIONAL] - The number of significant digits to use in the calculation. Defaults to 3.
 * @returns {number}
 * @constructor
 */
var PERCENTRANK$EXC = function (data, x, significance) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "PERCENTRANK.EXC");
    data = Filter_1.Filter.flattenAndThrow(data).map(TypeConverter_1.TypeConverter.valueToNumber).sort(function (a, b) {
        return a - b;
    });
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    var uniques = Filter_1.Filter.unique(data);
    var n = data.length;
    var m = uniques.length;
    if (x < uniques[0] || x > uniques[m - 1]) {
        throw new Errors_1.NAError("PERCENTRANK.EXC does not have valid input data.");
    }
    if (m === 1 && uniques[0] === x) {
        return 1;
    }
    significance = (typeof significance === 'undefined') ? 3 : TypeConverter_1.TypeConverter.firstValueAsNumber(significance);
    var power = Math.pow(10, significance);
    var result = 0;
    var match = false;
    var i = 0;
    while (!match && i < m) {
        if (x === uniques[i]) {
            result = (data.indexOf(uniques[i]) + 1) / (n + 1);
            match = true;
        }
        else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
            result = (data.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
            match = true;
        }
        i++;
    }
    var v = Math.floor(result * power) / power;
    if (isNaN(v)) {
        throw new Errors_1.NAError("PERCENTRANK.EXC does not have valid input data.");
    }
    return v;
};
exports.PERCENTRANK$EXC = PERCENTRANK$EXC;
/**
 * Returns the inverse of the standard normal distribution for the given number.
 * @param probability - The probability value.
 * @returns {number}
 * @constructor
 */
var NORMSINV = function (probability) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "NORMSINV");
    probability = TypeConverter_1.TypeConverter.firstValueAsNumber(probability);
    function erfc(x) {
        return 1 - MathHelpers_1.erf(x);
    }
    function erfcinv(p) {
        var j = 0;
        var x, err, t, pp;
        if (p >= 2)
            return -100;
        if (p <= 0)
            return 100;
        pp = (p < 1) ? p : 2 - p;
        t = Math.sqrt(-2 * Math.log(pp / 2));
        x = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);
        for (; j < 2; j++) {
            err = erfc(x) - pp;
            x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
        }
        return (p < 1) ? x : -x;
    }
    function inv(p, mean, std) {
        return -1.41421356237309505 * std * erfcinv(2 * p) + mean;
    }
    if (probability <= 0 || probability >= 1) {
        throw new Errors_1.NumError("Function NORMSINV parameter 1 value is " + probability +
            ". Valid values are between 0 and 1 exclusive.");
    }
    return inv(probability, 0, 1);
};
exports.NORMSINV = NORMSINV;
function _cdf(x, mValue, stdVal) {
    return 0.5 * (1 + MathHelpers_1.erf((x - mValue) / Math.sqrt(2 * stdVal * stdVal)));
}
function _pdf(x, meanVal, std) {
    return Math.exp(-0.5 * Math.log(2 * Math.PI) -
        Math.log(std) - Math.pow(x - meanVal, 2) / (2 * std * std));
}
/**
 * Returns the standard normal cumulative distribution for the given number.
 * @param z - Value to use in calculation.
 * @returns {number}
 * @constructor
 */
var NORMSDIST = function (z) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "NORMSDIST");
    z = TypeConverter_1.TypeConverter.firstValueAsNumber(z);
    return _cdf(z, 0, 1);
};
exports.NORMSDIST = NORMSDIST;
/**
 * Returns the normal distribution for the given number in the distribution.
 * @param x - Value to use.
 * @param meanValue - The mean value of the distribution.
 * @param standDev - The standard deviation of the distribution.
 * @param cumulative - 0 calculates the density function, 1 calculates the distribution.
 * @returns {number}
 * @constructor
 */
var NORMDIST = function (x, meanValue, standDev, cumulative) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 4, "NORMDIST");
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    meanValue = TypeConverter_1.TypeConverter.firstValueAsNumber(meanValue);
    standDev = TypeConverter_1.TypeConverter.firstValueAsNumber(standDev);
    cumulative = TypeConverter_1.TypeConverter.firstValueAsNumber(cumulative);
    if (standDev <= 0) {
        throw new Errors_1.NumError("Function NORMDIST parameter 3 value should be greater than 0. It is " + standDev + ".");
    }
    return (cumulative === 0) ? _pdf(x, meanValue, standDev) : _cdf(x, meanValue, standDev);
};
exports.NORMDIST = NORMDIST;
/**
 * Returns the inverse of the normal distribution for the given number in the distribution.
 * @param probability - Number in the distribution.
 * @param meanVal - The mean value in the normal distribution.
 * @param standDev - The standard deviation of the normal distribution.
 * @returns {number}
 * @constructor
 */
var NORMINV = function (probability, meanVal, standDev) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "NORMINV");
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
        for (; j > 0; j--) {
            tmp = d;
            d = ty * d - dd + cof[j];
            dd = tmp;
        }
        res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
        return isneg ? res - 1 : 1 - res;
    }
    function erfc(x) {
        return 1 - erf(x);
    }
    function erfcinv(p) {
        var j = 0;
        var x, err, t, pp;
        if (p >= 2)
            return -100;
        if (p <= 0)
            return 100;
        pp = (p < 1) ? p : 2 - p;
        t = Math.sqrt(-2 * Math.log(pp / 2));
        x = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);
        for (; j < 2; j++) {
            err = erfc(x) - pp;
            x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
        }
        return (p < 1) ? x : -x;
    }
    function inv(p, meanVal, std) {
        return -1.41421356237309505 * std * erfcinv(2 * p) + meanVal;
    }
    probability = TypeConverter_1.TypeConverter.firstValueAsNumber(probability);
    meanVal = TypeConverter_1.TypeConverter.firstValueAsNumber(meanVal);
    standDev = TypeConverter_1.TypeConverter.firstValueAsNumber(standDev);
    if (probability <= 0 || probability >= 1) {
        throw new Errors_1.NumError("Function NORMINV parameter 1 value is " + probability +
            ". Valid values are between 0 and 1 exclusive.");
    }
    if (standDev <= 0) {
        throw new Errors_1.NumError("Function NORMINV parameter 3 value is " + standDev + ". It should be greater than 0.");
    }
    return inv(probability, meanVal, standDev);
};
exports.NORMINV = NORMINV;
/**
 * Returns the negative binomial distribution.
 * @param k - The value returned for unsuccessful tests.
 * @param r - The value returned for successful tests.
 * @param p - The probability of the success of an attempt, between 0 and 1 inclusively.
 * @returns {number}
 * @constructor
 */
var NEGBINOMDIST = function (k, r, p) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "NEGBINOMDIST");
    function _gammaln(x) {
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
    function _combinationln(n, m) {
        return _factorialln(n) - _factorialln(m) - _factorialln(n - m);
    }
    function _factorialln(n) {
        return n < 0 ? NaN : _gammaln(n + 1);
    }
    function _factorial(n) {
        return n < 0 ? NaN : MathHelpers_1.gammafn(n + 1);
    }
    function _combination(n, m) {
        return (n > 170 || m > 170)
            ? Math.exp(_combinationln(n, m))
            : (_factorial(n) / _factorial(m)) / _factorial(n - m);
    }
    function _pdf(k, r, p) {
        return k !== (k | 0)
            ? 0
            : k < 0
                ? 0
                : _combination(k + r - 1, r - 1) * Math.pow(1 - p, k) * Math.pow(p, r);
    }
    k = TypeConverter_1.TypeConverter.firstValueAsNumber(k);
    r = TypeConverter_1.TypeConverter.firstValueAsNumber(r);
    p = TypeConverter_1.TypeConverter.firstValueAsNumber(p);
    if (k < 1) {
        throw new Errors_1.NumError("Function NEGBINOMDIST parameter 1 value is " + k + ". Should be greater than 0.");
    }
    if (r < 1) {
        throw new Errors_1.NumError("Function NEGBINOMDIST parameter 2 value is " + r + ". Should be greater than 0.");
    }
    if (p < 0 || p > 1) {
        throw new Errors_1.NumError("Function NEGBINOMDIST parameter 3 value is " + p +
            ". Valid values are between 0 and 1 inclusive.");
    }
    return _pdf(k, r, p);
};
exports.NEGBINOMDIST = NEGBINOMDIST;
/**
 * Returns the geometric mean of a sample.
 * @param values - The numerical arguments or ranges that represent a random sample.
 * @returns {number}
 * @constructor
 */
var GEOMEAN = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "GEOMEAN");
    function _product(arr) {
        var prod = 1;
        var i = arr.length;
        while (--i >= 0) {
            prod *= arr[i];
        }
        return prod;
    }
    values = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber).map(function (value) {
        if (value <= 0) {
            throw new Errors_1.NumError("GEOMEAN requires inputs greater than 0, but one of the values entered is " + value + ".");
        }
        return value;
    });
    return Math.pow(_product(values), 1 / values.length);
};
exports.GEOMEAN = GEOMEAN;
/**
 * Returns the harmonic mean of a data set.
 * @param values - The numerical arguments or ranges that represent a sample.
 * @returns {number}
 * @constructor
 */
var HARMEAN = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "HARMEAN");
    var range = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber).map(function (value) {
        if (value <= 0) {
            throw new Errors_1.NumError("HARMEAN requires inputs greater than 0, but one of the values entered is " + value + ".");
        }
        return value;
    });
    var n = range.length;
    var den = 0;
    for (var i = 0; i < n; i++) {
        den += 1 / range[i];
    }
    return n / den;
};
exports.HARMEAN = HARMEAN;
/**
 * Returns the (1-alpha) confidence interval for a normal distribution.
 * @param alpha - The level of the confidence interval
 * @param standDev - The standard deviation for the total population
 * @param size - The size of the population.
 * @returns {number}
 * @constructor
 */
var CONFIDENCE = function (alpha, standDev, size) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "CONFIDENCE");
    alpha = TypeConverter_1.TypeConverter.firstValueAsNumber(alpha);
    standDev = TypeConverter_1.TypeConverter.firstValueAsNumber(standDev);
    size = TypeConverter_1.TypeConverter.firstValueAsNumber(size);
    if (alpha <= 0 || alpha >= 1) {
        throw new Errors_1.NumError("Function CONFIDENCE parameter 1 value is " + alpha
            + ". Valid values are between 0 and 1 exclusively.");
    }
    if (standDev <= 0) {
        throw new Errors_1.NumError("Function CONFIDENCE parameter 2 value is " + standDev + ". It should be greater than 0.");
    }
    if (size <= 0) {
        throw new Errors_1.NumError("Function CONFIDENCE parameter 3 value is " + size + ". It should be at least 1.");
    }
    function _erfc(x) {
        return 1 - MathHelpers_1.erf(x);
    }
    function _erfcinv(p) {
        var j = 0;
        var x, err, t, pp;
        if (p >= 2)
            return -100;
        if (p <= 0)
            return 100;
        pp = (p < 1) ? p : 2 - p;
        t = Math.sqrt(-2 * Math.log(pp / 2));
        x = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);
        for (; j < 2; j++) {
            err = _erfc(x) - pp;
            x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
        }
        return (p < 1) ? x : -x;
    }
    function _normalInv(p, m, std) {
        return -1.41421356237309505 * std * _erfcinv(2 * p) + m;
    }
    function _sumsqerr(arr) {
        var m = MathHelpers_1.mean(arr);
        var sum = 0;
        var i = arr.length;
        var tmp;
        while (--i >= 0) {
            tmp = arr[i] - m;
            sum += tmp * tmp;
        }
        return sum;
    }
    function _variance(arr, flag) {
        return _sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
    }
    function _normalci() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var ans = new Array(2);
        var change;
        if (values.length === 4) {
            change = Math.abs(_normalInv(values[1] / 2, 0, 1) *
                values[2] / Math.sqrt(values[3]));
        }
        else {
            change = Math.abs(_normalInv(values[1] / 2, 0, 1) *
                Math.sqrt(_variance(arguments[2])) / Math.sqrt(values[2].length));
        }
        ans[0] = values[0] - change;
        ans[1] = values[0] + change;
        return ans;
    }
    return _normalci(1, alpha, standDev, size)[1] - 1;
};
exports.CONFIDENCE = CONFIDENCE;
/**
 * Returns the individual term binomial distribution probability.
 * @param successes - The number of successes in a set of trials.
 * @param trials - The number of independent trials.
 * @param probability - The probability of success on each trial.
 * @param cumulative - 0 calculates the probability of a single event, 1 calculates the cumulative probability.
 * @returns {number}
 * @constructor
 */
var BINOMDIST = function (successes, trials, probability, cumulative) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 4, "BINOMDIST");
    successes = TypeConverter_1.TypeConverter.firstValueAsNumber(successes);
    trials = TypeConverter_1.TypeConverter.firstValueAsNumber(trials);
    probability = TypeConverter_1.TypeConverter.firstValueAsNumber(probability);
    cumulative = TypeConverter_1.TypeConverter.firstValueAsNumber(cumulative);
    function _binomialCDF(x, n, p) {
        var binomarr = [], k = 0;
        if (x < 0) {
            return 0;
        }
        if (x < n) {
            for (; k <= x; k++) {
                binomarr[k] = _binomialPDF(k, n, p);
            }
            return MathHelpers_1.sum(binomarr);
        }
        return 1;
    }
    function _combination(n, m) {
        // make sure n or m don't exceed the upper limit of usable values
        return (n > 170 || m > 170)
            ? Math.exp(_combinationln(n, m))
            : (_factorial(n) / _factorial(m)) / _factorial(n - m);
    }
    function _factorial(n) {
        return n < 0 ? NaN : MathHelpers_1.gammafn(n + 1);
    }
    function _factorialln(n) {
        return n < 0 ? NaN : MathHelpers_1.gammaln(n + 1);
    }
    function _combinationln(n, m) {
        return _factorialln(n) - _factorialln(m) - _factorialln(n - m);
    }
    function _binomialPDF(k, n, p) {
        return (p === 0 || p === 1) ?
            ((n * p) === k ? 1 : 0) :
            _combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    }
    if (trials < 0) {
        throw new Errors_1.NumError("Function BINOMDIST parameter 2 value is " + trials + ", but should be greater than 0.");
    }
    if (trials < successes) {
        throw new Errors_1.NumError("Function BINOMDIST parameter 1 value is " + trials
            + ". It should be less than or equal to value of Function BINOMDIST parameter 2 with " + successes + ".");
    }
    if (probability > 1 || probability < 0) {
        throw new Errors_1.NumError("Function BINOMDIST parameter 3 value is " + probability
            + ", but should be between 0 and 1 inclusive.");
    }
    return (cumulative) ? _binomialCDF(successes, trials, probability) : _binomialPDF(successes, trials, probability);
};
exports.BINOMDIST = BINOMDIST;
/**
 * Returns the covariance of the product of paired deviations.
 * @param dataY - The first range of data.
 * @param dataX - The second range of data.
 * @returns {number}
 * @constructor
 */
var COVAR = function (dataY, dataX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "COVAR");
    dataY = Filter_1.Filter.flattenAndThrow(dataY).map(TypeConverter_1.TypeConverter.valueToNumber);
    dataX = Filter_1.Filter.flattenAndThrow(dataX).map(TypeConverter_1.TypeConverter.valueToNumber);
    if (dataX.length !== dataY.length) {
        throw new Errors_1.NAError("COlet has mismatched argument count " + dataY.length + " vs " + dataX.length + ".");
    }
    var mean1 = MathHelpers_1.mean(dataY);
    var mean2 = MathHelpers_1.mean(dataX);
    var result = 0;
    var n = dataY.length;
    for (var i = 0; i < n; i++) {
        result += (dataY[i] - mean1) * (dataX[i] - mean2);
    }
    return result / n;
};
exports.COVAR = COVAR;
/**
 * Returns the values of the Weibull distribution for the given number.
 * @param x - Number to use in calculation.
 * @param shape - The Alpha parameter of the Weibull distribution. Should be greater than 0.
 * @param scale - The Beta parameter of the Weibull distribution. Should be greater than 0.
 * @param cumulative - Indicates the type of function: If 0 the form of the function is calculated, if 1 then the
 * distribution is calculated.
 * @returns {number}
 * @constructor
 */
var WEIBULL = function (x, shape, scale, cumulative) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 4, "WEIBULL");
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    if (x < 0) {
        throw new Errors_1.NumError("Function WEIBULL parameter 1 value is " + x + ", but should be greater than or equal to 0.");
    }
    shape = TypeConverter_1.TypeConverter.firstValueAsNumber(shape);
    if (shape <= 0) {
        throw new Errors_1.NumError("Function WEIBULL parameter 2 value is " + shape + ", but should be greater than 0.");
    }
    scale = TypeConverter_1.TypeConverter.firstValueAsNumber(scale);
    if (scale <= 0) {
        throw new Errors_1.NumError("Function WEIBULL parameter 2 value is " + scale + ", but should be greater than 0.");
    }
    cumulative = TypeConverter_1.TypeConverter.firstValueAsNumber(cumulative);
    return (cumulative) ? 1 - Math.exp(-Math.pow(x / scale, shape)) : Math.pow(x, shape - 1)
        * Math.exp(-Math.pow(x / scale, shape)) * shape / Math.pow(scale, shape);
};
exports.WEIBULL = WEIBULL;
/**
 * Estimate the variance based on the entire population. Text will be converted to numbers, if possible.
 * @param values - Values of population.
 * @returns {number}
 * @constructor
 */
var VARPA = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "VARPA");
    var range = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber);
    var n = range.length;
    if (n < 2) {
        throw new Errors_1.DivZeroError("Evaluation of function VARP caused a divide by zero error.");
    }
    var sigma = 0;
    var count = 0;
    var mean = AVERAGEA(range);
    for (var i = 0; i < n; i++) {
        var el = range[i];
        if (typeof el === 'number') {
            sigma += Math.pow(el - mean, 2);
        }
        else if (el === true) {
            sigma += Math.pow(1 - mean, 2);
        }
        else {
            sigma += Math.pow(0 - mean, 2);
        }
        if (el !== null) {
            count++;
        }
    }
    return sigma / count;
};
exports.VARPA = VARPA;
/**
 * Estimate the variance based on the entire population.
 * @param values - Values of entire population.
 * @returns {number}
 * @constructor
 */
var VARP = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "VARP");
    var range = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber);
    var n = range.length;
    if (n < 2) {
        throw new Errors_1.DivZeroError("Evaluation of function VARP caused a divide by zero error.");
    }
    var sigma = 0;
    var count = 0;
    var mean = AVERAGE(range);
    for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - mean, 2);
        count++;
    }
    return sigma / count;
};
exports.VARP = VARP;
/**
 * Estimate the variance based on a sample.
 * @param values
 * @returns {number}
 * @constructor
 */
var VARA = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "VARA");
    var range = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber);
    var n = range.length;
    if (n < 2) {
        throw new Errors_1.DivZeroError("Evaluation of function VARA caused a divide by zero error.");
    }
    var sigma = 0;
    var count = 0;
    var mean = AVERAGEA(range);
    for (var i = 0; i < n; i++) {
        var el = range[i];
        if (typeof el === 'number') {
            sigma += Math.pow(el - mean, 2);
        }
        else if (el === true) {
            sigma += Math.pow(1 - mean, 2);
        }
        else {
            sigma += Math.pow(0 - mean, 2);
        }
        if (el !== null) {
            count++;
        }
    }
    return sigma / (count - 1);
};
exports.VARA = VARA;
/**
 * Estimate the variance based on a sample.
 * @param values - Values in sample.
 * @constructor
 */
var VAR = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "VAR");
    var range = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber);
    var n = range.length;
    if (n < 2) {
        throw new Errors_1.DivZeroError("Evaluation of function let caused a divide by zero error.");
    }
    var sigma = 0;
    var count = 0;
    var mean = AVERAGE(range);
    for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - mean, 2);
        count++;
    }
    return sigma / (count - 1);
};
exports.VAR = VAR;
/**
 * Returns the number of permutations for a given number of objects.
 * @param total - The total number of objects
 * @param objects - The number of objects in each permutation.
 * @returns {number}
 * @constructor
 */
var PERMUT = function (total, objects) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "PERMUT");
    total = TypeConverter_1.TypeConverter.firstValueAsNumber(total);
    objects = TypeConverter_1.TypeConverter.firstValueAsNumber(objects);
    if (total < objects) {
        throw new Errors_1.NumError("Function PERMUT parameter 2 value is " + objects +
            ", should be less than or equal to value of Function PERMUT parameter 1 of " + objects + ".");
    }
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
    return _fact(total) / _fact(total - objects);
};
exports.PERMUT = PERMUT;
/**
 * Returns the square of the Pearson correlation coefficient based on the given values.
 * @param rangeY - An array or range of data points.
 * @param rangeX - An array or range of data points.
 * @returns {number}
 * @constructor
 */
var RSQ = function (rangeY, rangeX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "RSQ");
    if (!Array.isArray(rangeY)) {
        rangeY = [rangeY];
    }
    if (!Array.isArray(rangeX)) {
        rangeX = [rangeX];
    }
    var dataX = Filter_1.Filter.flattenAndThrow(rangeX).map(TypeConverter_1.TypeConverter.valueToNumber);
    var dataY = Filter_1.Filter.flattenAndThrow(rangeY).map(TypeConverter_1.TypeConverter.valueToNumber);
    if (dataX.length !== dataY.length) {
        throw new Errors_1.NAError("SLOPE has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
    }
    if (dataY.length === 1 && dataX.length === 1) {
        throw new Errors_1.DivZeroError("Evaluation of function RSQ caused a divide by zero error.");
    }
    return Math.pow(PEARSON(dataX, dataY), 2);
};
exports.RSQ = RSQ;
/**
 * Returns the skewness of a distribution.
 * @param values - The numerical values or range.
 * @returns {number}
 * @constructor
 */
var SKEW = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "SKEW");
    var range = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber);
    var n = range.length;
    if (n < 3) {
        throw new Errors_1.DivZeroError("SKEW requires at least 3 data points.");
    }
    var meanValue = MathHelpers_1.mean(range);
    var sigma = 0;
    for (var i = 0; i < n; i++) {
        sigma += Math.pow(range[i] - meanValue, 3);
    }
    var d = ((n - 1) * (n - 2) * Math.pow(MathHelpers_1.stdev(range, true), 3));
    if (d === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function SKEW caused a divide by zero error.");
    }
    return n * sigma / d;
};
exports.SKEW = SKEW;
/**
 * Returns the standard error of the predicted y value for each x in the regression. Text values will be ignored.
 * @param rangeY - An array or range of data points.
 * @param rangeX - An array or range of data points.
 * @returns {number}
 * @constructor
 */
var STEYX = function (rangeY, rangeX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "STEYX");
    if (!Array.isArray(rangeY)) {
        rangeY = [rangeY];
    }
    if (!Array.isArray(rangeX)) {
        rangeX = [rangeX];
    }
    var dataX = Filter_1.Filter.flattenAndThrow(rangeX).filter(function (value) {
        return typeof value !== "string";
    }).map(TypeConverter_1.TypeConverter.valueToNumber);
    var dataY = Filter_1.Filter.flattenAndThrow(rangeY).filter(function (value) {
        return typeof value !== "string";
    }).map(TypeConverter_1.TypeConverter.valueToNumber);
    if (dataX.length !== dataY.length) {
        throw new Errors_1.NAError("STEYX has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
    }
    if (dataY.length === 2 && dataX.length === 2) {
        throw new Errors_1.DivZeroError("Evaluation of function STEYX caused a divide by zero error.");
    }
    var xmean = MathHelpers_1.mean(dataX);
    var ymean = MathHelpers_1.mean(dataY);
    var n = dataX.length;
    var lft = 0;
    var num = 0;
    var den = 0;
    for (var i = 0; i < n; i++) {
        lft += Math.pow(dataY[i] - ymean, 2);
        num += (dataX[i] - xmean) * (dataY[i] - ymean);
        den += Math.pow(dataX[i] - xmean, 2);
    }
    return Math.sqrt((lft - num * num / den) / (n - 2));
};
exports.STEYX = STEYX;
/**
 * Returns the probability that values in a range are between two limits. Data is the array or range of data in the
 * sample.
 * @param range - The array or range of data in the sample.
 * @param probability - The array or range of the corresponding probabilities
 * @param start - The start value of the interval whose probabilities are to be summed.
 * @param end - [OPTIONAL] - The end value of the interval whose probabilities are to be summed. If this parameter is
 * missing, the probability for the start value is calculated
 * @returns {number}
 * @constructor
 */
var PROB = function (range, probability, start, end) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 3, 4, "PROB");
    range = Filter_1.Filter.flattenAndThrow(range);
    probability = Filter_1.Filter.flattenAndThrow(probability);
    if (range.length !== probability.length) {
        throw new Errors_1.NAError("PROB has mismatched argument count " + range.length + " vs " + probability.length + ".");
    }
    var sum = Math_1.SUM(probability);
    if (sum <= 0 || sum > 1) {
        throw new Errors_1.ValueError("Function PROB parameter 2 should sum to 1, but sums to " + sum + ".");
    }
    start = TypeConverter_1.TypeConverter.firstValueAsNumber(start);
    end = (end === undefined) ? start : TypeConverter_1.TypeConverter.firstValueAsNumber(end);
    if (start === end) {
        return (range.indexOf(start) >= 0) ? probability[range.indexOf(start)] : 0;
    }
    var sorted = range.sort(function (a, b) {
        return a - b;
    });
    var n = sorted.length;
    var result = 0;
    for (var i = 0; i < n; i++) {
        if (sorted[i] >= start && sorted[i] <= end) {
            result += probability[range.indexOf(sorted[i])];
        }
    }
    return result;
};
exports.PROB = PROB;
/**
 * Returns the most commonly occurring value in a range.
 * @param values - Range(s) or values to consider.
 * @returns {number}
 * @constructor
 */
var MODE = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 1, "MODE");
    var range = Filter_1.Filter.flattenAndThrow(values).map(TypeConverter_1.TypeConverter.valueToNumber);
    var n = range.length;
    var count = {};
    var maxItems = [];
    var max = 0;
    var currentItem;
    for (var i = 0; i < n; i++) {
        currentItem = range[i];
        count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
        if (count[currentItem] > max) {
            max = count[currentItem];
            maxItems = [];
        }
        if (count[currentItem] === max) {
            maxItems[maxItems.length] = currentItem;
        }
    }
    if (max === 1 && range.length !== 1) {
        throw new Errors_1.NAError("MODE cannot produce a result because no values occur more than once.");
    }
    return maxItems[0];
};
exports.MODE = MODE;
/**
 * Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top.
 * @param value - Value to find the rank of.
 * @param data - Values or range of the data-set.
 * @param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to
 * 0.
 * @returns {number}
 * @constructor
 */
var RANK = function (value, data, isAscending) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "RANK");
    value = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var range = Filter_1.Filter.flattenAndThrow(data).map(TypeConverter_1.TypeConverter.valueToNumber);
    isAscending = (typeof isAscending === 'undefined') ? false : isAscending;
    var sort = (isAscending) ? function (a, b) {
        return a - b;
    } : function (a, b) {
        return b - a;
    };
    range = range.sort(sort);
    var rangeIndex = range.indexOf(value);
    if (rangeIndex === -1) {
        throw new Errors_1.NAError("RANK can't produce a result because parameter 1 is not in the dataset.");
    }
    return range.indexOf(value) + 1;
};
exports.RANK = RANK;
/**
 * Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top. If
 * more than one value exists in the same data-set, the average range of the values will be returned.
 * @param value - Value to find the rank of.
 * @param data - Values or range of the data-set.
 * @param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to
 * 0.
 * @returns {number}
 * @constructor
 */
var RANK$AVG = function (value, data, isAscending) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "RANK.AVG");
    value = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var range = Filter_1.Filter.flattenAndThrow(data).map(TypeConverter_1.TypeConverter.valueToNumber);
    function _countIn(range, value) {
        var result = 0;
        for (var i = 0; i < range.length; i++) {
            if (range[i] === value) {
                result++;
            }
        }
        return result;
    }
    isAscending = (typeof isAscending === 'undefined') ? false : isAscending;
    var sort = (isAscending) ? function (a, b) {
        return a - b;
    } : function (a, b) {
        return b - a;
    };
    range = range.sort(sort);
    var rangeIndex = range.indexOf(value);
    if (rangeIndex === -1) {
        throw new Errors_1.NAError("RANK.AVG can't produce a result because parameter 1 is not in the dataset.");
    }
    var count = _countIn(range, value);
    return (count > 1) ? (2 * rangeIndex + count + 1) / 2 : rangeIndex + 1;
};
exports.RANK$AVG = RANK$AVG;
/**
 * Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top. If
 * there is more than one entry of the same value in the dataset, the top rank of the entries will be returned.
 * @param value - Value to find the rank of.
 * @param data - Values or range of the data-set.
 * @param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to
 * 0.
 * @returns {number}
 * @constructor
 */
var RANK$EQ = function (value, data, isAscending) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "RANK.EQ");
    value = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var range = Filter_1.Filter.flattenAndThrow(data).map(TypeConverter_1.TypeConverter.valueToNumber);
    isAscending = (typeof isAscending === 'undefined') ? false : isAscending;
    var sort = (isAscending) ? function (a, b) {
        return a - b;
    } : function (a, b) {
        return b - a;
    };
    range = range.sort(sort);
    var rangeIndex = range.indexOf(value);
    if (rangeIndex === -1) {
        throw new Errors_1.NAError("RANK.EQ can't produce a result because parameter 1 is not in the dataset.");
    }
    return range.indexOf(value) + 1;
};
exports.RANK$EQ = RANK$EQ;
/**
 * Returns the cumulative lognormal distribution for the given number.
 * @param x - The probability value.
 * @param meanValue - The mean value of the standard logarithmic distribution.
 * @param standardDev - The standard deviation of the standard logarithmic distribution.
 * @returns {number}
 * @constructor
 */
var LOGNORMDIST = function (x, meanValue, standardDev) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "LOGNORMDIST");
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    meanValue = TypeConverter_1.TypeConverter.firstValueAsNumber(meanValue);
    standardDev = TypeConverter_1.TypeConverter.firstValueAsNumber(standardDev);
    if (x <= 0) {
        throw new Errors_1.NumError("Function LOGNORMDIST parameter 1 value is " + x + ", but should be greater than 0.");
    }
    if (standardDev <= 0) {
        throw new Errors_1.NumError("Function LOGNORMDIST parameter 3 value is " + standardDev + ", but should be greater than 0.");
    }
    var a = (Math.log(x) - meanValue) / Math.sqrt(2 * standardDev * standardDev);
    return 0.5 + 0.5 * MathHelpers_1.erf(a);
};
exports.LOGNORMDIST = LOGNORMDIST;
/**
 * Returns the t-distribution for the given number.
 * @param x - Value to use in calculation.
 * @param degreesOfFreedom - The number of degrees of freedom for the t-distribution.
 * @param tails - 1 returns the one-tailed test, 2 returns the two-tailed test.
 * @returns {number}
 * @constructor
 */
var TDIST = function (x, degreesOfFreedom, tails) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "TDIST");
    x = TypeConverter_1.TypeConverter.firstValueAsNumber(x);
    degreesOfFreedom = TypeConverter_1.TypeConverter.firstValueAsNumber(degreesOfFreedom);
    tails = TypeConverter_1.TypeConverter.firstValueAsNumber(tails);
    if (tails < 1 || tails > 2) {
        throw new Errors_1.NumError("Function TDIST parameter 3 value is " + tails +
            ", but valid values are between 1 and 2, inclusively.");
    }
    if (degreesOfFreedom < 1) {
        throw new Errors_1.NumError("Function TDIST parameter 2 value is " + degreesOfFreedom +
            ", but it should be greater than or equal to 1.");
    }
    if (x < 0) {
        throw new Errors_1.NumError("Function TDIST parameter 1 value is " + x + ", but it should be greater than or equal to 0.");
    }
    function _betacf(x, a, b) {
        var fpmin = 1e-30;
        var m = 1;
        var qab = a + b;
        var qap = a + 1;
        var qam = a - 1;
        var c = 1;
        var d = 1 - qab * x / qap;
        var m2, aa, del, h;
        if (Math.abs(d) < fpmin)
            d = fpmin;
        d = 1 / d;
        h = d;
        for (; m <= 100; m++) {
            m2 = 2 * m;
            aa = m * (b - m) * x / ((qam + m2) * (a + m2));
            d = 1 + aa * d;
            if (Math.abs(d) < fpmin)
                d = fpmin;
            c = 1 + aa / c;
            if (Math.abs(c) < fpmin)
                c = fpmin;
            d = 1 / d;
            h *= d * c;
            aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
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
    function _ibeta(x, a, b) {
        var bt = (x === 0 || x === 1) ? 0 :
            Math.exp(MathHelpers_1.gammaln(a + b) - MathHelpers_1.gammaln(a) -
                MathHelpers_1.gammaln(b) + a * Math.log(x) + b *
                Math.log(1 - x));
        if (x < 0 || x > 1)
            return 0;
        if (x < (a + 1) / (a + b + 2))
            return bt * _betacf(x, a, b) / a;
        return 1 - bt * _betacf(1 - x, b, a) / b;
    }
    function _studenttCDF(x, dof) {
        var dof2 = dof / 2;
        return _ibeta((x + Math.sqrt(x * x + dof)) /
            (2 * Math.sqrt(x * x + dof)), dof2, dof2);
    }
    return tails * (1 - _studenttCDF(x, degreesOfFreedom));
};
exports.TDIST = TDIST;
/**
 * Returns the hypergeometric distribution. X is the number of results achieved in the random sample.
 * @param numberOfSuccesses - The number of results achieved in the random sample.
 * @param numberOfDraws - The size of the random sample.
 * @param successesInPop - The number of possible results in the total population.
 * @param populationSize - The size of the total population.
 * @returns {number}
 * @constructor
 */
var HYPGEOMDIST = function (numberOfSuccesses, numberOfDraws, successesInPop, populationSize) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 4, "HYPGEOMDIST");
    numberOfSuccesses = TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfSuccesses);
    numberOfDraws = TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfDraws);
    if (numberOfSuccesses > numberOfDraws) {
        throw new Errors_1.NumError("HYPGEOMDIST parameter 1 value is " + numberOfSuccesses
            + ", but should be less than or equal to parameter 2 with " + numberOfDraws + ".");
    }
    if (numberOfSuccesses < 0) {
        throw new Errors_1.NumError("HYPGEOMDIST parameter 1 value is " + numberOfSuccesses
            + ", but should be greater than or equal to 0.");
    }
    if (numberOfSuccesses < (numberOfDraws + successesInPop - populationSize)) {
        throw new Errors_1.NumError("HYPGEOMDIST parameter 1 value is " + numberOfSuccesses
            + ", but should be greater than or equal to " + (numberOfDraws + successesInPop - populationSize) + ".");
    }
    successesInPop = TypeConverter_1.TypeConverter.firstValueAsNumber(successesInPop);
    populationSize = TypeConverter_1.TypeConverter.firstValueAsNumber(populationSize);
    return Math_1.COMBIN(successesInPop, numberOfSuccesses) *
        Math_1.COMBIN(populationSize - successesInPop, numberOfDraws - numberOfSuccesses) /
        Math_1.COMBIN(populationSize, numberOfDraws);
};
exports.HYPGEOMDIST = HYPGEOMDIST;
/**
 * Returns the two-tailed P value of a z test with standard distribution.
 * @param range - Te array of the data.
 * @param value - The value to be tested.
 * @param stdDev - [OPTIONAL] The standard deviation of the total population. If this argument is missing, the standard
 * deviation of the sample is processed.
 * @returns {number}
 * @constructor
 */
var ZTEST = function (range, value, stdDev) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "ZTEST");
    range = Filter_1.Filter.flattenAndThrow(range);
    value = TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    var sd = MoreUtils_1.isUndefined(stdDev) ? STDEV(range) : TypeConverter_1.TypeConverter.firstValueAsNumber(stdDev);
    return 1 - NORMSDIST((AVERAGE(range) - value) / (sd / Math.sqrt(range.length)));
};
exports.ZTEST = ZTEST;
