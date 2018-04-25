/**
 * Static class to check argument length within expected ranges when calling functions.
 */
declare class ArgsChecker {
    /**
     * Checks to see if the arguments are of the correct length.
     * @param args to check length of
     * @param length expected length
     * @param caller name of the function calling this function, for use in error message formatting
     */
    static checkLength(args: Array<any> | IArguments, length: number, caller?: string): void;
    /**
     * Checks to see if the arguments are at least a certain length.
     * @param args to check length of
     * @param length expected length
     * @param caller name of the function calling this function, for use in error message formatting
     */
    static checkAtLeastLength(args: any, length: number, caller?: string): void;
    /**
     * Checks to see if the arguments are within a max and min, inclusively
     * @param args to check length of
     * @param low least number of arguments
     * @param high max number of arguments
     * @param caller name of the function calling this function, for use in error message formatting
     */
    static checkLengthWithin(args: any, low: number, high: number, caller?: string): void;
}
export { ArgsChecker };
