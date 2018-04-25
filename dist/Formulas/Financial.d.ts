/**
 * Calculates the depreciation of an asset for a specified period using the double-declining balance method.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of the asset at the end of depreciation.
 * @param life - The number of periods over which the asset is depreciated.
 * @param period - The single period within life for which to calculate depreciation.
 * @param factor - [ OPTIONAL - 2 by default ] - The factor by which depreciation decreases.
 * @returns {number} depreciation of an asset for a specified period
 * @constructor
 */
declare let DDB: (cost: any, salvage: any, life: any, period: any, factor?: any) => number;
/**
 * Calculates the depreciation of an asset for a specified period using the arithmetic declining balance method.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of the asset at the end of depreciation.
 * @param life - The number of periods over which the asset is depreciated.
 * @param period - The single period within life for which to calculate depreciation.
 * @param month - [ OPTIONAL - 12 by default ] - The number of months in the first year of depreciation.
 * @returns {number} depreciated value
 * @constructor
 */
declare let DB: (cost: any, salvage: any, life: any, period: any, month: any) => number;
/**
 * Formats a number into the locale-specific currency format. WARNING: Currently the equivalent of TRUNC, since this
 * returns numbers
 * @param number - The value to be formatted.
 * @param places - [ OPTIONAL - 2 by default ] - The number of decimal places to display.
 * @returns {number} dollars
 * @constructor
 */
declare let DOLLAR: (number: any, places?: any) => number;
/**
 * Converts a price quotation given as a decimal fraction into a decimal value.
 * @param fractionalPrice - The price quotation given using fractional decimal conventions.
 * @param unit - The units of the fraction, e.g. 8 for 1/8ths or 32 for 1/32nds.
 * @returns {number} decimal value.
 * @constructor
 */
declare let DOLLARDE: (fractionalPrice: any, unit: any) => number;
/**
 * Converts a price quotation given as a decimal value into a decimal fraction.
 * @param decimalPrice - The price quotation given as a decimal value.
 * @param unit - The units of the desired fraction, e.g. 8 for 1/8ths or 32 for 1/32nds
 * @returns {number} price quotation as decimal fraction.
 * @constructor
 */
declare let DOLLARFR: (decimalPrice: any, unit: any) => number;
/**
 * Calculates the annual effective interest rate given the nominal rate and number of compounding periods per year.
 * @param nominalRate - The nominal interest rate per year.
 * @param periodsPerYear - The number of compounding periods per year.
 * @returns {number} annual effective interest rate
 * @constructor
 */
declare let EFFECT: (nominalRate: any, periodsPerYear: any) => number;
/**
 * Calculates the periodic payment for an annuity investment based on constant-amount periodic payments and a constant
 * interest rate.
 * @param rate - The interest rate.
 * @param periods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param futureValue [ OPTIONAL ] - The future value remaining after the final payment has been made.
 * @param endOrBeginning [ OPTIONAL - 0 by default ] - Whether payments are due at the end (0) or beginning (1) of each
 * period.
 * @returns {number}
 * @constructor
 */
declare let PMT: (rate: any, periods: any, presentValue: any, futureValue?: any, endOrBeginning?: any) => number;
/**
 * Returns the future value of an investment based on periodic, constant payments and a constant interest rate.
 * @param rate - The rate of periodic interest.
 * @param periods - The total number of periods.
 * @param payment - The annuity paid regularly per period
 * @param value - [OPTIONAL] - The present cash value of an investment.
 * @param type - [OPTIONAL] - Defines whether the payment is due at the beginning (1) or the end (0) of a period.
 * @returns {number}
 * @constructor
 */
declare let FV: (rate: any, periods: any, payment: any, value?: any, type?: any) => number;
/**
 * Calculates the cumulative principal paid over a range of payment periods for an investment based on constant-amount
 * periodic payments and a constant interest rate.
 * @param rate - The interest rate.
 * @param numberOfPeriods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param firstPeriod - The number of the payment period to begin the cumulative calculation. must be greater
 * than or equal to 1.
 * @param lastPeriod - The number of the payment period to end the cumulative calculation, must be greater
 * than first_period.
 * @param endOrBeginning - Whether payments are due at the end (0) or beginning (1) of each period
 * @returns {number} cumulative principal
 * @constructor
 */
declare let CUMPRINC: (rate: any, numberOfPeriods: any, presentValue: any, firstPeriod: any, lastPeriod: any, endOrBeginning: any) => number;
/**
 * Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount
 * periodic payments and a constant interest rate.
 * @param rate - The interest rate.
 * @param numberOfPeriods - The number of payments to be made.
 * @param presentValue - The current value of the annuity.
 * @param firstPeriod - The number of the payment period to begin the cumulative calculation, must be greater
 * than or equal to 1.
 * @param lastPeriod - The number of the payment period to end the cumulative calculation, must be greater
 * than first_period.
 * @param endOrBeginning - Whether payments are due at the end (0) or beginning (1) of each period.
 * @returns {number} cumulative interest
 * @constructor
 */
declare let CUMIPMT: (rate: any, numberOfPeriods: any, presentValue: any, firstPeriod: any, lastPeriod: any, endOrBeginning: any) => number;
/**
 * Calculates the accrued interest of a security that has periodic payments.
 * WARNING: This function has been implemented to specifications as outlined in Google Spreadsheets, LibreOffice, and
 * OpenOffice. It functions much the same as MSExcel's ACCRINT, but there are several key differences. Below are links
 * to illustrate the differences. Please see the source code for more information on differences. Links: https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint, https://support.office.com/en-us/article/ACCRINT-function-fe45d089-6722-4fb3-9379-e1f911d8dc74, https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint, https://support.google.com/docs/answer/3093200 .
 * @param issue - The date the security was initially issued.
 * @param firstPayment - The first date interest will be paid.
 * @param settlement - The settlement date of the security, the date after issuance when the security is
 * delivered to the buyer. Is the maturity date of the security if it is held until maturity rather than sold.
 * @param rate - The annualized rate of interest.
 * @param redemption - The redemption amount per 100 face value, or par.
 * @param frequency - The number of coupon payments per year. For annual payments, frequency = 1; for
 * semiannual, frequency = 2; for quarterly, frequency = 4.
 * @param dayCountConvention - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use.
 * 0 or omitted = US (NASD) 30/360, 1 = Actual/actual, 2 = Actual/360, 3 = Actual/365, 4 = European 30/360.
 * @returns {number}
 * @constructor
 * TODO: This function is based off of the open-source versions I was able to dig up online. We should implement a
 * TODO:     second version that is closer to what MSExcel does and is named something like `ACCRINT.MS`.
 */
declare let ACCRINT: (issue: any, firstPayment: any, settlement: any, rate: any, redemption: any, frequency: any, dayCountConvention?: any) => number;
/**
 * Returns the arithmetic-declining depreciation rate. Use this function to calculate the depreciation amount for one
 * period of the total depreciation span of an object. Arithmetic declining depreciation reduces the depreciation amount
 * from period to period by a fixed sum.
 * @param cost - The initial cost of an asset.
 * @param salvage - the value of an asset after depreciation.
 * @param life - The period fixing the time span over which an asset is depreciated.
 * @param period - The period for which the depreciation is to be calculated.
 * @returns {number}
 * @constructor
 */
declare let SYD: (cost: any, salvage: any, life: any, period: any) => number;
/**
 * Returns the straight-line depreciation of an asset for one period. The amount of the depreciation is constant during
 * the depreciation period.
 * @param cost - The initial cost of the asset.
 * @param salvage - The value of an asset at the end of the depreciation.
 * @param life - The depreciation period determining the number of periods in the deprecation of the asset.
 * @returns {number}
 * @constructor
 */
declare let SLN: (cost: any, salvage: any, life: any) => number;
/**
 * Returns the net present value of an investment based on a series of periodic cash flows and a discount rate.
 * @param rate - The discount rate for a period.
 * @param values - The values representing deposits or withdrawals.
 * @returns {number}
 * @constructor
 * TODO: This function can return results that are prone to floating point precision errors.
 */
declare let NPV: (rate: any, ...values: any[]) => number;
/**
 * Returns the number of payment for an investment. Number is based on constant-amount payments made periodically and a
 * constant interest rate.
 * @param rate - The interest rate.
 * @param payment - The amount of each payment.
 * @param present - THe current value.
 * @param future - [OPTIONAL] - The future value remaining after the final payment has been made.
 * @param type [OPTIONAL 0 by default] - 1 indicates payments are due at the beginning of each period. 0 indicates
 * payments are due at the end of each period.
 * @returns {number}
 * @constructor
 */
declare let NPER: (rate: any, payment: any, present: any, future?: any, type?: any) => number;
/**
 * Calculates the yearly nominal interest rate, given the effective rate and the number of compounding periods per year.
 * @param rate - The effective interest rate.
 * @param periods - The number of periodic interest payments per year.
 * @returns {number}
 * @constructor
 */
declare let NOMINAL: (rate: any, periods: any) => number;
/**
 * Calculates the modified internal rate of return of a series of investments.
 * @param values - Range or values of payments. Ignores text values.
 * @param financeRate - The rate of interest of the investments.
 * @param reinvestRate - The rate of interest of the reinvestment.
 * @returns {number}
 * @constructor
 * TODO: This relies on NPV and will therefore be prone to floating-point errors.
 */
declare let MIRR: (values: any, financeRate: any, reinvestRate: any) => number;
/**
 * Calculates the internal rate of return for an investment. The values represent cash flow values at regular intervals;
 * at least one value must be negative (payments), and at least one value must be positive (income).
 *
 * Relevant StackOverflow discussion: https://stackoverflow.com/questions/15089151/javascript-irr-internal-rate-of-return-formula-accuracy
 *
 * @param values - Range containing values. Ignores text values.
 * @param guess - [OPTIONAL] - The estimated value. Defaults to 0.01.
 * @returns {number}
 * @constructor
 */
declare let IRR: (values: any, guess?: any) => any;
/**
 * Calculates the periodic amortization for an investment with regular payments and a constant interest rate.
 * @param rate - The periodic interest rate.
 * @param period - The period for which the compound interest is calculated.
 * @param periods - The total number of periods during which the annuity is paid.
 * @param present - The present cash value in sequence of payments.
 * @param future - [OPTIONAL] - The desired value (future value) at the end of the periods.
 * @param type - [OPTIONAL] - Defines whether the payment is due at the beginning (1) or the end (0) of a period.
 * @returns {number}
 * @constructor
 */
declare let IPMT: (rate: any, period: any, periods: any, present: any, future?: any, type?: any) => number;
/**
 * Returns for a given period the payment on the principal for an investment that is based on periodic and constant
 * payments and a constant interest rate.
 * @param rate - The periodic interest rate.
 * @param period - The amortization period.
 * @param periods - The total number of periods during which the annuity is paid.
 * @param present - The present value in the sequence of payments.
 * @param future - [OPTIONAL] - The desired future value. Defaults to 0.
 * @param type - [OPTIONAL] - Indicates how the year is to be calculated. 0 indicates payments are due at end of
 * period, 1 indicates payments are due at beginning of period. Defaults to 0.
 * @returns {number}
 * @constructor
 */
declare let PPMT: (rate: any, period: any, periods: any, present: any, future?: any, type?: any) => number;
/**
 * Calculates the accumulated value of the starting capital for a series of periodically varying interest rates.
 * @param principal - The starting capital.
 * @param rateSchedule - Range or Array that is a series of interest rates.
 * @returns {number}
 * @constructor
 */
declare let FVSCHEDULE: (principal: any, rateSchedule: any) => number;
/**
 * Returns the present value of an investment resulting from a series of regular payments.
 * @param rate - The interest rate per period.
 * @param periods - The total number of payment periods
 * @param paymentPerPeriod - The regular payment made per period.
 * @param future - [OPTIONAL defaults to 0] The future value remaining after the final installment has been made
 * @param type - [OPTIONAL defaults to 0] Defines whether the payment is due at the beginning (1) or the end (0) of a
 * period.
 * @constructor
 */
declare let PV: (rate: any, periods: any, paymentPerPeriod: any, future?: any, type?: any) => number;
/**
 * Returns the constant interest rate per period of an annuity.
 * @param periods - The total number of periods, during which payments are made (payment period).
 * @param paymentPerPeriod - The constant payment (annuity) paid during each period.
 * @param presentValue - The cash value in the sequence of payments
 * @param futureValue - [OPTIONAL defaults to 0] The future value, which is reached at the end of the periodic payments.
 * @param beginningOrEnd - [OPTIONAL defaults to 0] Defines whether the payment is due at the beginning (1) or the end
 * (0) of a period.
 * @param guessRate - [OPTIONAL] - Determines the estimated value of the interest with iterative
 * calculation.
 * @constructor
 */
declare let RATE: (periods: any, paymentPerPeriod: any, presentValue: any, futureValue?: any, beginningOrEnd?: any, guessRate?: any) => any;
export { ACCRINT, CUMPRINC, CUMIPMT, DB, DDB, DOLLAR, DOLLARDE, DOLLARFR, EFFECT, PMT, SYD, SLN, NPV, NPER, NOMINAL, MIRR, IRR, IPMT, FV, PPMT, FVSCHEDULE, PV, RATE };
