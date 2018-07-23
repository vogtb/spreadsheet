/// <reference path="../../node_modules/moment/moment.d.ts" />
/**
 * Converts a provided year, month, and day into a date.
 * @param year - The year component of the date.
 * @param month - The month component of the date.
 * @param day - The day component of the date.
 * @returns {number} newly created date.
 * @constructor
 */
declare let DATE: (year: any, month: any, day: any) => number;
/**
 * Converts a provided date string in a known format to a date value.
 * @param dateString - The string representing the date. Understood formats include any date format which is
 * normally auto-converted when entered, without quotation marks, directly into a cell. Understood formats may depend on
 * region and language settings.
 * @returns {number} of days since 1900/1/1, inclusively.
 * @constructor
 */
declare let DATEVALUE: (dateString: any) => number;
/**
 * Returns a date a specified number of months before or after another date.
 * @param startDate - The date from which to calculate the result.
 * @param months - The number of months before (negative) or after (positive) start_date to calculate.
 * @returns {number} date a specified number of months before or after another date
 * @constructor
 */
declare let EDATE: (startDate: any, months: any) => number;
/**
 * Returns a date representing the last day of a month which falls a specified number of months before or after another
 * date.
 * @param startDate - The date from which to calculate the the result.
 * @param months - The number of months before (negative) or after (positive) start_date to consider. The last
 * calendar day of the calculated month is returned.
 * @returns {number} the last day of a month
 * @constructor
 */
declare let EOMONTH: (startDate: any, months: any) => number;
/**
 * Returns the day of the month that a specific date falls on, in numeric format.
 * @param date - The date from which to extract the day. Must be a reference to a cell containing a date, a
 * function returning a date type, or a number.
 * @returns {number} day of the month
 * @constructor
 */
declare let DAY: (date: any) => number;
/**
 * Returns the number of days between two dates.
 * @param endDate most recently occurring
 * @param startDate not most recently occurring
 * @returns {number} of days between start_date and end_date
 * @constructor
 */
declare let DAYS: (endDate: any, startDate: any) => number;
/**
 * Returns the difference between two days based on the 360 day year used in some financial interest calculations.
 * @param startDate - The start date to consider in the calculation. Must be a reference to a cell containing
 * a date, a function returning a date type, or a number.
 * @param endDate - The end date to consider in the calculation. Must be a reference to a cell containing a
 * date, a function returning a date type, or a number.
 * @param methodToUse - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use.
 * 0 indicates the US method - Under the US method, if start_date is the last day of a month, the day of month of
 * start_date is changed to 30 for the purposes of the calculation. Furthermore if end_date is the last day of a month
 * and the day of the month of start_date is earlier than the 30th, end_date is changed to the first day of the month
 * following end_date, otherwise the day of month of end_date is changed to 30.
 * Any other value indicates the European method - Under the European method, any start_date or end_date that falls on
 * the 31st of a month has its day of month changed to 30.
 * @returns {number} of days between two dates
 * @constructor
 */
declare let DAYS360: (startDate: any, endDate: any, methodToUse?: any) => number;
/**
 * Returns the month of the year a specific date falls in, in numeric format.
 * @param date - The date from which to extract the month. Must be a reference to a cell containing a date, a
 * function returning a date type, or a number.
 * @returns {number} month of the year that the input date falls on.
 * @constructor
 */
declare let MONTH: (date: any) => number;
/**
 * Returns the year specified by a given date.
 * @param date - The date from which to calculate the year. Must be a cell reference to a cell containing a
 * date, a function returning a date type, or a number.
 * @returns {number} year of the input date
 * @constructor
 */
declare let YEAR: (date: any) => number;
/**
 * Returns a number representing the day of the week of the date provided.
 * @param date - The date for which to determine the day of the week. Must be a reference to a cell containing
 * a date, a function returning a date type, or a number.
 * @param offsetType - [ OPTIONAL - 1 by default ] - A number indicating which numbering system to use to represent
 * weekdays. By default counts starting with Sunday = 1. If type is 1, days are counted from Sunday and the value of
 * Sunday is 1, therefore the value of Saturday is 7. If type is 2, days are counted from Monday and the value of Monday
 * is 1, therefore the value of Sunday is 7. If type is 3, days are counted from Monday and the value of Monday is 0,
 * therefore the value of Sunday is 6.
 * @returns {number} day of week
 * @constructor
 */
declare let WEEKDAY: (date: any, offsetType?: any) => number;
/**
 * Returns a number representing the week of the year where the provided date falls. When inputting the date, it is best
 * to use the DATE function, as text values may return errors.
 *
 * Behind the scenes, there are two week numbering "systems" used for this function: System 1 - The first week of the
 * year is considered to be the week containing January 1, which is numbered week 1. System 2 - The first week of the
 * year is considered to be the week containing the first Thursday of the year, which is numbered as week 1. System 2 is
 * the approach specified in ISO 8601, also known as the European system for numbering weeks.
 *
 * @param date - The date for which to determine the week number. Must be a reference to a cell containing a
 * date, a function returning a date type, or a number.
 * @param shiftType - [ OPTIONAL - default is 1 ] - A number representing the day that a week starts on as well as
 * the system used for determining the first week of the year (1=Sunday, 2=Monday).
 * @returns {number} representing week number of year.
 * @constructor
 */
declare let WEEKNUM: (date: any, shiftType?: any) => number;
/**
 * Calculates the number of days, months, or years between two dates.
 * @param startDate - The start date to consider in the calculation. Must be a reference to a cell containing
 * a DATE, a function returning a DATE type, or a number.
 * @param endDate - The end date to consider in the calculation. Must be a reference to a cell containing a
 * DATE, a function returning a DATE type, or a number.
 * @param unit - A text abbreviation for unit of time. For example,"M" for month. Accepted values are "Y": the
 * number of whole years between start_date and end_date, "M": the number of whole months between start_date and
 * end_date, "D": the number of days between start_date and end_date, "MD": the number of days between start_date and
 * end_date after subtracting whole months, "YM": the number of whole months between start_date and end_date after
 * subtracting whole years, "YD": the number of days between start_date and end_date, assuming start_date and end_date
 * were no more than one year apart.
 * @returns {number} number of days, months, or years between two dates.
 * @constructor
 */
declare let DATEDIF: (startDate: any, endDate: any, unit: any) => number;
/**
 * Returns the number of years, including fractional years, between two dates using a specified day count convention.
 *
 * Further reading:
 *
 * * http://christian-fries.de/blog/files/2013-yearfrac.html
 *
 * * http://finmath.net/finmath-lib/
 *
 * @param startDate - The start date to consider in the calculation. Must be a reference to a cell
 * containing a date, a function returning a date type, or a number.
 * @param endDate - The end date to consider in the calculation. Must be a reference to a cell containing
 * a date, a function returning a date type, or a number.
 * @param dayCountConvention - [ OPTIONAL - 0 by default ] - An indicator of what day count method to
 * use.
 * @returns {number}the number of years, including fractional years, between two dates
 * @constructor
 */
declare let YEARFRAC: (startDate: any, endDate: any, dayCountConvention?: any) => number;
/**
 * Returns the fraction of a 24-hour day the time represents.
 * @param timeString - The string that holds the time representation. Eg: "10am", "10:10", "10:10am", "10:10:11",
 * or "10:10:11am".
 * @returns {number} representing the fraction of a 24-hour day
 * @constructor
 */
declare let TIMEVALUE: (timeString: any) => number;
/**
 * Returns the hour component of a specific time, in numeric format.
 * @param time - The time from which to calculate the hour component. Must be a reference to a cell containing
 * a date/time, a function returning a date/time type, or a number.
 * @returns {number}
 * @constructor
 */
declare let HOUR: (time: any) => number;
/**
 * Returns the minute component of a specific time, in numeric format.
 * @param time - The time from which to calculate the minute component. Must be a reference to a cell
 * containing a date/time, a function returning a date/time type, or a number.
 * @returns {number} minute of the time passed in.
 * @constructor
 */
declare let MINUTE: (time: any) => number;
/**
 * Returns the second component of a specific time, in numeric format.
 * @param time - The time from which to calculate the second component. Must be a reference to a cell
 * containing a date/time, a function returning a date/time type, or a number.
 * @returns {number} second component of a specific time.
 * @constructor
 */
declare let SECOND: (time: any) => number;
/**
 * Returns the number of net working days between two provided days.
 * @param startDate - The start date of the period from which to calculate the number of net working days.
 * @param endDate - The end date of the period from which to calculate the number of net working days.
 * @param holidays - [ OPTIONAL ] - A range or array constant containing the date serial numbers to consider
 * holidays. The values provided within an array for holidays must be date serial number values, as returned by N or
 * date values, as returned by DATE, DATEVALUE or TO_DATE. Values specified by a range should be standard date values or
 * date serial numbers.
 * @returns {number} the number of net working days between two provided dates.
 * @constructor
 */
declare let NETWORKDAYS: (startDate: any, endDate: any, holidays?: any) => number;
/**
 * Returns the number of networking days between two provided days excluding specified weekend days and holidays.
 * @param startDate - The start date of the period from which to calculate the number of net working days.
 * @param endDate - The end date of the period from which to calculate the number of net working days.
 * @param weekend - [ OPTIONAL - 1 by default ] - A number or string representing which days of the week are
 * considered weekends. String method: weekends can be specified using seven 0’s and 1’s, where the first number in the
 * set represents Monday and the last number is for Sunday. A zero means that the day is a work day, a 1 means that the
 * day is a weekend. For example, “0000011” would mean Saturday and Sunday are weekends. Number method: instead of using
 * the string method above, a single number can be used. 1 = Saturday/Sunday are weekends, 2 = Sunday/Monday, and this
 * pattern repeats until 7 = Friday/Saturday. 11 = Sunday is the only weekend, 12 = Monday is the only weekend, and this
 * pattern repeats until 17 = Saturday is the only weekend.
 * @param holidays - [ OPTIONAL ] - A range or array constant containing the dates to consider as holidays.
 * The values provided within an array for holidays must be date serial number values, as returned by N or date values,
 * as returned by DATE, DATEVALUE or TO_DATE. Values specified by a range should be standard date values or date serial
 * numbers.
 * @returns {number} of networking days between two provided days
 * @constructor
 */
declare let NETWORKDAYS$INTL: (startDate: any, endDate: any, weekend?: any, holidays?: any) => number;
/**
 * Returns the current date and time as a date value.
 * @returns {number} representing the current date and time.
 * @constructor
 */
declare let NOW: () => number;
/**
 * Returns the current date as a date value.
 * @returns {number} today
 * @constructor
 */
declare let TODAY: () => number;
/**
 * Converts a provided hour, minute, and second into a time. Will silently recalculate numeric time values which fall
 * outside of valid ranges. Eg: TIME(24, 0, 0) is the same as TIME(0, 0, 0).
 * @param hours - The hour component of the time.
 * @param minutes - The minute component of the time.
 * @param seconds - The second component of the time.
 * @returns {number} time of day
 * @constructor
 */
declare let TIME: (hours: any, minutes: any, seconds: any) => number;
/**
 * Calculates the end date after a specified number of working days.
 * @param startDate - The date from which to begin counting.
 * @param numberOfDays - The number of working days to advance from start_date. If negative, counts backwards. If
 * not an integer, truncate.
 * @param holidays - [ OPTIONAL ] - A range or array constant containing the dates to consider holidays. The
 * values provided within an array for holidays must be date serial number values, as returned by N or date values, as
 * returned by DATE, DATEVALUE or TO_DATE. Values specified by a range should be standard date values or date serial
 * numbers.
 * @returns {number} end date after a specified number of working days.
 * @constructor
 */
declare let WORKDAY: (startDate: any, numberOfDays: any, holidays?: any) => number;
/**
 * Calculates the date after a specified number of workdays excluding specified weekend days and holidays.
 * @param startDate - The date from which to begin counting.
 * @param numberOfDays - The number of working days to advance from start_date. If negative, counts backwards.
 * @param weekend - [ OPTIONAL - 1 by default ] - A number or string representing which days of the week are
 * considered weekends. String method: weekends can be specified using seven 0’s and 1’s, where the first number in the
 * set represents Monday and the last number is for Sunday. A zero means that the day is a work day, a 1 means that the
 * day is a weekend. For example, “0000011” would mean Saturday and Sunday are weekends. Number method: instead of using
 * the string method above, a single number can be used. 1 = Saturday/Sunday are weekends, 2 = Sunday/Monday, and this
 * pattern repeats until 7 = Friday/Saturday. 11 = Sunday is the only weekend, 12 = Monday is the only weekend, and this
 * pattern repeats until 17 = Saturday is the only weekend.
 * @param holidays - [ OPTIONAL ] - A range or array constant containing the dates to consider holidays.
 * @returns {number}
 * @constructor
 */
declare let WORKDAY$INTL: (startDate: any, numberOfDays: any, weekend?: any, holidays?: any) => number;
export { DATE, DATEVALUE, DATEDIF, DAYS, DAY, DAYS360, EDATE, EOMONTH, MONTH, YEAR, WEEKDAY, WEEKNUM, YEARFRAC, TIMEVALUE, HOUR, MINUTE, SECOND, NETWORKDAYS, NETWORKDAYS$INTL, NOW, TODAY, TIME, WORKDAY, WORKDAY$INTL };
