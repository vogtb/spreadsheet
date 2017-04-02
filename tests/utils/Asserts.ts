import {
  ExcelDate
} from "../../src/ExcelDate";
/**
 * Assert two params are equal using strict equality testing.
 * @param actual value
 * @param expected value
 */
function assertEquals(actual, expected) {
  if (actual instanceof ExcelDate && expected instanceof ExcelDate) {
    if (!actual.equals(expected)) {
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
 * Assert two arrays are equal using strict equality testing on individual items.
 * @param actual value
 * @param expected value
 */
function assertArrayEquals(actual: Array<any>, expected: Array<any>, ) {
  if (expected.length != actual.length) {
    console.log("expected: ", expected, " actual:", actual);
    throw Error();
  }
  for (var index in expected) {
    if (expected[index] != actual[index]) {
      console.log("expected: ", expected, " actual:", actual);
      throw Error();
    }
  }
}

export {
  assertEquals,
  assertArrayEquals
}