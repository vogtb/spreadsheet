import {
  DIV_ZERO_ERROR,
  NA_ERROR,
  NULL_ERROR,
  NUM_ERROR,
  PARSE_ERROR,
  REF_ERROR,
  VALUE_ERROR
} from "../src/Errors";
import {
  assertFormulaEquals, assertFormulaEqualsDependsOnReference, assertFormulaEqualsError,
  test
} from "./Utils/Asserts";

test("Sheet, declare number", function () {
  assertFormulaEquals('=5', 5);
});

test("Sheet, declare string", function () {
  assertFormulaEquals('="str"', "str");
});

test("Sheet, number multiplication", function () {
  assertFormulaEquals('=5*5', 25);
});

test("Sheet, parse but throw parse error", function(){
  assertFormulaEqualsError('=10e', PARSE_ERROR);
  assertFormulaEqualsError('= SUM(', PARSE_ERROR);
});

test("Sheet, parse & operator", function(){
  assertFormulaEquals('="hey"&" "&"there"', "hey there");
});

test("Sheet,  parse * operator", function(){
  assertFormulaEquals('=10 * 10', 100);
  assertFormulaEquals('=10 * 0', 0);
  assertFormulaEquals('=1 * 1', 1);
  assertFormulaEquals('=1 * 0', 0);
  assertFormulaEquals('=0 * 0', 0);
});

test("Sheet, parse / operator", function(){
  assertFormulaEquals('=10 / 2', 5);
  assertFormulaEquals('=10 / 1', 10);
  assertFormulaEquals('=1 / 1', 1);
  assertFormulaEquals('=0 / 1', 0);
  assertFormulaEquals('="1" / 1', 1);
  assertFormulaEquals('="500" / 1', 500);
  assertFormulaEqualsError('=10 / 0', DIV_ZERO_ERROR);
  assertFormulaEqualsError('=0 / 0', DIV_ZERO_ERROR);
  assertFormulaEquals('=P9 / 1', 0);
});

test("Sheet, parse ^ operator", function(){
  assertFormulaEquals('=10 ^ 10', 10000000000);
  assertFormulaEquals('=10 ^ 0', 1);
  assertFormulaEquals('=1 ^ 1', 1);
  assertFormulaEquals('=2 ^ 10', 1024);
});

test("Sheet, parse comparison operators on numbers", function(){
  assertFormulaEquals('=1 = 1', true);
  assertFormulaEquals('=1 = 0', false);
  assertFormulaEquals('=1 < 2', true);
  assertFormulaEquals('=1 < 0', false);
  assertFormulaEquals('=1 < 1', false);
  assertFormulaEquals('=1 <= 0', false);
  assertFormulaEquals('=1 <= 1', true);
  assertFormulaEquals('=1 <= 2', true);
  assertFormulaEquals('=1 >= 1', true);
  assertFormulaEquals('=2 >= 1', true);
  assertFormulaEquals('=1 >= 0', true);
  assertFormulaEquals('=1 >= 2', false);
  assertFormulaEquals('=1 <> 1', false);
  assertFormulaEquals('=1 <> 2', true);
});

test("Sheet, parse comparison operators on strings", function(){
  assertFormulaEquals('="abc" = "abc"', true);
  assertFormulaEquals('="abc" = "xyz"', false);
  assertFormulaEquals('="abc" < "abc"', false);
  assertFormulaEquals('="abc" < "xyz"', true);
  assertFormulaEquals('="abc" <= "abc"', true);
  assertFormulaEquals('="abc" <= "xyz"', true);
  assertFormulaEquals('="xyz" <= "abc"', false);
  assertFormulaEquals('="abc" >= "abc"', true);
  assertFormulaEquals('="abc" >= "zyx"', false);
  assertFormulaEquals('="xyz" >= "abc"', true);
  assertFormulaEquals('="abc" <> "abc"', false);
  assertFormulaEquals('="abc" <> "zyz"', true);
});

test("Sheet, parse comparison operators on boolean", function(){
  assertFormulaEquals('=TRUE = TRUE', true);
  assertFormulaEquals('=TRUE = FALSE', false);
  assertFormulaEquals('=FALSE = FALSE', true);
  assertFormulaEquals('=TRUE > TRUE', false);
  assertFormulaEquals('=TRUE > FALSE', true);
  assertFormulaEquals('=FALSE > FALSE', false);
  assertFormulaEquals('=TRUE <= TRUE', true);
  assertFormulaEquals('=TRUE <= FALSE', false);
  assertFormulaEquals('=FALSE <= TRUE', true);
  assertFormulaEquals('=TRUE >= TRUE', true);
  assertFormulaEquals('=TRUE >= FALSE', true);
  assertFormulaEquals('=FALSE >= TRUE', false);
  assertFormulaEquals('=TRUE <> TRUE', false);
  assertFormulaEquals('=FALSE <> FALSE', false);
  assertFormulaEquals('=TRUE <> FALSE', true);
  assertFormulaEquals('=FALSE <> TRUE', true);
});

test("Sheet, parse operators, order of operations", function(){
  assertFormulaEquals('=10 + -10', 0);
  assertFormulaEquals('=10 + -10 = 0', true);
  assertFormulaEquals('=10 + -10 = 0 & "str"', false);
  assertFormulaEquals('=-10%', -0.1);
  assertFormulaEquals('=10 + 10%', 10.1);
  assertFormulaEquals('=-10 + 10%', -9.9);
  assertFormulaEquals('=-10 - +10%', -10.1);
  assertFormulaEquals('=2^-10 + 10%', 0.1009765625);
  assertFormulaEquals('=4 * 5 / 2', 10);
  assertFormulaEquals('=4 / 5 * 4', 3.2);
  assertFormulaEquals('=2^2*5', 20);
  assertFormulaEquals('=2^(2*5)', 1024);
});

test("Sheet, parse and throw error literal", function () {
  assertFormulaEqualsError('=#N/A', NA_ERROR);
  assertFormulaEqualsError('=#NUM!', NUM_ERROR);
  assertFormulaEqualsError('=#REF!', REF_ERROR);
  assertFormulaEqualsError('=#NULL!', NULL_ERROR);
  assertFormulaEqualsError('=#ERROR', PARSE_ERROR);
  assertFormulaEqualsError('=#DIV/0!', DIV_ZERO_ERROR);
  assertFormulaEqualsError('=#VALUE!', VALUE_ERROR);
});

test("Sheet, parse plain numbers", function() {
  assertFormulaEquals('=10', 10);
  // assertFormulaEquals('=.1', 0.1); // TODO: [ISSUE-010]
  assertFormulaEquals('=+1', 1);
  assertFormulaEquals('=-1', -1);
  assertFormulaEquals('=++1', 1);
  assertFormulaEquals('=--1', 1);
  assertFormulaEquals('=10e1', 100);
  assertFormulaEquals('=0e1', 0);
  // assertFormulaEquals('=0.e1', 0); // TODO: [ISSUE-011]
  assertFormulaEquals('=-10e1', -100);
  assertFormulaEquals('=+10e1', 100);
  assertFormulaEquals('=++10e1', 100);
  assertFormulaEquals('=--10e1', 100);
});

test("Sheet, parse complex numbers and math", function(){
  assertFormulaEquals('="10" + 10', 20);
  assertFormulaEquals('="10.111111" + 0', 10.111111);
  assertFormulaEquals('=10%', 0.1);
  assertFormulaEquals('=10% + 1', 1.1);
  assertFormulaEquals('="10e1" + 0', 100);
  assertFormulaEquals('=10e1', 100);
  assertFormulaEquals('=10e-1', 1);
  assertFormulaEquals('=10e+1', 100);
  assertFormulaEquals('=10E1', 100);
  assertFormulaEquals('=10E-1', 1);
  assertFormulaEquals('=10E+1', 100);
  assertFormulaEquals('="1,000,000"  + 0', 1000000);
  assertFormulaEquals('="+$10.00" + 0', 10);
  assertFormulaEquals('="-$10.00" + 0', -10);
  assertFormulaEquals('="$+10.00" + 0', 10);
  assertFormulaEquals('="$-10.00" + 0', -10);
  assertFormulaEquals('="10" + 10', 20);
  assertFormulaEquals('="10.111111" + 0', 10.111111);
  assertFormulaEquals('=10%', 0.1);
  assertFormulaEquals('=10% + 1', 1.1);
  assertFormulaEquals('="10e1" + 0', 100);
  assertFormulaEquals('=10e1', 100);
  assertFormulaEquals('=10e-1', 1);
  assertFormulaEquals('=10e+1', 100);
  assertFormulaEquals('=10E1', 100);
  assertFormulaEquals('=10E-1', 1);
  assertFormulaEquals('=10E+1', 100);
  assertFormulaEquals('="1,000,000"  + 0', 1000000);
  assertFormulaEqualsError('="10e" + 10', VALUE_ERROR);
  assertFormulaEquals('="+$10.00" + 0', 10);
  assertFormulaEquals('="-$10.00" + 0', -10);
  assertFormulaEquals('="$+10.00" + 0', 10);
  assertFormulaEquals('="$-10.00" + 0', -10);
});

test("Sheet, parse strings", function(){
  assertFormulaEquals('="str"', "str");
  assertFormulaEquals('="str"&"str"', "strstr");
  assertFormulaEqualsError('="str"+"str"', VALUE_ERROR);
  // assertFormulaEqualsError("='str'", PARSE_ERROR); // TODO: [ISSUE-012]
});

test("Sheet, parse boolean literals", function(){
  assertFormulaEquals('=TRUE', true);
  assertFormulaEquals('=true', true);
  assertFormulaEquals('=FALSE', false);
  assertFormulaEquals('=false', false);
});

test("Sheet, parse comparison logic inside parentheses", function(){
  assertFormulaEquals('=(1=1)', true);
  assertFormulaEquals('=(1=2)', false);
  assertFormulaEquals('=(1=1)+2', 3);
});

test("Sheet, parse range literal", function(){
  // assertEqualsArray('=[1, 2, 3]', [1, 2, 3]); // TODO: [ISSUE-007]
  // assertEqualsArray('=[]', []);
  // assertEqualsArray('=["str", "str"]', ["str", "str"]);
  // assertEqualsArray('=["str", [1, 2, 3], [1]]', ["str", [1, 2, 3], [1]]);
});

test("Sheet state sequence: (number, ampersand, expression)", function(){
  assertFormulaEquals('=10&10', "1010");
  assertFormulaEquals('=10&"str"', "10str");
  assertFormulaEquals('=10 & TRUE', "10TRUE");
});
