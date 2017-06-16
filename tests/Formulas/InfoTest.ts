import {
  NA,
  ISTEXT
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
  assertEquals(ISTEXT(9), false);
  assertEquals(ISTEXT(false), false);
  catchAndAssertEquals(function() {
    ISTEXT.apply(this, []);
  }, ERRORS.NA_ERROR);
});
