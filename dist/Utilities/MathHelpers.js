"use strict";
exports.__esModule = true;
var Errors_1 = require("../Errors");
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
exports.betacf = betacf;
/**
 * Returns the incomplete Beta function evaluated at (x,a,b). See http://jstat.github.io/special-functions.html#ibeta
 * for more information.
 */
function ibeta(x, a, b) {
    // Factors in front of the continued fraction.
    var bt = (x === 0 || x === 1) ? 0 :
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
exports.ibeta = ibeta;
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
        x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
        if (p < 0.5)
            x = -x;
        al = (x * x - 3) / 6;
        h = 2 / (1 / (2 * a - 1) + 1 / (2 * b - 1));
        w = (x * Math.sqrt(al + h) / h) - (1 / (2 * b - 1) - 1 / (2 * a - 1)) *
            (al + 5 / 6 - 2 / (3 * h));
        x = a / (a + b * Math.exp(2 * w));
    }
    else {
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
    for (; j < 10; j++) {
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
exports.ibetainv = ibetainv;
/**
 * http://jstat.github.io/distributions.html
 */
function inv(x, df1, df2) {
    return df2 / (df1 * (1 / ibetainv(x, df1 / 2, df2 / 2) - 1));
}
exports.inv = inv;
/**
 * Return the standard deviation of a vector. By defaut, the population standard deviation is returned. Passing true
 * for the flag parameter returns the sample standard deviation. See http://jstat.github.io/vector.html#stdev for
 * more information.
 */
function stdev(arr, flag) {
    return Math.sqrt(variance(arr, flag));
}
exports.stdev = stdev;
/**
 * Return the variance of a vector. By default, the population variance is calculated. Passing true as the flag
 * indicates computes the sample variance instead. See http://jstat.github.io/vector.html#variance for more
 * information.
 */
function variance(arr, flag) {
    if ((arr.length - (flag ? 1 : 0)) === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function CORREL caused a divide by zero error.");
    }
    return sumsqerr(arr) / (arr.length - (flag ? 1 : 0));
}
exports.variance = variance;
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
exports.sum = sum;
/**
 * Return the mean of a vector. See http://jstat.github.io/vector.html#mean for more information.
 */
function mean(arr) {
    if (arr.length === 0) {
        throw new Errors_1.DivZeroError("Evaluation of function CORREL caused a divide by zero error.");
    }
    return sum(arr) / arr.length;
}
exports.mean = mean;
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
exports.sumsqerr = sumsqerr;
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
        throw new Errors_1.DivZeroError("Evaluation of function CORREL caused a divide by zero error.");
    }
    return sum(sq_dev) / (arr1Len - 1);
}
exports.covariance = covariance;
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
exports.gammaln = gammaln;
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
        }
        else {
            return Infinity;
        }
    }
    yi = y;
    if (y < 1) {
        z = y++;
    }
    else {
        z = (y -= n = (y | 0) - 1) - 1;
    }
    for (i = 0; i < 8; ++i) {
        xnum = (xnum + p[i]) * z;
        xden = xden * z + q[i];
    }
    res = xnum / xden + 1;
    if (yi < y) {
        res /= yi;
    }
    else if (yi > y) {
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
exports.gammafn = gammafn;
/**
 * Returns the value of x in the cdf of the Gamma distribution with the parameters shape (k) and scale (theta). Notice
 * that if using the alpha beta convention, scale = 1/beta. For more information see
 * http://jstat.github.io/distributions.html#jStat.gamma.cdf
 */
function cdf(x, df1, df2) {
    return ibeta((df1 * x) / (df1 * x + df2), df1 / 2, df2 / 2);
}
exports.cdf = cdf;
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
function erf(x) {
    var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
        -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
        4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
        1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
        6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
        -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
        -6.886027e-12, 8.94487e-13, 3.13092e-13,
        -1.12708e-13, 3.81e-16, 7.106e-15,
        -1.523e-15, -9.4e-17, 1.21e-16,
        -2.8e-17];
    var j = cof.length - 1;
    var isneg = false;
    var d = 0;
    var dd = 0;
    var t, ty, tmp, res;
    if (x < 0) {
        x = -x;
        isneg = true;
    }
    t = 2 / (2 + x);
    ty = 4 * t - 2;
    for (; j > 0; j--) {
        tmp = d;
        d = ty * d - dd + cof[j];
        dd = tmp;
    }
    res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
    return isneg ? res - 1 : 1 - res;
}
exports.erf = erf;
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
        (x * betafn(df1 / 2, df2 / 2));
}
exports.pdf = pdf;
function betaln(x, y) {
    return gammaln(x) + gammaln(y) - gammaln(x + y);
}
exports.betaln = betaln;
function betafn(x, y) {
    // ensure arguments are positive
    if (x <= 0 || y <= 0)
        return undefined;
    // make sure x + y doesn't exceed the upper limit of usable values
    return (x + y > 170) ? Math.exp(betaln(x, y)) : gammafn(x) * gammafn(y) / gammafn(x + y);
}
exports.betafn = betafn;
/**
 * Cleans a float number.
 * @param n - number to clean
 * @returns {number} -  clean number
 */
function cleanFloat(n) {
    var power = Math.pow(10, 14);
    return Math.round(n * power) / power;
}
exports.cleanFloat = cleanFloat;
