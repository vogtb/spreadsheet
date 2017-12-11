import {
  DataStore
} from "../../src/Parser/DataStore";
import {assertArrayEquals, assertEquals, test} from "../Utils/Asserts";
import {Cell} from "../../src/Cell";

test("DataStore.addCell, getCell", function () {
  let datastore = new DataStore();
  let cell = Cell.BuildFrom("A1", 10);
  datastore.addCell(cell);
  assertEquals(datastore.getCell("A1"), cell);
  assertEquals(datastore.getCell("Z1"), new Cell("Z1"));
});

test("DataStore.getDependencies", function () {
  let datastore = new DataStore();
  let cell = Cell.BuildFrom("A1", 10);
  let deps = ["Z1", "M6"];
  cell.updateDependencies(deps);
  datastore.addCell(cell);
  assertArrayEquals(datastore.getCell("A1").getDependencies(), deps);
});