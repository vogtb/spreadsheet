import { Sheet } from "../src/Sheet"
import {assertEquals} from "./utils/Asserts"

function testFormula(formula: string, expectation: any) {
  var sheet  = new Sheet();
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(null, cell.getError());
  assertEquals(expectation, cell.getValue());
}

function testFormulaWithDependencies(formula: string, expectation: any, pairs: Array<Array<string>>) {
  var sheet  = new Sheet();
  for (var pair of pairs) {
    sheet.setCell(pair[0], pair[1]);
  }
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(null, cell.getError());
  assertEquals(expectation, cell.getValue());
}

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

// Test AVERAGEIF
testFormulaWithDependencies("=AVERAGEIF(B1:B3, '>2')", 7.5, [["B1", "1"], ["B2", "5"], ["B3", "10"]]);

// Test BIN2DEC
testFormula("=BIN2DEC(1010101010)", -342);

// Test BIN2HEX
testFormula("=BIN2HEX(1010101010)", "fffffffeaa");

// Test BIN2OCT
testFormula("=BIN2OCT(1010101010)", "7777777252");

// Test BINOMDIST
// TODO: This. FormulaJS implementation differs from GS.

// Test CEIL
testFormula("=CEILING(22.22, 0.1)", 22.3);

// Test CHAR
testFormula("=CHAR(97)", "a");

// Test CODE
testFormula("=CODE('a')", 97);

// Test COMBIN
testFormula("=COMBIN(4, 2)", 6);

// Test CONCATENATE
testFormula('=CONCATENATE("hey", " ", "there")', "hey there");

// Test CONVERT
testFormula('=CONVERT(5.1, "mm", "m")', 0.0050999999999999995);

// Test CORREL
testFormulaWithDependencies('=CORREL(B1:B2,B3:B4)', 1, [["B1", "9"], ["B2", "5"], ["B3", "10"], ["B4", "4"]]);

// Test COS
testFormula("=COS(PI())", -1);

// Test COSH
testFormula("=COSH(PI())", 11.591953275521522);

// Test COUNT
testFormulaWithDependencies('=COUNT(B1:B3)', 3, [["B1", "1"], ["B2", "5"], ["B3", "10"]]);

// Test COUNTA
testFormula("=COUNTA(10, 10, 22)", 3);

// Test COUNTBLANK
// TODO: Fix COUNTBLANK. Does not work properly.

// Test COUNTIF
testFormulaWithDependencies('=COUNTIF(B1:B3, ">4")', 2, [["B1", "1"], ["B2", "5"], ["B3", "10"]]);

// Test COUNTIFS
testFormulaWithDependencies('=COUNTIFS(B1:B3, ">4", C1:C3, ">4")', 2, [["B1", "1"], ["B2", "5"], ["B3", "10"], ["C1", "1"], ["C2", "5"], ["C3", "10"]]);

// Test COUNTUNIQUE
testFormulaWithDependencies('=COUNTUNIQUE(B1:B3)', 2, [["B1", "1"], ["B2", "1"], ["B3", "10"]]);

// Test CUMIPMT
testFormula("=CUMIPMT(0.12, 12, 100, 1, 5, 0)", -54.39423242396348);

// Test CUMPRINC
testFormula("=CUMPRINC(0.12, 12, 100, 1, 5, 0)", -26.324171373034403);

// Test DATE
// TODO: DATE should parse dates correctly. Is this a display issue or a parsing issue?
// testFormula("=DATE(1992, 6, 24)", "6/24/1992");

// Test DATEVALUE
// TODO: DATEVALUE should work.
// testFormula('=DATEVALUE("1992-6-24")', 33779);

// Test DAY
// TODO: This should work

// Test DAYS
// TODO: This should work

// Test DAYS360
// TODO: This should work

// Test DB
testFormula("=DB(100, 50, 10, 2, 12)", 6.2511);

// Test DDB
testFormula("=DDB(100, 50, 10, 2, 2.25)", 17.4375);

// Test DEC2BIN
testFormula('=DEC2BIN("100", 8)', "01100100");

// Test DEC2HEX
testFormula('=DEC2HEX("100")', "64");

// Test DEC2OCT
testFormula('=DEC2OCT("100")', "144");

// Test DEGREES
testFormula('=DEGREES(PI())', 180);

// Test DELTA
testFormula('=DELTA(2, 2)', 1);

// Test DEVSQ
testFormula('=DEVSQ(1, 2)', 0.5);

// Test DOLLAR
testFormula('=DOLLAR(1.2351, 4)', "$1.2351");

// Test DOLLARDE
testFormula('=DOLLARDE(100.1, 32)', 100.3125);

// Test DOLLARFR
testFormula('=DOLLARFR(100.1, 32)', 100.032);

// Test AND
testFormula('=AND(10)', true);

// Test EDATE
// TODO: This should work

// Test EFFECT
testFormula('=EFFECT(0.99, 12)', 1.5890167507927795);

// EOMONTH
// TODO: This should work

// Test ERF
testFormula('=ERF(2)', 0.9953222650189527);

// Test ERFC
testFormula('=ERFC(2)', 0.004677734981047288);

// Test EVEN
testFormula('=EVEN(3)', 4);

// Test EXACT
testFormula('=EXACT("m", "M")', false);

// Test EXPONDIST
testFormula('=EXPONDIST(4, 0.5, false)', 0.06766764161830635);

// Test FALSE
testFormula('=FALSE()', false);

// Test FDIST
// TODO: This should work.
// testFormula('=FDIST(15.35, 7, 6)', 0.001930553432);

// Test FINV
// TODO: This should work.
// testFormula('=FINV(0.88,1.013, 1.01)', 0.03638945475);

// Test FISHER
testFormula('=FISHER(0.962)', 1.972066740199461);

// Test FISHERINV
testFormula('=FISHERINV(0.962)', 0.7451676440945232);

// Test IF
testFormula('=IF("m" = "m", "hit", "miss")', 'hit');
