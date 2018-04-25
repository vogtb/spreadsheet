"use strict";
exports.__esModule = true;
/// <reference path="../../node_modules/moment/moment.d.ts"/>
var moment = require("moment");
var ArgsChecker_1 = require("../Utilities/ArgsChecker");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Errors_1 = require("../Errors");
/**
 * Converts a provided year, month, and day into a date.
 * @param year - The year component of the date.
 * @param month - The month component of the date.
 * @param day - The day component of the date.
 * @returns {number} newly created date.
 * @constructor
 */
var DATE = function (year, month, day) {
    var FIRST_YEAR = 1900;
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "DATE");
    year = Math.abs(Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(year))); // No negative values for year
    month = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(month)) - 1; // Months are between 0 and 11.
    day = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(day)) - 1; // Days are also zero-indexed.
    var m = moment.utc(TypeConverter_1.TypeConverter.ORIGIN_MOMENT)
        .add(2, "days")
        .add(year < FIRST_YEAR ? year : year - FIRST_YEAR, 'years') // If the value is less than 1900, assume 1900 as start index for year
        .add(month, 'months')
        .add(day, 'days');
    var dateAsNumber = TypeConverter_1.TypeConverter.momentToDayNumber(m);
    if (dateAsNumber < 0) {
        throw new Errors_1.NumError("DATE evaluates to an out of range value " + dateAsNumber
            + ". It should be greater than or equal to 0.");
    }
    return dateAsNumber;
};
exports.DATE = DATE;
/**
 * Converts a provided date string in a known format to a date value.
 * @param dateString - The string representing the date. Understood formats include any date format which is
 * normally auto-converted when entered, without quotation marks, directly into a cell. Understood formats may depend on
 * region and language settings.
 * @returns {number} of days since 1900/1/1, inclusively.
 * @constructor
 */
var DATEVALUE = function (dateString) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "DATEVALUE");
    dateString = TypeConverter_1.TypeConverter.firstValueAsString(dateString);
    var dateAsNumber;
    try {
        dateAsNumber = TypeConverter_1.TypeConverter.stringToDateNumber(dateString);
    }
    catch (e) {
        throw new Errors_1.ValueError("DATEVALUE parameter '" + dateString + "' cannot be parsed to date/time.");
    }
    // If we've not been able to parse the date by now, then we cannot parse it at all.
    return dateAsNumber;
};
exports.DATEVALUE = DATEVALUE;
/**
 * Returns a date a specified number of months before or after another date.
 * @param startDate - The date from which to calculate the result.
 * @param months - The number of months before (negative) or after (positive) start_date to calculate.
 * @returns {number} date a specified number of months before or after another date
 * @constructor
 */
var EDATE = function (startDate, months) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "EDATE");
    var startDateNumber = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true); // tell firstValueAsDateNumber to coerce boolean
    if (startDateNumber < 0) {
        throw new Errors_1.NumError("Function EDATE parameter 1 value is " + startDateNumber + ". It should be greater than or equal to 0.");
    }
    months = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(months));
    // While momentToDayNumber will return an inclusive count of days since 1900/1/1, moment.Moment.add assumes exclusive
    // count of days.
    return TypeConverter_1.TypeConverter.momentToDayNumber(moment.utc(TypeConverter_1.TypeConverter.ORIGIN_MOMENT).add(startDateNumber, "days").add(months, "months"));
};
exports.EDATE = EDATE;
/**
 * Returns a date representing the last day of a month which falls a specified number of months before or after another
 * date.
 * @param startDate - The date from which to calculate the the result.
 * @param months - The number of months before (negative) or after (positive) start_date to consider. The last
 * calendar day of the calculated month is returned.
 * @returns {number} the last day of a month
 * @constructor
 */
var EOMONTH = function (startDate, months) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "EOMONTH");
    var startDateNumber = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true); // tell firstValueAsDateNumber to coerce boolean
    if (startDateNumber < 0) {
        throw new Errors_1.NumError("Function EOMONTH parameter 1 value is " + startDateNumber + ". It should be greater than or equal to 0.");
    }
    months = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(months));
    return TypeConverter_1.TypeConverter.momentToDayNumber(moment.utc(TypeConverter_1.TypeConverter.ORIGIN_MOMENT)
        .add(startDateNumber, "days")
        .add(months, "months")
        .endOf("month"));
};
exports.EOMONTH = EOMONTH;
/**
 * Returns the day of the month that a specific date falls on, in numeric format.
 * @param date - The date from which to extract the day. Must be a reference to a cell containing a date, a
 * function returning a date type, or a number.
 * @returns {number} day of the month
 * @constructor
 */
var DAY = function (date) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "DAY");
    date = TypeConverter_1.TypeConverter.firstValueAsDateNumber(date, true); // tell firstValueAsDateNumber to coerce boolean
    if (date < 0) {
        throw new Errors_1.NumError("Function DAY parameter 1 value is " + date + ". It should be greater than or equal to 0.");
    }
    return TypeConverter_1.TypeConverter.numberToMoment(date).date();
};
exports.DAY = DAY;
/**
 * Returns the number of days between two dates.
 * @param endDate most recently occurring
 * @param startDate not most recently occurring
 * @returns {number} of days between start_date and end_date
 * @constructor
 */
var DAYS = function (endDate, startDate) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 2, "DAYS");
    endDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(endDate, true); // tell firstValueAsDateNumber to coerce boolean
    startDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true); // tell firstValueAsDateNumber to coerce boolean
    return endDate - startDate;
};
exports.DAYS = DAYS;
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
var DAYS360 = function (startDate, endDate, methodToUse) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "DAYS360");
    startDate = TypeConverter_1.TypeConverter.numberToMoment(TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true)); // tell firstValueAsDateNumber to coerce boolean
    endDate = TypeConverter_1.TypeConverter.numberToMoment(TypeConverter_1.TypeConverter.firstValueAsDateNumber(endDate, true)); // tell firstValueAsDateNumber to coerce boolean
    methodToUse = methodToUse ? TypeConverter_1.TypeConverter.firstValueAsBoolean(methodToUse) : false;
    var smd = 31;
    var emd = 31;
    var sd = startDate.date();
    var ed = endDate.date();
    if (methodToUse) {
        sd = (sd === 31) ? 30 : sd;
        ed = (ed === 31) ? 30 : ed;
    }
    else {
        if (startDate.month() === 1) {
            smd = startDate.daysInMonth();
        }
        if (endDate.month() === 1) {
            emd = endDate.daysInMonth();
        }
        sd = (sd === smd) ? 30 : sd;
        if (sd === 30 || sd === smd) {
            ed = (ed === emd) ? 30 : ed;
        }
    }
    return 360 * (endDate.year() - startDate.year()) + 30 * (endDate.month() - startDate.month()) + (ed - sd);
};
exports.DAYS360 = DAYS360;
/**
 * Returns the month of the year a specific date falls in, in numeric format.
 * @param date - The date from which to extract the month. Must be a reference to a cell containing a date, a
 * function returning a date type, or a number.
 * @returns {number} month of the year that the input date falls on.
 * @constructor
 */
var MONTH = function (date) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "MONTH");
    date = TypeConverter_1.TypeConverter.firstValueAsDateNumber(date, true); // tell firstValueAsDateNumber to coerce boolean
    if (date < 0) {
        throw new Errors_1.NumError("Function MONTH parameter 1 value is " + date + ". It should be greater than or equal to 0.");
    }
    return TypeConverter_1.TypeConverter.numberToMoment(date).month() + 1;
};
exports.MONTH = MONTH;
/**
 * Returns the year specified by a given date.
 * @param date - The date from which to calculate the year. Must be a cell reference to a cell containing a
 * date, a function returning a date type, or a number.
 * @returns {number} year of the input date
 * @constructor
 */
var YEAR = function (date) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "YEAR");
    date = TypeConverter_1.TypeConverter.firstValueAsDateNumber(date, true); // tell firstValueAsDateNumber to coerce boolean
    if (date < 0) {
        throw new Errors_1.NumError("Function YEAR parameter 1 value is " + date + ". It should be greater than or equal to 0.");
    }
    return TypeConverter_1.TypeConverter.numberToMoment(date).year();
};
exports.YEAR = YEAR;
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
var WEEKDAY = function (date, offsetType) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "WEEKDAY");
    date = TypeConverter_1.TypeConverter.firstValueAsDateNumber(date, true); // tell firstValueAsDateNumber to coerce boolean
    offsetType = offsetType ? TypeConverter_1.TypeConverter.firstValueAsNumber(offsetType) : 1;
    if (date < 0) {
        throw new Errors_1.NumError("Function WEEKDAY parameter 1 value is " + date + ". It should be greater than or equal to 0.");
    }
    var day = TypeConverter_1.TypeConverter.numberToMoment(date).day();
    if (offsetType === 1) {
        return day + 1;
    }
    else if (offsetType === 2) {
        if (day === 0) {
            return 7;
        }
        return day;
    }
    else if (offsetType === 3) {
        if (day === 0) {
            return 6;
        }
        return day - 1;
    }
    else {
        throw new Errors_1.NumError("Function WEEKDAY parameter 2 value " + day + " is out of range.");
    }
};
exports.WEEKDAY = WEEKDAY;
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
var WEEKNUM = function (date, shiftType) {
    // Given a moment, an array of days of the week for shifting, will calculate the week number.
    function calculateWeekNum(dm, shifterArray) {
        var startOfYear = moment.utc(dm).startOf("year");
        var weeksCount = 1;
        var d = moment.utc(dm).startOf("year").add(6 - shifterArray[startOfYear.day()], "days");
        while (d.isBefore(dm)) {
            d.add(7, "days");
            weeksCount++;
        }
        return weeksCount;
    }
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 1, 2, "WEEKNUM");
    date = TypeConverter_1.TypeConverter.firstValueAsDateNumber(date, true); // tell firstValueAsDateNumber to coerce boolean
    shiftType = shiftType ? TypeConverter_1.TypeConverter.firstValueAsNumber(shiftType) : 1;
    if (date < 0) {
        throw new Errors_1.NumError("Function YEAR parameter 1 value is " + date + ". It should be greater than or equal to 0.");
    }
    var dm = TypeConverter_1.TypeConverter.numberToMoment(date);
    var week = dm.week();
    var dayOfWeek = dm.day(); // between 1 and 7, inclusively
    if (shiftType === 1) {
        // If this weekYear is not the same as the year, then we're technically in "week 53"
        // See https://momentjs.com/docs/#/get-set/week-year/ for more info.
        if (dm.weekYear() !== dm.year()) {
            week = dm.weeksInYear() + 1;
        }
        return week;
    }
    else if (shiftType === 2 || shiftType === 11) {
        if (dm.weekYear() !== dm.year()) {
            week = dm.weeksInYear() + 1;
        }
        if (dayOfWeek === 0) { // sunday shift back
            return week - 1;
        }
        return week;
    }
    else if (shiftType === 12) {
        if (dm.weekYear() !== dm.year()) {
            week = dm.weeksInYear() + 1;
        }
        if (dayOfWeek <= 1) { // sunday, monday shift back
            return week - 1;
        }
        return week;
    }
    else if (shiftType === 13) {
        if (dm.weekYear() !== dm.year()) {
            week = dm.weeksInYear() + 1;
        }
        if (dayOfWeek <= 2) { // sunday, monday, tuesday shift back
            return week - 1;
        }
        return week;
    }
    else if (shiftType === 14) {
        return calculateWeekNum(dm, [3, 4, 5, 6, 0, 1, 2]);
    }
    else if (shiftType === 15) {
        return calculateWeekNum(dm, [2, 3, 4, 5, 6, 0, 1]);
    }
    else if (shiftType === 16) {
        return calculateWeekNum(dm, [1, 2, 3, 4, 5, 6, 0]);
    }
    else if (shiftType === 17) {
        return calculateWeekNum(dm, [0, 1, 2, 3, 4, 5, 6]);
    }
    else if (shiftType === 21) {
        return dm.isoWeek();
    }
    else {
        throw new Errors_1.NumError("Function WEEKNUM parameter 2 value " + shiftType + " is out of range.");
    }
};
exports.WEEKNUM = WEEKNUM;
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
var DATEDIF = function (startDate, endDate, unit) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "DATEDIF");
    startDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true);
    endDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(endDate, true);
    unit = TypeConverter_1.TypeConverter.firstValueAsString(unit);
    var unitClean = unit.toUpperCase();
    var startMoment = TypeConverter_1.TypeConverter.numberToMoment(startDate);
    var endMoment = TypeConverter_1.TypeConverter.numberToMoment(endDate);
    if (startDate > endDate) {
        throw new Errors_1.NumError("Function DATEDIF parameter 1 (" + startDate.toString() +
            ") should be on or before Function DATEDIF parameter 2 (" + endDate.toString() + ").");
    }
    if (unitClean === "Y") {
        return Math.floor(endMoment.diff(startMoment, "years"));
    }
    else if (unitClean === "M") {
        return Math.floor(endMoment.diff(startMoment, "months"));
    }
    else if (unitClean === "D") {
        return endDate - startDate;
    }
    else if (unitClean === "MD") {
        var s = startMoment;
        while (s.isBefore(endMoment)) {
            s.add(1, "month");
        }
        s.subtract(1, "month");
        var days = endMoment.diff(s, "days");
        return s.date() === endMoment.date() ? 0 : days;
    }
    else if (unitClean === "YM") {
        var s = startMoment;
        while (s.isBefore(endMoment)) {
            s.add(1, "year");
        }
        s.subtract(1, "year");
        var months = Math.floor(endMoment.diff(s, "months"));
        return months === 12 ? 0 : months;
    }
    else if (unitClean === "YD") {
        var s = startMoment;
        while (s.isBefore(endMoment)) {
            s.add(1, "year");
        }
        s.subtract(1, "year");
        var days = Math.floor(endMoment.diff(s, "days"));
        return days >= 365 ? 0 : days;
    }
    else {
        throw new Errors_1.NumError("Function DATEDIF parameter 3 value is " + unit +
            ". It should be one of: 'Y', 'M', 'D', 'MD', 'YM', 'YD'.");
    }
};
exports.DATEDIF = DATEDIF;
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
var YEARFRAC = function (startDate, endDate, dayCountConvention) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "YEARFRAC");
    startDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true);
    endDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(endDate, true);
    dayCountConvention = dayCountConvention ? TypeConverter_1.TypeConverter.firstValueAsNumber(dayCountConvention) : 0;
    var s = TypeConverter_1.TypeConverter.numberToMoment(startDate);
    var e = TypeConverter_1.TypeConverter.numberToMoment(endDate);
    if (e.isBefore(s)) {
        var me = moment.utc(e);
        e = moment.utc(s);
        s = me;
    }
    var syear = s.year();
    var smonth = s.month();
    var sday = s.date();
    var eyear = e.year();
    var emonth = e.month();
    var eday = e.date();
    var feb29Between = function (date1, date2) {
        // Requires year2 == (year1 + 1) or year2 == year1
        // Returns TRUE if February 29 is between the two dates (date1 may be February 29), with two possibilities:
        // year1 is a leap year and date1 <= February 29 of year1
        // year2 is a leap year and date2 > February 29 of year2
        var mar1year1 = moment.utc(new Date(date1.year(), 2, 1));
        if (moment.utc([date1.year()]).isLeapYear() && date1.diff(mar1year1) < 0 && date2.diff(mar1year1) >= 0) {
            return true;
        }
        var mar1year2 = moment.utc(new Date(date2.year(), 2, 1));
        if (moment.utc([date2.year()]).isLeapYear() && date2.diff(mar1year2) >= 0 && date1.diff(mar1year2) < 0) {
            return true;
        }
        return false;
    };
    switch (dayCountConvention) {
        // US (NASD) 30/360
        case 0:
            // Note: if eday == 31, it stays 31 if sday < 30
            if (sday === 31 && eday === 31) {
                sday = 30;
                eday = 30;
            }
            else if (sday === 31) {
                sday = 30;
            }
            else if (sday === 30 && eday === 31) {
                eday = 30;
            }
            else if (smonth === 1 && emonth === 1 && s.daysInMonth() === sday && e.daysInMonth() === eday) {
                sday = 30;
                eday = 30;
            }
            else if (smonth === 1 && s.daysInMonth() === sday) {
                sday = 30;
            }
            return Math.abs(((eday + emonth * 30 + eyear * 360) - (sday + smonth * 30 + syear * 360)) / 360);
        // Actual/actual
        case 1:
            var ylength = 365;
            if (syear === eyear || ((syear + 1) === eyear) && ((smonth > emonth) || ((smonth === emonth) && (sday >= eday)))) {
                if (syear === eyear && moment.utc([syear]).isLeapYear()) {
                    ylength = 366;
                }
                else if (feb29Between(s, e) || (emonth === 1 && eday === 29)) {
                    ylength = 366;
                }
                return Math.abs((endDate - startDate) / ylength);
            }
            else {
                var years = (eyear - syear) + 1;
                var days = moment.utc([eyear + 1]).startOf("year").diff(moment.utc([syear]).startOf("year"), 'days');
                var average = days / years;
                return Math.abs((endDate - startDate) / average);
            }
        // Actual/360
        case 2:
            return Math.abs(e.diff(s, 'days') / 360);
        // Actual/365
        case 3:
            return Math.abs(e.diff(s, 'days') / 365);
        // European 30/360
        case 4:
            sday = sday === 31 ? 30 : sday;
            eday = eday === 31 ? 30 : eday;
            // Remarkably, do NOT change February 28 or February 29 at ALL
            return Math.abs(((eday + emonth * 30 + eyear * 360) - (sday + smonth * 30 + syear * 360)) / 360);
    }
    throw new Errors_1.NumError("Function YEARFRAC parameter 3 value is " + dayCountConvention + ". Valid values are between 0 and 4 inclusive.");
};
exports.YEARFRAC = YEARFRAC;
/**
 * Returns the fraction of a 24-hour day the time represents.
 * @param timeString - The string that holds the time representation. Eg: "10am", "10:10", "10:10am", "10:10:11",
 * or "10:10:11am".
 * @returns {number} representing the fraction of a 24-hour day
 * @constructor
 */
var TIMEVALUE = function (timeString) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "TIMEVALUE");
    timeString = TypeConverter_1.TypeConverter.firstValueAsString(timeString);
    try {
        return TypeConverter_1.TypeConverter.stringToTimeNumber(timeString);
    }
    catch (e) {
        throw new Errors_1.ValueError("TIMEVALUE parameter '" + timeString + "' cannot be parsed to date/time.");
    }
};
exports.TIMEVALUE = TIMEVALUE;
var MILLISECONDS_IN_DAY = 86400000;
/**
 * Returns the hour component of a specific time, in numeric format.
 * @param time - The time from which to calculate the hour component. Must be a reference to a cell containing
 * a date/time, a function returning a date/time type, or a number.
 * @returns {number}
 * @constructor
 */
var HOUR = function (time) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "HOUR");
    time = TypeConverter_1.TypeConverter.firstValueAsTimestampNumber(time);
    if (time % 1 === 0) {
        return 0;
    }
    var m = moment.utc([1900]).add(time * MILLISECONDS_IN_DAY, "milliseconds");
    return m.hour();
};
exports.HOUR = HOUR;
/**
 * Returns the minute component of a specific time, in numeric format.
 * @param time - The time from which to calculate the minute component. Must be a reference to a cell
 * containing a date/time, a function returning a date/time type, or a number.
 * @returns {number} minute of the time passed in.
 * @constructor
 */
var MINUTE = function (time) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "MINUTE");
    time = TypeConverter_1.TypeConverter.firstValueAsTimestampNumber(time);
    if (time % 1 === 0) {
        return 0;
    }
    var m = moment.utc([1900]).add(time * MILLISECONDS_IN_DAY, "milliseconds");
    return m.minute();
};
exports.MINUTE = MINUTE;
/**
 * Returns the second component of a specific time, in numeric format.
 * @param time - The time from which to calculate the second component. Must be a reference to a cell
 * containing a date/time, a function returning a date/time type, or a number.
 * @returns {number} second component of a specific time.
 * @constructor
 */
var SECOND = function (time) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 1, "SECOND");
    time = TypeConverter_1.TypeConverter.firstValueAsTimestampNumber(time);
    if (time % 1 === 0) {
        return 0;
    }
    var m = moment.utc([1900]).add(time * MILLISECONDS_IN_DAY, "milliseconds");
    return m.second();
};
exports.SECOND = SECOND;
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
var NETWORKDAYS = function (startDate, endDate, holidays) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "NETWORKDAYS");
    startDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true);
    endDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(endDate, true);
    var hasHolidays = (holidays !== undefined);
    var cleanHolidays = [];
    if (hasHolidays) {
        holidays = (holidays instanceof Array) ? holidays : [holidays];
        if (holidays.length === 0) {
            throw new Errors_1.RefError("Reference does not exist.");
        }
        for (var _i = 0, holidays_1 = holidays; _i < holidays_1.length; _i++) {
            var holidayDateValue = holidays_1[_i];
            if (typeof holidayDateValue === "number") {
                cleanHolidays.push(holidayDateValue);
            }
            else {
                throw new Errors_1.ValueError("NETWORKDAYS expects number values. But '" + holidayDateValue + "' is a " +
                    (typeof holidayDateValue) + " and cannot be coerced to a number.");
            }
        }
    }
    // Handle cases in which the start date is not before the end date.
    var didSwap = startDate > endDate;
    if (didSwap) {
        var swap = endDate;
        endDate = startDate;
        startDate = swap;
    }
    var countMoment = moment.utc(TypeConverter_1.TypeConverter.numberToMoment(startDate));
    var weekendDays = [6, 0]; // Default weekend_days.
    var days = endDate - startDate + 1;
    var networkDays = days;
    var j = 0;
    while (j < days) {
        if (weekendDays.indexOf(countMoment.day()) >= 0) {
            networkDays--;
        }
        else if (hasHolidays && cleanHolidays.indexOf(TypeConverter_1.TypeConverter.momentToDayNumber(countMoment)) > -1) {
            networkDays--;
        }
        countMoment.add(1, 'days');
        j++;
    }
    // If the we swapped the start and end date, the result should be a negative number of network days.
    if (didSwap) {
        return networkDays * -1;
    }
    return networkDays;
};
exports.NETWORKDAYS = NETWORKDAYS;
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
var NETWORKDAYS$INTL = function (startDate, endDate, weekend, holidays) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 4, "NETWORKDAYS$INTL");
    startDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true);
    endDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(endDate, true);
    var weekendDays = [];
    if (weekend !== undefined) {
        weekend = TypeConverter_1.TypeConverter.firstValue(weekend);
        if (typeof weekend === "string") {
            if (!/^[0-1]{6,}$/.test(weekend)) {
                throw new Errors_1.NumError("Function NETWORKDAYS.INTL parameter 3 requires a number in the format '0000011'. "
                    + "Actual value is '" + weekend + "'");
            }
            var ws = weekend.split("");
            for (var i = 0; i < ws.length; i++) {
                if (ws[i] === "1") {
                    weekendDays.push(i === 6 ? 0 : i + 1);
                }
            }
        }
        else if (typeof weekend === "number") {
            switch (weekend) {
                case 1:
                    weekendDays = [0, 6];
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    weekendDays = [weekend, weekend - 1];
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                    weekendDays = [weekend - 10];
                    break;
                default:
                    throw new Errors_1.NumError("Function NETWORKDAYS.INTL parameter 3 requires a number in the range 1-7 or 11-17. "
                        + "Actual number is " + weekend + ".");
            }
        }
        else {
            throw new Errors_1.ValueError("Function NETWORKDAYS.INTL parameter 4 expects number values. But '" + weekend
                + "' cannot be coerced to a number.");
        }
    }
    else {
        weekendDays = [0, 6];
    }
    var hasHolidays = holidays !== undefined;
    var cleanHolidays = [];
    if (hasHolidays) {
        if (holidays === 0) {
            throw new Errors_1.RefError("Reference does not exist.");
        }
        for (var _i = 0, holidays_2 = holidays; _i < holidays_2.length; _i++) {
            var holidayDateValue = holidays_2[_i];
            if (typeof holidayDateValue === "number") {
                cleanHolidays.push(holidayDateValue);
            }
            else {
                throw new Errors_1.ValueError("NETWORKDAYS.INTL expects number values. But '" + holidayDateValue + "' is a " +
                    (typeof holidayDateValue) + " and cannot be coerced to a number.");
            }
        }
    }
    // Handle cases in which the start date is not before the end date.
    var didSwap = startDate > endDate;
    if (didSwap) {
        var swap = endDate;
        endDate = startDate;
        startDate = swap;
    }
    var countMoment = moment.utc(TypeConverter_1.TypeConverter.numberToMoment(startDate));
    var days = endDate - startDate + 1;
    var networkDays = days;
    var j = 0;
    while (j < days) {
        if (weekendDays.indexOf(countMoment.day()) >= 0) {
            networkDays--;
        }
        else if (hasHolidays && cleanHolidays.indexOf(TypeConverter_1.TypeConverter.momentToDayNumber(countMoment)) > -1) {
            networkDays--;
        }
        countMoment.add(1, 'days');
        j++;
    }
    // If the we swapped the start and end date, the result should be a negative number of network days.
    if (didSwap) {
        return networkDays * -1;
    }
    return networkDays;
};
exports.NETWORKDAYS$INTL = NETWORKDAYS$INTL;
/**
 * Returns the current date and time as a date value.
 * @returns {number} representing the current date and time.
 * @constructor
 */
var NOW = function () {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 0, "NOW");
    return TypeConverter_1.TypeConverter.momentToNumber(moment.utc());
};
exports.NOW = NOW;
/**
 * Returns the current date as a date value.
 * @returns {number} today
 * @constructor
 */
var TODAY = function () {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 0, "TODAY");
    return TypeConverter_1.TypeConverter.momentToNumber(moment.utc().startOf("day"));
};
exports.TODAY = TODAY;
/**
 * Converts a provided hour, minute, and second into a time. Will silently recalculate numeric time values which fall
 * outside of valid ranges. Eg: TIME(24, 0, 0) is the same as TIME(0, 0, 0).
 * @param hours - The hour component of the time.
 * @param minutes - The minute component of the time.
 * @param seconds - The second component of the time.
 * @returns {number} time of day
 * @constructor
 */
var TIME = function (hours, minutes, seconds) {
    ArgsChecker_1.ArgsChecker.checkLength(arguments, 3, "TIME");
    hours = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(hours));
    minutes = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(minutes));
    seconds = Math.floor(TypeConverter_1.TypeConverter.firstValueAsNumber(seconds));
    var e = TypeConverter_1.TypeConverter.unitsToTimeNumber(hours, minutes, seconds);
    if (e < 0) {
        throw new Errors_1.NumError("TIME evaluates to an out of range value " + e + ". It should be greater than or equal to 0.");
    }
    return e;
};
exports.TIME = TIME;
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
var WORKDAY = function (startDate, numberOfDays, holidays) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "WORKDAY");
    startDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true);
    numberOfDays = TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfDays);
    var hasHolidays = (holidays !== undefined);
    var cleanHolidays = [];
    if (hasHolidays !== undefined) {
        if (holidays instanceof Array) {
            if (holidays.length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            for (var _i = 0, holidays_3 = holidays; _i < holidays_3.length; _i++) {
                var holidayDateValue = holidays_3[_i];
                if (typeof holidayDateValue === "number") {
                    cleanHolidays.push(holidayDateValue);
                }
                else {
                    throw new Errors_1.ValueError("WORKDAY expects number values. But '" + holidayDateValue + "' is a " +
                        (typeof holidayDateValue) + " and cannot be coerced to a number.");
                }
            }
        }
        else {
            cleanHolidays.push(TypeConverter_1.TypeConverter.valueToNumber(holidays));
        }
    }
    var weekendDays = [0, 6];
    var countMoment = moment.utc(TypeConverter_1.TypeConverter.numberToMoment(startDate));
    var j = 0;
    while (j < numberOfDays) {
        countMoment.add(1, 'days');
        if (weekendDays.indexOf(countMoment.day()) < 0 && cleanHolidays.indexOf(TypeConverter_1.TypeConverter.momentToDayNumber(countMoment)) < 0) {
            j++;
        }
    }
    return TypeConverter_1.TypeConverter.momentToDayNumber(countMoment);
};
exports.WORKDAY = WORKDAY;
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
var WORKDAY$INTL = function (startDate, numberOfDays, weekend, holidays) {
    ArgsChecker_1.ArgsChecker.checkLengthWithin(arguments, 2, 3, "WORKDAY$INTL");
    startDate = TypeConverter_1.TypeConverter.firstValueAsDateNumber(startDate, true);
    numberOfDays = TypeConverter_1.TypeConverter.firstValueAsNumber(numberOfDays);
    var weekendDays = [];
    if (weekend !== undefined) {
        weekend = TypeConverter_1.TypeConverter.firstValue(weekend);
        if (typeof weekend === "string") {
            if (!/^[0-1]{6,}$/.test(weekend)) {
                throw new Errors_1.NumError("Function WORKDAY.INTL parameter 3 requires a number in the format '0000011'. "
                    + "Actual value is '" + weekend + "'");
            }
            var ws = weekend.split("");
            for (var i = 0; i < ws.length; i++) {
                if (ws[i] === "1") {
                    weekendDays.push(i === 6 ? 0 : i + 1);
                }
            }
        }
        else if (typeof weekend === "number") {
            switch (weekend) {
                case 1:
                    weekendDays = [0, 6];
                    break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    weekendDays = [weekend, weekend - 1];
                    break;
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                    weekendDays = [weekend - 10];
                    break;
                default:
                    throw new Errors_1.NumError("Function WORKDAY.INTL parameter 3 requires a number in the range 1-7 or 11-17. "
                        + "Actual number is " + weekend + ".");
            }
        }
        else {
            throw new Errors_1.ValueError("Function WORKDAY.INTL parameter 4 expects number values. But '" + weekend
                + "' cannot be coerced to a number.");
        }
    }
    else {
        weekendDays = [0, 6];
    }
    var hasHolidays = (holidays !== undefined);
    var cleanHolidays = [];
    if (hasHolidays) {
        if (holidays instanceof Array) {
            if (holidays.length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            for (var _i = 0, holidays_4 = holidays; _i < holidays_4.length; _i++) {
                var holidayDateValue = holidays_4[_i];
                if (typeof holidayDateValue === "number") {
                    cleanHolidays.push(holidayDateValue);
                }
                else {
                    throw new Errors_1.ValueError("WORKDAY expects number values. But '" + holidayDateValue + "' is a " +
                        (typeof holidayDateValue) + " and cannot be coerced to a number.");
                }
            }
        }
        else {
            cleanHolidays.push(TypeConverter_1.TypeConverter.valueToNumber(holidays));
        }
    }
    var countMoment = moment.utc(TypeConverter_1.TypeConverter.numberToMoment(startDate));
    var j = 0;
    while (j < numberOfDays) {
        countMoment.add(1, 'days');
        if (weekendDays.indexOf(countMoment.day()) < 0 && cleanHolidays.indexOf(TypeConverter_1.TypeConverter.momentToDayNumber(countMoment)) < 0) {
            j++;
        }
    }
    return TypeConverter_1.TypeConverter.momentToDayNumber(countMoment);
};
exports.WORKDAY$INTL = WORKDAY$INTL;
