import {
  Cell
} from "../../src/Cell";

import {
  Sheet
} from "../../src/Sheet";
/**
 * Assert two params are equal using strict equality testing.
 * @param actual value
 * @param expected value
 */
function assertEquals(actual, expected) {
  if (actual instanceof Cell && expected instanceof Cell) {
    if (!expected.equals(actual)) {
      console.log("expected:", expected, " actual:", actual);
      console.trace();
    }
  } else if (actual instanceof Object && expected instanceof Object) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      console.log("expected:", expected, " actual:", actual);
      console.trace();
    }
  } else {
    if (expected !== actual) {
      console.log("expected:", expected, " actual:", actual);
      console.trace();
    }
  }
}

/**
 * Asserts value is equal to null.
 * @param actual - value to test.
 */
function assertIsNull(actual) {
  if (null !== actual) {
    console.log("expected:", null, " actual:", actual);
    console.trace();
  }
}


/**
 * Assert two arrays are equal using strict equality testing on individual items.
 * @param actual value
 * @param expected value
 */
function assertArrayEquals(actual: Array<any>, expected: Array<any>, ) {
  if (expected.length != actual.length) {
    console.log("expected: ", expected, " actual:", actual);
    console.trace();
    return;
  }
  for (let index in expected) {
    if (expected[index] != actual[index]) {
      console.log("expected: ", expected, " actual:", actual);
      console.trace();
    }
  }
}

/**
 * Catch exceptions, check their name for an expected value
 * @param toExecute function to execute
 * @param expected error message
 */
function catchAndAssertEquals(toExecute : Function, expected) {
  let toThrow = null;
  try {
    toExecute();
    toThrow = true;
  } catch (actualError) {
    if (actualError.name !== expected) {
      console.log("expected:", expected, " actual:", actualError.name, actualError.message);
      console.trace();
    }
  }
  if (toThrow) {
    console.log("expected error: " + expected);
    console.trace();
  }
}

/**
 * Print description of test, and run test.
 * @param {string} description - To print.
 * @param {Function} toRun - Test function to run.
 */
function test(description: string, toRun: Function) {
  console.log("Test:", description);
  toRun();
}


/**
 * Assert formula will result in a particular error.
 * @param {string} formula
 * @param {string} errorString
 */
function assertFormulaEqualsError(formula: string, errorString: string) {
  let sheet  = new Sheet();
  sheet.setCell("A1", formula);
  let cell = sheet.getCell("A1");
  assertEquals(cell.getError().name, errorString);
  assertEquals(cell.getValue(), null);
}

/**
 * Assert formula will result in a particular value.
 * @param {string} formula
 * @param expectation
 */
function assertFormulaEquals(formula: string, expectation: any) {
  let sheet  = new Sheet();
  sheet.setCell("A1", formula);
  let cell = sheet.getCell("A1");
  assertEquals(cell.getError(), null);
  assertEquals(cell.getValue(), expectation);
}

/**
 * Assert formula will equal a result, depends on a specific cell reference.
 * @param {string} refId - Cell ID, eg: A1
 * @param value - Value for refId.
 * @param {string} formula - Formula to evaluate.
 * @param expectation - Expected result.
 */
function assertFormulaEqualsDependsOnReference(refId: string, value: any, formula: string, expectation: any) {
  let sheet  = new Sheet();
  sheet.setCell(refId, value);
  sheet.setCell("A1", formula);
  let cell = sheet.getCell("A1");
  assertEquals(cell.getError(), null);
  assertEquals(cell.getValue(), expectation);
}

/**
 * Assert that the evaluation of a formula results in a specific type.
 * @param {string} formula
 * @param {string} type
 */
function assertFormulaResultsInType(formula: string, type: string) {
  let sheet  = new Sheet();
  sheet.setCell("A1", formula);
  let cell = sheet.getCell("A1");
  assertEquals(cell.getError(), null);
  assertEquals(typeof cell.getValue(), type);
}

/**
 * Assert formula will result in a particular array.
 * @param {string} formula
 * @param expectation
 */
function assertFormulaEqualsArray(formula: string, expectation: any) {
  let sheet  = new Sheet();
  sheet.setCell("A1", formula);
  let cell = sheet.getCell("A1");
  assertEquals(null, cell.getError());
  let values = cell.getValue();
  for (let index in values) {
    assertEquals(values[index], expectation[index]);
  }
}

/**
 * Lock in Date by overriding prototypes. WARNING: Should be used sparingly and cautiously.
 * @param year
 * @param month
 * @param day
 * @param hour
 * @param minute
 * @param second
 */
function lockDate(year, month, day, hour, minute, second)  {
  let d = new Date(year, month, day, hour, minute, second);
  Date.prototype.constructor = function () {
    return d;
  };
  Date.now = function () {
    return +(d);
  };
}


export {
  assertIsNull,
  assertEquals,
  assertArrayEquals,
  assertFormulaEquals,
  assertFormulaResultsInType,
  assertFormulaEqualsArray,
  assertFormulaEqualsError,
  assertFormulaEqualsDependsOnReference,
  catchAndAssertEquals,
  test,
  lockDate
}