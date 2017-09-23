
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
// TODO: POUND_SIGN_RULE Modified from /^(?:[#])/, which matches pound sign exclusively. Now specific to errors.
// TODO: Should be renamed.
const POUND_SIGN_RULE = /^(?:#N\/A|#NUM\!|#NULL\!|#DIV\/0\!|#VALUE\!|#REF\!|#ERROR)/; // rule 35
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
  POUND_SIGN_RULE,
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
  REDUCE_LAST_THREE_B = 42,
  AS_ERROR = 43
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
productions[ReduceActions.AS_ERROR] = new ReductionPair(4, 1);

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
 * rule object to follow for the next token, while an array (e.g. `{23: [1, ReduceActions.LTE]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
let table = [];
// All functions in the spreadsheet start with a 0-token.
table[0] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSIONS, 1)
  .add(Symbol.EXPRESSION, 2)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[1] = ObjectBuilder
  .add(Symbol.END, [3])
  .build();
table[2] = ObjectBuilder
  .add(Symbol.EOF, [SHIFT, ReduceActions.DIVIDE])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [SHIFT, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.LESS_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.GREATER_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.NOT, [SHIFT, ReduceActions.I25])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .build();
table[3] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(33, [SHIFT, ReduceActions.CELL_VALUE])
  .build();
table[3] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(33, [SHIFT, ReduceActions.CELL_VALUE])
  .build();
table[4] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.TIME_CALL_TRUE])
  .build();
table[5] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.NOT, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.TIME_CALL])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.TIME_CALL])
  .build();
table[6] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.NOT, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.PERCENT, [SHIFT, ReduceActions.CELL_RANGE_VALUE])
  .build();
table[7] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.NOT, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.AS_STRING])
  .build();
table[8] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 32)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[9] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 33)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[10] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 34)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[11] = ObjectBuilder
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.REDUCE_PERCENT])
  .build();
table[12] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.I25])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.I25])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.I25])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.I25])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.I25])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.I25])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.I25])
  .add(Symbol.NOT, [REDUCE, ReduceActions.I25])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.I25])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.I25])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.I25])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.I25])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.I25])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.I25])
  .build();
table[13] = ObjectBuilder
  .add(Symbol.ERROR, 36)
  .add(Symbol.EOF, [REDUCE, ReduceActions.I26])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.I26])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.I26])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.I26])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.I26])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.I26])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.I26])
  .add(Symbol.NOT, [REDUCE, ReduceActions.I26])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.I26])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.I26])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.I26])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.I26])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.I26])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.I26])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[14] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.NOT, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(33, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.POUND, [SHIFT, ReduceActions.REFLEXIVE_REDUCE])
  .build();
table[15] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(33, [SHIFT, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.PERCENT, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(38, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .build();
table[16] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.NOT, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.COLON, [SHIFT, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .build();
table[17] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.COLON, [SHIFT, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CELL_VALUE])
  .build();
table[18] = ObjectBuilder
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.EOF, [REDUCE, ReduceActions.AS_ERROR])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.AS_ERROR])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.AS_ERROR])
  .build();
table[19] = ObjectBuilder
  .add(Symbol.END, [ACCEPT, ReduceActions.RETURN_LAST])
  .build();
table[20] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 43)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[21] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 44)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[22] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 45)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[23] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 48)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.EQUALS, [SHIFT, 46])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.GREATER_THAN, [SHIFT, 47])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[24] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 50)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.EQUALS, [SHIFT, 49])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[25] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 51)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[26] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 52)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[27] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 53)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[28] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 54)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[29] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 55)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[ReduceActions.CELL_VALUE] = ObjectBuilder
  .add(Symbol.VARIABLE, [SHIFT, 56])
  .build();
table[31] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.NOT, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.PERCENT, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(38, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .build();
table[32] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [SHIFT, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [SHIFT, 57])
  .add(Symbol.LESS_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.GREATER_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.NOT, [SHIFT, ReduceActions.I25])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .build();
table[33] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.NOT, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.INVERT_NUM])
  .build();
table[34] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.NOT, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .build();
table[35] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 60)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.RIGHT_PAREN, [SHIFT, 58])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.EXP_SEQ, 59)
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.ARRAY, [SHIFT, 61])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[36] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.I27])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.I27])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.I27])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.I27])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.I27])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.I27])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.I27])
  .add(Symbol.NOT, [REDUCE, ReduceActions.I27])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.I27])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.I27])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.I27])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.I27])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.I27])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.I27])
  .build();
table[37] = ObjectBuilder
  .add(Symbol.POUND, [REDUCE, ReduceActions.AS_ERROR])
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
  .add(Symbol.EOF, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.NOT, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.AMPERSAND])
  .build();
table[44] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.EQUALS])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.EQUALS])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.EQUALS])
  .add(Symbol.LESS_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.GREATER_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.NOT, [SHIFT, ReduceActions.I25])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.EQUALS])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.EQUALS])
  .build();
table[45] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.NOT, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.PLUS])
  .build();
table[46] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 67)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[47] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 68)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[48] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LT])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.LT])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.LT])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.LT])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.LT])
  .add(Symbol.NOT, [REDUCE, ReduceActions.LT])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.LT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.LT])
  .build();
table[49] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 69)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY])
  .build();
table[50] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.GT])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.GT])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.GT])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.GT])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.GT])
  .add(Symbol.NOT, [REDUCE, ReduceActions.GT])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.GT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.GT])
  .build();
table[51] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.NOT])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.NOT])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.NOT])
  .add(Symbol.LESS_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.GREATER_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.NOT, [REDUCE, ReduceActions.NOT])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.NOT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.NOT])
  .build();
table[52] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.NOT, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.MINUS])
  .build();
table[53] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.NOT, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.MULTIPLY])
  .build();
table[54] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.DIVIDE])
  .build();
table[55] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.NOT, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.TO_POWER])
  .build();
table[56] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.NOT, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(33, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .build();
table[57] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.NOT, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.LAST_NUMBER])
  .build();
table[58] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.NOT, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .build();
table[59] = ObjectBuilder
  .add(Symbol.RIGHT_PAREN, [SHIFT, 70])
  .add(Symbol.SEMI_COLON, [SHIFT, 71])
  .add(Symbol.COMMA, [SHIFT, 72])
  .build();
table[60] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [SHIFT, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.ENSURE_IS_ARRAY])
  .add(Symbol.LESS_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.GREATER_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.NOT, [SHIFT, ReduceActions.I25])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.ENSURE_IS_ARRAY])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.ENSURE_IS_ARRAY])
  .build();
table[61] = ObjectBuilder
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.ENSURE_YYTEXT_ARRAY])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.ENSURE_YYTEXT_ARRAY])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.ENSURE_YYTEXT_ARRAY])
  .build();
table[62] = ObjectBuilder
  .add(Symbol.EXCLAMATION_POINT, [SHIFT, 73])
  .build();
table[63] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.NOT, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(Symbol.PERCENT, [REDUCE, ReduceActions.REDUCE_FLOAT])
  .add(38, [REDUCE, ReduceActions.REDUCE_FLOAT]).build();
table[64] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.NOT, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.FIXED_CELL_RANGE_VAL]).build();
table[65] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CELL_RANGE_VALUE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CELL_RANGE_VALUE]).build();
table[66] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.NOT, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.VARIABLE, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.POUND, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A]).build();
table[67] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LTE])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.LTE])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.LTE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.LTE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.LTE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.LTE])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.LTE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.LTE]).build();
table[68] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.NOT, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.NOT_EQ]).build();
table[69] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.GTE])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.GTE])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.GTE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.GTE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.GTE])
  .add(Symbol.NOT, [REDUCE, ReduceActions.GTE])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.GTE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.GTE]).build();
table[70] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.NOT, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK]).build();
table[71] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 74)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.EQUALS, [SHIFT, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY]).build();
table[72] = ObjectBuilder
  .add(Symbol.ERROR, 13)
  .add(Symbol.EXPRESSION, 75)
  .add(Symbol.VARIABLE_SEQUENCE, 3)
  .add(Symbol.TIME_AMPM, [SHIFT, ReduceActions.TIME_CALL])
  .add(Symbol.TIME_24, [SHIFT, ReduceActions.AS_NUMBER])
  .add(Symbol.NUMBER, 6)
  .add(Symbol.STRING, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.EQUALS, [SHIFT, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.LAST_NUMBER])
  .add(Symbol.LEFT_PAREN, [SHIFT, ReduceActions.EQUALS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.FUNCTION, [SHIFT, ReduceActions.LTE])
  .add(Symbol.CELL, 12)
  .add(Symbol.FIXEDCELL, [SHIFT, ReduceActions.LT])
  .add(Symbol.CELL_UPPER, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.VARIABLE, [SHIFT, ReduceActions.NOT])
  .add(Symbol.NUMBER_UPPER, [SHIFT, ReduceActions.GT])
  .add(Symbol.POUND, [SHIFT, ReduceActions.MULTIPLY]).build();
table[73] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.NOT, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.VARIABLE, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.POUND, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B]).build();
table[74] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [SHIFT, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_INT])
  .add(Symbol.LESS_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.GREATER_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.NOT, [SHIFT, ReduceActions.I25])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_INT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_INT]).build();
table[75] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.EQUALS, [SHIFT, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [SHIFT, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_PERCENT])
  .add(Symbol.LESS_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.GREATER_THAN, [SHIFT, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.NOT, [SHIFT, ReduceActions.I25])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.I26])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.I27])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.FIXED_CELL_RANGE_VAL])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_PERCENT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_PERCENT]).build();
const ACTION_TABLE = table;


export {
  ACTION_TABLE,
  RULES,
  Symbol,
  ReduceActions,
  ReductionPair,
  REDUCE,
  ACCEPT,
  SHIFT,
  SYMBOL_INDEX_TO_NAME,
  SYMBOL_NAME_TO_INDEX,
  PRODUCTIONS
}