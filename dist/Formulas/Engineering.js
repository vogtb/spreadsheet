"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Errors_1 = require("../Errors");
/**
 * Converts a signed binary number to decimal format.
 * @param signedBinaryNumber - The signed 10-bit binary value to be converted to decimal, provided as a
 * string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented
 * in two's complement format.
 * @returns {number}
 * @constructor
 */
var BIN2DEC = function (signedBinaryNumber) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "BIN2DEC");
    if (typeof TypeConverter_1.TypeConverter.firstValue(signedBinaryNumber) === "boolean") {
        throw new Errors_1.ValueError("Function BIN2DEC parameter 1 expects text values. But '" + signedBinaryNumber + "' is a boolean and cannot be coerced to a text.");
    }
    var n = TypeConverter_1.TypeConverter.firstValueAsString(signedBinaryNumber);
    if (!(/^[01]{1,10}$/).test(n)) {
        throw new Errors_1.NumError("Input for BIN2DEC ('" + n + "') is not a valid binary representation.");
    }
    if (n.length === 10 && n.substring(0, 1) === '1') {
        return parseInt(n.substring(1), 2) - 512;
    }
    return parseInt(n, 2);
};
exports.BIN2DEC = BIN2DEC;
/**
 * Converts a signed binary number to signed hexadecimal format.
 * @param signedBinaryNumber - The signed 10-bit binary value to be converted to signed hexadecimal,
 * provided as a string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are
 * represented in two's complement format.
 * @param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result.
 * @returns {string} string representation of a signed hexadecimal
 * @constructor
 */
var BIN2HEX = function (signedBinaryNumber, significantDigits) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "BIN2HEX");
    if (typeof TypeConverter_1.TypeConverter.firstValue(signedBinaryNumber) === "boolean") {
        throw new Errors_1.ValueError("Function BIN2HEX parameter 1 expects text values. But '" + signedBinaryNumber + "' is a boolean and cannot be coerced to a text.");
    }
    var n = TypeConverter_1.TypeConverter.firstValueAsString(signedBinaryNumber);
    var p = 10;
    if (significantDigits !== undefined) {
        p = TypeConverter_1.TypeConverter.firstValueAsNumber(significantDigits);
    }
    if (!(/^[01]{1,10}$/).test(n)) {
        throw new Errors_1.NumError("Input for BIN2HEX ('" + n + "') is not a valid binary representation.");
    }
    if (n.length === 10 && n.substring(0, 1) === '1') {
        return (1099511627264 + parseInt(n.substring(1), 2)).toString(16).toUpperCase();
    }
    if (p < 1 || p > 10) {
        throw new Errors_1.NumError("Function BIN2HEX parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
    }
    p = Math.floor(p);
    // Convert decimal number to hexadecimal
    var result = parseInt(n.toString(), 2).toString(16).toUpperCase();
    if (p === 10) {
        return result;
    }
    var str = "";
    for (var i = 0; i < p - result.length; i++) {
        str += "0";
    }
    return str + result;
};
exports.BIN2HEX = BIN2HEX;
/**
 * Converts a signed binary number to signed octal format.
 * @param signedBinaryNumber - The signed 10-bit binary value to be converted to signed octal, provided as a
 * string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented
 * in two's complement format.
 * @param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If
 * this is greater than the number of significant digits in the result, the result is left-padded with zeros until the
 * total number of digits reaches significant_digits.
 * @returns {string} number in octal format
 * @constructor
 */
var BIN2OCT = function (signedBinaryNumber, significantDigits) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "BIN2OCT");
    if (typeof TypeConverter_1.TypeConverter.firstValue(signedBinaryNumber) === "boolean") {
        throw new Errors_1.ValueError("Function BIN2OCT parameter 1 expects text values. But '" + signedBinaryNumber + "' is a boolean and cannot be coerced to a text.");
    }
    var n = TypeConverter_1.TypeConverter.firstValueAsString(signedBinaryNumber);
    var p = 10;
    if (significantDigits !== undefined) {
        p = TypeConverter_1.TypeConverter.firstValueAsNumber(significantDigits);
    }
    if (!(/^[01]{1,10}$/).test(n)) {
        throw new Errors_1.NumError("Input for BIN2OCT ('" + n + "') is not a valid binary representation.");
    }
    if (n.length === 10 && n.substring(0, 1) === '1') {
        return (1073741312 + parseInt(n.substring(1), 2)).toString(8);
    }
    if (p < 1 || p > 10) {
        throw new Errors_1.NumError("Function BIN2OCT parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
    }
    p = Math.floor(p);
    var result = parseInt(n.toString(), 2).toString(8);
    if (p === 10) {
        return result;
    }
    if (p >= result.length) {
        var str = "";
        for (var i = 0; i < p - result.length - 1; i++) {
            str += "0";
        }
        return str + result;
    }
};
exports.BIN2OCT = BIN2OCT;
/**
 * Converts a decimal number to signed octal format.
 * @param decimalDumber - The decimal value to be converted to signed octal,provided as a string. For this
 * function, this value has a maximum of 536870911 if positive, and a minimum of -53687092 if negative.
 * @param significantDigits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this
 * is greater than the number of significant digits in the result, the result is left-padded with zeros until the total
 * number of digits reaches significant_digits.
 * @returns {string} octal string representation of the decimal number
 * @constructor
 */
var DEC2OCT = function (decimalDumber, significantDigits) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "DEC2OCT");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(decimalDumber);
    if (n < 0) {
        n = Math.ceil(n);
    }
    if (n > 0) {
        n = Math.floor(n);
    }
    var p = 10;
    var placesPresent = false;
    if (significantDigits !== undefined) {
        p = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(significantDigits));
        placesPresent = true;
    }
    if (n < -53687092 || n > 536870911) {
        throw new Errors_1.NumError("Function DEC2OCT parameter 1 value is " + n + ". Valid values are between -53687092 and 536870911 inclusive.");
    }
    if (p < 1 || p > 10) {
        throw new Errors_1.NumError("Function DEC2OCT parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
    }
    if (n < 0) {
        return (1073741824 + n).toString(8).toUpperCase();
    }
    // Convert decimal number to hexadecimal
    var result = parseInt(n.toString(), 10).toString(8).toUpperCase();
    if (!placesPresent) {
        return result;
    }
    var str = "";
    for (var i = 0; i < p - result.length; i++) {
        str += "0";
    }
    return str + result.toUpperCase();
};
exports.DEC2OCT = DEC2OCT;
/**
 * Converts a decimal number to signed hexadecimal format.
 * @param decimalDumber - The decimal value to be converted to signed hexadecimal, provided as a string. This
 * value has a maximum of 549755813887 if positive, and a minimum of -549755814888 if negative.
 * @param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If
 * this is greater than the number of significant digits in the result, the result is left-padded with zeros until the
 * total number of digits reaches significant_digits. This value is ignored if decimal_number is negative.
 * @returns {string} hexadecimal string representation of the decimal number
 * @constructor
 */
var DEC2HEX = function (decimalDumber, significantDigits) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "DEC2HEX");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(decimalDumber);
    if (n < 0) {
        n = Math.ceil(n);
    }
    if (n > 0) {
        n = Math.floor(n);
    }
    var p = 10;
    var placesPresent = false;
    if (significantDigits !== undefined) {
        p = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(significantDigits));
        placesPresent = true;
    }
    if (n < -549755813888 || n > 549755813887) {
        throw new Errors_1.NumError("Function DEC2HEX parameter 1 value is " + n + ". Valid values are between -549755813888 and 549755813887 inclusive.");
    }
    if (p < 1 || p > 10) {
        throw new Errors_1.NumError("Function DEC2HEX parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
    }
    // Ignore places and return a 10-character hexadecimal number if number is negative
    if (n < 0) {
        return (1099511627776 + n).toString(16).toUpperCase();
    }
    // Convert decimal number to hexadecimal
    var result = parseInt(n.toString(), 10).toString(16).toUpperCase();
    if (!placesPresent) {
        return result;
    }
    var str = "";
    for (var i = 0; i < p - result.length; i++) {
        str += "0";
    }
    return str + result;
};
exports.DEC2HEX = DEC2HEX;
/**
 * Converts a decimal number to signed binary format.
 * @param decimalDumber - The decimal value to be converted to signed binary, provided as a string. For this
 * function, this value has a maximum of 511 if positive, and a minimum of -512 if negative.
 * @param significantDigits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this
 * is greater than the number of significant digits in the result, the result is left-padded with zeros until the total
 * number of digits reaches significant_digits.
 * @returns {string} signed binary string representation of the input decimal number.
 * @constructor
 */
var DEC2BIN = function (decimalDumber, significantDigits) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "DEC2BIN");
    var n = TypeConverter_1.TypeConverter.firstValueAsNumber(decimalDumber);
    if (n < 0) {
        n = Math.ceil(n);
    }
    if (n > 0) {
        n = Math.floor(n);
    }
    if (n === 0 || n === 1) {
        return n.toString();
    }
    var p = 10;
    var placesPresent = false;
    if (significantDigits !== undefined) {
        p = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(significantDigits));
        placesPresent = true;
    }
    if (n < -512 || n > 511) {
        throw new Errors_1.NumError("Function DEC2BIN parameter 1 value is " + n + ". Valid values are between -512 and 511 inclusive.");
    }
    if (p < 1 || p > 10) {
        throw new Errors_1.NumError("Function DEC2BIN parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
    }
    // Ignore places and return a 10-character binary number if number is negative
    if (n < 0) {
        var count = (9 - (512 + n).toString(2).length);
        var st = "";
        for (var i = 0; i < count; i++) {
            st += "0";
        }
        return "1" + st + (512 + n).toString(2);
    }
    // Convert decimal number to binary
    var result = parseInt(n.toString(), 10).toString(2);
    // Pad return value with leading 0s (zeros) if necessary
    if (p >= result.length) {
        var str = "";
        for (var i = 0; i < (p - result.length); i++) {
            str += "0";
        }
        var workingString = str + result;
        if (!placesPresent) {
            var returnString = "";
            for (var i = 0; i < workingString.length; i++) {
                var char = workingString[i];
                if (char === "1") {
                    break;
                }
                returnString = workingString.slice(i + 1);
            }
            return returnString;
        }
        return workingString;
    }
};
exports.DEC2BIN = DEC2BIN;
/**
 * Compare two numeric values, returning 1 if they're equal.
 * @param one - The first number to compare.
 * @param two - The second number to compare.
 * @returns {number} 1 if they're equal, 0 if they're not equal.
 * @constructor
 */
var DELTA = function (one, two) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "DELTA");
    if (two === undefined) {
        return TypeConverter_1.TypeConverter.valueToNumber(one) === 0 ? 1 : 0;
    }
    return TypeConverter_1.TypeConverter.valueToNumber(one) === TypeConverter_1.TypeConverter.valueToNumber(two) ? 1 : 0;
};
exports.DELTA = DELTA;
