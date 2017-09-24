/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import {
  assertEquals,
  test,
  catchAndAssertEquals, lockDate
} from "../Utils/Asserts";
import {
  TypeConverter
} from "../../src/Utilities/TypeConverter";
import {
  VALUE_ERROR,
  REF_ERROR, ValueError
} from "../../src/Errors";
import {
  Cell
} from "../../src/Cell";

let ERROR_CELL = new Cell("A1");
ERROR_CELL.setError(new ValueError("Whooops!"));


test("TypeConverter.unitsToTimeNumber", function () {
  assertEquals(TypeConverter.unitsToTimeNumber(10, 10, 10), 0.4237268518518518);
  assertEquals(TypeConverter.unitsToTimeNumber(34, 10, 10), 0.4237268518518518);
  assertEquals(TypeConverter.unitsToTimeNumber(0, 0, 0), 0);
  assertEquals(TypeConverter.unitsToTimeNumber(24, 0, 0), 0);
  assertEquals(TypeConverter.unitsToTimeNumber(23, 60, 0), 0);
  assertEquals(TypeConverter.unitsToTimeNumber(23, 59, 60), 0);
});


test("TypeConverter.numberToMoment", function () {
  assertEquals(TypeConverter.numberToMoment(10).format("M/D/YYYY"), "1/9/1900");
  assertEquals(TypeConverter.numberToMoment(2).format("M/D/YYYY"), "1/1/1900");
  assertEquals(TypeConverter.numberToMoment(1).format("M/D/YYYY"), "12/31/1899");
  assertEquals(TypeConverter.numberToMoment(0).format("M/D/YYYY"), "12/30/1899");
  assertEquals(TypeConverter.numberToMoment(10000).format("M/D/YYYY"), "5/18/1927");
  assertEquals(TypeConverter.numberToMoment(10001).format("M/D/YYYY"), "5/19/1927");
  assertEquals(TypeConverter.numberToMoment(-1000).format("M/D/YYYY"), "4/4/1897");
  assertEquals(TypeConverter.numberToMoment(10.1).format("M/D/YYYY"), "1/9/1900");
  assertEquals(TypeConverter.numberToMoment(2.44).format("M/D/YYYY"), "1/1/1900");
  assertEquals(TypeConverter.numberToMoment(1.44).format("M/D/YYYY"), "12/31/1899");
  assertEquals(TypeConverter.numberToMoment(1.99).format("M/D/YYYY"), "1/1/1900");
  assertEquals(TypeConverter.numberToMoment(0.78).format("M/D/YYYY"), "12/31/1899");
});


test("TypeConverter.momentToDayNumber", function () {
  assertEquals(TypeConverter.momentToDayNumber(moment.utc("1900-01-09")), 10);
  assertEquals(TypeConverter.momentToDayNumber(moment.utc("1900-01-01")), 2);
  assertEquals(TypeConverter.momentToDayNumber(moment.utc("1899-12-31")), 1);
  assertEquals(TypeConverter.momentToDayNumber(moment.utc("1899-12-30")), 0);
  assertEquals(TypeConverter.momentToDayNumber(moment.utc("1927-05-18")), 10000);
  assertEquals(TypeConverter.momentToDayNumber(moment.utc("1927-05-19")), 10001);
  assertEquals(TypeConverter.momentToDayNumber(moment.utc("1897-04-04")), -1000);
});


test("TypeConverter.momentToNumber", function () {
  assertEquals(TypeConverter.momentToNumber(moment.utc("1900-01-09")), 10);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1900-01-01")), 2);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1899-12-31")), 1);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1899-12-30")), 0);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1927-05-18")), 10000);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1927-05-19")), 10001);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1897-04-04")), -1000);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1900-01-09T16:11:57+00:00")), 10.674965277777778);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1900-01-01T16:11:57+00:00")), 2.674965277777778);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1899-12-31T12:00:00+00:00")), 1.5);
  assertEquals(TypeConverter.momentToNumber(moment.utc("1899-12-31T18:00:00+00:00")), 1.75);
});


test("TypeConverter.valueToDateNumber", function () {
  assertEquals(TypeConverter.valueToDateNumber(Cell.BuildFrom("A1", 10)), 10);
  assertEquals(TypeConverter.valueToDateNumber(10), 10);
  assertEquals(TypeConverter.valueToDateNumber("10"), 10);
  assertEquals(TypeConverter.valueToDateNumber("10.0"), 10);
  assertEquals(TypeConverter.valueToDateNumber("1992-1-1"), 33604);
  assertEquals(TypeConverter.valueToDateNumber("1992-1-2"), 33605);
  assertEquals(TypeConverter.valueToDateNumber(false, true), 0);
  assertEquals(TypeConverter.valueToDateNumber(true, true), 1);
  catchAndAssertEquals(function () {
    TypeConverter.valueToDateNumber(false); // Do not convert boolean
  }, VALUE_ERROR);
  catchAndAssertEquals(function () {
    TypeConverter.valueToDateNumber(ERROR_CELL);
  }, VALUE_ERROR);
  catchAndAssertEquals(function () {
    console.log(TypeConverter.valueToDateNumber("str"));
  }, VALUE_ERROR);
});


test("TypeConverter.firstValueAsDateNumber", function () {
  assertEquals(TypeConverter.firstValueAsDateNumber([Cell.BuildFrom("A1", 10)]), 10);
  assertEquals(TypeConverter.firstValueAsDateNumber([10]), 10);
  assertEquals(TypeConverter.firstValueAsDateNumber([[10]]), 10);
  assertEquals(TypeConverter.firstValueAsDateNumber([[[[[10]]]]]), 10);
  assertEquals(TypeConverter.firstValueAsDateNumber(["10"]), 10);
  assertEquals(TypeConverter.firstValueAsDateNumber(["10.0"]), 10);
  assertEquals(TypeConverter.firstValueAsDateNumber(["1992-1-1"]), 33604);
  assertEquals(TypeConverter.firstValueAsDateNumber(["1992-1-2"]), 33605);
  assertEquals(TypeConverter.firstValueAsDateNumber([false], true), 0);
  assertEquals(TypeConverter.firstValueAsDateNumber([true], true), 1);
  catchAndAssertEquals(function () {
    TypeConverter.firstValueAsDateNumber([ERROR_CELL]);
  }, VALUE_ERROR);
  catchAndAssertEquals(function () {
    TypeConverter.firstValueAsDateNumber([false]); // Do not convert boolean
  }, VALUE_ERROR);
  catchAndAssertEquals(function () {
    TypeConverter.firstValueAsDateNumber(["str"]);
  }, VALUE_ERROR);
  catchAndAssertEquals(function () {
    TypeConverter.firstValueAsDateNumber([[], 10]);
  }, REF_ERROR);
});


test("TypeConverter.firstValue", function () {
  assertEquals(TypeConverter.firstValue([10, 0]), 10);
  assertEquals(TypeConverter.firstValue([[[[10]]], 0]), 10);
  assertEquals(TypeConverter.firstValue(["10"]), "10");
  assertEquals(TypeConverter.firstValue(["string", 22]), "string");
  catchAndAssertEquals(function () {
    TypeConverter.firstValue([[], 10]);
  }, REF_ERROR);
});


test("TypeConverter.valueToTimestampNumber", function () {
  assertEquals(TypeConverter.valueToTimestampNumber(Cell.BuildFrom("A1", 10)), 10);
  assertEquals(TypeConverter.valueToTimestampNumber(10), 10);
  assertEquals(TypeConverter.valueToTimestampNumber(""), 0);
  assertEquals(TypeConverter.valueToTimestampNumber("12:00pm"), 0.5);
  assertEquals(TypeConverter.valueToTimestampNumber("12:00"), 0.5);
  assertEquals(TypeConverter.valueToTimestampNumber("12pm"), 0.5);
  assertEquals(TypeConverter.valueToTimestampNumber("10:10am"), 0.4236111111111111);
  assertEquals(TypeConverter.valueToTimestampNumber("10:10:10am"), 0.4237268518518518);
  assertEquals(TypeConverter.valueToTimestampNumber("22:10:10"), 0.9237268518518519);
  assertEquals(TypeConverter.valueToTimestampNumber("1:10:10"), 0.048726851851851855);
  assertEquals(TypeConverter.valueToTimestampNumber("25:10:10"), 0.048726851851851855);
  assertEquals(TypeConverter.valueToTimestampNumber(false), 0);
  assertEquals(TypeConverter.valueToTimestampNumber(true), 0);
  catchAndAssertEquals(function () {
    TypeConverter.valueToTimestampNumber("str");
  }, VALUE_ERROR);
  catchAndAssertEquals(function () {
    TypeConverter.valueToTimestampNumber(ERROR_CELL);
  }, VALUE_ERROR);
});


test("TypeConverter.valueToString", function () {
  assertEquals(TypeConverter.valueToString(Cell.BuildFrom("A1", 10)), "10");
  assertEquals(TypeConverter.valueToString(new Cell("A1")), "");
  assertEquals(TypeConverter.valueToString(10), "10");
  assertEquals(TypeConverter.valueToString("10"), "10");
  assertEquals(TypeConverter.valueToString("This is a string"), "This is a string");
  assertEquals(TypeConverter.valueToString(10.3712638712), "10.3712638712");
  assertEquals(TypeConverter.valueToString(-0.33824284782334), "-0.33824284782334");
  assertEquals(TypeConverter.valueToString(false), "FALSE");
  assertEquals(TypeConverter.valueToString(true), "TRUE");
  catchAndAssertEquals(function () {
    TypeConverter.valueToString(ERROR_CELL);
  }, VALUE_ERROR);
});


test("TypeConverter.valueToBoolean", function () {
  assertEquals(TypeConverter.valueToBoolean(Cell.BuildFrom("A1", 10)), true);
  assertEquals(TypeConverter.valueToBoolean(Cell.BuildFrom("A1", 0)), false);
  assertEquals(TypeConverter.valueToBoolean(new Cell("A1")), false);
  assertEquals(TypeConverter.valueToBoolean(10), true);
  assertEquals(TypeConverter.valueToBoolean(-10), true);
  assertEquals(TypeConverter.valueToBoolean(1.11111), true);
  assertEquals(TypeConverter.valueToBoolean(0), false);
  assertEquals(TypeConverter.valueToBoolean(false), false);
  assertEquals(TypeConverter.valueToBoolean(true), true);
  catchAndAssertEquals(function () {
    TypeConverter.valueToBoolean("str");
  }, VALUE_ERROR);
  catchAndAssertEquals(function () {
    TypeConverter.valueToBoolean(ERROR_CELL);
  }, VALUE_ERROR);
});


test("TypeConverter.valueToNumber", function () {
  assertEquals(TypeConverter.valueToNumber(Cell.BuildFrom("A1", 10)), 10);
  assertEquals(TypeConverter.valueToNumber(Cell.BuildFrom("A1", "10")), 10);
  assertEquals(TypeConverter.valueToNumber(10), 10);
  assertEquals(TypeConverter.valueToNumber(-10), -10);
  assertEquals(TypeConverter.valueToNumber(1.11111), 1.11111);
  assertEquals(TypeConverter.valueToNumber(0), 0);
  assertEquals(TypeConverter.valueToNumber(false), 0);
  assertEquals(TypeConverter.valueToNumber(true), 1);
  assertEquals(TypeConverter.valueToNumber("10"), 10);
  assertEquals(TypeConverter.valueToNumber("-10"), -10);
  assertEquals(TypeConverter.valueToNumber("1.4832749823"), 1.4832749823);
  assertEquals(TypeConverter.valueToNumber("   1.4832749823   "), 1.4832749823);
  assertEquals(TypeConverter.valueToNumber("$10"), 10);
  assertEquals(TypeConverter.valueToNumber("$10.217983172"), 10.217983172);
  assertEquals(TypeConverter.valueToNumber("-$10.217983172"), -10.217983172);
  catchAndAssertEquals(function () {
    TypeConverter.valueToNumber("str");
  }, VALUE_ERROR);
  catchAndAssertEquals(function () {
    TypeConverter.valueToNumber(ERROR_CELL);
  }, VALUE_ERROR);
});


test("TypeConverter.stringToNumber", function () {
  assertEquals(TypeConverter.stringToNumber("10"), 10);
  assertEquals(TypeConverter.stringToNumber("-10"), -10);
  assertEquals(TypeConverter.stringToNumber("1.4832749823"), 1.4832749823);
  assertEquals(TypeConverter.stringToNumber("   1.4832749823   "), 1.4832749823);
  assertEquals(TypeConverter.stringToNumber("$10"), 10);
  assertEquals(TypeConverter.stringToNumber("$10.217983172"), 10.217983172);
  assertEquals(TypeConverter.stringToNumber("-$10.217983172"), -10.217983172);
  assertEquals(TypeConverter.stringToNumber("100"), 100);
  assertEquals(TypeConverter.stringToNumber("10%"), 0.1);
  assertEquals(TypeConverter.stringToNumber("33.213131"), 33.213131);
  assertEquals(TypeConverter.stringToNumber("41.1231"), 41.1231);
  assertEquals(TypeConverter.stringToNumber("10e1"), 100);
  assertEquals(TypeConverter.stringToNumber("10e2"), 1000);
  assertEquals(TypeConverter.stringToNumber("10E1"), 100);
  assertEquals(TypeConverter.stringToNumber("10.44E1"), 104.4);
  assertEquals(TypeConverter.stringToNumber("10.44E10"), 104400000000);
  assertEquals(TypeConverter.stringToNumber("10e-1"), 1);
  assertEquals(TypeConverter.stringToNumber("10e+1"), 100);
  assertEquals(TypeConverter.stringToNumber("10E-1"), 1);
  assertEquals(TypeConverter.stringToNumber("10E+1"), 100);
  assertEquals(TypeConverter.stringToNumber("$10"), 10);
  assertEquals(TypeConverter.stringToNumber("$0.1"), 0.1);
  assertEquals(TypeConverter.stringToNumber("$10.1"), 10.1);
  assertEquals(TypeConverter.stringToNumber("$9.2222"), 9.2222);
  assertEquals(TypeConverter.stringToNumber("+$9.2345"), 9.2345);
  assertEquals(TypeConverter.stringToNumber("+$  9.29"), 9.29);
  assertEquals(TypeConverter.stringToNumber("+$ 9.29"), 9.29);
  assertEquals(TypeConverter.stringToNumber("+$9.2345"), 9.2345);
  assertEquals(TypeConverter.stringToNumber("+$  9.29"), 9.29);
  assertEquals(TypeConverter.stringToNumber("+$ 9.29"), 9.29);
  assertEquals(TypeConverter.stringToNumber("$.1"), 0.1);
  assertEquals(TypeConverter.stringToNumber("+$.111"), 0.111);
  assertEquals(TypeConverter.stringToNumber("$+.111"), 0.111);
  assertEquals(TypeConverter.stringToNumber("-$.1"), -0.1);
  assertEquals(TypeConverter.stringToNumber("$-9.2345"), -9.2345);
  assertEquals(TypeConverter.stringToNumber("$ - 9.29"), -9.29);
  assertEquals(TypeConverter.stringToNumber("$- 9.29"), -9.29);
  assertEquals(TypeConverter.stringToNumber("-$9.2345"), -9.2345);
  assertEquals(TypeConverter.stringToNumber("-$  9.29"), -9.29);
  assertEquals(TypeConverter.stringToNumber("-$ 9.29"), -9.29);
  assertEquals(TypeConverter.stringToNumber("-$9"), -9);
  assertEquals(TypeConverter.stringToNumber("+$9"), 9);
  assertEquals(TypeConverter.stringToNumber("$-9"), -9);
  assertEquals(TypeConverter.stringToNumber("$+9"), 9);
  assertEquals(TypeConverter.stringToNumber("-$9."), -9);
  assertEquals(TypeConverter.stringToNumber("+$9."), 9);
  assertEquals(TypeConverter.stringToNumber("$-9."), -9);
  assertEquals(TypeConverter.stringToNumber("$+9."), 9);
  assertEquals(TypeConverter.stringToNumber("1,000"), 1000);
  assertEquals(TypeConverter.stringToNumber("1,000,000"), 1000000);
  assertEquals(TypeConverter.stringToNumber("1000,000"), 1000000);
  assertEquals(TypeConverter.stringToNumber("2222,000,000"), 2222000000);
  assertEquals(TypeConverter.stringToNumber("1,000.1"), 1000.1);
  assertEquals(TypeConverter.stringToNumber("1,000,000.11"), 1000000.11);
  assertEquals(TypeConverter.stringToNumber("2222,000,000.1"), 2222000000.1);
  assertEquals(TypeConverter.stringToNumber(" $ 1,000"), 1000);
  assertEquals(TypeConverter.stringToNumber("$ 1,000"), 1000);
  assertEquals(TypeConverter.stringToNumber("100.1e2"), 10010);
  assertEquals(TypeConverter.stringToNumber("10e2%"), 10);
  assertEquals(TypeConverter.stringToNumber("$ 1,000."), 1000);
  assertEquals(TypeConverter.stringToNumber("$10e1"), undefined);
  assertEquals(TypeConverter.stringToNumber("$+-10.00"), undefined);
  assertEquals(TypeConverter.stringToNumber("+$+10.00"), undefined);
  assertEquals(TypeConverter.stringToNumber("+$-10.00"), undefined);
  assertEquals(TypeConverter.stringToNumber("10e"), undefined);
  assertEquals(TypeConverter.stringToNumber("10,00"), undefined);
  assertEquals(TypeConverter.stringToNumber("10,000,"), undefined);
});


test("TypeConverter.valueToNumberGracefully", function () {
  assertEquals(TypeConverter.valueToNumberGracefully(Cell.BuildFrom("A1", "10")), 10);
  assertEquals(TypeConverter.valueToNumberGracefully(Cell.BuildFrom("A1", "not-graceful")), 0);
  assertEquals(TypeConverter.valueToNumberGracefully(new Cell("A1")), 0);
  assertEquals(TypeConverter.valueToNumberGracefully(10), 10);
  assertEquals(TypeConverter.valueToNumberGracefully(-10), -10);
  assertEquals(TypeConverter.valueToNumberGracefully(1.11111), 1.11111);
  assertEquals(TypeConverter.valueToNumberGracefully(0), 0);
  assertEquals(TypeConverter.valueToNumberGracefully(false), 0);
  assertEquals(TypeConverter.valueToNumberGracefully(true), 1);
  assertEquals(TypeConverter.valueToNumberGracefully("10"), 10);
  assertEquals(TypeConverter.valueToNumberGracefully("-10"), -10);
  assertEquals(TypeConverter.valueToNumberGracefully("1.4832749823"), 1.4832749823);
  assertEquals(TypeConverter.valueToNumberGracefully("   1.4832749823   "), 1.4832749823);
  assertEquals(TypeConverter.valueToNumberGracefully("$10"), 10);
  assertEquals(TypeConverter.valueToNumberGracefully("$10.217983172"), 10.217983172);
  assertEquals(TypeConverter.valueToNumberGracefully("-$10.217983172"), -10.217983172);
  assertEquals(TypeConverter.valueToNumberGracefully("dkasjdkljasjdas"), 0);
});


test("TypeConverter.stringToDateNumber", function () {
  // MONTHDIG_DAY_YEAR, MM(fd)DD(fd)YYYY ===============================================================================
  assertEquals(TypeConverter.stringToDateNumber("6/24/92"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6/24/1992"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("06/24/1992"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1/01/1999"), 36161);
  assertEquals(TypeConverter.stringToDateNumber("1/01/99"), 36161);
  assertEquals(TypeConverter.stringToDateNumber("1/01/2222"), 117610);
  assertEquals(TypeConverter.stringToDateNumber("9/02/1902"), 976);
  assertEquals(TypeConverter.stringToDateNumber("9/2/1902"), 976);
  assertEquals(TypeConverter.stringToDateNumber("11/3/4243"), 856071);
  assertEquals(TypeConverter.stringToDateNumber("  04/19/1992  "), 33713);
  assertEquals(TypeConverter.stringToDateNumber("5/20/1992"), 33744);
  assertEquals(TypeConverter.stringToDateNumber("6/21/1992"), 33776);
  assertEquals(TypeConverter.stringToDateNumber("9/29/1992"), 33876);
  assertEquals(TypeConverter.stringToDateNumber("1/24/1992"), 33627);
  assertEquals(TypeConverter.stringToDateNumber("12/21/1992"), 33959);
  assertEquals(TypeConverter.stringToDateNumber("01/31/1992"), 33634);
  assertEquals(TypeConverter.stringToDateNumber("1/13/1992"), 33616);
  assertEquals(TypeConverter.stringToDateNumber("2/29/2004"), 38046);
  assertEquals(TypeConverter.stringToDateNumber("2/28/2004"), 38045);
  assertEquals(TypeConverter.stringToDateNumber("2/28/004"), 38045);
  assertEquals(TypeConverter.stringToDateNumber("2/28/04"), 38045);
  assertEquals(TypeConverter.stringToDateNumber("2/28/4"), 38045);
  assertEquals(TypeConverter.stringToDateNumber("1/13/1999"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("01/13/1999"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0999"), -329069);
  assertEquals(TypeConverter.stringToDateNumber("01/13/1200"), -255656);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0029"), 47131);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0030"), 10971);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0044"), 16084);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0050"), 18276);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0097"), 35443);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0099"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0000"), 36538);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0101"), -657057);
  assertEquals(TypeConverter.stringToDateNumber("01/13/0100"), -657422);
  assertEquals(TypeConverter.stringToDateNumber("12/31/100"), -657070);
  assertEquals(TypeConverter.stringToDateNumber("11/10/122"), -649086);
  assertEquals(TypeConverter.stringToDateNumber("1/22/2222"), 117631);
  assertEquals(TypeConverter.stringToDateNumber("1/22/222"), -612854);
  // delimiter tests
  assertEquals(TypeConverter.stringToDateNumber("6-24-92"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6/24/92"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6 24 92"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6.24.92"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6 . 24 . 92"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6 / 24 / 92"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6, 24, 92"), 33779);
  // flex delimiter should not allow a comma without a space after it.
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("Sunday,6/24/92");
  }, VALUE_ERROR);
  // Leap day on non-leap years
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2/29/2005");
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2/29/2001");
  }, VALUE_ERROR);
  // Out of range day for any month
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("1/44/2005");
  }, VALUE_ERROR);
  // timestamp test
  assertEquals(TypeConverter.stringToDateNumber("6-24-92 10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92 10:10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92 10:10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92 10:10:10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92 10:10:10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92  10  am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92 10: 10 "), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92 10: 10 pm"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92 10: 10: 10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("6-24-92  10: 10: 10    am  "), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 00:00"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 0:00"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 10:10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 16:22"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 25:10"), 33780);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 23:60"), 33780);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 24:00"), 33780);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 23:59"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/13 10:11111111"), 43889);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/13 25000:22"), 37214);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/13 25000:    22"), 37214);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 00:00am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/06/24 01:44am "), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/01 02:59pm"), 36161);
  assertEquals(TypeConverter.stringToDateNumber("2222/1/01 03:33pm"), 117610);
  assertEquals(TypeConverter.stringToDateNumber("1902/9/02 12:33pm"), 976);
  assertEquals(TypeConverter.stringToDateNumber("1902/9/2 12:33pm"), 976);
  assertEquals(TypeConverter.stringToDateNumber("4243/11/3 12:33pm"), 856071);
  assertEquals(TypeConverter.stringToDateNumber("  1992/04/19   12:  33pm   "), 33713);
  assertEquals(TypeConverter.stringToDateNumber("1992/5/20 01:33am"), 33744);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/21  3:33pm"), 33776);
  assertEquals(TypeConverter.stringToDateNumber("1992/9/29 3:33pm"), 33876);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/24 3:33pm"), 33627);
  assertEquals(TypeConverter.stringToDateNumber("1992/12/21 3:33pm"), 33959);
  assertEquals(TypeConverter.stringToDateNumber("1992/01/31 3:33pm"), 33634);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 3:33pm"), 33616);
  assertEquals(TypeConverter.stringToDateNumber("2004/2/29 3:33pm"), 38046);
  assertEquals(TypeConverter.stringToDateNumber("2004/2/28  3:33pm "), 38045);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/13 3:33pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("1999/01/13 3:33pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("0999/01/13 3:33pm"), -329069);
  assertEquals(TypeConverter.stringToDateNumber("1200/01/13 3:33pm"), -255656);
  assertEquals(TypeConverter.stringToDateNumber("0029/01/13 3:33pm"), 47131);
  assertEquals(TypeConverter.stringToDateNumber("0030/01/13 3:33pm"), 10971);
  assertEquals(TypeConverter.stringToDateNumber("0044/01/13 3:33pm"), 16084);
  assertEquals(TypeConverter.stringToDateNumber("0050/01/13 3:33pm"), 18276);
  assertEquals(TypeConverter.stringToDateNumber("0097/01/13 00:33pm"), 35443);
  assertEquals(TypeConverter.stringToDateNumber("0099/01/13 3:33pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("0000/01/13 3:33pm"), 36538);
  assertEquals(TypeConverter.stringToDateNumber("0101/01/13 3:33pm"), -657057);
  assertEquals(TypeConverter.stringToDateNumber("0100/01/13 3:33pm"), -657422);
  assertEquals(TypeConverter.stringToDateNumber("100/12/31 3:33pm"), -657070);
  assertEquals(TypeConverter.stringToDateNumber("122/11/10 3:33pm"), -649086);
  assertEquals(TypeConverter.stringToDateNumber("2222/1/22 3:33pm"), 117631);
  assertEquals(TypeConverter.stringToDateNumber("222/1/22 3:33pm"), -612854);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 6:22222222am"), 49048); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:720pm"), 33617); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 00:720pm"), 33617); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:719pm"), 33616); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 00:720am"), 33616); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 00:01pm"), 33616); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:66669pm"), 33662); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:66669am"), 33662); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:66249pm"), 33662); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:66249am"), 33662); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:666669am"), 34078); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:666669pm"), 34079); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:100000000am"), 103060); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:0912347287am"), 667190); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:00000912347287am"), 667190); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:1989198298am"), 1415003); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 0:0:0"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 0000:0000:0000"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("0000/01/13 3:33:999999999"), 48112); // overload seconds
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 6:22222222:0"), 49048); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:912347287:10"), 667191); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:100000000:10"), 103060); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 23:720:10"), 33617); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 23:719:60"), 33617); // overload minutes, seconds
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 24:00:00"), 33780); // overload hours
  assertEquals(TypeConverter.stringToDateNumber("1999/1/01 200000000:999999999:923231312"), 9074624); // overload hours, minutes, seconds
  assertEquals(TypeConverter.stringToDateNumber("  1992/04/19   12:  33: 11  "), 33713);
  assertEquals(TypeConverter.stringToDateNumber("0000/01/13 3:33:33"), 36538);
  assertEquals(TypeConverter.stringToDateNumber("4243/11/3 200000000:33:444"), 9189404);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/13 10:10:10pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 0:0:0pm"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 00:0000:0000pm"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("0000/01/13 3:33:999999999pm"), 48112); // overload seconds
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 6:22222222:0pm"), 49048); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:912347287:10pm"), 667191); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:100000000:10pm"), 103060); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 00:00:00am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/06/24 01:44:00am "), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/01 02:59:00pm"), 36161);
  assertEquals(TypeConverter.stringToDateNumber("2222/1/01 03:33:00pm"), 117610);
  assertEquals(TypeConverter.stringToDateNumber("1902/9/02 12:33:00pm"), 976);
  assertEquals(TypeConverter.stringToDateNumber("1902/9/2 12:33:00pm"), 976);
  assertEquals(TypeConverter.stringToDateNumber("4243/11/3 12:33:00pm"), 856071);
  assertEquals(TypeConverter.stringToDateNumber("  1992/04/19   12:  33:  00  pm   "), 33713);
  assertEquals(TypeConverter.stringToDateNumber("1992/5/20 01:33:44am"), 33744);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/21  3:33:44pm"), 33776);
  assertEquals(TypeConverter.stringToDateNumber("1992/9/29 3:33:44pm"), 33876);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/24 3:33:44pm"), 33627);
  assertEquals(TypeConverter.stringToDateNumber("1992/12/21 3:33:44pm"), 33959);
  assertEquals(TypeConverter.stringToDateNumber("1992/01/31 3:33:44pm"), 33634);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 3:33:44pm"), 33616);
  assertEquals(TypeConverter.stringToDateNumber("2004/2/29 3:33:44pm"), 38046);
  assertEquals(TypeConverter.stringToDateNumber("2004/2/28  3:33:44pm "), 38045);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/13 3:33:44pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("1999/01/13 3:33:44pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("0999/01/13 3:33:44pm"), -329069);
  assertEquals(TypeConverter.stringToDateNumber("1200/01/13 3:33:44pm"), -255656);
  assertEquals(TypeConverter.stringToDateNumber("0029/01/13 3:33:44pm"), 47131);
  assertEquals(TypeConverter.stringToDateNumber("0030/01/13 3:33:44pm"), 10971);
  assertEquals(TypeConverter.stringToDateNumber("0044/01/13 3:33:44pm"), 16084);
  assertEquals(TypeConverter.stringToDateNumber("0050/01/13 3:33:44pm"), 18276);
  assertEquals(TypeConverter.stringToDateNumber("0097/01/13 00:33:44pm"), 35443);
  assertEquals(TypeConverter.stringToDateNumber("0099/01/13 3:33:44pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("0000/01/13 3:33:44pm"), 36538);
  assertEquals(TypeConverter.stringToDateNumber("0101/01/13 3:33:44pm"), -657057);
  assertEquals(TypeConverter.stringToDateNumber("0100/01/13 3:33:44pm"), -657422);
  assertEquals(TypeConverter.stringToDateNumber("100/12/31 3:33:44pm"), -657070);
  assertEquals(TypeConverter.stringToDateNumber("122/11/10 3:33:44pm"), -649086);
  assertEquals(TypeConverter.stringToDateNumber("2222/1/22 3:33:44pm"), 117631);
  assertEquals(TypeConverter.stringToDateNumber("222/1/22 3:33:44pm"), -612854);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 6:22222222:44am"), 49048); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:720:00pm"), 33617); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 00:720:00pm"), 33617); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:719:00pm"), 33616); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 00:720:00am"), 33616); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:719:60pm"), 33617); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 00:720:00am"), 33616); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 00:01:00pm"), 33616); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:66669:00pm"), 33662); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:66669:00am"), 33662); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:66249:00pm"), 33662); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:66249:00am"), 33662); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:666669:00am"), 34078); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:666669:00pm"), 34079); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:100000000:00am"), 103060); // overload minutes
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:912347287:00am"), 667190); // overload minutes
  // YEAR_MONTHDIG_DAY, YYYY(fd)MM(fd)DD ===============================================================================
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/06/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/01"), 36161);
  assertEquals(TypeConverter.stringToDateNumber("2222/1/01"), 117610);
  assertEquals(TypeConverter.stringToDateNumber("1902/9/02"), 976);
  assertEquals(TypeConverter.stringToDateNumber("1902/9/2"), 976);
  assertEquals(TypeConverter.stringToDateNumber("4243/11/3"), 856071);
  assertEquals(TypeConverter.stringToDateNumber("  1992/04/19  "), 33713);
  assertEquals(TypeConverter.stringToDateNumber("  1992 /  04/ 19  "), 33713);
  assertEquals(TypeConverter.stringToDateNumber("1992/5/20"), 33744);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/21"), 33776);
  assertEquals(TypeConverter.stringToDateNumber("1992/9/29"), 33876);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/24"), 33627);
  assertEquals(TypeConverter.stringToDateNumber("1992/12/21"), 33959);
  assertEquals(TypeConverter.stringToDateNumber("1992/01/31"), 33634);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13"), 33616);
  assertEquals(TypeConverter.stringToDateNumber("2004/2/29"), 38046);
  assertEquals(TypeConverter.stringToDateNumber("2004/2/28"), 38045);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/13"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("1999/01/13"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("0999/01/13"), -329069);
  assertEquals(TypeConverter.stringToDateNumber("1200/01/13"), -255656);
  assertEquals(TypeConverter.stringToDateNumber("0029/01/13"), 47131);
  assertEquals(TypeConverter.stringToDateNumber("0030/01/13"), 10971);
  assertEquals(TypeConverter.stringToDateNumber("0044/01/13"), 16084);
  assertEquals(TypeConverter.stringToDateNumber("0050/01/13"), 18276);
  assertEquals(TypeConverter.stringToDateNumber("0097/01/13"), 35443);
  assertEquals(TypeConverter.stringToDateNumber("0099/01/13"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("0000/01/13"), 36538);
  assertEquals(TypeConverter.stringToDateNumber("0101/01/13"), -657057);
  assertEquals(TypeConverter.stringToDateNumber("0100/01/13"), -657422);
  assertEquals(TypeConverter.stringToDateNumber("100/12/31"), -657070);
  assertEquals(TypeConverter.stringToDateNumber("122/11/10"), -649086);
  assertEquals(TypeConverter.stringToDateNumber("2222/1/22"), 117631);
  assertEquals(TypeConverter.stringToDateNumber("222/1/22"), -612854);
  assertEquals(TypeConverter.stringToDateNumber("Sunday 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Monday 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Tuesday 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Wednesday 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Thursday 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Friday 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Saturday 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Sun 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Mon 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Tue 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Wed 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Thu 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Fri 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Sat 1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("Sunday, 1992/6/24"), 33779);
  // delimiter tests
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992 6 24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992 6 24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992 . 6 . 24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992 / 6 / 24"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992, 6, 24"), 33779);
  // flex delimiter should not allow a comma without a space after it.
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("Sunday,1992/6/24");
  }, VALUE_ERROR);
  // Leap day on non-leap years
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2005/2/29");
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2001/2/29");
  }, VALUE_ERROR);
  // Out of range day for any month
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2005/1/44");
  }, VALUE_ERROR);
  // timestamp test
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24 10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24 10:10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24 10:10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24 10:10:10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24 10:10:10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24  10  am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24 10: 10 "), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24 10: 10 pm"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24 10: 10: 10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992-6-24  10: 10: 10    am   "), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/24 00am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1992/06/24 01am "), 33779);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/01 02pm"), 36161);
  assertEquals(TypeConverter.stringToDateNumber("2222/1/01 03pm"), 117610);
  assertEquals(TypeConverter.stringToDateNumber("1902/9/02 12pm"), 976);
  assertEquals(TypeConverter.stringToDateNumber("1902/9/2 12pm"), 976);
  assertEquals(TypeConverter.stringToDateNumber("4243/11/3 12pm   "), 856071);
  assertEquals(TypeConverter.stringToDateNumber("  1992/04/19   12pm   "), 33713);
  assertEquals(TypeConverter.stringToDateNumber("1992/5/20 01am"), 33744);
  assertEquals(TypeConverter.stringToDateNumber("1992/6/21  3pm"), 33776);
  assertEquals(TypeConverter.stringToDateNumber("1992/9/29 3pm"), 33876);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/24 3pm"), 33627);
  assertEquals(TypeConverter.stringToDateNumber("1992/12/21 3pm"), 33959);
  assertEquals(TypeConverter.stringToDateNumber("1992/01/31 3pm"), 33634);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 3pm"), 33616);
  assertEquals(TypeConverter.stringToDateNumber("2004/2/29 3pm"), 38046);
  assertEquals(TypeConverter.stringToDateNumber("2004/2/28  3pm "), 38045);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/13 3pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("1999/01/13 3pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("0999/01/13 3pm"), -329069);
  assertEquals(TypeConverter.stringToDateNumber("1200/01/13 3pm"), -255656);
  assertEquals(TypeConverter.stringToDateNumber("0029/01/13 3pm"), 47131);
  assertEquals(TypeConverter.stringToDateNumber("0030/01/13 3pm"), 10971);
  assertEquals(TypeConverter.stringToDateNumber("0044/01/13 3pm"), 16084);
  assertEquals(TypeConverter.stringToDateNumber("0050/01/13 3pm"), 18276);
  assertEquals(TypeConverter.stringToDateNumber("0097/01/13 00pm"), 35443);
  assertEquals(TypeConverter.stringToDateNumber("0099/01/13 3pm"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("0000/01/13 3pm"), 36538);
  assertEquals(TypeConverter.stringToDateNumber("0101/01/13 3pm"), -657057);
  assertEquals(TypeConverter.stringToDateNumber("0100/01/13 3pm"), -657422);
  assertEquals(TypeConverter.stringToDateNumber("100/12/31 3pm"), -657070);
  assertEquals(TypeConverter.stringToDateNumber("122/11/10 3pm"), -649086);
  assertEquals(TypeConverter.stringToDateNumber("2222/1/22 3pm"), 117631);
  assertEquals(TypeConverter.stringToDateNumber("222/1/22 3pm"), -612854);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2005/2/29 000pm");// Too many digits
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2001/2/2 13pm");// Hour out of range
  }, VALUE_ERROR);
  // DAY_MONTHNAME_YEAR, DD(fd)Month(fd)YYYY ===========================================================================
  assertEquals(TypeConverter.stringToDateNumber("Sun 09 Feb 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Sun 9 Feb 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Mon 09 Feb 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Thursday 09 Feb 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Thursday 09 February 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Sun 01 September 20"), 44075);
  assertEquals(TypeConverter.stringToDateNumber("Sun, 09, Feb, 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("20 May 1992"), 33744);
  assertEquals(TypeConverter.stringToDateNumber("31 December 100"), -657070);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0030"), 10971);
  assertEquals(TypeConverter.stringToDateNumber("13 January 1200"), -255656);
  assertEquals(TypeConverter.stringToDateNumber("22 January 2222"), 117631);
  assertEquals(TypeConverter.stringToDateNumber("3 November 4243"), 856071);
  assertEquals(TypeConverter.stringToDateNumber("13 November 0999"), -328765);
  assertEquals(TypeConverter.stringToDateNumber("13 November 1200"), -255351);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0029"), 47131);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0030"), 10971);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0044"), 16084);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0050"), 18276);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0097"), 35443);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0099"), 36173);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0000"), 36538);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0101"), -657057);
  assertEquals(TypeConverter.stringToDateNumber("13 January 0100"), -657422);
  assertEquals(TypeConverter.stringToDateNumber("01 Jan 2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01 Feb 2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("01 Mar 2017"), 42795);
  assertEquals(TypeConverter.stringToDateNumber("01 Apr 2017"), 42826);
  assertEquals(TypeConverter.stringToDateNumber("01 May 2017"), 42856);
  assertEquals(TypeConverter.stringToDateNumber("01 Jun 2017"), 42887);
  assertEquals(TypeConverter.stringToDateNumber("01 Jul 2017"), 42917);
  assertEquals(TypeConverter.stringToDateNumber("01 Aug 2017"), 42948);
  assertEquals(TypeConverter.stringToDateNumber("01 Sep 2017"), 42979);
  assertEquals(TypeConverter.stringToDateNumber("01 Oct 2017"), 43009);
  assertEquals(TypeConverter.stringToDateNumber("01 Nov 2017"), 43040);
  assertEquals(TypeConverter.stringToDateNumber(" 1 Dec 2017"), 43070);
  assertEquals(TypeConverter.stringToDateNumber("20 Jan 2015"), 42024);
  assertEquals(TypeConverter.stringToDateNumber("20 Feb 2015"), 42055);
  assertEquals(TypeConverter.stringToDateNumber("20 Mar 2015"), 42083);
  assertEquals(TypeConverter.stringToDateNumber("20 Apr 2015"), 42114);
  assertEquals(TypeConverter.stringToDateNumber("20 May 2015"), 42144);
  assertEquals(TypeConverter.stringToDateNumber("20 Jun 2015"), 42175);
  assertEquals(TypeConverter.stringToDateNumber("20 Jul 2015"), 42205);
  assertEquals(TypeConverter.stringToDateNumber("20 Aug 2015"), 42236);
  assertEquals(TypeConverter.stringToDateNumber("20 Sep 2015"), 42267);
  assertEquals(TypeConverter.stringToDateNumber("20 Oct 2015"), 42297);
  assertEquals(TypeConverter.stringToDateNumber("20 Nov 2015"), 42328);
  assertEquals(TypeConverter.stringToDateNumber("20 Dec 2015"), 42358);
  assertEquals(TypeConverter.stringToDateNumber("29 Feb 2004"), 38046); // leap year, 29th ok
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("29 Feb 2001");// not leap year, 29th not ok
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("32 June 2001");// overload numbers not ok
  }, VALUE_ERROR);
  // delimiter tests
  assertEquals(TypeConverter.stringToDateNumber("Sun, 09, Feb, 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Sun, 09/Feb/2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("09/Feb/2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("09-Feb-2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("09.Feb.2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("09 Feb/2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("09 . Feb . 2017"), 42775);
  // If the delimiters don't match the first one should be a space.
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("09.Feb/2017");
  }, VALUE_ERROR);
  // Comma delimiters should be followed by spaces.
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("09,Feb,2017");
  }, VALUE_ERROR);
  // timestamp tests
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992 10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992 10:10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992 10:10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992 10:10:10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992 10:10:10am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992  10  am"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992 10: 10 "), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992 10: 10 pm"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992 10: 10: 10"), 33779);
  assertEquals(TypeConverter.stringToDateNumber("24/June/1992  10: 10: 10    am   "), 33779);
  // MONTHNAME_DAY_YEAR, Month(fd)DD(fd)YYYY, 'Aug 19 2020' ============================================================
  assertEquals(TypeConverter.stringToDateNumber("Sun Feb 09 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Sun Feb 9 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Mon Feb 09 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Thursday Feb 09 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Thursday February 09 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("Sun September 01 20"), 44075);
  assertEquals(TypeConverter.stringToDateNumber("Sun, Feb, 09, 2017"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("May 20 1992"), 33744);
  assertEquals(TypeConverter.stringToDateNumber("December 31 100"), -657070);
  assertEquals(TypeConverter.stringToDateNumber("January 13 0030"), 10971);
  assertEquals(TypeConverter.stringToDateNumber("January 13 1200"), -255656);
  assertEquals(TypeConverter.stringToDateNumber("January 22 2222"), 117631);
  assertEquals(TypeConverter.stringToDateNumber("November 3 4243"), 856071);
  assertEquals(TypeConverter.stringToDateNumber("Feb 29 2004"), 38046); // leap year, 29th ok
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("Feb 29 2001");// not leap year, 29th not ok
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("June 32 2001");// overload numbers not ok
  }, VALUE_ERROR);
  // YEAR_MONTHDIG, YYYY(fd)MM, '1992/06' ==============================================================================
  assertEquals(TypeConverter.stringToDateNumber("2017/01"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017/02"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("2017/03"), 42795);
  assertEquals(TypeConverter.stringToDateNumber("2017/04"), 42826);
  assertEquals(TypeConverter.stringToDateNumber("2017/05"), 42856);
  assertEquals(TypeConverter.stringToDateNumber("2017/06"), 42887);
  assertEquals(TypeConverter.stringToDateNumber("2017/07"), 42917);
  assertEquals(TypeConverter.stringToDateNumber("2017/08"), 42948);
  assertEquals(TypeConverter.stringToDateNumber("2017/09"), 42979);
  assertEquals(TypeConverter.stringToDateNumber("2017/10"), 43009);
  assertEquals(TypeConverter.stringToDateNumber("2017/11"), 43040);
  assertEquals(TypeConverter.stringToDateNumber("2017/12"), 43070);
  assertEquals(TypeConverter.stringToDateNumber("2017/01"), 42736);
  // delimiter tests
  assertEquals(TypeConverter.stringToDateNumber("Thursday 2017/01"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("Thursday, 2017/01"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017/01"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017. 01"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017 01"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017, 01"), 42736);
  // Comma and period delimiters should be followed by spaces.
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2017,01");
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2017.01");
  }, VALUE_ERROR);
  // timestamp test
  assertEquals(TypeConverter.stringToDateNumber("2017-01 10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01 10:10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01 10:10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01 10:10:10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01 10:10:10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01  10  am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01 10: 10 "), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01 10: 10 pm"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01 10: 10: 10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-01  10: 10: 10    am   "), 42736);
  // MONTHDIG_YEAR, MM(fd)YYYY, '06/1992' ================================================================================
  assertEquals(TypeConverter.stringToDateNumber("01/2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("02/2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("03/2017"), 42795);
  assertEquals(TypeConverter.stringToDateNumber("04/2017"), 42826);
  assertEquals(TypeConverter.stringToDateNumber("05/2017"), 42856);
  assertEquals(TypeConverter.stringToDateNumber("06/2017"), 42887);
  assertEquals(TypeConverter.stringToDateNumber("07/2017"), 42917);
  assertEquals(TypeConverter.stringToDateNumber("08/2017"), 42948);
  assertEquals(TypeConverter.stringToDateNumber("09/2017"), 42979);
  assertEquals(TypeConverter.stringToDateNumber("10/2017"), 43009);
  assertEquals(TypeConverter.stringToDateNumber("11/2017"), 43040);
  assertEquals(TypeConverter.stringToDateNumber("12/2017"), 43070);
  // delimiter tests
  assertEquals(TypeConverter.stringToDateNumber("Thursday 01/2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("Thursday, 01/2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("1/2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01. 2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01, 2017"), 42736);
  // Comma, period delimiters should be followed by spaces.
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("01,2017");
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("01.2017");
  }, VALUE_ERROR);
  // 0 is not a month
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("0/2017");
  }, VALUE_ERROR);
  // timestamp test
  assertEquals(TypeConverter.stringToDateNumber("01-2017 10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017 10:10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017 10:10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017 10:10:10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017 10:10:10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017  10  am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017 10: 10 "), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017 10: 10 pm"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017 10: 10: 10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01-2017  10: 10: 10    am   "), 42736);
  // YEAR_MONTHNAME, YYYY(fd)Month, '1992/Aug' =========================================================================
  assertEquals(TypeConverter.stringToDateNumber("2017 January"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017 February"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("2017 March"), 42795);
  assertEquals(TypeConverter.stringToDateNumber("2017 April"), 42826);
  assertEquals(TypeConverter.stringToDateNumber("2017 May"), 42856);
  assertEquals(TypeConverter.stringToDateNumber("2017 June"), 42887);
  assertEquals(TypeConverter.stringToDateNumber("2017 July"), 42917);
  assertEquals(TypeConverter.stringToDateNumber("2017 August"), 42948);
  assertEquals(TypeConverter.stringToDateNumber("2017 September"), 42979);
  assertEquals(TypeConverter.stringToDateNumber("2017 October"), 43009);
  assertEquals(TypeConverter.stringToDateNumber("2017 November"), 43040);
  assertEquals(TypeConverter.stringToDateNumber("2017 December"), 43070);
  // delimiter tests
  assertEquals(TypeConverter.stringToDateNumber("Thursday 2017 January"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("Thursday, 2017 January"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017/January"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017. January"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017, January"), 42736);
  // Comma delimiters should be followed by spaces.
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2017,January");
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("2017.January");
  }, VALUE_ERROR);
  // timestamp test
  assertEquals(TypeConverter.stringToDateNumber("2017-January 10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January 10:10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January 10:10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January 10:10:10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January 10:10:10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January  10  am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January 10: 10 "), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January 10: 10 pm"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January 10: 10: 10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("2017-January  10: 10: 10    am   "), 42736);
  // MONTHNAME_YEAR, Month(fd)YYYY, 'Aug 1992' =========================================================================
  assertEquals(TypeConverter.stringToDateNumber("January 2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("February 2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("March 2017"), 42795);
  assertEquals(TypeConverter.stringToDateNumber("April 2017"), 42826);
  assertEquals(TypeConverter.stringToDateNumber("May 2017"), 42856);
  assertEquals(TypeConverter.stringToDateNumber("June 2017"), 42887);
  assertEquals(TypeConverter.stringToDateNumber("July 2017"), 42917);
  assertEquals(TypeConverter.stringToDateNumber("August 2017"), 42948);
  assertEquals(TypeConverter.stringToDateNumber("September 2017"), 42979);
  assertEquals(TypeConverter.stringToDateNumber("October 2017"), 43009);
  assertEquals(TypeConverter.stringToDateNumber("November 2017"), 43040);
  assertEquals(TypeConverter.stringToDateNumber("December 2017"), 43070);
  assertEquals(TypeConverter.stringToDateNumber("  Feb    2017  "), 42767);
  assertEquals(TypeConverter.stringToDateNumber("Feb-2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("Feb. 2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("Feb/2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("Feb    .    2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("Feb -      2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("January 0030"), 10959);
  assertEquals(TypeConverter.stringToDateNumber("November 4243"), 856069);
  assertEquals(TypeConverter.stringToDateNumber("December 0100"), -657100);
  assertEquals(TypeConverter.stringToDateNumber("Jan 2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("Feb 2017"), 42767);
  assertEquals(TypeConverter.stringToDateNumber("Mar 2017"), 42795);
  assertEquals(TypeConverter.stringToDateNumber("Apr 2017"), 42826);
  assertEquals(TypeConverter.stringToDateNumber("May 2017"), 42856);
  assertEquals(TypeConverter.stringToDateNumber("Jun 2017"), 42887);
  assertEquals(TypeConverter.stringToDateNumber("Jul 2017"), 42917);
  assertEquals(TypeConverter.stringToDateNumber("Aug 2017"), 42948);
  assertEquals(TypeConverter.stringToDateNumber("Sep 2017"), 42979);
  assertEquals(TypeConverter.stringToDateNumber("Oct 2017"), 43009);
  assertEquals(TypeConverter.stringToDateNumber("Nov 2017"), 43040);
  assertEquals(TypeConverter.stringToDateNumber("Dec 2017"), 43070);
  assertEquals(TypeConverter.stringToDateNumber("Feb, 2017"), 42767);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("December 100");// need 4 digits
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("Dec.20");// need space after if using period
  }, VALUE_ERROR);
  // delimiter tests
  assertEquals(TypeConverter.stringToDateNumber("Thursday January 2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("Thursday, January 2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January/2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January. 2017"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January, 2017"), 42736);
  // Comma, period delimiters should be followed by spaces.
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("January,2017");
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("January.2017");
  }, VALUE_ERROR);
  // timestamp test
  assertEquals(TypeConverter.stringToDateNumber("January-2017 10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017 10:10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017 10:10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017 10:10:10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017 10:10:10am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017  10  am"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017 10: 10 "), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017 10: 10 pm"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017 10: 10: 10"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2017  10: 10: 10    am  "), 42736);
  assertEquals(TypeConverter.stringToDateNumber("January-2000 100000000:100000000:100000000"), 4273794);
  assertEquals(TypeConverter.stringToDateNumber("1999/1/01 00200000000:00000999999999:00000923231312"), 9074624);
  assertEquals(TypeConverter.stringToDateNumber("1992/1/13 12:00001989198298am"), 1415003);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("1992/1/13 12:000019891982980am");
  }, VALUE_ERROR);
  catchAndAssertEquals(function() {
    TypeConverter.stringToDateNumber("January-2000 100000000:100000000:1001000000");
  }, VALUE_ERROR);
  // MONTHDIG_DAYDIG, MM(fd)DD, '09/01' =========================================================================
  lockDate(2017, 9, 24, 10, 55, 23);
  assertEquals(TypeConverter.stringToDateNumber("01/09"), 42744);
  assertEquals(TypeConverter.stringToDateNumber("02/09"), 42775);
  assertEquals(TypeConverter.stringToDateNumber("03/09"), 42803);
  assertEquals(TypeConverter.stringToDateNumber("04/09"), 42834);
  assertEquals(TypeConverter.stringToDateNumber("05/09"), 42864);
  assertEquals(TypeConverter.stringToDateNumber("06/09"), 42895);
  assertEquals(TypeConverter.stringToDateNumber("07/09"), 42925);
  assertEquals(TypeConverter.stringToDateNumber("08/09"), 42956);
  assertEquals(TypeConverter.stringToDateNumber("09/09"), 42987);
  assertEquals(TypeConverter.stringToDateNumber("10/09"), 43017);
  assertEquals(TypeConverter.stringToDateNumber("11/09"), 43048);
  assertEquals(TypeConverter.stringToDateNumber("12/09"), 43078);
  assertEquals(TypeConverter.stringToDateNumber("01/01"), 42736);
  assertEquals(TypeConverter.stringToDateNumber("01/02"), 42737);
  assertEquals(TypeConverter.stringToDateNumber("01/03"), 42738);
  assertEquals(TypeConverter.stringToDateNumber("01/04"), 42739);
  assertEquals(TypeConverter.stringToDateNumber("01/05"), 42740);
  assertEquals(TypeConverter.stringToDateNumber("01/29"), 42764);
  assertEquals(TypeConverter.stringToDateNumber("01/30"), 42765);
  assertEquals(TypeConverter.stringToDateNumber("01/31"), 42766);
  assertEquals(TypeConverter.stringToDateNumber("01/09 10:10:10am"), 42744);
  assertEquals(TypeConverter.stringToDateNumber("01/09 10:10:100000"), 42745);
  assertEquals(TypeConverter.stringToDateNumber("08/09 10:10:100000"), 42957);
  assertEquals(TypeConverter.stringToDateNumber("01/02 10am"), 42737);
  assertEquals(TypeConverter.stringToDateNumber("01/02 10:10"), 42737);
  assertEquals(TypeConverter.stringToDateNumber("01/02 10:10am"), 42737);
  assertEquals(TypeConverter.stringToDateNumber("01/02 10:10:10"), 42737);
  assertEquals(TypeConverter.stringToDateNumber("01/02 10:10:10am"), 42737);
  assertEquals(TypeConverter.stringToDateNumber("01/02   10  am"), 42737);
  assertEquals(TypeConverter.stringToDateNumber("01/02  10: 10: 10    am  "), 42737);
});


test("TypeConverter.stringToTimeNumber", function () {
  assertEquals(TypeConverter.stringToTimeNumber("12:00pm"), 0.5);
  assertEquals(TypeConverter.stringToTimeNumber("12:00"), 0.5);
  assertEquals(TypeConverter.stringToTimeNumber("12pm"), 0.5);
  assertEquals(TypeConverter.stringToTimeNumber("10:10am"), 0.4236111111111111);
  assertEquals(TypeConverter.stringToTimeNumber("10:10:10am"), 0.4237268518518518);
  assertEquals(TypeConverter.stringToTimeNumber("22:10:10"), 0.9237268518518519);
  assertEquals(TypeConverter.stringToTimeNumber("1:10:10"), 0.048726851851851855);
  assertEquals(TypeConverter.stringToTimeNumber("25:10:10"), 0.048726851851851855);
});