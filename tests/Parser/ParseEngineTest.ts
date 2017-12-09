import {
  Parser
} from "../../src/Parser/ParseEngine";
import {TypeConverter} from "../../src/Utilities/TypeConverter";
import {DivZeroError, NameError} from "../../src/Errors";
import {Formulas} from "../../src/Formulas";
import {assertEquals, test} from "../Utils/Asserts";


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
    throw new Error(JSON.stringify({
      name: 'Parser error',
      message: str,
      prop: hash
    }));
  };

  newParser.yy.handler = handler;

  return newParser;
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
          cellValue = helper.cellValue.call(this, cellIndex);

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
    let formulas = {
      "SUM": function(...args) {
        return 10;
      }
    };
    if (fn in formulas) {
      return formulas[fn].apply(this, args);
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

  },

  cellRangeValue: function (start: string, end: string) {

  },

  fixedCellValue: function (id) {
    id = id.replace(/\$/g, '');
    return helper.cellValue.call(this, id);
  },

  fixedCellRangeValue: function (start, end) {
    start = start.replace(/\$/g, '');
    end = end.replace(/\$/g, '');

    return helper.cellRangeValue.call(this, start, end);
  }
};


let parser = FormulaParser({
  helper: helper,
  utils: utils
});
parser.setObj("A1");


test("Declare number", function () {
  assertEquals(parser.parse('5'), 5);
});