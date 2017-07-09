import {
  Sheet
} from "../src/Sheet";
import {
  assertEquals,
  assertIsNull,
  assertArrayEquals,
  test
} from "./Utils/Asserts";
import {
  REF_ERROR,
  NAME_ERROR
} from "../src/Errors";

test("Sheet.setCell, Sheet.getCell", function(){
  // Test setCell, getCell, valid
  var sheet = new Sheet();
  sheet.setCell("A2", "22");
  var cell = sheet.getCell("A2");
  assertEquals(null, cell.getFormula());
  assertEquals("22", cell.getValue());
  assertEquals("A2", cell.getId());
  assertEquals(1, cell.getRow());
  assertEquals(0, cell.getColumn());
  assertIsNull(cell.getError());
  assertArrayEquals([], cell.getDependencies());

  // Test getCell, blank cell value
  var blankCell = sheet.getCell("N1");
  assertEquals(true, blankCell.isBlank());
  assertIsNull(blankCell.getError());
  assertEquals(false, blankCell.hasFormula());

  // Test setCell, with formula
  var sheet = new Sheet();
  var SUM_FORM = "=SUM(A1:A4)";
  sheet.setCell("A1", "1");
  sheet.setCell("A2", "20");
  sheet.setCell("A3", "3.4");
  sheet.setCell("A4", "45");
  sheet.setCell("A5", "=SUM(A1:A4)");
  var A5 = sheet.getCell("A5");
  assertEquals(69.4, A5.getValue());
  assertEquals(SUM_FORM.substr(1), A5.getFormula());
  assertIsNull(cell.getError());
  assertArrayEquals(['A1', 'A2', 'A3', 'A4'], A5.getDependencies());
});

test("Sheet.load", function(){
  var sheet = new Sheet();
  var SUM_FORMULA = "=SUM(A1:D1, H1)";
  var MAX_FORMULA = "=MAX(A2:J2)";
  var MIN_FORMULA = "=MIN(A3:J3)";
  var AVERAGE_FORMULA = "=AVERAGE(A4:J4)";
  var SUM_IF_FORMULA = "=SUMIF(A5:J5,5)";
  var SUM_REF_FORMULA = "=SUM(K1, K2, K3, K4)";
  sheet.load([[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, SUM_FORMULA],
    [-1, -10, 2, 4, 100, 1, 50, 20, 200, -100, MAX_FORMULA],
    [-1, -40, -53, 1, 10, 30, 10, 301, -1, -20, MIN_FORMULA],
    [20, 50, 100, 20, 1, 5, 15, 25, 45, 23, AVERAGE_FORMULA],
    [0, 10, 1, 10, 2, 10, 3, 10, 4, 10, SUM_IF_FORMULA],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, SUM_REF_FORMULA]]);
  var K1 = sheet.getCell("K1");
  assertEquals(18, K1.getValue());
  assertEquals(SUM_FORMULA.substr(1), K1.getFormula());
  assertIsNull(K1.getError());
  assertArrayEquals(['A1', 'B1', 'C1', 'D1', 'H1'], K1.getDependencies());
  var K2 = sheet.getCell("K2");
  assertEquals(200, K2.getValue());
  assertEquals(MAX_FORMULA.substr(1), K2.getFormula());
  assertIsNull(K2.getError());
  assertArrayEquals(['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2', 'J2'], K2.getDependencies());
  var K3 = sheet.getCell("K3");
  assertEquals(-53, K3.getValue());
  assertEquals(MIN_FORMULA.substr(1), K3.getFormula());
  assertIsNull(K3.getError());
  assertArrayEquals(['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3', 'J3'], K3.getDependencies());
  var K4 = sheet.getCell("K4");
  assertEquals(30.4, K4.getValue());
  assertEquals(AVERAGE_FORMULA.substr(1), K4.getFormula());
  assertIsNull(K4.getError());
  assertArrayEquals(['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4', 'J4'], K4.getDependencies());
  var K5 = sheet.getCell("K5");
  assertEquals(0, K5.getValue());
  assertEquals(SUM_IF_FORMULA.substr(1), K5.getFormula());
  assertIsNull(K5.getError());
  assertArrayEquals(['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5'], K5.getDependencies());
  var K6 = sheet.getCell("K6");
  assertEquals(195.4, K6.getValue());
  assertEquals(SUM_REF_FORMULA.substr(1), K6.getFormula());
  assertIsNull(K6.getError());
  assertArrayEquals(['K1', 'K2', 'K3', 'K4'], K6.getDependencies());
});

test("Sheet REF error", function(){
  var sheet  = new Sheet();
  sheet.setCell("A1", "200");
  sheet.setCell("A2", "200");
  sheet.setCell("A3", "=SUM(A1, A2)");
  sheet.setCell("B1", "=SUM(A3, B2)");
  sheet.setCell("B2", "=SUM(A1, B1)");
  var B1 = sheet.getCell("B1");
  assertIsNull(B1.getValue());
  assertEquals(REF_ERROR, B1.getError().name);
  assertArrayEquals(['A3', 'B2'], B1.getDependencies());
  var B2 = sheet.getCell("B2");
  assertIsNull(B2.getValue());
  assertEquals(REF_ERROR, B2.getError().name);
  assertArrayEquals(['A1', 'B1'], B2.getDependencies());
});

test("Sheet cell NAME error", function(){
  var sheet  = new Sheet();
  sheet.setCell("A1", "1");
  sheet.setCell("A2", "=SUM(A1, NN)");
  var A2 = sheet.getCell("A2");
  assertIsNull(A2.getValue());
  assertEquals(NAME_ERROR, A2.getError().name);
  assertArrayEquals(['A1'], A2.getDependencies());
});

test("Sheet unsupported formula NAME error", function(){
  var sheet  = new Sheet();
  sheet.setCell("A1", "1");
  sheet.setCell("A2", "=BEN(A1)");
  var A2 = sheet.getCell("A2");
  assertIsNull(A2.getValue());
  assertEquals(NAME_ERROR, A2.getError().name);
  assertArrayEquals(['A1'], A2.getDependencies());
});

test("Sheet nested formulas", function(){
// Test nested formulas
  var sheet  = new Sheet();
  sheet.setCell("A1", "1");
  sheet.setCell("A2", "10");
  sheet.setCell("A3", "44.4");
  sheet.setCell("A4", "=SUM(A1:A3, MAX(A1, A3))");
  var A4 = sheet.getCell("A4");
  assertEquals(99.8, A4.getValue());
  assertEquals("SUM(A1:A3, MAX(A1, A3))", A4.getFormula());
  assertIsNull(A4.getError());
  assertArrayEquals(['A1', 'A2', 'A3'], A4.getDependencies());
});

test("Sheet cell range query", function(){
  var sheet  = new Sheet();
  sheet.setCell("A1", "1");
  sheet.setCell("A2", "1");
  sheet.setCell("A3", "1");
  sheet.setCell("A4", "1");
  sheet.setCell("A5", "1");
  sheet.setCell("N1", "=SUM(A1:A7)");
  var N1 = sheet.getCell("N1");
  assertArrayEquals(['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'], N1.getDependencies());
});

test("Sheet dependency calculation propagation", function(){
  var sheet  = new Sheet();
  sheet.setCell("A1", "1");
  sheet.setCell("A2", "=SUM(A1, 100)");
  var A2 = sheet.getCell("A2");
  assertEquals(101, A2.getValue());
  assertArrayEquals(['A1'], A2.getDependencies());
  sheet.setCell("A1", "2");
  assertEquals(102, A2.getValue());
  assertArrayEquals(['A1'], A2.getDependencies());
});

test("Sheet cell formula update", function(){
  var sheet  = new Sheet();
  sheet.setCell("A1", "1");
  sheet.setCell("A2", "=SUM(A1, 100)");
  var A2 = sheet.getCell("A2");
  assertEquals(101, A2.getValue());
  assertArrayEquals(['A1'], A2.getDependencies());
  sheet.setCell("A2", "=MAX(A1, 100)");
  assertEquals(100, A2.getValue());
  assertArrayEquals(['A1'], A2.getDependencies());
});
