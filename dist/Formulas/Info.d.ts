/**
 * Returns the "value not available" error, "#N/A".
 * @constructor
 */
declare let NA: () => never;
/**
 * Returns true if a value is text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
declare let ISTEXT: (value: any) => boolean;
/**
 * Returns true if a value is not text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
declare let ISNONTEXT: (value: any) => boolean;
/**
 * Returns true if value is a boolean (FALSE, or TRUE). Numerical and text values return false.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
declare let ISLOGICAL: (value: any) => boolean;
/**
 * Returns true if value or reference is a number.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
declare let ISNUMBER: (value: any) => boolean;
/**
 * Returns true if input is a valid email. Valid domains are Original top-level domains and Country code top-level
 * domains.
 * @param value - Value to check whether it is an email or not.
 * @returns {boolean}
 * @constructor
 */
declare let ISEMAIL: (value: any) => boolean;
/**
 * Returns true if the input is a valid URL.
 * @param value - Value to check
 * @returns {boolean}
 * @constructor
 */
declare let ISURL: (value: any) => boolean;
/**
 * Returns the value as a number.
 * @param value - value to return.
 * @returns {number}
 * @constructor
 */
declare let N: (value: any) => number;
/**
 * Tests if the content of one or several cells is a reference. Verifies the type of references in a cell or a range of
 * cells. If an error occurs, the function returns a logical or numerical value.
 * @param value - The value to be tested, to determine whether it is a reference.
 * @returns {boolean}
 * @constructor
 */
declare let ISREF: (value: any) => boolean;
/**
 * Returns the number corresponding to an error value occurring in a different cell. With the aid of this number, an
 * error message text can be generated. If an error occurs, the function returns a logical or numerical value.
 * @param value - Contains either the address/reference of the cell in which the error occurs, or the error directly.
 * Eg: `=ERRORTYPE(NA())`
 * @constructor
 */
declare let ERRORTYPE: (value: any) => 1 | 2 | 6 | 7 | 8 | 3 | 5 | 4;
/**
 * Returns TRUE if the reference to a cell is blank. This function is used to determine if the content of a cell is
 * empty. A cell with a formula inside is not empty. If an error occurs, the function returns a logical or numerical
 * value.
 * @param value - The content to be tested.
 * @returns {boolean}
 * @constructor
 */
declare let ISBLANK: (value: any) => boolean;
/**
 * Returns TRUE if the value refers to any error value except #N/A. You can use this function to control error values
 * in certain cells. If an error occurs, the function returns a logical or numerical value.
 * @param value - Any value or expression in which a test is performed to determine whether an error value not equal to
 * #N/A is present.
 * @returns {boolean}
 * @constructor
 */
declare let ISERR: (value: any) => boolean;
/**
 * Tests if the cells contain general error values. ISERROR recognizes the #N/A error value. If an error occurs, the
 * function returns a logical or numerical value.
 * @param value - is any value where a test is performed to determine whether it is an error value.
 * @returns {boolean}
 * @constructor
 */
declare let ISERROR: (value: any) => boolean;
/**
 * Returns TRUE if a cell contains the #N/A (value not available) error value. If an error occurs, the function returns
 * a logical or numerical value.
 * @param value - The value or expression to be tested.
 * @returns {boolean}
 * @constructor
 */
declare let ISNA: (value: any) => boolean;
/**
 * Returns the first argument if no error value is present, otherwise returns the second argument if provided, or a
 * blank if the second argument is absent. Blank value is `null`.
 * @param value - Value to check for error.
 * @param valueIfError - [OPTIONAL] - Value to return if no error is present in the first argument.
 * @returns {any}
 * @constructor
 */
declare let IFERROR: (value: any, valueIfError?: any) => any;
/**
 * Returns a number corresponding to the type of data passed into the function. 1 = number, 2 = text, 4 = boolean,
 * 16 = error, 64 = array/range, 128 = any other type of cell.
 * @param value - Value for which the type will be determined.
 * @returns {number}
 * @constructor
 */
declare let TYPE: (value: any) => 1 | 2 | 16 | 4 | 64 | 128;
/**
 * Returns the column number of a specified cell, starting with column 1 for A.
 * @param cell - Cell, defaults to the cell calling this formula, when used in the context of a spreadsheet.
 * @constructor
 */
declare let COLUMN: (cell: any) => number;
/**
 * Returns the row number of a specified cell, starting with row 1 for A1.
 * @param cell - Cell, defaults to the cell calling this formula, when used in the context of a spreadsheet.
 * @constructor
 */
declare let ROW: (cell: any) => number;
/**
 * Returns TRUE if a cell is a formula cell. Must be given a reference.
 * @param value - To check.
 * @returns {boolean}
 * @constructor
 */
declare let ISFORMULA: (value: any) => boolean;
export { NA, ISTEXT, ISLOGICAL, ISNUMBER, ISNONTEXT, ISEMAIL, ISURL, N, ISREF, ERRORTYPE, ISBLANK, ISERR, ISERROR, ISNA, IFERROR, TYPE, COLUMN, ROW, ISFORMULA };
