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
const MONTHDIG_DAY_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().MM().FLEX_DELIMITER().DD().FLEX_DELIMITER().YYYY14()
  .end()
  .build();
const DAY_MONTHNAME_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().DD().FLEX_DELIMITER().MONTHNAME().FLEX_DELIMITER().YYYY14()
  .end()
  .build();
const YEAR_MONTHDIG = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().YYYY14().FLEX_DELIMITER().MM()
  .end()
  .build();
const MONTHDIG_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().MM().FLEX_DELIMITER().YYYY14()
  .end()
  .build();
const YEAR_MONTHNAME = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().YYYY14().FLEX_DELIMITER().MONTHNAME()
  .end()
  .build();
const MONTHNAME_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().MONTHNAME().FLEX_DELIMITER().YYYY14()
  .end()
  .build();

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

  function createMoment(years, months, days) {
    var actualYear = years;
    if (years >= 0 && years < 30) {
      actualYear = Y2K_YEAR + years;
    } else if (years >= 30 && years < 100) {
      actualYear = FIRST_YEAR + years;
    }
    var tmpMoment = moment.utc([actualYear]).startOf("year");
    if (typeof months === "string") {
      tmpMoment.month(months);
    } else {
      tmpMoment.set("months", months);
    }
    // If we're specifying more days than there are in this month
    if (days > tmpMoment.daysInMonth() - 1) {
      throw new CellError(VALUE_ERROR, "DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
    }
    return tmpMoment.add(days, 'days');
  }

  // Check YEAR_MONTHDIG, YYYY(fd)MM, '1992/06'
  // NOTE: Must come before YEAR_MONTHDIG_DAY matching.
  if (m === undefined) {
    var matches = dateString.match(YEAR_MONTHDIG);
    if (matches && matches.length === 6) {
      var years = parseInt(matches[3]);
      var months = parseInt(matches[5]) - 1; // Months are zero indexed.
      m = createMoment(years, months, 0);
    }
  }

  // Check YEAR_MONTHDIG_DAY, YYYY(fd)MM(fd)DD, "1992/06/24"
  if (m === undefined) {
    var matches = dateString.match(YEAR_MONTHDIG_DAY);
    if (matches && matches.length === 8) {
      // Check delimiters. If they're not the same, throw error.
      if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
        throw new CellError(VALUE_ERROR, "DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
      }
      var years = parseInt(matches[3]);
      var months = parseInt(matches[5]) - 1; // Months are zero indexed.
      var days = parseInt(matches[7]) - 1; // Days are zero indexed.
      m = createMoment(years, months, days);
    }
  }

  // Check MONTHDIG_YEAR, MM(fd)YYYY, '06/1992'
  // NOTE: Must come before MONTHDIG_DAY_YEAR matching.
  if (m === undefined) {
    var matches = dateString.match(MONTHDIG_YEAR);
    if (matches && matches.length === 6) {
      var years = parseInt(matches[5]);
      var months = parseInt(matches[3]) - 1; // Months are zero indexed.
      m = createMoment(years, months, 0);
    }
  }

  // Check MONTHDIG_DAY_YEAR, MM(fd)DD(fd)YYYY, "06/24/1992"
  if (m === undefined) {
    var matches = dateString.match(MONTHDIG_DAY_YEAR);
    if (matches && matches.length === 8) {
      // Check delimiters. If they're not the same, throw error.
      if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
        throw new CellError(VALUE_ERROR, "DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
      }
      var years = parseInt(matches[7]);
      var months = parseInt(matches[3]) - 1; // Months are zero indexed.
      var days = parseInt(matches[5]) - 1; // Days are zero indexed.
      m = createMoment(years, months, days);
    }
  }

  // Check MONTHNAME_YEAR, Month(fd)YYYY, 'Aug 1992'
  // NOTE: Needs to come before DAY_MONTHNAME_YEAR matching.
  if (m === undefined) {
    var matches = dateString.match(MONTHNAME_YEAR);
    if (matches && matches.length === 6) {
      var years = parseInt(matches[5]);
      var monthName = matches[3];
      m = createMoment(years, monthName, 0);
    }
  }

  // Check DAY_MONTHNAME_YEAR, DD(fd)Month(fd)YYYY, '24/July/1992'
  if (m === undefined) {
    var matches = dateString.match(DAY_MONTHNAME_YEAR);
    if (matches && matches.length === 8) {
      var years = parseInt(matches[7]);
      var monthName = matches[5];
      var days = parseInt(matches[3]) - 1; // Days are zero indexed.
      var firstDelimiter = matches[4].replace(/\s*/g, '');
      var secondDelimiter = matches[6].replace(/\s*/g, '');
      // Check delimiters. If they're not the same, and the first one isn't a space, throw error.
      if (firstDelimiter !== secondDelimiter && firstDelimiter !== "") {
        throw new CellError(VALUE_ERROR, "DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
      }
      m = createMoment(years, monthName, days);
    }
  }

  // Check YEAR_MONTHNAME, YYYY(fd)Month, '1992/Aug'
  if (m === undefined) {
    var matches = dateString.match(YEAR_MONTHNAME);
    if (matches && matches.length === 6) {
      var years = parseInt(matches[3]);
      var monthName = matches[5];
      m = createMoment(years, monthName, 0);
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