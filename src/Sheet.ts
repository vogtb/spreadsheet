/// <reference path="parser.d.ts"/>
import { Parser } from "./Parser";
import {SUPPORTED_FORMULAS, OverrideFormulas} from "./SupportedFormulas"
import { Cell } from "./Cell"
import { Errors } from "./Errors"
import * as Formula from "formulajs"
import { Helpers } from "./Helpers";

/**
 * Model representing a spreadsheet. When values/cells are added, dependencies recalculated, and true-values of those
 * cells will be updated.
 */
var Sheet = (function () {
  var instance = this;

  // Will be overwritten, but needs to be initialized, and have some functions for tsc compilation.
  var parser = {
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
  var FormulaParser = function(handler) {
    var formulaLexer = function () {};
    formulaLexer.prototype = Parser.lexer;

    var formulaParser = function () {
      this.lexer = new formulaLexer();
      this.yy = {};
    };

    formulaParser.prototype = Parser;
    var newParser = new formulaParser;
    newParser.setObj = function(obj: string) {
      newParser.yy.obj = obj;
    };

    newParser.yy.parseError = function (str, hash) {
      throw {
        name: 'Parser error',
        message: str,
        prop: hash
      }
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
    public data: Object;
    constructor() {
      this.data = {};
    }

    /**
     * Gets the cell corresponding to the key. If the value is not defined, will return undefined.
     * @param key to look up cell
     * @returns {Cell} to return, if it exists. Returns undefined if key not in matrix.
     */
    getCell(key: string) : Cell {
      return this.data[key];
    }

    /**
     * Add cell to matrix. If it exists, update the necessary values. If it doesn't exist add it.
     * @param cell to add to matrix.
     * @returns {Cell} Returns the cell after it has been added.
     */
    addCell(cell: Cell) {
      var cellId = cell.getId();

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
      var getDependencies = function (id: string) {
        var filtered = [];
        for (var key in this.data) {
          var cell = this.data[key];
          if (cell.dependencies) {
            if (cell.dependencies.indexOf(id) > -1) {
              filtered.push(cell)
            }
          }
        }

        var deps = [];
        filtered.forEach(function (cell) {
          if (deps.indexOf(cell.id) === -1) {
            deps.push(cell.id);
          }
        });

        return deps;
      }.bind(this);
      var allDependencies = [];
      var getTotalDependencies = function (id: string) {
        var deps = getDependencies(id);

        if (deps.length) {
          deps.forEach(function (refId) {
            if (allDependencies.indexOf(refId) === -1) {
              allDependencies.push(refId);

              var cell = this.getCell(refId);
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
     * @param formula of cell to create or update
     */
    setCell(id: string, formula: string) {
      var cell = new Cell(id);
      if (formula.charAt(0) === "=") {
        cell.setFormula(formula.substr(1));
      } else {
        cell.setValue(formula);
      }
      registerCellInMatrix(cell);
      recalculateCellDependencies(cell);
    }
  }

  /**
   * Recalculate a cell's dependencies. Involves recalculating cell formulas for ALL dependencies.
   * @param cell to recalculate dependencies
   */
  var recalculateCellDependencies = function (cell: Cell) {
    var allDependencies = instance.matrix.getDependencies(cell.getId());

    allDependencies.forEach(function (refId) {
      var currentCell = instance.matrix.getCell(refId);
      if (currentCell && currentCell.getFormula()) {
        calculateCellFormula(currentCell);
      }
    });
  };

  /**
   * Calculate a cell's formula by parsing it, and updating it's value and error fields.
   * @param cell to calculate
   * @returns {{error: null, result: null}} parsed result
   */
  var calculateCellFormula = function (cell: Cell) {
    // to avoid double translate formulas, update cell data in parser
    var parsed = parse(cell.getFormula(), cell.getId());

    instance.matrix.getCell(cell.getId()).setValue(parsed.result);
    instance.matrix.getCell(cell.getId()).setError(parsed.error);

    return parsed;
  };

  /**
   * Register a cell in the matrix, and calculate its formula if it has one.
   * @param cell to register
   */
  var registerCellInMatrix = function (cell: Cell) {
    instance.matrix.addCell(cell);
    if (cell.getFormula() !== null) {
      calculateCellFormula(cell);
    }
  };

  var utils = {
    isArray: function (value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    },

    isNumber: function (value) {
      return Object.prototype.toString.call(value) === '[object Number]';
    },

    isString: function (value) {
      return Object.prototype.toString.call(value) === '[object String]';
    },

    isFunction: function (value) {
      return Object.prototype.toString.call(value) === '[object Function]';
    },

    isUndefined: function (value) {
      return Object.prototype.toString.call(value) === '[object Undefined]';
    },

    isNull: function (value) {
      return Object.prototype.toString.call(value) === '[object Null]';
    },

    isSet: function (value) {
      return !utils.isUndefined(value) && !utils.isNull(value);
    },

    toNum: function (chr) {
      chr = utils.clearFormula(chr);
      var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

      for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
      }

      if (result) {
        --result;
      }

      return result;
    },

    toChar: function (num) {
      var s = '';

      while (num >= 0) {
        s = String.fromCharCode(num % 26 + 97) + s;
        num = Math.floor(num / 26) - 1;
      }

      return s.toUpperCase();
    },
    XYtoA1: function (x, y) {
      function numberToLetters(num) {
        var mod = num % 26,
          pow = num / 26 | 0,
          out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
        return pow ? numberToLetters(pow) + out : out;
      }
      return numberToLetters(x+1) + (y+1).toString();
    },
    cellCoords: function (cell) {
      var num = cell.match(/\d+$/),
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
      var result = {
        index: [], // list of cell index: A1, A2, A3
        value: []  // list of cell value
      };

      var cols = {
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

      var rows = {
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

      for (var column = cols.start; column <= cols.end; column++) {
        for (var row = rows.start; row <= rows.end; row++) {
          var cellIndex = utils.toChar(column) + (row + 1),
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

  var helper = {
    number: Helpers.number,

    string: function (str) {
      return str.substring(1, str.length - 1);
    },

    numberInverted: function (num) {
      return this.number(num) * (-1);
    },

    specialMatch: function (type, exp1, exp2) {
      var result;

      switch (type) {
        case '&':
          result = exp1.toString() + exp2.toString();
          break;
      }
      return result;
    },

    logicMatch: function (type, exp1, exp2) {
      var result;

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
      var result;

      number1 = helper.number(number1);
      number2 = helper.number(number2);

      if (isNaN(number1) || isNaN(number2)) {
        throw Error('VALUE');
      }

      switch (type) {
        case '+':
          result = number1 + number2;
          break;
        case '-':
          result = number1 - number2;
          break;
        case '/':
          result = number1 / number2;
          if (result == Infinity) {
            throw Error('DIV_ZERO');
          } else if (isNaN(result)) {
            throw Error('VALUE');
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
      if (fn in OverrideFormulas) {
        return OverrideFormulas[fn].apply(this, args);
      }
      if (SUPPORTED_FORMULAS.indexOf(fn) > -1) {
        if (Formula[fn]) {
          return Formula[fn].apply(this, args);
        }
      }

      throw Error('NAME');
    },

    callVariable: function (args) {
      args = args || [];
      var str = args[0];

      if (str) {
        str = str.toUpperCase();
        if (Formula[str]) {
          return ((typeof Formula[str] === 'function') ? Formula[str].apply(this, args) : Formula[str]);
        }
      }

      throw Error('NAME');
    },

    cellValue: function (cellId) {
      var value,
        origin = this,
        cell = instance.matrix.getCell(cellId);

      // get value
      value = cell ? cell.getValue() : "0"; // TODO: fix this, it's sloppy.
      //update dependencies
      instance.matrix.getCell(origin).updateDependencies([cellId]);
      // check references error
      if (cell && cell.getDependencies()) {
        if (cell.getDependencies().indexOf(cellId) !== -1) {
          throw Error('REF');
        }
      }

      // check if any error occurs
      if (cell && cell.getError()) {
        throw Error(cell.getError());
      }

      // return value if is set
      if (utils.isSet(value)) {
        var result = instance.helper.number(value);

        return !isNaN(result) ? result : value;
      }

      // cell is not available
      throw Error('NOT_AVAILABLE');
    },

    cellRangeValue: function (start: string, end: string) {
      var coordsStart = utils.cellCoords(start),
        coordsEnd = utils.cellCoords(end),
        origin = this;

      // iterate cells to get values and indexes
      var cells = instance.utils.iterateCells.call(this, coordsStart, coordsEnd),
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
  var parse = function (formula, cellId) {
    var result = null;
    var error = null;

    try {
      parser.setObj(cellId);
      result = parser.parse(formula);
      var deps = instance.matrix.getDependencies(cellId);

      if (deps.indexOf(cellId) !== -1) {
        result = null;
        deps.forEach(function (id) {
          instance.matrix.getCell(id).setError(Errors.get('REF'));
          instance.matrix.getCell(id).setValue(null);
        });
        throw Error('REF');
      }
    } catch (ex) {
      var message = Errors.get(ex.message);
      if (message) {
        error = message;
      } else {
        error = Errors.get('ERROR');
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
  var setCell = function (id: string, value: string) {
    instance.matrix.setCell(id, value.toString());
  };

  /**
   * Get a cell by A1-format cell ID, if it exists in the Sheet. If not return null.
   * @param id to lookup the cell
   * @returns {Cell} cell found, or null.
   */
  var getCell = function (id: string) : Cell {
    var cell = instance.matrix.getCell(id);
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
    for (var y = 0; y < input.length; y++) {
      for (var x = 0; x < input[0].length; x++) {
        // set the cell here
        var id = utils.XYtoA1(x, y);
        this.setCell(id, input[y][x].toString());
      }
    }
  };

  /**
   * Render this Sheet as a string in which each row is a cell.
   * @returns {string}
   */
  this.toString = function () {
    var toReturn = "";
    for (var key in this.matrix.data) {
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
  Sheet
}