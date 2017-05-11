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
   */
  static checkLength(args: Array<any> | IArguments, length: number) {
    if (args.length !== length) {
      throw new NAError("Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
    }
  }

  /**
   * Checks to see if the arguments are at least a certain length.
   * @param args to check length of
   * @param length expected length
   */
  static checkAtLeastLength(args: any, length: number) {
    if (args.length < length) {
      throw new NAError("Wrong number of arguments to ___. Expected " + length + " arguments, but got " + args.length + " arguments.");
    }
  }

  /**
   * Checks to see if the arguments are within a max and min, inclusively
   * @param args to check length of
   * @param low least number of arguments
   * @param high max number of arguments
   */
  static checkLengthWithin(args: any, low: number, high: number) {
    if (args.length > high || args.length < low) {
      throw new NAError("Wrong number of arguments to ___. Expected 1 arguments, but got " + args.length + " arguments.");
    }
  }
}

export {
  ArgsChecker
}