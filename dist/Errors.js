"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var NULL_ERROR = "#NULL!";
exports.NULL_ERROR = NULL_ERROR;
var DIV_ZERO_ERROR = "#DIV/0!";
exports.DIV_ZERO_ERROR = DIV_ZERO_ERROR;
var VALUE_ERROR = "#VALUE!";
exports.VALUE_ERROR = VALUE_ERROR;
var REF_ERROR = "#REF!";
exports.REF_ERROR = REF_ERROR;
var NAME_ERROR = "#NAME!";
exports.NAME_ERROR = NAME_ERROR;
var NUM_ERROR = "#NUM!";
exports.NUM_ERROR = NUM_ERROR;
var NA_ERROR = "#N/A";
exports.NA_ERROR = NA_ERROR;
var PARSE_ERROR = "#ERROR";
exports.PARSE_ERROR = PARSE_ERROR;
/**
 * Execution or parsing produced a null value, or intersection of ranges produced zero cells.
 */
var NullError = /** @class */ (function (_super) {
    __extends(NullError, _super);
    function NullError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = NULL_ERROR;
        return _this;
    }
    return NullError;
}(Error));
exports.NullError = NullError;
/**
 * Attempt to divide by zero, including division by an empty cell.
 */
var DivZeroError = /** @class */ (function (_super) {
    __extends(DivZeroError, _super);
    function DivZeroError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = DIV_ZERO_ERROR;
        return _this;
    }
    return DivZeroError;
}(Error));
exports.DivZeroError = DivZeroError;
/**
 * Parameter is wrong type, or value is incompatible, or cannot be parsed, converted, or manipulated.
 */
var ValueError = /** @class */ (function (_super) {
    __extends(ValueError, _super);
    function ValueError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = VALUE_ERROR;
        return _this;
    }
    return ValueError;
}(Error));
exports.ValueError = ValueError;
/**
 * Reference to invalid cell, range, or empty range.
 */
var RefError = /** @class */ (function (_super) {
    __extends(RefError, _super);
    function RefError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = REF_ERROR;
        return _this;
    }
    return RefError;
}(Error));
exports.RefError = RefError;
/**
 * Unrecognized/deleted name.
 */
var NameError = /** @class */ (function (_super) {
    __extends(NameError, _super);
    function NameError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = NAME_ERROR;
        return _this;
    }
    return NameError;
}(Error));
exports.NameError = NameError;
/**
 * Failed to meet domain constraints (e.g., input number too high or too low).
 */
var NumError = /** @class */ (function (_super) {
    __extends(NumError, _super);
    function NumError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = NUM_ERROR;
        return _this;
    }
    return NumError;
}(Error));
exports.NumError = NumError;
/**
 * Lookup functions which failed and NA() return this value.
 */
var NAError = /** @class */ (function (_super) {
    __extends(NAError, _super);
    function NAError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = NA_ERROR;
        return _this;
    }
    return NAError;
}(Error));
exports.NAError = NAError;
/**
 * Input could not be parsed.
 */
var ParseError = /** @class */ (function (_super) {
    __extends(ParseError, _super);
    function ParseError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = PARSE_ERROR;
        return _this;
    }
    return ParseError;
}(Error));
exports.ParseError = ParseError;
/**
 * Constructs an error by error name.
 * @param {string} name - Name of error. If not one of DIV_ZERO_ERROR, NULL_ERROR, VALUE_ERROR, REF_ERROR, NAME_ERROR,
 * NUM_ERROR,NA_ERROR, or PARSE_ERROR, will default to ParseError.
 * @param {string} msg - Message for error, will default to empty string.
 * @returns {Error}
 */
function constructErrorByName(name, msg) {
    msg = msg || "";
    switch (name) {
        case DIV_ZERO_ERROR:
            return new DivZeroError(msg);
        case NULL_ERROR:
            return new NullError(msg);
        case VALUE_ERROR:
            return new ValueError(msg);
        case REF_ERROR:
            return new RefError(msg);
        case NAME_ERROR:
            return new NameError(msg);
        case NA_ERROR:
            return new NAError(msg);
        case NUM_ERROR:
            return new NumError(msg);
        default:
            return new ParseError(msg);
    }
}
exports.constructErrorByName = constructErrorByName;
