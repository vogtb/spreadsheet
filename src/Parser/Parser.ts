import {
  ObjectFromPairs
} from "../Utilities/ObjectFromPairs";
import {
  PARSE_ERROR,
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
const enum LexActions {
  SHIFT = 1,
  REDUCE,
  ACCEPT
}

const enum ReduceActions {
  NO_ACTION = 0,
  RETURN_LAST,
  CALL_VARIABLE,
  TIME_CALL_TRUE,
  TIME_CALL,
  AS_NUMBER,
  AS_STRING,
  AMPERSAND,
  EQUALS,
  PLUS,
  LAST_NUMBER,
  LTE,
  GTE,
  NOT_EQ,
  NOT,
  GT,
  LT,
  MINUS,
  MULTIPLY,
  DIVIDE,
  TO_POWER,
  INVERT_NUM,
  TO_NUMBER_NAN_AS_ZERO,
  CALL_FUNCTION_LAST_BLANK,
  CALL_FUNCTION_LAST_TWO_IN_STACK,
  I25,
  I26,
  I27,
  FIXED_CELL_VAL,
  FIXED_CELL_RANGE_VAL,
  CELL_VALUE,
  CELL_RANGE_VALUE,
  ENSURE_IS_ARRAY,
  ENSURE_YYTEXT_ARRAY,
  REDUCE_INT,
  REDUCE_PERCENT,
  WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY,
  ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH,
  REFLEXIVE_REDUCE,
  REDUCE_FLOAT,
  REDUCE_PREV_AS_PERCENT,
  REDUCE_LAST_THREE_A,
  REDUCE_LAST_THREE_B
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

/**
 * Parser initially generated by jison 0.4.15, but modified for readability and extensibility.
 */
let Parser = (function () {
  /**
   * Extend object obj by keys k, and values v for each k.
   * @param k - keys to extend object by.
   * @param v - value set for each key k.
   * @param obj - object to extend.
   * @param l
   * @returns {Object}
   */
  const extendRules = function (k, v, obj?, l?) {
    for (obj = obj || {}, l = k.length; l--; obj[k[l]] = v) {}
    return obj;
  };
  const $V0 = [LexActions.SHIFT, 4];
  const $V1 = [LexActions.SHIFT, 5];
  const $V2 = [LexActions.SHIFT, 7];
  const $V3 = [LexActions.SHIFT, 10];
  const $V4 = [LexActions.SHIFT, 8];
  const $V5 = [LexActions.SHIFT, 9];
  const $V6 = [LexActions.SHIFT, 11];
  const $V7 = [LexActions.SHIFT, 16];
  const $V8 = [LexActions.SHIFT, 17];
  const $V9 = [LexActions.SHIFT, 14];
  const $Va = [LexActions.SHIFT, 15];
  const $Vb = [LexActions.SHIFT, 18];
  const $Vc = [LexActions.SHIFT, 20];
  const $Vd = [LexActions.SHIFT, 21];
  const $Ve = [LexActions.SHIFT, 22];
  const $Vf = [LexActions.SHIFT, 23];
  const $Vg = [LexActions.SHIFT, 24];
  const $Vh = [LexActions.SHIFT, 25];
  const $Vi = [LexActions.SHIFT, 26];
  const $Vj = [LexActions.SHIFT, 27];
  const $Vk = [LexActions.SHIFT, 28];
  const $Vl = [LexActions.SHIFT, 29];
  const $Vm = [
    5,
    11,
    12,
    13,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    30,
    31
  ];
  const $Vn = [
    5,
    11,
    12,
    13,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    30,
    31,
    33
  ];
  const $Vo = [LexActions.SHIFT, 38];
  const $Vp = [
    5,
    11,
    12,
    13,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    30,
    31,
    35,
    38
  ];
  const $Vq = [
    5,
    12,
    13,
    15,
    16,
    17,
    18,
    19,
    30,
    31
  ];
  const $Vr = [
    5,
    12,
    15,
    16,
    17,
    18,
    30,
    31
  ];
  const $Vs = [
    5,
    12,
    13,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    30,
    31
  ];
  const $Vt = [
    15,
    30,
    31
  ];
  const $Vu = [
    5,
    11,
    12,
    13,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    30,
    31,
    32,
    36
  ];
  let parser = {
    lexer: undefined,
    Parser: undefined,
    trace: function trace() {},
    yy: {},
    symbols: {
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
      "!": 37,
      "$accept": 0,
      "$end": 1
    },
    terminals: {
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
    },
    /**
     * Maps a ProductionRule to the appropriate number of previous tokens to use in a reduction action.
     */
    productions: PRODUCTIONS,
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
    /**
     * The `table` is an array of objects that map {@link RULES} to LexActions and tokens.
     */
    table: [
      ObjectFromPairs.of([
        2, 13,
        3, 1,
        4, 2,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        1, [3]
      ]),
      ObjectFromPairs.of([
        5, [LexActions.SHIFT, 19],
        11, $Vc,
        12, $Vd,
        13, $Ve,
        16, $Vf,
        17, $Vg,
        18, $Vh,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ]),
      extendRules($Vm, [LexActions.REDUCE, 2], ObjectFromPairs.of([33, [LexActions.SHIFT, 30]])),
      extendRules($Vm, [LexActions.REDUCE, 3]),
      extendRules($Vm, [LexActions.REDUCE, 4]),
      extendRules($Vm, [LexActions.REDUCE, 5], ObjectFromPairs.of([35, [LexActions.SHIFT, 31]])),
      extendRules($Vm, [LexActions.REDUCE, 6]),
      ObjectFromPairs.of([
        2, 13,
        4, 32,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 33,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 34,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        14, [LexActions.SHIFT, 35]
      ]),
      extendRules($Vm, [LexActions.REDUCE, 25]),
      extendRules($Vm, [LexActions.REDUCE, 26], ObjectFromPairs.of([LexActions.REDUCE, 36, 32, [LexActions.SHIFT, 37], 36, $Vb])),
      extendRules($Vn, [LexActions.REDUCE, 36], ObjectFromPairs.of([36, $Vo])),
      extendRules($Vp, [LexActions.REDUCE, 38], ObjectFromPairs.of([33, [LexActions.SHIFT, 39]])),
      extendRules($Vm, [LexActions.REDUCE, 28], ObjectFromPairs.of([27, [LexActions.SHIFT, 40]])),
      extendRules($Vm, [LexActions.REDUCE, 30], ObjectFromPairs.of([27, [LexActions.SHIFT, 41]])),
      ObjectFromPairs.of([32, [LexActions.SHIFT, 42]]),
      ObjectFromPairs.of([1, [LexActions.ACCEPT, 1]]),
      ObjectFromPairs.of([
        2, 13,
        4, 43,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 44,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 45,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 48,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        12, [1, 46],
        13, $V3,
        14, $V4,
        17, [1, 47],
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 50,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        12, [1, 49],
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 51,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 52,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 53,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 54,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 55,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([ [LexActions.SHIFT, 56]]),
      extendRules($Vp, [LexActions.REDUCE, 40]),
      ObjectFromPairs.of([
        11, $Vc,
        12, $Vd,
        13, $Ve,
        15, [LexActions.SHIFT, 57],
        16, $Vf,
        17, $Vg,
        18, $Vh,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ]),
      extendRules($Vq, [LexActions.REDUCE, 21], ObjectFromPairs.of([
        11, $Vc,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vq, [LexActions.REDUCE, 22], ObjectFromPairs.of([
        11, $Vc,
        20, $Vj,
        21, $Vk,
        22, $Vl])
      ),
      ObjectFromPairs.of([
        2, 13,
        4, 60,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        15, [LexActions.SHIFT, 58],
        19, $V5,
        23, $V6,
        24, 59,
        25, 12,
        26, $V7,
        28, $V8,
        29, [LexActions.SHIFT, 61],
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      extendRules($Vm, [LexActions.REDUCE, 27]),
      ObjectFromPairs.of([36, $Vo]),
      ObjectFromPairs.of([32, [LexActions.SHIFT, 62]]),
      ObjectFromPairs.of([34, [LexActions.SHIFT, 63]]),
      ObjectFromPairs.of([26, [LexActions.SHIFT, 64]]),
      ObjectFromPairs.of([28, [LexActions.SHIFT, 65]]),
      ObjectFromPairs.of([37, [LexActions.SHIFT, 66]]),
      extendRules($Vm, [LexActions.REDUCE, 7]),
      extendRules([5, 12, 15, 30, 31], [LexActions.REDUCE, 8], ObjectFromPairs.of([
        11, $Vc,
        13, $Ve,
        16, $Vf,
        17, $Vg,
        18, $Vh,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vq, [LexActions.REDUCE, 9], ObjectFromPairs.of([
        11, $Vc,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      ObjectFromPairs.of([
        2, 13,
        4, 67,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 68,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      extendRules($Vr, [LexActions.REDUCE, 16], ObjectFromPairs.of([
        11, $Vc,
        13, $Ve,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      ObjectFromPairs.of([
        2, 13,
        4, 69,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb
      ]),
      extendRules($Vr, [LexActions.REDUCE, 15], ObjectFromPairs.of([
        11, $Vc,
        13, $Ve,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules([5, 12, 15, 18, 30, 31], [LexActions.REDUCE, 14], ObjectFromPairs.of([
        11, $Vc,
        13, $Ve,
        16, $Vf,
        17, $Vg,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vq, [LexActions.REDUCE, 17], ObjectFromPairs.of([
        11, $Vc,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vs, [LexActions.REDUCE, 18], ObjectFromPairs.of([
        11, $Vc,
        22, $Vl
      ])),
      extendRules($Vs, [LexActions.REDUCE, 19], ObjectFromPairs.of([
        11, $Vc,
        22, $Vl
      ])),
      extendRules([5, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 30, 31], [LexActions.REDUCE, 20], ObjectFromPairs.of([11, $Vc])),
      extendRules($Vn, [LexActions.REDUCE, 37]),
      extendRules($Vm, [LexActions.REDUCE, 10]),
      extendRules($Vm, [LexActions.REDUCE, 23]),
      ObjectFromPairs.of([
        15, [LexActions.SHIFT, 70],
        30, [LexActions.SHIFT, 71],
        31, [LexActions.SHIFT, 72]
      ]),
      extendRules($Vt, [LexActions.REDUCE, 32], ObjectFromPairs.of([
        11, $Vc,
        12, $Vd,
        13, $Ve,
        16, $Vf,
        17, $Vg,
        18, $Vh,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vt, [LexActions.REDUCE, 33]), ObjectFromPairs.of([
        37, [LexActions.SHIFT, 73]
      ]),
      extendRules($Vp, [LexActions.REDUCE, 39]),
      extendRules($Vm, [LexActions.REDUCE, 29]),
      extendRules($Vm, [LexActions.REDUCE, 31]),
      extendRules($Vu, [LexActions.REDUCE, 41]),
      extendRules($Vr, [LexActions.REDUCE, 11], ObjectFromPairs.of([
        11, $Vc,
        13, $Ve,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vr, [LexActions.REDUCE, 13], ObjectFromPairs.of([
        11, $Vc,
        13, $Ve,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vr, [LexActions.REDUCE, 12], ObjectFromPairs.of([
        11, $Vc,
        13, $Ve,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vm, [LexActions.REDUCE, 24]),
      ObjectFromPairs.of([ // 70
        2, 13,
        4, 74,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb,
        12, $Vd,
      ]),
      ObjectFromPairs.of([
        2, 13,
        4, 75,
        6, 3,
        7, $V0,
        8, $V1,
        9, 6,
        10, $V2,
        13, $V3,
        14, $V4,
        19, $V5,
        23, $V6,
        25, 12,
        26, $V7,
        28, $V8,
        32, $V9,
        34, $Va,
        36, $Vb,
        12, $Vd,
      ]),
      extendRules($Vu, [LexActions.REDUCE, 42]),
      extendRules($Vt, [LexActions.REDUCE, 34], ObjectFromPairs.of([
        11, $Vc,
        12, $Vd,
        13, $Ve,
        16, $Vf,
        17, $Vg,
        18, $Vh,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ])),
      extendRules($Vt, [LexActions.REDUCE, 35], ObjectFromPairs.of([
        11, $Vc,
        12, $Vd,
        13, $Ve,
        16, $Vf,
        17, $Vg,
        18, $Vh,
        19, $Vi,
        20, $Vj,
        21, $Vk,
        22, $Vl
      ]))
    ],
    defaultActions: ObjectFromPairs.of([19, [LexActions.REDUCE, 1]]),
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        throw new ParseError(str);
      }
    },
    parse: function parse(input) {
      let self = this,
        stack = [0],
        semanticValueStack = [null],
        locationStack = [],
        table = this.table,
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
          token = self.symbols[token] || token;
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
          action = table[state] && table[state][symbol];
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
              if ((TERROR.toString()) in table[state]) {
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
            let tableState = table[state];
            for (p in table[state]) {
              if (this.terminals[p] && p > TERROR) {
                expected.push(this.terminals[p]);
                expectedIndexes.push(p);
              }
            }
            if (lexer.showPosition) {
              errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals[symbol] || symbol) + "'";
            } else {
              errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " +
                (symbol == EOF ? "end of input" :
                  ("'" + (this.terminals[symbol] || symbol) + "'"));
            }
            this.parseError(errStr, {
              text: lexer.match,
              token: this.terminals[symbol] || symbol,
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
          action = table[state] && table[state][TERROR];
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
          case LexActions.SHIFT: // Shift
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

          case LexActions.REDUCE: // Reduce
            let currentProduction : ReductionPair = this.productions[action[1]];

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
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;

          case LexActions.ACCEPT:
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