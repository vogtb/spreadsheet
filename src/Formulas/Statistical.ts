import {
  ArgsChecker
} from "../Utilities/ArgsChecker";
import {
  CriteriaFunctionFactory
} from "../Utilities/CriteriaFunctionFactory";
import {
  Filter
} from "../Utilities/Filter";
import {
  TypeConverter
} from "../Utilities/TypeConverter";
import {
  RefError, NumError, DivZeroError, NAError
} from "../Errors";
import {
  SUM,
  ABS
} from "./Math";
import {
  cdf,
  covariance,
  inv,
  pdf,
  stdev,
  cleanFloat
} from "../Utilities/MathHelpers";


/**
 * Calculates the sum of squares of deviations based on a sample.
 * @param values - The values or ranges of the sample.
 * @returns {number} sum of squares of deviations
 * @constructor
 */
var DEVSQ = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "DEVSQ");
  var range = Filter.flattenAndThrow(values);
  var result = 0;
  var count = 0;
  for (var i = 0; i < range.length; i++) {
    result = result + TypeConverter.valueToNumber(range[i]);
    count++;
  }
  var mean = result / count;
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    result += Math.pow((TypeConverter.valueToNumber(range[i]) - mean), 2);
  }
  return result;
};

/**
 * Returns the median value in a numeric dataset.
 * @param values - The value(s) or range(s) to consider when calculating the median value.
 * @returns {number} the median value of the dataset
 * @constructor
 */
var MEDIAN = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "MEDIAN");
  var sortedArray = [];
  values.forEach(function (currentValue) {
    if (currentValue instanceof Array) {
      if (currentValue.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(currentValue);
      sortedArray = sortedArray.concat(filtered);
    } else {
      sortedArray.push(TypeConverter.valueToNumber(currentValue));
    }
  });
  sortedArray = sortedArray.sort(function (a, b) {
    var aN = TypeConverter.valueToNumber(a);
    var bN = TypeConverter.valueToNumber(b);
    return aN - bN;
  });
  if (sortedArray.length === 1) {
    return TypeConverter.valueToNumber(sortedArray[0]);
  }
  if (sortedArray.length === 0) {
    throw new NumError("MEDIAN has no valid input data.");
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
 * @param values - The values or ranges to consider when calculating the average value.
 * @returns {number} the average value of this dataset.
 * @constructor
 */
var AVERAGE = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "AVERAGE");
  var result = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + TypeConverter.valueToNumber(values[i]);
      count++;
    }
  }
  return result / count;
};

/**
 * Calculates the average of the magnitudes of deviations of data from a dataset's mean.
 * @param values - The value(s) or range(s)
 * @returns {number} average of the magnitudes of deviations of data from a dataset's mean
 * @constructor
 */
var AVEDEV = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "AVEDEV");

  // Sort to array-values, and non-array-values
  var arrayValues = [];
  var nonArrayValues = [];
  for (var i = 0; i < values.length; i++) {
    var X = values[i];
    if (X instanceof Array) {
      if (X.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      arrayValues.push(X);
    } else {
      nonArrayValues.push(TypeConverter.valueToNumber(X));
    }
  }

  // Remove string values from array-values, but not from non-array-values, and concat.
  var flatValues = Filter.filterOutStringValues(Filter.flatten(arrayValues)).map(function (value) {
    return TypeConverter.valueToNumber(value);
  }).concat(nonArrayValues);

  // Calculating mean
  var result = 0;
  var count = 0;
  for (var i = 0; i < flatValues.length; i++) {
    result = result + TypeConverter.valueToNumber(flatValues[i]);
    count++;
  }
  if (count === 0) {
    throw new DivZeroError("Evaluation of function AVEDEV caused a devide by zero error.");
  }
  var mean = result / count;

  for (var i = 0; i < flatValues.length; i++) {
    flatValues[i] = ABS(TypeConverter.valueToNumber(flatValues[i]) - mean);
  }
  return SUM(flatValues) / flatValues.length;
};

/**
 * Returns the numerical average value in a dataset, coercing text values in ranges to 0 values.
 * @param values - value(s) or range(s) to consider when calculating the average value.
 * @returns {number} the numerical average value in a dataset
 * @constructor
 */
var AVERAGEA = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "AVERAGEA");
  var result = 0;
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      var filtered = Filter.stringValuesToZeros(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + TypeConverter.valueToNumber(values[i]);
      count++;
    }
  }
  if (count === 0) {
    throw new DivZeroError("Evaluation of function AVEDEV caused a devide by zero error.");
  }
  return result / count;
};


/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. CORREL is synonymous with PEARSON.
 * @param dataY - The range representing the array or matrix of dependent data.
 * @param dataX - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var CORREL = function (dataY, dataX) : number {
  ArgsChecker.checkLength(arguments, 2, "CORREL");
  if (!Array.isArray(dataY)) {
    dataY = [dataY];
  }
  if (!Array.isArray(dataX)) {
    dataX = [dataX];
  }
  if (dataY.length !== dataX.length) {
    throw new NAError("CORREL has mismatched argument count " + dataY + " vs " + dataX + ".");
  }
  var arr1 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(dataY));
  var arr2 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(dataX));
  var stdevArr1 = stdev(arr1, 1);
  var stdevArr2 = stdev(arr2, 1);
  if (stdevArr1 === 0 || stdevArr2 === 0) {
    throw new DivZeroError("Evaluation of function CORREL caused a divide by zero error.");
  }
  return covariance(arr1, arr2) / stdevArr1 / stdevArr2;
};

/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. PEARSON is synonymous with CORREL.
 * @param dataY - The range representing the array or matrix of dependent data.
 * @param dataX - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var PEARSON = function (dataY, dataX) {
  ArgsChecker.checkLength(arguments, 2, "PEARSON");
  return CORREL.apply(this, [dataY, dataX]);
};

/**
 * Returns the value of the exponential distribution function with a specified lambda at a specified value.
 * @param x - The input to the exponential distribution function. If cumulative is TRUE then EXPONDIST returns
 * the cumulative probability of all values up to x.
 * @param lambda - The lambda to specify the exponential distribution function.
 * @param cumulative - Whether to use the exponential cumulative distribution.
 * @returns {number} value of the exponential distribution function.
 * @constructor
 */
var EXPONDIST = function (x, lambda, cumulative) : number {
  ArgsChecker.checkLength(arguments, 3, "EXPONDIST");
  function cdf(x, rate) {
    return x < 0 ? 0 : 1 - Math.exp(-rate * x);
  }
  function pdf(x, rate) {
    return x < 0 ? 0 : rate * Math.exp(-rate * x);
  }
  x = TypeConverter.firstValueAsNumber(x);
  lambda = TypeConverter.firstValueAsNumber(lambda);
  cumulative = TypeConverter.firstValueAsBoolean(cumulative);
  return (cumulative) ? cdf(x, lambda) : pdf(x, lambda);
};



/**
 * Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input x.
 * Alternately called Fisher-Snedecor distribution or Snecdor's F distribution.
 * @param x - The input to the F probability distribution function. The value at which to evaluate the function.
 * Must be a positive number.
 * @param degreesFreedom1 - The numerator degrees of freedom.
 * @param degreesFreedom2 - The denominator degrees of freedom.
 * @param cumulative - Logical value that determines the form of the function. If true returns the cumulative
 * distribution function. If false returns the probability density function.
 * @returns {number|boolean} left-tailed F probability distribution
 * @constructor
 * TODO: This function should be stricter in its return type.
 */
var FDIST$LEFTTAILED = function (x, degreesFreedom1, degreesFreedom2, cumulative) : number|undefined|boolean {
  ArgsChecker.checkLength(arguments, 4, "FDIST$LEFTTAILED");

  x = TypeConverter.firstValueAsNumber(x);
  if (x < 0) {
    throw new NumError("Function F.DIST parameter 1 value is " + x + ". It should be greater than or equal to 0.");
  }
  var d1 = TypeConverter.firstValueAsNumber(degreesFreedom1);
  var d2 = TypeConverter.firstValueAsNumber(degreesFreedom2);
  var cum = TypeConverter.firstValueAsBoolean(cumulative);
  return (cum) ? cdf(x, d1, d2) : pdf(x, d1, d2);
};


/**
 * Returns the inverse of the (right-tailed) F probability distribution. If p = FDIST(x,...), then FINV(p,...) = x. The
 * F distribution can be used in an F-test that compares the degree of variability in two data sets.
 * @param probability - A probability associated with the F cumulative distribution.
 * @param degFreedom1 - Required. The numerator degrees of freedom.
 * @param degFreedom2 - Required. The denominator degrees of freedom.
 * @returns {number} inverse of the (right-tailed) F probability distribution
 * @constructor
 */
var FINV = function (probability, degFreedom1, degFreedom2) : number {
  ArgsChecker.checkLength(arguments, 3, "FINV");

  probability = TypeConverter.firstValueAsNumber(probability);
  if (probability <= 0.0 || probability > 1.0) {
    throw new NumError("Function FINV parameter 1 value is " + probability
      + ". It should be greater than or equal to 0, and less than 1.")
  }
  var d1 = TypeConverter.firstValueAsNumber(degFreedom1);
  var d2 = TypeConverter.firstValueAsNumber(degFreedom2);
  return inv(1.0 - probability, d1, d2);
};

/**
 * Returns the Fisher transformation of a specified value.
 * @param value - The value for which to calculate the Fisher transformation.
 * @returns {number} Fisher transformation
 * @constructor
 */
var FISHER = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "FISHER");
  var x = TypeConverter.firstValueAsNumber(value);
  if (x <= -1 || x >= 1) {
    throw new NumError("Function FISHER parameter 1 value is " + x + ". Valid values are between -1 and 1 exclusive.");
  }
  return Math.log((1 + x) / (1 - x)) / 2;
};

/**
 * Returns the inverse Fisher transformation of a specified value.
 * @param value - The value for which to calculate the inverse Fisher transformation.
 * @returns {number} inverse Fisher transformation
 * @constructor
 */
var FISHERINV = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "FISHERINV");
  var y = TypeConverter.firstValueAsNumber(value);
  var e2y = Math.exp(2 * y);
  return (e2y - 1) / (e2y + 1);
};

/**
 * Returns the maximum value in a numeric dataset.
 * @param values - The values or range(s) to consider when calculating the maximum value.
 * @returns {number} the maximum value of the dataset
 * @constructor
 */
var MAX = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "MAX");
  var maxSoFar = -Infinity;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(values[i]);
      if (filtered.length !== 0) {
        maxSoFar = Math.max(MAX.apply(this, filtered), maxSoFar);
      }
    } else {
      maxSoFar = Math.max(TypeConverter.valueToNumber(values[i]), maxSoFar);
    }
  }
  return maxSoFar;
};

/**
 * Returns the maximum numeric value in a dataset.
 * @param values - The value(s) or range(s) to consider when calculating the maximum value.
 * @returns {number} maximum value of the dataset
 * @constructor
 */
var MAXA = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "MAXA");
  var maxSoFar = -Infinity;
  var filteredValues = Filter.stringValuesToZeros(values);
  for (var i = 0; i < filteredValues.length; i++) {
    if (filteredValues[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      var filtered = Filter.stringValuesToZeros(filteredValues[i]);
      if (filtered.length !== 0) {
        maxSoFar = Math.max(MAXA.apply(this, filtered), maxSoFar);
      }
    } else {
      maxSoFar = Math.max(TypeConverter.valueToNumber(filteredValues[i]), maxSoFar);
    }
  }
  return maxSoFar;
};


/**
 * Returns the minimum value in a numeric dataset.
 * @param values - The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value of the dataset
 * @constructor
 */
var MIN = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "MIN");
  var minSoFar = Infinity;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(values[i]);
      if (filtered.length !== 0) {
        minSoFar = Math.min(MIN.apply(this, filtered), minSoFar);
      }
    } else {
      minSoFar = Math.min(TypeConverter.valueToNumber(values[i]), minSoFar);
    }
  }
  return minSoFar;
};


/**
 * Returns the minimum numeric value in a dataset.
 * @param values - The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value in the dataset
 * @constructor
 */
var MINA = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "MINA");
  return MIN.apply(this, values);
};


/**
 * Returns the average of a range depending on criteria.
 * @param criteriaRange - The range to check against criterion.
 * @param criterion - The pattern or test to apply to criteria_range.
 * @param averageRange - [optional] The range to average. If not included, criteria_range is used for the
 * average instead.
 * @returns {number}
 * @constructor
 * TODO: This needs to also accept a third parameter "average_range"
 */
var AVERAGEIF = function (criteriaRange, criterion, averageRange?) {
  ArgsChecker.checkLength(arguments, 2, "AVERAGEIF");
  var range = Filter.flatten(criteriaRange);
  var criteriaEvaluation = CriteriaFunctionFactory.createCriteriaFunction(criterion);

  var result = 0;
  var count = 0;
  for (var i = 0; i < range.length; i++) {
    var val = TypeConverter.valueToNumber(range[i]);
    if (criteriaEvaluation(val)) {
      result = result + val;
      count++;
    }
  }
  if (count === 0) {
    throw new DivZeroError("Evaluation of function AVERAGEIF caused a divide by zero error.");
  }
  return result / count;
};


/**
 * Returns the a count of the number of numeric values in a dataset.
 * @param values - The values or ranges to consider when counting.
 * @returns {number} number of numeric values in a dataset.
 * @constructor
 */
var COUNT = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "COUNT");
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length > 0) {
        count += COUNT.apply(this, values[i]);
      }
    } else if (TypeConverter.canCoerceToNumber(values[i])) {
      count++;
    }
  }
  return count;
};

/**
 * Returns the a count of the number of values in a dataset.
 * @param values - The values or ranges to consider when counting.
 * @returns {number} number of values in a dataset.
 * @constructor
 */
var COUNTA = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "COUNTA");
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length > 0) {
        count += COUNTA.apply(this, values[i]);
      } else {
        count++;
      }
    } else {
      count++;
    }
  }
  return count;
};


/**
 * Returns the value at a given percentile of a set of data.
 * @param data -  The array or range containing the dataset to consider.
 * @param percent - percentile to be calculated and returned.
 * @returns {number}
 * @constructor
 */
var PERCENTILE =  function (data, percent) {
  ArgsChecker.checkLength(arguments, 2, "PERCENTILE");
  var p = TypeConverter.firstValueAsNumber(percent);
  if (p < 0 || p > 1) {
    throw new NumError("Function PERCENTILE parameter 2 value " + p + " is out of range.");
  }
  var range = Filter.flattenAndThrow(data).sort(function (a, b) {
    return a - b;
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });

  var n = range.length;
  var l = p * (n - 1);
  var fl = Math.floor(l);
  return cleanFloat((l === fl) ? range[l] : range[fl] + (l - fl) * (range[fl + 1] - range[fl]));
};


/**
 * Returns a value nearest to a specified quartile of a set of data.
 * @param data -  The array or range containing the set of data to consider.
 * @param quartile - Which quartile value to return. 0 returns 0% mark, 1 returns 25% mark, 2 returns 50% mark, 3
 * returns 75% mark, 4 returns 100% mark.
 * @constructor
 */
var QUARTILE = function (data, quartile) {
  ArgsChecker.checkLength(arguments, 2, "QUARTILE");
  var q = TypeConverter.firstValueAsNumber(quartile);
  if (q < 0 || q > 4) {
    throw new NumError("Function QUARTILE parameter 2 value " + q + " is out of range.");
  }


  var range = Filter.flattenAndThrow(data).sort(function (a, b) {
    return a - b;
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });

  switch (q) {
    case 0:
      return PERCENTILE(range, 0);
    case 1:
      return PERCENTILE(range, 0.25);
    case 2:
      return PERCENTILE(range, 0.5);
    case 3:
      return PERCENTILE(range, 0.75);
    case 4:
      return PERCENTILE(range, 1);
  }
};

export {
  AVERAGE,
  AVERAGEA,
  AVERAGEIF,
  AVEDEV,
  CORREL,
  COUNT,
  COUNTA,
  PEARSON,
  MEDIAN,
  DEVSQ,
  EXPONDIST,
  FDIST$LEFTTAILED,
  FINV,
  FISHER,
  FISHERINV,
  MAX,
  MAXA,
  MIN,
  MINA,
  QUARTILE,
  PERCENTILE
}