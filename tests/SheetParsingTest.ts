import {
  assertFormulaEquals,
  assertFormulaEqualsError,
  test
} from "./Utils/Asserts";
import {
  DIV_ZERO_ERROR,
  VALUE_ERROR,
  PARSE_ERROR, NA_ERROR, NUM_ERROR, NULL_ERROR, REF_ERROR
} from "../src/Errors";

test("Sheet parsing error", function(){
  assertFormulaEqualsError('= 10e', PARSE_ERROR);
  assertFormulaEqualsError('= SUM(', PARSE_ERROR);
});

test("Sheet *", function(){
  assertFormulaEquals('= 10 * 10', 100);
  assertFormulaEquals('= 10 * 0', 0);
  assertFormulaEquals('= 1 * 1', 1);
});

test("Sheet /", function(){
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

test("Sheet ^", function(){
  assertFormulaEquals('= 10 ^ 10', 10000000000);
  assertFormulaEquals('= 10 ^ 0', 1);
  assertFormulaEquals('= 1 ^ 1', 1);
  assertFormulaEquals('= 2 ^ 10', 1024);
});

test("Sheet throw error literal", function () {
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

test("Sheet numbers/math", function(){
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
