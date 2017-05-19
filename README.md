# Spreadsheet
TypeScript/javascript implementation of a spreadsheet.

## TODO
Things I should do.


### SUM and SUMA should be different.


### MAX and MAXA should be different.


### COUNT and COUNTA should be different.


### Cells should have `formatAs` fields.
Instead of having non-primitives, (i.e. Date, DateTime, Time, Dollar), cells should have formats based on the
highest-order type that was used during the compilation and execution of a cell's dependency. For example, `DATE` might
return a number, but the cell that called `DATE` would be aware of it calling a formula that returns an non-primitive
type, and would display the returned number as a Date. If you're using `DATE` in conjunction with `DOLLAR` it would
still display the returned value as a Date. The heirarhchy would look like: [Date, DateTime, Time, Dollar, number,
boolean, string]. Advantages to this would include not having to cast down when using primitive operators,
and flexibility in display. It would also simplify the types themselves, by having types be constants and just having
helpers to convert, display, and do normal operations with them.


### Implement TO_DATE, TO_NUMBER, TO_DOLLARS, TO_TEXT
Contingent upon cells having formats or types for primitives.


### Verify that all N-times ({2,9}) are correct, and we're not parsing numbers too big inside Date formulas.


### Scrape jsdocs for functions, put in simple index.html, doc.md files to serve up simple documentation


### CONVERT could offer more accurate conversions for units in the same system
For example 64 tbs to a qt.
