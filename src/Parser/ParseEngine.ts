import {
  ObjectBuilder
} from "./ObjectBuilder";
import {
  constructErrorByName,
  ParseError
} from "../Errors";
import {
  Formulas
} from "../Formulas";
import {
  isUndefined
} from "../Utilities/MoreUtils";

const enum RuleIndex {
  WHITE_SPACE = 0,
  DOUBLE_QUOTES = 1,
  SINGLE_QUOTES = 2,
  FORMULA = 3,
  $_A1_CELL = 4,
  A1_CELL = 5,
  FORMULA_NAME_SIMPLE = 6,
  VARIABLE = 7,
  SIMPLE_VARIABLE = 8,
  INTEGER = 9,
  OPEN_ARRAY = 10,
  CLOSE_ARRAY = 11,
  DOLLAR_SIGN = 12,
  AMPERSAND_SIGN = 13,
  SINGLE_WHITESPACE = 14,
  PERIOD = 15,
  COLON = 16,
  SEMI_COLON = 17,
  COMMA = 18,
  ASTERISK = 19,
  FORWARD_SLASH = 20,
  MINUS_SIGN = 21,
  PLUS_SIGN = 22,
  CARET_SIGN = 23,
  OPEN_PAREN = 24,
  CLOSE_PAREN = 25,
  GREATER_THAN_SIGN = 26,
  LESS_THAN_SIGN = 27,
  DOUBLE_QUOTE = 28,
  SINGLE_QUITE = 29,
  EXCLAMATION_POINT = 30,
  EQUALS_SIGN = 31,
  PERCENT_SIGN = 32,
  POUND = 33,
  ERROR = 34,
  END = 35,
}

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
let rulesSeqTemp = [];
rulesSeqTemp[RuleIndex.WHITE_SPACE] = Rules.WHITE_SPACE;
rulesSeqTemp[RuleIndex.DOUBLE_QUOTE] = Rules.DOUBLE_QUOTE;
rulesSeqTemp[RuleIndex.SINGLE_QUOTES] = Rules.SINGLE_QUOTES;
rulesSeqTemp[RuleIndex.FORMULA] = Rules.FORMULA_NAME;
rulesSeqTemp[RuleIndex.$_A1_CELL] = Rules.$_A1_CELL;
rulesSeqTemp[RuleIndex.A1_CELL] = Rules.A1_CELL;
rulesSeqTemp[RuleIndex.FORMULA_NAME_SIMPLE] = Rules.FORMULA_NAME_SIMPLE;
rulesSeqTemp[RuleIndex.VARIABLE] = Rules.VARIABLE;
rulesSeqTemp[RuleIndex.SIMPLE_VARIABLE] = Rules.SIMPLE_VARIABLE;
rulesSeqTemp[RuleIndex.INTEGER] = Rules.INTEGER;
rulesSeqTemp[RuleIndex.OPEN_ARRAY] = Rules.OPEN_ARRAY;
rulesSeqTemp[RuleIndex.CLOSE_ARRAY] = Rules.CLOSE_ARRAY;
rulesSeqTemp[RuleIndex.AMPERSAND_SIGN] = Rules.AMPERSAND_SIGN;
rulesSeqTemp[RuleIndex.SINGLE_WHITESPACE] = Rules.SINGLE_WHITESPACE;
rulesSeqTemp[RuleIndex.PERIOD] = Rules.PERIOD;
rulesSeqTemp[RuleIndex.COLON] = Rules.COLON;
rulesSeqTemp[RuleIndex.SEMI_COLON] = Rules.SEMI_COLON;
rulesSeqTemp[RuleIndex.COMMA] = Rules.COMMA;
rulesSeqTemp[RuleIndex.ASTERISK] = Rules.ASTERISK;
rulesSeqTemp[RuleIndex.FORWARD_SLASH] = Rules.FORWARD_SLASH;
rulesSeqTemp[RuleIndex.MINUS_SIGN] = Rules.MINUS_SIGN;
rulesSeqTemp[RuleIndex.PLUS_SIGN] = Rules.PLUS_SIGN;
rulesSeqTemp[RuleIndex.CARET_SIGN] = Rules.CARET_SIGN;
rulesSeqTemp[RuleIndex.OPEN_PAREN] = Rules.OPEN_PAREN;
rulesSeqTemp[RuleIndex.CLOSE_PAREN] = Rules.CLOSE_PAREN;
rulesSeqTemp[RuleIndex.GREATER_THAN_SIGN] = Rules.GREATER_THAN_SIGN;
rulesSeqTemp[RuleIndex.LESS_THAN_SIGN] = Rules.LESS_THAN_SIGN;
rulesSeqTemp[RuleIndex.DOUBLE_QUOTE] = Rules.DOUBLE_QUOTE;
rulesSeqTemp[RuleIndex.SINGLE_QUITE] = Rules.SINGLE_QUITE;
rulesSeqTemp[RuleIndex.EXCLAMATION_POINT] = Rules.EXCLAMATION_POINT;
rulesSeqTemp[RuleIndex.EQUALS_SIGN] = Rules.EQUALS_SIGN;
rulesSeqTemp[RuleIndex.PERCENT_SIGN] = Rules.PERCENT_SIGN;
rulesSeqTemp[RuleIndex.POUND] = Rules.POUND;
rulesSeqTemp[RuleIndex.ERROR] = Rules.ERROR;
rulesSeqTemp[RuleIndex.END] = Rules.END;

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

let symbolIndexToName = {};
symbolIndexToName[Symbol.ACCEPT] = "ACCEPT";
symbolIndexToName[Symbol.END] = "END";
symbolIndexToName[Symbol.ERROR] = "ERROR";
symbolIndexToName[Symbol.EXPRESSIONS] = "EXPRESSIONS";
symbolIndexToName[Symbol.EXPRESSION] = "EXPRESSION";
symbolIndexToName[Symbol.EOF] = "EOF";
symbolIndexToName[Symbol.VARIABLE] = "VARIABLE";
symbolIndexToName[Symbol.VARIABLE_SEQUENCE] = "VARIABLE_SEQUENCE";
symbolIndexToName[Symbol.NUMBER] = "NUMBER";
symbolIndexToName[Symbol.STRING] = "STRING";
symbolIndexToName[Symbol.FORMULA] = "FORMULA";
symbolIndexToName[Symbol.CELL_REF] = "CELL_REF";
symbolIndexToName[Symbol.FIXED_CELL_REF] = "FIXED_CELL_REF";
symbolIndexToName[Symbol.CELL] = "CELL";
symbolIndexToName[Symbol.OPEN_ARRAY] = "OPEN_ARRAY";
symbolIndexToName[Symbol.CLOSE_ARRAY] = "CLOSE_ARRAY";
symbolIndexToName[Symbol.PERIOD] = ".";
symbolIndexToName[Symbol.AMPERSAND] = "&";
symbolIndexToName[Symbol.EQUALS] = "=";
symbolIndexToName[Symbol.PLUS] = "+";
symbolIndexToName[Symbol.OPEN_PAREN] = "(";
symbolIndexToName[Symbol.CLOSE_PAREN] = ")";
symbolIndexToName[Symbol.LESS_THAN] = "<";
symbolIndexToName[Symbol.GREATER_THAN] = ">";
symbolIndexToName[Symbol.MINUS] = "-";
symbolIndexToName[Symbol.ASTERISK] = "*";
symbolIndexToName[Symbol.DIVIDE] = "/";
symbolIndexToName[Symbol.CARROT] = "^";
symbolIndexToName[Symbol.SEMI_COLON] = ";";
symbolIndexToName[Symbol.COLON] = ";";
symbolIndexToName[Symbol.COMMA] = ",";
symbolIndexToName[Symbol.PERCENT] = "%";
symbolIndexToName[Symbol.POUND] = "#";
symbolIndexToName[Symbol.EXCLAMATION_POINT] = "!";
symbolIndexToName[Symbol.WHITE_SPACE] = "WHITE_SPACE";
const SYMBOL_INDEX_TO_NAME = symbolIndexToName;


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
  EXPRESSION = 30,
  AS_ARRAY = 31
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
productions[ReduceActions.AS_ARRAY] = new ReductionPair(Tree.VARIABLE, 1);
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
  .add(Symbol.NUMBER, Tree.VARIABLE)
  .add(Symbol.WHITE_SPACE, Tree.START)
  .add(Symbol.END, Tree.TERMINATE)
  .build();
table[Tree.VARIABLE] = ObjectBuilder
  .add(Symbol.PLUS, [SHIFT, ReduceActions.PLUS])
  .add(Symbol.MINUS, [SHIFT, ReduceActions.MINUS])
  .add(Symbol.ASTERISK, [SHIFT, ReduceActions.MULTIPLY])
  .add(Symbol.DIVIDE, [SHIFT, ReduceActions.DIVIDE])
  .add(Symbol.CARROT, [SHIFT, ReduceActions.TO_POWER])
  .add(Symbol.PERCENT, [REDUCE, ReduceActions.PERCENT])
  .add(Symbol.AMPERSAND, [SHIFT, ReduceActions.AMPERSAND])
  .add(Symbol.WHITE_SPACE, Tree.TERMINATE)
  .add(Symbol.END, Tree.TERMINATE)
  .build();
table[Tree.PLUS] = ObjectBuilder
  .add(Symbol.VARIABLE, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.MINUS] = ObjectBuilder
  .add(Symbol.VARIABLE, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.ASTERISK] = ObjectBuilder
  .add(Symbol.VARIABLE, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.SLASH] = ObjectBuilder
  .add(Symbol.VARIABLE, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.CARROT] = ObjectBuilder
  .add(Symbol.VARIABLE, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.AMPERSAND] = ObjectBuilder
  .add(Symbol.VARIABLE, null)
  .add(Symbol.CELL_REF, null)
  .add(Symbol.FIXED_CELL_REF, null)
  .add(Symbol.POUND, null)
  .add(Symbol.FORMULA, null)
  .add(Symbol.OPEN_PAREN, null)
  .add(Symbol.OPEN_ARRAY, null)
  .add(Symbol.WHITE_SPACE, null)
  .build();
table[Tree.EXPRESSION] = null;
table[Tree.INVERT_NEXT] = null;
table[Tree.TERMINATE] = ObjectBuilder
  .add(Symbol.END, [ACCEPT, ReduceActions.RETURN_LAST])
  .build();
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
          case ReduceActions.INVERT_NUMBER:
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
          case ReduceActions.AS_ERROR:
            this.$ = constructErrorByName(virtualStack[vsl]);
            break;
        }
      } catch (e) {
        if (catchOnFailure) {
          // NOTE: I'm not sure if some of these ReduceAction map correctly in the case of an error.
          switch (reduceActionToPerform) {
            case ReduceActions.RETURN_LAST:
              return virtualStack[vsl - 1];
            case ReduceActions.CALL_VARIABLE:
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
            case ReduceActions.CALL_FUNCTION:
            case ReduceActions.FIXED_CELL_VAL:
            case ReduceActions.FIXED_CELL_RANGE_VAL:
            case ReduceActions.CELL_VALUE:
            case ReduceActions.CELL_RANGE_VALUE:
              this.$ = e;
              break;
            case ReduceActions.INVERT_NUMBER:
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

      let ranges = false;

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
          console.log(action, state, symbol);
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
              if (isUndefined(state)) {
                return false;
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
              if (SYMBOL_INDEX_TO_NAME[p]) {
                expected.push(SYMBOL_INDEX_TO_NAME[p]);
                expectedIndexes.push(p);
              }
            }
            if (lexer.showPosition) {
              errStr = 'Parse error on line ' + (yylineno + 1) + ":  " + lexer.showPosition() + "  Expecting " + expected.join(', ') + ", got " + (SYMBOL_INDEX_TO_NAME[symbol] || symbol);
            } else {
              errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " +
                (symbol == EOF ? "end of input" :
                  ("'" + (SYMBOL_INDEX_TO_NAME[symbol] || symbol) + "'"));
            }
            this.parseError(errStr, {
              text: lexer.match,
              token: SYMBOL_INDEX_TO_NAME[symbol] || symbol,
              tokenIndex: symbol,
              line: lexer.yylineno,
              loc: yyloc,
              expected: expected,
              expectedIndexes: expectedIndexes,
              state: state,
              tableState: tableState,
              stack: stack,
              semanticValueStack: semanticValueStack
            });
          }
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
        return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
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
          tempMatch = this._input.match(RulesSeq[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          console.log("match", match, "index", index, "token", token);
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
          case 7:
            return ReduceActions.FIXED_CELL_VAL;
          case 8:
            return ReduceActions.CALL_FUNCTION_LAST_BLANK;
          case 9:
            return ReduceActions.AS_NUMBER;
          case 12:
            return ReduceActions.FIXED_CELL_RANGE_VAL;
          case 13:
            // skip whitespace??
            break;
          case 14:
            return ReduceActions.LTE;
          case 15:
            return ' ';
          case 18:
            return ReduceActions.CELL_VALUE;
          case 19:
            return ReduceActions.CELL_RANGE_VALUE;
          case 20:
            return ReduceActions.TO_POWER;
          case 21:
            return ReduceActions.INVERT_NUMBER;
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