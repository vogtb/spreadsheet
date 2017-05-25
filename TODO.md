# TODO


### Cells should have `formatAs` fields.
Instead of having non-primitives, (i.e. Date, DateTime, Time, Dollar), cells should have formats based on the highest-order type that was used during the compilation and execution of a cell's dependency. For example, `DATE` might return a number, but the cell that called `DATE` would be aware of it calling a formula that returns an non-primitive type, and would display the returned number as a Date. If you're using `DATE` in conjunction with `DOLLAR` it would still display the returned value as a Date. The hierarchy would look like: [Date, DateTime, Time, Dollar, number, boolean, string]. Advantages to this would include not having to cast down when using primitive operators, and flexibility in display. It would also simplify the types themselves, by having types be constants and just having helpers to convert, display, and do normal operations with them.


### Cell.rawFormulaText does not get reset when updating a cell for the second time.


### CONVERT could offer more accurate conversions for units in the same system
For example 64 tbs to a qt.


### Formulas to write

* ERROR.TYPE
* ISBLANK
* ISEMAIL
* ISERR
* ISERROR
* ISFORMULA
* ISLOGICAL
* ISNA
* ISNONTEXT
* ISNUMBER
* ISREF
* ISTEXT
* ISURL
* N
* NA
* TYPE
* CELL
* IFERROR
* ADDRESS
* CHOOSE
* COLUMN
* COLUMNS
* HLOOKUP
* INDEX
* INDIRECT
* LOOKUP
* MATCH
* OFFSET
* ROW
* ROWS
* VLOOKUP
* COUNTBLANK
* FACTDOUBLE
* GAMMALN
* GCD
* LCM
* MROUND
* MULTINOMIAL
* PRODUCT
* QUOTIENT
* SERIESSUM
* SUBTOTAL
* DIVIDE
* EQ
* GT
* GTE
* LT
* LTE
* NE
* UMINUS
* UNARY_PERCENT
* UPLUS
* TO_DATE - Contingent upon cells having display formats derived from type-hierarchy
* TO_DOLLARS - Contingent upon cells having display formats derived from type-hierarchy
* TO_PERCENT - Contingent upon cells having display formats derived from type-hierarchy
* TO_TEXT - Contingent upon cells having display formats derived from type-hierarchy
* BINOMDIST
* CONFIDENCE
* COVAR
* CRITBINOM
* F.DIST.RT
* FORECAST
* GEOMEAN
* HARMEAN
* HYPGEOMDIST
* INTERCEPT
* KURT
* LARGE
* LOGINV
* LOGNORMDIST
* MODE
* NEGBINOMDIST
* NORMDIST
* NORMINV
* NORMSDIST
* NORMSINV
* PERCENTILE
* PERCENTRANK
* PERCENTRANK.EXC
* PERCENTRANK.INC
* PERMUT
* POISSON
* PROB
* QUARTILE
* RANK
* RANK.AVG
* RANK.EQ
* RSQ
* SKEW
* SLOPE
* SMALL
* STANDARDIZE
* STDEV
* STDEVA
* STDEVP
* STDEVPA
* STEYX
* T.INV
* T.INV.2T
* TDIST
* TINV
* TRIMMEAN
* TTEST
* VAR
* VARA
* VARP
* VARPA
* WEIBULL
* ZTEST
* CLEAN
* FIND
* FINDB
* JOIN
* LEFT
* LEN
* LOWER
* MID
* PROPER
* REGEXEXTRACT - May be difficult considering language differences.
* REGEXMATCH - May be difficult considering language differences.
* REGEXREPLACE - May be difficult considering language differences.
* REPLACE
* REPT
* RIGHT
* ROMAN
* SEARCH
* SEARCHB
* SPLIT
* SUBSTITUTE
* T
* TEXT
* TRIM
* UPPER
* VALUE
* FREQUENCY
* GROWTH
* LINEST
* LOGEST
* MDETERM
* MINVERSE
* MMULT
* TRANSPOSE - Depends on distinguishing between RowArray and ColumnArray.
* TREND
* FILTER
* SORT
* COUPDAYBS
* COUPDAYS
* COUPDAYSNC
* COUPNCD
* COUPNUM
* COUPPCD
* DISC
* DURATION
* FV - already written as a private function, needs to be re-written.
* FVSCHEDULE
* INTRATE
* IPMT
* IRR
* MIRR
* NOMINAL
* NPER
* NPV
* PPMT - Similar to PMT, which is already written.
* PRICE
* PRICEDISC
* PRICEMAT
* PV
* RATE
* RECEIVED
* SLN
* SYD
* YIELD


