# Spreadsheet
TypeScript implementation of a spreadsheet.

## TODO
Things I should do.

### SUM and SUMA should be different, and I'm pretty sure they're currently the same.
And the same for MAX, MAXA, COUNT, COUNTA, etc. Look these over.

### Criteria evaluations should escape reg-ex characters
http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

### Document the functions pulled in from jStat.

### Double check all relevant formulas from MSExcel and GS have been implemented.

### Refactor the way tests are organized.
Group by error type and have some useful functions that will call with 0, N, N+1 args to test the args
checker. Also, test for *all possible* errors that could be thrown, and *all possible types* that could be passed in.
Another thing to think about would be throwing custom errors if an object is passed in.

### jStat functions should know their caller
Either through `arguments`, or directly passed in like `mean("FORMULA", [10, 20, 30])`

### Dollar functions have special types
Although dollar functions look like they just format `number`s, it seems like they have a special type under the hood.
This means that we should do dollar->number casting in all casting functions. For now, just using number primitive.
See `DOLLAR` function for more info.

### Get a better way to tie formulas into single export
Listing them inside RawFormulas.ts is unwieldy.

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

### Scrape jsdocs from functions, put in simple index.html, doc.md files to serve up simple documentation

### Numbers with commas in them should still parse to numbers.


## Testing Guidelines

All formulas should test for:
1) One *less* argument than the formula expects, and one *more* argument than the formula expects.
2) If it accepts a number, test with false as 0, and true as 1.
3) If it accepts a number, test with string parsing to number.
4) If it accepts a date, test with number, number as string, date as string.
5) Individual arguments as ranges with single values (eg: `[1]`), and ranges as multiple values (eg: `[1, "str"]`).
