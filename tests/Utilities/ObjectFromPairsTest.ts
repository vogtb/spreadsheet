import {
  assertEquals,
  test
} from "../Utils/Asserts";
import {
  ObjectFromPairs
} from "../../src/Utilities/ObjectFromPairs";

test("ObjectFromPairs.of", function () {
  assertEquals(ObjectFromPairs.of(["a", 1]), {a:1});
  var key = "key";
  assertEquals(ObjectFromPairs.of([key, 1]), {"key":1});
});
