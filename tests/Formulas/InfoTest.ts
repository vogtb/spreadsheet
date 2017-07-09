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
  ISBLANK
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
  var errorCell = new Cell("A1");
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
