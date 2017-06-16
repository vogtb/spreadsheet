import {
  NA,
  ISTEXT,
  ISLOGICAL,
  ISNUMBER
} from "../../src/Formulas/Info";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";


test("NA", function(){
  catchAndAssertEquals(function() {
    NA();
  }, ERRORS.NA_ERROR);
});

test("ISTEXT", function(){
  assertEquals(ISTEXT("str"), true);
  assertEquals(ISTEXT(["str"]), true);
  assertEquals(ISTEXT(9), false);
  assertEquals(ISTEXT(false), false);
  catchAndAssertEquals(function() {
    ISTEXT.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ISLOGICAL", function(){
  assertEquals(ISLOGICAL("str"), false);
  assertEquals(ISLOGICAL(9), false);
  assertEquals(ISLOGICAL(false), true);
  assertEquals(ISLOGICAL(true), true);
  catchAndAssertEquals(function() {
    ISLOGICAL.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ISNUMBER", function(){
  assertEquals(ISNUMBER("str"), false);
  assertEquals(ISNUMBER(9), true);
  assertEquals(ISNUMBER(false), false);
  assertEquals(ISNUMBER(true), false);
  catchAndAssertEquals(function() {
    ISNUMBER.apply(this, []);
  }, ERRORS.NA_ERROR);
});
