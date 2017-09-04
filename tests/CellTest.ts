import {
  Cell,
  CELL_ID_ERROR
} from "../src/Cell";
import {
  assertArrayEquals,
  assertEquals,
  assertIsNull,
  catchAndAssertEquals,
  test
} from "./Utils/Asserts";

test("Cell.constructor", function(){
  let cell = new Cell("A1");
  assertEquals(cell.getColumn(), 0);
  assertEquals(cell.getRow(), 0);
  assertArrayEquals(cell.getDependencies(), []);
  assertEquals(cell.getId(), "A1");
  assertIsNull(cell.getFormula());
  assertEquals(cell.hasFormula(), false);
  catchAndAssertEquals(function () {
    new Cell("C");
  }, CELL_ID_ERROR)
  catchAndAssertEquals(function () {
    new Cell("111");
  }, CELL_ID_ERROR)
  catchAndAssertEquals(function () {
    new Cell("BAD11BAD");
  }, CELL_ID_ERROR)
});

test("Cell.updateDependencies", function(){
  let one = new Cell("A1");
  one.updateDependencies(["B2", "C1", "D12", "D13"]);
  assertArrayEquals(one.getDependencies(), ["B2", "C1", "D12", "D13"]);
  one.updateDependencies(["M4"]);
  assertArrayEquals(one.getDependencies(), ["B2", "C1", "D12", "D13", "M4"]);
});

test("Cell.getDependencies", function(){
  let one = new Cell("A1");
  assertArrayEquals(one.getDependencies(), []);
  one.updateDependencies(["M4"]);
  assertArrayEquals(one.getDependencies(), ["M4"]);
});

test("Cell.getColumn", function(){
  assertEquals(Cell.BuildFrom("A1", 0).getColumn(), 0);
  assertEquals(Cell.BuildFrom("B1", 0).getColumn(), 1);
  assertEquals(Cell.BuildFrom("M1", 0).getColumn(), 12);
  assertEquals(Cell.BuildFrom("N1", 0).getColumn(), 13);
  assertEquals(Cell.BuildFrom("AA1", 0).getColumn(), 26);
  assertEquals(Cell.BuildFrom("AB1", 0).getColumn(), 27);
  assertEquals(Cell.BuildFrom("AM1", 0).getColumn(), 38);
});

test("Cell.getRow", function(){
  assertEquals(Cell.BuildFrom("A1", 0).getRow(), 0);
  assertEquals(Cell.BuildFrom("B2", 0).getRow(), 1);
  assertEquals(Cell.BuildFrom("M13", 0).getRow(), 12);
  assertEquals(Cell.BuildFrom("N14", 0).getRow(), 13);
  assertEquals(Cell.BuildFrom("AA27", 0).getRow(), 26);
  assertEquals(Cell.BuildFrom("AB28", 0).getRow(), 27);
  assertEquals(Cell.BuildFrom("AM39", 0).getRow(), 38);
});

test("Cell.getId", function(){
  assertEquals(Cell.BuildFrom("A1", 0).getId(), "A1");
  assertEquals(Cell.BuildFrom("M1400", 0).getId(), "M1400");
});

test("Cell.setValue, Cell.getValue", function(){
  let v = new Cell("A1");
  v.setValue("100");
  assertEquals(v.getValue(), "100");
  v = new Cell("A1");
  v.setValue("=SUM(10, 10)");
  assertIsNull(v.getValue());
});

test("Cell.clearValue", function(){
  let v = Cell.BuildFrom("A1", 100);
  assertEquals(v.getValue(), 100);
  v.clearValue();
  assertIsNull(v.getValue());
});

test("Cell.setError, Cell.getError", function(){
  let v = Cell.BuildFrom("A1", 100);
  let e = new Error("e");
  assertIsNull(v.getError());
  v.setError(e);
  assertEquals(v.getError(), e);
});

test("Cell.hasError", function(){
  let v = Cell.BuildFrom("A1", 100);
  let e = new Error("e");
  assertEquals(v.hasError(), false);
  v.setError(e);
  assertEquals(v.hasError(), true);
});

test("Cell.getFormula", function(){
  assertIsNull(Cell.BuildFrom("A1", "100").getFormula());
  assertEquals(Cell.BuildFrom("A1", "=SUM(1, 2)").getFormula(), "SUM(1, 2)");
  assertEquals(Cell.BuildFrom("A1", "= 100,000,000").getFormula(), " 100,000,000");
});

test("Cell.hasFormula", function(){
  assertEquals(Cell.BuildFrom("A1", "100").hasFormula(), false);
  assertEquals(Cell.BuildFrom("A1", "=SUM(1, 2)").hasFormula(), true);
  assertEquals(Cell.BuildFrom("A1", "= 100,000,000").hasFormula(), true);
});

test("Cell.getRawFormulaText", function(){
  assertIsNull(Cell.BuildFrom("A1", "100").getRawFormulaText());
  assertEquals(Cell.BuildFrom("A1", "=10e1").getRawFormulaText(), "10e1");
  assertEquals(Cell.BuildFrom("A1", "=SUM(1, 2)").getRawFormulaText(), "SUM(1, 2)");
  assertEquals(Cell.BuildFrom("A1", "= 100,000,000").getRawFormulaText(), " 100,000,000");
});

test("Cell.isBlank", function(){
  let v = new Cell("A1");
  assertIsNull(v.getValue());
  assertIsNull(v.getError());
  assertEquals(v.isBlank(), true);
});

test("Cell.BuildFrom", function(){
  let v = Cell.BuildFrom("A1", 10);
  assertEquals(v.getValue(), 10);
  assertIsNull(v.getError());
  assertEquals(v.isBlank(), false);
});

test("Cell.tosString", function(){
  assertEquals(new Cell("A1").toString(), "id=A1, value=null, rawFormulaText=null, error=null");
  assertEquals(Cell.BuildFrom("A1", 100).toString(), "id=A1, value=100, rawFormulaText=null, error=null");
  assertEquals(Cell.BuildFrom("A1", "100").toString(), "id=A1, value=100, rawFormulaText=null, error=null");
  assertEquals(Cell.BuildFrom("A1", "=SUM(A1:A10)").toString(), "id=A1, value=null, rawFormulaText=SUM(A1:A10), error=null");
});

test("Cell.equals", function(){
  assertEquals(new Cell("A1").equals(new Cell("A1")), true);
  assertEquals(new Cell("M100").equals(new Cell("A1")), false);
  assertEquals(Cell.BuildFrom("A1", 100).equals(Cell.BuildFrom("A1", 100)), true);
});