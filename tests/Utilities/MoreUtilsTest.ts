import {
  assertEquals,
  test
} from "../Utils/Asserts";
import {
  isDefined,
  isUndefined,
  NumberStringBuilder
} from "../../src/Utilities/MoreUtils";

test("MoreUtils.isDefined", function () {
  let und;
  assertEquals(isDefined(und), false);
  assertEquals(isDefined("10"), true);
  assertEquals(isDefined(10), true);
  assertEquals(isDefined(true), true);
  assertEquals(isDefined(false), true);
});

test("MoreUtils.isUndefined", function () {
  let und;
  assertEquals(isUndefined(und), true);
  assertEquals(isUndefined("10"), false);
  assertEquals(isUndefined(10), false);
  assertEquals(isUndefined(true), false);
  assertEquals(isUndefined(false), false);
});

test("MoreUtils.NumberStringBuilder", function () {
  assertEquals(NumberStringBuilder.start().number(12.3).integerZeros(2).decimalZeros(1).build(), "12.3");
  assertEquals(NumberStringBuilder.start().number(0.01).integerZeros(2).decimalZeros(1).build(), "00.0");
  assertEquals(NumberStringBuilder.start().number(12).integerZeros(2).decimalZeros(0).build(), "12");
  assertEquals(NumberStringBuilder.start().number(12.3).integerZeros(2).decimalZeros(0).build(), "12");
  assertEquals(NumberStringBuilder.start().number(12).integerZeros(2).decimalZeros(2).build(), "12.00");
  assertEquals(NumberStringBuilder.start().number(0.99).integerZeros(1).decimalZeros(2).build(), "0.99");
  assertEquals(NumberStringBuilder.start().number(0.99).integerZeros(2).decimalZeros(2).build(), "00.99");
  assertEquals(NumberStringBuilder.start().number(0.99).integerZeros(4).decimalZeros(2).build(), "0000.99");
  assertEquals(NumberStringBuilder.start().number(0.99).integerZeros(1).decimalZeros(4).build(), "0.9900");
  assertEquals(NumberStringBuilder.start().number(0.99).integerZeros(1).decimalZeros(1).build(), "1.0");
  assertEquals(NumberStringBuilder.start().number(0.88).integerZeros(1).decimalZeros(1).build(), "0.9");
  assertEquals(NumberStringBuilder.start().number(0.99).integerZeros(0).decimalZeros(2).build(), ".99");
  assertEquals(NumberStringBuilder.start().number(0.88).integerZeros(2).decimalZeros(1).build(), "00.9");
  assertEquals(NumberStringBuilder.start().number(0.88).integerZeros(2).decimalZeros(2).build(), "00.88");
  assertEquals(NumberStringBuilder.start().number(0.88).integerZeros(2).decimalZeros(3).build(), "00.880");
  assertEquals(NumberStringBuilder.start().number(1.88).integerZeros(2).decimalZeros(3).build(), "01.880");
  assertEquals(NumberStringBuilder.start().number(1.99).integerZeros(2).decimalZeros(1).build(), "02.0");

  assertEquals(NumberStringBuilder.start().number(-12.3).integerZeros(2).decimalZeros(1).build(), "-12.3");
  assertEquals(NumberStringBuilder.start().number(-0.01).integerZeros(2).decimalZeros(1).build(), "-00.0");
  assertEquals(NumberStringBuilder.start().number(-12).integerZeros(2).decimalZeros(0).build(), "-12");
  assertEquals(NumberStringBuilder.start().number(-12.3).integerZeros(2).decimalZeros(0).build(), "-12");
  assertEquals(NumberStringBuilder.start().number(-12).integerZeros(2).decimalZeros(2).build(), "-12.00");
  assertEquals(NumberStringBuilder.start().number(-0.99).integerZeros(1).decimalZeros(2).build(), "-0.99");
  assertEquals(NumberStringBuilder.start().number(-0.99).integerZeros(2).decimalZeros(2).build(), "-00.99");
  assertEquals(NumberStringBuilder.start().number(-0.99).integerZeros(4).decimalZeros(2).build(), "-0000.99");
  assertEquals(NumberStringBuilder.start().number(-0.99).integerZeros(1).decimalZeros(4).build(), "-0.9900");
  assertEquals(NumberStringBuilder.start().number(-0.99).integerZeros(1).decimalZeros(1).build(), "-1.0");
  assertEquals(NumberStringBuilder.start().number(-0.88).integerZeros(1).decimalZeros(1).build(), "-0.9");
  assertEquals(NumberStringBuilder.start().number(-0.99).integerZeros(0).decimalZeros(2).build(), "-.99");
  assertEquals(NumberStringBuilder.start().number(-0.88).integerZeros(2).decimalZeros(1).build(), "-00.9");
  assertEquals(NumberStringBuilder.start().number(-0.88).integerZeros(2).decimalZeros(2).build(), "-00.88");
  assertEquals(NumberStringBuilder.start().number(-0.88).integerZeros(2).decimalZeros(3).build(), "-00.880");
  assertEquals(NumberStringBuilder.start().number(-1.88).integerZeros(2).decimalZeros(3).build(), "-01.880");
  assertEquals(NumberStringBuilder.start().number(-1.99).integerZeros(2).decimalZeros(1).build(), "-02.0");
  assertEquals(NumberStringBuilder.start().number(-12).integerZeros(2).decimalZeros(0).tail("%").head("%").build(), "-%12%");


  assertEquals(NumberStringBuilder.start().number(1234223.3324224).integerZeros(10).decimalZeros(1).build(), "0001234223.3");
  assertEquals(NumberStringBuilder.start().number(12).integerZeros(2).decimalZeros(0).tail("%").head("%").build(), "%12%");
  assertEquals(NumberStringBuilder.start().number(12.3).integerZeros(2).decimalZeros(1).tail("%").build(), "12.3%");
  assertEquals(NumberStringBuilder.start().number(12.3).integerZeros(2).decimalZeros(1).head("%").build(), "%12.3");
  assertEquals(NumberStringBuilder.start().number(12.3).integerZeros(2).decimalZeros(1).head("$+_").tail("$+_").build(), "$+_12.3$+_");
  assertEquals(NumberStringBuilder.start().number(123456789).integerZeros(1).decimalZeros(1).commafy(true).build(), "123,456,789.0");
  assertEquals(NumberStringBuilder.start().number(123456789.99).integerZeros(1).decimalZeros(1).commafy(true).build(), "123,456,790.0");
  assertEquals(NumberStringBuilder.start().number(0.99).integerZeros(4).decimalZeros(2).commafy(true).build(), "0,000.99");

  assertEquals(NumberStringBuilder.start().number(12.3).integerZeros(1).maximumDecimalPlaces(1).build(), "12.3");
  assertEquals(NumberStringBuilder.start().number(12.33333).integerZeros(1).maximumDecimalPlaces(100).build(), "12.33333");
  assertEquals(NumberStringBuilder.start().number(12.33).integerZeros(1).maximumDecimalPlaces(100).build(), "12.33");
});