import { CellError } from "../Errors"
import * as ERRORS from "../Errors"

/**
 * Checks to see if the arguments are of the correct length.
 * @param args to check length of
 * @param length expected length
 */
function checkArgumentsLength(args: any, length: number) {
  if (args.length !== length) {
    throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
  }
}

/**
 * Checks to see if the arguments are at least a certain length.
 * @param args to check length of
 * @param length expected length
 */
function checkArgumentsAtLeastLength(args: any, length: number) {
  if (args.length < length) {
    throw new CellError(ERRORS.NA_ERROR, "Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
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
    return valueToString(value[0]); // TODO: Take this out. It's stupid. We should handle arrays at a different level.
  }
}

/**
 * Takes any input type and will throw a REF_ERROR or coerce it into a number.
 * @param input to attempt to coerce into a number
 * @returns {number} number representation of the input
 */
function firstValueAsNumber(input: any) : number {
  if (input instanceof Array) {
    if (input.length === 0) {
      throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
    }
    return firstValueAsNumber(input[0]);
  }
  return valueToNumber(input);
}

/**
 * Takes any input type and will throw a REF_ERROR or coerce it into a string.
 * @param input to attempt to coerce into a string
 * @returns {number} number representation of the input
 */
function firstValueAsString(input: any) : string {
  if (input instanceof Array) {
    if (input.length === 0) {
      throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
    }
    return firstValueAsString(input[0]);
  }
  return valueToString(input);
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
    if (value === "") {
      return 0;
    }
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

/**
 * Returns true if we can coerce it to the number type
 * @param value to coerce
 * @returns {boolean} if could be coerced to a number
 */
function valueCanCoerceToNumber(value: any) : boolean {
  if (typeof value === "number" || typeof value === "boolean") {
    return true;
  } else if (typeof value === "string") {
    if (value === "") {
      return false;
    }
    if (value.indexOf(".") > -1) {
      return !isNaN(parseFloat(value));
    }
    return !isNaN(parseInt(value));
  }
  return false;
}


/**
 * Converts string values in array to 0
 * @param arr to convert
 * @returns {Array} array in which all string values have been converted to 0.
 */
function stringValuesToZeros(arr: Array<any>) : Array<any> {
  var toReturn = [];
  for (var i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "string") {
      toReturn.push(arr[i]);
    } else {
      toReturn.push(0);
    }
  }
  return toReturn;
}

/**
 * Converts any value to a boolean or throws an error if it cannot coerce it to the boolean type.
 * @param value to convert
 * @returns {boolean} to return.
 */
function valueToBoolean(value: any) : boolean {
  if (typeof value === "number") {
    return value !== 0;
  } else if (typeof value === "string") {
    throw new CellError(ERRORS.VALUE_ERROR, "AND expects boolean values. But '" + value + "' is a text and cannot be coerced to a boolean.")
  } else if (typeof value === "boolean") {
    return value;
  }
}

/**
 * Flatten an array of arrays of ...
 * @param values array of values
 * @returns {Array} flattened array
 */
function flatten(values: Array<any>) : Array<any> {
  return values.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}


export {
  stringValuesToZeros,
  flatten,
  valueCanCoerceToNumber,
  valueToNumber,
  valueToString,
  valueToBoolean,
  firstValueAsNumber,
  firstValueAsString,
  filterOutStringValues,
  checkArgumentsAtLeastLength,
  checkArgumentsLength
}