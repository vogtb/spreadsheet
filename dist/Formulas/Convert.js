"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var TypeConverter_1 = require("../Utilities/TypeConverter");
/**
 * Converts a number to a Date.
 * @param value - Value to convert. If the input is a number, will convert to a date. If value is non-numeric, will
 * return value unchanged.
 * @returns {any}
 * @constructor
 */
var TO_DATE = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "TO_DATE");
    var v = TypeConverter_1.TypeConverter.firstValue(value);
    if (typeof v === "number") {
        return TypeConverter_1.TypeConverter.valueToDateNumber(v);
    }
    return v;
};
exports.TO_DATE = TO_DATE;
/**
 * Converts a number to a Dollar value.
 * @param value - Value to convert. If the input is a number, will return as a dollar value. If value is non-numeric,
 * will return value unchanged.
 * @returns {any}
 * @constructor
 */
var TO_DOLLARS = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "TO_DOLLAR");
    return TypeConverter_1.TypeConverter.firstValue(value);
};
exports.TO_DOLLARS = TO_DOLLARS;
/**
 * Converts a number to a percent value where 1 = 100 percent.
 * @param value - Value to convert. If the input is a number, will return as a percent value. If value is non-numeric,
 * will return value unchanged.
 * @returns {any}
 * @constructor
 */
var TO_PERCENT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "TO_PERCENT");
    return TypeConverter_1.TypeConverter.firstValue(value);
};
exports.TO_PERCENT = TO_PERCENT;
/**
 * Converts a number to a text value
 * @param value - Value to convert. If the input is a text, will return as a text value.
 * @returns {any}
 * @constructor
 */
var TO_TEXT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "TO_TEXT");
    var v = TypeConverter_1.TypeConverter.firstValue(value);
    return TypeConverter_1.TypeConverter.valueToString(v);
};
exports.TO_TEXT = TO_TEXT;
