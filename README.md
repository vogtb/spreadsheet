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

### Date-Time issues
Here are a couple of the issues with Dates and so on:
* There seem to be a few issues where someone did something sloppy inside formulaJS, and timezones, daylight-savings,
and leap years are being taken into account when they shouldn't be. For now I think I should just let it go.
The resulting errors from these bugs aren't that bad. I'll mark them down, and investigate them individually.
