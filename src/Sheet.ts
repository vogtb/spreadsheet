import {Cell} from "./Cell";
import {DivZeroError, NameError, RefError} from "./Errors";
import {DataStore} from "./Parser/DataStore";
import {FormulaParser} from "./Parser/Parser";
import {TypeConverter} from "./Utilities/TypeConverter";
import {Formulas} from "./Formulas";

// TODO: Document.
class Sheet {
  private parser  = {
    yy:{
      obj: undefined
    },
    setObj: function (obj: string) {},
    parse: function (formula: string) {}
  };
  private dataStore : DataStore;

  constructor() {
    this.parser  = FormulaParser(this);
    this.dataStore = new DataStore();
  }

  isArray (value) {
    return value instanceof Array;
  };

  isFunction (value) {
    return value instanceof Function;
  };

  toNum (chr) {
    chr = this.clearFormula(chr);
    let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

    for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
      result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
    }

    if (result) {
      --result;
    }

    return result;
  };

  toChar (num) {
    let s = '';

    while (num >= 0) {
      s = String.fromCharCode(num % 26 + 97) + s;
      num = Math.floor(num / 26) - 1;
    }

    return s.toUpperCase();
  };

  XYtoA1 (x, y) {
    function numberToLetters(num) {
      let mod = num % 26,
        pow = num / 26 | 0,
        out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
      return pow ? numberToLetters(pow) + out : out;
    }
    return numberToLetters(x+1) + (y+1).toString();
  };

  cellCoords (cell) {
    let num = cell.match(/\d+$/),
      alpha = cell.replace(num, '');

    return {
      row: parseInt(num[0], 10) - 1,
      col: this.toNum(alpha)
    };
  };

  clearFormula (formula) {
    return formula.replace(/\$/g, '');
  };

  iterateCells (origin, startCell, endCell, callback?) {
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

    if (this.isFunction(callback)) {
      return callback.apply(callback, [result]);
    } else {
      return result;
    }
  }

  sort(rev) {
    return function (a, b) {
      return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
    }
  }


  number(x) {
    return TypeConverter.valueToNumber(x);
  }

  string(str) {
    return str.substring(1, str.length - 1);
  }

  numberInverted (num) {
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

      case 'NOT':
        result = (exp1 != exp2);
        break;
    }

    return result;
  };

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

  callFunction(fn, args) {
    fn = fn.toUpperCase();
    args = args || [];
    if (Formulas.exists(fn)) {
      return Formulas.get(fn).apply(this, args);
    }

    throw new NameError("Unknown function: '" + fn + "'.");
  }

  callVariable(args) {
    args = args || [];
    let str = args.shift(); // the first in args is the name of the function to call.

    if (str) {
      str = str.toUpperCase();
      if (Formulas.exists(str)) {
        return Formulas.get(str).apply(this, args);
      }
    }

    throw new NameError("Unknown variable: '" + str + "'.");
  };

  cellValue(origin, cellId) {
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

  cellRangeValue(origin, start: string, end: string) {
    let coordsStart = this.cellCoords(start),
      coordsEnd = this.cellCoords(end);

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
  };

  fixedCellRangeValue(origin, start, end) {
    start = start.replace(/\$/g, '');
    end = end.replace(/\$/g, '');

    return this.cellRangeValue(origin, start, end);
  };

  private recalculateCellDependencies(cell: Cell) {
    let allDependencies = this.dataStore.getDependencies(cell.getId());

    for (let refId of allDependencies) {
      let currentCell = this.dataStore.getCell(refId);
      if (currentCell && currentCell.hasFormula()) {
        this.calculateCellFormula(currentCell);
      }
    }
  }

  private calculateCellFormula(cell: Cell) {
    // to avoid double translate formulas, update cell data in parser
    let parsed = this.parse(cell.getFormula(), cell.getId());

    this.dataStore.getCell(cell.getId()).setValue(parsed.result);
    this.dataStore.getCell(cell.getId()).setError(parsed.error);

    return parsed;
  }

  private registerCellInDataStore(cell: Cell) {
    this.dataStore.addCell(cell);
    if (cell.hasFormula()) {
      this.calculateCellFormula(cell);
    }
  }

  public parse(formula, cellId) {
    let result = null;
    let error = null;

    try {
      this.parser.yy.obj = cellId;
      result = this.parser.parse(formula);
      let deps = this.dataStore.getDependencies(cellId);

      if (deps.indexOf(cellId) !== -1) {
        result = null;
        for(let id of deps) {
          this.dataStore.getCell(id).setError(new RefError("Reference does not exist"));
          this.dataStore.getCell(id).clearValue();
        }
        error = new RefError("Reference does not exist.");
      }
    } catch (e) {
      error = e;
    }

    if (result instanceof Error) {
      return {
        error: result,
        result: null
      }
    }
    return {
      error: error,
      result: result
    }
  }

  public setCell(id: string, value: string) {
    let cell = new Cell(id);
    cell.setValue(value.toString());
    this.registerCellInDataStore(cell);
    this.recalculateCellDependencies(cell);
  }

  public getCell(id: string) : Cell {
    let cell = this.dataStore.getCell(id);
    if (cell === undefined) {
      return null;
    }
    return cell;
  }

  public load(input: Array<Array<any>>) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
        // set the cell here
        let id = this.XYtoA1(x, y);
        this.setCell(id, input[y][x].toString());
      }
    }
  };

}

export {
  Sheet
}