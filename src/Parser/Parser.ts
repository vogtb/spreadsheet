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

const SYMBOL_NAME_TO_INDEX = {
  "$accept": 0,
  "$end": 1,
  "error": 2,
  "expressions": 3,
  "expression": 4,
  "EOF": 5,
  "variableSequence": 6,
  "TIME_AMPM": 7,
  "TIME_24": 8,
  "number": 9,
  "STRING": 10,
  "&": 11,
  "=": 12,
  "+": 13,
  "(": 14,
  ")": 15,
  "<": 16,
  ">": 17,
  "NOT": 18,
  "-": 19,
  "*": 20,
  "/": 21,
  "^": 22,
  "FUNCTION": 23,
  "expseq": 24,
  "cell": 25,
  "FIXEDCELL": 26,
  ":": 27,
  "CELL": 28,
  "ARRAY": 29,
  ";": 30,
  ",": 31,
  "VARIABLE": 32,
  "DECIMAL": 33,
  "NUMBER": 34,
  "%": 35,
  "#": 36,
  "!": 37
};
const SYMBOL_INDEX_TO_NAME = {
  5: "EOF",
  7: "TIME_AMPM",
  8: "TIME_24",
  10: "STRING",
  11: "&",
  12: "=",
  13: "+",
  14: "(",
  15: ")",
  16: "<",
  17: ">",
  18: "NOT",
  19: "-",
  20: "*",
  21: "/",
  22: "^",
  23: "FUNCTION",
  26: "FIXEDCELL",
  27: ":",
  28: "CELL",
  29: "ARRAY",
  30: ";",
  31: ",",
  32: "VARIABLE",
  33: "DECIMAL",
  34: "NUMBER",
  35: "%",
  36: "#",
  37: "!"
};


/**
 * Array of to map rules to to LexActions and other rules. A single index in the object (e.g. `{2: 13}`) indicates the
 * rule object to follow for the next token, while an array (e.g. `{23: [1, 11]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
let table = [];
table[0] = {
  2: 13,
  3: 1,
  4: 2,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[1] = {
  1: [3]
};
table[2] = {
  5: [SHIFT, 19],
  11: [SHIFT, 20],
  12: [SHIFT, 21],
  13: [SHIFT, 22],
  16: [SHIFT, 23],
  17: [SHIFT, 24],
  18: [SHIFT, 25],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29]
};
table[3] = {
  5: [REDUCE, 2],
  11: [REDUCE, 2],
  12: [REDUCE, 2],
  13: [REDUCE, 2],
  15: [REDUCE, 2],
  16: [REDUCE, 2],
  17: [REDUCE, 2],
  18: [REDUCE, 2],
  19: [REDUCE, 2],
  20: [REDUCE, 2],
  21: [REDUCE, 2],
  22: [REDUCE, 2],
  30: [REDUCE, 2],
  31: [REDUCE, 2],
  33: [SHIFT, 30]
};
table[4] = {
  5: [REDUCE, 3],
  11: [REDUCE, 3],
  12: [REDUCE, 3],
  13: [REDUCE, 3],
  15: [REDUCE, 3],
  16: [REDUCE, 3],
  17: [REDUCE, 3],
  18: [REDUCE, 3],
  19: [REDUCE, 3],
  20: [REDUCE, 3],
  21: [REDUCE, 3],
  22: [REDUCE, 3],
  30: [REDUCE, 3],
  31: [REDUCE, 3]
};
table[5] = {
  5: [REDUCE, 4],
  11: [REDUCE, 4],
  12: [REDUCE, 4],
  13: [REDUCE, 4],
  15: [REDUCE, 4],
  16: [REDUCE, 4],
  17: [REDUCE, 4],
  18: [REDUCE, 4],
  19: [REDUCE, 4],
  20: [REDUCE, 4],
  21: [REDUCE, 4],
  22: [REDUCE, 4],
  30: [REDUCE, 4],
  31: [REDUCE, 4]
};
table[6] = {
  5: [REDUCE, 5],
  11: [REDUCE, 5],
  12: [REDUCE, 5],
  13: [REDUCE, 5],
  15: [REDUCE, 5],
  16: [REDUCE, 5],
  17: [REDUCE, 5],
  18: [REDUCE, 5],
  19: [REDUCE, 5],
  20: [REDUCE, 5],
  21: [REDUCE, 5],
  22: [REDUCE, 5],
  30: [REDUCE, 5],
  31: [REDUCE, 5],
  35: [SHIFT, 31]
};
table[7] = {
  5: [REDUCE, 6],
  11: [REDUCE, 6],
  12: [REDUCE, 6],
  13: [REDUCE, 6],
  15: [REDUCE, 6],
  16: [REDUCE, 6],
  17: [REDUCE, 6],
  18: [REDUCE, 6],
  19: [REDUCE, 6],
  20: [REDUCE, 6],
  21: [REDUCE, 6],
  22: [REDUCE, 6],
  30: [REDUCE, 6],
  31: [REDUCE, 6]
};
table[8] = {
  2: 13,
  4: 32,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[9] = {
  2: 13,
  4: 33,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[10] = {
  2: 13,
  4: 34,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[11] = {
  14: [SHIFT, 35]
};
table[12] = {
  5: [REDUCE, 25],
  11: [REDUCE, 25],
  12: [REDUCE, 25],
  13: [REDUCE, 25],
  15: [REDUCE, 25],
  16: [REDUCE, 25],
  17: [REDUCE, 25],
  18: [REDUCE, 25],
  19: [REDUCE, 25],
  20: [REDUCE, 25],
  21: [REDUCE, 25],
  22: [REDUCE, 25],
  30: [REDUCE, 25],
  31: [REDUCE, 25]
};
table[13] = {
  2: 36,
  5: [REDUCE, 26],
  11: [REDUCE, 26],
  12: [REDUCE, 26],
  13: [REDUCE, 26],
  15: [REDUCE, 26],
  16: [REDUCE, 26],
  17: [REDUCE, 26],
  18: [REDUCE, 26],
  19: [REDUCE, 26],
  20: [REDUCE, 26],
  21: [REDUCE, 26],
  22: [REDUCE, 26],
  30: [REDUCE, 26],
  31: [REDUCE, 26],
  32: [SHIFT, 37],
  36: [SHIFT, 18]
};
table[14] = {
  5: [REDUCE, 36],
  11: [REDUCE, 36],
  12: [REDUCE, 36],
  13: [REDUCE, 36],
  15: [REDUCE, 36],
  16: [REDUCE, 36],
  17: [REDUCE, 36],
  18: [REDUCE, 36],
  19: [REDUCE, 36],
  20: [REDUCE, 36],
  21: [REDUCE, 36],
  22: [REDUCE, 36],
  30: [REDUCE, 36],
  31: [REDUCE, 36],
  33: [REDUCE, 36],
  36: [SHIFT, 38]
};
table[15] = {
  5: [REDUCE, 38],
  11: [REDUCE, 38],
  12: [REDUCE, 38],
  13: [REDUCE, 38],
  15: [REDUCE, 38],
  16: [REDUCE, 38],
  17: [REDUCE, 38],
  18: [REDUCE, 38],
  19: [REDUCE, 38],
  20: [REDUCE, 38],
  21: [REDUCE, 38],
  22: [REDUCE, 38],
  30: [REDUCE, 38],
  31: [REDUCE, 38],
  33: [SHIFT, 39],
  35: [REDUCE, 38],
  38: [REDUCE, 38]
};
table[16] = {
  5: [REDUCE, 28],
  11: [REDUCE, 28],
  12: [REDUCE, 28],
  13: [REDUCE, 28],
  15: [REDUCE, 28],
  16: [REDUCE, 28],
  17: [REDUCE, 28],
  18: [REDUCE, 28],
  19: [REDUCE, 28],
  20: [REDUCE, 28],
  21: [REDUCE, 28],
  22: [REDUCE, 28],
  27: [SHIFT, 40],
  30: [REDUCE, 28],
  31: [REDUCE, 28]
};
table[17] = {
  5: [REDUCE, 30],
  11: [REDUCE, 30],
  12: [REDUCE, 30],
  13: [REDUCE, 30],
  15: [REDUCE, 30],
  16: [REDUCE, 30],
  17: [REDUCE, 30],
  18: [REDUCE, 30],
  19: [REDUCE, 30],
  20: [REDUCE, 30],
  21: [REDUCE, 30],
  22: [REDUCE, 30],
  27: [SHIFT, 41],
  30: [REDUCE, 30],
  31: [REDUCE, 30]
};
table[18] = {
  32: [SHIFT, 42]
};
table[19] = {
  1: [ACCEPT, 1]
};
table[20] = {
  2: 13,
  4: 43,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[21] = {
  2: 13,
  4: 44,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[22] = {
  2: 13,
  4: 45,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[23] = {
  2: 13,
  4: 48,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  12: [SHIFT, 46],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  17: [SHIFT, 47],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[24] = {
  2: 13,
  4: 50,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  12: [SHIFT, 49],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[25] = {
  2: 13,
  4: 51,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[26] = {
  2: 13,
  4: 52,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[27] = {
  2: 13,
  4: 53,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[28] = {
  2: 13,
  4: 54,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[29] = {
  2: 13,
  4: 55,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[30] = {
  32: [SHIFT, 56]
};
table[31] = {
  5: [REDUCE, 40],
  11: [REDUCE, 40],
  12: [REDUCE, 40],
  13: [REDUCE, 40],
  15: [REDUCE, 40],
  16: [REDUCE, 40],
  17: [REDUCE, 40],
  18: [REDUCE, 40],
  19: [REDUCE, 40],
  20: [REDUCE, 40],
  21: [REDUCE, 40],
  22: [REDUCE, 40],
  30: [REDUCE, 40],
  31: [REDUCE, 40],
  35: [REDUCE, 40],
  38: [REDUCE, 40]
};
table[32] = {
  11: [SHIFT, 20],
  12: [SHIFT, 21],
  13: [SHIFT, 22],
  15: [SHIFT, 57],
  16: [SHIFT, 23],
  17: [SHIFT, 24],
  18: [SHIFT, 25],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29]
};
table[33] = {
  5: [REDUCE, 21],
  11: [SHIFT, 20],
  12: [REDUCE, 21],
  13: [REDUCE, 21],
  15: [REDUCE, 21],
  16: [REDUCE, 21],
  17: [REDUCE, 21],
  18: [REDUCE, 21],
  19: [REDUCE, 21],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 21],
  31: [REDUCE, 21]
};
table[34] = {
  5: [REDUCE, 22],
  11: [SHIFT, 20],
  12: [REDUCE, 22],
  13: [REDUCE, 22],
  15: [REDUCE, 22],
  16: [REDUCE, 22],
  17: [REDUCE, 22],
  18: [REDUCE, 22],
  19: [REDUCE, 22],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 22],
  31: [REDUCE, 22]
};
table[35] = {
  2: 13,
  4: 60,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  15: [SHIFT, 58],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  24: 59,
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  29: [SHIFT, 61],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[36] = {
  5: [REDUCE, 27],
  11: [REDUCE, 27],
  12: [REDUCE, 27],
  13: [REDUCE, 27],
  15: [REDUCE, 27],
  16: [REDUCE, 27],
  17: [REDUCE, 27],
  18: [REDUCE, 27],
  19: [REDUCE, 27],
  20: [REDUCE, 27],
  21: [REDUCE, 27],
  22: [REDUCE, 27],
  30: [REDUCE, 27],
  31: [REDUCE, 27]
};
table[37] = {36: [SHIFT, 38]};
table[38] = {32: [SHIFT, 62]};
table[39] = {34: [SHIFT, 63]};
table[40] = {26: [SHIFT, 64]};
table[41] = {28: [SHIFT, 65]};
table[42] = {37: [SHIFT, 66]};
table[43] = {
  5: [REDUCE, 7],
  11: [REDUCE, 7],
  12: [REDUCE, 7],
  13: [REDUCE, 7],
  15: [REDUCE, 7],
  16: [REDUCE, 7],
  17: [REDUCE, 7],
  18: [REDUCE, 7],
  19: [REDUCE, 7],
  20: [REDUCE, 7],
  21: [REDUCE, 7],
  22: [REDUCE, 7],
  30: [REDUCE, 7],
  31: [REDUCE, 7]
};
table[44] = {
  5: [REDUCE, 8],
  11: [SHIFT, 20],
  12: [REDUCE, 8],
  13: [SHIFT, 22],
  15: [REDUCE, 8],
  16: [SHIFT, 23],
  17: [SHIFT, 24],
  18: [SHIFT, 25],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 8],
  31: [REDUCE, 8]
};
table[45] = {
  5: [REDUCE, 9],
  11: [SHIFT, 20],
  12: [REDUCE, 9],
  13: [REDUCE, 9],
  15: [REDUCE, 9],
  16: [REDUCE, 9],
  17: [REDUCE, 9],
  18: [REDUCE, 9],
  19: [REDUCE, 9],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 9],
  31: [REDUCE, 9]
};
table[46] = {
  2: 13,
  4: 67,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[47] = {
  2: 13,
  4: 68,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[48] = {
  5: [REDUCE, 16],
  11: [SHIFT, 20],
  12: [REDUCE, 16],
  13: [SHIFT, 22],
  15: [REDUCE, 16],
  16: [REDUCE, 16],
  17: [REDUCE, 16],
  18: [REDUCE, 16],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 16],
  31: [REDUCE, 16]
};
table[49] = {
  2: 13,
  4: 69,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[50] = {
  5: [REDUCE, 15],
  11: [SHIFT, 20],
  12: [REDUCE, 15],
  13: [SHIFT, 22],
  15: [REDUCE, 15],
  16: [REDUCE, 15],
  17: [REDUCE, 15],
  18: [REDUCE, 15],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 15],
  31: [REDUCE, 15]
};
table[51] = {
  5: [REDUCE, 14],
  11: [SHIFT, 20],
  12: [REDUCE, 14],
  13: [SHIFT, 22],
  15: [REDUCE, 14],
  16: [SHIFT, 23],
  17: [SHIFT, 24],
  18: [REDUCE, 14],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 14],
  31: [REDUCE, 14]
};
table[52] = {
  5: [REDUCE, 17],
  11: [SHIFT, 20],
  12: [REDUCE, 17],
  13: [REDUCE, 17],
  15: [REDUCE, 17],
  16: [REDUCE, 17],
  17: [REDUCE, 17],
  18: [REDUCE, 17],
  19: [REDUCE, 17],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 17],
  31: [REDUCE, 17]
};
table[53] = {
  5: [REDUCE, 18],
  11: [SHIFT, 20],
  12: [REDUCE, 18],
  13: [REDUCE, 18],
  15: [REDUCE, 18],
  16: [REDUCE, 18],
  17: [REDUCE, 18],
  18: [REDUCE, 18],
  19: [REDUCE, 18],
  20: [REDUCE, 18],
  21: [REDUCE, 18],
  22: [SHIFT, 29],
  30: [REDUCE, 18],
  31: [REDUCE, 18]
};
table[54] = {
  5: [REDUCE, 19],
  11: [SHIFT, 20],
  12: [REDUCE, 19],
  13: [REDUCE, 19],
  15: [REDUCE, 19],
  16: [REDUCE, 19],
  17: [REDUCE, 19],
  18: [REDUCE, 19],
  19: [REDUCE, 19],
  20: [REDUCE, 19],
  21: [REDUCE, 19],
  22: [SHIFT, 29],
  30: [REDUCE, 19],
  31: [REDUCE, 19]
};
table[55] = {
  5: [REDUCE, 20],
  11: [SHIFT, 20],
  12: [REDUCE, 20],
  13: [REDUCE, 20],
  15: [REDUCE, 20],
  16: [REDUCE, 20],
  17: [REDUCE, 20],
  18: [REDUCE, 20],
  19: [REDUCE, 20],
  20: [REDUCE, 20],
  21: [REDUCE, 20],
  22: [REDUCE, 20],
  30: [REDUCE, 20],
  31: [REDUCE, 20]
};
table[56] = {
  5: [REDUCE, 37],
  11: [REDUCE, 37],
  12: [REDUCE, 37],
  13: [REDUCE, 37],
  15: [REDUCE, 37],
  16: [REDUCE, 37],
  17: [REDUCE, 37],
  18: [REDUCE, 37],
  19: [REDUCE, 37],
  20: [REDUCE, 37],
  21: [REDUCE, 37],
  22: [REDUCE, 37],
  30: [REDUCE, 37],
  31: [REDUCE, 37],
  33: [REDUCE, 37]
};
table[57] = {
  5: [REDUCE, 10],
  11: [REDUCE, 10],
  12: [REDUCE, 10],
  13: [REDUCE, 10],
  15: [REDUCE, 10],
  16: [REDUCE, 10],
  17: [REDUCE, 10],
  18: [REDUCE, 10],
  19: [REDUCE, 10],
  20: [REDUCE, 10],
  21: [REDUCE, 10],
  22: [REDUCE, 10],
  30: [REDUCE, 10],
  31: [REDUCE, 10]
};
table[58] = {
  5: [REDUCE, 23],
  11: [REDUCE, 23],
  12: [REDUCE, 23],
  13: [REDUCE, 23],
  15: [REDUCE, 23],
  16: [REDUCE, 23],
  17: [REDUCE, 23],
  18: [REDUCE, 23],
  19: [REDUCE, 23],
  20: [REDUCE, 23],
  21: [REDUCE, 23],
  22: [REDUCE, 23],
  30: [REDUCE, 23],
  31: [REDUCE, 23]
};
table[59] = {15: [SHIFT, 70], 30: [SHIFT, 71], 31: [SHIFT, 72]};
table[60] = {
  11: [SHIFT, 20],
  12: [SHIFT, 21],
  13: [SHIFT, 22],
  15: [REDUCE, 32],
  16: [SHIFT, 23],
  17: [SHIFT, 24],
  18: [SHIFT, 25],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 32],
  31: [REDUCE, 32]
};
table[61] = {15: [REDUCE, 33], 30: [REDUCE, 33], 31: [REDUCE, 33]};
table[62] = {37: [SHIFT, 73]};
table[63] = {
  5: [REDUCE, 39],
  11: [REDUCE, 39],
  12: [REDUCE, 39],
  13: [REDUCE, 39],
  15: [REDUCE, 39],
  16: [REDUCE, 39],
  17: [REDUCE, 39],
  18: [REDUCE, 39],
  19: [REDUCE, 39],
  20: [REDUCE, 39],
  21: [REDUCE, 39],
  22: [REDUCE, 39],
  30: [REDUCE, 39],
  31: [REDUCE, 39],
  35: [REDUCE, 39],
  38: [REDUCE, 39]
};
table[64] = {
  5: [REDUCE, 29],
  11: [REDUCE, 29],
  12: [REDUCE, 29],
  13: [REDUCE, 29],
  15: [REDUCE, 29],
  16: [REDUCE, 29],
  17: [REDUCE, 29],
  18: [REDUCE, 29],
  19: [REDUCE, 29],
  20: [REDUCE, 29],
  21: [REDUCE, 29],
  22: [REDUCE, 29],
  30: [REDUCE, 29],
  31: [REDUCE, 29]
};
table[65] = {
  5: [REDUCE, 31],
  11: [REDUCE, 31],
  12: [REDUCE, 31],
  13: [REDUCE, 31],
  15: [REDUCE, 31],
  16: [REDUCE, 31],
  17: [REDUCE, 31],
  18: [REDUCE, 31],
  19: [REDUCE, 31],
  20: [REDUCE, 31],
  21: [REDUCE, 31],
  22: [REDUCE, 31],
  30: [REDUCE, 31],
  31: [REDUCE, 31]
};
table[66] = {
  5: [REDUCE, 41],
  11: [REDUCE, 41],
  12: [REDUCE, 41],
  13: [REDUCE, 41],
  15: [REDUCE, 41],
  16: [REDUCE, 41],
  17: [REDUCE, 41],
  18: [REDUCE, 41],
  19: [REDUCE, 41],
  20: [REDUCE, 41],
  21: [REDUCE, 41],
  22: [REDUCE, 41],
  30: [REDUCE, 41],
  31: [REDUCE, 41],
  32: [REDUCE, 41],
  36: [REDUCE, 41]
};
table[67] = {
  5: [REDUCE, 11],
  11: [SHIFT, 20],
  12: [REDUCE, 11],
  13: [SHIFT, 22],
  15: [REDUCE, 11],
  16: [REDUCE, 11],
  17: [REDUCE, 11],
  18: [REDUCE, 11],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 11],
  31: [REDUCE, 11]
};
table[68] = {
  5: [REDUCE, 13],
  11: [SHIFT, 20],
  12: [REDUCE, 13],
  13: [SHIFT, 22],
  15: [REDUCE, 13],
  16: [REDUCE, 13],
  17: [REDUCE, 13],
  18: [REDUCE, 13],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 13],
  31: [REDUCE, 13]
};
table[69] = {
  5: [REDUCE, 12],
  11: [SHIFT, 20],
  12: [REDUCE, 12],
  13: [SHIFT, 22],
  15: [REDUCE, 12],
  16: [REDUCE, 12],
  17: [REDUCE, 12],
  18: [REDUCE, 12],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 12],
  31: [REDUCE, 12]
};
table[70] = {
  5: [REDUCE, 24],
  11: [REDUCE, 24],
  12: [REDUCE, 24],
  13: [REDUCE, 24],
  15: [REDUCE, 24],
  16: [REDUCE, 24],
  17: [REDUCE, 24],
  18: [REDUCE, 24],
  19: [REDUCE, 24],
  20: [REDUCE, 24],
  21: [REDUCE, 24],
  22: [REDUCE, 24],
  30: [REDUCE, 24],
  31: [REDUCE, 24]
};
table[71] = {
  2: 13,
  4: 74,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  12: [SHIFT, 21],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[72] = {
  2: 13,
  4: 75,
  6: 3,
  7: [SHIFT, 4],
  8: [SHIFT, 5],
  9: 6,
  10: [SHIFT, 7],
  12: [SHIFT, 21],
  13: [SHIFT, 10],
  14: [SHIFT, 8],
  19: [SHIFT, 9],
  23: [SHIFT, 11],
  25: 12,
  26: [SHIFT, 16],
  28: [SHIFT, 17],
  32: [SHIFT, 14],
  34: [SHIFT, 15],
  36: [SHIFT, 18]
};
table[73] = {
  5: [REDUCE, 42],
  11: [REDUCE, 42],
  12: [REDUCE, 42],
  13: [REDUCE, 42],
  15: [REDUCE, 42],
  16: [REDUCE, 42],
  17: [REDUCE, 42],
  18: [REDUCE, 42],
  19: [REDUCE, 42],
  20: [REDUCE, 42],
  21: [REDUCE, 42],
  22: [REDUCE, 42],
  30: [REDUCE, 42],
  31: [REDUCE, 42],
  32: [REDUCE, 42],
  36: [REDUCE, 42]
};
table[74] = {
  11: [SHIFT, 20],
  12: [SHIFT, 21],
  13: [SHIFT, 22],
  15: [REDUCE, 34],
  16: [SHIFT, 23],
  17: [SHIFT, 24],
  18: [SHIFT, 25],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 34],
  31: [REDUCE, 34]
};
table[75] = {
  11: [SHIFT, 20],
  12: [SHIFT, 21],
  13: [SHIFT, 22],
  15: [REDUCE, 35],
  16: [SHIFT, 23],
  17: [SHIFT, 24],
  18: [SHIFT, 25],
  19: [SHIFT, 26],
  20: [SHIFT, 27],
  21: [SHIFT, 28],
  22: [SHIFT, 29],
  30: [REDUCE, 35],
  31: [REDUCE, 35]
};
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

        // LexActions are always:
        //   Shift: continue to process tokens.
        //   Reduce: enough tokens have been gathered to reduce input through evaluation.
        //   Accept: return.
        switch (action[0]) {
          case SHIFT: // Shift
            stack.push(symbol);
            semanticValueStack.push(lexer.yytext);
            locationStack.push(lexer.yylloc);
            stack.push(action[1]); // push state
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
          tempMatch = this._input.match(this.rules[rules[i]]);
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

      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },

      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        let n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },

      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions["INITIAL"].rules;
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
      rules: RULES,
      conditions: {
        "INITIAL": {
          "rules": [
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