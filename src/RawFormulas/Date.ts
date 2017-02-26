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
 * normally autoconverted when entered, without quotation marks, directly into a cell. Understood formats may depend on
 * region and language settings. Examples include: "1/23/2012", "1/23/2012 8:10:30", "2012/1/23", "2012-1-23"
 * @returns {number}
 * @constructor
 */
var DATEVALUE = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var dateString = TypeCaster.firstValueAsString(values[0]);
  var dateNumber;
  if (RegExUtil.matchDateStringYearMonthDaySlash(dateString)) { // Check "2012/1/23"
    dateNumber = new ExcelDate(moment(dateString, "Y/M/D")).toNumber();
  } else if (RegExUtil.matchDateStringYearMonthDayHyphen(dateString)) { // Check "2012-1-23"
    dateNumber = new ExcelDate(moment(dateString, "Y-M-D")).toNumber();
  } else if (RegExUtil.matchDateStringMonthDayYearSlash(dateString)) { // Check "1/23/2012"
    dateNumber = new ExcelDate(moment(dateString, "M/D/Y")).toNumber();
  }
  if (dateNumber === undefined) {
    // TODO: Throw error that we couldn't parse the dateString.
  }
  if (dateNumber < 0) {
    throw new CellError(NUM_ERROR, "DATEVALUE evaluates to an out of range value " + dateNumber
      + ". It should be greater than or equal to 0.");
  }
  return dateNumber;
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