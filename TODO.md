# TODO


### Cells should have `formatAs` fields.
Instead of having non-primitives, (i.e. Date, DateTime, Time, Dollar), cells should have formats based on the highest-order type that was used during the compilation and execution of a cell's dependency. For example, `DATE` might return a number, but the cell that called `DATE` would be aware of it calling a formula that returns an non-primitive type, and would display the returned number as a Date. If you're using `DATE` in conjunction with `DOLLAR` it would still display the returned value as a Date. The hierarchy would look like: [Date, DateTime, Time, Dollar, number, boolean, string]. Advantages to this would include not having to cast down when using primitive operators, and flexibility in display. It would also simplify the types themselves, by having types be constants and just having helpers to convert, display, and do normal operations with them.


### Sheet should automatically parse some values, unless told otherwise.
When entering raw values into cells, if the value is a string, the Sheet should automatically attempt to convert to a number. For example, `= 10e2` should be be evaluated with a RegEx and converted to a number. See `Sheet.helper.number`.


### Parser should be able to detect arrays following numbers when passing in arguments.
For example the CHOOSE formula can't be parsed: `=CHOOSE(2, [1, 2, 3])`.


### Cell.rawFormulaText does not get reset when updating a cell for the second time.


### CONVERT could offer more accurate conversions for units in the same system
For example 64 tbs to a qt.


### Raw input of errors should be allowed.
For example `=#N/A` should force an error to be thrown inside the cell.


### Fix documentation regular expression, it is butchering URLs.


### Meta-Formulas to write
In general, many of these formulas can be written by allowing the Sheet and Parser to return Cell objects in addition to primitive types.

* ISREF - Should be handled at a Parser/Sheet level. If the Parser or Sheet is able to fetch a cell -- even if it's empty -- this function should return true.
* ERROR.TYPE - Fetch actual cell to check for error, which requires changes in Parser and Sheet. If the returned cell doesn't have an error, then it should throw NA.
* ISBLANK - Requires changes to Parser/Sheet. If we fetch a cell, and it is "blank", return true. Could be implemented by adding a field to cells indicating if they're blank. Right now empty cells are causing errors because they don't exist. We should allow users to fetch empty cells, they should just be considered blank, or undefined, or null.
* ISERR - Requires changes to Parser/Sheet to either wrap enclosed functions in try-catch, or fetch actual cell value, and check it's error field.
* ISERROR - See ISERR.
* ISFORMULA - Requires changes to Parser/Sheet to fetch a cell, and check the formula field to see if it contains a formula.
* ISNA - Requires changes to Parser/Sheet for similar reasons to ISERR; check reference cell value or error field.
* TYPE - Requires changes to Parser/Sheet to allow for values or cells to be returned to the function. If it's a value, return the value type. If it's a cell, return the value or error inside it.
* CELL - Requires changes to Parser/Sheet so that the raw cell is returned to the function. The raw cell should contain all information necessary for returning specified info.
* IFERROR - Requires changes to Parser/Sheet for similar reasons to ISERR.
* ADDRESS - Requires changes to Parser/Sheet
* COLUMN - Requires changes to Parser/Sheet
* COLUMNS - Requires changes to Parser/Sheet
* HLOOKUP - Requires changes to Parser/Sheet
* INDEX - Requires changes to Parser/Sheet
* INDIRECT - Requires changes to Parser/Sheet
* LOOKUP - Requires changes to Parser/Sheet
* MATCH - Requires changes to Parser/Sheet
* OFFSET - Requires changes to Parser/Sheet
* ROW - Requires changes to Parser/Sheet
* ROWS - Requires changes to Parser/Sheet
* VLOOKUP - Requires changes to Parser/Sheet
* COUNTBLANK - Requires changes to to Parser/Sheet so when we iterate through a range to return an array, we call a special function that accumulates all values, black/null/undefined or otherwise.

### Formulas to write
* SERIESSUM
* SUBTOTAL
* TO_DATE - Contingent upon cells having display formats derived from type-hierarchy
* TO_DOLLARS - Contingent upon cells having display formats derived from type-hierarchy
* TO_PERCENT - Contingent upon cells having display formats derived from type-hierarchy
* TO_TEXT - Contingent upon cells having display formats derived from type-hierarchy
* CRITBINOM
* F.DIST.RT
* HYPGEOMDIST
* LOGINV
* LOGNORMDIST
* MODE
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
