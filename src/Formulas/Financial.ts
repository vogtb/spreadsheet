import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  TypeCaster,
  checkForDevideByZero
} from "../Utilities/TypeCaster";
import {
  NumError,
  DivZeroError
} from "../Errors"
import {
  YEARFRAC
} from "./Date";


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
    throw new NumError("Function DDB parameter 1 value is "
      + cost + ". It should be greater than or equal to 0.");
  }
  if (salvage < 0) {
    throw new NumError("Function DDB parameter 2 value is "
      + salvage + ". It should be greater than or equal to 0.");
  }
  if (life < 0) {
    throw new NumError("Function DDB parameter 3 value is "
      + life + ". It should be greater than or equal to 0.");
  }
  if (period < 0) {
    throw new NumError("Function DDB parameter 4 value is "
      + period + ". It should be greater than or equal to 0.");
  }
  if (period > life) {
    throw new NumError("Function DDB parameter 4 value is "
      + life + ". It should be less than or equal to value of Function DB parameter 3 with "+ period +".");
  }
  if (salvage >= cost) {
    return 0;
  }

  var total = 0;
  var current = 0;
  for (var i = 1; i <= period; i++) {
    current = Math.min((cost - total) * (factor / checkForDevideByZero(life)), (cost - salvage - total));
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
    throw new NumError("Function DB parameter 1 value is "
      + cost + ". It should be greater than or equal to 0.");
  }
  if (salvage < 0) {
    throw new NumError("Function DB parameter 2 value is "
      + salvage + ". It should be greater than or equal to 0.");
  }
  if (life < 0) {
    throw new NumError("Function DB parameter 3 value is "
      + life + ". It should be greater than or equal to 0.");
  }
  if (period < 0) {
    throw new NumError("Function DB parameter 4 value is "
      + period + ". It should be greater than or equal to 0.");
  }
  if (month > 12 || month < 1) {
    throw new NumError("Function DB parameter 5 value is "
      + month + ". Valid values are between 1 and 12 inclusive.");
  }
  if (period > life) {
    throw new NumError("Function DB parameter 4 value is "
      + life + ". It should be less than or equal to value of Function DB parameter 3 with "+ period +".");
  }
  if (salvage >= cost) {
    return 0;
  }
  if (cost === 0 && salvage !== 0) {
    throw new DivZeroError("Evaluation of function DB cause a divide by zero error.")
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
 */
var DOLLAR = function (...values) : number {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var v = TypeCaster.firstValueAsNumber(values[0]);
  var places = values.length === 2 ? TypeCaster.firstValueAsNumber(values[1]) : 2;
  var sign = (v > 0) ? 1 : -1;
  var divisor = sign * (Math.floor(Math.abs(v) * Math.pow(10, places)));
  var pow = Math.pow(10, places);
  if (pow === 0 && divisor !== 0) {
    throw new DivZeroError("Evaluation of function DOLLAR cause a divide by zero error.")
  }
  return divisor / pow;
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
    throw new DivZeroError("Function DOLLARDE parameter 2 cannot be zero.");
  }
  var result = parseInt(dollar.toString(), 10);
  result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;
  var power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
  if (power === 0) {
    throw new DivZeroError("Evaluation of function DOLLARDE cause a divide by zero error.")
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
    throw new DivZeroError("Function DOLLARFR parameter 2 cannot be zero.");
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
    throw new NumError("Function EFFECT parameter 1 value is " + rate + ". It should be greater than to 0");
  }
  if (periods < 1) {
    throw new NumError("Function EFFECT parameter 2 value is " + periods + ". It should be greater than or equal to 1");
  }
  periods = Math.floor(periods);
  return Math.pow(1 + rate / periods, periods) - 1;
};

// TODO: Convert to real formula PMT.
function pmt(rate, periods, present, future, type) {
  var result;
  if (rate === 0) {
    result = (present + future) / periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type) {
      result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
    } else {
      result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
    }
  }
  return -result;
}

// TODO: Convert to real formula FV
function fv(rate, periods, payment, value, type) {
  var result;
  if (rate === 0) {
    result = value + payment * periods;
  } else {
    var term = Math.pow(1 + rate, periods);
    if (type) {
      result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
    } else {
      result = value * term + payment * (term - 1) / rate;
    }
  }
  return -result;
}

/**
 * Calculates the cumulative principal paid over a range of payment periods for an investment based on constant-amount
 * periodic payments and a constant interest rate.
 * @param values[0] rate - The interest rate.
 * @param values[1] number_of_periods - The number of payments to be made.
 * @param values[2] present_value - The current value of the annuity.
 * @param values[3] first_period - The number of the payment period to begin the cumulative calculation. must be greater
 * than or equal to 1.
 * @param values[4] last_period - The number of the payment period to end the cumulative calculation, must be greater
 * than first_period.
 * @param values[5] end_or_beginning - Whether payments are due at the end (0) or beginning (1) of each period
 * @returns {number} cumulative principal
 * @constructor
 */
var CUMPRINC = function (...values) : number {
  ArgsChecker.checkLength(values, 6);
  var rate = TypeCaster.firstValueAsNumber(values[0]);
  var periods = TypeCaster.firstValueAsNumber(values[1]);
  var value = TypeCaster.firstValueAsNumber(values[2]);
  var start = TypeCaster.firstValueAsNumber(values[3]);
  if (start < 1) {
    throw new NumError("Function CUMPRINC parameter 4 value is " + start + ". It should be greater than or equal to 1.");
  }
  var end = TypeCaster.firstValueAsNumber(values[4]);
  if (end < 1) {
    throw new NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to 1.");
  }
  if (end < start) {
    throw new NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to " + start + ".");
  }
  var type = TypeCaster.firstValueAsBoolean(values[5]);

  var payment = pmt(rate, periods, value, 0, type);
  var principal = 0;
  if (start === 1) {
    if (type) {
      principal = payment;
    } else {
      principal = payment + value * rate;
    }
    start++;
  }
  for (var i = start; i <= end; i++) {
    if (type) {
      principal += payment - (fv(rate, i - 2, payment, value, 1) - payment) * rate;
    } else {
      principal += payment - fv(rate, i - 1, payment, value, 0) * rate;
    }
  }
  return principal;
};

/**
 * Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount
 * periodic payments and a constant interest rate.
 * @param values[0] rate - The interest rate.
 * @param values[1] number_of_periods - The number of payments to be made.
 * @param values[2] present_value - The current value of the annuity.
 * @param values[3] first_period - The number of the payment period to begin the cumulative calculation, must be greater
 * than or equal to 1.
 * @param values[4] last_period - The number of the payment period to end the cumulative calculation, must be greater
 * than first_period.
 * @param values[5] end_or_beginning - Whether payments are due at the end (0) or beginning (1) of each period.
 * @returns {number} cumulative interest
 * @constructor
 */
var CUMIPMT = function (...values) : number {
  ArgsChecker.checkLength(values, 6);
  var rate = TypeCaster.firstValueAsNumber(values[0]);
  var periods = TypeCaster.firstValueAsNumber(values[1]);
  var value = TypeCaster.firstValueAsNumber(values[2]);
  var start = TypeCaster.firstValueAsNumber(values[3]);
  if (start < 1) {
    throw new NumError("Function CUMPRINC parameter 4 value is " + start + ". It should be greater than or equal to 1.");
  }
  var end = TypeCaster.firstValueAsNumber(values[4]);
  if (end < 1) {
    throw new NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to 1.");
  }
  if (end < start) {
    throw new NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to " + start + ".");
  }
  var type = TypeCaster.firstValueAsBoolean(values[5]);

  var payment = pmt(rate, periods, value, 0, type);
  var interest = 0;
  if (start === 1) {
    if (!type) {
      interest = -value;
      start++;
    } else {
      start++;
    }
  }
  for (var i = start; i <= end; i++) {
    if (type) {
      interest += fv(rate, i - 2, payment, value, 1) - payment;
    } else {
      interest += fv(rate, i - 1, payment, value, 0);
    }
  }
  interest *= rate;
  return interest;
};

/**
 * Calculates the accrued interest of a security that has periodic payments.
 * WARNING: This function has been implemented to specifications as outlined in Google Spreadsheets, LibreOffice, and
 * OpenOffice. It functions much the same as MSExcel's ACCRINT, but there are several key differences. Below are links
 * to illustrate the differences. Please see the source code for more information on differences.
 *
 * Links:
 * * https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint
 *
 * * https://support.office.com/en-us/article/ACCRINT-function-fe45d089-6722-4fb3-9379-e1f911d8dc74
 *
 * * https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint
 *
 * * https://support.google.com/docs/answer/3093200
 * @param values[0] issue - The date the security was initially issued.
 * @param values[1] first_payment - The first date interest will be paid.
 * @param values[2] settlement - The settlement date of the security, the date after issuance when the security is
 * delivered to the buyer. Is the maturity date of the security if it is held until maturity rather than sold.
 * @param values[3] rate - The annualized rate of interest.
 * @param values[4] redemption - The redemption amount per 100 face value, or par.
 * @param values[5] frequency - The number of coupon payments per year. For annual payments, frequency = 1; for
 * semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param values[6] day_count_convention - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use.
 * 0 or omitted = US (NASD) 30/360, 1 = Actual/actual, 2 = Actual/360, 3 = Actual/365, 4 = European 30/360.
 * @returns {number}
 * @constructor
 * TODO: This function is based off of the open-source versions I was able to dig up online. We should implement a
 * TODO:     second version that is closer to what MSExcel does and is named something like `ACCRINT.MS`.
 */
var ACCRINT = function (...values) {
  ArgsChecker.checkLengthWithin(values, 6, 7);
  var issue = TypeCaster.firstValueAsDateNumber(values[0]);
  // "firstPayment" param is only here to check for errors for GS implementation.
  // In MSE, there is a 7th (zero-indexed-6th) param that indicates the calculation-method to use, which indicates
  // weather the total accrued interest starting at the first_intrest date, instead of the issue date.
  var firstPayment = TypeCaster.firstValueAsDateNumber(values[1]);
  if (firstPayment < 0) {
    throw new NumError("Function ACCRINT parameter 2 value is " + firstPayment
        + ". It should be greater than 0.");
  }
  var settlement = TypeCaster.firstValueAsDateNumber(values[2]);
  if (issue > settlement) {
    throw new NumError("Function ACCRINT parameter 1 (" + issue.toString()
      + ") should be on or before Function ACCRINT parameter 3 (" + settlement.toString() + ").")
  }
  var rate = TypeCaster.firstValueAsNumber(values[3]);
  var redemption = TypeCaster.firstValueAsNumber(values[4]);// "par"
  // The frequency parameter also does not affect the resulting value of the formula in the GS implementation.
  // In MSE, frequency is used to calculate a more accurate value, by breaking apart the year, and computing interest
  // on an on-going basis. In this implementation, we use YEARFRAC to get a numerical value that encompasses the
  // functionality of "frequency".
  var frequency = TypeCaster.firstValueAsNumber(values[5]);
  var dayCountConvention = values.length === 7 ? TypeCaster.firstValueAsNumber(values[6]) : 1;// "basis"
  var factor = YEARFRAC(issue, settlement, dayCountConvention);
  return redemption * rate * factor;
};

export {
  ACCRINT,
  CUMPRINC,
  CUMIPMT,
  DB,
  DDB,
  DOLLAR,
  DOLLARDE,
  DOLLARFR,
  EFFECT
}