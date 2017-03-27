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
### Different Date Formats
```
FORMAT           CONST NAME                              ACCESS ORDER
YYYY/MM/DD       YEAR_MONTHDIG_DAY_SLASH_DELIMIT         years, months, days
YYYY-MM-DD       YEAR_MONTHDIG_DAY_HYPHEN_DELIMIT        years, months, days
YYYY.MM.DD       YEAR_MONTHDIG_DAY_DOT_DELIMIT           years, months, days
YYYY MM DD       YEAR_MONTHDIG_DAY_SPACE_DELIMIT         years, months, days
YYYY, MM, DD     YEAR_MONTHDIG_DAY_COMMA_DELIMIT         years, months, days
MM/DD/YYYY       MONTHDIG_DAY_YEAR_SLASH_DELIMIT         months, days, years
MM-DD-YYYY       MONTHDIG_DAY_YEAR_HYPHEN_DELIMIT        months, days, years
MM.DD.YYYY       MONTHDIG_DAY_YEAR_DOT_DELIMIT           months, days, years
MM DD YYYY       MONTHDIG_DAY_YEAR_SPACE_DELIMIT         months, days, years
MM, DD, YYYY     MONTHDIG_DAY_YEAR_COMMA_DELIMIT         months, days, years
Month DD YYYY    MONTHNAME_DAY_YEAR_COMMON_DELIMITERS    monthName, days, years        // TODO: right now only comma...
DD Month YYYY    DAY_MONTHNAME_YEAR_COMMON_DELIMITERS    days, monthName, years        // TODO: right now only comma...
Month DD         MONTHNAME_DAY_COMMON_DELIMITERS         monthName, days
DD Month         DAY_MONTHNAME_COMMON_DELIMITERS         days, monthName
Month YYYY       MONTHNAME_YEAR_COMMON_DELIMITERS        monthName, years              // TODO: only some delimiters now
YYYY Month       YEAR_MONTHNAME_COMMON_DELIMITERS        years, monthName
MM/DD            MONTHDIG_DAY_SLASH_DELIMIT              months, days
MM-DD            MONTHDIG_DAY_HYPHEN_DELIMIT             months, days
MM DD            MONTHDIG_DAY_SPACE_DELIMIT              months, days
MM.DD            MONTHDIG_DAY_DOT_DELIMIT                months, days
MM, DD           MONTHDIG_DAY_COMMA_DELIMIT              months, days
MM/YYYY          MONTHDIG_YEAR_SLASH_DELIMIT             months, years
MM-YYYY          MONTHDIG_YEAR_HYPHEN_DELIMIT            months, years
MM YYYY          MONTHDIG_YEAR_SPACE_DELIMIT             months, years
MM.YYYY          MONTHDIG_YEAR_DOT_DELIMIT               months, years
MM, YYYY         MONTHDIG_YEAR_COMMA_DELIMIT             months, years
```

### Different Time Formats
```
FORMAT           CONST NAME
HHam             HOUR_MERIDIEM
HH:MM            OVERFLOW_HOURS_OVERFLOW_MINUTES
HH:MMam          HOURS_OVERFLOW_MINUTES_MERIDIEM
HH:MM:SS         OVERFLOW_HOURS_OVERFLOW_MINUTES_SECONDS
HH:MM:SSam       HOURS_MINUTES_SECONDS_OVERFLOW_MERIDIEM
```

### Condensed Date Formats
```
NOTES
fd = flex_delimitor
all can be prefixed with day name (no op)
all can be suffixed with time (yes op)

YYYY(fd)MM(fd)DD          YEAR_MONTHDIG_DAY
MM(fd)DD(fd)YYYY          MONTHDIG_DAY_YEAR
Month(fd)DD(fd)YYYY       MONTHNAME_DAY_YEAR
DD(fd)Month(fd)YYYY       DAY_MONTHNAME_YEAR
YYYY(fd)MM                YEAR_MONTHDIG
MM(fd)YYYY                MONTHDIG_YEAR
YYYY(fd)Month             YEAR_MONTHNAME
Month(fd)YYYY             MONTHNAME_YEAR
```
Capture the flex delimiter and invalidate if the three don't match.


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


* Combine the different time formats into a single regular expression.
Throw errors based on whether some units have overflowed. For example 29:99 is ok, but 29:99pm is not ok. This way
we're only doubling the number of date-format regular expressions we have to generate. For example, we check
YEAR_MONTHDIG_DAY_SLASH_DELIMIT once, and then YEAR_MONTHDIG_DAY_SLASH_DELIMIT_WITH_TIME once.
Use something like this: https://regex101.com/r/ZMu74e/2

* Dates have special types
Like dollars, dates are special types, but can be compared as if they're primatives. For example, this statement is
valid inside a cell: `=DATE(1992, 6, 6) > =DATE(1992, 6, 10)`. We should check types and and have Date-to-number
conversion inside parser.js.

* Organize tests in a way that makes sense.
Annotate them, and standardize the error checking for errors like REF, NA, NUM, VALUE, etc.

* Test all ExcelDate functions
Right now we're just using the number of days since 1900, but we should check the other functions.

* YYYY/MM/DD HH:mm needs more thurough testing

* Verify that all white-space wild cards are implemented properly

* Verify that all N-times ({2,9}) are correct, and we're not parsing numbers too big.

* Many times I use `\s*` when I actaully mean `\s+`
Or the are times when I mean "Feb 20 2019" or "Feb 20,2019", and either is correct.

* Use `startOf('year')` to zero out all dates before building them up.
No current tests should change because of this but it should eliminate some edge cases.

