import {
  CHOOSE
} from "../../src/Formulas/Lookup";
import * as ERRORS from "../../src/Errors";
import {
  catchAndAssertEquals,
  test,
  assertEquals
} from "../Utils/Asserts";


test("CHOOSE", function(){
  assertEquals(CHOOSE(1, 1, 2, 3), 1);
  assertEquals(CHOOSE(2, 1, 2, 3), 2);
  catchAndAssertEquals(function() {
    CHOOSE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CHOOSE.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CHOOSE.apply(this, [4, 1, 2, 3]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CHOOSE.apply(this, [0, 1, 2, 3]);
  }, ERRORS.NUM_ERROR);
});
