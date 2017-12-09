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
  // TODO: Need boolean parsing rule, but needs to be listed after formula parsing rule.
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
  CALL_FUNCTION = 22,
  FIXED_CELL_VAL = 23,
  FIXED_CELL_RANGE_VAL = 24,
  CELL_VALUE = 25,
  CELL_RANGE_VALUE = 26,
  PERCENT = 27,
  START_ARRAY = 28,
  INVERT_NUMBER = 29,
  EXPRESSION = 30
};

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

const enum Tree {
  START = 0,
  VARIABLE = 4,
  ERROR = 5,
  FORMULA = 6,
  PLUS = 7,
  MINUS = 8,
  ASTERISK = 9,
  SLASH = 10,
  CARROT = 11,
  AMPERSAND = 12,
  PERCENT = 13,
  LESS_THAN = 15,
  GREATER_THAN = 16,
  EQUALS = 17,
  COMMA = 18,
  OPEN_PAREN = 19,
  CLOSE_PAREN = 20,
  CELL_REF = 21,
  FIXED_CELL_REF = 22,
  CELL_RANGE_REF = 23,
  FIXED_CELL_RANGE_REF = 24,
  // OPEN_ARRAY = 25,
  // CLOSE_ARRAY = 26,
  INVERT_NEXT = 27,
  EXPRESSION = 28,
  TERMINATE = 29
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
productions[ReduceActions.CALL_VARIABLE] = new ReductionPair(Tree.VARIABLE, 1);
productions[ReduceActions.AS_NUMBER] = new ReductionPair(Tree.VARIABLE, 1);
productions[ReduceActions.INVERT_NUMBER] = new ReductionPair(Tree.VARIABLE, 1);
productions[ReduceActions.AS_STRING] = new ReductionPair(Tree.VARIABLE, 1);
productions[ReduceActions.AMPERSAND] = new ReductionPair(Tree.AMPERSAND, 3);
productions[ReduceActions.EQUALS] = new ReductionPair(Tree.EQUALS, 3);
productions[ReduceActions.PLUS] = new ReductionPair(Tree.PLUS, 3);
productions[ReduceActions.LAST_NUMBER] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.LTE] = new ReductionPair(Tree.VARIABLE, 4);
productions[ReduceActions.GTE] = new ReductionPair(Tree.VARIABLE, 4);
productions[ReduceActions.NOT_EQ] = new ReductionPair(Tree.VARIABLE, 4);
productions[ReduceActions.GT] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.LT] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.MINUS] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.MULTIPLY] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.DIVIDE] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.TO_POWER] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.TO_NUMBER_NAN_AS_ZERO] = new ReductionPair(Tree.VARIABLE, 2);
productions[ReduceActions.FIXED_CELL_VAL] = new ReductionPair(Tree.VARIABLE, 1);
productions[ReduceActions.FIXED_CELL_RANGE_VAL] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.CELL_VALUE] = new ReductionPair(Tree.VARIABLE, 1);
productions[ReduceActions.CELL_RANGE_VALUE] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.PERCENT] = new ReductionPair(Tree.VARIABLE, 3);
productions[ReduceActions.AS_ERROR] = new ReductionPair(Tree.ERROR, 1);
const PRODUCTIONS = productions;


/**
 * Array of to map rules to to LexActions and other rules. A single index in the object (e.g. `{2: 13}`) indicates the
 * rule object to follow for the next token, while an array (e.g. `{23: [1, ReduceActions.LTE]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
let table = [];
// All functions in the spreadsheet start with a 0-token.
// `=`
table[Tree.START] = ObjectBuilder
  .add(Symbol.VARIABLE, Tree.VARIABLE)
  .add(Symbol.CELL_REF, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.FIXED_CELL_REF, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.OPEN_ARRAY, null) // Start array, push until done? Come back to this one.
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.PLUS, [SHIFT, ReduceActions.AS_NUMBER]) // If we're starting out, the operator is just the regular number.
  .add(Symbol.MINUS, [SHIFT, ReduceActions.INVERT_NUMBER]) // If we're starting out, the operator is inverting the next number
  .add(Symbol.WHITE_SPACE, Tree.START) // loop back.
  .add(Symbol.END, Tree.TERMINATE)
  .build();
table[Tree.VARIABLE] = ObjectBuilder
  .add(Symbol.PLUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.AS_NUMBER]) // maybe
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.DIVIDE]) // At this point in processing we have "X /" but we need the second variable
  .add(Symbol.CARROT, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.PERCENT, [REDUCE, ReduceActions.PERCENT])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.GREATER_THAN, Tree.GREATER_THAN) // X>__
  .add(Symbol.LESS_THAN, Tree.LESS_THAN) // X>__
  .add(Symbol.EQUALS, Tree.EQUALS) // X=__
  .add(Symbol.COMMA, Tree.COMMA)
  .add(Symbol.CLOSE_PAREN, Tree.CLOSE_PAREN)
  .add(Symbol.WHITE_SPACE, Tree.VARIABLE)
  .add(Symbol.END, Tree.TERMINATE)
  .build();
// TODO: While almost anything can follow an error, we should really just throw the error, right?
table[Tree.ERROR] = ObjectBuilder
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
table[Tree.FORMULA] = ObjectBuilder
  .add(Symbol.VARIABLE, Tree.VARIABLE)
  .add(Symbol.FORMULA, Tree.FORMULA)
  .add(Symbol.CELL_REF, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.FIXED_CELL_REF, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.ERROR, null)
  .add(Symbol.PLUS, null)
  .add(Symbol.MINUS, null)
  .add(Symbol.CLOSE_PAREN, [REDUCE, ReduceActions.CALL_FUNCTION])
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .add(Symbol.END, null)
  .build();
table[Tree.PLUS] = ObjectBuilder
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
table[Tree.MINUS] = ObjectBuilder
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
table[Tree.ASTERISK] = ObjectBuilder
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
table[Tree.SLASH] = ObjectBuilder
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
table[Tree.CARROT] = ObjectBuilder
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
table[Tree.AMPERSAND] = ObjectBuilder
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
table[Tree.PERCENT] = ObjectBuilder
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
  .build();;
table[Tree.LESS_THAN] = ObjectBuilder
  .add(Symbol.VARIABLE, null)
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
table[Tree.GREATER_THAN] = ObjectBuilder
  .add(Symbol.VARIABLE, Tree.VARIABLE)
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
table[Tree.EQUALS] = ObjectBuilder
  .add(Symbol.VARIABLE, Tree.VARIABLE)
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
table[Tree.COMMA] = ObjectBuilder
  .add(Symbol.VARIABLE, Tree.VARIABLE)
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
table[Tree.OPEN_PAREN] = ObjectBuilder
  .add(Symbol.VARIABLE, Tree.VARIABLE)
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
table[Tree.CLOSE_PAREN] = ObjectBuilder
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
table[Tree.CELL_REF] = ObjectBuilder
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
table[Tree.FIXED_CELL_REF] = ObjectBuilder
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
table[Tree.CELL_RANGE_REF] = ObjectBuilder
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
table[Tree.FIXED_CELL_RANGE_REF] = ObjectBuilder
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
table[Tree.EXPRESSION] = null;
table[Tree.INVERT_NEXT] = null;


table[Tree.TERMINATE] = undefined; // Terminate the end.