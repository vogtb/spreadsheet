import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";
import {
  ArgsChecker
} from "../../src/Utilities/ArgsChecker";
import {NA_ERROR} from "../../src/Errors";


test("ArgsChecker.checkLength", function () {
  assertEquals(ArgsChecker.checkLength(["A", "B"], 2), undefined);
  assertEquals(ArgsChecker.checkLength(["A"], 1), undefined);
  assertEquals(ArgsChecker.checkLength([], 0), undefined);
  catchAndAssertEquals(function () {
    ArgsChecker.checkLength(["A", "B"], 100);
  }, NA_ERROR);
});


test("ArgsChecker.checkAtLeastLength", function () {
  assertEquals(ArgsChecker.checkAtLeastLength(["A", "B"], 2), undefined);
  assertEquals(ArgsChecker.checkAtLeastLength(["A", "B"], 1), undefined);
  assertEquals(ArgsChecker.checkAtLeastLength(["A"], 1), undefined);
  assertEquals(ArgsChecker.checkAtLeastLength(["A"], 0), undefined);
  assertEquals(ArgsChecker.checkAtLeastLength([], 0), undefined);
  catchAndAssertEquals(function () {
    ArgsChecker.checkAtLeastLength(["A", "B"], 3);
  }, NA_ERROR);
});


test("ArgsChecker.checkLengthWithin", function () {
  assertEquals(ArgsChecker.checkLengthWithin(["A", "B"], 2, 10), undefined);
  assertEquals(ArgsChecker.checkLengthWithin(["A", "B"], 1, 4), undefined);
  assertEquals(ArgsChecker.checkLengthWithin(["A", "B", "C", "D"], 1, 4), undefined);
  assertEquals(ArgsChecker.checkLengthWithin(["A", "B", "C", "D"], 1, 6), undefined);
  catchAndAssertEquals(function () {
    ArgsChecker.checkLengthWithin(["A", "B"], 3, 10);
    ArgsChecker.checkLengthWithin(["A", "B"], 5, 10);
    ArgsChecker.checkLengthWithin(["A", "B", "C", "D"], 5, 6);
  }, NA_ERROR);
});
