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
  PMT,
  SYD,
  SLN,
  NPV,
  NPER,
  NOMINAL,
  MIRR,
  IRR,
  IPMT,
  FV,
  PPMT,
  FVSCHEDULE,
  PV,
  RATE
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
import {
  Cell
} from "../../src/Cell";


test("ACCRINT", function(){
  assertEquals(ACCRINT(DATE(2000, 1, 1), DATE(2000, 2, 1), DATE(2002, 12, 31), 0.05, Cell.BuildFrom("A1", 100), 4), 14.98631386861314);
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
    ACCRINT.apply(this, [100, 2, 1, 0.1, 1000]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ACCRINT.apply(this, [1, 2, 1461, 0.1, 1000, 1, 1, 1]);
  }, ERRORS.NA_ERROR);
});


test("CUMPRINC", function(){
  assertEquals(CUMPRINC(0.12, 12, 100, 1, Cell.BuildFrom("A1", 5), false), -26.324171373034403);
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
    CUMPRINC.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CUMPRINC.apply(this, [0.12, 12, 100, 1, 5, true, 55]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CUMPRINC.apply(this, [0.12, 12, 100, 1, 5]);
  }, ERRORS.NA_ERROR);
});


test("CUMIPMT", function(){
  assertEquals(CUMIPMT(0.12, 12, 100, 1, Cell.BuildFrom("A1", 5), 0), -54.39423242396348);
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
    CUMIPMT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CUMIPMT.apply(this, [0.12, 12, 100, 1, 5, true, 55]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CUMIPMT.apply(this, [0.12, 12, 100, 1, 5]);
  }, ERRORS.NA_ERROR);
});


test("DB", function(){
  assertEquals(DB(100, 50, 10, 2, Cell.BuildFrom("A1", 12)), 6.2482428240683285);
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
  assertEquals(DDB(100, 50, 10, 2, Cell.BuildFrom("A1", 2.25)), 17.4375);
  assertEquals(DDB(100, 50, 10, 2, 2.25), 17.4375);
  assertEquals(DDB(100, [50], 10, 2, "2.25"), 17.4375);
  catchAndAssertEquals(function() {
    DDB.apply(this, [100, 50, 10, 12, 2.25]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DDB.apply(this, [100, -50, 10, 2, 12]);
  }, ERRORS.NUM_ERROR);
});


test("DOLLAR", function(){
  assertEquals(DOLLAR(1.2351, Cell.BuildFrom("A1", 4)), 1.2351);
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
    DOLLAR.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLAR.apply(this, [3.1, 1, 1]);
  }, ERRORS.NA_ERROR);
});


test("DOLLARDE", function(){
  assertEquals(DOLLARDE(0, Cell.BuildFrom("A1", 32)), 0);
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
    DOLLARDE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLARDE.apply(this, [3.1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLARDE.apply(this, [3.1, 32, 22]);
  }, ERRORS.NA_ERROR);
});


test("DOLLARFR", function(){
  assertEquals(DOLLARFR(100.1, Cell.BuildFrom("A1", 32)), 100.032);
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
    DOLLARFR.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLARFR.apply(this, [3.1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DOLLARFR.apply(this, [3.1, 32, 22]);
  }, ERRORS.NA_ERROR);
});


test("EFFECT", function(){
  assertEquals(EFFECT(0.99, Cell.BuildFrom("A1", 12)), 1.5890167507927795);
  assertEquals(EFFECT(0.99, 12), 1.5890167507927795);
  assertEquals(EFFECT(0.99, 12.111), 1.5890167507927795);
  assertEquals(EFFECT(0.99, 12.999), 1.5890167507927795);
  assertEquals(EFFECT("100000", 12.999), 1.123182670038387e+47);
  assertEquals(EFFECT([100000], [12.999]), 1.123182670038387e+47);
  catchAndAssertEquals(function() {
    EFFECT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EFFECT.apply(this, [0.99]);
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


test("SYD", function() {
  assertEquals(SYD(100, 22, 10, 3), 11.345454545454546);
  assertEquals(SYD(33.99, 22, 10, 3), 1.7440000000000002);
  assertEquals(SYD(39, 22, 1000, 300), 0.02381018981018981);
  catchAndAssertEquals(function() {
    SYD(39, 22, 10, 300);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    SYD(39, 22, 10, -3);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    SYD.apply(this, [10, 10, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SYD.apply(this, [10, 10, 10, 10, 10]);
  }, ERRORS.NA_ERROR);
});


test("SLN", function() {
  assertEquals(SLN(100, 22, 10), 7.80);
  assertEquals(SLN(22.99, 1, 1), 21.99);
  assertEquals(SLN(22.99, 1, -1), -21.99);
  catchAndAssertEquals(function() {
    SLN(39, 22, 0);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    SLN.apply(this, [10, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SLN.apply(this, [10, 10, 10, 10]);
  }, ERRORS.NA_ERROR);
});


test("NPV", function() {
  assertEquals(NPV(0.01, 200, 100, 22, 99.1), 416.7618977366809);
  assertEquals(NPV(0.01, 200, -100, 1.4, -100.2, 22, 99.1, "100"), 214.7457214025921);
  assertEquals(NPV(0.01, 200, -100, 1.4, -100.2, 22, 99.1), 120.54119787717146);
  assertEquals(NPV(0.01, 200, 100, 22, 99000), 96409.00105891385);
  catchAndAssertEquals(function() {
    NPV.apply(this, [10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NPV.apply(this, [10, 10, 20, "str"]);
  }, ERRORS.VALUE_ERROR);
});


test("NPER", function() {
  assertEquals(NPER(0.04, 100, 4000, 0, 0), -24.362418941571317);
  assertEquals(NPER(0.04, 100, 4000), -24.362418941571317);
  assertEquals(NPER(0.02, 100, 4000, 0, 0), -29.68225660720854);
  assertEquals(NPER(0.01, 100, 4000, 0, 0), -33.815180780052486);
  assertEquals(NPER(0.04, -50, 1000, 20, 0), 41.44012515117696);
  assertEquals(NPER(-0.04, -50, 1000, 20, 0), 14.79388878297825);
  assertEquals(NPER(0.04, -50, 1000, 2000, 1), 61.13849239372526);
  assertEquals(NPER(0.04, -50, 1000, 2000, 0), 65.39782556827234);
  catchAndAssertEquals(function() {
    NPER(0.04, 50, 1000, 2000, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NPER.apply(this, [0.04, 100]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NPER.apply(this, [0.04, -50, 1000, 2000, 0, 22]);
  }, ERRORS.NA_ERROR);
});


test("NOMINAL", function() {
  assertEquals(NOMINAL(0.8, 12), 0.6024201620105654);
  assertEquals(NOMINAL(0.9, 2), 0.7568097504180442);
  catchAndAssertEquals(function() {
    NOMINAL(0.04, -2);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NOMINAL.apply(this, [0.04, -50, 44]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NOMINAL.apply(this, [0.04]);
  }, ERRORS.NA_ERROR);
});


test("MIRR", function() {
  assertEquals(MIRR([10, 20, -30, 40], 0.05, 0.06), 0.3458084697540138);
  assertEquals(MIRR([10, 20, -30, 40, 10, 22, -100], 0.01, 0.02), -0.02762369541445353);
  catchAndAssertEquals(function() {
    MIRR([10, 20, 30, 40], 0.05, 0.06);
  }, ERRORS.DIV_ZERO_ERROR);
  catchAndAssertEquals(function() {
    MIRR.apply(this, [[10, 20, 30, -10], 0.05]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MIRR.apply(this, [[10, 20, 30, -10], 0.05, 0.01, 0.09]);
  }, ERRORS.NA_ERROR);
});


test("MIRR", function() {
  assertEquals(IRR([-1, 4, 10, 15, -22, 99, 44, 1000, -10, "ignore"]), 5.059102535247803);
  assertEquals(IRR([-1, 4, 10, 15, -22, 99, 44, 1000, -10]), 5.059102535247803);
  assertEquals(IRR([-1, 4, 10, 15, -22, 99, 44, 1000, -10], 0.1), 5.059102535247803);
  assertEquals(IRR([-100, 100, 100, 100, 100, 100]), 0.9659482464194298);
  assertEquals(IRR([-100, 100, 100, 100, 100]), 0.9275619648396969);
  assertEquals(IRR([-4000, 200, 250, 300, 350]), -0.35242662353266496);
  assertEquals(IRR([-100, 100]), 9.313225746154785e-9);
  assertEquals(IRR([-100, 100, 100]), 0.6180339809507132);
  catchAndAssertEquals(function() {
    IRR.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    IRR.apply(this, [[100, 100, 100], 0.01, 4.4]);
  }, ERRORS.NA_ERROR);
});


test("IPMT", function() {
  assertEquals(IPMT(0.025, 1, 66, 25000), -625);
  assertEquals(IPMT(0.025, 1, 66, 25000, 0, 0), -625);
  assertEquals(IPMT(0.025, 1, 66, 25000, 1, 1), 0);
  assertEquals(IPMT(0.025, 1, 66, 25000, 1, 0), -625);
  assertEquals(IPMT(100, 1, 66, 25000, 0), -2500000);
  assertEquals(IPMT(0.1, 4, 660, 4, 1), -0.4);
  catchAndAssertEquals(function() {
    IPMT.apply(this, [0.025, 1, 66]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    IPMT.apply(this, [0.025, 1, 66, 25000, 0, 0, 1]);
  }, ERRORS.NA_ERROR);
});


test("FV", function() {
  assertEquals(FV(0.025, 1, 66, 25000, 0), -25690.999999999996);
  assertEquals(FV(0.025, 1, 66, 25000), -25690.999999999996);
  assertEquals(FV(0.05, 1, 66, 25000), -26316);
  assertEquals(FV(0.025, 1, 66, 25000, 1), -25692.649999999998);
  catchAndAssertEquals(function() {
    FV.apply(this, [0.025, 1, 66, 25000, 1, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FV.apply(this, [0.025, 1]);
  }, ERRORS.NA_ERROR);
});


test("PPMT", function() {
  assertEquals(PPMT(0.025, 4, 24, 50000, 0, 1), -1623.8890945416422);
  assertEquals(PPMT(0.010, 3, 24, 33000, 0, 1), -1235.6588292014105);
  assertEquals(PPMT(0, 3, 24, 33000, 0, 1), -1375.00);
  assertEquals(PPMT(0, 3, 24, 0, 0, 1), 0);
  assertEquals(PPMT(0, 1, 3, 100, -1000, 1), 300);
  catchAndAssertEquals(function() {
    PPMT(0, 0, 24, 33000, 0, 1)
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    PPMT(0, 4, 0, 33000, 0, 1)
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    PPMT.apply(this, [0, 4, 0]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PPMT.apply(this, [0, 4, 0, 4000, 1, 1, 1]);
  }, ERRORS.NA_ERROR);
});


test("FVSCHEDULE", function() {
  assertEquals(FVSCHEDULE(0.025, [1, 2, 3, 4]), 3.0000000000000004);
  assertEquals(FVSCHEDULE(0.025, [1, 2, 3, 4]), 3.0000000000000004);
  assertEquals(FVSCHEDULE(20000, [0.01, 0.04, 0.1, 0.01]), 23339.888000000003);
  assertEquals(FVSCHEDULE(0, [1, 2]), 0);
  assertEquals(FVSCHEDULE(-1, [1, 2]), -6);
  catchAndAssertEquals(function() {
    FVSCHEDULE.apply(this, [0.025, []]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    FVSCHEDULE.apply(this, [0.025, [1, 2, 3, 4], 3]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FVSCHEDULE.apply(this, [0.025]);
  }, ERRORS.NA_ERROR);
});


test("PV", function() {
  assertEquals(PV(2, 12, 100), -49.99990591617884);
  assertEquals(PV(2, 12, 200), -99.99981183235768);
  assertEquals(PV(2, -1, 200), 200.00000000000003);
  assertEquals(PV(2, 1, 0), 0);
  assertEquals(PV(2, 1, 0, 100), -33.333333333333336);
  assertEquals(PV(2, 1, 0, 100), -33.333333333333336);
  assertEquals(PV(2, 3, 100, 100, 1), -148.14814814814815);
  assertEquals(PV(2, 3, 100, 100, 0), -51.851851851851855);
  catchAndAssertEquals(function() {
    PV(-1, 12, 100);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    PV.apply(this, [0, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    PV.apply(this, [0, 1, 2, 3, 4, 5]);
  }, ERRORS.NA_ERROR);
});


test("RATE", function() {
  assertEquals(RATE(12, -100, 400, 0, 0, 0.1), 0.22893307069316507);
  assertEquals(RATE(360, -665.3, 99000), 0.005916521358085446);
  assertEquals(RATE(360, -958.63, 192000), 0.0036458502960158515);
  assertEquals(RATE(180, -1302.96, 192000), 0.0022917255526408564);
  assertEquals(RATE(360, -889.19, 192000), 0.0031250616819306744);
  assertEquals(RATE(360, -1145.8, 240000), 0.003333353153720964);
  assertEquals(RATE(360, -665.3, 99000, 10), 0.00591642102735932);
  assertEquals(RATE(12, -100, 400, 100), 0.2225948800332845);
  assertEquals(RATE(360, -665.3, 99000, 10, 1), 0.005965913048930816);
  catchAndAssertEquals(function() {
    RATE(0, -100, 400, 10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    RATE(12, -100, 400, 1000000);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    RATE.apply(this, [0, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RATE.apply(this, [1, 2, 3, 4, 5, 6, 7]);
  }, ERRORS.NA_ERROR);
});