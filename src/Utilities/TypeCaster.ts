/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import {
  RefError,
  ValueError, DivZeroError
} from "../Errors";
import {
  ExcelDate
} from "../ExcelDate";
import {
  DateRegExBuilder
} from "./DateRegExBuilder";

const YEAR_MONTHDIG_DAY = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().YYYY().FLEX_DELIMITER_LOOSEDOT().MM().FLEX_DELIMITER_LOOSEDOT().DD_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
const MONTHDIG_DAY_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().MM().FLEX_DELIMITER_LOOSEDOT().DD().FLEX_DELIMITER_LOOSEDOT().YYYY14_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
const DAY_MONTHNAME_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().DD().FLEX_DELIMITER_LOOSEDOT().MONTHNAME().FLEX_DELIMITER_LOOSEDOT().YYYY14_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
const MONTHNAME_DAY_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().MONTHNAME().FLEX_DELIMITER_LOOSEDOT().DD().FLEX_DELIMITER_LOOSEDOT().YYYY14_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
const YEAR_MONTHDIG = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().YYYY14().FLEX_DELIMITER().MM_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
const MONTHDIG_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().MM().FLEX_DELIMITER().YYYY14_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
const YEAR_MONTHNAME = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().YYYY14().FLEX_DELIMITER().MONTHNAME_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
const MONTHNAME_YEAR = DateRegExBuilder.DateRegExBuilder()
  .start()
  .OPTIONAL_DAYNAME().OPTIONAL_COMMA().MONTHNAME().FLEX_DELIMITER().YYYY2_OR_4_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
// For reference: https://regex101.com/r/47GARA/1/
const TIMESTAMP = DateRegExBuilder.DateRegExBuilder()
  .start()
  .TIMESTAMP_UNITS_CAPTURE_GROUP()
  .end()
  .build();
// The first year to use when calculating the number of days in an ExcelDate
const FIRST_YEAR = 1900;
// The year 2000.
const Y2K_YEAR = 2000;

/**
 * Matches a timestamp string, adding the units to the moment passed in.
 * @param timestampString to parse. ok formats: "10am", "10:10", "10:10am", "10:10:10", "10:10:10am", etc.
 * @param momentToMutate to mutate
 * @returns {Moment} mutated and altered.
 */
function matchTimestampAndMutateMoment(timestampString : string, momentToMutate: moment.Moment) : moment.Moment {
  var matches = timestampString.match(TIMESTAMP);
  if (matches && matches[1] !== undefined) { // 10am
    var hours = parseInt(matches[2]);
    if (hours > 12) {
      throw new Error();
    }
    momentToMutate.add(hours, 'hours');
  } else if (matches && matches[6] !== undefined) { // 10:10
    var hours = parseInt(matches[7]);
    var minutes = parseInt(matches[8]);
    momentToMutate.add(hours, 'hours').add(minutes, 'minutes');
  } else if (matches && matches[11] !== undefined) { // 10:10am
    var hours = parseInt(matches[13]);
    var minutes = parseInt(matches[14]);
    var pmTrue = (matches[16].toLowerCase() === "pm");
    if (hours > 12) {
      throw new Error();
    }
    if (pmTrue) {
      // 12pm is just 0am, 4pm is 16, etc.
      momentToMutate.set('hours', hours === 12 ? hours : 12 + hours);
    } else {
      if (hours !== 12) {
        momentToMutate.set('hours', hours);
      }
    }
    momentToMutate.add(minutes, 'minutes');
  } else if (matches && matches[17] !== undefined) { // 10:10:10
    var hours = parseInt(matches[19]);
    var minutes = parseInt(matches[20]);
    var seconds = parseInt(matches[21]);
    momentToMutate.add(hours, 'hours').add(minutes, 'minutes').add(seconds, 'seconds');
  } else if (matches && matches[23] !== undefined) { // // 10:10:10am
    var hours = parseInt(matches[25]);
    var minutes = parseInt(matches[26]);
    var seconds = parseInt(matches[27]);
    var pmTrue = (matches[28].toLowerCase() === "pm");
    if (hours > 12) {
      throw new Error();
    }
    if (pmTrue) {
      // 12pm is just 0am, 4pm is 16, etc.
      momentToMutate.set('hours', hours === 12 ? hours : 12 + hours);
    } else {
      if (hours !== 12) {
        momentToMutate.set('hours', hours);
      }
    }
    momentToMutate.add(minutes, 'minutes').add(seconds, 'seconds');
  } else {
    throw new Error();
  }
  return momentToMutate;
}

/**
 * Static class of helpers used to cast various types to each other.
 */
class TypeCaster {

  private static ORIGIN_MOMENT = moment.utc([1899, 11, 30]).startOf("day");
  private static SECONDS_IN_DAY = 86400;


  /**
   * Converts a time-formatted string to a number between 0 and 1, exclusive on 1.
   * @param timeString
   * @returns {number} representing time of day
   */
  static stringToTimeNumber(timeString: string) : number {
    var m;
    try {
      m = matchTimestampAndMutateMoment(timeString, moment.utc([FIRST_YEAR]).startOf("year"));
    } catch (e) {
      m = TypeCaster.parseStringToMoment(timeString);
      if (m === undefined || !m.isValid()) {
        throw new Error();
      }
    }
    // If the parsing didn't work, try parsing as timestring alone
    return (3600 * m.hours() + 60 * m.minutes() + m.seconds()) / 86400;
  }

  /**
   * Parses a string returning a moment that is either valid, invalid or undefined.
   * @param dateString to parse.
   * @returns {moment}
   */
  private static parseStringToMoment(dateString : string) : moment.Moment {
    var m;

    /**
     * Creates moment object from years, months and days.
     * @param years of moment
     * @param months of moment in number or string format (eg: January)
     * @param days of moment
     * @returns {Moment} created moment
     */
    function createMoment(years, months, days) : moment.Moment {
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
        throw new Error();
      }
      return tmpMoment.add(days, 'days');
    }

    // Check YEAR_MONTHDIG, YYYY(fd)MM, '1992/06'
    // NOTE: Must come before YEAR_MONTHDIG_DAY matching.
    if (m === undefined) {
      var matches = dateString.match(YEAR_MONTHDIG);
      if (matches && matches.length >= 6) {
        var years = parseInt(matches[3]);
        var months = parseInt(matches[5]) - 1; // Months are zero indexed.
        var tmpMoment = createMoment(years, months, 0);
        if (matches[6] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[6], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check YEAR_MONTHDIG_DAY, YYYY(fd)MM(fd)DD, "1992/06/24"
    if (m === undefined) {
      var matches = dateString.match(YEAR_MONTHDIG_DAY);
      if (matches && matches.length >= 8) {
        // Check delimiters. If they're not the same, throw error.
        if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
          throw new Error();
        }
        var years = parseInt(matches[3]);
        var months = parseInt(matches[5]) - 1; // Months are zero indexed.
        var days = parseInt(matches[7]) - 1; // Days are zero indexed.
        var tmpMoment = createMoment(years, months, days);
        if (matches.length >= 9 && matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check MONTHDIG_YEAR, MM(fd)YYYY, '06/1992'
    // NOTE: Must come before MONTHDIG_DAY_YEAR matching.
    if (m === undefined) {
      var matches = dateString.match(MONTHDIG_YEAR);
      if (matches && matches.length >= 6) {
        var years = parseInt(matches[5]);
        var months = parseInt(matches[3]) - 1; // Months are zero indexed.
        var tmpMoment = createMoment(years, months, 0);
        if (matches[6] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[6], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check MONTHDIG_DAY_YEAR, MM(fd)DD(fd)YYYY, "06/24/1992"
    if (m === undefined) {
      var matches = dateString.match(MONTHDIG_DAY_YEAR);
      if (matches && matches.length >= 8) {
        // Check delimiters. If they're not the same, throw error.
        if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
          throw new Error();
        }
        var years = parseInt(matches[7]);
        var months = parseInt(matches[3]) - 1; // Months are zero indexed.
        var days = parseInt(matches[5]) - 1; // Days are zero indexed.
        var tmpMoment = createMoment(years, months, days);
        if (matches.length >= 9 && matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check MONTHNAME_YEAR, Month(fd)YYYY, 'Aug 1992'
    // NOTE: Needs to come before DAY_MONTHNAME_YEAR matching.
    if (m === undefined) {
      var matches = dateString.match(MONTHNAME_YEAR);
      if (matches && matches.length >= 6) {
        var years = parseInt(matches[5]);
        var monthName = matches[3];
        var tmpMoment = createMoment(years, monthName, 0);
        if (matches[6] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[6], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check MONTHNAME_DAY_YEAR, Month(fd)DD(fd)YYYY, 'Aug 19 2020'
    if (m === undefined) {
      var matches = dateString.match(MONTHNAME_DAY_YEAR);
      if (matches && matches.length >= 8) {
        // Check delimiters. If they're not the same, throw error.
        if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
          throw new Error();
        }
        var years = parseInt(matches[7]);
        var monthName = matches[3];
        var days = parseInt(matches[5]) - 1; // Days are zero indexed.
        var tmpMoment = createMoment(years, monthName, days);
        if (matches.length >= 9 && matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check DAY_MONTHNAME_YEAR, DD(fd)Month(fd)YYYY, '24/July/1992'
    if (m === undefined) {
      var matches = dateString.match(DAY_MONTHNAME_YEAR);
      if (matches && matches.length >= 8) {
        var years = parseInt(matches[7]);
        var monthName = matches[5];
        var days = parseInt(matches[3]) - 1; // Days are zero indexed.
        var firstDelimiter = matches[4].replace(/\s*/g, '');
        var secondDelimiter = matches[6].replace(/\s*/g, '');
        // Check delimiters. If they're not the same, and the first one isn't a space, throw error.
        if (firstDelimiter !== secondDelimiter && firstDelimiter !== "") {
          throw new Error();
        }
        var tmpMoment = createMoment(years, monthName, days);
        if (matches.length >= 9 && matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check YEAR_MONTHNAME, YYYY(fd)Month, '1992/Aug'
    if (m === undefined) {
      var matches = dateString.match(YEAR_MONTHNAME);
      if (matches && matches.length >= 6) {
        var years = parseInt(matches[3]);
        var monthName = matches[5];
        var tmpMoment = createMoment(years, monthName, 0);
        if (matches[6] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[6], tmpMoment);
        }
        m = tmpMoment;
      }
    }
    return m;
  }

  /**
   * Casts a string to an ExcelDate. Throws error if parsing not possible.
   * @param dateString to parse
   * @returns {ExcelDate} resulting date
   */
  public static stringToExcelDate(dateString : string) : number {
    // m will be set and valid or invalid, or will remain undefined
    var m = TypeCaster.parseStringToMoment(dateString);
    if (m === undefined || !m.isValid()) {
      throw new ValueError("DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
    }
    return TypeCaster.momentToDayNumber(m.set('hours', 0).set('minutes', 0).set('seconds', 0));
  }

  /**
   * Converts any value to a number or throws an error if it cannot coerce it to the number type
   * @param value to convert
   * @returns {number} to return. Will always return a number or throw an error. Never returns undefined.
   */
  static valueToNumber(value : any) {
    if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      if (value === "") {
        return 0;
      }
      if (value.indexOf(".") > -1) {
        var fl = parseFloat(value.replace("$", ""));
        if (isNaN(fl)) {
          throw new ValueError("Function ____ expects number values, but is text and cannot be coerced to a number.");
        }
        return fl;
      }
      var fl = parseInt(value.replace("$", ""));
      if (isNaN(fl)) {
        throw new ValueError("Function ____ expects number values, but is text and cannot be coerced to a number.");
      }
      return fl;
    } else if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    return 0;
  }

  /**
   * Converts any value to a number, defaulting to 0 value in cases in which it cannot coerce it to a number type
   * @param value to conver
   * @returns {number} to return. Will always return a number or 0.
   */
  static valueToNumberGracefully(value: any) : number {
    try {
      return TypeCaster.valueToNumber(value);
    } catch (e) {
      return 0;
    }
  }

  /**
   * Converts any value to a boolean or throws an error if it cannot coerce it to the boolean type.
   * @param value to convert
   * @returns {boolean} to return.
   */
  static valueToBoolean(value: any) {
    if (typeof value === "number") {
      return value !== 0;
    } else if (typeof value === "string") {
      throw new ValueError("___ expects boolean values. But '" + value + "' is a text and cannot be coerced to a boolean.")
    } else if (typeof value === "boolean") {
      return value;
    }
  }
  /**
   * Convert a value to string.
   * @param value of any type, including array. array cannot be empty.
   * @returns {string} string representation of value
   */
  static valueToString(value: any) : string {
    if (typeof value === "number") {
      return value.toString();
    } else if (typeof value === "string") {
      return value;
    } else if (typeof value === "boolean") {
      return value ? "TRUE" : "FALSE";
    }
  }

  /**
   * Converts a value to a time number; a value between 0 and 1, exclusive on 1.
   * @param value to convert
   * @returns {number} representing a time value
   */
  static valueToTimestampNumber(value: any) : number {
    if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      if (value == "") {
        return 0;
      }
      try {
        return TypeCaster.stringToTimeNumber(value)
      } catch (e) {
        if (TypeCaster.canCoerceToNumber(value)) {
          return TypeCaster.valueToNumber(value);
        }
        throw new ValueError("___ expects number values. But '" + value + "' is a text and cannot be coerced to a number.")
      }
    } else if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    return 0;
  }

  /**
   * Returns true if we can coerce it to the number type.
   * @param value to coerce
   * @returns {boolean} if could be coerced to a number
   */
  static canCoerceToNumber(value: any) : boolean {
    if (typeof value === "number" || typeof value === "boolean") {
      return true;
    } else if (typeof value === "string") {
      if (value === "") {
        return false;
      }
      if (value.indexOf(".") > -1) {
        return !isNaN(parseFloat(value));
      }
      return !isNaN(parseInt(value));
    }
    return false;
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a number.
   * @param input to attempt to coerce into a number
   * @returns {number} number representation of the input
   */
  static firstValueAsNumber(input: any) : number {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeCaster.firstValueAsNumber(input[0]);
    }
    return TypeCaster.valueToNumber(input);
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a string.
   * @param input to attempt to coerce into a string
   * @returns {number} number representation of the input
   */
  static firstValueAsString(input: any) : string {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeCaster.firstValueAsString(input[0]);
    }
    return TypeCaster.valueToString(input);
  }

  static firstValue(input: any) : any {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeCaster.firstValue(input[0]);
    }
    return input;
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a string.
   * @param input to attempt to coerce into a string
   * @returns {number} number representation of the input
   */
  static firstValueAsBoolean(input: any): boolean {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeCaster.firstValueAsBoolean(input[0]);
    }
    return TypeCaster.valueToBoolean(input);
  }

  /**
   * Takes the input type and will throw a REF_ERROR or coerce it into a ExcelDate
   * @param input input to attempt to coerce to a ExcelDate
   * @param coerceBoolean should a boolean be converted
   * @returns {ExcelDate} representing a date
   */
  static firstValueAsExcelDate(input: any, coerceBoolean?: boolean) : number {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeCaster.firstValueAsExcelDate(input[0], coerceBoolean);
    }
    return TypeCaster.valueToExcelDate(input, coerceBoolean);
  }

  static firstValueAsTimestampNumber(input : any) : number {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeCaster.firstValueAsTimestampNumber(input[0]);
    }
    return TypeCaster.valueToTimestampNumber(input);
  }

  /**
   * Convert a value to ExcelDate if possible.
   * @param value to convert
   * @param coerceBoolean should a boolean be converted
   * @returns {ExcelDate} ExcelDate
   */
  static valueToExcelDate(value: any, coerceBoolean?: boolean) : number {
    if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      try {
        return TypeCaster.stringToExcelDate(value)
      } catch (e) {
        if (TypeCaster.canCoerceToNumber(value)) {
          return TypeCaster.valueToNumber(value);
        }
        throw new ValueError("___ expects date values. But '" + value + "' is a text and cannot be coerced to a date.")
      }
    } else if (typeof value === "boolean") {
      if (coerceBoolean) {
        return value ? 1 : 0;
      }
      throw new ValueError("___ expects date values. But '" + value + "' is a boolean and cannot be coerced to a date.")
    }
  }

  static momentToNumber(m : moment.Moment) : number {
    return m.diff(this.ORIGIN_MOMENT, "seconds") / this.SECONDS_IN_DAY;
  }

  static momentToDayNumber(m : moment.Moment) : number {
    return Math.floor(TypeCaster.momentToNumber(m));
  }

  static numberToMoment(n : number) : moment.Moment {
    return moment.utc(TypeCaster.ORIGIN_MOMENT).add(n, "days");
  }
}

/**
 * Catches divide by zero situations and throws them as errors
 * @param n number to check
 * @returns {number} n as long as it's not zero.
 */
var checkForDevideByZero = function(n : number) : number {
  n = +n;  // Coerce to number.
  if (!n) {  // Matches +0, -0, NaN
    throw new DivZeroError("Evaluation of function caused a divide by zero error.");
  }
  return n;
};

export {
  TypeCaster,
  checkForDevideByZero
}