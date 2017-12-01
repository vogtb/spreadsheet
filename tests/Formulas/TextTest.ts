import {
  ARABIC,
  CHAR,
  CODE,
  CONCATENATE,
  SPLIT,
  CONVERT,
  TRIM,
  LOWER,
  UPPER,
  T,
  ROMAN,
  TEXT,
  FIND,
  JOIN,
  LEN,
  LEFT,
  RIGHT,
  SEARCH,
  REPT,
  VALUE,
  CLEAN,
  MID,
  PROPER,
  REPLACE,
  SUBSTITUTE
} from "../../src/Formulas/Text";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  assertArrayEquals,
  catchAndAssertEquals,
  test,
  lockDate
} from "../Utils/Asserts";


test("SPLIT", function(){
  assertArrayEquals(SPLIT("1,2,3", ","), ['1', '2', '3']);
  assertArrayEquals(SPLIT("little kitty cat", "i"), ['l', 'ttle k', 'tty cat']);
  assertArrayEquals(SPLIT("father sister berzerker", "er", true), ['fath', ' sist', ' b', 'z', 'k']);
  assertArrayEquals(SPLIT("father sister berzerker", "er", [true]), ['fath', ' sist', ' b', 'z', 'k']);
  assertArrayEquals(SPLIT("father  sister   berzerker", "er", true), ['fath', '  sist', '   b', 'z', 'k']);
  assertArrayEquals(SPLIT(["father sister berzerker"], ["er"], true), ['fath', ' sist', ' b', 'z', 'k']);
  catchAndAssertEquals(function() {
    SPLIT([], "er");
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    SPLIT.apply(this, ["er", "er", true, 10]);
  }, ERRORS.NA_ERROR);
});


test("CHAR", function(){
  assertEquals(CHAR(97), "a");
  assertEquals(CHAR("97"), "a");
  assertEquals(CHAR([97, "m"]), "a");
  assertEquals(CHAR([[97], "m"]), "a");
  catchAndAssertEquals(function() {
    CHAR([[], [97], "m"]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    CHAR(false);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CHAR(10000000);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CHAR(0);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function() {
    CHAR.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("CODE", function(){
  assertEquals(CODE('a'), 97);
  assertEquals(CODE('aa'), 97);
  assertEquals(CODE('aM'), 97);
  assertEquals(CODE('#'), 35);
  assertEquals(CODE(false), 70);
  assertEquals(CODE(true), 84);
  assertEquals(CODE(['a']), 97);
  assertEquals(CODE([['a'], 'p']), 97);
  catchAndAssertEquals(function() {
    CODE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CODE.apply(this, ["a", "m"]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CODE("");
  }, ERRORS.VALUE_ERROR);

});


test("CONCATENATE", function(){
  assertEquals(CONCATENATE("hey", " ", "there"), "hey there");
  assertEquals(CONCATENATE(["hey", " ", "there"]), "hey there");
  assertEquals(CONCATENATE("hey"), "hey");
  assertEquals(CONCATENATE("hey", 2), "hey2");
  assertEquals(CONCATENATE("hey", false), "heyFALSE");
  assertEquals(CONCATENATE([22, 14, "m", false]), "2214mFALSE");
  assertEquals(CONCATENATE([22, 14, ["m", false]]), "2214mFALSE");
  catchAndAssertEquals(function() {
    CONCATENATE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CONCATENATE("10", 4, false, []);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    CONCATENATE([]);
  }, ERRORS.REF_ERROR);
});


test("CONVERT", function(){
  assertEquals(CONVERT(5.1, "mm", "m"), 0.0050999999999999995);
  assertEquals(CONVERT(5.1, "mm", "km"), 0.0000050999999999999995);
  assertEquals(CONVERT(5.1, "g", "kg"), 0.0050999999999999995);
  assertEquals(CONVERT(35.7, "in^2", "m^2"), 0.023032212);
  assertEquals(CONVERT(100, "ft3", "in3"), 172800);
  assertEquals(CONVERT(100, "in3", "ft3"), 0.057870370370370364);
  assertEquals(CONVERT(0.0001, "ly", "ft"), 3103914197040.945);
  assertEquals(CONVERT(44, "m/h", "m/s"), 0.01222222222222232);
  assertEquals(CONVERT(10, "mph", "m/s"), 4.4704);
  assertEquals(CONVERT(10, "mmHg", "Pa"), 1333.22);
  assertEquals(CONVERT(10, "PS", "W"), 7354.987499999999);
  assertEquals(CONVERT(10, "ton", "stone"), 1428.5714285714287);
  assertEquals(CONVERT(10, "tspm", "bushel"), 0.0014188796696394089);
  assertEquals(CONVERT(10, "c", "Wh"), 0.011622222222222223);
  catchAndAssertEquals(function() {
    CONVERT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CONVERT.apply(this, [5.1, "mm", "m", 10]);
  }, ERRORS.NA_ERROR);
});


test("ARABIC", function(){
  assertEquals(ARABIC("XIV"), 14);
  assertEquals(ARABIC("M"), 1000);
  assertEquals(ARABIC("-IV"), -4);
  catchAndAssertEquals(function() {
    ARABIC("b");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    ARABIC(false);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    ARABIC(10);
  }, ERRORS.VALUE_ERROR);
});


test("TRIM", function(){
  assertEquals(TRIM(" test  "), "test");
  assertEquals(TRIM(5), "5");
  assertEquals(TRIM(false), "FALSE");
  catchAndAssertEquals(function() {
    TRIM.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TRIM.apply(this, ["test", 5]);
  }, ERRORS.NA_ERROR);
});


test("LOWER", function(){
  assertEquals(LOWER("TEST"), "test");
  assertEquals(LOWER(5), "5");
  assertEquals(LOWER(false), "false");
  catchAndAssertEquals(function() {
    LOWER.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LOWER.apply(this, ["test", 5]);
  }, ERRORS.NA_ERROR);
});


test("UPPER", function(){
  assertEquals(UPPER("test"), "TEST");
  assertEquals(UPPER(5), "5");
  assertEquals(UPPER(false), "FALSE");
  catchAndAssertEquals(function() {
    UPPER.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    UPPER.apply(this, ["test", 5]);
  }, ERRORS.NA_ERROR);
});


test("T", function(){
  assertEquals(T("test"), "test");
  assertEquals(T(["test"]), "test");
  assertEquals(T(5), "");
  assertEquals(T(false), "");
  catchAndAssertEquals(function() {
    T.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ROMAN", function(){
  assertEquals(ROMAN(419), "CDXIX");
  assertEquals(ROMAN(1), "I");
  assertEquals(ROMAN(3999), "MMMCMXCIX");
  assertEquals(ROMAN(300), "CCC");
  catchAndAssertEquals(function() {
    ROMAN(0);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    ROMAN.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("TEXT", function(){
  lockDate(2012, 1, 9, 10, 22, 33);
  assertEquals(TEXT("01/09/2012 10:22:33AM", "dd mm yyyy"), "09 01 2012");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "dddd dd mm yyyy"), "Monday 09 01 2012");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "dddd"), "Monday");
  assertEquals(TEXT("01/10/2012 10:22:33AM", "dddd"), "Tuesday");
  assertEquals(TEXT("01/11/2012 10:22:33AM", "dddd"), "Wednesday");
  assertEquals(TEXT("01/12/2012 10:22:33AM", "dddd"), "Thursday");
  assertEquals(TEXT("01/13/2012 10:22:33AM", "dddd"), "Friday");
  assertEquals(TEXT("01/14/2012 10:22:33AM", "dddd"), "Saturday");
  assertEquals(TEXT("01/15/2012 10:22:33AM", "dddd"), "Sunday");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "dDDd"), "Monday");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "ddd"), "Mon");
  assertEquals(TEXT("01/10/2012 10:22:33AM", "ddd"), "Tue");
  assertEquals(TEXT("01/11/2012 10:22:33AM", "ddd"), "Wed");
  assertEquals(TEXT("01/12/2012 10:22:33AM", "ddd"), "Thu");
  assertEquals(TEXT("01/13/2012 10:22:33AM", "ddd"), "Fri");
  assertEquals(TEXT("01/14/2012 10:22:33AM", "ddd"), "Sat");
  assertEquals(TEXT("01/15/2012 10:22:33AM", "ddd"), "Sun");
  assertEquals(TEXT("01/15/2012 10:22:33AM", "DDD"), "Sun");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "dd"), "09");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "DD"), "09");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "d"), "1");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "D"), "1");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "mmmmm"), "J");
  assertEquals(TEXT("02/09/2012 10:22:33AM", "mmmmm"), "F");
  assertEquals(TEXT("02/09/2012 10:22:33AM", "MMMMM"), "F");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "mmmm"), "January");
  assertEquals(TEXT("02/09/2012 10:22:33AM", "mmmm"), "February");
  assertEquals(TEXT("02/09/2012 10:22:33AM", "MMMM"), "February");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "mmm"), "Jan");
  assertEquals(TEXT("02/09/2012 10:22:33AM", "mmm"), "Feb");
  assertEquals(TEXT("02/09/2012 10:22:33AM", "MMM"), "Feb");
  assertEquals(TEXT("01/09/2012 10:22:33AM", "mm"), "01");
  assertEquals(TEXT("02/09/2012 10:22:33AM", "mm"), "02");
  assertEquals(TEXT("02/09/2012 10:22:33AM", "MM"), "02");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "HH mm"), "10 04");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "HH m"), "10 4");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "hh m"), "10 4");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "m"), "1");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "yyyy"), "2012");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "YYYY"), "2012");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "yy"), "12");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "YY"), "12");
  assertEquals(TEXT("01/09/1912 10:04:33AM", "yy"), "12");
  assertEquals(TEXT("01/09/2012 10:04:33PM", "HH"), "22");
  assertEquals(TEXT("01/09/2012 10:04:33PM", "hh"), "10");
  // TODO: This will be fixed as soon as we allow sub-second date-string parsing in TypeConverter.
  // assertEquals(TEXT("01/09/2012 10:04:33.123", "ss.000"), "33.123");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "ss"), "33");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "AM/PM"), "AM");
  assertEquals(TEXT("01/09/2012 10:04:33PM", "AM/PM"), "PM");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "A/P"), "A");
  assertEquals(TEXT("01/09/2012 10:04:33PM", "A/P"), "P");
  assertEquals(TEXT("01/09/2012 10:04:33AM", "mmmm-dd-yyyy, hh:mm A/P"), "January-09-2012, 10:04 A");
  assertEquals(TEXT("01/09/2012 10:04:33PM", "mmmm-dd-yyyy, HH:mm A/P"), "January-09-2012, 22:04 P");
  assertEquals(TEXT(44564.111, "dd mm yyyy HH:mm:ss"), "03 01 2022 02:39:50");
  assertEquals(TEXT(44564.111, "dd mmmm yyyy HH:mm:ss"), "03 January 2022 02:39:50");
  assertEquals(TEXT(44564, "dd mmmm yyyy HH:mm:ss"), "03 January 2022 00:00:00");
  assertEquals(TEXT(64, "dd mmmm yyyy HH:mm:ss"), "04 March 1900 00:00:00");
  assertEquals(TEXT(false, "dd mmmm yyyy HH:mm:ss"), "FALSE");
  assertEquals(TEXT(true, "dd mmmm yyyy HH:mm:ss"), "TRUE");
  assertEquals(TEXT(-164, "dd mmmm yyyy HH:mm:ss"), "19 July 1899 00:00:00");
  // "##.##" formatting
  assertEquals(TEXT(12.3, "###.##"), "12.3");
  assertEquals(TEXT(12.3333, "###.##"), "12.33");
  assertEquals(TEXT(0.001, "#.###############"), "0.001");
  assertEquals(TEXT(0, "#.#"), ".");
  assertEquals(TEXT(0.99, "#"), "1");
  assertEquals(TEXT(0, "$#.#"), "$.");
  assertEquals(TEXT(1231213131.32232, "######,###.#"), "1,231,213,131.3");
  assertEquals(TEXT(123333333333, "######,###.#"), "123,333,333,333");
  assertEquals(TEXT(1224324333.36543, ",###.#"), "1,224,324,333.4");
  assertEquals(TEXT(-12.3, "###.##"), "-12.3");
  assertEquals(TEXT(-12.3333, "###.##"), "-12.33");
  assertEquals(TEXT(-0.001, "#.###############"), "-0.001");
  assertEquals(TEXT(-1231213131.32232, "######,###.#"), "-1,231,213,131.3");
  assertEquals(TEXT(-123333333333, "######,###.#"), "-123,333,333,333");
  assertEquals(TEXT(-1224324333.36543, ",###.#"), "-1,224,324,333.4");
  assertEquals(TEXT(12.3, "$###.##"), "$12.3");
  assertEquals(TEXT(12.3, "%###.##"), "%12.3");
  assertEquals(TEXT(12.3, "$+-+%###.##$+-+"), "$+-+%12.3$+-+");
  // "00.00" formatting
  assertEquals(TEXT(12.3, "00"), "12");
  assertEquals(TEXT(12.9, "00"), "13");
  assertEquals(TEXT(12.3, "00.0"), "12.3");
  assertEquals(TEXT(12.3, "000.0"), "012.3");
  assertEquals(TEXT(12.3, "000.00"), "012.30");
  assertEquals(TEXT(-12.3, "00"), "-12");
  assertEquals(TEXT(-12.9, "00"), "-13");
  assertEquals(TEXT(-12.3, "00.0"), "-12.3");
  assertEquals(TEXT(-12.3, "000.0"), "-012.3");
  assertEquals(TEXT(-12.3, "000.00"), "-012.30");
  assertEquals(TEXT(-12.3, "+-$%000.0"), "-+-$%012.3");
  assertEquals(TEXT(-12.3, "+-$%00.0"), "-+-$%12.3");
  assertEquals(TEXT(-12.3, "+-$%00.0+-$"), "-+-$%12.3+-$");
  assertEquals(TEXT(12.3, "000000000000000.0000000000000"), "000000000000012.3000000000000");
  assertEquals(TEXT(12.33, "000000000000000.0000000000000"), "000000000000012.3300000000000");
  assertEquals(TEXT(12.33555, "000000000000000.0000000000000"), "000000000000012.3355500000000");
  assertEquals(TEXT(12.33555, "000000000000000.0000"), "000000000000012.3356");
  assertEquals(TEXT(12.3, "+-$%000.0"), "+-$%012.3");
  assertEquals(TEXT(12.3, "+-$%00.0"), "+-$%12.3");
  assertEquals(TEXT(12.3, "+-$%00.0+-$"), "+-$%12.3+-$");
  assertEquals(TEXT(12, "0,000.0"), "0,012.0");
  assertEquals(TEXT(123342424, "0000000,000.0"), "0,123,342,424.0");
  assertEquals(TEXT(0.01, "00.0"), "00.0");
  assertEquals(TEXT(0.01, "00.0"), "00.0");
  assertEquals(TEXT(0.01, "00.0"), "00.0");
  assertEquals(TEXT(12, "00"), "12");
  assertEquals(TEXT(12.3, "00"), "12");
  assertEquals(TEXT(12, "00.00"), "12.00");
  assertEquals(TEXT(0.99, "0.00"), "0.99");
  assertEquals(TEXT(0.99, ".00"), ".99");
  assertEquals(TEXT(0.99, "00.00"), "00.99");
  assertEquals(TEXT(0.99, "0000.00"), "0000.99");
  assertEquals(TEXT(0.99, "0.0000"), "0.9900");
  assertEquals(TEXT(0.99, "0.0"), "1.0");
  assertEquals(TEXT(0.88, "0.0"), "0.9");
  assertEquals(TEXT(0.88, "00.0"), "00.9");
  assertEquals(TEXT(0.88, "00.00"), "00.88");
  assertEquals(TEXT(0.88, "00.000"), "00.880");
  assertEquals(TEXT(1.88, "00.000"), "01.880");
  assertEquals(TEXT(1.99, "00.0"), "02.0");
  assertEquals(TEXT(1234223.3324224, "0000000000.0"), "0001234223.3");
  assertEquals(TEXT(12, "%00%"), "%12%");
  assertEquals(TEXT(12.3, "00.0%"), "12.3%");
  assertEquals(TEXT(12.3, "$+-00.0$+-"), "$+-12.3$+-");
  assertEquals(TEXT(123456789, "0,0.0"), "123,456,789.0");
  assertEquals(TEXT(123456789.99, "0,0.0"), "123,456,790.0");
  assertEquals(TEXT(0.99, "0,000.00"), "0,000.99");
  assertEquals(TEXT(0.99, "0,000.0"), "0,001.0");
  catchAndAssertEquals(function() {
    TEXT(0.99, "0.00#");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    TEXT(0.99, "#0.00");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    TEXT.apply(this, [100]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    TEXT.apply(this, [100, "0", 10]);
  }, ERRORS.NA_ERROR);
});

test("FIND", function(){
  assertEquals(FIND("s", "soup", 1), 1);
  assertEquals(FIND("s", "soup"), 1);
  assertEquals(FIND("o", "soup"), 2);
  assertEquals(FIND("u", "soup"), 3);
  assertEquals(FIND("p", "soup"), 4);
  assertEquals(FIND("s", "soup soup", 5), 6);
  assertEquals(FIND("o", "soup soup", 5), 7);
  assertEquals(FIND("u", "soup soup", 5), 8);
  assertEquals(FIND("p", "soup soup", 5), 9);
  assertEquals(FIND("p", "soup soup", 4), 4);
  catchAndAssertEquals(function() {
    FIND("m", "soup", -1);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    FIND("m", "soup");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    FIND.apply(this, [2]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    FIND.apply(this, [2, 3, 4, 5])
  }, ERRORS.NA_ERROR);
});

test("JOIN", function(){
  assertEquals(JOIN(",", [1, 2, 3, 4, 5]), "1,2,3,4,5");
  assertEquals(JOIN(",", 1, 2, 3, 4, 5), "1,2,3,4,5");
  assertEquals(JOIN(",", 1, [2], [3, 4, 5]), "1,2,3,4,5");
  assertEquals(JOIN("", [1, 2, 3, 4, 5]), "12345");
  assertEquals(JOIN(true, [1, 2, 3, 4, 5]), "1TRUE2TRUE3TRUE4TRUE5");
  catchAndAssertEquals(function() {
    JOIN.apply(this, [2]);
  }, ERRORS.NA_ERROR);
});

test("LEN", function(){
  assertEquals(LEN("soup"), 4);
  assertEquals(LEN("jja sdkj lkasj lkajlskaj dlj lask"), 33);
  assertEquals(LEN(""), 0);
  assertEquals(LEN(4), 1);
  assertEquals(LEN(44), 2);
  assertEquals(LEN(true), 4);
  catchAndAssertEquals(function() {
    LEN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LEN.apply(this, [2, 4]);
  }, ERRORS.NA_ERROR);
});

test("LEFT", function(){
  assertEquals(LEFT("soup"), "s");
  assertEquals(LEFT("soup", 0), "");
  assertEquals(LEFT("soup", 1), "s");
  assertEquals(LEFT("soup", 2), "so");
  assertEquals(LEFT("soup", 3), "sou");
  assertEquals(LEFT("soup", 4), "soup");
  assertEquals(LEFT("soup", 5), "soup");
  assertEquals(LEFT("", 1000), "");
  catchAndAssertEquals(function() {
    LEFT("soup", -1);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    LEFT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    LEFT.apply(this, [1, 2, 3]);
  }, ERRORS.NA_ERROR);
});

test("RIGHT", function(){
  assertEquals(RIGHT("soup"), "p");
  assertEquals(RIGHT("soup", 0), "");
  assertEquals(RIGHT("soup", 1), "p");
  assertEquals(RIGHT("soup", 2), "up");
  assertEquals(RIGHT("soup", 3), "oup");
  assertEquals(RIGHT("soup", 4), "soup");
  assertEquals(RIGHT("soup", 5), "soup");
  assertEquals(RIGHT("", 1000), "");
  catchAndAssertEquals(function() {
    RIGHT("soup", -1);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    RIGHT.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    RIGHT.apply(this, [1, 2, 3]);
  }, ERRORS.NA_ERROR);
});

test("SEARCH", function(){
  assertEquals(SEARCH("soup", "where is the soup?"), 14);
  assertEquals(SEARCH("SOUP", "where is the soup?"), 14);
  assertEquals(SEARCH("soup", "where Is ThE sOUp?"), 14);
  assertEquals(SEARCH("soup", "soup?"), 1);
  assertEquals(SEARCH("oup", "soup?"), 2);
  assertEquals(SEARCH("soup", "soup, where is the soup?", 14), 20);
  catchAndAssertEquals(function() {
    SEARCH("beef", "soup?");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    SEARCH("beef", "beef", -10);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    SEARCH.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    SEARCH.apply(this, [1, 2, 3, 4]);
  }, ERRORS.NA_ERROR);
});

test("REPT", function(){
  assertEquals(REPT("s", 0), "");
  assertEquals(REPT("s", 1), "s");
  assertEquals(REPT("s", 10), "ssssssssss");
  catchAndAssertEquals(function() {
    REPT("s", -1);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    REPT.apply(this, [1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    REPT.apply(this, [1, 2, 3]);
  }, ERRORS.NA_ERROR);
});

test("VALUE", function(){
  assertEquals(VALUE("10"), 10);
  assertEquals(VALUE(10), 10);
  assertEquals(VALUE(10.1), 10.1);
  assertEquals(VALUE([10]), 10);
  assertEquals(VALUE("7/20/1966"), 24308);
  // TODO: Should pass once we're able to parse timestamp strings.
  // assertEquals(VALUE("12:00:00"), 0.5);
  catchAndAssertEquals(function() {
    VALUE(true);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    VALUE("str");
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function() {
    VALUE.apply(this, [1, 2]);
  }, ERRORS.NA_ERROR);
});

test("CLEAN", function(){
  assertEquals(CLEAN("hello"), "hello");
  assertEquals(CLEAN("hello¿Ãš"), "hello¿Ãš");
  assertEquals(CLEAN("hello"+CHAR(31)), "hello");
  assertEquals(CLEAN("hello\n"), "hello");
  assertEquals(CLEAN(10), "10");
  catchAndAssertEquals(function() {
    CLEAN.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    CLEAN.apply(this, [1, 2]);
  }, ERRORS.NA_ERROR);
});

test("MID", function(){
  assertEquals(MID("hey there", 5, 4), "ther");
  assertEquals(MID("hey there", 5, 1), "t");
  assertEquals(MID("hey there", 5, 0), "");
  assertEquals(MID("hey there", 50, 10), "");
  catchAndAssertEquals(function () {
    MID("", 1, -1);
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function () {
    MID("", 0, 1);
  }, ERRORS.NUM_ERROR);
  catchAndAssertEquals(function () {
    MID.apply(this, [1, 2, 3, 4]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function () {
    MID.apply(this, [1, 2]);
  }, ERRORS.NA_ERROR);
});

test("PROPER", function(){
  assertEquals(PROPER("hey there"), "Hey There");
  assertEquals(PROPER("hEY tHERE"), "Hey There");
  assertEquals(PROPER("there once was a man, and he lived on the moon."), "There Once Was A Man, And He Lived On The Moon.");
  assertEquals(PROPER("my name is h.s. thompson"), "My Name Is H.s. Thompson");
  assertEquals(PROPER(true), "True");
  assertEquals(PROPER(10), "10");
  catchAndAssertEquals(function () {
    PROPER.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function () {
    PROPER.apply(this, [1, 2]);
  }, ERRORS.NA_ERROR);
});

test("PROPER", function(){
  assertEquals(REPLACE("Hey there", 1, 3, "Hello"), "Hello there");
  assertEquals(REPLACE("Hey there", 2, 1, "Hello"), "HHelloy there");
  assertEquals(REPLACE("Hey there", 1, 1100, "Hello"), "Hello");
  assertEquals(REPLACE("Hey", 10, 11, "Hello"), "HeyHello");
  catchAndAssertEquals(function () {
    REPLACE.apply(this, ["Hey there", 1, 1]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function () {
    REPLACE.apply(this, ["Hey there", 1, 1, "replace me", "me too!"]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function () {
    REPLACE("Hey there", 0, 3, "Hello")
  }, ERRORS.VALUE_ERROR);
  catchAndAssertEquals(function () {
    REPLACE("Hey there", 1, -1, "Hello")
  }, ERRORS.VALUE_ERROR);
});

test("SUBSTITUTE", function(){
  assertEquals(SUBSTITUTE("Hey darkness my old friend", "Hey", "Hello"), "Hello darkness my old friend");
  assertEquals(SUBSTITUTE("Hey darkness my old friend... Hey.", "Hey", "Hello"), "Hello darkness my old friend... Hello.");
  assertEquals(SUBSTITUTE("Hey darkness my old friend... Hey.", "Hey", "Hello", 1), "Hello darkness my old friend... Hey.");
  catchAndAssertEquals(function () {
    SUBSTITUTE.apply(this, ["a", "b"]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function () {
    SUBSTITUTE.apply(this, ["a", "b", "c", 1, 2]);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function () {
    SUBSTITUTE("Hey there", "hey", "hello", -1);
  }, ERRORS.VALUE_ERROR);
});
