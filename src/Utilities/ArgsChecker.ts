import {
  NAError
} from "../Errors";

/**
 * Static class to check argument length within expected ranges when calling functions.
 */
class ArgsChecker {
  /**
   * Checks to see if the arguments are of the correct length.
   * @param args to check length of
   * @param length expected length
   * @param caller name of the function calling this function, for use in error message formatting
   */
  static checkLength(args: Array<any> | IArguments, length: number, caller?: string) {
    if (args.length !== length) {
      let functionName = caller !== undefined ? " to " + caller : "";
      throw new NAError("Wrong number of arguments" + functionName + ". Expected " + length
          + " arguments, but got " + args.length + " arguments.");
    }
  }

  /**
   * Checks to see if the arguments are at least a certain length.
   * @param args to check length of
   * @param length expected length
   * @param caller name of the function calling this function, for use in error message formatting
   */
  static checkAtLeastLength(args: any, length: number, caller?: string) {
    if (args.length < length) {
      let functionName = caller !== undefined ? " to " + caller : "";
      throw new NAError("Wrong number of arguments" + functionName + ". Expected " + length
        + " arguments, but got " + args.length + " arguments.");
    }
  }

  /**
   * Checks to see if the arguments are within a max and min, inclusively
   * @param args to check length of
   * @param low least number of arguments
   * @param high max number of arguments
   * @param caller name of the function calling this function, for use in error message formatting
   */
  static checkLengthWithin(args: any, low: number, high: number, caller?: string) {
    if (args.length > high || args.length < low) {
      let functionName = caller !== undefined ? " to " + caller : "";
      throw new NAError("Wrong number of arguments" + functionName + ". Expected between " + low
        + " and " + high + " arguments, but got " + args.length + " arguments.");
    }
  }
}

export {
  ArgsChecker
}