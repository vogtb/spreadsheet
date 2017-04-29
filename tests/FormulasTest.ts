import { ABS, ACOS, ACOSH, ACOTH, ARABIC, ASIN, ASINH, ATAN, ATAN2, ATANH, AVEDEV, AVERAGE,
    AVERAGEA, AVERAGEIF, CEILING,
    CHAR, CODE, COMBIN, CONCATENATE, CONVERT, PEARSON,
    CORREL, COS, PI, COSH, COT, COTH, COUNT, COUNTA, COUNTIF, COUNTIFS, COUNTUNIQUE,
    DEGREES, DEVSQ,
    ERF, ERFC, EVEN, EXPONDIST, FINV, FLOOR, __COMPLEX, FISHER, FISHERINV, IF,
    INT, ISEVEN, ISODD, LN, LOG, LOG10, MAX, MAXA, MEDIAN, MIN, MINA, MOD, ODD,
    POWER, ROUND, ROUNDDOWN, ROUNDUP, SIN, SINH, SPLIT, SQRT, SQRTPI, SUM, SUMIF, SUMPRODUCT, RADIANS,
    SUMSQ, SUMX2MY2, SUMX2PY2, TAN, TANH, TRUNC } from "../src/RawFormulas/RawFormulas";
import * as ERRORS from "../src/Errors"
import {assertEquals, assertArrayEquals} from "./utils/Asserts"

function catchAndAssertEquals(toExecute, expected) {
  var toThrow = null;
  try {
    toExecute();
    toThrow = true;
  } catch (actualError) {
    if (actualError.name != expected) {
      console.log(expected, "not equal to", actualError.name);
    }
  }
  if (toThrow) {
    throw new Error("expected error: " + expected);
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
  AVEDEV(10, 10, []);
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


// Test AVERAGEIF
assertEquals(AVERAGEIF([1, 5, 10], '>2'), 7.5);
assertEquals(AVERAGEIF([1, 5, 10], ">4"), 7.5);
assertEquals(AVERAGEIF([1, 2, 2, 2, 2, 2, 2, 2], ">1"), 2);
assertEquals(AVERAGEIF([1, 5, 10], 5), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], 5), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], 10), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">5"), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=5"), 5);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=10"), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "=     10  "), 10);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">0"), 5.166666666666667);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">=5"), 6);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "<>1"), 6);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "<10"), 4.2);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5, 44], "<=10"), 5.166666666666667);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], ">4.99"), 6);
assertEquals(AVERAGEIF([1, 5, 5, 5, 10, 5], "<4.99"), 1);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "=     1.0.0  ");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "=>5");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  AVERAGEIF([1, 5, 5, 5, 10, 5], "==5");
}, ERRORS.DIV_ZERO_ERROR);


// Test CEILING
assertEquals(CEILING(10.1), 11);
assertEquals(CEILING("10.1"), 11);
assertEquals(CEILING(10.11111111, 0.1), 10.2);
assertEquals(CEILING(10.22222222, 0.1), 10.3);
assertEquals(CEILING(10.33333333, 0.2), 10.4);
assertEquals(CEILING(10.33333333, 0.1), 10.4);
assertEquals(CEILING([10.33333333], 0.1), 10.4);
assertEquals(CEILING(10.22222222, 5), 15);
assertEquals(CEILING(10.22222222, 8), 16);
assertEquals(CEILING(10.22222222, true), 11);
catchAndAssertEquals(function() {
  CEILING(10, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CEILING(10, 1, 2);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CEILING();
}, ERRORS.NA_ERROR);

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


// Test COMBIN
assertEquals(COMBIN(4, 2), 6);
assertEquals(COMBIN(4.999, 2.888), 6);
assertEquals(COMBIN([4, "str"], [2]), 6);
assertEquals(COMBIN(0, 0), 1);
catchAndAssertEquals(function() {
  COMBIN(2, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COMBIN(2, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  COMBIN(2, 4);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  COMBIN(0, 1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  COMBIN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COMBIN(4);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COMBIN(4, 2, 66);
}, ERRORS.NA_ERROR);



// Test CONCATENATE
assertEquals(CONCATENATE("hey", " ", "there"), "hey there");
assertEquals(CONCATENATE(["hey", " ", "there"]), "hey there");
assertEquals(CONCATENATE("hey"), "hey");
assertEquals(CONCATENATE("hey", 2), "hey2");
assertEquals(CONCATENATE("hey", false), "heyFALSE");
assertEquals(CONCATENATE([22, 14, "m", false]), "2214mFALSE");
assertEquals(CONCATENATE([22, 14, ["m", false]]), "2214mFALSE");
catchAndAssertEquals(function() {
  CONCATENATE();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CONCATENATE("10", 4, false, []);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  CONCATENATE([]);
}, ERRORS.REF_ERROR);

assertEquals(CONVERT(5.1, "mm", "m"), 0.0050999999999999995);


// Test CORREL
assertEquals(CORREL([9, 5],[10, 4]), 1);
assertEquals(CORREL([10, 5, 16],[9, 3, 22]), 0.9876779373054069);
catchAndAssertEquals(function() {
  CORREL(5, 5);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, true], [5, true]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, "10"], [5, "10"]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL([9], [5]);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  CORREL();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, 5]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  CORREL([9, 5],[10]);
}, ERRORS.NA_ERROR);


// Test PEARSON (same as CORREL)
assertEquals(PEARSON([9, 5],[10, 4]), 1);


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


// Test COT
assertEquals(COT(30), -0.15611995216165922);
assertEquals(COT(1), 0.6420926159343306);
assertEquals(COT(true), 0.6420926159343306);
assertEquals(COT([1, "str"]), 0.6420926159343306);
catchAndAssertEquals(function() {
  COT(false);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COT(0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COT("");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COT("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COT(1, 1);
}, ERRORS.NA_ERROR);


// Test COTH
assertEquals(COTH(30), 1);
assertEquals(COTH(1), 1.3130352854993315);
assertEquals(COTH(true), 1.3130352854993315);
assertEquals(COTH([1, "str"]), 1.3130352854993315);
assertEquals(COTH(-1), -1.3130352854993315);
catchAndAssertEquals(function() {
  COTH(false);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COTH(0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COTH("");
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  COTH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  COTH();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COTH(1, 1);
}, ERRORS.NA_ERROR);


// Test COUNT
assertEquals(COUNT([1, 5, 10, 0]), 4);
assertEquals(COUNT(1, 5, 10, 0), 4);
assertEquals(COUNT(1, 5, 10, "0"), 4);
assertEquals(COUNT(1, 5, 10, ["0", "str"]), 4);
assertEquals(COUNT(1, 5, 10, false), 4);
assertEquals(COUNT(1, 5, 10, true), 4);
assertEquals(COUNT([]), 0);
assertEquals(COUNT(["str"]), 0);
catchAndAssertEquals(function() {
  COUNT();
}, ERRORS.NA_ERROR);


// Test COUNTA
assertEquals(COUNTA(1, 2, 3), 3);
assertEquals(COUNTA(0, 1, 2, 3), 4);
assertEquals(COUNTA(0, 1, 2, 3, [], []), 6);
assertEquals(COUNTA(0, 1, 2, 3, [], ""), 6);
assertEquals(COUNTA(1, 2, "3"), 3);
assertEquals(COUNTA(1, 2, "3", ["str"]), 4);
assertEquals(COUNTA(1, 2, false), 3);
assertEquals(COUNTA(1, 2, true), 3);
assertEquals(COUNTA([]), 1);
catchAndAssertEquals(function() {
  COUNTA();
}, ERRORS.NA_ERROR);


// Test COUNTIF
assertEquals(COUNTIF([1, 5, 10], ">4"), 2);
assertEquals(COUNTIF([1, 2, 2, 2, 2, 2, 2, 2], ">1"), 7);
assertEquals(COUNTIF([1, 5, 10], 5), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], 5), 4);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], 10), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">5"), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=5"), 4);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=10"), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=     10  "), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">0"), 6);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">=5"), 5);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "<10"), 5);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5, 44], "<=10"), 6);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">4.99"), 5);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "<4.99"), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=     1.0.0  "), 0);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=>5"), 0);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "==5"), 0);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "boom"], "*o*"), 3);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "mom"), 2);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "?o?"), 3);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "???"), 5);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "????"), 0);
assertEquals(COUNTIF(["mom", "pop", "dad", "etc", "mom"], "?"), 0);
// dollar sign and negative values
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=$5"), 4);
assertEquals(COUNTIF([1, -5, -5, -5, 10, -5], "=-$5"), 4);
assertEquals(COUNTIF([1, -5, -5, -5, 10, -5], "=-5"), 4);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], ">$5"), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=$10"), 1);
assertEquals(COUNTIF([1, 5, 5, 5, 10, 5], "=  $ 10"), 1);
catchAndAssertEquals(function() {
  COUNTIF([0, 1, 0, 1]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COUNTIF();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  COUNTIF([], "=1", []);
}, ERRORS.NA_ERROR);


// Test COUNTIFS
// All COUNTIF tests should also work on COUNTIFS
assertEquals(COUNTIFS([1, 5, 10], ">4"), 2);
assertEquals(COUNTIFS([1, 2, 2, 2, 2, 2, 2, 2], ">1"), 7);
assertEquals(COUNTIFS([1, 5, 10], 5), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], 5), 4);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], 10), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], ">5"), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=5"), 4);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=10"), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=     10  "), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], ">0"), 6);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], ">=5"), 5);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "<10"), 5);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5, 44], "<=10"), 6);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], ">4.99"), 5);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "<4.99"), 1);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=     1.0.0  "), 0);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "=>5"), 0);
assertEquals(COUNTIFS([1, 5, 5, 5, 10, 5], "==5"), 0);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "boom"], "*o*"), 3);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "mom"), 2);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "?o?"), 3);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "???"), 5);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "????"), 0);
assertEquals(COUNTIFS(["mom", "pop", "dad", "etc", "mom"], "?"), 0);
// Now actually test COUNTIFS
assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1"), 2);
assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1"), 2);
assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1", [0, 0, 1, 1], "=1"), 2);
assertEquals(COUNTIFS([1, 5, 10, 20, 40], ">4", [0, 0, 1, 1, 1], "=1", [0, 0, 0, 0, 0], "=1"), 0);
assertEquals(COUNTIFS([1, 2, 3, 4], ">3", [true, true, false, true], true), 1);
catchAndAssertEquals(function() {
  COUNTIFS([1, 5, 10, 20], ">4", [0, 0], "=1");
}, ERRORS.VALUE_ERROR);


// Test COUNTUNIQUE
assertEquals(COUNTUNIQUE([1, 1, 10]), 2);
assertEquals(COUNTUNIQUE(["1", 1, 10]), 3);
assertEquals(COUNTUNIQUE(["1", 1, 10, ""]), 4);
assertEquals(COUNTUNIQUE(["1", 1, 10, "", ""]), 4);
assertEquals(COUNTUNIQUE(["1", 1, 10, "", " "]), 5);
assertEquals(COUNTUNIQUE(["1", 1, 10, []]), 4);
assertEquals(COUNTUNIQUE(["", " ", [""], []]), 2);
assertEquals(COUNTUNIQUE([[""], []]), 1);
catchAndAssertEquals(function() {
  COUNTUNIQUE();
}, ERRORS.NA_ERROR);


// Test DEGREES
assertEquals(DEGREES(PI()), 180);
assertEquals(DEGREES([PI(), "str"]), 180);
assertEquals(DEGREES(false), 0);
assertEquals(DEGREES(true), 57.29577951308232);
assertEquals(DEGREES(1), 57.29577951308232);
assertEquals(DEGREES(12), 687.5493541569879);
catchAndAssertEquals(function() {
  DEGREES("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DEGREES();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEGREES(10, 10);
}, ERRORS.NA_ERROR);


// Test DEVSQ
assertEquals(DEVSQ(1, 2), 0.5);
assertEquals(DEVSQ([1, 2]), 0.5);
assertEquals(DEVSQ([1, [2]]), 0.5);
assertEquals(DEVSQ(1), 0);
assertEquals(DEVSQ(false), 0);
assertEquals(DEVSQ(true), 0);
assertEquals(DEVSQ(1, 2, 3, 4), 5);
assertEquals(DEVSQ([1, 2, 3, 4]), 5);
catchAndAssertEquals(function() {
  DEVSQ(1, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DEVSQ();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  DEVSQ([1, 2, [], 3]);
}, ERRORS.REF_ERROR);


// Test ERF
assertEquals(ERF(2), 0.9953222650189527);
assertEquals(ERF("2"), 0.9953222650189527);
assertEquals(ERF(0), 1.1102230246251565e-16);
assertEquals(ERF(1), 0.8427007929497149);
assertEquals(ERF(true), 0.8427007929497149);
assertEquals(ERF(false), 1.1102230246251565e-16);
catchAndAssertEquals(function() {
  ERF();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ERF([]);
}, ERRORS.REF_ERROR);
assertEquals(ERF(1, 2), 0.15262147206923782);
assertEquals(ERF(2, 1), -0.15262147206923782);


// Test ERFC
assertEquals(ERFC(2), 0.004677734981047288);
assertEquals(ERFC("2"), 0.004677734981047288);
assertEquals(ERFC(0), 1);
assertEquals(ERFC(1), 0.1572992070502851);
assertEquals(ERFC(-1), 1.842700792949715);
assertEquals(ERFC(-10), 2);
catchAndAssertEquals(function() {
  ERFC();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ERFC([]);
}, ERRORS.REF_ERROR);



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


// Test EXPONDIST
assertEquals(EXPONDIST(4, 0.5, false), 0.06766764161830635);
assertEquals(EXPONDIST(4, 0.5, 0), 0.06766764161830635);
assertEquals(EXPONDIST(4, 0.5, true), 0.8646647167633873);
assertEquals(EXPONDIST(4, 0.5, 1), 0.8646647167633873);
assertEquals(EXPONDIST(4, 0.5, -1), 0.8646647167633873);
assertEquals(EXPONDIST([4, "str"], ["0.5"], [false]), 0.06766764161830635);
catchAndAssertEquals(function() {
  EXPONDIST("str", 0.5, "1");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5, "1");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  EXPONDIST(4, 0.5, true, 1);
}, ERRORS.NA_ERROR);


// Test F.DIST
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, false), 0.0003451054686025578);
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, true), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, 7, 6, 1), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, "7", [6], 1), 0.9980694465675269);
assertEquals(__COMPLEX["F.DIST"](15.35, "7", [6], 10), 0.9980694465675269);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](15.35, 7, 6, "10");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](-15.35, 7, 6, 1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"](15.35, 7, 6);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  __COMPLEX["F.DIST"]();
}, ERRORS.NA_ERROR);


// Test FINV
assertEquals(FINV(0.42, 2, 3), 1.174597274485816);


// Test FISHER
assertEquals(FISHER(0.962), 1.972066740199461);
assertEquals(FISHER([0.962]), 1.972066740199461);
assertEquals(FISHER("0.962"), 1.972066740199461);
assertEquals(FISHER(0), 0);
assertEquals(FISHER(false), 0);
assertEquals(FISHER(0.92), 1.589026915173973);
catchAndAssertEquals(function() {
  FISHER("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  FISHER(1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  FISHER(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  FISHER();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  FISHER(0.55, 0.1);
}, ERRORS.NA_ERROR);


// Test FISHERINV
assertEquals(FISHERINV(0.962), 0.7451676440945232);
assertEquals(FISHERINV(0.962), 0.7451676440945232);
assertEquals(FISHERINV([0.962]), 0.7451676440945232);
assertEquals(FISHERINV("0.962"), 0.7451676440945232);
assertEquals(FISHERINV(0), 0);
assertEquals(FISHERINV(false), 0);
assertEquals(FISHERINV(true), 0.761594155955765);
assertEquals(FISHERINV(0.92), 0.7258974148490807);
catchAndAssertEquals(function() {
  FISHER("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  FISHER();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  FISHER(0.55, 0.1);
}, ERRORS.NA_ERROR);


// Test FLOOR
assertEquals(FLOOR(10.1), 10);
assertEquals(FLOOR("10.1"), 10);
assertEquals(FLOOR(10.11111111, 0.1), 10.1);
assertEquals(FLOOR(10.22222222, 0.1), 10.2);
assertEquals(FLOOR(10.33333333, 0.2), 10.2);
assertEquals(FLOOR(10.33333333, 0.1), 10.3);
assertEquals(FLOOR([10.33333333], 0.1), 10.3);
assertEquals(FLOOR(10.22222222, 5), 10);
assertEquals(FLOOR(10.22222222, 8), 8);
assertEquals(FLOOR(10.22222222, true), 10);
catchAndAssertEquals(function() {
  FLOOR(10, 0);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  FLOOR(10, 1, 2);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  FLOOR();
}, ERRORS.NA_ERROR);


// Test IF
assertEquals(IF(true, "hit", "miss"), "hit");
assertEquals(IF(false, "hit", "miss"), "miss");
assertEquals(IF("", "hit", "miss"), "miss");
assertEquals(IF("", "hit", "miss"), "miss");
assertEquals(IF([true], "hit", "miss"), "hit");
assertEquals(IF([false], "hit", "miss"), "miss");
assertEquals(IF([""], "hit", "miss"), "miss");
assertEquals(IF([""], "hit", "miss"), "miss");
catchAndAssertEquals(function() {
  IF("str", 1, 2);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  IF([], 1, 2);
}, ERRORS.REF_ERROR);


// Test INT
assertEquals(INT(99.33), 99);
assertEquals(INT(99.99), 99);
assertEquals(INT(true), 1);
assertEquals(INT(false), 0);
assertEquals(INT(""), 0);
assertEquals(INT([1.1, "str"]), 1);
catchAndAssertEquals(function() {
  INT(100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  INT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  INT("str");
}, ERRORS.VALUE_ERROR);


// Test ISEVEN
assertEquals(ISEVEN(4), true);
assertEquals(ISEVEN(3), false);
assertEquals(ISEVEN(4.1), true);
assertEquals(ISEVEN(false), true);
assertEquals(ISEVEN(true), false);
assertEquals(ISEVEN([4]), true);
catchAndAssertEquals(function() {
  ISEVEN(100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ISEVEN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ISEVEN("");
}, ERRORS.VALUE_ERROR);


// Test ISODD
assertEquals(ISODD(4), false);
assertEquals(ISODD(3), true);
assertEquals(ISODD(4.1), false);
assertEquals(ISODD(false), false);
assertEquals(ISODD(true), true);
assertEquals(ISODD([4]), false);
catchAndAssertEquals(function() {
  ISODD(100, 10);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ISODD();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ISODD("");
}, ERRORS.VALUE_ERROR);


// Test LN
assertEquals(LN(100), 4.605170185988092);
assertEquals(LN("100"), 4.605170185988092);
assertEquals(LN(1), 0);
assertEquals(LN(true), 0);
catchAndAssertEquals(function() {
  LN(false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LN("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  LN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  LN(10, 10);
}, ERRORS.NA_ERROR);


// Test LOG
assertEquals(LOG(256, 2), 8);
assertEquals(LOG(100), 2);
assertEquals(LOG(100), 2);
assertEquals(LOG(256, 10), 2.408239965311849);
assertEquals(LOG(256), 2.408239965311849);
assertEquals(LOG("100"), 2);
assertEquals(LOG(1, 2), 0);
catchAndAssertEquals(function() {
  LOG("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  LOG(256, 0);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LOG(256, 1);
}, ERRORS.DIV_ZERO_ERROR);
catchAndAssertEquals(function() {
  LOG(256, false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LOG(256, true);
}, ERRORS.DIV_ZERO_ERROR);


// Test LOG10
assertEquals(LOG10(100), 2);
assertEquals(LOG10("100"), 2);
assertEquals(LOG10(1), 0);
assertEquals(LOG10(10.1), 1.0043213737826424);
catchAndAssertEquals(function() {
  LOG10(false);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LOG10("");
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  LOG10("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  LOG10();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  LOG10(10, 10);
}, ERRORS.NA_ERROR);


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
assertEquals(MEDIAN(false), 0);
assertEquals(MEDIAN(1, 1, 2, 6, 6, 9, 5), 5);
assertEquals(MEDIAN(6, 6, 1, 1, 2, 9), 4);
assertEquals(MEDIAN(1, 1, 2, [5, 6, 6, 9]), 5);
catchAndAssertEquals(function() {
  MEDIAN(1, 1, 2, 5, "mmm", 6, 6, 9);
}, ERRORS.VALUE_ERROR);
assertEquals(MEDIAN(1, 1, 2, [5, "mmm", 6, 6, 9]), 5);
assertEquals(MEDIAN(1, 1, 2, ["mm"]), 1);
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


// Test PI
assertEquals(PI(), 3.141592653589793);


// Test POWER
assertEquals(POWER(4, 10), 1048576);
assertEquals(POWER(4, false), 1);
assertEquals(POWER(4, true), 4);
assertEquals(POWER([4], [10]), 1048576);
assertEquals(POWER([4], [10, "str"]), 1048576);
catchAndAssertEquals(function() {
  POWER(4, "str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  POWER();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  POWER(4);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  POWER(4, 10, 22);
}, ERRORS.NA_ERROR);


// Test RADIANS
assertEquals(RADIANS(180), 3.141592653589793);
assertEquals(RADIANS(false), 0);
assertEquals(RADIANS(true), 0.017453292519943295);
catchAndAssertEquals(function() {
  RADIANS("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  RADIANS();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  RADIANS(4, 10);
}, ERRORS.NA_ERROR);


// Test ROUND
assertEquals(ROUND(99.44, 1), 99.4);
assertEquals(ROUND(99.44, 0), 99);
assertEquals(ROUND(99.4444444444444, 9), 99.444444444);
assertEquals(ROUND(99.44), 99);
assertEquals(ROUND("99.44"), 99);
assertEquals(ROUND([99.44, 22.222], [1, 4]), 99.4);
catchAndAssertEquals(function() {
  ROUND();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUND(99.44, 1, 44);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUND(99.999, "str");
}, ERRORS.VALUE_ERROR);


// Test ROUNDDOWN
assertEquals(ROUNDDOWN(99.46, 1), 99.4);
assertEquals(ROUNDDOWN(99.99, 1), 99.9);
assertEquals(ROUNDDOWN(99.5555555555555, 9), 99.555555555);
assertEquals(ROUNDDOWN(99.99), 99);
assertEquals(ROUNDDOWN("99.99"), 99);
assertEquals(ROUNDDOWN([99.46666, 22.222], [1, 4]), 99.4);
catchAndAssertEquals(function() {
  ROUNDDOWN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUNDDOWN(99.44, 1, 44);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUNDDOWN(99.999, "str");
}, ERRORS.VALUE_ERROR);


// Test ROUNDUP
assertEquals(ROUNDUP(99.46, 1), 99.5);
assertEquals(ROUNDUP(99.99, 1), 100);
assertEquals(ROUNDUP(99.5555555555555, 9), 99.555555556);
assertEquals(ROUNDUP(99.99), 100);
assertEquals(ROUNDUP("99.99"), 100);
assertEquals(ROUNDUP([99.46666, 22.222], [1, 4]), 99.5);
catchAndAssertEquals(function() {
  ROUNDUP();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUNDUP(99.44, 1, 44);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  ROUNDUP(99.999, "str");
}, ERRORS.VALUE_ERROR);


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


// Test SPLIT
assertArrayEquals(SPLIT("1,2,3", ","), ['1', '2', '3']);
assertArrayEquals(SPLIT("little kitty cat", "i"), ['l', 'ttle k', 'tty cat']);
assertArrayEquals(SPLIT("father sister berzerker", "er", true), ['fath', ' sist', ' b', 'z', 'k']);
assertArrayEquals(SPLIT("father sister berzerker", "er", [true]), ['fath', ' sist', ' b', 'z', 'k']);
assertArrayEquals(SPLIT("father  sister   berzerker", "er", true), ['fath', '  sist', '   b', 'z', 'k']);
assertArrayEquals(SPLIT(["father sister berzerker"], ["er"], true), ['fath', ' sist', ' b', 'z', 'k']);
catchAndAssertEquals(function() {
  SPLIT([], "er");
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SPLIT("er", "er", true, 10);
}, ERRORS.NA_ERROR);


// Test SQRT
assertEquals(SQRT(9), 3);
assertEquals(SQRT("9"), 3);
assertEquals(SQRT(4), 2);
assertEquals(SQRT(false), 0);
assertEquals(SQRT(true), 1);
assertEquals(SQRT(""), 0);
catchAndAssertEquals(function() {
  SQRT("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SQRT(-9);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SQRT();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SQRT(4, 4);
}, ERRORS.NA_ERROR);


// Test SQRTPI
assertEquals(SQRTPI(9), 5.317361552716548);
assertEquals(SQRTPI("9"), 5.317361552716548);
assertEquals(SQRTPI([9]), 5.317361552716548);
assertEquals(SQRTPI(0), 0);
assertEquals(SQRTPI(1), 1.7724538509055159);
assertEquals(SQRTPI(""), 0);
catchAndAssertEquals(function() {
  SQRTPI("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SQRTPI(-1);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  SQRTPI();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SQRTPI(4, 4);
}, ERRORS.NA_ERROR);


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


// Test SUMIF
assertEquals(SUMIF([1, 5, 10], 5), 5);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], 5), 20);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], 10), 10);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], ">5"), 10);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=5"), 20);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=1"), 1);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=     1  "), 1);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], ">0"), 31);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], ">=5"), 30);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "<10"), 21);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5, 44], "<=10"), 31);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], ">4.99"), 30);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "<4.99"), 1);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=     1.0.0  "), 0);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "=>5"), 0);
assertEquals(SUMIF([1, 5, 5, 5, 10, 5], "==5"), 0);
assertEquals(SUMIF(["m", "m", 3, 11, true], "m"), 0);
assertEquals(SUMIF(["m", "p", "m"], "m", [1, 1, 1]), 2);
assertEquals(SUMIF(["p", "p", "p"], "m", [1, 1, 1]), 0);
assertEquals(SUMIF(["p", "p", "p"], "", [1, 1, 1]), 0);
assertEquals(SUMIF(["p", "p", "p"], "*", [1, 1, 1]), 3);
assertEquals(SUMIF(["mom", "pop", "pap"], "*o*", [1, 1, 1]), 2);
assertEquals(SUMIF(["mom", "pop", "pap"], "*a*", [1, 1, 1]), 1);
assertEquals(SUMIF(["mom", "pop", "pap"], "p*p", [1, 1, 1]), 2);
assertEquals(SUMIF(["mom", "pop", "pap"], "p*p", [1, 1, 1]), 2);
assertEquals(SUMIF(["mom", "pop", "pap"], "p*p", [1, 1,]), 1);
assertEquals(SUMIF(["pop", "pap"], "p*p", [1, 2, 4]), 3);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "boom"], "*o*", [1, 1, 1, 1, 1]), 3);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "mom"], "mom", [1, 1, 1, 1, 1]), 2);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "mom"], "?o?", [1, 1, 1, 1, 1]), 3);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "mom"], "???", [1, 1, 1, 1, 1]), 5);
assertEquals(SUMIF(["mom", "pop", "dad", "etc", "mom"], "????", [1, 1, 1, 1, 1]), 0);
assertEquals(SUMIF([0, 1, 0, 1], "=1", [1, 2, 4, 8]), 10);
catchAndAssertEquals(function() {
  SUMIF([0, 1, 0, 1]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SUMIF();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SUMIF([], "=1", [], true);
}, ERRORS.NA_ERROR);


// Test SUMPRODUCT
assertEquals(SUMPRODUCT([1, 5, 10], [2, 2, 2]), 32);
assertEquals(SUMPRODUCT([1, 5, 10], [2, 2, 2], [2, 2, 2]), 64);
assertEquals(SUMPRODUCT([1, 5, 10], [1, 2, 2], [1, 4, 4]), 121);
assertEquals(SUMPRODUCT([1, 5, 10]), 16);
assertEquals(SUMPRODUCT([1, 5, 10, ""]), 16);
assertEquals(SUMPRODUCT([1, 5, 10, 200], [2, 2, 2, ""]), 32);
assertEquals(SUMPRODUCT([1, 5, 10, "str"]), 16);
assertEquals(SUMPRODUCT([10, 10, 22, "str"], [2, 2, [2, 2]]), 84);
assertEquals(SUMPRODUCT(1, 5, 10), 50);
assertEquals(SUMPRODUCT([1, 5, 10]), 16);
catchAndAssertEquals(function() {
  SUMPRODUCT([1, 5, 10], [2, 2]);
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  SUMPRODUCT([1, 5, 10], [2, 2, 2, []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMPRODUCT();
}, ERRORS.NA_ERROR);



// Test SUMSQ
assertEquals(SUMSQ([1, 5, 10], 10), 226);
assertEquals(SUMSQ([10, 10, 22, ""]), 684);
assertEquals(SUMSQ(10, 10, 22), 684);
assertEquals(SUMSQ(10, 10, "22", true), 685);
assertEquals(SUMSQ(10, 10, "22", false), 684);
assertEquals(SUMSQ([10, 10, 22, true]), 684);
catchAndAssertEquals(function() {
  SUMSQ([10, 10, 22, "", []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMSQ([]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMSQ();
}, ERRORS.NA_ERROR);


// Test SUMX2MY2
assertEquals(SUMX2MY2([1,2,3],[4,5,6]), -63);
assertEquals(SUMX2MY2([1, 2, 3], [[4, 5], [6]]), -63);
assertEquals(SUMX2MY2(["1",2,3],[4,5,6]), -48);
assertEquals(SUMX2MY2(["",2,3],[4,5,6]), -48);
assertEquals(SUMX2MY2([false,2,3],[4,5,6]), -48);
assertEquals(SUMX2MY2([true,2,3],[4,5,6]), -48);
catchAndAssertEquals(function() {
  SUMX2MY2([1,2,3],[4,5, []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMX2MY2([1,2,3],[4,5]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SUMX2MY2();
}, ERRORS.NA_ERROR);


// Test SUMX2PY2
assertEquals(SUMX2PY2([1, 2, 3], [4, 5, 6]), 91);
assertEquals(SUMX2PY2([1, 2, 3], [[4, 5], [6]]), 91);
assertEquals(SUMX2PY2(["1",2,3],[4,5,6]), 74);
assertEquals(SUMX2PY2(["",2,3],[4,5,6]), 74);
assertEquals(SUMX2PY2([false,2,3],[4,5,6]), 74);
assertEquals(SUMX2PY2([true,2,3],[4,5,6]), 74);
catchAndAssertEquals(function() {
  SUMX2PY2([1,2,3],[4,5, []]);
}, ERRORS.REF_ERROR);
catchAndAssertEquals(function() {
  SUMX2PY2([1,2,3],[4,5]);
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  SUMX2PY2();
}, ERRORS.NA_ERROR);


// Test TAN
assertEquals(TAN(0), 0);
assertEquals(TAN(1), 1.5574077246549023);
assertEquals(TAN(PI() / 2), 16331239353195370);
assertEquals(TAN(PI()), 0);
assertEquals(TAN(false), 0);
assertEquals(TAN(true), 1.5574077246549023);
assertEquals(TAN(""), 0);
assertEquals(TAN("0"), 0);
catchAndAssertEquals(function() {
  TAN("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  TAN();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  TAN(1, 1);
}, ERRORS.NA_ERROR);
assertEquals(TAN([1, 44]), 1.5574077246549023);
assertEquals(TAN([1, "str"]), 1.5574077246549023);


// Test TANH
assertEquals(TANH(0), 0);
assertEquals(TANH(1), 0.7615941559557649);
assertEquals(TANH(PI() / 2), 0.9171523356672744);
assertEquals(TANH(PI()), 0.9962720762207501);
assertEquals(TANH(false), 0);
assertEquals(TANH(true), 0.7615941559557649);
assertEquals(TANH(""), 0);
assertEquals(TANH("0"), 0);
catchAndAssertEquals(function() {
  TANH("str");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  TANH();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  TANH(1, 1);
}, ERRORS.NA_ERROR);
assertEquals(TANH([1, 44]), 0.7615941559557649);
assertEquals(TANH([1, "str"]), 0.7615941559557649);


// Test TRUNC
assertEquals(TRUNC(PI(), 2), 3.14);
assertEquals(TRUNC("3.141592653589793", "2"), 3.14);
assertEquals(TRUNC(PI(), 1), 3.1);
assertEquals(TRUNC(PI(), 0), 3);
assertEquals(TRUNC(PI(), false), 3);
assertEquals(TRUNC(PI(), -1), 0);
assertEquals(TRUNC(31.41592653589793, -1), 30);
assertEquals(TRUNC([31.41592653589793], [-1]), 30);
assertEquals(TRUNC(31111.41592653589793, -4), 30000);
assertEquals(TRUNC(31111.41592653589793, -2), 31100);
catchAndAssertEquals(function() {
  TRUNC();
}, ERRORS.NA_ERROR);
catchAndAssertEquals(function() {
  TRUNC(3.1, 1, 1);
}, ERRORS.NA_ERROR);
