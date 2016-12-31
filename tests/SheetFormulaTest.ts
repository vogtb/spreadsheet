import { Sheet } from "../src/Sheet"
import {assertEquals, assertArrayEquals} from "./utils/Asserts"

//Test CONCATENATE formula
var sheet  = new Sheet();
sheet.setCell("A1", "Hello, ");
sheet.setCell("A2", "World!");
sheet.setCell("A3", "=CONCATENATE(A1, A2)");
sheet.setCell("B1", "1000");
sheet.setCell("B2", "=CONCATENATE(A1, B1)");
var cell = sheet.getCell("A3");
assertEquals("Hello, World!", cell.value);
assertEquals(null, cell.error)
assertArrayEquals(['A1', 'A2'], cell.dependencies);
var cell = sheet.getCell("B2");
assertEquals("Hello, 1000", cell.value);
assertEquals(null, cell.error)
assertArrayEquals(['A1', 'B1'], cell.dependencies);
