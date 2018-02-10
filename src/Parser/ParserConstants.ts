import {
  ObjectBuilder
} from "../Utilities/ObjectBuilder";
import {
  Symbol
} from "./Symbols";
import {
  ReduceActions
} from "./ReduceActions";
import {
  ReductionPair
} from "./ReductionPair";
import {
  RULES
} from "./Rules";

/**
 * Actions to take when processing tokens one by one. We're always either taking the next token, reducing our current
 * tokens, or accepting and returning.
 */
const SHIFT = 1;
const REDUCE = 2;
const ACCEPT = 3;


/**
 * Productions is used to look up both the number to use when reducing the stack (productions[x][1]) and the semantic
 * value that will replace the tokens in the stack (productions[x][0]).
 * @type {Array<ReductionPair>}
 *
 * Maps a ProductionRule to the appropriate number of previous tokens to use in a reduction action.
 */
let productions : Array<ReductionPair> = [];
productions[ReduceActions.NoAction] = null;
productions[ReduceActions.ReturnLast] = new ReductionPair(Symbol.Expressions, 2);
productions[ReduceActions.CallVariable] = new ReductionPair(Symbol.Expression, 1);
productions[ReduceActions.AsNumber] = new ReductionPair(Symbol.Expression, 1);
productions[ReduceActions.AsString] = new ReductionPair(Symbol.Expression, 1);
productions[ReduceActions.Ampersand] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.Equals] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.Plus] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.LastNumber] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.LTE] = new ReductionPair(Symbol.Expression, 4);
productions[ReduceActions.GTE] = new ReductionPair(Symbol.Expression, 4);
productions[ReduceActions.NotEqual] = new ReductionPair(Symbol.Expression, 4);
productions[ReduceActions.GT] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.LT] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.Minus] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.Multiply] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.Divide] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.ToPower] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.InvertNumber] = new ReductionPair(Symbol.Expression, 2);
productions[ReduceActions.ToNumberNANAsZero] = new ReductionPair(Symbol.Expression, 2);
productions[ReduceActions.CallFunctionLastBlank] = new ReductionPair(Symbol.Expression, 3);
productions[ReduceActions.CallFunctionLastTwoInStack] = new ReductionPair(Symbol.Expression, 4);
productions[ReduceActions.CellValueAsExpression] = new ReductionPair(Symbol.Expression, 1);
productions[ReduceActions.ErrorAndContinue] = new ReductionPair(Symbol.Expression, 1);
productions[ReduceActions.ErrorAndContinueWithOtherErrors] = new ReductionPair(Symbol.Expression, 2);
productions[ReduceActions.FixedCellValue] = new ReductionPair(Symbol.Cell, 1);
productions[ReduceActions.FixedCellRangeValue] = new ReductionPair(Symbol.Cell, 3);
productions[ReduceActions.CellValue] = new ReductionPair(Symbol.Cell, 1);
productions[ReduceActions.CellRangeValue] = new ReductionPair(Symbol.Cell, 3);
productions[ReduceActions.EnsureIsArray] = new ReductionPair(Symbol.ExpressionSeq, 1);
productions[ReduceActions.EnsureYYTextIsArray] = new ReductionPair(Symbol.ExpressionSeq, 1);
productions[ReduceActions.ReduceInt] = new ReductionPair(Symbol.ExpressionSeq, 3);
productions[ReduceActions.ReducePercent] = new ReductionPair(Symbol.ExpressionSeq, 3);
productions[ReduceActions.WrapCurrentTokenAsArray] = new ReductionPair(Symbol.VariableSeq, 1);
productions[ReduceActions.EnsureLastTwoINArrayAndPush] = new ReductionPair(Symbol.VariableSeq, 3);
productions[ReduceActions.ReflexiveReduce] = new ReductionPair(Symbol.Number, 1);
productions[ReduceActions.ReduceFloat] = new ReductionPair(Symbol.Number, 3);
productions[ReduceActions.ReducePrevAsPercent] = new ReductionPair(Symbol.Number, 2);
productions[ReduceActions.ReduceLastThreeA] = new ReductionPair(Symbol.Error, 3);
productions[ReduceActions.ReduceLastThreeB] = new ReductionPair(Symbol.Error, 4);
productions[ReduceActions.AsError] = new ReductionPair(Symbol.Expression, 1);

const PRODUCTIONS = productions;

const SYMBOL_NAME_TO_INDEX = {
  "$accept": Symbol.Accept,
  "$end": Symbol.End,
  "error": Symbol.Error,
  "expressions": Symbol.Expressions,
  "expression": Symbol.Expression,
  "EOF": Symbol.EOF,
  "variableSequence": Symbol.VariableSeq,
  "number": Symbol.Number,
  "STRING": Symbol.String,
  "&": Symbol.Ampersand,
  "=": Symbol.Equals,
  "+": Symbol.Plus,
  "(": Symbol.LeftParen,
  ")": Symbol.RightParen,
  "<": Symbol.LessThan,
  ">": Symbol.GreaterThan,
  "-": Symbol.Minus,
  "*": Symbol.Asterisk,
  "/": Symbol.Divide,
  "^": Symbol.Carrot,
  "FUNCTION": Symbol.Function,
  "expseq": Symbol.ExpressionSeq,
  "cell": Symbol.Cell,
  "FIXEDCELL": Symbol.FixedCell,
  ":": Symbol.Colon,
  "CELL": Symbol.CellUpper,
  "ARRAY": Symbol.Array,
  ";": Symbol.Semicolon,
  ",": Symbol.Comma,
  "VARIABLE": Symbol.Variable,
  "DECIMAL": Symbol.Decimal,
  "NUMBER": Symbol.NumberUpper,
  "%": Symbol.Percent,
  "#": Symbol.FullError,
  "!": Symbol.ExclamationPoint
};
let symbolIndexToName = {};
symbolIndexToName[Symbol.EOF] = "EOF";
symbolIndexToName[Symbol.String] = "String";
symbolIndexToName[Symbol.Ampersand] = "&";
symbolIndexToName[Symbol.Equals] = "=";
symbolIndexToName[Symbol.Plus] = "+";
symbolIndexToName[Symbol.LeftParen] = "(";
symbolIndexToName[Symbol.RightParen] = ")";
symbolIndexToName[Symbol.LessThan] = "<";
symbolIndexToName[Symbol.GreaterThan] = ">";
symbolIndexToName[Symbol.Minus] = "-";
symbolIndexToName[Symbol.Asterisk] = "*";
symbolIndexToName[Symbol.Divide] = "/";
symbolIndexToName[Symbol.Carrot] = "^";
symbolIndexToName[Symbol.Function] = "Function";
symbolIndexToName[Symbol.FixedCell] = "FIXED_CELL_REF";
symbolIndexToName[Symbol.Cell] = "Cell";
symbolIndexToName[Symbol.Colon] = ";";
symbolIndexToName[Symbol.Comma] = ",";
symbolIndexToName[Symbol.Variable] = "Variable";
symbolIndexToName[Symbol.Decimal] = "Decimal";
symbolIndexToName[Symbol.NumberUpper] = "Number";
symbolIndexToName[Symbol.Percent] = "%";
symbolIndexToName[Symbol.FullError] = "#";
symbolIndexToName[Symbol.Array] = "Array";
symbolIndexToName[Symbol.ExclamationPoint] = "!";
const SYMBOL_INDEX_TO_NAME = symbolIndexToName;


/**
 * State represents the state of the parser. Enums should be in the format {prev}_{next}.
 */
const enum State {
  // Start
  Start = 0,
  Start_Number = 6,
  Start_String = 7,
  Start_Equals = 21,
  Start_Equals_Expression = 44,
  // Number
  Number = 15,
  Number_Decimal = 39,
  Number_Ampersand_Expression = 43,
  Number_Decimal_NumberUpper = 63,
  // Prefix Operators
  PrefixUnaryMinus = 9,
  PrefixUnaryPlus = 10,
  PrefixUnaryMinus_Expression = 33,
  PrefixUnaryPlus_Expression = 34,
  // Error
  Error = 13,
  Error_Error = 36,
  Error_Variable = 37,
  // LessThan
  LessThan = 23,
  LessThan_Equals = 46,
  LessThan_GreaterThan = 47,
  LessThan_Expression = 48,
  LessThan_Equals_Expression = 67,
  LessThan_GreaterThan_Expression = 68,
  // GreaterThan
  GreaterThan = 24,
  GreaterThanEquals = 49,
  GreaterThan_Expression = 50,
  GreaterThanEquals_Expressions = 69,
  // Operations
  AddTwoNumbers = 45,
  SubtractTwoNumbers = 52,
  MultiplyTwoNumbers = 53,
  DivideTwoNumbers = 54,
  PowerTwoNumbers = 55,
  // Variable
  Variable = 14,
  Variable_FullError_Variable = 62,
  Variable_SemiColon = 71,
  Variable_Comma = 72,
  Variable_FullError = 38,
  Variable_FullError_Variable_ExclamationPoint = 73,
  // VariableSeq
  VariableSeq = 3,
  VariableSeq_Decimal = 30,
  VariableSeq_Decimal_Variable = 56,
  // Pound
  Pound = 18,
  Pound_Variable = 42,
  Pound_Variable_ExclamationPoint = 66,
  // Left Paren
  LeftParen = 8,
  LeftParen_Expression = 32,
  LeftParen_Array = 61,
  // Function
  Function = 11,
  Function_LeftParen_ExpressionSeq = 59,
  Function_RightParenNoArguments = 58,
  Function_LeftParen_Expression = 60,
  Function_LeftParen = 35,
  Function_Etc_RightParen = 70,
  // Expressions
  Expressions = 1,
  Expression = 2,
  Expression_Plus = 22,
  Expression_Minus = 26,
  Expression_RightParen = 57,
  Expression_Asterisk = 27,
  Expression_Divide = 28,
  Expression_Carrot = 29,
  Expression_Ampersand = 20,
  Expression_Percent = 31,
  // Cell
  Cell = 12,
  FixedCell = 16,
  CellUpper = 17,
  CellUpper_Colon_CellUpper = 65,
  CellUpper_Colon = 41,
  FixedCell_Colon = 40,
  FixedCell_Colon_FixedCell = 64,
  // Other
  EOF_ReturnLast = 19
}


/**
 * Array of to map rules to to LexActions and other rules. A single index in the object (e.g. `{2: 13}`) indicates the
 * rule object to follow for the next token, while an array (e.g. `{23: [1, ReduceActions.LTE]}`) indicates the action to be taken,
 * and the rule object to follow after the action.
 */
let table = [];
// All functions in the spreadsheet start with a 0-token.
table[State.Start] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expressions, State.Expressions)
  .add(Symbol.Expression, State.Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Expressions] = ObjectBuilder
  .add(Symbol.End, [ACCEPT])
  .build();
table[State.Expression] = ObjectBuilder
  .add(Symbol.EOF, [SHIFT, State.EOF_ReturnLast])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [SHIFT, State.Start_Equals])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.LessThan, [SHIFT, State.LessThan])
  .add(Symbol.GreaterThan, [SHIFT, State.GreaterThan])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .build();
table[State.VariableSeq] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Equals, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Plus, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Minus, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Divide, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Comma, [REDUCE, ReduceActions.CallVariable])
  .add(Symbol.Decimal, [SHIFT, State.VariableSeq_Decimal])
  .build();
table[State.Start_Number] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Equals, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Plus, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Minus, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Divide, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Comma, [REDUCE, ReduceActions.AsNumber])
  .add(Symbol.Percent, [SHIFT, State.Expression_Percent])
  .build();
table[State.Start_String] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Equals, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Plus, [REDUCE, ReduceActions.AsString])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.AsString])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.AsString])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Minus, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Divide, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.AsString])
  .add(Symbol.Comma, [REDUCE, ReduceActions.AsString])
  .build();
table[State.LeftParen] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.LeftParen_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.PrefixUnaryMinus] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.PrefixUnaryMinus_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.PrefixUnaryPlus] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.PrefixUnaryPlus_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Function] = ObjectBuilder
  .add(Symbol.LeftParen, [SHIFT, State.Function_LeftParen])
  .build();
table[State.Cell] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Equals, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Plus, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Minus, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Divide, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.CellValueAsExpression])
  .add(Symbol.Comma, [REDUCE, ReduceActions.CellValueAsExpression])
  .build();
table[State.Error] = ObjectBuilder
  .add(Symbol.Error, State.Error_Error)
  .add(Symbol.EOF, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Divide, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ErrorAndContinue])
  .add(Symbol.Variable, [SHIFT, State.Error_Variable])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Variable] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Equals, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Plus, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Minus, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Divide, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Comma, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.Decimal, [REDUCE, ReduceActions.WrapCurrentTokenAsArray])
  .add(Symbol.FullError, [SHIFT, State.Variable_FullError])
  .build();
table[State.Number] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Divide, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.Decimal, [SHIFT, State.Number_Decimal])
  .add(Symbol.Percent, [REDUCE, ReduceActions.ReflexiveReduce])
  .add(Symbol.ReflexiveReduce, [REDUCE, ReduceActions.ReflexiveReduce])
  .build();
table[State.FixedCell] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Equals, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Plus, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Minus, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Divide, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Colon, [SHIFT, State.FixedCell_Colon])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.FixedCellValue])
  .add(Symbol.Comma, [REDUCE, ReduceActions.FixedCellValue])
  .build();
table[State.CellUpper] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Equals, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Plus, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Minus, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Divide, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Colon, [SHIFT, State.CellUpper_Colon])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.CellValue])
  .add(Symbol.Comma, [REDUCE, ReduceActions.CellValue])
  .build();
table[State.Pound] = ObjectBuilder
  .add(Symbol.Variable, [SHIFT, State.Pound_Variable])
  .add(Symbol.EOF, [REDUCE, ReduceActions.AsError])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.AsError])
  .add(Symbol.Comma, [REDUCE, ReduceActions.AsError])
  .build();
table[State.EOF_ReturnLast] = ObjectBuilder
  .add(Symbol.End, [REDUCE, ReduceActions.ReturnLast])
  .build();
table[State.Expression_Ampersand] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.Number_Ampersand_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Start_Equals] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.Start_Equals_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Expression_Plus] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.AddTwoNumbers)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.LessThan] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.LessThan_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Equals, [SHIFT, State.LessThan_Equals])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.GreaterThan, [SHIFT, State.LessThan_GreaterThan])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.GreaterThan] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.GreaterThan_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Equals, [SHIFT, State.GreaterThanEquals])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
// table[25] is absent because it's unreachable.
table[State.Expression_Minus] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.SubtractTwoNumbers)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Expression_Asterisk] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.MultiplyTwoNumbers)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Expression_Divide] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.DivideTwoNumbers)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Expression_Carrot] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.PowerTwoNumbers)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.VariableSeq_Decimal] = ObjectBuilder
  .add(Symbol.Variable, [SHIFT, State.VariableSeq_Decimal_Variable])
  .build();
table[State.Expression_Percent] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Divide, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.Percent, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .add(Symbol.ReflexiveReduce, [REDUCE, ReduceActions.ReducePrevAsPercent])
  .build();
table[State.LeftParen_Expression] = ObjectBuilder
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [SHIFT, State.Start_Equals])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [SHIFT, State.Expression_RightParen])
  .add(Symbol.LessThan, [SHIFT, State.LessThan])
  .add(Symbol.GreaterThan, [SHIFT, State.GreaterThan])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .build();
table[State.PrefixUnaryMinus_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.InvertNumber])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.InvertNumber])
  .add(Symbol.Plus, [REDUCE, ReduceActions.InvertNumber])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.InvertNumber])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.InvertNumber])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.InvertNumber])
  .add(Symbol.Minus, [REDUCE, ReduceActions.InvertNumber])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.InvertNumber])
  .add(Symbol.Comma, [REDUCE, ReduceActions.InvertNumber])
  .build();
table[State.PrefixUnaryPlus_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ToNumberNANAsZero])
  .build();
table[State.Function_LeftParen] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.Function_LeftParen_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.RightParen, [SHIFT, State.Function_RightParenNoArguments])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.ExpressionSeq, State.Function_LeftParen_ExpressionSeq)
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Array, [SHIFT, State.LeftParen_Array])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Error_Error] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Divide, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ErrorAndContinueWithOtherErrors])
  .build();
table[State.Error_Variable] = ObjectBuilder
  .add(Symbol.FullError, [REDUCE, ReduceActions.AsError])
  .build();
table[State.Variable_FullError] = ObjectBuilder
  .add(Symbol.Variable, [SHIFT, State.Variable_FullError_Variable])
  .build();
table[State.Number_Decimal] = ObjectBuilder
  .add(Symbol.NumberUpper, [SHIFT, State.Number_Decimal_NumberUpper])
  .build();
table[State.FixedCell_Colon] = ObjectBuilder
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell_Colon_FixedCell])
  .build();
table[State.CellUpper_Colon] = ObjectBuilder
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper_Colon_CellUpper])
  .build();
table[State.Pound_Variable] = ObjectBuilder
  .add(Symbol.ExclamationPoint, [SHIFT, State.Pound_Variable_ExclamationPoint])
  .build();
table[State.Number_Ampersand_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Plus, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Minus, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Divide, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.Ampersand])
  .add(Symbol.Comma, [REDUCE, ReduceActions.Ampersand])
  .build();
table[State.Start_Equals_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.Equals])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.Equals])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.Equals])
  .add(Symbol.LessThan, [SHIFT, State.LessThan])
  .add(Symbol.GreaterThan, [SHIFT, State.GreaterThan])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.Equals])
  .add(Symbol.Comma, [REDUCE, ReduceActions.Equals])
  .build();
table[State.AddTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.Plus])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.Plus])
  .add(Symbol.Plus, [REDUCE, ReduceActions.Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.Plus])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.Plus])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.Plus])
  .add(Symbol.Minus, [REDUCE, ReduceActions.Plus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.Plus])
  .add(Symbol.Comma, [REDUCE, ReduceActions.Plus])
  .build();
table[State.LessThan_Equals] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.LessThan_Equals_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.LessThan_GreaterThan] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.LessThan_GreaterThan_Expression)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.LessThan_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LT])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.LT])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.LT])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.LT])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.LT])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.LT])
  .add(Symbol.Comma, [REDUCE, ReduceActions.LT])
  .build();
table[State.GreaterThanEquals] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, State.GreaterThanEquals_Expressions)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.GreaterThan_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.GT])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.GT])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.GT])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.GT])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.GT])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.GT])
  .add(Symbol.Comma, [REDUCE, ReduceActions.GT])
  .build();
table[51] = ObjectBuilder
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.LessThan, [SHIFT, State.LessThan])
  .add(Symbol.GreaterThan, [SHIFT, State.GreaterThan])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .build();
table[State.SubtractTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.Minus])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.Minus])
  .add(Symbol.Plus, [REDUCE, ReduceActions.Minus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.Minus])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.Minus])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.Minus])
  .add(Symbol.Minus, [REDUCE, ReduceActions.Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.Minus])
  .add(Symbol.Comma, [REDUCE, ReduceActions.Minus])
  .build();
table[State.MultiplyTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.Plus, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.Minus, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.Divide, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.Multiply])
  .add(Symbol.Comma, [REDUCE, ReduceActions.Multiply])
  .build();
table[State.DivideTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.Divide])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.Divide])
  .add(Symbol.Plus, [REDUCE, ReduceActions.Divide])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.Divide])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.Divide])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.Divide])
  .add(Symbol.Minus, [REDUCE, ReduceActions.Divide])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.Divide])
  .add(Symbol.Divide, [REDUCE, ReduceActions.Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.Divide])
  .add(Symbol.Comma, [REDUCE, ReduceActions.Divide])
  .build();
table[State.PowerTwoNumbers] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.Divide, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ToPower])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ToPower])
  .build();
table[State.VariableSeq_Decimal_Variable] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Equals, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Plus, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Minus, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Divide, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Comma, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .add(Symbol.Decimal, [REDUCE, ReduceActions.EnsureLastTwoINArrayAndPush])
  .build();
table[State.Expression_RightParen] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Equals, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Plus, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Minus, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Divide, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.LastNumber])
  .add(Symbol.Comma, [REDUCE, ReduceActions.LastNumber])
  .build();
table[State.Function_RightParenNoArguments] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Equals, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Plus, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Minus, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Divide, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .add(Symbol.Comma, [REDUCE, ReduceActions.CallFunctionLastBlank])
  .build();
table[State.Function_LeftParen_ExpressionSeq] = ObjectBuilder
  .add(Symbol.RightParen, [SHIFT, State.Function_Etc_RightParen])
  .add(Symbol.Semicolon, [SHIFT, State.Variable_SemiColon])
  .add(Symbol.Comma, [SHIFT, State.Variable_Comma])
  .build();
table[State.Function_LeftParen_Expression] = ObjectBuilder
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [SHIFT, State.Start_Equals])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.EnsureIsArray])
  .add(Symbol.LessThan, [SHIFT, State.LessThan])
  .add(Symbol.GreaterThan, [SHIFT, State.GreaterThan])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.EnsureIsArray])
  .add(Symbol.Comma, [REDUCE, ReduceActions.EnsureIsArray])
  .build();
table[State.LeftParen_Array] = ObjectBuilder
  .add(Symbol.RightParen, [REDUCE, ReduceActions.EnsureYYTextIsArray])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.EnsureYYTextIsArray])
  .add(Symbol.Comma, [REDUCE, ReduceActions.EnsureYYTextIsArray])
  .build();
table[State.Variable_FullError_Variable] = ObjectBuilder
  .add(Symbol.ExclamationPoint, [SHIFT, State.Variable_FullError_Variable_ExclamationPoint])
  .build();
table[State.Number_Decimal_NumberUpper] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Divide, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.Percent, [REDUCE, ReduceActions.ReduceFloat])
  .add(Symbol.ReflexiveReduce, [REDUCE, ReduceActions.ReduceFloat]).build();
table[State.FixedCell_Colon_FixedCell] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Equals, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Plus, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Minus, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Divide, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.FixedCellRangeValue])
  .add(Symbol.Comma, [REDUCE, ReduceActions.FixedCellRangeValue]).build();
table[State.CellUpper_Colon_CellUpper] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Equals, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Plus, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Minus, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Divide, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.CellRangeValue])
  .add(Symbol.Comma, [REDUCE, ReduceActions.CellRangeValue]).build();
table[State.Pound_Variable_ExclamationPoint] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Divide, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.Variable, [REDUCE, ReduceActions.ReduceLastThreeA])
  .add(Symbol.FullError, [REDUCE, ReduceActions.ReduceLastThreeA]).build();
table[State.LessThan_Equals_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.LTE])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.LTE])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.LTE])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.LTE])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.LTE])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.LTE])
  .add(Symbol.Comma, [REDUCE, ReduceActions.LTE]).build();
table[State.LessThan_GreaterThan_Expression] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.NotEqual])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.NotEqual])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.NotEqual])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.NotEqual])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.NotEqual])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.NotEqual])
  .add(Symbol.Comma, [REDUCE, ReduceActions.NotEqual]).build();
table[State.GreaterThanEquals_Expressions] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.GTE])
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [REDUCE, ReduceActions.GTE])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.GTE])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.GTE])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.GTE])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.GTE])
  .add(Symbol.Comma, [REDUCE, ReduceActions.GTE])
  .build();
table[State.Function_Etc_RightParen] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Equals, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Plus, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Minus, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Divide, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .add(Symbol.Comma, [REDUCE, ReduceActions.CallFunctionLastTwoInStack])
  .build();
table[State.Variable_SemiColon] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, 74)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Equals, [SHIFT, State.Start_Equals])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Variable_Comma] = ObjectBuilder
  .add(Symbol.Error, State.Error)
  .add(Symbol.Expression, 75)
  .add(Symbol.VariableSeq, State.VariableSeq)
  .add(Symbol.Number, State.Start_Number)
  .add(Symbol.String, [SHIFT, State.Start_String])
  .add(Symbol.Equals, [SHIFT, State.Start_Equals])
  .add(Symbol.Plus, [SHIFT, State.PrefixUnaryPlus])
  .add(Symbol.LeftParen, [SHIFT, State.LeftParen])
  .add(Symbol.Minus, [SHIFT, State.PrefixUnaryMinus])
  .add(Symbol.Function, [SHIFT, State.Function])
  .add(Symbol.Cell, State.Cell)
  .add(Symbol.FixedCell, [SHIFT, State.FixedCell])
  .add(Symbol.CellUpper, [SHIFT, State.CellUpper])
  .add(Symbol.Variable, [SHIFT, State.Variable])
  .add(Symbol.NumberUpper, [SHIFT, State.Number])
  .add(Symbol.Array, [SHIFT, 61])
  .add(Symbol.FullError, [SHIFT, State.Pound])
  .build();
table[State.Variable_FullError_Variable_ExclamationPoint] = ObjectBuilder
  .add(Symbol.EOF, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Ampersand, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Equals, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Plus, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.LessThan, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.GreaterThan, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Minus, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Asterisk, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Divide, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Carrot, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.Variable, [REDUCE, ReduceActions.ReduceLastThreeB])
  .add(Symbol.FullError, [REDUCE, ReduceActions.ReduceLastThreeB])
  .build();
table[74] = ObjectBuilder
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [SHIFT, State.Start_Equals])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ReduceInt])
  .add(Symbol.LessThan, [SHIFT, State.LessThan])
  .add(Symbol.GreaterThan, [SHIFT, State.GreaterThan])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ReduceInt])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ReduceInt]).build();
table[75] = ObjectBuilder
  .add(Symbol.Ampersand, [SHIFT, State.Expression_Ampersand])
  .add(Symbol.Equals, [SHIFT, State.Start_Equals])
  .add(Symbol.Plus, [SHIFT, State.Expression_Plus])
  .add(Symbol.RightParen, [REDUCE, ReduceActions.ReducePercent])
  .add(Symbol.LessThan, [SHIFT, State.LessThan])
  .add(Symbol.GreaterThan, [SHIFT, State.GreaterThan])
  .add(Symbol.Minus, [SHIFT, State.Expression_Minus])
  .add(Symbol.Asterisk, [SHIFT, State.Expression_Asterisk])
  .add(Symbol.Divide, [SHIFT, State.Expression_Divide])
  .add(Symbol.Carrot, [SHIFT, State.Expression_Carrot])
  .add(Symbol.Semicolon, [REDUCE, ReduceActions.ReducePercent])
  .add(Symbol.Comma, [REDUCE, ReduceActions.ReducePercent]).build();
const ACTION_TABLE = table;


export {
  ACTION_TABLE,
  RULES,
  REDUCE,
  ACCEPT,
  SHIFT,
  SYMBOL_INDEX_TO_NAME,
  SYMBOL_NAME_TO_INDEX,
  PRODUCTIONS
}