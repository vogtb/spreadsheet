import {
  FormulaParser
} from "../../src/Parser/Parser";
import {
  DIV_ZERO_ERROR, NA_ERROR, NULL_ERROR, NUM_ERROR, PARSE_ERROR,
  REF_ERROR, VALUE_ERROR
} from "../../src/Errors";
import {assertEquals, catchAndAssertEquals, test} from "../Utils/Asserts";
import {HelperUtils} from "../../src/Parser/HelperUtils";
import {DataStore} from "../../src/Parser/DataStore";


let parser = FormulaParser(new HelperUtils(new DataStore()));
parser.yy.obj ="A1";


test("Declare number", function () {
  assertEquals(parser.parse('5'), 5);
});

test("Number multiplication", function () {
  assertEquals(parser.parse('5*5'), 25);
});



test("Parse but throw parse error", function(){
  // assertEquals(parser.parse('=10e'), PARSE_ERROR);
  // assertEquals(parser.parse('= SUM('), PARSE_ERROR);
});

test("Parse & operator", function(){
  assertEquals(parser.parse('"hey"&" "&"there"'), "hey there");
});

test("Parse * operator", function(){
  assertEquals(parser.parse('10 * 10'), 100);
  assertEquals(parser.parse('10 * 0'), 0);
  assertEquals(parser.parse('1 * 1'), 1);
});

test("Parse / operator", function(){
  assertEquals(parser.parse('10 / 2'), 5);
  assertEquals(parser.parse('10 / 1'), 10);
  assertEquals(parser.parse('1 / 1'), 1);
  assertEquals(parser.parse('0 / 1'), 0);
  assertEquals(parser.parse('"1" / 1'), 1);
  assertEquals(parser.parse('"500" / 1'), 500);
  catchAndAssertEquals(function () {
    parser.parse(' 10 / 0');
  }, DIV_ZERO_ERROR);
  catchAndAssertEquals(function () {
    parser.parse('0 / 0')
  }, DIV_ZERO_ERROR);
  // assertEquals(parser.parse('P9 / 1'), 0);
});

test("Parse ^ operator", function(){
  assertEquals(parser.parse('10 ^ 10'), 10000000000);
  assertEquals(parser.parse('10 ^ 0'), 1);
  assertEquals(parser.parse('1 ^ 1'), 1);
  assertEquals(parser.parse('2 ^ 10'), 1024);
});

test("Parse comparison operators on numbers", function(){
  assertEquals(parser.parse('1 = 1'), true);
  assertEquals(parser.parse('1 = 0'), false);
  assertEquals(parser.parse('1 < 2'), true);
  assertEquals(parser.parse('1 < 0'), false);
  assertEquals(parser.parse('1 < 1'), false);
  assertEquals(parser.parse('1 <= 0'), false);
  assertEquals(parser.parse('1 <= 1'), true);
  assertEquals(parser.parse('1 <= 2'), true);
  assertEquals(parser.parse('1 >= 1'), true);
  assertEquals(parser.parse('2 >= 1'), true);
  assertEquals(parser.parse('1 >= 0'), true);
  assertEquals(parser.parse('1 >= 2'), false);
  assertEquals(parser.parse('1 <> 1'), false);
  assertEquals(parser.parse('1 <> 2'), true);
});

test("Parse comparison operators on strings", function(){
  assertEquals(parser.parse('"abc" = "abc"'), true);
  assertEquals(parser.parse('"abc" = "xyz"'), false);
  assertEquals(parser.parse('"abc" < "abc"'), false);
  assertEquals(parser.parse('"abc" < "xyz"'), true);
  assertEquals(parser.parse('"abc" <= "abc"'), true);
  assertEquals(parser.parse('"abc" <= "xyz"'), true);
  assertEquals(parser.parse('"xyz" <= "abc"'), false);
  assertEquals(parser.parse('"abc" >= "abc"'), true);
  assertEquals(parser.parse('"abc" >= "zyx"'), false);
  assertEquals(parser.parse('"xyz" >= "abc"'), true);
  assertEquals(parser.parse('"abc" <> "abc"'), false);
  assertEquals(parser.parse('"abc" <> "zyz"'), true);
});

test("Parse comparison operators on boolean", function(){
  assertEquals(parser.parse('TRUE = TRUE'), true);
  assertEquals(parser.parse('TRUE = FALSE'), false);
  assertEquals(parser.parse('FALSE = FALSE'), true);
  assertEquals(parser.parse('TRUE > TRUE'), false);
  assertEquals(parser.parse('TRUE > FALSE'), true);
  assertEquals(parser.parse('FALSE > FALSE'), false);
  assertEquals(parser.parse('TRUE <= TRUE'), true);
  assertEquals(parser.parse('TRUE <= FALSE'), false);
  assertEquals(parser.parse('FALSE <= TRUE'), true);
  assertEquals(parser.parse('TRUE >= TRUE'), true);
  assertEquals(parser.parse('TRUE >= FALSE'), true);
  assertEquals(parser.parse('FALSE >= TRUE'), false);
  assertEquals(parser.parse('TRUE <> TRUE'), false);
  assertEquals(parser.parse('FALSE <> FALSE'), false);
  assertEquals(parser.parse('TRUE <> FALSE'), true);
  assertEquals(parser.parse('FALSE <> TRUE'), true);
});

test("Parse operators, order of operations", function(){
  assertEquals(parser.parse('10 + -10'), 0);
  assertEquals(parser.parse('10 + -10 = 0'), true);
  assertEquals(parser.parse('10 + -10 = 0 & "str"'), false);
  assertEquals(parser.parse('-10%'), -0.1);
  assertEquals(parser.parse('10 + 10%'), 10.1);
  assertEquals(parser.parse('-10 + 10%'), -9.9);
  assertEquals(parser.parse('-10 - +10%'), -10.1);
  assertEquals(parser.parse('2^-10 + 10%'), 0.1009765625);
  assertEquals(parser.parse('4 * 5 / 2'), 10);
  assertEquals(parser.parse('4 / 5 * 4'), 3.2);
  assertEquals(parser.parse('2^2*5'), 20);
  assertEquals(parser.parse('2^(2*5)'), 1024);
});

test("Parse and throw error literal", function () {
  assertEquals(parser.parse('#N/A').name, NA_ERROR);
  assertEquals(parser.parse('#NUM!').name, NUM_ERROR);
  assertEquals(parser.parse('#REF!').name, REF_ERROR);
  assertEquals(parser.parse('#NULL!').name, NULL_ERROR);
  assertEquals(parser.parse('#ERROR').name, PARSE_ERROR);
  assertEquals(parser.parse('#DIV/0!').name, DIV_ZERO_ERROR);
  assertEquals(parser.parse('#VALUE!').name, VALUE_ERROR);
});

test("Parse plain numbers", function() {
  assertEquals(parser.parse('10'), 10);
  // assertEquals(parser.parse('.1'), 0.1); // TODO: Fails because our parser doesn't expect a decimal right away.
  assertEquals(parser.parse('+1'), 1);
  assertEquals(parser.parse('-1'), -1);
  assertEquals(parser.parse('++1'), 1);
  assertEquals(parser.parse('--1'), 1);
  assertEquals(parser.parse('10e1'), 100);
  assertEquals(parser.parse('0e1'), 0);
  // assertEquals(parser.parse('0.e1'), 0); // TODO: Fails. After decimal, finds 'e' and thinks it's a variable.
  assertEquals(parser.parse('-10e1'), -100);
  assertEquals(parser.parse('+10e1'), 100);
  assertEquals(parser.parse('++10e1'), 100);
  assertEquals(parser.parse('--10e1'), 100);
});

test("Parse complex numbers and math", function(){
  assertEquals(parser.parse('"10" + 10'), 20);
  assertEquals(parser.parse('"10.111111" + 0'), 10.111111);
  assertEquals(parser.parse('10%'), 0.1);
  assertEquals(parser.parse('10% + 1'), 1.1);
  assertEquals(parser.parse('"10e1" + 0'), 100);
  assertEquals(parser.parse('10e1'), 100);
  assertEquals(parser.parse('10e-1'), 1);
  assertEquals(parser.parse('10e+1'), 100);
  assertEquals(parser.parse('10E1'), 100);
  assertEquals(parser.parse('10E-1'), 1);
  assertEquals(parser.parse('10E+1'), 100);
  assertEquals(parser.parse('"1,000,000"  + 0'), 1000000);
  assertEquals(parser.parse('"+$10.00" + 0'), 10);
  assertEquals(parser.parse('"-$10.00" + 0'), -10);
  assertEquals(parser.parse('"$+10.00" + 0'), 10);
  assertEquals(parser.parse('"$-10.00" + 0'), -10);
  assertEquals(parser.parse('"10" + 10'), 20);
  assertEquals(parser.parse('"10.111111" + 0'), 10.111111);
  assertEquals(parser.parse('10%'), 0.1);
  assertEquals(parser.parse('10% + 1'), 1.1);
  assertEquals(parser.parse('"10e1" + 0'), 100);
  assertEquals(parser.parse('10e1'), 100);
  assertEquals(parser.parse('10e-1'), 1);
  assertEquals(parser.parse('10e+1'), 100);
  assertEquals(parser.parse('10E1'), 100);
  assertEquals(parser.parse('10E-1'), 1);
  assertEquals(parser.parse('10E+1'), 100);
  assertEquals(parser.parse('"1,000,000"  + 0'), 1000000);
  catchAndAssertEquals(function () {
    parser.parse('"10e" + 10');
  }, VALUE_ERROR);
  assertEquals(parser.parse('"+$10.00" + 0'), 10);
  assertEquals(parser.parse('"-$10.00" + 0'), -10);
  assertEquals(parser.parse('"$+10.00" + 0'), 10);
  assertEquals(parser.parse('"$-10.00" + 0'), -10);
});

test("Parse strings", function(){
  assertEquals(parser.parse('"str"'), "str");
  assertEquals(parser.parse('"str"&"str"'), "strstr");
  catchAndAssertEquals(function () {
    parser.parse('"str"+"str"');
  }, VALUE_ERROR);
  // assertEquals("='str'", PARSE_ERROR); // TODO: Parses, but we should not allow single-quote strings.
});

test("Parse boolean literals", function(){
  assertEquals(parser.parse('TRUE'), true);
  assertEquals(parser.parse('true'), true);
  assertEquals(parser.parse('FALSE'), false);
  assertEquals(parser.parse('false'), false);
});

test("Parse comparison logic inside parentheses", function(){
  // assertEquals(parser.parse('(1=1)'), true); // TODO: Fails because we compute the value, rather than checking equality
  // assertEquals(parser.parse('(1=2)'), false); // TODO: Fails because we compute the value, rather than checking equality
  assertEquals(parser.parse('(1=1)+2'), 3);
});


test("Parse range literal", function(){
  // assertEqualsArray('=[1, 2, 3]', [1, 2, 3]); // TODO: Fails because we've not implemented array-level parsing.
  // assertEqualsArray('=[]', []);
  // assertEqualsArray('=["str", "str"]', ["str", "str"]);
  // assertEqualsArray('=["str", [1, 2, 3], [1]]', ["str", [1, 2, 3], [1]]);
});



assertEquals(parser.parse('"one" = "one"'), true);
