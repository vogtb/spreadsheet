import {
  DATE,
  DATEVALUE,
  DATEDIF,
  EDATE,
  EOMONTH,
  DAY,
  DAYS,
  DAYS360,
  MONTH,
  YEAR,
  WEEKDAY,
  WEEKNUM,
  YEARFRAC,
  TIMEVALUE,
  HOUR,
  MINUTE,
  SECOND,
  NETWORKDAYS,
  NETWORKDAYS$INTL,
  TIME,
  WORKDAY,
  WORKDAY$INTL
} from "../../src/Formulas/Date"
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts"


test("WORKDAY.INTL", function () {
  assertEquals(WORKDAY$INTL(DATE(1999, 2, 2), 10), DATE(1999, 2, 16));
  assertEquals(WORKDAY$INTL(DATE(1999, 10, 10), 100), DATE(2000, 2, 25));
  assertEquals(WORKDAY$INTL(DATE(1909, 12, 11), 222), DATE(1910, 10, 18));
  assertEquals(WORKDAY$INTL(DATE(1922, 4, 1), 1234), DATE(1926, 12, 23));
  assertEquals(WORKDAY$INTL(DATE(1945, 1, 14), 6000), DATE(1968, 1, 12));
  assertEquals(WORKDAY$INTL(DATE(1945, 1, 14), 6000, "0000011"), DATE(1968, 1, 12));
  assertEquals(WORKDAY$INTL(DATE(1945, 1, 14), 6000, "1000001"), DATE(1968, 1, 13));
  assertEquals(WORKDAY$INTL(DATE(1945, 1, 14), 6000, "1100001"), DATE(1973, 10, 13));
  assertEquals(WORKDAY$INTL(DATE(1945, 1, 14), 6000, "1110000"), DATE(1973, 10, 14));
  assertEquals(WORKDAY$INTL(DATE(1945, 1, 14), 6000, "1110001"), DATE(1983, 5, 14));
  assertEquals(WORKDAY$INTL(DATE(1945, 1, 14), 6000, 6), DATE(1968, 1, 14));
  catchAndAssertEquals(function() {
    WORKDAY$INTL.apply(this, [12, 12, [12], false, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    WORKDAY$INTL.apply(this, [12]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    WORKDAY$INTL("1992-1-1", "str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    WORKDAY$INTL("1992-1-1", 12, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    WORKDAY$INTL("1992-1-1", 16, "000");
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    WORKDAY$INTL("1992-1-1", 12, 9);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    WORKDAY$INTL("1992-1-1", 66, false);
  }, ERRORS.VALUE_ERROR);
});


test("WORKDAY", function () {
  assertEquals(WORKDAY(DATE(1999, 2, 2), 10), DATE(1999, 2, 16));
  assertEquals(WORKDAY(DATE(1999, 10, 10), 100), DATE(2000, 2, 25));
  assertEquals(WORKDAY(DATE(1909, 12, 11), 222), DATE(1910, 10, 18));
  assertEquals(WORKDAY(DATE(1922, 4, 1), 1234), DATE(1926, 12, 23));
  assertEquals(WORKDAY(DATE(1945, 1, 14), 6000), DATE(1968, 1, 12));
  assertEquals(WORKDAY(DATE(1945, 1, 14), 6000, [23855, 23856, 23857, 23858, 23859]), DATE(1968, 1, 17));
  assertEquals(WORKDAY(DATE(1945, 1, 14), 6000, 23859), DATE(1968, 1, 15));
  assertEquals(WORKDAY(DATE(2012, 5, 29), 1000, [41058, 41059, 41060, 41061, 41062]), DATE(2016, 4, 1));
  assertEquals(WORKDAY([DATE(1999, 2, 2)], [10]), DATE(1999, 2, 16));
  catchAndAssertEquals(function() {
    WORKDAY.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    WORKDAY.apply(this, [DATE(2012, 5, 29), 1000, [10], 11]);
  }, ERRORS.NA_ERROR);
});


test("TIME", function () {
  assertEquals(TIME(10, 10, 10), 0.4237268518518518);
  assertEquals(TIME(34, 10, 10), 0.4237268518518518);
  assertEquals(TIME(29, 10, 10), 0.2153935185185185);
  assertEquals(TIME(13, 9, 6), 0.5479861111111111);
  assertEquals(TIME(3, 1, 14), 0.12585648148148149);
  assertEquals(TIME(0, 0, 0), 0);
  assertEquals(TIME(24, 0, 0), 0);
  assertEquals(TIME(23, 60, 0), 0);
  assertEquals(TIME(23, 59, 60), 0);
  assertEquals(TIME(18, 0, 0), 0.75);
  assertEquals(TIME(12, 0, 0), 0.5);
  assertEquals(TIME(6, 0, 0), 0.25);
  assertEquals(TIME(3, 0, 0), 0.125);
  assertEquals(TIME("3", ["0"], false), 0.125);
  catchAndAssertEquals(function() {
    TIME.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TIME.apply(this, [1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TIME.apply(this, [1, 1, 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TIME(-29, 10, 10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    TIME(1, 1, []);
  }, ERRORS.REF_ERROR);
});


test("NETWORKDAYS$INTL", function () {
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-1-30"), 22);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-1"), 263);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-4"), 264);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-5"), 265);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-6"), 266);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-7"), 267);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-8"), 268);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-9"), 268);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-1-30", "0000011"), 22);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-1", "0000011"), 263);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-4", "0000011"), 264);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-5", "0000011"), 265);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-6", "0000011"), 266);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-7", "0000011"), 267);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-8", "0000011"), 268);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-9", "0000011"), 268);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-1-30", 1), 22);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-1", 1), 263);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-4", 1), 264);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-5", 1), 265);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-6", 1), 266);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-7", 1), 267);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-8", 1), 268);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-1-9", 1), 268);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-1-6", "1110011"), 2);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-1-14", "1110011"), 4);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-1-30", "1110011"), 9);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-1-30", "0001110"), 17);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-2-22", "0001110"), 29);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1993-2-22", "0001110"), 239);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-2-22", "0000110"), 37);
  assertEquals(NETWORKDAYS$INTL("1992-1-1", "1992-2-22", 1, [DATE(1992, 1, 10), DATE(1992, 1, 11), DATE(1992, 1, 12), DATE(1992, 1, 13), DATE(1992, 1, 14)]), 35);
  assertEquals(NETWORKDAYS$INTL(["1992-1-1"], ["1992-1-30"], ["0000011"]), 22);
  assertEquals(NETWORKDAYS$INTL(900, 11999), 7928);
  assertEquals(NETWORKDAYS$INTL(900, 12000), 7929);
  assertEquals(NETWORKDAYS$INTL(900, 12001), 7930);
  assertEquals(NETWORKDAYS$INTL(900, 12002), 7931);
  assertEquals(NETWORKDAYS$INTL(900, 12003), 7932);
  assertEquals(NETWORKDAYS$INTL(900, 12004), 7933);
  assertEquals(NETWORKDAYS$INTL(900, 12005), 7933);
  catchAndAssertEquals(function() {
    NETWORKDAYS$INTL.apply(this, [12, 12, [12], false, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS$INTL.apply(this, [12]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS$INTL("1992-1-1", "str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS$INTL(12, 12, 1, ["1992-11-1"]);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS$INTL("1992-1-1", "1992-1-1", []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS$INTL("1992-1-1", "1994-1-1", "000");
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS$INTL("1992-1-1", "1994-1-1", 9);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS$INTL("1992-1-1", "1994-1-1", false);
  }, ERRORS.VALUE_ERROR);
});


test("NETWORKDAYS", function(){
  assertEquals(NETWORKDAYS("1992-1-1", "1992-1-30"), 22);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-1"), 263);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-4"), 264);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-5"), 265);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-6"), 266);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-7"), 267);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-8"), 268);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-9"), 268);
  assertEquals(NETWORKDAYS("1992-1-1", "2000-4-24"), 2169);
  assertEquals(NETWORKDAYS("1992-1-1", false), -24003);
  assertEquals(NETWORKDAYS("2020-12-12", 0), -31555);
  assertEquals(NETWORKDAYS(12, 1423), 1008);
  assertEquals(NETWORKDAYS(12, 12), 1);
  assertEquals(NETWORKDAYS(DATE(1900, 1, 11), 12), 1);
  assertEquals(NETWORKDAYS(DATE(1998, 1, 1), DATE(1999, 1, 22)), 277);
  // Single holiday test
  assertEquals(NETWORKDAYS("1992-1-1", "1992-1-30", [DATEVALUE("1992-1-22")]), 21);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-1", [DATEVALUE("1992-6-19")]), 262);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-4", [DATEVALUE("1992-6-19")]), 263);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-5", [DATEVALUE("1992-6-19")]), 264);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-6", [DATEVALUE("1992-6-19")]), 265);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-7", [DATEVALUE("1992-6-19"), DATEVALUE("1992-6-18")]), 265);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-8", [DATEVALUE("1992-6-19")]), 267);
  assertEquals(NETWORKDAYS("1992-1-1", "1993-1-9", [DATEVALUE("1992-6-19")]), 267);
  assertEquals(NETWORKDAYS("1992-1-1", "2000-4-24", [DATEVALUE("1992-6-19")]), 2168);
  assertEquals(NETWORKDAYS("1992-1-1", false, [DATEVALUE("1991-6-19")]), -24002);
  assertEquals(NETWORKDAYS("2020-12-12", 0, [DATEVALUE("1992-6-19")]), -31554);
  assertEquals(NETWORKDAYS(12, 1423, [22]), 1008);// weekend and holdiay overlapping
  assertEquals(NETWORKDAYS(12, 1423, [20]), 1007);
  assertEquals(NETWORKDAYS(12, 12, [12]), 0);
  assertEquals(NETWORKDAYS(DATE(1998, 1, 1), DATE(1999, 1, 22), [DATE(1999, 1, 20)]), 276);
  catchAndAssertEquals(function() {
    NETWORKDAYS.apply(this, [12, 12, [12], false]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS.apply(this, [12]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS("1992-1-1", "str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS(12, 12, ["1992-11-1"]);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    NETWORKDAYS("1992-1-1", "1992-1-1", []);
  }, ERRORS.REF_ERROR);
});


test("SECOND", function() {
  assertEquals(SECOND("8:10"), 0);
  assertEquals(SECOND("8:11"), 0);
  assertEquals(SECOND("8:44"), 0);
  assertEquals(SECOND("8:70"), 0);
  assertEquals(SECOND("8:120"), 0);
  assertEquals(SECOND("8:10:22"), 22);
  assertEquals(SECOND("8:11:12"), 12);
  assertEquals(SECOND("8:44:09"), 9);
  assertEquals(SECOND("8:70:02"), 2);
  assertEquals(SECOND("8:120:44"), 44);
  assertEquals(SECOND("8:120:104"), 44);
  assertEquals(SECOND("1992-1-1 8:120:104"), 44);
  assertEquals(SECOND(0.511111111111), 0);
  catchAndAssertEquals(function() {
    SECOND.apply(this, ["8:10", 5]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SECOND.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SECOND("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    SECOND(" ");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    SECOND([]);
  }, ERRORS.REF_ERROR);
});


test("MINUTE", function() {
  assertEquals(MINUTE("8:10"), 10);
  assertEquals(MINUTE("8:11"), 11);
  assertEquals(MINUTE("8:44"), 44);
  assertEquals(MINUTE("8:70"), 10);
  assertEquals(MINUTE("8:120"), 0);
  assertEquals(MINUTE("8:10000pm"), 40);
  assertEquals(MINUTE("28:10000"), 40);
  assertEquals(MINUTE("14:23232:9999991"), 58);
  assertEquals(MINUTE(["8:10"]), 10);
  assertEquals(MINUTE("11:21222:2111pm"), 17);
  assertEquals(MINUTE("11:21222:2111am"), 17);
  assertEquals(MINUTE(""), 0);
  assertEquals(MINUTE(0), 0);
  assertEquals(MINUTE(1), 0);
  assertEquals(MINUTE(false), 0);
  assertEquals(MINUTE(true), 0);
  assertEquals(MINUTE(0.8), 12);
  assertEquals(MINUTE(0.5), 0);
  assertEquals(MINUTE(0.25), 0);
  assertEquals(MINUTE(0.125), 0);
  assertEquals(MINUTE(0.0625), 30);
  assertEquals(MINUTE(1.5), 0);
  assertEquals(MINUTE(99.5), 0);
  assertEquals(MINUTE("1969-7-6 5:05am"), 5);
  catchAndAssertEquals(function() {
    MINUTE.apply(this, ["8:10", 5]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MINUTE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MINUTE("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    MINUTE(" ");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    MINUTE([]);
  }, ERRORS.REF_ERROR);
});


test("HOUR", function() {
  assertEquals(HOUR("8:10"), 8);
  assertEquals(HOUR("8am"), 8);
  assertEquals(HOUR("8:10pm"), 20);
  assertEquals(HOUR("8:10000pm"), 18);
  assertEquals(HOUR("28:10000"), 2);
  assertEquals(HOUR("14:23232:9999991"), 10);
  assertEquals(HOUR(["8:10"]), 8);
  assertEquals(HOUR("11:21222:2111pm"), 17);
  assertEquals(HOUR("11:21222:2111am"), 5);
  assertEquals(HOUR(""), 0);
  assertEquals(HOUR(0), 0);
  assertEquals(HOUR(1), 0);
  assertEquals(HOUR(false), 0);
  assertEquals(HOUR(true), 0);
  assertEquals(HOUR(0.8), 19);
  assertEquals(HOUR(0.5), 12);
  assertEquals(HOUR(0.25), 6);
  assertEquals(HOUR(0.125), 3);
  assertEquals(HOUR(0.0625), 1);
  assertEquals(HOUR(1.5), 12);
  assertEquals(HOUR(99.5), 12);
  assertEquals(HOUR("0.8"), 19);
  assertEquals(HOUR("0.5"), 12);
  assertEquals(HOUR("0.25"), 6);
  assertEquals(HOUR("0.125"), 3);
  assertEquals(HOUR("0.0625"), 1);
  assertEquals(HOUR("1969-7-6 5am"), 5);
  catchAndAssertEquals(function() {
    HOUR.apply(this, ["8:10", 5]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    HOUR.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    HOUR("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    HOUR(" ");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    HOUR([]);
  }, ERRORS.REF_ERROR);
});


test("TIMEVALUE", function() {
  assertEquals(TIMEVALUE("1969-7-6"), 0);
  assertEquals(TIMEVALUE("1969-7-6 8am"), 0.3333333333333333);
  assertEquals(TIMEVALUE("1969-7-28 8:10"), 0.3402777777777778);
  assertEquals(TIMEVALUE("2100-7-6 8:10pm"), 0.8402777777777778);
  assertEquals(TIMEVALUE("1999-1-1 8:10000pm"), 0.7777777777777778);
  assertEquals(TIMEVALUE("2012/1/1 28:10000"), 0.1111111111111111);
  assertEquals(TIMEVALUE("2012/1/1 14:23232:9999991"), 0.45730324074074075);
  assertEquals(TIMEVALUE(["2012/1/1 8:10"]), 0.3402777777777778);
  assertEquals(TIMEVALUE("2012/1/1 11:21222:2111pm"), 0.7202662037037038);
  assertEquals(TIMEVALUE("2012/1/1 11:21222:2111am"), 0.2202662037037037);
  assertEquals(TIMEVALUE("8am"), 0.3333333333333333);
  assertEquals(TIMEVALUE("8:10"), 0.3402777777777778);
  assertEquals(TIMEVALUE("8:10pm"), 0.8402777777777778);
  assertEquals(TIMEVALUE("8:10000pm"), 0.7777777777777778);
  assertEquals(TIMEVALUE("28:10000"), 0.1111111111111111);
  assertEquals(TIMEVALUE("14:23232:9999991"), 0.45730324074074075);
  assertEquals(TIMEVALUE(["8:10"]), 0.3402777777777778);
  assertEquals(TIMEVALUE("11:21222:2111pm"), 0.7202662037037038);
  assertEquals(TIMEVALUE("11:21222:2111am"), 0.2202662037037037);
  catchAndAssertEquals(function() {
    TIMEVALUE.apply(this, ["8:10", 5]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TIMEVALUE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TIMEVALUE("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    TIMEVALUE([]);
  }, ERRORS.REF_ERROR);
});


test("YEARFRAC", function(){
  assertEquals(YEARFRAC(1, 1461, 2), 4.055555555555555);
  assertEquals(YEARFRAC(0, 365, 0), 1);
  assertEquals(YEARFRAC(0, 365, 1), 1);
  assertEquals(YEARFRAC(0, 365, 2), 1.0138888888888888);
  assertEquals(YEARFRAC(0, 365, 3), 1);
  assertEquals(YEARFRAC(0, 365, 4), 1);
  assertEquals(YEARFRAC(0, 1000, 0), 2.738888888888889);
  assertEquals(YEARFRAC(0, 1000, 1), 2.73972602739726);
  assertEquals(YEARFRAC(0, 1000, 2), 2.7777777777777777);
  assertEquals(YEARFRAC(0, 1000, 3), 2.73972602739726);
  assertEquals(YEARFRAC(0, 1000, 4), 2.738888888888889);
  assertEquals(YEARFRAC(10000, 20000, 0), 27.375);
  assertEquals(YEARFRAC(10000, 20000, 1), 27.378507871321013); // gs: 27.37808219, ms: 27.37850787
  assertEquals(YEARFRAC(10000, 20000, 2), 27.77777777777778);
  assertEquals(YEARFRAC(10000, 20000, 3), 27.397260273972602);
  assertEquals(YEARFRAC(10000, 20000, 4), 27.375);
  assertEquals(YEARFRAC(100000, 200000, 0), 273.7944444444444);
  assertEquals(YEARFRAC(100000, 200000, 1), 273.7925747453729); // gs: 273.7917808, ms: 273.7925747
  assertEquals(YEARFRAC(100000, 200000, 2), 277.77777777777777);
  assertEquals(YEARFRAC(100000, 200000, 3), 273.972602739726);
  assertEquals(YEARFRAC(100000, 200000, 4), 273.7944444444444);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-4", 0), 18.994444444444444);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-22", 0), 19.044444444444444);
  assertEquals(YEARFRAC("1992-1-6", "2191-7-22", 0), 199.544444444444444);
  assertEquals(YEARFRAC("1992-1-6", "2191-1-21", 0), 199.041666666666667);
  assertEquals(YEARFRAC("1992-1-6", "2144-1-22", 0), 152.044444444444444);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-6", 0), 0);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-1", 0), 0.013888888888888888);
  assertEquals(YEARFRAC("1992-1-6", "1993-1-6", 0), 1);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-4", 1), 18.99520876112252);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-22", 1), 19.044490075290895);
  assertEquals(YEARFRAC("1992-1-6", "2191-7-22", 1), 199.54003477118098);
  assertEquals(YEARFRAC("1992-1-6", "2191-1-21", 1), 199.04173910662706);
  assertEquals(YEARFRAC("1992-1-6", "2144-1-22", 1), 152.04174793765546);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-6", 1), 0);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-1", 1), 0.01366120218579235);
  assertEquals(YEARFRAC("1991-1-6", "1992-1-6", 1), 1);
  assertEquals(YEARFRAC("1992-1-6", "1993-1-6", 1), 1);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-22", 2), 19.322222222222223);
  assertEquals(YEARFRAC("1992-1-6", "2191-7-22", 2), 202.44722222222222);
  assertEquals(YEARFRAC("1992-1-6", "2191-1-21", 2), 201.94166666666666);
  assertEquals(YEARFRAC("1992-1-6", "2144-1-22", 2), 154.25833333333333);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-6", 2), 0);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-1", 2), 0.013888888888888888);
  assertEquals(YEARFRAC("1991-1-6", "1992-1-6", 2), 1.0138888888888888);
  assertEquals(YEARFRAC("1992-1-6", "1993-1-6", 2), 1.0166666666666666);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-22", 3), 19.057534246575344);
  assertEquals(YEARFRAC("1992-1-6", "2191-7-22", 3), 199.67397260273972);
  assertEquals(YEARFRAC("1992-1-6", "2191-1-21", 3), 199.17534246575343);
  assertEquals(YEARFRAC("1992-1-6", "2144-1-22", 3), 152.14520547945204);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-6", 3), 0);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-1", 3), 0.0136986301369863);
  assertEquals(YEARFRAC("1991-1-6", "1992-1-6", 3), 1);
  assertEquals(YEARFRAC("1992-1-6", "1993-1-6", 3), 1.0027397260273974);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-22", 4), 19.044444444444444);
  assertEquals(YEARFRAC("1992-1-6", "2191-7-22", 4), 199.54444444444445);
  assertEquals(YEARFRAC("1992-1-6", "2191-1-21", 4), 199.04166666666666);
  assertEquals(YEARFRAC("1992-1-6", "2144-1-22", 4), 152.04444444444445);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-6", 4), 0);
  assertEquals(YEARFRAC("1992-1-6", "1992-1-1", 4), 0.013888888888888888);
  assertEquals(YEARFRAC("1991-1-6", "1992-1-6", 4), 1);
  assertEquals(YEARFRAC("1992-1-6", "1993-1-6", 4), 1);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-4", 2), 19.272222222222222);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-4", 3), 19.008219178082193);
  assertEquals(YEARFRAC("1969-7-6", "1988-7-4", 4), 18.994444444444444);
  assertEquals(YEARFRAC(["1992-1-6", []], ["1993-1-6", "str"], [4]), 1);
  catchAndAssertEquals(function() {
    YEARFRAC("1996-6-19", "1992-6-19", 5);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    YEARFRAC.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    YEARFRAC.apply(this, ["1992-6-19", "1995-6-19", 1, 0]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    YEARFRAC("str", "1995-6-19", 1);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    YEARFRAC([], "1995-6-19", 1);
  }, ERRORS.REF_ERROR);
});


test("DATEDIF", function(){
  assertEquals(DATEDIF("1992-6-19", "1996-6-19", "Y"), 4);
  assertEquals(DATEDIF("1992-6-19", "1996-6-0", "Y"), 3);
  assertEquals(DATEDIF("1992-6-19", "1992-8-1", "Y"), 0);
  assertEquals(DATEDIF("1992-6-19", "2199-8-1", "Y"), 207);
  assertEquals(DATEDIF("1992-6-19", "1996-6-19", "M"), 48);
  assertEquals(DATEDIF("1992-6-19", "1996-6-1", "M"), 47);
  assertEquals(DATEDIF("1992-6-19", "1992-8-1", "M"), 1);
  assertEquals(DATEDIF("1992-6-19", "2199-8-1", "M"), 2485);
  assertEquals(DATEDIF("1992-6-19", "1996-6-19", "D"), 1461);
  assertEquals(DATEDIF("1992-6-19", "1996-6-1", "D"), 1443);
  assertEquals(DATEDIF("1992-6-19", "1992-8-1", "D"), 43);
  assertEquals(DATEDIF("1992-6-19", "2199-8-1", "D"), 75648);
  assertEquals(DATEDIF("1992-6-19", "2199-8-1", "MD"), 13);
  assertEquals(DATEDIF("1992-6-19", "2012-7-22", "MD"), 3);
  assertEquals(DATEDIF("1992-6-19", "1993-8-1", "MD"), 13);
  assertEquals(DATEDIF("1992-6-19", "2000-1-19", "MD"), 0);
  assertEquals(DATEDIF("1992-6-19", "2000-1-20", "MD"), 1);
  assertEquals(DATEDIF("1992-6-19", "2000-1-21", "MD"), 2);
  assertEquals(DATEDIF("1992-6-19", "2000-1-22", "MD"), 3);
  assertEquals(DATEDIF("1992-6-19", "2000-1-23", "MD"), 4);
  assertEquals(DATEDIF("1992-6-19", "2000-1-24", "MD"), 5);
  assertEquals(DATEDIF("1992-6-19", "2000-1-25", "MD"), 6);
  assertEquals(DATEDIF("1992-6-20", "2000-1-25", "MD"), 5);
  assertEquals(DATEDIF("1992-6-19", "2199-8-1", "YM"), 1);
  assertEquals(DATEDIF("1992-6-19", "2012-7-22", "YM"), 1);
  assertEquals(DATEDIF("1992-6-19", "1993-8-1", "YM"), 1);
  assertEquals(DATEDIF("1992-6-19", "2000-1-19", "YM"), 7);
  assertEquals(DATEDIF("1992-6-19", "2000-1-20", "YM"), 7);
  assertEquals(DATEDIF("1992-6-19", "2000-1-21", "YM"), 7);
  assertEquals(DATEDIF("1992-6-19", "2000-1-22", "YM"), 7);
  assertEquals(DATEDIF("1992-6-19", "2000-1-23", "YM"), 7);
  assertEquals(DATEDIF("1992-6-19", "2000-1-24", "YM"), 7);
  assertEquals(DATEDIF("1992-6-19", "2000-1-25", "YM"), 7);
  assertEquals(DATEDIF("1992-6-20", "2000-1-25", "YM"), 7);
  assertEquals(DATEDIF("1992-6-19", "1992-6-19", "YM"), 0);
  assertEquals(DATEDIF("1992-6-19", "1992-7-19", "YM"), 1);
  assertEquals(DATEDIF("1992-6-19", "1993-7-19", "YM"), 1);
  assertEquals(DATEDIF("1992-6-19", "1993-6-19", "YM"), 0);
  assertEquals(DATEDIF("1992-6-19", "2199-8-1", "YD"), 43);
  assertEquals(DATEDIF("1992-6-19", "2012-7-22", "YD"), 33);
  assertEquals(DATEDIF("1992-6-19", "1993-8-1", "YD"), 43);
  assertEquals(DATEDIF("1992-6-19", "2000-1-19", "YD"), 214);
  assertEquals(DATEDIF("1992-6-19", "2000-1-20", "YD"), 215);
  assertEquals(DATEDIF("1992-6-19", "2000-1-21", "YD"), 216);
  assertEquals(DATEDIF("1992-6-19", "2000-1-22", "YD"), 217);
  assertEquals(DATEDIF("1992-6-19", "2000-1-23", "YD"), 218);
  assertEquals(DATEDIF("1992-6-19", "2000-1-24", "YD"), 219);
  assertEquals(DATEDIF("1992-6-19", "2000-1-25", "YD"), 220);
  assertEquals(DATEDIF("1992-6-19", "1992-6-19", "YD"), 0);
  assertEquals(DATEDIF("1992-6-19", "1992-7-19", "YD"), 30);
  assertEquals(DATEDIF("1992-6-19", "1993-7-19", "YD"), 30);
  assertEquals(DATEDIF("1992-6-19", "1993-6-19", "YD"), 0);
  assertEquals(DATEDIF("1992-6-19", "1993-6-19", "yd"), 0);
  assertEquals(DATEDIF(["1992-6-19", "str"], ["1993-6-19", []], ["yd"]), 0);
  catchAndAssertEquals(function() {
    DATEDIF("1996-6-19", "1992-6-19", "Y");
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DATEDIF("1992-6-19", "1995-6-19", "Y ");
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DATEDIF("1992-6-19", "1995-6-19", "mm");
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DATEDIF.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DATEDIF.apply(this, ["1992-6-19", "1995-6-19", "mm", 0]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DATEDIF("str", "1995-6-19", "mm");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DATEDIF([], "1995-6-19", "mm");
  }, ERRORS.REF_ERROR);
});


test("WEEKNUM", function(){
  assertEquals(WEEKNUM(DATE(1992, 6, 19)), 25);
  assertEquals(WEEKNUM(DATE(1992, 6, 20)), 25);
  assertEquals(WEEKNUM(DATE(1992, 6, 21)), 26);
  assertEquals(WEEKNUM(0), 52);
  assertEquals(WEEKNUM(false), 52);
  assertEquals(WEEKNUM(1), 53);
  assertEquals(WEEKNUM(true), 53);
  assertEquals(WEEKNUM(2), 1);
  assertEquals(WEEKNUM(3), 1);
  assertEquals(WEEKNUM(4), 1);
  assertEquals(WEEKNUM(5), 1);
  assertEquals(WEEKNUM(6), 1);
  assertEquals(WEEKNUM(7), 1);
  assertEquals(WEEKNUM(8), 2);
  assertEquals(WEEKNUM(9), 2);
  assertEquals(WEEKNUM(10), 2);
  assertEquals(WEEKNUM(11), 2);
  assertEquals(WEEKNUM(12), 2);
  assertEquals(WEEKNUM(13), 2);
  assertEquals(WEEKNUM(14), 2);
  assertEquals(WEEKNUM(15), 3);
  assertEquals(WEEKNUM(16), 3);
  assertEquals(WEEKNUM(17), 3);
  assertEquals(WEEKNUM(18), 3);
  assertEquals(WEEKNUM(23734), 52);
  assertEquals(WEEKNUM(23735), 52);
  assertEquals(WEEKNUM(23736), 52);
  assertEquals(WEEKNUM(23737), 52);
  assertEquals(WEEKNUM(23738), 53);
  assertEquals(WEEKNUM(23739), 53);
  assertEquals(WEEKNUM(23740), 53);
  assertEquals(WEEKNUM(23741), 53);
  assertEquals(WEEKNUM(23742), 53);
  assertEquals(WEEKNUM(23743), 1);
  assertEquals(WEEKNUM(23744), 1);
  assertEquals(WEEKNUM(23745), 2);
  assertEquals(WEEKNUM(23746), 2);
  assertEquals(WEEKNUM(23747), 2);
  assertEquals(WEEKNUM(23748), 2);
  assertEquals(WEEKNUM(23749), 2);
  assertEquals(WEEKNUM(23750), 2);
  assertEquals(WEEKNUM(23751), 2);
  assertEquals(WEEKNUM(23752), 3);
  // type=2
  assertEquals(WEEKNUM(23737, 2), 52);
  assertEquals(WEEKNUM(23738, 2), 52);
  assertEquals(WEEKNUM(23739, 2), 53);
  assertEquals(WEEKNUM(23740, 2), 53);
  assertEquals(WEEKNUM(23741, 2), 53);
  assertEquals(WEEKNUM(23742, 2), 53);
  assertEquals(WEEKNUM(23743, 2), 1);
  assertEquals(WEEKNUM(23744, 2), 1);
  assertEquals(WEEKNUM(23745, 2), 1);
  assertEquals(WEEKNUM(23746, 2), 2);
  assertEquals(WEEKNUM(23747, 2), 2);
  assertEquals(WEEKNUM(23748, 2), 2);
  assertEquals(WEEKNUM(23749, 2), 2);
  assertEquals(WEEKNUM(23750, 2), 2);
  assertEquals(WEEKNUM(23751, 2), 2);
  assertEquals(WEEKNUM(23752, 2), 2);
  assertEquals(WEEKNUM(23753, 2), 3);
  assertEquals(WEEKNUM(23754, 2), 3);
  assertEquals(WEEKNUM(23755, 2), 3);
  assertEquals(WEEKNUM(23756, 2), 3);
  assertEquals(WEEKNUM(23757, 2), 3);
  assertEquals(WEEKNUM(23758, 2), 3);
  assertEquals(WEEKNUM(23759, 2), 3);
  assertEquals(WEEKNUM(23760, 2), 4);
  //type=11
  assertEquals(WEEKNUM(23737, 11), 52);
  assertEquals(WEEKNUM(23738, 11), 52);
  assertEquals(WEEKNUM(23739, 11), 53);
  assertEquals(WEEKNUM(23740, 11), 53);
  assertEquals(WEEKNUM(23741, 11), 53);
  assertEquals(WEEKNUM(23742, 11), 53);
  assertEquals(WEEKNUM(23743, 11), 1);
  assertEquals(WEEKNUM(23744, 11), 1);
  assertEquals(WEEKNUM(23745, 11), 1);
  assertEquals(WEEKNUM(23746, 11), 2);
  assertEquals(WEEKNUM(23747, 11), 2);
  assertEquals(WEEKNUM(23748, 11), 2);
  assertEquals(WEEKNUM(23749, 11), 2);
  assertEquals(WEEKNUM(23750, 11), 2);
  assertEquals(WEEKNUM(23751, 11), 2);
  assertEquals(WEEKNUM(23752, 11), 2);
  assertEquals(WEEKNUM(23753, 11), 3);
  assertEquals(WEEKNUM(23754, 11), 3);
  assertEquals(WEEKNUM(23755, 11), 3);
  assertEquals(WEEKNUM(23756, 11), 3);
  assertEquals(WEEKNUM(23757, 11), 3);
  assertEquals(WEEKNUM(23758, 11), 3);
  assertEquals(WEEKNUM(23759, 11), 3);
  assertEquals(WEEKNUM(23760, 11), 4);
  //type=12
  assertEquals(WEEKNUM(23737, 12), 52);
  assertEquals(WEEKNUM(23738, 12), 52);
  assertEquals(WEEKNUM(23739, 12), 52);
  assertEquals(WEEKNUM(23740, 12), 53);
  assertEquals(WEEKNUM(23741, 12), 53);
  assertEquals(WEEKNUM(23742, 12), 53);
  assertEquals(WEEKNUM(23743, 12), 1);
  assertEquals(WEEKNUM(23744, 12), 1);
  assertEquals(WEEKNUM(23745, 12), 1);
  assertEquals(WEEKNUM(23746, 12), 1);
  assertEquals(WEEKNUM(23747, 12), 2);
  assertEquals(WEEKNUM(23748, 12), 2);
  assertEquals(WEEKNUM(23749, 12), 2);
  assertEquals(WEEKNUM(23750, 12), 2);
  assertEquals(WEEKNUM(23751, 12), 2);
  assertEquals(WEEKNUM(23752, 12), 2);
  assertEquals(WEEKNUM(23753, 12), 2);
  assertEquals(WEEKNUM(23754, 12), 3);
  assertEquals(WEEKNUM(23755, 12), 3);
  assertEquals(WEEKNUM(23756, 12), 3);
  assertEquals(WEEKNUM(23757, 12), 3);
  assertEquals(WEEKNUM(23758, 12), 3);
  assertEquals(WEEKNUM(23759, 12), 3);
  assertEquals(WEEKNUM(23760, 12), 3);
  //type=13
  assertEquals(WEEKNUM(23737, 13), 52);
  assertEquals(WEEKNUM(23738, 13), 52);
  assertEquals(WEEKNUM(23739, 13), 52);
  assertEquals(WEEKNUM(23740, 13), 52);
  assertEquals(WEEKNUM(23741, 13), 53);
  assertEquals(WEEKNUM(23742, 13), 53);
  assertEquals(WEEKNUM(23743, 13), 1);
  assertEquals(WEEKNUM(23744, 13), 1);
  assertEquals(WEEKNUM(23745, 13), 1);
  assertEquals(WEEKNUM(23746, 13), 1);
  assertEquals(WEEKNUM(23747, 13), 1);
  assertEquals(WEEKNUM(23748, 13), 2);
  assertEquals(WEEKNUM(23749, 13), 2);
  assertEquals(WEEKNUM(23750, 13), 2);
  assertEquals(WEEKNUM(23751, 13), 2);
  assertEquals(WEEKNUM(23752, 13), 2);
  assertEquals(WEEKNUM(23753, 13), 2);
  assertEquals(WEEKNUM(23754, 13), 2);
  assertEquals(WEEKNUM(23755, 13), 3);
  assertEquals(WEEKNUM(23756, 13), 3);
  assertEquals(WEEKNUM(23757, 13), 3);
  assertEquals(WEEKNUM(23758, 13), 3);
  assertEquals(WEEKNUM(23759, 13), 3);
  assertEquals(WEEKNUM(23760, 13), 3);
  //type=14
  assertEquals(WEEKNUM(23734, 14), 52);
  assertEquals(WEEKNUM(23735, 14), 53);
  assertEquals(WEEKNUM(23736, 14), 53);
  assertEquals(WEEKNUM(23737, 14), 53);
  assertEquals(WEEKNUM(23738, 14), 53);
  assertEquals(WEEKNUM(23739, 14), 53);
  assertEquals(WEEKNUM(23740, 14), 53);
  assertEquals(WEEKNUM(23741, 14), 53);
  assertEquals(WEEKNUM(23742, 14), 54);
  assertEquals(WEEKNUM(23743, 14), 1);
  assertEquals(WEEKNUM(23744, 14), 1);
  assertEquals(WEEKNUM(23745, 14), 1);
  assertEquals(WEEKNUM(23746, 14), 1);
  assertEquals(WEEKNUM(23747, 14), 1);
  assertEquals(WEEKNUM(23748, 14), 1);
  assertEquals(WEEKNUM(23749, 14), 2);
  assertEquals(WEEKNUM(23750, 14), 2);
  assertEquals(WEEKNUM(23751, 14), 2);
  assertEquals(WEEKNUM(23752, 14), 2);
  assertEquals(WEEKNUM(23753, 14), 2);
  assertEquals(WEEKNUM(23754, 14), 2);
  assertEquals(WEEKNUM(23755, 14), 2);
  assertEquals(WEEKNUM(23756, 14), 3);
  assertEquals(WEEKNUM(23757, 14), 3);
  assertEquals(WEEKNUM(23758, 14), 3);
  assertEquals(WEEKNUM(23759, 14), 3);
  assertEquals(WEEKNUM(23760, 14), 3);
  //type=14 again
  assertEquals(WEEKNUM(355, 14), 52);
  assertEquals(WEEKNUM(356, 14), 52);
  assertEquals(WEEKNUM(357, 14), 52);
  assertEquals(WEEKNUM(358, 14), 52);
  assertEquals(WEEKNUM(359, 14), 52);
  assertEquals(WEEKNUM(360, 14), 52);
  assertEquals(WEEKNUM(361, 14), 52);
  assertEquals(WEEKNUM(362, 14), 53);
  assertEquals(WEEKNUM(363, 14), 53);
  assertEquals(WEEKNUM(364, 14), 53);
  assertEquals(WEEKNUM(365, 14), 53);
  assertEquals(WEEKNUM(366, 14), 53);
  assertEquals(WEEKNUM(367, 14), 1);
  assertEquals(WEEKNUM(368, 14), 1);
  assertEquals(WEEKNUM(369, 14), 2);
  assertEquals(WEEKNUM(370, 14), 2);
  assertEquals(WEEKNUM(371, 14), 2);
  assertEquals(WEEKNUM(372, 14), 2);
  assertEquals(WEEKNUM(373, 14), 2);
  assertEquals(WEEKNUM(374, 14), 2);
  assertEquals(WEEKNUM(375, 14), 2);
  assertEquals(WEEKNUM(376, 14), 3);
  assertEquals(WEEKNUM(377, 14), 3);
  assertEquals(WEEKNUM(378, 14), 3);
  assertEquals(WEEKNUM(379, 14), 3);
  assertEquals(WEEKNUM(380, 14), 3);
  assertEquals(WEEKNUM(381, 14), 3);
  //type=14 again
  assertEquals(WEEKNUM(730, 14), 53);
  assertEquals(WEEKNUM(731, 14), 53);
  assertEquals(WEEKNUM(732, 14), 1);
  assertEquals(WEEKNUM(733, 14), 2);
  assertEquals(WEEKNUM(734, 14), 2);
  assertEquals(WEEKNUM(735, 14), 2);
  assertEquals(WEEKNUM(736, 14), 2);
  assertEquals(WEEKNUM(737, 14), 2);
  assertEquals(WEEKNUM(738, 14), 2);
  assertEquals(WEEKNUM(739, 14), 2);
  assertEquals(WEEKNUM(740, 14), 3);
  assertEquals(WEEKNUM(741, 14), 3);
  assertEquals(WEEKNUM(742, 14), 3);
  assertEquals(WEEKNUM(743, 14), 3);
  assertEquals(WEEKNUM(744, 14), 3);
  assertEquals(WEEKNUM(745, 14), 3);
  assertEquals(WEEKNUM(746, 14), 3);
  //type=15
  assertEquals(WEEKNUM(23734, 15), 52);
  assertEquals(WEEKNUM(23735, 15), 52);
  assertEquals(WEEKNUM(23736, 15), 53);
  assertEquals(WEEKNUM(23737, 15), 53);
  assertEquals(WEEKNUM(23738, 15), 53);
  assertEquals(WEEKNUM(23739, 15), 53);
  assertEquals(WEEKNUM(23740, 15), 53);
  assertEquals(WEEKNUM(23741, 15), 53);
  assertEquals(WEEKNUM(23742, 15), 53);
  assertEquals(WEEKNUM(23743, 15), 1);
  assertEquals(WEEKNUM(23744, 15), 1);
  assertEquals(WEEKNUM(23745, 15), 1);
  assertEquals(WEEKNUM(23746, 15), 1);
  assertEquals(WEEKNUM(23747, 15), 1);
  assertEquals(WEEKNUM(23748, 15), 1);
  assertEquals(WEEKNUM(23749, 15), 1);
  assertEquals(WEEKNUM(23750, 15), 2);
  assertEquals(WEEKNUM(23751, 15), 2);
  assertEquals(WEEKNUM(23752, 15), 2);
  assertEquals(WEEKNUM(23753, 15), 2);
  assertEquals(WEEKNUM(23754, 15), 2);
  assertEquals(WEEKNUM(23755, 15), 2);
  assertEquals(WEEKNUM(23756, 15), 2);
  assertEquals(WEEKNUM(23757, 15), 3);
  assertEquals(WEEKNUM(23758, 15), 3);
  assertEquals(WEEKNUM(23759, 15), 3);
  assertEquals(WEEKNUM(23760, 15), 3);
  //type=15 again
  assertEquals(WEEKNUM(355, 15), 51);
  assertEquals(WEEKNUM(356, 15), 52);
  assertEquals(WEEKNUM(357, 15), 52);
  assertEquals(WEEKNUM(358, 15), 52);
  assertEquals(WEEKNUM(359, 15), 52);
  assertEquals(WEEKNUM(360, 15), 52);
  assertEquals(WEEKNUM(361, 15), 52);
  assertEquals(WEEKNUM(362, 15), 52);
  assertEquals(WEEKNUM(363, 15), 53);
  assertEquals(WEEKNUM(364, 15), 53);
  assertEquals(WEEKNUM(365, 15), 53);
  assertEquals(WEEKNUM(366, 15), 53);
  assertEquals(WEEKNUM(367, 15), 1);
  assertEquals(WEEKNUM(368, 15), 1);
  assertEquals(WEEKNUM(369, 15), 1);
  assertEquals(WEEKNUM(370, 15), 2);
  assertEquals(WEEKNUM(371, 15), 2);
  assertEquals(WEEKNUM(372, 15), 2);
  assertEquals(WEEKNUM(373, 15), 2);
  assertEquals(WEEKNUM(374, 15), 2);
  assertEquals(WEEKNUM(375, 15), 2);
  assertEquals(WEEKNUM(376, 15), 2);
  assertEquals(WEEKNUM(377, 15), 3);
  assertEquals(WEEKNUM(378, 15), 3);
  assertEquals(WEEKNUM(379, 15), 3);
  assertEquals(WEEKNUM(380, 15), 3);
  assertEquals(WEEKNUM(381, 15), 3);
  //type=15 again
  assertEquals(WEEKNUM(730, 15), 53);
  assertEquals(WEEKNUM(731, 15), 53);
  assertEquals(WEEKNUM(732, 15), 1);
  assertEquals(WEEKNUM(733, 15), 1);
  assertEquals(WEEKNUM(734, 15), 2);
  assertEquals(WEEKNUM(735, 15), 2);
  assertEquals(WEEKNUM(736, 15), 2);
  assertEquals(WEEKNUM(737, 15), 2);
  assertEquals(WEEKNUM(738, 15), 2);
  assertEquals(WEEKNUM(739, 15), 2);
  assertEquals(WEEKNUM(740, 15), 2);
  assertEquals(WEEKNUM(741, 15), 3);
  assertEquals(WEEKNUM(742, 15), 3);
  assertEquals(WEEKNUM(743, 15), 3);
  assertEquals(WEEKNUM(744, 15), 3);
  assertEquals(WEEKNUM(745, 15), 3);
  assertEquals(WEEKNUM(746, 15), 3);
  //type=16
  assertEquals(WEEKNUM(23734, 16), 52);
  assertEquals(WEEKNUM(23735, 16), 52);
  assertEquals(WEEKNUM(23736, 16), 52);
  assertEquals(WEEKNUM(23737, 16), 53);
  assertEquals(WEEKNUM(23738, 16), 53);
  assertEquals(WEEKNUM(23739, 16), 53);
  assertEquals(WEEKNUM(23740, 16), 53);
  assertEquals(WEEKNUM(23741, 16), 53);
  assertEquals(WEEKNUM(23742, 16), 53);
  assertEquals(WEEKNUM(23743, 16), 1);
  assertEquals(WEEKNUM(23744, 16), 2);
  assertEquals(WEEKNUM(23745, 16), 2);
  assertEquals(WEEKNUM(23746, 16), 2);
  assertEquals(WEEKNUM(23747, 16), 2);
  assertEquals(WEEKNUM(23748, 16), 2);
  assertEquals(WEEKNUM(23749, 16), 2);
  assertEquals(WEEKNUM(23750, 16), 2);
  assertEquals(WEEKNUM(23751, 16), 3);
  assertEquals(WEEKNUM(23752, 16), 3);
  assertEquals(WEEKNUM(23753, 16), 3);
  assertEquals(WEEKNUM(23754, 16), 3);
  assertEquals(WEEKNUM(23755, 16), 3);
  assertEquals(WEEKNUM(23756, 16), 3);
  assertEquals(WEEKNUM(23757, 16), 3);
  assertEquals(WEEKNUM(23758, 16), 4);
  assertEquals(WEEKNUM(23759, 16), 4);
  assertEquals(WEEKNUM(23760, 16), 4);
  // //type=16 again
  assertEquals(WEEKNUM(355, 16), 51);
  assertEquals(WEEKNUM(356, 16), 51);
  assertEquals(WEEKNUM(357, 16), 52);
  assertEquals(WEEKNUM(358, 16), 52);
  assertEquals(WEEKNUM(359, 16), 52);
  assertEquals(WEEKNUM(360, 16), 52);
  assertEquals(WEEKNUM(361, 16), 52);
  assertEquals(WEEKNUM(362, 16), 52);
  assertEquals(WEEKNUM(363, 16), 52);
  assertEquals(WEEKNUM(364, 16), 53);
  assertEquals(WEEKNUM(365, 16), 53);
  assertEquals(WEEKNUM(366, 16), 53);
  assertEquals(WEEKNUM(367, 16), 1);
  assertEquals(WEEKNUM(368, 16), 1);
  assertEquals(WEEKNUM(369, 16), 1);
  assertEquals(WEEKNUM(370, 16), 1);
  assertEquals(WEEKNUM(371, 16), 2);
  assertEquals(WEEKNUM(372, 16), 2);
  assertEquals(WEEKNUM(373, 16), 2);
  assertEquals(WEEKNUM(374, 16), 2);
  assertEquals(WEEKNUM(375, 16), 2);
  assertEquals(WEEKNUM(376, 16), 2);
  assertEquals(WEEKNUM(377, 16), 2);
  assertEquals(WEEKNUM(378, 16), 3);
  assertEquals(WEEKNUM(379, 16), 3);
  assertEquals(WEEKNUM(380, 16), 3);
  assertEquals(WEEKNUM(381, 16), 3);
  //type=16 again
  assertEquals(WEEKNUM(730, 16), 53);
  assertEquals(WEEKNUM(731, 16), 53);
  assertEquals(WEEKNUM(732, 16), 1);
  assertEquals(WEEKNUM(733, 16), 1);
  assertEquals(WEEKNUM(734, 16), 1);
  assertEquals(WEEKNUM(735, 16), 2);
  assertEquals(WEEKNUM(736, 16), 2);
  assertEquals(WEEKNUM(737, 16), 2);
  assertEquals(WEEKNUM(738, 16), 2);
  assertEquals(WEEKNUM(739, 16), 2);
  assertEquals(WEEKNUM(740, 16), 2);
  assertEquals(WEEKNUM(741, 16), 2);
  assertEquals(WEEKNUM(742, 16), 3);
  assertEquals(WEEKNUM(743, 16), 3);
  assertEquals(WEEKNUM(744, 16), 3);
  assertEquals(WEEKNUM(745, 16), 3);
  assertEquals(WEEKNUM(746, 16), 3);
  //type=17
  assertEquals(WEEKNUM(23734, 17), 52);
  assertEquals(WEEKNUM(23735, 17), 52);
  assertEquals(WEEKNUM(23736, 17), 52);
  assertEquals(WEEKNUM(23737, 17), 52);
  assertEquals(WEEKNUM(23738, 17), 53);
  assertEquals(WEEKNUM(23739, 17), 53);
  assertEquals(WEEKNUM(23740, 17), 53);
  assertEquals(WEEKNUM(23741, 17), 53);
  assertEquals(WEEKNUM(23742, 17), 53);
  assertEquals(WEEKNUM(23743, 17), 1);
  assertEquals(WEEKNUM(23744, 17), 1);
  assertEquals(WEEKNUM(23745, 17), 2);
  assertEquals(WEEKNUM(23746, 17), 2);
  assertEquals(WEEKNUM(23747, 17), 2);
  assertEquals(WEEKNUM(23748, 17), 2);
  assertEquals(WEEKNUM(23749, 17), 2);
  assertEquals(WEEKNUM(23750, 17), 2);
  assertEquals(WEEKNUM(23751, 17), 2);
  assertEquals(WEEKNUM(23752, 17), 3);
  assertEquals(WEEKNUM(23753, 17), 3);
  assertEquals(WEEKNUM(23754, 17), 3);
  assertEquals(WEEKNUM(23755, 17), 3);
  assertEquals(WEEKNUM(23756, 17), 3);
  assertEquals(WEEKNUM(23757, 17), 3);
  assertEquals(WEEKNUM(23758, 17), 3);
  assertEquals(WEEKNUM(23759, 17), 4);
  assertEquals(WEEKNUM(23760, 17), 4);
  // //type=17 again
  assertEquals(WEEKNUM(355, 17), 51);
  assertEquals(WEEKNUM(356, 17), 51);
  assertEquals(WEEKNUM(357, 17), 51);
  assertEquals(WEEKNUM(358, 17), 52);
  assertEquals(WEEKNUM(359, 17), 52);
  assertEquals(WEEKNUM(360, 17), 52);
  assertEquals(WEEKNUM(361, 17), 52);
  assertEquals(WEEKNUM(362, 17), 52);
  assertEquals(WEEKNUM(363, 17), 52);
  assertEquals(WEEKNUM(364, 17), 52);
  assertEquals(WEEKNUM(365, 17), 53);
  assertEquals(WEEKNUM(366, 17), 53);
  assertEquals(WEEKNUM(367, 17), 1);
  assertEquals(WEEKNUM(368, 17), 1);
  assertEquals(WEEKNUM(369, 17), 1);
  assertEquals(WEEKNUM(370, 17), 1);
  assertEquals(WEEKNUM(371, 17), 1);
  assertEquals(WEEKNUM(372, 17), 2);
  assertEquals(WEEKNUM(373, 17), 2);
  assertEquals(WEEKNUM(374, 17), 2);
  assertEquals(WEEKNUM(375, 17), 2);
  assertEquals(WEEKNUM(376, 17), 2);
  assertEquals(WEEKNUM(377, 17), 2);
  assertEquals(WEEKNUM(378, 17), 2);
  assertEquals(WEEKNUM(379, 17), 3);
  assertEquals(WEEKNUM(380, 17), 3);
  assertEquals(WEEKNUM(381, 17), 3);
  //type=17 again
  assertEquals(WEEKNUM(730, 17), 53);
  assertEquals(WEEKNUM(731, 17), 53);
  assertEquals(WEEKNUM(732, 17), 1);
  assertEquals(WEEKNUM(733, 17), 1);
  assertEquals(WEEKNUM(734, 17), 1);
  assertEquals(WEEKNUM(735, 17), 1);
  assertEquals(WEEKNUM(736, 17), 2);
  assertEquals(WEEKNUM(737, 17), 2);
  assertEquals(WEEKNUM(738, 17), 2);
  assertEquals(WEEKNUM(739, 17), 2);
  assertEquals(WEEKNUM(740, 17), 2);
  assertEquals(WEEKNUM(741, 17), 2);
  assertEquals(WEEKNUM(742, 17), 2);
  assertEquals(WEEKNUM(743, 17), 3);
  assertEquals(WEEKNUM(744, 17), 3);
  assertEquals(WEEKNUM(745, 17), 3);
  assertEquals(WEEKNUM(746, 17), 3);
  //type=21
  assertEquals(WEEKNUM(23730, 21), 51);
  assertEquals(WEEKNUM(23731, 21), 51);
  assertEquals(WEEKNUM(23732, 21), 52);
  assertEquals(WEEKNUM(23733, 21), 52);
  assertEquals(WEEKNUM(23734, 21), 52);
  assertEquals(WEEKNUM(23735, 21), 52);
  assertEquals(WEEKNUM(23736, 21), 52);
  assertEquals(WEEKNUM(23737, 21), 52);
  assertEquals(WEEKNUM(23738, 21), 52);
  assertEquals(WEEKNUM(23739, 21), 53);
  assertEquals(WEEKNUM(23740, 21), 53);
  assertEquals(WEEKNUM(23741, 21), 53);
  assertEquals(WEEKNUM(23742, 21), 53);
  assertEquals(WEEKNUM(23743, 21), 53);
  assertEquals(WEEKNUM(23744, 21), 53);
  assertEquals(WEEKNUM(23745, 21), 53);
  assertEquals(WEEKNUM(23746, 21), 1);
  assertEquals(WEEKNUM(23747, 21), 1);
  assertEquals(WEEKNUM(23748, 21), 1);
  assertEquals(WEEKNUM(23749, 21), 1);
  assertEquals(WEEKNUM(23750, 21), 1);
  assertEquals(WEEKNUM(23751, 21), 1);
  assertEquals(WEEKNUM(23752, 21), 1);
  assertEquals(WEEKNUM(23753, 21), 2);
  assertEquals(WEEKNUM(23754, 21), 2);
  assertEquals(WEEKNUM(23755, 21), 2);
  assertEquals(WEEKNUM(23756, 21), 2);
  assertEquals(WEEKNUM(23757, 21), 2);
  assertEquals(WEEKNUM(23758, 21), 2);
  assertEquals(WEEKNUM(23759, 21), 2);
  assertEquals(WEEKNUM(23760, 21), 3);
  // //type=21 again
  assertEquals(WEEKNUM(355, 21), 51);
  assertEquals(WEEKNUM(356, 21), 51);
  assertEquals(WEEKNUM(357, 21), 51);
  assertEquals(WEEKNUM(358, 21), 51);
  assertEquals(WEEKNUM(359, 21), 52);
  assertEquals(WEEKNUM(360, 21), 52);
  assertEquals(WEEKNUM(361, 21), 52);
  assertEquals(WEEKNUM(362, 21), 52);
  assertEquals(WEEKNUM(363, 21), 52);
  assertEquals(WEEKNUM(364, 21), 52);
  assertEquals(WEEKNUM(365, 21), 52);
  assertEquals(WEEKNUM(366, 21), 1);
  assertEquals(WEEKNUM(367, 21), 1);
  assertEquals(WEEKNUM(368, 21), 1);
  assertEquals(WEEKNUM(369, 21), 1);
  assertEquals(WEEKNUM(370, 21), 1);
  assertEquals(WEEKNUM(371, 21), 1);
  assertEquals(WEEKNUM(372, 21), 1);
  assertEquals(WEEKNUM(373, 21), 2);
  assertEquals(WEEKNUM(374, 21), 2);
  assertEquals(WEEKNUM(375, 21), 2);
  assertEquals(WEEKNUM(376, 21), 2);
  assertEquals(WEEKNUM(377, 21), 2);
  assertEquals(WEEKNUM(378, 21), 2);
  assertEquals(WEEKNUM(379, 21), 2);
  assertEquals(WEEKNUM(380, 21), 3);
  assertEquals(WEEKNUM(381, 21), 3);
  // //type=21 again
  assertEquals(WEEKNUM(728, 21), 52);
  assertEquals(WEEKNUM(729, 21), 52);
  assertEquals(WEEKNUM(730, 21), 1);
  assertEquals(WEEKNUM(731, 21), 1);
  assertEquals(WEEKNUM(732, 21), 1);
  assertEquals(WEEKNUM(733, 21), 1);
  assertEquals(WEEKNUM(734, 21), 1);
  assertEquals(WEEKNUM(735, 21), 1);
  assertEquals(WEEKNUM(736, 21), 1);
  assertEquals(WEEKNUM(737, 21), 2);
  assertEquals(WEEKNUM(738, 21), 2);
  assertEquals(WEEKNUM(739, 21), 2);
  assertEquals(WEEKNUM(740, 21), 2);
  assertEquals(WEEKNUM(741, 21), 2);
  assertEquals(WEEKNUM(742, 21), 2);
  assertEquals(WEEKNUM(743, 21), 2);
  assertEquals(WEEKNUM(744, 21), 3);
  assertEquals(WEEKNUM(745, 21), 3);
  assertEquals(WEEKNUM(746, 21), 3);
  catchAndAssertEquals(function() {
    WEEKNUM.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    WEEKNUM.apply(this, [213123, 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    WEEKNUM("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    WEEKNUM([]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    WEEKNUM(-10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    WEEKNUM(10, 4);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    WEEKNUM(10, 22);
  }, ERRORS.NUM_ERROR);
});


test("WEEKDAY", function(){
  assertEquals(WEEKDAY(DATE(1992, 6, 20)), 7);
  assertEquals(WEEKDAY(DATE(1992, 6, 21)), 1);
  assertEquals(WEEKDAY(DATE(1992, 6, 24)), 4);
  assertEquals(WEEKDAY(DATE(1992, 6, 25)), 5);
  assertEquals(WEEKDAY(1312211), 5);
  assertEquals(WEEKDAY(1312212), 6);
  assertEquals(WEEKDAY(1312213), 7);
  assertEquals(WEEKDAY(0), 7);
  assertEquals(WEEKDAY(false), 7);
  assertEquals(WEEKDAY(1), 1);
  assertEquals(WEEKDAY(true), 1);
  assertEquals(WEEKDAY(40909, 1), 1);
  assertEquals(WEEKDAY(40909, 2), 7);
  assertEquals(WEEKDAY(40909, 3), 6);
  assertEquals(WEEKDAY(411, 1), 5);
  assertEquals(WEEKDAY(411, 2), 4);
  assertEquals(WEEKDAY(411, 3), 3);
  assertEquals(WEEKDAY(40909, 1), 1);
  assertEquals(WEEKDAY(40910, 1), 2);
  assertEquals(WEEKDAY(40911, 1), 3);
  assertEquals(WEEKDAY(40912, 1), 4);
  assertEquals(WEEKDAY(40913, 1), 5);
  assertEquals(WEEKDAY(40914, 1), 6);
  assertEquals(WEEKDAY(40915, 1), 7);
  assertEquals(WEEKDAY(40916, 1), 1);
  assertEquals(WEEKDAY(40909, 2), 7);
  assertEquals(WEEKDAY(40910, 2), 1);
  assertEquals(WEEKDAY(40911, 2), 2);
  assertEquals(WEEKDAY(40912, 2), 3);
  assertEquals(WEEKDAY(40913, 2), 4);
  assertEquals(WEEKDAY(40914, 2), 5);
  assertEquals(WEEKDAY(40915, 2), 6);
  assertEquals(WEEKDAY(40916, 2), 7);
  assertEquals(WEEKDAY(40909, 3), 6);
  assertEquals(WEEKDAY(40910, 3), 0);
  assertEquals(WEEKDAY(40911, 3), 1);
  assertEquals(WEEKDAY(40912, 3), 2);
  assertEquals(WEEKDAY(40913, 3), 3);
  assertEquals(WEEKDAY(40914, 3), 4);
  assertEquals(WEEKDAY(40915, 3), 5);
  assertEquals(WEEKDAY(40916, 3), 6);
  catchAndAssertEquals(function() {
    WEEKDAY.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    WEEKDAY.apply(this, [213123, 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    WEEKDAY("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    WEEKDAY([]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    WEEKDAY(-10);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    WEEKDAY(10, 4);
  }, ERRORS.NUM_ERROR);
});


test("YEAR", function(){
  assertEquals(YEAR(DATE(1992, 6, 24)), 1992);
  assertEquals(YEAR(DATE(2000, 6, 24)), 2000);
  assertEquals(YEAR(DATE(100, 6, 24)), 2000);
  assertEquals(YEAR(DATE(44, 6, 24)), 1944);
  assertEquals(YEAR(1312212), 5492);
  assertEquals(YEAR(9), 1900);
  assertEquals(YEAR(0), 1899);
  assertEquals(YEAR(false), 1899);
  assertEquals(YEAR(1), 1899);
  assertEquals(YEAR(true), 1899);
  assertEquals(YEAR([1, "str"]), 1899);
  catchAndAssertEquals(function() {
    YEAR.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    YEAR.apply(this, [213123, 123123]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    YEAR("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    YEAR([]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    YEAR(-10);
  }, ERRORS.NUM_ERROR);
});


test("MONTH", function(){
  assertEquals(MONTH(DATE(1992, 6, 24)), 6);
  assertEquals(MONTH(1312212), 9);
  assertEquals(MONTH(13122121), 2);
  catchAndAssertEquals(function() {
    MONTH.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MONTH.apply(this, [213123, 123123]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    MONTH("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    MONTH([]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    MONTH(-10);
  }, ERRORS.NUM_ERROR);
});


test("DAYS360", function(){
  assertEquals(DAYS360(DATE(1992, 6, 24), DATE(1992, 6, 25)), 1);
  assertEquals(DAYS360(DATE(1992, 6, 25), DATE(1992, 6, 24)), -1);
  assertEquals(DAYS360(DATE(1992, 6, 25), DATE(1992, 6, 23)), -2);
  assertEquals(DAYS360(DATE(1992, 6, 24), DATE(1991, 6, 24)), -360);
  assertEquals(DAYS360(DATE(1993, 6, 24), DATE(1992, 6, 24)), -360);
  assertEquals(DAYS360(DATEVALUE("1993-6-24"), 1), -33653);
  assertEquals(DAYS360(DATEVALUE("1993-6-24"), true), -33653);
  assertEquals(DAYS360(DATEVALUE("1993-6-24"), 0), -33654);
  assertEquals(DAYS360(DATEVALUE("1993-6-24"), false), -33654);
  assertEquals(DAYS360("2191-6-24", "1992-6-24"), -71640);
  assertEquals(DAYS360("2191-6-24", "1992-6-24", true), -71640);
  assertEquals(DAYS360(1, 390, 1), 384);
  assertEquals(DAYS360(1, 390), 384);
  assertEquals(DAYS360(33779, 33780), 1);
  assertEquals(DAYS360([1, "str"], [390, "str"]), 384);
  catchAndAssertEquals(function() {
    DAYS360.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DAYS360.apply(this, [100]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DAYS360.apply(this, [100, 200, true, "str"]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DAYS360("str", 100);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DAYS360("false", "true");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DAYS360([[], 100], 22);
  }, ERRORS.REF_ERROR);
});


test("DAYS", function(){
  assertEquals(DAYS(DATE(1992, 6, 24), DATE(1992, 6, 25)), -1);
  assertEquals(DAYS(DATE(1992, 6, 25), DATE(1992, 6, 24)), 1);
  assertEquals(DAYS(DATE(1992, 6, 25), DATE(1992, 6, 23)), 2);
  assertEquals(DAYS(DATE(1992, 6, 24), DATE(1991, 6, 24)), 366);
  assertEquals(DAYS(DATE(1993, 6, 24), DATE(1992, 6, 24)), 365);
  assertEquals(DAYS("2191-6-24", "1992-6-24"), 72683);
  assertEquals(DAYS(0, 1), -1);
  assertEquals(DAYS(false, true), -1);
  assertEquals(DAYS(0, 100), -100);
  assertEquals(DAYS(-100, 100), -200);
  assertEquals(DAYS(100, -100), 200);
  assertEquals(DAYS(100, 0), 100);
  assertEquals(DAYS([0, "str"], [100, "str"]), -100);
  assertEquals(DAYS("1992, 6, 25", "1992, 6, 24"), 1);
  catchAndAssertEquals(function() {
    DAYS.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DAYS.apply(this, [100]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DAYS.apply(this, [100, 200, 300]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DAYS([[], 100], 22);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    DAYS("str", 100);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DAYS("false", "true");
  }, ERRORS.VALUE_ERROR);
});


test("DAY", function(){
  assertEquals(DAY(DATE(1992, 6, 24)), 24);
  assertEquals(DAY(DATE(1992, 5, 10)), 10);
  assertEquals(DAY(DATE(1992, 5, 22)), 22);
  assertEquals(DAY(DATE(1992, 6, 1)), 1);
  assertEquals(DAY(DATE(2008, 1, 31)), 31);
  assertEquals(DAY("1992, 6, 24"), 24);
  assertEquals(DAY(["1992, 6, 24"]), 24);
  assertEquals(DAY(0), 30);
  assertEquals(DAY(false), 30);
  assertEquals(DAY(1), 31);
  assertEquals(DAY(true), 31);
  assertEquals(DAY(33779), 24);
  assertEquals(DAY([33779]), 24);
  assertEquals(DAY([33779, "str"]), 24);
  catchAndAssertEquals(function() {
    DAY("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DAY.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DAY.apply(this, [DATE(1992, 6, 24), 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DAY(-1);
  }, ERRORS.NUM_ERROR);
});


test("EDATE", function(){
  assertEquals(EDATE(DATE(1992, 6, 24), 1), DATE(1992, 7, 24));
  assertEquals(EDATE(DATE(1992, 5, 24), 2), DATE(1992, 7, 24));
  assertEquals(EDATE(DATE(1992, 5, 24), 2.2), DATE(1992, 7, 24));
  assertEquals(EDATE(DATE(1992, 6, 24), 0), DATE(1992, 6, 24));
  assertEquals(EDATE(DATE(1992, 6, 24), false), DATE(1992, 6, 24));
  assertEquals(EDATE("1992, 5, 24", 2), DATE(1992, 7, 24));
  assertEquals(EDATE("6/24/92", 1), DATE(1992, 7, 24));
  assertEquals(EDATE([DATE(1992, 6, 24), "str"], [1, "str"]), DATE(1992, 7, 24));
  assertEquals(EDATE(0, 1), DATE(1900, 1, 30));
  assertEquals(EDATE(false, 1), DATE(1900, 1, 30));
  catchAndAssertEquals(function() {
    EDATE("str", 2);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    EDATE.apply(this, [DATE(1992, 6, 24)]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EDATE.apply(this, [DATE(1992, 6, 24), 4, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EDATE(-1, 1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    EDATE(DATEVALUE("01/13/0101"), 1);
  }, ERRORS.NUM_ERROR);
});


test("EOMONTH", function(){
  assertEquals(EOMONTH(DATE(1992, 6, 24), 0), DATE(1992, 6, 30));
  assertEquals(EOMONTH(DATE(1992, 6, 24), false), DATE(1992, 6, 30));
  assertEquals(EOMONTH(DATE(1992, 6, 24), 1), DATE(1992, 7, 31));
  assertEquals(EOMONTH(DATE(1992, 6, 24), 2), DATE(1992, 8, 31));
  assertEquals(EOMONTH(DATE(2012, 6, 24), 2), DATE(2012, 8, 31));
  assertEquals(EOMONTH(DATE(2049, 1, 1), 2), DATE(2049, 3, 31));
  assertEquals(EOMONTH(DATE(1990, 2, 24), 400), DATE(2023, 6, 30));
  assertEquals(EOMONTH("1992, 6, 24", 2), DATE(1992, 8, 31));
  //leap years
  assertEquals(EOMONTH(DATE(2004, 2, 24), 0), DATE(2004, 2, 29));
  assertEquals(EOMONTH(DATE(2008, 2, 24), 0), DATE(2008, 2, 29));
  // misc.
  assertEquals(EOMONTH([DATE(1992, 6, 24), "str"], [2, "str"]), DATE(1992, 8, 31));
  assertEquals(EOMONTH(0, 1), DATE(1900, 1, 31));
  assertEquals(EOMONTH(false, 1), DATE(1900, 1, 31));
  assertEquals(EOMONTH(1, 1), DATE(1900, 1, 31));
  assertEquals(EOMONTH(true, 1), DATE(1900, 1, 31));
  catchAndAssertEquals(function() {
    EOMONTH.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EOMONTH.apply(this, [true, 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    EOMONTH("str", 2);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    EOMONTH(-1, 2);
  }, ERRORS.NUM_ERROR);
});


test("DATE", function(){
  assertEquals(DATE(1900, 1, 2), 3);
  assertEquals(DATE(1900, 1, 1), 2);
  assertEquals(DATE(1900, 1, 4), 5);
  catchAndAssertEquals(function() {
    DATE(1900, 0, 5);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    DATE.apply(this, [1900, 0, 5, 22]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DATE.apply(this, [1900, 0]);
  }, ERRORS.NA_ERROR);
  assertEquals(DATE(1992, 6, 24), 33779);
  assertEquals(DATE(2017, 2, 26), 42792);
  assertEquals(DATE(1999, 1, 13), 36173);
  // Leap day stuff
  assertEquals(DATE(2004, 2, 28), 38045);
  assertEquals(DATE(2004, 2, 29), 38046);
  assertEquals(DATE(2004, 3, 1), 38047);
  // Overflow values
  assertEquals(DATE(1992, 6, 44), 33799);
  assertEquals(DATE(2, 33, 44), 1749);
  assertEquals(DATE(1777, 33, 44), 650055);
  assertEquals(DATE(1976, 2, -10), 27780);
  assertEquals(DATE(-1900, 1, 1), 2);
  assertEquals(DATE(1992, 1, 10), 33613);
});


test("DATEVALUE", function(){
  assertEquals(DATEVALUE("6/24/92"), 33779);
  assertEquals(DATEVALUE(["6/24/92", false]), 33779);
  assertEquals(DATEVALUE("6-24-92 10am"), 33779);
  assertEquals(DATEVALUE("1992/6/24 00:00"), 33779);
  assertEquals(DATEVALUE("4243/11/3 200000000:33:444"), 9189404);
  assertEquals(DATEVALUE("1992/1/13 6:22222222:44am"), 49048); // overload minutes
  assertEquals(DATEVALUE("1992/6/24"), 33779);
  assertEquals(DATEVALUE("Sunday 1992/6/24"), 33779);
  assertEquals(DATEVALUE("1992-6-24"), 33779);
  assertEquals(DATEVALUE("1992/6/24"), 33779);
  assertEquals(DATEVALUE("1992 6 24"), 33779);
  assertEquals(DATEVALUE("1992 6 24"), 33779);
  assertEquals(DATEVALUE("1992 . 6 . 24"), 33779);
  assertEquals(DATEVALUE("1992 / 6 / 24"), 33779);
  assertEquals(DATEVALUE("1992, 6, 24"), 33779);
  assertEquals(DATEVALUE("1992/6/24 00am"), 33779);
  assertEquals(DATEVALUE("1992/5/20 01am"), 33744);
  assertEquals(DATEVALUE("Sun 09 Feb 2017"), 42775);
  assertEquals(DATEVALUE("01 Jan 2017"), 42736);
  assertEquals(DATEVALUE("24/June/1992 10am"), 33779);
  assertEquals(DATEVALUE("24/June/1992 10:10"), 33779);
  assertEquals(DATEVALUE("24/June/1992 10:10am"), 33779);
  assertEquals(DATEVALUE("24/June/1992 10:10:10"), 33779);
  assertEquals(DATEVALUE("24/June/1992 10:10:10am"), 33779);
  assertEquals(DATEVALUE("Sun Feb 09 2017"), 42775);
  assertEquals(DATEVALUE("2017/01"), 42736);
  assertEquals(DATEVALUE("2017-01 10am"), 42736);
  assertEquals(DATEVALUE("01/2017"), 42736);
  assertEquals(DATEVALUE("01-2017 10am"), 42736);
  assertEquals(DATEVALUE("2017 January"), 42736);
  assertEquals(DATEVALUE("2017-January 10am"), 42736);
  assertEquals(DATEVALUE("2017-January 10:10"), 42736);
  assertEquals(DATEVALUE("2017-January 10:10am"), 42736);
  assertEquals(DATEVALUE("2017-January 10:10:10"), 42736);
  assertEquals(DATEVALUE("2017-January 10:10:10am"), 42736);
  assertEquals(DATEVALUE("January 2017"), 42736);
  assertEquals(DATEVALUE("January 0030"), 10959);
  assertEquals(DATEVALUE("November 4243"), 856069);
  assertEquals(DATEVALUE("December 0100"), -657100);
  assertEquals(DATEVALUE("Jan 2017"), 42736);
  assertEquals(DATEVALUE("January-2017 10am"), 42736);
  assertEquals(DATEVALUE("January-2017 10:10"), 42736);
  assertEquals(DATEVALUE("January-2017 10:10am"), 42736);
  assertEquals(DATEVALUE("January-2017 10:10:10"), 42736);
  assertEquals(DATEVALUE("January-2017 10:10:10am"), 42736);
  catchAndAssertEquals(function() {
    DATEVALUE.apply(this, ["6/24/92", 10]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DATEVALUE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    DATEVALUE(false);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DATEVALUE("Sunday,1992/6/24");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DATEVALUE("2005/2/29");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DATEVALUE("2001/2/29");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    DATEVALUE("2005/1/44");
  }, ERRORS.VALUE_ERROR);
});
