import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  NAError, NullError, DivZeroError, ValueError, RefError, NameError, NumError, NULL_ERROR, DIV_ZERO_ERROR, VALUE_ERROR,
  REF_ERROR, NAME_ERROR, NUM_ERROR, NA_ERROR
} from "../Errors";
import {
  TypeConverter
} from "../Utilities/TypeConverter";
import {
  Cell
} from "../Cell";
import {Filter} from "../Utilities/Filter";


/**
 * Returns the "value not available" error, "#N/A".
 * @constructor
 */
var NA = function () {
  ArgsChecker.checkLength(arguments, 1, "NA");
  throw new NAError("NA Error thrown.");
};


/**
 * Returns true if a value is text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
var ISTEXT =  function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISTEXT");
  return typeof TypeConverter.firstValue(value) === "string";
};


/**
 * Returns true if a value is not text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
var ISNONTEXT = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISNONTEXT");
  return typeof TypeConverter.firstValue(value) !== "string";
};


/**
 * Returns true if value is a boolean (FALSE, or TRUE). Numerical and text values return false.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
var ISLOGICAL = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISLOGICAL");
  return typeof TypeConverter.firstValue(value) === "boolean";
};


/**
 * Returns true if value or reference is a number.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
var ISNUMBER = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISNUMBER");
  return typeof TypeConverter.firstValue(value) === "number";
};


/**
 * Returns true if input is a valid email. Valid domains are Original top-level domains and Country code top-level
 * domains.
 * @param value - Value to check whether it is an email or not.
 * @returns {boolean}
 * @constructor
 */
var ISEMAIL = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISEMAIL");
  if (typeof value !== "string") {
    return false;
  }
  const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|edu|int|biz|info|mobi|name|aero|jobs|museum|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/;
  return EMAIL_REGEX.test(TypeConverter.firstValueAsString(value));
};


/**
 * Returns true if the input is a valid URL.
 * @param value - Value to check
 * @returns {boolean}
 * @constructor
 */
var ISURL = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISURL");
  value = TypeConverter.firstValueAsString(value);
  var matches = value.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
  if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value)) {
    return false;
  }
  if (/%[^0-9a-f]/i.test(value)) {
    return false;
  }
  if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value)) {
    return false;
  }
  var authority = matches[2];
  var path = matches[3];
  if (!(path.length >= 0)) {
    return false;
  }
  if (authority && authority.length) {
    if (!(path.length === 0 || /^\//.test(path))) {
      return false;
    }
  } else {
    if (/^\/\//.test(path)) {
      return false;
    }
  }
  return true;
};

/**
 * Returns the value as a number.
 * @param value - value to return.
 * @returns {number}
 * @constructor
 */
var N = function (value) {
  ArgsChecker.checkLength(arguments, 1, "N");
  return TypeConverter.firstValueAsNumber(value);
};


/**
 * Tests if the content of one or several cells is a reference. Verifies the type of references in a cell or a range of
 * cells. If an error occurs, the function returns a logical or numerical value.
 * @param value - The value to be tested, to determine whether it is a reference.
 * @returns {boolean}
 * @constructor
 */
var ISREF = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISREF");
  return TypeConverter.firstValue(value) instanceof Cell;
};


/**
 * Returns the number corresponding to an error value occurring in a different cell. With the aid of this number, an
 * error message text can be generated. If an error occurs, the function returns a logical or numerical value.
 * @param value - Contains either the address/reference of the cell in which the error occurs, or the error directly.
 * Eg: `=ERRORTYPE(NA())`
 * @constructor
 * TODO: This formula, while written correctly in javascript, needs to be called inside of a try-catch-block inside the
 * Parser/Sheet. Otherwise the errors thrown by nested formulas break through. Eg: `=ERRORTYPE(NA())`, NA bubbles up.
 * Once this is done, we should test it inside SheetFormulaTest.ts
 */
var ERRORTYPE = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ERRORTYPE");
  value = TypeConverter.firstValue(value);
  if (value instanceof Cell) {
    if (value.hasError()) {
      value = value.getError();
    } else {
      throw new NAError("Function ERROR.TYPE parameter 1 value is not an error.");
    }
  }
  if (value instanceof Error) {
    switch (value.name) {
      case NULL_ERROR:
        return 1;
      case DIV_ZERO_ERROR:
        return 2;
      case VALUE_ERROR:
        return 3;
      case REF_ERROR:
        return 4;
      case NAME_ERROR:
        return 5;
      case NUM_ERROR:
        return 6;
      case NA_ERROR:
        return 7;
      default:
        return 8;
    }
  } else {
    throw new NAError("Function ERROR.TYPE parameter 1 value is not an error.");
  }
};


/**
 * Returns TRUE if the reference to a cell is blank. This function is used to determine if the content of a cell is
 * empty. A cell with a formula inside is not empty. If an error occurs, the function returns a logical or numerical
 * value.
 * @param value - The content to be tested.
 * @returns {boolean}
 * @constructor
 */
var ISBLANK = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISBLANK");
  if (value instanceof Cell) {
    return value.isBlank();
  }
  return value === undefined;
};


export {
  NA,
  ISTEXT,
  ISLOGICAL,
  ISNUMBER,
  ISNONTEXT,
  ISEMAIL,
  ISURL,
  N,
  ISREF,
  ERRORTYPE,
  ISBLANK
}