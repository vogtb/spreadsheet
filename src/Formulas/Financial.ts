import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  TypeConverter,
  checkForDevideByZero
} from "../Utilities/TypeConverter";
import {
  NumError,
  DivZeroError, ValueError
} from "../Errors"
import {
  YEARFRAC
} from "./Date";
import {Filter} from "../Utilities/Filter";
import {isDefined, isUndefined} from "../Utilities/MoreUtils";


/**
 * Calculates the depreciation of an asset for a specified period using the double-declining balance method.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of the asset at the end of depreciation.
 * @param life - The number of periods over which the asset is depreciated.
 * @param period - The single period within life for which to calculate depreciation.
 * @param factor - [ OPTIONAL - 2 by default ] - The factor by which depreciation decreases.
 * @returns {number} depreciation of an asset for a specified period
 * @constructor
 */
let DDB = function (cost, salvage, life, period, factor?) : number {
  ArgsChecker.checkLengthWithin(arguments, 4, 5, "DDB");
  cost = TypeConverter.firstValueAsNumber(cost);
  salvage = TypeConverter.firstValueAsNumber(salvage);
  life = TypeConverter.firstValueAsNumber(life);
  period = TypeConverter.firstValueAsNumber(period);
  factor = factor === undefined ? 2 : TypeConverter.firstValueAsNumber(factor);

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

  let total = 0;
  let current = 0;
  for (let i = 1; i <= period; i++) {
    current = Math.min((cost - total) * (factor / checkForDevideByZero(life)), (cost - salvage - total));
    total += current;
  }
  return current;
};


/**
 * Calculates the depreciation of an asset for a specified period using the arithmetic declining balance method.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of the asset at the end of depreciation.
 * @param life - The number of periods over which the asset is depreciated.
 * @param period - The single period within life for which to calculate depreciation.
 * @param month - [ OPTIONAL - 12 by default ] - The number of months in the first year of depreciation.
 * @returns {number} depreciated value
 * @constructor
 */
let DB = function (cost, salvage, life, period, month) : number {
  ArgsChecker.checkLengthWithin(arguments, 4, 5, "DB");
  cost = TypeConverter.firstValueAsNumber(cost);
  salvage = TypeConverter.firstValueAsNumber(salvage);
  life = TypeConverter.firstValueAsNumber(life);
  period = TypeConverter.firstValueAsNumber(period);
  month = month !== undefined ? Math.floor(TypeConverter.firstValueAsNumber(month)) : 12;
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
  let rate = (1 - Math.pow(salvage / cost, 1 / life));
  let initial = cost * rate * month / 12;
  let total = initial;
  let current = 0;
  let ceiling = (period === life) ? life - 1 : period;
  for (let i = 2; i <= ceiling; i++) {
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
 * @param number - The value to be formatted.
 * @param places - [ OPTIONAL - 2 by default ] - The number of decimal places to display.
 * @returns {number} dollars
 * @constructor
 */
let DOLLAR = function (number, places?) : number {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "DOLLAR");
  let v = TypeConverter.firstValueAsNumber(number);
  places = places !== undefined ? TypeConverter.firstValueAsNumber(places) : 2;
  let sign = (v > 0) ? 1 : -1;
  let divisor = sign * (Math.floor(Math.abs(v) * Math.pow(10, places)));
  let pow = Math.pow(10, places);
  if (pow === 0 && divisor !== 0) {
    throw new DivZeroError("Evaluation of function DOLLAR cause a divide by zero error.")
  }
  return divisor / pow;
};


/**
 * Converts a price quotation given as a decimal fraction into a decimal value.
 * @param fractionalPrice - The price quotation given using fractional decimal conventions.
 * @param unit - The units of the fraction, e.g. 8 for 1/8ths or 32 for 1/32nds.
 * @returns {number} decimal value.
 * @constructor
 */
let DOLLARDE = function (fractionalPrice, unit) : number {
  ArgsChecker.checkLength(arguments, 2, "DOLLARDE");
  let dollar = TypeConverter.firstValueAsNumber(fractionalPrice);
  let fraction = Math.floor(TypeConverter.firstValueAsNumber(unit));
  if (fraction === 0) {
    throw new DivZeroError("Function DOLLARDE parameter 2 cannot be zero.");
  }
  let result = parseInt(dollar.toString(), 10);
  result += (dollar % 1) * Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN10)) / fraction;
  let power = Math.pow(10, Math.ceil(Math.log(fraction) / Math.LN2) + 1);
  if (power === 0) {
    throw new DivZeroError("Evaluation of function DOLLARDE cause a divide by zero error.")
  }
  result = Math.round(result * power) / power;
  return result;
};


/**
 * Converts a price quotation given as a decimal value into a decimal fraction.
 * @param decimalPrice - The price quotation given as a decimal value.
 * @param unit - The units of the desired fraction, e.g. 8 for 1/8ths or 32 for 1/32nds
 * @returns {number} price quotation as decimal fraction.
 * @constructor
 */
let DOLLARFR = function (decimalPrice, unit) : number {
  ArgsChecker.checkLength(arguments, 2, "DOLLARFR");
  decimalPrice = TypeConverter.firstValueAsNumber(decimalPrice);
  unit = Math.floor(TypeConverter.firstValueAsNumber(unit));
  if (unit === 0) {
    throw new DivZeroError("Function DOLLARFR parameter 2 cannot be zero.");
  }
  let result = parseInt(decimalPrice.toString(), 10);
  result += (decimalPrice % 1) * Math.pow(10, -Math.ceil(Math.log(unit) / Math.LN10)) * unit;
  return result;
};


/**
 * Calculates the annual effective interest rate given the nominal rate and number of compounding periods per year.
 * @param nominalRate - The nominal interest rate per year.
 * @param periodsPerYear - The number of compounding periods per year.
 * @returns {number} annual effective interest rate
 * @constructor
 */
let EFFECT = function (nominalRate, periodsPerYear) : number {
  ArgsChecker.checkLength(arguments, 2, "EFFECT");
  let rate = TypeConverter.firstValueAsNumber(nominalRate);
  let periods = TypeConverter.firstValueAsNumber(periodsPerYear);
  if (rate <= 0) {
    throw new NumError("Function EFFECT parameter 1 value is " + rate + ". It should be greater than to 0");
  }
  if (periods < 1) {
    throw new NumError("Function EFFECT parameter 2 value is " + periods + ". It should be greater than or equal to 1");
  }
  periods = Math.floor(periods);
  return Math.pow(1 + rate / periods, periods) - 1;
};


/**
 * Calculates the periodic payment for an annuity investment based on constant-amount periodic payments and a constant
 * interest rate.
 * @param rate - The interest rate.
 * @param periods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param futureValue [ OPTIONAL ] - The future value remaining after the final payment has been made.
 * @param endOrBeginning [ OPTIONAL - 0 by default ] - Whether payments are due at the end (0) or beginning (1) of each
 * period.
 * @returns {number}
 * @constructor
 */
let PMT = function (rate, periods, presentValue, futureValue?, endOrBeginning?) : number {
  ArgsChecker.checkLengthWithin(arguments, 3, 5, "PMT");
  rate = TypeConverter.firstValueAsNumber(rate);
  periods = TypeConverter.firstValueAsNumber(periods);
  presentValue = TypeConverter.firstValueAsNumber(presentValue);
  futureValue = futureValue ? TypeConverter.firstValueAsNumber(futureValue) : 0;
  endOrBeginning = endOrBeginning ? TypeConverter.firstValueAsNumber(endOrBeginning) : 0;
  let result;
  if (rate === 0) {
    result = (presentValue + futureValue) / periods;
  } else {
    let term = Math.pow(1 + rate, periods);
    if (endOrBeginning) {
      result = (futureValue * rate / (term - 1) + presentValue * rate / (1 - 1 / term)) / (1 + rate);
    } else {
      result = futureValue * rate / (term - 1) + presentValue * rate / (1 - 1 / term);
    }
  }
  return -result;
};


/**
 * Returns the future value of an investment based on periodic, constant payments and a constant interest rate.
 * @param rate - The rate of periodic interest.
 * @param periods - The total number of periods.
 * @param payment - The annuity paid regularly per period
 * @param value - [OPTIONAL] - The present cash value of an investment.
 * @param type - [OPTIONAL] - Defines whether the payment is due at the beginning (1) or the end (0) of a period.
 * @returns {number}
 * @constructor
 */
let FV = function (rate, periods, payment, value?, type?) {
  ArgsChecker.checkLengthWithin(arguments, 3, 5, "FV");
  rate = TypeConverter.firstValueAsNumber(rate);
  periods = TypeConverter.firstValueAsNumber(periods);
  payment = TypeConverter.firstValueAsNumber(payment);
  value = (typeof value === 'undefined') ? 0 : TypeConverter.firstValueAsNumber(value);
  type = (typeof type === 'undefined') ? 0 : TypeConverter.firstValueAsNumber(type);
  let result;
  if (rate === 0) {
    result = value + payment * periods;
  } else {
    let term = Math.pow(1 + rate, periods);
    if (type === 0) {
      result = value * term + payment * (term - 1) / rate;
    } else {
      result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
    }
  }
  return -result;
};

/**
 * Calculates the cumulative principal paid over a range of payment periods for an investment based on constant-amount
 * periodic payments and a constant interest rate.
 * @param rate - The interest rate.
 * @param numberOfPeriods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param firstPeriod - The number of the payment period to begin the cumulative calculation. must be greater
 * than or equal to 1.
 * @param lastPeriod - The number of the payment period to end the cumulative calculation, must be greater
 * than first_period.
 * @param endOrBeginning - Whether payments are due at the end (0) or beginning (1) of each period
 * @returns {number} cumulative principal
 * @constructor
 */
let CUMPRINC = function (rate, numberOfPeriods, presentValue, firstPeriod, lastPeriod, endOrBeginning) : number {
  ArgsChecker.checkLength(arguments, 6, "CUMPRINC");
  rate = TypeConverter.firstValueAsNumber(rate);
  let periods = TypeConverter.firstValueAsNumber(numberOfPeriods);
  let value = TypeConverter.firstValueAsNumber(presentValue);
  let start = TypeConverter.firstValueAsNumber(firstPeriod);
  if (start < 1) {
    throw new NumError("Function CUMPRINC parameter 4 value is " + start + ". It should be greater than or equal to 1.");
  }
  let end = TypeConverter.firstValueAsNumber(lastPeriod);
  if (end < 1) {
    throw new NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to 1.");
  }
  if (end < start) {
    throw new NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to " + start + ".");
  }
  let type = TypeConverter.firstValueAsBoolean(endOrBeginning);

  let payment = PMT(rate, periods, value, 0, type);
  let principal = 0;
  if (start === 1) {
    if (type) {
      principal = payment;
    } else {
      principal = payment + value * rate;
    }
    start++;
  }
  for (let i = start; i <= end; i++) {
    if (type) {
      principal += payment - (FV(rate, i - 2, payment, value, 1) - payment) * rate;
    } else {
      principal += payment - FV(rate, i - 1, payment, value, 0) * rate;
    }
  }
  return principal;
};

/**
 * Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount
 * periodic payments and a constant interest rate.
 * @param rate - The interest rate.
 * @param numberOfPeriods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param firstPeriod - The number of the payment period to begin the cumulative calculation, must be greater
 * than or equal to 1.
 * @param lastPeriod - The number of the payment period to end the cumulative calculation, must be greater
 * than first_period.
 * @param endOrBeginning - Whether payments are due at the end (0) or beginning (1) of each period.
 * @returns {number} cumulative interest
 * @constructor
 */
let CUMIPMT = function (rate, numberOfPeriods, presentValue, firstPeriod, lastPeriod, endOrBeginning) : number {
  ArgsChecker.checkLength(arguments, 6, "CUMIPMT");
  rate = TypeConverter.firstValueAsNumber(rate);
  let periods = TypeConverter.firstValueAsNumber(numberOfPeriods);
  let value = TypeConverter.firstValueAsNumber(presentValue);
  let start = TypeConverter.firstValueAsNumber(firstPeriod);
  if (start < 1) {
    throw new NumError("Function CUMPRINC parameter 4 value is " + start + ". It should be greater than or equal to 1.");
  }
  let end = TypeConverter.firstValueAsNumber(lastPeriod);
  if (end < 1) {
    throw new NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to 1.");
  }
  if (end < start) {
    throw new NumError("Function CUMPRINC parameter 5 value is " + end + ". It should be greater than or equal to " + start + ".");
  }
  let type = TypeConverter.firstValueAsBoolean(endOrBeginning);

  let payment = PMT(rate, periods, value, 0, type);
  let interest = 0;
  if (start === 1) {
    if (!type) {
      interest = -value;
      start++;
    } else {
      start++;
    }
  }
  for (let i = start; i <= end; i++) {
    if (type) {
      interest += FV(rate, i - 2, payment, value, 1) - payment;
    } else {
      interest += FV(rate, i - 1, payment, value, 0);
    }
  }
  interest *= rate;
  return interest;
};

/**
 * Calculates the accrued interest of a security that has periodic payments.
 * WARNING: This function has been implemented to specifications as outlined in Google Spreadsheets, LibreOffice, and
 * OpenOffice. It functions much the same as MSExcel's ACCRINT, but there are several key differences. Below are links
 * to illustrate the differences. Please see the source code for more information on differences. Links: https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint, https://support.office.com/en-us/article/ACCRINT-function-fe45d089-6722-4fb3-9379-e1f911d8dc74, https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint, https://support.google.com/docs/answer/3093200 .
 * @param issue - The date the security was initially issued.
 * @param firstPayment - The first date interest will be paid.
 * @param settlement - The settlement date of the security, the date after issuance when the security is
 * delivered to the buyer. Is the maturity date of the security if it is held until maturity rather than sold.
 * @param rate - The annualized rate of interest.
 * @param redemption - The redemption amount per 100 face value, or par.
 * @param frequency - The number of coupon payments per year. For annual payments, frequency = 1; for
 * semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param dayCountConvention - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use.
 * 0 or omitted = US (NASD) 30/360, 1 = Actual/actual, 2 = Actual/360, 3 = Actual/365, 4 = European 30/360.
 * @returns {number}
 * @constructor
 * TODO: This function is based off of the open-source versions I was able to dig up online. We should implement a
 * TODO:     second version that is closer to what MSExcel does and is named something like `ACCRINT.MS`.
 */
let ACCRINT = function (issue, firstPayment, settlement, rate, redemption, frequency, dayCountConvention?) {
  ArgsChecker.checkLengthWithin(arguments, 6, 7, "ACCRINT");
  issue = TypeConverter.firstValueAsDateNumber(issue);
  // "firstPayment" param is only here to check for errors for GS implementation.
  // In MSE, there is a 7th (zero-indexed-6th) param that indicates the calculation-method to use, which indicates
  // weather the total accrued interest starting at the first_intrest date, instead of the issue date.
  firstPayment = TypeConverter.firstValueAsDateNumber(firstPayment);
  if (firstPayment < 0) {
    throw new NumError("Function ACCRINT parameter 2 value is " + firstPayment
        + ". It should be greater than 0.");
  }
  settlement = TypeConverter.firstValueAsDateNumber(settlement);
  if (issue > settlement) {
    throw new NumError("Function ACCRINT parameter 1 (" + issue.toString()
      + ") should be on or before Function ACCRINT parameter 3 (" + settlement.toString() + ").")
  }
  rate = TypeConverter.firstValueAsNumber(rate);
  // redemption, aka "par"
  redemption = TypeConverter.firstValueAsNumber(redemption);
  // The frequency parameter also does not affect the resulting value of the formula in the GS implementation.
  // In MSE, frequency is used to calculate a more accurate value, by breaking apart the year, and computing interest
  // on an on-going basis. In this implementation, we use YEARFRAC to get a numerical value that encompasses the
  // functionality of "frequency".
  frequency = TypeConverter.firstValueAsNumber(frequency);
  // dayCountConvention, aka "basis"
  dayCountConvention = dayCountConvention !== undefined ? TypeConverter.firstValueAsNumber(dayCountConvention) : 1;
  let factor = YEARFRAC(issue, settlement, dayCountConvention);
  return redemption * rate * factor;
};


/**
 * Returns the arithmetic-declining depreciation rate. Use this function to calculate the depreciation amount for one
 * period of the total depreciation span of an object. Arithmetic declining depreciation reduces the depreciation amount
 * from period to period by a fixed sum.
 * @param cost - The initial cost of an asset.
 * @param salvage - the value of an asset after depreciation.
 * @param life - The period fixing the time span over which an asset is depreciated.
 * @param period - The period for which the depreciation is to be calculated.
 * @returns {number}
 * @constructor
 */
let SYD = function (cost, salvage, life, period) {
  ArgsChecker.checkLength(arguments, 4, "SYD");
  cost = TypeConverter.firstValueAsNumber(cost);
  salvage = TypeConverter.firstValueAsNumber(salvage);
  life = TypeConverter.firstValueAsNumber(life);
  period = TypeConverter.firstValueAsNumber(period);
  // Return error if period is lower than 1 or greater than life
  if (period > life) {
    throw new NumError("Function SYD parameter 4 value is " + period +
        ". It should be less than or equal to value of Function SYD parameter 3 with " + life + ".");
  }
  if (period < 1) {
    throw new NumError("Function SYD parameter 4 value is " + period + ". It should be greater than 0.");
  }
  period = Math.floor(period);

  return (cost - salvage) * (life - period + 1) * 2 / (life * (life + 1));
};


/**
 * Returns the straight-line depreciation of an asset for one period. The amount of the depreciation is constant during
 * the depreciation period.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of an asset at the end of the depreciation.
 * @param life - The depreciation period determining the number of periods in the deprecation of the asset.
 * @returns {number}
 * @constructor
 */
let SLN = function (cost, salvage, life) {
  ArgsChecker.checkLength(arguments, 3, "SYD");
  cost = TypeConverter.firstValueAsNumber(cost);
  salvage = TypeConverter.firstValueAsNumber(salvage);
  life = TypeConverter.firstValueAsNumber(life);
  if (life === 0) {
    throw new DivZeroError("Function SLN parameter 3 cannot be zero.");
  }
  return (cost - salvage) / life;
};


/**
 * Returns the net present value of an investment based on a series of periodic cash flows and a discount rate.
 * @param rate - The discount rate for a period.
 * @param values - The values representing deposits or withdrawals.
 * @returns {number}
 * @constructor
 * TODO: This function can return results that are prone to floating point precision errors.
 */
let NPV = function (rate, ...values) {
  ArgsChecker.checkAtLeastLength(arguments, 2, "NPV");
  let range = Filter.flattenAndThrow(values).map(function (value) {
    try {
      return TypeConverter.valueToNumber(value);
    } catch (e) {
      throw new ValueError("Function NPV expects number values. But '" + value + "' is " + (typeof value)
          + " and cannot be coerced to a number.")
    }
  });
  let value = 0;
  for (let i = 0; i < range.length; i++) {
    value += range[i] / Math.pow(1 + rate, i);
  }
  return value;
};

/**
 * Returns the number of payment for an investment. Number is based on constant-amount payments made periodically and a
 * constant interest rate.
 * @param rate - The interest rate.
 * @param payment - The amount of each payment.
 * @param present - THe current value.
 * @param future - [OPTIONAL] - The future value remaining after the final payment has been made.
 * @param type [OPTIONAL 0 by default] - 1 indicates payments are due at the beginning of each period. 0 indicates
 * payments are due at the end of each period.
 * @returns {number}
 * @constructor
 */
let NPER = function (rate, payment, present, future?, type?) {
  ArgsChecker.checkLengthWithin(arguments, 3, 5, "NPER");
  rate = TypeConverter.firstValueAsNumber(rate);
  payment = TypeConverter.firstValueAsNumber(payment);
  present = TypeConverter.firstValueAsNumber(present);
  type = (typeof type === 'undefined') ? 0 : TypeConverter.firstValueAsNumber(type);
  future = (typeof future === 'undefined') ? 0 : TypeConverter.firstValueAsNumber(future);
  let num = payment * (1 + rate * type) - future * rate;
  let den = (present * rate + payment * (1 + rate * type));
  if (den === 0) {
    throw new DivZeroError("Evaluation of function NPER cause a divide by zero error.");
  }
  let div = Math.log(1 + rate);
  let logNumDen = Math.log(num / den);
  if (isNaN(logNumDen)) {
    throw new NumError("Parameters given function NPER are not possible.");
  }
  return  logNumDen / div;
};

/**
 * Calculates the yearly nominal interest rate, given the effective rate and the number of compounding periods per year.
 * @param rate - The effective interest rate.
 * @param periods - The number of periodic interest payments per year.
 * @returns {number}
 * @constructor
 */
let NOMINAL =  function (rate, periods) {
  ArgsChecker.checkLength(arguments, 2, "NOMINAL");
  rate = TypeConverter.firstValueAsNumber(rate);
  periods = Math.round(TypeConverter.firstValueAsNumber(periods));
  if (periods < 1) {
    throw new NumError("Function NOMINAL parameter 2 value is " + periods
        + ". It should be greater than or equal to 1.");
  }
  return (Math.pow(rate + 1, 1 / periods) - 1) * periods;
};


/**
 * Calculates the modified internal rate of return of a series of investments.
 * @param values - Range or values of payments. Ignores text values.
 * @param financeRate - The rate of interest of the investments.
 * @param reinvestRate - The rate of interest of the reinvestment.
 * @returns {number}
 * @constructor
 * TODO: This relies on NPV and will therefore be prone to floating-point errors.
 */
let MIRR = function (values, financeRate, reinvestRate) {
  ArgsChecker.checkLength(arguments, 3, "MIRR");
  values = Filter.flattenAndThrow(values).filter(function (value) {
    return (typeof value !== "string");
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });
  let n = values.length;

  let payments = [];
  let incomes = [];
  for (let i = 0; i < n; i++) {
    if (values[i] < 0) {
      payments.push(values[i]);
    } else {
      incomes.push(values[i]);
    }
  }
  if (incomes.length === 0 || payments.length === 0) {
    throw new DivZeroError("For MIRR, the values must include positive and negative numbers.");
  }

  let num = -NPV(reinvestRate, incomes) * Math.pow(1 + reinvestRate, n - 1);
  let den = NPV(financeRate, payments) * (1 + financeRate);
  return Math.pow(num / den, 1 / (n - 1)) - 1;
};


/**
 * Calculates the internal rate of return for an investment. The values represent cash flow values at regular intervals;
 * at least one value must be negative (payments), and at least one value must be positive (income).
 *
 * Relevant StackOverflow discussion: https://stackoverflow.com/questions/15089151/javascript-irr-internal-rate-of-return-formula-accuracy
 *
 * @param values - Range containing values. Ignores text values.
 * @param guess - [OPTIONAL] - The estimated value. Defaults to 0.01.
 * @returns {number}
 * @constructor
 */
let IRR =  function (values, guess?) {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "IRR");
  values = Filter.flattenAndThrow(values).filter(function (value) {
    return (typeof value !== "string");
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });
  guess = (guess === undefined) ? 0.1 : TypeConverter.firstValueAsNumber(guess);
  let min = -1.0;
  let max = 10.0;
  let val;
  let counter = 1;
  const MAX_ITERATIONS = 500000;
  do {
    guess = (min + max) / 2;
    val = 0;
    for (let j = 0; j < values.length; j++) {
      val += values[j] / Math.pow((1 + guess), j);
    }
    if (val > 0) {
      min = guess;
    }
    else {
      max = guess;
    }
  } while(Math.abs(val) > 0.000001 && ++counter < MAX_ITERATIONS);
  return guess;
};


/**
 * Calculates the periodic amortization for an investment with regular payments and a constant interest rate.
 * @param rate - The periodic interest rate.
 * @param period - The period for which the compound interest is calculated.
 * @param periods - The total number of periods during which the annuity is paid.
 * @param present - The present cash value in sequence of payments.
 * @param future - [OPTIONAL] - The desired value (future value) at the end of the periods.
 * @param type - [OPTIONAL] - Defines whether the payment is due at the beginning (1) or the end (0) of a period.
 * @returns {number}
 * @constructor
 */
let IPMT = function (rate, period, periods, present, future?, type?) {
  ArgsChecker.checkLengthWithin(arguments, 4, 6, "IPMT");
  rate = TypeConverter.firstValueAsNumber(rate);
  period = TypeConverter.firstValueAsNumber(period);
  periods = TypeConverter.firstValueAsNumber(periods);
  present = TypeConverter.firstValueAsNumber(present);
  future = (typeof future === 'undefined') ? 0 : TypeConverter.firstValueAsNumber(future);
  type = (typeof type === 'undefined') ? 0 : TypeConverter.firstValueAsNumber(type);
  let payment = PMT(rate, periods, present, future, type);
  let interest;
  if (period === 1) {
    if (type === 1) {
      interest = 0;
    } else {
      interest = -present;
    }
  } else {
    if (type === 1) {
      interest = FV(rate, period - 2, payment, present, 1) - payment;
    } else {
      interest = FV(rate, period - 1, payment, present, 0);
    }
  }
  return interest * rate;
};


/**
 * Returns for a given period the payment on the principal for an investment that is based on periodic and constant
 * payments and a constant interest rate.
 * @param rate - The periodic interest rate.
 * @param period - The amortization period.
 * @param periods - The total number of periods during which the annuity is paid.
 * @param present - The present value in the sequence of payments.
 * @param future - [OPTIONAL] - The desired future value. Defaults to 0.
 * @param type - [OPTIONAL] - Indicates how the year is to be calculated. 0 indicates payments are due at end of
 * period, 1 indicates payments are due at beginning of period. Defaults to 0.
 * @returns {number}
 * @constructor
 */
let PPMT = function (rate, period, periods, present, future?, type?) {
  ArgsChecker.checkLengthWithin(arguments, 4, 6, "PPMT");
  rate = TypeConverter.firstValueAsNumber(rate);
  period = TypeConverter.firstValueAsNumber(period);
  if (period < 1) {
    throw new NumError("Function PPMT parameter 2 value is " + period + ", but should be greater than or equal to 1.");
  }
  periods = TypeConverter.firstValueAsNumber(periods);
  if (periods <= 0) {
    throw new NumError("Function PPMT parameter 3 value is " + periods + ", but should be greater than 0.");
  }
  present = TypeConverter.firstValueAsNumber(present);
  future = (typeof future === 'undefined') ? 0 : TypeConverter.firstValueAsNumber(future);
  type = (typeof type === 'undefined') ? 0 : TypeConverter.firstValueAsNumber(type);
  return PMT(rate, periods, present, future, type) - IPMT(rate, period, periods, present, future, type);
};


/**
 * Calculates the accumulated value of the starting capital for a series of periodically varying interest rates.
 * @param principal - The starting capital.
 * @param rateSchedule - Range or Array that is a series of interest rates.
 * @returns {number}
 * @constructor
 */
let FVSCHEDULE =  function (principal, rateSchedule) {
  ArgsChecker.checkLength(arguments, 2, "FVSCHEDULE");
  let future = TypeConverter.firstValueAsNumber(principal);
  rateSchedule = Filter.flattenAndThrow(rateSchedule);

  for (let i = 0; i < rateSchedule.length; i++) {
    // Apply scheduled interest
    future *= 1 + rateSchedule[i];
  }
  return future;
};


/**
 * Returns the present value of an investment resulting from a series of regular payments.
 * @param rate - The interest rate per period.
 * @param periods - The total number of payment periods
 * @param paymentPerPeriod - The regular payment made per period.
 * @param future - [OPTIONAL defaults to 0] The future value remaining after the final installment has been made
 * @param type - [OPTIONAL defaults to 0] Defines whether the payment is due at the beginning (1) or the end (0) of a
 * period.
 * @constructor
 */
let PV = function (rate, periods, paymentPerPeriod, future?, type?) {
  ArgsChecker.checkLengthWithin(arguments, 3, 5, "PV");
  rate = TypeConverter.firstValueAsNumber(rate);
  if (rate < 0) {
    throw new NumError("Function PV parameter 21value is " + rate + ", but should be greater than or equal to 0.");
  }
  periods = TypeConverter.firstValueAsNumber(periods);
  paymentPerPeriod = TypeConverter.firstValueAsNumber(paymentPerPeriod);
  future = isUndefined(future) ? 0 : TypeConverter.firstValueAsNumber(future);
  type = isUndefined(type) ? 0 : TypeConverter.firstValueAsNumber(type);
  if (rate === 0) {
    return -paymentPerPeriod * periods - future;
  } else {
    return (((1 - Math.pow(1 + rate, periods)) / rate) * paymentPerPeriod * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
  }
};


/**
 * Returns the constant interest rate per period of an annuity.
 * @param periods - The total number of periods, during which payments are made (payment period).
 * @param paymentPerPeriod - The constant payment (annuity) paid during each period.
 * @param presentValue - The cash value in the sequence of payments
 * @param futureValue - [OPTIONAL defaults to 0] The future value, which is reached at the end of the periodic payments.
 * @param beginningOrEnd - [OPTIONAL defaults to 0] Defines whether the payment is due at the beginning (1) or the end
 * (0) of a period.
 * @param guessRate - [OPTIONAL] - Determines the estimated value of the interest with iterative
 * calculation.
 * @constructor
 */
let RATE = function (periods, paymentPerPeriod, presentValue, futureValue?, beginningOrEnd?, guessRate?) {
  ArgsChecker.checkLengthWithin(arguments, 3, 6, "RATE");
  periods = TypeConverter.firstValueAsNumber(periods);
  if (periods < 1) {
    throw new NumError("Function RATE parameter 1 value is" + periods + ", but it should be greater than 0.");
  }
  paymentPerPeriod = TypeConverter.firstValueAsNumber(paymentPerPeriod);
  presentValue = TypeConverter.firstValueAsNumber(presentValue);
  futureValue = isDefined(futureValue) ? TypeConverter.firstValueAsNumber(futureValue) : 0;
  beginningOrEnd = isDefined(beginningOrEnd) ? TypeConverter.firstValueAsNumber(beginningOrEnd) : 0;
  guessRate = isDefined(guessRate) ? TypeConverter.firstValueAsNumber(guessRate) : 0.1;

  // Sets the limits for possible guesses to any
  // number between 0% and 100%
  let lowLimit = 0;
  let highLimit = 1;
  let guess = guessRate;

  // Defines a tolerance of up to +/- 0.00005% of pmt, to accept
  // the solution as valid.
  let tolerance = Math.abs(0.00000005 * paymentPerPeriod);

  // Tries at most 40 times to find a solution within the tolerance.
  for (let i = 0; i < 40; i++) {
    // Resets the balance to the original pv.
    let balance = presentValue;

    // Calculates the balance at the end of the loan, based
    // on loan conditions.
    for (let j = 0; j < periods; j++ ) {
      if (beginningOrEnd == 0) {
        // Interests applied before payment
        balance = balance * (1 + guess) + paymentPerPeriod;
      } else {
        // Payments applied before insterests
        balance = (balance + paymentPerPeriod) * (1 + guess);
      }
    }

    // Returns the guess if balance is within tolerance.  If not, adjusts
    // the limits and starts with a new guess.
    if (Math.abs(balance + futureValue) < tolerance) {
      return guess;
    } else if (balance + futureValue > 0) {
      // Sets a new highLimit knowing that
      // the current guess was too big.
      highLimit = guess;
    } else  {
      // Sets a new lowLimit knowing that
      // the current guess was too small.
      lowLimit = guess;
    }

    // Calculates the new guess.
    guess = (highLimit + lowLimit) / 2;
  }
  throw new NumError("RATE attempted to complete but it was not able to.");
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
  EFFECT,
  PMT,
  SYD,
  SLN,
  NPV,
  NPER,
  NOMINAL,
  MIRR,
  IRR,
  IPMT,
  FV,
  PPMT,
  FVSCHEDULE,
  PV,
  RATE
}