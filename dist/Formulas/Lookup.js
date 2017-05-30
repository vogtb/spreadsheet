"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var Errors_1 = require("../Errors");
var TypeConverter_1 = require("../Utilities/TypeConverter");
/**
 * Returns an element from a list of choices based on index.
 * @param index - Which choice to return.
 * @param values -  Array of potential value to return. Required. May be a reference to a cell or an individual value.
 * @constructor
 * TODO: This does not currently work with the parser. See TODO.md for more information.
 */
var CHOOSE = function (index) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 2, "NA");
    var i = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(index));
    if (i < 1 || i > values.length) {
        throw new Errors_1.NumError("Function CHOOSE parameter 1 value is " + i + ". Valid values are between 1 and "
            + (values.length) + " inclusive.");
    }
    return values[i - 1];
};
exports.CHOOSE = CHOOSE;
