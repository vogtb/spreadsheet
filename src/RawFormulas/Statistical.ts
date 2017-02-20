import {
  ArgsChecker,
  Filter,
  TypeCaster
} from "./Utils";
import {
  CellError
} from "../Errors";
import {
  SUM,
  ABS
} from "./Math"
import * as ERRORS from "../Errors";

/**
 * Returns the median value in a numeric dataset.
 * @param values The value(s) or range(s) to consider when calculating the median value.
 * @returns {number} the median value of the dataset
 * @constructor
 */
var MEDIAN = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var sortedArray = [];
  values.forEach(function (currentValue) {
    if (currentValue instanceof Array) {
      if (currentValue.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(currentValue);
      sortedArray = sortedArray.concat(filtered);
    } else {
      sortedArray.push(currentValue);
    }
  });
  sortedArray = sortedArray.sort(function (a, b) {
    var aN = TypeCaster.valueToNumber(a);
    var bN = TypeCaster.valueToNumber(b);
    return aN - bN;
  });
  if (sortedArray.length === 1) {
    return TypeCaster.valueToNumber(sortedArray[0]);
  }
  if (sortedArray.length === 0) {
    throw new CellError(ERRORS.NUM_ERROR, "MEDIAN has no valid input data.");
  }
  // even number of values
  if (sortedArray.length % 2 === 0) {
    if (sortedArray.length === 2) {
      return AVERAGE(sortedArray[0], sortedArray[1]);
    }
    var top = sortedArray[sortedArray.length / 2];
    var bottom = sortedArray[(sortedArray.length / 2) - 1];
    return AVERAGE(top, bottom);
  } else {
    // odd number of values
    return sortedArray[Math.round(sortedArray.length / 2) - 1];
  }
};

/**
 * Returns the numerical average value in a dataset, ignoring text.
 * @param values The values or ranges to consider when calculating the average value.
 * @returns {number} the average value of this dataset.
 * @constructor
 */
var AVERAGE = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var result = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + TypeCaster.valueToNumber(values[i]);
      count++;
    }
  }
  return result / count;
};

/**
 * Calculates the average of the magnitudes of deviations of data from a dataset's mean.
 * @param values The value(s) or range(s)
 * @returns {number} average of the magnitudes of deviations of data from a dataset's mean
 * @constructor
 */
var AVEDEV = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);

  // Sort to array-values, and non-array-values
  var arrayValues = [];
  var nonArrayValues = [];
  for (var i = 0; i < values.length; i++) {
    var X = values[i];
    if (X instanceof Array) {
      if (X.length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      arrayValues.push(X);
    } else {
      nonArrayValues.push(TypeCaster.valueToNumber(X));
    }
  }

  // Remove string values from array-values, but not from non-array-values, and concat.
  var flatValues = Filter.filterOutStringValues(Filter.flatten(arrayValues)).map(function (value) {
    return TypeCaster.valueToNumber(value);
  }).concat(nonArrayValues);

  // Calculating mean
  var result = 0;
  var count = 0;
  for (var i = 0; i < flatValues.length; i++) {
    result = result + TypeCaster.valueToNumber(flatValues[i]);
    count++;
  }
  var mean = result / count;

  for (var i = 0; i < flatValues.length; i++) {
    flatValues[i] = ABS(TypeCaster.valueToNumber(flatValues[i]) - mean);
  }
  return SUM(flatValues) / flatValues.length;
};

/**
 * Returns the numerical average value in a dataset, coercing text values in ranges to 0 values.
 * @param values value(s) or range(s) to consider when calculating the average value.
 * @returns {number} the numerical average value in a dataset
 * @constructor
 */
var AVERAGEA = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
  var result = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new CellError(ERRORS.REF_ERROR, "Reference does not exist.");
      }
      var filtered = Filter.stringValuesToZeros(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + TypeCaster.valueToNumber(values[i]);
      count++;
    }
  }
  return result / count;
};

/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. CORREL is synonymous with PEARSON.
 * @param values[0] data_y - The range representing the array or matrix of dependent data.
 * @param values[1] data_x - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var CORREL = function (...values) : number {
  function stdev(arr, flag) {
    return Math.sqrt(variance(arr, flag));
  }
  function variance(arr, flag) {
    if ((arr.length - (flag ? 1 : 0)) === 0) {
      throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function CORREL caused a divide by zero error.");
    }
    return sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
  }
  function sum(arr) {
    var sum = 0;
    var i = arr.length;
    while (--i >= 0) {
      sum += arr[i];
    }
    return sum;
  }
  function mean(arr) {
    return sum(arr) / arr.length;
  }
  function sumsqerr(arr) {
    var m = mean(arr);
    var sum = 0;
    var i = arr.length;
    var tmp;
    while (--i >= 0) {
      tmp = arr[i] - m;
      sum += tmp * tmp;
    }
    return sum;
  }
  function covariance(arr1, arr2) {
    var u = mean(arr1);
    var v = mean(arr2);
    var arr1Len = arr1.length;
    var sq_dev = new Array(arr1Len);
    for (var i = 0; i < arr1Len; i++) {
      sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
    }
    if ((arr1Len - 1) === 0) {
      throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function CORREL caused a divide by zero error.");
    }
    return sum(sq_dev) / (arr1Len - 1);
  }
  ArgsChecker.checkLength(values, 2);
  if (!Array.isArray(values[0])) {
    values[0] = [values[0]];
  }
  if (!Array.isArray(values[1])) {
    values[1] = [values[1]];
  }
  if (values[0].length !== values[1].length) {
    throw new CellError(ERRORS.NA_ERROR, "CORREL has mismatched argument count " + values[0] + " vs " + values[1] + ".");
  }
  var arr1 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(values[0]));
  var arr2 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(values[1]));
  var stdevArr1 = stdev(arr1, 1);
  var stdevArr2 = stdev(arr2, 1);
  if (stdevArr1 === 0 || stdevArr2 === 0) {
    throw new CellError(ERRORS.DIV_ZERO_ERROR, "Evaluation of function CORREL caused a divide by zero error.");
  }
  return covariance(arr1, arr2) / stdev(arr1, 1) / stdev(arr2, 1);
};

/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. PEARSON is synonymous with CORREL.
 * @param values[0] data_y - The range representing the array or matrix of dependent data.
 * @param values[1] data_x - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var PEARSON = function (...values) {
  return CORREL.apply(this, values);
};


export {
  AVERAGE,
  AVERAGEA,
  AVEDEV,
  CORREL,
  PEARSON,
  MEDIAN
}