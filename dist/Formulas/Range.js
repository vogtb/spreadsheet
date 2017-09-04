"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var Filter_1 = require("../Utilities/Filter");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Errors_1 = require("../Errors");
var MathHelpers_1 = require("../Utilities/MathHelpers");
/**
 * Calculates the frequency distribution of a range into specified classes or "bins".
 * @param range - to get frequency for.
 * @param bins - or classes.
 * @returns {Array<number>}
 * @constructor
 * TODO: Returns ColumnArray (values stacked in Y-direction)
 */
var FREQUENCY = function (range, bins) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "FREQUENCY");
    if (!Array.isArray(bins)) {
        bins = [bins];
    }
    if (!Array.isArray(range)) {
        range = [range];
    }
    bins = Filter_1.Filter.flattenAndThrow(bins).map(function (value) {
        return TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    }).sort(function (a, b) {
        return a - b;
    });
    range = Filter_1.Filter.flattenAndThrow(range).map(function (value) {
        return TypeConverter_1.TypeConverter.firstValueAsNumber(value);
    }).sort(function (a, b) {
        return a - b;
    });
    var n = range.length;
    var b = bins.length;
    var r = [];
    for (var i = 0; i <= b; i++) {
        r[i] = 0;
        for (var j = 0; j < n; j++) {
            if (i === 0) {
                if (range[j] <= bins[0]) {
                    r[0] += 1;
                }
            }
            else if (i < b) {
                if (range[j] > bins[i - 1] && range[j] <= bins[i]) {
                    r[i] += 1;
                }
            }
            else if (i === b) {
                if (range[j] > bins[b - 1]) {
                    r[b] += 1;
                }
            }
        }
    }
    return r;
};
exports.FREQUENCY = FREQUENCY;
/**
 * Given partial data with exponential growth, fits and ideal exponential growth trend, and predicts future values. For
 * more information see: https://xkcd.com/1102/
 * @param knownY - The range or array containing the dependent, y, values that are known, and will be used to fit an
 * ideal exponential growth curve.
 * @param knownX - OPTIONAL - The range or values of the independent variables that correspond to knownY.
 * @param newX - OPTIONAL - The range, values, or data-points to return the y-values on the ideal curve fit.
 * @param shouldUseConstant - OPTIONAL - True by default. Given an exponential function y = b*m^x, should this function
 * calculate b?
 * @returns {Array}
 * @constructor
 * TODO: Returns RowArray (values stacked in X-direction)
 */
var GROWTH = function (knownY, knownX, newX, shouldUseConstant) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 4, "GROWTH");
    // Credits: Ilmari Karonen, FormulaJs (https://github.com/sutoiku/formula.js/)
    knownY = Filter_1.Filter.flattenAndThrow(knownY).map(function (value) {
        if (typeof value !== "number") {
            throw new Errors_1.ValueError("Function GROWTH parameter 1 expects number values. But '" + value + "' is " + (typeof value)
                + " and cannot be coerced to a number.");
        }
        return value;
    });
    // Default values for optional parameters:
    if (arguments.length < 2) {
        knownX = [];
        for (var i = 1; i <= knownY.length; i++) {
            knownX.push(i);
        }
    }
    if (arguments.length < 3) {
        newX = [];
        for (var i = 1; i <= knownY.length; i++) {
            newX.push(i);
        }
    }
    if (arguments.length < 4) {
        shouldUseConstant = true || shouldUseConstant;
    }
    // Calculate sums over the data:
    var n = knownY.length;
    var avg_x = 0;
    var avg_y = 0;
    var avg_xy = 0;
    var avg_xx = 0;
    for (var i = 0; i < n; i++) {
        var x = knownX[i];
        var y = Math.log(knownY[i]);
        avg_x += x;
        avg_y += y;
        avg_xy += x * y;
        avg_xx += x * x;
    }
    avg_x /= n;
    avg_y /= n;
    avg_xy /= n;
    avg_xx /= n;
    // Compute linear regression coefficients:
    var beta;
    var alpha;
    if (shouldUseConstant) {
        beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
        alpha = avg_y - beta * avg_x;
    }
    else {
        beta = avg_xy / avg_xx;
        alpha = 0;
    }
    // Compute and return result array:
    var new_y = [];
    for (var i = 0; i < newX.length; i++) {
        new_y.push(Math.exp(alpha + beta * newX[i]));
    }
    return new_y;
};
exports.GROWTH = GROWTH;
/**
 * Returns the parameters of a linear trend.
 * @param dataY - The range of data representing Y values.
 * @param dataX - The range of data representing X values.
 * @returns {number[]}
 * @constructor
 */
var LINEST = function (dataY, dataX) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "LINEST");
    var rangeY = Filter_1.Filter.flattenAndThrow(dataY).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    var rangeX = Filter_1.Filter.flattenAndThrow(dataX).map(function (value) {
        return TypeConverter_1.TypeConverter.valueToNumber(value);
    });
    if (rangeX.length < 2) {
        throw new Errors_1.NAError("LINEST requires more data points. Expected: 2, found: " + rangeX.length + ".");
    }
    if (rangeY.length < 2) {
        throw new Errors_1.NAError("LINEST requires more data points. Expected: 2, found: " + rangeY.length + ".");
    }
    var xMean = MathHelpers_1.mean(rangeX);
    var yMean = MathHelpers_1.mean(rangeY);
    var n = rangeX.length;
    var num = 0;
    var den = 0;
    for (var i = 0; i < n; i++) {
        num += (rangeX[i] - xMean) * (rangeY[i] - yMean);
        den += Math.pow(rangeX[i] - xMean, 2);
    }
    var m = num / den;
    var b = yMean - m * xMean;
    return [m, b];
};
exports.LINEST = LINEST;
