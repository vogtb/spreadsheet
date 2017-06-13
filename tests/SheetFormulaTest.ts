import {
  Sheet
} from "../src/Sheet";
import {
  assertEquals,
  test
} from "./Utils/Asserts";
import {
  DIV_ZERO_ERROR,
  VALUE_ERROR,
  NA_ERROR
} from "../src/Errors";

function assertFormulaEqualsError(formula: string, errorString: string) {
  var sheet  = new Sheet();
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(cell.getError().name, errorString);
  assertEquals(cell.getValue(), null);
}

function assertFormulaEquals(formula: string, expectation: any) {
  var sheet  = new Sheet();
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(cell.getError(), null);
  assertEquals(cell.getValue(), expectation);
}

function assertFormulaResultsInType(formula: string, type: string) {
  var sheet  = new Sheet();
  sheet.setCell("A1", formula);
  var cell = sheet.getCell("A1");
  assertEquals(cell.getError(), null);
  assertEquals(typeof cell.getValue(), type);
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

test("Sheet ABS", function(){
  assertFormulaEquals("=ABS(-10)", 10);
  assertFormulaEquals("=ABS(0)", 0);
});

test("Sheet ACOS", function(){
  assertFormulaEquals("=ACOS(0)", 1.5707963267948966);
});

test("Sheet ACCRINT", function(){
  assertFormulaEquals("=ACCRINT(DATE(2000, 1, 1), DATE(2000, 2, 1), DATE(2002, 12, 31), 0.05, 100, 4)",
    14.98631386861314);
});


test("Sheet ACOSH", function(){
  assertFormulaEquals("=ACOSH(22)", 3.783672704329451);
});

test("Sheet ACOTH", function(){
  assertFormulaEquals("=ACOTH(22)", 0.04548588910286339);
});

test("Sheet AND", function(){
  assertFormulaEquals("=AND(10, 10)", true);
  assertFormulaEquals("=AND(10, 0)", false);
});

test("Sheet ARABIC", function(){
  assertFormulaEquals('=ARABIC("XIV")', 14);
});

test("Sheet ASIN", function(){
  assertFormulaEquals("=ASIN(0.1)", 0.1001674211615598);
});

test("Sheet ASINH", function(){
  assertFormulaEquals("=ASINH(0.1)", 0.09983407889920758);
});

test("Sheet ATAN", function(){
  assertFormulaEquals("=ATAN(0.1)", 0.09966865249116204);
});

test("Sheet ATAN2", function(){
  assertFormulaEquals("=ATAN2(4, 3)", 0.6435011087932844);
});

test("Sheet ATANH", function(){
  assertFormulaEquals("=ATANH(0.51)", 0.5627297693521489);
});

test("Sheet AVEDEV", function(){
  assertFormulaEquals("=AVEDEV(1, 2, 4, 56.7)", 20.387500000000003);
});

test("Sheet AVERAGE", function(){
  assertFormulaEquals("=AVERAGE(10, 20, 4.1)", 11.366666666666667);
});

test("Sheet AVERAGEA", function(){
  assertFormulaEquals("=AVERAGEA(10, 20, 4.1)", 11.366666666666667);
});

test("Sheet AVERAGEIF", function(){
  assertFormulaEquals("=AVERAGEIF([1, 5, 10], '>2')", 7.5);
});

test("Sheet BIN2DEC", function(){
  assertFormulaEquals("=BIN2DEC('1010101010')", -342);
});

test("Sheet BIN2HEX", function(){
  assertFormulaEquals("=BIN2HEX(1010101010)", "FFFFFFFEAA");
});

test("Sheet BIN2OCT", function(){
  assertFormulaEquals("=BIN2OCT(1010101010)", "7777777252");
});

test("Sheet CEILING", function(){
  assertFormulaEquals("=CEILING(22.22, 0.1)", 22.3);
});

test("Sheet CHAR", function(){
  assertFormulaEquals("=CHAR(97)", "a");
});

test("Sheet CODE", function(){
  assertFormulaEquals("=CODE('a')", 97);
});

test("Sheet COMBIN", function(){
  assertFormulaEquals("=COMBIN(4, 2)", 6);
});

test("Sheet CONCATENATE", function(){
  assertFormulaEquals('=CONCATENATE("hey", " ", "there")', "hey there");
});

test("Sheet CONVERT", function(){
  assertFormulaEquals('=CONVERT(5.1, "mm", "m")', 0.0050999999999999995);
});

test("Sheet CORREL", function(){
  assertFormulaEquals('=CORREL([9, 5],[10, 4])', 1);
});

// TODO: Formula will not parse because lexer does not expect array values to occur after a comma
// test("Sheet CHOOSE", function(){
//   assertFormulaEquals('=CHOOSE(2, [1, 2, 3])', 2);
// });

test("Sheet COS", function(){
  assertFormulaEquals("=COS(PI())", -1);
});

test("Sheet TRIM", function(){
  assertFormulaEquals("=TRIM(' trim ')", "trim");
});

test("Sheet COSH", function(){
  assertFormulaEquals("=COSH(PI())", 11.591953275521522);
});

test("Sheet COT", function(){
  assertFormulaEquals('=COT(30)', -0.15611995216165922);
});

test("Sheet COTH", function(){
  assertFormulaEquals('=COTH(2)', 1.037314720727548);
});

test("Sheet COUNT", function(){
  assertFormulaEquals('=COUNT([1, 5, 10])', 3);
});

test("Sheet COUNTA", function(){
  assertFormulaEquals("=COUNTA(10, 10, 22)", 3);
});

test("Sheet COUNTIF", function(){
  assertFormulaEquals('=COUNTIF([1, 5, 10], ">4")', 2);
});

test("Sheet COUNTIFS", function(){
  assertFormulaEquals('=COUNTIFS([1, 5, 10], ">4", [1, 5, 10], ">4")', 2);
});

test("Sheet COUNTUNIQUE", function(){
  assertFormulaEquals('=COUNTUNIQUE([1, 1, 10])', 2);
});

test("Sheet CUMIPMT", function(){
  assertFormulaEquals("=CUMIPMT(0.12, 12, 100, 1, 5, 0)", -54.39423242396348);
});

test("Sheet COMPRINC", function(){
  assertFormulaEquals("=CUMPRINC(0.12, 12, 100, 1, 5, 0)", -26.324171373034403);
});

test("Sheet DATE", function(){
  assertFormulaEquals("=DATE(2017, 6, 24)", 42910);
});

test("Sheet DATEVALUE", function(){
  assertFormulaEquals("=DATEVALUE('2017/6/24')", 42910);
});

test("Sheet DAY", function(){
  assertFormulaEquals("=DAY(DATE(1992, 6, 24))", 24);
});

test("Sheet DAYS", function(){
  assertFormulaEquals("=DAYS(DATE(1992, 6, 24), DATE(1991, 6, 24))", 366);
});

test("Sheet DAYS360", function(){
  assertFormulaEquals("=DAYS360(DATE(1992, 6, 24), DATE(1991, 6, 24))", -360);
});

test("Sheet DB", function(){
  assertFormulaEquals("=DB(100, 50, 10, 2, 12)", 6.2482428240683285);
});

test("Sheet DDB", function(){
  assertFormulaEquals("=DDB(100, 50, 10, 2, 2.25)", 17.4375);
});

test("Sheet DEC2BIN", function(){
  assertFormulaEquals('=DEC2BIN("100", 8)', "01100100");
});

test("Sheet DEC2HEX", function(){
  assertFormulaEquals('=DEC2HEX("100")', "64");
});

test("Sheet DEC2OCT", function(){
  assertFormulaEquals('=DEC2OCT("100")', "144");
});

test("Sheet DEGREES", function(){
  assertFormulaEquals('=DEGREES(PI())', 180);
});

test("Sheet LCM", function(){
  assertFormulaEquals('=LCM(2, 5)', 10);
});

test("Sheet GAMMALN", function(){
  assertFormulaEquals('=GAMMALN(4.5)', 2.453736570842444);
});

test("Sheet PRODUCT", function(){
  assertFormulaEquals('=PRODUCT(2, 2)', 4);
});

test("Sheet PERCENTILE", function(){
  assertFormulaEquals('=PERCENTILE([10], 0)', 10);
});

test("Sheet QUARTILE", function(){
  assertFormulaEquals('=QUARTILE([1, 2, 3, 4], 0)', 1);
});

test("Sheet DELTA", function(){
  assertFormulaEquals('=DELTA(2, 2)', 1);
});

test("Sheet RAND", function(){
  assertFormulaResultsInType('=RAND()', "number");
});

test("Sheet RANDBETWEEN", function(){
  assertFormulaResultsInType('=RANDBETWEEN(1, 2)', "number");
});

test("Sheet MULTIPLY", function(){
  assertFormulaEquals('=MULTIPLY(10, 10)', 100);
});

test("Sheet MULTIPLY", function(){
  assertFormulaEquals('=MULTIPLY(2, 2)', 4);
});

test("Sheet DIVIDE", function(){
  assertFormulaEquals('=DIVIDE(22, 11)', 2);
});

test("Sheet EQ", function(){
  assertFormulaEquals('=EQ(22, 11)', false);
});

test("Sheet GT", function(){
  assertFormulaEquals('=GT(1, 0)', true);
});

test("Sheet GTE", function(){
  assertFormulaEquals('=GTE(1, 1)', true);
});

test("Sheet LT", function(){
  assertFormulaEquals('=LT(0, 1)', true);
});

test("Sheet NE", function(){
  assertFormulaEquals('=NE(0, 1)', true);
});

test("Sheet LTE", function(){
  assertFormulaEquals('=LTE(0, 0)', true);
});


test("Sheet SIGN", function(){
  assertFormulaEquals('=SIGN(100)', 1);
});

test("Sheet DELTA", function(){
  assertFormulaEquals('=DELTA(2, 2)', 1);
});

test("Sheet DEVSQ", function(){
  assertFormulaEquals('=DEVSQ(1, 2)', 0.5);
});

test("Sheet DOLLAR", function(){
  assertFormulaEquals('=DOLLAR(1.2351, 4)', 1.2351);
});

test("Sheet DOLLARDE", function(){
  assertFormulaEquals('=DOLLARDE(100.1, 32)', 100.3125);
});

test("Sheet DOLLARFR", function(){
  assertFormulaEquals('=DOLLARFR(100.1, 32)', 100.032);
});

test("Sheet AND", function(){
  assertFormulaEquals('=AND(10)', true);
});

test("Sheet EDATE", function(){
  assertFormulaEquals('=EDATE(DATE(1992, 6, 24), 1)', 33809);
});

test("Sheet EOMONTH", function(){
  assertFormulaEquals('=EOMONTH(DATE(1992, 6, 24), 0)', 33785);
});

test("Sheet EFFECT", function(){
  assertFormulaEquals('=EFFECT(0.99, 12)', 1.5890167507927795);
});

test("Sheet ERF", function(){
  assertFormulaEquals('=ERF(2)', 0.9953222650189527);
});

test("Sheet ERFC", function(){
  assertFormulaEquals('=ERFC(2)', 0.004677734981047288);
});

test("Sheet EVEN", function(){
  assertFormulaEquals('=EVEN(3)', 4);
});

test("Sheet EXACT", function(){
  assertFormulaEquals('=EXACT("m", "M")', false);
});

test("Sheet EXPONDIST", function(){
  assertFormulaEquals('=EXPONDIST(4, 0.5, false)', 0.06766764161830635);
});

test("Sheet FALSE", function(){
  assertFormulaEquals('=FALSE()', false);
});

test("Sheet F.DIST", function(){
  assertFormulaEquals('=F.DIST(15.35, 7, 6, false)', 0.0003451054686025578);
  assertFormulaEquals('=F.DIST(15.35, 7, 6, true)', 0.9980694465675269);
});

test("Sheet FINV", function(){
  assertFormulaEquals('=FINV(0.42, 2, 3)', 1.174597274485816);
});

test("Sheet FISHER", function(){
  assertFormulaEquals('=FISHER(0.962)', 1.972066740199461);
});

test("Sheet FISHERINV", function(){
  assertFormulaEquals('=FISHERINV(0.962)', 0.7451676440945232);
});

test("Sheet IF", function(){
  assertFormulaEquals('=IF("m" = "m", "hit", "miss")', 'hit');
});

test("Sheet INT", function(){
  assertFormulaEquals('=INT(99.33)', 99);
});

test("Sheet ISEVEN", function(){
  assertFormulaEquals('=ISEVEN(4)', true);
});

test("Sheet ISODD", function(){
  assertFormulaEquals('=ISODD(3)', true);
});

test("Sheet LN", function(){
  assertFormulaEquals('=LN(100)', 4.605170185988092);
});

test("Sheet LOG", function(){
  assertFormulaEquals('=LOG(256, 2)', 8);
});

test("Sheet LOG10", function(){
  assertFormulaEquals('=LOG10(100)', 2);
});

test("Sheet MAX", function(){
  assertFormulaEquals('=MAX(100, 22)', 100);
});

test("Sheet MAXA", function(){
  assertFormulaEquals('=MAXA(100, 22, 44)', 100);
});

test("Sheet MEDIAN", function(){
  assertFormulaEquals('=MEDIAN(100, 22, 54)', 54);
});

test("Sheet MIN", function(){
  assertFormulaEquals('=MIN(100, 22, 44)', 22);
});

test("Sheet MINA", function(){
  assertFormulaEquals('=MINA(100, 22, 44)', 22);
});

test("Sheet MOD", function(){
  assertFormulaEquals('=MOD(10, 3)', 1);
});

test("Sheet TRUE", function(){
  assertFormulaEquals('=TRUE()', true);
});

test("Sheet NOT", function(){
  assertFormulaEquals('=NOT(TRUE())', false);
});

test("Sheet ODD", function(){
  assertFormulaEquals('=ODD(2)', 3);
});

test("Sheet OR", function(){
  assertFormulaEquals('=OR("m" = "p", "n" = "n")', true);
});

test("Sheet PI", function(){
  assertFormulaEquals('=PI()', 3.141592653589793);
});

test("Sheet POWER", function(){
  assertFormulaEquals('=POWER(4, 10)', 1048576);
});

test("Sheet ROUND", function(){
  assertFormulaEquals('=ROUND(99.44, 1)', 99.4);
});

test("Sheet ROUNDDOWN", function(){
  assertFormulaEquals('=ROUNDDOWN(99.46, 1)', 99.4);
});

test("Sheet ROUNDUP", function(){
  assertFormulaEquals('=ROUNDUP(99.46, 1)', 99.5);
});

test("Sheet SIN", function(){
  assertFormulaEquals('=SIN(0)', 0);
  assertFormulaEquals('=SIN(1)', 0.8414709848078965);
  assertFormulaEquals('=SIN(PI() / 2)', 1);
  assertFormulaEquals('=SIN(PI())', 0);
});

test("Sheet SINH", function(){
  assertFormulaEquals('=SINH(PI())', 11.548739357257748);
});

test("Sheet SPLIT", function(){
  testFormulaToArray('=SPLIT("1,2,3", ",", TRUE)', [ '1', '2', '3' ]);
});

test("Sheet SQRT", function(){
  assertFormulaEquals('=SQRT(9)', 3);
});

test("Sheet SQRTPI", function(){
  assertFormulaEquals('=SQRTPI(9)', 5.317361552716548);
});

test("Sheet SUM", function(){
  assertFormulaEquals('=SUM(10, 10)', 20);
});

test("Sheet SUMIF", function(){
  assertFormulaEquals('=SUMIF([1, 5, 10], 5)', 5);
});

test("Sheet SUMPRODUCT", function(){
  assertFormulaEquals('=SUMPRODUCT([1, 5, 10], [2, 2, 2])', 32);
});

test("Sheet SUMSQ", function(){
  assertFormulaEquals('=SUMSQ([1, 5, 10], 10)', 226);
});

test("Sheet SUMX2MY2", function(){
  assertFormulaEquals('=SUMX2MY2([1,2,3],[4,5,6])', -63);
});

test("Sheet SUMX2PY2", function(){
  assertFormulaEquals('=SUMX2PY2([1, 2, 3], [4, 5, 6])', 91);
});

test("Sheet TAN", function(){
  assertFormulaEquals('=TAN(0)', 0);
  assertFormulaEquals('=TAN(1)', 1.5574077246549023);
  assertFormulaEquals('=TAN(PI() / 2)', 16331239353195370);
  assertFormulaEquals('=TAN(PI())', 0);
});

test("Sheet TANH", function(){
  assertFormulaEquals('=TANH(PI())', 0.9962720762207501);
});

test("Sheet TRUE", function(){
  assertFormulaEquals('=TRUE()', true);
});

test("Sheet TRUNC", function(){
  assertFormulaEquals('=TRUNC(3.1415, 2)', 3.14);
});

test("Sheet XOR", function(){
  assertFormulaEquals('=XOR(1, 1)', false);
});

test("Sheet YEARFRAC", function(){
  assertFormulaEquals('=YEARFRAC(1, 1461, 2)', 4.055555555555555);
});

test("Sheet RADIANS", function(){
  assertFormulaEquals('=RADIANS(180)', 3.141592653589793);
});

test("Sheet MONTH", function(){
  assertFormulaEquals('=MONTH(DATE(1992, 6, 24))', 6);
});

test("Sheet YEAR", function(){
  assertFormulaEquals('=YEAR(DATE(1992, 6, 24))', 1992);
});

test("Sheet WEEKDAY", function(){
  assertFormulaEquals('=WEEKDAY(DATE(1992, 6, 20))', 7);
});

test("Sheet WEEKNUM", function(){
  assertFormulaEquals('=WEEKNUM(DATE(1992, 6, 19))', 25);
});

test("Sheet DATEDIF", function(){
  assertFormulaEquals('=DATEDIF("1992-6-19", "1996-6-19", "Y")', 4);
});

test("Sheet TIMEVALUE", function(){
  assertFormulaEquals('=TIMEVALUE("8:10")', 0.3402777777777778);
});

test("Sheet HOUR", function(){
  assertFormulaEquals('=HOUR("8:10")', 8);
});

test("Sheet MINUTE", function(){
  assertFormulaEquals('=MINUTE("8:10:29")', 10);
});

test("Sheet SECOND", function(){
  assertFormulaEquals('=SECOND("8:10:29")', 29);
});

test("Sheet NETWORKDAYS", function(){
  assertFormulaEquals('=NETWORKDAYS("1992-1-1", "1992-1-30")', 22);
});

test("Sheet NETWORKDAYS.INTL", function(){
  assertFormulaEquals('=NETWORKDAYS.INTL("1992-1-1", "1992-1-30")', 22);
});

test("Sheet TIME", function(){
  assertFormulaEquals('=TIME(10, 10, 10)', 0.4237268518518518);
});

test("Sheet WORKDAY", function(){
  assertFormulaEquals('=WORKDAY(DATE(1999, 2, 2), 10)', 36207);
});

test("Sheet WORKDAY.INTL", function(){
  assertFormulaEquals('=WORKDAY.INTL(DATE(1999, 2, 2), 10)', 36207);
});

test("Sheet NA", function(){
  assertFormulaEqualsError('=NA()', NA_ERROR);
});

test("Sheet *", function(){
  assertFormulaEquals('= 10 * 10', 100);
  assertFormulaEquals('= 10 * 0', 0);
  assertFormulaEquals('= 1 * 1', 1);
});

test("Sheet /", function(){
  assertFormulaEquals('= 10 / 2', 5);
  assertFormulaEquals('= 10 / 1', 10);
  assertFormulaEquals('= 1 / 1', 1);
  assertFormulaEquals('= 0 / 1', 0);
  assertFormulaEquals('="1" / 1', 1);
  assertFormulaEquals('="500" / 1', 500);
  assertFormulaEqualsError('= 10 / 0', DIV_ZERO_ERROR);
  assertFormulaEqualsError('= 0 / 0', DIV_ZERO_ERROR);
  assertFormulaEquals('= P9 / 1', 0);
});

test("Sheet ^", function(){
  assertFormulaEquals('= 10 ^ 10', 10000000000);
  assertFormulaEquals('= 10 ^ 0', 1);
  assertFormulaEquals('= 1 ^ 1', 1);
  assertFormulaEquals('= 2 ^ 10', 1024);
});

test("Sheet numbers/math", function(){
  assertFormulaEquals('= "10" + 10', 20);
  assertFormulaEquals('="10.111111" + 0', 10.111111);
  assertFormulaEquals('= 10%', 0.1);
  assertFormulaEquals('= 10% + 1', 1.1);
  assertFormulaEquals('="10e1" + 0', 100);
  assertFormulaEquals('="1,000,000" + 0', 1000000);
  assertFormulaEqualsError('= "10e" + 10', VALUE_ERROR); // TODO: Should fail, but doesn't because 10e parses to a string
  assertFormulaEquals('="+$10.00" + 0', 10);
  assertFormulaEquals('="-$10.00" + 0', -10);
  assertFormulaEquals('="$+10.00" + 0', 10);
  assertFormulaEquals('="$-10.00" + 0', -10);
});

