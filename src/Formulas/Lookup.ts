import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  NumError, RefError, ValueError
} from "../Errors";
import {
  TypeConverter
} from "../Utilities/TypeConverter";
import {
  Filter
} from "../Utilities/Filter";
import {Cell} from "../Cell";


/**
 * Returns an element from a list of choices based on index.
 * @param index - Which choice to return. Index starts at 1.
 * @param values -  Array of potential value to return. Required. May be a reference to a cell or an individual value.
 * @constructor
 */
let CHOOSE = function (index, ...values) {
  ArgsChecker.checkAtLeastLength(arguments, 2, "CHOOSE");
  let i = Math.floor(TypeConverter.firstValueAsNumber(index));
  let data = Filter.flattenAndThrow(values);
  if (i < 1 || i > data.length) {
    throw new NumError("Function CHOOSE parameter 1 value is " + i + ". Valid values are between 1 and "
        + (data.length) + " inclusive.");
  }
  return data[i-1];
};

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
let ADDRESS = function (row, column, absoluteVsRelativeMode = 1, useA1Notation = true, sheet?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 5, "ADDRESS");
  row = TypeConverter.firstValueAsNumber(row);
  column = TypeConverter.firstValueAsNumber(column);
  absoluteVsRelativeMode = TypeConverter.firstValueAsNumber(absoluteVsRelativeMode);
  useA1Notation = TypeConverter.firstValueAsBoolean(useA1Notation);
  sheet = (sheet === undefined) ? sheet : TypeConverter.firstValueAsString(sheet);

  function calculateColumnLetters(n) {
    n--; // ensuring 1-indexed.
    let ordA = 'a'.charCodeAt(0);
    let ordZ = 'z'.charCodeAt(0);
    let len = ordZ - ordA + 1;

    let s = "";
    while(n >= 0) {
      s = String.fromCharCode(n % len + ordA) + s;
      n = Math.floor(n / len) - 1;
    }
    return s.toUpperCase();
  }

  if (row < 1) {
    throw new ValueError("Function ADDRESS parameter 1 value is " + row
        + ", but it should be greater than or equal to 1.");
  }
  if (column < 1) {
    throw new ValueError("Function ADDRESS parameter 2 value is " + column
      + ", but it should be greater than or equal to 1.");
  }
  if (absoluteVsRelativeMode > 4 || absoluteVsRelativeMode < 1) {
    throw new NumError("Function ADDRESS parameter 3 value is " + absoluteVsRelativeMode
        + ", while valid values are between 1 and 4 inclusively");
  }

  let cellNotation = "";
  if (useA1Notation) {
    let columnLetter = calculateColumnLetters(column);
    switch (absoluteVsRelativeMode) {
      // 1 is row and column absolute (e.g. $A$1)
      case 1:
        cellNotation = cellNotation + "$" + columnLetter + "$" + row.toString();
        break;
      // 2 is row absolute and column relative (e.g. A$1)
      case 2:
        cellNotation = cellNotation + columnLetter + "$" + row.toString();
        break;
      // 3 is row relative and column absolute (e.g. $A1)
      case 3:
        cellNotation = cellNotation + "$" + columnLetter + row.toString();
        break;
      // 4 is row and column relative (e.g. A1).
      case 4:
        cellNotation = cellNotation + columnLetter + row.toString();
        break;
    }
  } else {
    switch (absoluteVsRelativeMode) {
      // 1 is row and column absolute (e.g. R1C1)
      case 1:
        cellNotation = "R" + row.toString() + "C" + column.toString();
        break;
      // 2 is row absolute and column relative (e.g. R1C[1])
      case 2:
        cellNotation = "R" + row.toString() + "C[" + column.toString() + "]";
        break;
      // 3 is row relative and column absolute (e.g. R[1]C1)
      case 3:
        cellNotation = "R[" + row.toString() + "]C" + column.toString();
        break;
      // 4 is row and column relative (e.g. R[1]C[1]).
      case 4:
        cellNotation = "R[" + row.toString() + "]C[" + column.toString() + "]";
        break;
    }
  }
  if (sheet !== undefined) {
    // If the sheet name contains non-alpha numeric characters, wrap it in single-quotes.
    // Safe sheet name examples: 'sheet_one', 'sheetone'.
    // Unsafe sheet name examples: '_one', '12345sheet', 'sheet 1'.
    if (sheet.match(/^[a-zA-Z]+[a-zA-Z0-9_]*$/) === null) {
      return "'" + sheet + "'!" + cellNotation;
    }
    return sheet + "!" + cellNotation;

  } else {
    return cellNotation;
  }
};


/**
 * Gets the number of columns in a specified array or range.
 * @param value - The array of range to consider.
 * @returns {number}
 * @constructor
 */
let COLUMNS = function (value) {
  ArgsChecker.checkLength(arguments, 1, "COLUMNS");
  if (value instanceof Array) {
    if (value.length === 0) {
      throw new RefError("Reference does not exist.");
    } else if (value.length === 1) {
      return 1;
    }
    if (value[0] instanceof Cell) {
      let start = value[0];
      let end = value[value.length - 1];
      return end.getColumn() - start.getColumn() + 1; // counting columns inclusively
    } else {
      // if the array passed in is just values, assume that each value is a column.
      return value.length;
    }
  } else {
    return 1;
  }
};


let ROWS = function (value) {
  ArgsChecker.checkLength(arguments, 1, "ROWS");
  if (value instanceof Array) {
    if (value.length === 0) {
      throw new RefError("Reference does not exist.");
    }
    if (value[0] instanceof Cell) {
      let start = value[0];
      let end = value[value.length - 1];
      return end.getRow() - start.getRow() + 1; // counting columns inclusively
    } else {
      // if the array passed in is just values, array is considered to be a single row
      return 1;
    }
  } else {
    return 1;
  }
};


export {
  CHOOSE,
  ADDRESS,
  COLUMNS,
  ROWS
}