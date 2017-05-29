import {
  NA
} from "../../src/Formulas/Info";
import * as ERRORS from "../../src/Errors";
import {
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";


test("NA", function(){
  catchAndAssertEquals(function() {
    NA();
  }, ERRORS.NA_ERROR);
});
