/// <reference path="../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";

const ORIGIN_MOMENT = moment.utc([1899, 11, 30]).startOf("day");
const SECONDS_IN_DAY = 86400;

/**
 * Date that mimics the functionality of an Excel Date. Represented by the number of days since 1900/1/1.
 */
class ExcelDate {
  private seconds : number;

  /**
   * Constructs an ExcelDate when given a day or moment.
   * @param m Moment to use as the day.
   */
  constructor(m : moment.Moment) {
    this.seconds = m.diff(ORIGIN_MOMENT, "seconds");
  }

  /**
   * String representation of the day in the format M/D/YYYY. Eg: 6/24/1992
   * @returns {string} day in the format M/D/YYYY.
   */
  toString() : string {
    return moment.utc(ORIGIN_MOMENT).add(this.toNumber(), 'days').format("M/D/Y").toString();
  }

  /**
   * Returns the day as a number of days since 1900/1/1, inclusively on both ends.
   * @returns {number} days since 1900/1/1
   */
  toNumber() {
    return this.seconds / SECONDS_IN_DAY;
  }

  /**
   * Tests equality.
   * @param ed other ExcelDate to compare to
   * @returns {boolean} true if equals
   */
  equals(ed : ExcelDate) : boolean {
    return this.toNumber() === ed.toNumber();
  }
}

export {
  ExcelDate,
  ORIGIN_MOMENT
}