import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  NAError
} from "../Errors";
import {
  TypeConverter
} from "../Utilities/TypeConverter";


/**
 * Returns the "value not available" error, "#N/A".
 * @constructor
 */
var NA = function () {
  ArgsChecker.checkLength(arguments, 1, "NA");
  throw new NAError("NA Error thrown.");
};


/**
 * Returns true if a value is text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
var ISTEXT =  function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISTEXT");
  return typeof TypeConverter.firstValue(value) === "string";
};


/**
 * Returns true if value is a boolean (FALSE, or TRUE). Numerical and text values return false.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
var ISLOGICAL = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISLOGICAL");
  return typeof TypeConverter.firstValue(value) === "boolean";
};


/**
 * Returns true if value or reference is a number.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
var ISNUMBER = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISNUMBER");
  return typeof TypeConverter.firstValue(value) === "number";
};


export {
  NA,
  ISTEXT,
  ISLOGICAL,
  ISNUMBER
}