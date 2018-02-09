import {
  ObjectBuilder
} from "../Utilities/ObjectBuilder";

// Rules represent the Regular Expressions that will be used in sequence to match a given input to the Parser.
const WHITE_SPACE_RULE = /^(?:\s+)/;
const DOUBLE_QUOTES_RULE = /^(?:"(\\["]|[^"])*")/;
const SINGLE_QUOTES_RULE = /^(?:'(\\[']|[^'])*')/;
const FORMULA_NAME_RULE = /^(?:[A-Za-z.]{1,}[A-Za-z_0-9]+(?=[(]))/;
const $_A1_CELL_RULE = /^(?:\$[A-Za-z]+\$[0-9]+)/;
const A1_CELL_RULE = /^(?:[A-Za-z]+[0-9]+)/;
const FORMULA_NAME_SIMPLE_RULE = /^(?:[A-Za-z.]+(?=[(]))/;
const VARIABLE_RULE = /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/;
const SIMPLE_VARIABLE_RILE = /^(?:[A-Za-z_]+)/;
const INTEGER_RULE = /^(?:[0-9]+(?:(?:[eE])(?:[\+-])?[0-9]+)?)/;
const OPEN_AND_CLOSE_OF_ARRAY_RULE = /^(?:\[([^\]]*)?\])/;
const DOLLAR_SIGN_RULE = /^(?:\$)/;
const AMPERSAND_SIGN_RULE = /^(?:&)/;
const SINGLE_WHITESPACE_RULE = /^(?: )/;
const PERIOD_RULE = /^(?:[.])/;
const COLON_RULE = /^(?::)/;
const SEMI_COLON_RULE = /^(?:;)/;
const COMMA_RULE = /^(?:,)/;
const ASTERISK_RULE = /^(?:\*)/;
const FORWARD_SLASH_RULE = /^(?:\/)/;
const MINUS_SIGN_RULE = /^(?:-)/;
const PLUS_SIGN_RULE = /^(?:\+)/;
const CARET_SIGN_RULE = /^(?:\^)/;
const OPEN_PAREN_RULE = /^(?:\()/;
const CLOSE_PAREN_RULE = /^(?:\))/;
const GREATER_THAN_SIGN_RULE = /^(?:>)/;
const LESS_THAN_SIGN_RULE = /^(?:<)/;
const OPEN_DOUBLE_QUOTE = /^(?:")/;
const OPEN_SINGLE_QUITE = /^(?:')/;
const EXCLAMATION_POINT_RULE = /^(?:!)/;
const EQUALS_SIGN_RULE = /^(?:=)/;
const PERCENT_SIGN_RULE = /^(?:%)/;
const FULL_ERROR_RULE = /^(?:#N\/A|#NUM\!|#NULL\!|#DIV\/0\!|#VALUE\!|#REF\!|#ERROR)/;
const END_OF_STRING_RULE = /^(?:$)/;


const enum RuleIndex {
  WHITE_SPACE = 0,
  DOUBLE_QUOTES = 1,
  SINGLE_QUOTES = 2,
  FORMULA_NAME = 3,
  $_A1_CELL = 6,
  A1_CELL = 7,
  FORMULA_NAME_SIMPLE = 8,
  VARIABLE = 9,
  SIMPLE_VARIABLE = 10,
  INTEGER = 11,
  OPEN_AND_CLOSE_OF_ARRAY = 12,
  DOLLAR_SIGN = 13,
  AMPERSAND_SIGN = 14,
  SINGLE_WHITESPACE = 15,
  PERIOD = 16,
  COLON = 17,
  SEMI_COLON = 18,
  COMMA = 19,
  ASTERISK = 20,
  FORWARD_SLASH = 21,
  MINUS_SIGN = 22,
  PLUS_SIGN = 23,
  CARET_SIGN = 24,
  OPEN_PAREN = 25,
  CLOSE_PAREN = 26,
  GREATER_THAN_SIGN = 27,
  LESS_THAN_SIGN = 28,
  OPEN_DOUBLE_QUOTE = 30,
  OPEN_SINGLE_QUITE = 31,
  EXCLAMATION_POINT_RULE = 32,
  EQUALS_SIGN = 33,
  PERCENT_SIGN = 34,
  FULL_ERROR = 35,
  END_OF_STRING = 36
};


// Sequential rules to use when parsing a given input.
let RULES = [];
RULES[RuleIndex.WHITE_SPACE] = WHITE_SPACE_RULE;
RULES[RuleIndex.DOUBLE_QUOTES] = DOUBLE_QUOTES_RULE;
RULES[RuleIndex.SINGLE_QUOTES] = SINGLE_QUOTES_RULE;
RULES[RuleIndex.FORMULA_NAME] = FORMULA_NAME_RULE;
RULES[RuleIndex.$_A1_CELL] = $_A1_CELL_RULE;
RULES[RuleIndex.A1_CELL] = A1_CELL_RULE;
RULES[RuleIndex.FORMULA_NAME_SIMPLE] = FORMULA_NAME_SIMPLE_RULE;
RULES[RuleIndex.VARIABLE] = VARIABLE_RULE;
RULES[RuleIndex.SIMPLE_VARIABLE] = SIMPLE_VARIABLE_RILE;
RULES[RuleIndex.INTEGER] = INTEGER_RULE;
RULES[RuleIndex.OPEN_AND_CLOSE_OF_ARRAY] = OPEN_AND_CLOSE_OF_ARRAY_RULE;
RULES[RuleIndex.DOLLAR_SIGN] = DOLLAR_SIGN_RULE;
RULES[RuleIndex.AMPERSAND_SIGN] = AMPERSAND_SIGN_RULE;
RULES[RuleIndex.SINGLE_WHITESPACE] = SINGLE_WHITESPACE_RULE;
RULES[RuleIndex.PERIOD] = PERIOD_RULE;
RULES[RuleIndex.COLON] = COLON_RULE;
RULES[RuleIndex.SEMI_COLON] = SEMI_COLON_RULE;
RULES[RuleIndex.COMMA] = COMMA_RULE;
RULES[RuleIndex.ASTERISK] = ASTERISK_RULE;
RULES[RuleIndex.FORWARD_SLASH] = FORWARD_SLASH_RULE;
RULES[RuleIndex.MINUS_SIGN] = MINUS_SIGN_RULE;
RULES[RuleIndex.PLUS_SIGN] = PLUS_SIGN_RULE;
RULES[RuleIndex.CARET_SIGN] = CARET_SIGN_RULE;
RULES[RuleIndex.OPEN_PAREN] = OPEN_PAREN_RULE;
RULES[RuleIndex.CLOSE_PAREN] = CLOSE_PAREN_RULE;
RULES[RuleIndex.GREATER_THAN_SIGN] = GREATER_THAN_SIGN_RULE;
RULES[RuleIndex.LESS_THAN_SIGN] = LESS_THAN_SIGN_RULE;
RULES[RuleIndex.OPEN_DOUBLE_QUOTE] = OPEN_DOUBLE_QUOTE;
RULES[RuleIndex.OPEN_SINGLE_QUITE] = OPEN_SINGLE_QUITE;
RULES[RuleIndex.EXCLAMATION_POINT_RULE] = EXCLAMATION_POINT_RULE;
RULES[RuleIndex.EQUALS_SIGN] = EQUALS_SIGN_RULE;
RULES[RuleIndex.PERCENT_SIGN] = PERCENT_SIGN_RULE;
RULES[RuleIndex.FULL_ERROR] = FULL_ERROR_RULE;
RULES[RuleIndex.END_OF_STRING] = END_OF_STRING_RULE;


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
  AS_NUMBER = 5,
  AS_STRING = 6,
  AMPERSAND = 7,
  EQUALS = 8,
  PLUS = 9,
  LAST_NUMBER = 10,
  LTE = 11,
  GTE = 12,
  NOT_EQ = 13,
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
  CELL_VALUE_AS_EXPRESSION = 25,
  ERROR_AND_CONTINUE = 26,
  ERROR_AND_CONTINUE_WITH_OTHER_ERRORS = 27,
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

enum Symbol {
  ACCEPT = 0,
  END = 1,
  ERROR = 2,
  EXPRESSIONS = 3,
  EXPRESSION = 4,
  EOF = 5,
  VARIABLE_SEQUENCE = 6,
  NUMBER = 9,
  STRING = 10,
  AMPERSAND = 11,
  EQUALS = 12,
  PLUS = 13,
  LEFT_PAREN = 14,
  RIGHT_PAREN = 15,
  LESS_THAN = 16,
  GREATER_THAN = 17,
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
  FULL_ERROR = 36,
  EXCLAMATION_POINT = 37
}

/**
 * Represents the length to reduce the stack by, and the replacement symbol that will replace those tokens in the stack.
 */
class ReductionPair {
  private lengthToReduceStackBy : number;
  private replacementSymbol : number;
  constructor(replacementSymbol : number, length : number) {
    this.lengthToReduceStackBy = length;
    this.replacementSymbol = replacementSymbol;
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
  getReplacementSymbol() : number {
    return this.replacementSymbol;
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
productions[ReduceActions.RETURN_LAST] = new ReductionPair(Symbol.EXPRESSIONS, 2);
productions[ReduceActions.CALL_VARIABLE] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[ReduceActions.AS_NUMBER] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[ReduceActions.AS_STRING] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[ReduceActions.AMPERSAND] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.EQUALS] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.PLUS] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.LAST_NUMBER] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.LTE] = new ReductionPair(Symbol.EXPRESSION, 4);
productions[ReduceActions.GTE] = new ReductionPair(Symbol.EXPRESSION, 4);
productions[ReduceActions.NOT_EQ] = new ReductionPair(Symbol.EXPRESSION, 4);
productions[ReduceActions.GT] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.LT] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.MINUS] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.MULTIPLY] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.DIVIDE] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.TO_POWER] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.INVERT_NUM] = new ReductionPair(Symbol.EXPRESSION, 2);
productions[ReduceActions.TO_NUMBER_NAN_AS_ZERO] = new ReductionPair(Symbol.EXPRESSION, 2);
productions[ReduceActions.CALL_FUNCTION_LAST_BLANK] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK] = new ReductionPair(Symbol.EXPRESSION, 4);
productions[ReduceActions.CELL_VALUE_AS_EXPRESSION] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[ReduceActions.ERROR_AND_CONTINUE] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS] = new ReductionPair(Symbol.EXPRESSION, 2);
productions[ReduceActions.FIXED_CELL_VAL] = new ReductionPair(Symbol.CELL, 1);
productions[ReduceActions.FIXED_CELL_RANGE_VAL] = new ReductionPair(Symbol.CELL, 3);
productions[ReduceActions.CELL_VALUE] = new ReductionPair(Symbol.CELL, 1);
productions[ReduceActions.CELL_RANGE_VALUE] = new ReductionPair(Symbol.CELL, 3);
productions[ReduceActions.ENSURE_IS_ARRAY] = new ReductionPair(Symbol.EXP_SEQ, 1);
productions[ReduceActions.ENSURE_YYTEXT_ARRAY] = new ReductionPair(Symbol.EXP_SEQ, 1);
productions[ReduceActions.REDUCE_INT] = new ReductionPair(Symbol.EXP_SEQ, 3);
productions[ReduceActions.REDUCE_PERCENT] = new ReductionPair(Symbol.EXP_SEQ, 3);
productions[ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY] = new ReductionPair(Symbol.VARIABLE_SEQUENCE, 1);
productions[ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH] = new ReductionPair(Symbol.VARIABLE_SEQUENCE, 3);
productions[ReduceActions.REFLEXIVE_REDUCE] = new ReductionPair(Symbol.NUMBER, 1);
productions[ReduceActions.REDUCE_FLOAT] = new ReductionPair(Symbol.NUMBER, 3);
productions[ReduceActions.REDUCE_PREV_AS_PERCENT] = new ReductionPair(Symbol.NUMBER, 2);
productions[ReduceActions.REDUCE_LAST_THREE_A] = new ReductionPair(Symbol.ERROR, 3);
productions[ReduceActions.REDUCE_LAST_THREE_B] = new ReductionPair(Symbol.ERROR, 4);
productions[ReduceActions.AS_ERROR] = new ReductionPair(Symbol.EXPRESSION, 1);

const PRODUCTIONS = productions;

const SYMBOL_NAME_TO_INDEX = {
  "$accept": Symbol.ACCEPT,
  "$end": Symbol.END,
  "error": Symbol.ERROR,
  "expressions": Symbol.EXPRESSIONS,
  "expression": Symbol.EXPRESSION,
  "EOF": Symbol.EOF,
  "variableSequence": Symbol.VARIABLE_SEQUENCE,
  "number": Symbol.NUMBER,
  "STRING": Symbol.STRING,
  "&": Symbol.AMPERSAND,
  "=": Symbol.EQUALS,
  "+": Symbol.PLUS,
  "(": Symbol.LEFT_PAREN,
  ")": Symbol.RIGHT_PAREN,
  "<": Symbol.LESS_THAN,
  ">": Symbol.GREATER_THAN,
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
  "#": Symbol.FULL_ERROR,
  "!": Symbol.EXCLAMATION_POINT
};
let symbolIndexToName = {};
symbolIndexToName[Symbol.EOF] = "EOF";
symbolIndexToName[Symbol.STRING] = "STRING";
symbolIndexToName[Symbol.AMPERSAND] = "&";
symbolIndexToName[Symbol.EQUALS] = "=";
symbolIndexToName[Symbol.PLUS] = "+";
symbolIndexToName[Symbol.LEFT_PAREN] = "(";
symbolIndexToName[Symbol.RIGHT_PAREN] = ")";
symbolIndexToName[Symbol.LESS_THAN] = "<";
symbolIndexToName[Symbol.GREATER_THAN] = ">";
symbolIndexToName[Symbol.MINUS] = "-";
symbolIndexToName[Symbol.ASTERISK] = "*";
symbolIndexToName[Symbol.DIVIDE] = "/";
symbolIndexToName[Symbol.CARROT] = "^";
symbolIndexToName[Symbol.FUNCTION] = "FUNCTION";
symbolIndexToName[Symbol.FIXEDCELL] = "FIXED_CELL_REF";
symbolIndexToName[Symbol.CELL] = "CELL";
symbolIndexToName[Symbol.COLON] = ";";
symbolIndexToName[Symbol.COMMA] = ",";
symbolIndexToName[Symbol.VARIABLE] = "VARIABLE";
symbolIndexToName[Symbol.DECIMAL] = "DECIMAL";
symbolIndexToName[Symbol.NUMBER_UPPER] = "NUMBER";
symbolIndexToName[Symbol.PERCENT] = "%";
symbolIndexToName[Symbol.FULL_ERROR] = "#";
symbolIndexToName[Symbol.ARRAY] = "ARRAY";
symbolIndexToName[Symbol.EXCLAMATION_POINT] = "!";
const SYMBOL_INDEX_TO_NAME = symbolIndexToName;


const enum State {
  // Start
  Start = 0,
  Start_Number = 6,
  Start_String = 7,
  Start_Equals = 21,
  Start_Equals_Expression = 44,
  // Number
  Number_Plus = 22,
  Number_Minus = 26,
  Number_Asterisk = 27,
  Number_Divide = 28,
  Number_Carrot = 29,
  Number_Ampersand = 20,
  Number_Percent = 31,
  // Error
  Error = 13,
  Error_Error = 36,
  // LessThan
  LessThan = 23,
  LessThan_Equals = 46,
  LessThan_GreaterThan = 47,
  LessThan_Expression = 48,
  // GreaterThan
  GreaterThan = 24,
  GreaterThan_Equals = 49,
  GreaterThan_Expression = 50,
  // Operations
  AddTwoNumbers = 45,
  SubtractTwoNumbers = 52,
  MultiplyTwoNumbers = 53,
  DivideTwoNumbers = 54,
  PowerTwoNumbers = 55,
  // Variable
  Variable = 14,
  Variable_SemiColon = 71,
  Variable_Comma = 72,
  // VariableSeq
  VariableSeq = 3,
  VariableSeq_Decimal = 30,
  VariableSeq_Decimal_Variable = 56,
  // Pound
  Pound = 18,
  Pound_Variable = 42,
  // Other
  Expressions = 1,
  Expression = 2,
  LeftParen = 8,
  PrefixUnaryMinus = 9,
  PrefixUnaryPlus = 10,
  Function = 11,
  Cell = 12,
  NumberUpper = 15,
  FixedCell = 16,
  CellUpper = 17,
  EOF_ReturnLast = 19,
  LeftParen_Expression = 32,
  PrefixUnaryMinus_Expression = 33,
  PrefixUnaryPlus_Expression = 34,
  Function_LeftParen = 35,
  Number_Ampersand_Expression = 43,
  CLOSE_PAREN_ON_EXPRESSION = 57,
  Function_LeftParen_Expression = 60,
  GTETwoExpressions = 69,
  CLOSE_PAREN_ON_FUNCTION = 70
}


/**
 * Array of to map rules to to LexActions and other rules. A single index in the object (e.g. `{2: 13}`) indicates the
 * rule object to follow for the next token, while an array (e.g. `{23: [1, ReduceActions.LTE]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
let table = [];
// All functions in the spreadsheet start with a 0-token.
table[State.Start] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSIONS, State.Expressions)
  .add(Symbol.EXPRESSION, State.Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Expressions] = ObjectBuilder
  .add(Symbol.END, [ACCEPT])
  .build();
table[State.Expression] = ObjectBuilder
  .add(Symbol.EOF, [SHIFT, State.EOF_ReturnLast])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [SHIFT, State.Start_Equals])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.LESS_THAN, [SHIFT, State.LessThan])
  .add(Symbol.GREATER_THAN, [SHIFT, State.GreaterThan])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .build();
table[State.VariableSeq] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CALL_VARIABLE])
  .add(Symbol.DECIMAL, [SHIFT, State.VariableSeq_Decimal])
  .build();
table[State.Start_Number] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.AS_NUMBER])
  .add(Symbol.PERCENT, [SHIFT, State.Number_Percent])
  .build();
table[State.Start_String] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.AS_STRING])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.AS_STRING])
  .build();
table[State.LeftParen] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.LeftParen_Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.PrefixUnaryMinus] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.PrefixUnaryMinus_Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.PrefixUnaryPlus] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.PrefixUnaryPlus_Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Function] = ObjectBuilder
  .add(Symbol.LEFT_PAREN, [SHIFT, State.Function_LeftParen])
  .build();
table[State.Cell] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CELL_VALUE_AS_EXPRESSION])
  .build();
table[State.Error] = ObjectBuilder
  .add(Symbol.ERROR, State.Error_Error)
  .add(Symbol.EOF, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.ERROR_AND_CONTINUE])
  .add(Symbol.VARIABLE, [SHIFT, 37])
  .add(Symbol.FULL_ERROR, [SHIFT, 18])
  .build();
table[State.Variable] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.DECIMAL, [REDUCE, ReduceActions.WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY])
  .add(Symbol.FULL_ERROR, [SHIFT, 38])
  .build();
table[State.NumberUpper] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(Symbol.DECIMAL, [SHIFT, 39])
  .add(Symbol.PERCENT, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .add(38, [REDUCE, ReduceActions.REFLEXIVE_REDUCE])
  .build();
table[State.FixedCell] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.COLON, [SHIFT, 40])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.FIXED_CELL_VAL])
  .build();
table[State.CellUpper] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.COLON, [SHIFT, 41])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CELL_VALUE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CELL_VALUE])
  .build();
table[State.Pound] = ObjectBuilder
  .add(Symbol.VARIABLE, [SHIFT, State.Pound_Variable])
  .add(Symbol.EOF, [REDUCE, ReduceActions.AS_ERROR])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.AS_ERROR])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.AS_ERROR])
  .build();
table[State.EOF_ReturnLast] = ObjectBuilder
  .add(Symbol.END, [REDUCE, ReduceActions.RETURN_LAST])
  .build();
table[State.Number_Ampersand] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.Number_Ampersand_Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, 18])
  .build();
table[State.Start_Equals] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.Start_Equals_Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Number_Plus] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.AddTwoNumbers)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.LessThan] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.LessThan_Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.EQUALS, [SHIFT, State.LessThan_Equals])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.GREATER_THAN, [SHIFT, State.LessThan_GreaterThan])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.GreaterThan] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.GreaterThan_Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.EQUALS, [SHIFT, State.GreaterThan_Equals])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[25] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, 51)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Number_Minus] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.SubtractTwoNumbers)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Number_Asterisk] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.MultiplyTwoNumbers)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Number_Divide] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.DivideTwoNumbers)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Number_Carrot] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.PowerTwoNumbers)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.VariableSeq_Decimal] = ObjectBuilder
  .add(Symbol.VARIABLE, [SHIFT, State.VariableSeq_Decimal_Variable])
  .build();
table[State.Number_Percent] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(Symbol.PERCENT, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .add(38, [REDUCE, ReduceActions.REDUCE_PREV_AS_PERCENT])
  .build();
table[State.LeftParen_Expression] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [SHIFT, State.Start_Equals])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [SHIFT, State.CLOSE_PAREN_ON_EXPRESSION])
  .add(Symbol.LESS_THAN, [SHIFT, State.LessThan])
  .add(Symbol.GREATER_THAN, [SHIFT, State.GreaterThan])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .build();
table[State.PrefixUnaryMinus_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.ASTERISK, [SHIFT, 27])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.INVERT_NUM])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.INVERT_NUM])
  .build();
table[State.PrefixUnaryPlus_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.TO_NUMBER_NAN_AS_ZERO])
  .build();
table[State.Function_LeftParen] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.Function_LeftParen_Expression)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.RIGHT_PAREN, [SHIFT, 58])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.EXP_SEQ, 59)
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.ARRAY, [SHIFT, 61])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Error_Error] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.ERROR_AND_CONTINUE_WITH_OTHER_ERRORS])
  .build();
table[37] = ObjectBuilder
  .add(Symbol.FULL_ERROR, [REDUCE, ReduceActions.AS_ERROR])
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
table[State.Pound_Variable] = ObjectBuilder
  .add(Symbol.EXCLAMATION_POINT, [SHIFT, 66])
  .build();
table[State.Number_Ampersand_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.AMPERSAND])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.AMPERSAND])
  .build();
table[State.Start_Equals_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.EQUALS])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.EQUALS])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.EQUALS])
  .add(Symbol.LESS_THAN, [SHIFT, State.LessThan])
  .add(Symbol.GREATER_THAN, [SHIFT, State.GreaterThan])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.EQUALS])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.EQUALS])
  .build();
table[State.AddTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.PLUS])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.PLUS])
  .build();
table[State.LessThan_Equals] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, 67)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.LessThan_GreaterThan] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, 68)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.LessThan_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LT])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.LT])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.LT])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.LT])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.LT])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.LT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.LT])
  .build();
table[State.GreaterThan_Equals] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, State.GTETwoExpressions)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.GreaterThan_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.GT])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.GT])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.GT])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.GT])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.GT])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.GT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.GT])
  .build();
table[51] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.PLUS, [SHIFT, 22])
  .add(Symbol.LESS_THAN, [SHIFT, 23])
  .add(Symbol.GREATER_THAN, [SHIFT, 24])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .build();
table[State.SubtractTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, 28])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.MINUS])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.MINUS])
  .build();
table[State.MultiplyTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.MULTIPLY])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.MULTIPLY])
  .build();
table[State.DivideTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.AMPERSAND, [SHIFT, 20]) // ???same
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.CARROT, [SHIFT, 29])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.DIVIDE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.DIVIDE])
  .build();
table[State.PowerTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.AMPERSAND, [SHIFT, 20])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.TO_POWER])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.TO_POWER])
  .build();
table[State.VariableSeq_Decimal_Variable] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .add(Symbol.DECIMAL, [REDUCE, ReduceActions.ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH])
  .build();
table[State.CLOSE_PAREN_ON_EXPRESSION] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.LAST_NUMBER])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.LAST_NUMBER])
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
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_BLANK])
  .build();
table[59] = ObjectBuilder
  .add(Symbol.RIGHT_PAREN, [SHIFT, State.CLOSE_PAREN_ON_FUNCTION])
  .add(Symbol.SEMI_COLON, [SHIFT, State.Variable_SemiColon])
  .add(Symbol.COMMA, [SHIFT, State.Variable_Comma])
  .build();
table[State.Function_LeftParen_Expression] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [SHIFT, State.Start_Equals])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.ENSURE_IS_ARRAY])
  .add(Symbol.LESS_THAN, [SHIFT, State.LessThan])
  .add(Symbol.GREATER_THAN, [SHIFT, State.GreaterThan])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
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
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.VARIABLE, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A])
  .add(Symbol.FULL_ERROR, [REDUCE, ReduceActions.REDUCE_LAST_THREE_A]).build();
table[67] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LTE])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.LTE])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.LTE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.LTE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.LTE])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.LTE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.LTE]).build();
table[68] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.NOT_EQ])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.NOT_EQ]).build();
table[State.GTETwoExpressions] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.GTE])
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.GTE])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.GTE])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.GTE])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.GTE])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.GTE])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.GTE])
  .build();
table[State.CLOSE_PAREN_ON_FUNCTION] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.CALL_FUNCTION_LAST_TWO_IN_STACK])
  .build();
table[State.Variable_SemiColon] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, 74)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.EQUALS, [SHIFT, State.Start_Equals])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[State.Variable_Comma] = ObjectBuilder
  .add(Symbol.ERROR, State.Error)
  .add(Symbol.EXPRESSION, 75)
  .add(Symbol.VARIABLE_SEQUENCE, State.VariableSeq)
  .add(Symbol.NUMBER, State.Start_Number)
  .add(Symbol.STRING, [SHIFT, State.Start_String])
  .add(Symbol.EQUALS, [SHIFT, State.Start_Equals])
  .add(Symbol.PLUS, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LEFT_PAREN, [SHIFT, State.LeftParen])
  .add(Symbol.MINUS, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.FUNCTION, [SHIFT, State.Function])
  .add(Symbol.CELL, State.Cell)
  .add(Symbol.FIXEDCELL, [SHIFT, State.FixedCell])
  .add(Symbol.CELL_UPPER, [SHIFT, State.CellUpper])
  .add(Symbol.VARIABLE, [SHIFT, State.Variable])
  .add(Symbol.NUMBER_UPPER, [SHIFT, State.NumberUpper])
  .add(Symbol.ARRAY, [SHIFT, 61])
  .add(Symbol.FULL_ERROR, [SHIFT, State.Pound])
  .build();
table[73] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.AMPERSAND, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.EQUALS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.PLUS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.LESS_THAN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.GREATER_THAN, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.MINUS, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.ASTERISK, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.DIVIDE, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.CARROT, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.VARIABLE, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .add(Symbol.FULL_ERROR, [REDUCE, ReduceActions.REDUCE_LAST_THREE_B])
  .build();
table[74] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [SHIFT, State.Start_Equals])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_INT])
  .add(Symbol.LESS_THAN, [SHIFT, State.LessThan])
  .add(Symbol.GREATER_THAN, [SHIFT, State.GreaterThan])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
  .add(Symbol.SEMI_COLON, [REDUCE, ReduceActions.REDUCE_INT])
  .add(Symbol.COMMA, [REDUCE, ReduceActions.REDUCE_INT]).build();
table[75] = ObjectBuilder
  .add(Symbol.AMPERSAND, [SHIFT, State.Number_Ampersand])
  .add(Symbol.EQUALS, [SHIFT, State.Start_Equals])
  .add(Symbol.PLUS, [SHIFT, State.Number_Plus])
  .add(Symbol.RIGHT_PAREN, [REDUCE, ReduceActions.REDUCE_PERCENT])
  .add(Symbol.LESS_THAN, [SHIFT, State.LessThan])
  .add(Symbol.GREATER_THAN, [SHIFT, State.GreaterThan])
  .add(Symbol.MINUS, [SHIFT, State.Number_Minus])
  .add(Symbol.ASTERISK, [SHIFT, State.Number_Asterisk])
  .add(Symbol.DIVIDE, [SHIFT, State.Number_Divide])
  .add(Symbol.CARROT, [SHIFT, State.Number_Carrot])
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
  PRODUCTIONS,
  RuleIndex
}