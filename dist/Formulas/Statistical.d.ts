/**
 * Calculates the sum of squares of deviations based on a sample.
 * @param values - The values or ranges of the sample.
 * @returns {number} sum of squares of deviations
 * @constructor
 */
declare let DEVSQ: (...values: any[]) => number;
/**
 * Returns the median value in a numeric dataset.
 * @param values - The value(s) or range(s) to consider when calculating the median value.
 * @returns {number} the median value of the dataset
 * @constructor
 */
declare let MEDIAN: (...values: any[]) => number;
/**
 * Returns the numerical average value in a dataset, ignoring text.
 * @param values - The values or ranges to consider when calculating the average value.
 * @returns {number} the average value of this dataset.
 * @constructor
 */
declare let AVERAGE: (...values: any[]) => number;
/**
 * Calculates the average of the magnitudes of deviations of data from a dataset's mean.
 * @param values - The value(s) or range(s)
 * @returns {number} average of the magnitudes of deviations of data from a dataset's mean
 * @constructor
 */
declare let AVEDEV: (...values: any[]) => number;
/**
 * Returns the numerical average value in a dataset, coercing text values in ranges to 0 values.
 * @param values - value(s) or range(s) to consider when calculating the average value.
 * @returns {number} the numerical average value in a dataset
 * @constructor
 */
declare let AVERAGEA: (...values: any[]) => number;
/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. CORREL is synonymous with PEARSON.
 * @param dataY - The range representing the array or matrix of dependent data.
 * @param dataX - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
declare let CORREL: (dataY: any, dataX: any) => number;
/**
 * Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments
 * will be ignored. PEARSON is synonymous with CORREL.
 * @param dataY - The range representing the array or matrix of dependent data.
 * @param dataX - The range representing the array or matrix of independent data.
 * @returns {number} the Pearson product-moment correlation coefficient.
 * @constructor
 */
declare let PEARSON: (dataY: any, dataX: any) => any;
/**
 * Returns the value of the exponential distribution function with a specified lambda at a specified value.
 * @param x - The input to the exponential distribution function. If cumulative is TRUE then EXPONDIST returns
 * the cumulative probability of all values up to x.
 * @param lambda - The lambda to specify the exponential distribution function.
 * @param cumulative - Whether to use the exponential cumulative distribution.
 * @returns {number} value of the exponential distribution function.
 * @constructor
 */
declare let EXPONDIST: (x: any, lambda: any, cumulative: any) => number;
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
declare let FDIST$LEFTTAILED: (x: any, degreesFreedom1: any, degreesFreedom2: any, cumulative: any) => number | boolean;
/**
 * Returns the inverse of the (right-tailed) F probability distribution. If p = FDIST(x,...), then FINV(p,...) = x. The
 * F distribution can be used in an F-test that compares the degree of variability in two data sets.
 * @param probability - A probability associated with the F cumulative distribution.
 * @param degFreedom1 - Required. The numerator degrees of freedom.
 * @param degFreedom2 - Required. The denominator degrees of freedom.
 * @returns {number} inverse of the (right-tailed) F probability distribution
 * @constructor
 */
declare let FINV: (probability: any, degFreedom1: any, degFreedom2: any) => number;
/**
 * Returns the Fisher transformation of a specified value.
 * @param value - The value for which to calculate the Fisher transformation.
 * @returns {number} Fisher transformation
 * @constructor
 */
declare let FISHER: (value: any) => number;
/**
 * Returns the inverse Fisher transformation of a specified value.
 * @param value - The value for which to calculate the inverse Fisher transformation.
 * @returns {number} inverse Fisher transformation
 * @constructor
 */
declare let FISHERINV: (value: any) => number;
/**
 * Returns the maximum value in a numeric dataset.
 * @param values - The values or range(s) to consider when calculating the maximum value.
 * @returns {number} the maximum value of the dataset
 * @constructor
 */
declare let MAX: (...values: any[]) => number;
/**
 * Returns the maximum numeric value in a dataset.
 * @param values - The value(s) or range(s) to consider when calculating the maximum value.
 * @returns {number} maximum value of the dataset
 * @constructor
 */
declare let MAXA: (...values: any[]) => number;
/**
 * Returns the minimum value in a numeric dataset.
 * @param values - The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value of the dataset
 * @constructor
 */
declare let MIN: (...values: any[]) => number;
/**
 * Returns the minimum numeric value in a dataset.
 * @param values - The value(s) or range(s) to consider when calculating the minimum value.
 * @returns {number} the minimum value in the dataset
 * @constructor
 */
declare let MINA: (...values: any[]) => number;
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
declare let AVERAGEIF: (criteriaRange: any, criterion: any, averageRange?: any) => number;
/**
 * Returns the a count of the number of numeric values in a dataset.
 * @param values - The values or ranges to consider when counting.
 * @returns {number} number of numeric values in a dataset.
 * @constructor
 */
declare let COUNT: (...values: any[]) => number;
/**
 * Returns the a count of the number of values in a dataset.
 * @param values - The values or ranges to consider when counting.
 * @returns {number} number of values in a dataset.
 * @constructor
 */
declare let COUNTA: (...values: any[]) => number;
/**
 * Returns the value at a given percentile of a set of data.
 * @param data -  The array or range containing the dataset to consider.
 * @param percent - percentile to be calculated and returned.
 * @returns {number}
 * @constructor
 */
declare let PERCENTILE: (data: any, percent: any) => number;
/**
 * Returns a value nearest to a specified quartile of a set of data.
 * @param data -  The array or range containing the set of data to consider.
 * @param quartile - Which quartile value to return. 0 returns 0 percent mark, 1 returns 25 percent mark, 2 returns 50
 * percent mark, 3 returns 75 percent mark, 4 returns 100 percent mark.
 * @constructor
 */
declare let QUARTILE: (data: any, quartile: any) => number;
/**
 * Calculates the standard deviation of a range, ignoring string values, regardless of whether they can be converted to
 * numbers.
 * @param values - Range of sample.
 * @returns {number}
 * @constructor
 */
declare let STDEV: (...values: any[]) => number;
/**
 * Calculates the standard deviation of a range, converting string values to numbers, if possible. If a value cannot
 * be converted to a number, formula will throw a value error.
 * @param values - Range of sample.
 * @returns {number}
 * @constructor
 */
declare let STDEVA: (...values: any[]) => number;
/**
 * Calculates the standard deviation of an entire population, ignoring string values, regardless of whether they can be
 * converted to numbers.
 * @param values - Entire sample.
 * @returns {number}
 * @constructor
 */
declare let STDEVP: (...values: any[]) => number;
/**
 * Calculates the standard deviation of an entire population, including text and boolean values, if possible. If a value
 * cannot be converted to a number, formula will throw a value error.
 * @param values - Entire sample.
 * @returns {number}
 * @constructor
 */
declare let STDEVPA: (...values: any[]) => number;
/**
 * Returns the mean value of a range excluding some percentage of the range on the high and low ends of the range.
 * @param range - Array or range to consider.
 * @param percent - The portion of the data to exclude on both ends of the range.
 * @returns {number}
 * @constructor
 */
declare let TRIMMEAN: (range: any, percent: any) => number;
/**
 * Returns the slope of the line calculated from linear regression of a range. Any text values passed in will be ignored
 * @param rangeY - The range or array representing the dependent data.
 * @param rangeX - The range or array representing the independent data.
 * @constructor
 */
declare let SLOPE: (rangeY: any, rangeX: any) => number;
/**
 * Returns the normalized equivalent of a random variable given mean and standard deviation of the distribution.
 * @param value - Value to be standardized.
 * @param meanValue - Arithmetic mean of the distribution
 * @param std - The standard deviation of the distribution or range.
 * @returns {number}
 * @constructor
 */
declare let STANDARDIZE: (value: any, meanValue: any, std: any) => number;
/**
 * Returns the Nth smallest value in the range, ignoring text values.
 * @param range -  Range or data-set to consider.
 * @param n - N in 'Nth'.
 * @constructor
 */
declare let SMALL: (range: any, n: any) => number;
/**
 * Returns the Nth largest value in the range, ignoring text values.
 * @param range -  Range or data-set to consider.
 * @param n - N in 'Nth'.
 * @constructor
 */
declare let LARGE: (range: any, n: any) => number;
/**
 * Returns the kurtosis of a data set or range. Ignores text values.
 * @param values - data set or range to calculate. Must be at least 4 values.
 * @returns {number}
 * @constructor
 */
declare let KURT: (...values: any[]) => number;
/**
 * Calculates the y-value at which a line will intersect the y-axis by using known x-values and y-values. Any text
 * values will be ignored.
 * @param rangeY - Dependent range of values.
 * @param rangeX - Independent range of values.
 * @returns {number}
 * @constructor
 */
declare let INTERCEPT: (rangeY: any, rangeX: any) => number;
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
declare let FORECAST: (x: any, rangeY: any, rangeX: any) => number;
/**
 * Returns the Poisson distribution for the given number. Functions the same as POISSON.DIST.
 * @param x - Number to use.
 * @param meanValue - The middle value for the Poisson distribution.
 * @param cumulative - [OPTIONAL] - 0 calculates the density function, 1 calculates the distribution. Defaults to 0.
 * @returns {number}
 * @constructor
 */
declare let POISSON: (x: any, meanValue: any, cumulative?: any) => number;
/**
 * Returns the percentage rank (percentile) of the given value in a sample. Functions the same as PERCENTRANK.INC.
 * @param data - The array or range of data in the sample.
 * @param x - The value.
 * @param significance - [OPTIONAL] - The number of significant digits to use in the calculation. Defaults to 3.
 * @returns {number}
 * @constructor
 */
declare let PERCENTRANK: (data: any, x: any, significance?: any) => number;
/**
 * Returns the percentage rank (percentile) from 0 to 1 exclusive for a value in a sample.
 * @param data - The array or range of data in the sample.
 * @param x - The value
 * @param significance - [OPTIONAL] - The number of significant digits to use in the calculation. Defaults to 3.
 * @returns {number}
 * @constructor
 */
declare let PERCENTRANK$EXC: (data: any, x: any, significance?: any) => number;
/**
 * Returns the inverse of the standard normal distribution for the given number.
 * @param probability - The probability value.
 * @returns {number}
 * @constructor
 */
declare let NORMSINV: (probability: any) => any;
/**
 * Returns the standard normal cumulative distribution for the given number.
 * @param z - Value to use in calculation.
 * @returns {number}
 * @constructor
 */
declare let NORMSDIST: (z: any) => number;
/**
 * Returns the normal distribution for the given number in the distribution.
 * @param x - Value to use.
 * @param meanValue - The mean value of the distribution.
 * @param standDev - The standard deviation of the distribution.
 * @param cumulative - 0 calculates the density function, 1 calculates the distribution.
 * @returns {number}
 * @constructor
 */
declare let NORMDIST: (x: any, meanValue: any, standDev: any, cumulative: any) => number;
/**
 * Returns the inverse of the normal distribution for the given number in the distribution.
 * @param probability - Number in the distribution.
 * @param meanVal - The mean value in the normal distribution.
 * @param standDev - The standard deviation of the normal distribution.
 * @returns {number}
 * @constructor
 */
declare let NORMINV: (probability: any, meanVal: any, standDev: any) => any;
/**
 * Returns the negative binomial distribution.
 * @param k - The value returned for unsuccessful tests.
 * @param r - The value returned for successful tests.
 * @param p - The probability of the success of an attempt, between 0 and 1 inclusively.
 * @returns {number}
 * @constructor
 */
declare let NEGBINOMDIST: (k: any, r: any, p: any) => number;
/**
 * Returns the geometric mean of a sample.
 * @param values - The numerical arguments or ranges that represent a random sample.
 * @returns {number}
 * @constructor
 */
declare let GEOMEAN: (...values: any[]) => number;
/**
 * Returns the harmonic mean of a data set.
 * @param values - The numerical arguments or ranges that represent a sample.
 * @returns {number}
 * @constructor
 */
declare let HARMEAN: (...values: any[]) => number;
/**
 * Returns the (1-alpha) confidence interval for a normal distribution.
 * @param alpha - The level of the confidence interval
 * @param standDev - The standard deviation for the total population
 * @param size - The size of the population.
 * @returns {number}
 * @constructor
 */
declare let CONFIDENCE: (alpha: any, standDev: any, size: any) => number;
/**
 * Returns the individual term binomial distribution probability.
 * @param successes - The number of successes in a set of trials.
 * @param trials - The number of independent trials.
 * @param probability - The probability of success on each trial.
 * @param cumulative - 0 calculates the probability of a single event, 1 calculates the cumulative probability.
 * @returns {number}
 * @constructor
 */
declare let BINOMDIST: (successes: any, trials: any, probability: any, cumulative: any) => number;
/**
 * Returns the covariance of the product of paired deviations.
 * @param dataY - The first range of data.
 * @param dataX - The second range of data.
 * @returns {number}
 * @constructor
 */
declare let COVAR: (dataY: any, dataX: any) => number;
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
declare let WEIBULL: (x: any, shape: any, scale: any, cumulative: any) => number;
/**
 * Estimate the variance based on the entire population. Text will be converted to numbers, if possible.
 * @param values - Values of population.
 * @returns {number}
 * @constructor
 */
declare let VARPA: (...values: any[]) => number;
/**
 * Estimate the variance based on the entire population.
 * @param values - Values of entire population.
 * @returns {number}
 * @constructor
 */
declare let VARP: (...values: any[]) => number;
/**
 * Estimate the variance based on a sample.
 * @param values
 * @returns {number}
 * @constructor
 */
declare let VARA: (...values: any[]) => number;
/**
 * Estimate the variance based on a sample.
 * @param values - Values in sample.
 * @constructor
 */
declare let VAR: (...values: any[]) => number;
/**
 * Returns the number of permutations for a given number of objects.
 * @param total - The total number of objects
 * @param objects - The number of objects in each permutation.
 * @returns {number}
 * @constructor
 */
declare let PERMUT: (total: any, objects: any) => number;
/**
 * Returns the square of the Pearson correlation coefficient based on the given values.
 * @param rangeY - An array or range of data points.
 * @param rangeX - An array or range of data points.
 * @returns {number}
 * @constructor
 */
declare let RSQ: (rangeY: any, rangeX: any) => number;
/**
 * Returns the skewness of a distribution.
 * @param values - The numerical values or range.
 * @returns {number}
 * @constructor
 */
declare let SKEW: (...values: any[]) => number;
/**
 * Returns the standard error of the predicted y value for each x in the regression. Text values will be ignored.
 * @param rangeY - An array or range of data points.
 * @param rangeX - An array or range of data points.
 * @returns {number}
 * @constructor
 */
declare let STEYX: (rangeY: any, rangeX: any) => number;
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
declare let PROB: (range: any, probability: any, start: any, end?: any) => any;
/**
 * Returns the most commonly occurring value in a range.
 * @param values - Range(s) or values to consider.
 * @returns {number}
 * @constructor
 */
declare let MODE: (...values: any[]) => any;
/**
 * Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top.
 * @param value - Value to find the rank of.
 * @param data - Values or range of the data-set.
 * @param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to
 * 0.
 * @returns {number}
 * @constructor
 */
declare let RANK: (value: any, data: any, isAscending?: any) => number;
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
declare let RANK$AVG: (value: any, data: any, isAscending?: any) => number;
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
declare let RANK$EQ: (value: any, data: any, isAscending?: any) => number;
/**
 * Returns the cumulative lognormal distribution for the given number.
 * @param x - The probability value.
 * @param meanValue - The mean value of the standard logarithmic distribution.
 * @param standardDev - The standard deviation of the standard logarithmic distribution.
 * @returns {number}
 * @constructor
 */
declare let LOGNORMDIST: (x: any, meanValue: any, standardDev: any) => number;
/**
 * Returns the t-distribution for the given number.
 * @param x - Value to use in calculation.
 * @param degreesOfFreedom - The number of degrees of freedom for the t-distribution.
 * @param tails - 1 returns the one-tailed test, 2 returns the two-tailed test.
 * @returns {number}
 * @constructor
 */
declare let TDIST: (x: any, degreesOfFreedom: any, tails: any) => number;
/**
 * Returns the hypergeometric distribution. X is the number of results achieved in the random sample.
 * @param numberOfSuccesses - The number of results achieved in the random sample.
 * @param numberOfDraws - The size of the random sample.
 * @param successesInPop - The number of possible results in the total population.
 * @param populationSize - The size of the total population.
 * @returns {number}
 * @constructor
 */
declare let HYPGEOMDIST: (numberOfSuccesses: any, numberOfDraws: any, successesInPop: any, populationSize: any) => number;
/**
 * Returns the two-tailed P value of a z test with standard distribution.
 * @param range - Te array of the data.
 * @param value - The value to be tested.
 * @param stdDev - [OPTIONAL] The standard deviation of the total population. If this argument is missing, the standard
 * deviation of the sample is processed.
 * @returns {number}
 * @constructor
 */
declare let ZTEST: (range: any, value: any, stdDev?: any) => number;
export { AVERAGE, AVERAGEA, AVERAGEIF, AVEDEV, CORREL, COUNT, COUNTA, PEARSON, MEDIAN, DEVSQ, EXPONDIST, FDIST$LEFTTAILED, FINV, FISHER, FISHERINV, MAX, MAXA, MIN, MINA, QUARTILE, PERCENTILE, STDEV, STDEVA, STDEVP, STDEVPA, TRIMMEAN, SLOPE, STANDARDIZE, SMALL, LARGE, KURT, INTERCEPT, FORECAST, POISSON, PERCENTRANK, PERCENTRANK$EXC, NORMSINV, NORMSDIST, NORMDIST, NORMINV, NEGBINOMDIST, GEOMEAN, HARMEAN, CONFIDENCE, BINOMDIST, COVAR, WEIBULL, VARPA, VARP, VARA, VAR, PERMUT, RSQ, SKEW, STEYX, PROB, MODE, RANK, RANK$AVG, RANK$EQ, LOGNORMDIST, TDIST, HYPGEOMDIST, ZTEST };
