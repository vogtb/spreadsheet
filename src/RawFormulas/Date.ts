/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import * as Formula from "formulajs"
import {
  ArgsChecker,
  TypeCaster
} from "./Utils";
import {
  NumError, ValueError
} from "../Errors";
import {
  ExcelDate,
  ORIGIN_MOMENT
} from "../ExcelDate";

/**
 * Converts a provided year, month, and day into a date.
 * @param values[0] year - The year component of the date.
 * @param values[1] month - The month component of the date.
 * @param values[2] day - The day component of the date.
 * @returns {ExcelDate} newly created date.
 * @constructor
 */
var DATE = function (...values) : ExcelDate {
  const FIRST_YEAR = 1900;
  const ORIGIN_DATE = moment.utc([FIRST_YEAR]).startOf("year");
  ArgsChecker.checkLength(values, 3);
  var year = Math.abs(Math.floor(TypeCaster.firstValueAsNumber(values[0]))); // No negative values for year
  var month = Math.floor(TypeCaster.firstValueAsNumber(values[1])) - 1; // Months are between 0 and 11.
  var day = Math.floor(TypeCaster.firstValueAsNumber(values[2])) - 1; // Days are also zero-indexed.
  var m = moment.utc(ORIGIN_DATE).startOf("year")
      .add(year < FIRST_YEAR ? year : year - FIRST_YEAR, 'years') // If the value is less than 1900, assume 1900 as start index for year
      .add(month, 'months')
      .add(day, 'days');
  var excelDate = new ExcelDate(m);
  if (excelDate.toNumber() < 0) {
    throw new NumError("DATE evaluates to an out of range value " + excelDate.toNumber()
        + ". It should be greater than or equal to 0.");
  }
  return excelDate;
};

/**
 * Converts a provided date string in a known format to a date value.
 * @param values[0] date_string - The string representing the date. Understood formats include any date format which is
 * normally auto-converted when entered, without quotation marks, directly into a cell. Understood formats may depend on
 * region and language settings.
 * @returns {number} of days since 1900/1/1, inclusively.
 * @constructor
 */
var DATEVALUE = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var dateString = TypeCaster.firstValueAsString(values[0]);
  var date;
  try {
    date = TypeCaster.stringToExcelDate(dateString);
  } catch (e) {
    throw new ValueError("DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
  }

  // If we've not been able to parse the date by now, then we cannot parse it at all.
  return date.toNumber();
};


/**
 * Returns a date a specified number of months before or after another date.
 * @param values[0] start_date - The date from which to calculate the result.
 * @param values[1] months - The number of months before (negative) or after (positive) start_date to calculate.
 * @returns {ExcelDate} date a specified number of months before or after another date
 * @constructor
 */
var EDATE = function (...values) : ExcelDate {
  ArgsChecker.checkLength(values, 2);
  var startDate = TypeCaster.firstValueAsExcelDate(values[0], true); // tell firstValueAsExcelDate to coerce boolean
  if (startDate.toNumber() < 0) {
    throw new NumError("Function EDATE parameter 1 value is " + startDate.toNumber() + ". It should be greater than or equal to 0.");
  }
  var months = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
  // While ExcelDate.toNumber() will return an inclusive count of days since 1900/1/1, moment.Moment.add assumes
  // exclusive count of days.
  return new ExcelDate(moment.utc(ORIGIN_MOMENT).add(startDate.toNumber() - 2, "days").add(months, "months"));
};


/**
 * Returns a date representing the last day of a month which falls a specified number of months before or after another
 * date.
 * @param values[0] start_date - The date from which to calculate the the result.
 * @param values[1] months - The number of months before (negative) or after (positive) start_date to consider. The last
 * calendar day of the calculated month is returned.
 * @returns {ExcelDate} the last day of a month
 * @constructor
 */
var EOMONTH = function (...values) : ExcelDate {
  ArgsChecker.checkLength(values, 2);
  var startDate = TypeCaster.firstValueAsExcelDate(values[0], true); // tell firstValueAsExcelDate to coerce boolean
  if (startDate.toNumber() < 0) {
    throw new NumError("Function EOMONTH parameter 1 value is " + startDate.toNumber() + ". It should be greater than or equal to 0.");
  }
  var months = Math.floor(TypeCaster.firstValueAsNumber(values[1]));
  // While ExcelDate.toNumber() will return an inclusive count of days since 1900/1/1, moment.Moment.add assumes
  // exclusive count of days.
  return new ExcelDate(moment.utc(ORIGIN_MOMENT).add(startDate.toNumber() - 2, "days").add(months, "months").endOf("month"));
};


/**
 * Returns the day of the month that a specific date falls on, in numeric format.
 * @param values[0] date - The date from which to extract the day. Must be a reference to a cell containing a date, a
 * function returning a date type, or a number.
 * @returns {number} day of the month
 * @constructor
 */
var DAY = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var date = TypeCaster.firstValueAsExcelDate(values[0], true); // tell firstValueAsExcelDate to coerce boolean
  if (date.toNumber() < 0) {
    throw new NumError("Function DAY parameter 1 value is " + date.toNumber() + ". It should be greater than or equal to 0.");
  }
  return date.toMoment().date();
};



var DAYS = Formula["DAYS"];
var DAYS360 = Formula["DAYS360"];

var YEARFRAC = Formula["YEARFRAC"];

// Functions unimplemented.
var DATEDIF;
var HOUR;
var MINUTE;
var MONTH;
var NETWORKDAYS;
var __COMPLEX_ITL = {
  "NETWORKDAYS.ITL": function () {},
  "WORKDAY.INTL": function () {}
};
var NOW;
var SECOND;
var TIME;
var TIMEVALUE;
var TODAY;
var WEEKDAY;
var WEEKNUM;
var WORKDAY;
var YEAR;

export {
  DATE,
  DATEVALUE,
  DAYS,
  DAY,
  DAYS360,
  EDATE,
  EOMONTH,
  YEARFRAC
}