import {
  CHOOSE,
  ADDRESS
} from "../../src/Formulas/Lookup";
import * as ERRORS from "../../src/Errors";
import {
  catchAndAssertEquals,
  test,
  assertEquals
} from "../Utils/Asserts";


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
