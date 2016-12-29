import { Cell } from "../src/Cell"
import { assertEquals, assertArrayEquals } from "./utils/Asserts"

//Test constructor
var cell = new Cell("0", "A1");
assertEquals(cell.col, 0);
assertEquals(cell.row, 0);
assertArrayEquals(cell.dependencies, []);
assertEquals(cell.id, "A1");
assertEquals(cell.formula, "0");

//Test updateDependencies
var one = new Cell("0", "A1");
one.updateDependencies(["B2", "C1", "D12", "D13"]);
assertArrayEquals(one.dependencies, ["B2", "C1", "D12", "D13"]);
one.updateDependencies(["M4"]);
assertArrayEquals(one.dependencies, ["B2", "C1", "D12", "D13", "M4"]);
