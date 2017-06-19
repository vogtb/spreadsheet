import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {Filter} from "../Utilities/Filter";
import {TypeConverter} from "../Utilities/TypeConverter";


/**
 * Calculates the frequency distribution of a range into specified classes or "bins".
 * @param range - to get frequency for.
 * @param bins - or classes.
 * @returns {Array<number>}
 * @constructor
 */
var FREQUENCY = function (range, bins) : Array<number> {
  ArgsChecker.checkLength(arguments, 2, "FREQUENCY");
  if (!Array.isArray(bins)) {
    bins = [bins];
  }
  if (!Array.isArray(range)) {
    range = [range];
  }
  bins = Filter.flattenAndThrow(bins).map(function (value) {
    return TypeConverter.firstValueAsNumber(value);
  }).sort(function (a, b) {
    return a - b;
  });
  range = Filter.flattenAndThrow(range).map(function (value) {
    return TypeConverter.firstValueAsNumber(value);
  }).sort(function (a, b) {
    return a - b;
  });

  var n = range.length;
  var b = bins.length;
  var r = [];
  for (var i = 0; i <= b; i++) {
    r[i] = 0;
    for (var j = 0; j < n; j++) {
      if (i === 0) {
        if (range[j] <= bins[0]) {
          r[0] += 1;
        }
      } else if (i < b) {
        if (range[j] > bins[i - 1] && range[j] <= bins[i]) {
          r[i] += 1;
        }
      } else if (i === b) {
        if (range[j] > bins[b - 1]) {
          r[b] += 1;
        }
      }
    }
  }
  return r;
};

export {
  FREQUENCY
}