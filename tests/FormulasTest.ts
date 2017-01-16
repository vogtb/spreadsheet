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
    SUMSQ, SUMX2MY2, SUMX2PY2, TAN, TANH, TRUNC, XOR, YEARFRAC } from "../src/RawFormulas"
import * as ERRORS from "../src/Errors"
import {assertEquals, assertEqualsDates, assertArrayEquals} from "./utils/Asserts"

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
  return ABS();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  return ABS("str");
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
  return ACOS("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  return ACOS(2);
}, ERRORS.NUM_ERROR);


// Test ACOSH
assertEquals(ACOSH(22), 3.783672704329451);
assertEquals(ACOSH(1), 0);
assertEquals(ACOSH("11"), 3.0889699048446033);
catchAndAssertEquals(function() {
  return ACOSH(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  return ACOSH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  return ACOSH(false);
}, ERRORS.NUM_ERROR);


// Test ACOTH
assertEquals(ACOTH(22), 0.04548588910286339);
assertEquals(ACOTH(-1.1), -1.522261218861711);
assertEquals(ACOTH("-22"), -0.04548588910286338);
catchAndAssertEquals(function() {
  return ACOTH(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  return ACOTH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  return ACOTH(false);
}, ERRORS.NUM_ERROR);


// Test AND
assertEquals(AND(10, 10), true);
assertEquals(AND(10, 0), false);
assertEquals(AND(10, false), false);
assertEquals(AND(0, 0), false);
catchAndAssertEquals(function() {
  return AND(1, "");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  return AND();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  return AND(1, "str");
}, ERRORS.VALUE_ERROR);
assertEquals(AND(0, [1, 1]), false);
assertEquals(AND(1, [1, 1]), true);
catchAndAssertEquals(function() {
  return AND(1, [1, "str"]);
}, ERRORS.VALUE_ERROR);


assertEquals(ARABIC("XIV"), 14);

assertEquals(ASIN(0.1), 0.1001674211615598);

assertEquals(ASINH(0.1), 0.09983407889920758);

assertEquals(ATAN(0.1), 0.09966865249116204);

assertEquals(ATAN2(4, 3), 0.6435011087932844);

assertEquals(ATANH(0.44), 0.47223080442042564);

assertEquals(AVEDEV(1, 2, 4, 56.7), 20.3875);

assertEquals(AVERAGE(10, 20, 4.1), 11.366666666666667);

assertEquals(AVERAGEA(10, 20, 4.1), 11.366666666666667);

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

assertEquals(CHAR(97), "a");

assertEquals(CODE('a'), 97);

assertEquals(COMBIN(4, 2), 6);

assertEquals(COMBINA(4, 3), 20);

assertEquals(COMPLEX(3, 4), '3+4i');

assertEquals(CONCATENATE("hey", " ", "there"), "hey there");

assertEquals(CONVERT(5.1, "mm", "m"), 0.0050999999999999995);

assertEquals(CORREL([9, 5],[10, 4]), 1);

assertEquals(COS(PI()), -1);

assertEquals(COSH(PI()), 11.591953275521522);

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

assertEquals(EVEN(3), 4);

assertEquals(EXACT("m", "M"), false);

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

assertEquals(MAX(100, 22), 100);

assertEquals(MAXA(100, 22, 44), 100);

assertEquals(MEDIAN(100, 22, 54), 54);

assertEquals(MIN(100, 22, 44), 22);

assertEquals(MINA(100, 22, 44), 22);

assertEquals(MOD(10, 3), 1);

assertEquals(NOT(TRUE()), false);

assertEquals(ODD(2), 3);

assertEquals(OR(true, false), true);

assertEquals(PI(), 3.141592653589793);

assertEquals(POWER(4, 10), 1048576);

assertEquals(ROUND(99.44, 1), 99.4);

assertEquals(ROUNDDOWN(99.46, 1), 99.4);

assertEquals(ROUNDUP(99.46, 1), 99.5);

assertEquals(SIN(0), 0);
assertEquals(SIN(1), 0.8414709848078965);
assertEquals(SIN(PI() / 2), 1);
assertEquals(SIN(PI()), 0);

assertEquals(SINH(PI()), 11.548739357257752);

assertArrayEquals(SPLIT("1,2,3", ",", true), [ '1', '2', '3' ]);

assertEquals(SQRT(9), 3);

assertEquals(SQRTPI(9), 5.317361552716548);

assertEquals(SUM(10, 10), 20);

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