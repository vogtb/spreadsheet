import {
  ArgsChecker,
  TypeCaster
} from "./Utils";
import {
  CellError
} from "../Errors";
import * as ERRORS from "../Errors";

/**
 * Computes the value of a Roman numeral.
 * @param text The Roman numeral to format, whose value must be between 1 and 3999, inclusive.
 * @returns {number} value in integer format
 * @constructor
 */
var ARABIC = function (text?) {
  ArgsChecker.checkLength(arguments, 1);
  if (typeof text !== "string") {
    throw new CellError(ERRORS.VALUE_ERROR, 'Invalid roman numeral in ARABIC evaluation.');
  }
  var negative = false;
  if (text[0] === "-") {
    negative = true;
    text = text.substr(1);
  }
  // Credits: Rafa? Kukawski
  if (!/^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/.test(text)) {
    throw new CellError(ERRORS.VALUE_ERROR, 'Invalid roman numeral in ARABIC evaluation.');
  }
  var r = 0;
  text.replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
    r += {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1}[i];
  });
  if (negative) {
    return r * -1;
  }
  return r;
};

/**
 * Convert a number into a character according to the current Unicode table.
 * @param values[0] The number of the character to look up from the current Unicode table in decimal format.
 * @returns {string} character corresponding to Unicode number
 * @constructor
 */
var CHAR = function (...values) : string {
  ArgsChecker.checkLength(values, 1);
  var n = TypeCaster.firstValueAsNumber(values[0]);
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
  ArgsChecker.checkLength(values, 1);
  var text = TypeCaster.firstValueAsString(values[0]);
  if (text === "") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function CODE parameter 1 value should be non-empty.");
  }
  return text.charCodeAt(0);
};

/**
 * Divides text around a specified character or string, and puts each fragment into a separate cell in the row.
 * @param values[0] text - The text to divide.
 * @param values[1] delimiter - The character or characters to use to split text.
 * @param values[2] split_by_each - [optional] Whether or not to divide text around each character contained in
 * delimiter.
 * @returns {Array<string>} containing the split
 * @constructor
 * TODO: At some point this needs to return a more complex type than Array. Needs to return a type that has a dimension.
 */
var SPLIT = function (...values) : Array<string> {
  ArgsChecker.checkLengthWithin(values, 2, 3);
  var text = TypeCaster.firstValueAsString(values[0]);
  var delimiter = TypeCaster.firstValueAsString(values[1]);
  var splitByEach = false;
  if (values.length === 3) {
    splitByEach = TypeCaster.firstValueAsBoolean(values[2]);
  }
  if (splitByEach) {
    var result = [text];
    for (var i = 0; i < delimiter.length; i++) {
      var char = delimiter[i];
      var subResult = [];
      for (var x = 0; x < result.length; x++) {
        subResult = subResult.concat(result[x].split(char));
      }
      result = subResult;
    }
    return result.filter(function (val) {
      return val.trim() !== "";
    });
  } else {
    return text.split(delimiter);
  }
};

/**
 * Appends strings to one another.
 * @param values to append to one another. Must contain at least one value
 * @returns {string} concatenated string
 * @constructor
 */
var CONCATENATE = function (...values) : string {
  ArgsChecker.checkAtLeastLength(values, 1);
  var string = '';
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      string += CONCATENATE.apply(this, arguments[i]);
    } else {
      string += TypeCaster.valueToString(values[i]);
    }
  }
  return string;
};

export {
  ARABIC,
  CHAR,
  CODE,
  SPLIT,
  CONCATENATE
}