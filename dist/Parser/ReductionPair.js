"use strict";
exports.__esModule = true;
/**
 * Represents the length to reduce the stack by, and the replacement symbol that will replace those tokens in the stack.
 */
var ReductionPair = /** @class */ (function () {
    function ReductionPair(replacementSymbol, length) {
        this.lengthToReduceStackBy = length;
        this.replacementSymbol = replacementSymbol;
    }
    /**
     * Get the number representing the length to reduce the stack by.
     * @returns {number}
     */
    ReductionPair.prototype.getLengthToReduceStackBy = function () {
        return this.lengthToReduceStackBy;
    };
    /**
     * Get the replacement token index.
     * @returns {number}
     */
    ReductionPair.prototype.getReplacementSymbol = function () {
        return this.replacementSymbol;
    };
    return ReductionPair;
}());
exports.ReductionPair = ReductionPair;
