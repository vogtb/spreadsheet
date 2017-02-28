# Spreadsheet
TypeScript implementation of a spreadsheet.

## TODO
Things I should do.

### SUM and SUMA should be different, and I'm pretty sure they're currently the same.
And the same for MAX, MAXA, COUNT, COUNTA, etc. Look these over.

### Date-Time issues
Here are a couple of the issues with Dates and so on:
* There seem to be a few issues where someone did something sloppy inside formulaJS, and timezones, daylight-savings,
and leap years are being taken into account when they shouldn't be. For now I think I should just let it go.
The resulting errors from these bugs aren't that bad. I'll mark them down, and investigate them individually.

### Protect against injection
How do we protect against users injecting data that looks like `console.log(sensitive_data)` when we evaluate variables
inside parser.js? If we ever want to impliment custom formulas, or even accept data in raw format, we need to guard
against this. Or else someone could load a CSV with javascript and when our spreadsheet opens it, then suddenly
arbitrary javascript is executed in the client machine.

### Criteria evaluations should accept "<>"

### Criteria evaluations should escape reg-ex characters: http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex

### Criteria evaluations should accept dollar-to-number comparisons: `=COUNTIF({10, 20, 40}, ">=$20")`

### License for all code used.

### Document the functions pulled in from jStat.

### Bring back missing Excel functions
* COVARIANCEP
* COVARIANCES
* ...etc.

### Refactor the way we construct and throw errors
For example, the mis-matched argument length errors are all generated the same way.

### Refactor the way tests are organized.
Group by error type and have some useful functions that will call with 0, N, N+1 args to test the args
checker. Also, test for *all possible* errors that could be thrown, and *all possible types* that could be passed in.
Another thing to think about would be throwing custom errors if an object is passed in.

### DIV_ZERO Error
This error is thrown every time we're about to divide by zero in a formula. There are definitely a couple formulas that
don't check for this, and they should.

### jStat functions should know their caller
Either through `arguments`, or directly passed in like `mean("FORMULA", [10, 20, 30])`

### Dollar functions have special types
Although dollar functions look like they just format `number`s, it seems like they have a special type under the hood.
This means that we should do dollar->number casting in all casting functions. For now, just using number primitive.
See `DOLLAR` function for more info.

### Dates have special types
Like dollars, dates are special types, but can be compared as if they're primatives. For example, this statement is
valid inside a cell: `=DATE(1992, 6, 6) > =DATE(1992, 6, 10)`. We should check types and and have Date-to-number
conversion inside parser.js.

### `DATE` should use "roll-over" input handling
When handling input like DATE(1992, 1, 44), we should use momentjs's `add('days', 44)` to build up to the correct date.
