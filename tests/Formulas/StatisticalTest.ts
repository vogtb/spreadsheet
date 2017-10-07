import {
  AVERAGE,
  AVERAGEA,
  AVERAGEIF,
  AVEDEV,
  CORREL,
  COUNT,
  COUNTA,
  PEARSON,
  MEDIAN,
  DEVSQ,
  EXPONDIST,
  FDIST$LEFTTAILED,
  FINV,
  FISHER,
  FISHERINV,
  MAX,
  MAXA,
  MIN,
  MINA,
  QUARTILE,
  PERCENTILE,
  STDEV,
  STDEVA,
  STDEVP,
  STDEVPA,
  TRIMMEAN,
  SLOPE,
  STANDARDIZE,
  SMALL,
  LARGE,
  KURT,
  INTERCEPT,
  FORECAST,
  POISSON,
  PERCENTRANK,
  PERCENTRANK$EXC,
  NORMSINV,
  NORMSDIST,
  NORMDIST,
  NORMINV,
  NEGBINOMDIST,
  GEOMEAN,
  HARMEAN,
  CONFIDENCE,
  BINOMDIST,
  COVAR,
  WEIBULL,
  VARPA,
  VARP,
  VARA,
  VAR,
  PERMUT,
  RSQ,
  SKEW,
  STEYX,
  PROB,
  MODE,
  RANK,
  RANK$AVG,
  RANK$EQ,
  LOGNORMDIST,
  TDIST,
  HYPGEOMDIST,
  ZTEST
} from "../../src/Formulas/Statistical";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";


test("AVEDEV", function(){
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
});


test("AVERAGE", function(){
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
});


test("AVERAGEA", function(){
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
});


test("AVERAGEIF", function(){
  assertEquals(AVERAGEIF([1, 5, [5, 20, 100], [], [[2]], 10], '>2'), 28);
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
});


test("CORREL", function(){
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
    CORREL.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CORREL.apply(this, [[9, 5]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CORREL.apply(this, [[9, 5],[10]]);
  }, ERRORS.NA_ERROR);
});


test("PEARSON", function(){
  // same as CORREL
  assertEquals(PEARSON([9, 5],[10, 4]), 1);
});


test("COUNT", function(){
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
});


test("COUNTA", function(){
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
});


test("DEVSQ", function(){
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
});


test("EXPONDIST", function(){
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
    EXPONDIST.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EXPONDIST.apply(this, [4, 0.5]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EXPONDIST.apply(this, [4, 0.5, true, 1]);
  }, ERRORS.NA_ERROR);
});


test("FINV", function(){
  assertEquals(FINV(0.42, 2, 3), 1.174597274485816);
  assertEquals(FINV(0.42, 2, 5), 1.0370426242728021);
  assertEquals(FINV(0.42, 33, 5), 1.303222112500911);
  assertEquals(FINV(["0.42"], [33, []], [5]), 1.303222112500911);
  assertEquals(FINV("0.42", 2, 3), 1.174597274485816);
  catchAndAssertEquals(function() {
    FINV.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FINV.apply(this, [0.42, 2, 4, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FINV(0.42, 2, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    FINV(-10, 2, 3);
  }, ERRORS.NUM_ERROR);
});


test("FISHER", function(){
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
    FISHER.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FISHER.apply(this, [0.55, 0.1]);
  }, ERRORS.NA_ERROR);
});


test("FISHERINV", function(){
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
    FISHER.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FISHER.apply(this, [0.55, 0.1]);
  }, ERRORS.NA_ERROR);
});


test("MAX", function(){
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
});


test("MAXA", function(){
  assertEquals(MAXA(100, 22, 44), 100);
  assertEquals(MAXA("100", 22, 44), 44);
  assertEquals(MAXA(-1, -10, "stuff"), 0);
  catchAndAssertEquals(function() {
    MAX(100, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    MAX([]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    MAX.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("MEDIAN", function(){
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
});


test("MIN", function(){
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
});


// TODO: More tests for MINA
test("MINA", function(){
  assertEquals(MINA(100, 22, 44), 22);
});


test("F.DIST", function(){
  assertEquals(FDIST$LEFTTAILED(15.35, 7, 6, false), 0.0003451054686025578);
  assertEquals(FDIST$LEFTTAILED(15.35, 7, 6, true), 0.9980694465675269);
  assertEquals(FDIST$LEFTTAILED(15.35, 7, 6, 1), 0.9980694465675269);
  assertEquals(FDIST$LEFTTAILED(15.35, "7", [6], 1), 0.9980694465675269);
  assertEquals(FDIST$LEFTTAILED(15.35, "7", [6], 10), 0.9980694465675269);
  catchAndAssertEquals(function() {
    FDIST$LEFTTAILED(15.35, 7, 6, "10");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    FDIST$LEFTTAILED(-15.35, 7, 6, 1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    FDIST$LEFTTAILED.apply(this, [15.35, 7, 6]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FDIST$LEFTTAILED.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("PERCENTILE", function () {
  assertEquals(PERCENTILE([72, 57, 66, 92, 32, 17, 146], 0.5), 66);
  assertEquals(PERCENTILE([72, 57, 66, 92, 32, 17, 146], 0.2), 37.00000000000001);
  assertEquals(PERCENTILE([72, 57, 66, 92, 32, 17, 146], 0.1), 26);
  assertEquals(PERCENTILE([72, 57, 66, 92, 32, 17, 146], 0), 17);
  assertEquals(PERCENTILE([72], 0.2), 72);
  assertEquals(PERCENTILE([72], 0), 72);
  assertEquals(PERCENTILE([72], 1), 72);
  assertEquals(PERCENTILE([72], 0.1111), 72);
  catchAndAssertEquals(function() {
    PERCENTILE.apply(this, [[], 0]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    PERCENTILE.apply(this, [[10], 0, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PERCENTILE.apply(this, [[10]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PERCENTILE.apply(this, [[10], -0.1]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    PERCENTILE.apply(this, [[10], 1.1]);
  }, ERRORS.NUM_ERROR);
});


test("QUARTILE", function(){
  assertEquals(QUARTILE([1, 2, 3, 4], 0), 1);
  assertEquals(QUARTILE([1, 2, 3, 4], 1), 1.75);
  assertEquals(QUARTILE([1, 2, 3, 4], 2), 2.5);
  assertEquals(QUARTILE([1, 2, 3, 4], 3), 3.25);
  assertEquals(QUARTILE([1, 2, 3, 4], 4), 4);
  catchAndAssertEquals(function() {
    QUARTILE.apply(this, [[1, 2, 3, 4], 5]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    QUARTILE.apply(this, [[1, 2, 3, 4], -1]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    QUARTILE.apply(this, [[1, 2, 3, 4]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    QUARTILE.apply(this, [[1, 2, 3, 4], 5, 7]);
  }, ERRORS.NA_ERROR);
});


test("STDEV", function(){
  assertEquals(STDEV(1, 2, 3, 4, 5, 6, 7, "18281821"), 2.160246899469287);
  assertEquals(STDEV(1, 2, 3, 4, 5, 6, 7), 2.160246899469287);
  assertEquals(STDEV([1, 2, 3, 4, 5, 6, 7]), 2.160246899469287);
  assertEquals(STDEV(1, 2, 3, [4, 5], 6, 7), 2.160246899469287);
  assertEquals(STDEV(33, 44), 7.7781745930520225);
  assertEquals(STDEV(33, 44, 0, 1, 0, 1), 19.934057957843574);
  assertEquals(STDEV(33, 44, false, true, false, true), 19.934057957843574);
  catchAndAssertEquals(function() {
    STDEV();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    STDEV([10, 10, [], 10]);
  }, ERRORS.REF_ERROR);
});


test("STDEVA", function(){
  assertEquals(STDEVA(1, 2, 3, 4, 5, 6, 7, "123"), 42.12036324629692);
  assertEquals(STDEVA(1, 2, 3, 4, 5, 6, 7, 123), 42.12036324629692);
  assertEquals(STDEVA(1, 2, 3, 4, 5, 6, 7), 2.160246899469287);
  assertEquals(STDEVA([1, 2, 3, 4, 5, 6, 7]), 2.160246899469287);
  assertEquals(STDEVA(1, 2, 3, [4, 5], 6, 7), 2.160246899469287);
  assertEquals(STDEVA(33, 44), 7.7781745930520225);
  assertEquals(STDEVA(33, 44, 0, 1, 0, 1), 19.934057957843574);
  assertEquals(STDEVA(33, 44, false, true, false, true), 19.934057957843574);
  catchAndAssertEquals(function() {
    STDEVA(1, 2, 3, 4, 5, 6, 7, "string");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    STDEVA();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    STDEVA([10, 10, [], 10]);
  }, ERRORS.REF_ERROR);
});

test("STDEVP", function(){
  assertEquals(STDEVP(1, 2, 3, 4, 5, 6, 7, 123), 39.39999206852712);
  assertEquals(STDEVP(1, 2, 3, 4, 5, 6, 7, "132321"), 2);
  assertEquals(STDEVP(1, 2, 3, 4, 5, 6, 7), 2);
  assertEquals(STDEVP([1, 2, 3, 4, 5, 6, 7]), 2);
  assertEquals(STDEVP(1, 2, 3, [4, 5], 6, 7), 2);
  assertEquals(STDEVP(33, 44), 5.5);
  assertEquals(STDEVP(33, 44, 0, 1, 0, 1), 18.197222010210485);
  assertEquals(STDEVP(33, 44, false, true, false, true), 18.197222010210485);
  catchAndAssertEquals(function() {
    STDEVP();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    STDEVP([10, 10, [], 10]);
  }, ERRORS.REF_ERROR);
});

test("STDEVPA", function() {
  assertEquals(STDEVPA(1, 2, 3, 4, 5, 6, 7, 123), 39.39999206852712);
  assertEquals(STDEVPA(1, 2, 3, 4, 5, 6, 7, "123"), 39.39999206852712);
  assertEquals(STDEVPA(1, 2, 3, 4, 5, 6, 7), 2);
  assertEquals(STDEVPA([1, 2, 3, 4, 5, 6, 7]), 2);
  assertEquals(STDEVPA(1, 2, 3, [4, 5], 6, 7), 2);
  assertEquals(STDEVPA(33, 44), 5.5);
  assertEquals(STDEVPA(33, 44, 0, 1, 0, 1), 18.197222010210485);
  assertEquals(STDEVPA(33, 44, false, true, false, true), 18.197222010210485);
  catchAndAssertEquals(function() {
    STDEVPA(1, 2, 3, 4, 5, 6, 7, "string");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    STDEVPA();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    STDEVPA([10, 10, [], 10]);
  }, ERRORS.REF_ERROR);
});

test("TRIMMEAN", function() {
  assertEquals(TRIMMEAN([1.1, 2, 3, 44, 20, 21, 7], 0.05), 14.014285714285714);
  assertEquals(TRIMMEAN([1.1, 2, 3, 44, 20, 21, 7, 1, 22], 0.1), 13.455555555555556);
  assertEquals(TRIMMEAN([1], 0.1), 1);
  catchAndAssertEquals(function() {
    TRIMMEAN([], 0.1);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    TRIMMEAN([10], 1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    TRIMMEAN([10], -1);
  }, ERRORS.NUM_ERROR);
});

test("SLOPE", function() {
  assertEquals(SLOPE([1, 2.2, 4, 5.5, 6, 8], [1.9, 22.2, 44, 55.5, 88, 99.1]), 0.06727907586278936);
  assertEquals(SLOPE([1.1, 2.44, 5, 10.5, 600, 800], [1.9, 22.2, 44, 55.5, 88, 99.1]), 8.50783378332324);
  assertEquals(SLOPE([1.1, 2.44, 5, 10.5, 600, "ignore", 800], [1.9, 22.2, 44, 55.5, 88, 99.1]), 8.50783378332324);
  assertEquals(SLOPE([600, 800], [44, 4.1]), -5.012531328320802);
  assertEquals(SLOPE([1, 2.2, 4, 5.5, 6, 8, true], [1.9, 22.2, 44, 55.5, 88,  99.1, true]), 0.06743685772979165);
  catchAndAssertEquals(function() {
    SLOPE([1], [0]);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    SLOPE([1], [1]);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    SLOPE([1, 3], [1]);
  }, ERRORS.NA_ERROR);
});

test("STANDARDIZE", function() {
  assertEquals(STANDARDIZE(10, 2, 1), 8);
  assertEquals(STANDARDIZE(44, 2.1, 99), 0.42323232323232324);
  assertEquals(STANDARDIZE(10, 2, [1, []]), 8);
  assertEquals(STANDARDIZE(44, 0, 10), 4.4);
  assertEquals(STANDARDIZE(0, 0, 1), 0);
  catchAndAssertEquals(function() {
    STANDARDIZE(44, 2.1, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    STANDARDIZE(44, 2.1, -10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    STANDARDIZE.apply(this, [4, 3, 4, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    STANDARDIZE.apply(this, [4, 3]);
  }, ERRORS.NA_ERROR);
});

test("SMALL", function() {
  assertEquals(SMALL([2, 12, 22, 1, 0.1, 44, "77", "hello"], 3), 2);
  assertEquals(SMALL([2, 12, 22, 1, 0.1, 44, "77", "hello"], 4), 12);
  assertEquals(SMALL([2, 12, 22, 1, 0.1, 44, "77", "hello"], 5), 22);
  catchAndAssertEquals(function() {
    SMALL([44, 2.1, "str"], 3);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    SMALL([44, 2.1], 3);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    SMALL.apply(this, [[44, 2.1], 3, 4]);
  }, ERRORS.NA_ERROR);
});

test("LARGE", function() {
  assertEquals(LARGE([2, 12, 22, 1, 0.1, 44, "77", "hello"], 2), 22);
  assertEquals(LARGE([2, 12, 22, 1, 0.1, 44, "77", "hello"], 3), 12);
  assertEquals(LARGE([2, 12, 22, 1, 0.1, 44, "77", "hello"], 4), 2);
  catchAndAssertEquals(function() {
    LARGE([44, 2.1, "str"], 3);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    LARGE([44, 2.1], 3);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    LARGE.apply(this, [[44, 2.1], 3, 4]);
  }, ERRORS.NA_ERROR);
});

test("KURT", function() {
  assertEquals(KURT(3, 4, 5, 6, 9, 11, 15), -0.23508087990005144);
  assertEquals(KURT(3, 4, 5, 6, 9, 11, 15, "ignore"), -0.23508087990005144);
  assertEquals(KURT(11, 15, 11, 1), 2.602498034762867);
  catchAndAssertEquals(function() {
    KURT(1, 2, 3);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    KURT(1, 2, 3, "ignore");
  }, ERRORS.DIV_ZERO_ERROR);
});

test("INTERCEPT", function() {
  assertEquals(INTERCEPT([1, 2, 3, 4], [10, 20, 33, 44]), 0.1791776688042246);
  assertEquals(INTERCEPT([true, 2, 3, 4], [10, 20, 33, "ignore", 44]), 0.1791776688042246);
  assertEquals(INTERCEPT([1, 2], [10, 20]), 0);
  catchAndAssertEquals(function() {
    INTERCEPT([1], [10])
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    INTERCEPT([1, "ignore"], [10, "ignore"])
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    INTERCEPT.apply(this, [[1, 2, 3]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    INTERCEPT.apply(this, [[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
  }, ERRORS.NA_ERROR);
});

test("FORCAST", function() {
  assertEquals(FORECAST(0, [1, 2, 3, 4], [10, 20, 33, 44]), 0.1791776688042246);
  assertEquals(FORECAST(1, [1, 2, 3, 4], [10, 20, 33, 44]), 0.2659373821199545);
  assertEquals(FORECAST(22, [1, 2, 3, 4], [10, 20, 33, 44]), 2.087891361750283);
  assertEquals(FORECAST(-10, [1, 2, 3, 4], [10, 20, 33, 44]), -0.6884194643530746);
  assertEquals(FORECAST(0, [true, 2, 3, 4], [10, 20, 33, "ignore", 44]), 0.1791776688042246);
  assertEquals(FORECAST(0, [1, 2], [10, 20]), 0);
  catchAndAssertEquals(function() {
    FORECAST(0, [1], [10])
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    FORECAST(0, [1, "ignore"], [10, "ignore"])
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    FORECAST.apply(this, [[1, 2, 3]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FORECAST.apply(this, [0, [1, 2, 3], [1, 2, 3], [1, 2, 3]]);
  }, ERRORS.NA_ERROR);
});


test("POISSON", function() {
  assertEquals(POISSON(3, 500, true), 1.4932281660406229e-210);
  assertEquals(POISSON(30, 500, true), 2.660801877634559e-169);
  assertEquals(POISSON(3, 5, true), 0.26502591529736175);
  assertEquals(POISSON(3, 5, false), 0.14037389581428059);
  assertEquals(POISSON(3, 5), 0.14037389581428059);
  catchAndAssertEquals(function() {
    POISSON(-3, 5);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    POISSON(3, -5);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    POISSON.apply(this, [1, 2, 3, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    POISSON.apply(this, [1]);
  }, ERRORS.NA_ERROR);
});


test("PERCENTRANK", function() {
  assertEquals(PERCENTRANK([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], 4), 0.583);
  assertEquals(PERCENTRANK([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], 5), 0.666);
  assertEquals(PERCENTRANK([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], 0), 0);
  assertEquals(PERCENTRANK([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1, -4], -1), 0.057);
  assertEquals(PERCENTRANK([1], 1), 1);
  assertEquals(PERCENTRANK([44], 44), 1);
  catchAndAssertEquals(function() {
    PERCENTRANK([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], 10);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PERCENTRANK([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], -1);
  }, ERRORS.NA_ERROR);
});


test("PERCENTRANK$EXC", function() {
  assertEquals(PERCENTRANK$EXC([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], 4), 0.571);
  assertEquals(PERCENTRANK$EXC([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], 5), 0.642);
  assertEquals(PERCENTRANK$EXC([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], 7), 0.785);
  assertEquals(PERCENTRANK$EXC([1], 1), 1);
  assertEquals(PERCENTRANK$EXC([22], 22), 1);
  catchAndAssertEquals(function() {
    PERCENTRANK$EXC([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], 10);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PERCENTRANK$EXC([1, 5, 3, 7, 3, 2, 6, 8, 4, 9, 0, 3, 1], -1);
  }, ERRORS.NA_ERROR);
});


test("NORMSINV", function() {
  assertEquals(NORMSINV(0.1), -1.2815515655446006);
  assertEquals(NORMSINV(0.4), -0.2533471031357999);
  catchAndAssertEquals(function() {
    NORMSINV(0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NORMSINV(1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NORMSINV.apply(this, [1, 2]);
  }, ERRORS.NA_ERROR);
});


test("NORMSDIST", function() {
  assertEquals(NORMSDIST(0.1), 0.5398278372770289);
  assertEquals(NORMSDIST(0.4), 0.6554217416103242);
  assertEquals(NORMSDIST(1), 0.8413447460685429);
  assertEquals(NORMSDIST(11), 1);
  assertEquals(NORMSDIST(-11), 0);
  catchAndAssertEquals(function() {
    NORMSDIST.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NORMSDIST.apply(this, [1, 2]);
  }, ERRORS.NA_ERROR);
});


test("NORMDIST", function() {
  assertEquals(NORMDIST(1, 0, 6, true), 0.5661838326109037);
  assertEquals(NORMDIST(1, 0, 6, false), 0.06557328601698999);
  assertEquals(NORMDIST(0.5, 0.44, 8, true), 0.5029920390526184);
  assertEquals(NORMDIST(0.5, 0.44, 8, false), 0.04986638253844748);
  assertEquals(NORMDIST(-0.5, 0.44, 8, true), 0.45323192202214374);
  assertEquals(NORMDIST(-0.5, -100, 100, true), 0.840131867824506);
  catchAndAssertEquals(function() {
    NORMDIST(-0.5, 0.44, 0, true);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NORMDIST.apply(this, [1, 0, 6]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NORMDIST.apply(this, [1, 0, 6, true, 5]);
  }, ERRORS.NA_ERROR);
});


test("NORMINV", function() {
  assertEquals(NORMINV(0.8, 0, 6), 5.049727401437487);
  assertEquals(NORMINV(0.2, 0, 6), -5.049727401437487);
  assertEquals(NORMINV(0.4, 1, 6), -0.5200826188147996);
  catchAndAssertEquals(function() {
    NORMINV(-0.5, 0.44, 1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NORMINV(0.5, 0.44, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NORMINV.apply(this, [0.2, 0.8]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NORMINV.apply(this, [0.2, 0.8, 6, 1]);
  }, ERRORS.NA_ERROR);
});


test("NEGBINOMDIST", function() {
  assertEquals(NEGBINOMDIST(5, 3, 0.2), 0.05505024000000004);
  assertEquals(NEGBINOMDIST(10, 3, 0.2), 0.05669356830720007);
  assertEquals(NEGBINOMDIST(10, 7, 0.8), 0.00017197049053183967);
  catchAndAssertEquals(function() {
    NEGBINOMDIST.apply(this, [-10, 7, 0.8]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NEGBINOMDIST.apply(this, [10, -7, 0.8]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NEGBINOMDIST.apply(this, [10, 7, -0.8]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NEGBINOMDIST.apply(this, [0.2, 0.8]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NEGBINOMDIST.apply(this, [0.2, 0.8, 6, 1]);
  }, ERRORS.NA_ERROR);
});


test("GEOMEAN", function() {
  assertEquals(GEOMEAN(10, 4, 6, 3, 6, 7, 1, 1), 3.6313885790189477);
  assertEquals(GEOMEAN(10, 4, 6, [3, 6, [7]], 1, 1), 3.6313885790189477);
  assertEquals(GEOMEAN(10), 10);
  catchAndAssertEquals(function() {
    GEOMEAN(10, 2, 4, 5, 2, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    GEOMEAN.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("HARMEAN", function() {
  assertEquals(HARMEAN(10, 4, 6, 3, 6, 7, 1, 1), 2.532027128862095);
  assertEquals(HARMEAN(10, 4, 6, [3, 6, [7]], 1, 1), 2.532027128862095);
  assertEquals(GEOMEAN(10), 10);
  catchAndAssertEquals(function() {
    HARMEAN(10, 2, 4, 5, 2, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    HARMEAN.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("CONFIDENCE", function() {
  assertEquals(CONFIDENCE(0.04, 6.48, 25), 2.6616585881788426);
  assertEquals(CONFIDENCE(0.0001, 101.1, 24281), 2.5242568756291566);
  assertEquals(CONFIDENCE(0.8, 101.1, 24281), 0.1643742612132182);
  catchAndAssertEquals(function() {
    CONFIDENCE(0, 101.1, 24281);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CONFIDENCE(0.1, 0, 24281);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CONFIDENCE(0.1, 2.1, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CONFIDENCE.apply(this, [0.8, 101.1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CONFIDENCE.apply(this, [0.8, 101.1, 24281, 22]);
  }, ERRORS.NA_ERROR);
});

test("BINOMDIST", function() {
  assertEquals(BINOMDIST(20, 22, 0.04, true), 0.9999999999999998);
  assertEquals(BINOMDIST(14, 22, 0.4, true), 0.9929516025629364);
  assertEquals(BINOMDIST(14, 22, 0.4, false), 0.014417421604478797);
  catchAndAssertEquals(function() {
    BINOMDIST(21, 20, 0.4, false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BINOMDIST(20, 20, -1, false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BINOMDIST(20, 0, -1, false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BINOMDIST.apply(this, [20, 20, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    BINOMDIST.apply(this, [20, 20, 1, true, 10]);
  }, ERRORS.NA_ERROR);
});

test("COVAR", function() {
  assertEquals(COVAR([2, 4, 5, 1, 3], [7, 3, 1, 3, 4]), -1.5999999999999999);
  assertEquals(COVAR([2, 4, 5, 1], [7, 3, 1, 3]), -2);
  catchAndAssertEquals(function() {
    COVAR([2, 4, 5, 1], [7, 3, 1, 3, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COVAR.apply(this, [[10, 10, 10]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COVAR.apply(this, [[10, 10, 10], [1, 2, 4], 1000000]);
  }, ERRORS.NA_ERROR);
});

test("WEIBULL", function() {
  assertEquals(WEIBULL(2.4, 2, 4, true), 0.30232367392896886);
  assertEquals(WEIBULL(3.1, 4, 4, true), 0.3028470073265427);
  assertEquals(WEIBULL(0.16, 1, 4, false), 0.2401973597880808);
  catchAndAssertEquals(function() {
    WEIBULL(-10, 2, 4, true);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    WEIBULL(10, 0, 4, true);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    WEIBULL(10, 1, 0, true);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    WEIBULL.apply(this, [10, 10, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    WEIBULL.apply(this, [10, 10, 10, 10, 10]);
  }, ERRORS.NA_ERROR);
});

test("VARPA", function() {
  assertEquals(VARPA(1, 2, 3, 4, 5, 6, 7, 8), 5.25);
  assertEquals(VARPA(1, 2, 3, 4, [5, [6]], 7, 8), 5.25);
  assertEquals(VARPA(1, 2, 3, 4, 5, 6, 7, 8, "0"), 6.666666666666667);
  assertEquals(VARPA(1, 2, 3, 4, 5, 6, 7, 8, "10"), 7.654320987654322);
  assertEquals(VARPA(1, 2, 3, 4, 5, 6, 7, 8, false), 6.666666666666667);
  catchAndAssertEquals(function() {
    VARPA(1);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    VARPA(1, 2, 3, 4, 5, 6, 7, 8, "ignore");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    VARPA.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("VARP", function() {
  assertEquals(VARP(1, 2, 3, 4, 5, 6, 7, 8), 5.25);
  assertEquals(VARP(1, 2, 3, 4, [5, [6]], 7, 8), 5.25);
  assertEquals(VARP(1, 2, 3, 4, 5, 6, 7, 8, "0"), 6.666666666666667);
  assertEquals(VARP(1, 2, 3, 4, 5, 6, 7, 8, "10"), 7.654320987654322);
  assertEquals(VARP(1, 2, 3, 4, 5, 6, 7, 8, false), 6.666666666666667);
  catchAndAssertEquals(function() {
    VARP(1);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    VARP(1, 2, 3, 4, 5, 6, 7, 8, "ignore");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    VARP.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("VARA", function() {
  assertEquals(VARA(1, 2, 3, 4, 5, 6, 7, 8), 6);
  assertEquals(VARA(1, 2, 3, 4, 5, 6, 7, 8, "0"), 7.5);
  assertEquals(VARA(1, 2, 3, 4, 5, 6, 7, 8, false), 7.5);
  assertEquals(VARA(1, 2, 3, 4, 5, 6, 7, 8, "10"), 8.611111111111112);
  catchAndAssertEquals(function() {
    VARA(1);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    VARA(1, 2, 3, 4, 5, 6, 7, 8, "ignore");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    VARA.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("VAR", function() {
  assertEquals(VAR(1, 2, 3, 4, 5, 6, 7, 8), 6);
  assertEquals(VAR(1, 2, 3, 4, 5, 6, 7, 8, "0"), 7.5);
  assertEquals(VAR(1, 2, 3, 4, 5, 6, 7, 8, false), 7.5);
  assertEquals(VAR(1, 2, 3, 4, 5, 6, 7, 8, "10"), 8.611111111111112);
  catchAndAssertEquals(function() {
    VAR(1);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    VAR(1, 2, 3, 4, 5, 6, 7, 8, "ignore");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    VAR.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("PERMUT", function() {
  assertEquals(PERMUT(4, 2), 12);
  assertEquals(PERMUT(44, 2), 1892);
  assertEquals(PERMUT(11, 1), 11);
  assertEquals(PERMUT(4, 0), 1);
  assertEquals(PERMUT(0, 0), 1);
  catchAndAssertEquals(function() {
    PERMUT(4, 20);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    PERMUT.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PERMUT.apply(this, [1, 2, 3]);
  }, ERRORS.NA_ERROR);
});

test("RSQ", function() {
  assertEquals(RSQ([10, 22, 4], [1, 3, 7]), 0.2500000000000001);
  assertEquals(RSQ([10, 22], [1, 3]), 1);
  catchAndAssertEquals(function() {
    RSQ([1, 2, 3], [1, 2]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RSQ(1, 1);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    RSQ.apply(this, [[1], [1], [1]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RSQ.apply(this, [[1]]);
  }, ERRORS.NA_ERROR);
});

test("SKEW", function() {
  assertEquals(SKEW(1, 2, 3, 4, 5, 6), 0);
  assertEquals(SKEW(1, 2, 3,[4, 5], 6), 0);
  assertEquals(SKEW(1, 2, 3, 4, 5, 6, 100), 2.6336050735387375);
  catchAndAssertEquals(function() {
    SKEW(1)
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    SKEW.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("STEYX", function() {
  assertEquals(STEYX([1, 2, 3, 4], [1, 3, 5, 2]), 1.4638501094227998);
  assertEquals(STEYX([1, 2, 3, 4, "str"], [1, 3, 5, 2, "str"]), 1.4638501094227998);
  assertEquals(STEYX([1, 2, 3], [1, 3, 5]), 0);
  catchAndAssertEquals(function() {
    STEYX([1, 2], [1, 3]);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    STEYX([1, 2, 3, 4], [1, 2, 3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    STEYX.apply(this, [[1, 2, 3]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    STEYX.apply(this, [[1, 2, 3], [1, 2, 3], [1, 2, 3]]);
  }, ERRORS.NA_ERROR);
});

test("PROB", function() {
  assertEquals(PROB([1, 2, 3, 4], [0.25, 0.25, 0.25, 0.25], 3), 0.25);
  assertEquals(PROB([1], [1], 3), 0);
  assertEquals(PROB([1], [1], 0.1, 100), 1);
  assertEquals(PROB([1, 2, 3], [0.25, 0.25, 0.5], 3), 0.5);
  assertEquals(PROB([1, 2, 4], [0.25, 0.25, 0.5], 3), 0);
  assertEquals(PROB([1, 2, 3], [0.25, 0.25, 0.5], 3, 100), 0.5);
  assertEquals(PROB([1, 2, 3], [0.25, 0.25, 0.5], 0.1, 100), 1);
  catchAndAssertEquals(function() {
    PROB([1, 2, 3, 4], [0.25, 0.25, 0.25], 3);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PROB([1, 2, 3, 4], [0.25, 0.25, 0.25, 0.99], 3);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    PROB.apply(this, [[1, 2, 3, 4], [0.25, 0.25, 0.25]]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PROB.apply(this, [[1, 2, 3, 4], [0.25, 0.25, 0.25], 10, 10, 10]);
  }, ERRORS.NA_ERROR);
});

test("MODE", function() {
  assertEquals(MODE(1, 6, 7, 7, 8), 7);
  assertEquals(MODE(1, 6, 6, 7, 7, 8), 6);
  assertEquals(MODE(1, 6, 6, 7, 8), 6);
  assertEquals(MODE(1, 6, 6, 7, "10"), 6);
  assertEquals(MODE(1), 1);
  catchAndAssertEquals(function() {
    MODE(1, 2, 8);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MODE();
  }, ERRORS.NA_ERROR);
});

test("RANK", function() {
  assertEquals(RANK(2, [1, 2, 3, 4, 5, 6, 7, 8, 9], true), 2);
  assertEquals(RANK(3, [1, 3, 4, 5, 6, 7, 8, 9]), 7);
  assertEquals(RANK(3, [1, 3, 4, 5, 6, 7, 8, 9], true), 2);
  assertEquals(RANK(2, [7, 1, 2, 4, 100, 8, 9], true), 2);
  catchAndAssertEquals(function() {
    RANK(44, [7, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RANK.apply(this, [44]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RANK.apply(this, [44, [7, 1], true, false]);
  }, ERRORS.NA_ERROR);
});

test("RANK.AVG", function() {
  assertEquals(RANK$AVG(2, [1, 2, 2, 3, 4, 5, 6, 7, 8, 9], true), 2.5);
  assertEquals(RANK$AVG(2, [1, 2, 2, 3, 4, 5, 6, 7, 8, 9]), 8.5);
  assertEquals(RANK$AVG(2, [2]), 1);
  assertEquals(RANK$AVG(2, [1, 2, 3, 4, 5, 6, 7, 8, 9], true), 2);
  assertEquals(RANK$AVG(3, [1, 3, 4, 5, 6, 7, 8, 9]), 7);
  assertEquals(RANK$AVG(3, [1, 3, 4, 5, 6, 7, 8, 9], true), 2);
  assertEquals(RANK$AVG(2, [7, 1, 2, 4, 100, 8, 9], true), 2);
  catchAndAssertEquals(function() {
    RANK$AVG(44, [7, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RANK$AVG.apply(this, [44]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RANK$AVG.apply(this, [44, [7, 1], true, false]);
  }, ERRORS.NA_ERROR);
});

test("RANK.EQ", function() {
  assertEquals(RANK$EQ(2, [1, 2, 3, 4, 5, 6, 7, 8, 9], true), 2);
  assertEquals(RANK$EQ(4, [2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9], true), 6);
  assertEquals(RANK$EQ(2, [1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9], true), 2);
  assertEquals(RANK$EQ(3, [2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9], true), 3);
  assertEquals(RANK$EQ(3, [1, 3, 4, 5, 6, 7, 8, 9]), 7);
  assertEquals(RANK$EQ(3, [1, 3, 4, 5, 6, 7, 8, 9], true), 2);
  assertEquals(RANK$EQ(2, [7, 1, 2, 4, 100, 8, 9], true), 2);
  catchAndAssertEquals(function() {
    RANK$EQ(44, [7, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RANK$EQ.apply(this, [44]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RANK$EQ.apply(this, [44, [7, 1], true, false]);
  }, ERRORS.NA_ERROR);
});

test("LOGNORMDIST", function() {
  assertEquals(LOGNORMDIST(4, 4, 6), 0.33155709720516946);
  assertEquals(LOGNORMDIST(1, 4, 6), 0.2524925375469229);
  assertEquals(LOGNORMDIST(2, 4, 6), 0.29076812115284056);
  assertEquals(LOGNORMDIST(20, 100, 6), 0);
  catchAndAssertEquals(function() {
    LOGNORMDIST(0, 4, 6);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    LOGNORMDIST(-10, 4, 6);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    LOGNORMDIST(1, 4, -6);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    LOGNORMDIST(1, 4, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    LOGNORMDIST.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LOGNORMDIST.apply(this, [4, 4, 4, 4]);
  }, ERRORS.NA_ERROR);
});

test("TDIST", function() {
  assertEquals(TDIST(0.55, 1, 2), 0.6798800684756632);
  assertEquals(TDIST(0.55, 1, 1), 0.3399400342378316);
  assertEquals(TDIST(0.55, 100, 1), 0.29177287888140824);
  catchAndAssertEquals(function() {
    TDIST(0.55, -1, 1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    TDIST(0.55, 1, 44);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    TDIST(0.55, 1, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    TDIST(-1, 1, 1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    TDIST.apply(this, [4, 4, 4, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TDIST.apply(this, [4, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TDIST.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("HYPGEOMDIST", function() {
  assertEquals(HYPGEOMDIST(4, 12, 20, 44), 0.16895408557348432);
  assertEquals(HYPGEOMDIST(5, 12, 20, 40), 0.21512468231044427);
  assertEquals(HYPGEOMDIST(1, 12, 29, 40), 5.190757213128131e-9);
  catchAndAssertEquals(function() {
    HYPGEOMDIST(1, 12, 30, 40);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    HYPGEOMDIST(1, 12, 35, 40);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    HYPGEOMDIST(1, 12, 35, 40);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    HYPGEOMDIST(-1, 12, 20, 44);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    HYPGEOMDIST(13, 12, 20, 44);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    HYPGEOMDIST.apply(this, [5, 12, 20]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    HYPGEOMDIST.apply(this, [5, 12, 20, 40, 44]);
  }, ERRORS.NA_ERROR);
});

test("ZTEST", function() {
  assertEquals(ZTEST([1, 2, 3, 4, 5, 6, 7], 5.6, 1.1), 0.9999405457342111);
  assertEquals(ZTEST([1, 2, 3, 4], 10.1, 1.1), 1);
  assertEquals(ZTEST([1, 2, 3, 4, 5, 6, 7], 5.6, 22), 0.5762927116053485);
  assertEquals(ZTEST([1, 2, 3, 4, 5, 6, 7], -100, -100), 0.9970345857641326);
  catchAndAssertEquals(function() {
    ZTEST.apply(this, [5]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ZTEST.apply(this, [1, 2, 3, 4]);
  }, ERRORS.NA_ERROR);
});