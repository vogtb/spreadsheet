/**
 * Holds cell values, and allows for the updating and manipulation of those cells.
 */
import { Cell } from "../Cell";
/**
 * Cell DataStore that stores cells in memory.
 */
declare class DataStore {
    /**
     * Holds cells inside an object for quick access.
     */
    data: Object;
    getCell(key: string): Cell;
    addCell(cell: Cell): Cell;
    getDependencies(id: string): any[];
}
export { DataStore };
