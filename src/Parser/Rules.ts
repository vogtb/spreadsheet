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
const INDEX0 = RULES.indexOf(WHITE_SPACE_RULE);
const INDEX1 = RULES.indexOf(DOUBLE_QUOTES_RULE);
const INDEX2 = RULES.indexOf(SINGLE_QUOTES_RULE);
const INDEX3 = RULES.indexOf(FORMULA_NAME_RULE);
const INDEX4 = RULES.indexOf(DATE_RULE);
const INDEX5 = RULES.indexOf(TIME_RULE);
const INDEX6 = RULES.indexOf($_A1_CELL_RULE);
const INDEX7 = RULES.indexOf(A1_CELL_RULE);
const INDEX8 = RULES.indexOf(FORMULA_NAME_SIMPLE_RULE);
const INDEX9 = RULES.indexOf(VARIABLE_RULE);
const INDEX10 = RULES.indexOf(SIMPLE_VARIABLE_RILE);
const INDEX11 = RULES.indexOf(INTEGER_RULE);
const INDEX12 = RULES.indexOf(OPEN_AND_CLOSE_OF_ARRAY_RULE);
const INDEX13 = RULES.indexOf(DOLLAR_SIGN_RULE);
const INDEX14 = RULES.indexOf(AMPERSAND_SIGN_RULE);
const INDEX15 = RULES.indexOf(SINGLE_WHITESPACE_RULE);
const INDEX16 = RULES.indexOf(PERIOD_RULE);
const INDEX17 = RULES.indexOf(COLON_RULE);
const INDEX18 = RULES.indexOf(SEMI_COLON_RULE);
const INDEX19 = RULES.indexOf(COMMA_RULE);
const INDEX20 = RULES.indexOf(ASTERISK_RULE);
const INDEX21 = RULES.indexOf(FORWARD_SLASH_RULE);
const INDEX22 = RULES.indexOf(MINUS_SIGN_RULE);
const INDEX23 = RULES.indexOf(PLUS_SIGN_RULE);
const INDEX24 = RULES.indexOf(CARET_SIGN_RULE);
const INDEX25 = RULES.indexOf(OPEN_PAREN_RULE);
const INDEX26 = RULES.indexOf(CLOSE_PAREN_RULE);
const INDEX27 = RULES.indexOf(GREATER_THAN_SIGN_RULE);
const INDEX28 = RULES.indexOf(LESS_THAN_SIGN_RULE);
const INDEX29 = RULES.indexOf(NOT_RULE);
const INDEX30 = RULES.indexOf(OPEN_DOUBLE_QUOTE);
const INDEX31 = RULES.indexOf(OPEN_SINGLE_QUITE);
const INDEX32 = RULES.indexOf(EXCLAMATION_POINT_RULE);
const INDEX33 = RULES.indexOf(EQUALS_SIGN_RULE);
const INDEX34 = RULES.indexOf(PERCENT_SIGN_RULE);
const INDEX35 = RULES.indexOf(HASH_SIGN_RULE);
const INDEX36 = RULES.indexOf(END_OF_STRING_RULE);


export {
  RULES,

  INDEX0,
  INDEX1,
  INDEX2,
  INDEX3,
  INDEX4,
  INDEX5,
  INDEX6,
  INDEX7,
  INDEX8,
  INDEX9,
  INDEX10,
  INDEX11,
  INDEX12,
  INDEX13,
  INDEX14,
  INDEX15,
  INDEX16,
  INDEX17,
  INDEX18,
  INDEX19,
  INDEX20,
  INDEX21,
  INDEX22,
  INDEX23,
  INDEX24,
  INDEX25,
  INDEX26,
  INDEX27,
  INDEX28,
  INDEX29,
  INDEX30,
  INDEX31,
  INDEX32,
  INDEX33,
  INDEX34,
  INDEX35,
  INDEX36
}