import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  Filter
} from "../Utilities/Filter";
import {
  TypeConverter
} from "../Utilities/TypeConverter";
import {
  ValueError, NAError
} from "../Errors";
import {
  mean
} from "../Utilities/MathHelpers";


/**
 * Calculates the frequency distribution of a range into specified classes or "bins".
 * @param range - to get frequency for.
 * @param bins - or classes.
 * @returns {Array<number>}
 * @constructor
 * TODO: Returns ColumnArray (values stacked in Y-direction)
 */
let FREQUENCY = function (range, bins) : Array<number> {
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

  let n = range.length;
  let b = bins.length;
  let r = [];
  for (let i = 0; i <= b; i++) {
    r[i] = 0;
    for (let j = 0; j < n; j++) {
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


/**
 * Given partial data with exponential growth, fits and ideal exponential growth trend, and predicts future values. For
 * more information see: https://xkcd.com/1102/
 * @param knownY - The range or array containing the dependent, y, values that are known, and will be used to fit an
 * ideal exponential growth curve.
 * @param knownX - OPTIONAL - The range or values of the independent variables that correspond to knownY.
 * @param newX - OPTIONAL - The range, values, or data-points to return the y-values on the ideal curve fit.
 * @param shouldUseConstant - OPTIONAL - True by default. Given an exponential function y = b*m^x, should this function
 * calculate b?
 * @returns {Array}
 * @constructor
 * TODO: Returns RowArray (values stacked in X-direction)
 */
let GROWTH = function (knownY, knownX?, newX?, shouldUseConstant?) {
  ArgsChecker.checkLengthWithin(arguments, 1, 4, "GROWTH");
  // Credits: Ilmari Karonen, FormulaJs (https://github.com/sutoiku/formula.js/)

  knownY = Filter.flattenAndThrow(knownY).map(function (value) {
    if (typeof value !== "number") {
      throw new ValueError("Function GROWTH parameter 1 expects number values. But '" + value + "' is " + (typeof value)
          + " and cannot be coerced to a number.");
    }
    return value;
  });

  // Default values for optional parameters:
  if (arguments.length < 2) {
    knownX = [];
    for (let i = 1; i <= knownY.length; i++) {
      knownX.push(i);
    }
  }
  if (arguments.length < 3) {
    newX = [];
    for (let i = 1; i <= knownY.length; i++) {
      newX.push(i);
    }
  }
  if (arguments.length < 4) {
    shouldUseConstant = true || shouldUseConstant;
  }

  // Calculate sums over the data:
  let n = knownY.length;
  let avg_x = 0;
  let avg_y = 0;
  let avg_xy = 0;
  let avg_xx = 0;
  for (let i = 0; i < n; i++) {
    let x = knownX[i];
    let y = Math.log(knownY[i]);
    avg_x += x;
    avg_y += y;
    avg_xy += x * y;
    avg_xx += x * x;
  }
  avg_x /= n;
  avg_y /= n;
  avg_xy /= n;
  avg_xx /= n;

  // Compute linear regression coefficients:
  let beta;
  let alpha;
  if (shouldUseConstant) {
    beta = (avg_xy - avg_x * avg_y) / (avg_xx - avg_x * avg_x);
    alpha = avg_y - beta * avg_x;
  } else {
    beta = avg_xy / avg_xx;
    alpha = 0;
  }

  // Compute and return result array:
  let new_y = [];
  for (let i = 0; i < newX.length; i++) {
    new_y.push(Math.exp(alpha + beta * newX[i]));
  }
  return new_y;
};

/**
 * Returns the parameters of a linear trend.
 * @param dataY - The range of data representing Y values.
 * @param dataX - The range of data representing X values.
 * @returns {number[]}
 * @constructor
 */
let LINEST = function (dataY, dataX) {
  ArgsChecker.checkLength(arguments, 2, "LINEST");
  let rangeY = Filter.flattenAndThrow(dataY).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });
  let rangeX = Filter.flattenAndThrow(dataX).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });

  if (rangeX.length < 2) {
    throw new NAError("LINEST requires more data points. Expected: 2, found: " + rangeX.length + ".");
  }
  if (rangeY.length < 2) {
    throw new NAError("LINEST requires more data points. Expected: 2, found: " + rangeY.length + ".");
  }

  let xMean = mean(rangeX);
  let yMean = mean(rangeY);
  let n = rangeX.length;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (rangeX[i] - xMean) * (rangeY[i] - yMean);
    den += Math.pow(rangeX[i] - xMean, 2);
  }
  let m = num / den;
  let b = yMean - m * xMean;
  return [m, b];
};


export {
  FREQUENCY,
  GROWTH,
  LINEST
}