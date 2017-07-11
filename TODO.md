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


### Formula's use of type-conversion could be standardized
We could give each function a type-array that matches the arguments, and could be used to map to the TypeConverter functions. For example if a formula looks like `THING(a: number, b: string, c: array<numbers>)` it could have a property called `typeArray = ["number", "string", "array<numbers>"]` and then for each argument it uses a map to see which TypeConverter function it should use to ensure type on those arguments. This would allow us to test these type-converters more efficiently, rather than testing to be sure each formula converted the types properly.


### Fix documentation regular expression, it is butchering URLs.


### ERROR.TYPE, ISERR, ISERROR, ISNA need to be called inside a try-catch-block inside the Parser or Sheet.
See documentation for ERROR.TYPE for more information.


### Meta-Formulas to write
Many of these formulas can be written by allowing the Sheet and Parser to return Cell objects in addition to primitive types. There are some memory issues with doing this. If a user calls something like `ISNA(A1:A99999)` we really only need the first cell. So we should return cell objects in some cases, but it would be easier in most cases to have context aware formulas, so if they need a cell, or a reference, we simply skip looking up a reference, and instead return a reference, or just a single cell. One way to do this would be to have formula functions, and then on the side have formula args. So before we lookup a large range of cells, we can check to see if it needs all of them, or if it just cares about the first one. So for `ISNA` we could look at `FormulaArgs.ISNA[0]` to get `Value` so we know that it needs only a single argument that is not an array, so if we call it with `ISNA(A1:A99999)`, it would really only lookup `A1`. This might be premature optimization however.

* ISFORMULA - Requires changes to Parser/Sheet to fetch a cell, and check the formula field to see if it contains a formula.
* CELL - Requires changes to Parser/Sheet so that the raw cell is returned to the function. The raw cell should contain all information necessary for returning specified info.
* ADDRESS - In order to implement this, cells need to be aware of their sheet.
* COLUMNS
* HLOOKUP
* INDEX
* INDIRECT
* LOOKUP
* MATCH
* OFFSET
* ROWS
* VLOOKUP
* COUNTBLANK - Requires changes to to Parser/Sheet so when we iterate through a range to return an array, we call a special function that accumulates all values, blank/null/undefined or otherwise.


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
* SUBSTITUTE
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
* PRICE
* PRICEDISC
* PRICEMAT
* PV
* RATE
* RECEIVED
* YIELD
