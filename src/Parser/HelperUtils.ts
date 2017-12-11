import {TypeConverter} from "../Utilities/TypeConverter";
import {DivZeroError, NameError, RefError} from "../Errors";
import {Formulas} from "../Formulas";


class HelperUtils {
  public dataStore: any; // TODO: make this not any.

  constructor(dataStore: any) {
    this.dataStore = dataStore;
  }

  /**
   * Is the value a number or can the value be interpreted as a number
   */
  number(x) {
    return TypeConverter.valueToNumber(x);
  }

  string(str) {
    return str.substring(1, str.length - 1);
  }

  numberInverted(num) {
    return this.number(num) * (-1);
  }

  specialMatch(type, exp1, exp2) {
    let result;
    switch (type) {
      case '&':
        result = exp1.toString() + exp2.toString();
        break;
    }
    return result;
  }

  logicMatch(type, exp1, exp2) {
    let result;
    switch (type) {
      case '=':
        result = (exp1 === exp2);
        break;
      case '>':
        result = (exp1 > exp2);
        break;
      case '<':
        result = (exp1 < exp2);
        break;
      case '>=':
        result = (exp1 >= exp2);
        break;
      case '<=':
        result = (exp1 <= exp2);
        break;
      case '<>':
        result = (exp1 != exp2);
        break;
    }
    return result;
  }

  mathMatch(type, number1, number2) {
    let result;
    number1 = this.number(number1);
    number2 = this.number(number2);
    switch (type) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '/':
        if (number2 === 0) {
          throw new DivZeroError("Evaluation caused divide by zero error.");
        }
        if (number2 !== 0 && number1 === 0) {
          result = 0;
        }
        result = number1 / number2;
        if (result == Infinity) {
          throw new DivZeroError("Evaluation caused divide by zero error.");
        } else if (isNaN(result)) {
          throw new DivZeroError("Evaluation caused divide by zero error.");
        }
        break;
      case '*':
        result = number1 * number2;
        break;
      case '^':
        result = Math.pow(number1, number2);
        break;
    }
    return result;
  }

  callFunction (fn, args) {
    fn = fn.toUpperCase();
    args = args || [];
    if (Formulas.exists(fn)) {
      return Formulas.get(fn).apply(this, args);
    }
    throw new NameError("Unknown function: '" + fn + "'.");
  }

  callVariable (args) {
    args = args || [];
    let str = args.shift(); // the first in args is the name of the function to call.
    if (str) {
      str = str.toUpperCase();
      if (Formulas.exists(str)) {
        return Formulas.get(str).apply(this, args);
      }
    }
    throw new NameError("Unknown variable: '" + str + "'.");
  }

  cellValue (origin, cellId) {
    let cell = this.dataStore.getCell(cellId);

    //update dependencies
    this.dataStore.getCell(origin).updateDependencies([cellId]);
    // check references error
    if (cell && cell.getDependencies()) {
      if (cell.getDependencies().indexOf(cellId) !== -1) {
        throw new RefError("Reference does not exist.");
      }
    }
    return cell;
  }

  cellRangeValue (origin, start: string, end: string) {
    let coordsStart = this.cellCoords(start);
    let coordsEnd = this.cellCoords(end);

    // iterate cells to get values and indexes
    let cells = this.iterateCells(origin, coordsStart, coordsEnd),
      result = [];
    //update dependencies
    this.dataStore.getCell(origin).updateDependencies(cells.index);

    result.push(cells.value);
    return result;
  }

  fixedCellValue (origin, id) {
    id = id.replace(/\$/g, '');
    return this.cellValue(origin, id);
  }

  fixedCellRangeValue (origin, start, end) {
    start = start.replace(/\$/g, '');
    end = end.replace(/\$/g, '');

    return this.cellRangeValue(origin, start, end);
  }

  static isArray(value) {
    return value instanceof Array;
  }

  static isFunction(value) {
    return value instanceof Function;
  }

  static toNum(chr) {
    chr = HelperUtils.clearFormula(chr);
    let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

    for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
      result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
    }

    if (result) {
      --result;
    }

    return result;
  }

  toChar(num) {
    let s = '';

    while (num >= 0) {
      s = String.fromCharCode(num % 26 + 97) + s;
      num = Math.floor(num / 26) - 1;
    }

    return s.toUpperCase();
  }

  XYtoA1(x, y) {
    function numberToLetters(num) {
      let mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
      return pow ? numberToLetters(pow) + out : out;
    }
    return numberToLetters(x+1) + (y+1).toString();
  }

  cellCoords(cell) {
    let num = cell.match(/\d+$/),
      alpha = cell.replace(num, '');

    return {
      row: parseInt(num[0], 10) - 1,
      col: HelperUtils.toNum(alpha)
    };
  }

  static clearFormula(formula) {
    return formula.replace(/\$/g, '');
  }

  iterateCells(origin, startCell, endCell, callback?) {
    let result = {
      index: [], // list of cell index: A1, A2, A3
      value: []  // list of cell value
    };

    let cols = {
      start: 0,
      end: 0
    };

    if (endCell.col >= startCell.col) {
      cols = {
        start: startCell.col,
        end: endCell.col
      };
    } else {
      cols = {
        start: endCell.col,
        end: startCell.col
      };
    }

    let rows = {
      start: 0,
      end: 0
    };

    if (endCell.row >= startCell.row) {
      rows = {
        start: startCell.row,
        end: endCell.row
      };
    } else {
      rows = {
        start: endCell.row,
        end: startCell.row
      };
    }

    for (let column = cols.start; column <= cols.end; column++) {
      for (let row = rows.start; row <= rows.end; row++) {
        let cellIndex = this.toChar(column) + (row + 1),
          cellValue = this.cellValue(origin, cellIndex);

        result.index.push(cellIndex);
        result.value.push(cellValue);
      }
    }

    if (HelperUtils.isFunction(callback)) {
      return callback.apply(callback, [result]);
    } else {
      return result;
    }
  }

  static sort(rev?) {
    return function (a, b) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
    }
  }
}

export {
  HelperUtils
}