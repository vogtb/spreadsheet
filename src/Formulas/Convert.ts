import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  TypeConverter
} from "../Utilities/TypeConverter";

/**
 * Converts a number to a Date.
 * @param value - Value to convert. If the input is a number, will convert to a date. If value is non-numeric, will
 * return value unchanged.
 * @returns {any}
 * @constructor
 */
let TO_DATE = function (value) {
  ArgsChecker.checkLength(arguments, 1, "TO_DATE");
  let v = TypeConverter.firstValue(value);
  if (typeof v === "number") {
    return TypeConverter.valueToDateNumber(v);
  }
  return v;
};

/**
 * Converts a number to a Dollar value.
 * @param value - Value to convert. If the input is a number, will return as a dollar value. If value is non-numeric,
 * will return value unchanged.
 * @returns {any}
 * @constructor
 */
let TO_DOLLARS = function (value) {
  ArgsChecker.checkLength(arguments, 1, "TO_DOLLAR");
  return TypeConverter.firstValue(value);
};


/**
 * Converts a number to a percent value where 1 = 100 percent.
 * @param value - Value to convert. If the input is a number, will return as a percent value. If value is non-numeric,
 * will return value unchanged.
 * @returns {any}
 * @constructor
 */
let TO_PERCENT = function (value) {
  ArgsChecker.checkLength(arguments, 1, "TO_PERCENT");
  return TypeConverter.firstValue(value);
};

/**
 * Converts a number to a text value
 * @param value - Value to convert. If the input is a text, will return as a text value.
 * @returns {any}
 * @constructor
 */
let TO_TEXT = function (value) {
  ArgsChecker.checkLength(arguments, 1, "TO_TEXT");
  let v = TypeConverter.firstValue(value);
  return TypeConverter.valueToString(v);
};

export {
  TO_DATE,
  TO_DOLLARS,
  TO_PERCENT,
  TO_TEXT
}