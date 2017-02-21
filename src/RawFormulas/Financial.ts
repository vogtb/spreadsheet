import {
  ArgsChecker,
  TypeCaster
} from "./Utils";
import {
  CellError
} from "../Errors"
import * as ERRORS from "../Errors"

/**
 * Calculates the depreciation of an asset for a specified period using the double-declining balance method.
 * @param values[0] cost - The initial cost of the asset.
 * @param values[1] salvage - The value of the asset at the end of depreciation.
 * @param values[2] life - The number of periods over which the asset is depreciated.
 * @param values[3] period - The single period within life for which to calculate depreciation.
 * @param values[4] factor - [ OPTIONAL - 2 by default ] - The factor by which depreciation decreases.
 * @returns {number} depreciation of an asset for a specified period
 * @constructor
 */
var DDB = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 4, 5);
  var cost = TypeCaster.firstValueAsNumber(values[0]);
  var salvage = TypeCaster.firstValueAsNumber(values[1]);
  var life = TypeCaster.firstValueAsNumber(values[2]);
  var period = TypeCaster.firstValueAsNumber(values[3]);
  var factor = values.length === 5 ? TypeCaster.firstValueAsNumber(values[4]) : 2;

  if (cost < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 1 value is "
      + cost + ". It should be greater than or equal to 0.");
  }
  if (salvage < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 2 value is "
      + salvage + ". It should be greater than or equal to 0.");
  }
  if (life < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 3 value is "
      + life + ". It should be greater than or equal to 0.");
  }
  if (period < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 4 value is "
      + period + ". It should be greater than or equal to 0.");
  }
  if (period > life) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DDB parameter 4 value is "
      + life + ". It should be less than or equal to value of Function DB parameter 3 with "+ period +".");
  }
  if (salvage >= cost) {
    return 0;
  }

  var total = 0;
  var current = 0;
  for (var i = 1; i <= period; i++) {
    current = Math.min((cost - total) * (factor / life), (cost - salvage - total));
    total += current;
  }
  return current;
};


/**
 * Calculates the depreciation of an asset for a specified period using the arithmetic declining balance method.
 * @param values[0] cost - The initial cost of the asset.
 * @param values[1] salvage - The value of the asset at the end of depreciation.
 * @param values[2] life - The number of periods over which the asset is depreciated.
 * @param values[3] period - The single period within life for which to calculate depreciation.
 * @param values[4] month - [ OPTIONAL - 12 by default ] - The number of months in the first year of depreciation.
 * @returns {number} depreciated value
 * @constructor
 */
var DB = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 4, 5);
  var cost = TypeCaster.firstValueAsNumber(values[0]);
  var salvage = TypeCaster.firstValueAsNumber(values[1]);
  var life = TypeCaster.firstValueAsNumber(values[2]);
  var period = TypeCaster.firstValueAsNumber(values[3]);
  var month = values.length === 5 ? Math.floor(TypeCaster.firstValueAsNumber(values[4])) : 12;
  if (cost < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 1 value is "
      + cost + ". It should be greater than or equal to 0.");
  }
  if (salvage < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 2 value is "
      + salvage + ". It should be greater than or equal to 0.");
  }
  if (life < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 3 value is "
      + life + ". It should be greater than or equal to 0.");
  }
  if (period < 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 4 value is "
      + period + ". It should be greater than or equal to 0.");
  }
  if (month > 12 || month < 1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 5 value is "
      + month + ". Valid values are between 1 and 12 inclusive.");
  }
  if (period > life) {
    throw new CellError(ERRORS.NUM_ERROR, "Function DB parameter 4 value is "
      + life + ". It should be less than or equal to value of Function DB parameter 3 with "+ period +".");
  }
  if (salvage >= cost) {
    return 0;
  }
  var rate = (1 - Math.pow(salvage / cost, 1 / life));
  var initial = cost * rate * month / 12;
  var total = initial;
  var current = 0;
  var ceiling = (period === life) ? life - 1 : period;
  for (var i = 2; i <= ceiling; i++) {
    current = (cost - total) * rate;
    total += current;
  }
  if (period === 1) {
    return initial;
  } else if (period === life) {
    return (cost - total) * rate;
  } else {
    return current;
  }
};

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


/**
 * Calculates the annual effective interest rate given the nominal rate and number of compounding periods per year.
 * @param values[0] nominal_rate - The nominal interest rate per year.
 * @param values[1] periods_per_year - The number of compounding periods per year.
 * @returns {number} annual effective interest rate
 * @constructor
 */
var EFFECT = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var rate = TypeCaster.firstValueAsNumber(values[0]);
  var periods = TypeCaster.firstValueAsNumber(values[1]);
  if (rate <= 0) {
    throw new CellError(ERRORS.NUM_ERROR, "Function EFFECT parameter 1 value is " + rate + ". It should be greater than to 0");
  }
  if (periods < 1) {
    throw new CellError(ERRORS.NUM_ERROR, "Function EFFECT parameter 2 value is " + periods + ". It should be greater than or equal to 1");
  }
  periods = Math.floor(periods);
  return Math.pow(1 + rate / periods, periods) - 1;
};

export {
  DB,
  DDB,
  DOLLAR,
  DOLLARDE,
  DOLLARFR,
  EFFECT
}