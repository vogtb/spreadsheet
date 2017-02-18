function assertEquals(actual, expected) {
  if (expected != actual) {
    console.log("expected:", expected, " actual:", actual);
    throw Error();
  }
}

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

function assertEqualsDates(one: Date, expectation: Date) {
  assertEquals(one.getTime(), expectation.getTime());
}

export {
  assertEquals,
  assertArrayEquals,
  assertEqualsDates
}