import {
  Cell
} from "../src/Cell";
import {
  assertEquals,
  assertArrayEquals,
  test, assertIsNull
} from "./Utils/Asserts";

test("Cell.constructor", function(){
  var cell = new Cell("A1");
  assertEquals(cell.getColumn(), 0);
  assertEquals(cell.getRow(), 0);
  assertArrayEquals(cell.getDependencies(), []);
  assertEquals(cell.getId(), "A1");
  assertIsNull(cell.getFormula());
  assertEquals(cell.hasFormula(), false);
});

test("Cell.updateDependencies", function(){
  var one = new Cell("A1");
  one.updateDependencies(["B2", "C1", "D12", "D13"]);
  assertArrayEquals(one.getDependencies(), ["B2", "C1", "D12", "D13"]);
  one.updateDependencies(["M4"]);
  assertArrayEquals(one.getDependencies(), ["B2", "C1", "D12", "D13", "M4"]);
});

test("Cell.setValue", function(){
  var v = new Cell("A1");
  v.setValue("100");
  assertEquals("100", v.getValue());
});

test("Cell.isBlank", function(){
  var v = new Cell("A1");
  assertIsNull(v.getValue());
  assertIsNull(v.getError());
  assertEquals(v.isBlank(), true);
});
