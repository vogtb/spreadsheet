/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import * as Formula from "formulajs"
import {
  ArgsChecker, TypeCaster
} from "./Utils";

/**
 * Date that mimics the functionality of an Excel Date. Represented by the number of days since 1900/1/1.
 */
class ExcelDate {
  private day : number;

  /**
   * Constructs an ExcelDate when given a day or moment.
   * @param dayOrMoment number of days since 1900/1/1 or a Moment to use as the day.
   */
  constructor(dayOrMoment : number | moment.Moment) {
    if (typeof dayOrMoment === "number") {
      this.day = dayOrMoment;
    } else {
      var ORIGIN_MOMENT = moment(new Date(1900, 0, 1));
      this.day = Math.round(dayOrMoment.diff(ORIGIN_MOMENT, "days"));
    }
  }

  /**
   * Converts this ExcelDate to a javascript Date.
   * @returns {Date} representation of this ExcelDate
   */
  toDate() {
    var utc_days  = Math.floor(this.day - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = this.day - Math.floor(this.day) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;
    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  /**
   * String representation of the day in the format M/D/YYYY. Eg: 6/24/1992
   * @returns {string} day in the format M/D/YYYY.
   */
  toString() {
    return moment(this.toDate()).format("M/D/Y");
  }

  /**
   * Returns the day as a number.
   * @returns {number} days since 1900/1/1
   */
  toNumber() {
    return this.day;
  }
}

/**
 * Converts a provided year, month, and day into a date.
 * @param values[0] year - The year component of the date.
 * @param values[1] month - The month component of the date.
 * @param values[2] day - The day component of the date.
 * @returns {Date} newly created date.
 * @constructor
 */
var DATE = function (...values) {
  var ORIGIN_MOMENT = moment(new Date(1900, 0, 0));
  ArgsChecker.checkLength(values, 3);
  var year = Math.abs(Math.floor(TypeCaster.firstValueAsNumber(values[0]))); // No negative values for year
  var month = Math.floor(TypeCaster.firstValueAsNumber(values[1]) - 1); // Months are between 0 and 11.
  var day = Math.floor(TypeCaster.firstValueAsNumber(values[2]));
  return new ExcelDate(moment(new Date(year, month, day)));
  // TODO: When we create a date we should use DATEVALUE-style numeric conversion to ensure the value is greater than 0.
  // TODO: (cont.) throw new CellError(ERRORS.NUM_ERROR, "DATE evaluates to an out of range value -6420. It should be
  // TODO: (cont.) greater than or equal to 0.");
};


var DATEVALUE = function (dateString: string) : Date {
  return new Date(dateString);
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