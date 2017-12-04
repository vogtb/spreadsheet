import {
  assertFormulaEquals, assertFormulaEqualsArray, assertFormulaEqualsDependsOnReference,
  assertFormulaEqualsError,
  test
} from "./Utils/Asserts";
import {
  DIV_ZERO_ERROR,
  VALUE_ERROR,
  PARSE_ERROR, NA_ERROR, NUM_ERROR, NULL_ERROR, REF_ERROR
} from "../src/Errors";
import {Cell} from "../src/Cell";

test("Parse but throw parse error", function(){
  assertFormulaEqualsError('= 10e', PARSE_ERROR);
  assertFormulaEqualsError('= SUM(', PARSE_ERROR);
});

test("Parse & operator", function(){
  assertFormulaEquals('="hey"&" "&"there"', "hey there");
  assertFormulaEquals('=TEXT(12.3, "###.##")&"mm"', "12.3mm");
});

test("Parse * operator", function(){
  assertFormulaEquals('= 10 * 10', 100);
  assertFormulaEquals('= 10 * 0', 0);
  assertFormulaEquals('= 1 * 1', 1);
});

test("Parse / operator", function(){
  assertFormulaEquals('= 10 / 2', 5);
  assertFormulaEquals('= 10 / 1', 10);
  assertFormulaEquals('= 1 / 1', 1);
  assertFormulaEquals('= 0 / 1', 0);
  assertFormulaEquals('="1" / 1', 1);
  assertFormulaEquals('="500" / 1', 500);
  assertFormulaEqualsError('= 10 / 0', DIV_ZERO_ERROR);
  assertFormulaEqualsError('= 0 / 0', DIV_ZERO_ERROR);
  assertFormulaEquals('= P9 / 1', 0);
});

test("Parse ^ operator", function(){
  assertFormulaEquals('= 10 ^ 10', 10000000000);
  assertFormulaEquals('= 10 ^ 0', 1);
  assertFormulaEquals('= 1 ^ 1', 1);
  assertFormulaEquals('= 2 ^ 10', 1024);
});

test("Parse equality operators", function(){
  assertFormulaEquals('= 1 = 1', true);
  assertFormulaEquals('= 1 = 0', false);
  assertFormulaEquals('= 1 < 2', true);
  assertFormulaEquals('= 1 < 0', false);
  assertFormulaEquals('= 1 <= 1', true);
  // assertFormulaEquals('= 1 <= 2', true); // TODO: Fails.
  assertFormulaEquals('= 1 >= 1', true);
  assertFormulaEquals('= 2 >= 1', true);
  assertFormulaEquals('= 1 >= 0', true);
  assertFormulaEquals('= 1 >= 2', false);
  assertFormulaEquals('= 1 <> 1', false);
  assertFormulaEquals('= 1 <> 2', true);
});

test("Parse operators, order of operations", function(){
  assertFormulaEquals('= 10 + -10', 0);
  assertFormulaEquals('= 10 + -10 = 0', true);
  assertFormulaEquals('= 10 + -10 = 0 & "str"', false);
  assertFormulaEquals('= -10%', -0.1);
  assertFormulaEquals('= 10 + 10%', 10.1);
  assertFormulaEquals('= -10 + 10%', -9.9);
  assertFormulaEquals('= -10 - +10%', -10.1);
  assertFormulaEquals('= 2^-10 + 10%', 0.1009765625);
  assertFormulaEquals('= 4 * 5 / 2', 10);
  assertFormulaEquals('= 4 / 5 * 4', 3.2);
  assertFormulaEquals('= 2^2*5', 20);
  assertFormulaEquals('= 2^(2*5)', 1024);
});

test("Parse and throw error literal", function () {
  assertFormulaEqualsError('=#N/A', NA_ERROR);
  assertFormulaEqualsError('=#NUM!', NUM_ERROR);
  assertFormulaEqualsError('=#REF!', REF_ERROR);
  assertFormulaEqualsError('=#NULL!', NULL_ERROR);
  assertFormulaEqualsError('=#ERROR', PARSE_ERROR);
  assertFormulaEqualsError('=#DIV/0!', DIV_ZERO_ERROR);
  assertFormulaEqualsError('=#VALUE!', VALUE_ERROR);
  assertFormulaEquals('=ISERROR(#N/A)', true);
  assertFormulaEquals('=ISERROR(#NUM!)', true);
  assertFormulaEquals('=ISERROR(#REF!)', true);
  assertFormulaEquals('=ISERROR(#NULL!)', true);
  assertFormulaEquals('=ISERROR(#ERROR)', true);
  assertFormulaEquals('=ISERROR(#DIV/0!)', true);
  assertFormulaEquals('=ISERROR(#VALUE!)', true);
  assertFormulaEquals('=IFERROR(#N/A, 10)', 10);
  assertFormulaEquals('=IFERROR(#NUM!, 10)', 10);
  assertFormulaEquals('=IFERROR(#REF!, 10)', 10);
  assertFormulaEquals('=IFERROR(#NULL!, 10)', 10);
  assertFormulaEquals('=IFERROR(#ERROR, 10)', 10);
  assertFormulaEquals('=IFERROR(#DIV/0!, 10)', 10);
  assertFormulaEquals('=IFERROR(#VALUE!, 10)', 10);
});

test("Parse plain numbers", function() {
  assertFormulaEquals('=10', 10);
  // assertFormulaEquals('=.1', 0.1); // TODO: Fails from parse error, but should pass
  assertFormulaEquals('=0.1', 0.1);
  assertFormulaEquals('=+1', 1);
  assertFormulaEquals('=-1', -1);
  assertFormulaEquals('=++1', 1);
  assertFormulaEquals('=--1', 1);
  assertFormulaEquals('=10e1', 100);
  assertFormulaEquals('=0e1', 0);
  // assertFormulaEquals('=0.e1', 0); // TODO: Fails from parse error, but should pass
  assertFormulaEquals('=-10e1', -100);
  assertFormulaEquals('=+10e1', 100);
  assertFormulaEquals('=++10e1', 100);
  assertFormulaEquals('=--10e1', 100);
});

test("Parse complex numbers and math", function(){
  assertFormulaEquals('= "10" + 10', 20);
  assertFormulaEquals('= "10.111111" + 0', 10.111111);
  assertFormulaEquals('= 10%', 0.1);
  assertFormulaEquals('= 10% + 1', 1.1);
  assertFormulaEquals('= "10e1" + 0', 100);
  assertFormulaEquals('= 10e1', 100);
  assertFormulaEquals('= 10e-1', 1);
  assertFormulaEquals('= 10e+1', 100);
  assertFormulaEquals('= 10E1', 100);
  assertFormulaEquals('= 10E-1', 1);
  assertFormulaEquals('= 10E+1', 100);
  assertFormulaEquals('= "1,000,000"  + 0', 1000000);
  assertFormulaEqualsError('= "10e" + 10', VALUE_ERROR);
  assertFormulaEquals('= "+$10.00" + 0', 10);
  assertFormulaEquals('= "-$10.00" + 0', -10);
  assertFormulaEquals('= "$+10.00" + 0', 10);
  assertFormulaEquals('= "$-10.00" + 0', -10);
  assertFormulaEquals('= "10" + 10', 20);
  assertFormulaEquals('= "10.111111" + 0', 10.111111);
  assertFormulaEquals('= 10%', 0.1);
  assertFormulaEquals('= 10% + 1', 1.1);
  assertFormulaEquals('= "10e1" + 0', 100);
  assertFormulaEquals('= 10e1', 100);
  assertFormulaEquals('= 10e-1', 1);
  assertFormulaEquals('= 10e+1', 100);
  assertFormulaEquals('= 10E1', 100);
  assertFormulaEquals('= 10E-1', 1);
  assertFormulaEquals('= 10E+1', 100);
  assertFormulaEquals('= "1,000,000"  + 0', 1000000);
  assertFormulaEqualsError('= "10e" + 10', VALUE_ERROR);
  assertFormulaEquals('= "+$10.00" + 0', 10);
  assertFormulaEquals('= "-$10.00" + 0', -10);
  assertFormulaEquals('= "$+10.00" + 0', 10);
  assertFormulaEquals('= "$-10.00" + 0', -10);
});

test("Parse strings", function(){
  assertFormulaEquals('="str"', "str");
  assertFormulaEquals('="str"&"str"', "strstr");
  assertFormulaEqualsError('="str"+"str"', VALUE_ERROR);
  // assertFormulaEqualsError("='str'", PARSE_ERROR); // TODO: Parses, but it shouldn't.
});

test("Parse boolean literals", function(){
  assertFormulaEquals('=TRUE', true);
  assertFormulaEquals('=true', true);
  assertFormulaEquals('=FALSE', false);
  assertFormulaEquals('=false', false);
});

test("Parse boolean logic", function(){
  // assertFormulaEquals('=(1=1)', true); // TODO: Fails because we compute the value, rather than checking equality
  // assertFormulaEquals('=(1=2)', false); // TODO: Fails because we compute the value, rather than checking equality
  assertFormulaEquals('=(1=1)+2', 3);

});


test("Parse range literal", function(){
  // assertFormulaEqualsArray('=[1, 2, 3]', [1, 2, 3]); // TODO: Fails because of low-level parser error
  // assertFormulaEqualsArray('=[]', []); // TODO: Fails because of low-level parser error
  // assertFormulaEqualsArray('=["str", "str"]', ["str", "str"]); // TODO: Fails because of low-level parser error
  // assertFormulaEqualsArray('=["str", [1, 2, 3], [1]]', ["str", [1, 2, 3], [1]]); // TODO: Fails because of low-level parser error
});

test("Parse cell references", function(){
  assertFormulaEqualsDependsOnReference("E1", "str", '=E1', Cell.BuildFrom("E1", "str"));
  // assertFormulaEqualsArray('=E1:E2', [new Cell("E1"), new Cell("E2")]); // TODO: Fails because the returned result is nested. Shouldn't be.
});

test("Parse range following comma", function(){
  // assertFormulaEquals('=SERIESSUM(1, 0, 1, [4, 5, 6])', 15);
  // assertFormulaEquals('=SERIESSUM([1], [0], [1], [4, 5, 6])', 15);
});


