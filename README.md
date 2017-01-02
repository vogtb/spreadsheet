# Spreadsheet
TypeScript implementation of a spreadsheet.

## TODO
Things I should do.

### Write tests for supported formulas.

### Write tests for Sheet.ts edge cases
* If I set a cell with a formula, update a dependency, the value of that cell should change.
* If I set a cell with a formula, update it, the value of that cell should change.

### Write tests for parsing types
* If I add a cell with a decimal, what's the most precision I can get?
* If I add `=10 * 10` will it parse to 100?
* If I add `=SUM(10) + 22` will it parse to 32?

### Parsing interesting values
* Expand tests greatly.