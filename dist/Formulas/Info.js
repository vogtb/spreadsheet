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
 * Returns true if a value is not text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
var ISNONTEXT = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ISNONTEXT");
    return typeof TypeConverter_1.TypeConverter.firstValue(value) !== "string";
};
exports.ISNONTEXT = ISNONTEXT;
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
/**
 * Returns true if value or reference is a number.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
var ISNUMBER = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ISNUMBER");
    return typeof TypeConverter_1.TypeConverter.firstValue(value) === "number";
};
exports.ISNUMBER = ISNUMBER;
/**
 * Returns true if input is a valid email. Valid domains are Original top-level domains and Country code top-level
 * domains.
 * @param value - Value to check whether it is an email or not.
 * @returns {boolean}
 * @constructor
 */
var ISEMAIL = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ISEMAIL");
    if (typeof value !== "string") {
        return false;
    }
    var EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|edu|int|biz|info|mobi|name|aero|jobs|museum|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/;
    return EMAIL_REGEX.test(TypeConverter_1.TypeConverter.firstValueAsString(value));
};
exports.ISEMAIL = ISEMAIL;
/**
 * Returns true if the input is a valid URL.
 * @param value - Value to check
 * @returns {boolean}
 * @constructor
 */
var ISURL = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "ISURL");
    value = TypeConverter_1.TypeConverter.firstValueAsString(value);
    var matches = value.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
    if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value)) {
        return false;
    }
    if (/%[^0-9a-f]/i.test(value)) {
        return false;
    }
    if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value)) {
        return false;
    }
    var authority = matches[2];
    var path = matches[3];
    if (!(path.length >= 0)) {
        return false;
    }
    if (authority && authority.length) {
        if (!(path.length === 0 || /^\//.test(path))) {
            return false;
        }
    }
    else {
        if (/^\/\//.test(path)) {
            return false;
        }
    }
    return true;
};
exports.ISURL = ISURL;
/**
 * Returns the value as a number.
 * @param value - value to return.
 * @returns {number}
 * @constructor
 */
var N = function (value) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "N");
    return TypeConverter_1.TypeConverter.firstValueAsNumber(value);
};
exports.N = N;
