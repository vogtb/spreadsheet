"use strict";
exports.__esModule = true;
var Errors_1 = require("../Errors");
/**
 * Static class to help filter down Arrays
 */
var Filter = /** @class */ (function () {
    function Filter() {
    }
    /**
     * Converts string values in array to 0
     * @param arr to convert
     * @returns {Array} array in which all string values have been converted to 0.
     */
    Filter.stringValuesToZeros = function (arr) {
        var toReturn = [];
        for (var i = 0; i < arr.length; i++) {
            if (typeof arr[i] === "string") {
                toReturn.push(0);
            }
            else {
                toReturn.push(arr[i]);
            }
        }
        return toReturn;
    };
    /**
     * Flatten an array of arrays of ...etc.
     * @param values array of values
     * @returns {Array} flattened array
     */
    Filter.flatten = function (values) {
        return values.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? Filter.flatten(toFlatten) : toFlatten);
        }, []);
    };
    /**
     * Flatten an array of arrays of... etc, but throw an error if any are empty references.
     * @param values array of values
     * @returns {Array} flattened array
     */
    Filter.flattenAndThrow = function (values) {
        if (values.length === 0) {
            throw new Errors_1.RefError("Reference does not exist.");
        }
        return values.reduce(function (flat, toFlatten) {
            if (Array.isArray(toFlatten) && toFlatten.length === 0) {
                throw new Errors_1.RefError("Reference does not exist.");
            }
            return flat.concat(Array.isArray(toFlatten) ? Filter.flattenAndThrow(toFlatten) : toFlatten);
        }, []);
    };
    /**
     * Filter out all strings from an array.
     * @param arr to filter
     * @returns {Array} filtered array
     */
    Filter.filterOutStringValues = function (arr) {
        var toReturn = [];
        for (var i = 0; i < arr.length; i++) {
            if (typeof arr[i] !== "string") {
                toReturn.push(arr[i]);
            }
        }
        return toReturn;
    };
    /**
     * Filters out non number values.
     * @param arr to filter
     * @returns {Array} filtered array
     */
    Filter.filterOutNonNumberValues = function (arr) {
        var toReturn = [];
        for (var i = 0; i < arr.length; i++) {
            if (typeof arr[i] !== "string" && typeof arr[i] !== "boolean") {
                toReturn.push(arr[i]);
            }
        }
        return toReturn;
    };
    /**
     * Returns an array as unique values.
     * @param arr - to filter down to uniques.
     * @returns {Array}
     */
    Filter.unique = function (arr) {
        var a = [];
        for (var i = 0, l = arr.length; i < l; i++) {
            if (a.indexOf(arr[i]) === -1 && arr[i] !== '') {
                a.push(arr[i]);
            }
        }
        return a;
    };
    return Filter;
}());
exports.Filter = Filter;
