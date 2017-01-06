import { Sheet } from "../src/Sheet"
import {assertEquals, assertArrayEquals} from "./utils/Asserts"

function testFormula(formula: string, expectation: any) {
  var sheet  = new Sheet();
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(null, cell.getError());
  assertEquals(expectation, cell.getValue());
}

//Test CONCATENATE formula
var sheet  = new Sheet();
sheet.setCell("A1", "Hello, ");
sheet.setCell("A2", "World!");
sheet.setCell("A3", "=CONCATENATE(A1, A2)");
sheet.setCell("B1", "1000");
sheet.setCell("B2", "=CONCATENATE(A1, B1)");
var cell = sheet.getCell("A3");
assertEquals("Hello, World!", cell.getValue());
assertEquals(null, cell.getError());
assertArrayEquals(['A1', 'A2'], cell.getDependencies());
var cell = sheet.getCell("B2");
assertEquals("Hello, 1000", cell.getValue());
assertEquals(null, cell.getError());
assertArrayEquals(['A1', 'B1'], cell.getDependencies());

// Test ABS formula
testFormula("=ABS(-10)", 10);
testFormula("=ABS(0)", 0);

// Test ACCRINT
// TODO: this

// Test ACOS
testFormula("=ACOS(0)", 1.5707963267948966);

// Test ACOSH
testFormula("=ACOSH(22)", 3.783672704329451);

// Test ACOTH
testFormula("=ACOTH(22)", 0.04548588910286339);

// Test AND
testFormula("=AND(10, 10)", true);
testFormula("=AND(10, 0)", false);

// Test ARABIC
testFormula('=ARABIC("XIV")', 14);

// Test ASIN
testFormula("=ASIN(0.1)", 0.1001674211615598);

// Test ASINH
testFormula("=ASINH(0.1)", 0.09983407889920758);

// Test ATAN
testFormula("=ATAN(0.1)", 0.09966865249116204);

// Test ATAN2
testFormula("=ATAN2(4, 3)", 0.6435011087932844);

// Test ATANH
testFormula("=ATANH(0.44)", 0.47223080442042564);

// Test AVEDEV
testFormula("=AVEDEV(1, 2, 4, 56.7)", 20.3875);

// Test AVERAGE
testFormula("=AVERAGE(10, 20, 4.1)", 11.366666666666667);

// Test AVERAGEA
testFormula("=AVERAGEA(10, 20, 4.1)", 11.366666666666667);
