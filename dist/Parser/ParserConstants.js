"use strict";
exports.__esModule = true;
// Rules represent the Regular Expressions that will be used in sequence to match a given input to the Parser.
var WHITE_SPACE_RULE = /^(?:\s+)/; // rule 0
var DOUBLE_QUOTES_RULE = /^(?:"(\\["]|[^"])*")/; // rule 1
var SINGLE_QUOTES_RULE = /^(?:'(\\[']|[^'])*')/; // rule 2
var FORMULA_NAME_RULE = /^(?:[A-Za-z.]{1,}[A-Za-z_0-9]+(?=[(]))/; // Changed from /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+(?=[(]))/ // rule 3
var DATE_RULE = /^(?:([0]?[1-9]|1[0-2])[:][0-5][0-9]([:][0-5][0-9])?[ ]?(AM|am|aM|Am|PM|pm|pM|Pm))/; // rule 4
var TIME_RULE = /^(?:([0]?[0-9]|1[0-9]|2[0-3])[:][0-5][0-9]([:][0-5][0-9])?)/; // rule 5
var $_A1_CELL_RULE = /^(?:\$[A-Za-z]+\$[0-9]+)/; // rule 6
var A1_CELL_RULE = /^(?:[A-Za-z]+[0-9]+)/; // rules 7
var FORMULA_NAME_SIMPLE_RULE = /^(?:[A-Za-z.]+(?=[(]))/; // rule 8
var VARIABLE_RULE = /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/; // rule 9
var SIMPLE_VARIABLE_RILE = /^(?:[A-Za-z_]+)/; //rule 10
var INTEGER_RULE = /^(?:[0-9]+(?:(?:[eE])(?:[\+-])?[0-9]+)?)/; // Changed from /^(?:[0-9]+)/ // rule 11
var OPEN_AND_CLOSE_OF_ARRAY_RULE = /^(?:\[(.*)?\])/; // rule 12
var DOLLAR_SIGN_RULE = /^(?:\$)/; // rule 13
var AMPERSAND_SIGN_RULE = /^(?:&)/; //rule 14
var SINGLE_WHITESPACE_RULE = /^(?: )/; // rule 15
var PERIOD_RULE = /^(?:[.])/; // rule 16
var COLON_RULE = /^(?::)/; //rule 17
var SEMI_COLON_RULE = /^(?:;)/; // rule 18
var COMMA_RULE = /^(?:,)/; // rule 19
var ASTERISK_RULE = /^(?:\*)/; //rule 20
var FORWARD_SLASH_RULE = /^(?:\/)/; // rule 21
var MINUS_SIGN_RULE = /^(?:-)/; // rule 22
var PLUS_SIGN_RULE = /^(?:\+)/; // rule 23
var CARET_SIGN_RULE = /^(?:\^)/; //rule 24
var OPEN_PAREN_RULE = /^(?:\()/; // rule 25
var CLOSE_PAREN_RULE = /^(?:\))/; // rule 26
var GREATER_THAN_SIGN_RULE = /^(?:>)/; // rule 27
var LESS_THAN_SIGN_RULE = /^(?:<)/; // rule 28
var NOT_RULE = /^(?:NOT\b)/; // rule 29
var OPEN_DOUBLE_QUOTE = /^(?:")/; // rule 30
var OPEN_SINGLE_QUITE = /^(?:')/; // rule 31
var EXCLAMATION_POINT_RULE = /^(?:!)/; // rule 32
var EQUALS_SIGN_RULE = /^(?:=)/; // rule 33
var PERCENT_SIGN_RULE = /^(?:%)/; // rule 34
// TODO: POUND_SIGN_RULE Modified from /^(?:[#])/, which matches pound sign exclusively. Now specific to errors.
// TODO: Should be renamed.
var POUND_SIGN_RULE = /^(?:#N\/A|#NUM\!|#NULL\!|#DIV\/0\!|#VALUE\!|#REF\!|#ERROR)/; // rule 35
var END_OF_STRING_RULE = /^(?:$)/; // rule 36
// Sequential rules to use when parsing a given input.
var RULES = [
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
exports.RULES = RULES;
/**
 * Actions to take when processing tokens one by one. We're always either taking the next token, reducing our current
 * tokens, or accepting and returning.
 */
var SHIFT = 1;
exports.SHIFT = SHIFT;
var REDUCE = 2;
exports.REDUCE = REDUCE;
var ACCEPT = 3;
exports.ACCEPT = ACCEPT;
/**
 * Represents the length to reduce the stack by, and the token index value that will replace those tokens in the stack.
 */
var ReductionPair = (function () {
    function ReductionPair(replacementTokenIndex, length) {
        this.lengthToReduceStackBy = length;
        this.replacementTokenIndex = replacementTokenIndex;
    }
    /**
     * Get the number representing the length to reduce the stack by.
     * @returns {number}
     */
    ReductionPair.prototype.getLengthToReduceStackBy = function () {
        return this.lengthToReduceStackBy;
    };
    /**
     * Get the replacement token index.
     * @returns {number}
     */
    ReductionPair.prototype.getReplacementTokenIndex = function () {
        return this.replacementTokenIndex;
    };
    return ReductionPair;
}());
exports.ReductionPair = ReductionPair;
/**
 * Productions is used to look up both the number to use when reducing the stack (productions[x][1]) and the semantic
 * value that will replace the tokens in the stack (productions[x][0]).
 * @type {Array<ReductionPair>}
 *
 * Maps a ProductionRule to the appropriate number of previous tokens to use in a reduction action.
 */
var productions = [];
productions[0 /* NO_ACTION */] = null;
productions[1 /* RETURN_LAST */] = new ReductionPair(3, 2);
productions[2 /* CALL_VARIABLE */] = new ReductionPair(4, 1);
productions[3 /* TIME_CALL_TRUE */] = new ReductionPair(4, 1);
productions[4 /* TIME_CALL */] = new ReductionPair(4, 1);
productions[5 /* AS_NUMBER */] = new ReductionPair(4, 1);
productions[6 /* AS_STRING */] = new ReductionPair(4, 1);
productions[7 /* AMPERSAND */] = new ReductionPair(4, 3);
productions[8 /* EQUALS */] = new ReductionPair(4, 3);
productions[9 /* PLUS */] = new ReductionPair(4, 3);
productions[10 /* LAST_NUMBER */] = new ReductionPair(4, 3);
productions[11 /* LTE */] = new ReductionPair(4, 4);
productions[12 /* GTE */] = new ReductionPair(4, 4);
productions[13 /* NOT_EQ */] = new ReductionPair(4, 4);
productions[14 /* NOT */] = new ReductionPair(4, 3);
productions[15 /* GT */] = new ReductionPair(4, 3);
productions[16 /* LT */] = new ReductionPair(4, 3);
productions[17 /* MINUS */] = new ReductionPair(4, 3);
productions[18 /* MULTIPLY */] = new ReductionPair(4, 3);
productions[19 /* DIVIDE */] = new ReductionPair(4, 3);
productions[20 /* TO_POWER */] = new ReductionPair(4, 3);
productions[21 /* INVERT_NUM */] = new ReductionPair(4, 2);
productions[22 /* TO_NUMBER_NAN_AS_ZERO */] = new ReductionPair(4, 2);
productions[23 /* CALL_FUNCTION_LAST_BLANK */] = new ReductionPair(4, 3);
productions[24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */] = new ReductionPair(4, 4);
productions[25 /* I25 */] = new ReductionPair(4, 1);
productions[26 /* I26 */] = new ReductionPair(4, 1);
productions[27 /* I27 */] = new ReductionPair(4, 2);
productions[28 /* FIXED_CELL_VAL */] = new ReductionPair(25, 1);
productions[29 /* FIXED_CELL_RANGE_VAL */] = new ReductionPair(25, 3);
productions[30 /* CELL_VALUE */] = new ReductionPair(25, 1);
productions[31 /* CELL_RANGE_VALUE */] = new ReductionPair(25, 3);
productions[32 /* ENSURE_IS_ARRAY */] = new ReductionPair(24, 1);
productions[33 /* ENSURE_YYTEXT_ARRAY */] = new ReductionPair(24, 1);
productions[34 /* REDUCE_INT */] = new ReductionPair(24, 3);
productions[35 /* REDUCE_PERCENT */] = new ReductionPair(24, 3);
productions[36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */] = new ReductionPair(6, 1);
productions[37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */] = new ReductionPair(6, 3);
productions[38 /* REFLEXIVE_REDUCE */] = new ReductionPair(9, 1);
productions[39 /* REDUCE_FLOAT */] = new ReductionPair(9, 3);
productions[40 /* REDUCE_PREV_AS_PERCENT */] = new ReductionPair(9, 2);
productions[41 /* REDUCE_LAST_THREE_A */] = new ReductionPair(2, 3);
productions[42 /* REDUCE_LAST_THREE_B */] = new ReductionPair(2, 4);
productions[43 /* AS_ERROR */] = new ReductionPair(4, 1);
var PRODUCTIONS = productions;
exports.PRODUCTIONS = PRODUCTIONS;
var Symbol;
(function (Symbol) {
    Symbol[Symbol["ACCEPT"] = 0] = "ACCEPT";
    Symbol[Symbol["END"] = 1] = "END";
    Symbol[Symbol["ERROR"] = 2] = "ERROR";
    Symbol[Symbol["EXPRESSIONS"] = 3] = "EXPRESSIONS";
    Symbol[Symbol["EXPRESSION"] = 4] = "EXPRESSION";
    Symbol[Symbol["EOF"] = 5] = "EOF";
    Symbol[Symbol["VARIABLE_SEQUENCE"] = 6] = "VARIABLE_SEQUENCE";
    Symbol[Symbol["TIME_AMPM"] = 7] = "TIME_AMPM";
    Symbol[Symbol["TIME_24"] = 8] = "TIME_24";
    Symbol[Symbol["NUMBER"] = 9] = "NUMBER";
    Symbol[Symbol["STRING"] = 10] = "STRING";
    Symbol[Symbol["AMPERSAND"] = 11] = "AMPERSAND";
    Symbol[Symbol["EQUALS"] = 12] = "EQUALS";
    Symbol[Symbol["PLUS"] = 13] = "PLUS";
    Symbol[Symbol["LEFT_PAREN"] = 14] = "LEFT_PAREN";
    Symbol[Symbol["RIGHT_PAREN"] = 15] = "RIGHT_PAREN";
    Symbol[Symbol["LESS_THAN"] = 16] = "LESS_THAN";
    Symbol[Symbol["GREATER_THAN"] = 17] = "GREATER_THAN";
    Symbol[Symbol["NOT"] = 18] = "NOT";
    Symbol[Symbol["MINUS"] = 19] = "MINUS";
    Symbol[Symbol["ASTERISK"] = 20] = "ASTERISK";
    Symbol[Symbol["DIVIDE"] = 21] = "DIVIDE";
    Symbol[Symbol["CARROT"] = 22] = "CARROT";
    Symbol[Symbol["FUNCTION"] = 23] = "FUNCTION";
    Symbol[Symbol["EXP_SEQ"] = 24] = "EXP_SEQ";
    Symbol[Symbol["CELL"] = 25] = "CELL";
    Symbol[Symbol["FIXEDCELL"] = 26] = "FIXEDCELL";
    Symbol[Symbol["COLON"] = 27] = "COLON";
    Symbol[Symbol["CELL_UPPER"] = 28] = "CELL_UPPER";
    Symbol[Symbol["ARRAY"] = 29] = "ARRAY";
    Symbol[Symbol["SEMI_COLON"] = 30] = "SEMI_COLON";
    Symbol[Symbol["COMMA"] = 31] = "COMMA";
    Symbol[Symbol["VARIABLE"] = 32] = "VARIABLE";
    Symbol[Symbol["DECIMAL"] = 33] = "DECIMAL";
    Symbol[Symbol["NUMBER_UPPER"] = 34] = "NUMBER_UPPER";
    Symbol[Symbol["PERCENT"] = 35] = "PERCENT";
    Symbol[Symbol["POUND"] = 36] = "POUND";
    Symbol[Symbol["EXCLAMATION_POINT"] = 37] = "EXCLAMATION_POINT";
})(Symbol || (Symbol = {}));
exports.Symbol = Symbol;
var SYMBOL_NAME_TO_INDEX = {
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
exports.SYMBOL_NAME_TO_INDEX = SYMBOL_NAME_TO_INDEX;
var symbolIndexToName = {};
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
var SYMBOL_INDEX_TO_NAME = symbolIndexToName;
exports.SYMBOL_INDEX_TO_NAME = SYMBOL_INDEX_TO_NAME;
var ObjectBuilder = (function () {
    function ObjectBuilder() {
        this.o = {};
    }
    ObjectBuilder.add = function (k, v) {
        var m = new ObjectBuilder();
        m.o[k.toString()] = v;
        return m;
    };
    ObjectBuilder.prototype.add = function (k, v) {
        this.o[k.toString()] = v;
        return this;
    };
    ObjectBuilder.prototype.build = function () {
        return this.o;
    };
    return ObjectBuilder;
}());
/**
 * Array of to map rules to to LexActions and other rules. A single index in the object (e.g. `{2: 13}`) indicates the
 * rule object to follow for the next token, while an array (e.g. `{23: [1, ReduceActions.LTE]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
var table = [];
// All functions in the spreadsheet start with a 0-token.
table[0] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSIONS, 1)
    .add(Symbol.EXPRESSION, 2)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[1] = ObjectBuilder
    .add(Symbol.END, [3])
    .build();
table[2] = ObjectBuilder
    .add(Symbol.EOF, [SHIFT, 19 /* DIVIDE */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.NOT, [SHIFT, 25 /* I25 */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .build();
table[3] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.AMPERSAND, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.EQUALS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.PLUS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.LESS_THAN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.NOT, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.MINUS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.ASTERISK, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.DIVIDE, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.CARROT, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.COMMA, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(33, [SHIFT, 30 /* CELL_VALUE */])
    .build();
table[3] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.AMPERSAND, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.EQUALS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.PLUS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.LESS_THAN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.NOT, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.MINUS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.ASTERISK, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.DIVIDE, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.CARROT, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.COMMA, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(33, [SHIFT, 30 /* CELL_VALUE */])
    .build();
table[4] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.AMPERSAND, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.EQUALS, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.PLUS, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.LESS_THAN, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.NOT, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.MINUS, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.ASTERISK, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.DIVIDE, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.CARROT, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .add(Symbol.COMMA, [REDUCE, 3 /* TIME_CALL_TRUE */])
    .build();
table[5] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.AMPERSAND, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.EQUALS, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.PLUS, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.LESS_THAN, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.GREATER_THAN, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.NOT, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.MINUS, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.ASTERISK, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.DIVIDE, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.CARROT, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 4 /* TIME_CALL */])
    .add(Symbol.COMMA, [REDUCE, 4 /* TIME_CALL */])
    .build();
table[6] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.AMPERSAND, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.EQUALS, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.PLUS, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.LESS_THAN, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.GREATER_THAN, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.NOT, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.MINUS, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.ASTERISK, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.DIVIDE, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.CARROT, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.SEMI_COLON, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.COMMA, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.PERCENT, [SHIFT, 31 /* CELL_RANGE_VALUE */])
    .build();
table[7] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.AMPERSAND, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.EQUALS, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.PLUS, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.LESS_THAN, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.GREATER_THAN, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.NOT, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.MINUS, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.ASTERISK, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.DIVIDE, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.CARROT, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.SEMI_COLON, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.COMMA, [REDUCE, 6 /* AS_STRING */])
    .build();
table[8] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 32)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[9] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 33)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[10] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 34)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[11] = ObjectBuilder
    .add(Symbol.LEFT_PAREN, [SHIFT, 35 /* REDUCE_PERCENT */])
    .build();
table[12] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 25 /* I25 */])
    .add(Symbol.AMPERSAND, [REDUCE, 25 /* I25 */])
    .add(Symbol.EQUALS, [REDUCE, 25 /* I25 */])
    .add(Symbol.PLUS, [REDUCE, 25 /* I25 */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 25 /* I25 */])
    .add(Symbol.LESS_THAN, [REDUCE, 25 /* I25 */])
    .add(Symbol.GREATER_THAN, [REDUCE, 25 /* I25 */])
    .add(Symbol.NOT, [REDUCE, 25 /* I25 */])
    .add(Symbol.MINUS, [REDUCE, 25 /* I25 */])
    .add(Symbol.ASTERISK, [REDUCE, 25 /* I25 */])
    .add(Symbol.DIVIDE, [REDUCE, 25 /* I25 */])
    .add(Symbol.CARROT, [REDUCE, 25 /* I25 */])
    .add(Symbol.SEMI_COLON, [REDUCE, 25 /* I25 */])
    .add(Symbol.COMMA, [REDUCE, 25 /* I25 */])
    .build();
table[13] = ObjectBuilder
    .add(Symbol.ERROR, 36)
    .add(Symbol.EOF, [REDUCE, 26 /* I26 */])
    .add(Symbol.AMPERSAND, [REDUCE, 26 /* I26 */])
    .add(Symbol.EQUALS, [REDUCE, 26 /* I26 */])
    .add(Symbol.PLUS, [REDUCE, 26 /* I26 */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 26 /* I26 */])
    .add(Symbol.LESS_THAN, [REDUCE, 26 /* I26 */])
    .add(Symbol.GREATER_THAN, [REDUCE, 26 /* I26 */])
    .add(Symbol.NOT, [REDUCE, 26 /* I26 */])
    .add(Symbol.MINUS, [REDUCE, 26 /* I26 */])
    .add(Symbol.ASTERISK, [REDUCE, 26 /* I26 */])
    .add(Symbol.DIVIDE, [REDUCE, 26 /* I26 */])
    .add(Symbol.CARROT, [REDUCE, 26 /* I26 */])
    .add(Symbol.SEMI_COLON, [REDUCE, 26 /* I26 */])
    .add(Symbol.COMMA, [REDUCE, 26 /* I26 */])
    .add(Symbol.VARIABLE, [SHIFT, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[14] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.AMPERSAND, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.EQUALS, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.PLUS, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.LESS_THAN, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.GREATER_THAN, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.NOT, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.MINUS, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.ASTERISK, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.DIVIDE, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.CARROT, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.SEMI_COLON, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.COMMA, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(33, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.POUND, [SHIFT, 38 /* REFLEXIVE_REDUCE */])
    .build();
table[15] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.AMPERSAND, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.EQUALS, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.PLUS, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.LESS_THAN, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.NOT, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.MINUS, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.ASTERISK, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.DIVIDE, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.CARROT, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.COMMA, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(33, [SHIFT, 39 /* REDUCE_FLOAT */])
    .add(Symbol.PERCENT, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(38, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .build();
table[16] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.AMPERSAND, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.EQUALS, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.PLUS, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.LESS_THAN, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.GREATER_THAN, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.NOT, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.MINUS, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.ASTERISK, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.DIVIDE, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.COLON, [SHIFT, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.SEMI_COLON, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.COMMA, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .build();
table[17] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.AMPERSAND, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.EQUALS, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.PLUS, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.LESS_THAN, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.NOT, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.MINUS, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.ASTERISK, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.DIVIDE, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.CARROT, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.COLON, [SHIFT, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.SEMI_COLON, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.COMMA, [REDUCE, 30 /* CELL_VALUE */])
    .build();
table[18] = ObjectBuilder
    .add(Symbol.VARIABLE, [SHIFT, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.EOF, [REDUCE, 43 /* AS_ERROR */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 43 /* AS_ERROR */])
    .add(Symbol.COMMA, [REDUCE, 43 /* AS_ERROR */])
    .build();
table[19] = ObjectBuilder
    .add(Symbol.END, [ACCEPT, 1 /* RETURN_LAST */])
    .build();
table[20] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 43)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[21] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 44)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[22] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 45)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[23] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 48)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.EQUALS, [SHIFT, 46])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.GREATER_THAN, [SHIFT, 47])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[24] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 50)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.EQUALS, [SHIFT, 49])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[25] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 51)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[26] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 52)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[27] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 53)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[28] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 54)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[29] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 55)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[30 /* CELL_VALUE */] = ObjectBuilder
    .add(Symbol.VARIABLE, [SHIFT, 56])
    .build();
table[31] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.AMPERSAND, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.EQUALS, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.PLUS, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.LESS_THAN, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.GREATER_THAN, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.NOT, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.MINUS, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.ASTERISK, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.DIVIDE, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.CARROT, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.SEMI_COLON, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.COMMA, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.PERCENT, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(38, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .build();
table[32] = ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [SHIFT, 57])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.NOT, [SHIFT, 25 /* I25 */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .build();
table[33] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.LESS_THAN, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.GREATER_THAN, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.NOT, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.MINUS, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.COMMA, [REDUCE, 21 /* INVERT_NUM */])
    .build();
table[34] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.PLUS, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.LESS_THAN, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.GREATER_THAN, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.NOT, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.MINUS, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.COMMA, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .build();
table[35] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 60)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.RIGHT_PAREN, [SHIFT, 58])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.EXP_SEQ, 59)
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.ARRAY, [SHIFT, 61])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[36] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 27 /* I27 */])
    .add(Symbol.AMPERSAND, [REDUCE, 27 /* I27 */])
    .add(Symbol.EQUALS, [REDUCE, 27 /* I27 */])
    .add(Symbol.PLUS, [REDUCE, 27 /* I27 */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 27 /* I27 */])
    .add(Symbol.LESS_THAN, [REDUCE, 27 /* I27 */])
    .add(Symbol.GREATER_THAN, [REDUCE, 27 /* I27 */])
    .add(Symbol.NOT, [REDUCE, 27 /* I27 */])
    .add(Symbol.MINUS, [REDUCE, 27 /* I27 */])
    .add(Symbol.ASTERISK, [REDUCE, 27 /* I27 */])
    .add(Symbol.DIVIDE, [REDUCE, 27 /* I27 */])
    .add(Symbol.CARROT, [REDUCE, 27 /* I27 */])
    .add(Symbol.SEMI_COLON, [REDUCE, 27 /* I27 */])
    .add(Symbol.COMMA, [REDUCE, 27 /* I27 */])
    .build();
table[37] = ObjectBuilder
    .add(Symbol.POUND, [REDUCE, 43 /* AS_ERROR */])
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
    .add(Symbol.EOF, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.AMPERSAND, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.EQUALS, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.LESS_THAN, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.GREATER_THAN, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.NOT, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.MINUS, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.ASTERISK, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.DIVIDE, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.CARROT, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.SEMI_COLON, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.COMMA, [REDUCE, 7 /* AMPERSAND */])
    .build();
table[44] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 8 /* EQUALS */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 8 /* EQUALS */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 8 /* EQUALS */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.NOT, [SHIFT, 25 /* I25 */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 8 /* EQUALS */])
    .add(Symbol.COMMA, [REDUCE, 8 /* EQUALS */])
    .build();
table[45] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 9 /* PLUS */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 9 /* PLUS */])
    .add(Symbol.PLUS, [REDUCE, 9 /* PLUS */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 9 /* PLUS */])
    .add(Symbol.LESS_THAN, [REDUCE, 9 /* PLUS */])
    .add(Symbol.GREATER_THAN, [REDUCE, 9 /* PLUS */])
    .add(Symbol.NOT, [REDUCE, 9 /* PLUS */])
    .add(Symbol.MINUS, [REDUCE, 9 /* PLUS */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 9 /* PLUS */])
    .add(Symbol.COMMA, [REDUCE, 9 /* PLUS */])
    .build();
table[46] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 67)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[47] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 68)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[48] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 16 /* LT */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 16 /* LT */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 16 /* LT */])
    .add(Symbol.LESS_THAN, [REDUCE, 16 /* LT */])
    .add(Symbol.GREATER_THAN, [REDUCE, 16 /* LT */])
    .add(Symbol.NOT, [REDUCE, 16 /* LT */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 16 /* LT */])
    .add(Symbol.COMMA, [REDUCE, 16 /* LT */])
    .build();
table[49] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 69)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */])
    .build();
table[50] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 15 /* GT */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 15 /* GT */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 15 /* GT */])
    .add(Symbol.LESS_THAN, [REDUCE, 15 /* GT */])
    .add(Symbol.GREATER_THAN, [REDUCE, 15 /* GT */])
    .add(Symbol.NOT, [REDUCE, 15 /* GT */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 15 /* GT */])
    .add(Symbol.COMMA, [REDUCE, 15 /* GT */])
    .build();
table[51] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 14 /* NOT */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 14 /* NOT */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 14 /* NOT */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.NOT, [REDUCE, 14 /* NOT */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 14 /* NOT */])
    .add(Symbol.COMMA, [REDUCE, 14 /* NOT */])
    .build();
table[52] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 17 /* MINUS */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 17 /* MINUS */])
    .add(Symbol.PLUS, [REDUCE, 17 /* MINUS */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 17 /* MINUS */])
    .add(Symbol.LESS_THAN, [REDUCE, 17 /* MINUS */])
    .add(Symbol.GREATER_THAN, [REDUCE, 17 /* MINUS */])
    .add(Symbol.NOT, [REDUCE, 17 /* MINUS */])
    .add(Symbol.MINUS, [REDUCE, 17 /* MINUS */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 17 /* MINUS */])
    .add(Symbol.COMMA, [REDUCE, 17 /* MINUS */])
    .build();
table[53] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.PLUS, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.LESS_THAN, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.GREATER_THAN, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.NOT, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.MINUS, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.ASTERISK, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.DIVIDE, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.COMMA, [REDUCE, 18 /* MULTIPLY */])
    .build();
table[54] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.PLUS, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.LESS_THAN, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.NOT, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.MINUS, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.ASTERISK, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.DIVIDE, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.COMMA, [REDUCE, 19 /* DIVIDE */])
    .build();
table[55] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.PLUS, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.LESS_THAN, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.GREATER_THAN, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.NOT, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.MINUS, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.ASTERISK, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.DIVIDE, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.CARROT, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.SEMI_COLON, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.COMMA, [REDUCE, 20 /* TO_POWER */])
    .build();
table[56] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.AMPERSAND, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.EQUALS, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.PLUS, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.LESS_THAN, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.GREATER_THAN, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.NOT, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.MINUS, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.ASTERISK, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.DIVIDE, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.CARROT, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.SEMI_COLON, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.COMMA, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(33, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .build();
table[57] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.AMPERSAND, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.EQUALS, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.PLUS, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.LESS_THAN, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.GREATER_THAN, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.NOT, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.MINUS, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.ASTERISK, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.DIVIDE, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.CARROT, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.SEMI_COLON, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.COMMA, [REDUCE, 10 /* LAST_NUMBER */])
    .build();
table[58] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.AMPERSAND, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.EQUALS, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.PLUS, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.LESS_THAN, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.NOT, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.MINUS, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.ASTERISK, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.DIVIDE, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.CARROT, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.SEMI_COLON, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.COMMA, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .build();
table[59] = ObjectBuilder
    .add(Symbol.RIGHT_PAREN, [SHIFT, 70])
    .add(Symbol.SEMI_COLON, [SHIFT, 71])
    .add(Symbol.COMMA, [SHIFT, 72])
    .build();
table[60] = ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 32 /* ENSURE_IS_ARRAY */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.NOT, [SHIFT, 25 /* I25 */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 32 /* ENSURE_IS_ARRAY */])
    .add(Symbol.COMMA, [REDUCE, 32 /* ENSURE_IS_ARRAY */])
    .build();
table[61] = ObjectBuilder
    .add(Symbol.RIGHT_PAREN, [REDUCE, 33 /* ENSURE_YYTEXT_ARRAY */])
    .add(Symbol.SEMI_COLON, [REDUCE, 33 /* ENSURE_YYTEXT_ARRAY */])
    .add(Symbol.COMMA, [REDUCE, 33 /* ENSURE_YYTEXT_ARRAY */])
    .build();
table[62] = ObjectBuilder
    .add(Symbol.EXCLAMATION_POINT, [SHIFT, 73])
    .build();
table[63] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.AMPERSAND, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.EQUALS, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.PLUS, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.LESS_THAN, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.GREATER_THAN, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.NOT, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.MINUS, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.ASTERISK, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.DIVIDE, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.CARROT, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.SEMI_COLON, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.COMMA, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.PERCENT, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(38, [REDUCE, 39 /* REDUCE_FLOAT */]).build();
table[64] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.AMPERSAND, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.EQUALS, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.PLUS, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.LESS_THAN, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.GREATER_THAN, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.NOT, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.MINUS, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.ASTERISK, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.DIVIDE, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.CARROT, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.COMMA, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */]).build();
table[65] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.AMPERSAND, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.EQUALS, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.PLUS, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.LESS_THAN, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.NOT, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.MINUS, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.ASTERISK, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.DIVIDE, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.CARROT, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.COMMA, [REDUCE, 31 /* CELL_RANGE_VALUE */]).build();
table[66] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.AMPERSAND, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.EQUALS, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.PLUS, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.LESS_THAN, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.GREATER_THAN, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.NOT, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.MINUS, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.ASTERISK, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.DIVIDE, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.CARROT, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.SEMI_COLON, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.COMMA, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.VARIABLE, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.POUND, [REDUCE, 41 /* REDUCE_LAST_THREE_A */]).build();
table[67] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 11 /* LTE */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 11 /* LTE */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 11 /* LTE */])
    .add(Symbol.LESS_THAN, [REDUCE, 11 /* LTE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 11 /* LTE */])
    .add(Symbol.NOT, [REDUCE, 11 /* LTE */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 11 /* LTE */])
    .add(Symbol.COMMA, [REDUCE, 11 /* LTE */]).build();
table[68] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.LESS_THAN, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.GREATER_THAN, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.NOT, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.COMMA, [REDUCE, 13 /* NOT_EQ */]).build();
table[69] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 12 /* GTE */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [REDUCE, 12 /* GTE */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 12 /* GTE */])
    .add(Symbol.LESS_THAN, [REDUCE, 12 /* GTE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 12 /* GTE */])
    .add(Symbol.NOT, [REDUCE, 12 /* GTE */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 12 /* GTE */])
    .add(Symbol.COMMA, [REDUCE, 12 /* GTE */]).build();
table[70] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.AMPERSAND, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.EQUALS, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.PLUS, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.LESS_THAN, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.GREATER_THAN, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.NOT, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.MINUS, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.ASTERISK, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.DIVIDE, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.CARROT, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.SEMI_COLON, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.COMMA, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */]).build();
table[71] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 74)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */]).build();
table[72] = ObjectBuilder
    .add(Symbol.ERROR, 13)
    .add(Symbol.EXPRESSION, 75)
    .add(Symbol.VARIABLE_SEQUENCE, 3)
    .add(Symbol.TIME_AMPM, [SHIFT, 4 /* TIME_CALL */])
    .add(Symbol.TIME_24, [SHIFT, 5 /* AS_NUMBER */])
    .add(Symbol.NUMBER, 6)
    .add(Symbol.STRING, [SHIFT, 7 /* AMPERSAND */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [SHIFT, 10 /* LAST_NUMBER */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* EQUALS */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PLUS */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* LTE */])
    .add(Symbol.CELL, 12)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* LT */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* MINUS */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* NOT */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* GT */])
    .add(Symbol.POUND, [SHIFT, 18 /* MULTIPLY */]).build();
table[73] = ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.AMPERSAND, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.EQUALS, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.PLUS, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.LESS_THAN, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.GREATER_THAN, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.NOT, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.MINUS, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.ASTERISK, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.DIVIDE, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.CARROT, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.SEMI_COLON, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.COMMA, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.VARIABLE, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.POUND, [REDUCE, 42 /* REDUCE_LAST_THREE_B */]).build();
table[74] = ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 34 /* REDUCE_INT */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.NOT, [SHIFT, 25 /* I25 */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 34 /* REDUCE_INT */])
    .add(Symbol.COMMA, [REDUCE, 34 /* REDUCE_INT */]).build();
table[75] = ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* TO_POWER */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [SHIFT, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 35 /* REDUCE_PERCENT */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.NOT, [SHIFT, 25 /* I25 */])
    .add(Symbol.MINUS, [SHIFT, 26 /* I26 */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* I27 */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [SHIFT, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 35 /* REDUCE_PERCENT */])
    .add(Symbol.COMMA, [REDUCE, 35 /* REDUCE_PERCENT */]).build();
var ACTION_TABLE = table;
exports.ACTION_TABLE = ACTION_TABLE;
