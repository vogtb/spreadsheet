"use strict";
exports.__esModule = true;
/**
 * If the value is UNDEFINED, return true.
 * @param value - Value to check if undefined.
 * @returns {boolean}
 */
function isUndefined(value) {
    return value === undefined;
}
exports.isUndefined = isUndefined;
/**
 * If the value is DEFINED, return true.
 * @param value - Value to check if is defined.
 * @returns {boolean}
 */
function isDefined(value) {
    return value !== undefined;
}
exports.isDefined = isDefined;
/**
 * Returns true if value is an instance of a Array.
 * @param value
 * @returns {boolean}
 */
function isArray(value) {
    return value instanceof Array;
}
exports.isArray = isArray;
/**
 * Alphabetical character to number.
 * @param chr
 * @returns {number}
 */
function characterToNumber(chr) {
    chr = chr.replace(/\$/g, '');
    var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
    for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
    }
    if (result) {
        --result;
    }
    return result;
}
exports.characterToNumber = characterToNumber;
/**
 * Converts a number to an alphabetical character.
 * @param num
 * @returns {string}
 */
function numberToCharacter(num) {
    var s = '';
    while (num >= 0) {
        s = String.fromCharCode(num % 26 + 97) + s;
        num = Math.floor(num / 26) - 1;
    }
    return s.toUpperCase();
}
exports.numberToCharacter = numberToCharacter;
/**
 * Converts a quoted string to an un-quoted string: `"hey"` to `hey`
 * @param str
 * @returns {string}
 */
function string(str) {
    return str.substring(1, str.length - 1);
}
exports.string = string;
/**
 * Converts XY coordinates (eg {0, 0}) to A1 coordinates (eg {A1}).
 * @param x
 * @param y
 * @returns {string}
 */
function convertXYtoA1Coordinates(x, y) {
    function numberToLetters(num) {
        var mod = num % 26, pow = num / 26 | 0, out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
        return pow ? numberToLetters(pow) + out : out;
    }
    return numberToLetters(x + 1) + (y + 1).toString();
}
exports.convertXYtoA1Coordinates = convertXYtoA1Coordinates;
/**
 * Returns RowCol coordinates of an A1 cellId
 * @param cellId
 * @returns {Object}
 */
function A1toRowColCoordinates(cellId) {
    var num = cellId.match(/\d+$/), alpha = cellId.replace(num, '');
    return {
        row: parseInt(num[0], 10) - 1,
        col: characterToNumber(alpha)
    };
}
exports.A1toRowColCoordinates = A1toRowColCoordinates;
/**
 * Class for building formatted strings with commas, forced number of leading and trailing zeros, and arbitrary leading
 * and trailing strings.
 */
var NumberStringBuilder = /** @class */ (function () {
    function NumberStringBuilder() {
        this.shouldUseComma = false;
        this.integerZeroCount = 1; // e.g. default to "0.1"
        this.decimalZeroCount = 0; // e.g. default to "1"
        this.headString = "";
        this.tailString = "";
    }
    /**
     * Static builder, easier than `new`.
     * @returns {NumberStringBuilder}
     */
    NumberStringBuilder.start = function () {
        return new NumberStringBuilder();
    };
    /**
     * Pads a given string with "0" on the right or left side until it is a certain width.
     * @param {string} str - String to pad.
     * @param {number} width - Width to pad to. If this is less than the strings length, will do nothing.
     * @param {string} type - "right" or "left" side to append zeroes.
     * @returns {string}
     */
    NumberStringBuilder.pad = function (str, width, type) {
        var z = '0';
        str = str + '';
        if (type === "left") {
            return str.length >= width ? str : new Array(width - str.length + 1).join(z) + str;
        }
        else {
            return str.length >= width ? str : str + (new Array(width - str.length + 1).join(z));
        }
    };
    /**
     * Rounds a number n to a certain number of digits.
     * @param n - Number to round.
     * @param digits - Digits to round to.
     * @returns {number}
     */
    NumberStringBuilder.round = function (n, digits) {
        return Math.round(n * Math.pow(10, digits)) / Math.pow(10, digits);
    };
    /**
     * Set the number that we'll be formatting.
     * @param {number} n - Number.
     * @returns {NumberStringBuilder}
     */
    NumberStringBuilder.prototype.number = function (n) {
        this.n = n;
        return this;
    };
    /**
     * The number of zeros to force on the left side of the decimal.
     * @param {number} zeros
     * @returns {NumberStringBuilder}
     */
    NumberStringBuilder.prototype.integerZeros = function (zeros) {
        this.integerZeroCount = zeros;
        return this;
    };
    /**
     * The number of zeros to force on the right side of the decimal.
     * @param {number} zeros
     * @returns {NumberStringBuilder}
     */
    NumberStringBuilder.prototype.decimalZeros = function (zeros) {
        this.decimalZeroCount = zeros;
        return this;
    };
    /**
     * If you would like to force the maximum number of decimal places, without padding with zeros, set this.
     * WARNING: Should not be used in conjunction with decimalZeros().
     * @param {number} maxDecimalPlaces
     * @returns {NumberStringBuilder}
     */
    NumberStringBuilder.prototype.maximumDecimalPlaces = function (maxDecimalPlaces) {
        this.maxDecimalPlaces = maxDecimalPlaces;
        return this;
    };
    /**
     * Should digits to the left side of the decimal use comma-notation?
     * @param {boolean} shouldUseComma
     * @returns {NumberStringBuilder}
     */
    NumberStringBuilder.prototype.commafy = function (shouldUseComma) {
        this.shouldUseComma = shouldUseComma;
        return this;
    };
    /**
     * String to append to the beginning of the final formatted number.
     * @param {string} head
     * @returns {NumberStringBuilder}
     */
    NumberStringBuilder.prototype.head = function (head) {
        this.headString = head;
        return this;
    };
    /**
     * String to append to the end of the final formatted number.
     * @param {string} tail
     * @returns {NumberStringBuilder}
     */
    NumberStringBuilder.prototype.tail = function (tail) {
        this.tailString = tail;
        return this;
    };
    /**
     * Building the string using the rules set in this builder.
     * @returns {string}
     */
    NumberStringBuilder.prototype.build = function () {
        var nStr = this.n.toString();
        var isInt = this.n % 1 === 0;
        var integerPart = isInt ? nStr : nStr.split(".")[0];
        integerPart = integerPart.replace("-", "");
        var decimalPart = isInt ? "" : nStr.split(".")[1];
        // Building integer part
        if (this.integerZeroCount > 1) {
            integerPart = NumberStringBuilder.pad(integerPart, this.integerZeroCount, "left");
        }
        // Building decimal part
        // If the decimal part is greater than the number of zeros we allow, then we have to round the number.
        if (isDefined(this.maxDecimalPlaces)) {
            var decimalAsFloat = NumberStringBuilder.round(parseFloat("0." + decimalPart), this.maxDecimalPlaces);
            if (decimalAsFloat % 1 === 0) {
                integerPart = Math.floor((parseInt(integerPart) + decimalAsFloat)).toString();
                integerPart = NumberStringBuilder.pad(integerPart, this.integerZeroCount, "left");
                decimalPart = "";
            }
            else {
                decimalPart = decimalAsFloat.toString().split(".")[1];
            }
        }
        else {
            if (decimalPart.length > this.decimalZeroCount) {
                var decimalAsFloat = NumberStringBuilder.round(parseFloat("0." + decimalPart), this.decimalZeroCount);
                var roundedDecimalPart = void 0;
                if (decimalAsFloat % 1 === 0) {
                    integerPart = Math.floor((parseInt(integerPart) + decimalAsFloat)).toString();
                    integerPart = NumberStringBuilder.pad(integerPart, this.integerZeroCount, "left");
                    roundedDecimalPart = "";
                }
                else {
                    roundedDecimalPart = decimalAsFloat.toString().split(".")[1];
                }
                decimalPart = NumberStringBuilder.pad(roundedDecimalPart, this.decimalZeroCount, "right");
            }
            else {
                decimalPart = NumberStringBuilder.pad(decimalPart, this.decimalZeroCount, "right");
            }
        }
        // Inserting commas if necessary.
        if (this.shouldUseComma) {
            integerPart = integerPart.split("").reverse().map(function (digit, index) {
                if (index % 3 === 0 && index !== 0) {
                    return digit + ",";
                }
                return digit;
            }).reverse().join("");
        }
        if (this.integerZeroCount === 0 && integerPart === "0") {
            integerPart = "";
        }
        if (this.n === 0) {
            return this.headString + "." + this.tailString;
        }
        var trueSign = this.n < 0 ? "-" : "";
        if ((this.decimalZeroCount === 0 && isUndefined(this.maxDecimalPlaces)) || isDefined(this.maxDecimalPlaces) && decimalPart === "") {
            return trueSign + this.headString + integerPart + this.tailString;
        }
        return trueSign + this.headString + integerPart + "." + decimalPart + this.tailString;
    };
    return NumberStringBuilder;
}());
exports.NumberStringBuilder = NumberStringBuilder;
