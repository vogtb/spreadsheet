"use strict";
exports.__esModule = true;
var Errors_1 = require("../Errors");
/**
 * Static class to check argument length within expected ranges when calling functions.
 */
var ArgsChecker = /** @class */ (function () {
    function ArgsChecker() {
    }
    /**
     * Checks to see if the arguments are of the correct length.
     * @param args to check length of
     * @param length expected length
     * @param caller name of the function calling this function, for use in error message formatting
     */
    ArgsChecker.checkLength = function (args, length, caller) {
        if (args.length !== length) {
            var functionName = caller !== undefined ? " to " + caller : "";
            throw new Errors_1.NAError("Wrong number of arguments" + functionName + ". Expected " + length
                + " arguments, but got " + args.length + " arguments.");
        }
    };
    /**
     * Checks to see if the arguments are at least a certain length.
     * @param args to check length of
     * @param length expected length
     * @param caller name of the function calling this function, for use in error message formatting
     */
    ArgsChecker.checkAtLeastLength = function (args, length, caller) {
        if (args.length < length) {
            var functionName = caller !== undefined ? " to " + caller : "";
            throw new Errors_1.NAError("Wrong number of arguments" + functionName + ". Expected " + length
                + " arguments, but got " + args.length + " arguments.");
        }
    };
    /**
     * Checks to see if the arguments are within a max and min, inclusively
     * @param args to check length of
     * @param low least number of arguments
     * @param high max number of arguments
     * @param caller name of the function calling this function, for use in error message formatting
     */
    ArgsChecker.checkLengthWithin = function (args, low, high, caller) {
        if (args.length > high || args.length < low) {
            var functionName = caller !== undefined ? " to " + caller : "";
            throw new Errors_1.NAError("Wrong number of arguments" + functionName + ". Expected between " + low
                + " and " + high + " arguments, but got " + args.length + " arguments.");
        }
    };
    return ArgsChecker;
}());
exports.ArgsChecker = ArgsChecker;
