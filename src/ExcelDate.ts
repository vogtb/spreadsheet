/// <reference path="../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";

const ORIGIN_MOMENT = moment([1900]);


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
      var d = Math.round(dayOrMoment.diff(ORIGIN_MOMENT, "days")) + 2;
      this.day = d === 0 || d === 1 ? 2 : d; // Not zero-indexed but two-indexed. Otherwise could be negative value.
    }
  }

  /**
   * String representation of the day in the format M/D/YYYY. Eg: 6/24/1992
   * @returns {string} day in the format M/D/YYYY.
   */
  toString() {
    return ORIGIN_MOMENT.add('days', this.day).format("M/D/Y");
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