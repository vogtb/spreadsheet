/**
 * Represents the length to reduce the stack by, and the replacement symbol that will replace those tokens in the stack.
 */
class ReductionPair {
  private lengthToReduceStackBy : number;
  private replacementSymbol : number;
  constructor(replacementSymbol : number, length : number) {
    this.lengthToReduceStackBy = length;
    this.replacementSymbol = replacementSymbol;
  }

  /**
   * Get the number representing the length to reduce the stack by.
   * @returns {number}
   */
  getLengthToReduceStackBy() : number {
    return this.lengthToReduceStackBy;
  }

  /**
   * Get the replacement token index.
   * @returns {number}
   */
  getReplacementSymbol() : number {
    return this.replacementSymbol;
  }
}

export {
  ReductionPair
}