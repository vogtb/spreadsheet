"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var Errors_1 = require("../Errors");
/**
 * Returns the "value not available" error, "#N/A".
 * @constructor
 */
var NA = function () {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "NA");
    throw new Errors_1.NAError("NA Error thrown.");
};
exports.NA = NA;
