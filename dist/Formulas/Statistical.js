"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var CriteriaFunctionFactory_1 = require("../Utilities/CriteriaFunctionFactory");
var Filter_1 = require("../Utilities/Filter");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Errors_1 = require("../Errors");
var Math_1 = require("./Math");
var MathHelpers_1 = require("../Utilities/MathHelpers");
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
    var result = 0;
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
        var top = sortedArray[sortedArray.length / 2];
        var bottom = sortedArray[(sortedArray.length / 2) - 1];
        return AVERAGE(top, bottom);
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
