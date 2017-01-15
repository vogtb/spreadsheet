function assertEquals(expected, actual) {
  if (expected != actual) {
    console.log(expected, "not equal to", actual);
    throw Error();
  }
}

function assertArrayEquals(expected: Array<any>, actual: Array<any>) {
  if (expected.length != actual.length) {
    console.log(expected, "not equal to", actual);
    throw Error();
  }
  for (var index in expected) {
    if (expected[index] != actual[index]) {
      console.log(expected, "not equal to", actual);
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