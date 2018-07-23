declare let NULL_ERROR: string;
declare let DIV_ZERO_ERROR: string;
declare let VALUE_ERROR: string;
declare let REF_ERROR: string;
declare let NAME_ERROR: string;
declare let NUM_ERROR: string;
declare let NA_ERROR: string;
declare let PARSE_ERROR: string;
/**
 * Execution or parsing produced a null value, or intersection of ranges produced zero cells.
 */
declare class NullError extends Error {
    constructor(message: string);
}
/**
 * Attempt to divide by zero, including division by an empty cell.
 */
declare class DivZeroError extends Error {
    constructor(message: string);
}
/**
 * Parameter is wrong type, or value is incompatible, or cannot be parsed, converted, or manipulated.
 */
declare class ValueError extends Error {
    constructor(message: string);
}
/**
 * Reference to invalid cell, range, or empty range.
 */
declare class RefError extends Error {
    constructor(message: string);
}
/**
 * Unrecognized/deleted name.
 */
declare class NameError extends Error {
    constructor(message: string);
}
/**
 * Failed to meet domain constraints (e.g., input number too high or too low).
 */
declare class NumError extends Error {
    constructor(message: string);
}
/**
 * Lookup functions which failed and NA() return this value.
 */
declare class NAError extends Error {
    constructor(message: string);
}
/**
 * Input could not be parsed.
 */
declare class ParseError extends Error {
    constructor(message: string);
}
/**
 * Constructs an error by error name.
 * @param {string} name - Name of error. If not one of DIV_ZERO_ERROR, NULL_ERROR, VALUE_ERROR, REF_ERROR, NAME_ERROR,
 * NUM_ERROR,NA_ERROR, or PARSE_ERROR, will default to ParseError.
 * @param {string} msg - Message for error, will default to empty string.
 * @returns {Error}
 */
declare function constructErrorByName(name: string, msg?: string): Error;
export { DIV_ZERO_ERROR, NULL_ERROR, VALUE_ERROR, REF_ERROR, NAME_ERROR, NUM_ERROR, NA_ERROR, PARSE_ERROR, DivZeroError, NullError, ValueError, RefError, NameError, NumError, NAError, ParseError, constructErrorByName };
