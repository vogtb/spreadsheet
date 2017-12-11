import {
  Parser
} from "../../src/Parser/Parser";
import {TypeConverter} from "../../src/Utilities/TypeConverter";
import {
  DIV_ZERO_ERROR, DivZeroError, NA_ERROR, NameError, NULL_ERROR, NUM_ERROR, PARSE_ERROR,
  REF_ERROR, VALUE_ERROR
} from "../../src/Errors";
import {Formulas} from "../../src/Formulas";
import {assertEquals, catchAndAssertEquals, test} from "../Utils/Asserts";


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
        let result = 0;
        for (let i = 0; i < args.length; i++) {
          result = result + args[i];
        }
        return result;
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

test("Number multiplication", function () {
  assertEquals(parser.parse('5*5'), 25);
});



test("Parse but throw parse error", function(){
  // assertEquals(parser.parse('=10e'), PARSE_ERROR);
  // assertEquals(parser.parse('= SUM('), PARSE_ERROR);
});

test("Parse & operator", function(){
  assertEquals(parser.parse('"hey"&" "&"there"'), "hey there");
});

test("Parse * operator", function(){
  assertEquals(parser.parse('10 * 10'), 100);
  assertEquals(parser.parse('10 * 0'), 0);
  assertEquals(parser.parse('1 * 1'), 1);
});

test("Parse / operator", function(){
  assertEquals(parser.parse('10 / 2'), 5);
  assertEquals(parser.parse('10 / 1'), 10);
  assertEquals(parser.parse('1 / 1'), 1);
  assertEquals(parser.parse('0 / 1'), 0);
  assertEquals(parser.parse('"1" / 1'), 1);
  assertEquals(parser.parse('"500" / 1'), 500);
  catchAndAssertEquals(function () {
    parser.parse(' 10 / 0');
  }, DIV_ZERO_ERROR);
  catchAndAssertEquals(function () {
    parser.parse('0 / 0')
  }, DIV_ZERO_ERROR);
  // assertEquals(parser.parse('P9 / 1'), 0);
});

test("Parse ^ operator", function(){
  assertEquals(parser.parse('10 ^ 10'), 10000000000);
  assertEquals(parser.parse('10 ^ 0'), 1);
  assertEquals(parser.parse('1 ^ 1'), 1);
  assertEquals(parser.parse('2 ^ 10'), 1024);
});

test("Parse comparison operators on numbers", function(){
  assertEquals(parser.parse('1 = 1'), true);
  assertEquals(parser.parse('1 = 0'), false);
  assertEquals(parser.parse('1 < 2'), true);
  assertEquals(parser.parse('1 < 0'), false);
  assertEquals(parser.parse('1 < 1'), false);
  assertEquals(parser.parse('1 <= 0'), false);
  assertEquals(parser.parse('1 <= 1'), true);
  assertEquals(parser.parse('1 <= 2'), true);
  assertEquals(parser.parse('1 >= 1'), true);
  assertEquals(parser.parse('2 >= 1'), true);
  assertEquals(parser.parse('1 >= 0'), true);
  assertEquals(parser.parse('1 >= 2'), false);
  assertEquals(parser.parse('1 <> 1'), false);
  assertEquals(parser.parse('1 <> 2'), true);
});

test("Parse comparison operators on strings", function(){
  assertEquals(parser.parse('"abc" = "abc"'), true);
  assertEquals(parser.parse('"abc" = "xyz"'), false);
  assertEquals(parser.parse('"abc" < "abc"'), false);
  assertEquals(parser.parse('"abc" < "xyz"'), true);
  assertEquals(parser.parse('"abc" <= "abc"'), true);
  assertEquals(parser.parse('"abc" <= "xyz"'), true);
  assertEquals(parser.parse('"xyz" <= "abc"'), false);
  assertEquals(parser.parse('"abc" >= "abc"'), true);
  assertEquals(parser.parse('"abc" >= "zyx"'), false);
  assertEquals(parser.parse('"xyz" >= "abc"'), true);
  assertEquals(parser.parse('"abc" <> "abc"'), false);
  assertEquals(parser.parse('"abc" <> "zyz"'), true);
});

test("Parse comparison operators on boolean", function(){
  assertEquals(parser.parse('TRUE = TRUE'), true);
  assertEquals(parser.parse('TRUE = FALSE'), false);
  assertEquals(parser.parse('FALSE = FALSE'), true);
  assertEquals(parser.parse('TRUE > TRUE'), false);
  assertEquals(parser.parse('TRUE > FALSE'), true);
  assertEquals(parser.parse('FALSE > FALSE'), false);
  assertEquals(parser.parse('TRUE <= TRUE'), true);
  assertEquals(parser.parse('TRUE <= FALSE'), false);
  assertEquals(parser.parse('FALSE <= TRUE'), true);
  assertEquals(parser.parse('TRUE >= TRUE'), true);
  assertEquals(parser.parse('TRUE >= FALSE'), true);
  assertEquals(parser.parse('FALSE >= TRUE'), false);
  assertEquals(parser.parse('TRUE <> TRUE'), false);
  assertEquals(parser.parse('FALSE <> FALSE'), false);
  assertEquals(parser.parse('TRUE <> FALSE'), true);
  assertEquals(parser.parse('FALSE <> TRUE'), true);
});

test("Parse operators, order of operations", function(){
  assertEquals(parser.parse('10 + -10'), 0);
  assertEquals(parser.parse('10 + -10 = 0'), true);
  assertEquals(parser.parse('10 + -10 = 0 & "str"'), false);
  assertEquals(parser.parse('-10%'), -0.1);
  assertEquals(parser.parse('10 + 10%'), 10.1);
  assertEquals(parser.parse('-10 + 10%'), -9.9);
  assertEquals(parser.parse('-10 - +10%'), -10.1);
  assertEquals(parser.parse('2^-10 + 10%'), 0.1009765625);
  assertEquals(parser.parse('4 * 5 / 2'), 10);
  assertEquals(parser.parse('4 / 5 * 4'), 3.2);
  assertEquals(parser.parse('2^2*5'), 20);
  assertEquals(parser.parse('2^(2*5)'), 1024);
});

test("Parse and throw error literal", function () {
  // these pass, but strangely so.
  // assertEquals(parser.parse('#N/A'), NA_ERROR);
  // assertEquals(parser.parse('#NUM!'), NUM_ERROR);
  // assertEquals(parser.parse('#REF!'), REF_ERROR);
  // assertEquals(parser.parse('#NULL!'), NULL_ERROR);
  // assertEquals(parser.parse('#ERROR'), PARSE_ERROR);
  // assertEquals(parser.parse('#DIV/0!'), DIV_ZERO_ERROR);
  // assertEquals(parser.parse('#VALUE!'), VALUE_ERROR);
  // assertEquals(parser.parse('ISERROR(#N/A)'), true);
  // assertEquals(parser.parse('=ISERROR(#NUM!)'), true);
  // assertEquals(parser.parse('=ISERROR(#REF!)'), true);
  // assertEquals(parser.parse('=ISERROR(#NULL!)'), true);
  // assertEquals(parser.parse('=ISERROR(#ERROR)'), true);
  // assertEquals(parser.parse('=ISERROR(#DIV/0!)'), true);
  // assertEquals(parser.parse('=ISERROR(#VALUE!)'), true);
  // assertEquals(parser.parse('=IFERROR(#N/A, 10)'), 10);
  // assertEquals(parser.parse('=IFERROR(#NUM!, 10)'), 10);
  // assertEquals(parser.parse('=IFERROR(#REF!, 10)'), 10);
  // assertEquals(parser.parse('=IFERROR(#NULL!, 10)'), 10);
  // assertEquals(parser.parse('=IFERROR(#ERROR, 10)'), 10);
  // assertEquals(parser.parse('=IFERROR(#DIV/0!, 10)'), 10);
  // assertEquals(parser.parse('=IFERROR(#VALUE!, 10)'), 10);
});

test("Parse plain numbers", function() {
  assertEquals(parser.parse('10'), 10);
  // assertEquals('=.1', 0.1); // TODO: Fails from parse error, but should pass
  // assertEquals(parser.parse('0.1'), 0.1); // TODO: Can't coerce to number?
  assertEquals(parser.parse('+1'), 1);
  assertEquals(parser.parse('-1'), -1);
  assertEquals(parser.parse('++1'), 1);
  assertEquals(parser.parse('--1'), 1);
  assertEquals(parser.parse('10e1'), 100);
  assertEquals(parser.parse('0e1'), 0);
  // assertEquals('=0.e1', 0); // TODO: Fails from parse error, but should pass
  assertEquals(parser.parse('-10e1'), -100);
  assertEquals(parser.parse('+10e1'), 100);
  assertEquals(parser.parse('++10e1'), 100);
  assertEquals(parser.parse('--10e1'), 100);
});

test("Parse complex numbers and math", function(){
  assertEquals(parser.parse('"10" + 10'), 20);
  assertEquals(parser.parse('"10.111111" + 0'), 10.111111);
  assertEquals(parser.parse('10%'), 0.1);
  assertEquals(parser.parse('10% + 1'), 1.1);
  assertEquals(parser.parse('"10e1" + 0'), 100);
  assertEquals(parser.parse('10e1'), 100);
  assertEquals(parser.parse('10e-1'), 1);
  assertEquals(parser.parse('10e+1'), 100);
  assertEquals(parser.parse('10E1'), 100);
  assertEquals(parser.parse('10E-1'), 1);
  assertEquals(parser.parse('10E+1'), 100);
  assertEquals(parser.parse('"1,000,000"  + 0'), 1000000);
  assertEquals(parser.parse('"+$10.00" + 0'), 10);
  assertEquals(parser.parse('"-$10.00" + 0'), -10);
  assertEquals(parser.parse('"$+10.00" + 0'), 10);
  assertEquals(parser.parse('"$-10.00" + 0'), -10);
  assertEquals(parser.parse('"10" + 10'), 20);
  assertEquals(parser.parse('"10.111111" + 0'), 10.111111);
  assertEquals(parser.parse('10%'), 0.1);
  assertEquals(parser.parse('10% + 1'), 1.1);
  assertEquals(parser.parse('"10e1" + 0'), 100);
  assertEquals(parser.parse('10e1'), 100);
  assertEquals(parser.parse('10e-1'), 1);
  assertEquals(parser.parse('10e+1'), 100);
  assertEquals(parser.parse('10E1'), 100);
  assertEquals(parser.parse('10E-1'), 1);
  assertEquals(parser.parse('10E+1'), 100);
  assertEquals(parser.parse('"1,000,000"  + 0'), 1000000);
  catchAndAssertEquals(function () {
    parser.parse('"10e" + 10');
  }, VALUE_ERROR);
  assertEquals(parser.parse('"+$10.00" + 0'), 10);
  assertEquals(parser.parse('"-$10.00" + 0'), -10);
  assertEquals(parser.parse('"$+10.00" + 0'), 10);
  assertEquals(parser.parse('"$-10.00" + 0'), -10);
});

test("Parse strings", function(){
  assertEquals(parser.parse('"str"'), "str");
  assertEquals(parser.parse('"str"&"str"'), "strstr");
  catchAndAssertEquals(function () {
    parser.parse('"str"+"str"');
  }, VALUE_ERROR);
  // assertEquals("='str'", PARSE_ERROR); // TODO: Parses, but it shouldn't.
});

test("Parse boolean literals", function(){
  assertEquals(parser.parse('TRUE'), true);
  assertEquals(parser.parse('true'), true);
  assertEquals(parser.parse('FALSE'), false);
  assertEquals(parser.parse('false'), false);
});

test("Parse boolean logic", function(){
  // assertEquals('=(1=1)', true); // TODO: Fails because we compute the value, rather than checking equality
  // assertEquals('=(1=2)', false); // TODO: Fails because we compute the value, rather than checking equality
  assertEquals(parser.parse('(1=1)+2'), 3);

});


test("Parse range literal", function(){
  // assertEqualsArray('=[1, 2, 3]', [1, 2, 3]); // TODO: Fails because of low-level parser error
  // assertEqualsArray('=[]', []); // TODO: Fails because of low-level parser error
  // assertEqualsArray('=["str", "str"]', ["str", "str"]); // TODO: Fails because of low-level parser error
  // assertEqualsArray('=["str", [1, 2, 3], [1]]', ["str", [1, 2, 3], [1]]); // TODO: Fails because of low-level parser error
});


test("Parse range following comma", function(){
  // assertEquals('=SERIESSUM(1, 0, 1, [4, 5, 6])', 15);
  // assertEquals('=SERIESSUM([1], [0], [1], [4, 5, 6])', 15);
});





assertEquals(parser.parse('"one" = "one"'), true);
