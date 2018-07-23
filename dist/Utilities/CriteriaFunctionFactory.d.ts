/**
 * Creates a criteria function to evaluate elements in a range in an *IF function.
 */
declare class CriteriaFunctionFactory {
    /**
     * If the criteria is a number, use strict equality checking.
     * If the criteria is a string, check to see if it is a comparator.
     * If the criteria is a string, and it is not a comparator, check for regex.
     * If the criteria is a string and has not matched the above, finally use strict equality checking as a fallback.
     * If the criteria has not been set, default to false-returning criteria function.
     * @param criteria
     * @returns {(x:any)=>boolean}
     */
    static createCriteriaFunction(criteria: string): Function;
}
export { CriteriaFunctionFactory };
