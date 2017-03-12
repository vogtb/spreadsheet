/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import * as Formula from "formulajs"
import {
  ArgsChecker,
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


/**
 * Converts a provided date string in a known format to a date value.
 * @param values[0] date_string - The string representing the date. Understood formats include any date format which is
 * normally auto-converted when entered, without quotation marks, directly into a cell. Understood formats may depend on
 * region and language settings. Examples include:
 * "1999/1/13"              DONE
 * "1/13/1999"              DONE
 * "1999/1/13 10am"         DONE
 * "1999/1/13 10:22"        DONE
 * "1999/1/13 10:10am"      DONE
 * "1999/1/13 10:10:10"
 * "1999/1/13 10:10:10pm"
 * "Sun Feb 09 2017"
 * "09 Feb 2017"
 * "Feb-2017"
 * "22-Feb"
 * "10-22"
 * "10/2022"
 * "Sun Mar 05 2017 10:40:26"
 * @returns {number} of days since 1900/1/1, inclusively.
 * @constructor
 */
var DATEVALUE = function (...values) : number {
  const FIRST_YEAR = 1900;
  const Y2K_YEAR = 2000;
  ArgsChecker.checkLength(values, 1);
  var dateString = TypeCaster.firstValueAsString(values[0]);
  var m;

  // Check YYYY/MM/DD
  if (m === undefined) {
    // For reference: https://regex101.com/r/uusfi7/5
    var matches = dateString.match(/^\s*(([0-9][0-9][0-9][0-9])|([1-9][0-9][0-9]))\/([1-9]|0[1-9]|1[0-2])\/([1-9]|[0-2][0-9]|3[0-1])\s*$/);
    if (matches && matches.length === 6) {
      var years = parseInt(matches[1]);
      var months = parseInt(matches[4]) - 1; // Months are zero indexed.
      var days = parseInt(matches[5]) - 1;// Days are zero indexed.
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

  // Check MM/DD/YYYY
  if (m === undefined) {
    // For reference: https://regex101.com/r/yHraci/5
    var matches = dateString.match(/^\s*([1-9]|0[1-9]|1[0-2])\/([1-9]|[0-2][0-9]|3[0-1])\/(([0-9][0-9][0-9][0-9])|([1-9][0-9][0-9])|[0-9]{0,3})\s*$/);
    if (matches && matches.length === 6) {
      var years = parseInt(matches[3]);
      var months = parseInt(matches[1]) - 1; // Months are zero indexed.
      var days = parseInt(matches[2]) - 1; // Days are zero indexed.
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

  // Check YYYY/MM/DD HH(am|pm)
  if (m === undefined) {
    // For reference: https://regex101.com/r/m8FSCr/6
    var matches = dateString.match(/^\s*(([0-9][0-9][0-9][0-9])|([1-9][0-9][0-9]))\/([1-9]|0[1-9]|1[0-2])\/([1-9]|[0-2][0-9]|3[0-1])\s*([0-9]|0[0-9]|1[0-2])\s*(am|pm)\s*$/i);
    if (matches && matches.length === 8) {
      var years = parseInt(matches[1]);
      var months = parseInt(matches[4]) - 1; // Months are zero indexed.
      var days = parseInt(matches[5]) - 1;// Days are zero indexed.
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

  // Check YYYY/MM/DD HH:mm
  if (m === undefined) {
    // For reference: https://regex101.com/r/xsqttP/4
    var matches = dateString.match(/^\s*(([0-9][0-9][0-9][0-9])|([1-9][0-9][0-9]))\/([1-9]|0[1-9]|1[0-2])\/([1-9]|[0-2][0-9]|3[0-1])\s*([0-9]{1,}):\s*([0-9]{2,})\s*$/);
    if (matches && matches.length === 8) {
      var years = parseInt(matches[1]);
      var months = parseInt(matches[4]) - 1; // Months are zero indexed.
      var days = parseInt(matches[5]) - 1;// Days are zero indexed.
      var hours = parseInt(matches[6]);
      var minutes = parseInt(matches[7]);
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
      m = tmpMoment.add(days, 'days').add(hours, 'hours').add(minutes, 'minutes');
    }
  }

  // Check YYYY/MM/DD HH:mm(am|pm)
  if (m === undefined) {
    // For reference: https://regex101.com/r/DMA4Fv/3
    var matches = dateString.match(/^\s*(([0-9][0-9][0-9][0-9])|([1-9][0-9][0-9]))\/([1-9]|0[1-9]|1[0-2])\/([1-9]|[0-2][0-9]|3[0-1])\s*([0-9]|0[0-9]|1[0-2]):\s*([0-9]+)\s*(am|pm)\s*$/i);
    if (matches && matches.length === 9) {
      var years = parseInt(matches[1]);
      var months = parseInt(matches[4]) - 1; // Months are zero indexed.
      var days = parseInt(matches[5]) - 1;// Days are zero indexed.
      var hours = parseInt(matches[6]);
      var minutes = parseInt(matches[7]);
      var pm = matches[8].toLowerCase() === "pm";
      var actualYear = years;
      if (years >= 0 && years < 30) {
        actualYear = Y2K_YEAR + years;
      } else if (years >= 30 && years < 100) {
        actualYear = FIRST_YEAR + years;
      }
      var tmpMoment = moment.utc([actualYear])
        .add({"months": months});
      // If we're specifying more days than there are in this month
      if (days > tmpMoment.daysInMonth() - 1) {
        throw new CellError(VALUE_ERROR, "DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
      }
      tmpMoment.add({"days": days});
      if (pm) {
        if (hours === 12) {
          tmpMoment.set('hours', hours);
        } else {
          tmpMoment.set('hours', 12 + hours);
        }
      } else {
        if (hours !== 12) {
          tmpMoment.set('hours', hours);
        }
      }
      m = tmpMoment.add({"minutes": minutes}).set('hours', 0).set('minutes', 0);
    }
  }

  // Check YYYY/MM/DD HH:mm:ss
  if (m === undefined) {
    // TODO: This.
  }

  // Check YYYY/MM/DD HH:mm:ss(am|pm)
  if (m === undefined) {
    // TODO: This.
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