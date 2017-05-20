"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Errors_1 = require("../Errors");
/**
 * Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are
 * logically false.
 * @param values At least one expression or reference to a cell containing an expression that represents some logical
 * value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean} if all values are logically true.
 * @constructor
 */
var AND = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "AND");
    var result = true;
    for (var i = 0; i < values.length; i++) {
        if (typeof values[i] === "string") {
            throw new Errors_1.ValueError("AND expects boolean values. But '" + values[i]
                + "' is a text and cannot be coerced to a boolean.");
        }
        else if (values[i] instanceof Array) {
            if (!AND.apply(this, values[i])) {
                result = false;
                break;
            }
        }
        else if (!values[i]) {
            result = false;
            break;
        }
    }
    return result;
};
exports.AND = AND;
/**
 * Tests whether two strings are identical, returning true if they are.
 * @param one - The first string to compare
 * @param two - The second string to compare
 * @returns {boolean}
 * @constructor
 */
var EXACT = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "EXACT");
    one = TypeConverter_1.TypeConverter.firstValue(one);
    two = TypeConverter_1.TypeConverter.firstValue(two);
    return one.toString() === two.toString();
};
exports.EXACT = EXACT;
/**
 * Returns true.
 * @returns {boolean} true boolean
 * @constructor
 */
var TRUE = function () {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 0, "TRUE");
    return true;
};
exports.TRUE = TRUE;
/**
 * Returns false.
 * @returns {boolean} false boolean
 * @constructor
 */
var FALSE = function () {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 0, "FALSE");
    return false;
};
exports.FALSE = FALSE;
/**
 * Returns the opposite of a logical value - NOT(TRUE) returns FALSE; NOT(FALSE) returns TRUE.
 * @param value - An expression or reference to a cell holding an expression that represents some logical value.
 * @returns {boolean} opposite of a logical value input
 * @constructor
 */
var NOT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "NOT");
    if (typeof (value) === "boolean") {
        return !value;
    }
    if (typeof (value) === "string") {
        if (value === "") {
            return true;
        }
        throw new Errors_1.ValueError("Function NOT parameter 1 expects boolean values. But '" + value
            + "' is a text and cannot be coerced to a boolean.");
    }
    if (typeof (value) === "number") {
        return value === 0;
    }
    if (value instanceof Array) {
        if (value.length === 0) {
            throw new Errors_1.RefError("Reference does not exist.");
        }
        return NOT(value[0]);
    }
};
exports.NOT = NOT;
/**
 * Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are
 * logically false.
 * @param values An expression or reference to a cell containing an expression that represents some logical value, i.e.
 * TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean}
 * @constructor
 */
var OR = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "OR");
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            if (OR.apply(this, values[i])) {
                return true;
            }
        }
        else if (TypeConverter_1.TypeConverter.valueToBoolean(values[i])) {
            return true;
        }
    }
    return false;
};
exports.OR = OR;
/**
 * Exclusive or or exclusive disjunction is a logical operation that outputs true only when inputs differ.
 * @param values to check for exclusivity.
 * @returns {boolean} returns true if only one input is considered logically true.
 * @constructor
 */
var XOR = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(values, 1, "XOR");
    var alreadyTruthy = false;
    for (var i = 0; i < values.length; i++) {
        if (values[i] instanceof Array) {
            if (values[i].length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            if (XOR.apply(this, values[i])) {
                if (alreadyTruthy) {
                    return false;
                }
                alreadyTruthy = true;
            }
        }
        else if (TypeConverter_1.TypeConverter.valueToBoolean(values[i])) {
            if (alreadyTruthy) {
                return false;
            }
            alreadyTruthy = true;
        }
    }
    return alreadyTruthy;
};
exports.XOR = XOR;
