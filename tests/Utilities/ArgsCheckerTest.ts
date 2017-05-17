import {
  assertEquals,
  test
} from "../Utils/Asserts";
import {
  ArgsChecker
} from "../../src/Utilities/ArgsChecker";
import {NA_ERROR} from "../../src/Errors";


function catchAndAssertErrorFormatting(toExecute : Function, errorString: string, nameToMatch: string) {
  var toThrow = null;
  try {
    toExecute();
    toThrow = true;
  } catch (actualError) {
    if (actualError.name !== errorString || actualError.message.indexOf(nameToMatch) === -1) {
      console.log("expected:", errorString, " actual:", actualError.name, actualError.message);
      console.trace();
    }
  }
  if (toThrow) {
    console.log("expected error: " + errorString, "and function name in error: ", nameToMatch);
    console.trace();
  }
}

const FORMULA_NAME = "FROMTEST";
test("ArgsChecker.checkLength", function () {
  assertEquals(ArgsChecker.checkLength(["A", "B"], 2), undefined);
  assertEquals(ArgsChecker.checkLength(["A"], 1), undefined);
  assertEquals(ArgsChecker.checkLength([], 0), undefined);
  catchAndAssertErrorFormatting(function () {
    ArgsChecker.checkLength(["A", "B"], 100, FORMULA_NAME);
  }, NA_ERROR, FORMULA_NAME);
});


test("ArgsChecker.checkAtLeastLength", function () {
  assertEquals(ArgsChecker.checkAtLeastLength(["A", "B"], 2), undefined);
  assertEquals(ArgsChecker.checkAtLeastLength(["A", "B"], 1), undefined);
  assertEquals(ArgsChecker.checkAtLeastLength(["A"], 1), undefined);
  assertEquals(ArgsChecker.checkAtLeastLength(["A"], 0), undefined);
  assertEquals(ArgsChecker.checkAtLeastLength([], 0), undefined);
  catchAndAssertErrorFormatting(function () {
    ArgsChecker.checkAtLeastLength(["A", "B"], 3, FORMULA_NAME);
  }, NA_ERROR, FORMULA_NAME);
});


test("ArgsChecker.checkLengthWithin", function () {
  assertEquals(ArgsChecker.checkLengthWithin(["A", "B"], 2, 10), undefined);
  assertEquals(ArgsChecker.checkLengthWithin(["A", "B"], 1, 4), undefined);
  assertEquals(ArgsChecker.checkLengthWithin(["A", "B", "C", "D"], 1, 4), undefined);
  assertEquals(ArgsChecker.checkLengthWithin(["A", "B", "C", "D"], 1, 6), undefined);
  catchAndAssertErrorFormatting(function () {
    ArgsChecker.checkLengthWithin(["A", "B"], 3, 10, FORMULA_NAME);
  }, NA_ERROR, FORMULA_NAME);
  catchAndAssertErrorFormatting(function () {
    ArgsChecker.checkLengthWithin(["A", "B"], 5, 10, FORMULA_NAME);
  }, NA_ERROR, FORMULA_NAME);
  catchAndAssertErrorFormatting(function () {
    ArgsChecker.checkLengthWithin(["A", "B", "C", "D"], 5, 6, FORMULA_NAME);
  }, NA_ERROR, FORMULA_NAME);
});
