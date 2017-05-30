import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  NumError
} from "../Errors";
import {
  TypeConverter
} from "../Utilities/TypeConverter";


/**
 * Returns an element from a list of choices based on index.
 * @param index - Which choice to return.
 * @param values -  Array of potential value to return. Required. May be a reference to a cell or an individual value.
 * @constructor
 * TODO: This does not currently work with the parser. See TODO.md for more information.
 */
var CHOOSE = function (index, ...values) {
  ArgsChecker.checkAtLeastLength(arguments, 2, "NA");
  var i = Math.floor(TypeConverter.firstValueAsNumber(index));
  if (i < 1 || i > values.length) {
    throw new NumError("Function CHOOSE parameter 1 value is " + i + ". Valid values are between 1 and "
        + (values.length) + " inclusive.");
  }
  return values[i-1];
};


export {
  CHOOSE
}