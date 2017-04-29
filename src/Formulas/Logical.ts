import { ArgsChecker, TypeCaster } from "./Utils"
import { ValueError, RefError } from "../Errors"

/**
 * Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.
 * @param values At least one expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean} if all values are logically true.
 * @constructor
 */
var AND = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
  var result = true;
  for (var i = 0; i < values.length; i++) {
    if (typeof values[i] === "string") {
      throw new ValueError("AND expects boolean values. But '" + values[i] + "' is a text and cannot be coerced to a boolean.")
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
 * @param values[0] The first string to compare
 * @param values[1] The second string to compare
 * @returns {boolean}
 * @constructor
 */
var EXACT = function (...values) {
  ArgsChecker.checkLength(values, 2);
  var one = values[0];
  var two = values[1];
  if (one instanceof Array) {
    if (one.length === 0) {
      throw new RefError("Reference does not exist.");
    }
  }
  if (two instanceof Array) {
    if (two.length === 0) {
      throw new RefError("Reference does not exist.");
    }
  }
  one = TypeCaster.valueToString(one);
  two = TypeCaster.valueToString(two);
  return one === two;
};

/**
 * Returns true.
 * @returns {boolean} true boolean
 * @constructor
 */
var TRUE = function () : boolean {
  return true;
};

/**
 * Returns false.
 * @returns {boolean} false boolean
 * @constructor
 */
var FALSE = function () : boolean {
  return false;
};

/**
 * Returns the opposite of a logical value - NOT(TRUE) returns FALSE; NOT(FALSE) returns TRUE.
 * @param values[0] An expression or reference to a cell holding an expression that represents some logical value.
 * @returns {boolean} opposite of a logical value input
 * @constructor
 */
var NOT = function (...values) : boolean {
  ArgsChecker.checkLength(values, 1);
  var X = values[0];
  if (typeof(X) === "boolean") {
    return !X;
  }
  if (typeof(X) === "string") {
    if (X === "") {
      return true;
    }
    throw new ValueError("Function NOT parameter 1 expects boolean values. But '" + X + "' is a text and cannot be coerced to a boolean.")
  }
  if (typeof(X) === "number") {
    return X === 0;
  }
  if (X instanceof Array) {
    if (X.length === 0) {
      throw new RefError("Reference does not exist.");
    }
    return NOT(X[0]);
  }
};

/**
 * Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false.
 * TODO: Should this allow the acceptance of functions that return true or false?
 * @param values An expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean}
 * @constructor
 */
var OR = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      if (OR.apply(this, values[i])) {
        return true;
      }
    } else if (TypeCaster.valueToBoolean(values[i])) {
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
var XOR = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
  var alreadyTruthy = false;
  for (var i = 0; i < values.length; i++) {
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
    } else if (TypeCaster.valueToBoolean(values[i])) {
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