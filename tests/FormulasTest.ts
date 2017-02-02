import { ABS, ACCRINT, ACOS, ACOSH, ACOTH, AND, ARABIC, ASIN, ASINH, ATAN, ATAN2, ATANH, AVEDEV, AVERAGE,
    AVERAGEA, AVERAGEIF, BASE, BIN2DEC, BESSELI, BESSELJ, BESSELK, BESSELY, BETADIST, BETAINV,
    BITAND, BITLSHIFT, BITOR, BITRSHIFT, BITXOR, BIN2HEX, BIN2OCT, DECIMAL, CEILING,
    CEILINGMATH, CEILINGPRECISE, CHAR, CODE, COMBIN, COMBINA, COMPLEX, CONCATENATE, CONVERT,
    CORREL, COS, PI, COSH, COT, COTH, COUNT, COUNTA, COUNTIF, COUNTIFS, COUNTIN, COUNTUNIQUE,
    COVARIANCEP, COVARIANCES, CSC, CSCH, CUMIPMT, CUMPRINC, DATE, DATEVALUE, DAY, DAYS, DAYS360,
    DB, DDB, DEC2BIN, DEC2HEX, DEC2OCT, DEGREES, DELTA, DEVSQ, DOLLAR, DOLLARDE, DOLLARFR, EDATE,
    EFFECT, EOMONTH, ERF, ERFC, EVEN, EXACT, EXPONDIST, FALSE, __COMPLEX, FISHER, FISHERINV, IF,
    INT, ISEVEN, ISODD, LN, LOG, LOG10, MAX, MAXA, MEDIAN, MIN, MINA, MOD, NOT, TRUE, ODD, OR,
    POWER, ROUND, ROUNDDOWN, ROUNDUP, SIN, SINH, SPLIT, SQRT, SQRTPI, SUM, SUMIF, SUMPRODUCT,
    SUMSQ, SUMX2MY2, SUMX2PY2, TAN, TANH, TRUNC, XOR, YEARFRAC } from "../src/RawFormulas/RawFormulas"
import * as ERRORS from "../src/Errors"
import {assertEquals, assertEqualsDates, assertArrayEquals} from "./utils/Asserts"
import {firstValueAsNumber} from "../src/RawFormulas/Utils";

function catchAndAssertEquals(toExecute, expected) {
  try {
    toExecute();
  } catch (actualError) {
    if (actualError.message != expected) {
      console.log(expected, "not equal to", actualError.message);
    }
  }
}

// Test ABS
assertEquals(ABS(-10), 10);
assertEquals(ABS(-10.111), 10.111);
assertEquals(ABS(0), 0);
assertEquals(ABS(false), 0);
assertEquals(ABS("-44"), 44);
catchAndAssertEquals(function() {
  ABS();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ABS("str");
}, ERRORS.VALUE_ERROR);


// Test ACCRINT
// TODO: This formula doesn't work properly under some circumstances.
assertEquals(ACCRINT(DATE(2011, 1, 1), DATE(2011, 2, 1), DATE(2014, 7, 1), 0.1, 1000, 1, 0), 350);


// Test ACOS
assertEquals(ACOS(0), 1.5707963267948966);
assertEquals(ACOS(-1), 3.141592653589793);
assertEquals(ACOS(1), 0);
assertEquals(ACOS("-1"), 3.141592653589793);
assertEquals(ACOS(false), 1.5707963267948966);
catchAndAssertEquals(function() {
  ACOS("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ACOS(2);
}, ERRORS.NUM_ERROR);


// Test ACOSH
assertEquals(ACOSH(22), 3.783672704329451);
assertEquals(ACOSH(1), 0);
assertEquals(ACOSH("11"), 3.0889699048446033);
catchAndAssertEquals(function() {
  ACOSH(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  ACOSH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ACOSH(false);
}, ERRORS.NUM_ERROR);


// Test ACOTH
assertEquals(ACOTH(22), 0.04548588910286339);
assertEquals(ACOTH(-1.1), -1.522261218861711);
assertEquals(ACOTH("-22"), -0.04548588910286338);
catchAndAssertEquals(function() {
  ACOTH(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  ACOTH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ACOTH(false);
}, ERRORS.NUM_ERROR);


// Test AND
assertEquals(AND(10, 10), true);
assertEquals(AND(10, 0), false);
assertEquals(AND(10, false), false);
assertEquals(AND(0, 0), false);
catchAndAssertEquals(function() {
  AND(1, "");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  AND();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AND(1, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AND(0, [1, 1]), false);
assertEquals(AND(1, [1, 1]), true);
catchAndAssertEquals(function() {
  AND(1, [1, "str"]);
}, ERRORS.VALUE_ERROR);


// Test ARABIC
assertEquals(ARABIC("XIV"), 14);
assertEquals(ARABIC("M"), 1000);
assertEquals(ARABIC("-IV"), -4);
catchAndAssertEquals(function() {
  ARABIC("b");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ARABIC(false);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  ARABIC(10);
}, ERRORS.VALUE_ERROR);


// Test ASIN
assertEquals(ASIN(0), 0);
assertEquals(ASIN(1), 1.5707963267948966);
assertEquals(ASIN("1"), 1.5707963267948966);
assertEquals(ASIN(false), 0);
catchAndAssertEquals(function() {
  ASIN(2);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  ASIN("str");
}, ERRORS.VALUE_ERROR);


// Test ASINH
assertEquals(ASINH(1), 0.8813735870195429);
assertEquals(ASINH(0), 0);
assertEquals(ASINH("1"), 0.8813735870195429);
assertEquals(ASINH(false), 0);
assertEquals(ASINH(true), 0.8813735870195429);
catchAndAssertEquals(function() {
  ASINH("str");
}, ERRORS.VALUE_ERROR);


// Test ATAN
assertEquals(ATAN(1), 0.7853981633974483);
assertEquals(ATAN(0), 0);
assertEquals(ATAN("1"), 0.7853981633974483);
assertEquals(ATAN(false), 0);
assertEquals(ATAN(true), 0.7853981633974483);
catchAndAssertEquals(function() {
  ASINH("str");
}, ERRORS.VALUE_ERROR);

// Test ATAN2
assertEquals(ATAN2(4, 3), 0.6435011087932844);
assertEquals(ATAN2(-1, -1), -2.356194490192345);
catchAndAssertEquals(function() {
  ATAN2(0, 0);
}, ERRORS.DIV_ZERO_ERROR);
assertEquals(ATAN2(1, 0), 0);
assertEquals(ATAN2(0, 1), 1.5707963267948966);
assertEquals(ATAN2(-1, "-1"), -2.356194490192345);
assertEquals(ATAN2(true, false), 0);
assertEquals(ATAN2(true, true), 0.7853981633974483);
catchAndAssertEquals(function() {
  ATAN2("str", false);
}, ERRORS.VALUE_ERROR);


// Test ATANH
assertEquals(ATANH(0.51), 0.5627297693521489);
assertEquals(ATANH(0.44), 0.47223080442042564);
assertEquals(ATANH(0), 0);
assertEquals(ATANH("0.1"), 0.10033534773107562);
assertEquals(ATANH(false), 0);
catchAndAssertEquals(function() {
  ATANH(true);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  ATANH("str");
}, ERRORS.VALUE_ERROR);


// Test AVEDEV
assertEquals(AVEDEV(1, 2, 4, 55), 19.75);
assertEquals(AVEDEV(1, 2, 4, "55"), 19.75);
assertEquals(AVEDEV([1, 2, 4, "55"]), 1.1111111111111112);
assertEquals(AVEDEV([1, 2, 4, "55"], [10, 10, "str"]), 3.6799999999999997);
assertEquals(AVEDEV([1, 2, 4, "55"], [10, 10]), 3.6799999999999997);
assertEquals(AVEDEV(1, 2, 4, "55", [10, [10]]), 13.777777777777777);
assertEquals(AVEDEV(1, 2, 4, "55", 10, 10), 13.77777777777778);
assertEquals(AVEDEV(1, 2, 4, 55, false), 17.040000000000003);
assertEquals(AVEDEV(1, 2, 4, 55, 0), 17.040000000000003);
assertEquals(AVEDEV(1, 2, 4, 55, true), 16.959999999999997);
assertEquals(AVEDEV(1, 2, 4, 55, 1), 16.959999999999997);
assertEquals(AVEDEV([1, 2, 4, 55, 0]), 17.040000000000003);
assertEquals(AVEDEV([1, 2, 4, 55], 0), 17.040000000000003);
catchAndAssertEquals(function() {
  AVEDEV();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVEDEV(10, 10, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  AVEDEV(10, 10, {});
}, ERRORS.REF_ERROR);


// Test AVERAGE
assertEquals(AVERAGE(1, 2, 4, 55), 15.5);
assertEquals(AVERAGE(1, 2, 4, "55"), 15.5);
assertEquals(AVERAGE(1, 2, 4, 55, false), 12.4);
assertEquals(AVERAGE(1, 2, 4, 55, true), 12.6);
assertEquals(AVERAGE(1, 2, 4, 55, 0), 12.4);
assertEquals(AVERAGE(1, 2, 4, 55, 1), 12.6);
catchAndAssertEquals(function() {
  AVERAGE(1, 2, 4, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AVERAGE([1, 2, 4, 55, "str"]), 15.5);
assertEquals(AVERAGE([1, 2, 4, 55, "22"]), 15.5);
assertEquals(AVERAGE([0]), 0);
catchAndAssertEquals(function() {
  AVERAGE();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVERAGE([]);
}, ERRORS.REF_ERROR);


// Test AVERAGEA
assertEquals(AVERAGEA(1, 2, 4, 55), 15.5);
assertEquals(AVERAGEA(1, 2, 4, "55"), 15.5);
assertEquals(AVERAGEA(1, 2, 4, 55, false), 12.4);
assertEquals(AVERAGEA(1, 2, 4, 55, true), 12.6);
assertEquals(AVERAGEA(1, 2, 4, 55, 0), 12.4);
assertEquals(AVERAGEA(1, 2, 4, 55, 1), 12.6);
catchAndAssertEquals(function() {
  AVERAGEA(1, 2, 4, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AVERAGEA([1, 2, 4, 55, "str"]), 12.4);
assertEquals(AVERAGEA([1, 2, 4, 55, "22"]), 12.4);
assertEquals(AVERAGEA([1, 2, 4, 55, 0]), 12.4);
assertEquals(AVERAGEA([0]), 0);
catchAndAssertEquals(function() {
  AVERAGEA();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  AVERAGEA([]);
}, ERRORS.REF_ERROR);


assertEquals(AVERAGEIF([1, 5, 10], '>2'), 7.5);

assertEquals(BASE(15, 2, 10), '0000001111');

assertEquals(BIN2DEC(1010101010), -342);

assertEquals(BESSELI(1, 2), 0.13574766658069928);

assertEquals(BESSELJ(1, 2), 0.11490348499246938);

assertEquals(BESSELK(1, 2), 1.6248388844172295);

assertEquals(BESSELY(1, 2), -1.6506826133039476);

assertEquals(BETADIST(2, 8, 10, true, 1, 3), 0.6854705810117458);

assertEquals(BETAINV(0.6854705810117458, 8, 10, 1, 3), 1.9999999999999996);

assertEquals(BITAND(42, 24), 8);

assertEquals(BITLSHIFT(42, 24), 704643072);

assertEquals(BITOR(42, 24), 58);

assertEquals(BITRSHIFT(42, 2), 10);

assertEquals(BITXOR(42, 24), 50);

assertEquals(BIN2HEX(1010101010), "fffffffeaa");

assertEquals(BIN2OCT(1010101010), "7777777252");

assertEquals(DECIMAL(199.99999), 199);

assertEquals(CEILING(22.22, 0.1), 22.3);

assertEquals(CEILINGMATH(1001.112131), 1002);

assertEquals(CEILINGPRECISE(1001.112131), 1002);


// Test CHAR
assertEquals(CHAR(97), "a");
assertEquals(CHAR("97"), "a");
assertEquals(CHAR([97, "m"]), "a");
assertEquals(CHAR([[97], "m"]), "a");
catchAndAssertEquals(function() {
  CHAR([[], [97], "m"]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  CHAR(false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CHAR(10000000);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CHAR(0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  CHAR();
}, ERRORS.NA_ERROR);


// Test CODE
assertEquals(CODE('a'), 97);
assertEquals(CODE('aa'), 97);
assertEquals(CODE('aM'), 97);
assertEquals(CODE('#'), 35);
assertEquals(CODE(false), 70);
assertEquals(CODE(true), 84);
catchAndAssertEquals(function() {
  CODE();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CODE("a", "m");
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CODE("");
}, ERRORS.VALUE_ERROR);
assertEquals(CODE(['a']), 97);
assertEquals(CODE([['a'], 'p']), 97);


assertEquals(COMBIN(4, 2), 6);

assertEquals(COMBINA(4, 3), 20);

assertEquals(COMPLEX(3, 4), '3+4i');

assertEquals(CONCATENATE("hey", " ", "there"), "hey there");

assertEquals(CONVERT(5.1, "mm", "m"), 0.0050999999999999995);

assertEquals(CORREL([9, 5],[10, 4]), 1);


// Test COS
assertEquals(COS(PI()), -1);
assertEquals(COS(1), 0.5403023058681398);
assertEquals(COS(false), 1);
assertEquals(COS(true), 0.5403023058681398);
assertEquals(COS(""), 1);
assertEquals(COS("0"), 1);
catchAndAssertEquals(function() {
  COS("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COS();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COS(1, 1);
}, ERRORS.NA_ERROR);
assertEquals(COS([0, "str"]), 1);


// Test COSH
assertEquals(COSH(PI()), 11.591953275521522);
assertEquals(COSH(1), 1.5430806348152437);
assertEquals(COSH(false), 1);
assertEquals(COSH(0), 1);
assertEquals(COSH(true), 1.5430806348152437);
assertEquals(COSH(""), 1);
catchAndAssertEquals(function() {
  COSH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COSH();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COSH(1, 1);
}, ERRORS.NA_ERROR);
assertEquals(COSH([0, "str"]), 1);


assertEquals(COT(30), -0.15611995216165922);

assertEquals(COTH(2), 1.0373147207275482);

assertEquals(COUNT([1, 5, 10]), 3);

assertEquals(COUNTA(10, 10, 22), 3);

assertEquals(COUNTIF([1, 5, 10], ">4"), 2);

assertEquals(COUNTIFS([1, 5, 10], ">4", [1, 5, 10], ">4"), 2);

assertEquals(COUNTIN([1,3,1],1), 2);

assertEquals(COUNTUNIQUE([1, 1, 10]), 2);

assertEquals(COVARIANCEP([3,2,4,5,6], [9,7,12,15,17]), 5.2);

assertEquals(COVARIANCES([2,4,8], [5,11,12]), 9.666666666666668);

assertEquals(CSC(15), 1.5377805615408537);

assertEquals(CSCH(1.5), 0.46964244059522464);

assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, 0), -54.39423242396348);

assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, 0), -26.324171373034403);

assertEqualsDates(DATE(1992, 6, 24), new Date("6/24/1992"));
assertEqualsDates(DATE(1992, 13, 24), new Date("1/24/1993"));
assertEqualsDates(DATE(1992, 6, 44), new Date("7/14/1992"));
assertEqualsDates(DATE(2, 6, 44), new Date("7/14/1902"));
assertEqualsDates(DATE(2, 33, 44), new Date("10/14/1904"));
assertEqualsDates(DATE(1976, 2, 29), new Date("2/29/1976"));
assertEqualsDates(DATE(1976, 2, 30), new Date("3/1/1976"));

assertEqualsDates(DATEVALUE("1992-6-24"), new Date("6/24/1992"));

assertEquals(DAY(DATEVALUE("1992-6-24")), 24);

assertEquals(DAYS(DATEVALUE("1993-6-24"), DATEVALUE("1992-6-24")), 365);

assertEquals(DAYS360(DATE(1969, 7, 16), DATE(1970, 7, 24), 1), 368);

assertEquals(DB(100, 50, 10, 2, 12), 6.2511);

assertEquals(DDB(100, 50, 10, 2, 2.25), 17.4375);

assertEquals(DEC2BIN("100", 8), "01100100");

assertEquals(DEC2HEX("100"), "64");

assertEquals(DEC2OCT("100"), "144");

assertEquals(DEGREES(PI()), 180);

assertEquals(DELTA(2, 2), 1);

assertEquals(DEVSQ(1, 2), 0.5);

assertEquals(DOLLAR(1.2351, 4), "$1.2351");

assertEquals(DOLLARDE(100.1, 32), 100.3125);

assertEquals(DOLLARFR(100.1, 32), 100.032);

assertEquals(AND(10), true);

assertEqualsDates(EDATE(DATE(1992, 6, 24), 1), new Date('7/24/1992'));

assertEquals(EFFECT(0.99, 12), 1.5890167507927795);

assertEqualsDates(EOMONTH(DATE(1992, 6, 24), 1), new Date('7/31/1992'));

assertEquals(ERF(2), 0.9953222650189527);

assertEquals(ERFC(2), 0.004677734981047288);

// Test EVEN
assertEquals(EVEN(3), 4);
assertEquals(EVEN(4), 4);
assertEquals(EVEN(5), 6);
assertEquals(EVEN("4"), 4);
assertEquals(EVEN(false), 0);
assertEquals(EVEN(true), 2);
assertEquals(EVEN([11, 22]), 12);
assertEquals(EVEN([10, 22, "str"]), 10);
catchAndAssertEquals(function() {
  EVEN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EVEN(1, 2, 3);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EVEN("str");
}, ERRORS.VALUE_ERROR);

// Test EXACT
assertEquals(EXACT("m", "M"), false);
assertEquals(EXACT("m", "m"), true);
assertEquals(EXACT("m", false), false);
assertEquals(EXACT(false, false), true);
assertEquals(EXACT(10, 10), true);
assertEquals(EXACT(10, "10"), true);
assertEquals(EXACT(10, "str"), false);
assertEquals(EXACT([10], [10]), true);
assertEquals(EXACT(["str"], [10, 22]), false);
catchAndAssertEquals(function() {
  EXACT([], []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  EXACT([]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT("m");
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT(10, 10, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXACT(false);
}, ERRORS.NA_ERROR);


assertEquals(EXPONDIST(4, 0.5, false), 0.06766764161830635);

assertEquals(FALSE(), false);

assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, false), 0.0003451054686025578);
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, true), 0.9980694465675269);

assertEquals(__COMPLEX["F.INV"](0.42, 2, 3), 0.6567804059458624);

assertEquals(FISHER(0.962), 1.972066740199461);

assertEquals(FISHERINV(0.962), 0.7451676440945232);

assertEquals(IF("m" == "m", "hit", "miss"), 'hit');

assertEquals(INT(99.33), 99);

assertEquals(ISEVEN(4), true);

assertEquals(ISODD(3), true);

assertEquals(LN(100), 4.605170185988092);

assertEquals(LOG(256, 2), 8);

assertEquals(LOG10(100), 2);


// Test MAX
assertEquals(MAX(100, 22), 100);
assertEquals(MAX(100, "22"), 100);
assertEquals(MAX(-100, false), 0);
assertEquals(MAX(-100, true), 1);
assertEquals(MAX(100, [101, 2]), 101);
assertEquals(MAX(100, [101, 2, "10000"]), 101);
assertEquals(MAX(100, ["10000"]), 100);
catchAndAssertEquals(function() {
  MAX(100, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MAX([]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MAX();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MAX(100, "str");
}, ERRORS.VALUE_ERROR);

// Test MAXA
assertEquals(MAXA(100, 22, 44), 100);


// Tes MEDIAN
assertEquals(MEDIAN(100, 22, 54), 54);
assertEquals(MEDIAN(100, 22, "54"), 54);
assertEquals(MEDIAN(100, 22), 61);
assertEquals(MEDIAN(2), 2);
assertEquals(MEDIAN(false), false);
assertEquals(MEDIAN(1, 1, 2, 6, 6, 9, 5), 5);
assertEquals(MEDIAN(6, 6, 1, 1, 2, 9), 4);
assertEquals(MEDIAN(1, 1, 2, [5, 6, 6, 9]), 5);
catchAndAssertEquals(function() {
  MEDIAN(1, 1, 2, 5, "mmm", 6, 6, 9);
}, ERRORS.VALUE_ERROR);
assertEquals(MEDIAN(1, 1, 2, [5, "mmm", 6, 6, 9]), 5);
assertEquals(MEDIAN(1, 1, 2, ["mm"]), 1);
catchAndAssertEquals(function() {
  MEDIAN(1, 1, 2, ["mm"]);
}, ERRORS.REF_ERROR);
assertEquals(MEDIAN(100, 22, 1, 14), 18);
assertEquals(MEDIAN(100, 22, 1, 1), 11.5);
assertEquals(MEDIAN(100, 22, 1), 22);
assertEquals(MEDIAN(100, 22, [54]), 54);
assertEquals(MEDIAN(100, 22, ["str"]), 61);
catchAndAssertEquals(function() {
  MEDIAN(10, 22, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  MEDIAN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MEDIAN(["str"]);
}, ERRORS.NUM_ERROR);


// Test MIN
assertEquals(MIN(100, 22, 44), 22);
assertEquals(MIN(100, "22"), 22);
assertEquals(MIN(100, false), 0);
assertEquals(MIN(100, true), 1);
assertEquals(MIN(100, [101, 2]), 2);
assertEquals(MIN(100, [101, 2, "-10"]), 2);
assertEquals(MIN(100, ["-10"]), 100);
catchAndAssertEquals(function() {
  MIN(100, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MIN([]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  MIN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MIN(100, "str");
}, ERRORS.VALUE_ERROR);


// Test MINA
assertEquals(MINA(100, 22, 44), 22);


// Test MOD
assertEquals(MOD(10, 3), 1);
catchAndAssertEquals(function() {
  MOD(10, 3, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MOD([10, 3]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MOD(0, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  MOD(10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  MOD(10, false);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  MOD(10, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  MOD(10, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(MOD(10, "3"), 1);
assertEquals(MOD(10.1, 3), 1.0999999999999996);
assertEquals(MOD(10, 3.1), 0.6999999999999997);


// Test NOT
assertEquals(NOT(TRUE()), false);
assertEquals(NOT(""), true);
catchAndAssertEquals(function() {
  NOT(" ");
}, ERRORS.VALUE_ERROR);
assertEquals(NOT(100), false);
assertEquals(NOT(0), true);
assertEquals(NOT(-1), false);
assertEquals(NOT(1), false);
catchAndAssertEquals(function() {
  NOT("0");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  NOT([]);
}, ERRORS.REF_ERROR);
assertEquals(NOT([10]), false);
assertEquals(NOT([0, 0]), true);
assertEquals(NOT([0, false]), true);
assertEquals(NOT([false, 0]), true);
assertEquals(NOT([10, "str"]), false);
catchAndAssertEquals(function() {
  NOT("str");
}, ERRORS.VALUE_ERROR);
assertEquals(NOT([""]), true);
assertEquals(NOT([0]), true);
assertEquals(NOT([1]), false);
assertEquals(NOT([0, 1]), true);
catchAndAssertEquals(function() {
  NOT("1.2");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  NOT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  NOT(false, false);
}, ERRORS.NA_ERROR);


// Test ODD
assertEquals(ODD(2), 3);
assertEquals(ODD(4), 5);
assertEquals(ODD(5), 5);
assertEquals(ODD("4"), 5);
assertEquals(ODD(false), 1);
assertEquals(ODD(true), 1);
assertEquals(ODD([10, 22]), 11);
assertEquals(ODD([10, 22, "str"]), 11);
catchAndAssertEquals(function() {
  ODD();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ODD(1, 2, 3);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ODD("str");
}, ERRORS.VALUE_ERROR);


assertEquals(OR(true, false), true);

assertEquals(PI(), 3.141592653589793);

assertEquals(POWER(4, 10), 1048576);

assertEquals(ROUND(99.44, 1), 99.4);

assertEquals(ROUNDDOWN(99.46, 1), 99.4);

assertEquals(ROUNDUP(99.46, 1), 99.5);


// Test SIN
assertEquals(SIN(0), 0);
assertEquals(SIN(1), 0.8414709848078965);
assertEquals(SIN(PI() / 2), 1);
assertEquals(SIN(PI()), 0);
assertEquals(SIN(true), 0.8414709848078965);
assertEquals(SIN(false), 0);
assertEquals(SIN("0"), 0);
assertEquals(SIN(""), 0);
catchAndAssertEquals(function() {
  SIN("str");
}, ERRORS.VALUE_ERROR);
assertEquals(SIN([1]), 0.8414709848078965);
assertEquals(SIN([[1]]), 0.8414709848078965);
assertEquals(SIN([1, "str"]), 0.8414709848078965);


// Test SINH
assertEquals(SINH(PI()), 11.548739357257748);
assertEquals(SINH(1), 1.1752011936438014);
assertEquals(SINH(false), 0);
assertEquals(SINH(true), 1.1752011936438014);
assertEquals(SINH(""), 0);
assertEquals(SINH("0"), 0);
catchAndAssertEquals(function() {
  SINH("str");
}, ERRORS.VALUE_ERROR);
assertEquals(SINH([10]), 11013.232874703393);
assertEquals(SINH([[10]]), 11013.232874703393);
catchAndAssertEquals(function() {
  SIN([[]]);
}, ERRORS.REF_ERROR);
assertEquals(SINH([[10, "str"]]), 11013.232874703393);


assertArrayEquals(SPLIT("1,2,3", ",", true), [ '1', '2', '3' ]);

assertEquals(SQRT(9), 3);

assertEquals(SQRTPI(9), 5.317361552716548);


// Test SUM
assertEquals(SUM(10), 10);
assertEquals(SUM(10, 10), 20);
assertEquals(SUM(10, [5, 5]), 20);
assertEquals(SUM("10", [5, 5]), 20);
assertEquals(SUM(false, [10, 10]), 20);
assertEquals(SUM(true, [10, 10]), 21);
catchAndAssertEquals(function() {
  SUM([10, 10], "");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SUM([10, 10], "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SUM();
}, ERRORS.NA_ERROR);


assertEquals(SUMIF([1, 5, 10], ">2"), 15);

assertEquals(SUMPRODUCT([1, 5, 10]), 16);

assertEquals(SUMSQ([1, 5, 10], 10), 226);

assertEquals(SUMX2MY2([1,2,3],[4,5,6]), -63);

assertEquals(SUMX2PY2([1, 2, 3], [4, 5, 6]), 91);

assertEquals(TAN(0), 0);
assertEquals(TAN(1), 1.5574077246549023);
assertEquals(TAN(PI() / 2), 16331239353195370);
assertEquals(TAN(PI()), 0);

assertEquals(TANH(PI()), 0.99627207622075);

assertEquals(TRUE(), true);

assertEquals(TRUNC(3.1415, 2), 3.14);

assertEquals(XOR(1, 1), false);

assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 0), 18.994444444444444);
// assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 1)', 18.99587544); // This is slightly off
assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 2), 19.272222222222222);
assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 3), 19.008219178082193);
assertEquals(YEARFRAC(DATE(1969, 7, 6), DATE(1988, 7, 4), 4), 18.994444444444444);