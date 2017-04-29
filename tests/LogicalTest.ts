import {
  AND,
  EXACT,
  TRUE,
  FALSE,
  NOT,
  OR,
  XOR
} from "../src/RawFormulas/Logical";
import * as ERRORS from "../src/Errors"
import {
  assertEquals,
  catchAndAssertEquals
} from "./utils/Asserts";


// Test AND
assertEquals(AND(10), true);
assertEquals(AND(10, 10), true);
assertEquals(AND(10, 0), false);
assertEquals(AND(10, false), false);
assertEquals(AND(0, 0), false);
catchAndAssertEquals(function() {
  AND(1, "");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  AND();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AND(1, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AND(0, [1, 1]), false);
assertEquals(AND(1, [1, 1]), true);
catchAndAssertEquals(function() {
  AND(1, [1, "str"]);
}, ERRORS.VALUE_ERROR);


// Test EXACT
assertEquals(EXACT("m", "M"), false);
assertEquals(EXACT("m", "m"), true);
assertEquals(EXACT("m", false), false);
assertEquals(EXACT(false, false), true);
assertEquals(EXACT(10, 10), true);
assertEquals(EXACT(10, "10"), true);
assertEquals(EXACT(10, "str"), false);
assertEquals(EXACT([10], [10]), true);
assertEquals(EXACT(["str"], [10, 22]), false);
catchAndAssertEquals(function() {
  EXACT([], []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  EXACT([]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT("m");
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT(10, 10, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT(false);
}, ERRORS.NA_ERROR);


// Test TRUE
assertEquals(TRUE(), true);


// Test FALSE
assertEquals(FALSE(), false);


// Test NOT
assertEquals(NOT(TRUE()), false);
assertEquals(NOT(""), true);
catchAndAssertEquals(function() {
  NOT(" ");
}, ERRORS.VALUE_ERROR);
assertEquals(NOT(100), false);
assertEquals(NOT(0), true);
assertEquals(NOT(-1), false);
assertEquals(NOT(1), false);
catchAndAssertEquals(function() {
  NOT("0");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  NOT([]);
}, ERRORS.REF_ERROR);
assertEquals(NOT([10]), false);
assertEquals(NOT([0, 0]), true);
assertEquals(NOT([0, false]), true);
assertEquals(NOT([false, 0]), true);
assertEquals(NOT([10, "str"]), false);
catchAndAssertEquals(function() {
  NOT("str");
}, ERRORS.VALUE_ERROR);
assertEquals(NOT([""]), true);
assertEquals(NOT([0]), true);
assertEquals(NOT([1]), false);
assertEquals(NOT([0, 1]), true);
catchAndAssertEquals(function() {
  NOT("1.2");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  NOT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  NOT(false, false);
}, ERRORS.NA_ERROR);


// Test OR
assertEquals(OR(true, false), true);
assertEquals(OR(false, false), false);
assertEquals(OR(1, 0), true);
assertEquals(OR([1, 0]), true);
assertEquals(OR(false, 0, -10), true);
assertEquals(OR([false, 0, -10]), true);
assertEquals(OR([false, 0, [-10]]), true);
catchAndAssertEquals(function() {
  OR([false, 0, []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  OR(false, "d");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  OR(false, "10");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  OR(false, "1.1");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  OR();
}, ERRORS.NA_ERROR);


// Test XOR
assertEquals(XOR(1, 1), false);
assertEquals(XOR(1, 0), true);
assertEquals(XOR(0, 0, 0), false);
assertEquals(XOR(0, 0, 1), true);
assertEquals(XOR(0, 0, [0, 0, 1]), true);
assertEquals(XOR(0, 1, [0, 0, 1]), false);
catchAndAssertEquals(function() {
  XOR("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  XOR();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  XOR(1, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  XOR([]);
}, ERRORS.REF_ERROR);