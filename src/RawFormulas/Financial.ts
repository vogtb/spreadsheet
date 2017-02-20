import {
  ArgsChecker,
  TypeCaster
} from "./Utils";
import {
  CellError
} from "../Errors"
import * as ERRORS from "../Errors"

/**
 * Formats a number into the locale-specific currency format. WARNING: Currently the equivalent of TRUNC, since this
 * returns numbers
 * @param values[0] number - The value to be formatted.
 * @param values[1] places - [ OPTIONAL - 2 by default ] - The number of decimal places to display.
 * @returns {number} dollars
 * @constructor
 * TODO: In GS and Excel, Dollar values are primitive types at a certain level, meaning you can do =DOLLAR(10) + 10
 * TODO(cont.) and the result will be 20. Right now, JS allows you to inherit from primitives so you can use operators
 * TODO(cont.) on them (eg: new Number(10) + 10 == 20) but TS does not. So for now, Dollar values will be represented
 * TODO(cont.) with the primitive number type. At some point TS might allow me to suppress the warnings with
 * TODO(cont.) https://github.com/Microsoft/TypeScript/issues/9448 or
 * TODO(cont.) https://github.com/Microsoft/TypeScript/issues/11051
 *
 * TODO: Also, this does not do local-specific, as is.
 */
var DOLLAR = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var v = TypeCaster.firstValueAsNumber(values[0]);
  var places = values.length === 2 ? TypeCaster.firstValueAsNumber(values[1]) : 2;
  var sign = (v > 0) ? 1 : -1;
  return sign * (Math.floor(Math.abs(v) * Math.pow(10, places))) / Math.pow(10, places);
};


/**
 * Converts a price quotation given as a decimal fraction into a decimal value.
 * @param values[0] fractional_price - The price quotation given using fractional decimal conventions.
 * @param values[1] unit - The units of the fraction, e.g. 8 for 1/8ths or 32 for 1/32nds.
 * @returns {number} decimal value.
 * @constructor
 */
var DOLLARDE = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var dollar = TypeCaster.firstValueAsNumber(values[0]);
  var fraction = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
  if (fraction === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Function DOLLARDE parameter 2 cannot be zero.");
  }
  var result = parseInt(dollar.toString(), 10);
  result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;
  var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
  if (power === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function DOLLARDE caused a divide by zero error.");
  }
  result = Math.round(result * power) / power;
  return result;
};


/**
 * Converts a price quotation given as a decimal value into a decimal fraction.
 * @param values[0] decimal_price - The price quotation given as a decimal value.
 * @param values[1] unit - The units of the desired fraction, e.g. 8 for 1/8ths or 32 for 1/32nds
 * @returns {number} price quotation as decimal fraction.
 * @constructor
 */
var DOLLARFR = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var dollar = TypeCaster.firstValueAsNumber(values[0]);
  var unit = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
  if (unit === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Function DOLLARFR parameter 2 cannot be zero.");
  }
  var result = parseInt(dollar.toString(), 10);
  result += (dollar % 1) * Math.pow(10, -Math.ceil(Math.log(unit) / Math.LN10)) * unit;
  return result;
};

export {
  DOLLAR,
  DOLLARDE,
  DOLLARFR
}