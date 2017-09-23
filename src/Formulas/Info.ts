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
let NA = function () {
  ArgsChecker.checkLength(arguments, 0, "NA");
  throw new NAError("NA Error thrown.");
};


/**
 * Returns true if a value is text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
let ISTEXT =  function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISTEXT");
  return typeof TypeConverter.firstValue(value) === "string";
};


/**
 * Returns true if a value is not text.
 * @param value - value or reference to check.
 * @returns {boolean}.
 * @constructor
 */
let ISNONTEXT = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISNONTEXT");
  return typeof TypeConverter.firstValue(value) !== "string";
};


/**
 * Returns true if value is a boolean (FALSE, or TRUE). Numerical and text values return false.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
let ISLOGICAL = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISLOGICAL");
  return typeof TypeConverter.firstValue(value) === "boolean";
};


/**
 * Returns true if value or reference is a number.
 * @param value - value or reference to check.
 * @returns {boolean}
 * @constructor
 */
let ISNUMBER = function (value) {
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
let ISEMAIL = function (value) {
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
let ISURL = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISURL");
  value = TypeConverter.firstValueAsString(value);
  let matches = value.match(/(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/);
  if (/[^a-z0-9\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\.\-\_\~\%]/i.test(value)) {
    return false;
  }
  if (/%[^0-9a-f]/i.test(value)) {
    return false;
  }
  if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(value)) {
    return false;
  }
  let authority = matches[2];
  let path = matches[3];
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
let N = function (value) {
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
let ISREF = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISREF");
  return TypeConverter.firstValue(value) instanceof Cell;
};


/**
 * Returns the number corresponding to an error value occurring in a different cell. With the aid of this number, an
 * error message text can be generated. If an error occurs, the function returns a logical or numerical value.
 * @param value - Contains either the address/reference of the cell in which the error occurs, or the error directly.
 * Eg: `=ERRORTYPE(NA())`
 * @constructor
 */
let ERRORTYPE = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ERRORTYPE");
  try {
    value = TypeConverter.firstValue(value);
  } catch (e) {
    value = e;
  }
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
let ISBLANK = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISBLANK");
  if (value instanceof Cell) {
    return value.isBlank();
  }
  return value === undefined;
};


/**
 * Returns TRUE if the value refers to any error value except #N/A. You can use this function to control error values
 * in certain cells. If an error occurs, the function returns a logical or numerical value.
 * @param value - Any value or expression in which a test is performed to determine whether an error value not equal to
 * #N/A is present.
 * @returns {boolean}
 * @constructor
 */
let ISERR = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISERR");
  try {
    value = TypeConverter.firstValue(value);
  } catch (e) {
    return true;
  }
  if (value instanceof Cell) {
    if (value.hasError()) {
      return value.getError().name !== NA_ERROR;
    }
    return false;
  }
  if (value instanceof Error) {
    return value.name !== NA_ERROR;
  }
  return false;
};

/**
 * Tests if the cells contain general error values. ISERROR recognizes the #N/A error value. If an error occurs, the
 * function returns a logical or numerical value.
 * @param value - is any value where a test is performed to determine whether it is an error value.
 * @returns {boolean}
 * @constructor
 */
let ISERROR = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISERROR");
  try {
    value = TypeConverter.firstValue(value);
  } catch (e) {
    return true;
  }
  if (value instanceof Cell) {
    return value.hasError();
  }
  return (value instanceof Error);
};


/**
 * Returns TRUE if a cell contains the #N/A (value not available) error value. If an error occurs, the function returns
 * a logical or numerical value.
 * @param value - The value or expression to be tested.
 * @returns {boolean}
 * @constructor
 */
let ISNA = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISNA");
  try {
    value = TypeConverter.firstValue(value);
  } catch (e) {
    return false;
  }
  if (value instanceof Cell) {
    if (value.hasError()) {
      return value.getError().name === NA_ERROR;
    }
  }
  if (value instanceof Error) {
    return value.name === NA_ERROR;
  }
  return false;
};


/**
 * Returns the first argument if no error value is present, otherwise returns the second argument if provided, or a
 * blank if the second argument is absent. Blank value is `null`.
 * @param value - Value to check for error.
 * @param valueIfError - [OPTIONAL] - Value to return if no error is present in the first argument.
 * @returns {any}
 * @constructor
 */
let IFERROR = function (value, valueIfError?) {
  valueIfError = valueIfError || null;
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "IFERROR");
  if (value instanceof Cell) {
    if (value.hasError()) {
      return valueIfError;
    }
    return value;
  }
  if (ISERROR(value)) {
    return valueIfError;
  }
  return value;
};


/**
 * Returns a number corresponding to the type of data passed into the function. 1 = number, 2 = text, 4 = boolean,
 * 16 = error, 64 = array/range, 128 = any other type of cell.
 * @param value - Value for which the type will be determined.
 * @returns {number}
 * @constructor
 */
let TYPE = function (value) {
  ArgsChecker.checkLengthWithin(arguments, 1, 2, "TYPE");
  if (value instanceof Cell) {
    if (value.hasError()) {
      return 16;
    }
    value = value.getValue();
  }
  if (value === null) {
    return 1;
  }
  if (typeof value === "number") {
    return 1;
  }
  if (typeof value === "string") {
    return 2;
  }
  if (typeof value === "boolean") {
    return 4;
  }
  if (value instanceof Error) {
    return 16;
  }
  if (value instanceof Array) {
    return 64;
  }
  return 128;
};


/**
 * Returns the column number of a specified cell, starting with column 1 for A.
 * @param cell - Cell, defaults to the cell calling this formula, when used in the context of a spreadsheet.
 * @constructor
 */
let COLUMN =  function (cell) {
  ArgsChecker.checkLength(arguments, 1, "COLUMN");
  if (!(cell instanceof Cell)) {
    throw new NAError("Argument must be a range or reference.");
  }
  return cell.getColumn() + 1;
};


/**
 * Returns the row number of a specified cell, starting with row 1 for A1.
 * @param cell - Cell, defaults to the cell calling this formula, when used in the context of a spreadsheet.
 * @constructor
 */
let ROW =  function (cell) {
  ArgsChecker.checkLength(arguments, 1, "ROW");
  if (!(cell instanceof Cell)) {
    throw new NAError("Argument must be a range or reference.");
  }
  return cell.getRow() + 1;
};


/**
 * Returns TRUE if a cell is a formula cell. Must be given a reference.
 * @param value - To check.
 * @returns {boolean}
 * @constructor
 */
let ISFORMULA = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ISFORMULA");
  if (value instanceof Array) {
    if (value.length === 0) {
      throw new RefError("Reference does not exist.");
    }
  }
  if (!(value instanceof Cell)) {
    throw new NAError("Argument must be a range");
  }
  return value.hasFormula();
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
  ISBLANK,
  ISERR,
  ISERROR,
  ISNA,
  IFERROR,
  TYPE,
  COLUMN,
  ROW,
  ISFORMULA
}