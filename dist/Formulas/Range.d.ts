/**
 * Calculates the frequency distribution of a range into specified classes or "bins".
 * @param range - to get frequency for.
 * @param bins - or classes.
 * @returns {Array<number>}
 * @constructor
 * TODO: Returns ColumnArray (values stacked in Y-direction)
 */
declare let FREQUENCY: (range: any, bins: any) => number[];
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
declare let GROWTH: (knownY: any, knownX?: any, newX?: any, shouldUseConstant?: any) => any[];
/**
 * Returns the parameters of a linear trend.
 * @param dataY - The range of data representing Y values.
 * @param dataX - The range of data representing X values.
 * @returns {number[]}
 * @constructor
 */
declare let LINEST: (dataY: any, dataX: any) => number[];
export { FREQUENCY, GROWTH, LINEST };
