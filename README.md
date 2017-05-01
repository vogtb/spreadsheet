# Spreadsheet
TypeScript/javascript implementation of a spreadsheet.

## TODO
Things I should do.

### SUM and SUMA should be different, and I'm pretty sure they're currently the same.
And the same for MAX, MAXA, COUNT, COUNTA, etc. Look these over.

### Criteria evaluations should escape reg-ex characters
http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

### functions that throw errors should usually be able to include their caller in the error
e.g. "SUM expects number values...", or "This function expects number values..."

### Dollar functions have special types
Although dollar functions look like they just format `number`s, it seems like they have a special type under the hood.
This means that we should do dollar->number casting in all casting functions. For now, just using number primitive.
See `DOLLAR` function for more info.

### Error formatting
Pass name of calling formula into all functions that throw user-facing errors, or have some sort of error mapper.

### Dates have special types
* Like dollars, dates are special types, but can be compared as if they're primitives. For example, this statement is
valid inside a cell: `=DATE(1992, 6, 6) > =DATE(1992, 6, 10)`. We should check types and and have Date-to-number
conversion inside parser.js.
* The same rule applies for time-types. It seems like under the hood, times are represented using a number between
0 and 1, exclusive on the end. When comparing them, this: `=TIME(12, 0, 0) = 0.5` evaluates to TRUE, and
`=TIME(12, 0, 0) <> 0.5` evaluates to FALSE.
* Furthermore, it appears that Cells themselves have types. If a cell contains `=TIME(12, 0, 0) + 0.1`, the result will
not be displayed as a decimal, but instead as a time, eg: "1:12:00 AM". However, you can force the application to display it as
a different type.
* The automatic display type for a Cell seems to be inherited from it's most complex type: [ExcelDate, ExcelTime,
number, boolean, string].

### Test all ExcelDate functions
Right now we're just using the number of days since 1900, but we should check the other functions.

### Verify that all N-times ({2,9}) are correct, and we're not parsing numbers too big.

### Scrape jsdocs for functions, put in simple index.html, doc.md files to serve up simple documentation

### Numbers with commas in them should still parse to numbers.

### Ensure all formulas are tested inside of SheetFormulaTest.ts

### Test all functions in src/Utilities

### Sheet.ts and parser.js should be able to concatenate strings
E.g. `=COUNTIFS(A7:A24, ">6", B7:B24, "<"&DATE(1969,7,20))`