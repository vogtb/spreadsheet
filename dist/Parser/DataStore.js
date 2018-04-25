"use strict";
exports.__esModule = true;
/**
 * Holds cell values, and allows for the updating and manipulation of those cells.
 */
var Cell_1 = require("../Cell");
/**
 * Cell DataStore that stores cells in memory.
 */
var DataStore = /** @class */ (function () {
    function DataStore() {
        /**
         * Holds cells inside an object for quick access.
         */
        this.data = {};
    }
    DataStore.prototype.getCell = function (key) {
        if (key in this.data) {
            return this.data[key];
        }
        return new Cell_1.Cell(key);
    };
    DataStore.prototype.addCell = function (cell) {
        var cellId = cell.getId();
        if (!(cellId in this.data)) {
            this.data[cellId] = cell;
        }
        else {
            this.getCell(cellId).updateDependencies(cell.getDependencies());
            this.getCell(cellId).setValue(cell.getValue());
            this.getCell(cellId).setError(cell.getError());
        }
        return this.getCell(cellId);
    };
    DataStore.prototype.getDependencies = function (id) {
        var getDependencies = function (id) {
            var filtered = [];
            for (var key in this.data) {
                var cell = this.data[key];
                if (cell.dependencies) {
                    if (cell.dependencies.indexOf(id) > -1) {
                        filtered.push(cell);
                    }
                }
            }
            var deps = [];
            filtered.forEach(function (cell) {
                if (deps.indexOf(cell.id) === -1) {
                    deps.push(cell.id);
                }
            });
            return deps;
        }.bind(this);
        var allDependencies = [];
        var getTotalDependencies = function (id) {
            var deps = getDependencies(id);
            if (deps.length) {
                deps.forEach(function (refId) {
                    if (allDependencies.indexOf(refId) === -1) {
                        allDependencies.push(refId);
                        var cell = this.getCell(refId);
                        if (cell.getDependencies().length) {
                            getTotalDependencies(refId);
                        }
                    }
                }.bind(this));
            }
        }.bind(this);
        getTotalDependencies(id);
        return allDependencies;
    };
    return DataStore;
}());
exports.DataStore = DataStore;
