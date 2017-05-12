import {
  assertEquals,
  test
} from "../Utils/Asserts";
import {
  Serializer
} from "../../src/Utilities/Serializer";

test("Serializer.serialize", function () {
  assertEquals(Serializer.serialize(22), "<number: 22>");
  assertEquals(Serializer.serialize(0), "<number: 0>");
  assertEquals(Serializer.serialize(87342794), "<number: 87342794>");
  assertEquals(Serializer.serialize("87342794"), "<string: 87342794>");
  assertEquals(Serializer.serialize("hello"), "<string: hello>");
  assertEquals(Serializer.serialize(false), "<boolean: false>");
  assertEquals(Serializer.serialize(true), "<boolean: true>");
});
