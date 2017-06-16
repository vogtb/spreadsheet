import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  NAError
} from "../Errors";


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
  return typeof value === "string";
};


export {
  NA,
  ISTEXT
}