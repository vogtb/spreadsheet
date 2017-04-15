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


/**
 * Returns the number of days between two dates.
 * @param values[0] end_date most recently occurring
 * @param values[1] start_date not most recently occurring
 * @returns {number} of days between start_date and end_date
 * @constructor
 */
var DAYS = function (...values) : number {
  ArgsChecker.checkLength(values, 2);
  var end = TypeCaster.firstValueAsExcelDate(values[0], true); // tell firstValueAsExcelDate to coerce boolean
  var start = TypeCaster.firstValueAsExcelDate(values[1], true); // tell firstValueAsExcelDate to coerce boolean
  return end.toNumber() - start.toNumber();
};


/**
 * Returns the difference between two days based on the 360 day year used in some financial interest calculations.
 * @param values[0] start_date - The start date to consider in the calculation. Must be a reference to a cell containing
 * a date, a function returning a date type, or a number.
 * @param values[1] end_date - The end date to consider in the calculation. Must be a reference to a cell containing a
 * date, a function returning a date type, or a number.
 * @param values[2] method - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use.
 * 0 indicates the US method - Under the US method, if start_date is the last day of a month, the day of month of
 * start_date is changed to 30 for the purposes of the calculation. Furthermore if end_date is the last day of a month
 * and the day of the month of start_date is earlier than the 30th, end_date is changed to the first day of the month
 * following end_date, otherwise the day of month of end_date is changed to 30.
 * Any other value indicates the European method - Under the European method, any start_date or end_date that falls on
 * the 31st of a month has its day of month changed to 30.
 * @returns {number} of days between two dates
 * @constructor
 */
var DAYS360 = function (...values) {
  ArgsChecker.checkLengthWithin(values, 2, 3);
  var start = TypeCaster.firstValueAsExcelDate(values[0], true).toMoment(); // tell firstValueAsExcelDate to coerce boolean
  var end = TypeCaster.firstValueAsExcelDate(values[1], true).toMoment(); // tell firstValueAsExcelDate to coerce boolean
  var methodToUse = false;
  if (values.length === 3) {
    methodToUse = TypeCaster.firstValueAsBoolean(values[2]);
  }
  var smd = 31;
  var emd = 31;
  var sd = start.date();
  var ed = end.date();
  if (methodToUse) {
    sd = (sd === 31) ? 30 : sd;
    ed = (ed === 31) ? 30 : ed;
  }
  else {
    if (start.month() === 1) {
      smd = start.daysInMonth();
    }
    if (end.month() === 1) {
      emd = end.daysInMonth();
    }
    sd = (sd === smd) ? 30 : sd;
    if (sd === 30 || sd === smd) {
      ed = (ed === emd) ? 30 : ed;
    }
  }
  return 360 * (end.year() - start.year()) + 30 * (end.month() - start.month()) + (ed - sd);
};


/**
 * Returns the month of the year a specific date falls in, in numeric format.
 * @param values[0] date - The date from which to extract the month. Must be a reference to a cell containing a date, a
 * function returning a date type, or a number.
 * @returns {number} month of the year that the input date falls on.
 * @constructor
 */
var MONTH = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var date = TypeCaster.firstValueAsExcelDate(values[0], true); // tell firstValueAsExcelDate to coerce boolean
  if (date.toNumber() < 0) {
    throw new NumError("Function MONTH parameter 1 value is " + date.toNumber() + ". It should be greater than or equal to 0.");
  }
  return date.toMoment().month() + 1;
};


/**
 * Returns the year specified by a given date.
 * @param values[0] date - The date from which to calculate the year. Must be a cell reference to a cell containing a
 * date, a function returning a date type, or a number.
 * @returns {number} year of the input date
 * @constructor
 */
var YEAR = function (...values) {
  ArgsChecker.checkLength(values, 1);
  var date = TypeCaster.firstValueAsExcelDate(values[0], true); // tell firstValueAsExcelDate to coerce boolean
  if (date.toNumber() < 0) {
    throw new NumError("Function YEAR parameter 1 value is " + date.toNumber() + ". It should be greater than or equal to 0.");
  }
  return date.toMoment().year();
};


/**
 * Returns a number representing the day of the week of the date provided.
 * @param values[0] date - The date for which to determine the day of the week. Must be a reference to a cell containing
 * a date, a function returning a date type, or a number.
 * @param values[1] type - [ OPTIONAL - 1 by default ] - A number indicating which numbering system to use to represent
 * weekdays. By default counts starting with Sunday = 1. If type is 1, days are counted from Sunday and the value of
 * Sunday is 1, therefore the value of Saturday is 7. If type is 2, days are counted from Monday and the value of Monday
 * is 1, therefore the value of Sunday is 7. If type is 3, days are counted from Monday and the value of Monday is 0,
 * therefore the value of Sunday is 6.
 * @returns {number} day of week
 * @constructor
 */
var WEEKDAY = function (...values) {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var date = TypeCaster.firstValueAsExcelDate(values[0], true); // tell firstValueAsExcelDate to coerce boolean
  var offsetType = values.length === 2 ? TypeCaster.firstValueAsNumber(values[1]) : 1;
  if (date.toNumber() < 0) {
    throw new NumError("Function WEEKDAY parameter 1 value is " + date.toNumber() + ". It should be greater than or equal to 0.");
  }
  var day = date.toMoment().day();
  if (offsetType === 1) {
    return day + 1;
  } else if (offsetType === 2) {
    if (day === 0) {
      return 7;
    }
    return day;
  } else if (offsetType === 3) {
    if (day === 0) {
      return 6;
    }
    return day - 1;
  } else {
    throw new NumError("Function WEEKDAY parameter 2 value " + day + " is out of range.");
  }
};


/**
 * Returns a number representing the week of the year where the provided date falls. When inputting the date, it is best
 * to use the DATE function, as text values may return errors.
 *
 * Behind the scenes, there are two week numbering "systems" used for this function: System 1 - The first week of the
 * year is considered to be the week containing January 1, which is numbered week 1. System 2 - The first week of the
 * year is considered to be the week containing the first Thursday of the year, which is numbered as week 1. System 2 is
 * the approach specified in ISO 8601, also known as the European system for numbering weeks.
 *
 * @param values[0] date - The date for which to determine the week number. Must be a reference to a cell containing a
 * date, a function returning a date type, or a number.
 * @param values[1] type - [ OPTIONAL - default is 1 ] - A number representing the day that a week starts on as well as
 * the system used for determining the first week of the year (1=Sunday, 2=Monday).
 * @returns {number} representing week number of year.
 * @constructor
 */
var WEEKNUM = function (...values) {
  ArgsChecker.checkLengthWithin(values, 1, 2);
  var date = TypeCaster.firstValueAsExcelDate(values[0], true); // tell firstValueAsExcelDate to coerce boolean
  var shiftType = values.length === 2 ? TypeCaster.firstValueAsNumber(values[1]) : 1;
  if (date.toNumber() < 0) {
    throw new NumError("Function YEAR parameter 1 value is " + date.toNumber() + ". It should be greater than or equal to 0.");
  }
  var dm = date.toMoment();
  var week = dm.week();
  var dayOfWeek = dm.day(); // between 1 and 7, inclusively
  if (shiftType === 1) {
    // If this weekYear is not the same as the year, then we're technically in "week 53"
    // See https://momentjs.com/docs/#/get-set/week-year/ for more info.
    if (dm.weekYear() !== dm.year()) {
      week = dm.weeksInYear() + 1;
    }
    return week;
  } else if (shiftType === 2 || shiftType === 11) {
    if (dm.weekYear() !== dm.year()) {
      week = dm.weeksInYear() + 1;
    }
    if (dayOfWeek === 0) { // sunday shift back
      return week - 1;
    }
    return week;
  } else if (shiftType === 12) {
    if (dm.weekYear() !== dm.year()) {
      week = dm.weeksInYear() + 1;
    }
    if (dayOfWeek <= 1) { // sunday, monday shift back
      return week - 1;
    }
    return week;
  } else if (shiftType === 13) {
    if (dm.weekYear() !== dm.year()) {
      week = dm.weeksInYear() + 1;
    }
    if (dayOfWeek <= 2) { // sunday, monday, tuesday shift back
      return week - 1;
    }
    return week;
  } else if (shiftType === 14) {
    var SHIFTER = [3, 4, 5, 6, 0, 1, 2];
    var startOfYear = moment.utc(dm).startOf("year");
    var weeksCount = 1;
    var d = moment.utc(dm).startOf("year").add(6 - SHIFTER[startOfYear.day()], "days");
    while (d.isBefore(dm)) {
      d.add(7, "days");
      weeksCount++;
    }
    return weeksCount;
  } else if (shiftType === 15) {
    var SHIFTER = [2, 3, 4, 5, 6, 0, 1];
    var startOfYear = moment.utc(dm).startOf("year");
    var weeksCount = 1;
    var d = moment.utc(dm).startOf("year").add(6 - SHIFTER[startOfYear.day()], "days");
    while (d.isBefore(dm)) {
      d.add(7, "days");
      weeksCount++;
    }
    return weeksCount;
  } else if (shiftType === 16) {

  } else if (shiftType === 17) {

  } else if (shiftType === 21) {

  } else {
    throw new NumError("Function WEEKNUM parameter 2 value " + shiftType + " is out of range.");
  }



  // var startOfYear = moment.utc(dm).startOf("year");
  // var dayOfWeekOfNewYearsDay = startOfYear.weekday();
  // var weekNum = 1;// let's start with the week being the first one, and walking it forward
  // var shiftedNewYearsDay = dayShift[dayOfWeekOfNewYearsDay];
};


var YEARFRAC = Formula["YEARFRAC"];
// Functions unimplemented.
var DATEDIF;
var HOUR;
var MINUTE;
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
var WORKDAY;

export {
  DATE,
  DATEVALUE,
  DAYS,
  DAY,
  DAYS360,
  EDATE,
  EOMONTH,
  MONTH,
  YEAR,
  WEEKDAY,
  WEEKNUM,
  YEARFRAC
}