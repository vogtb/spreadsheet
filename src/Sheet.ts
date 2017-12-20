import {Cell} from "./Cell";
import {NameError, RefError} from "./Errors";
import {DataStore} from "./Parser/DataStore";
import {FormulaParser} from "./Parser/Parser";
import {Formulas} from "./Formulas";
import {
  numberToCharacter,
  convertXYtoA1Coordinates,
  A1toRowColCoordinates
} from "./Utilities/MoreUtils";

/**
 * Represents a spreadsheet parser and data-store that act together as a functional spreadsheet.
 */
class Sheet {
  private parser;
  private dataStore : DataStore;

  constructor() {
    this.parser  = FormulaParser(this);
    this.dataStore = new DataStore();
  }

  /**
   * Iterate through cells in the data-store, returning the collected cells in the range.
   * @param origin
   * @param startCell
   * @param endCell
   * @returns {{index: Array; value: Array}}
   */
  iterateCells (origin, startCell, endCell) {
    let result = {
      index: [], // list of cell index: A1, A2, A3
      value: []  // list of cell value
    };
    let cols = {
      start: 0,
      end: 0
    };
    if (endCell.col >= startCell.col) {
      cols = {
        start: startCell.col,
        end: endCell.col
      };
    } else {
      cols = {
        start: endCell.col,
        end: startCell.col
      };
    }
    let rows = {
      start: 0,
      end: 0
    };
    if (endCell.row >= startCell.row) {
      rows = {
        start: startCell.row,
        end: endCell.row
      };
    } else {
      rows = {
        start: endCell.row,
        end: startCell.row
      };
    }
    for (let column = cols.start; column <= cols.end; column++) {
      for (let row = rows.start; row <= rows.end; row++) {
        let cellIndex = numberToCharacter(column) + (row + 1),
          cellValue = this.cellValue(origin, cellIndex);

        result.index.push(cellIndex);
        result.value.push(cellValue);
      }
    }
    return result;
  }

  /**
   * Call function with given arguments. Used for calling formulas.
   * @param fn
   * @param args
   * @returns {any}
   */
  callFunction(fn, args) {
    fn = fn.toUpperCase();
    args = args || [];
    if (Formulas.exists(fn)) {
      return Formulas.get(fn).apply(this, args);
    }

    throw new NameError("Unknown function: '" + fn + "'.");
  }

  /**
   * Call variable, which could include calling a function.
   * @param args
   * @returns {any}
   */
  callVariable(args) {
    args = args || [];
    let str = args.shift(); // the first in args is the name of the function to call.

    if (str) {
      str = str.toUpperCase();
      if (Formulas.exists(str)) {
        return Formulas.get(str).apply(this, args);
      }
    }

    throw new NameError("Unknown variable: '" + str + "'.");
  };

  /**
   * Fetch cell, updating dependencies in process.
   * @param origin
   * @param cellId
   * @returns {Cell}
   */
  cellValue(origin, cellId) {
    let cell = this.dataStore.getCell(cellId);

    //update dependencies
    this.dataStore.getCell(origin).updateDependencies([cellId]);
    // check references error
    if (cell && cell.getDependencies()) {
      if (cell.getDependencies().indexOf(cellId) !== -1) {
        throw new RefError("Reference does not exist.");
      }
    }
    return cell;
  }

  /**
   * Get a range of cells.
   * @param origin - the cell id in A1 notation from which this range is being referenced.
   * @param {string} start - first cell coordinate (in A1 notation) in iteration
   * @param {string} end - final cell coordinate (in A1 notation) in iteration
   * @returns {Array}
   */
  cellRangeValue(origin, start: string, end: string) {
    let coordsStart = A1toRowColCoordinates(start),
      coordsEnd = A1toRowColCoordinates(end);

    // iterate cells to get values and indexes
    let cells = this.iterateCells(origin, coordsStart, coordsEnd),
      result = [];
    //update dependencies
    this.dataStore.getCell(origin).updateDependencies(cells.index);

    result.push(cells.value);
    return result;
  }

  /**
   * Get a fixed cell value.
   * @param origin
   * @param id
   * @returns {Cell}
   */
  fixedCellValue (origin, id) {
    id = id.replace(/\$/g, '');
    return this.cellValue(origin, id);
  };

  /**
   * Get a fixed cell value range.
   * @param origin
   * @param start
   * @param end
   * @returns {Array}
   */
  fixedCellRangeValue(origin, start, end) {
    start = start.replace(/\$/g, '');
    end = end.replace(/\$/g, '');

    return this.cellRangeValue(origin, start, end);
  };

  /**
   * Recalculate dependencies for a cell.
   * @param {Cell} cell
   */
  private recalculateCellDependencies(cell: Cell) {
    let allDependencies = this.dataStore.getDependencies(cell.getId());

    for (let refId of allDependencies) {
      let currentCell = this.dataStore.getCell(refId);
      if (currentCell && currentCell.hasFormula()) {
        this.calculateCellFormula(currentCell);
      }
    }
  }

  /**
   * Executes the formula in a cell.
   * @param {Cell} cell
   * @returns {{error: Error; result: any} | {error: any; result: any}}
   */
  private calculateCellFormula(cell: Cell) {
    // to avoid double translate formulas, update cell data in parser
    let parsed = this.parse(cell.getFormula(), cell.getId());

    this.dataStore.getCell(cell.getId()).setValue(parsed.result);
    this.dataStore.getCell(cell.getId()).setError(parsed.error);

    return parsed;
  }

  /**
   * Add a cell to the data-store, recording and updating dependencies if necessary.
   * @param {Cell} cell
   */
  private registerCellInDataStore(cell: Cell) {
    this.dataStore.addCell(cell);
    if (cell.hasFormula()) {
      this.calculateCellFormula(cell);
    }
  }

  /**
   * Parse a formula for a given cellId. This involves all calculations and look-ups.
   * @param formula
   * @param cellId
   * @returns {any}
   */
  public parse(formula, cellId) {
    let result = null;
    let error = null;

    try {
      this.parser.yy.originCellId = cellId;
      result = this.parser.parse(formula);
      let deps = this.dataStore.getDependencies(cellId);

      if (deps.indexOf(cellId) !== -1) {
        result = null;
        for(let id of deps) {
          this.dataStore.getCell(id).setError(new RefError("Reference does not exist"));
          this.dataStore.getCell(id).clearValue();
        }
        error = new RefError("Reference does not exist.");
      }
    } catch (e) {
      error = e;
    }

    if (result instanceof Error) {
      return {
        error: result,
        result: null
      }
    }
    return {
      error: error,
      result: result
    }
  }

  /**
   * Set a cell's value, by id.
   * @param {string} id
   * @param {string} value
   */
  public setCell(id: string, value: string) {
    let cell = new Cell(id);
    cell.setValue(value.toString());
    this.registerCellInDataStore(cell);
    this.recalculateCellDependencies(cell);
  }

  /**
   * Get a cell from the data-store, returning null if a cell is undefined.
   * @param {string} id
   * @returns {Cell}
   */
  public getCell(id: string) : Cell {
    let cell = this.dataStore.getCell(id);
    if (cell === undefined) {
      return null;
    }
    return cell;
  }

  /**
   * Load an a matrix of cells into the data-store.
   * @param {Array<Array<any>>} input
   */
  public load(input: Array<Array<any>>) {
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[0].length; x++) {
        // set the cell here
        let id = convertXYtoA1Coordinates(x, y);
        this.setCell(id, input[y][x].toString());
      }
    }
  };

}

export {
  Sheet
}