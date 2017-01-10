import { Sheet } from "../src/Sheet"
import {assertEquals} from "./utils/Asserts"

function testFormula(formula: string, expectation: any) {
  var sheet  = new Sheet();
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(null, cell.getError());
  assertEquals(expectation, cell.getValue());
}

function testFormulaToDate(formula: string, expectation: any) {
  var sheet  = new Sheet();
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(null, cell.getError());
  assertEquals(expectation, cell.getValue().getTime());
}

function testFormulaToArray(formula: string, expectation: any) {
  var sheet  = new Sheet();
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(null, cell.getError());
  var values = cell.getValue();
  for (var index in values) {
    assertEquals(values[index], expectation[index]);
  }
}

// Test ABS formula
testFormula("=ABS(-10)", 10);
testFormula("=ABS(0)", 0);

// Test ACCRINT
// TODO: The second one is really close, but should be correct. Fix this.
testFormula("=ACCRINT(DATE(2011, 1, 1), DATE(2011, 2, 1), DATE(2014, 7, 1), 0.1, 1000, 1, 0)", 350);
// testFormula('=ACCRINT(DATE(2000, 1, 1), DATE(2000, 2, 1), DATE(2002, 12, 31), 0.05, 100, 4)', 14.98611111);

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
testFormula("=AVERAGEIF([1, 5, 10], '>2')", 7.5);

// Test BASE
testFormula('=BASE(15, 2, 10)', '0000001111');

// Test BIN2DEC
testFormula("=BIN2DEC(1010101010)", -342);

// Test BESSELI
testFormula('=BESSELI(1, 2)', 0.13574766658069928);

// Test BESSELJ
testFormula('=BESSELJ(1, 2)', 0.11490348499246938);

// Test BESSELK
testFormula('=BESSELK(1, 2)', 1.6248388844172295);

// Test BESSELY
testFormula('=BESSELY(1, 2)', -1.6506826133039476);

// Test BETADIST
testFormula('=BETADIST(2, 8, 10, true, 1, 3)', 0.6854705810117458);

// Test BETAINV
testFormula('=BETAINV(0.6854705810117458, 8, 10, 1, 3)', 1.9999999999999996);

// Test BINOMDISTRANGE
// TODO: This should work.
// testFormula('=BINOMDISTRANGE(60, 0.75, 45, 50)', 0.52363);

// Test BINOMINV
// TODO: This should work.
// testFormula('=BINOMINV(6, 0.5, 0.75)', 4);

// Test BITAND
testFormula('=BITAND(42, 24)', 8);

// Test BITLSHIFT
testFormula('=BITLSHIFT(42, 24)', 704643072);

// Test BITOR
testFormula('=BITOR(42, 24)', 58);

// Test BITRSHIFT
testFormula('=BITRSHIFT(42, 2)', 10);

// Test BITXOR
testFormula('=BITXOR(42, 24)', 50);

// Test BIN2HEX
testFormula("=BIN2HEX(1010101010)", "fffffffeaa");

// Test BIN2OCT
testFormula("=BIN2OCT(1010101010)", "7777777252");

// Test DECIMAL
testFormula('=DECIMAL(199.99999)', 199);

// Test BINOMDIST
// TODO: This. FormulaJS implementation differs from GS.

// Test CEIL
testFormula("=CEILING(22.22, 0.1)", 22.3);

// Test CEILINGMATH
testFormula('=CEILINGMATH(1001.112131)', 1002);

// Test CEILINGPRECISE
testFormula('=CEILINGPRECISE(1001.112131)', 1002);

// Test CHISQDIST
// TODO: This should work.
// testFormula('=CHISQDIST(0.5, 1, true)', 55);

// Test CHISQINV
// TODO: This should work.
// testFormula('=CHISQINV(0.5, 1, true)', 44);

// Test CHAR
testFormula("=CHAR(97)", "a");

// Test CODE
testFormula("=CODE('a')", 97);

// Test COMBIN
testFormula("=COMBIN(4, 2)", 6);

// Test COMBINA
testFormula('=COMBINA(4, 3)', 20);

// Test COMPLEX
testFormula('=COMPLEX(3, 4)', '3+4i');

// Test CONCATENATE
testFormula('=CONCATENATE("hey", " ", "there")', "hey there");

// Test CONFIDENCENORM
// TODO: This should work.
// testFormula('=CONFIDENCE(0.05, 1.6, 250)', 0.1983344105);

// Test CONFIDENCET
// TODO: This should work.
// testFormula('=CONFIDENCET(0.05, 1, 50)', 0.2842);

// Test CONVERT
testFormula('=CONVERT(5.1, "mm", "m")', 0.0050999999999999995);

// Test CORREL
testFormula('=CORREL([9, 5],[10, 4])', 1);

// Test COS
testFormula("=COS(PI())", -1);

// Test COSH
testFormula("=COSH(PI())", 11.591953275521522);

// Test COT
testFormula('=COT(30)', -0.15611995216165922);

// Test COTH
testFormula('=COTH(2)', 1.0373147207275482);

// Test COUNT
testFormula('=COUNT([1, 5, 10])', 3);

// Test COUNTA
testFormula("=COUNTA(10, 10, 22)", 3);

// Test COUNTBLANK
// TODO: Fix COUNTBLANK. Does not work properly.

// Test COUNTIF
testFormula('=COUNTIF([1, 5, 10], ">4")', 2);

// Test COUNTIFS
testFormula('=COUNTIFS([1, 5, 10], ">4", [1, 5, 10], ">4")', 2);

// Test COUNTIN
testFormula('=COUNTIN([1,3,1],1)', 2);

// Test COUNTUNIQUE
testFormula('=COUNTUNIQUE([1, 1, 10])', 2);

// Test COVARIANCEP
testFormula('=COVARIANCEP([3,2,4,5,6], [9,7,12,15,17])', 5.2);

// Test COVARIANCES
testFormula('=COVARIANCES([2,4,8], [5,11,12])', 9.666666666666668);

// Test CSC
testFormula('=CSC(15)', 1.5377805615408537);

// Test CSCH
testFormula('=CSCH(1.5)', 0.46964244059522464);

// Test CUMIPMT
testFormula("=CUMIPMT(0.12, 12, 100, 1, 5, 0)", -54.39423242396348);

// Test CUMPRINC
testFormula("=CUMPRINC(0.12, 12, 100, 1, 5, 0)", -26.324171373034403);

// Test DATE
testFormulaToDate("=DATE(1992, 6, 24)", new Date("6/24/1992").getTime());

// Test DATEVALUE
testFormulaToDate('=DATEVALUE("1992-6-24")', new Date("6/24/1992").getTime());

// Test DAY
testFormula('=DAY(DATEVALUE("1992-6-24"))', 24);

// Test DAYS
testFormula('=DAYS(DATEVALUE("1993-6-24"), DATEVALUE("1992-6-24"))', 365);

// Test DAYS360
testFormula('=DAYS360(DATE(1969, 7, 16), DATE(1970, 7, 24), 1)', 368);

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
testFormulaToDate('=EDATE(DATE(1992, 6, 24), 1)', new Date('7/24/1992').getTime());

// Test EFFECT
testFormula('=EFFECT(0.99, 12)', 1.5890167507927795);

// EOMONTH
testFormulaToDate('=EOMONTH(DATE(1992, 6, 24), 1)', new Date('7/31/1992').getTime());

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

// Test F.DIST

testFormula('=F.DIST(15.35, 7, 6, false)', 0.0003451054686025578);
testFormula('=F.DIST(15.35, 7, 6, true)', 0.9980694465675269);

// Test FDIST
// TODO: This should work.
/*
 * F.DIST Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input x. Alternately called Fisher-Snedecor distribution or Snedecor's F distribution.
 * FDIST Calculates the right-tailed F probability distribution (degree of diversity) for two data sets with given input x. Alternately called Fisher-Snedecor distribution or Snedecor's F distribution.
 *
 * F.DIST is left-tailed. FDIST is right-tailed.
 */

// Test F.INV
testFormula('=F.INV(0.42, 2, 3)', 0.6567804059458624);

// Test FINV
// TODO: This should work.
/*
 * FINV Calculates the inverse of the right-tailed F probability distribution. Also called the Fisher-Snedecor distribution or Snedecor’s F distribution.
 * F.INV Calculates the inverse of the left-tailed F probability distribution. Also called the Fisher-Snedecor distribution or Snedecor’s F distribution.
 *
 * F.INV is left-tailed. FINV is right-tailed.
 */

// Test FISHER
testFormula('=FISHER(0.962)', 1.972066740199461);

// Test FISHERINV
testFormula('=FISHERINV(0.962)', 0.7451676440945232);

// Test IF
testFormula('=IF("m" = "m", "hit", "miss")', 'hit');

// Test INT
testFormula('=INT(99.33)', 99);

// Test ISEVEN
testFormula('=ISEVEN(4)', true);

// Test ISODD
testFormula('=ISODD(3)', true);

// Test LN
testFormula('=LN(100)', 4.605170185988092);

// Test LOG
testFormula('=LOG(256, 2)', 8);

// Test LOG10
testFormula('=LOG10(100)', 2);

// Test MAX
testFormula('=MAX(100, 22)', 100);

// Test MAXA
testFormula('=MAXA(100, 22, 44)', 100);

// Test MEDIAN
testFormula('=MEDIAN(100, 22, 54)', 54);

// Test MIN
testFormula('=MIN(100, 22, 44)', 22);

// Test MINA
testFormula('=MINA(100, 22, 44)', 22);

// Test MOD
testFormula('=MOD(10, 3)', 1);

// Test NOT
testFormula('=NOT(TRUE())', false);

// Test ODD
testFormula('=ODD(2)', 3);

// Test OR
testFormula('=OR("m" = "p", "n" = "n")', true);

// Test PI()
testFormula('=PI()', 3.141592653589793);

// Test POWER
testFormula('=POWER(4, 10)', 1048576);

// Test ROUND
testFormula('=ROUND(99.44, 1)', 99.4);

// Test ROUNDDOWN
testFormula('=ROUNDDOWN(99.46, 1)', 99.4);

// Test ROUNDUP
testFormula('=ROUNDUP(99.46, 1)', 99.5);

// Test SIN
testFormula('=SIN(0)', 0);
testFormula('=SIN(1)', 0.8414709848078965);
testFormula('=SIN(PI() / 2)', 1);
testFormula('=SIN(PI())', 0);


// Test SINH
testFormula('=SINH(PI())', 11.548739357257752);

// Test SPLIT
testFormulaToArray('=SPLIT("1,2,3", ",", TRUE)', [ '1', '2', '3' ]);

// Test SQRT
testFormula('=SQRT(9)', 3);

// Test SQRTPI
testFormula('=SQRTPI(9)', 5.317361552716548);

// Test SUM
testFormula('=SUM(10, 10)', 20);

// Test SUMIF
testFormula('=SUMIF([1, 5, 10], ">2")', 15);

// Test SUMPRODUCT
testFormula('=SUMPRODUCT([1, 5, 10])', 16);

// Test SUMSQ
testFormula('=SUMSQ([1, 5, 10], 10)', 226);

// Test SUMX2MY2
testFormula('=SUMX2MY2([1,2,3],[4,5,6])', -63);

// Test SUMX2PY2
testFormula('=SUMX2PY2([1, 2, 3], [4, 5, 6])', 91);

// Test SUMXMY2
// TODO: This should work.
// testFormula('=SUMXMY2([1,2,3],[4,5,6])', 27);

// Test TAN
testFormula('=TAN(0)', 0);
testFormula('=TAN(1)', 1.5574077246549023);
testFormula('=TAN(PI() / 2)', 16331239353195370);
testFormula('=TAN(PI())', 0);

// Test TANH
testFormula('=TANH(PI())', 0.99627207622075);

// Test TRUE
testFormula('=TRUE()', true);

// Test TRUE
testFormula('=TRUNC(3.1415, 2)', 3.14);

// Test XOR
testFormula('=XOR(1, 1)', false);

// Test YEARFRAC
testFormula('=YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 0)', 18.994444444444444);
// testFormula('=YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 1)', 18.99587544); // This is slightly off
testFormula('=YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 2)', 19.272222222222222);
testFormula('=YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 3)', 19.008219178082193);
testFormula('=YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 4)', 18.994444444444444);

