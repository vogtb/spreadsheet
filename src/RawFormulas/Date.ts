/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import * as Formula from "formulajs"
import {
  ArgsChecker,
  RegExUtil,
  TypeCaster
} from "./Utils";
import {
  NUM_ERROR,
  VALUE_ERROR,
  CellError
} from "../Errors";
import {
  ExcelDate
} from "../ExcelDate";

/**
 * Converts a provided year, month, and day into a date.
 * @param values[0] year - The year component of the date.
 * @param values[1] month - The month component of the date.
 * @param values[2] day - The day component of the date.
 * @returns {Date} newly created date.
 * @constructor
 * TODO: This function should take overflow values for month and day (eg: 44) and roll them over to the next unit.
 */
var DATE = function (...values) {
  ArgsChecker.checkLength(values, 3);
  var year = Math.abs(Math.floor(TypeCaster.firstValueAsNumber(values[0]))); // No negative values for year
  var month = Math.floor(TypeCaster.firstValueAsNumber(values[1]) - 1); // Months are between 0 and 11.
  var day = Math.floor(TypeCaster.firstValueAsNumber(values[2]));
  var excelDate = new ExcelDate(moment(new Date(year, month, day)));
  if (excelDate.toNumber() < 0) {
    throw new CellError(NUM_ERROR, "DATE evaluates to an out of range value " + excelDate.toNumber()
        + ". It should be greater than or equal to 0.");
  }
  return excelDate;
};


/**
 * Converts a provided date string in a known format to a date value.
 * @param values[0] date_string - The string representing the date. Understood formats include any date format which is
 * normally auto-converted when entered, without quotation marks, directly into a cell. Understood formats may depend on
 * region and language settings. Examples include: "1/23/2012", "2012/1/23", "2012-1-23", "1-23-2012", "1/23/2012 8PM",
 * "1/23/2012 8:10:30", "1/23/2012 8:10", "1/23/2012 8:10:300000000", "Sun Feb 26 2017", "Monday Feb 26 2017",
 * "Mon Feb 26 2017 8PM".
 * @returns {number} of days since 1900/1/1, inclusively.
 * @constructor
 */
var DATEVALUE = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var dateString = TypeCaster.firstValueAsString(values[0]);
  var m;
  if (RegExUtil.matchDateStringYearMonthDaySlash(dateString)) { // Check "2012/1/23"
    m = moment(dateString, "Y/M/D");
  } else if (RegExUtil.matchDateStringYearMonthDayHyphen(dateString)) { // Check "2012-1-23"
    m = moment(dateString, "Y-M-D");
  } else if (RegExUtil.matchDateStringMonthDayYearSlash(dateString)) { // Check "1/23/2012"
    m = moment(dateString, "M/D/Y");
  } else if (RegExUtil.matchDateStringMonthDayYearHyphen(dateString)) { // Check "1-23-2012"
    m = moment(dateString, "M-D-Y");
  } else if (RegExUtil.matchDateStringMonthDayYearTimeStampAll(dateString)) { // Check "1/23/2012 8:10", "1-23-2012 8:10", "1/23/2012 8PM", etc.

  }
  if (m === undefined || !m.isValid()) {
    throw new CellError(VALUE_ERROR, "DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
  }
  return new ExcelDate(m).toNumber();
};


var DAY = Formula["DAY"];
var DAYS = Formula["DAYS"];
var DAYS360 = Formula["DAYS360"];
var EDATE = function (start_date: Date, months) {
  return moment(start_date).add(months, 'months').toDate();
};
var EOMONTH = function (start_date, months) {
  var edate = moment(start_date).add(months, 'months');
  return new Date(edate.year(), edate.month(), edate.daysInMonth());
};
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