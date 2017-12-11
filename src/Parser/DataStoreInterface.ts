import {
  Cell
} from "../Cell";

/**
 * Interface to add and get cells.
 */
interface DataStoreInterface {

  /**
   * Gets the cell corresponding to the key. If the value is undefined, will return blank cell..
   * @param key to look up cell
   * @returns {Cell} to return, if it exists. Returns blank cell if key not in matrix.
   */
  getCell(key: string) : Cell;

  /**
   * Add cell to matrix. If it exists, update the necessary values. If it doesn't exist add it.
   * @param cell to add to matrix.
   * @returns {Cell} Returns the cell after it has been added.
   */
  addCell(cell: Cell);

  /**
   * Get all dependencies for a specific cell.
   * @param id of cell
   * @returns {Array} of A1-format cell ID dependencies, in no particular oder.
   */
  getDependencies(id: string) : Array<any>;

}

export {
  DataStoreInterface
}