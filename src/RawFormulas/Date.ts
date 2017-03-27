/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import * as Formula from "formulajs"
import {
  ArgsChecker,
  DateRegExBuilder,
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
 */
var DATE = function (...values) {
  const FIRST_YEAR = 1900;
  const ORIGIN_DATE = moment.utc([FIRST_YEAR]);
  ArgsChecker.checkLength(values, 3);
  var year = Math.abs(Math.floor(TypeCaster.firstValueAsNumber(values[0]))); // No negative values for year
  var month = Math.floor(TypeCaster.firstValueAsNumber(values[1])) - 1; // Months are between 0 and 11.
  var day = Math.floor(TypeCaster.firstValueAsNumber(values[2])) - 1; // Days are also zero-indexed.
  var m = moment.utc(ORIGIN_DATE)
      .add(year < FIRST_YEAR ? year : year - FIRST_YEAR, 'years') // If the value is less than 1900, assume 1900 as start index for year
      .add(month, 'months')
      .add(day, 'days');
  var excelDate = new ExcelDate(m);
  if (excelDate.toNumber() < 0) {
    throw new CellError(NUM_ERROR, "DATE evaluates to an out of range value " + excelDate.toNumber()
        + ". It should be greater than or equal to 0.");
  }
  return excelDate;
};


const YEAR_MONTHDIG_DAY = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().YYYY().FLEX_DELIMITER().MM().FLEX_DELIMITER().DD()
  .end()
  .build();
// const MONTHDIG_DAY_YEAR
// const MONTHNAME_DAY_YEAR;
// const DAY_MONTHNAME_YEAR;
// const YEAR_MONTHDIG;
// const MONTHDIG_YEAR;
// const YEAR_MONTHNAME;
// const MONTHNAME_YEAR;

/**
 * Converts a provided date string in a known format to a date value.
 * @param values[0] date_string - The string representing the date. Understood formats include any date format which is
 * normally auto-converted when entered, without quotation marks, directly into a cell. Understood formats may depend on
 * region and language settings.
 * @returns {number} of days since 1900/1/1, inclusively.
 * @constructor
 */
var DATEVALUE = function (...values) : number {
  const FIRST_YEAR = 1900;
  const Y2K_YEAR = 2000;
  ArgsChecker.checkLength(values, 1);
  var dateString = TypeCaster.firstValueAsString(values[0]);
  var m;

  // Check YEAR_MONTHDIG_DAY_SLASH_DELIMIT, YYYY/MM/DD, "1992/06/24"
  if (m === undefined) {
    // For reference: https://regex101.com/r/uusfi7/5
    var matches = dateString.match(YEAR_MONTHDIG_DAY);
    if (matches && matches.length === 8) {
      // Check delimiters. If they're not the same, throw error.
      if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
        throw new CellError(VALUE_ERROR, "DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
      }
      var years = parseInt(matches[3]);
      var months = parseInt(matches[5]) - 1; // Months are zero indexed.
      var days = parseInt(matches[7]) - 1; // Days are zero indexed.
      var actualYear = years;
      if (years >= 0 && years < 30) {
        actualYear = Y2K_YEAR + years;
      } else if (years >= 30 && years < 100) {
        actualYear = FIRST_YEAR + years;
      }
      var tmpMoment = moment.utc([actualYear])
        .add(months, 'months');
      // If we're specifying more days than there are in this month
      if (days > tmpMoment.daysInMonth() - 1) {
        throw new CellError(VALUE_ERROR, "DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
      }
      m = tmpMoment.add(days, 'days');
    }
  }

  // If we've not been able to parse the date by now, then we cannot parse it at all.
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