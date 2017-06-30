import {
  catchAndAssertEquals,
  assertArrayEquals,
  test
} from "../Utils/Asserts";
import {
  Filter
} from "../../src/Utilities/Filter";
import {REF_ERROR} from "../../src/Errors";

test("Filter.flatten", function () {
  assertArrayEquals(Filter.flatten([0, 1, 2, 3, [4, 5], [], [[]], [[[6]]], 7]), [0, 1, 2, 3, 4, 5, 6, 7]);
  assertArrayEquals(Filter.flatten([0, 1, 2, 3, 4, 5, 6, 7]), [0, 1, 2, 3, 4, 5, 6, 7]);
  assertArrayEquals(Filter.flatten([0, 1, 2, 3, 4, 5, 6, undefined]), [0, 1, 2, 3, 4, 5, 6, undefined]);
});


test("Filter.filterOutNonNumberValues", function () {
  assertArrayEquals(Filter.filterOutNonNumberValues([0, 1, 2, 3, undefined, "0"]), [0, 1, 2, 3, undefined]);
  assertArrayEquals(Filter.filterOutNonNumberValues([0, 1, 2, 3, 4, 5, 6, 7]), [0, 1, 2, 3, 4, 5, 6, 7]);
});


test("Filter.filterOutStringValues", function () {
  assertArrayEquals(Filter.filterOutStringValues([0, 1, 2, 3, undefined, "0"]), [0, 1, 2, 3, undefined]);
  assertArrayEquals(Filter.filterOutStringValues([0, 1, 2, 3, "0", "dsadas"]), [0, 1, 2, 3]);
  assertArrayEquals(Filter.filterOutStringValues(["M", "0", "dsadas"]), []);
  assertArrayEquals(Filter.filterOutNonNumberValues([0, 1, 2, 3, 4, 5, 6, 7]), [0, 1, 2, 3, 4, 5, 6, 7]);
});


test("Filter.flattenAndThrow", function () {
  assertArrayEquals(Filter.flattenAndThrow([0, 1, 2, 3, [4, 5], [6], [[7]], [[[8]]], 9]), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assertArrayEquals(Filter.flattenAndThrow([0, 1, 2, 3, 4, 5, 6, 7]), [0, 1, 2, 3, 4, 5, 6, 7]);
  assertArrayEquals(Filter.flattenAndThrow([0, 1, 2, 3, 4, 5, 6, undefined]), [0, 1, 2, 3, 4, 5, 6, undefined]);
  catchAndAssertEquals(function () {
    Filter.flattenAndThrow([0, 1, 2, 3, [4, 5], [], [[]], [[[6]]], 7]);
  }, REF_ERROR);
  catchAndAssertEquals(function () {
    Filter.flattenAndThrow([[]])
  }, REF_ERROR);
});


test("Filter.stringValuesToZeros", function () {
  assertArrayEquals(Filter.stringValuesToZeros([0, 1, 2, 3, undefined, "0"]), [0, 1, 2, 3, undefined, 0]);
  assertArrayEquals(Filter.stringValuesToZeros([0, 1, 2, 3, "0", "dsadas"]), [0, 1, 2, 3, 0, 0]);
  assertArrayEquals(Filter.stringValuesToZeros(["M", "0", "dsadas"]), [0, 0, 0]);
  assertArrayEquals(Filter.stringValuesToZeros([0, 1, 2, 3, 4, 5, 6, 7]), [0, 1, 2, 3, 4, 5, 6, 7]);
});


