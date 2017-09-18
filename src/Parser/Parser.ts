import {
  ParseError
} from "../Errors";
import {
  Formulas
} from "../Formulas";

// Rules represent the Regular Expressions that will be used in sequence to match a given input to the Parser.
const WHITE_SPACE_RULE = /^(?:\s+)/; // rule 0
const DOUBLE_QUOTES_RULE = /^(?:"(\\["]|[^"])*")/; // rule 1
const SINGLE_QUOTES_RULE = /^(?:'(\\[']|[^'])*')/; // rule 2
const FORMULA_NAME_RULE = /^(?:[A-Za-z.]{1,}[A-Za-z_0-9]+(?=[(]))/; // Changed from /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+(?=[(]))/ // rule 3
const DATE_RULE = /^(?:([0]?[1-9]|1[0-2])[:][0-5][0-9]([:][0-5][0-9])?[ ]?(AM|am|aM|Am|PM|pm|pM|Pm))/; // rule 4
const TIME_RULE = /^(?:([0]?[0-9]|1[0-9]|2[0-3])[:][0-5][0-9]([:][0-5][0-9])?)/; // rule 5
const $_A1_CELL_RULE = /^(?:\$[A-Za-z]+\$[0-9]+)/; // rule 6
const A1_CELL_RULE = /^(?:[A-Za-z]+[0-9]+)/; // rules 7
const FORMULA_NAME_SIMPLE_RULE = /^(?:[A-Za-z.]+(?=[(]))/; // rule 8
const VARIABLE_RULE = /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/; // rule 9
const SIMPLE_VARIABLE_RILE = /^(?:[A-Za-z_]+)/; //rule 10
const INTEGER_RULE = /^(?:[0-9]+(?:(?:[eE])(?:[\+-])?[0-9]+)?)/; // Changed from /^(?:[0-9]+)/ // rule 11
const OPEN_AND_CLOSE_OF_ARRAY_RULE = /^(?:\[(.*)?\])/; // rule 12
const DOLLAR_SIGN_RULE = /^(?:\$)/; // rule 13
const AMPERSAND_SIGN_RULE = /^(?:&)/; //rule 14
const SINGLE_WHITESPACE_RULE = /^(?: )/; // rule 15
const PERIOD_RULE = /^(?:[.])/; // rule 16
const COLON_RULE = /^(?::)/; //rule 17
const SEMI_COLON_RULE = /^(?:;)/; // rule 18
const COMMA_RULE = /^(?:,)/; // rule 19
const ASTERISK_RULE = /^(?:\*)/; //rule 20
const FORWARD_SLASH_RULE = /^(?:\/)/; // rule 21
const MINUS_SIGN_RULE = /^(?:-)/; // rule 22
const PLUS_SIGN_RULE = /^(?:\+)/; // rule 23
const CARET_SIGN_RULE = /^(?:\^)/; //rule 24
const OPEN_PAREN_RULE = /^(?:\()/; // rule 25
const CLOSE_PAREN_RULE = /^(?:\))/; // rule 26
const GREATER_THAN_SIGN_RULE = /^(?:>)/; // rule 27
const LESS_THAN_SIGN_RULE = /^(?:<)/; // rule 28
const NOT_RULE = /^(?:NOT\b)/; // rule 29
const OPEN_DOUBLE_QUOTE = /^(?:")/; // rule 30
const OPEN_SINGLE_QUITE = /^(?:')/; // rule 31
const EXCLAMATION_POINT_RULE = /^(?:!)/; // rule 32
const EQUALS_SIGN_RULE = /^(?:=)/; // rule 33
const PERCENT_SIGN_RULE = /^(?:%)/; // rule 34
const HASH_SIGN_RULE = /^(?:[#])/; // rule 35
const END_OF_STRING_RULE = /^(?:$)/; // rule 36

// Sequential rules to use when parsing a given input.
const RULES = [
  WHITE_SPACE_RULE,
  DOUBLE_QUOTES_RULE,
  SINGLE_QUOTES_RULE,
  FORMULA_NAME_RULE,
  DATE_RULE,
  TIME_RULE,
  $_A1_CELL_RULE,
  A1_CELL_RULE,
  FORMULA_NAME_SIMPLE_RULE,
  VARIABLE_RULE,
  SIMPLE_VARIABLE_RILE,
  INTEGER_RULE,
  OPEN_AND_CLOSE_OF_ARRAY_RULE,
  DOLLAR_SIGN_RULE,
  AMPERSAND_SIGN_RULE,
  SINGLE_WHITESPACE_RULE,
  PERIOD_RULE,
  COLON_RULE,
  SEMI_COLON_RULE,
  COMMA_RULE,
  ASTERISK_RULE,
  FORWARD_SLASH_RULE,
  MINUS_SIGN_RULE,
  PLUS_SIGN_RULE,
  CARET_SIGN_RULE,
  OPEN_PAREN_RULE,
  CLOSE_PAREN_RULE,
  GREATER_THAN_SIGN_RULE,
  LESS_THAN_SIGN_RULE,
  NOT_RULE,
  OPEN_DOUBLE_QUOTE,
  OPEN_SINGLE_QUITE,
  EXCLAMATION_POINT_RULE,
  EQUALS_SIGN_RULE,
  PERCENT_SIGN_RULE,
  HASH_SIGN_RULE,
  END_OF_STRING_RULE
];

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
  TIME_CALL_TRUE = 3,
  TIME_CALL = 4,
  AS_NUMBER = 5,
  AS_STRING = 6,
  AMPERSAND = 7,
  EQUALS = 8,
  PLUS = 9,
  LAST_NUMBER = 10,
  LTE = 11,
  GTE = 12,
  NOT_EQ = 13,
  NOT = 14,
  GT = 15,
  LT = 16,
  MINUS = 17,
  MULTIPLY = 18,
  DIVIDE = 19,
  TO_POWER = 20,
  INVERT_NUM = 21,
  TO_NUMBER_NAN_AS_ZERO = 22,
  CALL_FUNCTION_LAST_BLANK = 23,
  CALL_FUNCTION_LAST_TWO_IN_STACK = 24,
  I25 = 25,
  I26 = 26,
  I27 = 27,
  FIXED_CELL_VAL = 28,
  FIXED_CELL_RANGE_VAL = 29,
  CELL_VALUE = 30,
  CELL_RANGE_VALUE = 31,
  ENSURE_IS_ARRAY = 32,
  ENSURE_YYTEXT_ARRAY = 33,
  REDUCE_INT = 34,
  REDUCE_PERCENT = 35,
  WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY = 36,
  ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH = 37,
  REFLEXIVE_REDUCE = 38,
  REDUCE_FLOAT = 39,
  REDUCE_PREV_AS_PERCENT = 40,
  REDUCE_LAST_THREE_A = 41,
  REDUCE_LAST_THREE_B = 42
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
productions[ReduceActions.TIME_CALL_TRUE] = new ReductionPair(4, 1);
productions[ReduceActions.TIME_CALL] = new ReductionPair(4, 1);
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
productions[ReduceActions.INVERT_NUM] = new ReductionPair(4, 2);
productions[ReduceActions.TO_NUMBER_NAN_AS_ZERO] = new ReductionPair(4, 2);
productions[ReduceActions.CALL_FUNCTION_LAST_BLANK] = new ReductionPair(4, 3);
productions[ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK] = new ReductionPair(4, 4);
productions[ReduceActions.I25] = new ReductionPair(4, 1);
productions[ReduceActions.I26] = new ReductionPair(4, 1);
productions[ReduceActions.I27] = new ReductionPair(4, 2);
productions[ReduceActions.FIXED_CELL_VAL] = new ReductionPair(25, 1);
productions[ReduceActions.FIXED_CELL_RANGE_VAL] = new ReductionPair(25, 3);
productions[ReduceActions.CELL_VALUE] = new ReductionPair(25, 1);
productions[ReduceActions.CELL_RANGE_VALUE] = new ReductionPair(25, 3);
productions[ReduceActions.ENSURE_IS_ARRAY] = new ReductionPair(24, 1);
productions[ReduceActions.ENSURE_YYTEXT_ARRAY] = new ReductionPair(24, 1);
productions[ReduceActions.REDUCE_INT] = new ReductionPair(24, 3);
productions[ReduceActions.REDUCE_PERCENT] = new ReductionPair(24, 3);
productions[ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY] = new ReductionPair(6, 1);
productions[ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH] = new ReductionPair(6, 3);
productions[ReduceActions.REFLEXIVE_REDUCE] = new ReductionPair(9, 1);
productions[ReduceActions.REDUCE_FLOAT] = new ReductionPair(9, 3);
productions[ReduceActions.REDUCE_PREV_AS_PERCENT] = new ReductionPair(9, 2);
productions[ReduceActions.REDUCE_LAST_THREE_A] = new ReductionPair(2, 3);
productions[ReduceActions.REDUCE_LAST_THREE_B] = new ReductionPair(2, 4);
const PRODUCTIONS = productions;

enum Symbol {
  ACCEPT = 0,
  END = 1,
  ERROR = 2,
  EXPRESSIONS = 3,
  EXPRESSION = 4,
  EOF = 5,
  VARIABLE_SEQUENCE = 6,
  TIME_AMPM = 7,
  TIME_24 = 8,
  NUMBER = 9,
  STRING = 10,
  AMPERSAND = 11,
  EQUALS = 12,
  PLUS = 13,
  LEFT_PAREN = 14,
  RIGHT_PAREN = 15,
  LESS_THAN = 16,
  GREATER_THAN = 17,
  NOT = 18,
  MINUS = 19,
  ASTERISK = 20,
  DIVIDE = 21,
  CARROT = 22,
  FUNCTION = 23,
  EXP_SEQ = 24,
  CELL = 25,
  FIXEDCELL = 26,
  COLON = 27,
  CELL_UPPER = 28,
  ARRAY = 29,
  SEMI_COLON = 30,
  COMMA = 31,
  VARIABLE = 32,
  DECIMAL = 33,
  NUMBER_UPPER = 34,
  PERCENT = 35,
  POUND = 36,
  EXCLAMATION_POINT = 37
}

const SYMBOL_NAME_TO_INDEX = {
  "$accept": Symbol.ACCEPT,
  "$end": Symbol.END,
  "error": Symbol.ERROR,
  "expressions": Symbol.EXPRESSIONS,
  "expression": Symbol.EXPRESSION,
  "EOF": Symbol.EOF,
  "variableSequence": Symbol.VARIABLE_SEQUENCE,
  "TIME_AMPM": Symbol.TIME_AMPM,
  "TIME_24": Symbol.TIME_24,
  "number": Symbol.NUMBER,
  "STRING": Symbol.STRING,
  "&": Symbol.AMPERSAND,
  "=": Symbol.EQUALS,
  "+": Symbol.PLUS,
  "(": Symbol.LEFT_PAREN,
  ")": Symbol.RIGHT_PAREN,
  "<": Symbol.LESS_THAN,
  ">": Symbol.GREATER_THAN,
  "NOT": Symbol.NOT,
  "-": Symbol.MINUS,
  "*": Symbol.ASTERISK,
  "/": Symbol.DIVIDE,
  "^": Symbol.CARROT,
  "FUNCTION": Symbol.FUNCTION,
  "expseq": Symbol.EXP_SEQ,
  "cell": Symbol.CELL,
  "FIXEDCELL": Symbol.FIXEDCELL,
  ":": Symbol.COLON,
  "CELL": Symbol.CELL_UPPER,
  "ARRAY": Symbol.ARRAY,
  ";": Symbol.SEMI_COLON,
  ",": Symbol.COMMA,
  "VARIABLE": Symbol.VARIABLE,
  "DECIMAL": Symbol.DECIMAL,
  "NUMBER": Symbol.NUMBER_UPPER,
  "%": Symbol.PERCENT,
  "#": Symbol.POUND,
  "!": Symbol.EXCLAMATION_POINT
};
let symbolIndexToName = {};
symbolIndexToName[Symbol.EOF] = "EOF";
symbolIndexToName[Symbol.TIME_AMPM] = "TIME_AMPM";
symbolIndexToName[Symbol.TIME_24] = "TIME_24";
symbolIndexToName[Symbol.STRING] = "STRING";
symbolIndexToName[Symbol.AMPERSAND] = "&";
symbolIndexToName[Symbol.EQUALS] = "=";
symbolIndexToName[Symbol.PLUS] = "+";
symbolIndexToName[Symbol.LEFT_PAREN] = "(";
symbolIndexToName[Symbol.RIGHT_PAREN] = ")";
symbolIndexToName[Symbol.LESS_THAN] = "<";
symbolIndexToName[Symbol.GREATER_THAN] = ">";
symbolIndexToName[Symbol.NOT] = "NOTE";
symbolIndexToName[Symbol.MINUS] = "-";
symbolIndexToName[Symbol.ASTERISK] = "*";
symbolIndexToName[Symbol.DIVIDE] = "/";
symbolIndexToName[Symbol.CARROT] = "^";
symbolIndexToName[Symbol.FUNCTION] = "FUNCTION";
symbolIndexToName[Symbol.FIXEDCELL] = "FIXEDCELL";
symbolIndexToName[Symbol.COLON] = ";";
symbolIndexToName[Symbol.COMMA] = ",";
symbolIndexToName[Symbol.VARIABLE] = "VARIABLE";
symbolIndexToName[Symbol.DECIMAL] = "DECIMAL";
symbolIndexToName[Symbol.NUMBER_UPPER] = "NUMBER";
symbolIndexToName[Symbol.PERCENT] = "%";
symbolIndexToName[Symbol.POUND] = "#";
symbolIndexToName[Symbol.EXCLAMATION_POINT] = "!";
const SYMBOL_INDEX_TO_NAME = symbolIndexToName;



class ObjectBuilder {
  public o : Object = {};

  public static add(k, v) : ObjectBuilder {
    let m = new ObjectBuilder();
    m.o[k.toString()] = v;
    return m;
  }
  public add(k, v) : ObjectBuilder {
    this.o[k.toString()] = v;
    return this;
  }
  public build() : Object {
    return this.o;
  }
}

/**
 * Array of to map rules to to LexActions and other rules. A single index in the object (e.g. `{2: 13}`) indicates the
 * rule object to follow for the next token, while an array (e.g. `{23: [1, 11]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
let table = [];
// All functions in the spreadsheet start with a 0-token.
table[0] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSIONS, 1)
  .add(Symbol.EXPRESSION, 2)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[1] = ObjectBuilder
  .add(Symbol.END, [3])
  .build();
table[2] = ObjectBuilder
  .add(Symbol.EOF, [SHIFT, 19])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [SHIFT, 21])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.LESS_THAN, [SHIFT, 23])
  .add(Symbol.GREATER_THAN, [SHIFT, 24])
  .add(Symbol.NOT, [SHIFT, 25])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .build();
table[3] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 2])
  .add(Symbol.AMPERSAND, [REDUCE, 2])
  .add(Symbol.EQUALS, [REDUCE, 2])
  .add(Symbol.PLUS, [REDUCE, 2])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 2])
  .add(Symbol.LESS_THAN, [REDUCE, 2])
  .add(Symbol.GREATER_THAN, [REDUCE, 2])
  .add(Symbol.NOT, [REDUCE, 2])
  .add(Symbol.MINUS, [REDUCE, 2])
  .add(Symbol.ASTERISK, [REDUCE, 2])
  .add(Symbol.DIVIDE, [REDUCE, 2])
  .add(Symbol.CARROT, [REDUCE, 2])
  .add(Symbol.SEMI_COLON, [REDUCE, 2])
  .add(Symbol.COMMA, [REDUCE, 2])
  .add(33, [SHIFT, 30])
  .build();
table[3] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 2])
  .add(Symbol.AMPERSAND, [REDUCE, 2])
  .add(Symbol.EQUALS, [REDUCE, 2])
  .add(Symbol.PLUS, [REDUCE, 2])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 2])
  .add(Symbol.LESS_THAN, [REDUCE, 2])
  .add(Symbol.GREATER_THAN, [REDUCE, 2])
  .add(Symbol.NOT, [REDUCE, 2])
  .add(Symbol.MINUS, [REDUCE, 2])
  .add(Symbol.ASTERISK, [REDUCE, 2])
  .add(Symbol.DIVIDE, [REDUCE, 2])
  .add(Symbol.CARROT, [REDUCE, 2])
  .add(Symbol.SEMI_COLON, [REDUCE, 2])
  .add(Symbol.COMMA, [REDUCE, 2])
  .add(33, [SHIFT, 30])
  .build();
table[4] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 3])
  .add(Symbol.AMPERSAND, [REDUCE, 3])
  .add(Symbol.EQUALS, [REDUCE, 3])
  .add(Symbol.PLUS, [REDUCE, 3])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 3])
  .add(Symbol.LESS_THAN, [REDUCE, 3])
  .add(Symbol.GREATER_THAN, [REDUCE, 3])
  .add(Symbol.NOT, [REDUCE, 3])
  .add(Symbol.MINUS, [REDUCE, 3])
  .add(Symbol.ASTERISK, [REDUCE, 3])
  .add(Symbol.DIVIDE, [REDUCE, 3])
  .add(Symbol.CARROT, [REDUCE, 3])
  .add(Symbol.SEMI_COLON, [REDUCE, 3])
  .add(Symbol.COMMA, [REDUCE, 3])
  .build();
table[5] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 4])
  .add(Symbol.AMPERSAND, [REDUCE, 4])
  .add(Symbol.EQUALS, [REDUCE, 4])
  .add(Symbol.PLUS, [REDUCE, 4])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 4])
  .add(Symbol.LESS_THAN, [REDUCE, 4])
  .add(Symbol.GREATER_THAN, [REDUCE, 4])
  .add(Symbol.NOT, [REDUCE, 4])
  .add(Symbol.MINUS, [REDUCE, 4])
  .add(Symbol.ASTERISK, [REDUCE, 4])
  .add(Symbol.DIVIDE, [REDUCE, 4])
  .add(Symbol.CARROT, [REDUCE, 4])
  .add(Symbol.SEMI_COLON, [REDUCE, 4])
  .add(Symbol.COMMA, [REDUCE, 4])
  .build();
table[6] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 5])
  .add(Symbol.AMPERSAND, [REDUCE, 5])
  .add(Symbol.EQUALS, [REDUCE, 5])
  .add(Symbol.PLUS, [REDUCE, 5])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 5])
  .add(Symbol.LESS_THAN, [REDUCE, 5])
  .add(Symbol.GREATER_THAN, [REDUCE, 5])
  .add(Symbol.NOT, [REDUCE, 5])
  .add(Symbol.MINUS, [REDUCE, 5])
  .add(Symbol.ASTERISK, [REDUCE, 5])
  .add(Symbol.DIVIDE, [REDUCE, 5])
  .add(Symbol.CARROT, [REDUCE, 5])
  .add(Symbol.SEMI_COLON, [REDUCE, 5])
  .add(Symbol.COMMA, [REDUCE, 5])
  .add(Symbol.PERCENT, [SHIFT, 31])
  .build();
table[7] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 6])
  .add(Symbol.AMPERSAND, [REDUCE, 6])
  .add(Symbol.EQUALS, [REDUCE, 6])
  .add(Symbol.PLUS, [REDUCE, 6])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 6])
  .add(Symbol.LESS_THAN, [REDUCE, 6])
  .add(Symbol.GREATER_THAN, [REDUCE, 6])
  .add(Symbol.NOT, [REDUCE, 6])
  .add(Symbol.MINUS, [REDUCE, 6])
  .add(Symbol.ASTERISK, [REDUCE, 6])
  .add(Symbol.DIVIDE, [REDUCE, 6])
  .add(Symbol.CARROT, [REDUCE, 6])
  .add(Symbol.SEMI_COLON, [REDUCE, 6])
  .add(Symbol.COMMA, [REDUCE, 6])
  .build();
table[8] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 32)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[9] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 33)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[10] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 34)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[11] = ObjectBuilder
  .add(Symbol.LEFT_PAREN, [SHIFT, 35])
  .build();
table[12] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 25])
  .add(Symbol.AMPERSAND, [REDUCE, 25])
  .add(Symbol.EQUALS, [REDUCE, 25])
  .add(Symbol.PLUS, [REDUCE, 25])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 25])
  .add(Symbol.LESS_THAN, [REDUCE, 25])
  .add(Symbol.GREATER_THAN, [REDUCE, 25])
  .add(Symbol.NOT, [REDUCE, 25])
  .add(Symbol.MINUS, [REDUCE, 25])
  .add(Symbol.ASTERISK, [REDUCE, 25])
  .add(Symbol.DIVIDE, [REDUCE, 25])
  .add(Symbol.CARROT, [REDUCE, 25])
  .add(Symbol.SEMI_COLON, [REDUCE, 25])
  .add(Symbol.COMMA, [REDUCE, 25])
  .build();
table[13] = ObjectBuilder
  .add(Symbol.ERROR, 36)
  .add(Symbol.EOF, [REDUCE, 26])
  .add(Symbol.AMPERSAND, [REDUCE, 26])
  .add(Symbol.EQUALS, [REDUCE, 26])
  .add(Symbol.PLUS, [REDUCE, 26])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 26])
  .add(Symbol.LESS_THAN, [REDUCE, 26])
  .add(Symbol.GREATER_THAN, [REDUCE, 26])
  .add(Symbol.NOT, [REDUCE, 26])
  .add(Symbol.MINUS, [REDUCE, 26])
  .add(Symbol.ASTERISK, [REDUCE, 26])
  .add(Symbol.DIVIDE, [REDUCE, 26])
  .add(Symbol.CARROT, [REDUCE, 26])
  .add(Symbol.SEMI_COLON, [REDUCE, 26])
  .add(Symbol.COMMA, [REDUCE, 26])
  .add(Symbol.VARIABLE, [SHIFT, 37])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[14] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 36])
  .add(Symbol.AMPERSAND, [REDUCE, 36])
  .add(Symbol.EQUALS, [REDUCE, 36])
  .add(Symbol.PLUS, [REDUCE, 36])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 36])
  .add(Symbol.LESS_THAN, [REDUCE, 36])
  .add(Symbol.GREATER_THAN, [REDUCE, 36])
  .add(Symbol.NOT, [REDUCE, 36])
  .add(Symbol.MINUS, [REDUCE, 36])
  .add(Symbol.ASTERISK, [REDUCE, 36])
  .add(Symbol.DIVIDE, [REDUCE, 36])
  .add(Symbol.CARROT, [REDUCE, 36])
  .add(Symbol.SEMI_COLON, [REDUCE, 36])
  .add(Symbol.COMMA, [REDUCE, 36])
  .add(33, [REDUCE, 36])
  .add(Symbol.POUND, [SHIFT, 38])
  .build();
table[15] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 38])
  .add(Symbol.AMPERSAND, [REDUCE, 38])
  .add(Symbol.EQUALS, [REDUCE, 38])
  .add(Symbol.PLUS, [REDUCE, 38])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 38])
  .add(Symbol.LESS_THAN, [REDUCE, 38])
  .add(Symbol.GREATER_THAN, [REDUCE, 38])
  .add(Symbol.NOT, [REDUCE, 38])
  .add(Symbol.MINUS, [REDUCE, 38])
  .add(Symbol.ASTERISK, [REDUCE, 38])
  .add(Symbol.DIVIDE, [REDUCE, 38])
  .add(Symbol.CARROT, [REDUCE, 38])
  .add(Symbol.SEMI_COLON, [REDUCE, 38])
  .add(Symbol.COMMA, [REDUCE, 38])
  .add(33, [SHIFT, 39])
  .add(Symbol.PERCENT, [REDUCE, 38])
  .add(38, [REDUCE, 38])
  .build();
table[16] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 28])
  .add(Symbol.AMPERSAND, [REDUCE, 28])
  .add(Symbol.EQUALS, [REDUCE, 28])
  .add(Symbol.PLUS, [REDUCE, 28])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 28])
  .add(Symbol.LESS_THAN, [REDUCE, 28])
  .add(Symbol.GREATER_THAN, [REDUCE, 28])
  .add(Symbol.NOT, [REDUCE, 28])
  .add(Symbol.MINUS, [REDUCE, 28])
  .add(Symbol.ASTERISK, [REDUCE, 28])
  .add(Symbol.DIVIDE, [REDUCE, 28])
  .add(Symbol.CARROT, [REDUCE, 28])
  .add(Symbol.COLON, [SHIFT, 40])
  .add(Symbol.SEMI_COLON, [REDUCE, 28])
  .add(Symbol.COMMA, [REDUCE, 28])
  .build();
table[17] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 30])
  .add(Symbol.AMPERSAND, [REDUCE, 30])
  .add(Symbol.EQUALS, [REDUCE, 30])
  .add(Symbol.PLUS, [REDUCE, 30])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 30])
  .add(Symbol.LESS_THAN, [REDUCE, 30])
  .add(Symbol.GREATER_THAN, [REDUCE, 30])
  .add(Symbol.NOT, [REDUCE, 30])
  .add(Symbol.MINUS, [REDUCE, 30])
  .add(Symbol.ASTERISK, [REDUCE, 30])
  .add(Symbol.DIVIDE, [REDUCE, 30])
  .add(Symbol.CARROT, [REDUCE, 30])
  .add(Symbol.COLON, [SHIFT, 41])
  .add(Symbol.SEMI_COLON, [REDUCE, 30])
  .add(Symbol.COMMA, [REDUCE, 30])
  .build();
table[18] = ObjectBuilder
  .add(Symbol.VARIABLE, [SHIFT, 42])
  .build();
table[19] = ObjectBuilder
  .add(Symbol.END, [ACCEPT, 1])
  .build();
table[20] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 43)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[21] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 44)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[22] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 45)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[23] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 48)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.EQUALS, [SHIFT, 46])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.GREATER_THAN, [SHIFT, 47])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[24] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 50)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.EQUALS, [SHIFT, 49])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[25] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 51)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[26] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 52)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[27] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 53)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[28] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 54)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[29] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 55)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[30] = ObjectBuilder
  .add(Symbol.VARIABLE, [SHIFT, 56])
  .build();
table[31] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 40])
  .add(Symbol.AMPERSAND, [REDUCE, 40])
  .add(Symbol.EQUALS, [REDUCE, 40])
  .add(Symbol.PLUS, [REDUCE, 40])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 40])
  .add(Symbol.LESS_THAN, [REDUCE, 40])
  .add(Symbol.GREATER_THAN, [REDUCE, 40])
  .add(Symbol.NOT, [REDUCE, 40])
  .add(Symbol.MINUS, [REDUCE, 40])
  .add(Symbol.ASTERISK, [REDUCE, 40])
  .add(Symbol.DIVIDE, [REDUCE, 40])
  .add(Symbol.CARROT, [REDUCE, 40])
  .add(Symbol.SEMI_COLON, [REDUCE, 40])
  .add(Symbol.COMMA, [REDUCE, 40])
  .add(Symbol.PERCENT, [REDUCE, 40])
  .add(38, [REDUCE, 40])
  .build();
table[32] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [SHIFT, 21])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [SHIFT, 57])
  .add(Symbol.LESS_THAN, [SHIFT, 23])
  .add(Symbol.GREATER_THAN, [SHIFT, 24])
  .add(Symbol.NOT, [SHIFT, 25])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .build();
table[33] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 21])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 21])
  .add(Symbol.PLUS, [REDUCE, 21])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 21])
  .add(Symbol.LESS_THAN, [REDUCE, 21])
  .add(Symbol.GREATER_THAN, [REDUCE, 21])
  .add(Symbol.NOT, [REDUCE, 21])
  .add(Symbol.MINUS, [REDUCE, 21])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 21])
  .add(Symbol.COMMA, [REDUCE, 21])
  .build();
table[34] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 22])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 22])
  .add(Symbol.PLUS, [REDUCE, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 22])
  .add(Symbol.LESS_THAN, [REDUCE, 22])
  .add(Symbol.GREATER_THAN, [REDUCE, 22])
  .add(Symbol.NOT, [REDUCE, 22])
  .add(Symbol.MINUS, [REDUCE, 22])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 22])
  .add(Symbol.COMMA, [REDUCE, 22])
  .build();
table[35] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 60)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.RIGHT_PAREN, [SHIFT, 58])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.EXP_SEQ, 59)
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.ARRAY, [SHIFT, 61])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[36] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 27])
  .add(Symbol.AMPERSAND, [REDUCE, 27])
  .add(Symbol.EQUALS, [REDUCE, 27])
  .add(Symbol.PLUS, [REDUCE, 27])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 27])
  .add(Symbol.LESS_THAN, [REDUCE, 27])
  .add(Symbol.GREATER_THAN, [REDUCE, 27])
  .add(Symbol.NOT, [REDUCE, 27])
  .add(Symbol.MINUS, [REDUCE, 27])
  .add(Symbol.ASTERISK, [REDUCE, 27])
  .add(Symbol.DIVIDE, [REDUCE, 27])
  .add(Symbol.CARROT, [REDUCE, 27])
  .add(Symbol.SEMI_COLON, [REDUCE, 27])
  .add(Symbol.COMMA, [REDUCE, 27])
  .build();
table[37] = ObjectBuilder
  .add(Symbol.POUND, [SHIFT, 38])
  .build();
table[38] = ObjectBuilder
  .add(Symbol.VARIABLE, [SHIFT, 62])
  .build();
table[39] = ObjectBuilder
  .add(Symbol.NUMBER_UPPER, [SHIFT, 63])
  .build();
table[40] = ObjectBuilder
  .add(Symbol.FIXEDCELL, [SHIFT, 64])
  .build();
table[41] = ObjectBuilder
  .add(Symbol.CELL_UPPER, [SHIFT, 65])
  .build();
table[42] = ObjectBuilder
  .add(Symbol.EXCLAMATION_POINT, [SHIFT, 66])
  .build();
table[43] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 7])
  .add(Symbol.AMPERSAND, [REDUCE, 7])
  .add(Symbol.EQUALS, [REDUCE, 7])
  .add(Symbol.PLUS, [REDUCE, 7])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 7])
  .add(Symbol.LESS_THAN, [REDUCE, 7])
  .add(Symbol.GREATER_THAN, [REDUCE, 7])
  .add(Symbol.NOT, [REDUCE, 7])
  .add(Symbol.MINUS, [REDUCE, 7])
  .add(Symbol.ASTERISK, [REDUCE, 7])
  .add(Symbol.DIVIDE, [REDUCE, 7])
  .add(Symbol.CARROT, [REDUCE, 7])
  .add(Symbol.SEMI_COLON, [REDUCE, 7])
  .add(Symbol.COMMA, [REDUCE, 7])
  .build();
table[44] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 8])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 8])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 8])
  .add(Symbol.LESS_THAN, [SHIFT, 23])
  .add(Symbol.GREATER_THAN, [SHIFT, 24])
  .add(Symbol.NOT, [SHIFT, 25])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 8])
  .add(Symbol.COMMA, [REDUCE, 8])
  .build();
table[45] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 9])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 9])
  .add(Symbol.PLUS, [REDUCE, 9])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 9])
  .add(Symbol.LESS_THAN, [REDUCE, 9])
  .add(Symbol.GREATER_THAN, [REDUCE, 9])
  .add(Symbol.NOT, [REDUCE, 9])
  .add(Symbol.MINUS, [REDUCE, 9])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 9])
  .add(Symbol.COMMA, [REDUCE, 9])
  .build();
table[46] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 67)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[47] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 68)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[48] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 16])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 16])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 16])
  .add(Symbol.LESS_THAN, [REDUCE, 16])
  .add(Symbol.GREATER_THAN, [REDUCE, 16])
  .add(Symbol.NOT, [REDUCE, 16])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 16])
  .add(Symbol.COMMA, [REDUCE, 16])
  .build();
table[49] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 69)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18])
  .build();
table[50] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 15])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 15])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 15])
  .add(Symbol.LESS_THAN, [REDUCE, 15])
  .add(Symbol.GREATER_THAN, [REDUCE, 15])
  .add(Symbol.NOT, [REDUCE, 15])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 15])
  .add(Symbol.COMMA, [REDUCE, 15])
  .build();
table[51] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 14])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 14])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 14])
  .add(Symbol.LESS_THAN, [SHIFT, 23])
  .add(Symbol.GREATER_THAN, [SHIFT, 24])
  .add(Symbol.NOT, [REDUCE, 14])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 14])
  .add(Symbol.COMMA, [REDUCE, 14])
  .build();
table[52] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 17])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 17])
  .add(Symbol.PLUS, [REDUCE, 17])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 17])
  .add(Symbol.LESS_THAN, [REDUCE, 17])
  .add(Symbol.GREATER_THAN, [REDUCE, 17])
  .add(Symbol.NOT, [REDUCE, 17])
  .add(Symbol.MINUS, [REDUCE, 17])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 17])
  .add(Symbol.COMMA, [REDUCE, 17])
  .build();
table[53] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 18])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 18])
  .add(Symbol.PLUS, [REDUCE, 18])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 18])
  .add(Symbol.LESS_THAN, [REDUCE, 18])
  .add(Symbol.GREATER_THAN, [REDUCE, 18])
  .add(Symbol.NOT, [REDUCE, 18])
  .add(Symbol.MINUS, [REDUCE, 18])
  .add(Symbol.ASTERISK, [REDUCE, 18])
  .add(Symbol.DIVIDE, [REDUCE, 18])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 18])
  .add(Symbol.COMMA, [REDUCE, 18])
  .build();
table[54] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 19])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 19])
  .add(Symbol.PLUS, [REDUCE, 19])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 19])
  .add(Symbol.LESS_THAN, [REDUCE, 19])
  .add(Symbol.GREATER_THAN, [REDUCE, 19])
  .add(Symbol.NOT, [REDUCE, 19])
  .add(Symbol.MINUS, [REDUCE, 19])
  .add(Symbol.ASTERISK, [REDUCE, 19])
  .add(Symbol.DIVIDE, [REDUCE, 19])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 19])
  .add(Symbol.COMMA, [REDUCE, 19])
  .build();
table[55] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 20])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 20])
  .add(Symbol.PLUS, [REDUCE, 20])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 20])
  .add(Symbol.LESS_THAN, [REDUCE, 20])
  .add(Symbol.GREATER_THAN, [REDUCE, 20])
  .add(Symbol.NOT, [REDUCE, 20])
  .add(Symbol.MINUS, [REDUCE, 20])
  .add(Symbol.ASTERISK, [REDUCE, 20])
  .add(Symbol.DIVIDE, [REDUCE, 20])
  .add(Symbol.CARROT, [REDUCE, 20])
  .add(Symbol.SEMI_COLON, [REDUCE, 20])
  .add(Symbol.COMMA, [REDUCE, 20])
  .build();
table[56] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 37])
  .add(Symbol.AMPERSAND, [REDUCE, 37])
  .add(Symbol.EQUALS, [REDUCE, 37])
  .add(Symbol.PLUS, [REDUCE, 37])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 37])
  .add(Symbol.LESS_THAN, [REDUCE, 37])
  .add(Symbol.GREATER_THAN, [REDUCE, 37])
  .add(Symbol.NOT, [REDUCE, 37])
  .add(Symbol.MINUS, [REDUCE, 37])
  .add(Symbol.ASTERISK, [REDUCE, 37])
  .add(Symbol.DIVIDE, [REDUCE, 37])
  .add(Symbol.CARROT, [REDUCE, 37])
  .add(Symbol.SEMI_COLON, [REDUCE, 37])
  .add(Symbol.COMMA, [REDUCE, 37])
  .add(33, [REDUCE, 37])
  .build();
table[57] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 10])
  .add(Symbol.AMPERSAND, [REDUCE, 10])
  .add(Symbol.EQUALS, [REDUCE, 10])
  .add(Symbol.PLUS, [REDUCE, 10])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 10])
  .add(Symbol.LESS_THAN, [REDUCE, 10])
  .add(Symbol.GREATER_THAN, [REDUCE, 10])
  .add(Symbol.NOT, [REDUCE, 10])
  .add(Symbol.MINUS, [REDUCE, 10])
  .add(Symbol.ASTERISK, [REDUCE, 10])
  .add(Symbol.DIVIDE, [REDUCE, 10])
  .add(Symbol.CARROT, [REDUCE, 10])
  .add(Symbol.SEMI_COLON, [REDUCE, 10])
  .add(Symbol.COMMA, [REDUCE, 10])
  .build();
table[58] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 23])
  .add(Symbol.AMPERSAND, [REDUCE, 23])
  .add(Symbol.EQUALS, [REDUCE, 23])
  .add(Symbol.PLUS, [REDUCE, 23])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 23])
  .add(Symbol.LESS_THAN, [REDUCE, 23])
  .add(Symbol.GREATER_THAN, [REDUCE, 23])
  .add(Symbol.NOT, [REDUCE, 23])
  .add(Symbol.MINUS, [REDUCE, 23])
  .add(Symbol.ASTERISK, [REDUCE, 23])
  .add(Symbol.DIVIDE, [REDUCE, 23])
  .add(Symbol.CARROT, [REDUCE, 23])
  .add(Symbol.SEMI_COLON, [REDUCE, 23])
  .add(Symbol.COMMA, [REDUCE, 23])
  .build();
table[59] = ObjectBuilder
  .add(Symbol.RIGHT_PAREN, [SHIFT, 70])
  .add(Symbol.SEMI_COLON, [SHIFT, 71])
  .add(Symbol.COMMA, [SHIFT, 72])
  .build();
table[60] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [SHIFT, 21])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 32])
  .add(Symbol.LESS_THAN, [SHIFT, 23])
  .add(Symbol.GREATER_THAN, [SHIFT, 24])
  .add(Symbol.NOT, [SHIFT, 25])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 32])
  .add(Symbol.COMMA, [REDUCE, 32])
  .build();
table[61] = ObjectBuilder
  .add(Symbol.RIGHT_PAREN, [REDUCE, 33])
  .add(Symbol.SEMI_COLON, [REDUCE, 33])
  .add(Symbol.COMMA, [REDUCE, 33])
  .build();
table[62] = ObjectBuilder
  .add(Symbol.EXCLAMATION_POINT, [SHIFT, 73])
  .build();
table[63] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 39])
  .add(Symbol.AMPERSAND, [REDUCE, 39])
  .add(Symbol.EQUALS, [REDUCE, 39])
  .add(Symbol.PLUS, [REDUCE, 39])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 39])
  .add(Symbol.LESS_THAN, [REDUCE, 39])
  .add(Symbol.GREATER_THAN, [REDUCE, 39])
  .add(Symbol.NOT, [REDUCE, 39])
  .add(Symbol.MINUS, [REDUCE, 39])
  .add(Symbol.ASTERISK, [REDUCE, 39])
  .add(Symbol.DIVIDE, [REDUCE, 39])
  .add(Symbol.CARROT, [REDUCE, 39])
  .add(Symbol.SEMI_COLON, [REDUCE, 39])
  .add(Symbol.COMMA, [REDUCE, 39])
  .add(Symbol.PERCENT, [REDUCE, 39])
  .add(38, [REDUCE, 39]).build();
table[64] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 29])
  .add(Symbol.AMPERSAND, [REDUCE, 29])
  .add(Symbol.EQUALS, [REDUCE, 29])
  .add(Symbol.PLUS, [REDUCE, 29])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 29])
  .add(Symbol.LESS_THAN, [REDUCE, 29])
  .add(Symbol.GREATER_THAN, [REDUCE, 29])
  .add(Symbol.NOT, [REDUCE, 29])
  .add(Symbol.MINUS, [REDUCE, 29])
  .add(Symbol.ASTERISK, [REDUCE, 29])
  .add(Symbol.DIVIDE, [REDUCE, 29])
  .add(Symbol.CARROT, [REDUCE, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 29])
  .add(Symbol.COMMA, [REDUCE, 29]).build();
table[65] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 31])
  .add(Symbol.AMPERSAND, [REDUCE, 31])
  .add(Symbol.EQUALS, [REDUCE, 31])
  .add(Symbol.PLUS, [REDUCE, 31])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 31])
  .add(Symbol.LESS_THAN, [REDUCE, 31])
  .add(Symbol.GREATER_THAN, [REDUCE, 31])
  .add(Symbol.NOT, [REDUCE, 31])
  .add(Symbol.MINUS, [REDUCE, 31])
  .add(Symbol.ASTERISK, [REDUCE, 31])
  .add(Symbol.DIVIDE, [REDUCE, 31])
  .add(Symbol.CARROT, [REDUCE, 31])
  .add(Symbol.SEMI_COLON, [REDUCE, 31])
  .add(Symbol.COMMA, [REDUCE, 31]).build();
table[66] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 41])
  .add(Symbol.AMPERSAND, [REDUCE, 41])
  .add(Symbol.EQUALS, [REDUCE, 41])
  .add(Symbol.PLUS, [REDUCE, 41])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 41])
  .add(Symbol.LESS_THAN, [REDUCE, 41])
  .add(Symbol.GREATER_THAN, [REDUCE, 41])
  .add(Symbol.NOT, [REDUCE, 41])
  .add(Symbol.MINUS, [REDUCE, 41])
  .add(Symbol.ASTERISK, [REDUCE, 41])
  .add(Symbol.DIVIDE, [REDUCE, 41])
  .add(Symbol.CARROT, [REDUCE, 41])
  .add(Symbol.SEMI_COLON, [REDUCE, 41])
  .add(Symbol.COMMA, [REDUCE, 41])
  .add(Symbol.VARIABLE, [REDUCE, 41])
  .add(Symbol.POUND, [REDUCE, 41]).build();
table[67] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 11])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 11])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 11])
  .add(Symbol.LESS_THAN, [REDUCE, 11])
  .add(Symbol.GREATER_THAN, [REDUCE, 11])
  .add(Symbol.NOT, [REDUCE, 11])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 11])
  .add(Symbol.COMMA, [REDUCE, 11]).build();
table[68] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 13])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 13])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 13])
  .add(Symbol.LESS_THAN, [REDUCE, 13])
  .add(Symbol.GREATER_THAN, [REDUCE, 13])
  .add(Symbol.NOT, [REDUCE, 13])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 13])
  .add(Symbol.COMMA, [REDUCE, 13]).build();
table[69] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 12])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, 12])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 12])
  .add(Symbol.LESS_THAN, [REDUCE, 12])
  .add(Symbol.GREATER_THAN, [REDUCE, 12])
  .add(Symbol.NOT, [REDUCE, 12])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 12])
  .add(Symbol.COMMA, [REDUCE, 12]).build();
table[70] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 24])
  .add(Symbol.AMPERSAND, [REDUCE, 24])
  .add(Symbol.EQUALS, [REDUCE, 24])
  .add(Symbol.PLUS, [REDUCE, 24])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 24])
  .add(Symbol.LESS_THAN, [REDUCE, 24])
  .add(Symbol.GREATER_THAN, [REDUCE, 24])
  .add(Symbol.NOT, [REDUCE, 24])
  .add(Symbol.MINUS, [REDUCE, 24])
  .add(Symbol.ASTERISK, [REDUCE, 24])
  .add(Symbol.DIVIDE, [REDUCE, 24])
  .add(Symbol.CARROT, [REDUCE, 24])
  .add(Symbol.SEMI_COLON, [REDUCE, 24])
  .add(Symbol.COMMA, [REDUCE, 24]).build();
table[71] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 74)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.EQUALS, [SHIFT, 21])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18]).build();
table[72] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 75)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, 4])
  .add(Symbol.TIME_24, [SHIFT, 5])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, 7])
  .add(Symbol.EQUALS, [SHIFT, 21])
  .add(Symbol.PLUS, [SHIFT, 10])
  .add(Symbol.LEFT_PAREN, [SHIFT, 8])
  .add(Symbol.MINUS, [SHIFT, 9])
  .add(Symbol.FUNCTION, [SHIFT, 11])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, 16])
  .add(Symbol.CELL_UPPER, [SHIFT, 17])
  .add(Symbol.VARIABLE, [SHIFT, 14])
  .add(Symbol.NUMBER_UPPER, [SHIFT, 15])
  .add(Symbol.POUND, [SHIFT, 18]).build();
table[73] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, 42])
  .add(Symbol.AMPERSAND, [REDUCE, 42])
  .add(Symbol.EQUALS, [REDUCE, 42])
  .add(Symbol.PLUS, [REDUCE, 42])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 42])
  .add(Symbol.LESS_THAN, [REDUCE, 42])
  .add(Symbol.GREATER_THAN, [REDUCE, 42])
  .add(Symbol.NOT, [REDUCE, 42])
  .add(Symbol.MINUS, [REDUCE, 42])
  .add(Symbol.ASTERISK, [REDUCE, 42])
  .add(Symbol.DIVIDE, [REDUCE, 42])
  .add(Symbol.CARROT, [REDUCE, 42])
  .add(Symbol.SEMI_COLON, [REDUCE, 42])
  .add(Symbol.COMMA, [REDUCE, 42])
  .add(Symbol.VARIABLE, [REDUCE, 42])
  .add(Symbol.POUND, [REDUCE, 42]).build();
table[74] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [SHIFT, 21])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 34])
  .add(Symbol.LESS_THAN, [SHIFT, 23])
  .add(Symbol.GREATER_THAN, [SHIFT, 24])
  .add(Symbol.NOT, [SHIFT, 25])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 34])
  .add(Symbol.COMMA, [REDUCE, 34]).build();
table[75] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [SHIFT, 21])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.RIGHT_PAREN, [REDUCE, 35])
  .add(Symbol.LESS_THAN, [SHIFT, 23])
  .add(Symbol.GREATER_THAN, [SHIFT, 24])
  .add(Symbol.NOT, [SHIFT, 25])
  .add(Symbol.MINUS, [SHIFT, 26])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, 35])
  .add(Symbol.COMMA, [REDUCE, 35]).build();
const ACTION_TABLE = table;


let Parser = (function () {
  let parser = {
    lexer: undefined,
    Parser: undefined,
    trace: function trace() {},
    yy: {},
    /**
     * Perform a reduce action on the given virtual stack. Basically, fetching, deriving, or calculating a value.
     * @param rawValueOfReduceOriginToken - Some actions require the origin token to perform a reduce action. For
     * example, when reducing the cell reference A1 to it's actual value this value would be "A1".
     * @param sharedStateYY - the shared state that has all helpers, and current working object.
     * @param reduceActionToPerform - the ReduceAction to perform with the current virtual stack. Since this function
     * is only called in one place, this should always be action[1] in that context.
     * @param virtualStack - Array of values to use in action.
     * @param catchOnFailure - If we are performing an action that could result in a failure, and we cant to catch and
     * assign the error thrown, this should be set to true.
     * @returns {number|boolean|string}
     */
    performAction: function (rawValueOfReduceOriginToken, sharedStateYY, reduceActionToPerform, virtualStack : Array<any>, catchOnFailure : boolean) {
      // For context, this function is only called with `apply`, so `this` is `yyval`.

      const vsl = virtualStack.length - 1;
      try {
        switch (reduceActionToPerform) {
          case ReduceActions.RETURN_LAST:
            return virtualStack[vsl - 1];
          case ReduceActions.CALL_VARIABLE:
            this.$ = sharedStateYY.handler.helper.callVariable.call(this, virtualStack[vsl]);
            break;
          case ReduceActions.TIME_CALL_TRUE:
            this.$ = sharedStateYY.handler.time.call(sharedStateYY.obj, virtualStack[vsl], true);
            break;
          case ReduceActions.TIME_CALL:
            this.$ = sharedStateYY.handler.time.call(sharedStateYY.obj, virtualStack[vsl]);
            break;
          case ReduceActions.AS_NUMBER:
            this.$ = sharedStateYY.handler.helper.number(virtualStack[vsl]);
            break;
          case ReduceActions.AS_STRING:
            this.$ = sharedStateYY.handler.helper.string(virtualStack[vsl]);
            break;
          case ReduceActions.AMPERSAND:
            this.$ = sharedStateYY.handler.helper.specialMatch('&', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.EQUALS:
            this.$ = sharedStateYY.handler.helper.logicMatch('=', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.PLUS:
            this.$ = sharedStateYY.handler.helper.mathMatch('+', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.LAST_NUMBER:
            this.$ = sharedStateYY.handler.helper.number(virtualStack[vsl - 1]);
            break;
          case ReduceActions.LTE:
            this.$ = sharedStateYY.handler.helper.logicMatch('<=', virtualStack[vsl - 3], virtualStack[vsl]);
            break;
          case ReduceActions.GTE:
            this.$ = sharedStateYY.handler.helper.logicMatch('>=', virtualStack[vsl - 3], virtualStack[vsl]);
            break;
          case ReduceActions.NOT_EQ:
            this.$ = sharedStateYY.handler.helper.logicMatch('<>', virtualStack[vsl - 3], virtualStack[vsl]);
            break;
          case ReduceActions.NOT:
            this.$ = sharedStateYY.handler.helper.logicMatch('NOT', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.GT:
            this.$ = sharedStateYY.handler.helper.logicMatch('>', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.LT:
            this.$ = sharedStateYY.handler.helper.logicMatch('<', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.MINUS:
            this.$ = sharedStateYY.handler.helper.mathMatch('-', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.MULTIPLY:
            this.$ = sharedStateYY.handler.helper.mathMatch('*', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.DIVIDE:
            this.$ = sharedStateYY.handler.helper.mathMatch('/', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.TO_POWER:
            this.$ = sharedStateYY.handler.helper.mathMatch('^', virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.INVERT_NUM:
            this.$ = sharedStateYY.handler.helper.numberInverted(virtualStack[vsl]);
            if (isNaN(this.$)) {
              this.$ = 0;
            }
            break;
          case ReduceActions.TO_NUMBER_NAN_AS_ZERO:
            this.$ = sharedStateYY.handler.helper.number(virtualStack[vsl]);
            if (isNaN(this.$)) {
              this.$ = 0;
            }
            break;
          case ReduceActions.CALL_FUNCTION_LAST_BLANK:
            this.$ = sharedStateYY.handler.helper.callFunction.call(this, virtualStack[vsl - 2], '');
            break;
          case ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK:
            this.$ = sharedStateYY.handler.helper.callFunction.call(this, virtualStack[vsl - 3], virtualStack[vsl - 1]);
            break;
          case ReduceActions.FIXED_CELL_VAL:
            this.$ = sharedStateYY.handler.helper.fixedCellValue.call(sharedStateYY.obj, virtualStack[vsl]);
            break;
          case ReduceActions.FIXED_CELL_RANGE_VAL:
            this.$ = sharedStateYY.handler.helper.fixedCellRangeValue.call(sharedStateYY.obj, virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.CELL_VALUE:
            this.$ = sharedStateYY.handler.helper.cellValue.call(sharedStateYY.obj, virtualStack[vsl]);
            break;
          case ReduceActions.CELL_RANGE_VALUE:
            this.$ = sharedStateYY.handler.helper.cellRangeValue.call(sharedStateYY.obj, virtualStack[vsl - 2], virtualStack[vsl]);
            break;
          case ReduceActions.ENSURE_IS_ARRAY:
            if (sharedStateYY.handler.utils.isArray(virtualStack[vsl])) {
              this.$ = virtualStack[vsl];
            } else {
              this.$ = [virtualStack[vsl]];
            }
            break;
          case ReduceActions.ENSURE_YYTEXT_ARRAY:
            let result = [],
              arr = eval("[" + rawValueOfReduceOriginToken + "]");
            arr.forEach(function (item) {
              result.push(item);
            });
            this.$ = result;
            break;
          case ReduceActions.REDUCE_INT:
          case ReduceActions.REDUCE_PERCENT:
            virtualStack[vsl - 2].push(virtualStack[vsl]);
            this.$ = virtualStack[vsl - 2];
            break;
          case ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY:
            this.$ = [virtualStack[vsl]];
            break;
          case ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH:
            this.$ = (sharedStateYY.handler.utils.isArray(virtualStack[vsl - 2]) ? virtualStack[vsl - 2] : [virtualStack[vsl - 2]]);
            this.$.push(virtualStack[vsl]);
            break;
          case ReduceActions.REFLEXIVE_REDUCE:
            this.$ = virtualStack[vsl];
            break;
          case ReduceActions.REDUCE_FLOAT:
            this.$ = parseFloat(virtualStack[vsl - 2] + '.' + virtualStack[vsl]);
            break;
          case ReduceActions.REDUCE_PREV_AS_PERCENT:
            this.$ = virtualStack[vsl - 1] * 0.01;
            break;
          case ReduceActions.REDUCE_LAST_THREE_A:
          case ReduceActions.REDUCE_LAST_THREE_B:
            this.$ = virtualStack[vsl - 2] + virtualStack[vsl - 1] + virtualStack[vsl];
            break;
        }
      } catch (e) {
        if (catchOnFailure) {
          // NOTE: I'm not sure if some of these ReduceAction map correctly in the case of an error.
          switch (reduceActionToPerform) {
            case ReduceActions.RETURN_LAST:
              return virtualStack[vsl - 1];
            case ReduceActions.CALL_VARIABLE:
            case ReduceActions.TIME_CALL_TRUE:
            case ReduceActions.TIME_CALL:
            case ReduceActions.AS_NUMBER:
            case ReduceActions.AS_STRING:
            case ReduceActions.AMPERSAND:
            case ReduceActions.EQUALS:
            case ReduceActions.PLUS:
            case ReduceActions.LAST_NUMBER:
            case ReduceActions.LTE:
            case ReduceActions.GTE:
            case ReduceActions.NOT_EQ:
            case ReduceActions.NOT:
            case ReduceActions.GT:
            case ReduceActions.LT:
            case ReduceActions.MINUS:
            case ReduceActions.MULTIPLY:
            case ReduceActions.DIVIDE:
            case ReduceActions.TO_POWER:
            case ReduceActions.CALL_FUNCTION_LAST_BLANK:
            case ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK:
            case ReduceActions.FIXED_CELL_VAL:
            case ReduceActions.FIXED_CELL_RANGE_VAL:
            case ReduceActions.CELL_VALUE:
            case ReduceActions.CELL_RANGE_VALUE:
              this.$ = e;
              break;
            case ReduceActions.INVERT_NUM:
              this.$ = e;
              if (isNaN(this.$)) {
                this.$ = 0;
              }
              break;
            case ReduceActions.TO_NUMBER_NAN_AS_ZERO:
              this.$ = e;
              if (isNaN(this.$)) {
                this.$ = 0;
              }
              break;
            case ReduceActions.ENSURE_IS_ARRAY:
              if (sharedStateYY.handler.utils.isArray(virtualStack[vsl])) {
                this.$ = virtualStack[vsl];
              } else {
                this.$ = [virtualStack[vsl]];
              }
              break;
            case ReduceActions.ENSURE_YYTEXT_ARRAY:
              let result = [],
                arr = eval("[" + rawValueOfReduceOriginToken + "]");
              arr.forEach(function (item) {
                result.push(item);
              });
              this.$ = result;
              break;
            case ReduceActions.REDUCE_INT:
            case ReduceActions.REDUCE_PERCENT:
              virtualStack[vsl - 2].push(virtualStack[vsl]);
              this.$ = virtualStack[vsl - 2];
              break;
            case ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY:
              this.$ = [virtualStack[vsl]];
              break;
            case ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH:
              this.$ = (sharedStateYY.handler.utils.isArray(virtualStack[vsl - 2]) ? virtualStack[vsl - 2] : [virtualStack[vsl - 2]]);
              this.$.push(virtualStack[vsl]);
              break;
            case ReduceActions.REFLEXIVE_REDUCE:
              this.$ = virtualStack[vsl];
              break;
            case ReduceActions.REDUCE_FLOAT:
              this.$ = parseFloat(virtualStack[vsl - 2] + '.' + virtualStack[vsl]);
              break;
            case ReduceActions.REDUCE_PREV_AS_PERCENT:
              this.$ = virtualStack[vsl - 1] * 0.01;
              break;
            case ReduceActions.REDUCE_LAST_THREE_A:
            case ReduceActions.REDUCE_LAST_THREE_B:
              this.$ = virtualStack[vsl - 2] + virtualStack[vsl - 1] + virtualStack[vsl];
              break;
          }
        } else {
          throw e;
        }
      }
    },
    defaultActions: {19: [REDUCE, 1]},
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        throw new ParseError(str);
      }
    },
    parse: function parse(input) {
      let stack = [0],
        semanticValueStack = [null],
        locationStack = [],
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

      let args = locationStack.slice.call(arguments, 1);
      let lexer = Object.create(this.lexer);
      let sharedState = {
        yy: {
          parseError: undefined,
          lexer: {
            parseError: undefined
          },
          parser: {
            parseError: undefined
          }
        }
      };
      // copy state
      for (let k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }

      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
      }
      let yyloc = lexer.yylloc;
      locationStack.push(yyloc);

      let ranges = lexer.options && lexer.options.ranges;

      if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }

      function popStack(n) {
        stack.length = stack.length - 2 * n;
        semanticValueStack.length = semanticValueStack.length - n;
        locationStack.length = locationStack.length - n;
      }

      function lex() {
        let token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
          token = SYMBOL_NAME_TO_INDEX[token] || token;
        }
        return token;
      }

      let symbol,
        preErrorSymbol,
        state,
        action,
        result,
        yyval = {
          $: undefined,
          _$: undefined
        },
        p,
        newState,
        expected,
        catchFailuresOn = false;
      while (true) {
        // retrieve state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (typeof symbol == 'undefined'|| symbol === null) {
            symbol = lex();
          }
          // read action for current state and first input
          action = ACTION_TABLE[state] && ACTION_TABLE[state][symbol];
        }

        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
          let error_rule_depth;
          let errStr = '';

          // Return the rule stack depth where the nearest error rule can be found.
          // Return FALSE when no error recovery rule was found.
          this.locateNearestErrorRecoveryRule = function(state) {
            let stack_probe = stack.length - 1;
            let depth = 0;

            // try to recover from error
            for (; ;) {
              // check for error recovery rule in this state
              if ((TERROR.toString()) in ACTION_TABLE[state]) {
                return depth;
              }
              if (state === 0 || stack_probe < 2) {
                return false; // No suitable error recovery rule available.
              }
              stack_probe -= 2; // popStack(1): [symbol, action]
              state = stack[stack_probe];
              ++depth;
            }
          };

          if (!recovering) {
            // first see if there's any chance at hitting an error recovery rule:
            error_rule_depth = this.locateNearestErrorRecoveryRule(state);

            // Report error
            expected = [];
            let expectedIndexes = [];
            let tableState = ACTION_TABLE[state];
            for (p in ACTION_TABLE[state]) {
              if (SYMBOL_INDEX_TO_NAME[p] && p > TERROR) {
                expected.push(SYMBOL_INDEX_TO_NAME[p]);
                expectedIndexes.push(p);
              }
            }
            if (lexer.showPosition) {
              errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (SYMBOL_INDEX_TO_NAME[symbol] || symbol) + "'";
            } else {
              errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " +
                (symbol == EOF ? "end of input" :
                  ("'" + (SYMBOL_INDEX_TO_NAME[symbol] || symbol) + "'"));
            }
            this.parseError(errStr, {
              text: lexer.match,
              token: SYMBOL_INDEX_TO_NAME[symbol] || symbol,
              line: lexer.yylineno,
              loc: yyloc,
              expected: expected,
              expectedIndexes: expectedIndexes,
              state: state,
              tableState: tableState,
              recoverable: (error_rule_depth !== false)
            });
          } else if (preErrorSymbol !== EOF) {
            error_rule_depth = this.locateNearestErrorRecoveryRule(state);
          }

          // just recovered from another error
          if (recovering == 3) {
            if (symbol === EOF || preErrorSymbol === EOF) {
              throw new ParseError(errStr || 'Parsing halted while starting to recover from another error.');
            }

            // discard current lookahead and grab another
            yyleng = lexer.yyleng;
            yytext = lexer.yytext;
            yylineno = lexer.yylineno;
            yyloc = lexer.yylloc;
            symbol = lex();
          }

          // try to recover from error
          if (error_rule_depth === false) {
            throw new ParseError(errStr || 'Parsing halted. No suitable error recovery rule available.');
          }
          popStack(error_rule_depth);

          preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
          symbol = TERROR;         // insert generic error symbol as new lookahead
          state = stack[stack.length - 1];
          action = ACTION_TABLE[state] && ACTION_TABLE[state][TERROR];
          recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
          throw new ParseError('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }

        // Available actions:
        //   Shift: continue to process tokens.
        //   Reduce: enough tokens have been gathered to reduce input through evaluation.
        //   Accept: return.
        switch (action[0]) {
          case SHIFT: // Shift
            stack.push(symbol);
            semanticValueStack.push(lexer.yytext);
            locationStack.push(lexer.yylloc);
            stack.push(action[1]); // push state
            // console.log("SHIFT", "literal", lexer.yytext, "   symbol", symbol, "   symbol name", SYMBOL_INDEX_TO_NAME[symbol], "   action", action,
            //     "   stack", stack, "   semanticValueStack", semanticValueStack);
            symbol = null;

            if (Formulas.isTryCatchFormula(lexer.yytext)) {
              catchFailuresOn = true;
            }

            if (!preErrorSymbol) { // normal execution/no error
              yyleng = lexer.yyleng;
              yytext = lexer.yytext;
              yylineno = lexer.yylineno;
              yyloc = lexer.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              // error just occurred, resume old lookahead f/ before error
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;

          case REDUCE: // Reduce
            // console.log("REDUCE", "literal", lexer.yytext, "   symbol", symbol, "   symbol name", SYMBOL_INDEX_TO_NAME[symbol], "   action", action,
            //     "   stack", stack, "   semanticValueStack", semanticValueStack);
            let currentProduction : ReductionPair = PRODUCTIONS[action[1]];

            let lengthToReduceStackBy = currentProduction.getLengthToReduceStackBy();

            // perform semantic action
            yyval.$ = semanticValueStack[semanticValueStack.length - lengthToReduceStackBy]; // default to $$ = $1
            // default location, uses first token for firsts, last for lasts
            yyval._$ = {
              first_line: locationStack[locationStack.length - (lengthToReduceStackBy || 1)].first_line,
              last_line: locationStack[locationStack.length - 1].last_line,
              first_column: locationStack[locationStack.length - (lengthToReduceStackBy || 1)].first_column,
              last_column: locationStack[locationStack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [locationStack[locationStack.length - (lengthToReduceStackBy || 1)].range[0], locationStack[locationStack.length - 1].range[1]];
            }
            // If we are inside of a formula that should catch errors, then catch and return them.
            result = this.performAction.apply(yyval, [yytext, sharedState.yy, action[1], semanticValueStack, catchFailuresOn].concat(args));

            if (typeof result !== 'undefined') {
              return result;
            }

            // pop off stack
            if (lengthToReduceStackBy) {
              stack = stack.slice(0, -1 * lengthToReduceStackBy * 2);
              semanticValueStack = semanticValueStack.slice(0, -1 * lengthToReduceStackBy);
              locationStack = locationStack.slice(0, -1 * lengthToReduceStackBy);
            }

            // push non-terminal (reduce)
            stack.push(currentProduction.getReplacementTokenIndex());
            semanticValueStack.push(yyval.$);
            locationStack.push(yyval._$);
            newState = ACTION_TABLE[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;

          case ACCEPT:
            // Accept
            return true;
        }

      }
    }
  };

  parser.lexer = (function () {
    return ({
      EOF: 1,

      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new ParseError(str);
        }
      },

      // resets the lexer, sets new input
      setInput: function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      },

      // consumes and returns one char from the input
      input: function () {
        let ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        let lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
      },

      // unshifts one char (or a string) into the input
      unput: function (ch) {
        let len = ch.length;
        let lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        let oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        let r = this.yylloc.range;

        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ?
            (lines.length === oldLines.length ? this.yylloc.first_column : 0)
            + oldLines[oldLines.length - lines.length].length - lines[0].length :
            this.yylloc.first_column - len
        };

        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      },

      // When called from action, caches matched text and appends it on next action
      more: function () {
        this._more = true;
        return this;
      },

      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function () {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });

        }
        return this;
      },

      // retain first n characters of the match
      less: function (n) {
        this.unput(this.match.slice(n));
      },

      // displays already matched input, i.e. for error messages
      pastInput: function () {
        let past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
      },

      // displays upcoming input, i.e. for error messages
      upcomingInput: function () {
        let next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
      },

      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function () {
        let pre = this.pastInput();
        let c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      },

      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function (match, indexed_rule) {
        let token,
          lines,
          backup;

        if (this.options.backtrack_lexer) {
          // save context
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ?
            lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
            this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.mapActionToActionIndex(indexed_rule);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          // recover context
          for (let k in backup) {
            this[k] = backup[k];
          }
          return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
      },

      // return next match in input
      next: function () {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }

        let token,
          match,
          tempMatch,
          index;
        if (!this._more) {
          this.yytext = '';
          this.match = '';
        }
        let rules = this._currentRules();
        for (let i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(RULES[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                // rule action called reject() implying a rule mis-match.
                // implied `continue`
              } else {
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
          return false;
        }
        if (this._input === "") {
          return this.EOF;
        } else {
          return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
      },

      // return next match that has a token
      lex: function lex() {
        let r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions.INITIAL.rules;
        }
      },

      options: {
        // backtrack_lexer?
        // ranges?
        // flex?
      },

      mapActionToActionIndex: function (ruleIndex) {
        switch (ruleIndex) {
          case 0:
            // skip whitespace
            break;
          case 1:
            return ReduceActions.LAST_NUMBER;
          case 2:
            return ReduceActions.LAST_NUMBER;
          case 3:
            return ReduceActions.CALL_FUNCTION_LAST_BLANK;
          case 4:
            return ReduceActions.AMPERSAND;
          case 5:
            return ReduceActions.EQUALS;
          case 6:
            return ReduceActions.I26;
          case 7:
            return ReduceActions.FIXED_CELL_VAL;
          case 8:
            return ReduceActions.CALL_FUNCTION_LAST_BLANK;
          case 9:
            return ReduceActions.ENSURE_IS_ARRAY;
          case 10:
            return ReduceActions.ENSURE_IS_ARRAY;
          case 11:
            return ReduceActions.REDUCE_INT;
          case 12:
            return ReduceActions.FIXED_CELL_RANGE_VAL;
          case 13:
            // skip whitespace??
            break;
          case 14:
            return ReduceActions.LTE;
          case 15:
            return ' ';
          case 16:
            return ReduceActions.ENSURE_YYTEXT_ARRAY;
          case 17:
            return ReduceActions.I27;
          case 18:
            return ReduceActions.CELL_VALUE;
          case 19:
            return ReduceActions.CELL_RANGE_VALUE;
          case 20:
            return ReduceActions.TO_POWER;
          case 21:
            return ReduceActions.INVERT_NUM;
          case 22:
            return ReduceActions.DIVIDE;
          case 23:
            return ReduceActions.NOT_EQ;
          case 24:
            return ReduceActions.TO_NUMBER_NAN_AS_ZERO;
          case 25:
            return ReduceActions.NOT;
          case 26:
            return ReduceActions.GT;
          case 27:
            return ReduceActions.MINUS;
          case 28:
            return ReduceActions.LT;
          case 29:
            return ReduceActions.MULTIPLY;
          case 30:
            return '"';
          case 31:
            return "'";
          case 32:
            return "!";
          case 33:
            return ReduceActions.GTE;
          case 34:
            return ReduceActions.REDUCE_PERCENT;
          case 35:
            return ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY;
          case 36:
            return ReduceActions.AS_NUMBER;
        }
      },
      conditions: {
        INITIAL: {
          rules: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37
          ],
          "inclusive": true
        }
      }
    });
  })();
  function Parser() {
    this.yy = {};
  }

  Parser.prototype = parser;
  parser.Parser = Parser;
  return new Parser;
})();

export {
  Parser
}