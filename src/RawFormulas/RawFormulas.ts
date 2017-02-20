/// <reference path="../../node_modules/moment/moment.d.ts"/>
import * as moment from "moment";
import * as Formula from "formulajs"
import {
  ABS,
  ACOS,
  ACOSH,
  ACOTH,
  ARABIC,
  ASIN,
  ASINH,
  ATAN,
  ATAN2,
  ATANH,
  COT,
  COTH,
  COSH,
  COS,
  COUNTUNIQUE,
  DEVSQ,
  DB,
  DDB,
  EFFECT,
  EVEN,
  ERF,
  ERFC,
  EXPONDIST,
  FDIST$LEFTTAILED,
  FINV,
  FISHER,
  FISHERINV,
  INT,
  ISEVEN,
  ISODD,
  MAX,
  MAXA,
  MIN,
  MINA,
  MOD,
  ODD,
  SIN,
  SINH,
  SUM,
  SQRT,
  SQRTPI,
  PI,
  POWER,
  LOG,
  LOG10,
  LN,
  TAN,
  TANH,
  AVERAGEIF,
  ROUND,
  ROUNDDOWN,
  ROUNDUP,
  SUMPRODUCT,
  SUMIF,
  SUMSQ,
  SUMX2MY2,
  SUMX2PY2,
  FLOOR,
  IF,
  DELTA,
  COUNT,
  COUNTA,
  COUNTIF,
  COUNTIFS,
  CEILING,
  TRUNC,
  RADIANS,
  DEGREES,
  COMBIN
} from "./Math";
import {
  AND,
  EXACT,
  TRUE,
  FALSE,
  NOT,
  OR,
  XOR
} from "./Logical";
import {
  CHAR,
  CODE,
  SPLIT,
  CONCATENATE,
  BIN2DEC,
  BIN2HEX,
  BIN2OCT,
  DEC2BIN,
  DEC2HEX,
  DEC2OCT
} from "./Misc";
import {
  DOLLAR,
  DOLLARDE,
  DOLLARFR
} from "./Financial";
import {
  AVERAGE,
  AVERAGEA,
  AVEDEV,
  CORREL,
  PEARSON,
  MEDIAN
} from "./Statistical";

import {
  CriteriaFunctionFactory,
  ArgsChecker,
  Filter,
  TypeCaster,
  Serializer
} from "./Utils";
import {
  CellError
} from "../Errors"
import * as ERRORS from "../Errors"

var ACCRINT = Formula["ACCRINT"];
var CONVERT = Formula["CONVERT"];
var CUMIPMT = Formula["CUMIPMT"];
var CUMPRINC = Formula["CUMPRINC"];
var DATE = Formula["DATE"];
var DATEVALUE = function (dateString: string) : Date {
  return new Date(dateString);
};
var DAY = Formula["DAY"];
var DAYS = Formula["DAYS"];
var DAYS360 = Formula["DAYS360"];
var EDATE = function (start_date: Date, months) {
  return moment(start_date).add(months, 'months').toDate();
};
var EOMONTH = function (start_date, months) {
  var edate = moment(start_date).add(months, 'months');
  return new Date(edate.year(), edate.month(), edate.daysInMonth());
};
var YEARFRAC = Formula["YEARFRAC"];


// Using alias to bind dot-notation function names.
var __COMPLEX = {
  "F.DIST": FDIST$LEFTTAILED
};

export {
  __COMPLEX,

  ABS,
  ACOS,
  ACCRINT,
  ACOSH,
  ACOTH,
  AND,
  ARABIC,
  ASIN,
  ASINH,
  ATAN,
  ATAN2,
  ATANH,
  AVEDEV,
  AVERAGE,
  AVERAGEA,
  AVERAGEIF,
  BIN2DEC,
  BIN2HEX,
  BIN2OCT,
  CEILING,
  CHAR,
  CODE,
  COMBIN,
  CONCATENATE,
  CONVERT,
  CORREL,
  PEARSON,
  COS,
  PI,
  COSH,
  COT,
  COTH,
  COUNT,
  COUNTA,
  COUNTIF,
  COUNTIFS,
  COUNTUNIQUE,
  CUMIPMT,
  CUMPRINC,
  DATE,
  DATEVALUE,
  DAY,
  DAYS,
  DAYS360,
  DB,
  DDB,
  DEC2BIN,
  DEC2HEX,
  DEC2OCT,
  DEGREES,
  DELTA,
  DEVSQ,
  DOLLAR,
  DOLLARDE,
  DOLLARFR,
  EDATE,
  EFFECT,
  EOMONTH,
  ERF,
  ERFC,
  EVEN,
  EXACT,
  EXPONDIST,
  FALSE,
  FINV,
  FISHER,
  FISHERINV,
  FLOOR,
  IF,
  INT,
  ISEVEN,
  ISODD,
  LN,
  LOG,
  LOG10,
  MAX,
  MAXA,
  MEDIAN,
  MIN,
  MINA,
  MOD,
  TRUE,
  NOT,
  ODD,
  OR,
  POWER,
  ROUND,
  ROUNDDOWN,
  ROUNDUP,
  SIN,
  SINH,
  SPLIT,
  SQRT,
  SQRTPI,
  SUM,
  SUMIF,
  SUMPRODUCT,
  SUMSQ,
  SUMX2MY2,
  SUMX2PY2,
  TAN,
  TANH,
  TRUNC,
  XOR,
  YEARFRAC,
  RADIANS
}