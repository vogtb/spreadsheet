import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  NumError,
  DivZeroError,
  RefError,
  ValueError,
  NAError
} from "../Errors";


/**
 * Returns the "value not available" error, "#N/A".
 * @constructor
 */
var NA = function () {
  ArgsChecker.checkLength(arguments, 1, "NA");
  throw new NAError("NA Error thrown.");
};


export {
  NA
}