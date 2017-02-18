import * as Formula from "formulajs"
import * as RawFormulas from "./RawFormulas/RawFormulas";

const SUPPORTED_FORMULAS = [
  'ABS', 'ACCRINT', 'ACOS', 'ACOSH', 'ACOTH', 'AND', 'ARABIC', 'ASIN', 'ASINH', 'ATAN', 'ATAN2', 'ATANH', 'AVEDEV', 'AVERAGE', 'AVERAGEA', 'AVERAGEIF',
  'BIN2DEC', 'BIN2HEX', 'BIN2OCT', 'BINOMDIST',
  'CEILING', 'CHAR', 'CODE', 'COMBIN', 'COMBINA', 'COMPLEX', 'CONCATENATE', 'CONFIDENCE', 'CONVERT', 'CORREL', 'COS', 'COSH', 'COT', 'COTH', 'COUNT', 'COUNTA', 'COUNTBLANK', 'COUNTIF', 'COUNTIFS', 'COUNTUNIQUE', 'COVARIANCEP', 'COVARIANCES', 'CUMIPMT', 'CUMPRINC',
  'DATE', 'DATEVALUE', 'DAY', 'DAYS', 'DAYS360', 'DB', 'DDB', 'DEC2BIN', 'DEC2HEX', 'DEC2OCT', 'DEGREES', 'DELTA', 'DEVSQ', 'DOLLAR', 'DOLLARDE', 'DOLLARFR',
  'E', 'EDATE', 'EFFECT', 'EOMONTH', 'ERF', 'ERFC', 'EVEN', 'EXACT', 'EXPONDIST',
  'FALSE', 'FDIST', 'FINV', 'FISHER', 'FISHERINV',
  'IF', 'INT', 'ISEVEN', 'ISODD',
  'LN', 'LOG', 'LOG10',
  'MAX', 'MAXA', 'MEDIAN', 'MIN', 'MINA', 'MOD',
  'NOT',
  'ODD', 'OR',
  'PI', 'POWER',
  'ROUND', 'ROUNDDOWN', 'ROUNDUP',
  'SIN', 'SINH', 'SPLIT', 'SQRT', 'SQRTPI', 'SUM', 'SUMIF', 'SUMIFS', 'SUMPRODUCT', 'SUMSQ', 'SUMX2MY2', 'SUMX2PY2', 'SUMXMY2',
  'TAN', 'TANH', 'TRUE', 'TRUNC',
  'XOR'
];

var Formulas = {
  exists: function(fn: string) {
    return (SUPPORTED_FORMULAS.indexOf(fn) > -1 || (fn in RawFormulas) || (fn in RawFormulas.__COMPLEX));
  },
  get: function(fn: string) {
    if (fn in RawFormulas) {
      return RawFormulas[fn];
    }
    if (fn in RawFormulas.__COMPLEX) {
      return RawFormulas.__COMPLEX[fn];
    }
    return Formula[fn];
  }
};

export {
  Formulas
}