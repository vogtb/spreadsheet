# Spreadsheet
TypeScript/javascript spreadsheet.

## Usage

### Install
```
npm install js-spreadsheet
```

### Examples

**Using a Sheet**
```javascript
var Sheet = require("js-spreadsheet").Sheet;
var sheet = new Sheet();
sheet.setCell("A1", "10");
sheet.setCell("A2", "14");
sheet.setCell("A4", "10e2");
sheet.setCell("A5", "99.1");
sheet.setCell("B1", "=SUM(A1:A5)");
sheet.getCell("B1").getValue(); // returns: 1123.1
```

**Using Formulas Directly**
```javascript
var Formulas = require("js-spreadsheet").AllFormulas;
Formulas.SUM(1, 2, 3, [4, 5, 6], "7"); // returns: 28
```

For a full list of formulas, see [DOCS.md](DOCS.md)


**Nested Formulas**
```javascript
sheet.setCell('A1', '=SIN(PI() / 2)')
sheet.getCell("A1").getValue(); // returns: 1
```

**Date Conversion**
```javascript
sheet.setCell('A1', '=DATEDIF("1992-6-19", "1996-6-19", "Y")')
sheet.getCell("A1").getValue(); // returns: 4
```

**Number Parsing**
```javascript
sheet.setCell('A1', '="10e1" + 44');
sheet.getCell("A1").getValue(); // returns: 144

sheet.setCell('A2', '="1,000,000" + 1');
sheet.getCell("A2").getValue(); // returns: 1000001

sheet.setCell('A3', '="-$10.00" + 0');
sheet.getCell("A3").getValue(); // returns: -10

sheet.setCell('A4', '=10% + 1');
sheet.getCell("A4").getValue(); // returns: 1.1

sheet.setCell('A5', '= 2 ^ 10');
sheet.getCell("A5").getValue(); // returns: 1024
```


## Ranges

In MS Excel, and Google Spreadsheets, literal ranges are denoted with opening and closing curly-brackets. E.g. "{1, 2, 3}". In this implementation however, literal ranges are denoted with opening and closing brackets. E.g. "[1, 2, 3]".

```javascript
// OK
sheet.setCell('A1', '=SUM([1, 2, 3])');
// NOT OK
sheet.setCell('A1', '=SUM({1, 2, 3})');
```


## Docs
See [DOCS.md](DOCS.md) for full list and documentation of all formulas available.


## Contributing
When adding a formula, or fixing a bug please follow the commit message format:
```
[BUG_FEATURE_FILE_OR_COMPONENT] short description here of issue and fix
```
If you're adding a new formula, before you submit a pull request or push ensure that:
1) The formula is tested inside the proper category file in `tests/Formulas`.
2) Make sure the formula is exported, and imported/exported in `AllFormulas.ts`.
3) The formula tests for reference errors, N/A errors, value errors for each input.
4) That the formula is tested for parsing inside `SheetFormulaTest.ts`.
5) Run tests with `npm run test`.
6) Build with `npm run build`.
7) Build DOCS.md with `npm run docs`.


## Why?
Near the end of 2016 I began to ask myself why I didn't know more about MS Excel and Google Spreadsheets. Why didn't I know more about the most popular programing language in the world? I began to reverse engineer Google Spreadsheets in particular, gaining a better understanding along the way.

I chose TypeScript because, coming from Java, it is really nice to be able to see type errors, and catch them. I also just enjoy getting specific with my return types, even if the specifications for a spreadsheet treat type flexibly.

For the formula documentation, I tried to be at least -- if not more -- thorough as Google Spreadsheets.


## License

For this repository's code license, and related licenses, see LICENSES directory.


## Acknowledgements
This is largely a re-write of [Handsontable](https://github.com/handsontable)'s [https://github.com/handsontable/ruleJS](https://github.com/handsontable/ruleJS), and [https://github.com/sutoiku/formula.js/](https://github.com/sutoiku/formula.js/). The parser was derived from Handsontable's, and many of the formulas were created with FormulaJS's formulas as a reference point.