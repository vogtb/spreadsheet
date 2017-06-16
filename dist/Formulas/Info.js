"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var Errors_1 = require("../Errors");
var TypeConverter_1 = require("../Utilities/TypeConverter");
/**
 * Returns the "value not available" error, "#N/A".
 * @constructor
 */
var NA = function () {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "NA");
    throw new Errors_1.NAError("NA Error thrown.");
};
exports.NA = NA;
/**
 * Returns true if a value is text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
var ISTEXT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ISTEXT");
    return typeof TypeConverter_1.TypeConverter.firstValue(value) === "string";
};
exports.ISTEXT = ISTEXT;
/**
 * Returns true if value is a boolean (FALSE, or TRUE). Numerical and text values return false.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
var ISLOGICAL = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ISLOGICAL");
    return typeof TypeConverter_1.TypeConverter.firstValue(value) === "boolean";
};
exports.ISLOGICAL = ISLOGICAL;
