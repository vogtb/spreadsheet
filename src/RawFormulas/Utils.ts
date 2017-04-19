/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import { ValueError, RefError, NAError, DivZeroError } from "../Errors"
import { ExcelDate } from "../ExcelDate";

/**
 * Converts wild-card style expressions (in which * matches zero or more characters, and ? matches exactly one character)
 * to regular expressions. * and ? can be escaped by prefixing ~
 * @param c input
 * @returns {RegExp} resulting regex
 */
function wildCardRegex(c: string) {
  var a = c.split("~?");
  for (var i = 0; i < a.length; i++) {
    a[i] = a[i].split("?").join(".{1}");
  }
  var b = a.join("\\\?");
  var d = b.split("~*");
  for (var i = 0; i < d.length; i++) {
    d[i] = d[i].split("*").join(".*");
  }
  return new RegExp("^"+d.join(".*")+"$", "g");
}

/**
 * Build a regular expression step by step, to make it easier to build and read the resulting regular expressions.
 */
class DateRegExBuilder {
  private regexString = "";
  private static ZERO_OR_MORE_SPACES = "\\s*";

  static DateRegExBuilder() : DateRegExBuilder {
    return new DateRegExBuilder();
  }

  /**
   * Start the regular expression builder by matching the start of a line and zero or more spaces.
   * @returns {DateRegExBuilder} builder
   */
  start() : DateRegExBuilder {
    this.regexString += "^" + DateRegExBuilder.ZERO_OR_MORE_SPACES;
    return this;
  }

  /**
   * End the regular expression builder by matching the end of the line.
   * @returns {DateRegExBuilder} builder
   */
  end(): DateRegExBuilder {
    this.regexString += "$";
    return this;
  }

  /**
   * Capture all month full name and short names to the regular expression.
   * @returns {DateRegExBuilder} builder
   */
  MONTHNAME() : DateRegExBuilder {
    this.regexString += "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)";
    return this;
  }

  /**
   * Capture all month full name and short names to the regular expression, in addition to any followed by one or more
   * spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  MONTHNAME_W_SPACE() : DateRegExBuilder {
    this.regexString += "(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec|january\\s+|february\\s+|march\\s+|april\\s+|may\\s+|june\\s+|july\\s+|august\\s+|september\\s+|october\\s+|november\\s+|december\\s+|jan\\s+|feb\\s+|mar\\s+|apr\\s+|jun\\s+|jul\\s+|aug\\s+|sep\\s+|oct\\s+|nov\\s+|dec\\s+)";
    return this;
  }

  /**
   * Add capture group for optionally capturing day names.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  OPTIONAL_DAYNAME() : DateRegExBuilder {
    this.regexString += "(sunday|monday|tuesday|wednesday|thursday|friday|saturday|sun|mon|tue|wed|thu|fri|sat)?";
    return this;
  }

  /**
   * Add capture group for optionally capturing a comma followed by one or more spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  OPTIONAL_COMMA() : DateRegExBuilder {
    this.regexString += "(,?\\s+)?";
    return this;
  }

  /**
   * Add capture group for capturing month digits between 01 and 12, inclusively.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  MM() : DateRegExBuilder {
    this.regexString += "([1-9]|0[1-9]|1[0-2])";
    return this;
  }

  /**
   * Add capture group for capturing month digits between 01 and 12, inclusively, in addition to any followed by one or
   * more spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  MM_W_SPACE() : DateRegExBuilder {
    this.regexString += "([1-9]|0[1-9]|1[0-2]|[1-9]\\s+|0[1-9]\\s+|1[0-2]\\s+)";
    return this;
  }

  /**
   * Add capture group for capturing day digits between 01 and 31, inclusively.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  DD() : DateRegExBuilder {
    this.regexString += "(0?[0-9]|1[0-9]|2[0-9]|3[0-1])";
    return this;
  }

  /**
   * Add capture group for capturing day digits between 01 and 31, inclusively, in addition to any followed by one or
   * more spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  DD_W_SPACE() : DateRegExBuilder {
    this.regexString += "(0?[0-9]|1[0-9]|2[0-9]|3[0-1]|0?[0-9]\\s+|1[0-9]\\s+|2[0-9]\\s+|3[0-1]\\s+)";
    return this;
  }

  /**
   * Add capture group for capturing 4 digits or 3 digits starting with 0-9.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  YYYY() : DateRegExBuilder {
    this.regexString += "([0-9]{4}|[1-9][0-9][0-9])";
    return this;
  }

  /**
   * Add capture group for capturing 1 through 4 digits.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  YYYY14() : DateRegExBuilder {
    this.regexString += "([0-9]{1,4})";
    return this;
  }

  /**
   * Add capture group for capturing 1 through 4 digits, in addition to any followed by one or more spaces.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  YYYY14_W_SPACE() : DateRegExBuilder {
    this.regexString += "([0-9]{1,4}|[0-9]{1,4}\\s+)";
    return this;
  }

  YYYY2_OR_4_W_SPACE() : DateRegExBuilder {
    this.regexString += "([0-9]{2}|[0-9]{4}|[0-9]{2}\\s+|[0-9]{4}\\s+)";
    return this;
  }

  /**
   * Add capture group for a flexible delimiter, including ", ", " ", ". ", "\", "-".
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  FLEX_DELIMITER() : DateRegExBuilder {
    // this.regexString += "(,?\\s+|\\s*-?\\.?-?\\/?\\s+)";// close to being right
    this.regexString += "(,?\\s+|\\s*\\.\\s+|\\s*-\\s*|\\s*\\/\\s*)";
    return this;
  }

  /**
   * Add capture group for a flexible delimiter, including ", ", " ", ".", "\", "-". Different from FLEX_DELIMITER
   * in that it will match periods with zero or more spaces on either side.
   * For reference: https://regex101.com/r/q1fp1z/1/
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  FLEX_DELIMITER_LOOSEDOT() : DateRegExBuilder {
    // this.regexString += "(,?\\s+|\\s*-?\\.?-?\\/?\\s+)";// close to being right
    this.regexString += "(,?\\s+|\\s*\\.\\s*|\\s*-\\s*|\\s*\\/\\s*)";
    return this;
  }

  /**
   * Add a capture group for capturing timestamps including: "10am", "10:10", "10:10pm", "10:10:10", "10:10:10am", along
   * with zero or more spaces after semi colons, AM or PM, and unlimited number of digits per unit.
   * @returns {DateRegExBuilder} builder
   * @constructor
   */
  OPTIONAL_TIMESTAMP_CAPTURE_GROUP() : DateRegExBuilder {
    this.regexString += "((\\s+[0-9]+\\s*am\\s*$|[0-9]+\\s*pm\\s*$)|(\\s+[0-9]+:\\s*[0-9]+\\s*$)|(\\s+[0-9]+:\\s*[0-9]+\\s*am\\s*$|\\s+[0-9]+:\\s*[0-9]+\\s*pm\\s*$)|(\\s+[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*$)|(\\s+[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*am\\s*$|[0-9]+:\\s*[0-9]+:\\s*[0-9]+\\s*pm\\s*$))?";
    return this;
  }

  TIMESTAMP_UNITS_CAPTURE_GROUP() : DateRegExBuilder {
    this.regexString += "(\\s*([0-9]+)()()\\s*(am|pm)\\s*$)|(\\s*([0-9]+):\\s*([0-9]+)()()\\s*$)|(\\s*(([0-9]+):\\s*([0-9]+)()\\s*(am|pm))\\s*$)|(\\s*(([0-9]+):\\s*([0-9]+):\\s*([0-9]+)())\\s*$)|(\\s*(([0-9]+):\\s*([0-9]+):\\s*([0-9]+)\\s*(am|pm))\\s*$)";
    return this;
  }

  /**
   * Build the regular expression and ignore case.
   * @returns {RegExp}
   */
  build() : RegExp {
    return new RegExp(this.regexString, 'i');
  }
}

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
 * Creates a criteria function to evaluate elements in a range in an *IF function.
 */
class CriteriaFunctionFactory {
  /**
   * If the criteria is a number, use strict equality checking.
   * If the criteria is a string, check to see if it is a comparator.
   * If the criteria is a string, and it is not a comparator, check for regex.
   * If the criteria is a string and has not matched the above, finally use strict equality checking as a fallback.
   * If the criteria has not been set, default to false-returning criteria function.
   * @param criteria
   * @returns {(x:any)=>boolean}
   */
  static createCriteriaFunction(criteria: string) : Function {
    // Default criteria does nothing
    var criteriaEvaluation = function (x) : boolean {
      return false;
    };

    if (typeof criteria === "number" || typeof criteria === "boolean") {
      criteriaEvaluation = function (x) : boolean {
        return x === criteria;
      };
    } else if (typeof criteria === "string") {
      var comparisonMatches = criteria.match(/^\s*(<=|>=|=|<>|>|<)\s*(-)?\s*(\$)?\s*([0-9]+([,.][0-9]+)?)\s*$/);
      if (comparisonMatches !== null && comparisonMatches.length >= 6 && comparisonMatches[4] !== undefined) {
        criteriaEvaluation = function (x) : boolean {
          return eval(x + comparisonMatches[1] + (comparisonMatches[2] === undefined ? "" : "-") +  comparisonMatches[4]);
        };
        if (comparisonMatches[1] === "=") {
          criteriaEvaluation = function (x) : boolean {
            return eval(x + "===" + (comparisonMatches[2] === undefined ? "" : "-") +  comparisonMatches[4]);
          };
        }
        if (comparisonMatches[1] === "<>") {
          criteriaEvaluation = function (x) : boolean {
            return eval(x + "!==" + (comparisonMatches[2] === undefined ? "" : "-") +  comparisonMatches[4]);
          };
        }
      } else if (criteria.match(/\*|\~\*|\?|\~\?/) !== null) {
        // Regular string
        var matches = criteria.match(/\*|\~\*|\?|\~\?/);
        if (matches !== null) {
          criteriaEvaluation = function (x) : boolean {
            try {
              // http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
              return wildCardRegex(criteria).test(x);
            } catch (e) {
              return false;
            }
          };
        } else {
          criteriaEvaluation = function (x) : boolean {
            return x === criteria;
          };
        }
      } else {
        criteriaEvaluation = function (x) : boolean {
          return x === criteria;
        };
      }
    }
    return criteriaEvaluation;
  }
}


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
  public static stringToExcelDate(dateString : string) : ExcelDate {
    // m will be set and valid or invalid, or will remain undefined
    var m = TypeCaster.parseStringToMoment(dateString);
    if (m === undefined || !m.isValid()) {
      throw new ValueError("DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
    }
    return new ExcelDate(m.set('hours', 0).set('minutes', 0).set('seconds', 0));
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
    } else if (value instanceof Array) {
      return this.valueToString(value[0]); // TODO: Take this out. It's stupid. We should handle arrays at a different level.
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
  static firstValueAsExcelDate(input: any, coerceBoolean?: boolean) : ExcelDate {
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
  static valueToExcelDate(value: any, coerceBoolean?: boolean) : ExcelDate {
    if (value instanceof ExcelDate) {
      return value;
    } else if (typeof value === "number") {
      return new ExcelDate(value);
    } else if (typeof value === "string") {
      try {
        return TypeCaster.stringToExcelDate(value)
      } catch (e) {
        if (TypeCaster.canCoerceToNumber(value)) {
          return new ExcelDate(TypeCaster.valueToNumber(value));
        }
        throw new ValueError("___ expects date values. But '" + value + "' is a text and cannot be coerced to a date.")
      }
    } else if (typeof value === "boolean") {
      if (coerceBoolean) {
        return new ExcelDate(value ? 1 : 0);
      }
      throw new ValueError("___ expects date values. But '" + value + "' is a boolean and cannot be coerced to a date.")
    }
  }
}

/**
 * Static class to help filter down Arrays
 */
class Filter {
  /**
   * Converts string values in array to 0
   * @param arr to convert
   * @returns {Array} array in which all string values have been converted to 0.
   */
  static stringValuesToZeros(arr: Array<any>) : Array<any> {
    var toReturn = [];
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "string") {
        toReturn.push(arr[i]);
      } else {
        toReturn.push(0);
      }
    }
    return toReturn;
  }

  /**
   * Flatten an array of arrays of ...etc.
   * @param values array of values
   * @returns {Array} flattened array
   */
  static flatten(values: Array<any>) : Array<any> {
    return values.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? Filter.flatten(toFlatten) : toFlatten);
    }, []);
  }

  /**
   * Flatten an array of arrays of... etc, but throw an error if any are empty references.
   * @param values array of values
   * @returns {Array} flattened array
   */
  static flattenAndThrow(values: Array<any>) : Array<any> {
    return values.reduce(function (flat, toFlatten) {
      if (Array.isArray(toFlatten) && toFlatten.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      return flat.concat(Array.isArray(toFlatten) ? Filter.flattenAndThrow(toFlatten) : toFlatten);
    }, []);
  }

  /**
   * Filter out all strings from an array.
   * @param arr to filter
   * @returns {Array} filtered array
   */
  static filterOutStringValues(arr: Array<any>) : Array<any> {
    var toReturn = [];
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "string") {
        toReturn.push(arr[i]);
      }
    }
    return toReturn;
  }

  /**
   * Filters out non number values.
   * @param arr to filter
   * @returns {Array} filtered array
   */
  static filterOutNonNumberValues(arr: Array<any>) : Array<any> {
    var toReturn = [];
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== "string" && typeof arr[i] !== "boolean") {
        toReturn.push(arr[i]);
      }
    }
    return toReturn;
  }
}

/**
 * Static class to check argument length within expected ranges when calling functions.
 */
class ArgsChecker {
  /**
   * Checks to see if the arguments are of the correct length.
   * @param args to check length of
   * @param length expected length
   */
  static checkLength(args: any, length: number) {
    if (args.length !== length) {
      throw new NAError("Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
    }
  }

  /**
   * Checks to see if the arguments are at least a certain length.
   * @param args to check length of
   * @param length expected length
   */
  static checkAtLeastLength(args: any, length: number) {
    if (args.length < length) {
      throw new NAError("Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
    }
  }

  /**
   * Checks to see if the arguments are within a max and min, inclusively
   * @param args to check length of
   * @param low least number of arguments
   * @param high max number of arguments
   */
  static checkLengthWithin(args: any, low: number, high: number) {
    if (args.length > high || args.length < low) {
      throw new NAError("Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
    }
  }
}

/**
 * Class to hold static methods for serialization.
 */
class Serializer {
  static serialize(value: any) : string {
    var t = typeof value;
    return "<" +  t + ": " + value + ">";
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

var divideAndCheck



export {
  ArgsChecker,
  CriteriaFunctionFactory,
  DateRegExBuilder,
  Filter,
  Serializer,
  TypeCaster,
  checkForDevideByZero
}