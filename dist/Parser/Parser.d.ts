/**
 * Creates a new FormulaParser, which parses formulas, and does minimal error handling.
 *
 * @param handler should be a Sheet, since the parser needs access to fixedCellValue, cellValue, cellRangeValue, and
 * fixedCellRangeValue
 * @returns formula parser instance for use with parser.js
 * @constructor
 */
declare let FormulaParser: (handler: any) => any;
export { FormulaParser };
