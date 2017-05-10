# Spreadsheet
TypeScript/javascript implementation of a spreadsheet.

## TODO
Things I should do.


### SUM and SUMA should be different.


### MAX and MAXA should be different.


### COUNT and COUNTA should be different.


### All formulas should used TypeConverter to pull parameters from `values`


### Criteria evaluations should escape reg-ex characters
http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex


### functions that throw errors should usually be able to include their caller in the error
e.g. "SUM expects number values...", or "This function expects number values..."


### Error formatting
Pass name of calling formula into all functions that throw user-facing errors, or have some sort of error mapper.


### Cells should have `formatAs` fields.
Instead of having non-primitives, (i.e. Date, DateTime, Time, Dollar), cells should have formats based on the
highest-order type that was used during the compilation and execution of a cell's dependency. For example, `DATE` might
return a number, but the cell that called `DATE` would be aware of it calling a formula that returns an non-primative
type, and would display the returned number as a Date. If you're using `DATE` in conjunction with `DOLLAR` it would
still display the returned value as a Date. The heirarhchy would look like: [Date, DateTime, Time, Dollar, number,
boolean, string]. Advantages to this would include not having to cast down when using primitive operators,
and flexibility in display. It would also simplify the types themselves, by having types be constants and just having
helpers to convert, display, and do normal operations with them.


### Implement TO_DATE, TO_NUMBER, TO_DOLLARS, TO_TEXT
Contingent upon cells having formats or types for primitives.


### Test all Date-related functions
Right now we're just using the number of days since 1900, but we should check the other functions.


### Verify that all N-times ({2,9}) are correct, and we're not parsing numbers too big.


### Percentage inputs should be parsed to numbers
Input like `10%` should be parsed and stored as a number.


### Sheet.ts and Helpers.ts should be check conversion capabilities in same way as TypeConverter
When we check to see if a value taken from a cell is of a certain type, we should check in the same way as the
TypeConverter.


### Scrape jsdocs for functions, put in simple index.html, doc.md files to serve up simple documentation


### Numbers with commas in them should still parse to numbers.


### Ensure all formulas are tested inside of SheetFormulaTest.ts


### Test all functions in src/Utilities


### CONVERT could offer more accurate conversions for units in the same system
For example 64 tbs to a qt.


### Sheet.ts and parser.js should be able to concatenate criteria and values
E.g. `=COUNTIFS(A7:A24, ">6", B7:B24, "<"&DATE(1969,7,20))`