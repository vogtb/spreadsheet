/// <reference path="../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";

const ORIGIN_MOMENT = moment.utc([1900]);


/**
 * Date that mimics the functionality of an Excel Date. Represented by the number of days since 1900/1/1.
 */
class ExcelDate {
  private day : number;

  /**
   * Constructs an ExcelDate when given a day or moment.
   * @param dayOrMoment number of days since 1900/1/1 (inclusively) or a Moment to use as the day.
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
    return moment.utc(ORIGIN_MOMENT).add(this.toNumber() - 2, 'days').format("M/D/Y");
  }

  /**
   * Returns the day as a number of days since 1900/1/1, inclusively on both ends.
   * @returns {number} days since 1900/1/1
   */
  toNumber() {
    return this.day;
  }

  /**
   * Converts to a moment
   * @returns {Moment}
   */
  toMoment() : moment.Moment {
    return moment.utc(ORIGIN_MOMENT).add(this.toNumber() - 2, "days");
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