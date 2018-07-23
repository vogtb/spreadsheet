declare const CELL_ID_ERROR = "CELL_ID_ERROR";
/**
 * Represents a cell id error, and is thrown when a cells id does not conform to A1 notation.
 */
declare class CellIdError extends Error {
    constructor(msg: string);
}
/**
 * Cell represents a cell in the spreadsheet. It contains a nullable rawFormulaText, and a value, which is not nullable unless
 * the parsing of the rawFormulaText results in an error.
 */
declare class Cell {
    /**
     * The raw formula text that can be parse, excluding the proceeding =
     * E.g: SUM(A2:A4, 10)
     */
    private rawFormulaText;
    private typedValue;
    private dependencies;
    private error;
    private id;
    private row;
    private col;
    /**
     * Creates an empty cell with an id.
     * @param id key of the cell in A1-format.
     */
    constructor(id: string);
    /**
     * Update this cell's dependencies, where `dependencies` is a unique list of A1-format cell IDs.
     * @param dependencies to merge with existing dependencies.
     */
    updateDependencies(dependencies: Array<string>): void;
    /**
     * Return a list of dependencies in A1-format cell IDs, in no particular order, but likely in order of occurrence in
     * rawFormulaText.
     * @returns {Array<string>} list of dependencies in A1-format
     */
    getDependencies(): Array<string>;
    /**
     * Return the zero-indexed column number of this cell.
     * @returns {number} column
     */
    getColumn(): number;
    /**
     * Return the zero-indexed row number of this cell.
     * @returns {number} row
     */
    getRow(): number;
    /**
     * Get the A1-format ID of this cell.
     * @returns {string} cell ID
     */
    getId(): string;
    /**
     * Get the rawFormulaText of this cell if set. Defaults to null, so should be used in combination with hasFormula().
     * @returns {string} rawFormulaText of this cell, if set. Nullable.
     */
    getFormula(): string;
    /**
     * Returns true if this cell has a formula to be parsed.
     * @returns {boolean}
     */
    hasFormula(): boolean;
    /**
     * Sets the value or rawFormulaText for this cell. If the input begins with =, then it is considered to be a rawFormulaText. If it
     * is not, then it is a value, and set as the raw value for this cell.
     * @param rawFormula
     */
    setValue(rawFormula: string): void;
    /**
     * Gets the rawFormulaText for this cell, which is either null or a string.
     * @returns {string}
     */
    getRawFormulaText(): string | null;
    /**
     * Get the value of this cell if a value is present. If this cell was given a formula but not a value, this may return
     * null.
     * @returns {any}
     */
    getValue(): any;
    /**
     * CLears a cells value.
     */
    clearValue(): void;
    /**
     * Set error for this cell. Usually in the case of a parse error when parsing the rawFormulaText.
     * @param error to set.
     */
    setError(error: Error): void;
    /**
     * Get the error for this cell. If the rawFormulaText is not parsed properly, or is null, this could be null.
     * @returns {Error} error to return, could be null.
     */
    getError(): Error;
    /**
     * Easier way to check if this cell has an error.
     * @returns {boolean}
     */
    hasError(): boolean;
    /**
     * A cell is deemed blank if it contains no value, no error, and no typed value.
     * @returns {boolean}
     */
    isBlank(): boolean;
    /**
     * Returns the human-readable string representation of this cell, omitting some obvious fields.
     * @returns {string}
     */
    toString(): string;
    /**
     * Comparing two cells.
     * @param other
     * @returns {boolean}
     */
    equals(other: Cell): boolean;
    /**
     * Build a cell with an id and value.
     * @param id - A1-notation id or key.
     * @param value - value of the cell as a string
     * @returns {Cell}
     * @constructor
     */
    static BuildFrom(id: string, value: any): Cell;
}
export { Cell, CellIdError, CELL_ID_ERROR };
