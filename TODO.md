# TODO


### Cells should have `formatAs` fields.
Instead of having non-primitives, (i.e. Date, DateTime, Time, Dollar), cells should have formats based on the highest-order type that was used during the compilation and execution of a cell's dependency. For example, `DATE` might return a number, but the cell that called `DATE` would be aware of it calling a formula that returns an non-primitive type, and would display the returned number as a Date. If you're using `DATE` in conjunction with `DOLLAR` it would still display the returned value as a Date. The hierarchy would look like: [Date, DateTime, Time, Dollar, number, boolean, string]. Advantages to this would include not having to cast down when using primitive operators, and flexibility in display. It would also simplify the types themselves, by having types be constants and just having helpers to convert, display, and do normal operations with them.


### Sheet should automatically parse some values, unless told otherwises.
When entering raw values into cells, if the value is a string, the Sheet should automatically attempt to convert to a number. For example, `= 10e2` should be be evaluated with a RegEx and converted to a number. See `Sheet.helper.number`.


### Parser should be able to detect arrays following numbers when passing in arguments.
For example the CHOOSE formula can't be parsed: `=CHOOSE(2, [1, 2, 3])`.


### Cell.rawFormulaText does not get reset when updating a cell for the second time.


### CONVERT could offer more accurate conversions for units in the same system
For example 64 tbs to a qt.


### Fix documentation regular expression, it is butchering URLs.


### Formulas to write

* ERROR.TYPE - Requires changes to parser.js
* ISBLANK - Requires changes to parser.js
* ISERR - Requires changes to parser.js
* ISERROR - Requires changes to parser.js
* ISFORMULA - Requires changes to parser.js
* ISNA - Requires changes to parser.js
* ISREF - Requires changes to parser.js
* N
* TYPE - Requires changes to parser.js
* CELL - Requires changes to parser.js
* IFERROR - Requires changes to parser.js
* ADDRESS - Requires changes to parser.js
* COLUMN - Requires changes to parser.js
* COLUMNS - Requires changes to parser.js
* HLOOKUP - Requires changes to parser.js
* INDEX - Requires changes to parser.js
* INDIRECT - Requires changes to parser.js
* LOOKUP - Requires changes to parser.js
* MATCH - Requires changes to parser.js
* OFFSET - Requires changes to parser.js
* ROW - Requires changes to parser.js
* ROWS - Requires changes to parser.js
* VLOOKUP - Requires changes to parser.js
* COUNTBLANK - Requires changes to parser.js
* MULTINOMIAL
* SERIESSUM
* SUBTOTAL
* UNARY_PERCENT
* TO_DATE - Contingent upon cells having display formats derived from type-hierarchy
* TO_DOLLARS - Contingent upon cells having display formats derived from type-hierarchy
* TO_PERCENT - Contingent upon cells having display formats derived from type-hierarchy
* TO_TEXT - Contingent upon cells having display formats derived from type-hierarchy
* BINOMDIST
* CONFIDENCE
* COVAR
* CRITBINOM
* F.DIST.RT
* GEOMEAN
* HARMEAN
* HYPGEOMDIST
* LOGINV
* LOGNORMDIST
* MODE
* NEGBINOMDIST
* NORMDIST
* NORMINV
* NORMSDIST
* PERMUT
* PROB
* RANK
* RANK.AVG
* RANK.EQ
* RSQ
* SKEW
* STEYX
* T.INV
* T.INV.2T
* TDIST
* TINV
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
* VALUE
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
* FVSCHEDULE
* INTRATE
* PPMT - Similar to PMT, which is already written.
* PRICE
* PRICEDISC
* PRICEMAT
* PV
* RATE
* RECEIVED
* YIELD
