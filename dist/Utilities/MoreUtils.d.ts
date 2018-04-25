/**
 * If the value is UNDEFINED, return true.
 * @param value - Value to check if undefined.
 * @returns {boolean}
 */
declare function isUndefined(value: any): boolean;
/**
 * If the value is DEFINED, return true.
 * @param value - Value to check if is defined.
 * @returns {boolean}
 */
declare function isDefined(value: any): boolean;
/**
 * Returns true if value is an instance of a Array.
 * @param value
 * @returns {boolean}
 */
declare function isArray(value: any): boolean;
/**
 * Alphabetical character to number.
 * @param chr
 * @returns {number}
 */
declare function characterToNumber(chr: any): number;
/**
 * Converts a number to an alphabetical character.
 * @param num
 * @returns {string}
 */
declare function numberToCharacter(num: any): string;
/**
 * Converts a quoted string to an un-quoted string: `"hey"` to `hey`
 * @param str
 * @returns {string}
 */
declare function string(str: any): any;
/**
 * Converts XY coordinates (eg {0, 0}) to A1 coordinates (eg {A1}).
 * @param x
 * @param y
 * @returns {string}
 */
declare function convertXYtoA1Coordinates(x: any, y: any): any;
/**
 * Returns RowCol coordinates of an A1 cellId
 * @param cellId
 * @returns {Object}
 */
declare function A1toRowColCoordinates(cellId: any): {
    row: number;
    col: number;
};
/**
 * Class for building formatted strings with commas, forced number of leading and trailing zeros, and arbitrary leading
 * and trailing strings.
 */
declare class NumberStringBuilder {
    private n;
    private shouldUseComma;
    private integerZeroCount;
    private decimalZeroCount;
    private maxDecimalPlaces;
    private headString;
    private tailString;
    /**
     * Static builder, easier than `new`.
     * @returns {NumberStringBuilder}
     */
    static start(): NumberStringBuilder;
    /**
     * Pads a given string with "0" on the right or left side until it is a certain width.
     * @param {string} str - String to pad.
     * @param {number} width - Width to pad to. If this is less than the strings length, will do nothing.
     * @param {string} type - "right" or "left" side to append zeroes.
     * @returns {string}
     */
    private static pad(str, width, type);
    /**
     * Rounds a number n to a certain number of digits.
     * @param n - Number to round.
     * @param digits - Digits to round to.
     * @returns {number}
     */
    private static round(n, digits);
    /**
     * Set the number that we'll be formatting.
     * @param {number} n - Number.
     * @returns {NumberStringBuilder}
     */
    number(n: number): NumberStringBuilder;
    /**
     * The number of zeros to force on the left side of the decimal.
     * @param {number} zeros
     * @returns {NumberStringBuilder}
     */
    integerZeros(zeros: number): NumberStringBuilder;
    /**
     * The number of zeros to force on the right side of the decimal.
     * @param {number} zeros
     * @returns {NumberStringBuilder}
     */
    decimalZeros(zeros: number): NumberStringBuilder;
    /**
     * If you would like to force the maximum number of decimal places, without padding with zeros, set this.
     * WARNING: Should not be used in conjunction with decimalZeros().
     * @param {number} maxDecimalPlaces
     * @returns {NumberStringBuilder}
     */
    maximumDecimalPlaces(maxDecimalPlaces: number): NumberStringBuilder;
    /**
     * Should digits to the left side of the decimal use comma-notation?
     * @param {boolean} shouldUseComma
     * @returns {NumberStringBuilder}
     */
    commafy(shouldUseComma: boolean): NumberStringBuilder;
    /**
     * String to append to the beginning of the final formatted number.
     * @param {string} head
     * @returns {NumberStringBuilder}
     */
    head(head: string): NumberStringBuilder;
    /**
     * String to append to the end of the final formatted number.
     * @param {string} tail
     * @returns {NumberStringBuilder}
     */
    tail(tail: string): NumberStringBuilder;
    /**
     * Building the string using the rules set in this builder.
     * @returns {string}
     */
    build(): string;
}
export { isDefined, isUndefined, isArray, string, numberToCharacter, convertXYtoA1Coordinates, A1toRowColCoordinates, characterToNumber, NumberStringBuilder };
