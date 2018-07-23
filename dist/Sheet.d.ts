import { Cell } from "./Cell";
/**
 * Represents a spreadsheet parser and data-store that act together as a functional spreadsheet.
 */
declare class Sheet {
    private parser;
    private dataStore;
    constructor();
    /**
     * Iterate through cells in the data-store, returning the collected cells in the range.
     * @param origin
     * @param startCell
     * @param endCell
     * @returns {{index: Array; value: Array}}
     */
    iterateCells(origin: any, startCell: any, endCell: any): {
        index: any[];
        value: any[];
    };
    /**
     * Call function with given arguments. Used for calling formulas.
     * @param fn
     * @param args
     * @returns {any}
     */
    callFunction(fn: any, args: any): any;
    /**
     * Call variable, which could include calling a function.
     * @param args
     * @returns {any}
     */
    callVariable(args: any): any;
    /**
     * Fetch cell, updating dependencies in process.
     * @param origin
     * @param cellId
     * @returns {Cell}
     */
    cellValue(origin: any, cellId: any): Cell;
    /**
     * Get a range of cells.
     * @param origin - the cell id in A1 notation from which this range is being referenced.
     * @param {string} start - first cell coordinate (in A1 notation) in iteration
     * @param {string} end - final cell coordinate (in A1 notation) in iteration
     * @returns {Array}
     */
    cellRangeValue(origin: any, start: string, end: string): any[];
    /**
     * Get a fixed cell value.
     * @param origin
     * @param id
     * @returns {Cell}
     */
    fixedCellValue(origin: any, id: any): Cell;
    /**
     * Get a fixed cell value range.
     * @param origin
     * @param start
     * @param end
     * @returns {Array}
     */
    fixedCellRangeValue(origin: any, start: any, end: any): any[];
    /**
     * Recalculate dependencies for a cell.
     * @param {Cell} cell
     */
    private recalculateCellDependencies(cell);
    /**
     * Executes the formula in a cell.
     * @param {Cell} cell
     * @returns {{error: Error; result: any} | {error: any; result: any}}
     */
    private calculateCellFormula(cell);
    /**
     * Add a cell to the data-store, recording and updating dependencies if necessary.
     * @param {Cell} cell
     */
    private registerCellInDataStore(cell);
    /**
     * Parse a formula for a given cellId. This involves all calculations and look-ups.
     * @param formula
     * @param cellId
     * @returns {any}
     */
    parse(formula: any, cellId: any): {
        error: any;
        result: any;
    };
    /**
     * Set a cell's value, by id.
     * @param {string} id
     * @param {string} value
     */
    setCell(id: string, value: string): void;
    /**
     * Get a cell from the data-store, returning null if a cell is undefined.
     * @param {string} id
     * @returns {Cell}
     */
    getCell(id: string): Cell;
    /**
     * Load an a matrix of cells into the data-store.
     * @param {Array<Array<any>>} input
     */
    load(input: Array<Array<any>>): void;
}
export { Sheet };
