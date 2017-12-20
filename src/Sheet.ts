import {Cell} from "./Cell";
import {NameError, RefError} from "./Errors";
import {DataStore} from "./Parser/DataStore";
import {FormulaParser} from "./Parser/Parser";
import {Formulas} from "./Formulas";
import {
  isFunction, characterToNumber, numberToCharacter, convertXYtoA1Coordinates,
  A1toRowColCoordinates
} from "./Utilities/MoreUtils";

// TODO: Document.
class Sheet {
  private parser  = {
    yy:{
      obj: undefined
    },
    setObj: function (obj: string) {},
    parse: function (formula: string) {}
  };
  private dataStore : DataStore;

  constructor() {
    this.parser  = FormulaParser(this);
    this.dataStore = new DataStore();
  }

  iterateCells (origin, startCell, endCell, callback?) {
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

    if (isFunction(callback)) {
      return callback.apply(callback, [result]);
    } else {
      return result;
    }
  }

  callFunction(fn, args) {
    fn = fn.toUpperCase();
    args = args || [];
    if (Formulas.exists(fn)) {
      return Formulas.get(fn).apply(this, args);
    }

    throw new NameError("Unknown function: '" + fn + "'.");
  }

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

  fixedCellValue (origin, id) {
    id = id.replace(/\$/g, '');
    return this.cellValue(origin, id);
  };

  fixedCellRangeValue(origin, start, end) {
    start = start.replace(/\$/g, '');
    end = end.replace(/\$/g, '');

    return this.cellRangeValue(origin, start, end);
  };

  private recalculateCellDependencies(cell: Cell) {
    let allDependencies = this.dataStore.getDependencies(cell.getId());

    for (let refId of allDependencies) {
      let currentCell = this.dataStore.getCell(refId);
      if (currentCell && currentCell.hasFormula()) {
        this.calculateCellFormula(currentCell);
      }
    }
  }

  private calculateCellFormula(cell: Cell) {
    // to avoid double translate formulas, update cell data in parser
    let parsed = this.parse(cell.getFormula(), cell.getId());

    this.dataStore.getCell(cell.getId()).setValue(parsed.result);
    this.dataStore.getCell(cell.getId()).setError(parsed.error);

    return parsed;
  }

  private registerCellInDataStore(cell: Cell) {
    this.dataStore.addCell(cell);
    if (cell.hasFormula()) {
      this.calculateCellFormula(cell);
    }
  }

  public parse(formula, cellId) {
    let result = null;
    let error = null;

    try {
      this.parser.yy.obj = cellId;
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

  public setCell(id: string, value: string) {
    let cell = new Cell(id);
    cell.setValue(value.toString());
    this.registerCellInDataStore(cell);
    this.recalculateCellDependencies(cell);
  }

  public getCell(id: string) : Cell {
    let cell = this.dataStore.getCell(id);
    if (cell === undefined) {
      return null;
    }
    return cell;
  }

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