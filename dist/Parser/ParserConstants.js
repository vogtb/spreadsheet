"use strict";
exports.__esModule = true;
var ObjectBuilder_1 = require("../Utilities/ObjectBuilder");
var Symbols_1 = require("./Symbols");
var ReductionPair_1 = require("./ReductionPair");
var Rules_1 = require("./Rules");
exports.RULES = Rules_1.RULES;
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
 * Productions is used to look up both the number to use when reducing the stack (productions[x][1]) and the semantic
 * value that will replace the tokens in the stack (productions[x][0]).
 * @type {Array<ReductionPair>}
 *
 * Maps a ProductionRule to the appropriate number of previous tokens to use in a reduction action.
 */
var productions = [];
productions[0 /* NoAction */] = null;
productions[1 /* ReturnLast */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expressions, 2);
productions[2 /* CallVariable */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 1);
productions[5 /* AsNumber */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 1);
productions[6 /* AsString */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 1);
productions[7 /* Ampersand */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[8 /* Equals */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[9 /* Plus */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[10 /* LastExpression */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[11 /* LTE */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 4);
productions[12 /* GTE */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 4);
productions[13 /* NotEqual */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 4);
productions[15 /* GT */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[16 /* LT */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[17 /* Minus */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[18 /* Multiply */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[19 /* Divide */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[20 /* ToPower */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[21 /* InvertNumber */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 2);
productions[22 /* ToNumberNANAsZero */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 2);
productions[23 /* CallFunctionLastBlank */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 3);
productions[24 /* CallFunctionLastTwoInStack */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 4);
productions[25 /* CellValueAsExpression */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 1);
productions[26 /* ErrorAndContinue */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 1);
productions[27 /* ErrorAndContinueWithOtherErrors */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 2);
productions[28 /* FixedCellValue */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Cell, 1);
productions[29 /* FixedCellRangeValue */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Cell, 3);
productions[30 /* CellValue */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Cell, 1);
productions[31 /* CellRangeValue */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Cell, 3);
productions[32 /* EnsureIsArray */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.ExpressionSeq, 1);
productions[33 /* EnsureYYTextIsArray */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.ExpressionSeq, 1);
productions[34 /* ReduceInt */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.ExpressionSeq, 3);
productions[35 /* ReducePercent */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.ExpressionSeq, 3);
productions[36 /* WrapCurrentTokenAsArray */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.VariableSeq, 1);
productions[37 /* EnsureLastTwoINArrayAndPush */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.VariableSeq, 3);
productions[38 /* ReflexiveReduce */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Number, 1);
productions[39 /* ReduceFloat */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Number, 3);
productions[40 /* ReducePrevAsPercent */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Number, 2);
productions[41 /* ReduceLastThreeA */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Error, 3);
productions[42 /* ReduceLastThreeB */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Error, 4);
productions[43 /* AsError */] = new ReductionPair_1.ReductionPair(Symbols_1.Symbol.Expression, 1);
var PRODUCTIONS = productions;
exports.PRODUCTIONS = PRODUCTIONS;
var SYMBOL_NAME_TO_INDEX = {
    "$accept": Symbols_1.Symbol.Accept,
    "$end": Symbols_1.Symbol.End,
    "error": Symbols_1.Symbol.Error,
    "expressions": Symbols_1.Symbol.Expressions,
    "expression": Symbols_1.Symbol.Expression,
    "EOF": Symbols_1.Symbol.EOF,
    "variableSequence": Symbols_1.Symbol.VariableSeq,
    "number": Symbols_1.Symbol.Number,
    "STRING": Symbols_1.Symbol.String,
    "&": Symbols_1.Symbol.Ampersand,
    "=": Symbols_1.Symbol.Equals,
    "+": Symbols_1.Symbol.Plus,
    "(": Symbols_1.Symbol.LeftParen,
    ")": Symbols_1.Symbol.RightParen,
    "<": Symbols_1.Symbol.LessThan,
    ">": Symbols_1.Symbol.GreaterThan,
    "-": Symbols_1.Symbol.Minus,
    "*": Symbols_1.Symbol.Asterisk,
    "/": Symbols_1.Symbol.Divide,
    "^": Symbols_1.Symbol.Carrot,
    "FUNCTION": Symbols_1.Symbol.Function,
    "expseq": Symbols_1.Symbol.ExpressionSeq,
    "cell": Symbols_1.Symbol.Cell,
    "FIXEDCELL": Symbols_1.Symbol.FixedCell,
    ":": Symbols_1.Symbol.Colon,
    "CELL": Symbols_1.Symbol.CellUpper,
    "ARRAY": Symbols_1.Symbol.Array,
    ";": Symbols_1.Symbol.Semicolon,
    ",": Symbols_1.Symbol.Comma,
    "VARIABLE": Symbols_1.Symbol.Variable,
    "DECIMAL": Symbols_1.Symbol.Decimal,
    "NUMBER": Symbols_1.Symbol.NumberUpper,
    "%": Symbols_1.Symbol.Percent,
    "#": Symbols_1.Symbol.FullError,
    "!": Symbols_1.Symbol.ExclamationPoint
};
exports.SYMBOL_NAME_TO_INDEX = SYMBOL_NAME_TO_INDEX;
var symbolIndexToName = {};
symbolIndexToName[Symbols_1.Symbol.EOF] = "EOF";
symbolIndexToName[Symbols_1.Symbol.String] = "String";
symbolIndexToName[Symbols_1.Symbol.Ampersand] = "&";
symbolIndexToName[Symbols_1.Symbol.Equals] = "=";
symbolIndexToName[Symbols_1.Symbol.Plus] = "+";
symbolIndexToName[Symbols_1.Symbol.LeftParen] = "(";
symbolIndexToName[Symbols_1.Symbol.RightParen] = ")";
symbolIndexToName[Symbols_1.Symbol.LessThan] = "<";
symbolIndexToName[Symbols_1.Symbol.GreaterThan] = ">";
symbolIndexToName[Symbols_1.Symbol.Minus] = "-";
symbolIndexToName[Symbols_1.Symbol.Asterisk] = "*";
symbolIndexToName[Symbols_1.Symbol.Divide] = "/";
symbolIndexToName[Symbols_1.Symbol.Carrot] = "^";
symbolIndexToName[Symbols_1.Symbol.Function] = "Function";
symbolIndexToName[Symbols_1.Symbol.FixedCell] = "FIXED_CELL_REF";
symbolIndexToName[Symbols_1.Symbol.Cell] = "Cell";
symbolIndexToName[Symbols_1.Symbol.Colon] = ";";
symbolIndexToName[Symbols_1.Symbol.Comma] = ",";
symbolIndexToName[Symbols_1.Symbol.Variable] = "Variable";
symbolIndexToName[Symbols_1.Symbol.Decimal] = "Decimal";
symbolIndexToName[Symbols_1.Symbol.NumberUpper] = "Number";
symbolIndexToName[Symbols_1.Symbol.Percent] = "%";
symbolIndexToName[Symbols_1.Symbol.FullError] = "#";
symbolIndexToName[Symbols_1.Symbol.Array] = "Array";
symbolIndexToName[Symbols_1.Symbol.ExclamationPoint] = "!";
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
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expressions, 1 /* Expressions */)
    .add(Symbols_1.Symbol.Expression, 2 /* Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[1 /* Expressions */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.End, [ACCEPT])
    .build();
table[2 /* Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [SHIFT, 19 /* EOF_ReturnLast */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 21 /* Start_Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.LessThan, [SHIFT, 23 /* LessThan */])
    .add(Symbols_1.Symbol.GreaterThan, [SHIFT, 24 /* GreaterThan */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .build();
table[3 /* VariableSeq */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 2 /* CallVariable */])
    .add(Symbols_1.Symbol.Decimal, [SHIFT, 30 /* VariableSeq_Decimal */])
    .build();
table[6 /* Start_Number */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 5 /* AsNumber */])
    .add(Symbols_1.Symbol.Percent, [SHIFT, 31 /* Expression_Percent */])
    .build();
table[7 /* Start_String */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 6 /* AsString */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 6 /* AsString */])
    .build();
table[8 /* LeftParen */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 32 /* LeftParen_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[9 /* PrefixUnaryMinus */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 33 /* PrefixUnaryMinus_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[10 /* PrefixUnaryPlus */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 34 /* PrefixUnaryPlus_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[11 /* Function */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 35 /* Function_LeftParen */])
    .build();
table[12 /* Cell */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 25 /* CellValueAsExpression */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 25 /* CellValueAsExpression */])
    .build();
table[13 /* Error */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 36 /* Error_Error */)
    .add(Symbols_1.Symbol.EOF, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 26 /* ErrorAndContinue */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 37 /* Error_Variable */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[14 /* Variable */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.Decimal, [REDUCE, 36 /* WrapCurrentTokenAsArray */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 38 /* Variable_FullError */])
    .build();
table[15 /* Number */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.Decimal, [SHIFT, 39 /* Number_Decimal */])
    .add(Symbols_1.Symbol.Percent, [REDUCE, 38 /* ReflexiveReduce */])
    .add(Symbols_1.Symbol.ReflexiveReduce, [REDUCE, 38 /* ReflexiveReduce */])
    .build();
table[16 /* FixedCell */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Colon, [SHIFT, 40 /* FixedCell_Colon */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 28 /* FixedCellValue */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 28 /* FixedCellValue */])
    .build();
table[17 /* CellUpper */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Colon, [SHIFT, 41 /* CellUpper_Colon */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 30 /* CellValue */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 30 /* CellValue */])
    .build();
table[18 /* Pound */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Variable, [SHIFT, 42 /* Pound_Variable */])
    .add(Symbols_1.Symbol.EOF, [REDUCE, 43 /* AsError */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 43 /* AsError */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 43 /* AsError */])
    .build();
table[19 /* EOF_ReturnLast */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.End, [REDUCE, 1 /* ReturnLast */])
    .build();
table[20 /* Expression_Ampersand */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 43 /* Number_Ampersand_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[21 /* Start_Equals */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 44 /* Start_Equals_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[22 /* Expression_Plus */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 45 /* AddTwoNumbers */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[23 /* LessThan */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 48 /* LessThan_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 46 /* LessThan_Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.GreaterThan, [SHIFT, 47 /* LessThan_GreaterThan */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[24 /* GreaterThan */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 50 /* GreaterThan_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 49 /* GreaterThanEquals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
// table[25] is absent because it's unreachable.
table[26 /* Expression_Minus */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 52 /* SubtractTwoNumbers */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[27 /* Expression_Asterisk */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 53 /* MultiplyTwoNumbers */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[28 /* Expression_Divide */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 54 /* DivideTwoNumbers */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[29 /* Expression_Carrot */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 55 /* PowerTwoNumbers */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[30 /* VariableSeq_Decimal */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Variable, [SHIFT, 56 /* VariableSeq_Decimal_Variable */])
    .build();
table[31 /* Expression_Percent */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.Percent, [REDUCE, 40 /* ReducePrevAsPercent */])
    .add(Symbols_1.Symbol.ReflexiveReduce, [REDUCE, 40 /* ReducePrevAsPercent */])
    .build();
table[32 /* LeftParen_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 21 /* Start_Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [SHIFT, 57 /* Expression_RightParen */])
    .add(Symbols_1.Symbol.LessThan, [SHIFT, 23 /* LessThan */])
    .add(Symbols_1.Symbol.GreaterThan, [SHIFT, 24 /* GreaterThan */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .build();
table[33 /* PrefixUnaryMinus_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 21 /* InvertNumber */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 21 /* InvertNumber */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 21 /* InvertNumber */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 21 /* InvertNumber */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 21 /* InvertNumber */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 21 /* InvertNumber */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 21 /* InvertNumber */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 21 /* InvertNumber */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 21 /* InvertNumber */])
    .build();
table[34 /* PrefixUnaryPlus_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 22 /* ToNumberNANAsZero */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 22 /* ToNumberNANAsZero */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 22 /* ToNumberNANAsZero */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 22 /* ToNumberNANAsZero */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 22 /* ToNumberNANAsZero */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 22 /* ToNumberNANAsZero */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 22 /* ToNumberNANAsZero */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 22 /* ToNumberNANAsZero */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 22 /* ToNumberNANAsZero */])
    .build();
table[35 /* Function_LeftParen */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 60 /* Function_LeftParen_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.RightParen, [SHIFT, 58 /* Function_RightParenNoArguments */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.ExpressionSeq, 59 /* Function_LeftParen_ExpressionSeq */)
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Array, [SHIFT, 61 /* LeftParen_Array */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[36 /* Error_Error */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 27 /* ErrorAndContinueWithOtherErrors */])
    .build();
table[37 /* Error_Variable */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.FullError, [REDUCE, 43 /* AsError */])
    .build();
table[38 /* Variable_FullError */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Variable, [SHIFT, 62 /* Variable_FullError_Variable */])
    .build();
table[39 /* Number_Decimal */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 63 /* Number_Decimal_NumberUpper */])
    .build();
table[40 /* FixedCell_Colon */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 64 /* FixedCell_Colon_FixedCell */])
    .build();
table[41 /* CellUpper_Colon */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 65 /* CellUpper_Colon_CellUpper */])
    .build();
table[42 /* Pound_Variable */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.ExclamationPoint, [SHIFT, 66 /* Pound_Variable_ExclamationPoint */])
    .build();
table[43 /* Number_Ampersand_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 7 /* Ampersand */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 7 /* Ampersand */])
    .build();
table[44 /* Start_Equals_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 8 /* Equals */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 8 /* Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 8 /* Equals */])
    .add(Symbols_1.Symbol.LessThan, [SHIFT, 23 /* LessThan */])
    .add(Symbols_1.Symbol.GreaterThan, [SHIFT, 24 /* GreaterThan */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 8 /* Equals */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 8 /* Equals */])
    .build();
table[45 /* AddTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 9 /* Plus */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 9 /* Plus */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 9 /* Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 9 /* Plus */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 9 /* Plus */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 9 /* Plus */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 9 /* Plus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 9 /* Plus */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 9 /* Plus */])
    .build();
table[46 /* LessThan_Equals */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 67 /* LessThan_Equals_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[47 /* LessThan_GreaterThan */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 68 /* LessThan_GreaterThan_Expression */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[48 /* LessThan_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 16 /* LT */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 16 /* LT */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 16 /* LT */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 16 /* LT */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 16 /* LT */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 16 /* LT */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 16 /* LT */])
    .build();
table[49 /* GreaterThanEquals */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 69 /* GreaterThanEquals_Expressions */)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[50 /* GreaterThan_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 15 /* GT */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 15 /* GT */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 15 /* GT */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 15 /* GT */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 15 /* GT */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 15 /* GT */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 15 /* GT */])
    .build();
table[51] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.LessThan, [SHIFT, 23 /* LessThan */])
    .add(Symbols_1.Symbol.GreaterThan, [SHIFT, 24 /* GreaterThan */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .build();
table[52 /* SubtractTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 17 /* Minus */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 17 /* Minus */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 17 /* Minus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 17 /* Minus */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 17 /* Minus */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 17 /* Minus */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 17 /* Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 17 /* Minus */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 17 /* Minus */])
    .build();
table[53 /* MultiplyTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 18 /* Multiply */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 18 /* Multiply */])
    .build();
table[54 /* DivideTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 19 /* Divide */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 19 /* Divide */])
    .build();
table[55 /* PowerTwoNumbers */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 20 /* ToPower */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 20 /* ToPower */])
    .build();
table[56 /* VariableSeq_Decimal_Variable */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .add(Symbols_1.Symbol.Decimal, [REDUCE, 37 /* EnsureLastTwoINArrayAndPush */])
    .build();
table[57 /* Expression_RightParen */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 10 /* LastExpression */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 10 /* LastExpression */])
    .build();
table[58 /* Function_RightParenNoArguments */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 23 /* CallFunctionLastBlank */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 23 /* CallFunctionLastBlank */])
    .build();
table[59 /* Function_LeftParen_ExpressionSeq */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.RightParen, [SHIFT, 70 /* Function_Etc_RightParen */])
    .add(Symbols_1.Symbol.Semicolon, [SHIFT, 71 /* Variable_SemiColon */])
    .add(Symbols_1.Symbol.Comma, [SHIFT, 72 /* Variable_Comma */])
    .build();
table[60 /* Function_LeftParen_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 21 /* Start_Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 32 /* EnsureIsArray */])
    .add(Symbols_1.Symbol.LessThan, [SHIFT, 23 /* LessThan */])
    .add(Symbols_1.Symbol.GreaterThan, [SHIFT, 24 /* GreaterThan */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 32 /* EnsureIsArray */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 32 /* EnsureIsArray */])
    .build();
table[61 /* LeftParen_Array */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 33 /* EnsureYYTextIsArray */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 33 /* EnsureYYTextIsArray */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 33 /* EnsureYYTextIsArray */])
    .build();
table[62 /* Variable_FullError_Variable */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.ExclamationPoint, [SHIFT, 73 /* Variable_FullError_Variable_ExclamationPoint */])
    .build();
table[63 /* Number_Decimal_NumberUpper */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.Percent, [REDUCE, 39 /* ReduceFloat */])
    .add(Symbols_1.Symbol.ReflexiveReduce, [REDUCE, 39 /* ReduceFloat */]).build();
table[64 /* FixedCell_Colon_FixedCell */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 29 /* FixedCellRangeValue */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 29 /* FixedCellRangeValue */]).build();
table[65 /* CellUpper_Colon_CellUpper */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 31 /* CellRangeValue */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 31 /* CellRangeValue */]).build();
table[66 /* Pound_Variable_ExclamationPoint */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.Variable, [REDUCE, 41 /* ReduceLastThreeA */])
    .add(Symbols_1.Symbol.FullError, [REDUCE, 41 /* ReduceLastThreeA */]).build();
table[67 /* LessThan_Equals_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 11 /* LTE */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 11 /* LTE */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 11 /* LTE */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 11 /* LTE */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 11 /* LTE */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 11 /* LTE */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 11 /* LTE */]).build();
table[68 /* LessThan_GreaterThan_Expression */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 13 /* NotEqual */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 13 /* NotEqual */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 13 /* NotEqual */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 13 /* NotEqual */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 13 /* NotEqual */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 13 /* NotEqual */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 13 /* NotEqual */]).build();
table[69 /* GreaterThanEquals_Expressions */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 12 /* GTE */])
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 12 /* GTE */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 12 /* GTE */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 12 /* GTE */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 12 /* GTE */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 12 /* GTE */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 12 /* GTE */])
    .build();
table[70 /* Function_Etc_RightParen */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 24 /* CallFunctionLastTwoInStack */])
    .build();
table[71 /* Variable_SemiColon */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 74)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 21 /* Start_Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[72 /* Variable_Comma */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Error, 13 /* Error */)
    .add(Symbols_1.Symbol.Expression, 75)
    .add(Symbols_1.Symbol.VariableSeq, 3 /* VariableSeq */)
    .add(Symbols_1.Symbol.Number, 6 /* Start_Number */)
    .add(Symbols_1.Symbol.String, [SHIFT, 7 /* Start_String */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 21 /* Start_Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 10 /* PrefixUnaryPlus */])
    .add(Symbols_1.Symbol.LeftParen, [SHIFT, 8 /* LeftParen */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 9 /* PrefixUnaryMinus */])
    .add(Symbols_1.Symbol.Function, [SHIFT, 11 /* Function */])
    .add(Symbols_1.Symbol.Cell, 12 /* Cell */)
    .add(Symbols_1.Symbol.FixedCell, [SHIFT, 16 /* FixedCell */])
    .add(Symbols_1.Symbol.CellUpper, [SHIFT, 17 /* CellUpper */])
    .add(Symbols_1.Symbol.Variable, [SHIFT, 14 /* Variable */])
    .add(Symbols_1.Symbol.NumberUpper, [SHIFT, 15 /* Number */])
    .add(Symbols_1.Symbol.Array, [SHIFT, 61])
    .add(Symbols_1.Symbol.FullError, [SHIFT, 18 /* Pound */])
    .build();
table[73 /* Variable_FullError_Variable_ExclamationPoint */] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.EOF, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Ampersand, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Equals, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Plus, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.LessThan, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.GreaterThan, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Minus, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Asterisk, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Divide, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Carrot, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.Variable, [REDUCE, 42 /* ReduceLastThreeB */])
    .add(Symbols_1.Symbol.FullError, [REDUCE, 42 /* ReduceLastThreeB */])
    .build();
table[74] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 21 /* Start_Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 34 /* ReduceInt */])
    .add(Symbols_1.Symbol.LessThan, [SHIFT, 23 /* LessThan */])
    .add(Symbols_1.Symbol.GreaterThan, [SHIFT, 24 /* GreaterThan */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 34 /* ReduceInt */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 34 /* ReduceInt */]).build();
table[75] = ObjectBuilder_1.ObjectBuilder
    .add(Symbols_1.Symbol.Ampersand, [SHIFT, 20 /* Expression_Ampersand */])
    .add(Symbols_1.Symbol.Equals, [SHIFT, 21 /* Start_Equals */])
    .add(Symbols_1.Symbol.Plus, [SHIFT, 22 /* Expression_Plus */])
    .add(Symbols_1.Symbol.RightParen, [REDUCE, 35 /* ReducePercent */])
    .add(Symbols_1.Symbol.LessThan, [SHIFT, 23 /* LessThan */])
    .add(Symbols_1.Symbol.GreaterThan, [SHIFT, 24 /* GreaterThan */])
    .add(Symbols_1.Symbol.Minus, [SHIFT, 26 /* Expression_Minus */])
    .add(Symbols_1.Symbol.Asterisk, [SHIFT, 27 /* Expression_Asterisk */])
    .add(Symbols_1.Symbol.Divide, [SHIFT, 28 /* Expression_Divide */])
    .add(Symbols_1.Symbol.Carrot, [SHIFT, 29 /* Expression_Carrot */])
    .add(Symbols_1.Symbol.Semicolon, [REDUCE, 35 /* ReducePercent */])
    .add(Symbols_1.Symbol.Comma, [REDUCE, 35 /* ReducePercent */]).build();
var ACTION_TABLE = table;
exports.ACTION_TABLE = ACTION_TABLE;
