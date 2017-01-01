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

### Parsing interesting values
* `10 + 10 + 10` should be parsed to 0, or null, not 10. We should do some regex checking before calling `parseInt`
