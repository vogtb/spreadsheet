"use strict";
exports.__esModule = true;
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var Errors_1 = require("../Errors");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Filter_1 = require("../Utilities/Filter");
/**
 * Returns an element from a list of choices based on index.
 * @param index - Which choice to return. Index starts at 1.
 * @param values -  Array of potential value to return. Required. May be a reference to a cell or an individual value.
 * @constructor
 */
var CHOOSE = function (index) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    ArgsChecker_1.ArgsChecker.checkAtLeastLength(arguments, 2, "CHOOSE");
    var i = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(index));
    var data = Filter_1.Filter.flattenAndThrow(values);
    if (i < 1 || i > data.length) {
        throw new Errors_1.NumError("Function CHOOSE parameter 1 value is " + i + ". Valid values are between 1 and "
            + (data.length) + " inclusive.");
    }
    return data[i - 1];
};
exports.CHOOSE = CHOOSE;
var ADDRESS = function (row, column, absoluteVsRelativeMode, useA1Notation, sheet) {
    if (absoluteVsRelativeMode === void 0) { absoluteVsRelativeMode = 1; }
    if (useA1Notation === void 0) { useA1Notation = true; }
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 5, "ADDRESS");
    row = TypeConverter_1.TypeConverter.firstValueAsNumber(row);
    column = TypeConverter_1.TypeConverter.firstValueAsNumber(column);
    absoluteVsRelativeMode = TypeConverter_1.TypeConverter.firstValueAsNumber(absoluteVsRelativeMode);
    useA1Notation = TypeConverter_1.TypeConverter.firstValueAsBoolean(useA1Notation);
    sheet = (sheet === undefined) ? sheet : TypeConverter_1.TypeConverter.firstValueAsString(sheet);
    function calculateColumnLetters(n) {
        n--; // ensuring 1-indexed.
        var ordA = 'a'.charCodeAt(0);
        var ordZ = 'z'.charCodeAt(0);
        var len = ordZ - ordA + 1;
        var s = "";
        while (n >= 0) {
            s = String.fromCharCode(n % len + ordA) + s;
            n = Math.floor(n / len) - 1;
        }
        return s.toUpperCase();
    }
    if (row < 1) {
        throw new Errors_1.ValueError("Function ADDRESS parameter 1 value is " + row
            + ", but it should be greater than or equal to 1.");
    }
    if (column < 1) {
        throw new Errors_1.ValueError("Function ADDRESS parameter 2 value is " + column
            + ", but it should be greater than or equal to 1.");
    }
    if (absoluteVsRelativeMode > 4 || absoluteVsRelativeMode < 1) {
        throw new Errors_1.NumError("Function ADDRESS parameter 3 value is " + absoluteVsRelativeMode
            + ", while valid values are between 1 and 4 inclusively");
    }
    var cellNotation = "";
    if (useA1Notation) {
        var columnLetter = calculateColumnLetters(column);
        switch (absoluteVsRelativeMode) {
            // 1 is row and column absolute (e.g. $A$1)
            case 1:
                cellNotation = cellNotation + "$" + columnLetter + "$" + row.toString();
                break;
            // 2 is row absolute and column relative (e.g. A$1)
            case 2:
                cellNotation = cellNotation + columnLetter + "$" + row.toString();
                break;
            // 3 is row relative and column absolute (e.g. $A1)
            case 3:
                cellNotation = cellNotation + "$" + columnLetter + row.toString();
                break;
            // 4 is row and column relative (e.g. A1).
            case 4:
                cellNotation = cellNotation + columnLetter + row.toString();
                break;
        }
    }
    else {
        switch (absoluteVsRelativeMode) {
            // 1 is row and column absolute (e.g. R1C1)
            case 1:
                cellNotation = "R" + row.toString() + "C" + column.toString();
                break;
            // 2 is row absolute and column relative (e.g. R1C[1])
            case 2:
                cellNotation = "R" + row.toString() + "C[" + column.toString() + "]";
                break;
            // 3 is row relative and column absolute (e.g. R[1]C1)
            case 3:
                cellNotation = "R[" + row.toString() + "]C" + column.toString();
                break;
            // 4 is row and column relative (e.g. R[1]C[1]).
            case 4:
                cellNotation = "R[" + row.toString() + "]C[" + column.toString() + "]";
                break;
        }
    }
    if (sheet !== undefined) {
        // If the sheet name contains non-alpha numeric characters, wrap it in single-quotes.
        // Safe sheet name examples: 'sheet_one', 'sheetone'.
        // Unsafe sheet name examples: '_one', '12345sheet', 'sheet 1'.
        if (sheet.match(/^[a-zA-Z]+[a-zA-Z0-9_]*$/) === null) {
            return "'" + sheet + "'!" + cellNotation;
        }
        return sheet + "!" + cellNotation;
    }
    else {
        return cellNotation;
    }
};
exports.ADDRESS = ADDRESS;
