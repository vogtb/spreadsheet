"use strict";
exports.__esModule = true;
var ObjectBuilder_1 = require("../Utilities/ObjectBuilder");
// Rules represent the Regular Expressions that will be used in sequence to match a given input to the Parser.
var WHITE_SPACE_RULE = /^(?:\s+)/;
var DOUBLE_QUOTES_RULE = /^(?:"(\\["]|[^"])*")/;
var SINGLE_QUOTES_RULE = /^(?:'(\\[']|[^'])*')/;
var FORMULA_NAME_RULE = /^(?:[A-Za-z.]{1,}[A-Za-z_0-9]+(?=[(]))/;
var $_A1_CELL_RULE = /^(?:\$[A-Za-z]+\$[0-9]+)/;
var A1_CELL_RULE = /^(?:[A-Za-z]+[0-9]+)/;
var FORMULA_NAME_SIMPLE_RULE = /^(?:[A-Za-z.]+(?=[(]))/;
var VARIABLE_RULE = /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/;
var SIMPLE_VARIABLE_RILE = /^(?:[A-Za-z_]+)/;
var INTEGER_RULE = /^(?:[0-9]+(?:(?:[eE])(?:[\+-])?[0-9]+)?)/;
var OPEN_AND_CLOSE_OF_ARRAY_RULE = /^(?:\[([^\]]*)?\])/;
var DOLLAR_SIGN_RULE = /^(?:\$)/;
var AMPERSAND_SIGN_RULE = /^(?:&)/;
var SINGLE_WHITESPACE_RULE = /^(?: )/;
var PERIOD_RULE = /^(?:[.])/;
var COLON_RULE = /^(?::)/;
var SEMI_COLON_RULE = /^(?:;)/;
var COMMA_RULE = /^(?:,)/;
var ASTERISK_RULE = /^(?:\*)/;
var FORWARD_SLASH_RULE = /^(?:\/)/;
var MINUS_SIGN_RULE = /^(?:-)/;
var PLUS_SIGN_RULE = /^(?:\+)/;
var CARET_SIGN_RULE = /^(?:\^)/;
var OPEN_PAREN_RULE = /^(?:\()/;
var CLOSE_PAREN_RULE = /^(?:\))/;
var GREATER_THAN_SIGN_RULE = /^(?:>)/;
var LESS_THAN_SIGN_RULE = /^(?:<)/;
var OPEN_DOUBLE_QUOTE = /^(?:")/;
var OPEN_SINGLE_QUITE = /^(?:')/;
var EXCLAMATION_POINT_RULE = /^(?:!)/;
var EQUALS_SIGN_RULE = /^(?:=)/;
var PERCENT_SIGN_RULE = /^(?:%)/;
var FULL_ERROR_RULE = /^(?:#N\/A|#NUM\!|#NULL\!|#DIV\/0\!|#VALUE\!|#REF\!|#ERROR)/;
var END_OF_STRING_RULE = /^(?:$)/;
;
// Sequential rules to use when parsing a given input.
var RULES = [];
exports.RULES = RULES;
RULES[0 /* WHITE_SPACE */] = WHITE_SPACE_RULE;
RULES[1 /* DOUBLE_QUOTES */] = DOUBLE_QUOTES_RULE;
RULES[2 /* SINGLE_QUOTES */] = SINGLE_QUOTES_RULE;
RULES[3 /* FORMULA_NAME */] = FORMULA_NAME_RULE;
RULES[6 /* $_A1_CELL */] = $_A1_CELL_RULE;
RULES[7 /* A1_CELL */] = A1_CELL_RULE;
RULES[8 /* FORMULA_NAME_SIMPLE */] = FORMULA_NAME_SIMPLE_RULE;
RULES[9 /* VARIABLE */] = VARIABLE_RULE;
RULES[10 /* SIMPLE_VARIABLE */] = SIMPLE_VARIABLE_RILE;
RULES[11 /* INTEGER */] = INTEGER_RULE;
RULES[12 /* OPEN_AND_CLOSE_OF_ARRAY */] = OPEN_AND_CLOSE_OF_ARRAY_RULE;
RULES[13 /* DOLLAR_SIGN */] = DOLLAR_SIGN_RULE;
RULES[14 /* AMPERSAND_SIGN */] = AMPERSAND_SIGN_RULE;
RULES[15 /* SINGLE_WHITESPACE */] = SINGLE_WHITESPACE_RULE;
RULES[16 /* PERIOD */] = PERIOD_RULE;
RULES[17 /* COLON */] = COLON_RULE;
RULES[18 /* SEMI_COLON */] = SEMI_COLON_RULE;
RULES[19 /* COMMA */] = COMMA_RULE;
RULES[20 /* ASTERISK */] = ASTERISK_RULE;
RULES[21 /* FORWARD_SLASH */] = FORWARD_SLASH_RULE;
RULES[22 /* MINUS_SIGN */] = MINUS_SIGN_RULE;
RULES[23 /* PLUS_SIGN */] = PLUS_SIGN_RULE;
RULES[24 /* CARET_SIGN */] = CARET_SIGN_RULE;
RULES[25 /* OPEN_PAREN */] = OPEN_PAREN_RULE;
RULES[26 /* CLOSE_PAREN */] = CLOSE_PAREN_RULE;
RULES[27 /* GREATER_THAN_SIGN */] = GREATER_THAN_SIGN_RULE;
RULES[28 /* LESS_THAN_SIGN */] = LESS_THAN_SIGN_RULE;
RULES[30 /* OPEN_DOUBLE_QUOTE */] = OPEN_DOUBLE_QUOTE;
RULES[31 /* OPEN_SINGLE_QUITE */] = OPEN_SINGLE_QUITE;
RULES[32 /* EXCLAMATION_POINT_RULE */] = EXCLAMATION_POINT_RULE;
RULES[33 /* EQUALS_SIGN */] = EQUALS_SIGN_RULE;
RULES[34 /* PERCENT_SIGN */] = PERCENT_SIGN_RULE;
RULES[35 /* FULL_ERROR */] = FULL_ERROR_RULE;
RULES[36 /* END_OF_STRING */] = END_OF_STRING_RULE;
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
var Symbol;
(function (Symbol) {
    Symbol[Symbol["ACCEPT"] = 0] = "ACCEPT";
    Symbol[Symbol["END"] = 1] = "END";
    Symbol[Symbol["ERROR"] = 2] = "ERROR";
    Symbol[Symbol["EXPRESSIONS"] = 3] = "EXPRESSIONS";
    Symbol[Symbol["EXPRESSION"] = 4] = "EXPRESSION";
    Symbol[Symbol["EOF"] = 5] = "EOF";
    Symbol[Symbol["VARIABLE_SEQUENCE"] = 6] = "VARIABLE_SEQUENCE";
    Symbol[Symbol["NUMBER"] = 9] = "NUMBER";
    Symbol[Symbol["STRING"] = 10] = "STRING";
    Symbol[Symbol["AMPERSAND"] = 11] = "AMPERSAND";
    Symbol[Symbol["EQUALS"] = 12] = "EQUALS";
    Symbol[Symbol["PLUS"] = 13] = "PLUS";
    Symbol[Symbol["LEFT_PAREN"] = 14] = "LEFT_PAREN";
    Symbol[Symbol["RIGHT_PAREN"] = 15] = "RIGHT_PAREN";
    Symbol[Symbol["LESS_THAN"] = 16] = "LESS_THAN";
    Symbol[Symbol["GREATER_THAN"] = 17] = "GREATER_THAN";
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
    Symbol[Symbol["FULL_ERROR"] = 36] = "FULL_ERROR";
    Symbol[Symbol["EXCLAMATION_POINT"] = 37] = "EXCLAMATION_POINT";
})(Symbol || (Symbol = {}));
exports.Symbol = Symbol;
/**
 * Represents the length to reduce the stack by, and the replacement symbol that will replace those tokens in the stack.
 */
var ReductionPair = /** @class */ (function () {
    function ReductionPair(replacementSymbol, length) {
        this.lengthToReduceStackBy = length;
        this.replacementSymbol = replacementSymbol;
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
    ReductionPair.prototype.getReplacementSymbol = function () {
        return this.replacementSymbol;
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
productions[1 /* RETURN_LAST */] = new ReductionPair(Symbol.EXPRESSIONS, 2);
productions[2 /* CALL_VARIABLE */] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[5 /* AS_NUMBER */] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[6 /* AS_STRING */] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[7 /* AMPERSAND */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[8 /* EQUALS */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[9 /* PLUS */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[10 /* LAST_NUMBER */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[11 /* LTE */] = new ReductionPair(Symbol.EXPRESSION, 4);
productions[12 /* GTE */] = new ReductionPair(Symbol.EXPRESSION, 4);
productions[13 /* NOT_EQ */] = new ReductionPair(Symbol.EXPRESSION, 4);
productions[15 /* GT */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[16 /* LT */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[17 /* MINUS */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[18 /* MULTIPLY */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[19 /* DIVIDE */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[20 /* TO_POWER */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[21 /* INVERT_NUM */] = new ReductionPair(Symbol.EXPRESSION, 2);
productions[22 /* TO_NUMBER_NAN_AS_ZERO */] = new ReductionPair(Symbol.EXPRESSION, 2);
productions[23 /* CALL_FUNCTION_LAST_BLANK */] = new ReductionPair(Symbol.EXPRESSION, 3);
productions[24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */] = new ReductionPair(Symbol.EXPRESSION, 4);
productions[25 /* CELL_VALUE_AS_EXPRESSION */] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[26 /* ERROR_AND_CONTINUE */] = new ReductionPair(Symbol.EXPRESSION, 1);
productions[27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */] = new ReductionPair(Symbol.EXPRESSION, 2);
productions[28 /* FIXED_CELL_VAL */] = new ReductionPair(Symbol.CELL, 1);
productions[29 /* FIXED_CELL_RANGE_VAL */] = new ReductionPair(Symbol.CELL, 3);
productions[30 /* CELL_VALUE */] = new ReductionPair(Symbol.CELL, 1);
productions[31 /* CELL_RANGE_VALUE */] = new ReductionPair(Symbol.CELL, 3);
productions[32 /* ENSURE_IS_ARRAY */] = new ReductionPair(Symbol.EXP_SEQ, 1);
productions[33 /* ENSURE_YYTEXT_ARRAY */] = new ReductionPair(Symbol.EXP_SEQ, 1);
productions[34 /* REDUCE_INT */] = new ReductionPair(Symbol.EXP_SEQ, 3);
productions[35 /* REDUCE_PERCENT */] = new ReductionPair(Symbol.EXP_SEQ, 3);
productions[36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */] = new ReductionPair(Symbol.VARIABLE_SEQUENCE, 1);
productions[37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */] = new ReductionPair(Symbol.VARIABLE_SEQUENCE, 3);
productions[38 /* REFLEXIVE_REDUCE */] = new ReductionPair(Symbol.NUMBER, 1);
productions[39 /* REDUCE_FLOAT */] = new ReductionPair(Symbol.NUMBER, 3);
productions[40 /* REDUCE_PREV_AS_PERCENT */] = new ReductionPair(Symbol.NUMBER, 2);
productions[41 /* REDUCE_LAST_THREE_A */] = new ReductionPair(Symbol.ERROR, 3);
productions[42 /* REDUCE_LAST_THREE_B */] = new ReductionPair(Symbol.ERROR, 4);
productions[43 /* AS_ERROR */] = new ReductionPair(Symbol.EXPRESSION, 1);
var PRODUCTIONS = productions;
exports.PRODUCTIONS = PRODUCTIONS;
var SYMBOL_NAME_TO_INDEX = {
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
exports.SYMBOL_NAME_TO_INDEX = SYMBOL_NAME_TO_INDEX;
var symbolIndexToName = {};
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
var SYMBOL_INDEX_TO_NAME = symbolIndexToName;
exports.SYMBOL_INDEX_TO_NAME = SYMBOL_INDEX_TO_NAME;
/**
 * Array of to map rules to to LexActions and other rules. A single index in the object (e.g. `{2: 13}`) indicates the
 * rule object to follow for the next token, while an array (e.g. `{23: [1, ReduceActions.LTE]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
var table = [];
// All functions in the spreadsheet start with a 0-token.
table[0 /* Start */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSIONS, 1 /* Expressions */)
    .add(Symbol.EXPRESSION, 2 /* Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[1 /* Expressions */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.END, [ACCEPT])
    .build();
table[2 /* Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [SHIFT, 19 /* EOF_ReturnLast */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* Start_Equals */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* LessThan */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* GreaterThan */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .build();
table[3 /* VariableSeq */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.AMPERSAND, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.EQUALS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.PLUS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.LESS_THAN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.MINUS, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.ASTERISK, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.DIVIDE, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.CARROT, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.COMMA, [REDUCE, 2 /* CALL_VARIABLE */])
    .add(Symbol.DECIMAL, [SHIFT, 30 /* VariableSeq_Decimal */])
    .build();
table[6 /* Start_Number */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.AMPERSAND, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.EQUALS, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.PLUS, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.LESS_THAN, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.GREATER_THAN, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.MINUS, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.ASTERISK, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.DIVIDE, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.CARROT, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.SEMI_COLON, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.COMMA, [REDUCE, 5 /* AS_NUMBER */])
    .add(Symbol.PERCENT, [SHIFT, 31 /* Number_Percent */])
    .build();
table[7 /* Start_String */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.AMPERSAND, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.EQUALS, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.PLUS, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.LESS_THAN, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.GREATER_THAN, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.MINUS, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.ASTERISK, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.DIVIDE, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.CARROT, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.SEMI_COLON, [REDUCE, 6 /* AS_STRING */])
    .add(Symbol.COMMA, [REDUCE, 6 /* AS_STRING */])
    .build();
table[8 /* LeftParen */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 32 /* LeftParen_Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[9 /* PrefixUnaryMinus */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 33 /* PrefixUnaryMinus_Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[10 /* PrefixUnaryPlus */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 34 /* PrefixUnaryPlus_Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[11 /* Function */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.LEFT_PAREN, [SHIFT, 35 /* Function_LeftParen */])
    .build();
table[12 /* Cell */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.AMPERSAND, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.EQUALS, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.PLUS, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.LESS_THAN, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.GREATER_THAN, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.MINUS, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.ASTERISK, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.DIVIDE, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.CARROT, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.SEMI_COLON, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .add(Symbol.COMMA, [REDUCE, 25 /* CELL_VALUE_AS_EXPRESSION */])
    .build();
table[13 /* Error */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 36 /* Error_Error */)
    .add(Symbol.EOF, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.AMPERSAND, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.EQUALS, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.PLUS, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.LESS_THAN, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.MINUS, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.ASTERISK, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.DIVIDE, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.CARROT, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.COMMA, [REDUCE, 26 /* ERROR_AND_CONTINUE */])
    .add(Symbol.VARIABLE, [SHIFT, 37])
    .add(Symbol.FULL_ERROR, [SHIFT, 18])
    .build();
table[14 /* Variable */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.AMPERSAND, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.EQUALS, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.PLUS, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.LESS_THAN, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.GREATER_THAN, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.MINUS, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.ASTERISK, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.DIVIDE, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.CARROT, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.SEMI_COLON, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.COMMA, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.DECIMAL, [REDUCE, 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */])
    .add(Symbol.FULL_ERROR, [SHIFT, 38])
    .build();
table[15 /* NumberUpper */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.AMPERSAND, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.EQUALS, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.PLUS, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.LESS_THAN, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.MINUS, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.ASTERISK, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.DIVIDE, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.CARROT, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.COMMA, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(Symbol.DECIMAL, [SHIFT, 39])
    .add(Symbol.PERCENT, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .add(38, [REDUCE, 38 /* REFLEXIVE_REDUCE */])
    .build();
table[16 /* FixedCell */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.AMPERSAND, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.EQUALS, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.PLUS, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.LESS_THAN, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.GREATER_THAN, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.MINUS, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.ASTERISK, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.DIVIDE, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.CARROT, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.COLON, [SHIFT, 40])
    .add(Symbol.SEMI_COLON, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .add(Symbol.COMMA, [REDUCE, 28 /* FIXED_CELL_VAL */])
    .build();
table[17 /* CellUpper */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.AMPERSAND, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.EQUALS, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.PLUS, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.LESS_THAN, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.MINUS, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.ASTERISK, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.DIVIDE, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.CARROT, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.COLON, [SHIFT, 41])
    .add(Symbol.SEMI_COLON, [REDUCE, 30 /* CELL_VALUE */])
    .add(Symbol.COMMA, [REDUCE, 30 /* CELL_VALUE */])
    .build();
table[18 /* Pound */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.VARIABLE, [SHIFT, 42 /* Pound_Variable */])
    .add(Symbol.EOF, [REDUCE, 43 /* AS_ERROR */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 43 /* AS_ERROR */])
    .add(Symbol.COMMA, [REDUCE, 43 /* AS_ERROR */])
    .build();
table[19 /* EOF_ReturnLast */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.END, [REDUCE, 1 /* RETURN_LAST */])
    .build();
table[20 /* Number_Ampersand */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 43 /* Number_Ampersand_Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18])
    .build();
table[21 /* Start_Equals */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 44 /* Start_Equals_Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[22 /* Number_Plus */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 45 /* AddTwoNumbers */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[23 /* LessThan */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 48 /* LessThan_Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.EQUALS, [SHIFT, 46 /* LessThan_Equals */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.GREATER_THAN, [SHIFT, 47 /* LessThan_GreaterThan */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[24 /* GreaterThan */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 50 /* GreaterThan_Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.EQUALS, [SHIFT, 49 /* GreaterThan_Equals */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[25] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 51)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[26 /* Number_Minus */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 52 /* SubtractTwoNumbers */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[27 /* Number_Asterisk */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 53 /* MultiplyTwoNumbers */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[28 /* Number_Divide */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 54 /* DivideTwoNumbers */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[29 /* Number_Carrot */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 55 /* PowerTwoNumbers */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[30 /* VariableSeq_Decimal */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.VARIABLE, [SHIFT, 56 /* VariableSeq_Decimal_Variable */])
    .build();
table[31 /* Number_Percent */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.AMPERSAND, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.EQUALS, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.PLUS, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.LESS_THAN, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.GREATER_THAN, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.MINUS, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.ASTERISK, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.DIVIDE, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.CARROT, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.SEMI_COLON, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.COMMA, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(Symbol.PERCENT, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .add(38, [REDUCE, 40 /* REDUCE_PREV_AS_PERCENT */])
    .build();
table[32 /* LeftParen_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* Start_Equals */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [SHIFT, 57 /* CLOSE_PAREN_ON_EXPRESSION */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* LessThan */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* GreaterThan */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .build();
table[33 /* PrefixUnaryMinus_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.PLUS, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.LESS_THAN, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.GREATER_THAN, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.MINUS, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.ASTERISK, [SHIFT, 27])
    .add(Symbol.DIVIDE, [SHIFT, 28])
    .add(Symbol.CARROT, [SHIFT, 29])
    .add(Symbol.SEMI_COLON, [REDUCE, 21 /* INVERT_NUM */])
    .add(Symbol.COMMA, [REDUCE, 21 /* INVERT_NUM */])
    .build();
table[34 /* PrefixUnaryPlus_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.PLUS, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.LESS_THAN, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.GREATER_THAN, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.MINUS, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .add(Symbol.COMMA, [REDUCE, 22 /* TO_NUMBER_NAN_AS_ZERO */])
    .build();
table[35 /* Function_LeftParen */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 60 /* Function_LeftParen_Expression */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.RIGHT_PAREN, [SHIFT, 58])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.EXP_SEQ, 59)
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.ARRAY, [SHIFT, 61])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[36 /* Error_Error */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.AMPERSAND, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.EQUALS, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.PLUS, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.LESS_THAN, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.GREATER_THAN, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.MINUS, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.ASTERISK, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.DIVIDE, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.CARROT, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.SEMI_COLON, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .add(Symbol.COMMA, [REDUCE, 27 /* ERROR_AND_CONTINUE_WITH_OTHER_ERRORS */])
    .build();
table[37] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.FULL_ERROR, [REDUCE, 43 /* AS_ERROR */])
    .build();
table[38] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.VARIABLE, [SHIFT, 62])
    .build();
table[39] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.NUMBER_UPPER, [SHIFT, 63])
    .build();
table[40] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.FIXEDCELL, [SHIFT, 64])
    .build();
table[41] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.CELL_UPPER, [SHIFT, 65])
    .build();
table[42 /* Pound_Variable */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EXCLAMATION_POINT, [SHIFT, 66])
    .build();
table[43 /* Number_Ampersand_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.AMPERSAND, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.EQUALS, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.PLUS, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.LESS_THAN, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.GREATER_THAN, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.MINUS, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.ASTERISK, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.DIVIDE, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.CARROT, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.SEMI_COLON, [REDUCE, 7 /* AMPERSAND */])
    .add(Symbol.COMMA, [REDUCE, 7 /* AMPERSAND */])
    .build();
table[44 /* Start_Equals_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 8 /* EQUALS */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 8 /* EQUALS */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 8 /* EQUALS */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* LessThan */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* GreaterThan */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 8 /* EQUALS */])
    .add(Symbol.COMMA, [REDUCE, 8 /* EQUALS */])
    .build();
table[45 /* AddTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 9 /* PLUS */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 9 /* PLUS */])
    .add(Symbol.PLUS, [REDUCE, 9 /* PLUS */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 9 /* PLUS */])
    .add(Symbol.LESS_THAN, [REDUCE, 9 /* PLUS */])
    .add(Symbol.GREATER_THAN, [REDUCE, 9 /* PLUS */])
    .add(Symbol.MINUS, [REDUCE, 9 /* PLUS */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 9 /* PLUS */])
    .add(Symbol.COMMA, [REDUCE, 9 /* PLUS */])
    .build();
table[46 /* LessThan_Equals */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 67)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[47 /* LessThan_GreaterThan */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 68)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[48 /* LessThan_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 16 /* LT */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 16 /* LT */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 16 /* LT */])
    .add(Symbol.LESS_THAN, [REDUCE, 16 /* LT */])
    .add(Symbol.GREATER_THAN, [REDUCE, 16 /* LT */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 16 /* LT */])
    .add(Symbol.COMMA, [REDUCE, 16 /* LT */])
    .build();
table[49 /* GreaterThan_Equals */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 69 /* GTETwoExpressions */)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[50 /* GreaterThan_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 15 /* GT */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 15 /* GT */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 15 /* GT */])
    .add(Symbol.LESS_THAN, [REDUCE, 15 /* GT */])
    .add(Symbol.GREATER_THAN, [REDUCE, 15 /* GT */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 15 /* GT */])
    .add(Symbol.COMMA, [REDUCE, 15 /* GT */])
    .build();
table[51] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.PLUS, [SHIFT, 22])
    .add(Symbol.LESS_THAN, [SHIFT, 23])
    .add(Symbol.GREATER_THAN, [SHIFT, 24])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28])
    .add(Symbol.CARROT, [SHIFT, 29])
    .build();
table[52 /* SubtractTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 17 /* MINUS */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 17 /* MINUS */])
    .add(Symbol.PLUS, [REDUCE, 17 /* MINUS */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 17 /* MINUS */])
    .add(Symbol.LESS_THAN, [REDUCE, 17 /* MINUS */])
    .add(Symbol.GREATER_THAN, [REDUCE, 17 /* MINUS */])
    .add(Symbol.MINUS, [REDUCE, 17 /* MINUS */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28])
    .add(Symbol.CARROT, [SHIFT, 29])
    .add(Symbol.SEMI_COLON, [REDUCE, 17 /* MINUS */])
    .add(Symbol.COMMA, [REDUCE, 17 /* MINUS */])
    .build();
table[53 /* MultiplyTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.AMPERSAND, [SHIFT, 20])
    .add(Symbol.EQUALS, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.PLUS, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.LESS_THAN, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.GREATER_THAN, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.MINUS, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.ASTERISK, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.DIVIDE, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.CARROT, [SHIFT, 29])
    .add(Symbol.SEMI_COLON, [REDUCE, 18 /* MULTIPLY */])
    .add(Symbol.COMMA, [REDUCE, 18 /* MULTIPLY */])
    .build();
table[54 /* DivideTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.AMPERSAND, [SHIFT, 20]) // ???same
    .add(Symbol.EQUALS, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.PLUS, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.LESS_THAN, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.MINUS, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.ASTERISK, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.DIVIDE, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.CARROT, [SHIFT, 29])
    .add(Symbol.SEMI_COLON, [REDUCE, 19 /* DIVIDE */])
    .add(Symbol.COMMA, [REDUCE, 19 /* DIVIDE */])
    .build();
table[55 /* PowerTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.AMPERSAND, [SHIFT, 20])
    .add(Symbol.EQUALS, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.PLUS, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.LESS_THAN, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.GREATER_THAN, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.MINUS, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.ASTERISK, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.DIVIDE, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.CARROT, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.SEMI_COLON, [REDUCE, 20 /* TO_POWER */])
    .add(Symbol.COMMA, [REDUCE, 20 /* TO_POWER */])
    .build();
table[56 /* VariableSeq_Decimal_Variable */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.AMPERSAND, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.EQUALS, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.PLUS, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.LESS_THAN, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.GREATER_THAN, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.MINUS, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.ASTERISK, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.DIVIDE, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.CARROT, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.SEMI_COLON, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.COMMA, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .add(Symbol.DECIMAL, [REDUCE, 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */])
    .build();
table[57 /* CLOSE_PAREN_ON_EXPRESSION */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.AMPERSAND, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.EQUALS, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.PLUS, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.LESS_THAN, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.GREATER_THAN, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.MINUS, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.ASTERISK, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.DIVIDE, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.CARROT, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.SEMI_COLON, [REDUCE, 10 /* LAST_NUMBER */])
    .add(Symbol.COMMA, [REDUCE, 10 /* LAST_NUMBER */])
    .build();
table[58] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.AMPERSAND, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.EQUALS, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.PLUS, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.LESS_THAN, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.GREATER_THAN, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.MINUS, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.ASTERISK, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.DIVIDE, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.CARROT, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.SEMI_COLON, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .add(Symbol.COMMA, [REDUCE, 23 /* CALL_FUNCTION_LAST_BLANK */])
    .build();
table[59] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.RIGHT_PAREN, [SHIFT, 70 /* CLOSE_PAREN_ON_FUNCTION */])
    .add(Symbol.SEMI_COLON, [SHIFT, 71 /* Variable_SemiColon */])
    .add(Symbol.COMMA, [SHIFT, 72 /* Variable_Comma */])
    .build();
table[60 /* Function_LeftParen_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* Start_Equals */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 32 /* ENSURE_IS_ARRAY */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* LessThan */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* GreaterThan */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 32 /* ENSURE_IS_ARRAY */])
    .add(Symbol.COMMA, [REDUCE, 32 /* ENSURE_IS_ARRAY */])
    .build();
table[61] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.RIGHT_PAREN, [REDUCE, 33 /* ENSURE_YYTEXT_ARRAY */])
    .add(Symbol.SEMI_COLON, [REDUCE, 33 /* ENSURE_YYTEXT_ARRAY */])
    .add(Symbol.COMMA, [REDUCE, 33 /* ENSURE_YYTEXT_ARRAY */])
    .build();
table[62] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EXCLAMATION_POINT, [SHIFT, 73])
    .build();
table[63] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.AMPERSAND, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.EQUALS, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.PLUS, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.LESS_THAN, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.GREATER_THAN, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.MINUS, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.ASTERISK, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.DIVIDE, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.CARROT, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.SEMI_COLON, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.COMMA, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(Symbol.PERCENT, [REDUCE, 39 /* REDUCE_FLOAT */])
    .add(38, [REDUCE, 39 /* REDUCE_FLOAT */]).build();
table[64] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.AMPERSAND, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.EQUALS, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.PLUS, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.LESS_THAN, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.GREATER_THAN, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.MINUS, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.ASTERISK, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.DIVIDE, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.CARROT, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.SEMI_COLON, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */])
    .add(Symbol.COMMA, [REDUCE, 29 /* FIXED_CELL_RANGE_VAL */]).build();
table[65] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.AMPERSAND, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.EQUALS, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.PLUS, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.LESS_THAN, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.MINUS, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.ASTERISK, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.DIVIDE, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.CARROT, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.SEMI_COLON, [REDUCE, 31 /* CELL_RANGE_VALUE */])
    .add(Symbol.COMMA, [REDUCE, 31 /* CELL_RANGE_VALUE */]).build();
table[66] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.AMPERSAND, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.EQUALS, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.PLUS, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.LESS_THAN, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.GREATER_THAN, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.MINUS, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.ASTERISK, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.DIVIDE, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.CARROT, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.SEMI_COLON, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.COMMA, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.VARIABLE, [REDUCE, 41 /* REDUCE_LAST_THREE_A */])
    .add(Symbol.FULL_ERROR, [REDUCE, 41 /* REDUCE_LAST_THREE_A */]).build();
table[67] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 11 /* LTE */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 11 /* LTE */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 11 /* LTE */])
    .add(Symbol.LESS_THAN, [REDUCE, 11 /* LTE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 11 /* LTE */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 11 /* LTE */])
    .add(Symbol.COMMA, [REDUCE, 11 /* LTE */]).build();
table[68] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.LESS_THAN, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.GREATER_THAN, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 13 /* NOT_EQ */])
    .add(Symbol.COMMA, [REDUCE, 13 /* NOT_EQ */]).build();
table[69 /* GTETwoExpressions */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 12 /* GTE */])
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [REDUCE, 12 /* GTE */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 12 /* GTE */])
    .add(Symbol.LESS_THAN, [REDUCE, 12 /* GTE */])
    .add(Symbol.GREATER_THAN, [REDUCE, 12 /* GTE */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 12 /* GTE */])
    .add(Symbol.COMMA, [REDUCE, 12 /* GTE */])
    .build();
table[70 /* CLOSE_PAREN_ON_FUNCTION */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.AMPERSAND, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.EQUALS, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.PLUS, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.LESS_THAN, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.GREATER_THAN, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.MINUS, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.ASTERISK, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.DIVIDE, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.CARROT, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.SEMI_COLON, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .add(Symbol.COMMA, [REDUCE, 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */])
    .build();
table[71 /* Variable_SemiColon */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 74)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* Start_Equals */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[72 /* Variable_Comma */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.ERROR, 13 /* Error */)
    .add(Symbol.EXPRESSION, 75)
    .add(Symbol.VARIABLE_SEQUENCE, 3 /* VariableSeq */)
    .add(Symbol.NUMBER, 6 /* Start_Number */)
    .add(Symbol.STRING, [SHIFT, 7 /* Start_String */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* Start_Equals */])
    .add(Symbol.PLUS, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbol.LEFT_PAREN, [SHIFT, 8 /* LeftParen */])
    .add(Symbol.MINUS, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbol.FUNCTION, [SHIFT, 11 /* Function */])
    .add(Symbol.CELL, 12 /* Cell */)
    .add(Symbol.FIXEDCELL, [SHIFT, 16 /* FixedCell */])
    .add(Symbol.CELL_UPPER, [SHIFT, 17 /* CellUpper */])
    .add(Symbol.VARIABLE, [SHIFT, 14 /* Variable */])
    .add(Symbol.NUMBER_UPPER, [SHIFT, 15 /* NumberUpper */])
    .add(Symbol.ARRAY, [SHIFT, 61])
    .add(Symbol.FULL_ERROR, [SHIFT, 18 /* Pound */])
    .build();
table[73] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.EOF, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.AMPERSAND, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.EQUALS, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.PLUS, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.LESS_THAN, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.GREATER_THAN, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.MINUS, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.ASTERISK, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.DIVIDE, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.CARROT, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.SEMI_COLON, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.COMMA, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.VARIABLE, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .add(Symbol.FULL_ERROR, [REDUCE, 42 /* REDUCE_LAST_THREE_B */])
    .build();
table[74] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* Start_Equals */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 34 /* REDUCE_INT */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* LessThan */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* GreaterThan */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 34 /* REDUCE_INT */])
    .add(Symbol.COMMA, [REDUCE, 34 /* REDUCE_INT */]).build();
table[75] = ObjectBuilder_1.ObjectBuilder
    .add(Symbol.AMPERSAND, [SHIFT, 20 /* Number_Ampersand */])
    .add(Symbol.EQUALS, [SHIFT, 21 /* Start_Equals */])
    .add(Symbol.PLUS, [SHIFT, 22 /* Number_Plus */])
    .add(Symbol.RIGHT_PAREN, [REDUCE, 35 /* REDUCE_PERCENT */])
    .add(Symbol.LESS_THAN, [SHIFT, 23 /* LessThan */])
    .add(Symbol.GREATER_THAN, [SHIFT, 24 /* GreaterThan */])
    .add(Symbol.MINUS, [SHIFT, 26 /* Number_Minus */])
    .add(Symbol.ASTERISK, [SHIFT, 27 /* Number_Asterisk */])
    .add(Symbol.DIVIDE, [SHIFT, 28 /* Number_Divide */])
    .add(Symbol.CARROT, [SHIFT, 29 /* Number_Carrot */])
    .add(Symbol.SEMI_COLON, [REDUCE, 35 /* REDUCE_PERCENT */])
    .add(Symbol.COMMA, [REDUCE, 35 /* REDUCE_PERCENT */]).build();
var ACTION_TABLE = table;
exports.ACTION_TABLE = ACTION_TABLE;
