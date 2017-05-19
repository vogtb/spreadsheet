# Spreadsheet
TypeScript/javascript spreadsheet.

## Usage

### Example

```javascript
var sheet = new Sheet();
sheet.setCell("A1", "10");
sheet.setCell("A2", "14");
sheet.setCell("A4", "10e2");
sheet.setCell("A5", "99.1");
sheet.setCell("B1", "=SUM(A1:A5)");
console.log(sheet.getCell("B1").getValue()); // output: 1124
```

### Ranges

In MS Excel, and Google Spreadsheets, literal ranges are denoted with opening and closing curly-brackets. E.g. "{1, 2, 3}". In this implementation however, literal ranges are denoted with opening and closing brackets. E.g. "[1, 2, 3]".


## Docs
[Docs here](DOCUMENTATION.md)


## Contributing
When adding a formula, or fixing a bug please follow the commit message format:
```
[BUG_FEATURE_FILE_OR_COMPONENT] short description here of issue and fix
```
If you're adding a new formula, before you submit a pull request or push ensure that:
1) The formula is tested inside the proper category file in `tests/Formulas`.
2) The formula tests for reference errors, N/A errors, value errors for each input.
3) That the formula is tested for parsing inside `SheetFormulaTest.ts`.


### Why?
Near the end of 2016 I began to ask myself why I didn't know more about MS Excel and Google Spreadsheets. Why didn't I know more about the most popular programing language in the world? I began to reverse engineer Google Spreadsheets in particular, gaining a better understanding along the way.

I chose TypeScript because, coming from Java, it is really nice to be able to see type errors, and catch them. I also just enjoy getting specific with my return types, even if the specifications for a spreadsheet treat type flexibly.

For the formula documentation, I tried to be at least -- if not more -- thorough as Google Spreadsheets.


### License

For this repository's code license, and related licenses, see LICENSES directory.


### Acknowledgements
This is largely a re-write of [Handsontable](https://github.com/handsontable)'s [https://github.com/handsontable/ruleJS](https://github.com/handsontable/ruleJS), and [https://github.com/sutoiku/formula.js/](https://github.com/sutoiku/formula.js/). The parser was derived from Handsontable's, and many of the formulas were created with FormulaJS's formulas as a reference point.