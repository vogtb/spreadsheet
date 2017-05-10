/**
 * Cell represents a cell in the spreadsheet. It contains a nullable formula, and a value, which is not nullable unless
 * the parsing of the formula results in an error.
 */
class Cell {
  private formula: string;
  private value: string;
  private dependencies: Array<string>;
  private error: string;
  private id: string;
  private row: number;
  private col: number;

  /**
   * Creates an empty cell with an id.
   * @param id key of the cell in A1-format.
   */
  constructor(id: string) {
    var key = parseKey(id);

    this.formula = null;
    this.value = "";
    this.dependencies = [];
    this.error = null;
    this.id = id;
    this.row = key.y;
    this.col = key.x;
  }

  /**
   * Update this cell's dependencies, where `dependencies` is a unique list of A1-format cell IDs.
   * @param dependencies to merge with existing dependencies.
   */
  updateDependencies(dependencies: Array<string>) {
    for (var index in dependencies) {
      if (this.dependencies.indexOf(dependencies[index]) === -1) {
        this.dependencies.push(dependencies[index]);
      }
    }
  }

  /**
   * Return a list of dependencies in A1-format cell IDs, in no particular order, but likely in order of occurrence in
   * formula.
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
   * Set the formula of this cell.
   * @param formula to set.
   */
  setFormula(formula: string) {
    this.formula = formula;
  }

  /**
   * Get the formula of this cell if set. Defaults to null, so could return null.
   * @returns {string} formula of this cell, if set. Nullable.
   */
  getFormula() : string {
    return this.formula;
  }

  /**
   * Set the value of this cell. If this cell has a primitive value (does not contain a formula), it could be set to a
   * value while the formula field is still null.
   * @param value to set
   */
  setValue(value: string) {
    this.value = value;
  }

  /**
   * Get the value of this cell. Since value could be null do to an error in the formula, this could return null.
   * @returns {string}
   */
  getValue() : string {
    return this.value;
  }

  /**
   * CLears a cells value.
   */
  clearValue() {
    this.value = null;
  }

  /**
   * Set error for this cell. Usually in the case of a parse error when parsing the formula.
   * @param error to set.
   */
  setError(error: string) {
    this.error = error;
  }

  /**
   * Get the error for this cell. If the formula is not parsed properly, or is null, this could be null.
   * @returns {string} error to return, could be null.
   */
  getError() : string {
    return this.error;
  }

  /**
   * Returns the human-readable string representation of this cell, omitting some obvious fields.
   * @returns {string}
   */
  toString() : string {
    return "id=" + this.id + ", value=" + this.value + ", formula=" + this.formula + ", error=" + this.error;
  }
}

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
  var num = cell.match(/\d+$/),
    alpha = cell.replace(num, '');

  return {
    x: toNum(alpha),
    y: parseInt(num[0], 10) - 1
  };
}

export {
  Cell
}