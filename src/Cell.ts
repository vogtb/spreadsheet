const CELL_ID_ERROR = "CELL_ID_ERROR";

/**
 * Represents a cell id error, and is thrown when a cells id does not conform to A1 notation.
 */
class CellIdError extends Error {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.name = CELL_ID_ERROR;
  }
}

/**
 * Cell represents a cell in the spreadsheet. It contains a nullable rawFormulaText, and a value, which is not nullable unless
 * the parsing of the rawFormulaText results in an error.
 */
class Cell {
  /**
   * The raw formula text that can be parse, excluding the proceeding =
   * E.g: SUM(A2:A4, 10)
   */
  private rawFormulaText: string = null;
  private typedValue: any = null;
  private dependencies: Array<string> = [];
  private error: Error = null;
  private id: string;
  private row: number;
  private col: number;

  /**
   * Creates an empty cell with an id.
   * @param id key of the cell in A1-format.
   */
  constructor(id: string) {
    if (!id.match(/^(?:[A-Za-z]+[0-9]+)$/)) {
      throw new CellIdError("Cell id " + id + " not valid");
    }
    let key = parseKey(id);

    this.id = id;
    this.row = key.y;
    this.col = key.x;
  }

  /**
   * Update this cell's dependencies, where `dependencies` is a unique list of A1-format cell IDs.
   * @param dependencies to merge with existing dependencies.
   */
  updateDependencies(dependencies: Array<string>) {
    for (let index in dependencies) {
      if (this.dependencies.indexOf(dependencies[index]) === -1) {
        this.dependencies.push(dependencies[index]);
      }
    }
  }

  /**
   * Return a list of dependencies in A1-format cell IDs, in no particular order, but likely in order of occurrence in
   * rawFormulaText.
   * @returns {Array<string>} list of dependencies in A1-format
   */
  getDependencies() : Array<string> {
    return this.dependencies;
  }

  /**
   * Return the zero-indexed column number of this cell.
   * @returns {number} column
   */
  getColumn() : number {
    return this.col;
  }

  /**
   * Return the zero-indexed row number of this cell.
   * @returns {number} row
   */
  getRow() : number {
    return this.row;
  }

  /**
   * Get the A1-format ID of this cell.
   * @returns {string} cell ID
   */
  getId() : string {
    return this.id;
  }

  /**
   * Get the rawFormulaText of this cell if set. Defaults to null, so should be used in combination with hasFormula().
   * @returns {string} rawFormulaText of this cell, if set. Nullable.
   */
  getFormula() : string {
    return this.rawFormulaText;
  }

  /**
   * Returns true if this cell has a formula to be parsed.
   * @returns {boolean}
   */
  hasFormula() : boolean {
    return this.rawFormulaText !== null;
  }

  /**
   * Sets the value or rawFormulaText for this cell. If the input begins with =, then it is considered to be a rawFormulaText. If it
   * is not, then it is a value, and set as the raw value for this cell.
   * @param rawFormula
   */
  setValue(rawFormula: string) {
    if (typeof rawFormula === "string" && rawFormula.charAt(0) === "=") {
      this.rawFormulaText = rawFormula.substr(1);
    } else {
      this.typedValue = rawFormula;
    }
  }

  /**
   * Gets the rawFormulaText for this cell, which is either null or a string.
   * @returns {string}
   */
  getRawFormulaText() : string | null {
    return this.rawFormulaText;
  }


  /**
   * Get the value of this cell if a value is present. If this cell was given a formula but not a value, this may return
   * null.
   * @returns {any}
   */
  getValue() : any {
    return this.typedValue;
  }

  /**
   * CLears a cells value.
   */
  clearValue() {
    this.typedValue = null;
  }

  /**
   * Set error for this cell. Usually in the case of a parse error when parsing the rawFormulaText.
   * @param error to set.
   */
  setError(error: Error) {
    this.error = error;
  }

  /**
   * Get the error for this cell. If the rawFormulaText is not parsed properly, or is null, this could be null.
   * @returns {Error} error to return, could be null.
   */
  getError() : Error {
    return this.error;
  }

  /**
   * Easier way to check if this cell has an error.
   * @returns {boolean}
   */
  hasError() : boolean {
    return this.error !== null;
  }

  /**
   * A cell is deemed blank if it contains no value, no error, and no typed value.
   * @returns {boolean}
   */
  isBlank(): boolean {
    return this.error === null && this.rawFormulaText === null && this.typedValue === null;
  }

  /**
   * Returns the human-readable string representation of this cell, omitting some obvious fields.
   * @returns {string}
   */
  toString() : string {
    return "id=" + this.id + ", value=" + this.typedValue + ", rawFormulaText=" + this.rawFormulaText + ", error=" + this.error;
  }

  /**
   * Comparing two cells.
   * @param other
   * @returns {boolean}
   */
  equals(other : Cell) : boolean {
    return this.toString() === other.toString();
  }

  /**
   * Build a cell with an id and value.
   * @param id - A1-notation id or key.
   * @param value - value of the cell as a string
   * @returns {Cell}
   * @constructor
   */
  static BuildFrom(id: string, value: any) : Cell {
    let cell = new Cell(id);
    cell.setValue(value);
    return cell;
  }
}

function toNum(chr) {
  chr = chr.replace(/\$/g, '');
  let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;
  for (i = 0, j = chr.length - 1; i < chr.length; i += 1, j -= 1) {
    result += Math.pow(base.length, j) * (base.indexOf(chr[i]) + 1);
  }
  if (result) {
    --result;
  }
  return result;
}

function parseKey(cell) {
  let num = cell.match(/\d+$/),
    alpha = cell.replace(num, '');

  return {
    x: toNum(alpha),
    y: parseInt(num[0], 10) - 1
  };
}

export {
  Cell,
  CellIdError,
  CELL_ID_ERROR
}