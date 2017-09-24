/**
 * If the value is UNDEFINED, return true.
 * @param value - Value to check if undefined.
 * @returns {boolean}
 */
function isUndefined(value : any) : boolean {
  return value === undefined;
}

/**
 * If the value is DEFINED, return true.
 * @param value - Value to check if is defined.
 * @returns {boolean}
 */
function isDefined(value : any) : boolean {
  return value !== undefined;
}


/**
 * Class for building formatted strings with commas, forced number of leading and trailing zeros, and arbitrary leading
 * and trailing strings.
 */
class NumberStringBuilder {
  private n : number;
  private shouldUseComma : boolean = false;
  private integerZeroCount : number = 1; // e.g. default to "0.1"
  private decimalZeroCount : number = 0; // e.g. default to "1"
  private maxDecimalPlaces : number;
  private headString : string = "";
  private tailString : string = "";

  /**
   * Static builder, easier than `new`.
   * @returns {NumberStringBuilder}
   */
  static start() : NumberStringBuilder {
    return new NumberStringBuilder();
  }

  /**
   * Pads a given string with "0" on the right or left side until it is a certain width.
   * @param {string} str - String to pad.
   * @param {number} width - Width to pad to. If this is less than the strings length, will do nothing.
   * @param {string} type - "right" or "left" side to append zeroes.
   * @returns {string}
   */
  private static pad(str : string, width : number, type : string) : string {
    let z = '0';
    str = str + '';
    if (type === "left") {
      return str.length >= width ? str : new Array(width - str.length + 1).join(z) + str;
    } else {
      return str.length >= width ? str : str + (new Array(width - str.length + 1).join(z));
    }
  }

  /**
   * Rounds a number n to a certain number of digits.
   * @param n - Number to round.
   * @param digits - Digits to round to.
   * @returns {number}
   */
  private static round(n, digits) {
    return Math.round(n * Math.pow(10, digits)) / Math.pow(10, digits);
  }

  /**
   * Set the number that we'll be formatting.
   * @param {number} n - Number.
   * @returns {NumberStringBuilder}
   */
  public number(n : number) : NumberStringBuilder {
    this.n = n;
    return this;
  }

  /**
   * The number of zeros to force on the left side of the decimal.
   * @param {number} zeros
   * @returns {NumberStringBuilder}
   */
  public integerZeros(zeros : number) : NumberStringBuilder {
    this.integerZeroCount = zeros;
    return this;
  }

  /**
   * The number of zeros to force on the right side of the decimal.
   * @param {number} zeros
   * @returns {NumberStringBuilder}
   */
  public decimalZeros(zeros : number) : NumberStringBuilder {
    this.decimalZeroCount = zeros;
    return this;
  }

  /**
   * If you would like to force the maximum number of decimal places, without padding with zeros, set this.
   * WARNING: Should not be used in conjunction with decimalZeros().
   * @param {number} maxDecimalPlaces
   * @returns {NumberStringBuilder}
   */
  public maximumDecimalPlaces(maxDecimalPlaces: number) : NumberStringBuilder {
    this.maxDecimalPlaces = maxDecimalPlaces;
    return this;
  }

  /**
   * Should digits to the left side of the decimal use comma-notation?
   * @param {boolean} shouldUseComma
   * @returns {NumberStringBuilder}
   */
  public commafy(shouldUseComma : boolean) : NumberStringBuilder {
    this.shouldUseComma = shouldUseComma;
    return this;
  }

  /**
   * String to append to the beginning of the final formatted number.
   * @param {string} head
   * @returns {NumberStringBuilder}
   */
  public head(head : string) : NumberStringBuilder {
    this.headString = head;
    return this;
  }

  /**
   * String to append to the end of the final formatted number.
   * @param {string} tail
   * @returns {NumberStringBuilder}
   */
  public tail(tail : string) : NumberStringBuilder {
    this.tailString = tail;
    return this;
  }

  /**
   * Building the string using the rules set in this builder.
   * @returns {string}
   */
  public build() : string {
    let nStr = this.n.toString();
    let isInt = this.n % 1 === 0;
    let integerPart = isInt ? nStr : nStr.split(".")[0];
    integerPart = integerPart.replace("-", "");
    let decimalPart = isInt ? "" : nStr.split(".")[1];

    // Building integer part
    if (this.integerZeroCount > 1) {
      integerPart = NumberStringBuilder.pad(integerPart, this.integerZeroCount, "left");
    }

    // Building decimal part
    // If the decimal part is greater than the number of zeros we allow, then we have to round the number.
    if (isDefined(this.maxDecimalPlaces)) {
      let decimalAsFloat = NumberStringBuilder.round(parseFloat("0."+decimalPart), this.maxDecimalPlaces);
      if (decimalAsFloat % 1 === 0) {
        integerPart = Math.floor((parseInt(integerPart) + decimalAsFloat)).toString();
        integerPart = NumberStringBuilder.pad(integerPart, this.integerZeroCount, "left");
        decimalPart = "";
      } else {
        decimalPart = decimalAsFloat.toString().split(".")[1];
      }
    } else {
      if (decimalPart.length > this.decimalZeroCount) {
        let decimalAsFloat = NumberStringBuilder.round(parseFloat("0."+decimalPart), this.decimalZeroCount);
        let roundedDecimalPart;

        if (decimalAsFloat % 1 === 0) {
          integerPart = Math.floor((parseInt(integerPart) + decimalAsFloat)).toString();
          integerPart = NumberStringBuilder.pad(integerPart, this.integerZeroCount, "left");
          roundedDecimalPart = "";
        } else {
          roundedDecimalPart = decimalAsFloat.toString().split(".")[1];
        }
        decimalPart = NumberStringBuilder.pad(roundedDecimalPart, this.decimalZeroCount, "right");
      } else {
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
    let trueSign = this.n < 0 ? "-" : "";

    if ((this.decimalZeroCount === 0 && isUndefined(this.maxDecimalPlaces)) || isDefined(this.maxDecimalPlaces) && decimalPart === "") {
      return trueSign + this.headString + integerPart + this.tailString;
    }
    return trueSign + this.headString + integerPart + "." + decimalPart + this.tailString;
  }
}

export {
  isDefined,
  isUndefined,
  NumberStringBuilder
}