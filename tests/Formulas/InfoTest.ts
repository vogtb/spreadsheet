import {
  NA,
  ISTEXT,
  ISLOGICAL,
  ISNUMBER,
  ISNONTEXT,
  ISEMAIL,
  ISURL,
  N,
  ISREF,
  ERRORTYPE,
  ISBLANK,
  ISERR,
  ISERROR,
  ISNA,
  IFERROR,
  TYPE,
  COLUMN,
  ROW,
  ISFORMULA
} from "../../src/Formulas/Info";
import * as ERRORS from "../../src/Errors";
import {
  assertEquals,
  catchAndAssertEquals,
  test
} from "../Utils/Asserts";
import {
  Cell
} from "../../src/Cell";
import {
  RefError,
  NullError,
  NAError,
  DivZeroError,
  ValueError,
  NameError,
  NumError
} from "../../src/Errors";


test("NA", function(){
  catchAndAssertEquals(function() {
    NA();
  }, ERRORS.NA_ERROR);
});

test("ISTEXT", function(){
  assertEquals(ISTEXT("str"), true);
  assertEquals(ISTEXT(["str"]), true);
  assertEquals(ISTEXT(9), false);
  assertEquals(ISTEXT(false), false);
  catchAndAssertEquals(function() {
    ISTEXT.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ISLOGICAL", function(){
  assertEquals(ISLOGICAL("str"), false);
  assertEquals(ISLOGICAL(9), false);
  assertEquals(ISLOGICAL(false), true);
  assertEquals(ISLOGICAL(true), true);
  catchAndAssertEquals(function() {
    ISLOGICAL.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ISNUMBER", function(){
  assertEquals(ISNUMBER("str"), false);
  assertEquals(ISNUMBER(9), true);
  assertEquals(ISNUMBER(false), false);
  assertEquals(ISNUMBER(true), false);
  catchAndAssertEquals(function() {
    ISNUMBER.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ISNONTEXT", function(){
  assertEquals(ISNONTEXT("str"), false);
  assertEquals(ISNONTEXT(["str"]), false);
  assertEquals(ISNONTEXT(9), true);
  assertEquals(ISNONTEXT(false), true);
  catchAndAssertEquals(function() {
    ISNONTEXT.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ISEMAIL", function(){
  assertEquals(ISEMAIL("str"), false);
  assertEquals(ISEMAIL("ben@example.com"), true);
  assertEquals(ISEMAIL("steve@apple.com"), true);
  assertEquals(ISEMAIL("423428374982@hello.tv"), true);
  assertEquals(ISEMAIL("423428374982@hello.co"), true);
  assertEquals(ISEMAIL("423428374982@hello.org"), true);
  catchAndAssertEquals(function() {
    ISEMAIL.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ISURL", function(){
  assertEquals(ISURL("http://google.com"), true);
  assertEquals(ISURL("google.com"), true);
  assertEquals(ISURL("www.google.com"), true);
  assertEquals(ISURL("http://localhost"), true);
  assertEquals(ISURL("http://localhost/"), true);
  assertEquals(ISURL("https://10.1.1.255:8080"), true);
  assertEquals(ISURL("http://example.w3.org/path%20with%20spaces.html"), true);
  assertEquals(ISURL("http://example.w3.org/%20"), true);
  assertEquals(ISURL("ftp://ftp.is.co.za/rfc/rfc1808.txt"), true);
  assertEquals(ISURL("ftp://ftp.is.co.za/../../../rfc/rfc1808.txt"), true);
  assertEquals(ISURL("http://www.ietf.org/rfc/rfc2396.txt"), true);
  assertEquals(ISURL("ldap://[2001:db8::7]/c=GB?objectClass?one"), true);
  assertEquals(ISURL("mailto:ben.Me@example.com"), true);
  assertEquals(ISURL("news:comp.infosystems.www.servers.unix"), true);
  assertEquals(ISURL("tel:+1-816-555-1212"), true);
  assertEquals(ISURL("telnet://192.0.2.16:80/"), true);
  assertEquals(ISURL("urn:oasis:names:specification:docbook:dtd:xml:4.1.2"), true);
  catchAndAssertEquals(function() {
    ISURL.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("N", function(){
  assertEquals(N("10"), 10);
  assertEquals(N(10), 10);
  assertEquals(N(true), 1);
  assertEquals(N(false), 0);
  assertEquals(N(["10", "str"]), 10);
  catchAndAssertEquals(function() {
    NA.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ISREF", function(){
  assertEquals(ISREF("10"), false);
  assertEquals(ISREF(false), false);
  assertEquals(ISREF(new Cell("A1")), true);
  assertEquals(ISREF([new Cell("A1"), new Cell("A2"), new Cell("A3")]), true);
  catchAndAssertEquals(function() {
    ISREF.apply(this, []);
  }, ERRORS.NA_ERROR);
});

test("ERRORTYPE", function(){
  let errorCell = new Cell("A1");
  errorCell.setError(new NAError("error"));
  assertEquals(ERRORTYPE(new NullError("error")), 1);
  assertEquals(ERRORTYPE(new DivZeroError("error")), 2);
  assertEquals(ERRORTYPE(new ValueError("error")), 3);
  assertEquals(ERRORTYPE(new RefError("error")), 4);
  assertEquals(ERRORTYPE(new NameError("error")), 5);
  assertEquals(ERRORTYPE(new NumError("error")), 6);
  assertEquals(ERRORTYPE(new NAError("error")), 7);
  assertEquals(ERRORTYPE(errorCell), 7);
  catchAndAssertEquals(function() {
    ERRORTYPE.apply(this, []);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ERRORTYPE(10);
  }, ERRORS.NA_ERROR);
});


test("ISBLANK", function(){
  assertEquals(ISBLANK(10), false);
  assertEquals(ISBLANK([]), false);
  assertEquals(ISBLANK(undefined), true);
  assertEquals(ISBLANK(Cell.BuildFrom("A1", 10)), false);
  assertEquals(ISBLANK(new Cell("A1")), true);
  catchAndAssertEquals(function() {
    ISBLANK.apply(this, [])
  }, ERRORS.NA_ERROR);
});


test("ISERR", function(){
  let errorCell = new Cell("A1");
  errorCell.setError(new DivZeroError("err"));
  assertEquals(ISERR(errorCell), true);
  assertEquals(ISERR(Cell.BuildFrom("A1", 10)), false);
  assertEquals(ISERR(10), false);
  assertEquals(ISERR([]), true);
  assertEquals(ISERR(new NAError("error")), false);
  assertEquals(ISERR(new DivZeroError("error")), true);
  assertEquals(ISERR(new NameError("error")), true);
  assertEquals(ISERR(new RefError("error")), true);
  catchAndAssertEquals(function() {
    ISERR.apply(this, [])
  }, ERRORS.NA_ERROR);
});


test("ISERROR", function(){
  let errorCell = new Cell("A1");
  errorCell.setError(new DivZeroError("err"));
  assertEquals(ISERROR(errorCell), true);
  assertEquals(ISERROR(Cell.BuildFrom("A1", 10)), false);
  assertEquals(ISERROR(new Cell("A1")), false);
  assertEquals(ISERROR("10"), false);
  assertEquals(ISERROR(10), false);
  assertEquals(ISERROR([]), true);
  assertEquals(ISERROR(new NAError("error")), true);
  assertEquals(ISERROR(new DivZeroError("error")), true);
  assertEquals(ISERROR(new NameError("error")), true);
  assertEquals(ISERROR(new RefError("error")), true);
  catchAndAssertEquals(function() {
    ISERROR.apply(this, [])
  }, ERRORS.NA_ERROR);
});


test("ISNA", function(){
  let errorCell = new Cell("A1");
  errorCell.setError(new NAError("err"));
  assertEquals(ISNA(errorCell), true);
  assertEquals(ISNA(Cell.BuildFrom("A1", 10)), false);
  assertEquals(ISNA(new Cell("A1")), false);
  assertEquals(ISNA("10"), false);
  assertEquals(ISNA(10), false);
  assertEquals(ISNA([]), false);
  assertEquals(ISNA(new NAError("error")), true);
  assertEquals(ISNA(new DivZeroError("error")), false);
  assertEquals(ISNA(new NameError("error")), false);
  assertEquals(ISNA(new RefError("error")), false);
  catchAndAssertEquals(function() {
    ISNA.apply(this, [])
  }, ERRORS.NA_ERROR);
});


test("IFERROR", function(){
  let errorCell = new Cell("A1");
  errorCell.setError(new NAError("err"));
  assertEquals(IFERROR(errorCell, 10), 10);
  assertEquals(IFERROR(new NAError("err")), null);
  assertEquals(IFERROR(new NAError("err"), 10), 10);
  assertEquals(IFERROR(10), 10);
  assertEquals(IFERROR(10, false), 10);
  assertEquals(IFERROR(false, 10), false);
  assertEquals(IFERROR(Cell.BuildFrom("A1", 10), "abc"), Cell.BuildFrom("A1", 10));
  assertEquals(IFERROR(new Cell("A1")), new Cell("A1"));
  catchAndAssertEquals(function() {
    IFERROR.apply(this, []);
  }, ERRORS.NA_ERROR);
});


test("TYPE", function(){
  assertEquals(TYPE(44), 1);
  assertEquals(TYPE("str"), 2);
  assertEquals(TYPE(false), 4);
  assertEquals(TYPE(new NAError("err")), 16);
  assertEquals(TYPE([1, 2, 3]), 64);
  let errorCell = new Cell("A1");
  errorCell.setError(new NAError("err"));
  assertEquals(TYPE(errorCell), 16);
  assertEquals(TYPE(Cell.BuildFrom("A1", 1)), 1);
  assertEquals(TYPE(Cell.BuildFrom("A1", "string")), 2);
  assertEquals(TYPE(Cell.BuildFrom("A1", false)), 4);
  assertEquals(TYPE(new Cell("A1")), 1);
  catchAndAssertEquals(function() {
    TYPE.apply(this, [])
  }, ERRORS.NA_ERROR);
});


test("COLUMN", function(){
  assertEquals(COLUMN(new Cell("A1")), 1);
  assertEquals(COLUMN(new Cell("A2")), 1);
  assertEquals(COLUMN(new Cell("B1")), 2);
  assertEquals(COLUMN(new Cell("C1")), 3);
  catchAndAssertEquals(function() {
    COLUMN(10)
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    COLUMN.apply(this, [])
  }, ERRORS.NA_ERROR);
});

test("ROW", function(){
  assertEquals(ROW(new Cell("A1")), 1);
  assertEquals(ROW(new Cell("A2")), 2);
  assertEquals(ROW(new Cell("A3")), 3);
  assertEquals(ROW(new Cell("M3")), 3);
  catchAndAssertEquals(function() {
    ROW(10)
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ROW.apply(this, [])
  }, ERRORS.NA_ERROR);
});

test("ISFORMULA", function(){
  let c = new Cell("A1");
  c.setValue("=SUM(10, 10)");
  assertEquals(ISFORMULA(c), true);
  assertEquals(ISFORMULA(new Cell("M5")), false);
  catchAndAssertEquals(function() {
    ISFORMULA.apply(this, [])
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ISFORMULA(10);
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ISFORMULA("str");
  }, ERRORS.NA_ERROR);
  catchAndAssertEquals(function() {
    ISFORMULA([]);
  }, ERRORS.REF_ERROR);
  catchAndAssertEquals(function() {
    ISFORMULA(false);
  }, ERRORS.NA_ERROR);
});
