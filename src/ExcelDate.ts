/// <reference path="../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
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
      var d = Math.round(dayOrMoment.diff(ORIGIN_MOMENT, "days")) + 2;
      this.day = d === 0 || d === 1 ? 2 : d; // Not zero-indexed but two-indexed. Otherwise could be negative value.
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

export {
  ExcelDate
}