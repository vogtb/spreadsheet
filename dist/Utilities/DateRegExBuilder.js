"use strict";
exports.__esModule = true;
/**
 * Build a regular expression step by step, to make it easier to build and read the resulting regular expressions.
 */
var DateRegExBuilder = /** @class */ (function () {
    function DateRegExBuilder() {
        this.regexString = "";
    }
    DateRegExBuilder.DateRegExBuilder = function () {
        return new DateRegExBuilder();
    };
    /**
     * Start the regular expression builder by matching the start of a line and zero or more spaces.
     * @returns {DateRegExBuilder} builder
     */
    DateRegExBuilder.prototype.start = function () {
        this.regexString += "^" + DateRegExBuilder.ZERO_OR_MORE_SPACES;
        return this;
    };
    /**
     * End the regular expression builder by matching the end of the line.
     * @returns {DateRegExBuilder} builder
     */
    DateRegExBuilder.prototype.end = function () {
        this.regexString += "$";
        return this;
    };
    /**
     * Capture all month full name and short names to the regular expression.
     * @returns {DateRegExBuilder} builder
     */
    DateRegExBuilder.prototype.MONTHNAME = function () {
        this.regexString += "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)";
        return this;
    };
    /**
     * Capture all month full name and short names to the regular expression, in addition to any followed by one or more
     * spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.MONTHNAME_W_SPACE = function () {
        this.regexString += "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec|january\\s+|february\\s+|march\\s+|april\\s+|may\\s+|june\\s+|july\\s+|august\\s+|september\\s+|october\\s+|november\\s+|december\\s+|jan\\s+|feb\\s+|mar\\s+|apr\\s+|jun\\s+|jul\\s+|aug\\s+|sep\\s+|oct\\s+|nov\\s+|dec\\s+)";
        return this;
    };
    /**
     * Add capture group for optionally capturing day names.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.OPTIONAL_DAYNAME = function () {
        this.regexString += "(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)?";
        return this;
    };
    /**
     * Add capture group for optionally capturing a comma followed by one or more spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.OPTIONAL_COMMA = function () {
        this.regexString += "(,?\\s+)?";
        return this;
    };
    /**
     * Add capture group for capturing month digits between 01 and 12, inclusively.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.MM = function () {
        this.regexString += "([1-9]|0[1-9]|1[0-2])";
        return this;
    };
    /**
     * Add capture group for capturing month digits between 01 and 12, inclusively, in addition to any followed by one or
     * more spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.MM_W_SPACE = function () {
        this.regexString += "([1-9]|0[1-9]|1[0-2]|[1-9]\\s+|0[1-9]\\s+|1[0-2]\\s+)";
        return this;
    };
    /**
     * Add capture group for capturing day digits between 01 and 31, inclusively.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.DD = function () {
        this.regexString += "(0?[0-9]|1[0-9]|2[0-9]|3[0-1])";
        return this;
    };
    /**
     * Add capture group for capturing day digits between 01 and 31, inclusively, in addition to any followed by one or
     * more spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.DD_W_SPACE = function () {
        this.regexString += "(0?[0-9]|1[0-9]|2[0-9]|3[0-1]|0?[0-9]\\s+|1[0-9]\\s+|2[0-9]\\s+|3[0-1]\\s+)";
        return this;
    };
    /**
     * Add capture group for capturing 4 digits or 3 digits starting with 0-9.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.YYYY = function () {
        this.regexString += "([0-9]{4}|[1-9][0-9][0-9])";
        return this;
    };
    /**
     * Add capture group for capturing 1 through 4 digits.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.YYYY14 = function () {
        this.regexString += "([0-9]{1,4})";
        return this;
    };
    /**
     * Add capture group for capturing 1 through 4 digits, in addition to any followed by one or more spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.YYYY14_W_SPACE = function () {
        this.regexString += "([0-9]{1,4}|[0-9]{1,4}\\s+)";
        return this;
    };
    DateRegExBuilder.prototype.YYYY2_OR_4_W_SPACE = function () {
        this.regexString += "([0-9]{2}|[0-9]{4}|[0-9]{2}\\s+|[0-9]{4}\\s+)";
        return this;
    };
    /**
     * Add capture group for a flexible delimiter, including ", ", " ", ". ", "\", "-".
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.FLEX_DELIMITER = function () {
        // this.regexString += "(,?\\s+|\\s*-?\\.?-?\\/?\\s+)";// close to being right
        this.regexString += "(,?\\s+|\\s*\\.\\s+|\\s*-\\s*|\\s*\\/\\s*)";
        return this;
    };
    /**
     * Add capture group for a flexible delimiter, including ", ", " ", ".", "\", "-". Different from FLEX_DELIMITER
     * in that it will match periods with zero or more spaces on either side.
     * For reference: https://regex101.com/r/q1fp1z/1/
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.FLEX_DELIMITER_LOOSEDOT = function () {
        // this.regexString += "(,?\\s+|\\s*-?\\.?-?\\/?\\s+)";// close to being right
        this.regexString += "(,?\\s+|\\s*\\.\\s*|\\s*-\\s*|\\s*\\/\\s*)";
        return this;
    };
    /**
     * Add an optional capture group for capturing timestamps including: "10am", "10:10", "10:10pm", "10:10:10",
     * "10:10:10am", along with zero or more spaces after semi colons, AM or PM, and unlimited number of digits per unit.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.OPTIONAL_TIMESTAMP_CAPTURE_GROUP = function () {
        this.regexString += "((\\s+[0-9]+\\s*am\\s*$|[0-9]+\\s*pm\\s*$)|(\\s+[0-9]+:\\s*[0-9]+\\s*$)|(\\s+[0-9]+:\\s*[0-9]+\\s*am\\s*$|\\s+[0-9]+:\\s*[0-9]+\\s*pm\\s*$)|(\\s+[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*$)|(\\s+[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*am\\s*$|[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*pm\\s*$))?";
        return this;
    };
    /**
     * Add a capture group for capturing timestamps including: "10am", "10:10", "10:10pm", "10:10:10",
     * "10:10:10am", along with zero or more spaces after semi colons, AM or PM, and unlimited number of digits per unit.
     * See https://regex101.com/r/0bmj5n/1/ for more information of 9-digit maximum. One series, "12:00001989198298am",
     * has a maximum of 10 digits: "0*(?:[1-9]{1}[0-9]{0,9})?"
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DateRegExBuilder.prototype.TIMESTAMP_UNITS_CAPTURE_GROUP = function () {
        this.regexString += "(\\s*(0*(?:[1-9]{1}[0-9]{0,8})?)()()\\s*(am|pm)\\s*$)|(\\s*(0*(?:[1-9]{1}[0-9]{0,8})?):\\s*(0*(?:[1-9]{1}[0-9]{0,8})?)()()\\s*$)|(\\s*((0*(?:[1-9]{1}[0-9]{0,8})?):\\s*(0*(?:[1-9]{1}[0-9]{0,9})?)()\\s*(am|pm))\\s*$)|(\\s*((0*(?:[1-9]{1}[0-9]{0,8})?):\\s*(0*(?:[1-9]{1}[0-9]{0,8})?):\\s*(0*(?:[1-9]{1}[0-9]{0,8})?)())\\s*$)|(\\s*((0*(?:[1-9]{1}[0-9]{0,8})?):\\s*(0*(?:[1-9]{1}[0-9]{0,8})?):\\s*(0*(?:[1-9]{1}[0-9]{0,8})?)\\s*(am|pm))\\s*$)";
        return this;
    };
    /**
     * Build the regular expression and ignore case.
     * @returns {RegExp}
     */
    DateRegExBuilder.prototype.build = function () {
        return new RegExp(this.regexString, 'i');
    };
    DateRegExBuilder.ZERO_OR_MORE_SPACES = "\\s*";
    return DateRegExBuilder;
}());
exports.DateRegExBuilder = DateRegExBuilder;
