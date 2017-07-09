import {
  BIN2DEC,
  BIN2HEX,
  BIN2OCT,
  DEC2BIN,
  DEC2HEX,
  DEC2OCT,
  DELTA
} from "../../src/Formulas/Engineering";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";
import {
  Cell
} from "../../src/Cell";


test("BIN2DEC", function(){
  assertEquals(BIN2DEC(Cell.BuildFrom("A1", "1010101010")), -342);
  assertEquals(BIN2DEC("1010101010"), -342);
  assertEquals(BIN2DEC("10"), 2);
  assertEquals(BIN2DEC(["10", "str"]), 2);
  catchAndAssertEquals(function() {
    BIN2DEC(false);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    BIN2DEC("str");
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BIN2DEC.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    BIN2DEC.apply(this, ["10", "10"]);
  }, ERRORS.NA_ERROR);
});


test("BIN2HEX", function(){
  assertEquals(BIN2HEX(Cell.BuildFrom("A1", "1010101010")), "FFFFFFFEAA");
  assertEquals(BIN2HEX("1010101010"), "FFFFFFFEAA");
  assertEquals(BIN2HEX("10"), "2");
  assertEquals(BIN2HEX("10101010"), "AA");
  assertEquals(BIN2HEX("10101010", 4), "00AA");
  assertEquals(BIN2HEX(["10101010"], [4]), "00AA");
  catchAndAssertEquals(function() {
    BIN2HEX("10101010", 22);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BIN2HEX(false);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    BIN2HEX("10101010", 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BIN2DEC("str");
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BIN2DEC.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    BIN2DEC.apply(this, ["10", 4, 4]);
  }, ERRORS.NA_ERROR);

});


test("BIN2OCT", function(){
  assertEquals(BIN2OCT(Cell.BuildFrom("A1", "1010101010")), "7777777252");
  assertEquals(BIN2OCT("1010101010"), "7777777252");
  assertEquals(BIN2OCT("10"), "2");
  assertEquals(BIN2OCT("100"), "4");
  assertEquals(BIN2OCT("10101010"), "252");
  assertEquals(BIN2OCT("10101010", 4), "252");
  assertEquals(BIN2OCT(["10101010"], [4]), "252");
  catchAndAssertEquals(function() {
    BIN2OCT("10101010", 22);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BIN2OCT(false);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    BIN2OCT("10101010", 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BIN2OCT("str");
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    BIN2OCT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    BIN2OCT.apply(this, ["10", 4, 4]);
  }, ERRORS.NA_ERROR);
});


test("DEC2BIN", function(){
  assertEquals(DEC2BIN(Cell.BuildFrom("A1", 100)), "1100100");
  assertEquals(DEC2BIN([100]), "1100100");
  assertEquals(DEC2BIN(100), "1100100");
  assertEquals(DEC2BIN(22), "10110");
  assertEquals(DEC2BIN(22.11), "10110");
  assertEquals(DEC2BIN(22.77), "10110");
  assertEquals(DEC2BIN("22.77"), "10110");
  assertEquals(DEC2BIN(100, 8), "01100100");
  assertEquals(DEC2BIN([100], [8]), "01100100");
  assertEquals(DEC2BIN(100, 7), "1100100");
  assertEquals(DEC2BIN(100, 10), "0001100100");
  assertEquals(DEC2BIN(-100), "1110011100");
  assertEquals(DEC2BIN("-22.77"), "1111101010");
  assertEquals(DEC2BIN(-22.11), "1111101010");
  assertEquals(DEC2BIN(-22), "1111101010");
  assertEquals(DEC2BIN(false), "0");
  assertEquals(DEC2BIN(true), "1");
  catchAndAssertEquals(function() {
    DEC2BIN(100, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DEC2BIN(513, 10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DEC2BIN.apply(this, [100, 100, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DEC2BIN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DEC2BIN("str");
  }, ERRORS.VALUE_ERROR);
});


test("DEC2HEX", function(){
  assertEquals(DEC2HEX(Cell.BuildFrom("A1", 100)), "64");
  assertEquals(DEC2HEX([100]), "64");
  assertEquals(DEC2HEX(100), "64");
  assertEquals(DEC2HEX(22), "16");
  assertEquals(DEC2HEX(22.11), "16");
  assertEquals(DEC2HEX(22.77), "16");
  assertEquals(DEC2HEX("22.77"), "16");
  assertEquals(DEC2HEX(100, 8), "00000064");
  assertEquals(DEC2HEX([100], [8]), "00000064");
  assertEquals(DEC2HEX(100, 7), "0000064");
  assertEquals(DEC2HEX(100, 10), "0000000064");
  assertEquals(DEC2HEX(-100), "FFFFFFFF9C");
  assertEquals(DEC2HEX("-22.77"), "FFFFFFFFEA");
  assertEquals(DEC2HEX(-22.11), "FFFFFFFFEA");
  assertEquals(DEC2HEX(-22), "FFFFFFFFEA");
  assertEquals(DEC2HEX(false), "0");
  assertEquals(DEC2HEX(true), "1");
  catchAndAssertEquals(function() {
    DEC2HEX(100, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DEC2HEX(549755813889, 10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DEC2HEX(54975581, -10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DEC2HEX.apply(this, [100, 100, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DEC2HEX.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DEC2HEX("str");
  }, ERRORS.VALUE_ERROR);
});


test("DEC2OCT", function(){
  assertEquals(DEC2OCT(Cell.BuildFrom("A1", 100)), "144");
  assertEquals(DEC2OCT([100]), "144");
  assertEquals(DEC2OCT(100), "144");
  assertEquals(DEC2OCT(22), "26");
  assertEquals(DEC2OCT(22.11), "26");
  assertEquals(DEC2OCT(22.77), "26");
  assertEquals(DEC2OCT("22.77"), "26");
  assertEquals(DEC2OCT(100, 8), "00000144");
  assertEquals(DEC2OCT([100], [8]), "00000144");
  assertEquals(DEC2OCT(100, 7), "0000144");
  assertEquals(DEC2OCT(100, 10), "0000000144");
  assertEquals(DEC2OCT(-100), "7777777634");
  assertEquals(DEC2OCT("-22.77"), "7777777752");
  assertEquals(DEC2OCT(-22.11), "7777777752");
  assertEquals(DEC2OCT(-22), "7777777752");
  assertEquals(DEC2OCT(false), "0");
  assertEquals(DEC2OCT(true), "1");
  catchAndAssertEquals(function() {
    DEC2OCT(100, 0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DEC2OCT(536870913, 10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DEC2OCT(536870910, -10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DEC2OCT.apply(this, [100, 100, 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DEC2OCT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DEC2OCT("str");
  }, ERRORS.VALUE_ERROR);
});


test("DELTA", function(){
  assertEquals(DELTA(Cell.BuildFrom("A1", 2), 2), 1);
  assertEquals(DELTA(2, 2), 1);
  assertEquals(DELTA(2, 1), 0);
  assertEquals(DELTA(2), 0);
  assertEquals(DELTA("", ""), 1);
  assertEquals(DELTA(false), 1);
  assertEquals(DELTA(true), 0);
  assertEquals(DELTA(2.2, 2.1), 0);
  assertEquals(DELTA(1, true), 1);
  assertEquals(DELTA(0, false), 1);
  assertEquals(DELTA(true, true), 1);
  catchAndAssertEquals(function() {
    DELTA("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DELTA("n", "n");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DELTA.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DELTA.apply(this, [1, 2, 3]);
  }, ERRORS.NA_ERROR);
});
