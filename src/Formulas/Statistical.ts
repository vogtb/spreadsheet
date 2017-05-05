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
  TypeCaster
} from "../Utilities/TypeCaster";
import {
  RefError, NumError, DivZeroError, NAError
} from "../Errors";
import {
  SUM,
  ABS
} from "./Math"


/**
 * Calculates the sum of squares of deviations based on a sample.
 * @param values The values or ranges of the sample.
 * @returns {number} sum of squares of deviations
 * @constructor
 */
var DEVSQ = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var range = Filter.flattenAndThrow(values);
  var result = 0;
  var count = 0;
  for (var i = 0; i < range.length; i++) {
    result = result + TypeCaster.valueToNumber(range[i]);
    count++;
  }
  var mean = result / count;
  var result = 0;
  for (var i = 0; i < range.length; i++) {
    result += Math.pow((TypeCaster.valueToNumber(range[i]) - mean), 2);
  }
  return result;
};

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
        throw new RefError("Reference does not exist.");
      }
      var filtered = Filter.filterOutStringValues(currentValue);
      sortedArray = sortedArray.concat(filtered);
    } else {
      sortedArray.push(TypeCaster.valueToNumber(currentValue));
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
        throw new RefError("Reference does not exist.");
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
        throw new RefError("Reference does not exist.");
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
  if (count === 0) {
    throw new DivZeroError("Evaluation of function AVEDEV caused a devide by zero error.");
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
        throw new RefError("Reference does not exist.");
      }
      var filtered = Filter.stringValuesToZeros(values[i]);
      result = result + SUM.apply(this, filtered);
      count += filtered.length;
    } else {
      result = result + TypeCaster.valueToNumber(values[i]);
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
 * @param values[0] data_y - The range representing the array or matrix of dependent data.
 * @param values[1] data_x - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var CORREL = function (...values) : number {
  /**
   * Return the standard deviation of a vector. By defaut, the population standard deviation is returned. Passing true
   * for the flag parameter returns the sample standard deviation. See http://jstat.github.io/vector.html#stdev for
   * more information.
   */
  function stdev(arr, flag) {
    return Math.sqrt(variance(arr, flag));
  }

  /**
   * Return the variance of a vector. By default, the population variance is calculated. Passing true as the flag
   * indicates computes the sample variance instead. See http://jstat.github.io/vector.html#variance for more
   * information.
   */
  function variance(arr, flag) {
    if ((arr.length - (flag ? 1 : 0)) === 0) {
      throw new DivZeroError("Evaluation of function CORREL caused a divide by zero error.");
    }
    return sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
  }

  /**
   * Return the sum of a vector. See http://jstat.github.io/vector.html#sum for more information.
   */
  function sum(arr) {
    var sum = 0;
    var i = arr.length;
    while (--i >= 0) {
      sum += arr[i];
    }
    return sum;
  }
  /**
   * Return the mean of a vector. See http://jstat.github.io/vector.html#mean for more information.
   */
  function mean(arr) {
    if (arr.length === 0) {
      throw new DivZeroError("Evaluation of function CORREL caused a divide by zero error.");
    }
    return sum(arr) / arr.length;
  }

  /**
   * Return the sum of squared errors of prediction of a vector. See http://jstat.github.io/vector.html#sumsqerr for
   * more information.
   */
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

  /**
   * Return the covariance of two vectors. See http://jstat.github.io/vector.html#covariance for more information.
   */
  function covariance(arr1, arr2) {
    var u = mean(arr1);
    var v = mean(arr2);
    var arr1Len = arr1.length;
    var sq_dev = new Array(arr1Len);
    for (var i = 0; i < arr1Len; i++) {
      sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
    }
    if ((arr1Len - 1) === 0) {
      throw new DivZeroError("Evaluation of function CORREL caused a divide by zero error.");
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
    throw new NAError("CORREL has mismatched argument count " + values[0] + " vs " + values[1] + ".");
  }
  var arr1 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(values[0]));
  var arr2 = Filter.filterOutNonNumberValues(Filter.flattenAndThrow(values[1]));
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
 * @param values[0] data_y - The range representing the array or matrix of dependent data.
 * @param values[1] data_x - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
var PEARSON = function (...values) {
  return CORREL.apply(this, values);
};

/**
 * Returns the value of the exponential distribution function with a specified lambda at a specified value.
 * @param values[0] x - The input to the exponential distribution function. If cumulative is TRUE then EXPONDIST returns
 * the cumulative probability of all values up to x.
 * @param values[1] lambda - The lambda to specify the exponential distribution function.
 * @param values[2] cumulative - Whether to use the exponential cumulative distribution.
 * @returns {number} value of the exponential distribution function.
 * @constructor
 */
var EXPONDIST = function (...values) : number {
  function cdf(x, rate) {
    return x < 0 ? 0 : 1 - Math.exp(-rate * x);
  }
  function pdf(x, rate) {
    return x < 0 ? 0 : rate * Math.exp(-rate * x);
  }
  ArgsChecker.checkLength(values, 3);
  var x = TypeCaster.firstValueAsNumber(values[0]);
  var lambda = TypeCaster.firstValueAsNumber(values[1]);
  var cumulative = TypeCaster.firstValueAsBoolean(values[2]);
  return (cumulative) ? cdf(x, lambda) : pdf(x, lambda);
};

/**
 * Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input x.
 * Alternately called Fisher-Snedecor distribution or Snecdor's F distribution.
 * @param values[0] x - The input to the F probability distribution function. The value at which to evaluate the function.
 * Must be a positive number.
 * @param values[1] degrees_freedom1 - The numerator degrees of freedom.
 * @param values[2] degrees_freedom2 - The denominator degrees of freedom.
 * @param values[3] cumulative - Logical value that determines the form of the function. If true returns the cumulative
 * distribution function. If false returns the probability density function.
 * @returns {number|undefined|boolean} left-tailed F probability distribution
 * @constructor
 * TODO: This function should be stricter in its return type.
 */
var FDIST$LEFTTAILED = function (...values) : number|undefined|boolean {
  /**
   * Returns the Log-Gamma function evaluated at x. See http://jstat.github.io/special-functions.html#gammaln for more
   * information.
   */
  function gammaln(x) {
    var j = 0;
    var cof = [
      76.18009172947146, -86.50532032941677, 24.01409824083091,
      -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
    ];
    var ser = 1.000000000190015;
    var xx, y, tmp;
    tmp = (y = xx = x) + 5.5;
    tmp -= (xx + 0.5) * Math.log(tmp);
    for (; j < 6; j++)
      ser += cof[j] / ++y;
    return Math.log(2.5066282746310005 * ser / xx) - tmp;
  }

  /**
   * Returns the Gamma function evaluated at x. This is sometimes called the 'complete' gamma function. See
   * http://jstat.github.io/special-functions.html#gammafn for more information.
   */
  function gammafn(x) {
    var p = [-1.716185138865495, 24.76565080557592, -379.80425647094563,
      629.3311553128184, 866.9662027904133, -31451.272968848367,
      -36144.413418691176, 66456.14382024054
    ];
    var q = [-30.8402300119739, 315.35062697960416, -1015.1563674902192,
      -3107.771671572311, 22538.118420980151, 4755.8462775278811,
      -134659.9598649693, -115132.2596755535];
    var fact;
    var n = 0;
    var xden = 0;
    var xnum = 0;
    var y = x;
    var i, z, yi, res;
    if (y <= 0) {
      res = y % 1 + 3.6e-16;
      if (res) {
        fact = (!(y & 1) ? 1 : -1) * Math.PI / Math.sin(Math.PI * res);
        y = 1 - y;
      } else {
        return Infinity;
      }
    }
    yi = y;
    if (y < 1) {
      z = y++;
    } else {
      z = (y -= n = (y | 0) - 1) - 1;
    }
    for (i = 0; i < 8; ++i) {
      xnum = (xnum + p[i]) * z;
      xden = xden * z + q[i];
    }
    res = xnum / xden + 1;
    if (yi < y) {
      res /= yi;
    } else if (yi > y) {
      for (i = 0; i < n; ++i) {
        res *= y;
        y++;
      }
    }
    if (fact) {
      res = fact / res;
    }
    return res;
  }

  /**
   * Returns the continued fraction for the incomplete Beta function with parameters a and b modified by Lentz's method
   * evaluated at x. For more information see http://jstat.github.io/special-functions.html#betacf.
   */
  function betacf(x, a, b) {
    var fpmin = 1e-30;
    var m = 1;
    var qab = a + b;
    var qap = a + 1;
    var qam = a - 1;
    var c = 1;
    var d = 1 - qab * x / qap;
    var m2, aa, del, h;

    // These q's will be used in factors that occur in the coefficients
    if (Math.abs(d) < fpmin)
      d = fpmin;
    d = 1 / d;
    h = d;

    for (; m <= 100; m++) {
      m2 = 2 * m;
      aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      // One step (the even one) of the recurrence
      d = 1 + aa * d;
      if (Math.abs(d) < fpmin)
        d = fpmin;
      c = 1 + aa / c;
      if (Math.abs(c) < fpmin)
        c = fpmin;
      d = 1 / d;
      h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      // Next step of the recurrence (the odd one)
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

  /**
   * Returns the incomplete Beta function evaluated at (x,a,b). See http://jstat.github.io/special-functions.html#ibeta
   * for more information.
   */
  function ibeta(x, a, b) {
    // Factors in front of the continued fraction.
    var bt = (x === 0 || x === 1) ?  0 :
      Math.exp(gammaln(a + b) - gammaln(a) -
        gammaln(b) + a * Math.log(x) + b *
        Math.log(1 - x));
    if (x < 0 || x > 1)
      return false;
    if (x < (a + 1) / (a + b + 2))
    // Use continued fraction directly.
      return bt * betacf(x, a, b) / a;
    // else use continued fraction after making the symmetry transformation.
    return 1 - bt * betacf(1 - x, b, a) / b;
  }

  /**
   * Returns the value of x in the cdf of the Gamma distribution with the parameters shape (k) and scale (theta). Notice
   * that if using the alpha beta convention, scale = 1/beta. For more information see
   * http://jstat.github.io/distributions.html#jStat.gamma.cdf
   */
  function cdf(x, df1, df2) {
    return ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
  }

  /**
   * Returns the value of x in the pdf of the Gamma distribution with the parameters shape (k) and scale (theta). Notice
   * that if using the alpha beta convention, scale = 1/beta. For more information see
   * http://jstat.github.io/distributions.html#jStat.gamma.pdf
   */
  function pdf(x, df1, df2) {
    if (x < 0) {
      return undefined;
    }
    return Math.sqrt((Math.pow(df1 * x, df1) * Math.pow(df2, df2)) /
        (Math.pow(df1 * x + df2, df1 + df2))) /
      (x * betafn(df1/2, df2/2));
  }
  function betaln(x, y) {
    return gammaln(x) + gammaln(y) - gammaln(x + y);
  }
  function betafn(x, y) {
    // ensure arguments are positive
    if (x <= 0 || y <= 0)
      return undefined;
    // make sure x + y doesn't exceed the upper limit of usable values
    return (x + y > 170) ? Math.exp(betaln(x, y)) : gammafn(x) * gammafn(y) / gammafn(x + y);
  }
  ArgsChecker.checkLength(values, 4);
  var x = TypeCaster.firstValueAsNumber(values[0]);
  if (x < 0) {
    throw new NumError("Function F.DIST parameter 1 value is " + x + ". It should be greater than or equal to 0.");
  }
  var d1 = TypeCaster.firstValueAsNumber(values[1]);
  var d2 = TypeCaster.firstValueAsNumber(values[2]);
  var cumulative = TypeCaster.firstValueAsBoolean(values[3]);
  return (cumulative) ? cdf(x, d1, d2) : pdf(x, d1, d2);
};

/**
 * Returns the inverse of the (right-tailed) F probability distribution. If p = FDIST(x,...), then FINV(p,...) = x. The
 * F distribution can be used in an F-test that compares the degree of variability in two data sets.
 * @param values[0] probability - A probability associated with the F cumulative distribution.
 * @param values[1] deg_freedom1 - Required. The numerator degrees of freedom.
 * @param values[2] deg_freedom2 - Required. The denominator degrees of freedom.
 * @returns {number} inverse of the (right-tailed) F probability distribution
 * @constructor
 */
var FINV = function (...values) : number {
  /**
   * Returns the continued fraction for the incomplete Beta function with parameters a and b modified by Lentz's method
   * evaluated at x. For more information see http://jstat.github.io/special-functions.html#betacf
   */
  function betacf(x, a, b) {
    var fpmin = 1e-30;
    var m = 1;
    var qab = a + b;
    var qap = a + 1;
    var qam = a - 1;
    var c = 1;
    var d = 1 - qab * x / qap;
    var m2, aa, del, h;

    // These q's will be used in factors that occur in the coefficients
    if (Math.abs(d) < fpmin)
      d = fpmin;
    d = 1 / d;
    h = d;

    for (; m <= 100; m++) {
      m2 = 2 * m;
      aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      // One step (the even one) of the recurrence
      d = 1 + aa * d;
      if (Math.abs(d) < fpmin)
        d = fpmin;
      c = 1 + aa / c;
      if (Math.abs(c) < fpmin)
        c = fpmin;
      d = 1 / d;
      h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      // Next step of the recurrence (the odd one)
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

  /**
   * Returns the incomplete Beta function evaluated at (x,a,b). See http://jstat.github.io/special-functions.html#ibeta
   * for more information.
   */
  function ibeta(x, a, b) : number {
    // Factors in front of the continued fraction.
    var bt = (x === 0 || x === 1) ?  0 :
      Math.exp(gammaln(a + b) - gammaln(a) -
        gammaln(b) + a * Math.log(x) + b *
        Math.log(1 - x));
    if (x < 0 || x > 1)
    // WARNING: I changed this to 0, because TS complains about doing numerical operations on boolean values.
    // Still safe in javascript, but not TS.
      return 0;
    if (x < (a + 1) / (a + b + 2))
    // Use continued fraction directly.
      return bt * betacf(x, a, b) / a;
    // else use continued fraction after making the symmetry transformation.
    return 1 - bt * betacf(1 - x, b, a) / b;
  }

  /**
   * Returns the Log-Gamma function evaluated at x. For more information see
   * http://jstat.github.io/special-functions.html#gammaln
   */
  function gammaln(x) {
    var j = 0;
    var cof = [
      76.18009172947146, -86.50532032941677, 24.01409824083091,
      -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
    ];
    var ser = 1.000000000190015;
    var xx, y, tmp;
    tmp = (y = xx = x) + 5.5;
    tmp -= (xx + 0.5) * Math.log(tmp);
    for (; j < 6; j++)
      ser += cof[j] / ++y;
    return Math.log(2.5066282746310005 * ser / xx) - tmp;
  }

  /**
   * Returns the inverse of the incomplete Beta function evaluated at (p,a,b). For more information see
   * http://jstat.github.io/special-functions.html#ibetainv
   */
  function ibetainv(p, a, b) {
    var EPS = 1e-8;
    var a1 = a - 1;
    var b1 = b - 1;
    var j = 0;
    var lna, lnb, pp, t, u, err, x, al, h, w, afac;
    if (p <= 0)
      return 0;
    if (p >= 1)
      return 1;
    if (a >= 1 && b >= 1) {
      pp = (p < 0.5) ? p : 1 - p;
      t = Math.sqrt(-2 * Math.log(pp));
      x = (2.30753 + t * 0.27061) / (1 + t* (0.99229 + t * 0.04481)) - t;
      if (p < 0.5)
        x = -x;
      al = (x * x - 3) / 6;
      h = 2 / (1 / (2 * a - 1)  + 1 / (2 * b - 1));
      w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) *
        (al + 5 / 6 - 2 / (3 * h));
      x = a / (a + b * Math.exp(2 * w));
    } else {
      lna = Math.log(a / (a + b));
      lnb = Math.log(b / (a + b));
      t = Math.exp(a * lna) / a;
      u = Math.exp(b * lnb) / b;
      w = t + u;
      if (p < t / w)
        x = Math.pow(a * w * p, 1 / a);
      else
        x = 1 - Math.pow(b * w * (1 - p), 1 / b);
    }
    afac = -gammaln(a) - gammaln(b) + gammaln(a + b);
    for(; j < 10; j++) {
      if (x === 0 || x === 1)
        return x;
      err = ibeta(x, a, b) - p;
      t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
      u = err / t;
      x -= (t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x)))));
      if (x <= 0)
        x = 0.5 * (x + t);
      if (x >= 1)
        x = 0.5 * (x + t + 1);
      if (Math.abs(t) < EPS * x && j > 0)
        break;
    }
    return x;
  }

  /**
   * http://jstat.github.io/distributions.html
   */
  function inv(x, df1, df2) {
    return df2 / (df1 * (1 / ibetainv(x, df1 / 2, df2 / 2) - 1));
  }
  ArgsChecker.checkLength(values, 3);
  var probability = TypeCaster.firstValueAsNumber(values[0]);
  if (probability <= 0.0 || probability > 1.0) {
    throw new NumError("Function FINV parameter 1 value is " + probability
      + ". It should be greater than or equal to 0, and less than 1.")
  }
  var d1 = TypeCaster.firstValueAsNumber(values[1]);
  var d2 = TypeCaster.firstValueAsNumber(values[2]);
  return inv(1.0 - probability, d1, d2);
};

/**
 * Returns the Fisher transformation of a specified value.
 * @param values[0] value - The value for which to calculate the Fisher transformation.
 * @returns {number} Fisher transformation
 * @constructor
 */
var FISHER = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var x = TypeCaster.firstValueAsNumber(values[0]);
  if (x <= -1 || x >= 1) {
    throw new NumError("Function FISHER parameter 1 value is " + x + ". Valid values are between -1 and 1 exclusive.");
  }
  return Math.log((1 + x) / (1 - x)) / 2;
};

/**
 * Returns the inverse Fisher transformation of a specified value.
 * @param values[0] value - The value for which to calculate the inverse Fisher transformation.
 * @returns {number} inverse Fisher transformation
 * @constructor
 */
var FISHERINV = function (...values) : number {
  ArgsChecker.checkLength(values, 1);
  var y = TypeCaster.firstValueAsNumber(values[0]);
  var e2y = Math.exp(2 * y);
  return (e2y - 1) / (e2y + 1);
};

/**
 * Returns the maximum value in a numeric dataset.
 * @param values The values or range(s) to consider when calculating the maximum value.
 * @returns {number} the maximum value of the dataset
 * @constructor
 */
var MAX = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
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
      maxSoFar = Math.max(TypeCaster.valueToNumber(values[i]), maxSoFar);
    }
  }
  return maxSoFar;
};

/**
 * Returns the maximum numeric value in a dataset.
 * @param values The value(s) or range(s) to consider when calculating the maximum value.
 * @returns {number} maximum value of the dataset
 * @constructor
 */
var MAXA = function (...values) : number {
  return MAX.apply(this, values);
};


/**
 * Returns the minimum value in a numeric dataset.
 * @param values The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value of the dataset
 * @constructor
 */
var MIN = function (...values) {
  ArgsChecker.checkAtLeastLength(values, 1);
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
      minSoFar = Math.min(TypeCaster.valueToNumber(values[i]), minSoFar);
    }
  }
  return minSoFar;
};


/**
 * Returns the minimum numeric value in a dataset.
 * @param values The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value in the dataset
 * @constructor
 */
var MINA = function (...values) : number {
  return MIN.apply(this, values);
};


/**
 * Returns the average of a range depending on criteria.
 * @param values[0] criteria_range - The range to check against criterion.
 * @param values[1] criterion - The pattern or test to apply to criteria_range.
 * @param values[2] average_range - [optional] The range to average. If not included, criteria_range is used for the
 * average instead.
 * @returns {number}
 * @constructor
 * TODO: This needs to also accept a third parameter "average_range"
 */
var AVERAGEIF = function (...values) {
  ArgsChecker.checkLength(values, 2);
  var range = Filter.flatten(values[0]);
  var criteriaEvaluation = CriteriaFunctionFactory.createCriteriaFunction(values[1]);

  var result = 0;
  var count = 0;
  for (var i = 0; i < range.length; i++) {
    var val = TypeCaster.valueToNumber(range[i]);
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
 * @param values The values or ranges to consider when counting.
 * @returns {number} number of numeric values in a dataset.
 * @constructor
 */
var COUNT = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
  var count = 0;
  for (var i = 0; i < values.length; i++) {
    if (values[i] instanceof Array) {
      if (values[i].length > 0) {
        count += COUNT.apply(this, values[i]);
      }
    } else if (TypeCaster.canCoerceToNumber(values[i])) {
      count++;
    }
  }
  return count;
};

/**
 * Returns the a count of the number of values in a dataset.
 * @param values The values or ranges to consider when counting.
 * @returns {number} number of values in a dataset.
 * @constructor
 */
var COUNTA = function (...values) : number {
  ArgsChecker.checkAtLeastLength(values, 1);
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
  MINA
}