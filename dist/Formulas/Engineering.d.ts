/**
 * Converts a signed binary number to decimal format.
 * @param signedBinaryNumber - The signed 10-bit binary value to be converted to decimal, provided as a
 * string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented
 * in two's complement format.
 * @returns {number}
 * @constructor
 */
declare let BIN2DEC: (signedBinaryNumber: any) => number;
/**
 * Converts a signed binary number to signed hexadecimal format.
 * @param signedBinaryNumber - The signed 10-bit binary value to be converted to signed hexadecimal,
 * provided as a string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are
 * represented in two's complement format.
 * @param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result.
 * @returns {string} string representation of a signed hexadecimal
 * @constructor
 */
declare let BIN2HEX: (signedBinaryNumber: any, significantDigits?: any) => string;
/**
 * Converts a signed binary number to signed octal format.
 * @param signedBinaryNumber - The signed 10-bit binary value to be converted to signed octal, provided as a
 * string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented
 * in two's complement format.
 * @param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If
 * this is greater than the number of significant digits in the result, the result is left-padded with zeros until the
 * total number of digits reaches significant_digits.
 * @returns {string} number in octal format
 * @constructor
 */
declare let BIN2OCT: (signedBinaryNumber: any, significantDigits?: any) => string;
/**
 * Converts a decimal number to signed octal format.
 * @param decimalDumber - The decimal value to be converted to signed octal,provided as a string. For this
 * function, this value has a maximum of 536870911 if positive, and a minimum of -53687092 if negative.
 * @param significantDigits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this
 * is greater than the number of significant digits in the result, the result is left-padded with zeros until the total
 * number of digits reaches significant_digits.
 * @returns {string} octal string representation of the decimal number
 * @constructor
 */
declare let DEC2OCT: (decimalDumber: any, significantDigits?: any) => string;
/**
 * Converts a decimal number to signed hexadecimal format.
 * @param decimalDumber - The decimal value to be converted to signed hexadecimal, provided as a string. This
 * value has a maximum of 549755813887 if positive, and a minimum of -549755814888 if negative.
 * @param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If
 * this is greater than the number of significant digits in the result, the result is left-padded with zeros until the
 * total number of digits reaches significant_digits. This value is ignored if decimal_number is negative.
 * @returns {string} hexadecimal string representation of the decimal number
 * @constructor
 */
declare let DEC2HEX: (decimalDumber: any, significantDigits?: any) => string;
/**
 * Converts a decimal number to signed binary format.
 * @param decimalDumber - The decimal value to be converted to signed binary, provided as a string. For this
 * function, this value has a maximum of 511 if positive, and a minimum of -512 if negative.
 * @param significantDigits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this
 * is greater than the number of significant digits in the result, the result is left-padded with zeros until the total
 * number of digits reaches significant_digits.
 * @returns {string} signed binary string representation of the input decimal number.
 * @constructor
 */
declare let DEC2BIN: (decimalDumber: any, significantDigits?: any) => string;
/**
 * Compare two numeric values, returning 1 if they're equal.
 * @param one - The first number to compare.
 * @param two - The second number to compare.
 * @returns {number} 1 if they're equal, 0 if they're not equal.
 * @constructor
 */
declare let DELTA: (one: any, two?: any) => number;
export { BIN2DEC, BIN2HEX, BIN2OCT, DEC2BIN, DEC2HEX, DEC2OCT, DELTA };
