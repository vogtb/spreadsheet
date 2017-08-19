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
const INTEGER_RULE = /^(?:[0-9]+)/; //rule 11
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

// While it is unlikely that an index for a given rule will change, initializing them with `indexOf` will allow me to
// change their ordering without having to find and replace indexes manually.
const WHITE_SPACE_RULE_INDEX = RULES.indexOf(WHITE_SPACE_RULE);
const DOUBLE_QUOTES_RULE_INDEX = RULES.indexOf(DOUBLE_QUOTES_RULE);
const SINGLE_QUOTES_RULE_INDEX = RULES.indexOf(SINGLE_QUOTES_RULE);
const FORMULA_NAME_RULE_INDEX = RULES.indexOf(FORMULA_NAME_RULE);
const DATE_RULE_INDEX = RULES.indexOf(DATE_RULE);
const TIME_RULE_INDEX = RULES.indexOf(TIME_RULE);
const $_A1_CELL_RULE_INDEX = RULES.indexOf($_A1_CELL_RULE);
const A1_CELL_RULE_INDEX = RULES.indexOf(A1_CELL_RULE);
const FORMULA_NAME_SIMPLE_RULE_INDEX = RULES.indexOf(FORMULA_NAME_SIMPLE_RULE);
const VARIABLE_RULE_INDEX = RULES.indexOf(VARIABLE_RULE);
const SIMPLE_VARIABLE_RILE_INDEX = RULES.indexOf(SIMPLE_VARIABLE_RILE);
const INTEGER_RULE_INDEX = RULES.indexOf(INTEGER_RULE);
const OPEN_AND_CLOSE_OF_ARRAY_RULE_INDEX = RULES.indexOf(OPEN_AND_CLOSE_OF_ARRAY_RULE);
const DOLLAR_SIGN_RULE_INDEX = RULES.indexOf(DOLLAR_SIGN_RULE);
const AMPERSAND_SIGN_RULE_INDEX = RULES.indexOf(AMPERSAND_SIGN_RULE);
const SINGLE_WHITESPACE_RULE_INDEX = RULES.indexOf(SINGLE_WHITESPACE_RULE);
const PERIOD_RULE_INDEX = RULES.indexOf(PERIOD_RULE);
const COLON_RULE_INDEX = RULES.indexOf(COLON_RULE);
const SEMI_COLON_RULE_INDEX = RULES.indexOf(SEMI_COLON_RULE);
const COMMA_RULE_INDEX = RULES.indexOf(COMMA_RULE);
const ASTERISK_RULE_INDEX = RULES.indexOf(ASTERISK_RULE);
const FORWARD_SLASH_RULE_INDEX = RULES.indexOf(FORWARD_SLASH_RULE);
const MINUS_SIGN_RULE_INDEX = RULES.indexOf(MINUS_SIGN_RULE);
const PLUS_SIGN_RULE_INDEX = RULES.indexOf(PLUS_SIGN_RULE);
const CARET_SIGN_RULE_INDEX = RULES.indexOf(CARET_SIGN_RULE);
const OPEN_PAREN_RULE_INDEX = RULES.indexOf(OPEN_PAREN_RULE);
const CLOSE_PAREN_RULE_INDEX = RULES.indexOf(CLOSE_PAREN_RULE);
const GREATER_THAN_SIGN_RULE_INDEX = RULES.indexOf(GREATER_THAN_SIGN_RULE);
const LESS_THAN_SIGN_RULE_INDEX = RULES.indexOf(LESS_THAN_SIGN_RULE);
const NOT_RULE_INDEX = RULES.indexOf(NOT_RULE);
const OPEN_DOUBLE_QUOTE_INDEX = RULES.indexOf(OPEN_DOUBLE_QUOTE);
const OPEN_SINGLE_QUITE_INDEX = RULES.indexOf(OPEN_SINGLE_QUITE);
const EXCLAMATION_POINT_RULE_INDEX = RULES.indexOf(EXCLAMATION_POINT_RULE);
const EQUALS_SIGN_RULE_INDEX = RULES.indexOf(EQUALS_SIGN_RULE);
const PERCENT_SIGN_RULE_INDEX = RULES.indexOf(PERCENT_SIGN_RULE);
const HASH_SIGN_RULE_INDEX = RULES.indexOf(HASH_SIGN_RULE);
const END_OF_STRING_RULE_INDEX = RULES.indexOf(END_OF_STRING_RULE);

export {
  RULES,

  WHITE_SPACE_RULE_INDEX,
  DOUBLE_QUOTES_RULE_INDEX,
  SINGLE_QUOTES_RULE_INDEX,
  FORMULA_NAME_RULE_INDEX,
  DATE_RULE_INDEX,
  TIME_RULE_INDEX,
  $_A1_CELL_RULE_INDEX,
  A1_CELL_RULE_INDEX,
  FORMULA_NAME_SIMPLE_RULE_INDEX,
  VARIABLE_RULE_INDEX,
  SIMPLE_VARIABLE_RILE_INDEX,
  INTEGER_RULE_INDEX,
  OPEN_AND_CLOSE_OF_ARRAY_RULE_INDEX,
  DOLLAR_SIGN_RULE_INDEX,
  AMPERSAND_SIGN_RULE_INDEX,
  SINGLE_WHITESPACE_RULE_INDEX,
  PERIOD_RULE_INDEX,
  COLON_RULE_INDEX,
  SEMI_COLON_RULE_INDEX,
  COMMA_RULE_INDEX,
  ASTERISK_RULE_INDEX,
  FORWARD_SLASH_RULE_INDEX,
  MINUS_SIGN_RULE_INDEX,
  PLUS_SIGN_RULE_INDEX,
  CARET_SIGN_RULE_INDEX,
  OPEN_PAREN_RULE_INDEX,
  CLOSE_PAREN_RULE_INDEX,
  GREATER_THAN_SIGN_RULE_INDEX,
  LESS_THAN_SIGN_RULE_INDEX,
  NOT_RULE_INDEX,
  OPEN_DOUBLE_QUOTE_INDEX,
  OPEN_SINGLE_QUITE_INDEX,
  EXCLAMATION_POINT_RULE_INDEX,
  EQUALS_SIGN_RULE_INDEX,
  PERCENT_SIGN_RULE_INDEX,
  HASH_SIGN_RULE_INDEX,
  END_OF_STRING_RULE_INDEX,
}