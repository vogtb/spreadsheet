# Spreadsheet
TypeScript implementation of a spreadsheet.

## TODO
Things I should do.

### SUM and SUMA should be different, and I'm pretty sure they're currently the same.
And the same for MAX, MAXA, COUNT, COUNTA, etc. Look these over.

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



# The Great Date Refactoring (TM)

### List of possible dates that we should be able to parse
 * "1999/1/13"                    DONE
 * "1999-1-13"
 * "1999 1 13"
 * "1999.1.13"
 * "1999, 1, 13"
 * "1/13/1999"                    DONE
 * "1-13-1999"
 * "1 13 1999"
 * "1.13.1999"
 * "1, 13, 1999"
 * "1999/1/13 10am"               DONE
 * "1999-1-13 10am"
 * "1999 1 13 10am"
 * "1999.1.13 10am"
 * "1999/1/13 10:22"              DONE
 * "1999-1-13 10:22"
 * "1999 1 13 10:22"
 * "1999.1.13 10:22"
 * "1999/1/13 10:10am"            DONE
 * "1999-1-13 10:10am"
 * "1999 1 13 10:10am"
 * "1999.1.13 10:10am"
 * "1999/1/13 10:10:10"           DONE
 * "1999-1-13 10:10:10"
 * "1999 1 13 10:10:10"
 * "1999.1.13 10:10:10"
 * "1999/1/13 10:10:10pm"         DONE
 * "1999-1-13 10:10:10pm"
 * "1999 1 13 10:10:10pm"
 * "1999.1.13 10:10:10pm"
 * "Sun Feb 09 2017"              DONE
 * "Sun Feb 09 2017 10am"
 * "Sun Feb 09 2017 10:10"
 * "Sun Feb 09 2017 10:10am"
 * "Sun Feb 09 2017 10:10:10"
 * "Sun Feb 09 2017 10:10:10pm"
 * "Sun 09 Feb 2017"              DONE
 * "Sun 09 Feb 2017 10am"
 * "Sun 09 Feb 2017 10:10"
 * "Sun 09 Feb 2017 10:10am"
 * "Sun 09 Feb 2017 10:10:10"
 * "Sun 09 Feb 2017 10:10:10pm"
 * "Feb-2017"                     DONE
 * "Feb-2017 10am"
 * "Feb-2017 10:10"
 * "Feb-2017 10:10am"
 * "Feb-2017 10:10:10"
 * "Feb-2017 10:10:10pm"
 * "Feb 22"                       DONE
 * "Feb 22 10am"
 * "Feb 22 10:10"
 * "Feb 22 10:10am"
 * "Feb 22 10:10:10"
 * "Feb 22 10:10:10pm"
 * "22-Feb"                       DONE
 * "22-Feb 10am"
 * "22-Feb 10:10"
 * "22-Feb 10:10am"
 * "22-Feb 10:10:10"
 * "22-Feb 10:10:10pm"
 * "22-Feb-2017"
 * "22-Feb-2017 10am"
 * "22-Feb-2017 10:10"
 * "22-Feb-2017 10:10am"
 * "22-Feb-2017 10:10:10"
 * "22-Feb-2017 10:10:10pm"
 * "10-22"
 * "10-22 10am"
 * "10-22 10:10"
 * "10-22 10:10am"
 * "10-22 10:10:10"
 * "10-22 10:10:10pm"
 * "10/2022"
 * "10-2022 10am"
 * "10-2022 10:10"
 * "10-2022 10:10am"
 * "10-2022 10:10:10"
 * "10-2022 10:10:10pm"

* Dates have special types
Like dollars, dates are special types, but can be compared as if they're primatives. For example, this statement is
valid inside a cell: `=DATE(1992, 6, 6) > =DATE(1992, 6, 10)`. We should check types and and have Date-to-number
conversion inside parser.js.

* Organize tests in a way that makes sense.
Annotate them, and standardize the error checking for errors like REF, NA, NUM, VALUE, etc.

* Test all ExcelDate functions
Right now we're just using the number of days since 1900, but we should check the other functions.

* Verify that all white-space wild cards are implemented properly

* Verify that all N-times ({2,9}) are correct, and we're not parsing numbers too big.
