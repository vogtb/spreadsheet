import { firstValueAsNumber, checkArgumentsLength, firstValueAsString } from "./Utils"
import { CellError } from "../Errors"
import * as ERRORS from "../Errors"

/**
 * Convert a number into a character according to the current Unicode table.
 * @param values[0] The number of the character to look up from the current Unicode table in decimal format.
 * @returns {string} character corresponding to Unicode number
 * @constructor
 */
var CHAR = function (...values) : string {
  checkArgumentsLength(values, 1);
  var n = firstValueAsNumber(values[0]);
  if (n < 1 || n > 1114112) { //limit
    throw new CellError(ERRORS.NUM_ERROR, "Function CHAR parameter 1 value " + n + " is out of range.");
  }
  return String.fromCharCode(n);
};

/**
 * Returns the numeric Unicode map value of the first character in the string provided.
 * @param values[0] The string whose first character's Unicode map value will be returned.
 * @returns {number} number of the first character's Unicode value
 * @constructor
 */
var CODE = function (...values) : number {
  checkArgumentsLength(values, 1);
  var text = firstValueAsString(values[0]);
  if (text === "") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function CODE parameter 1 value should be non-empty.");
  }
  return text.charCodeAt(0);
};

export {
  CHAR,
  CODE
}