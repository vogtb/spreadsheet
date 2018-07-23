/**
 * Returns an element from a list of choices based on index.
 * @param index - Which choice to return. Index starts at 1.
 * @param values -  Array of potential value to return. Required. May be a reference to a cell or an individual value.
 * @constructor
 */
declare let CHOOSE: (index: any, ...values: any[]) => any;
/**
 * Returns a text representation of a cell address based on the row, column, and sheet.
 * @param row - Row of cell address.
 * @param column - Column of cell address
 * @param {number} absoluteVsRelativeMode - [OPTIONAL - default is 1] Should return a relative(A1, vs $A$1) or absolute address. 1 is row and
 * column absolute (e.g. $A$1), 2 is row absolute and column relative (e.g. A$1), 3 is row relative and column absolute
 * (e.g. $A1), 4 is row and column relative (e.g. A1).
 * @param {boolean} useA1Notation - [OPTIONAL - default is TRUE] Should use A1 notation.
 * @param sheet - [OPTIONAL] Sheet name to use in address.
 * @returns {string}
 * @constructor
 */
declare let ADDRESS: (row: any, column: any, absoluteVsRelativeMode?: number, useA1Notation?: boolean, sheet?: any) => string;
/**
 * Gets the number of columns in a specified array or range.
 * @param value - The array of range to consider.
 * @returns {number}
 * @constructor
 */
declare let COLUMNS: (value: any) => number;
declare let ROWS: (value: any) => number;
export { CHOOSE, ADDRESS, COLUMNS, ROWS };
