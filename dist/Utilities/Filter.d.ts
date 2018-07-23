/**
 * Static class to help filter down Arrays
 */
declare class Filter {
    /**
     * Converts string values in array to 0
     * @param arr to convert
     * @returns {Array} array in which all string values have been converted to 0.
     */
    static stringValuesToZeros(arr: Array<any>): Array<any>;
    /**
     * Flatten an array of arrays of ...etc.
     * @param values array of values
     * @returns {Array} flattened array
     */
    static flatten(values: Array<any>): Array<any>;
    /**
     * Flatten an array of arrays of... etc, but throw an error if any are empty references.
     * @param values array of values
     * @returns {Array} flattened array
     */
    static flattenAndThrow(values: Array<any>): Array<any>;
    /**
     * Filter out all strings from an array.
     * @param arr to filter
     * @returns {Array} filtered array
     */
    static filterOutStringValues(arr: Array<any>): Array<any>;
    /**
     * Filters out non number values.
     * @param arr to filter
     * @returns {Array} filtered array
     */
    static filterOutNonNumberValues(arr: Array<any>): Array<any>;
    /**
     * Returns an array as unique values.
     * @param arr - to filter down to uniques.
     * @returns {Array}
     */
    static unique(arr: Array<any>): Array<any>;
}
export { Filter };
