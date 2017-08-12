import {
  TO_DATE,
  TO_DOLLARS,
  TO_PERCENT,
  TO_TEXT
} from "../../src/Formulas/Convert";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";


test("TO_DATE", function(){
  assertEquals(TO_DATE(10), 10);
  assertEquals(TO_DATE(false), false);
  assertEquals(TO_DATE(true), true);
  assertEquals(TO_DATE(-100), -100);
  assertEquals(TO_DATE("June 10, 2010"), "June 10, 2010");
  assertEquals(TO_DATE("str"), "str");
  catchAndAssertEquals(function() {
    TO_DATE.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TO_DATE.apply(this, [])
  }, ERRORS.NA_ERROR);
});

test("TO_DOLLARS", function(){
  assertEquals(TO_DOLLARS(10), 10);
  assertEquals(TO_DOLLARS(false), false);
  assertEquals(TO_DOLLARS(true), true);
  assertEquals(TO_DOLLARS(-100), -100);
  assertEquals(TO_DOLLARS("June 10, 2010"), "June 10, 2010");
  assertEquals(TO_DOLLARS("str"), "str");
  catchAndAssertEquals(function() {
    TO_DOLLARS.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TO_DOLLARS.apply(this, [])
  }, ERRORS.NA_ERROR);
});

test("TO_PERCENT", function(){
  assertEquals(TO_PERCENT(10), 10);
  assertEquals(TO_PERCENT(false), false);
  assertEquals(TO_PERCENT(true), true);
  assertEquals(TO_PERCENT(-100), -100);
  assertEquals(TO_PERCENT("June 10, 2010"), "June 10, 2010");
  assertEquals(TO_PERCENT("str"), "str");
  catchAndAssertEquals(function() {
    TO_PERCENT.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TO_PERCENT.apply(this, [])
  }, ERRORS.NA_ERROR);
});

test("TO_TEXT", function(){
  assertEquals(TO_TEXT(10), "10");
  assertEquals(TO_TEXT(10.23984728937), "10.23984728937");
  assertEquals(TO_TEXT(false), "FALSE");
  assertEquals(TO_TEXT(true), "TRUE");
  assertEquals(TO_TEXT(-100), "-100");
  assertEquals(TO_TEXT("June 10, 2010"), "June 10, 2010");
  assertEquals(TO_TEXT("str"), "str");
  catchAndAssertEquals(function() {
    TO_TEXT.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TO_TEXT.apply(this, [])
  }, ERRORS.NA_ERROR);
});
