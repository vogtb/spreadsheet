# Spreadsheet
TypeScript implementation of a spreadsheet.

## TODO
Things I should do.

### Write tests for supported formulas.
* Write more thorough tests for all formulas
* Include fail state values for all formulas

### Write formulas for missing ones
* FDIST
* FINV
* SUM_ formulas
* ACCRINT

### SUM and SUMA should be different, and I'm pretty sure they're currently the same.

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

### Refactor `Util.ts`
