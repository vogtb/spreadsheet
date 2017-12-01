import {
  ABS,
  ACOS,
  ACOSH,
  ACOTH,
  ASIN,
  ASINH,
  ATAN,
  ATAN2,
  ATANH,
  COT,
  COTH,
  COSH,
  COS,
  COUNTUNIQUE,
  EVEN,
  ERF,
  ERFC,
  INT,
  ISEVEN,
  ISODD,
  MULTIPLY,
  MOD,
  ODD,
  SIN,
  SINH,
  SUM,
  SQRT,
  SQRTPI,
  PI,
  POWER,
  LOG,
  LOG10,
  LN,
  TAN,
  TANH,
  ROUND,
  ROUNDDOWN,
  ROUNDUP,
  SUMPRODUCT,
  SUMIF,
  SUMSQ,
  SUMX2MY2,
  SUMX2PY2,
  FLOOR,
  IF,
  COUNTIF,
  COUNTIFS,
  CEILING,
  TRUNC,
  RADIANS,
  DEGREES,
  COMBIN,
  MINUS,
  RAND,
  RANDBETWEEN,
  SIGN,
  DIVIDE,
  EQ,
  GT,
  GTE,
  LT,
  LTE,
  NE,
  GCD,
  LCM,
  GAMMALN,
  PRODUCT,
  QUOTIENT,
  UPLUS,
  UMINUS,
  MROUND,
  FACTDOUBLE,
  UNARY_PERCENT,
  MULTINOMIAL,
  SERIESSUM,
  SUBTOTAL
} from "../../src/Formulas/Math";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";


test("MROUND", function(){
  assertEquals(MROUND(4.12121, 22), 0);
  assertEquals(MROUND(10, 0), 0);
  assertEquals(MROUND(10, 2), 10);
  assertEquals(MROUND(21, 14), 28);
  catchAndAssertEquals(function() {
    MROUND.apply(this, [10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MROUND.apply(this, [10, 1, 1]);
  }, ERRORS.NA_ERROR);
});


test("FACTDOUBLE", function(){
  assertEquals(FACTDOUBLE(7), 105);
  assertEquals(FACTDOUBLE(6), 48);
  assertEquals(FACTDOUBLE(3), 3);
  catchAndAssertEquals(function() {
    FACTDOUBLE(-1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    FACTDOUBLE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FACTDOUBLE.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
});


test("GAMMALN", function(){
  assertEquals(GAMMALN(4.5), 2.453736570842444);
  assertEquals(GAMMALN(3), 0.6931471805599443);
  catchAndAssertEquals(function() {
    GAMMALN(0)
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    GAMMALN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    GAMMALN.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
});


test("LCM", function(){
  assertEquals(LCM(2, 5), 10);
  assertEquals(LCM(10, 100), 100);
  assertEquals(LCM(12, 18), 36);
  assertEquals(LCM(12, 18, 24), 72);
  catchAndAssertEquals(function() {
    LCM.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("UPLUS", function(){
  assertEquals(UPLUS(2), 2);
  assertEquals(UPLUS(false), false);
  assertEquals(UPLUS([1, 2, 3]), 1);
  assertEquals(UPLUS("hello"), "hello");
  catchAndAssertEquals(function() {
    UPLUS.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("UMINUS", function(){
  assertEquals(UMINUS(2), -2);
  assertEquals(UMINUS(-1), 1);
  assertEquals(UMINUS(false), 0);
  assertEquals(UMINUS(0), 0);
  assertEquals(UMINUS([1, 2, 3]), -1);
  catchAndAssertEquals(function() {
    UMINUS.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("PRODUCT", function(){
  assertEquals(PRODUCT(2, 5), 10);
  assertEquals(PRODUCT(2, 5, 4, 2, 8, 1, 77, 2, 3, 1), 295680);
  assertEquals(PRODUCT(2, 5, 4, 2, 8, [1, 77, 2], 3, 1), 295680);
  assertEquals(PRODUCT(0, 1), 0);
  assertEquals(PRODUCT(8, "1992/2/2"), 269088);
  catchAndAssertEquals(function() {
    PRODUCT.apply(this, [1, [], 1]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    PRODUCT.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PRODUCT.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("QUOTIENT", function(){
  assertEquals(QUOTIENT(2, 2), 1);
  assertEquals(QUOTIENT(4, 2), 2);
  catchAndAssertEquals(function() {
    QUOTIENT(1, 0);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    QUOTIENT.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    QUOTIENT.apply(this, [1, 2, 3]);
  }, ERRORS.NA_ERROR);
});


test("GCD", function(){
  assertEquals(GCD(10, 100), 10);
  assertEquals(GCD(22, 44), 22);
  assertEquals(GCD(18, 24), 6);
  assertEquals(GCD(7, 9), 1);
  assertEquals(GCD(14, 21, 42), 7);
  catchAndAssertEquals(function() {
    GCD.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("ABS", function(){
  assertEquals(ABS(-10), 10);
  assertEquals(ABS(-10.111), 10.111);
  assertEquals(ABS(0), 0);
  assertEquals(ABS(false), 0);
  assertEquals(ABS("-44"), 44);
  catchAndAssertEquals(function() {
    ABS.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ABS.apply(this, ["str"]);
  }, ERRORS.VALUE_ERROR);
});


test("ACOS", function(){
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
  catchAndAssertEquals(function() {
    ACOS.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("ACOSH", function(){
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
  catchAndAssertEquals(function() {
    ACOSH.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("ACOTH", function(){
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
  catchAndAssertEquals(function() {
    ACOTH.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("ASIN", function(){
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
  catchAndAssertEquals(function() {
    ASIN.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("ASINH", function(){
  assertEquals(ASINH(1), 0.8813735870195429);
  assertEquals(ASINH(0), 0);
  assertEquals(ASINH("1"), 0.8813735870195429);
  assertEquals(ASINH(false), 0);
  assertEquals(ASINH(true), 0.8813735870195429);
  catchAndAssertEquals(function() {
    ASINH("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    ASINH.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("ATAN", function(){
  assertEquals(ATAN(1), 0.7853981633974483);
  assertEquals(ATAN(0), 0);
  assertEquals(ATAN("1"), 0.7853981633974483);
  assertEquals(ATAN(false), 0);
  assertEquals(ATAN(true), 0.7853981633974483);
  catchAndAssertEquals(function() {
    ATAN("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    ATAN.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("ATAN2", function(){
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
  catchAndAssertEquals(function() {
    ATAN2.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("ATANH", function(){
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
});


test("CEILING", function(){
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
    CEILING.apply(this, [10, 1, 2]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CEILING.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("COMBIN", function(){
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
    COMBIN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COMBIN.apply(this, [4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COMBIN.apply(this, [4, 2, 66]);
  }, ERRORS.NA_ERROR);
});


test("COS", function(){
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
    COS.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COS.apply(this, [1, 1]);
  }, ERRORS.NA_ERROR);
  assertEquals(COS([0, "str"]), 1);
});


test("COSH", function(){
  assertEquals(COSH(PI()), 11.591953275521522);
  assertEquals(COSH(1), 1.5430806348152437);
  assertEquals(COSH(false), 1);
  assertEquals(COSH(0), 1);
  assertEquals(COSH(true), 1.5430806348152437);
  assertEquals(COSH(""), 1);
  assertEquals(COSH([0, "str"]), 1);
  catchAndAssertEquals(function() {
    COSH("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    COSH.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COSH.apply(this, [1, 1]);
  }, ERRORS.NA_ERROR);
});


test("COT", function(){
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
    COT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COT.apply(this, [1, 1]);
  }, ERRORS.NA_ERROR);
});


test("COTH", function(){
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
    COTH.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COTH.apply(this, [1, 1]);
  }, ERRORS.NA_ERROR);
});


test("COUNTIF", function(){
  assertEquals(COUNTIF(10, "= 10"), 1);
  assertEquals(COUNTIF([1, 5, 5, [5, 5, 5, 5], 10, 5], "= 5"), 7);
  assertEquals(COUNTIF([1, 5, 5, [5, 5, 5, 5], [], 10, 5], "= 5"), 7);
  assertEquals(COUNTIF([1, 5, 5, [5, 5, "5", "5.000"], [], 10, 5], "= 5"), 7);
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
    COUNTIF.apply(this, [[0, 1, 0, 1]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COUNTIF.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COUNTIF.apply(this, [[], "=1", []]);
  }, ERRORS.NA_ERROR);
});


test("COUNTIFS", function(){
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
  assertEquals(COUNTIFS([1, 5, 5, [5, 5, 5, 5], 10, 5], "= 5"), 7);
  assertEquals(COUNTIFS([1, 5, 5, [5, 5, 5, 5], [], 10, 5], "= 5"), 7);
  assertEquals(COUNTIFS([1, 5, 5, [5, 5, 5, 5], [], 10, 8], "> 4", [false, false, false, [true, true, true, true], [], false, false], "= true"), 0);
  assertEquals(COUNTIFS([1, 5, 5, [5, 5, 5, 5], [], 10, 8], "> 4", [false, false, false, ["A", "A", "A", "A"], [], false, false], "= 'A'"), 0);
  assertEquals(COUNTIFS([1, 5, 5, [5, 5, 5, 5], [], 10, 8], "> 4", [1, 5, 5, [5, 5, 5, 5], [], 10, 8], "> 5"), 2);
  assertEquals(COUNTIFS([1, 5, 5, [5, 5, "5", "5.000"], [], 10, 5], "= 5"), 7);
  assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1"), 2);
  assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1"), 2);
  assertEquals(COUNTIFS([1, 5, 10, 20], ">4", [0, 0, 1, 1], "=1", [0, 0, 1, 1], "=1"), 2);
  assertEquals(COUNTIFS([1, 5, 10, 20, 40], ">4", [0, 0, 1, 1, 1], "=1", [0, 0, 0, 0, 0], "=1"), 0);
  assertEquals(COUNTIFS([1, 2, 3, 4], ">3", [true, true, false, true], true), 1);
  catchAndAssertEquals(function() {
    COUNTIFS([1, 5, 10, 20], ">4", [0, 0], "=1");
  }, ERRORS.VALUE_ERROR);
});


test("COUNTUNIQUE", function(){
  assertEquals(COUNTUNIQUE([1, 1, 10]), 2);
  assertEquals(COUNTUNIQUE(["1", 1, 10]), 3);
  assertEquals(COUNTUNIQUE(["1", 1, 10, ""]), 4);
  assertEquals(COUNTUNIQUE(["1", 1, 10, "", ""]), 4);
  assertEquals(COUNTUNIQUE(["1", 1, 10, "", " "]), 5);
  assertEquals(COUNTUNIQUE(["1", 1, 10, []]), 4);
  assertEquals(COUNTUNIQUE(["", " ", [""], []]), 2);
  assertEquals(COUNTUNIQUE([[""], []]), 1);
  catchAndAssertEquals(function() {
    COUNTUNIQUE.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("DEGREES", function(){
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
    DEGREES.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DEGREES.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
});


test("ERF", function(){
  assertEquals(ERF(2), 0.9953222650189527);
  assertEquals(ERF("2"), 0.9953222650189527);
  assertEquals(ERF(0), 1.1102230246251565e-16);
  assertEquals(ERF(1), 0.8427007929497149);
  assertEquals(ERF(true), 0.8427007929497149);
  assertEquals(ERF(false), 1.1102230246251565e-16);
  catchAndAssertEquals(function() {
    ERF.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ERF([]);
  }, ERRORS.REF_ERROR);
  assertEquals(ERF(1, 2), 0.15262147206923782);
  assertEquals(ERF(2, 1), -0.15262147206923782);
});


test("ERFC", function(){
  assertEquals(ERFC(2), 0.004677734981047288);
  assertEquals(ERFC("2"), 0.004677734981047288);
  assertEquals(ERFC(0), 1);
  assertEquals(ERFC(1), 0.1572992070502851);
  assertEquals(ERFC(-1), 1.842700792949715);
  assertEquals(ERFC(-10), 2);
  catchAndAssertEquals(function() {
    ERFC.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ERFC([]);
  }, ERRORS.REF_ERROR);
});


test("EVEN", function(){
  assertEquals(EVEN(3), 4);
  assertEquals(EVEN(4), 4);
  assertEquals(EVEN(5), 6);
  assertEquals(EVEN("4"), 4);
  assertEquals(EVEN(false), 0);
  assertEquals(EVEN(true), 2);
  assertEquals(EVEN([11, 22]), 12);
  assertEquals(EVEN([10, 22, "str"]), 10);
  catchAndAssertEquals(function() {
    EVEN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EVEN.apply(this, [1, 2, 3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EVEN("str");
  }, ERRORS.VALUE_ERROR);
});


test("FLOOR", function(){
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
    FLOOR.apply(this, [10, 1, 2]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FLOOR.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("IF", function(){
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
});


test("INT", function(){
  assertEquals(INT(99.33), 99);
  assertEquals(INT(99.99), 99);
  assertEquals(INT(true), 1);
  assertEquals(INT(false), 0);
  assertEquals(INT(""), 0);
  assertEquals(INT([1.1, "str"]), 1);
  catchAndAssertEquals(function() {
    INT.apply(this, [100, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    INT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    INT("str");
  }, ERRORS.VALUE_ERROR);
});


test("ISEVEN", function(){
  assertEquals(ISEVEN(4), true);
  assertEquals(ISEVEN(3), false);
  assertEquals(ISEVEN(4.1), true);
  assertEquals(ISEVEN(false), true);
  assertEquals(ISEVEN(true), false);
  assertEquals(ISEVEN([4]), true);
  catchAndAssertEquals(function() {
    ISEVEN.apply(this, [100, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ISEVEN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ISEVEN("");
  }, ERRORS.VALUE_ERROR);
});


test("ISODD", function(){
  assertEquals(ISODD(4), false);
  assertEquals(ISODD(3), true);
  assertEquals(ISODD(4.1), false);
  assertEquals(ISODD(false), false);
  assertEquals(ISODD(true), true);
  assertEquals(ISODD([4]), false);
  catchAndAssertEquals(function() {
    ISODD.apply(this, [100, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ISODD.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ISODD("");
  }, ERRORS.VALUE_ERROR);
});


test("LN", function(){
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
    LN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LN.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
});


test("LOG", function(){
  assertEquals(LOG(256, 2), 8);
  assertEquals(LOG(100, 10), 2);
  assertEquals(LOG(256, 10), 2.408239965311849);
  assertEquals(LOG(1, 2), 0);
  catchAndAssertEquals(function() {
    LOG("str", 10);
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
  catchAndAssertEquals(function() {
    LOG.apply(this, [10]);
  }, ERRORS.NA_ERROR);
});


test("LOG10", function(){
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
    LOG10.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LOG10.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
});


test("MOD", function(){
  assertEquals(MOD(10, 3), 1);
  assertEquals(MOD(10, "3"), 1);
  assertEquals(MOD(10.1, 3), 1.0999999999999996);
  assertEquals(MOD(10, 3.1), 0.6999999999999997);
  catchAndAssertEquals(function() {
    MOD.apply(this, [10, 3, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MOD.apply(this, [[10, 3]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MOD(0, 0);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    MOD.apply(this, [10]);
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
});


test("ODD", function(){
  assertEquals(ODD(2), 3);
  assertEquals(ODD(4), 5);
  assertEquals(ODD(5), 5);
  assertEquals(ODD("4"), 5);
  assertEquals(ODD(false), 1);
  assertEquals(ODD(true), 1);
  assertEquals(ODD([10, 22]), 11);
  assertEquals(ODD([10, 22, "str"]), 11);
  catchAndAssertEquals(function() {
    ODD.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ODD.apply(this, [1, 2, 3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ODD("str");
  }, ERRORS.VALUE_ERROR);
});


test("PI", function(){
  assertEquals(PI(), 3.141592653589793);
  catchAndAssertEquals(function() {
    PI.apply(this, [1]);
  }, ERRORS.NA_ERROR);
});


test("POWER", function(){
  assertEquals(POWER(4, 10), 1048576);
  assertEquals(POWER(4, false), 1);
  assertEquals(POWER(4, true), 4);
  assertEquals(POWER([4], [10]), 1048576);
  assertEquals(POWER([4], [10, "str"]), 1048576);
  catchAndAssertEquals(function() {
    POWER(4, "str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    POWER.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    POWER.apply(this, [4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    POWER.apply(this, [4, 10, 22]);
  }, ERRORS.NA_ERROR);
});


test("RADIANS", function(){
  assertEquals(RADIANS(180), 3.141592653589793);
  assertEquals(RADIANS(false), 0);
  assertEquals(RADIANS(true), 0.017453292519943295);
  catchAndAssertEquals(function() {
    RADIANS("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    RADIANS.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RADIANS.apply(this, [4, 10]);
  }, ERRORS.NA_ERROR);
});


test("ROUND", function(){
  assertEquals(ROUND(99.44, 1), 99.4);
  assertEquals(ROUND(99.44, 0), 99);
  assertEquals(ROUND(99.4444444444444, 9), 99.444444444);
  assertEquals(ROUND("99.44", 0), 99);
  assertEquals(ROUND([99.44, 22.222], [1, 4]), 99.4);
  catchAndAssertEquals(function() {
    ROUND.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ROUND.apply(this, [99.44, 1, 44]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ROUND(99.999, "str");
  }, ERRORS.VALUE_ERROR);
});


test("ROUNDDOWN", function(){
  assertEquals(ROUNDDOWN(99.46, 1), 99.4);
  assertEquals(ROUNDDOWN(99.99, 1), 99.9);
  assertEquals(ROUNDDOWN(99.5555555555555, 9), 99.555555555);
  assertEquals(ROUNDDOWN(99.99), 99);
  assertEquals(ROUNDDOWN("99.99"), 99);
  assertEquals(ROUNDDOWN([99.46666, 22.222], [1, 4]), 99.4);
  catchAndAssertEquals(function() {
    ROUNDDOWN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ROUNDDOWN.apply(this, [99.44, 1, 44]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ROUNDDOWN(99.999, "str");
  }, ERRORS.VALUE_ERROR);
});


test("ROUNDUP", function(){
  assertEquals(ROUNDUP(99.46, 1), 99.5);
  assertEquals(ROUNDUP(99.99, 1), 100);
  assertEquals(ROUNDUP(99.5555555555555, 9), 99.555555556);
  assertEquals(ROUNDUP(99.99), 100);
  assertEquals(ROUNDUP("99.99"), 100);
  assertEquals(ROUNDUP([99.46666, 22.222], [1, 4]), 99.5);
  catchAndAssertEquals(function() {
    ROUNDUP.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ROUNDUP.apply(this, [99.44, 1, 44]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ROUNDUP(99.999, "str");
  }, ERRORS.VALUE_ERROR);
});


test("SIN", function(){
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
  catchAndAssertEquals(function() {
    SIN.apply(this, [1, 44]);
  }, ERRORS.NA_ERROR);
});


test("SINH", function(){
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
});


test("SQRT", function(){
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
    SQRT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SQRT.apply(this, [4, 4]);
  }, ERRORS.NA_ERROR);
});


test("SQRTPI", function(){
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
    SQRTPI.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SQRTPI.apply(this, [4, 4]);
  }, ERRORS.NA_ERROR);
});


test("SUM", function(){
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
});


test("SUMIF", function(){
  assertEquals(SUMIF([1, 5, 10, [1, 1, 1, 1, 1], []], 1), 6);
  assertEquals(SUMIF([], 1), 0);
  assertEquals(SUMIF([1, 5, 10, [1, 1, "1.0", "1", 1]], 1), 4);
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
    SUMIF.apply(this, [[0, 1, 0, 1]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SUMIF.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SUMIF.apply(this, [[], "=1", [], true]);
  }, ERRORS.NA_ERROR);
});


test("SUMPRODUCT", function(){
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
});


test("SUMSQ", function(){
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
    SUMSQ.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("SUMX2MY2", function(){
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
    SUMX2MY2.apply(this, [[1,2,3],[4,5]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SUMX2MY2.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("SUMX2PY2", function(){
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
    SUMX2PY2.apply(this, [[1,2,3],[4,5]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SUMX2PY2.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("TAN", function(){
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
    TAN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TAN.apply(this, [1, 1]);
  }, ERRORS.NA_ERROR);
  assertEquals(TAN([1, 44]), 1.5574077246549023);
  assertEquals(TAN([1, "str"]), 1.5574077246549023);
});


test("TANH", function(){
  assertEquals(TANH(0), 0);
  assertEquals(TANH(1), 0.7615941559557649);
  assertEquals(TANH(PI() / 2), 0.9171523356672744);
  assertEquals(TANH(PI()), 0.99627207622075);
  assertEquals(TANH(false), 0);
  assertEquals(TANH(true), 0.7615941559557649);
  assertEquals(TANH(""), 0);
  assertEquals(TANH("0"), 0);
  catchAndAssertEquals(function() {
    TANH("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    TANH.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TANH.apply(this, [1, 1]);
  }, ERRORS.NA_ERROR);
  assertEquals(TANH([1, 44]), 0.7615941559557649);
  assertEquals(TANH([1, "str"]), 0.7615941559557649);
});


test("TRUNC", function(){
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
    TRUNC.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TRUNC.apply(this, [3.1, 1, 1]);
  }, ERRORS.NA_ERROR);
});


test("MULTIPLY", function(){
  assertEquals(MULTIPLY(2, 2), 4);
  assertEquals(MULTIPLY(2, "2"), 4);
  assertEquals(MULTIPLY([2, []], ["2"]), 4);
  catchAndAssertEquals(function() {
    MULTIPLY.apply(this, [3.1, 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MULTIPLY.apply(this, [1]);
  }, ERRORS.NA_ERROR);
});


test("MINUS", function(){
  assertEquals(MINUS(2, 2), 0);
  assertEquals(MINUS(2, 10), -8);
  assertEquals(MINUS(2, "12"), -10);
  assertEquals(MINUS([4, []], ["2"]), 2);
  catchAndAssertEquals(function() {
    MINUS.apply(this, [3.1, 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MINUS.apply(this, [1]);
  }, ERRORS.NA_ERROR);
});


test("DIVIDE", function(){
  assertEquals(DIVIDE(2, 2), 1);
  assertEquals(DIVIDE(10, 2), 5);
  assertEquals(DIVIDE(2, "12"), 0.16666666666666666);
  assertEquals(DIVIDE([4, []], ["2"]), 2);
  catchAndAssertEquals(function() {
    DIVIDE.apply(this, [3.1, 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DIVIDE.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DIVIDE.apply(this, [1, 1, 1]);
  }, ERRORS.NA_ERROR);
});


test("EQ", function(){
  assertEquals(EQ(2, 2), true);
  assertEquals(EQ("2", 2), false);
  assertEquals(EQ("2", "2"), true);
  assertEquals(EQ("abc", "abc"), true);
  assertEquals(EQ(true, true), true);
  assertEquals(EQ(false, true), false);
  assertEquals(EQ(false, false), true);
  assertEquals(EQ(0, 0), true);
  catchAndAssertEquals(function() {
    EQ.apply(this, [3.1, 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EQ.apply(this, [1]);
  }, ERRORS.NA_ERROR);
});


test("GT", function(){
  assertEquals(GT(2, 2), false);
  assertEquals(GT(2, 3), false);
  assertEquals(GT(2, 1), true);
  assertEquals(GT("abc", "a"), true);
  assertEquals(GT("abc", "abcd"), false);
  assertEquals(GT(false, false), false);
  assertEquals(GT(true, false), true);
  catchAndAssertEquals(function() {
    GT.apply(this, [3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    GT.apply(this, [3, 3, 3]);
  }, ERRORS.NA_ERROR);
});


test("GTE", function(){
  assertEquals(GTE(2, 2), true);
  assertEquals(GTE(2, 3), false);
  assertEquals(GTE(2, 1), true);
  assertEquals(GTE("abc", "a"), true);
  assertEquals(GTE("abc", "abc"), true);
  assertEquals(GTE("abc", "abcd"), false);
  assertEquals(GTE(false, false), true);
  assertEquals(GTE(true, false), true);
  catchAndAssertEquals(function() {
    GTE.apply(this, [3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    GTE.apply(this, [3, 3, 3]);
  }, ERRORS.NA_ERROR);
});


test("LT", function(){
  assertEquals(LT(2, 2), false);
  assertEquals(LT(2, 3), true);
  assertEquals(LT(2, 1), false);
  assertEquals(LT("abc", "a"), false);
  assertEquals(LT("abc", "abc"), false);
  assertEquals(LT("abc", "abcd"), true);
  assertEquals(LT(false, false), false);
  assertEquals(LT(true, false), false);
  assertEquals(LT(false, true), true);
  catchAndAssertEquals(function() {
    LT.apply(this, [3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LT.apply(this, [3, 3, 3]);
  }, ERRORS.NA_ERROR);
});


test("NE", function(){
  assertEquals(NE(2, 2), false);
  assertEquals(NE(2, 3), true);
  assertEquals(NE(2, 1), true);
  assertEquals(NE("abc", "a"), true);
  assertEquals(NE("abc", "abc"), false);
  assertEquals(NE("abc", "abcd"), true);
  assertEquals(NE(false, false), false);
  assertEquals(NE(true, false), true);
  assertEquals(NE(false, true), true);
  catchAndAssertEquals(function() {
    NE.apply(this, [3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NE.apply(this, [3, 3, 3]);
  }, ERRORS.NA_ERROR);
});


test("LTE", function(){
  assertEquals(LTE(2, 2), true);
  assertEquals(LTE(2, 3), true);
  assertEquals(LTE(2, 1), false);
  assertEquals(LTE("abc", "a"), false);
  assertEquals(LTE("abc", "abc"), true);
  assertEquals(LTE("abc", "abcd"), true);
  assertEquals(LTE(false, false), true);
  assertEquals(LTE(true, false), false);
  assertEquals(LTE(false, true), true);
  assertEquals(LTE(true, true), true);
  catchAndAssertEquals(function() {
    LTE.apply(this, [3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LTE.apply(this, [3, 3, 3]);
  }, ERRORS.NA_ERROR);
});


test("RAND", function(){
  catchAndAssertEquals(function() {
    RAND.apply(this, [3]);
  }, ERRORS.NA_ERROR);
});


test("RANDBETWEEN", function(){
  for(var i = 0; i < 1000; i++) {
    var x = RANDBETWEEN(1, 4);
    assertEquals(x >= 1, true);
    assertEquals(x <= 4, true);
    x = RANDBETWEEN(-1, 1);
    assertEquals(x >= -1, true);
    assertEquals(x <= 1, true);
  }
  catchAndAssertEquals(function() {
    RANDBETWEEN.apply(this, [3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RANDBETWEEN.apply(this, [3, 4, 5]);
  }, ERRORS.NA_ERROR);
});


test("SIGN", function(){
  assertEquals(SIGN(2), 1);
  assertEquals(SIGN(0), 0);
  assertEquals(SIGN(-100), -1);
  assertEquals(SIGN([0]), 0);
  assertEquals(SIGN("0"), 0);
  assertEquals(SIGN(false), 0);
  assertEquals(SIGN(true), 1);
  catchAndAssertEquals(function() {
    SIGN.apply(this, [3, 2]);
  }, ERRORS.NA_ERROR);
});


test("UNARY_PERCENT", function(){
  assertEquals(UNARY_PERCENT(100), 1);
  assertEquals(UNARY_PERCENT(2), 0.02);
  assertEquals(UNARY_PERCENT(0), 0);
  catchAndAssertEquals(function() {
    UNARY_PERCENT.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("MULTINOMIAL", function(){
  assertEquals(MULTINOMIAL(1, 2, 3), 60);
  assertEquals(MULTINOMIAL(1, 33, 100), 2.4592658588587683e+33);
  assertEquals(MULTINOMIAL(2, 22), 276);
  assertEquals(MULTINOMIAL(3), 1);
  catchAndAssertEquals(function() {
    MULTINOMIAL.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("SERIESSUM", function(){
  assertEquals(SERIESSUM(1, 0, 1, [4, 5, 6]), 15);
  assertEquals(SERIESSUM(1, 0, 1, [4, 5, 6, 10, 22]), 47);
  assertEquals(SERIESSUM(3, 0, 2, [4, 5, 6]), 535);
  assertEquals(SERIESSUM(3, 0, 2, [4, 5, 6, 10]), 7825);
  assertEquals(SERIESSUM(3, 2, 2, [4, 5, 6, 10]), 70425);
  catchAndAssertEquals(function() {
    SERIESSUM.apply(this, [1, 0, 1, [4, 5, 6], 10])
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SERIESSUM.apply(this, [1, 0, 1])
  }, ERRORS.NA_ERROR);
});


test("SUBTOTAL", function(){
  assertEquals(SUBTOTAL(1, [1, 2, 3, 4, 5, 6, 7]), 4);
  assertEquals(SUBTOTAL(1, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 5.5);
  assertEquals(SUBTOTAL(2, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 14);
  assertEquals(SUBTOTAL(3, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 14);
  assertEquals(SUBTOTAL(4, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 10);
  assertEquals(SUBTOTAL(5, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 1);
  assertEquals(SUBTOTAL(6, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 3048192000);
  assertEquals(SUBTOTAL(7, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 2.5943726083138543);
  assertEquals(SUBTOTAL(8, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 2.5);
  assertEquals(SUBTOTAL(9, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 77);
  assertEquals(SUBTOTAL(10, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 6.730769230769231);
  assertEquals(SUBTOTAL(11, [1, 2, 3, 4, 5, 6, 7], [4, 5, 6, 7, 8, 9, 10]), 6.25);
  catchAndAssertEquals(function() {
    SUBTOTAL(0, [1, 2, 3, 4, 5, 6, 7]);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    SUBTOTAL(12, [1, 2, 3, 4, 5, 6, 7]);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    SUBTOTAL.apply(this, [1])
  }, ERRORS.NA_ERROR);
});