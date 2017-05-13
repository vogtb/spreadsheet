import {
  ACCRINT,
  CUMPRINC,
  CUMIPMT,
  DB,
  DDB,
  DOLLAR,
  DOLLARDE,
  DOLLARFR,
  EFFECT,
  PMT
} from "../../src/Formulas/Financial";
import {
  DATE
} from "../../src/Formulas/Date";
import {
  PI
} from "../../src/Formulas/Math";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";


test("ACCRINT", function(){
  assertEquals(ACCRINT(DATE(2000, 1, 1), DATE(2000, 2, 1), DATE(2002, 12, 31), 0.05, 100, 4), 14.98631386861314);
  assertEquals(ACCRINT(DATE(2011, 1, 1), DATE(2011, 2, 1), DATE(2014, 7, 1), 0.1, 1000, 1, 0), 350);
  assertEquals(ACCRINT(DATE(2001, 1, 1), DATE(2011, 2, 1), DATE(2014, 7, 1), 0.1, 1000, 2, 1), 1349.6186192059456);
  assertEquals(ACCRINT(39508, 39691, 39569, 0.1, 1000, 2, 0), 16.666666666666664);
  assertEquals(ACCRINT(10000, 1, 20000, 0.1, 1000, 4, 0), 2737.5);
  assertEquals(ACCRINT(10000, 1, 20000, 0.1, 1000, 4, 1), 2737.8507871321012); // ms: 2787.087912 (1.76% err), gs: 2737.637363 (0.007% err)
  assertEquals(ACCRINT(10000, 1, 20000, 0.1, 1000, 4, 2), 2777.777777777778); // ms, gs: 2737.777778 (1.46% err)
  assertEquals(ACCRINT(10000, 1, 20000, 0.1, 1000, 4, 3), 2739.72602739726); //ms, gs: 2737.60274 (0.077% err)
  assertEquals(ACCRINT(10000, 1, 20000, 0.1, 1000, 4, 4), 2737.5);
  assertEquals(ACCRINT(1, 44, "1461", "0.1", [1000], [1]), 400);
  assertEquals(ACCRINT(1, 2, 1461, 0.1, 1000, 1), 400);
  assertEquals(ACCRINT(1, 2, 1461, 0.1, 1000, 1, 0), 400);
  assertEquals(ACCRINT(1, 2, 1461, 0.1, 1000, 1, 1), 400);
  assertEquals(ACCRINT(1, 2, 1461, 0.1, 1000, 1, 2), 405.55555555555554); // gs: 400
  assertEquals(ACCRINT(1, 2, 1461, 0.1, 1000, 1, 3), 400); // gs: 399.6575342
  assertEquals(ACCRINT(1, 2, 1461, 0.1, 1000, 1, 4), 400);
  catchAndAssertEquals(function() {
    ACCRINT(1, -1, 100, 0.1, 1000, 1, 4);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    ACCRINT(100, 2, 1, 0.1, 1000, 1, 4);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    ACCRINT(100, 2, 1, 0.1, 1000);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ACCRINT(1, 2, 1461, 0.1, 1000, 1, 1, 1);
  }, ERRORS.NA_ERROR);
});


test("CUMPRINC", function(){
  assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, false), -26.324171373034403);
  assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, 0), -26.324171373034403);
  assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, true), -34.21801015449499);
  assertEquals(CUMPRINC(0.12, 12, 100, 1, 5, -11), -34.21801015449499);
  catchAndAssertEquals(function() {
    CUMPRINC(0.12, 12, 100, 1, 5, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    CUMPRINC(0.12, 12, 100, 0, 5, false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CUMPRINC(0.12, 12, 100, 3, 1, false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CUMPRINC();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CUMPRINC(0.12, 12, 100, 1, 5, true, 55);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CUMPRINC(0.12, 12, 100, 1, 5);
  }, ERRORS.NA_ERROR);
});


test("CUMIPMT", function(){
  assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, 0), -54.39423242396348);
  assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, false), -54.39423242396348);
  assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, true), -37.851993235681675);
  assertEquals(CUMIPMT(0.12, 12, 100, 1, 5, 1), -37.851993235681675);
  assertEquals(CUMIPMT(0.12, 12, 100, 2, 6, 1), -45.74583201714228);
  assertEquals(CUMIPMT(0.12, 12, 100, 2, 6, true), -45.74583201714228);
  assertEquals(CUMIPMT([0.12], ["12"], [100, "str"], "1", 5, 0), -54.39423242396348);
  catchAndAssertEquals(function() {
    CUMIPMT(0.12, 12, 100, 1, 5, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    CUMIPMT(0.12, 12, 100, 0, 5, false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CUMIPMT(0.12, 12, 100, 3, 1, false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CUMIPMT();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CUMIPMT(0.12, 12, 100, 1, 5, true, 55);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CUMIPMT(0.12, 12, 100, 1, 5);
  }, ERRORS.NA_ERROR);
});


test("DB", function(){
  assertEquals(DB(100, 50, 10, 2, 12), 6.2482428240683285);
  assertEquals(DB("100", "50", "10", "2", "12"), 6.2482428240683285);
  assertEquals(DB(100, 50, 10, 2, 12.9999999), 6.2482428240683285);
  catchAndAssertEquals(function() {
    DB(100, 50, 10, 2, 13);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DB(100, 50, 10, 12, 2);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DB(100, -50, 10, 2, 12);
  }, ERRORS.NUM_ERROR);
});


test("DDB", function(){
  assertEquals(DDB(100, 50, 10, 2, 2.25), 17.4375);
  assertEquals(DDB(100, [50], 10, 2, "2.25"), 17.4375);
  catchAndAssertEquals(function() {
    DDB(100, 50, 10, 12, 2.25);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DDB(100, -50, 10, 2, 12);
  }, ERRORS.NUM_ERROR);
});


test("DOLLAR", function(){
  assertEquals(DOLLAR(1.2351, 4), 1.2351);
  assertEquals(DOLLAR(1.2351, 2), 1.23);
  assertEquals(DOLLAR("$3.141592653589793", "2"), 3.14);
  assertEquals(DOLLAR("-$3.141592653589793", "2"), -3.14);
  assertEquals(DOLLAR("$-3.141592653589793", "2"), -3.14);
  assertEquals(DOLLAR(PI(), 1), 3.1);
  assertEquals(DOLLAR(PI(), 0), 3);
  assertEquals(DOLLAR(PI(), false), 3);
  assertEquals(DOLLAR(PI(), -1), 0);
  assertEquals(DOLLAR(31.41592653589793, -1), 30);
  assertEquals(DOLLAR([31.41592653589793], [-1]), 30);
  assertEquals(DOLLAR(31111.41592653589793, -4), 30000);
  assertEquals(DOLLAR(31111.41592653589793, -2), 31100);
  catchAndAssertEquals(function() {
    DOLLAR();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLAR(3.1, 1, 1);
  }, ERRORS.NA_ERROR);
});


test("DOLLARDE", function(){
  assertEquals(DOLLARDE(0, 32), 0);
  assertEquals(DOLLARDE(100.1, 32), 100.3125);
  assertEquals(DOLLARDE(100.1, 32.9999), 100.3125);
  assertEquals(DOLLARDE("100.1", [32, "str"]), 100.3125);
  catchAndAssertEquals(function() {
    DOLLARDE(100, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    DOLLARDE(100, "str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DOLLARDE(100, 0);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    DOLLARDE(100, 0.99);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    DOLLARDE();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLARDE(3.1);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLARDE(3.1, 32, 22);
  }, ERRORS.NA_ERROR);
});


test("DOLLARFR", function(){
  assertEquals(DOLLARFR(100.1, 32), 100.032);
  assertEquals(DOLLARFR(100.1, 32), 100.032);
  assertEquals(DOLLARFR(100.1, 32.9999), 100.032);
  assertEquals(DOLLARFR("100.1", [32, "str"]), 100.032);
  catchAndAssertEquals(function() {
    DOLLARFR(100, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    DOLLARFR(100, "str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DOLLARFR(100, 0);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    DOLLARFR(100, 0.99);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    DOLLARFR();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLARFR(3.1);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLARFR(3.1, 32, 22);
  }, ERRORS.NA_ERROR);
});


test("EFFECT", function(){
  assertEquals(EFFECT(0.99, 12), 1.5890167507927795);
  assertEquals(EFFECT(0.99, 12.111), 1.5890167507927795);
  assertEquals(EFFECT(0.99, 12.999), 1.5890167507927795);
  assertEquals(EFFECT("100000", 12.999), 1.123182670038387e+47);
  assertEquals(EFFECT([100000], [12.999]), 1.123182670038387e+47);
  catchAndAssertEquals(function() {
    EFFECT();
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EFFECT(0.99);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EFFECT(-0.99, 12);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    EFFECT(0.99, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    EFFECT(0.99, "str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    EFFECT(0.99, []);
  }, ERRORS.REF_ERROR);
});


test("PMT", function() {
  assertEquals(PMT(0.05/12, 30*12, 100000), -536.8216230121382);
  assertEquals(PMT(0.05/12, 30*12, 100000, 10000), -548.8371186466853);
  assertEquals(PMT(0.05/12, 30*12, 100000, 10000, 0), -548.8371186466853);
  assertEquals(PMT(0.05/12, 30*12, 100000, 10000, false), -548.8371186466853);
  assertEquals(PMT(0.05/12, 30*12, 100000, 10000, 1), -546.559786204168);
  assertEquals(PMT(0.05/12, 30*12, 100000, 10000, 100), -546.559786204168);
  assertEquals(PMT([0.05/12, []], [30*12], ["100000"]), -536.8216230121382);
  assertEquals(PMT(-0.0001, 30*12, 100000, 10000, 1), -301.1033887993179);
  assertEquals(PMT(-0.0001, 1, 100000, 10000, 1), -110001.000100094);
  assertEquals(PMT(-0.0001, 1, 0, 10000, 1), -10001.0001000111);
  assertEquals(PMT(-0.0001, 1, 0, 0, 1), 0);
  catchAndAssertEquals(function() {
    PMT.apply(this, [[[0.05/12]], [], ["100000"]]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    PMT.apply(this);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PMT.apply(this, [0.05/12, 30*12, 100000, 10000, 1, "nope"]);
  }, ERRORS.NA_ERROR);
});