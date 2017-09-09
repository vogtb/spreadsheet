import {
  CHOOSE,
  ADDRESS,
  COLUMNS,
  ROWS
} from "../../src/Formulas/Lookup";
import * as ERRORS from "../../src/Errors";
import {
  catchAndAssertEquals,
  test,
  assertEquals
} from "../Utils/Asserts";
import {
  Cell
} from "../../src/Cell";


test("CHOOSE", function(){
  assertEquals(CHOOSE(1, 1, 2, 3), 1);
  assertEquals(CHOOSE(2, 1, 2, 3), 2);
  catchAndAssertEquals(function() {
    CHOOSE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CHOOSE.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CHOOSE.apply(this, [4, 1, 2, 3]);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CHOOSE.apply(this, [0, 1, 2, 3]);
  }, ERRORS.NUM_ERROR);
});


test("ADDRESS", function(){
  assertEquals(ADDRESS(2170, 2, 4, true, "SheetOne"), "SheetOne!B2170");
  assertEquals(ADDRESS(2170, 2, 4, true, "Sheet_One"), "Sheet_One!B2170");
  assertEquals(ADDRESS(2170, 2, 4, true, "Sheet!One"), "'Sheet!One'!B2170");
  assertEquals(ADDRESS(2170, 2, 4, true, "Sheet^One"), "'Sheet^One'!B2170");
  assertEquals(ADDRESS(2170, 444, 4, true, "SheetOne"), "SheetOne!QB2170");
  assertEquals(ADDRESS(2170, 2, 4, true, "Sheet One"), "'Sheet One'!B2170");
  assertEquals(ADDRESS(2170,2,4,true,"Formula Demo Sheet"), "'Formula Demo Sheet'!B2170");
  assertEquals(ADDRESS(1, 1, 4, true), "A1");
  assertEquals(ADDRESS(2, 1, 4), "A2");
  assertEquals(ADDRESS(2, 2, 4), "B2");
  assertEquals(ADDRESS(1, 2, 4), "B1");
  assertEquals(ADDRESS(1, 1, 4), "A1");
  assertEquals(ADDRESS(1, 1, 3), "$A1");
  assertEquals(ADDRESS(1, 1, 2), "A$1");
  assertEquals(ADDRESS(1, 1, 1), "$A$1");
  assertEquals(ADDRESS(1, 1, 4, false), "R[1]C[1]");
  assertEquals(ADDRESS(1, 1, 3, false), "R[1]C1");
  assertEquals(ADDRESS(1, 1, 2, false), "R1C[1]");
  assertEquals(ADDRESS(1, 1, 1, false), "R1C1");
  assertEquals(ADDRESS.apply(this, [2170, 2, 1, 100, false]), "FALSE!$B$2170");
  assertEquals(ADDRESS.apply(this, [2170, 2, 1, 100, 123456]), "'123456'!$B$2170");
  catchAndAssertEquals(function() {
    ADDRESS.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ADDRESS(1, 2, 5);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    ADDRESS(-1, 2, 1);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    ADDRESS(1, -2, 1);
  }, ERRORS.VALUE_ERROR);
});


test("COLUMNS", function(){
  assertEquals(COLUMNS(1), 1);
  assertEquals(COLUMNS("str"), 1);
  assertEquals(COLUMNS(false), 1);
  assertEquals(COLUMNS(Cell.BuildFrom("A1", "str")), 1);
  assertEquals(COLUMNS([
    Cell.BuildFrom("A1", "str"),
    Cell.BuildFrom("A2", "str"),
    Cell.BuildFrom("A3", "str"),
    Cell.BuildFrom("A4", "str"),
    Cell.BuildFrom("A5", "str"),
    Cell.BuildFrom("A6", "str"),
    Cell.BuildFrom("A7", "str"),
    Cell.BuildFrom("A8", "str"),
    Cell.BuildFrom("B1", "str"),
    Cell.BuildFrom("B2", "str"),
    Cell.BuildFrom("B3", "str"),
    Cell.BuildFrom("B4", "str"),
    Cell.BuildFrom("B5", "str"),
    Cell.BuildFrom("B6", "str"),
    Cell.BuildFrom("B7", "str"),
    Cell.BuildFrom("B8", "str"),
    Cell.BuildFrom("C1", "str"),
    Cell.BuildFrom("C2", "str"),
    Cell.BuildFrom("C3", "str"),
    Cell.BuildFrom("C4", "str"),
    Cell.BuildFrom("C5", "str")
  ]), 3);
  assertEquals(COLUMNS([
    Cell.BuildFrom("A1", "str"),
    Cell.BuildFrom("A2", "str"),
    Cell.BuildFrom("A3", "str"),
    Cell.BuildFrom("A4", "str"),
    Cell.BuildFrom("A5", "str"),
    Cell.BuildFrom("A6", "str"),
    Cell.BuildFrom("A7", "str"),
    Cell.BuildFrom("A8", "str"),
    Cell.BuildFrom("B1", "str")
  ]), 2);
  assertEquals(COLUMNS([
    Cell.BuildFrom("A1", "str"),
    Cell.BuildFrom("A2", "str"),
    Cell.BuildFrom("A3", "str")
  ]), 1);
  assertEquals(COLUMNS([1, 2, 3, 4]), 4);
  catchAndAssertEquals(function() {
    COLUMNS.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COLUMNS([]);
  }, ERRORS.REF_ERROR);
});


test("ROWS", function(){
  assertEquals(ROWS(1), 1);
  assertEquals(ROWS("str"), 1);
  assertEquals(ROWS(false), 1);
  assertEquals(ROWS(Cell.BuildFrom("A1", "str")), 1);
  assertEquals(ROWS([1]), 1);
  assertEquals(ROWS([1, 2, 3, 4]), 1);
  //A1:C5
  assertEquals(ROWS([
    Cell.BuildFrom("A1", "str"),
    Cell.BuildFrom("A2", "str"),
    Cell.BuildFrom("A3", "str"),
    Cell.BuildFrom("A4", "str"),
    Cell.BuildFrom("A5", "str"),
    Cell.BuildFrom("B1", "str"),
    Cell.BuildFrom("B2", "str"),
    Cell.BuildFrom("B3", "str"),
    Cell.BuildFrom("B4", "str"),
    Cell.BuildFrom("B5", "str"),
    Cell.BuildFrom("C1", "str"),
    Cell.BuildFrom("C2", "str"),
    Cell.BuildFrom("C3", "str"),
    Cell.BuildFrom("C4", "str"),
    Cell.BuildFrom("C5", "str"),
  ]), 5);
  //A5:C5
  assertEquals(ROWS([
    Cell.BuildFrom("A5", "str"),
    Cell.BuildFrom("B5", "str"),
    Cell.BuildFrom("C5", "str"),
  ]), 1);
  //A1:B2
  assertEquals(ROWS([
    Cell.BuildFrom("A1", "str"),
    Cell.BuildFrom("A2", "str"),
    Cell.BuildFrom("B1", "str"),
    Cell.BuildFrom("B2", "str")
  ]), 2);
  //A1:A3
  assertEquals(ROWS([
    Cell.BuildFrom("A1", "str"),
    Cell.BuildFrom("A2", "str"),
    Cell.BuildFrom("A3", "str")
  ]), 3);
  catchAndAssertEquals(function() {
    ROWS.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ROWS([]);
  }, ERRORS.REF_ERROR);
});