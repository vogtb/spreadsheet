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
  RefError, NumError, DivZeroError, NAError, ValueError
} from "../Errors";
import {
  SUM,
  ABS,
  FLOOR,
  COMBIN
} from "./Math";
import {
  cdf,
  covariance,
  inv,
  pdf,
  stdev,
  cleanFloat,
  mean,
  gammafn,
  sum,
  erf,
  gammaln
} from "../Utilities/MathHelpers";
import {isDefined, isUndefined} from "../Utilities/MoreUtils";


/**
 * Calculates the sum of squares of deviations based on a sample.
 * @param values - The values or ranges of the sample.
 * @returns {number} sum of squares of deviations
 * @constructor
 */
let DEVSQ = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "DEVSQ");
  let range = Filter.flattenAndThrow(values);
  let result = 0;
  let count = 0;
  for (let i = 0; i < range.length; i++) {
    result = result + TypeConverter.valueToNumber(range[i]);
    count++;
  }
  let mean = result / count;
  result = 0;
  for (let i = 0; i < range.length; i++) {
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
let MEDIAN = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "MEDIAN");
  let sortedArray = [];
  values.forEach(function (currentValue) {
    if (currentValue instanceof Array) {
      if (currentValue.length === 0) {
        throw new RefError("Reference does not exist.");
      }
      let filtered = Filter.filterOutStringValues(currentValue);
      sortedArray = sortedArray.concat(filtered);
    } else {
      sortedArray.push(TypeConverter.valueToNumber(currentValue));
    }
  });
  sortedArray = sortedArray.sort(function (a, b) {
    let aN = TypeConverter.valueToNumber(a);
    let bN = TypeConverter.valueToNumber(b);
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
    let top = sortedArray[sortedArray.length / 2];
    let bottom = sortedArray[(sortedArray.length / 2) - 1];
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
let AVERAGE = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "AVERAGE");
  let result = 0;
  let count = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      let filtered = Filter.filterOutStringValues(values[i]);
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
let AVEDEV = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "AVEDEV");

  // Sort to array-values, and non-array-values
  let arrayValues = [];
  let nonArrayValues = [];
  for (let i = 0; i < values.length; i++) {
    let X = values[i];
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
  let flatValues = Filter.filterOutStringValues(Filter.flatten(arrayValues)).map(function (value) {
    return TypeConverter.valueToNumber(value);
  }).concat(nonArrayValues);

  // Calculating mean
  let result = 0;
  let count = 0;
  for (let i = 0; i < flatValues.length; i++) {
    result = result + TypeConverter.valueToNumber(flatValues[i]);
    count++;
  }
  if (count === 0) {
    throw new DivZeroError("Evaluation of function AVEDEV caused a devide by zero error.");
  }
  let mean = result / count;

  for (let i = 0; i < flatValues.length; i++) {
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
let AVERAGEA = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "AVERAGEA");
  let result = 0;
  let count = 0;
  for (let i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      let filtered = Filter.stringValuesToZeros(values[i]);
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
let CORREL = function (dataY, dataX) : number {
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
  let arr1 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(dataY));
  let arr2 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(dataX));
  let stdevArr1 = stdev(arr1, 1);
  let stdevArr2 = stdev(arr2, 1);
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
let PEARSON = function (dataY, dataX) {
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
let EXPONDIST = function (x, lambda, cumulative) : number {
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
let FDIST$LEFTTAILED = function (x, degreesFreedom1, degreesFreedom2, cumulative) : number|undefined|boolean {
  ArgsChecker.checkLength(arguments, 4, "FDIST$LEFTTAILED");

  x = TypeConverter.firstValueAsNumber(x);
  if (x < 0) {
    throw new NumError("Function F.DIST parameter 1 value is " + x + ". It should be greater than or equal to 0.");
  }
  let d1 = TypeConverter.firstValueAsNumber(degreesFreedom1);
  let d2 = TypeConverter.firstValueAsNumber(degreesFreedom2);
  let cum = TypeConverter.firstValueAsBoolean(cumulative);
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
let FINV = function (probability, degFreedom1, degFreedom2) : number {
  ArgsChecker.checkLength(arguments, 3, "FINV");

  probability = TypeConverter.firstValueAsNumber(probability);
  if (probability <= 0.0 || probability > 1.0) {
    throw new NumError("Function FINV parameter 1 value is " + probability
      + ". It should be greater than or equal to 0, and less than 1.")
  }
  let d1 = TypeConverter.firstValueAsNumber(degFreedom1);
  let d2 = TypeConverter.firstValueAsNumber(degFreedom2);
  return inv(1.0 - probability, d1, d2);
};

/**
 * Returns the Fisher transformation of a specified value.
 * @param value - The value for which to calculate the Fisher transformation.
 * @returns {number} Fisher transformation
 * @constructor
 */
let FISHER = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "FISHER");
  let x = TypeConverter.firstValueAsNumber(value);
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
let FISHERINV = function (value) : number {
  ArgsChecker.checkLength(arguments, 1, "FISHERINV");
  let y = TypeConverter.firstValueAsNumber(value);
  let e2y = Math.exp(2 * y);
  return (e2y - 1) / (e2y + 1);
};

/**
 * Returns the maximum value in a numeric dataset.
 * @param values - The values or range(s) to consider when calculating the maximum value.
 * @returns {number} the maximum value of the dataset
 * @constructor
 */
let MAX = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "MAX");
  let maxSoFar = -Infinity;
  for (let i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      let filtered = Filter.filterOutStringValues(values[i]);
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
let MAXA = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "MAXA");
  let maxSoFar = -Infinity;
  let filteredValues = Filter.stringValuesToZeros(values);
  for (let i = 0; i < filteredValues.length; i++) {
    if (filteredValues[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      let filtered = Filter.stringValuesToZeros(filteredValues[i]);
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
let MIN = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1, "MIN");
  let minSoFar = Infinity;
  for (let i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length === 0) {
        throw new RefError("Reference does not exist.");
      }
      let filtered = Filter.filterOutStringValues(values[i]);
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
let MINA = function (...values) : number {
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
let AVERAGEIF = function (criteriaRange, criterion, averageRange?) {
  ArgsChecker.checkLength(arguments, 2, "AVERAGEIF");
  let range = Filter.flatten(criteriaRange);
  let criteriaEvaluation = CriteriaFunctionFactory.createCriteriaFunction(criterion);

  let result = 0;
  let count = 0;
  for (let i = 0; i < range.length; i++) {
    let val = TypeConverter.valueToNumber(range[i]);
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
let COUNT = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "COUNT");
  let count = 0;
  for (let i = 0; i < values.length; i++) {
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
let COUNTA = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1, "COUNTA");
  let count = 0;
  for (let i = 0; i < values.length; i++) {
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
let PERCENTILE =  function (data, percent) {
  ArgsChecker.checkLength(arguments, 2, "PERCENTILE");
  let p = TypeConverter.firstValueAsNumber(percent);
  if (p < 0 || p > 1) {
    throw new NumError("Function PERCENTILE parameter 2 value " + p + " is out of range.");
  }
  let range = Filter.flattenAndThrow(data).sort(function (a, b) {
    return a - b;
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });

  let n = range.length;
  let l = p * (n - 1);
  let fl = Math.floor(l);
  return cleanFloat((l === fl) ? range[l] : range[fl] + (l - fl) * (range[fl + 1] - range[fl]));
};


/**
 * Returns a value nearest to a specified quartile of a set of data.
 * @param data -  The array or range containing the set of data to consider.
 * @param quartile - Which quartile value to return. 0 returns 0 percent mark, 1 returns 25 percent mark, 2 returns 50
 * percent mark, 3 returns 75 percent mark, 4 returns 100 percent mark.
 * @constructor
 */
let QUARTILE = function (data, quartile) {
  ArgsChecker.checkLength(arguments, 2, "QUARTILE");
  let q = TypeConverter.firstValueAsNumber(quartile);
  if (q < 0 || q > 4) {
    throw new NumError("Function QUARTILE parameter 2 value " + q + " is out of range.");
  }


  let range = Filter.flattenAndThrow(data).sort(function (a, b) {
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


/**
 * Calculates the standard deviation of a range, ignoring string values, regardless of whether they can be converted to
 * numbers.
 * @param values - Range of sample.
 * @returns {number}
 * @constructor
 */
let STDEV = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "STDEV");
  let range = Filter.flattenAndThrow(values);
  let n = range.length;
  let sigma = 0;
  let count = 0;
  let mean = AVERAGE(range);
  for (let i = 0; i < n; i++) {
    let value = TypeConverter.firstValue(range[i]);
    if (typeof value !== "string") {
      sigma += Math.pow(TypeConverter.valueToNumber(value) - mean, 2);
      count++;
    }
  }
  return Math.sqrt(sigma / (count - 1));
};


/**
 * Calculates the standard deviation of a range, converting string values to numbers, if possible. If a value cannot
 * be converted to a number, formula will throw a value error.
 * @param values - Range of sample.
 * @returns {number}
 * @constructor
 */
let STDEVA = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "STDEVA");
  let range = Filter.flattenAndThrow(values).map(function (value) {
    return TypeConverter.firstValueAsNumber(value);
  });
  let n = range.length;
  let sigma = 0;
  let m = mean(range);
  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - m, 2);
  }
  return Math.sqrt(sigma / (n - 1));
};


/**
 * Calculates the standard deviation of an entire population, ignoring string values, regardless of whether they can be
 * converted to numbers.
 * @param values - Entire sample.
 * @returns {number}
 * @constructor
 */
let STDEVP = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "STDEVP");
  let range = Filter.flattenAndThrow(values);
  let n = range.length;
  let sigma = 0;
  let count = 0;
  let m = AVERAGE(range);
  for (let i = 0; i < n; i++) {
    let value = TypeConverter.firstValue(range[i]);
    if (typeof value !== "string") {
      sigma += Math.pow(value - m, 2);
      count++;
    }
  }
  return Math.sqrt(sigma / count);
};


/**
 * Calculates the standard deviation of an entire population, including text and boolean values, if possible. If a value
 * cannot be converted to a number, formula will throw a value error.
 * @param values - Entire sample.
 * @returns {number}
 * @constructor
 */
let STDEVPA = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "STDEVPA");
  let range = Filter.flattenAndThrow(values).map(function (value) {
    return TypeConverter.firstValueAsNumber(value);
  });
  let n = range.length;
  let sigma = 0;
  let count = 0;
  let m = AVERAGE(range);
  for (let i = 0; i < n; i++) {
    let value = TypeConverter.firstValue(range[i]);
    if (typeof value !== "string") {
      sigma += Math.pow(value - m, 2);
      count++;
    }
  }
  return Math.sqrt(sigma / count);
};


/**
 * Returns the mean value of a range excluding some percentage of the range on the high and low ends of the range.
 * @param range - Array or range to consider.
 * @param percent - The portion of the data to exclude on both ends of the range.
 * @returns {number}
 * @constructor
 */
let TRIMMEAN = function (range, percent) {
  ArgsChecker.checkLength(arguments, 2, "TRIMMEAN");
  let p = TypeConverter.firstValueAsNumber(percent);
  if (p < 0) {
    throw new NumError("Function TRIMMEAN parameter 2 value is " + p + ". It should be greater than or equal to 0.");
  }
  if (p >= 1) {
    throw new NumError("Function TRIMMEAN parameter 2 value is " + p + ". It should be less than 1.");
  }
  let data = Filter.flattenAndThrow(range).sort(function (a, b) {
    return a - b;
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });

  if (data.length === 0) {
    throw new RefError("TRIMMEAN has no valid input data.");
  }

  let trim = FLOOR(data.length * p, 2) / 2;
  let tmp = data.slice(trim, data.length);
  return mean(tmp.slice(0, tmp.length - trim));
};


/**
 * Returns the slope of the line calculated from linear regression of a range. Any text values passed in will be ignored
 * @param rangeY - The range or array representing the dependent data.
 * @param rangeX - The range or array representing the independent data.
 * @constructor
 */
let SLOPE = function (rangeY, rangeX) {
  ArgsChecker.checkLength(arguments, 2, "SLOPE");
  let dataX = Filter.flattenAndThrow(rangeX).filter(function (value) {
    return typeof value !== "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });
  let dataY = Filter.flattenAndThrow(rangeY).filter(function (value) {
    return typeof value !== "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });
  if (dataX.length !== dataY.length) {
    throw new NAError("SLOPE has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
  }
  let xmean = mean(dataX);
  let ymean = mean(dataY);
  let n = dataX.length;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (dataX[i] - xmean) * (dataY[i] - ymean);
    den += Math.pow(dataX[i] - xmean, 2);
  }
  if (den === 0) {
    throw new DivZeroError("Evaluation of function SLOPE caused a divide by zero error.");
  }
  return num / den;
};


/**
 * Returns the normalized equivalent of a random variable given mean and standard deviation of the distribution.
 * @param value - Value to be standardized.
 * @param meanValue - Arithmetic mean of the distribution
 * @param std - The standard deviation of the distribution or range.
 * @returns {number}
 * @constructor
 */
let STANDARDIZE = function (value, meanValue, std) {
  ArgsChecker.checkLength(arguments, 3, "STANDARDIZE");
  value = TypeConverter.firstValueAsNumber(value);
  meanValue = TypeConverter.firstValueAsNumber(meanValue);
  std = TypeConverter.firstValueAsNumber(std);
  if (std <= 0) {
    throw new NumError("Function STANDARDIZE parameter 3 value is " + std + ". It should be greater than 0.");
  }
  return (value - meanValue) / std;
};


/**
 * Returns the Nth smallest value in the range, ignoring text values.
 * @param range -  Range or data-set to consider.
 * @param n - N in 'Nth'.
 * @constructor
 */
let SMALL =  function (range, n) {
  ArgsChecker.checkLength(arguments, 2, "SMALL");
  let data = Filter.flattenAndThrow(range).filter(function (value) {
    return typeof value != "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  }).sort(function (a, b) {
    return a - b;
  });
  if (n > data.length || n < 1) {
    throw new NumError("Function SMALL parameter 2 value " + n + " is out of range.");
  }
  return data[n - 1];
};


/**
 * Returns the Nth largest value in the range, ignoring text values.
 * @param range -  Range or data-set to consider.
 * @param n - N in 'Nth'.
 * @constructor
 */
let LARGE =  function (range, n) {
  ArgsChecker.checkLength(arguments, 2, "LARGE");
  let data = Filter.flattenAndThrow(range).filter(function (value) {
    return typeof value != "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  }).sort(function (a, b) {
    return b - a;
  });
  if (n > data.length || n < 1) {
    throw new NumError("Function LARGE parameter 2 value " + n + " is out of range.");
  }
  return data[n - 1];
};


/**
 * Returns the kurtosis of a data set or range. Ignores text values.
 * @param values - data set or range to calculate. Must be at least 4 values.
 * @returns {number}
 * @constructor
 */
let KURT = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 4, "KURT");
  let range = Filter.flattenAndThrow(values).filter(function (value) {
    return typeof value !== "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });
  if (range.length < 4) {
    throw new DivZeroError("KURT requires more values in range. Expected: 4, found: " + range.length + ".");
  }
  let m = mean(range);
  let n = range.length;
  let sigma = 0;
  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - m, 4);
  }
  sigma = sigma / Math.pow(stdev(range, true), 4);
  return ((n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3))) * sigma - 3 * (n - 1) * (n - 1) / ((n - 2) * (n - 3));
};


/**
 * Calculates the y-value at which a line will intersect the y-axis by using known x-values and y-values. Any text
 * values will be ignored.
 * @param rangeY - Dependent range of values.
 * @param rangeX - Independent range of values.
 * @returns {number}
 * @constructor
 */
let INTERCEPT = function (rangeY, rangeX) {
  ArgsChecker.checkLength(arguments, 2, "INTERCEPT");
  let dataX = Filter.flattenAndThrow(rangeX).filter(function (value) {
    return typeof value !== "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });
  let dataY = Filter.flattenAndThrow(rangeY).filter(function (value) {
    return typeof value !== "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });

  if (dataX.length !== dataY.length) {
    throw new NAError("INTERCEPT has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
  }

  let xMean = mean(dataX);
  let yMean = mean(dataY);
  let n = dataX.length;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (dataX[i] - xMean) * (dataY[i] - yMean);
    den += Math.pow(dataX[i] - xMean, 2);
  }
  if (den === 0) {
    throw new DivZeroError("Evaluation of function INTERCEPT caused a divide by zero error.");
  }
  let b = num / den;
  return yMean - b * xMean;
};


/**
 * Calculates the a future value using existing x-values and y-values. Any text values will be ignored.
 * @param x - The data point for which you would like to predict the value.
 * @param rangeY - Dependent range of values.
 * @param rangeX - Independent range of values.
 * @returns {number}
 * @constructor
 * TODO: This formula will fail to parse since the first argument is followed by an argument that is an array.
 * TODO (continued) This is a known issue.
 */
let FORECAST = function (x, rangeY, rangeX) {
  ArgsChecker.checkLength(arguments, 3, "FORECAST");
  x =  TypeConverter.firstValueAsNumber(x);
  let dataX = Filter.flattenAndThrow(rangeX).filter(function (value) {
    return typeof value !== "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });
  let dataY = Filter.flattenAndThrow(rangeY).filter(function (value) {
    return typeof value !== "string";
  }).map(function (value) {
    return TypeConverter.valueToNumber(value);
  });

  if (dataX.length !== dataY.length) {
    throw new NAError("FORECAST has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
  }

  let xMean = mean(dataX);
  let yMean = mean(dataY);
  let n = dataX.length;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (dataX[i] - xMean) * (dataY[i] - yMean);
    den += Math.pow(dataX[i] - xMean, 2);
  }
  if (den === 0) {
    throw new DivZeroError("Evaluation of function FORECAST caused a divide by zero error.");
  }
  let b = num / den;
  let a = yMean - b * xMean;
  return a + b * x;
};


/**
 * Returns the Poisson distribution for the given number. Functions the same as POISSON.DIST.
 * @param x - Number to use.
 * @param meanValue - The middle value for the Poisson distribution.
 * @param cumulative - [OPTIONAL] - 0 calculates the density function, 1 calculates the distribution. Defaults to 0.
 * @returns {number}
 * @constructor
 */
let POISSON = function (x, meanValue, cumulative?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "POISSON");
  x = TypeConverter.firstValueAsNumber(x);
  meanValue = TypeConverter.firstValueAsNumber(meanValue);
  cumulative = (cumulative === undefined) ? 0 : TypeConverter.firstValueAsNumber(cumulative);

  if (x < 0) {
    throw new NumError("Function POISSON parameter 1 value is " + x + ". It should be greater than or equal to 0.");
  }
  if (meanValue < 0) {
    throw new NumError("Function POISSON parameter 2 value is " + x + ". It should be greater than or equal to 0.");
  }

  function factorial(n) {
    return n < 0 ? NaN : gammafn(n + 1);
  }
  function poissonPDF(k, l) {
    return Math.pow(l, k) * Math.exp(-l) / factorial(k);
  }
  function poissonCDF(x, l) {
    let sumarr = [],
      k = 0;
    if (x < 0) return 0;
    for (; k <= x; k++) {
      sumarr.push(poissonPDF(k, l));
    }
    return sum(sumarr);
  };

  return (cumulative) ? poissonCDF(x, meanValue) : poissonPDF(x, meanValue);
};


/**
 * Returns the percentage rank (percentile) of the given value in a sample. Functions the same as PERCENTRANK.INC.
 * @param data - The array or range of data in the sample.
 * @param x - The value.
 * @param significance - [OPTIONAL] - The number of significant digits to use in the calculation. Defaults to 3.
 * @returns {number}
 * @constructor
 */
let PERCENTRANK = function (data, x, significance?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "PERCENTRANK");
  data = Filter.flattenAndThrow(data).map(TypeConverter.valueToNumber).sort(function (a, b) {
    return a - b;
  });
  x = TypeConverter.firstValueAsNumber(x);
  let uniques = Filter.unique(data);
  let n = data.length;
  let m = uniques.length;
  if (x < uniques[0] || x > uniques[m - 1]) {
    throw new NAError("PERCENTRANK does not have valid input data.");
  }
  if (m === 1 && uniques[0] === x) {
    return 1;
  }
  significance = (typeof significance === 'undefined') ? 3 : TypeConverter.firstValueAsNumber(significance);
  let power = Math.pow(10, significance);
  let result = 0;
  let match = false;
  let i = 0;
  while (!match && i < m) {
    if (x === uniques[i]) {
      result = data.indexOf(uniques[i]) / (n - 1);
      match = true;
    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
      result = (data.indexOf(uniques[i]) + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n - 1);
      match = true;
    }
    i++;
  }
  let v = Math.floor(result * power) / power;
  if (isNaN(v)) {
    throw new NAError("PERCENTRANK does not have valid input data.");
  }
  return v;
};


/**
 * Returns the percentage rank (percentile) from 0 to 1 exclusive for a value in a sample.
 * @param data - The array or range of data in the sample.
 * @param x - The value
 * @param significance - [OPTIONAL] - The number of significant digits to use in the calculation. Defaults to 3.
 * @returns {number}
 * @constructor
 */
let PERCENTRANK$EXC = function (data, x, significance?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "PERCENTRANK.EXC");
  data = Filter.flattenAndThrow(data).map(TypeConverter.valueToNumber).sort(function (a, b) {
    return a - b;
  });
  x = TypeConverter.firstValueAsNumber(x);
  let uniques = Filter.unique(data);
  let n = data.length;
  let m = uniques.length;
  if (x < uniques[0] || x > uniques[m - 1]) {
    throw new NAError("PERCENTRANK.EXC does not have valid input data.");
  }
  if (m === 1 && uniques[0] === x) {
    return 1;
  }
  significance = (typeof significance === 'undefined') ? 3 : TypeConverter.firstValueAsNumber(significance);
  let power = Math.pow(10, significance);
  let result = 0;
  let match = false;
  let i = 0;
  while (!match && i < m) {
    if (x === uniques[i]) {
      result = (data.indexOf(uniques[i]) + 1) / (n + 1);
      match = true;
    } else if (x >= uniques[i] && (x < uniques[i + 1] || i === m - 1)) {
      result = (data.indexOf(uniques[i]) + 1 + (x - uniques[i]) / (uniques[i + 1] - uniques[i])) / (n + 1);
      match = true;
    }
    i++;
  }
  let v = Math.floor(result * power) / power;
  if (isNaN(v)) {
    throw new NAError("PERCENTRANK.EXC does not have valid input data.");
  }
  return v;
};


/**
 * Returns the inverse of the standard normal distribution for the given number.
 * @param probability - The probability value.
 * @returns {number}
 * @constructor
 */
let NORMSINV = function (probability) {
  ArgsChecker.checkLength(arguments, 1, "NORMSINV");
  probability =  TypeConverter.firstValueAsNumber(probability);
  function erfc(x) {
    return 1 - erf(x);
  }
  function erfcinv(p) {
    let j = 0;
    let x, err, t, pp;
    if (p >= 2)
      return -100;
    if (p <= 0)
      return 100;
    pp = (p < 1) ? p : 2 - p;
    t = Math.sqrt(-2 * Math.log(pp / 2));
    x = -0.70711 * ((2.30753 + t * 0.27061) /
      (1 + t * (0.99229 + t * 0.04481)) - t);
    for (; j < 2; j++) {
      err = erfc(x) - pp;
      x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
    }
    return (p < 1) ? x : -x;
  }
  function inv(p, mean, std) {
    return -1.41421356237309505 * std * erfcinv(2 * p) + mean;
  }
  if (probability <= 0 || probability >= 1) {
    throw new NumError("Function NORMSINV parameter 1 value is " + probability +
        ". Valid values are between 0 and 1 exclusive.");
  }
  return inv(probability, 0, 1);
};


function _cdf(x, mValue, stdVal) {
  return 0.5 * (1 + erf((x - mValue) / Math.sqrt(2 * stdVal * stdVal)));
}

function _pdf(x, meanVal, std) {
  return Math.exp(-0.5 * Math.log(2 * Math.PI) -
    Math.log(std) - Math.pow(x - meanVal, 2) / (2 * std * std));
}

/**
 * Returns the standard normal cumulative distribution for the given number.
 * @param z - Value to use in calculation.
 * @returns {number}
 * @constructor
 */
let NORMSDIST = function (z) {
  ArgsChecker.checkLength(arguments, 1, "NORMSDIST");
  z = TypeConverter.firstValueAsNumber(z);
  return _cdf(z, 0, 1);
};


/**
 * Returns the normal distribution for the given number in the distribution.
 * @param x - Value to use.
 * @param meanValue - The mean value of the distribution.
 * @param standDev - The standard deviation of the distribution.
 * @param cumulative - 0 calculates the density function, 1 calculates the distribution.
 * @returns {number}
 * @constructor
 */
let NORMDIST =  function (x, meanValue, standDev, cumulative) {
  ArgsChecker.checkLength(arguments, 4, "NORMDIST");
  x = TypeConverter.firstValueAsNumber(x);
  meanValue = TypeConverter.firstValueAsNumber(meanValue);
  standDev = TypeConverter.firstValueAsNumber(standDev);
  cumulative = TypeConverter.firstValueAsNumber(cumulative);
  if (standDev <= 0) {
    throw new NumError("Function NORMDIST parameter 3 value should be greater than 0. It is " + standDev + ".");
  }
  return (cumulative === 0) ? _pdf(x, meanValue, standDev) : _cdf(x, meanValue, standDev);
};

/**
 * Returns the inverse of the normal distribution for the given number in the distribution.
 * @param probability - Number in the distribution.
 * @param meanVal - The mean value in the normal distribution.
 * @param standDev - The standard deviation of the normal distribution.
 * @returns {number}
 * @constructor
 */
let NORMINV = function (probability, meanVal, standDev) {
  ArgsChecker.checkLength(arguments, 3, "NORMINV");
  function erf(x) {
    let cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
      -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
      4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
      1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
      6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
      -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
      -6.886027e-12, 8.94487e-13, 3.13092e-13,
      -1.12708e-13, 3.81e-16, 7.106e-15,
      -1.523e-15, -9.4e-17, 1.21e-16,
      -2.8e-17];
    let j = cof.length - 1;
    let isneg = false;
    let d = 0;
    let dd = 0;
    let t, ty, tmp, res;

    if (x < 0) {
      x = -x;
      isneg = true;
    }

    t = 2 / (2 + x);
    ty = 4 * t - 2;

    for(; j > 0; j--) {
      tmp = d;
      d = ty * d - dd + cof[j];
      dd = tmp;
    }

    res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
    return isneg ? res - 1 : 1 - res;
  }
  function erfc(x) {
    return 1 - erf(x);
  }
  function erfcinv(p) {
    let j = 0;
    let x, err, t, pp;
    if (p >= 2)
      return -100;
    if (p <= 0)
      return 100;
    pp = (p < 1) ? p : 2 - p;
    t = Math.sqrt(-2 * Math.log(pp / 2));
    x = -0.70711 * ((2.30753 + t * 0.27061) /
      (1 + t * (0.99229 + t * 0.04481)) - t);
    for (; j < 2; j++) {
      err = erfc(x) - pp;
      x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
    }
    return (p < 1) ? x : -x;
  }
  function inv(p, meanVal ,std) {
    return -1.41421356237309505 * std * erfcinv(2 * p) + meanVal;
  }
  probability = TypeConverter.firstValueAsNumber(probability);
  meanVal = TypeConverter.firstValueAsNumber(meanVal);
  standDev = TypeConverter.firstValueAsNumber(standDev);
  if (probability <= 0 || probability >= 1) {
    throw new NumError("Function NORMINV parameter 1 value is " + probability +
        ". Valid values are between 0 and 1 exclusive.");
  }
  if (standDev <= 0) {
    throw new NumError("Function NORMINV parameter 3 value is " + standDev + ". It should be greater than 0.");
  }
  return inv(probability, meanVal, standDev);
};


/**
 * Returns the negative binomial distribution.
 * @param k - The value returned for unsuccessful tests.
 * @param r - The value returned for successful tests.
 * @param p - The probability of the success of an attempt, between 0 and 1 inclusively.
 * @returns {number}
 * @constructor
 */
let NEGBINOMDIST = function (k, r, p) {
  ArgsChecker.checkLength(arguments, 3, "NEGBINOMDIST");
  function _gammaln(x) {
    let j = 0;
    let cof = [
      76.18009172947146, -86.50532032941677, 24.01409824083091,
      -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
    ];
    let ser = 1.000000000190015;
    let xx, y, tmp;
    tmp = (y = xx = x) + 5.5;
    tmp -= (xx + 0.5) * Math.log(tmp);
    for (; j < 6; j++)
      ser += cof[j] / ++y;
    return Math.log(2.5066282746310005 * ser / xx) - tmp;
  }
  function _combinationln(n, m) {
    return _factorialln(n) - _factorialln(m) - _factorialln(n - m);
  }
  function _factorialln(n) {
    return n < 0 ? NaN : _gammaln(n + 1);
  }
  function _factorial(n) {
    return n < 0 ? NaN : gammafn(n + 1);
  }
  function _combination(n, m) {
    return (n > 170 || m > 170)
      ? Math.exp(_combinationln(n, m))
      : (_factorial(n) / _factorial(m)) / _factorial(n - m);
  }
  function _pdf(k, r, p) {
    return k !== (k | 0)
      ? 0
      : k < 0
      ? 0
      : _combination(k + r - 1, r - 1) * Math.pow(1 - p, k) * Math.pow(p, r);
  }
  k = TypeConverter.firstValueAsNumber(k);
  r = TypeConverter.firstValueAsNumber(r);
  p = TypeConverter.firstValueAsNumber(p);
  if (k < 1) {
    throw new NumError("Function NEGBINOMDIST parameter 1 value is " + k + ". Should be greater than 0.");
  }
  if (r < 1) {
    throw new NumError("Function NEGBINOMDIST parameter 2 value is " + r + ". Should be greater than 0.");
  }
  if (p < 0 || p > 1) {
    throw new NumError("Function NEGBINOMDIST parameter 3 value is " + p +
        ". Valid values are between 0 and 1 inclusive.");
  }
  return _pdf(k, r, p);
};


/**
 * Returns the geometric mean of a sample.
 * @param values - The numerical arguments or ranges that represent a random sample.
 * @returns {number}
 * @constructor
 */
let GEOMEAN  = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "GEOMEAN");
  function _product(arr) {
    let prod = 1;
    let i = arr.length;
    while (--i >= 0) {
      prod *= arr[i];
    }
    return prod;
  }
  values = Filter.flattenAndThrow(values).map(TypeConverter.valueToNumber).map(function (value) {
    if (value <=0) {
      throw new NumError("GEOMEAN requires inputs greater than 0, but one of the values entered is " + value + ".");
    }
    return value;
  });
  return Math.pow(_product(values), 1 / values.length);
};


/**
 * Returns the harmonic mean of a data set.
 * @param values - The numerical arguments or ranges that represent a sample.
 * @returns {number}
 * @constructor
 */
let HARMEAN = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "HARMEAN");
  let range = Filter.flattenAndThrow(values).map(TypeConverter.valueToNumber).map(function (value) {
    if (value <=0) {
      throw new NumError("HARMEAN requires inputs greater than 0, but one of the values entered is " + value + ".");
    }
    return value;
  });
  let n = range.length;
  let den = 0;
  for (let i = 0; i < n; i++) {
    den += 1 / range[i];
  }
  return n / den;
};


/**
 * Returns the (1-alpha) confidence interval for a normal distribution.
 * @param alpha - The level of the confidence interval
 * @param standDev - The standard deviation for the total population
 * @param size - The size of the population.
 * @returns {number}
 * @constructor
 */
let CONFIDENCE = function (alpha, standDev, size) {
  ArgsChecker.checkLength(arguments, 3, "CONFIDENCE");
  alpha = TypeConverter.firstValueAsNumber(alpha);
  standDev = TypeConverter.firstValueAsNumber(standDev);
  size = TypeConverter.firstValueAsNumber(size);
  if (alpha <= 0 || alpha >= 1) {
    throw new NumError("Function CONFIDENCE parameter 1 value is " + alpha
        + ". Valid values are between 0 and 1 exclusively.");
  }
  if (standDev <= 0) {
    throw new NumError("Function CONFIDENCE parameter 2 value is " + standDev + ". It should be greater than 0.");
  }
  if (size <= 0) {
    throw new NumError("Function CONFIDENCE parameter 3 value is " + size +". It should be at least 1.");
  }
  function _erfc(x) {
    return 1 - erf(x);
  }
  function _erfcinv(p) {
    let j = 0;
    let x, err, t, pp;
    if (p >= 2)
      return -100;
    if (p <= 0)
      return 100;
    pp = (p < 1) ? p : 2 - p;
    t = Math.sqrt(-2 * Math.log(pp / 2));
    x = -0.70711 * ((2.30753 + t * 0.27061) /
      (1 + t * (0.99229 + t * 0.04481)) - t);
    for (; j < 2; j++) {
      err = _erfc(x) - pp;
      x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
    }
    return (p < 1) ? x : -x;
  }
  function _normalInv(p, m, std) {
    return -1.41421356237309505 * std * _erfcinv(2 * p) + m;
  }
  function _sumsqerr(arr) {
    let m = mean(arr);
    let sum = 0;
    let i = arr.length;
    let tmp;
    while (--i >= 0) {
      tmp = arr[i] - m;
      sum += tmp * tmp;
    }
    return sum;
  }
  function _variance(arr, flag?) {
    return _sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
  }
  function _normalci(...values) {
      let ans = new Array(2);
      let change;
    if (values.length === 4) {
      change = Math.abs(_normalInv(values[1] / 2, 0, 1) *
        values[2] / Math.sqrt(values[3]));
    } else {
      change = Math.abs(_normalInv(values[1] / 2, 0, 1) *
        Math.sqrt(_variance(arguments[2])) / Math.sqrt(values[2].length));
    }
    ans[0] = values[0] - change;
    ans[1] = values[0] + change;
    return ans;
  }
  return _normalci(1, alpha, standDev, size)[1] - 1;
};


/**
 * Returns the individual term binomial distribution probability.
 * @param successes - The number of successes in a set of trials.
 * @param trials - The number of independent trials.
 * @param probability - The probability of success on each trial.
 * @param cumulative - 0 calculates the probability of a single event, 1 calculates the cumulative probability.
 * @returns {number}
 * @constructor
 */
let BINOMDIST = function (successes, trials, probability, cumulative) {
  ArgsChecker.checkLength(arguments, 4, "BINOMDIST");
  successes = TypeConverter.firstValueAsNumber(successes);
  trials = TypeConverter.firstValueAsNumber(trials);
  probability = TypeConverter.firstValueAsNumber(probability);
  cumulative = TypeConverter.firstValueAsNumber(cumulative);
  function _binomialCDF(x, n, p) {
    let binomarr = [],
      k = 0;
    if (x < 0) {
      return 0;
    }
    if (x < n) {
      for (; k <= x; k++) {
        binomarr[ k ] = _binomialPDF(k, n, p);
      }
      return sum(binomarr);
    }
    return 1;
  }
  function _combination(n, m) {
    // make sure n or m don't exceed the upper limit of usable values
    return (n > 170 || m > 170)
      ? Math.exp(_combinationln(n, m))
      : (_factorial(n) / _factorial(m)) / _factorial(n - m);
  }
  function _factorial(n) {
    return n < 0 ? NaN : gammafn(n + 1);
  }
  function _factorialln(n) {
    return n < 0 ? NaN : gammaln(n + 1);
  }
  function _combinationln(n, m) {
    return _factorialln(n) - _factorialln(m) - _factorialln(n - m);
  }
  function _binomialPDF(k, n, p) {
    return (p === 0 || p === 1) ?
      ((n * p) === k ? 1 : 0) :
    _combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }
  if (trials < 0) {
    throw new NumError("Function BINOMDIST parameter 2 value is " + trials + ", but should be greater than 0.");
  }
  if (trials < successes) {
    throw new NumError("Function BINOMDIST parameter 1 value is " + trials
        + ". It should be less than or equal to value of Function BINOMDIST parameter 2 with " + successes + ".");
  }
  if (probability > 1 || probability < 0) {
    throw new NumError("Function BINOMDIST parameter 3 value is " + probability
        + ", but should be between 0 and 1 inclusive.");
  }
  return (cumulative) ? _binomialCDF(successes, trials, probability) : _binomialPDF(successes, trials, probability);
};


/**
 * Returns the covariance of the product of paired deviations.
 * @param dataY - The first range of data.
 * @param dataX - The second range of data.
 * @returns {number}
 * @constructor
 */
let COVAR = function (dataY, dataX) {
  ArgsChecker.checkLength(arguments, 2, "COVAR");
  dataY = Filter.flattenAndThrow(dataY).map(TypeConverter.valueToNumber);
  dataX = Filter.flattenAndThrow(dataX).map(TypeConverter.valueToNumber);
  if (dataX.length !== dataY.length) {
    throw new NAError("COlet has mismatched argument count " + dataY.length + " vs " + dataX.length + ".");
  }
  let mean1 = mean(dataY);
  let mean2 = mean(dataX);
  let result = 0;
  let n = dataY.length;
  for (let i = 0; i < n; i++) {
    result += (dataY[i] - mean1) * (dataX[i] - mean2);
  }
  return result / n;
};


/**
 * Returns the values of the Weibull distribution for the given number.
 * @param x - Number to use in calculation.
 * @param shape - The Alpha parameter of the Weibull distribution. Should be greater than 0.
 * @param scale - The Beta parameter of the Weibull distribution. Should be greater than 0.
 * @param cumulative - Indicates the type of function: If 0 the form of the function is calculated, if 1 then the
 * distribution is calculated.
 * @returns {number}
 * @constructor
 */
let WEIBULL = function (x, shape, scale, cumulative) {
  ArgsChecker.checkLength(arguments, 4, "WEIBULL");
  x = TypeConverter.firstValueAsNumber(x);
  if (x < 0) {
    throw new NumError("Function WEIBULL parameter 1 value is " + x + ", but should be greater than or equal to 0.");
  }
  shape = TypeConverter.firstValueAsNumber(shape);
  if (shape <= 0) {
    throw new NumError("Function WEIBULL parameter 2 value is " + shape + ", but should be greater than 0.");
  }
  scale = TypeConverter.firstValueAsNumber(scale);
  if (scale <= 0) {
    throw new NumError("Function WEIBULL parameter 2 value is " + scale + ", but should be greater than 0.");
  }
  cumulative = TypeConverter.firstValueAsNumber(cumulative);
  return (cumulative) ? 1 - Math.exp(-Math.pow(x / scale, shape)) : Math.pow(x, shape - 1)
      * Math.exp(-Math.pow(x / scale, shape)) * shape / Math.pow(scale, shape);
};


/**
 * Estimate the variance based on the entire population. Text will be converted to numbers, if possible.
 * @param values - Values of population.
 * @returns {number}
 * @constructor
 */
let VARPA = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "VARPA");
  let range = Filter.flattenAndThrow(values).map(TypeConverter.valueToNumber);
  let n = range.length;
  if (n < 2) {
    throw new DivZeroError("Evaluation of function VARP caused a divide by zero error.");
  }
  let sigma = 0;
  let count = 0;
  let mean = AVERAGEA(range);
  for (let i = 0; i < n; i++) {
    let el = range[i];
    if (typeof el === 'number') {
      sigma += Math.pow(el - mean, 2);
    } else if (el === true) {
      sigma += Math.pow(1 - mean, 2);
    } else {
      sigma += Math.pow(0 - mean, 2);
    }

    if (el !== null) {
      count++;
    }
  }
  return sigma / count;
};


/**
 * Estimate the variance based on the entire population.
 * @param values - Values of entire population.
 * @returns {number}
 * @constructor
 */
let VARP =  function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "VARP");
  let range = Filter.flattenAndThrow(values).map(TypeConverter.valueToNumber);
  let n = range.length;
  if (n < 2) {
    throw new DivZeroError("Evaluation of function VARP caused a divide by zero error.");
  }
  let sigma = 0;
  let count = 0;
  let mean = AVERAGE(range);
  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2);
    count++;
  }
  return sigma / count;
};


/**
 * Estimate the variance based on a sample.
 * @param values
 * @returns {number}
 * @constructor
 */
let VARA = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "VARA");
  let range = Filter.flattenAndThrow(values).map(TypeConverter.valueToNumber);
  let n = range.length;
  if (n < 2) {
    throw new DivZeroError("Evaluation of function VARA caused a divide by zero error.");
  }
  let sigma = 0;
  let count = 0;
  let mean = AVERAGEA(range);
  for (let i = 0; i < n; i++) {
    let el = range[i];
    if (typeof el === 'number') {
      sigma += Math.pow(el - mean, 2);
    } else if (el === true) {
      sigma += Math.pow(1 - mean, 2);
    } else {
      sigma += Math.pow(0 - mean, 2);
    }

    if (el !== null) {
      count++;
    }
  }
  return sigma / (count - 1);
};


/**
 * Estimate the variance based on a sample.
 * @param values - Values in sample.
 * @constructor
 */
let VAR = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "VAR");
  let range = Filter.flattenAndThrow(values).map(TypeConverter.valueToNumber);
  let n = range.length;
  if (n < 2) {
    throw new DivZeroError("Evaluation of function let caused a divide by zero error.");
  }
  let sigma = 0;
  let count = 0;
  let mean = AVERAGE(range);
  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - mean, 2);
    count++;
  }
  return sigma / (count - 1);
};


/**
 * Returns the number of permutations for a given number of objects.
 * @param total - The total number of objects
 * @param objects - The number of objects in each permutation.
 * @returns {number}
 * @constructor
 */
let PERMUT = function (total, objects) {
  ArgsChecker.checkLength(arguments, 2, "PERMUT");
  total = TypeConverter.firstValueAsNumber(total);
  objects = TypeConverter.firstValueAsNumber(objects);
  if (total < objects) {
    throw new NumError("Function PERMUT parameter 2 value is " + objects +
        ", should be less than or equal to value of Function PERMUT parameter 1 of " + objects + ".");
  }
  let memoizeFact = [];
  function _fact(value) {
    let n = Math.floor(value);
    if (n === 0 || n === 1) {
      return 1;
    } else if (memoizeFact[n] > 0) {
      return memoizeFact[n];
    } else {
      memoizeFact[n] = _fact(n - 1) * n;
      return memoizeFact[n];
    }
  }
  return _fact(total) / _fact(total - objects);
};


/**
 * Returns the square of the Pearson correlation coefficient based on the given values.
 * @param rangeY - An array or range of data points.
 * @param rangeX - An array or range of data points.
 * @returns {number}
 * @constructor
 */
let RSQ = function (rangeY, rangeX) {
  ArgsChecker.checkLength(arguments, 2, "RSQ");
  if (!Array.isArray(rangeY)) {
    rangeY = [rangeY];
  }
  if (!Array.isArray(rangeX)) {
    rangeX = [rangeX];
  }
  let dataX = Filter.flattenAndThrow(rangeX).map(TypeConverter.valueToNumber);
  let dataY = Filter.flattenAndThrow(rangeY).map(TypeConverter.valueToNumber);
  if (dataX.length !== dataY.length) {
    throw new NAError("SLOPE has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
  }
  if (dataY.length === 1 && dataX.length === 1) {
    throw new DivZeroError("Evaluation of function RSQ caused a divide by zero error.");
  }
  return Math.pow(PEARSON(dataX, dataY), 2);
};


/**
 * Returns the skewness of a distribution.
 * @param values - The numerical values or range.
 * @returns {number}
 * @constructor
 */
let SKEW = function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "SKEW");
  let range = Filter.flattenAndThrow(values).map(TypeConverter.valueToNumber);
  let n = range.length;
  if (n < 3) {
    throw new DivZeroError("SKEW requires at least 3 data points.");
  }
  let meanValue = mean(range);
  let sigma = 0;
  for (let i = 0; i < n; i++) {
    sigma += Math.pow(range[i] - meanValue, 3);
  }
  let d = ((n - 1) * (n - 2) * Math.pow(stdev(range, true), 3));
  if (d === 0) {
    throw new DivZeroError("Evaluation of function SKEW caused a divide by zero error.");
  }
  return n * sigma / d;
};


/**
 * Returns the standard error of the predicted y value for each x in the regression. Text values will be ignored.
 * @param rangeY - An array or range of data points.
 * @param rangeX - An array or range of data points.
 * @returns {number}
 * @constructor
 */
let STEYX =  function (rangeY, rangeX) {
  ArgsChecker.checkLength(arguments, 2, "STEYX");
  if (!Array.isArray(rangeY)) {
    rangeY = [rangeY];
  }
  if (!Array.isArray(rangeX)) {
    rangeX = [rangeX];
  }
  let dataX = Filter.flattenAndThrow(rangeX).filter(function (value) {
    return typeof value !== "string";
  }).map(TypeConverter.valueToNumber);
  let dataY = Filter.flattenAndThrow(rangeY).filter(function (value) {
    return typeof value !== "string";
  }).map(TypeConverter.valueToNumber);
  if (dataX.length !== dataY.length) {
    throw new NAError("STEYX has mismatched argument count " + dataX.length + " vs " + dataY.length + ".");
  }
  if (dataY.length === 2 && dataX.length === 2) {
    throw new DivZeroError("Evaluation of function STEYX caused a divide by zero error.");
  }
  let xmean = mean(dataX);
  let ymean = mean(dataY);
  let n = dataX.length;
  let lft = 0;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    lft += Math.pow(dataY[i] - ymean, 2);
    num += (dataX[i] - xmean) * (dataY[i] - ymean);
    den += Math.pow(dataX[i] - xmean, 2);
  }
  return Math.sqrt((lft - num * num / den) / (n - 2));
};


/**
 * Returns the probability that values in a range are between two limits. Data is the array or range of data in the
 * sample.
 * @param range - The array or range of data in the sample.
 * @param probability - The array or range of the corresponding probabilities
 * @param start - The start value of the interval whose probabilities are to be summed.
 * @param end - [OPTIONAL] - The end value of the interval whose probabilities are to be summed. If this parameter is
 * missing, the probability for the start value is calculated
 * @returns {number}
 * @constructor
 */
let PROB =  function (range, probability, start, end?) {
  ArgsChecker.checkLengthWithin(arguments, 3, 4, "PROB");
  range = Filter.flattenAndThrow(range);
  probability = Filter.flattenAndThrow(probability);
  if (range.length !== probability.length) {
    throw new NAError("PROB has mismatched argument count " + range.length + " vs " + probability.length + ".");
  }
  let sum = SUM(probability);
  if (sum <=0 || sum > 1) {
    throw new ValueError("Function PROB parameter 2 should sum to 1, but sums to " + sum + ".");
  }
  start = TypeConverter.firstValueAsNumber(start);
  end = (end === undefined) ? start : TypeConverter.firstValueAsNumber(end);
  if (start === end) {
    return (range.indexOf(start) >= 0) ? probability[range.indexOf(start)] : 0;
  }
  let sorted = range.sort(function (a, b) {
    return a - b;
  });
  let n = sorted.length;
  let result = 0;
  for (let i = 0; i < n; i++) {
    if (sorted[i] >= start && sorted[i] <= end) {
      result += probability[range.indexOf(sorted[i])];
    }
  }
  return result;
};


/**
 * Returns the most commonly occurring value in a range.
 * @param values - Range(s) or values to consider.
 * @returns {number}
 * @constructor
 */
let MODE =  function (...values) {
  ArgsChecker.checkAtLeastLength(arguments, 1, "MODE");
  let range = Filter.flattenAndThrow(values).map(TypeConverter.valueToNumber);
  let n = range.length;
  let count = {};
  let maxItems = [];
  let max = 0;
  let currentItem;
  for (let i = 0; i < n; i++) {
    currentItem = range[i];
    count[currentItem] = count[currentItem] ? count[currentItem] + 1 : 1;
    if (count[currentItem] > max) {
      max = count[currentItem];
      maxItems = [];
    }
    if (count[currentItem] === max) {
      maxItems[maxItems.length] = currentItem;
    }
  }
  if (max === 1 && range.length !== 1) {
    throw new NAError("MODE cannot produce a result because no values occur more than once.");
  }
  return maxItems[0];
};


/**
 * Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top.
 * @param value - Value to find the rank of.
 * @param data - Values or range of the data-set.
 * @param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to
 * 0.
 * @returns {number}
 * @constructor
 */
let RANK = function (value, data, isAscending?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "RANK");
  value = TypeConverter.firstValueAsNumber(value);
  let range = Filter.flattenAndThrow(data).map(TypeConverter.valueToNumber);
  isAscending = (typeof isAscending === 'undefined') ? false : isAscending;
  let sort = (isAscending) ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  };
  range = range.sort(sort);
  let rangeIndex = range.indexOf(value);
  if (rangeIndex === -1) {
    throw new NAError("RANK can't produce a result because parameter 1 is not in the dataset.");
  }
  return range.indexOf(value) + 1;
};


/**
 * Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top. If
 * more than one value exists in the same data-set, the average range of the values will be returned.
 * @param value - Value to find the rank of.
 * @param data - Values or range of the data-set.
 * @param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to
 * 0.
 * @returns {number}
 * @constructor
 */
let RANK$AVG =  function (value, data, isAscending?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "RANK.AVG");
  value = TypeConverter.firstValueAsNumber(value);
  let range = Filter.flattenAndThrow(data).map(TypeConverter.valueToNumber)

  function _countIn(range, value) {
    let result = 0;
    for (let i = 0; i < range.length; i++) {
      if (range[i] === value) {
        result++;
      }
    }
    return result;
  }

  isAscending = (typeof isAscending === 'undefined') ? false : isAscending;
  let sort = (isAscending) ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  };
  range = range.sort(sort);
  let rangeIndex = range.indexOf(value);
  if (rangeIndex === -1) {
    throw new NAError("RANK.AVG can't produce a result because parameter 1 is not in the dataset.");
  }
  let count = _countIn(range, value);
  return (count > 1) ? (2 * rangeIndex + count + 1) / 2 : rangeIndex + 1;
};


/**
 * Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top. If
 * there is more than one entry of the same value in the dataset, the top rank of the entries will be returned.
 * @param value - Value to find the rank of.
 * @param data - Values or range of the data-set.
 * @param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to
 * 0.
 * @returns {number}
 * @constructor
 */
let RANK$EQ =  function (value, data, isAscending?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "RANK.EQ");
  value = TypeConverter.firstValueAsNumber(value);
  let range = Filter.flattenAndThrow(data).map(TypeConverter.valueToNumber);
  isAscending = (typeof isAscending === 'undefined') ? false : isAscending;
  let sort = (isAscending) ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  };
  range = range.sort(sort);
  let rangeIndex = range.indexOf(value);
  if (rangeIndex === -1) {
    throw new NAError("RANK.EQ can't produce a result because parameter 1 is not in the dataset.");
  }
  return range.indexOf(value) + 1;
};

/**
 * Returns the cumulative lognormal distribution for the given number.
 * @param x - The probability value.
 * @param meanValue - The mean value of the standard logarithmic distribution.
 * @param standardDev - The standard deviation of the standard logarithmic distribution.
 * @returns {number}
 * @constructor
 */
let LOGNORMDIST = function (x, meanValue, standardDev) {
  ArgsChecker.checkLength(arguments, 3, "LOGNORMDIST");
  x = TypeConverter.firstValueAsNumber(x);
  meanValue = TypeConverter.firstValueAsNumber(meanValue);
  standardDev = TypeConverter.firstValueAsNumber(standardDev);
  if (x <= 0) {
    throw new NumError("Function LOGNORMDIST parameter 1 value is " + x + ", but should be greater than 0.");
  }
  if (standardDev <= 0) {
    throw new NumError("Function LOGNORMDIST parameter 3 value is " + standardDev + ", but should be greater than 0.");
  }
  let a = (Math.log(x) - meanValue)/Math.sqrt(2 * standardDev * standardDev);
  return 0.5 + 0.5 * erf(a);
};


/**
 * Returns the t-distribution for the given number.
 * @param x - Value to use in calculation.
 * @param degreesOfFreedom - The number of degrees of freedom for the t-distribution.
 * @param tails - 1 returns the one-tailed test, 2 returns the two-tailed test.
 * @returns {number}
 * @constructor
 */
let TDIST = function (x, degreesOfFreedom, tails) {
  ArgsChecker.checkLength(arguments, 3, "TDIST");
  x = TypeConverter.firstValueAsNumber(x);
  degreesOfFreedom = TypeConverter.firstValueAsNumber(degreesOfFreedom);
  tails = TypeConverter.firstValueAsNumber(tails);
  if (tails < 1 || tails > 2) {
    throw new NumError("Function TDIST parameter 3 value is " + tails +
        ", but valid values are between 1 and 2, inclusively.");
  }
  if (degreesOfFreedom < 1) {
    throw new NumError("Function TDIST parameter 2 value is " + degreesOfFreedom +
        ", but it should be greater than or equal to 1.");
  }
  if (x < 0) {
    throw new NumError("Function TDIST parameter 1 value is " + x + ", but it should be greater than or equal to 0.");
  }
  function _betacf(x, a, b) {
    let fpmin = 1e-30;
    let m = 1;
    let qab = a + b;
    let qap = a + 1;
    let qam = a - 1;
    let c = 1;
    let d = 1 - qab * x / qap;
    let m2, aa, del, h;

    if (Math.abs(d) < fpmin)
      d = fpmin;
    d = 1 / d;
    h = d;

    for (; m <= 100; m++) {
      m2 = 2 * m;
      aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < fpmin)
        d = fpmin;
      c = 1 + aa / c;
      if (Math.abs(c) < fpmin)
        c = fpmin;
      d = 1 / d;
      h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < fpmin)
        d = fpmin;
      c = 1 + aa / c;
      if (Math.abs(c) < fpmin)
        c = fpmin;
      d = 1 / d;
      del = d * c;
      h *= del;
      if (Math.abs(del - 1.0) < 3e-7)
        break;
    }

    return h;
  }
  function _ibeta(x, a, b) {
    let bt = (x === 0 || x === 1) ?  0 :
      Math.exp(gammaln(a + b) - gammaln(a) -
        gammaln(b) + a * Math.log(x) + b *
        Math.log(1 - x));
    if (x < 0 || x > 1)
      return 0;
    if (x < (a + 1) / (a + b + 2))
      return bt * _betacf(x, a, b) / a;
    return 1 - bt * _betacf(1 - x, b, a) / b;
  }
  function _studenttCDF(x, dof) {
    let dof2 = dof / 2;
    return _ibeta((x + Math.sqrt(x * x + dof)) /
      (2 * Math.sqrt(x * x + dof)), dof2, dof2);
  }
  return tails * (1 - _studenttCDF(x, degreesOfFreedom));
};

/**
 * Returns the hypergeometric distribution. X is the number of results achieved in the random sample.
 * @param numberOfSuccesses - The number of results achieved in the random sample.
 * @param numberOfDraws - The size of the random sample.
 * @param successesInPop - The number of possible results in the total population.
 * @param populationSize - The size of the total population.
 * @returns {number}
 * @constructor
 */
let HYPGEOMDIST = function (numberOfSuccesses, numberOfDraws, successesInPop, populationSize) {
  ArgsChecker.checkLength(arguments, 4, "HYPGEOMDIST");
  numberOfSuccesses = TypeConverter.firstValueAsNumber(numberOfSuccesses);
  numberOfDraws = TypeConverter.firstValueAsNumber(numberOfDraws);
  if (numberOfSuccesses > numberOfDraws) {
    throw new NumError("HYPGEOMDIST parameter 1 value is " + numberOfSuccesses
        + ", but should be less than or equal to parameter 2 with " + numberOfDraws + ".");
  }
  if (numberOfSuccesses < 0) {
    throw new NumError("HYPGEOMDIST parameter 1 value is " + numberOfSuccesses
        + ", but should be greater than or equal to 0.");
  }
  if (numberOfSuccesses < (numberOfDraws + successesInPop - populationSize)) {
    throw new NumError("HYPGEOMDIST parameter 1 value is " + numberOfSuccesses
        + ", but should be greater than or equal to " + (numberOfDraws + successesInPop - populationSize) + ".");
  }
  successesInPop = TypeConverter.firstValueAsNumber(successesInPop);
  populationSize = TypeConverter.firstValueAsNumber(populationSize);
  return COMBIN(successesInPop, numberOfSuccesses) *
      COMBIN(populationSize - successesInPop, numberOfDraws - numberOfSuccesses) /
      COMBIN(populationSize, numberOfDraws);
};

/**
 * Returns the two-tailed P value of a z test with standard distribution.
 * @param range - Te array of the data.
 * @param value - The value to be tested.
 * @param stdDev - [OPTIONAL] The standard deviation of the total population. If this argument is missing, the standard
 * deviation of the sample is processed.
 * @returns {number}
 * @constructor
 */
let ZTEST = function (range, value, stdDev?) {
  ArgsChecker.checkLengthWithin(arguments, 2, 3, "ZTEST");
  range = Filter.flattenAndThrow(range);
  value = TypeConverter.firstValueAsNumber(value);
  let sd = isUndefined(stdDev) ? STDEV(range) : TypeConverter.firstValueAsNumber(stdDev);
  return 1 - NORMSDIST((AVERAGE(range) - value) / (sd / Math.sqrt(range.length)));
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
  PERCENTILE,
  STDEV,
  STDEVA,
  STDEVP,
  STDEVPA,
  TRIMMEAN,
  SLOPE,
  STANDARDIZE,
  SMALL,
  LARGE,
  KURT,
  INTERCEPT,
  FORECAST,
  POISSON,
  PERCENTRANK,
  PERCENTRANK$EXC,
  NORMSINV,
  NORMSDIST,
  NORMDIST,
  NORMINV,
  NEGBINOMDIST,
  GEOMEAN,
  HARMEAN,
  CONFIDENCE,
  BINOMDIST,
  COVAR,
  WEIBULL,
  VARPA,
  VARP,
  VARA,
  VAR,
  PERMUT,
  RSQ,
  SKEW,
  STEYX,
  PROB,
  MODE,
  RANK,
  RANK$AVG,
  RANK$EQ,
  LOGNORMDIST,
  TDIST,
  HYPGEOMDIST,
  ZTEST
}