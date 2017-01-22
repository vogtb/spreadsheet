import { CellError } from "../Errors"
import * as ERRORS from "../Errors"

/**
 * Checks to see if the arguments are of the correct length.
 * @param args to check length of
 * @param length expected length
 */
function checkArgumentsLength(args: any, length: number) {
  if (args.length !== length) {
    throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ABS. Expected 1 arguments, but got " + args.length + " arguments.");
  }
}

/**
 * Checks to see if the arguments are at least a certain length.
 * @param args to check length of
 * @param length expected length
 */
function checkArgumentsAtLeastLength(args: any, length: number) {
  if (args.length < length) {
    throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ABS. Expected 1 arguments, but got " + args.length + " arguments.");
  }
}

/**
 * Filter out all strings from an array.
 * @param arr to filter
 * @returns {Array} filtered array
 */
function filterOutStringValues(arr: Array<any>) : Array<any> {
  var toReturn = [];
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string") {
      toReturn.push(arr[i]);
    }
  }
  return toReturn;
}

/**
 * Convert a value to string.
 * @param value of any type, including array. array cannot be empty.
 * @returns {string} string representation of value
 */
function valueToString(value: any) : string {
  if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "boolean") {
    return value ? "TRUE" : "FALSE";
  } else if (value instanceof Array) {
    return valueToString(value[0]);
  }
}


/**
 * Converts any value to a number or throws an error if it cannot coerce it to the number type
 * @param value to convert
 * @returns {number} to return. Will always return a number or throw an error. Never returns undefined.
 */
function valueToNumber(value: any) : number {
  if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    if (value.indexOf(".") > -1) {
      var fl = parseFloat(value);
      if (isNaN(fl)) {
        throw new CellError(ERRORS.VALUE_ERROR, "Function ____ expects number values, but is text and cannot be coerced to a number.");
      }
      return fl;
    }
    var fl = parseInt(value);
    if (isNaN(fl)) {
      throw new CellError(ERRORS.VALUE_ERROR, "Function ____ expects number values, but is text and cannot be coerced to a number.");
    }
    return fl;
  } else if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return 0;
}


export {
  valueToNumber,
  valueToString,
  filterOutStringValues,
  checkArgumentsAtLeastLength,
  checkArgumentsLength
}