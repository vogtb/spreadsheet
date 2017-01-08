# Spreadsheet
TypeScript implementation of a spreadsheet.

## TODO
Things I should do.

### Write tests for supported formulas.
* Write more thorough tests for all formulas
* Include fail state values for all formulas

### Write formulas for missing ones
* FDIST vs F.DIST, differentiate.
* FINV vs F.INV, differentiate.
* SUM_ formulas
* ACCRINT

### How do we parse formula names that contain delimiters?
For example how do we parse `=F.DIST` to `=FDIST`? Currently doesn't work.

### Moment.js issue.
There are an awful lot of tests that fail when we use formulajs' version of moment. We should probably replace it.
