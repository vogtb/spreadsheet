import { Sheet } from "../src/Sheet"
import {assertEquals, assertArrayEquals} from "./utils/Asserts"
import { Errors } from "../src/Errors"

// Test setCell, getCell, valid
var sheet = new Sheet();
sheet.setCell("A2", "22");
var cell = sheet.getCell("A2");
assertEquals("22", cell.formula);
assertEquals(22, cell.value);
assertEquals("A2", cell.id);
assertEquals(1, cell.row);
assertEquals(0, cell.col);
assertEquals(null, cell.error);
assertArrayEquals([], cell.dependencies);

// Test getCell, null value
var nullCell = sheet.getCell("N1");
assertEquals(null, nullCell);

// Test setCell, with formula
var sheet = new Sheet();
sheet.setCell("A1", "1");
sheet.setCell("A2", "20");
sheet.setCell("A3", "3.4");
sheet.setCell("A4", "45");
sheet.setCell("A5", "SUM(A1:A4)");
var A5 = sheet.getCell("A5");
assertEquals("69.4", A5.value);
assertEquals("SUM(A1:A4)", A5.formula);
assertEquals(null, cell.error);
assertArrayEquals(['A1', 'A2', 'A3', 'A4'], A5.dependencies);


// Test load
var sheet = new Sheet();
var SUM_FORMULA = "SUM(A1:D1, H1)";
var MAX_FORMULA = "MAX(A2:J2)";
var MIN_FORMULA = "MIN(A3:J3)";
var AVERAGE_FORMULA = "AVERAGE(A4:J4)";
var SUM_IF_FORMULA = "SUMIF(A5:J5,'>5')";
var SUM_REF_FORMULA = "SUM(K1, K2, K3, K4)";
sheet.load([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, SUM_FORMULA],
  [-1, -10, 2, 4, 100, 1, 50, 20, 200, -100, MAX_FORMULA],
  [-1, -40, -53, 1, 10, 30, 10, 301, -1, -20, MIN_FORMULA],
  [20, 50, 100, 20, 1, 5, 15, 25, 45, 23, AVERAGE_FORMULA],
  [0, 10, 1, 10, 2, 10, 3, 10, 4, 10, SUM_IF_FORMULA],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, SUM_REF_FORMULA]]);
var K1 = sheet.getCell("K1");
assertEquals("18", K1.value);
assertEquals(SUM_FORMULA, K1.formula);
assertEquals(null, K1.error);
assertArrayEquals(['A1', 'B1', 'C1', 'D1', 'H1'], K1.dependencies);
var K2 = sheet.getCell("K2");
assertEquals("200", K2.value);
assertEquals(MAX_FORMULA, K2.formula);
assertEquals(null, K2.error);
assertArrayEquals(['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2'], K2.dependencies);
var K3 = sheet.getCell("K3");
assertEquals("-53", K3.value);
assertEquals(MIN_FORMULA, K3.formula);
assertEquals(null, K3.error);
assertArrayEquals(['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3'], K3.dependencies);
var K4 = sheet.getCell("K4");
assertEquals("30.4", K4.value);
assertEquals(AVERAGE_FORMULA, K4.formula);
assertEquals(null, K4.error);
assertArrayEquals(['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4'], K4.dependencies);
var K5 = sheet.getCell("K5");
assertEquals("50", K5.value);
assertEquals(SUM_IF_FORMULA, K5.formula);
assertEquals(null, K5.error);
assertArrayEquals(['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5'], K5.dependencies);
var K6 = sheet.getCell("K6");
assertEquals("195.4", K6.value);
assertEquals(SUM_REF_FORMULA, K6.formula);
assertEquals(null, K6.error);
assertArrayEquals(['K1', 'K2', 'K3', 'K4'], K6.dependencies);


//Test REF error
var sheet  = new Sheet();
sheet.setCell("A1", "200");
sheet.setCell("A2", "200");
sheet.setCell("A3", "SUM(A1, A2)");
sheet.setCell("B1", "SUM(A3, B2)");
sheet.setCell("B2", "SUM(A1, B1)");
var B1 = sheet.getCell("B1");
assertEquals(null, B1.value);
assertEquals(Errors.get("REF"), B1.error);
assertArrayEquals(['A3', 'B2'], B1.dependencies);
var B2 = sheet.getCell("B2");
assertEquals(null, B2.value);
assertEquals(Errors.get("REF"), B2.error);
assertArrayEquals(['A1', 'B1'], B2.dependencies);

// Test NAME error
var sheet  = new Sheet();
sheet.setCell("A1", "1");
sheet.setCell("A2", "SUM(A1, NN)");
var A2 = sheet.getCell("A2");
assertEquals(null, A2.value);
assertEquals(Errors.get("NAME"), A2.error);
assertArrayEquals(['A1'], A2.dependencies);