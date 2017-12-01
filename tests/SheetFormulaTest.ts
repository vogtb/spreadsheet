import {
  Sheet
} from "../src/Sheet";
import {
  assertEquals,
  assertFormulaEquals,
  assertFormulaResultsInType,
  assertFormulaEqualsArray,
  assertFormulaEqualsError,
  assertFormulaEqualsDependsOnReference,
  test
} from "./Utils/Asserts";
import {
  DIV_ZERO_ERROR,
  VALUE_ERROR,
  NA_ERROR,
  PARSE_ERROR,
  REF_ERROR
} from "../src/Errors";
import {
  Cell
} from "../src/Cell";

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
  assertFormulaEquals('=CORREL([9, 5], [10, 4])', 1);
});

test("Sheet CHOOSE", function(){
  assertFormulaEquals('=CHOOSE(3, 1, 2, 3)', 3);
  assertFormulaEquals('=CHOOSE(2, 1, 2, 3)', 2);
  assertFormulaEquals('=CHOOSE(1, 1, 2, 3)', 1);
});

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
  assertFormulaEquals('=COTH(2)', 1.0373147207275482);
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

test("Sheet QUOTIENT", function(){
  assertFormulaEquals('=QUOTIENT(8, 2)', 4);
});

test("Sheet UPLUS", function(){
  assertFormulaEquals('=UPLUS(8)', 8);
});

test("Sheet UMINUS", function(){
  assertFormulaEquals('=UMINUS(8)', -8);
});

test("Sheet STDEV", function(){
  assertFormulaEquals('=STDEV([33, 44])', 7.7781745930520225);
});

test("Sheet STDEVA", function(){
  assertFormulaEquals('=STDEVA(33, 44)', 7.7781745930520225);
});

test("Sheet STDEVP", function(){
  assertFormulaEquals('=STDEVP(33, 44)', 5.5);
});

test("Sheet STDEVPA", function(){
  assertFormulaEquals('=STDEVPA(33, 44)', 5.5);
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
  assertFormulaEqualsArray('=SPLIT("1,2,3", ",", TRUE)', [ '1', '2', '3' ]);
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
  assertFormulaEquals('=TANH(PI())', 0.99627207622075);
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

test("Sheet ISTEXT", function(){
  assertFormulaEquals('=ISTEXT("str")', true);
});

test("Sheet ISNONTEXT", function(){
  assertFormulaEquals('=ISNONTEXT("str")', false);
});

test("Sheet ISLOGICAL", function(){
  assertFormulaEquals('=ISLOGICAL(true)', true);
});

test("Sheet ISNUMBER", function(){
  assertFormulaEquals('=ISNUMBER(5)', true);
});

test("Sheet MROUND", function(){
  assertFormulaEquals('=MROUND(21, 14)', 28);
});

test("Sheet FACTDOUBLE", function(){
  assertFormulaEquals('=FACTDOUBLE(7)', 105);
});

test("Sheet FREQUENCY", function(){
  assertFormulaEqualsArray('=FREQUENCY([10, 2, 3, 44, 1, 2], 22)', [5, 1]);
});

test("Sheet GROWTH", function(){
  assertFormulaEqualsArray('=GROWTH([15.53, 19.99, 20.43, 21.18, 25.93, 30.00, 30.00, 34.01, 36.47],[1, 2, 3, 4, 5, 6, 7, 8, 9],[10, 11, 12])', [41.740521723275876, 46.22712349335047, 51.19598074591973]);
});

test("Sheet TRIMMEAN", function(){
  assertFormulaEquals('=TRIMMEAN([1], 0.1)', 1);
});

test("Sheet SLOPE", function(){
  assertFormulaEquals('=SLOPE([600, 800], [44, 4.1])', -5.012531328320802);
});

test("Sheet LOWER", function(){
  assertFormulaEquals('=LOWER("STR")', "str");
});

test("Sheet UPPER", function(){
  assertFormulaEquals('=UPPER("str")', "STR");
});

test("Sheet STANDARDIZE", function(){
  assertFormulaEquals('=STANDARDIZE(10, 2, 1)', 8);
});

test("Sheet SMALL", function(){
  assertFormulaEquals('=SMALL([1, 2], 2)', 2);
});

test("Sheet LARGE", function(){
  assertFormulaEquals('=LARGE([1, 2], 2)', 1);
});

test("Sheet INTERCEPT", function(){
  assertFormulaEquals('=INTERCEPT([1, 2, 3, 4], [10, 20, 33, 44])', 0.1791776688042246);
});

test("Sheet FORECAST", function(){
  assertFormulaEquals('=FORECAST([0], [1, 2, 3, 4], [10, 20, 33, 44])', 0.1791776688042246);
});

test("Sheet SYD", function(){
  assertFormulaEquals('=SYD(100, 22, 10, 3)', 11.345454545454546);
});

test("Sheet SLN", function(){
  assertFormulaEquals('=SLN(100, 22, 10)', 7.80);
});

test("Sheet NPER", function(){
  assertFormulaEquals('=NPER(0.04, 100, 4000, 0, 0)', -24.362418941571317);
});

test("Sheet NOMINAL", function(){
  assertFormulaEquals('=NOMINAL(0.8, 12)', 0.6024201620105654);
});

test("Sheet MIRR", function(){
  assertFormulaEquals('=MIRR([10, 20, -30, 40], 0.05, 0.06)', 0.3458084697540138);
});

test("Sheet IRR", function(){
  assertFormulaEquals('=IRR([-100, 100, 100])', 0.6180339809507132);
});

test("Sheet IPMT", function(){
  assertFormulaEquals('=IPMT(0.025, 1, 66, 25000)', -625);
});

test("Sheet FV", function(){
  assertFormulaEquals('=FV(0.05, 1, 66, 25000)', -26316);
});

test("Sheet ISEMAIL", function(){
  assertFormulaEquals('=ISEMAIL("ben@example.com")', true);
});

test("Sheet ISURL", function(){
  assertFormulaEquals('=ISURL("example.com")', true);
});

test("Sheet LINEST", function(){
  assertFormulaEqualsArray('=LINEST([15.53, 19.99, 20.43, 21.18, 25.93, 30], [1, 2, 3, 4, 5, 6])', [2.5977142857142863,	13.08466666666666]);
});

test("Sheet POISSON, POISSON.DIST", function(){
  assertFormulaEquals('=POISSON(3, 5, true)', 0.26502591529736175);
  assertFormulaEquals('=POISSON.DIST(3, 5, true)', 0.26502591529736175);
});

test("Sheet PERCENTRANK, PERCENTRANK.INC", function(){
  assertFormulaEquals('=PERCENTRANK([1], 1)', 1);
  assertFormulaEquals('=PERCENTRANK.INC([1], 1)', 1);
});

test("Sheet PERCENTRANK.EXC", function(){
  assertFormulaEquals('=PERCENTRANK.EXC([1], 1)', 1);
});

test("Sheet NORMSINV", function(){
  assertFormulaEquals('=NORMSINV(0.1)', -1.2815515655446006);
});

test("Sheet NORMSINV", function(){
  assertFormulaEquals('=NORMDIST(1, 0, 6, true)', 0.5661838326109037);
});

test("Sheet NORMINV", function(){
  assertFormulaEquals('=NORMINV(0.8, 0, 6)', 5.049727401437487);
});

test("Sheet NEGBINOMDIST", function(){
  assertFormulaEquals('=NEGBINOMDIST(5, 3, 0.2)', 0.05505024000000004);
});

test("Sheet GEOMEAN", function(){
  assertFormulaEquals('=GEOMEAN(10, 4, 6, 3, 6, 7, 1, 1)', 3.6313885790189477);
});

test("Sheet HARMEAN", function(){
  assertFormulaEquals('=HARMEAN(10, 4, 6, 3, 6, 7, 1, 1)', 2.532027128862095);
});

test("Sheet CONFIDENCE", function(){
  assertFormulaEquals('=CONFIDENCE(0.04, 6.48, 25)', 2.6616585881788426);
});

test("Sheet N", function(){
  assertFormulaEquals('=N("10")', 10);
});

test("Sheet UNARY_PERCENT", function(){
  assertFormulaEquals('=UNARY_PERCENT(10)', 0.1);
});

test("Sheet MULTINOMIAL", function(){
  assertFormulaEquals('=MULTINOMIAL(2, 22)', 276);
});

test("Sheet BINOMDIST", function(){
  assertFormulaEquals('=BINOMDIST(14, 22, 0.4, true)', 0.9929516025629364);
});

test("Sheet COVAR", function(){
  assertFormulaEquals('=COVAR([2, 4, 5, 1], [7, 3, 1, 3])', -2);
});

test("Sheet ISREF", function(){
  assertFormulaEquals('=ISREF(B1)', true);
  assertFormulaEquals('=ISREF(B1:B10)', true);
  assertFormulaEquals('=ISREF(100)', false);
});

test("Sheet ISBLANK", function(){
  assertFormulaEquals('=ISBLANK(10)', false);
  assertFormulaEquals('=ISBLANK(N10)', true);
});

test("Sheet ISERR", function(){
  assertFormulaEquals('=ISERR(10)', false);
  assertFormulaEquals('=ISERR(1/0)', true);
  assertFormulaEquals('=ISERR(NA())', false);
  assertFormulaEquals('=ISERR(M7)', false);
  assertFormulaEquals('=ISERR([])', true);
  assertFormulaEquals('=ISERR(NOTAFUNCTION())', true);
  assertFormulaEquals('=ISERR(ACOS(44))', true);
  assertFormulaEqualsError('=ISERR(10e)', PARSE_ERROR);
});

test("Sheet ISERROR", function(){
  assertFormulaEquals('=ISERROR(10)', false);
  assertFormulaEquals('=ISERROR(1/0)', true);
  assertFormulaEquals('=ISERROR(NA())', true);
  assertFormulaEquals('=ISERROR(M7)', false);
  assertFormulaEquals('=ISERROR([])', true);
  assertFormulaEquals('=ISERROR(NOTAFUNCTION())', true);
  assertFormulaEquals('=ISERROR(ACOS(44))', true);
  assertFormulaEqualsError('=ISERROR(10e)', PARSE_ERROR);
});

test("Sheet ISNA", function(){
  assertFormulaEquals('=ISNA(10)', false);
  assertFormulaEquals('=ISNA(1/0)', false);
  assertFormulaEquals('=ISNA(NA())', true);
  assertFormulaEquals('=ISNA(M7)', false);
  assertFormulaEquals('=ISNA([])', false);
  assertFormulaEquals('=ISNA(NOTAFUNCTION())', false);
  assertFormulaEquals('=ISNA(ACOS(44))', false);
  assertFormulaEqualsError('=ISNA(10e)', PARSE_ERROR);});

test("Sheet IFERROR", function(){
  assertFormulaEquals('=IFERROR(10)', 10);
  assertFormulaEquals('=IFERROR(NA())', null);
  assertFormulaEquals('=IFERROR(NOTAFUNCTION())', null);
  assertFormulaEquals('=IFERROR(1/0)', null);
  assertFormulaEquals('=IFERROR(M7)', new Cell("M7"));
  assertFormulaEquals('=IFERROR([])', null);
});

test("Sheet ISFORMULA", function(){
  assertFormulaEqualsError('=ISFORMULA(10)', NA_ERROR);
  assertFormulaEqualsError('=ISFORMULA(false)', NA_ERROR);
  assertFormulaEqualsError('=ISFORMULA("str")', NA_ERROR);
  assertFormulaEqualsError('=ISFORMULA([])', REF_ERROR);
  assertFormulaEqualsError('=ISFORMULA([10])', NA_ERROR);
  assertFormulaEqualsDependsOnReference('D1', "=SUM(10, 5)", '=ISFORMULA(D1)', true);
  assertFormulaEquals('=ISFORMULA(M7)', false);
});

test("Sheet TYPE", function(){
  assertFormulaEquals('=TYPE(10)', 1);
});

test("Sheet COLUMN", function(){
  assertFormulaEqualsDependsOnReference('D1', 10, '=COLUMN(D1)', 4);
});

test("Sheet ROW", function(){
  assertFormulaEqualsDependsOnReference('D2', 10, '=ROW(D2)', 2);
});

test("Sheet T", function(){
  assertFormulaEquals('=T(10)', "");
  assertFormulaEquals('=T("str")', "str");
});

test("Sheet PPMT", function(){
  assertFormulaEquals('=PPMT(0, 3, 24, 33000, 0, 1)', -1375.00);
});

test("Sheet WEIBULL", function(){
  assertFormulaEquals('=WEIBULL(2.4, 2, 4, true)', 0.30232367392896886);
});

test("Sheet VARPA", function(){
  assertFormulaEquals('=VARPA(1, 2, 3, 4, 5, 6, 7, 8)', 5.25);
});

test("Sheet VARP", function(){
  assertFormulaEquals('=VARP(1, 2, 3, 4, 5, 6, 7, 8)', 5.25);
});

test("Sheet VARA", function(){
  assertFormulaEquals('=VARA(1, 2, 3, 4, 5, 6, 7, 8)', 6);
});

test("Sheet VAR", function(){
  assertFormulaEquals('=VAR(1, 2, 3, 4, 5, 6, 7, 8)', 6);
});

test("Sheet PERMUT", function(){
  assertFormulaEquals('=PERMUT(4, 2)', 12);
});

test("Sheet RSQ", function(){
  assertFormulaEquals('=RSQ([10, 22, 4], [1, 3, 7])', 0.2500000000000001);
});

test("Sheet SKEW", function(){
  assertFormulaEquals('=SKEW(1, 2, 3, 4, 5, 6, 100)', 2.6336050735387375);
});

test("Sheet STEYX", function(){
  assertFormulaEquals('=STEYX([1, 2, 3, 4], [1, 3, 5, 2])', 1.4638501094227998);
});

test("Sheet PROB", function(){
  assertFormulaEquals('=PROB([1, 2, 3, 4], [0.25, 0.25, 0.25, 0.25], 3)', 0.25);
});

test("Sheet MODE", function(){
  assertFormulaEquals('=MODE(1, 6, 7, 7, 8)', 7);
});

test("Sheet RANK", function(){
  assertFormulaEquals('=RANK([2], [1, 2, 3, 4, 5, 6, 7, 8, 9], true)', 2);
});

test("Sheet RANK.AVG", function(){
  assertFormulaEquals('=RANK.AVG([2], [1, 2, 3, 4, 5, 6, 7, 8, 9], true)', 2);
});

test("Sheet RANK.EQ", function(){
  assertFormulaEquals('=RANK.EQ([2], [1, 2, 3, 4, 5, 6, 7, 8, 9], true)', 2);
});

test("Sheet LOGNORMDIST", function(){
  assertFormulaEquals('=LOGNORMDIST(4, 4, 6)', 0.33155709720516946);
});

test("Sheet LOGNORMDIST", function(){
  assertFormulaEquals('=TDIST(0.55, 1, 2)', 0.6798800684756632);
});

test("Sheet TO_DATE", function(){
  assertFormulaEquals('=TO_DATE(2)', 2);
});

test("Sheet TO_DOLLARS", function(){
  assertFormulaEquals('=TO_DOLLARS(2)', 2);
});

test("Sheet TO_PERCENT", function(){
  assertFormulaEquals('=TO_PERCENT(20)', 20);
});

test("Sheet TO_TEXT", function(){
  assertFormulaEquals('=TO_TEXT(false)', "FALSE");
});

test("Sheet ERROR.TYPE", function(){
  let sheet = new Sheet();
  sheet.setCell("M1", "= 1/0");
  sheet.setCell("A1", "=ERROR.TYPE(M1)");
  assertEquals(sheet.getCell("A1").getValue(), 2);
  // Empty range is a ref error, and should be caught by formula
  assertFormulaEquals('=ERROR.TYPE([])', 4);
  // Divide by zero error should be caught by formula
  assertFormulaEquals('=ERROR.TYPE(1/0)', 2);
  // NA error should also be caught by formula
  assertFormulaEquals('=ERROR.TYPE(NA())', 7);
  // name error should also be caught by formula
  assertFormulaEquals('=ERROR.TYPE(NOTAFUNCTION())', 5);
  // num error should also be caught by formula
  assertFormulaEquals('=ERROR.TYPE(ACOS(44))', 6);
  // Parse error should bubble up to cell
  assertFormulaEqualsError('=ERROR.TYPE(10e)', PARSE_ERROR);
  // Ref to empty cell should bubble up to cell
  assertFormulaEqualsError('=ERROR.TYPE(M8)', NA_ERROR);
  // Non-error value passed in should cause NA_ERROR
  assertFormulaEqualsError('=ERROR.TYPE(10)', NA_ERROR);
});

test("Sheet ADDRESS", function(){
  assertFormulaEquals('=ADDRESS(2170, 2, 4, true, "SheetOne")', "SheetOne!B2170");
});

test("Sheet COLUMNS", function(){
  assertFormulaEquals('=COLUMNS(1)', 1);
  assertFormulaEquals('=COLUMNS([1, 2, 3, 4])', 4);
  assertFormulaEquals('=COLUMNS(M1)', 1);
  assertFormulaEquals('=COLUMNS(B1:M44)', 12);
});

test("Sheet ROWS", function(){
  assertFormulaEquals('=ROWS(1)', 1);
  assertFormulaEquals('=ROWS([1, 2, 3, 4])', 1);
  assertFormulaEquals('=ROWS(M1)', 1);
  assertFormulaEquals('=ROWS(B1:M44)', 44);
});

test("Sheet SERIESSUM", function() {
  assertFormulaEquals('=SERIESSUM([1], [0], [1], [4, 5, 6])', 15);
});

test("Sheet ROMAN", function(){
  assertFormulaEquals('=ROMAN(3999)', "MMMCMXCIX");
});

test("Sheet TEXT", function(){
  assertFormulaEquals('=TEXT(12.3, "###.##")', "12.3");
});

test("Sheet FVSCHEDULE", function(){
  assertFormulaEquals('=FVSCHEDULE([0.025], [1, 2, 3, 4])', 3.0000000000000004);
});

test("Sheet PV", function(){
  assertFormulaEquals('=PV(2, 12, 100)', -49.99990591617884);
});

test("Sheet RATE", function(){
  assertFormulaEquals('=RATE(12, -100, 400, 100)', 0.2225948800332845);
});

test("Sheet SUBTOTAL", function(){
  assertFormulaEquals('=SUBTOTAL([1], [1, 2, 3, 4, 5, 6, 7])', 4);
});

test("Sheet HYPGEOMDIST", function(){
  assertFormulaEquals('=HYPGEOMDIST(4, 12, 20, 44)', 0.16895408557348432);
});

test("Sheet ZTEST", function(){
  assertFormulaEquals('=ZTEST([1, 2, 3, 4, 5, 6, 7], 5.6, 1.1)', 0.9999405457342111);
});

test("Sheet FIND", function(){
  assertFormulaEquals('=FIND("s", "soup")', 1);
});

test("Sheet JOIN", function(){
  assertFormulaEquals('=JOIN([","], [1, 2, 3])', "1,2,3");
});

test("Sheet LEN", function(){
  assertFormulaEquals('=LEN("soup")', 4);
});

test("Sheet LEFT", function(){
  assertFormulaEquals('=LEFT("soup")', "s");
});

test("Sheet RIGHT", function(){
  assertFormulaEquals('=RIGHT("soup")', "p");
});

test("Sheet SEARCH", function(){
  assertFormulaEquals('=SEARCH("soup", "soup?")', 1);
});

test("Sheet REPT", function(){
  assertFormulaEquals('=REPT("a", 2)', "aa");
});

test("Sheet VALUE", function(){
  assertFormulaEquals('=VALUE("10")', 10);
});

test("Sheet CLEAN", function(){
  assertFormulaEquals('=CLEAN("hello"&CHAR(31))', "hello");
});

test("Sheet MID", function(){
  assertFormulaEquals('=MID("hey there", 5, 4)', "ther");
});

test("Sheet PROPER", function(){
  assertFormulaEquals('=PROPER("hey there")', "Hey There");
});

test("Sheet REPLACE", function(){
  assertFormulaEquals('=REPLACE("Hey there", 1, 3, "Hello")', "Hello there");
});

test("Sheet SUBSTITUTE", function(){
  assertFormulaEquals('=SUBSTITUTE("Hey darkness my old friend", "Hey", "Hello")', "Hello darkness my old friend");
});

test("Sheet parsing error", function(){
  assertFormulaEqualsError('= 10e', PARSE_ERROR);
  assertFormulaEqualsError('= SUM(', PARSE_ERROR);
});

test("Sheet *", function(){
  assertFormulaEquals('= 10 * 10', 100);
  assertFormulaEquals('= 10 * 0', 0);
  assertFormulaEquals('= 1 * 1', 1);
});

test("Sheet &", function(){
  assertFormulaEquals('="hey"&" "&"there"', "hey there");
  assertFormulaEquals('=TEXT(12.3, "###.##")&"mm"', "12.3mm");
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
  assertFormulaEquals('= "10.111111" + 0', 10.111111);
  assertFormulaEquals('= 10%', 0.1);
  assertFormulaEquals('= 10% + 1', 1.1);
  assertFormulaEquals('= "10e1" + 0', 100);
  assertFormulaEquals('= 10e1', 100);
  assertFormulaEquals('= 10e-1', 1);
  assertFormulaEquals('= 10e+1', 100);
  assertFormulaEquals('= 10E1', 100);
  assertFormulaEquals('= 10E-1', 1);
  assertFormulaEquals('= 10E+1', 100);
  assertFormulaEquals('= "1,000,000"  + 0', 1000000);
  assertFormulaEqualsError('= "10e" + 10', VALUE_ERROR);
  assertFormulaEquals('= "+$10.00" + 0', 10);
  assertFormulaEquals('= "-$10.00" + 0', -10);
  assertFormulaEquals('= "$+10.00" + 0', 10);
  assertFormulaEquals('= "$-10.00" + 0', -10);
});

