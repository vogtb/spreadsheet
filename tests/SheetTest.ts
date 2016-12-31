import { Sheet } from "../src/Sheet"
import { assertEquals } from "./utils/Asserts"

// Test setCell, getCell, valid
var sheet = new Sheet();
sheet.setCell("A2", "22");
var cell = sheet.getCell("A2");
assertEquals("22", cell.formula);
assertEquals(22, cell.value);
assertEquals("A2", cell.id);
assertEquals(1, cell.row);
assertEquals(0, cell.col);

// Test getCell, null value
var nullCell = sheet.getCell("N1");
assertEquals(null, nullCell);
