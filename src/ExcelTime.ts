/// <reference path="../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";

class ExcelTime {
  // Value representing the time of day. Between 0 and 1, exclusive on end.
  private fractionOfDay: number;


  /**
   * Create ExcelTime from hours, seconds, and minutes. All capable of being overloaded, but are modded.
   * @param hours in this timestamp.
   * @param minutes in this timestamp.
   * @param seconds in this timestamp.
   */
  constructor(hours: number, minutes: number, seconds: number) {
    var v = (((hours % 24) * 60 * 60) + ((minutes) * 60) + (seconds)) / 86400;
    this.fractionOfDay = v % 1;
  }


  /**
   * Returns the number of seconds in this timestamp.
   * @returns {number} of seconds.
   */
  toNumber() : number {
    return this.fractionOfDay;
  }

  /**
   * Returns the string in the format "12:04:09 AM".
   * @returns {string} representing this timestamp.
   */
  toString() : string {
    return moment.utc([1900]).startOf("year").add(this.fractionOfDay * 86400, "seconds").format("h:mm:ss A");
  }

  /**
   * Equality checking.
   * @param other ExcelTime to compare to.
   * @returns {boolean} true if equals
   */
  equals(other: ExcelTime) : boolean {
    return other.toNumber() === this.toNumber();
  }

}

export {
  ExcelTime
}