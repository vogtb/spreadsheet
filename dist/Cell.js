"use strict";
exports.__esModule = true;
/**
 * Cell represents a cell in the spreadsheet. It contains a nullable rawFormulaText, and a value, which is not nullable unless
 * the parsing of the rawFormulaText results in an error.
 */
var Cell = (function () {
    /**
     * Creates an empty cell with an id.
     * @param id key of the cell in A1-format.
     */
    function Cell(id) {
        /**
         * The raw formula text that can be parse, excluding the proceeding =
         * E.g: SUM(A2:A4, 10)
         */
        this.rawFormulaText = null;
        this.typedValue = null;
        this.dependencies = [];
        this.error = null;
        var key = parseKey(id);
        this.id = id;
        this.row = key.y;
        this.col = key.x;
    }
    /**
     * Update this cell's dependencies, where `dependencies` is a unique list of A1-format cell IDs.
     * @param dependencies to merge with existing dependencies.
     */
    Cell.prototype.updateDependencies = function (dependencies) {
        for (var index in dependencies) {
            if (this.dependencies.indexOf(dependencies[index]) === -1) {
                this.dependencies.push(dependencies[index]);
            }
        }
    };
    /**
     * Return a list of dependencies in A1-format cell IDs, in no particular order, but likely in order of occurrence in
     * rawFormulaText.
     * @returns {Array<string>} list of dependencies in A1-format
     */
    Cell.prototype.getDependencies = function () {
        return this.dependencies;
    };
    /**
     * Return the zero-indexed column number of this cell.
     * @returns {number} column
     */
    Cell.prototype.getColumn = function () {
        return this.col;
    };
    /**
     * Return the zero-indexed row number of this cell.
     * @returns {number} row
     */
    Cell.prototype.getRow = function () {
        return this.row;
    };
    /**
     * Get the A1-format ID of this cell.
     * @returns {string} cell ID
     */
    Cell.prototype.getId = function () {
        return this.id;
    };
    /**
     * Get the rawFormulaText of this cell if set. Defaults to null, so should be used in combination with hasFormula().
     * @returns {string} rawFormulaText of this cell, if set. Nullable.
     */
    Cell.prototype.getFormula = function () {
        return this.rawFormulaText;
    };
    /**
     * Returns true if this cell has a formula to be parsed.
     * @returns {boolean}
     */
    Cell.prototype.hasFormula = function () {
        return this.rawFormulaText !== null;
    };
    /**
     * Set the value of this cell. If this cell has a primitive value (does not contain a rawFormulaText), it could be set to a
     * value while the rawFormulaText field is still null.
     * @param value to set
     */
    Cell.prototype.setValue = function (value) {
        this.typedValue = value;
    };
    /**
     * Sets the value or rawFormulaText for this cell. If the input begins with =, then it is considered to be a rawFormulaText. If it
     * is not, then it is a value, and set as the raw value for this cell.
     * @param rawFormula
     */
    Cell.prototype.setRawValue = function (rawFormula) {
        if (rawFormula.charAt(0) === "=") {
            this.rawFormulaText = rawFormula.substr(1);
        }
        else {
            this.typedValue = rawFormula;
        }
    };
    /**
     * Get the value of this cell. Since value could be null do to an error in the rawFormulaText, this could return null.
     * @returns {any}
     */
    Cell.prototype.getValue = function () {
        return this.typedValue;
    };
    /**
     * CLears a cells value.
     */
    Cell.prototype.clearValue = function () {
        this.typedValue = null;
    };
    /**
     * Set error for this cell. Usually in the case of a parse error when parsing the rawFormulaText.
     * @param error to set.
     */
    Cell.prototype.setError = function (error) {
        this.error = error;
    };
    /**
     * Get the error for this cell. If the rawFormulaText is not parsed properly, or is null, this could be null.
     * @returns {Error} error to return, could be null.
     */
    Cell.prototype.getError = function () {
        return this.error;
    };
    /**
     * Easier way to check if this cell has an error.
     * @returns {boolean}
     */
    Cell.prototype.hasError = function () {
        return this.error !== null;
    };
    /**
     * A cell is deemed blank if it contains no value, no error, and no typed value.
     * @returns {boolean}
     */
    Cell.prototype.isBlank = function () {
        return this.error === null && this.rawFormulaText === null && this.typedValue === null;
    };
    /**
     * Returns the human-readable string representation of this cell, omitting some obvious fields.
     * @returns {string}
     */
    Cell.prototype.toString = function () {
        return "id=" + this.id + ", value=" + this.typedValue + ", rawFormulaText=" + this.rawFormulaText + ", error=" + this.error;
    };
    /**
     * Build a cell with an id and value.
     * @param id - A1-notation id or key.
     * @param value - value of the cell.
     * @returns {Cell}
     * @constructor
     */
    Cell.BuildFrom = function (id, value) {
        var cell = new Cell(id);
        cell.setValue(value);
        return cell;
    };
    return Cell;
}());
exports.Cell = Cell;
function toNum(chr) {
    chr = chr.replace(/\$/g, '');
    var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
    for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
    }
    if (result) {
        --result;
    }
    return result;
}
function parseKey(cell) {
    var num = cell.match(/\d+$/), alpha = cell.replace(num, '');
    return {
        x: toNum(alpha),
        y: parseInt(num[0], 10) - 1
    };
}
