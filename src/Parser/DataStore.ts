/**
 * Holds cell values, and allows for the updating and manipulation of those cells.
 */
import {
  Cell
} from "../Cell";

/**
 * Cell DataStore that stores cells in memory.
 */
class DataStore {
  /**
   * Holds cells inside an object for quick access.
   */
  public data: Object = {};

  getCell(key: string) : Cell {
    if (key in this.data) {
      return this.data[key];
    }
    return new Cell(key);
  }

  addCell(cell: Cell) {
    let cellId = cell.getId();

    if (!(cellId in this.data)) {
      this.data[cellId] = cell;
    } else {
      this.getCell(cellId).updateDependencies(cell.getDependencies());
      this.getCell(cellId).setValue(cell.getValue());
      this.getCell(cellId).setError(cell.getError());
    }

    return this.getCell(cellId);
  }

  getDependencies(id: string) {
    let getDependencies = function (id: string) {
      let filtered = [];
      for (let key in this.data) {
        let cell = this.data[key];
        if (cell.dependencies) {
          if (cell.dependencies.indexOf(id) > -1) {
            filtered.push(cell)
          }
        }
      }

      let deps = [];
      filtered.forEach(function (cell) {
        if (deps.indexOf(cell.id) === -1) {
          deps.push(cell.id);
        }
      });

      return deps;
    }.bind(this);
    let allDependencies = [];
    let getTotalDependencies = function (id: string) {
      let deps = getDependencies(id);

      if (deps.length) {
        deps.forEach(function (refId) {
          if (allDependencies.indexOf(refId) === -1) {
            allDependencies.push(refId);

            let cell = this.getCell(refId);
            if (cell.getDependencies().length) {
              getTotalDependencies(refId);
            }
          }
        }.bind(this));
      }
    }.bind(this);
    getTotalDependencies(id);
    return allDependencies;
  }
}

export {
  DataStore
}