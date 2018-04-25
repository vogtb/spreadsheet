/**
 * Converts a number to a Date.
 * @param value - Value to convert. If the input is a number, will convert to a date. If value is non-numeric, will
 * return value unchanged.
 * @returns {any}
 * @constructor
 */
declare let TO_DATE: (value: any) => any;
/**
 * Converts a number to a Dollar value.
 * @param value - Value to convert. If the input is a number, will return as a dollar value. If value is non-numeric,
 * will return value unchanged.
 * @returns {any}
 * @constructor
 */
declare let TO_DOLLARS: (value: any) => any;
/**
 * Converts a number to a percent value where 1 = 100 percent.
 * @param value - Value to convert. If the input is a number, will return as a percent value. If value is non-numeric,
 * will return value unchanged.
 * @returns {any}
 * @constructor
 */
declare let TO_PERCENT: (value: any) => any;
/**
 * Converts a number to a text value
 * @param value - Value to convert. If the input is a text, will return as a text value.
 * @returns {any}
 * @constructor
 */
declare let TO_TEXT: (value: any) => string;
export { TO_DATE, TO_DOLLARS, TO_PERCENT, TO_TEXT };
