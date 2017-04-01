
import { DATE, DATEVALUE } from "../src/RawFormulas/RawFormulas"
import * as ERRORS from "../src/Errors"
import {assertEquals} from "./utils/Asserts"

function catchAndAssertEquals(toExecute, expected) {
  var toThrow = null;
  try {
    toExecute();
    toThrow = true;
  } catch (actualError) {
    if (actualError.message != expected) {
      console.log(expected, "not equal to", actualError.message);
    }
  }
  if (toThrow) {
    throw new Error("expected error: " + expected);
  }
}

// Test DATE
assertEquals(DATE(1900, 1, 1).toNumber(), 2);
assertEquals(DATE(1900, 1, 2).toNumber(), 3);
assertEquals(DATE(1900, 1, 4).toNumber(), 5);
catchAndAssertEquals(function() {
  DATE(1900, 0, 4);
}, ERRORS.NUM_ERROR);
catchAndAssertEquals(function() {
  DATE(1900, 0, 5);
}, ERRORS.NUM_ERROR);
assertEquals(DATE(1992, 6, 24).toNumber(), 33779);
assertEquals(DATE(2017, 2, 26).toNumber(), 42792);
// Leap day stuff
assertEquals(DATE(2004, 2, 28).toNumber(), 38045);
assertEquals(DATE(2004, 2, 29).toNumber(), 38046);
assertEquals(DATE(2004, 3, 1).toNumber(), 38047);
// Overflow values
assertEquals(DATE(1992, 6, 44).toNumber(), 33799);
assertEquals(DATE(2, 33, 44).toNumber(), 1749);
assertEquals(DATE(1777, 33, 44).toNumber(), 650055);
assertEquals(DATE(1976, 2, -10).toNumber(), 27780);
assertEquals(DATE(-1900, 1, 1).toNumber(), 2);



// Test DATEVALUE
// MONTHDIG_DAY_YEAR, MM(fd)DD(fd)YYYY =================================================================================
assertEquals(DATEVALUE("6/24/92"), 33779);
assertEquals(DATEVALUE("6/24/1992"), 33779);
assertEquals(DATEVALUE("06/24/1992"), 33779);
assertEquals(DATEVALUE("1/01/1999"), 36161);
assertEquals(DATEVALUE("1/01/99"), 36161);
assertEquals(DATEVALUE("1/01/2222"), 117610);
assertEquals(DATEVALUE("9/02/1902"), 976);
assertEquals(DATEVALUE("9/2/1902"), 976);
assertEquals(DATEVALUE("11/3/4243"), 856071);
assertEquals(DATEVALUE("  04/19/1992  "), 33713);
assertEquals(DATEVALUE("5/20/1992"), 33744);
assertEquals(DATEVALUE("6/21/1992"), 33776);
assertEquals(DATEVALUE("9/29/1992"), 33876);
assertEquals(DATEVALUE("1/24/1992"), 33627);
assertEquals(DATEVALUE("12/21/1992"), 33959);
assertEquals(DATEVALUE("01/31/1992"), 33634);
assertEquals(DATEVALUE("1/13/1992"), 33616);
assertEquals(DATEVALUE("2/29/2004"), 38046);
assertEquals(DATEVALUE("2/28/2004"), 38045);
assertEquals(DATEVALUE("2/28/004"), 38045);
assertEquals(DATEVALUE("2/28/04"), 38045);
assertEquals(DATEVALUE("2/28/4"), 38045);
assertEquals(DATEVALUE("1/13/1999"), 36173);
assertEquals(DATEVALUE("01/13/1999"), 36173);
assertEquals(DATEVALUE("01/13/0999"), -329069);
assertEquals(DATEVALUE("01/13/1200"), -255656);
assertEquals(DATEVALUE("01/13/0029"), 47131);
assertEquals(DATEVALUE("01/13/0030"), 10971);
assertEquals(DATEVALUE("01/13/0044"), 16084);
assertEquals(DATEVALUE("01/13/0050"), 18276);
assertEquals(DATEVALUE("01/13/0097"), 35443);
assertEquals(DATEVALUE("01/13/0099"), 36173);
assertEquals(DATEVALUE("01/13/0000"), 36538);
assertEquals(DATEVALUE("01/13/0101"), -657057);
assertEquals(DATEVALUE("01/13/0100"), -657422);
assertEquals(DATEVALUE("12/31/100"), -657070);
assertEquals(DATEVALUE("11/10/122"), -649086);
assertEquals(DATEVALUE("1/22/2222"), 117631);
assertEquals(DATEVALUE("1/22/222"), -612854);
// delimiter tests
assertEquals(DATEVALUE("6-24-92"), 33779);
assertEquals(DATEVALUE("6/24/92"), 33779);
assertEquals(DATEVALUE("6 24 92"), 33779);
assertEquals(DATEVALUE("6.24.92"), 33779);
assertEquals(DATEVALUE("6 . 24 . 92"), 33779);
assertEquals(DATEVALUE("6 / 24 / 92"), 33779);
assertEquals(DATEVALUE("6, 24, 92"), 33779);
// flex delimiter should not allow a comma without a space after it.
catchAndAssertEquals(function() {
  DATEVALUE("Sunday,6/24/92");
}, ERRORS.VALUE_ERROR);
// Leap day on non-leap years
catchAndAssertEquals(function() {
  DATEVALUE("2/29/2005");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DATEVALUE("2/29/2001");
}, ERRORS.VALUE_ERROR);
// Out of range day for any month
catchAndAssertEquals(function() {
  DATEVALUE("1/44/2005");
}, ERRORS.VALUE_ERROR);
// timestamp test
assertEquals(DATEVALUE("6-24-92 10am"), 33779); // TODO: come back to these. right now just testing to make sure they don't break anything.
assertEquals(DATEVALUE("6-24-92 10:10"), 33779);
assertEquals(DATEVALUE("6-24-92 10:10am"), 33779);
assertEquals(DATEVALUE("6-24-92 10:10:10"), 33779);
assertEquals(DATEVALUE("6-24-92 10:10:10am"), 33779);
assertEquals(DATEVALUE("6-24-92  10  am"), 33779);
assertEquals(DATEVALUE("6-24-92 10: 10 "), 33779);
assertEquals(DATEVALUE("6-24-92 10: 10 pm"), 33779);
assertEquals(DATEVALUE("6-24-92 10: 10: 10"), 33779);
assertEquals(DATEVALUE("6-24-92  101120: 10: 10    am  "), 33779);
// YEAR_MONTHDIG_DAY, YYYY(fd)MM(fd)DD =================================================================================
assertEquals(DATEVALUE("1992/6/24"), 33779);
assertEquals(DATEVALUE("1992/06/24"), 33779);
assertEquals(DATEVALUE("1999/1/01"), 36161);
assertEquals(DATEVALUE("2222/1/01"), 117610);
assertEquals(DATEVALUE("1902/9/02"), 976);
assertEquals(DATEVALUE("1902/9/2"), 976);
assertEquals(DATEVALUE("4243/11/3"), 856071);
assertEquals(DATEVALUE("  1992/04/19  "), 33713);
assertEquals(DATEVALUE("  1992 /  04/ 19  "), 33713);
assertEquals(DATEVALUE("1992/5/20"), 33744);
assertEquals(DATEVALUE("1992/6/21"), 33776);
assertEquals(DATEVALUE("1992/9/29"), 33876);
assertEquals(DATEVALUE("1992/1/24"), 33627);
assertEquals(DATEVALUE("1992/12/21"), 33959);
assertEquals(DATEVALUE("1992/01/31"), 33634);
assertEquals(DATEVALUE("1992/1/13"), 33616);
assertEquals(DATEVALUE("2004/2/29"), 38046);
assertEquals(DATEVALUE("2004/2/28"), 38045);
assertEquals(DATEVALUE("1999/1/13"), 36173);
assertEquals(DATEVALUE("1999/01/13"), 36173);
assertEquals(DATEVALUE("0999/01/13"), -329069);
assertEquals(DATEVALUE("1200/01/13"), -255656);
assertEquals(DATEVALUE("0029/01/13"), 47131);
assertEquals(DATEVALUE("0030/01/13"), 10971);
assertEquals(DATEVALUE("0044/01/13"), 16084);
assertEquals(DATEVALUE("0050/01/13"), 18276);
assertEquals(DATEVALUE("0097/01/13"), 35443);
assertEquals(DATEVALUE("0099/01/13"), 36173);
assertEquals(DATEVALUE("0000/01/13"), 36538);
assertEquals(DATEVALUE("0101/01/13"), -657057);
assertEquals(DATEVALUE("0100/01/13"), -657422);
assertEquals(DATEVALUE("100/12/31"), -657070);
assertEquals(DATEVALUE("122/11/10"), -649086);
assertEquals(DATEVALUE("2222/1/22"), 117631);
assertEquals(DATEVALUE("222/1/22"), -612854);
assertEquals(DATEVALUE("Sunday 1992/6/24"), 33779);
assertEquals(DATEVALUE("Monday 1992/6/24"), 33779);
assertEquals(DATEVALUE("Tuesday 1992/6/24"), 33779);
assertEquals(DATEVALUE("Wednesday 1992/6/24"), 33779);
assertEquals(DATEVALUE("Thursday 1992/6/24"), 33779);
assertEquals(DATEVALUE("Friday 1992/6/24"), 33779);
assertEquals(DATEVALUE("Saturday 1992/6/24"), 33779);
assertEquals(DATEVALUE("Sun 1992/6/24"), 33779);
assertEquals(DATEVALUE("Mon 1992/6/24"), 33779);
assertEquals(DATEVALUE("Tue 1992/6/24"), 33779);
assertEquals(DATEVALUE("Wed 1992/6/24"), 33779);
assertEquals(DATEVALUE("Thu 1992/6/24"), 33779);
assertEquals(DATEVALUE("Fri 1992/6/24"), 33779);
assertEquals(DATEVALUE("Sat 1992/6/24"), 33779);
assertEquals(DATEVALUE("Sunday, 1992/6/24"), 33779);
// delimiter tests
assertEquals(DATEVALUE("1992-6-24"), 33779);
assertEquals(DATEVALUE("1992/6/24"), 33779);
assertEquals(DATEVALUE("1992 6 24"), 33779);
assertEquals(DATEVALUE("1992 6 24"), 33779);
assertEquals(DATEVALUE("1992 . 6 . 24"), 33779);
assertEquals(DATEVALUE("1992 / 6 / 24"), 33779);
assertEquals(DATEVALUE("1992, 6, 24"), 33779);
// flex delimiter should not allow a comma without a space after it.
catchAndAssertEquals(function() {
  DATEVALUE("Sunday,1992/6/24");
}, ERRORS.VALUE_ERROR);
// Leap day on non-leap years
catchAndAssertEquals(function() {
  DATEVALUE("2005/2/29");
}, ERRORS.VALUE_ERROR);
catchAndAssertEquals(function() {
  DATEVALUE("2001/2/29");
}, ERRORS.VALUE_ERROR);
// Out of range day for any month
catchAndAssertEquals(function() {
  DATEVALUE("2005/1/44");
}, ERRORS.VALUE_ERROR);
// timestamp test
assertEquals(DATEVALUE("1992-6-24 10am"), 33779); // TODO: come back to these. right now just testing to make sure they don't break anything.
assertEquals(DATEVALUE("1992-6-24 10:10"), 33779);
assertEquals(DATEVALUE("1992-6-24 10:10am"), 33779);
assertEquals(DATEVALUE("1992-6-24 10:10:10"), 33779);
assertEquals(DATEVALUE("1992-6-24 10:10:10am"), 33779);
assertEquals(DATEVALUE("1992-6-24  10  am"), 33779);
assertEquals(DATEVALUE("1992-6-24 10: 10 "), 33779);
assertEquals(DATEVALUE("1992-6-24 10: 10 pm"), 33779);
assertEquals(DATEVALUE("1992-6-24 10: 10: 10"), 33779);
assertEquals(DATEVALUE("1992-6-24  101120: 10: 10    am  "), 33779);
// DAY_MONTHNAME_YEAR, DD(fd)Month(fd)YYYY =============================================================================
assertEquals(DATEVALUE("Sun 09 Feb 2017"), 42775);
assertEquals(DATEVALUE("Sun 9 Feb 2017"), 42775);
assertEquals(DATEVALUE("Mon 09 Feb 2017"), 42775);
assertEquals(DATEVALUE("Thursday 09 Feb 2017"), 42775);
assertEquals(DATEVALUE("Thursday 09 February 2017"), 42775);
assertEquals(DATEVALUE("Sun 01 September 20"), 44075);
assertEquals(DATEVALUE("Sun, 09, Feb, 2017"), 42775);
assertEquals(DATEVALUE("20 May 1992"), 33744);
assertEquals(DATEVALUE("31 December 100"), -657070);
assertEquals(DATEVALUE("13 January 0030"), 10971);
assertEquals(DATEVALUE("13 January 1200"), -255656);
assertEquals(DATEVALUE("22 January 2222"), 117631);
assertEquals(DATEVALUE("3 November 4243"), 856071);
assertEquals(DATEVALUE("13 November 0999"), -328765);
assertEquals(DATEVALUE("13 November 1200"), -255351);
assertEquals(DATEVALUE("13 January 0029"), 47131);
assertEquals(DATEVALUE("13 January 0030"), 10971);
assertEquals(DATEVALUE("13 January 0044"), 16084);
assertEquals(DATEVALUE("13 January 0050"), 18276);
assertEquals(DATEVALUE("13 January 0097"), 35443);
assertEquals(DATEVALUE("13 January 0099"), 36173);
assertEquals(DATEVALUE("13 January 0000"), 36538);
assertEquals(DATEVALUE("13 January 0101"), -657057);
assertEquals(DATEVALUE("13 January 0100"), -657422);
// delimiter tests
assertEquals(DATEVALUE("Sun, 09, Feb, 2017"), 42775);
assertEquals(DATEVALUE("Sun, 09/Feb/2017"), 42775);
assertEquals(DATEVALUE("09/Feb/2017"), 42775);
assertEquals(DATEVALUE("09-Feb-2017"), 42775);
assertEquals(DATEVALUE("09.Feb.2017"), 42775);
assertEquals(DATEVALUE("09 Feb/2017"), 42775);
assertEquals(DATEVALUE("09 . Feb . 2017"), 42775);
// If the delimiters don't match the first one should be a space.
catchAndAssertEquals(function() {
  DATEVALUE("09.Feb/2017");
}, ERRORS.VALUE_ERROR);
// Comma delimiters should be followed by spaces.
catchAndAssertEquals(function() {
  DATEVALUE("09,Feb,2017");
}, ERRORS.VALUE_ERROR);
// timestamp tests
assertEquals(DATEVALUE("24/June/1992 10am"), 33779); // TODO: come back to these. right now just testing to make sure they don't break anything.
assertEquals(DATEVALUE("24/June/1992 10:10"), 33779);
assertEquals(DATEVALUE("24/June/1992 10:10am"), 33779);
assertEquals(DATEVALUE("24/June/1992 10:10:10"), 33779);
assertEquals(DATEVALUE("24/June/1992 10:10:10am"), 33779);
assertEquals(DATEVALUE("24/June/1992  10  am"), 33779);
assertEquals(DATEVALUE("24/June/1992 10: 10 "), 33779);
assertEquals(DATEVALUE("24/June/1992 10: 10 pm"), 33779);
assertEquals(DATEVALUE("24/June/1992 10: 10: 10"), 33779);
assertEquals(DATEVALUE("24/June/1992  101120: 10: 10    am  "), 33779);
// YEAR_MONTHDIG, YYYY(fd)MM, '1992/06' ================================================================================
assertEquals(DATEVALUE("2017/01"), 42736);
assertEquals(DATEVALUE("2017/02"), 42767);
assertEquals(DATEVALUE("2017/03"), 42795);
assertEquals(DATEVALUE("2017/04"), 42826);
assertEquals(DATEVALUE("2017/05"), 42856);
assertEquals(DATEVALUE("2017/06"), 42887);
assertEquals(DATEVALUE("2017/07"), 42917);
assertEquals(DATEVALUE("2017/08"), 42948);
assertEquals(DATEVALUE("2017/09"), 42979);
assertEquals(DATEVALUE("2017/10"), 43009);
assertEquals(DATEVALUE("2017/11"), 43040);
assertEquals(DATEVALUE("2017/12"), 43070);
assertEquals(DATEVALUE("2017/01"), 42736);
// delimiter tests
assertEquals(DATEVALUE("Thursday 2017/01"), 42736);
assertEquals(DATEVALUE("Thursday, 2017/01"), 42736);
assertEquals(DATEVALUE("2017/01"), 42736);
assertEquals(DATEVALUE("2017-01"), 42736);
assertEquals(DATEVALUE("2017.01"), 42736);
assertEquals(DATEVALUE("2017, 01"), 42736);
// Comma delimiters should be followed by spaces.
catchAndAssertEquals(function() {
  DATEVALUE("2017,01");
}, ERRORS.VALUE_ERROR);
// timestamp test
assertEquals(DATEVALUE("2017-01 10am"), 42736); // TODO: come back to these. right now just testing to make sure they don't break anything.
assertEquals(DATEVALUE("2017-01 10:10"), 42736);
assertEquals(DATEVALUE("2017-01 10:10am"), 42736);
assertEquals(DATEVALUE("2017-01 10:10:10"), 42736);
assertEquals(DATEVALUE("2017-01 10:10:10am"), 42736);
assertEquals(DATEVALUE("2017-01  10  am"), 42736);
assertEquals(DATEVALUE("2017-01 10: 10 "), 42736);
assertEquals(DATEVALUE("2017-01 10: 10 pm"), 42736);
assertEquals(DATEVALUE("2017-01 10: 10: 10"), 42736);
assertEquals(DATEVALUE("2017-01  101120: 10: 10    am  "), 42736);
// MONTHDIG_YEAR, MM(fd)YYYY, '06/1992' ================================================================================
assertEquals(DATEVALUE("01/2017"), 42736);
assertEquals(DATEVALUE("02/2017"), 42767);
assertEquals(DATEVALUE("03/2017"), 42795);
assertEquals(DATEVALUE("04/2017"), 42826);
assertEquals(DATEVALUE("05/2017"), 42856);
assertEquals(DATEVALUE("06/2017"), 42887);
assertEquals(DATEVALUE("07/2017"), 42917);
assertEquals(DATEVALUE("08/2017"), 42948);
assertEquals(DATEVALUE("09/2017"), 42979);
assertEquals(DATEVALUE("10/2017"), 43009);
assertEquals(DATEVALUE("11/2017"), 43040);
assertEquals(DATEVALUE("12/2017"), 43070);
// delimiter tests
assertEquals(DATEVALUE("Thursday 01/2017"), 42736);
assertEquals(DATEVALUE("Thursday, 01/2017"), 42736);
assertEquals(DATEVALUE("1/2017"), 42736);
assertEquals(DATEVALUE("01-2017"), 42736);
assertEquals(DATEVALUE("01.2017"), 42736);
assertEquals(DATEVALUE("01, 2017"), 42736);
// Comma delimiters should be followed by spaces.
catchAndAssertEquals(function() {
  DATEVALUE("01,2017");
}, ERRORS.VALUE_ERROR);
// 0 is not a month
catchAndAssertEquals(function() {
  DATEVALUE("0/2017");
}, ERRORS.VALUE_ERROR);
// timestamp test
assertEquals(DATEVALUE("01-2017 10am"), 42736); // TODO: come back to these. right now just testing to make sure they don't break anything.
assertEquals(DATEVALUE("01-2017 10:10"), 42736);
assertEquals(DATEVALUE("01-2017 10:10am"), 42736);
assertEquals(DATEVALUE("01-2017 10:10:10"), 42736);
assertEquals(DATEVALUE("01-2017 10:10:10am"), 42736);
assertEquals(DATEVALUE("01-2017  10  am"), 42736);
assertEquals(DATEVALUE("01-2017 10: 10 "), 42736);
assertEquals(DATEVALUE("01-2017 10: 10 pm"), 42736);
assertEquals(DATEVALUE("01-2017 10: 10: 10"), 42736);
assertEquals(DATEVALUE("01-2017  101120: 10: 10    am  "), 42736);
// YEAR_MONTHNAME, YYYY(fd)Month, '1992/Aug' ===========================================================================
assertEquals(DATEVALUE("2017 January"), 42736);
assertEquals(DATEVALUE("2017 February"), 42767);
assertEquals(DATEVALUE("2017 March"), 42795);
assertEquals(DATEVALUE("2017 April"), 42826);
assertEquals(DATEVALUE("2017 May"), 42856);
assertEquals(DATEVALUE("2017 June"), 42887);
assertEquals(DATEVALUE("2017 July"), 42917);
assertEquals(DATEVALUE("2017 August"), 42948);
assertEquals(DATEVALUE("2017 September"), 42979);
assertEquals(DATEVALUE("2017 October"), 43009);
assertEquals(DATEVALUE("2017 November"), 43040);
assertEquals(DATEVALUE("2017 December"), 43070);
// delimiter tests
assertEquals(DATEVALUE("Thursday 2017 January"), 42736);
assertEquals(DATEVALUE("Thursday, 2017 January"), 42736);
assertEquals(DATEVALUE("2017/January"), 42736);
assertEquals(DATEVALUE("2017-January"), 42736);
assertEquals(DATEVALUE("2017.January"), 42736);
assertEquals(DATEVALUE("2017, January"), 42736);
// Comma delimiters should be followed by spaces.
catchAndAssertEquals(function() {
  DATEVALUE("2017,January");
}, ERRORS.VALUE_ERROR);
// timestamp test
assertEquals(DATEVALUE("2017-January 10am"), 42736); // TODO: come back to these. right now just testing to make sure they don't break anything.
assertEquals(DATEVALUE("2017-January 10:10"), 42736);
assertEquals(DATEVALUE("2017-January 10:10am"), 42736);
assertEquals(DATEVALUE("2017-January 10:10:10"), 42736);
assertEquals(DATEVALUE("2017-January 10:10:10am"), 42736);
assertEquals(DATEVALUE("2017-January  10  am"), 42736);
assertEquals(DATEVALUE("2017-January 10: 10 "), 42736);
assertEquals(DATEVALUE("2017-January 10: 10 pm"), 42736);
assertEquals(DATEVALUE("2017-January 10: 10: 10"), 42736);
assertEquals(DATEVALUE("2017-January  101120: 10: 10    am  "), 42736);
// MONTHNAME_YEAR, Month(fd)YYYY, 'Aug 1992' ===========================================================================
assertEquals(DATEVALUE("January 2017"), 42736);
assertEquals(DATEVALUE("February 2017"), 42767);
assertEquals(DATEVALUE("March 2017"), 42795);
assertEquals(DATEVALUE("April 2017"), 42826);
assertEquals(DATEVALUE("May 2017"), 42856);
assertEquals(DATEVALUE("June 2017"), 42887);
assertEquals(DATEVALUE("July 2017"), 42917);
assertEquals(DATEVALUE("August 2017"), 42948);
assertEquals(DATEVALUE("September 2017"), 42979);
assertEquals(DATEVALUE("October 2017"), 43009);
assertEquals(DATEVALUE("November 2017"), 43040);
assertEquals(DATEVALUE("December 2017"), 43070);
// delimiter tests
assertEquals(DATEVALUE("Thursday January 2017"), 42736);
assertEquals(DATEVALUE("Thursday, January 2017"), 42736);
assertEquals(DATEVALUE("January/2017"), 42736);
assertEquals(DATEVALUE("January-2017"), 42736);
assertEquals(DATEVALUE("January.2017"), 42736);
assertEquals(DATEVALUE("January, 2017"), 42736);
// Comma delimiters should be followed by spaces.
catchAndAssertEquals(function() {
  DATEVALUE("January,2017");
}, ERRORS.VALUE_ERROR);
// timestamp test
assertEquals(DATEVALUE("January-2017 10am"), 42736); // TODO: come back to these. right now just testing to make sure they don't break anything.
assertEquals(DATEVALUE("January-2017 10:10"), 42736);
assertEquals(DATEVALUE("January-2017 10:10am"), 42736);
assertEquals(DATEVALUE("January-2017 10:10:10"), 42736);
assertEquals(DATEVALUE("January-2017 10:10:10am"), 42736);
assertEquals(DATEVALUE("January-2017  10  am"), 42736);
assertEquals(DATEVALUE("January-2017 10: 10 "), 42736);
assertEquals(DATEVALUE("January-2017 10: 10 pm"), 42736);
assertEquals(DATEVALUE("January-2017 10: 10: 10"), 42736);
assertEquals(DATEVALUE("January-2017  101120: 10: 10    am  "), 42736);




// // YYYY/MM/DD HH(am|pm)
// assertEquals(DATEVALUE("1992/6/24 00am"), 33779);
// assertEquals(DATEVALUE("1992/06/24 01am "), 33779);
// assertEquals(DATEVALUE("1999/1/01 02pm"), 36161);
// assertEquals(DATEVALUE("2222/1/01 03pm"), 117610);
// assertEquals(DATEVALUE("1902/9/02 12pm"), 976);
// assertEquals(DATEVALUE("1902/9/2 12pm"), 976);
// assertEquals(DATEVALUE("4243/11/3 12pm   "), 856071);
// assertEquals(DATEVALUE("  1992/04/19   12pm   "), 33713);
// assertEquals(DATEVALUE("1992/5/20 01am"), 33744);
// assertEquals(DATEVALUE("1992/6/21  3pm"), 33776);
// assertEquals(DATEVALUE("1992/9/29 3pm"), 33876);
// assertEquals(DATEVALUE("1992/1/24 3pm"), 33627);
// assertEquals(DATEVALUE("1992/12/21 3pm"), 33959);
// assertEquals(DATEVALUE("1992/01/31 3pm"), 33634);
// assertEquals(DATEVALUE("1992/1/13 3pm"), 33616);
// assertEquals(DATEVALUE("2004/2/29 3pm"), 38046);
// assertEquals(DATEVALUE("2004/2/28  3pm "), 38045);
// assertEquals(DATEVALUE("1999/1/13 3pm"), 36173);
// assertEquals(DATEVALUE("1999/01/13 3pm"), 36173);
// assertEquals(DATEVALUE("0999/01/13 3pm"), -329069);
// assertEquals(DATEVALUE("1200/01/13 3pm"), -255656);
// assertEquals(DATEVALUE("0029/01/13 3pm"), 47131);
// assertEquals(DATEVALUE("0030/01/13 3pm"), 10971);
// assertEquals(DATEVALUE("0044/01/13 3pm"), 16084);
// assertEquals(DATEVALUE("0050/01/13 3pm"), 18276);
// assertEquals(DATEVALUE("0097/01/13 00pm"), 35443);
// assertEquals(DATEVALUE("0099/01/13 3pm"), 36173);
// assertEquals(DATEVALUE("0000/01/13 3pm"), 36538);
// assertEquals(DATEVALUE("0101/01/13 3pm"), -657057);
// assertEquals(DATEVALUE("0100/01/13 3pm"), -657422);
// assertEquals(DATEVALUE("100/12/31 3pm"), -657070);
// assertEquals(DATEVALUE("122/11/10 3pm"), -649086);
// assertEquals(DATEVALUE("2222/1/22 3pm"), 117631);
// assertEquals(DATEVALUE("222/1/22 3pm"), -612854);
// catchAndAssertEquals(function() {
//   DATEVALUE("2005/2/29 000pm");// Too many digits
// }, ERRORS.VALUE_ERROR);
// catchAndAssertEquals(function() {
//   DATEVALUE("2001/2/2 13pm");// Hour out of range
// }, ERRORS.VALUE_ERROR);
// catchAndAssertEquals(function() {
//   DATEVALUE("2005/2/29 11am");// Leap day on non-leap year.
// }, ERRORS.VALUE_ERROR);
// catchAndAssertEquals(function() {
//   DATEVALUE("2005/1/44 11am");// Out of range day for any month
// }, ERRORS.VALUE_ERROR);
// // YYYY/MM/DD HH:mm
// assertEquals(DATEVALUE("1992/6/24 00:00"), 33779);
// assertEquals(DATEVALUE("1992/6/24 0:00"), 33779);
// assertEquals(DATEVALUE("1992/6/24 10:10"), 33779);
// assertEquals(DATEVALUE("1992/6/24 16:22"), 33779);
// assertEquals(DATEVALUE("1992/6/24 25:10"), 33780);
// assertEquals(DATEVALUE("1992/6/24 23:60"), 33780);
// assertEquals(DATEVALUE("1992/6/24 24:00"), 33780);
// assertEquals(DATEVALUE("1992/6/24 23:59"), 33779);
// assertEquals(DATEVALUE("1999/1/13 10:11111111"), 43889);
// assertEquals(DATEVALUE("1999/1/13 25000:22"), 37214);
// assertEquals(DATEVALUE("1999/1/13 25000:    22"), 37214);
// // YYYY/MM/DD HH:mm(am|pm)
// assertEquals(DATEVALUE("1992/6/24 00:00am"), 33779);
// assertEquals(DATEVALUE("1992/06/24 01:44am "), 33779);
// assertEquals(DATEVALUE("1999/1/01 02:59pm"), 36161);
// assertEquals(DATEVALUE("2222/1/01 03:33pm"), 117610);
// assertEquals(DATEVALUE("1902/9/02 12:33pm"), 976);
// assertEquals(DATEVALUE("1902/9/2 12:33pm"), 976);
// assertEquals(DATEVALUE("4243/11/3 12:33pm"), 856071);
// assertEquals(DATEVALUE("  1992/04/19   12:  33pm   "), 33713);
// assertEquals(DATEVALUE("1992/5/20 01:33am"), 33744);
// assertEquals(DATEVALUE("1992/6/21  3:33pm"), 33776);
// assertEquals(DATEVALUE("1992/9/29 3:33pm"), 33876);
// assertEquals(DATEVALUE("1992/1/24 3:33pm"), 33627);
// assertEquals(DATEVALUE("1992/12/21 3:33pm"), 33959);
// assertEquals(DATEVALUE("1992/01/31 3:33pm"), 33634);
// assertEquals(DATEVALUE("1992/1/13 3:33pm"), 33616);
// assertEquals(DATEVALUE("2004/2/29 3:33pm"), 38046);
// assertEquals(DATEVALUE("2004/2/28  3:33pm "), 38045);
// assertEquals(DATEVALUE("1999/1/13 3:33pm"), 36173);
// assertEquals(DATEVALUE("1999/01/13 3:33pm"), 36173);
// assertEquals(DATEVALUE("0999/01/13 3:33pm"), -329069);
// assertEquals(DATEVALUE("1200/01/13 3:33pm"), -255656);
// assertEquals(DATEVALUE("0029/01/13 3:33pm"), 47131);
// assertEquals(DATEVALUE("0030/01/13 3:33pm"), 10971);
// assertEquals(DATEVALUE("0044/01/13 3:33pm"), 16084);
// assertEquals(DATEVALUE("0050/01/13 3:33pm"), 18276);
// assertEquals(DATEVALUE("0097/01/13 00:33pm"), 35443);
// assertEquals(DATEVALUE("0099/01/13 3:33pm"), 36173);
// assertEquals(DATEVALUE("0000/01/13 3:33pm"), 36538);
// assertEquals(DATEVALUE("0101/01/13 3:33pm"), -657057);
// assertEquals(DATEVALUE("0100/01/13 3:33pm"), -657422);
// assertEquals(DATEVALUE("100/12/31 3:33pm"), -657070);
// assertEquals(DATEVALUE("122/11/10 3:33pm"), -649086);
// assertEquals(DATEVALUE("2222/1/22 3:33pm"), 117631);
// assertEquals(DATEVALUE("222/1/22 3:33pm"), -612854);
// assertEquals(DATEVALUE("1992/1/13 6:22222222am"), 49048); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:720pm"), 33617); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 00:720pm"), 33617); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:719pm"), 33616); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 00:720am"), 33616); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 00:01pm"), 33616); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:66669pm"), 33662); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:66669am"), 33662); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:66249pm"), 33662); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:66249am"), 33662); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:666669am"), 34078); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:666669pm"), 34079); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:100000000am"), 103060); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:0912347287am"), 667190); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:00000912347287am"), 667190); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:1989198298am"), 1415003); // overload minutes
// // YYYY/MM/DD HH:mm:ss
// assertEquals(DATEVALUE("1992/6/24 0:0:0"), 33779);
// assertEquals(DATEVALUE("1992/6/24 0000:0000:0000"), 33779);
// assertEquals(DATEVALUE("0000/01/13 3:33:999999999"), 48112); // overload seconds
// assertEquals(DATEVALUE("1992/1/13 6:22222222:0"), 49048); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:912347287:10"), 667191); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:100000000:10"), 103060); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 23:720:10"), 33617); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 23:719:60"), 33617); // overload minutes, seconds
// assertEquals(DATEVALUE("1992/6/24 24:00:00"), 33780); // overload hours
// assertEquals(DATEVALUE("1999/1/01 200000000:999999999:923231312"), 9074624); // overload hours, minutes, seconds
// assertEquals(DATEVALUE("  1992/04/19   12:  33: 11  "), 33713);
// assertEquals(DATEVALUE("0000/01/13 3:33:33"), 36538);
// assertEquals(DATEVALUE("4243/11/3 200000000:33:444"), 9189404);
// // YYYY/MM/DD HH:mm:ss(am|pm)
// assertEquals(DATEVALUE("1999/1/13 10:10:10pm"), 36173);
// assertEquals(DATEVALUE("1992/6/24 0:0:0pm"), 33779);
// assertEquals(DATEVALUE("1992/6/24 00:0000:0000pm"), 33779);
// assertEquals(DATEVALUE("0000/01/13 3:33:999999999pm"), 48112); // overload seconds
// assertEquals(DATEVALUE("1992/1/13 6:22222222:0pm"), 49048); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:912347287:10pm"), 667191); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:100000000:10pm"), 103060); // overload minutes
// assertEquals(DATEVALUE("1992/6/24 00:00:00am"), 33779);
// assertEquals(DATEVALUE("1992/06/24 01:44:00am "), 33779);
// assertEquals(DATEVALUE("1999/1/01 02:59:00pm"), 36161);
// assertEquals(DATEVALUE("2222/1/01 03:33:00pm"), 117610);
// assertEquals(DATEVALUE("1902/9/02 12:33:00pm"), 976);
// assertEquals(DATEVALUE("1902/9/2 12:33:00pm"), 976);
// assertEquals(DATEVALUE("4243/11/3 12:33:00pm"), 856071);
// assertEquals(DATEVALUE("  1992/04/19   12:  33:  00  pm   "), 33713);
// assertEquals(DATEVALUE("1992/5/20 01:33:44am"), 33744);
// assertEquals(DATEVALUE("1992/6/21  3:33:44pm"), 33776);
// assertEquals(DATEVALUE("1992/9/29 3:33:44pm"), 33876);
// assertEquals(DATEVALUE("1992/1/24 3:33:44pm"), 33627);
// assertEquals(DATEVALUE("1992/12/21 3:33:44pm"), 33959);
// assertEquals(DATEVALUE("1992/01/31 3:33:44pm"), 33634);
// assertEquals(DATEVALUE("1992/1/13 3:33:44pm"), 33616);
// assertEquals(DATEVALUE("2004/2/29 3:33:44pm"), 38046);
// assertEquals(DATEVALUE("2004/2/28  3:33:44pm "), 38045);
// assertEquals(DATEVALUE("1999/1/13 3:33:44pm"), 36173);
// assertEquals(DATEVALUE("1999/01/13 3:33:44pm"), 36173);
// assertEquals(DATEVALUE("0999/01/13 3:33:44pm"), -329069);
// assertEquals(DATEVALUE("1200/01/13 3:33:44pm"), -255656);
// assertEquals(DATEVALUE("0029/01/13 3:33:44pm"), 47131);
// assertEquals(DATEVALUE("0030/01/13 3:33:44pm"), 10971);
// assertEquals(DATEVALUE("0044/01/13 3:33:44pm"), 16084);
// assertEquals(DATEVALUE("0050/01/13 3:33:44pm"), 18276);
// assertEquals(DATEVALUE("0097/01/13 00:33:44pm"), 35443);
// assertEquals(DATEVALUE("0099/01/13 3:33:44pm"), 36173);
// assertEquals(DATEVALUE("0000/01/13 3:33:44pm"), 36538);
// assertEquals(DATEVALUE("0101/01/13 3:33:44pm"), -657057);
// assertEquals(DATEVALUE("0100/01/13 3:33:44pm"), -657422);
// assertEquals(DATEVALUE("100/12/31 3:33:44pm"), -657070);
// assertEquals(DATEVALUE("122/11/10 3:33:44pm"), -649086);
// assertEquals(DATEVALUE("2222/1/22 3:33:44pm"), 117631);
// assertEquals(DATEVALUE("222/1/22 3:33:44pm"), -612854);
// assertEquals(DATEVALUE("1992/1/13 6:22222222:44am"), 49048); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:720:00pm"), 33617); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 00:720:00pm"), 33617); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:719:00pm"), 33616); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 00:720:00am"), 33616); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:719:60pm"), 33617); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 00:720:00am"), 33616); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 00:01:00pm"), 33616); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:66669:00pm"), 33662); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:66669:00am"), 33662); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:66249:00pm"), 33662); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:66249:00am"), 33662); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:666669:00am"), 34078); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:666669:00pm"), 34079); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:100000000:00am"), 103060); // overload minutes
// assertEquals(DATEVALUE("1992/1/13 12:912347287:00am"), 667190); // overload minutes
// // (Dayname) Month DD YYYY
// assertEquals(DATEVALUE("Sun Feb 09 2017"), 42775);
// assertEquals(DATEVALUE("Sun Feb 9 2017"), 42775);
// assertEquals(DATEVALUE("Mon Feb 09 2017"), 42775);
// assertEquals(DATEVALUE("Thursday Feb 09 2017"), 42775);
// assertEquals(DATEVALUE("Thursday February 09 2017"), 42775);
// assertEquals(DATEVALUE("Sun September 01 20"), 44075);
// assertEquals(DATEVALUE("Sun, Feb, 09, 2017"), 42775);
// assertEquals(DATEVALUE("May 20 1992"), 33744);
// assertEquals(DATEVALUE("December 31 100"), -657070);
// assertEquals(DATEVALUE("January 13 0030"), 10971);
// assertEquals(DATEVALUE("January 13 1200"), -255656);
// assertEquals(DATEVALUE("January 22 2222"), 117631);
// assertEquals(DATEVALUE("November 3 4243"), 856071);
// assertEquals(DATEVALUE("Feb 29 2004"), 38046); // leap year, 29th ok
// catchAndAssertEquals(function() {
//   DATEVALUE("Feb 29 2001");// not leap year, 29th not ok
// }, ERRORS.VALUE_ERROR);
// catchAndAssertEquals(function() {
//   DATEVALUE("June 32 2001");// overload numbers not ok
// }, ERRORS.VALUE_ERROR);
// // (Dayname) DD Month YYYY
// assertEquals(DATEVALUE("29 Feb 2004"), 38046); // leap year, 29th ok
// catchAndAssertEquals(function() {
//   DATEVALUE("29 Feb 2001");// not leap year, 29th not ok
// }, ERRORS.VALUE_ERROR);
// catchAndAssertEquals(function() {
//   DATEVALUE("32 June 2001");// overload numbers not ok
// }, ERRORS.VALUE_ERROR);
// // Month YYYY
// assertEquals(DATEVALUE("Jan 2017"), 42736);
// assertEquals(DATEVALUE("Feb 2017"), 42767);
// assertEquals(DATEVALUE("Mar 2017"), 42795);
// assertEquals(DATEVALUE("Apr 2017"), 42826);
// assertEquals(DATEVALUE("May 2017"), 42856);
// assertEquals(DATEVALUE("Jun 2017"), 42887);
// assertEquals(DATEVALUE("Jul 2017"), 42917);
// assertEquals(DATEVALUE("Aug 2017"), 42948);
// assertEquals(DATEVALUE("Sep 2017"), 42979);
// assertEquals(DATEVALUE("Oct 2017"), 43009);
// assertEquals(DATEVALUE("Nov 2017"), 43040);
// assertEquals(DATEVALUE("Dec 2017"), 43070);
// assertEquals(DATEVALUE("Feb, 2017"), 42767);
// assertEquals(DATEVALUE("  Feb    2017  "), 42767);
// assertEquals(DATEVALUE("Feb-2017"), 42767);
// assertEquals(DATEVALUE("Feb.2017"), 42767);
// assertEquals(DATEVALUE("Feb/2017"), 42767);
// assertEquals(DATEVALUE("Feb    .    2017"), 42767);
// assertEquals(DATEVALUE("Feb -      2017"), 42767);
// assertEquals(DATEVALUE("January 0030"), 10959);
// assertEquals(DATEVALUE("November 4243"), 856069);
// assertEquals(DATEVALUE("December 0100"), -657100);
// catchAndAssertEquals(function() {
//   DATEVALUE("December 100");// need 4 digits
// }, ERRORS.VALUE_ERROR);
// catchAndAssertEquals(function() {
//   DATEVALUE("Dec.20");// need space if using period
// }, ERRORS.VALUE_ERROR);
// // DD Month YYYY
// assertEquals(DATEVALUE("01 Jan 2017"), 42736);
// assertEquals(DATEVALUE("01 Feb 2017"), 42767);
// assertEquals(DATEVALUE("01 Mar 2017"), 42795);
// assertEquals(DATEVALUE("01 Apr 2017"), 42826);
// assertEquals(DATEVALUE("01 May 2017"), 42856);
// assertEquals(DATEVALUE("01 Jun 2017"), 42887);
// assertEquals(DATEVALUE("01 Jul 2017"), 42917);
// assertEquals(DATEVALUE("01 Aug 2017"), 42948);
// assertEquals(DATEVALUE("01 Sep 2017"), 42979);
// assertEquals(DATEVALUE("01 Oct 2017"), 43009);
// assertEquals(DATEVALUE("01 Nov 2017"), 43040);
// assertEquals(DATEVALUE(" 1 Dec 2017"), 43070);
// assertEquals(DATEVALUE("20 Jan 2015"), 42024);
// assertEquals(DATEVALUE("20 Feb 2015"), 42055);
// assertEquals(DATEVALUE("20 Mar 2015"), 42083);
// assertEquals(DATEVALUE("20 Apr 2015"), 42114);
// assertEquals(DATEVALUE("20 May 2015"), 42144);
// assertEquals(DATEVALUE("20 Jun 2015"), 42175);
// assertEquals(DATEVALUE("20 Jul 2015"), 42205);
// assertEquals(DATEVALUE("20 Aug 2015"), 42236);
// assertEquals(DATEVALUE("20 Sep 2015"), 42267);
// assertEquals(DATEVALUE("20 Oct 2015"), 42297);
// assertEquals(DATEVALUE("20 Nov 2015"), 42328);
// assertEquals(DATEVALUE("20 Dec 2015"), 42358);
