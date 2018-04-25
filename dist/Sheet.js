"use strict";
exports.__esModule = true;
var Cell_1 = require("./Cell");
var Errors_1 = require("./Errors");
var DataStore_1 = require("./Parser/DataStore");
var Parser_1 = require("./Parser/Parser");
var Formulas_1 = require("./Formulas");
var MoreUtils_1 = require("./Utilities/MoreUtils");
/**
 * Represents a spreadsheet parser and data-store that act together as a functional spreadsheet.
 */
var Sheet = /** @class */ (function () {
    function Sheet() {
        this.parser = Parser_1.FormulaParser(this);
        this.dataStore = new DataStore_1.DataStore();
    }
    /**
     * Iterate through cells in the data-store, returning the collected cells in the range.
     * @param origin
     * @param startCell
     * @param endCell
     * @returns {{index: Array; value: Array}}
     */
    Sheet.prototype.iterateCells = function (origin, startCell, endCell) {
        var result = {
            index: [],
            value: [] // list of cell value
        };
        var cols = {
            start: 0,
            end: 0
        };
        if (endCell.col >= startCell.col) {
            cols = {
                start: startCell.col,
                end: endCell.col
            };
        }
        else {
            cols = {
                start: endCell.col,
                end: startCell.col
            };
        }
        var rows = {
            start: 0,
            end: 0
        };
        if (endCell.row >= startCell.row) {
            rows = {
                start: startCell.row,
                end: endCell.row
            };
        }
        else {
            rows = {
                start: endCell.row,
                end: startCell.row
            };
        }
        for (var column = cols.start; column <= cols.end; column++) {
            for (var row = rows.start; row <= rows.end; row++) {
                var cellIndex = MoreUtils_1.numberToCharacter(column) + (row + 1), cellValue = this.cellValue(origin, cellIndex);
                result.index.push(cellIndex);
                result.value.push(cellValue);
            }
        }
        return result;
    };
    /**
     * Call function with given arguments. Used for calling formulas.
     * @param fn
     * @param args
     * @returns {any}
     */
    Sheet.prototype.callFunction = function (fn, args) {
        fn = fn.toUpperCase();
        args = args || [];
        if (Formulas_1.Formulas.exists(fn)) {
            return Formulas_1.Formulas.get(fn).apply(this, args);
        }
        throw new Errors_1.NameError("Unknown function: '" + fn + "'.");
    };
    /**
     * Call variable, which could include calling a function.
     * @param args
     * @returns {any}
     */
    Sheet.prototype.callVariable = function (args) {
        args = args || [];
        var str = args.shift(); // the first in args is the name of the function to call.
        if (str) {
            str = str.toUpperCase();
            if (Formulas_1.Formulas.exists(str)) {
                return Formulas_1.Formulas.get(str).apply(this, args);
            }
        }
        throw new Errors_1.NameError("Unknown variable: '" + str + "'.");
    };
    ;
    /**
     * Fetch cell, updating dependencies in process.
     * @param origin
     * @param cellId
     * @returns {Cell}
     */
    Sheet.prototype.cellValue = function (origin, cellId) {
        var cell = this.dataStore.getCell(cellId);
        //update dependencies
        this.dataStore.getCell(origin).updateDependencies([cellId]);
        // check references error
        if (cell && cell.getDependencies()) {
            if (cell.getDependencies().indexOf(cellId) !== -1) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
        }
        return cell;
    };
    /**
     * Get a range of cells.
     * @param origin - the cell id in A1 notation from which this range is being referenced.
     * @param {string} start - first cell coordinate (in A1 notation) in iteration
     * @param {string} end - final cell coordinate (in A1 notation) in iteration
     * @returns {Array}
     */
    Sheet.prototype.cellRangeValue = function (origin, start, end) {
        var coordsStart = MoreUtils_1.A1toRowColCoordinates(start), coordsEnd = MoreUtils_1.A1toRowColCoordinates(end);
        // iterate cells to get values and indexes
        var cells = this.iterateCells(origin, coordsStart, coordsEnd), result = [];
        //update dependencies
        this.dataStore.getCell(origin).updateDependencies(cells.index);
        result.push(cells.value);
        return result;
    };
    /**
     * Get a fixed cell value.
     * @param origin
     * @param id
     * @returns {Cell}
     */
    Sheet.prototype.fixedCellValue = function (origin, id) {
        id = id.replace(/\$/g, '');
        return this.cellValue(origin, id);
    };
    ;
    /**
     * Get a fixed cell value range.
     * @param origin
     * @param start
     * @param end
     * @returns {Array}
     */
    Sheet.prototype.fixedCellRangeValue = function (origin, start, end) {
        start = start.replace(/\$/g, '');
        end = end.replace(/\$/g, '');
        return this.cellRangeValue(origin, start, end);
    };
    ;
    /**
     * Recalculate dependencies for a cell.
     * @param {Cell} cell
     */
    Sheet.prototype.recalculateCellDependencies = function (cell) {
        var allDependencies = this.dataStore.getDependencies(cell.getId());
        for (var _i = 0, allDependencies_1 = allDependencies; _i < allDependencies_1.length; _i++) {
            var refId = allDependencies_1[_i];
            var currentCell = this.dataStore.getCell(refId);
            if (currentCell && currentCell.hasFormula()) {
                this.calculateCellFormula(currentCell);
            }
        }
    };
    /**
     * Executes the formula in a cell.
     * @param {Cell} cell
     * @returns {{error: Error; result: any} | {error: any; result: any}}
     */
    Sheet.prototype.calculateCellFormula = function (cell) {
        // to avoid double translate formulas, update cell data in parser
        var parsed = this.parse(cell.getFormula(), cell.getId());
        this.dataStore.getCell(cell.getId()).setValue(parsed.result);
        this.dataStore.getCell(cell.getId()).setError(parsed.error);
        return parsed;
    };
    /**
     * Add a cell to the data-store, recording and updating dependencies if necessary.
     * @param {Cell} cell
     */
    Sheet.prototype.registerCellInDataStore = function (cell) {
        this.dataStore.addCell(cell);
        if (cell.hasFormula()) {
            this.calculateCellFormula(cell);
        }
    };
    /**
     * Parse a formula for a given cellId. This involves all calculations and look-ups.
     * @param formula
     * @param cellId
     * @returns {any}
     */
    Sheet.prototype.parse = function (formula, cellId) {
        var result = null;
        var error = null;
        try {
            this.parser.yy.originCellId = cellId;
            result = this.parser.parse(formula);
            var deps = this.dataStore.getDependencies(cellId);
            if (deps.indexOf(cellId) !== -1) {
                result = null;
                for (var _i = 0, deps_1 = deps; _i < deps_1.length; _i++) {
                    var id = deps_1[_i];
                    this.dataStore.getCell(id).setError(new Errors_1.RefError("Reference does not exist"));
                    this.dataStore.getCell(id).clearValue();
                }
                error = new Errors_1.RefError("Reference does not exist.");
            }
        }
        catch (e) {
            error = e;
        }
        if (result instanceof Error) {
            return {
                error: result,
                result: null
            };
        }
        return {
            error: error,
            result: result
        };
    };
    /**
     * Set a cell's value, by id.
     * @param {string} id
     * @param {string} value
     */
    Sheet.prototype.setCell = function (id, value) {
        var cell = new Cell_1.Cell(id);
        cell.setValue(value.toString());
        this.registerCellInDataStore(cell);
        this.recalculateCellDependencies(cell);
    };
    /**
     * Get a cell from the data-store, returning null if a cell is undefined.
     * @param {string} id
     * @returns {Cell}
     */
    Sheet.prototype.getCell = function (id) {
        var cell = this.dataStore.getCell(id);
        if (cell === undefined) {
            return null;
        }
        return cell;
    };
    /**
     * Load an a matrix of cells into the data-store.
     * @param {Array<Array<any>>} input
     */
    Sheet.prototype.load = function (input) {
        for (var y = 0; y < input.length; y++) {
            for (var x = 0; x < input[0].length; x++) {
                // set the cell here
                var id = MoreUtils_1.convertXYtoA1Coordinates(x, y);
                this.setCell(id, input[y][x].toString());
            }
        }
    };
    ;
    return Sheet;
}());
exports.Sheet = Sheet;
