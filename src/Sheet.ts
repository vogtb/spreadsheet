import {
  Parser
} from "./Parser/Parser";
import {
  Cell
} from "./Cell";
import {
  DivZeroError,
  RefError,
  NameError, ParseError
} from "./Errors";
import {
  Formulas
} from "./Formulas";
import * as AllFormulas from "./Formulas/AllFormulas";
import {
  TypeConverter
} from "./Utilities/TypeConverter";


/**
 * Model representing a spreadsheet. When values/cells are added, dependencies recalculated, and true-values of those
 * cells will be updated.
 */
let Sheet = (function () {
  let instance = this;

  // Will be overwritten, but needs to be initialized, and have some functions for tsc compilation.
  let parser = {
    setObj: function (obj: string) {},
    parse: function (formula: string) {}
  };

  /**
   * Creates a new FormulaParser, which parses formulas, and does minimal error handling.
   *
   * @param handler should be this instance. Needs access to helper.fixedCellValue, helper.cellValue,
   * helper.cellRangeValue, and helper.fixedCellRangeValue
   * @returns formula parser instance for use with parser.js
   * @constructor
   */
  let FormulaParser = function(handler) {
    let formulaLexer = function () {};
    formulaLexer.prototype = Parser.lexer;

    let formulaParser = function () {
      this.lexer = new formulaLexer();
      this.yy = {};
    };

    formulaParser.prototype = Parser;
    let newParser = new formulaParser;
    newParser.setObj = function(obj: string) {
      newParser.yy.obj = obj;
    };

    newParser.yy.parseError = function (str, hash) {
      throw new ParseError(JSON.stringify({
        name: 'Parser error',
        message: str,
        prop: hash
      }));
    };

    newParser.yy.handler = handler;

    return newParser;
  };

  /**
   * Holds cell values, and allows for the updating and manipulation of those cells.
   */
  class Matrix {
    /**
     * Holds cells inside an object for quick access.
     */
    public data: Object = {};

    /**
     * Gets the cell corresponding to the key. If the value is undefined, will return blank cell..
     * @param key to look up cell
     * @returns {Cell} to return, if it exists. Returns blank cell if key not in matrix.
     */
    getCell(key: string) : Cell {
      if (key in this.data) {
        return this.data[key];
      }
      return new Cell(key);
    }

    /**
     * Add cell to matrix. If it exists, update the necessary values. If it doesn't exist add it.
     * @param cell to add to matrix.
     * @returns {Cell} Returns the cell after it has been added.
     */
    addCell(cell: Cell) {
      let cellId = cell.getId();

      if (!(cellId in this.data)) {
        this.data[cellId] = cell;
      } else {
        this.getCell(cellId).updateDependencies(cell.getDependencies());
        this.getCell(cellId).setValue(cell.getValue());
        this.getCell(cellId).setError(cell.getError());
      }

      return this.getCell(cellId);
    }

    /**
     * Get all dependencies for a specific cell.
     * @param id of cell
     * @returns {Array} of A1-format cell ID dependencies, in no particular oder.
     */
    getDependencies(id: string) {
      let getDependencies = function (id: string) {
        let filtered = [];
        for (let key in this.data) {
          let cell = this.data[key];
          if (cell.dependencies) {
            if (cell.dependencies.indexOf(id) > -1) {
              filtered.push(cell)
            }
          }
        }

        let deps = [];
        filtered.forEach(function (cell) {
          if (deps.indexOf(cell.id) === -1) {
            deps.push(cell.id);
          }
        });

        return deps;
      }.bind(this);
      let allDependencies = [];
      let getTotalDependencies = function (id: string) {
        let deps = getDependencies(id);

        if (deps.length) {
          deps.forEach(function (refId) {
            if (allDependencies.indexOf(refId) === -1) {
              allDependencies.push(refId);

              let cell = this.getCell(refId);
              if (cell.getDependencies().length) {
                getTotalDependencies(refId);
              }
            }
          }.bind(this));
        }
      }.bind(this);
      getTotalDependencies(id);
      return allDependencies;
    }

    /**
     * Set a cell in this matrix. Could update an existing cell, or add a new one.
     * @param id to of cell to create of update
     * @param rawFormula of cell to create or update
     */
    setCell(id: string, rawFormula: string) {
      let cell = new Cell(id);
      cell.setValue(rawFormula);
      registerCellInMatrix(cell);
      recalculateCellDependencies(cell);
    }
  }

  /**
   * Recalculate a cell's dependencies. Involves recalculating cell formulas for ALL dependencies.
   * @param cell to recalculate dependencies
   */
  let recalculateCellDependencies = function (cell: Cell) {
    let allDependencies = instance.matrix.getDependencies(cell.getId());

    allDependencies.forEach(function (refId) {
      let currentCell = instance.matrix.getCell(refId);
      if (currentCell && currentCell.hasFormula()) {
        calculateCellFormula(currentCell);
      }
    });
  };

  /**
   * Calculate a cell's formula by parsing it, and updating it's value and error fields.
   * @param cell to calculate
   * @returns {{error: null, result: null}} parsed result
   */
  let calculateCellFormula = function (cell: Cell) {
    // to avoid double translate formulas, update cell data in parser
    let parsed = parse(cell.getFormula(), cell.getId());

    instance.matrix.getCell(cell.getId()).setValue(parsed.result);
    instance.matrix.getCell(cell.getId()).setError(parsed.error);

    return parsed;
  };

  /**
   * Register a cell in the matrix, and calculate its formula if it has one.
   * @param cell to register
   */
  let registerCellInMatrix = function (cell: Cell) {
    instance.matrix.addCell(cell);
    if (cell.hasFormula()) {
      calculateCellFormula(cell);
    }
  };

  let utils = {
    isArray: function (value) {
      return value instanceof Array;
    },

    isFunction: function (value) {
      return value instanceof Function;
    },

    toNum: function (chr) {
      chr = utils.clearFormula(chr);
      let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

      for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
      }

      if (result) {
        --result;
      }

      return result;
    },

    toChar: function (num) {
      let s = '';

      while (num >= 0) {
        s = String.fromCharCode(num % 26 + 97) + s;
        num = Math.floor(num / 26) - 1;
      }

      return s.toUpperCase();
    },
    XYtoA1: function (x, y) {
      function numberToLetters(num) {
        let mod = num % 26,
          pow = num / 26 | 0,
          out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
        return pow ? numberToLetters(pow) + out : out;
      }
      return numberToLetters(x+1) + (y+1).toString();
    },
    cellCoords: function (cell) {
      let num = cell.match(/\d+$/),
        alpha = cell.replace(num, '');

      return {
        row: parseInt(num[0], 10) - 1,
        col: utils.toNum(alpha)
      };
    },

    clearFormula: function (formula) {
      return formula.replace(/\$/g, '');
    },

    iterateCells: function (startCell, endCell, callback) {
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
          let cellIndex = utils.toChar(column) + (row + 1),
            cellValue = instance.helper.cellValue.call(this, cellIndex);

          result.index.push(cellIndex);
          result.value.push(cellValue);
        }
      }

      if (utils.isFunction(callback)) {
        return callback.apply(callback, [result]);
      } else {
        return result;
      }
    },

    sort: function (rev) {
      return function (a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
      }
    }
  };

  let helper = {
    /**
     * Is the value a number or can the value be interpreted as a number
     */
    number: function (x) {
      return TypeConverter.valueToNumber(x);
    },

    string: function (str) {
      return str.substring(1, str.length - 1);
    },

    numberInverted: function (num) {
      return this.number(num) * (-1);
    },

    specialMatch: function (type, exp1, exp2) {
      let result;

      switch (type) {
        case '&':
          result = exp1.toString() + exp2.toString();
          break;
      }
      return result;
    },

    logicMatch: function (type, exp1, exp2) {
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
          result = (exp1 === exp2);
          break;

        case '<>':
          result = (exp1 != exp2);
          break;

        case 'NOT':
          result = (exp1 != exp2);
          break;
      }

      return result;
    },

    mathMatch: function (type, number1, number2) {
      let result;

      number1 = helper.number(number1);
      number2 = helper.number(number2);

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
    },

    callFunction: function (fn, args) {
      fn = fn.toUpperCase();
      args = args || [];
      if (Formulas.exists(fn)) {
        return Formulas.get(fn).apply(this, args);
      }

      throw new NameError("Unknown function: '" + fn + "'.");
    },

    callVariable: function (args) {
      args = args || [];
      let str = args.shift(); // the first in args is the name of the function to call.

      if (str) {
        str = str.toUpperCase();
        if (Formulas.exists(str)) {
          return Formulas.get(str).apply(this, args);
        }
      }

      throw new NameError("Unknown variable: '" + str + "'.");
    },

    cellValue: function (cellId) {
      let origin = this,
        cell = instance.matrix.getCell(cellId);

      //update dependencies
      instance.matrix.getCell(origin).updateDependencies([cellId]);
      // check references error
      if (cell && cell.getDependencies()) {
        if (cell.getDependencies().indexOf(cellId) !== -1) {
          throw new RefError("Reference does not exist.");
        }
      }
      return cell;
    },

    cellRangeValue: function (start: string, end: string) {
      let coordsStart = utils.cellCoords(start),
        coordsEnd = utils.cellCoords(end),
        origin = this;

      // iterate cells to get values and indexes
      let cells = instance.utils.iterateCells.call(this, coordsStart, coordsEnd),
        result = [];
      //update dependencies
      instance.matrix.getCell(origin).updateDependencies(cells.index);

      result.push(cells.value);
      return result;
    },

    fixedCellValue: function (id) {
      id = id.replace(/\$/g, '');
      return instance.helper.cellValue.call(this, id);
    },

    fixedCellRangeValue: function (start, end) {
      start = start.replace(/\$/g, '');
      end = end.replace(/\$/g, '');

      return instance.helper.cellRangeValue.call(this, start, end);
    }
  };

  /**
   * Parse a formula for a particular cell. Involves calculating all dependencies and potentially updating them as well.
   * @param formula to parse
   * @param cellId necessary for dependency access
   * @returns {{error: null, result: null}} a parsed value including an error, and potential resulting value
   */
  let parse = function (formula, cellId) {
    let result = null;
    let error = null;

    try {
      parser.setObj(cellId);
      result = parser.parse(formula);
      let deps = instance.matrix.getDependencies(cellId);

      if (deps.indexOf(cellId) !== -1) {
        result = null;
        deps.forEach(function (id) {
          instance.matrix.getCell(id).setError(new RefError("Reference does not exist"));
          instance.matrix.getCell(id).clearValue();
        });
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
  };

  /**
   * Set a cell value by A1-format cell ID
   * @param id of cel to set
   * @param value raw input to update the cell with
   */
  let setCell = function (id: string, value: string) {
    instance.matrix.setCell(id, value.toString());
  };

  /**
   * Get a cell by A1-format cell ID, if it exists in the Sheet. If not return null.
   * @param id to lookup the cell
   * @returns {Cell} cell found, or null.
   */
  let getCell = function (id: string) : Cell {
    let cell = instance.matrix.getCell(id);
    if (cell === undefined) {
      return null;
    }
    return cell;
  };

  /**
   * Load a matrix into this sheet. Matrix values can be of any type, as long as they have a toString()
   * @param input matrix
   */
  this.load = function (input: Array<Array<any>>) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
        // set the cell here
        let id = utils.XYtoA1(x, y);
        this.setCell(id, input[y][x].toString());
      }
    }
  };

  /**
   * Render this Sheet as a string in which each row is a cell.
   * @returns {string}
   */
  this.toString = function () {
    let toReturn = "";
    for (let key in this.matrix.data) {
      toReturn += this.matrix.data[key].toString() + "\n";
    }
    return toReturn;
  };

  parser  = FormulaParser(instance);
  instance.matrix = new Matrix();
  this.utils = utils;
  this.helper = helper;
  this.parse = parse;
  this.setCell = setCell;
  this.getCell = getCell;
});

export {
  Sheet,
  AllFormulas
}