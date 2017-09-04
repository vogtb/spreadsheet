import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  TypeConverter
} from "../Utilities/TypeConverter";
import {
  ValueError,
  RefError
} from "../Errors";

/**
 * Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are
 * logically false.
 * @param values At least one expression or reference to a cell containing an expression that represents some logical
 * value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean} if all values are logically true.
 * @constructor
 */
let AND = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "AND");
  let result = true;
  for (let i = 0; i < values.length; i++) {
    if (typeof values[i] === "string") {
      throw new ValueError("AND expects boolean values. But '" + values[i]
          + "' is a text and cannot be coerced to a boolean.")
    } else if (values[i] instanceof Array) {
      if (!AND.apply(this, values[i])) {
        result = false;
        break;
      }
    } else if (!values[i]) {
      result = false;
      break;
    }
  }
  return result;
};

/**
 * Tests whether two strings are identical, returning true if they are.
 * @param one - The first string to compare
 * @param two - The second string to compare
 * @returns {boolean}
 * @constructor
 */
let EXACT = function (one, two) {
  ArgsChecker.checkLength(arguments, 2, "EXACT");
  one = TypeConverter.firstValue(one);
  two = TypeConverter.firstValue(two);
  return one.toString() === two.toString();
};

/**
 * Returns true.
 * @returns {boolean} true boolean
 * @constructor
 */
let TRUE = function () : boolean {
  ArgsChecker.checkLength(arguments, 0, "TRUE");
  return true;
};

/**
 * Returns false.
 * @returns {boolean} false boolean
 * @constructor
 */
let FALSE = function () : boolean {
  ArgsChecker.checkLength(arguments, 0, "FALSE");
  return false;
};

/**
 * Returns the opposite of a logical value - NOT(TRUE) returns FALSE; NOT(FALSE) returns TRUE.
 * @param value - An expression or reference to a cell holding an expression that represents some logical value.
 * @returns {boolean} opposite of a logical value input
 * @constructor
 */
let NOT = function (value) : boolean {
  ArgsChecker.checkLength(arguments, 1, "NOT");
  if (typeof(value) === "boolean") {
    return !value;
  }
  if (typeof(value) === "string") {
    if (value === "") {
      return true;
    }
    throw new ValueError("Function NOT parameter 1 expects boolean values. But '" + value
        + "' is a text and cannot be coerced to a boolean.")
  }
  if (typeof(value) === "number") {
    return value === 0;
  }
  if (value instanceof Array) {
    if (value.length === 0) {
      throw new RefError("Reference does not exist.");
    }
    return NOT(value[0]);
  }
};

/**
 * Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are
 * logically false.
 * @param values An expression or reference to a cell containing an expression that represents some logical value, i.e.
 * TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean}
 * @constructor
 */
let OR = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "OR");
  for (let i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      if (OR.apply(this, values[i])) {
        return true;
      }
    } else if (TypeConverter.valueToBoolean(values[i])) {
      return true;
    }
  }
  return false;
};

/**
 * Exclusive or or exclusive disjunction is a logical operation that outputs true only when inputs differ.
 * @param values to check for exclusivity.
 * @returns {boolean} returns true if only one input is considered logically true.
 * @constructor
 */
let XOR = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "XOR");
  let alreadyTruthy = false;
  for (let i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      if (XOR.apply(this, values[i])) {
        if (alreadyTruthy) {
          return false;
        }
        alreadyTruthy = true;
      }
    } else if (TypeConverter.valueToBoolean(values[i])) {
      if (alreadyTruthy) {
        return false;
      }
      alreadyTruthy = true;
    }
  }
  return alreadyTruthy;
};

export {
  AND,
  EXACT,
  TRUE,
  FALSE,
  NOT,
  OR,
  XOR
}