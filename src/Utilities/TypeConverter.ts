/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import {
  RefError,
  ValueError,
  DivZeroError
} from "../Errors";
import {
  DateRegExBuilder
} from "./DateRegExBuilder";
import {
  Cell
} from "../Cell";

const MONTHDIG_DAYDIG = DateRegExBuilder.DateRegExBuilder()
  .start()
  .MM().FLEX_DELIMITER().DD_W_SPACE().OPTIONAL_TIMESTAMP_CAPTURE_GROUP()
  .end()
  .build();
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
// The first year to use when calculating the number of days in a date
const FIRST_YEAR = 1900;
// The year 2000.
const Y2K_YEAR = 2000;

function isUndefined(x) {
  return x === undefined;
}
function isDefined(x) {
  return x !== undefined;
}

/**
 * Matches a timestamp string, adding the units to the moment passed in.
 * @param timestampString to parse. ok formats: "10am", "10:10", "10:10am", "10:10:10", "10:10:10am", etc.
 * @param momentToMutate to mutate
 * @returns {Moment} mutated and altered.
 */
function matchTimestampAndMutateMoment(timestampString : string, momentToMutate: moment.Moment) : moment.Moment {
  let  matches = timestampString.match(TIMESTAMP);
  if (matches && matches[1] !== undefined) { // 10am
    let  hours = parseInt(matches[2]);
    if (hours > 12) {
      throw new Error();
    }
    momentToMutate.add(hours, 'hours');
  } else if (matches && matches[6] !== undefined) { // 10:10
    let  hours = parseInt(matches[7]);
    let  minutes = parseInt(matches[8]);
    momentToMutate.add(hours, 'hours').add(minutes, 'minutes');
  } else if (matches && matches[11] !== undefined) { // 10:10am
    let  hours = parseInt(matches[13]);
    let  minutes = parseInt(matches[14]);
    let  pmTrue = (matches[16].toLowerCase() === "pm");
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
    let  hours = parseInt(matches[19]);
    let  minutes = parseInt(matches[20]);
    let  seconds = parseInt(matches[21]);
    momentToMutate.add(hours, 'hours').add(minutes, 'minutes').add(seconds, 'seconds');
  } else if (matches && matches[23] !== undefined) { // // 10:10:10am
    let  hours = parseInt(matches[25]);
    let  minutes = parseInt(matches[26]);
    let  seconds = parseInt(matches[27]);
    let  pmTrue = (matches[28].toLowerCase() === "pm");
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
 * Static class of helpers used to convert let ious types to each other.
 */
class TypeConverter {

  public static ORIGIN_MOMENT = moment.utc([1899, 11, 30]).startOf("day");
  private static SECONDS_IN_DAY = 86400;


  /**
   * Converts a datetime string to a moment object. Will return undefined if the string can't be converted.
   * @param {string} timeString - string to parse and convert.
   * @returns {moment.Moment}
   */
  static stringToMoment(timeString : string) : moment.Moment {
    let m = TypeConverter.parseStringToMoment(timeString);
    if (m === undefined || !m.isValid()) {
      return undefined;
    }
    return m;
  }

  /**
   * Converts a time-formatted string to a number between 0 and 1, exclusive on 1.
   * @param timeString
   * @returns {number} representing time of day
   */
  static stringToTimeNumber(timeString: string) : number {
    let  m;
    try {
      m = matchTimestampAndMutateMoment(timeString, moment.utc([FIRST_YEAR]).startOf("year"));
    } catch (e) {
      m = TypeConverter.parseStringToMoment(timeString);
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
    let  m;

    /**
     * Creates moment object from years, months and days.
     * @param years of moment
     * @param months of moment in number or string format (eg: January)
     * @param days of moment
     * @returns {Moment} created moment
     */
    function createMoment(years, months, days) : moment.Moment {
      let  actualYear = years;
      if (years >= 0 && years < 30) {
        actualYear = Y2K_YEAR + years;
      } else if (years >= 30 && years < 100) {
        actualYear = FIRST_YEAR + years;
      }
      let  tmpMoment = moment.utc([actualYear]).startOf("year");
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

    // Check MONTHDIG_DAYDIG, MM(fd)DD, '01/06'
    // NOTE: Must come before YEAR_MONTHDIG matching.
    if (m === undefined) {
      let  matches = dateString.match(MONTHDIG_DAYDIG);
      if (matches && matches.length >= 10) {
        let  months = parseInt(matches[1]) - 1; // Months are zero indexed.
        let  days = parseInt(matches[3]) - 1; // Days are zero indexed.
        let tmpMoment = createMoment(moment.utc().get("years"), months, days);
        if (matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment
      }
    }

    // Check YEAR_MONTHDIG, YYYY(fd)MM, '1992/06'
    // NOTE: Must come before YEAR_MONTHDIG_DAY matching.
    if (m === undefined) {
      let  matches = dateString.match(YEAR_MONTHDIG);
      if (matches && matches.length >= 6) {
        let  years = parseInt(matches[3]);
        let  months = parseInt(matches[5]) - 1; // Months are zero indexed.
        let  tmpMoment = createMoment(years, months, 0);
        if (matches[6] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[6], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check YEAR_MONTHDIG_DAY, YYYY(fd)MM(fd)DD, "1992/06/24"
    if (m === undefined) {
      let  matches = dateString.match(YEAR_MONTHDIG_DAY);
      if (matches && matches.length >= 8) {
        // Check delimiters. If they're not the same, throw error.
        if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
          throw new Error();
        }
        let  years = parseInt(matches[3]);
        let  months = parseInt(matches[5]) - 1; // Months are zero indexed.
        let  days = parseInt(matches[7]) - 1; // Days are zero indexed.
        let  tmpMoment = createMoment(years, months, days);
        if (matches.length >= 9 && matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check MONTHDIG_YEAR, MM(fd)YYYY, '06/1992'
    // NOTE: Must come before MONTHDIG_DAY_YEAR matching.
    if (m === undefined) {
      let  matches = dateString.match(MONTHDIG_YEAR);
      if (matches && matches.length >= 6) {
        let  years = parseInt(matches[5]);
        let  months = parseInt(matches[3]) - 1; // Months are zero indexed.
        let  tmpMoment = createMoment(years, months, 0);
        if (matches[6] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[6], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check MONTHDIG_DAY_YEAR, MM(fd)DD(fd)YYYY, "06/24/1992"
    if (m === undefined) {
      let  matches = dateString.match(MONTHDIG_DAY_YEAR);
      if (matches && matches.length >= 8) {
        // Check delimiters. If they're not the same, throw error.
        if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
          throw new Error();
        }
        let  years = parseInt(matches[7]);
        let  months = parseInt(matches[3]) - 1; // Months are zero indexed.
        let  days = parseInt(matches[5]) - 1; // Days are zero indexed.
        let  tmpMoment = createMoment(years, months, days);
        if (matches.length >= 9 && matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check MONTHNAME_YEAR, Month(fd)YYYY, 'Aug 1992'
    // NOTE: Needs to come before DAY_MONTHNAME_YEAR matching.
    if (m === undefined) {
      let  matches = dateString.match(MONTHNAME_YEAR);
      if (matches && matches.length >= 6) {
        let  years = parseInt(matches[5]);
        let  monthName = matches[3];
        let  tmpMoment = createMoment(years, monthName, 0);
        if (matches[6] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[6], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check MONTHNAME_DAY_YEAR, Month(fd)DD(fd)YYYY, 'Aug 19 2020'
    if (m === undefined) {
      let  matches = dateString.match(MONTHNAME_DAY_YEAR);
      if (matches && matches.length >= 8) {
        // Check delimiters. If they're not the same, throw error.
        if (matches[4].replace(/\s*/g, '') !== matches[6].replace(/\s*/g, '')) {
          throw new Error();
        }
        let  years = parseInt(matches[7]);
        let  monthName = matches[3];
        let  days = parseInt(matches[5]) - 1; // Days are zero indexed.
        let  tmpMoment = createMoment(years, monthName, days);
        if (matches.length >= 9 && matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check DAY_MONTHNAME_YEAR, DD(fd)Month(fd)YYYY, '24/July/1992'
    if (m === undefined) {
      let  matches = dateString.match(DAY_MONTHNAME_YEAR);
      if (matches && matches.length >= 8) {
        let  years = parseInt(matches[7]);
        let  monthName = matches[5];
        let  days = parseInt(matches[3]) - 1; // Days are zero indexed.
        let  firstDelimiter = matches[4].replace(/\s*/g, '');
        let  secondDelimiter = matches[6].replace(/\s*/g, '');
        // Check delimiters. If they're not the same, and the first one isn't a space, throw error.
        if (firstDelimiter !== secondDelimiter && firstDelimiter !== "") {
          throw new Error();
        }
        let  tmpMoment = createMoment(years, monthName, days);
        if (matches.length >= 9 && matches[8] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[8], tmpMoment);
        }
        m = tmpMoment;
      }
    }

    // Check YEAR_MONTHNAME, YYYY(fd)Month, '1992/Aug'
    if (m === undefined) {
      let  matches = dateString.match(YEAR_MONTHNAME);
      if (matches && matches.length >= 6) {
        let  years = parseInt(matches[3]);
        let  monthName = matches[5];
        let  tmpMoment = createMoment(years, monthName, 0);
        if (matches[6] !== undefined) {
          tmpMoment = matchTimestampAndMutateMoment(matches[6], tmpMoment);
        }
        m = tmpMoment;
      }
    }
    return m;
  }

  /**
   * Parses a string as a date number. Throws error if parsing not possible.
   * @param dateString to parse
   * @returns {number} resulting date
   */
  public static stringToDateNumber(dateString : string) : number {
    // m will be set and valid or invalid, or will remain undefined
    let  m;
    try {
      m = TypeConverter.parseStringToMoment(dateString);
    } catch (e) {
      throw new ValueError("DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
    }
    if (m === undefined || !m.isValid()) {
      throw new ValueError("DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
    }
    return TypeConverter.momentToDayNumber(m.set('hours', 0).set('minutes', 0).set('seconds', 0));
  }

  /**
   * Converts strings to numbers, returning undefined if string cannot be parsed to number. Examples: "100", "342424",
   * "10%", "33.213131", "41.1231", "10e+1", "10E-1", "10.44E1", "-$9.29", "+$9.29", "1,000.1", "2000,000,000".
   * For reference see: https://regex101.com/r/PwghnF/9/
   * @param value to parse.
   * @returns {number} or undefined
   */
  public static stringToNumber(value: string) : number {
    const NUMBER_REGEX = /^ *([\+/-])? *(\$)? *([\+/-])? *((\d+)?(,\d{3})?(,\d{3})?(,\d{3})?(,\d{3})?)? *(\.)? *(\d*)? *(e|E)? *([\+/-])? *(\d*)? *(%)? *$/;

    let matches = value.match(NUMBER_REGEX);
    if (matches !== null) {
      let  firstSign = matches[1];
      let  currency = matches[2];
      let  secondSign = matches[3];
      let  wholeNumberWithCommas = matches[4];
      let  decimalPoint = matches[10];
      let  decimalNumber = matches[11];
      let  sciNotation = matches[12];
      let  sciNotationSign = matches[13];
      let  sciNotationFactor = matches[14];
      let  percentageSign = matches[15];

      // Number is not valid if it is a currency and in scientific notation.
      if (isDefined(currency) && isDefined(sciNotation)) {
        return;
      }
      // Number is not valid if there are two signs.
      if (isDefined(firstSign) && isDefined(secondSign)) {
        return;
      }
      // Number is not valid if we have 'sciNotation' but no 'sciNotationFactor'
      if (isDefined(sciNotation) && isUndefined(sciNotationFactor)) {
        return;
      }
      let  activeSign;
      if (isUndefined(firstSign) && isUndefined(secondSign)) {
        activeSign = "+";
      } else if (!isUndefined(firstSign)) {
        activeSign = firstSign;
      } else {
        activeSign = secondSign;
      }
      let  x;
      if (isDefined(wholeNumberWithCommas)) {
        if (isDefined(decimalNumber) && isDefined(decimalNumber)) {
          x = parseFloat(activeSign + wholeNumberWithCommas.split(",").join("") + decimalPoint + decimalNumber);
        } else {
          x = parseFloat(activeSign + wholeNumberWithCommas.split(",").join(""));
        }
      } else {
        x = parseFloat(activeSign + "0" + decimalPoint + decimalNumber);
      }

      if (isDefined(sciNotation) && isDefined(sciNotationFactor)) {
        sciNotationSign = isDefined(sciNotationSign) ? sciNotationSign : "+";
        // x + "e" + "-" + "10"
        x = parseFloat(x.toString() + sciNotation.toString() + "" + sciNotationSign.toString() + sciNotationFactor.toString())
      }
      if (!isUndefined(percentageSign)) {
        x = x * 0.01;
      }
      return x;
    } else {
      try {
        return TypeConverter.stringToDateNumber(value);
      } catch (_) {
        return;
      }
    }
  }

  /**
   * Converts any value to a number or throws an error if it cannot coerce it to the number type
   * @param value to convert
   * @returns {number} to return. Will always return a number or throw an error. Never returns undefined.
   */
  public static valueToNumber(value : any) {
    if (value instanceof Cell) {
      if (value.isBlank()) {
        return 0;
      } else {
        if (value.hasError()) {
          throw value.getError();
        }
        value = value.getValue();
      }
    }
    if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      if (value === "") {
        return 0;
      }
      let  n = TypeConverter.stringToNumber(value);
      if (n === undefined) {
        throw new ValueError("Function expects number values, but is text and cannot be coerced to a number.");
      }
      return n;
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
  public static valueToNumberGracefully(value: any) : number {
    try {
      return TypeConverter.valueToNumber(value);
    } catch (e) {
      return 0;
    }
  }

  /**
   * Converts any value to a boolean or throws an error if it cannot coerce it to the boolean type.
   * @param value to convert
   * @returns {boolean} to return.
   */
  public static valueToBoolean(value: any) {
    if (value instanceof Cell) {
      if (value.isBlank()) {
        return false;
      } else {
        if (value.hasError()) {
          throw value.getError();
        }
        value = value.getValue();
      }
    }
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
  public static valueToString(value: any) : string {
    if (value instanceof Cell) {
      if (value.isBlank()) {
        return "";
      } else {
        if (value.hasError()) {
          throw value.getError();
        }
        return value.getValue().toString();
      }
    } else if (typeof value === "number") {
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
  public static valueToTimestampNumber(value: any) : number {
    if (value instanceof Cell) {
      if (value.isBlank()) {
        return 0;
      } else {
        if (value.hasError()) {
          throw value.getError();
        }
        return value.getValue();
      }
    } else if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      if (value == "") {
        return 0;
      }
      try {
        return TypeConverter.stringToTimeNumber(value)
      } catch (e) {
        if (TypeConverter.canCoerceToNumber(value)) {
          return TypeConverter.valueToNumber(value);
        }
        throw new ValueError("___ expects number values. But '" + value + "' is a text and cannot be coerced to a number.")
      }
    } else if (typeof value === "boolean") {
      return 0; // value between 0 and 1, exclusive on 1.
    }
    return 0;
  }

  /**
   * Returns true if string is number format.
   * @param str to check
   * @returns {boolean}
   */
  public static isNumber(str : string) {
    return str.match("\s*(\d+\.?\d*$)|(\.\d+$)|([0-9]{2}%$)|([0-9]{1,}$)") !== null;
  }

  /**
   * Returns true if we can coerce it to the number type.
   * @param value to coerce
   * @returns {boolean} if could be coerced to a number
   */
  public static canCoerceToNumber(value: any) : boolean {
    if (typeof value === "number" || typeof value === "boolean" || value instanceof Cell) {
      return true;
    } else if (typeof value === "string") {
      return TypeConverter.isNumber(value);
    }
    return false;
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a number.
   * @param input to attempt to coerce into a number
   * @returns {number} number representation of the input
   */
  public static firstValueAsNumber(input: any) : number {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeConverter.firstValueAsNumber(input[0]);
    }
    return TypeConverter.valueToNumber(input);
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a string.
   * @param input to attempt to coerce into a string
   * @returns {number} number representation of the input
   */
  public static firstValueAsString(input: any) : string {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeConverter.firstValueAsString(input[0]);
    }
    return TypeConverter.valueToString(input);
  }


  /**
   * Returns the first value that is not of the type array. Will throw RefError if any empty arrays are passed in.
   * @param input to retrieve first value of
   * @returns {any} any non-array value.
   */
  public static firstValue(input: any) : any {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeConverter.firstValue(input[0]);
    }
    return input;
  }

  /**
   * Takes any input type and will throw a REF_ERROR or coerce it into a string.
   * @param input to attempt to coerce into a string
   * @returns {number} number representation of the input
   */
  public static firstValueAsBoolean(input: any): boolean {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeConverter.firstValueAsBoolean(input[0]);
    }
    return TypeConverter.valueToBoolean(input);
  }

  /**
   * Takes the input type and will throw a REF_ERROR or coerce it into a date number
   * @param input input to attempt to coerce to a date number
   * @param coerceBoolean should a boolean be converted
   * @returns {number} representing a date
   */
  public static firstValueAsDateNumber(input: any, coerceBoolean?: boolean) : number {
    coerceBoolean = coerceBoolean || false;
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeConverter.firstValueAsDateNumber(input[0], coerceBoolean || false);
    }
    return TypeConverter.valueToDateNumber(input, coerceBoolean);
  }

  /**
   * Takes the input type and will throw a REF_ERROR or coerce it into a time number
   * @param input input to attempt to coerce to a time number
   * @returns {number} representing time of day
   */
  public static firstValueAsTimestampNumber(input : any) : number {
    if (input instanceof Array) {
      if (input.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return TypeConverter.firstValueAsTimestampNumber(input[0]);
    }
    return TypeConverter.valueToTimestampNumber(input);
  }

  /**
   * Convert a value to date number if possible.
   * @param value to convert
   * @param coerceBoolean should a boolean be converted
   * @returns {number} date
   */
  public static valueToDateNumber(value: any, coerceBoolean?: boolean) : number {
    if (value instanceof Cell) {
      if (value.isBlank()) {
        return 0;
      } else {
        if (value.hasError()) {
          throw value.getError();
        }
        return value.getValue();
      }
    } else if (typeof value === "number") {
      return value;
    } else if (typeof value === "string") {
      try {
        return TypeConverter.stringToDateNumber(value);
      } catch (e) {
        if (TypeConverter.canCoerceToNumber(value)) {
          return TypeConverter.valueToNumber(value);
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

  /**
   * Converts a moment to a date number.
   * @param m to convert
   * @returns {number} date
   */
  public static momentToNumber(m : moment.Moment) : number {
    return m.diff(this.ORIGIN_MOMENT, "seconds") / this.SECONDS_IN_DAY;
  }

  /**
   * Converts a moment to a date number, floored to the whole day date.
   * @param m to convert
   * @returns {number} date
   */
  public static momentToDayNumber(m : moment.Moment) : number {
    return Math.floor(TypeConverter.momentToNumber(m));
  }

  /**
   * Converts a number to moment.
   * @param n to convert
   * @returns {Moment} date
   */
  public static numberToMoment(n : number) : moment.Moment {
    return moment.utc(TypeConverter.ORIGIN_MOMENT).add(n, "days");
  }

  /**
   * Converts a number to moment while preserving the decimal part of the number.
   * @param n to convert
   * @returns {Moment} date
   */
  public static decimalNumberToMoment(n : number) : moment.Moment {
    return moment.utc(TypeConverter.ORIGIN_MOMENT).add(n * TypeConverter.SECONDS_IN_DAY * 1000, "milliseconds");
  }

  /**
   * Using timestamp units, create a time number between 0 and 1, exclusive on end.
   * @param hours
   * @param minutes
   * @param seconds
   * @returns {number} representing time of day between 0 and 1, exclusive on end.
   */
  public static unitsToTimeNumber(hours: number, minutes: number, seconds: number): number {
    let  v = (((hours % 24) * 60 * 60) + ((minutes) * 60) + (seconds)) / 86400;
    return v % 1;
  }
}

/**
 * Catches divide by zero situations and throws them as errors
 * @param n number to check
 * @returns {number} n as long as it's not zero.
 */
let  checkForDevideByZero = function(n : number) : number {
  n = +n;  // Coerce to number.
  if (!n) {  // Matches +0, -0, NaN
    throw new DivZeroError("Evaluation of function caused a divide by zero error.");
  }
  return n;
};

export {
  TypeConverter,
  checkForDevideByZero
}