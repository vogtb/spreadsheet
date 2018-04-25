/**
 * Represents the length to reduce the stack by, and the replacement symbol that will replace those tokens in the stack.
 */
declare class ReductionPair {
    private lengthToReduceStackBy;
    private replacementSymbol;
    constructor(replacementSymbol: number, length: number);
    /**
     * Get the number representing the length to reduce the stack by.
     * @returns {number}
     */
    getLengthToReduceStackBy(): number;
    /**
     * Get the replacement token index.
     * @returns {number}
     */
    getReplacementSymbol(): number;
}
export { ReductionPair };
