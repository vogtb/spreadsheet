import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  NumError
} from "../Errors";
import {
  TypeConverter
} from "../Utilities/TypeConverter";
import {
  Filter
} from "../Utilities/Filter";


/**
 * Returns an element from a list of choices based on index.
 * @param index - Which choice to return.
 * @param values -  Array of potential value to return. Required. May be a reference to a cell or an individual value.
 * @constructor
 */
var CHOOSE = function (index, ...values) {
  ArgsChecker.checkAtLeastLength(arguments, 2, "CHOOSE");
  var i = Math.floor(TypeConverter.firstValueAsNumber(index));
  var data = Filter.flattenAndThrow(values);
  if (i < 1 || i > data.length) {
    throw new NumError("Function CHOOSE parameter 1 value is " + i + ". Valid values are between 1 and "
        + (data.length) + " inclusive.");
  }
  return data[i-1];
};


export {
  CHOOSE
}