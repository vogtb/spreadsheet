import {
  FREQUENCY,
  GROWTH,
  LINEST
} from "../../src/Formulas/Range";
import {
  assertArrayEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";
import * as ERRORS from "../../src/Errors";


test("FREQUENCY", function(){
  assertArrayEquals(FREQUENCY([10, 2, 3, 44, 1, 2], 22), [5, 1]);
  assertArrayEquals(FREQUENCY([10, 2, 3, 44, 1, 2], [22]), [5, 1]);
  assertArrayEquals(FREQUENCY([10, [2, 3, 44, 1], 2], [22]), [5, 1]);
  assertArrayEquals(FREQUENCY([18, 30, 90, 91, 35, 27, 75, 28, 58], [25, 50, 75]), [1, 4, 2, 2]);
  assertArrayEquals(FREQUENCY([18, 30, 90, 91, 35, 27, 75, 28, 58], [50, 25, 75]), [1, 4, 2, 2]);
  catchAndAssertEquals(function() {
    FREQUENCY.apply(this, [10, 10, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FREQUENCY.apply(this, [10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FREQUENCY([10, 2, 3, 44, 1, [], 2], 22);
  }, ERRORS.REF_ERROR);
});


test("GROWTH", function(){
  assertArrayEquals(GROWTH(
    [15.53, 19.99, 20.43, 21.18, 25.93, 30.00, 30.00, 34.01, 36.47],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12]
  ), [41.740521723275876, 46.22712349335047, 51.19598074591973]);
  assertArrayEquals(GROWTH(
    [15.53, 19.99, 20.43, 21.18, 25.93, [30.00, 30.00, 34.01], 36.47],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12]
  ), [41.740521723275876, 46.22712349335047, 51.19598074591973]);
  catchAndAssertEquals(function() {
    GROWTH(
      [15.53, 19.99, 20.43, 21.18, "25.93", 30.00, 30.00, 34.01, 36.47],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12]
    );
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    GROWTH(
      [15.53, 19.99, 20.43, 21.18, [25.93, 30.00], [], 30.00, 34.01, 36.47],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12]
    );
  }, ERRORS.REF_ERROR);
});


test("GROWTH", function(){
  assertArrayEquals(LINEST(
    [15.53, 19.99, 20.43, 21.18, 25.93, 30.00, 30.00, 34.01, 36.47],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ), [2.563, 13.13388888888889]);
  assertArrayEquals(LINEST(
    [15.53, 19.99, 20.43, 21.18, 25.93, 30],
    [1, 2, 3, 4, 5, 6]
  ), [2.5977142857142863,	13.08466666666666]);
  catchAndAssertEquals(function() {
    LINEST(
      [15.53, 19.99, 20.43, 21.18, 25.93, "string", 30],
      [1, 2, 3, 4, 5, 6]
    );
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    LINEST(
      [15.53],
      [1]
    );
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LINEST.apply(
      this,
      [[15.53, 19.99, 20.43, 21.18, 25.93, 30],
        [1, 2, 3, 4, 5, 6],
        "another"]
    );
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LINEST.apply(
      this,
      [[15.53, 19.99, 20.43, 21.18, 25.93, 30]]
    );
  }, ERRORS.NA_ERROR);
});