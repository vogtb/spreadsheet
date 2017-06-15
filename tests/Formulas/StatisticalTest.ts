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
  STDEVP
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
