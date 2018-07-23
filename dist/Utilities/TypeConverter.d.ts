import * as moment from "moment";
/**
 * Static class of helpers used to convert let ious types to each other.
 */
declare class TypeConverter {
    static ORIGIN_MOMENT: moment.Moment;
    private static SECONDS_IN_DAY;
    /**
     * Converts a datetime string to a moment object. Will return undefined if the string can't be converted.
     * @param {string} timeString - string to parse and convert.
     * @returns {moment.Moment}
     */
    static stringToMoment(timeString: string): moment.Moment;
    /**
     * Converts a time-formatted string to a number between 0 and 1, exclusive on 1.
     * @param timeString
     * @returns {number} representing time of day
     */
    static stringToTimeNumber(timeString: string): number;
    /**
     * Parses a string returning a moment that is either valid, invalid or undefined.
     * @param dateString to parse.
     * @returns {moment}
     */
    private static parseStringToMoment(dateString);
    /**
     * Parses a string as a date number. Throws error if parsing not possible.
     * @param dateString to parse
     * @returns {number} resulting date
     */
    static stringToDateNumber(dateString: string): number;
    /**
     * Converts strings to numbers, returning undefined if string cannot be parsed to number. Examples: "100", "342424",
     * "10%", "33.213131", "41.1231", "10e+1", "10E-1", "10.44E1", "-$9.29", "+$9.29", "1,000.1", "2000,000,000".
     * For reference see: https://regex101.com/r/PwghnF/9/
     * @param value to parse.
     * @returns {number} or undefined
     */
    static stringToNumber(value: string): number;
    /**
     * Converts any value to an inverted number or throws an error if it cannot coerce it to the number type
     * @param value to convert
     * @returns {number} to return. Will always return a number or throw an error. Never returns undefined.
     */
    static valueToInvertedNumber(value: any): number;
    /**
     * Converts any value to a number or throws an error if it cannot coerce it to the number type
     * @param value to convert
     * @returns {number} to return. Will always return a number or throw an error. Never returns undefined.
     */
    static valueToNumber(value: any): number;
    /**
     * Converts any value to a number, defaulting to 0 value in cases in which it cannot coerce it to a number type
     * @param value to conver
     * @returns {number} to return. Will always return a number or 0.
     */
    static valueToNumberGracefully(value: any): number;
    /**
     * Converts any value to a boolean or throws an error if it cannot coerce it to the boolean type.
     * @param value to convert
     * @returns {boolean} to return.
     */
    static valueToBoolean(value: any): boolean;
    /**
     * Convert a value to string.
     * @param value of any type, including array. array cannot be empty.
     * @returns {string} string representation of value
     */
    static valueToString(value: any): string;
    /**
     * Converts a value to a time number; a value between 0 and 1, exclusive on 1.
     * @param value to convert
     * @returns {number} representing a time value
     */
    static valueToTimestampNumber(value: any): number;
    /**
     * Returns true if string is number format.
     * @param str to check
     * @returns {boolean}
     */
    static isNumber(str: string): boolean;
    /**
     * Returns true if we can coerce it to the number type.
     * @param value to coerce
     * @returns {boolean} if could be coerced to a number
     */
    static canCoerceToNumber(value: any): boolean;
    /**
     * Takes any input type and will throw a REF_ERROR or coerce it into a number.
     * @param input to attempt to coerce into a number
     * @returns {number} number representation of the input
     */
    static firstValueAsNumber(input: any): number;
    /**
     * Takes any input type and will throw a REF_ERROR or coerce it into a string.
     * @param input to attempt to coerce into a string
     * @returns {number} number representation of the input
     */
    static firstValueAsString(input: any): string;
    /**
     * Returns the first value that is not of the type array. Will throw RefError if any empty arrays are passed in.
     * @param input to retrieve first value of
     * @returns {any} any non-array value.
     */
    static firstValue(input: any): any;
    /**
     * Takes any input type and will throw a REF_ERROR or coerce it into a string.
     * @param input to attempt to coerce into a string
     * @returns {number} number representation of the input
     */
    static firstValueAsBoolean(input: any): boolean;
    /**
     * Takes the input type and will throw a REF_ERROR or coerce it into a date number
     * @param input input to attempt to coerce to a date number
     * @param coerceBoolean should a boolean be converted
     * @returns {number} representing a date
     */
    static firstValueAsDateNumber(input: any, coerceBoolean?: boolean): number;
    /**
     * Takes the input type and will throw a REF_ERROR or coerce it into a time number
     * @param input input to attempt to coerce to a time number
     * @returns {number} representing time of day
     */
    static firstValueAsTimestampNumber(input: any): number;
    /**
     * Convert a value to date number if possible.
     * @param value to convert
     * @param coerceBoolean should a boolean be converted
     * @returns {number} date
     */
    static valueToDateNumber(value: any, coerceBoolean?: boolean): number;
    /**
     * Converts a moment to a date number.
     * @param m to convert
     * @returns {number} date
     */
    static momentToNumber(m: moment.Moment): number;
    /**
     * Converts a moment to a date number, floored to the whole day date.
     * @param m to convert
     * @returns {number} date
     */
    static momentToDayNumber(m: moment.Moment): number;
    /**
     * Converts a number to moment.
     * @param n to convert
     * @returns {Moment} date
     */
    static numberToMoment(n: number): moment.Moment;
    /**
     * Converts a number to moment while preserving the decimal part of the number.
     * @param n to convert
     * @returns {Moment} date
     */
    static decimalNumberToMoment(n: number): moment.Moment;
    /**
     * Using timestamp units, create a time number between 0 and 1, exclusive on end.
     * @param hours
     * @param minutes
     * @param seconds
     * @returns {number} representing time of day between 0 and 1, exclusive on end.
     */
    static unitsToTimeNumber(hours: number, minutes: number, seconds: number): number;
}
/**
 * Catches divide by zero situations and throws them as errors
 * @param n number to check
 * @returns {number} n as long as it's not zero.
 */
declare let checkForDevideByZero: (n: number) => number;
export { TypeConverter, checkForDevideByZero };
