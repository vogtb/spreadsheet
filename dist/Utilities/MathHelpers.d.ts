/**
 * Returns the continued fraction for the incomplete Beta function with parameters a and b modified by Lentz's method
 * evaluated at x. For more information see http://jstat.github.io/special-functions.html#betacf
 */
declare function betacf(x: any, a: any, b: any): any;
/**
 * Returns the incomplete Beta function evaluated at (x,a,b). See http://jstat.github.io/special-functions.html#ibeta
 * for more information.
 */
declare function ibeta(x: any, a: any, b: any): number;
/**
 * Returns the inverse of the incomplete Beta function evaluated at (p,a,b). For more information see
 * http://jstat.github.io/special-functions.html#ibetainv
 */
declare function ibetainv(p: any, a: any, b: any): any;
/**
 * http://jstat.github.io/distributions.html
 */
declare function inv(x: any, df1: any, df2: any): number;
/**
 * Return the standard deviation of a vector. By defaut, the population standard deviation is returned. Passing true
 * for the flag parameter returns the sample standard deviation. See http://jstat.github.io/vector.html#stdev for
 * more information.
 */
declare function stdev(arr: any, flag: any): number;
/**
 * Return the variance of a vector. By default, the population variance is calculated. Passing true as the flag
 * indicates computes the sample variance instead. See http://jstat.github.io/vector.html#variance for more
 * information.
 */
declare function variance(arr: any, flag: any): number;
/**
 * Return the sum of a vector. See http://jstat.github.io/vector.html#sum for more information.
 */
declare function sum(arr: any): number;
/**
 * Return the mean of a vector. See http://jstat.github.io/vector.html#mean for more information.
 */
declare function mean(arr: any): number;
/**
 * Return the sum of squared errors of prediction of a vector. See http://jstat.github.io/vector.html#sumsqerr for
 * more information.
 */
declare function sumsqerr(arr: any): number;
/**
 * Return the covariance of two vectors. See http://jstat.github.io/vector.html#covariance for more information.
 */
declare function covariance(arr1: any, arr2: any): number;
/**
 * Returns the Log-Gamma function evaluated at x. See http://jstat.github.io/special-functions.html#gammaln for more
 * information.
 */
declare function gammaln(x: any): number;
/**
 * Returns the Gamma function evaluated at x. This is sometimes called the 'complete' gamma function. See
 * http://jstat.github.io/special-functions.html#gammafn for more information.
 */
declare function gammafn(x: any): any;
/**
 * Returns the value of x in the cdf of the Gamma distribution with the parameters shape (k) and scale (theta). Notice
 * that if using the alpha beta convention, scale = 1/beta. For more information see
 * http://jstat.github.io/distributions.html#jStat.gamma.cdf
 */
declare function cdf(x: any, df1: any, df2: any): number;
/**
 * Returns the error function evaluated at x. See also:
 *
 * * http://jstat.github.io/special-functions.html#erf
 *
 * * https://github.com/jstat/jstat/search?utf8=%E2%9C%93&q=erf&type=
 *
 * @param x to evaluate
 * @returns {number} error
 */
declare function erf(x: any): number;
/**
 * Returns the value of x in the pdf of the Gamma distribution with the parameters shape (k) and scale (theta). Notice
 * that if using the alpha beta convention, scale = 1/beta. For more information see
 * http://jstat.github.io/distributions.html#jStat.gamma.pdf
 */
declare function pdf(x: any, df1: any, df2: any): number;
declare function betaln(x: any, y: any): number;
declare function betafn(x: any, y: any): number;
/**
 * Cleans a float number.
 * @param n - number to clean
 * @returns {number} -  clean number
 */
declare function cleanFloat(n: any): number;
export { betacf, betafn, betaln, cdf, covariance, erf, gammafn, gammaln, ibeta, ibetainv, inv, mean, pdf, stdev, sum, sumsqerr, variance, cleanFloat };
