import {
  RuleIndex
} from "./RuleIndex";

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


// Sequential rules to use when parsing a given input.
let RULES = [];
RULES[RuleIndex.WhiteSpace] = WHITE_SPACE_RULE;
RULES[RuleIndex.DoubleQuotes] = DOUBLE_QUOTES_RULE;
RULES[RuleIndex.SingleQuotes] = SINGLE_QUOTES_RULE;
RULES[RuleIndex.FormulaName] = FORMULA_NAME_RULE;
RULES[RuleIndex.$A1Cell] = $_A1_CELL_RULE;
RULES[RuleIndex.A1Cell] = A1_CELL_RULE;
RULES[RuleIndex.FormulaNameSimple] = FORMULA_NAME_SIMPLE_RULE;
RULES[RuleIndex.Variable] = VARIABLE_RULE;
RULES[RuleIndex.SimpleVariable] = SIMPLE_VARIABLE_RILE;
RULES[RuleIndex.Integer] = INTEGER_RULE;
RULES[RuleIndex.SelfContainedArray] = OPEN_AND_CLOSE_OF_ARRAY_RULE;
RULES[RuleIndex.DollarSign] = DOLLAR_SIGN_RULE;
RULES[RuleIndex.Ampersand] = AMPERSAND_SIGN_RULE;
RULES[RuleIndex.SingleWhitespace] = SINGLE_WHITESPACE_RULE;
RULES[RuleIndex.Period] = PERIOD_RULE;
RULES[RuleIndex.Colon] = COLON_RULE;
RULES[RuleIndex.Semicolon] = SEMI_COLON_RULE;
RULES[RuleIndex.Comma] = COMMA_RULE;
RULES[RuleIndex.Asterisk] = ASTERISK_RULE;
RULES[RuleIndex.ForwardSlash] = FORWARD_SLASH_RULE;
RULES[RuleIndex.Minus] = MINUS_SIGN_RULE;
RULES[RuleIndex.Plus] = PLUS_SIGN_RULE;
RULES[RuleIndex.Caret] = CARET_SIGN_RULE;
RULES[RuleIndex.OpenParen] = OPEN_PAREN_RULE;
RULES[RuleIndex.CloseParen] = CLOSE_PAREN_RULE;
RULES[RuleIndex.GreaterThan] = GREATER_THAN_SIGN_RULE;
RULES[RuleIndex.LessThanSign] = LESS_THAN_SIGN_RULE;
RULES[RuleIndex.OpenDoubleQuote] = OPEN_DOUBLE_QUOTE;
RULES[RuleIndex.OpenSingleQuote] = OPEN_SINGLE_QUITE;
RULES[RuleIndex.ExclamationPoint] = EXCLAMATION_POINT_RULE;
RULES[RuleIndex.Equals] = EQUALS_SIGN_RULE;
RULES[RuleIndex.Percent] = PERCENT_SIGN_RULE;
RULES[RuleIndex.FullError] = FULL_ERROR_RULE;
RULES[RuleIndex.EndOfString] = END_OF_STRING_RULE;

export {
  RULES
}