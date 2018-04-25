/**
 * Computes the value of a Roman numeral.
 * @param text - The Roman numeral to format, whose value must be between 1 and 3999, inclusive.
 * @returns {number} value in integer format
 * @constructor
 */
declare let ARABIC: (text?: any) => number;
/**
 * Convert a number into a character according to the current Unicode table.
 * @param value - The number of the character to look up from the current Unicode table in decimal format.
 * @returns {string} character corresponding to Unicode number
 * @constructor
 */
declare let CHAR: (value: any) => string;
/**
 * Returns the numeric Unicode map value of the first character in the string provided.
 * @param value - The string whose first character's Unicode map value will be returned.
 * @returns {number} number of the first character's Unicode value
 * @constructor
 */
declare let CODE: (value: any) => number;
/**
 * Divides text around a specified character or string, and puts each fragment into a separate cell in the row.
 * @param text - The text to divide.
 * @param delimiter - The character or characters to use to split text.
 * @param splitByEach - [optional] Whether or not to divide text around each character contained in
 * delimiter.
 * @returns {Array<string>} containing the split
 * @constructor
 * TODO: At some point this needs to return a more complex type than Array. Needs to return a type that has a dimension.
 */
declare let SPLIT: (text: any, delimiter: any, splitByEach?: any) => string[];
/**
 * Appends strings to one another.
 * @param values - to append to one another. Must contain at least one value
 * @returns {string} concatenated string
 * @constructor
 */
declare let CONCATENATE: (...values: any[]) => string;
/**
 * Converts a numeric value to a different unit of measure.
 * @param value - the numeric value in start_unit to convert to end_unit.
 * @param startUnit - The starting unit, the unit currently assigned to value.
 * @param endUnit - The unit of measure into which to convert value.
 * @returns {number}
 * @constructor
 * TODO: Looking up units is not efficient at all. We should use an object instead of iterating through an array.
 */
declare let CONVERT: (value: any, startUnit: any, endUnit: any) => number;
/**
 * Removes leading and trailing spaces in a specified string.
 * @param value - The string or reference to a cell containing a string to be trimmed.
 * @returns {string}
 * @constructor
 */
declare let TRIM: (value: any) => string;
/**
 * Converts text to lowercase.
 * @param value - Text to convert.
 * @constructor
 */
declare let LOWER: (value: any) => string;
/**
 * Converts text to uppercase.
 * @param value - Text to convert.
 * @constructor
 */
declare let UPPER: (value: any) => string;
/**
 * Returns string arguments as text, or the empty string if the value is not text.
 * @param value - Value to return.
 * @constructor
 */
declare let T: (value: any) => string;
/**
 * Converts a number into a Roman numeral.
 * @param value - The value to convert. Must be between 0 and 3999.
 * @constructor
 * TODO: Second parameter should be 'rule_relaxation'.
 */
declare let ROMAN: (value: any) => string;
/**
 * Converts a number into text according to a given format.
 * @param value - The value to be converted.
 * @param format - Text which defines the format. "0" forces the display of zeros, while "#" suppresses the display of
 * zeros. For example TEXT(22.1,"000.00") produces 022.10, while TEXT(22.1,"###.##") produces 22.1, and
 * TEXT(22.405,"00.00") results in 22.41. To format days: "dddd" indicates full name of the day of the week, "ddd"
 * short name of the day of the week, "dd" indicates the day of the month as two digits, "d" indicates day of the month
 * as one or two digits, "mmmmm" indicates the first letter in the month of the year, "mmmm" indicates the full name of
 * the month of the year, "mmm" indicates short name of the month of the year, "mm" indicates month of the year as two
 * digits or the number of minutes in a time, depending on whether it follows yy or dd, or if it follows hh, "m" month
 * of the year as one or two digits or the number of minutes in a time, depending on whether it follows yy or dd, or if
 * it follows hh, "yyyy" indicates year as four digits, "yy" and "y" indicate year as two digits, "hh" indicates hour
 * on a 24-hour clock, "h" indicates hour on a 12-hour clock, "ss.000" indicates milliseconds in a time, "ss" indicates
 * seconds in a time, "AM/PM" or "A/P" indicate displaying hours based on a 12-hour clock and showing AM or PM
 * depending on the time of day. Eg: `TEXT("01/09/2012 10:04:33AM", "mmmm-dd-yyyy, hh:mm AM/PM")` would result in
 * "January-09-2012, 10:04 AM".
 * @constructor
 */
declare let TEXT: (value: any, format: any) => string;
/**
 * Looks for a string of text within another string. Where to begin the search can also be defined. The search term can
 * be a number or any string of characters. The search is case-sensitive.
 * @param searchFor - The text to be found.
 * @param searchIn - The text where the search takes place.
 * @param startAt - [OPTIONAL defaults to 1] - The position in the text from which the search starts.
 * @returns {number}
 * @constructor
 */
declare let FIND: (searchFor: any, searchIn: any, startAt?: any) => any;
/**
 * Concatenates the values of one or more arrays using a specified delimiter.
 * @param delimiter - The string to place between the values.
 * @param values - The values to be appended using the delimiter.
 * @returns {string}
 * @constructor
 */
declare let JOIN: (delimiter: any, ...values: any[]) => string;
/**
 * Returns the length of a string including spaces.
 * @param value - The text whose length is to be determined.
 * @constructor
 */
declare let LEN: (value: any) => any;
/**
 * Returns the first character or characters in a text string.
 * @param text - The text where the initial partial words are to be determined.
 * @param numberOfCharacters [OPTIONAL] - The number of characters for the start text. If this parameter is not defined,
 * one character is returned.
 * @returns {string}
 * @constructor
 */
declare let LEFT: (text: any, numberOfCharacters?: any) => any;
/**
 * Defines the last character or characters in a text string.
 * @param text - The text where the initial partial words are to be determined.
 * @param numberOfCharacters [OPTIONAL] - The number of characters for the start text. If this parameter is not defined,
 * one character is returned.
 * @returns {string}
 * @constructor
 */
declare let RIGHT: (text: any, numberOfCharacters?: any) => any;
/**
 * Returns the position of a text segment within a character string. The start of the search can be set as an option.
 * The search text can be a number or any sequence of characters. The search is not case-sensitive.
 * @param findText - The text to be searched for.
 * @param withinText - The text where the search will take place
 * @param position - [OPTIONAL default 1] The position in the text where the search is to start.
 * @constructor
 */
declare let SEARCH: (findText: any, withinText: any, position?: any) => any;
/**
 * Repeats a character string by the given number of copies.
 * @param text - The text to be repeated.
 * @param numberOfReps - The number of repetitions
 * @constructor
 */
declare let REPT: (text: any, numberOfReps: any) => string;
/**
 * Converts a value into a number if possible.
 * @param value - The value to convert to a number.
 * @returns {number}
 * @constructor
 */
declare let VALUE: (value: any) => number;
/**
 * Removes all non-printing characters from the string.
 * @param text - The text from which to remove all non-printable characters.
 * @returns {string}
 * @constructor
 */
declare let CLEAN: (text: any) => any;
/**
 * Returns a text segment of a character string. The parameters specify the starting position and the number of
 * characters.
 * @param text - The text containing the characters to extract.
 * @param start - The position of the first character in the text to extract.
 * @param number - The number of characters in the part of the text.
 * @returns {string}
 * @constructor
 */
declare let MID: (text: any, start: any, number: any) => any;
declare let PROPER: (text: any) => any;
/**
 * Replaces part of a text string with a different text string. This function can be used to replace both characters and
 * numbers (which are automatically converted to text). The result of the function is always displayed as text.
 * @param text - The text of which a part will be replaced.
 * @param position - The position within the text where the replacement will begin.
 * @param length - The number of characters in text to be replaced.
 * @param newText - The text which replaces text.
 * @constructor
 */
declare let REPLACE: (text: any, position: any, length: any, newText: any) => any;
/**
 * Substitutes new text for old text in a string.
 * @param text - The text in which text segments are to be exchanged.
 * @param searchFor - The text segment that is to be replaced (a number of times)
 * @param replaceWith - The text that is to replace the text segment.
 * @param occurrence - [OPTIONAL] - Indicates how many occurrences of the search text are to be replaced. If this
 * parameter is missing, the search text is replaced throughout.
 * @returns {string}
 * @constructor
 */
declare let SUBSTITUTE: (text: any, searchFor: any, replaceWith: any, occurrence?: any) => any;
export { ARABIC, CHAR, CODE, SPLIT, CONCATENATE, CONVERT, TRIM, LOWER, UPPER, T, ROMAN, TEXT, FIND, JOIN, LEN, LEFT, RIGHT, SEARCH, REPT, VALUE, CLEAN, MID, PROPER, REPLACE, SUBSTITUTE };
