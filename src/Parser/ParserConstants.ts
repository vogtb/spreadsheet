
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
  .add(Symbol.EOF, [REDUCE, ReduceActions.AS_ERROR])
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
  .add(Symbol.POUND, [REDUCE, 43])
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