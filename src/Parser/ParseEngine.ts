import {
  ObjectBuilder
} from "./ObjectBuilder";

// Rules represent the Regular Expressions that will be used in sequence to match a given input to the Parser.
const Rules = {
  WHITE_SPACE : /^(?:\s+)/,
  DOUBLE_QUOTES : /^(?:"(\\["]|[^"])*")/,
  SINGLE_QUOTES : /^(?:'(\\[']|[^'])*')/,
  FORMULA_NAME : /^(?:[A-Za-z.]{1,}[A-Za-z_0-9]+(?=[(]))/,
  $_A1_CELL : /^(?:\$[A-Za-z]+\$[0-9]+)/,
  A1_CELL : /^(?:[A-Za-z]+[0-9]+)/,
  FORMULA_NAME_SIMPLE : /^(?:[A-Za-z.]+(?=[(]))/,
  VARIABLE : /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/,
  SIMPLE_VARIABLE : /^(?:[A-Za-z_]+)/,
  INTEGER : /^(?:[0-9]+(?:(?:[eE])(?:[\+-])?[0-9]+)?)/,
  OPEN_ARRAY:  /^(?:\[)/,
  CLOSE_ARRAY:  /^(?:\])/,
  DOLLAR_SIGN : /^(?:\$)/,
  AMPERSAND_SIGN : /^(?:&)/,
  SINGLE_WHITESPACE : /^(?: )/,
  PERIOD : /^(?:[.])/,
  COLON : /^(?::)/,
  SEMI_COLON : /^(?:;)/,
  COMMA : /^(?:,)/,
  ASTERISK : /^(?:\*)/,
  FORWARD_SLASH : /^(?:\/)/,
  MINUS_SIGN : /^(?:-)/,
  PLUS_SIGN : /^(?:\+)/,
  CARET_SIGN : /^(?:\^)/,
  OPEN_PAREN : /^(?:\()/,
  CLOSE_PAREN : /^(?:\))/,
  GREATER_THAN_SIGN : /^(?:>)/,
  LESS_THAN_SIGN : /^(?:<)/,
  DOUBLE_QUOTE : /^(?:")/,
  SINGLE_QUITE : /^(?:')/,
  EXCLAMATION_POINT : /^(?:!)/,
  EQUALS_SIGN : /^(?:=)/,
  PERCENT_SIGN : /^(?:%)/,
  POUND:  /^(?:\#)/,
  ERROR : /^(?:#N\/A|#NUM\!|#NULL\!|#DIV\/0\!|#VALUE\!|#REF\!|#ERROR)/,
  END : /^(?:$)/
};


// Sequential rules to use when parsing a given input.
const RulesSeq = [
  Rules.WHITE_SPACE,
  Rules.DOUBLE_QUOTES,
  Rules.SINGLE_QUOTES,
  Rules.FORMULA_NAME,
  Rules.$_A1_CELL,
  Rules.A1_CELL,
  Rules.FORMULA_NAME_SIMPLE,
  Rules.VARIABLE,
  Rules.SIMPLE_VARIABLE,
  Rules.INTEGER,
  Rules.OPEN_ARRAY,
  Rules.CLOSE_ARRAY,
  Rules.DOLLAR_SIGN,
  Rules.AMPERSAND_SIGN,
  Rules.SINGLE_WHITESPACE,
  Rules.PERIOD,
  Rules.COLON,
  Rules.SEMI_COLON,
  Rules.COMMA,
  Rules.ASTERISK,
  Rules.FORWARD_SLASH,
  Rules.MINUS_SIGN,
  Rules.PLUS_SIGN,
  Rules.CARET_SIGN,
  Rules.OPEN_PAREN,
  Rules.CLOSE_PAREN,
  Rules.GREATER_THAN_SIGN,
  Rules.LESS_THAN_SIGN,
  Rules.DOUBLE_QUOTE,
  Rules.SINGLE_QUITE,
  Rules.EXCLAMATION_POINT,
  Rules.EQUALS_SIGN,
  Rules.PERCENT_SIGN,
  Rules.POUND,
  Rules.ERROR,
  Rules.END
];


enum Symbol {
  ACCEPT = 0,
  END = 1,
  ERROR = 2,
  EXPRESSIONS = 3,
  EXPRESSION = 4,
  EOF = 5,
  VARIABLE = 6,
  VARIABLE_SEQUENCE = 7,
  NUMBER = 8,
  STRING = 9,
  FORMULA = 10,
  BOOLEAN = 11,
  CELL_REF = 12,
  FIXED_CELL_REF = 13,
  CELL = 14,
  OPEN_ARRAY = 15,
  CLOSE_ARRAY = 16,
  PERIOD = 17,
  AMPERSAND = 18,
  EQUALS = 19,
  PLUS = 20,
  OPEN_PAREN = 21,
  CLOSE_PAREN = 22,
  LESS_THAN = 23,
  GREATER_THAN = 24,
  MINUS = 25,
  ASTERISK = 26,
  DIVIDE = 27,
  CARROT = 28,
  COLON = 29,
  SEMI_COLON = 30,
  COMMA = 31,
  PERCENT = 32,
  POUND = 33,
  EXCLAMATION_POINT = 34,
  WHITE_SPACE = 35
}

const SYMBOL_NAME_TO_INDEX = {
  "ACCEPT": Symbol.ACCEPT,
  "END": Symbol.END,
  "ERROR": Symbol.ERROR,
  "EXPRESSIONS": Symbol.EXPRESSIONS,
  "EXPRESSION": Symbol.EXPRESSION,
  "EOF": Symbol.EOF,
  "VARIABLE": Symbol.VARIABLE,
  "VARIABLE_SEQUENCE": Symbol.VARIABLE_SEQUENCE,
  "NUMBER": Symbol.NUMBER,
  "STRING": Symbol.STRING,
  "FORMULA": Symbol.FORMULA,
  "CELL_REF": Symbol.CELL_REF,
  "FIXED_CELL_REF": Symbol.FIXED_CELL_REF,
  "CELL": Symbol.CELL,
  "OPEN_ARRAY": Symbol.OPEN_ARRAY,
  "CLOSE_ARRAY": Symbol.CLOSE_ARRAY,
  "PERIOD": Symbol.PERIOD,
  "&": Symbol.AMPERSAND,
  "=": Symbol.EQUALS,
  "+": Symbol.PLUS,
  "(": Symbol.OPEN_PAREN,
  ")": Symbol.CLOSE_PAREN,
  "<": Symbol.LESS_THAN,
  ">": Symbol.GREATER_THAN,
  "-": Symbol.MINUS,
  "*": Symbol.ASTERISK,
  "/": Symbol.DIVIDE,
  "^": Symbol.CARROT,
  ":": Symbol.COLON,
  ";": Symbol.SEMI_COLON,
  ",": Symbol.COMMA,
  "%": Symbol.PERCENT,
  "#": Symbol.POUND,
  "!": Symbol.EXCLAMATION_POINT,
  "WHITE_SPACE": Symbol.WHITE_SPACE
};



/**
 * Actions to take when processing tokens one by one. We're always either taking the next token, reducing our current
 * tokens, or accepting and returning.
 */
const SHIFT = 1;
const REDUCE = 2;
const ACCEPT = 3;

const enum ReduceActions {
  NO_ACTION = 0,
  RETURN_LAST = 1,
  CALL_VARIABLE = 2,
  AS_NUMBER = 3,
  AS_STRING = 4,
  AMPERSAND = 5,
  EQUALS = 6,
  PLUS = 7,
  LAST_NUMBER = 8,
  LTE = 9,
  GTE = 10,
  NOT_EQ = 11,
  NOT = 12,
  GT = 13,
  LT = 14,
  MINUS = 15,
  MULTIPLY = 16,
  DIVIDE = 17,
  TO_POWER = 18,
  AS_ERROR = 19,
  TO_NUMBER_NAN_AS_ZERO = 20,
  CALL_FUNCTION_LAST_BLANK = 21,
  FIXED_CELL_VAL = 22,
  FIXED_CELL_RANGE_VAL = 23,
  CELL_VALUE = 24,
  CELL_RANGE_VALUE = 25,
  PERCENT = 26
}

/**
 * Represents the length to reduce the stack by, and the token index value that will replace those tokens in the stack.
 */
class ReductionPair {
  private lengthToReduceStackBy : number;
  private replacementTokenIndex : number;
  constructor(replacementTokenIndex : number, length : number) {
    this.lengthToReduceStackBy = length;
    this.replacementTokenIndex = replacementTokenIndex;
  }

  /**
   * Get the number representing the length to reduce the stack by.
   * @returns {number}
   */
  getLengthToReduceStackBy() : number {
    return this.lengthToReduceStackBy;
  }

  /**
   * Get the replacement token index.
   * @returns {number}
   */
  getReplacementTokenIndex() : number {
    return this.replacementTokenIndex;
  }
}

/**
 * Productions is used to look up both the number to use when reducing the stack (productions[x][1]) and the semantic
 * value that will replace the tokens in the stack (productions[x][0]).
 * @type {Array<ReductionPair>}
 *
 * Maps a ProductionRule to the appropriate number of previous tokens to use in a reduction action.
 */
let productions : Array<ReductionPair> = [];
productions[ReduceActions.NO_ACTION] = null;
productions[ReduceActions.RETURN_LAST] = new ReductionPair(3, 2);
productions[ReduceActions.CALL_VARIABLE] = new ReductionPair(4, 1);
productions[ReduceActions.AS_NUMBER] = new ReductionPair(4, 1);
productions[ReduceActions.AS_STRING] = new ReductionPair(4, 1);
productions[ReduceActions.AMPERSAND] = new ReductionPair(4, 3);
productions[ReduceActions.EQUALS] = new ReductionPair(4, 3);
productions[ReduceActions.PLUS] = new ReductionPair(4, 3);
productions[ReduceActions.LAST_NUMBER] = new ReductionPair(4, 3);
productions[ReduceActions.LTE] = new ReductionPair(4, 4);
productions[ReduceActions.GTE] = new ReductionPair(4, 4);
productions[ReduceActions.NOT_EQ] = new ReductionPair(4, 4);
productions[ReduceActions.NOT] = new ReductionPair(4, 3);
productions[ReduceActions.GT] = new ReductionPair(4, 3);
productions[ReduceActions.LT] = new ReductionPair(4, 3);
productions[ReduceActions.MINUS] = new ReductionPair(4, 3);
productions[ReduceActions.MULTIPLY] = new ReductionPair(4, 3);
productions[ReduceActions.DIVIDE] = new ReductionPair(4, 3);
productions[ReduceActions.TO_POWER] = new ReductionPair(4, 3);
productions[ReduceActions.TO_NUMBER_NAN_AS_ZERO] = new ReductionPair(4, 2);
productions[ReduceActions.CALL_FUNCTION_LAST_BLANK] = new ReductionPair(4, 3);
productions[ReduceActions.FIXED_CELL_VAL] = new ReductionPair(25, 1);
productions[ReduceActions.FIXED_CELL_RANGE_VAL] = new ReductionPair(25, 3);
productions[ReduceActions.CELL_VALUE] = new ReductionPair(25, 1);
productions[ReduceActions.CELL_RANGE_VALUE] = new ReductionPair(25, 3);
productions[ReduceActions.PERCENT] = new ReductionPair(24, 3);
productions[ReduceActions.AS_ERROR] = new ReductionPair(4, 1);
const PRODUCTIONS = productions;


const enum Tree {
  START = 0,
  FOLLOWS_NUMBER = 1,
  FOLLOWS_STRING = 2,
  FOLLOWS_BOOL = 3,
  FOLLOWS_ERROR = 4,
  FOLLOWS_FORMULA = 5,
  FOLLOWS_PLUS = 6,
  FOLLOWS_MINUS = 7,
  FOLLOWS_ASTERISK = 8,
  FOLLOWS_SLASH = 9,
  FOLLOWS_CARROT = 10,
  FOLLOWS_AMPERSAND = 11,
  FOLLOWS_PERCENT = 12,
  FOLLOWS_PERIOD = 13,
  FOLLOWS_LESS_THAN = 14,
  FOLLOWS_GREATER_THAN = 15,
  FOLLOWS_EQUALS = 16,
  FOLLOWS_COMMA = 17,
  FOLLOWS_OPEN_PAREN = 18,
  FOLLOWS_CLOSE_PAREN = 19,
  FOLLOWS_CELL_REF = 20,
  FOLLOWS_FIXED_CELL_REF = 21,
  FOLLOWS_CELL_RANGE_REF = 22,
  FOLLOWS_FIXED_CELL_RANGE_REF = 23,
  FOLLOWS_OPEN_ARRAY = 24,
  FOLLOWS_CLOSE_ARRAY = 25,
  TERMINATE = 26
}

/**
 * Array of to map rules to to LexActions and other rules. A single index in the object (e.g. `{2: 13}`) indicates the
 * rule object to follow for the next token, while an array (e.g. `{23: [1, ReduceActions.LTE]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
let table = [];
// All functions in the spreadsheet start with a 0-token.
table[Tree.START] = ObjectBuilder
  .add(Symbol.NUMBER, Tree.FOLLOWS_NUMBER)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_NUMBER] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_PAREN, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_STRING] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_PAREN, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_BOOL] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_PAREN, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_ERROR] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_FORMULA] = ObjectBuilder
  .add(Symbol.NUMBER, null)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.PERIOD, null) // TODO: Do we really need period? Why can't we capture this as a number w/ the rule-regex?
  .add(Symbol.ERROR, null)
  .add(Symbol.POUND, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_PLUS] = ObjectBuilder
  .add(Symbol.NUMBER, null)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.FOLLOWS_MINUS] = ObjectBuilder
  .add(Symbol.NUMBER, null)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.FOLLOWS_ASTERISK] = ObjectBuilder
  .add(Symbol.NUMBER, null)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.FOLLOWS_SLASH] = ObjectBuilder
  .add(Symbol.NUMBER, null)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.FOLLOWS_CARROT] = ObjectBuilder
  .add(Symbol.NUMBER, null)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.FOLLOWS_AMPERSAND] = ObjectBuilder
  .add(Symbol.NUMBER, null)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.FOLLOWS_PERCENT] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_PERIOD] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_LESS_THAN] = ObjectBuilder
  .add(Symbol.NUMBER, Tree.FOLLOWS_NUMBER)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.ERROR, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_GREATER_THAN] = ObjectBuilder
  .add(Symbol.NUMBER, Tree.FOLLOWS_NUMBER)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.ERROR, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();;
table[Tree.FOLLOWS_EQUALS] = ObjectBuilder
  .add(Symbol.NUMBER, Tree.FOLLOWS_NUMBER)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.ERROR, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();;
table[Tree.FOLLOWS_COMMA] = ObjectBuilder
  .add(Symbol.NUMBER, Tree.FOLLOWS_NUMBER)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.ERROR, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_OPEN_PAREN] = ObjectBuilder
  .add(Symbol.NUMBER, Tree.FOLLOWS_NUMBER)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.ERROR, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.FOLLOWS_CLOSE_PAREN] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_CELL_REF] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_PAREN, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_FIXED_CELL_REF] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_PAREN, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_CELL_RANGE_REF] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_PAREN, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_FIXED_CELL_RANGE_REF] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.AMPERSAND, null)
  .add(Symbol.GREATER_THAN, null)
  .add(Symbol.LESS_THAN, null)
  .add(Symbol.EQUALS, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_PAREN, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.FOLLOWS_OPEN_ARRAY] = ObjectBuilder
  .add(Symbol.NUMBER, Tree.FOLLOWS_NUMBER)
  .add(Symbol.STRING, null)
  .add(Symbol.BOOLEAN, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.ERROR, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.PERIOD, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.FOLLOWS_CLOSE_ARRAY] = ObjectBuilder
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.ASTERISK, null)
  .add(Symbol.DIVIDE, null)
  .add(Symbol.PERCENT, null)
  .add(Symbol.CARROT, null)
  .add(Symbol.COMMA, null)
  .add(Symbol.CLOSE_PAREN, null)
  .add(Symbol.CLOSE_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();


table[Tree.TERMINATE] = undefined; // Terminate the end.