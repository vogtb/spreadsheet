import {
  ArgsChecker,
  TypeCaster
} from "./Utils";
import { CellError } from "../Errors"
import * as ERRORS from "../Errors"

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

/**
 * Converts a signed binary number to decimal format.
 * @param values[0] signed_binary_number - The signed 10-bit binary value to be converted to decimal, provided as a
 * string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented
 * in two's complement format.
 * @returns {number}
 * @constructor
 */
var BIN2DEC = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  if (typeof TypeCaster.firstValue(values[0]) === "boolean") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function BIN2DEC parameter 1 expects text values. But '" + values[0] + "' is a boolean and cannot be coerced to a text.");
  }
  var n = TypeCaster.firstValueAsString(values[0]);
  if (!(/^[01]{1,10}$/).test(n)) {
    throw new CellError(ERRORS.NUM_ERROR, "Input for BIN2DEC ('"+n+"') is not a valid binary representation.");
  }

  if (n.length === 10 && n.substring(0, 1) === '1') {
    return parseInt(n.substring(1), 2) - 512;
  }
  return parseInt(n, 2);
};


/**
 * Converts a signed binary number to signed hexadecimal format.
 * @param values[0] signed_binary_number - The signed 10-bit binary value to be converted to signed hexadecimal,
 * provided as a string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are
 * represented in two's complement format.
 * @param values[1] significant_digits - [ OPTIONAL ] - The number of significant digits to ensure in the result.
 * @returns {string} string representation of a signed hexadecimal
 * @constructor
 */
var BIN2HEX = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  if (typeof TypeCaster.firstValue(values[0]) === "boolean") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function BIN2HEX parameter 1 expects text values. But '" + values[0] + "' is a boolean and cannot be coerced to a text.");
  }
  var n = TypeCaster.firstValueAsString(values[0]);
  var p = 10;
  if (values.length === 2) {
    p = TypeCaster.firstValueAsNumber(values[1]);
  }
  if (!(/^[01]{1,10}$/).test(n)) {
    throw new CellError(ERRORS.NUM_ERROR, "Input for BIN2HEX ('"+n+"') is not a valid binary representation.");
  }

  if (n.length === 10 && n.substring(0, 1) === '1') {
    return (1099511627264 + parseInt(n.substring(1), 2)).toString(16).toUpperCase();
  }

  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function BIN2HEX parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }
  p = Math.floor(p);
  // Convert decimal number to hexadecimal
  var result = parseInt(n.toString(), 2).toString(16).toUpperCase();
  if (p === 10) {
    return result;
  }
  var str = "";
  for (var i = 0; i < p - result.length; i++) {
    str += "0";
  }
  return str + result;
};


/**
 * Converts a signed binary number to signed octal format.
 * @param values[0] signed_binary_number - The signed 10-bit binary value to be converted to signed octal, provided as a
 * string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented
 * in two's complement format.
 * @param values[1] significant_digits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If
 * this is greater than the number of significant digits in the result, the result is left-padded with zeros until the
 * total number of digits reaches significant_digits.
 * @returns {string} number in octal format
 * @constructor
 */
var BIN2OCT = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  if (typeof TypeCaster.firstValue(values[0]) === "boolean") {
    throw new CellError(ERRORS.VALUE_ERROR, "Function BIN2OCT parameter 1 expects text values. But '" + values[0] + "' is a boolean and cannot be coerced to a text.");
  }
  var n = TypeCaster.firstValueAsString(values[0]);
  var p = 10;
  if (values.length === 2) {
    p = TypeCaster.firstValueAsNumber(values[1]);
  }
  if (!(/^[01]{1,10}$/).test(n)) {
    throw new CellError(ERRORS.NUM_ERROR, "Input for BIN2OCT ('"+n+"') is not a valid binary representation.");
  }

  if (n.length === 10 && n.substring(0, 1) === '1') {
    return (1073741312 + parseInt(n.substring(1), 2)).toString(8);
  }

  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function BIN2OCT parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }
  p = Math.floor(p);
  var result = parseInt(n.toString(), 2).toString(8);
  if (p === 10) {
    return result;
  }
  if (p >= result.length) {
    var str = "";
    for (var i = 0; i < p - result.length - 1; i++) {
      str += "0";
    }
    return str + result;
  }
};

/**
 * Converts a decimal number to signed octal format.
 * @param values[0] decimal_number - The decimal value to be converted to signed octal,provided as a string. For this
 * function, this value has a maximum of 536870911 if positive, and a minimum of -53687092 if negative.
 * @param values[1] significant_digits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this
 * is greater than the number of significant digits in the result, the result is left-padded with zeros until the total
 * number of digits reaches significant_digits.
 * @returns {string} octal string representation of the decimal number
 * @constructor
 */
var DEC2OCT = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (n < 0) {
    n = Math.ceil(n);
  }
  if (n > 0) {
    n = Math.floor(n);
  }
  var p = 10;
  var placesPresent = false;
  if (values.length === 2) {
    p = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
    placesPresent = true;
  }
  if (n < -53687092 || n > 536870911) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2OCT parameter 1 value is " + n + ". Valid values are between -53687092 and 536870911 inclusive.");
  }
  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2OCT parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }
  if (n < 0) {
    return (1073741824 + n).toString(8).toUpperCase();
  }

  // Convert decimal number to hexadecimal
  var result = parseInt(n.toString(), 10).toString(8).toUpperCase();
  if (!placesPresent) {
    return result;
  }
  var str = "";
  for (var i = 0; i < p - result.length; i++) {
    str += "0";
  }
  return str + result.toUpperCase();
};


/**
 * Converts a decimal number to signed hexadecimal format.
 * @param values[0] decimal_number - The decimal value to be converted to signed hexadecimal, provided as a string. This
 * value has a maximum of 549755813887 if positive, and a minimum of -549755814888 if negative.
 * @param values[1] significant_digits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If
 * this is greater than the number of significant digits in the result, the result is left-padded with zeros until the
 * total number of digits reaches significant_digits. This value is ignored if decimal_number is negative.
 * @returns {string} hexadecimal string representation of the decimal number
 * @constructor
 */
var DEC2HEX = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (n < 0) {
    n = Math.ceil(n);
  }
  if (n > 0) {
    n = Math.floor(n);
  }
  var p = 10;
  var placesPresent = false;
  if (values.length === 2) {
    p = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
    placesPresent = true;
  }
  if (n < -549755813888 || n > 549755813887) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2HEX parameter 1 value is " + n + ". Valid values are between -549755813888 and 549755813887 inclusive.");
  }
  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2HEX parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }
  // Ignore places and return a 10-character hexadecimal number if number is negative
  if (n < 0) {
    return (1099511627776 + n).toString(16).toUpperCase();
  }

  // Convert decimal number to hexadecimal
  var result = parseInt(n.toString(), 10).toString(16).toUpperCase();
  if (!placesPresent) {
    return result;
  }
  var str = "";
  for (var i = 0; i < p - result.length; i++) {
    str += "0";
  }
  return str + result;
};

/**
 * Converts a decimal number to signed binary format.
 * @param values[0] decimal_number - The decimal value to be converted to signed binary, provided as a string. For this
 * function, this value has a maximum of 511 if positive, and a minimum of -512 if negative.
 * @param values[1] significant_digits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this
 * is greater than the number of significant digits in the result, the result is left-padded with zeros until the total
 * number of digits reaches significant_digits.
 * @returns {string} signed binary string representation of the input decimal number.
 * @constructor
 */
var DEC2BIN = function (...values) : string {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var n = TypeCaster.firstValueAsNumber(values[0]);
  if (n < 0) {
    n = Math.ceil(n);
  }
  if (n > 0) {
    n = Math.floor(n);
  }
  if (n === 0 || n === 1) {
    return n.toString();
  }
  var p = 10;
  var placesPresent = false;
  if (values.length === 2) {
    p = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
    placesPresent = true;
  }

  if (n < -512 || n > 511) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2BIN parameter 1 value is " + n + ". Valid values are between -512 and 511 inclusive.");
  }
  if (p < 1 || p > 10) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DEC2BIN parameter 2 value is " + p + ". Valid values are between 1 and 10 inclusive.");
  }

  // Ignore places and return a 10-character binary number if number is negative
  if (n < 0) {
    var count = (9 - (512 + n).toString(2).length);
    var st = "";
    for (var i = 0; i < count; i++) {
      st += "0";
    }
    return "1" + st + (512 + n).toString(2);
  }

  // Convert decimal number to binary
  var result = parseInt(n.toString(), 10).toString(2);

  // Pad return value with leading 0s (zeros) if necessary
  if (p >= result.length) {
    var str = "";
    for (var i = 0; i < (p - result.length); i++) {
      str += "0";
    }
    var workingString = str + result;
    if (!placesPresent) {
      var returnString = "";
      for (var i = 0; i < workingString.length; i++) {
        var char = workingString[i];
        if (char === "1") {
          break;
        }
        returnString = workingString.slice(i+1);
      }
      return returnString;
    }
    return workingString;
  }
};


export {
  CHAR, // Text
  CODE, // Text
  SPLIT, // Text
  CONCATENATE, // Text
  BIN2DEC, // Engineering
  BIN2HEX, // Engineering
  BIN2OCT, // Engineering
  DEC2BIN, // Engineering
  DEC2HEX, // Engineering
  DEC2OCT // Engineering
}