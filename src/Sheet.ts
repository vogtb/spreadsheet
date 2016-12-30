/// <reference path="parser.d.ts"/>
import { Parser } from "./Parser";
import { A1CellKey } from "./A1CellKey"
import { Cell } from "./Cell"
import { Errors } from "./Errors"
import * as Formula from "formulajs"

var Sheet = (function () {
  var instance = this;

  // Will be overwritten, but needs to be initialized, and have some functions for tsc compilation.
  var parser = {
    setObj: function (obj: string) {},
    parse: function (formula: string) {}
  };

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

  class Matrix {
    public data: Object;
    constructor() {
      this.data = {};
    }
    getItem(key: A1CellKey) {
      return this.data[key.toString()];
    }
    addItem(cell: Cell) {
      var cellId = cell.id;
      var key = new A1CellKey(cellId);

      if (!(cellId in this.data)) {
        this.data[cellId] = cell;
      } else {
        this.getItem(key).updateDependencies(cell.dependencies);
        this.getItem(key).setValue(cell.value);
        this.getItem(key).setError(cell.error);
      }

      return this.getItem(new A1CellKey(cellId));
    }
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

              var item = this.getItem(new A1CellKey(refId));
              if (item.dependencies.length) {
                getTotalDependencies(refId);
              }
            }
          }.bind(this));
        }
      }.bind(this);
      getTotalDependencies(id);
      return allDependencies;
    }
    getCellDependencies(cell: Cell) {
      return this.getDependencies(cell.id);
    }
    setCell(cellKeyString: string, formula: string) {
      var cell = new Cell(formula, cellKeyString);
      registerCellInMatrix(cell);
      recalculateCellDependencies(cell);
    }
  }


  var recalculateCellDependencies = function (cell: Cell) {
    var allDependencies = instance.matrix.getCellDependencies(cell);

    allDependencies.forEach(function (refId) {
      var currentCell = instance.matrix.getItem(new A1CellKey(refId));
      if (currentCell && currentCell.formula) {
        calculateCellFormula(currentCell);
      }
    });
  };

  var calculateCellFormula = function (cell: Cell) {
    // to avoid double translate formulas, update item data in parser
    var parsed = parse(cell.formula, cell.id);
    var key =  new A1CellKey(cell.id);

    instance.matrix.getItem(key).setValue(parsed.result);
    instance.matrix.getItem(key).setError(parsed.error);

    return parsed;
  };

  var registerCellInMatrix = function (cell: Cell) {
    instance.matrix.addItem(cell);
    calculateCellFormula(cell);
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
    SUPPORTED_FORMULAS: [
      'ABS', 'ACCRINT', 'ACOS', 'ACOSH', 'ACOTH', 'AND', 'ARABIC', 'ASIN', 'ASINH', 'ATAN', 'ATAN2', 'ATANH', 'AVEDEV', 'AVERAGE', 'AVERAGEA', 'AVERAGEIF',
      'BASE', 'BESSELI', 'BESSELJ', 'BESSELK', 'BESSELY', 'BETADIST', 'BETAINV', 'BIN2DEC', 'BIN2HEX', 'BIN2OCT', 'BINOMDIST', 'BINOMDISTRANGE', 'BINOMINV', 'BITAND', 'BITLSHIFT', 'BITOR', 'BITRSHIFT', 'BITXOR',
      'CEILING', 'CEILINGMATH', 'CEILINGPRECISE', 'CHAR', 'CHISQDIST', 'CHISQINV', 'CODE', 'COMBIN', 'COMBINA', 'COMPLEX', 'CONCATENATE', 'CONFIDENCENORM', 'CONFIDENCET', 'CONVERT', 'CORREL', 'COS', 'COSH', 'COT', 'COTH', 'COUNT', 'COUNTA', 'COUNTBLANK', 'COUNTIF', 'COUNTIFS', 'COUNTIN', 'COUNTUNIQUE', 'COVARIANCEP', 'COVARIANCES', 'CSC', 'CSCH', 'CUMIPMT', 'CUMPRINC',
      'DATE', 'DATEVALUE', 'DAY', 'DAYS', 'DAYS360', 'DB', 'DDB', 'DEC2BIN', 'DEC2HEX', 'DEC2OCT', 'DECIMAL', 'DEGREES', 'DELTA', 'DEVSQ', 'DOLLAR', 'DOLLARDE', 'DOLLARFR',
      'E', 'EDATE', 'EFFECT', 'EOMONTH', 'ERF', 'ERFC', 'EVEN', 'EXACT', 'EXPONDIST',
      'FALSE', 'FDIST', 'FINV', 'FISHER', 'FISHERINV',
      'IF', 'INT', 'ISEVEN', 'ISODD',
      'LN', 'LOG', 'LOG10',
      'MAX', 'MAXA', 'MEDIAN', 'MIN', 'MINA', 'MOD',
      'NOT',
      'ODD', 'OR',
      'PI', 'POWER',
      'ROUND', 'ROUNDDOWN', 'ROUNDUP',
      'SIN', 'SINH', 'SPLIT', 'SQRT', 'SQRTPI', 'SUM', 'SUMIF', 'SUMIFS', 'SUMPRODUCT', 'SUMSQ', 'SUMX2MY2', 'SUMX2PY2', 'SUMXMY2',
      'TAN', 'TANH', 'TRUE', 'TRUNC',
      'XOR'
    ],

    number: function (num) {
      switch (typeof num) {
        case 'number':
          return num;
        case 'string':
          if (!isNaN(num)) {
            return num.indexOf('.') > -1 ? parseFloat(num) : parseInt(num, 10);
          }
      }

      return num;
    },

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

      if (instance.helper.SUPPORTED_FORMULAS.indexOf(fn) > -1) {
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

    cellValue: function (cell) {
      var value,
        origin = this,
        item = instance.matrix.getItem(new A1CellKey(cell));

      // get value
      value = item ? item.value : "0"; // TODO: fix this, it's sloppy.
      //update dependencies
      instance.matrix.getItem(new A1CellKey(origin)).updateDependencies([cell]);
      // check references error
      if (item && item.dependencies) {
        if (item.dependencies.indexOf(cell) !== -1) {
          throw Error('REF');
        }
      }

      // check if any error occurs
      if (item && item.error) {
        throw Error(item.error);
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
      // instance.matrix.updateCellItem(new A1CellKey(origin), {deps: cells.index});
      instance.matrix.getItem(new A1CellKey(origin)).updateDependencies([cells.index]);

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

  var parse = function (formula, key) {
    var result = null;
    var error = null;

    try {
      parser.setObj(key);
      result = parser.parse(formula);
      var deps = instance.matrix.getDependencies(key);

      if (deps.indexOf(key) !== -1) {
        result = null;
        deps.forEach(function (id) {
          // instance.matrix.updateItem(id, {value: null, error: Exception.get('REF')});
          instance.matrix.getItem(new A1CellKey(id)).setError(Errors.get('REF'));
          instance.matrix.getItem(new A1CellKey(id)).setValue(null);
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

  var setCell = function (cellKeyString: string, value: string) {
    instance.matrix.setCell(cellKeyString, value);
  };

  this.load = function () {
    var input = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "SUM(A1:D1, H1)"],
      [-1, -10, 2, 4, 100, 1, 50, 20, 200, -100, "MAX(A2:J2)"],
      [-1, -40, -53, 1, 10, 30, 10, 301, -1, -20, "MIN(A3:J3)"],
      [20, 50, 100, 20, 1, 5, 15, 25, 45, 23, "AVERAGE(A4:J4)"],
      [0, 10, 1, 10, 2, 10, 3, 10, 4, 10, "SUMIF(A5:J5,'>5')"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "SUM(K1, K2, K3, K4)"]
    ];
    for (var y = 0; y < input.length; y++) {
      for (var x = 0; x < input[0].length; x++) {
        // set the cell here
        var id = utils.XYtoA1(x, y);
        this.setCell(id, input[y][x].toString());
      }
    }
  };

  this.toString = function () {
    var toReturn = "";
    for (var key in this.matrix.data) {
      toReturn += this.matrix.data[key].id + " " + this.matrix.data[key].formula + " " + this.matrix.data[key].value + "\n";
    }
    return toReturn;
  };

  parser  = FormulaParser(instance);
  instance.matrix = new Matrix();
  this.utils = utils;
  this.helper = helper;
  this.parse = parse;
  this.setCell = setCell;
});

export {
  Sheet
}