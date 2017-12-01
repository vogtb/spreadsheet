# TODO


### Cells should have `formatAs` fields.
Instead of having non-primitives, (i.e. Date, DateTime, Time, Dollar), cells should have formats based on the highest-order type that was used during the compilation and execution of a cell's dependency. For example, `DATE` might return a number, but the cell that called `DATE` would be aware of it calling a formula that returns an non-primitive type, and would display the returned number as a Date. If you're using `DATE` in conjunction with `DOLLAR` it would still display the returned value as a Date. The hierarchy would look like: [Date, DateTime, Time, Dollar, number, boolean, string]. Advantages to this would include not having to cast down when using primitive operators, and flexibility in display. It would also simplify the types themselves, by having types be constants and just having helpers to convert, display, and do normal operations with them. Requires changes to `TO_DATE`, `TO_PERCENT`, `TO_DOLLAR`, and `TO_TEXT`.


### CONVERT could offer more accurate conversions for units in the same system
For example 64 tbs to a qt.


### Range literals should be allow to follow commas
Currently, this `=SERIESSUM([1], [0], [1], [4, 5, 6])` parses, but this `=SERIESSUM(1, 0, 1, [4, 5, 6])` does not.


### Parser/Sheet should be able to be initialized with js range notation (`[]`) or regular range notation (`{}`)


### TypeConverter.stringToDateNumber should handle fractions of a second.
E.g. `01/09/2012 10:04:33.123`


### TypeConverter should be able to convert timestamps to numbers.
E.g. `12:00:00` should result in `0.5`.


### Parser should be able to parse arrays without `eval`
Right now, arrays and reference literals in a formula are parsed using JS `eval`. This means, if we have references inside, or non-JS parsing values like TRUE or FALSE, they will cause ReferenceErrors. For example, `=SUM([M1, 10])` would throw `[ReferenceError: M1 is not defined]` because M1 is not a variable. Instead of using `eval`, we should parse the opening of an array, and the closeing of an array, and use recursion to see how deep we are, evaluating the tokens inside in the sam way we parse formulas and functions.


### Meta-Formulas to write
Many of these formulas can be written by allowing the Sheet and Parser to return Cell objects in addition to primitive types. There are some memory issues with doing this. If a user calls something like `ISNA(A1:A99999)` we really only need the first cell. So we should return cell objects in some cases, but it would be easier in most cases to have context aware formulas, so if they need a cell, or a reference, we simply skip looking up a reference, and instead return a reference, or just a single cell. One way to do this would be to have formula functions, and then on the side have formula args. So before we lookup a large range of cells, we can check to see if it needs all of them, or if it just cares about the first one. So for `ISNA` we could look at `FormulaArgs.ISNA[0]` to get `Value` so we know that it needs only a single argument that is not an array, so if we call it with `ISNA(A1:A99999)`, it would really only lookup `A1`. This might be premature optimization however.

* CELL - Requires changes to Parser/Sheet so that the raw cell is returned to the function. The raw cell should contain all information necessary for returning specified info.
* HLOOKUP
* INDEX
* INDIRECT
* LOOKUP
* MATCH
* OFFSET
* VLOOKUP
* COUNTBLANK - Requires changes to to Parser/Sheet so when we iterate through a range to return an array, we call a special function that accumulates all values, blank/null/undefined or otherwise.


### Easy formulas to write
* REGEXEXTRACT - May be difficult considering language differences.
* REGEXMATCH - May be difficult considering language differences.
* REGEXREPLACE - May be difficult considering language differences.

### Other formulas to write
* CRITBINOM
* F.DIST.RT
* LOGINV
* T.INV
* T.INV.2T
* TINV
* TTEST
* FINDB
* SEARCHB
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
* INTRATE
* PRICE
* PRICEDISC
* PRICEMAT
* RECEIVED
* YIELD
