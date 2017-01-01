import { Cell } from "../src/Cell"
import { assertEquals, assertArrayEquals } from "./utils/Asserts"

//Test constructor
var cell = new Cell("A1");
assertEquals(cell.getColumn(), 0);
assertEquals(cell.getRow(), 0);
assertArrayEquals(cell.getDependencies(), []);
assertEquals(cell.getId(), "A1");
assertEquals(cell.getFormula(), null);

//Test updateDependencies
var one = new Cell("A1");
one.updateDependencies(["B2", "C1", "D12", "D13"]);
assertArrayEquals(one.getDependencies(), ["B2", "C1", "D12", "D13"]);
one.updateDependencies(["M4"]);
assertArrayEquals(one.getDependencies(), ["B2", "C1", "D12", "D13", "M4"]);

//Test setValue
var v = new Cell("A1");
v.setValue("100");
assertEquals("100", v.getValue());
