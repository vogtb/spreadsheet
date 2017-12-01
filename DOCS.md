# Documentation

## Convert


### TO_DATE 

```
  Converts a number to a Date. 
@param value - Value to convert. If the input is a number, will convert to a date. If value is non-numeric, will return value unchanged. 
@returns {any} 
@constructor
```

### TO_DOLLARS 

```
  Converts a number to a Dollar value. 
@param value - Value to convert. If the input is a number, will return as a dollar value. If value is non-numeric, will return value unchanged. 
@returns {any} 
@constructor
```

### TO_PERCENT 

```
  Converts a number to a percent value where 1 = 100 percent. 
@param value - Value to convert. If the input is a number, will return as a percent value. If value is non-numeric, will return value unchanged. 
@returns {any} 
@constructor
```

### TO_TEXT 

```
  Converts a number to a text value 
@param value - Value to convert. If the input is a text, will return as a text value. 
@returns {any} 
@constructor
```
## Date


### DATE 

```
  Converts a provided year, month, and day into a date. 
@param year - The year component of the date. 
@param month - The month component of the date. 
@param day - The day component of the date. 
@returns {number} newly created date. 
@constructor
```

### DATEVALUE 

```
  Converts a provided date string in a known format to a date value. 
@param dateString - The string representing the date. Understood formats include any date format which is normally auto-converted when entered, without quotation marks, directly into a cell. Understood formats may depend on region and language settings. 
@returns {number} of days since 1900/1/1, inclusively. 
@constructor
```

### EDATE 

```
  Returns a date a specified number of months before or after another date. 
@param startDate - The date from which to calculate the result. 
@param months - The number of months before (negative) or after (positive) start_date to calculate. 
@returns {number} date a specified number of months before or after another date 
@constructor
```

### EOMONTH 

```
  Returns a date representing the last day of a month which falls a specified number of months before or after another date. 
@param startDate - The date from which to calculate the the result. 
@param months - The number of months before (negative) or after (positive) start_date to consider. The last calendar day of the calculated month is returned. 
@returns {number} the last day of a month 
@constructor
```

### DAY 

```
  Returns the day of the month that a specific date falls on, in numeric format. 
@param date - The date from which to extract the day. Must be a reference to a cell containing a date, a function returning a date type, or a number. 
@returns {number} day of the month 
@constructor
```

### DAYS 

```
  Returns the number of days between two dates. 
@param endDate most recently occurring 
@param startDate not most recently occurring 
@returns {number} of days between start_date and end_date 
@constructor
```

### DAYS360 

```
  Returns the difference between two days based on the 360 day year used in some financial interest calculations. 
@param startDate - The start date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number. 
@param endDate - The end date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number. 
@param methodToUse - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use. 0 indicates the US method - Under the US method, if start_date is the last day of a month, the day of month of tart_date is changed to 30 for the purposes of the calculation. Furthermore if end_date is the last day of a month and the day of the month of start_date is earlier than the 30th, end_date is changed to the first day of the month following end_date, otherwise the day of month of end_date is changed to 30. Any other value indicates the European method - Under the European method, any start_date or end_date that falls on the 31st of a month has its day of month changed to 30. 
@returns {number} of days between two dates 
@constructor
```

### MONTH 

```
  Returns the month of the year a specific date falls in, in numeric format. 
@param date - The date from which to extract the month. Must be a reference to a cell containing a date, a function returning a date type, or a number. 
@returns {number} month of the year that the input date falls on. 
@constructor
```

### YEAR 

```
  Returns the year specified by a given date. 
@param date - The date from which to calculate the year. Must be a cell reference to a cell containing a date, a function returning a date type, or a number. 
@returns {number} year of the input date 
@constructor
```

### WEEKDAY 

```
  Returns a number representing the day of the week of the date provided. 
@param date - The date for which to determine the day of the week. Must be a reference to a cell containing a date, a function returning a date type, or a number. 
@param offsetType - [ OPTIONAL - 1 by default ] - A number indicating which numbering system to use to represent weekdays. By default counts starting with Sunday = 1. If type is 1, days are counted from Sunday and the value of Sunday is 1, therefore the value of Saturday is 7. If type is 2, days are counted from Monday and the value of Monday is 1, therefore the value of Sunday is 7. If type is 3, days are counted from Monday and the value of Monday is 0, therefore the value of Sunday is 6. 
@returns {number} day of week 
@constructor
```

### WEEKNUM 

```
  Returns a number representing the week of the year where the provided date falls. When inputting the date, it is best to use the DATE function, as text values may return errors.  Behind the scenes, there are two week numbering "systems" used for this function: System 1 - The first week of the year is considered to be the week containing January 1, which is numbered week 1. System 2 - The first week of the year is considered to be the week containing the first Thursday of the year, which is numbered as week 1. System 2 is the approach specified in ISO 8601, also known as the European system for numbering weeks.  
@param date - The date for which to determine the week number. Must be a reference to a cell containing a date, a function returning a date type, or a number. 
@param shiftType - [ OPTIONAL - default is 1 ] - A number representing the day that a week starts on as well as the system used for determining the first week of the year (1=Sunday, 2=Monday). 
@returns {number} representing week number of year. 
@constructor
```

### DATEDIF 

```
  Calculates the number of days, months, or years between two dates. 
@param startDate - The start date to consider in the calculation. Must be a reference to a cell containing a DATE, a function returning a DATE type, or a number. 
@param endDate - The end date to consider in the calculation. Must be a reference to a cell containing a DATE, a function returning a DATE type, or a number. 
@param unit - A text abbreviation for unit of time. For example,"M" for month. Accepted values are "Y": the number of whole years between start_date and end_date, "M": the number of whole months between start_date and end_date, "D": the number of days between start_date and end_date, "MD": the number of days between start_date and end_date after subtracting whole months, "YM": the number of whole months between start_date and end_date after ubtracting whole years, "YD": the number of days between start_date and end_date, assuming start_date and end_date were no more than one year apart. 
@returns {number} number of days, months, or years between two dates. 
@constructor
```

### YEARFRAC 

```
  Returns the number of years, including fractional years, between two dates using a specified day count convention.  Further reading:  http://christian-fries.de/blog/files/2013-yearfrac.html  http://finmath.net/finmath-lib  
@param startDate - The start date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number. 
@param endDate - The end date to consider in the calculation. Must be a reference to a cell containing a date, a function returning a date type, or a number. 
@param dayCountConvention - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use. 
@returns {number}the number of years, including fractional years, between two dates 
@constructor
```

### TIMEVALUE 

```
  Returns the fraction of a 24-hour day the time represents. 
@param timeString - The string that holds the time representation. Eg: "10am", "10:10", "10:10am", "10:10:11", or "10:10:11am". 
@returns {number} representing the fraction of a 24-hour day 
@constructor
```

### HOUR 

```
  Returns the hour component of a specific time, in numeric format. 
@param time - The time from which to calculate the hour component. Must be a reference to a cell containing a date/time, a function returning a date/time type, or a number. 
@returns {number} 
@constructor
```

### MINUTE 

```
  Returns the minute component of a specific time, in numeric format. 
@param time - The time from which to calculate the minute component. Must be a reference to a cell containing a date/time, a function returning a date/time type, or a number. 
@returns {number} minute of the time passed in. 
@constructor
```

### SECOND 

```
  Returns the second component of a specific time, in numeric format. 
@param time - The time from which to calculate the second component. Must be a reference to a cell containing a date/time, a function returning a date/time type, or a number. 
@returns {number} second component of a specific time. 
@constructor
```

### NETWORKDAYS 

```
  Returns the number of net working days between two provided days. 
@param startDate - The start date of the period from which to calculate the number of net working days. 
@param endDate - The end date of the period from which to calculate the number of net working days. 
@param holidays - [ OPTIONAL ] - A range or array constant containing the date serial numbers to consider holidays. The values provided within an array for holidays must be date serial number values, as returned by N or date values, as returned by DATE, DATEVALUE or TO_DATE. Values specified by a range should be standard date values or date serial numbers. 
@returns {number} the number of net working days between two provided dates. 
@constructor
```

### TWORKDAYS$INTL 

```
  Returns the number of networking days between two provided days excluding specified weekend days and holidays. 
@param startDate - The start date of the period from which to calculate the number of net working days. 
@param endDate - The end date of the period from which to calculate the number of net working days. 
@param weekend - [ OPTIONAL - 1 by default ] - A number or string representing which days of the week are considered weekends. String method: weekends can be specified using seven 0’s and 1’s, where the first number in the et represents Monday and the last number is for Sunday. A zero means that the day is a work day, a 1 means that the day is a weekend. For example, “0000011” would mean Saturday and Sunday are weekends. Number method: instead of using the string method above, a single number can be used. 1 = Saturday/Sunday are weekends, 2 = Sunday/Monday, and this pattern repeats until 7 = Friday/Saturday. 11 = Sunday is the only weekend, 12 = Monday is the only weekend, and this pattern repeats until 17 = Saturday is the only weekend. 
@param holidays - [ OPTIONAL ] - A range or array constant containing the dates to consider as holidays. The values provided within an array for holidays must be date serial number values, as returned by N or date values, as returned by DATE, DATEVALUE or TO_DATE. Values specified by a range should be standard date values or date serial numbers. 
@returns {number} of networking days between two provided days 
@constructor
```

### NOW 

```
  Returns the current date and time as a date value. 
@returns {number} representing the current date and time. 
@constructor
```

### TODAY 

```
  Returns the current date as a date value. 
@returns {number} today 
@constructor
```

### TIME 

```
  Converts a provided hour, minute, and second into a time. Will silently recalculate numeric time values which fall outside of valid ranges. Eg: TIME(24, 0, 0) is the same as TIME(0, 0, 0). 
@param hours - The hour component of the time. 
@param minutes - The minute component of the time. 
@param seconds - The second component of the time. 
@returns {number} time of day 
@constructor
```

### WORKDAY 

```
  Calculates the end date after a specified number of working days. 
@param startDate - The date from which to begin counting. 
@param numberOfDays - The number of working days to advance from start_date. If negative, counts backwards. If not an integer, truncate. 
@param holidays - [ OPTIONAL ] - A range or array constant containing the dates to consider holidays. The values provided within an array for holidays must be date serial number values, as returned by N or date values, as returned by DATE, DATEVALUE or TO_DATE. Values specified by a range should be standard date values or date serial numbers. 
@returns {number} end date after a specified number of working days. 
@constructor
```

### WORKDAY$INTL 

```
  Calculates the date after a specified number of workdays excluding specified weekend days and holidays. 
@param startDate - The date from which to begin counting. 
@param numberOfDays - The number of working days to advance from start_date. If negative, counts backwards. 
@param weekend - [ OPTIONAL - 1 by default ] - A number or string representing which days of the week are considered weekends. String method: weekends can be specified using seven 0’s and 1’s, where the first number in the et represents Monday and the last number is for Sunday. A zero means that the day is a work day, a 1 means that the day is a weekend. For example, “0000011” would mean Saturday and Sunday are weekends. Number method: instead of using the string method above, a single number can be used. 1 = Saturday/Sunday are weekends, 2 = Sunday/Monday, and this pattern repeats until 7 = Friday/Saturday. 11 = Sunday is the only weekend, 12 = Monday is the only weekend, and this pattern repeats until 17 = Saturday is the only weekend. 
@param holidays - [ OPTIONAL ] - A range or array constant containing the dates to consider holidays. 
@returns {number} 
@constructor
```
## Engineering


### BIN2DEC 

```
  Converts a signed binary number to decimal format. 
@param signedBinaryNumber - The signed 10-bit binary value to be converted to decimal, provided as a tring. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented in two's complement format. 
@returns {number} 
@constructor
```

### BIN2HEX 

```
  Converts a signed binary number to signed hexadecimal format. 
@param signedBinaryNumber - The signed 10-bit binary value to be converted to signed hexadecimal, provided as a string. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented in two's complement format. 
@param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result. 
@returns {string} string representation of a signed hexadecimal 
@constructor
```

### BIN2OCT 

```
  Converts a signed binary number to signed octal format. 
@param signedBinaryNumber - The signed 10-bit binary value to be converted to signed octal, provided as a tring. The most significant bit of signed_binary_number is the sign bit; that is, negative numbers are represented in two's complement format. 
@param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If this is greater than the number of significant digits in the result, the result is left-padded with zeros until the total number of digits reaches significant_digits. 
@returns {string} number in octal format 
@constructor
```

### DEC2OCT 

```
  Converts a decimal number to signed octal format. 
@param decimalDumber - The decimal value to be converted to signed octal,provided as a string. For this function, this value has a maximum of 536870911 if positive, and a minimum of -53687092 if negative. 
@param significantDigits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this is greater than the number of significant digits in the result, the result is left-padded with zeros until the total number of digits reaches significant_digits. 
@returns {string} octal string representation of the decimal number 
@constructor
```

### DEC2HEX 

```
  Converts a decimal number to signed hexadecimal format. 
@param decimalDumber - The decimal value to be converted to signed hexadecimal, provided as a string. This value has a maximum of 549755813887 if positive, and a minimum of -549755814888 if negative. 
@param significantDigits - [ OPTIONAL ] - The number of significant digits to ensure in the result. If this is greater than the number of significant digits in the result, the result is left-padded with zeros until the total number of digits reaches significant_digits. This value is ignored if decimal_number is negative. 
@returns {string} hexadecimal string representation of the decimal number 
@constructor
```

### DEC2BIN 

```
  Converts a decimal number to signed binary format. 
@param decimalDumber - The decimal value to be converted to signed binary, provided as a string. For this function, this value has a maximum of 511 if positive, and a minimum of -512 if negative. 
@param significantDigits - [ OPTIONAL ] The number of significant digits to ensure in the result. If this is greater than the number of significant digits in the result, the result is left-padded with zeros until the total number of digits reaches significant_digits. 
@returns {string} signed binary string representation of the input decimal number. 
@constructor
```

### DELTA 

```
  Compare two numeric values, returning 1 if they're equal. 
@param one - The first number to compare. 
@param two - The second number to compare. 
@returns {number} 1 if they're equal, 0 if they're not equal. 
@constructor
```
## Financial


### DDB 

```
  Calculates the depreciation of an asset for a specified period using the double-declining balance method. 
@param cost - The initial cost of the asset. 
@param salvage - The value of the asset at the end of depreciation. 
@param life - The number of periods over which the asset is depreciated. 
@param period - The single period within life for which to calculate depreciation. 
@param factor - [ OPTIONAL - 2 by default ] - The factor by which depreciation decreases. 
@returns {number} depreciation of an asset for a specified period 
@constructor
```

### DB 

```
  Calculates the depreciation of an asset for a specified period using the arithmetic declining balance method. 
@param cost - The initial cost of the asset. 
@param salvage - The value of the asset at the end of depreciation. 
@param life - The number of periods over which the asset is depreciated. 
@param period - The single period within life for which to calculate depreciation. 
@param month - [ OPTIONAL - 12 by default ] - The number of months in the first year of depreciation. 
@returns {number} depreciated value 
@constructor
```

### DOLLAR 

```
  Formats a number into the locale-specific currency format. WARNING: Currently the equivalent of TRUNC, since this returns numbers 
@param number - The value to be formatted. 
@param places - [ OPTIONAL - 2 by default ] - The number of decimal places to display. 
@returns {number} dollars 
@constructor
```

### DOLLARDE 

```
  Converts a price quotation given as a decimal fraction into a decimal value. 
@param fractionalPrice - The price quotation given using fractional decimal conventions. 
@param unit - The units of the fraction, e.g. 8 for 1/8ths or 32 for 1/32nds. 
@returns {number} decimal value. 
@constructor
```

### DOLLARFR 

```
  Converts a price quotation given as a decimal value into a decimal fraction. 
@param decimalPrice - The price quotation given as a decimal value. 
@param unit - The units of the desired fraction, e.g. 8 for 1/8ths or 32 for 1/32nds 
@returns {number} price quotation as decimal fraction. 
@constructor
```

### EFFECT 

```
  Calculates the annual effective interest rate given the nominal rate and number of compounding periods per year. 
@param nominalRate - The nominal interest rate per year. 
@param periodsPerYear - The number of compounding periods per year. 
@returns {number} annual effective interest rate 
@constructor
```

### PMT 

```
  Calculates the periodic payment for an annuity investment based on constant-amount periodic payments and a constant interest rate. 
@param rate - The interest rate. 
@param periods - The number of payments to be made. 
@param presentValue - The current value of the annuity. 
@param futureValue [ OPTIONAL ] - The future value remaining after the final payment has been made. 
@param endOrBeginning [ OPTIONAL - 0 by default ] - Whether payments are due at the end (0) or beginning (1) of each period. 
@returns {number} 
@constructor
```

### FV 

```
  Returns the future value of an investment based on periodic, constant payments and a constant interest rate. 
@param rate - The rate of periodic interest. 
@param periods - The total number of periods. 
@param payment - The annuity paid regularly per period 
@param value - [OPTIONAL] - The present cash value of an investment. 
@param type - [OPTIONAL] - Defines whether the payment is due at the beginning (1) or the end (0) of a period. 
@returns {number} 
@constructor
```

### CUMPRINC 

```
  Calculates the cumulative principal paid over a range of payment periods for an investment based on constant-amount periodic payments and a constant interest rate. 
@param rate - The interest rate. 
@param numberOfPeriods - The number of payments to be made. 
@param presentValue - The current value of the annuity. 
@param firstPeriod - The number of the payment period to begin the cumulative calculation. must be greater than or equal to 1. 
@param lastPeriod - The number of the payment period to end the cumulative calculation, must be greater than first_period. 
@param endOrBeginning - Whether payments are due at the end (0) or beginning (1) of each period 
@returns {number} cumulative principal 
@constructor
```

### CUMIPMT 

```
  Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount periodic payments and a constant interest rate. 
@param rate - The interest rate. 
@param numberOfPeriods - The number of payments to be made. 
@param presentValue - The current value of the annuity. 
@param firstPeriod - The number of the payment period to begin the cumulative calculation, must be greater than or equal to 1. 
@param lastPeriod - The number of the payment period to end the cumulative calculation, must be greater than first_period. 
@param endOrBeginning - Whether payments are due at the end (0) or beginning (1) of each period. 
@returns {number} cumulative interest 
@constructor
```

### ACCRINT 

```
  Calculates the accrued interest of a security that has periodic payments. WARNING: This function has been implemented to specifications as outlined in Google Spreadsheets, LibreOffice, and OpenOffice. It functions much the same as MSExcel's ACCRINT, but there are several key differences. Below are links to illustrate the differences. Please see the source code for more information on differences. Links: https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint, https://support.office.com/en-us/article/ACCRINT-function-fe45d089-6722-4fb3-9379-e1f911d8dc74, https://quant.stackexchange.com/questions/7040/whats-the-algorithm-behind-excels-accrint, https://support.google.com/docs/answer/3093200 . 
@param issue - The date the security was initially issued. 
@param firstPayment - The first date interest will be paid. 
@param settlement - The settlement date of the security, the date after issuance when the security is delivered to the buyer. Is the maturity date of the security if it is held until maturity rather than sold. 
@param rate - The annualized rate of interest. 
@param redemption - The redemption amount per 100 face value, or par. 
@param frequency - The number of coupon payments per year. For annual payments, frequency = 1; for emiannual, frequency = 2; for quarterly, frequency = 4. 
@param dayCountConvention - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use. 0 or omitted = US (NASD) 30/360, 1 = Actual/actual, 2 = Actual/360, 3 = Actual/365, 4 = European 30/360. 
@returns {number} 
@constructor TODO: This function is based off of the open-source versions I was able to dig up online. We should implement a TODO:     second version that is closer to what MSExcel does and is named something like `ACCRINT.MS`.
```

### SYD 

```
  Returns the arithmetic-declining depreciation rate. Use this function to calculate the depreciation amount for one period of the total depreciation span of an object. Arithmetic declining depreciation reduces the depreciation amount from period to period by a fixed sum. 
@param cost - The initial cost of an asset. 
@param salvage - the value of an asset after depreciation. 
@param life - The period fixing the time span over which an asset is depreciated. 
@param period - The period for which the depreciation is to be calculated. 
@returns {number} 
@constructor
```

### SLN 

```
  Returns the straight-line depreciation of an asset for one period. The amount of the depreciation is constant during the depreciation period. 
@param cost - The initial cost of the asset. 
@param salvage - The value of an asset at the end of the depreciation. 
@param life - The depreciation period determining the number of periods in the deprecation of the asset. 
@returns {number} 
@constructor
```

### NPV 

```
  Returns the net present value of an investment based on a series of periodic cash flows and a discount rate. 
@param rate - The discount rate for a period. 
@param values - The values representing deposits or withdrawals. 
@returns {number} 
@constructor TODO: This function can return results that are prone to floating point precision errors.
```

### NPER 

```
  Returns the number of payment for an investment. Number is based on constant-amount payments made periodically and a constant interest rate. 
@param rate - The interest rate. 
@param payment - The amount of each payment. 
@param present - THe current value. 
@param future - [OPTIONAL] - The future value remaining after the final payment has been made. 
@param type [OPTIONAL 0 by default] - 1 indicates payments are due at the beginning of each period. 0 indicates payments are due at the end of each period. 
@returns {number} 
@constructor
```

### NOMINAL 

```
  Calculates the yearly nominal interest rate, given the effective rate and the number of compounding periods per year. 
@param rate - The effective interest rate. 
@param periods - The number of periodic interest payments per year. 
@returns {number} 
@constructor
```

### MIRR 

```
  Calculates the modified internal rate of return of a series of investments. 
@param values - Range or values of payments. Ignores text values. 
@param financeRate - The rate of interest of the investments. 
@param reinvestRate - The rate of interest of the reinvestment. 
@returns {number} 
@constructor TODO: This relies on NPV and will therefore be prone to floating-point errors.
```

### IRR 

```
  Calculates the internal rate of return for an investment. The values represent cash flow values at regular intervals; at least one value must be negative (payments), and at least one value must be positive (income).  Relevant StackOverflow discussion: https://stackoverflow.com/questions/15089151/javascript-irr-internal-rate-of-return-formula-accuracy  
@param values - Range containing values. Ignores text values. 
@param guess - [OPTIONAL] - The estimated value. Defaults to 0.01. 
@returns {number} 
@constructor
```

### IPMT 

```
  Calculates the periodic amortization for an investment with regular payments and a constant interest rate. 
@param rate - The periodic interest rate. 
@param period - The period for which the compound interest is calculated. 
@param periods - The total number of periods during which the annuity is paid. 
@param present - The present cash value in sequence of payments. 
@param future - [OPTIONAL] - The desired value (future value) at the end of the periods. 
@param type - [OPTIONAL] - Defines whether the payment is due at the beginning (1) or the end (0) of a period. 
@returns {number} 
@constructor
```

### PPMT 

```
  Returns for a given period the payment on the principal for an investment that is based on periodic and constant payments and a constant interest rate. 
@param rate - The periodic interest rate. 
@param period - The amortization period. 
@param periods - The total number of periods during which the annuity is paid. 
@param present - The present value in the sequence of payments. 
@param future - [OPTIONAL] - The desired future value. Defaults to 0. 
@param type - [OPTIONAL] - Indicates how the year is to be calculated. 0 indicates payments are due at end of period, 1 indicates payments are due at beginning of period. Defaults to 0. 
@returns {number} 
@constructor
```

### FVSCHEDULE 

```
  Calculates the accumulated value of the starting capital for a series of periodically varying interest rates. 
@param principal - The starting capital. 
@param rateSchedule - Range or Array that is a series of interest rates. 
@returns {number} 
@constructor
```

### PV 

```
  Returns the present value of an investment resulting from a series of regular payments. 
@param rate - The interest rate per period. 
@param periods - The total number of payment periods 
@param paymentPerPeriod - The regular payment made per period. 
@param future - [OPTIONAL defaults to 0] The future value remaining after the final installment has been made 
@param type - [OPTIONAL defaults to 0] Defines whether the payment is due at the beginning (1) or the end (0) of a period. 
@constructor
```

### RATE 

```
  Returns the constant interest rate per period of an annuity. 
@param periods - The total number of periods, during which payments are made (payment period). 
@param paymentPerPeriod - The constant payment (annuity) paid during each period. 
@param presentValue - The cash value in the sequence of payments 
@param futureValue - [OPTIONAL defaults to 0] The future value, which is reached at the end of the periodic payments. 
@param beginningOrEnd - [OPTIONAL defaults to 0] Defines whether the payment is due at the beginning (1) or the end (0) of a period. 
@param guessRate - [OPTIONAL] - Determines the estimated value of the interest with iterative calculation. 
@constructor
```
## Info


### NA 

```
  Returns the "value not available" error, "#N/A". 
@constructor
```

### ISTEXT 

```
  Returns true if a value is text. 
@param value - value or reference to check. 
@returns {boolean}. 
@constructor
```

### ISNONTEXT 

```
  Returns true if a value is not text. 
@param value - value or reference to check. 
@returns {boolean}. 
@constructor
```

### ISLOGICAL 

```
  Returns true if value is a boolean (FALSE, or TRUE). Numerical and text values return false. 
@param value - value or reference to check. 
@returns {boolean} 
@constructor
```

### ISNUMBER 

```
  Returns true if value or reference is a number. 
@param value - value or reference to check. 
@returns {boolean} 
@constructor
```

### ISEMAIL 

```
  Returns true if input is a valid email. Valid domains are Original top-level domains and Country code top-level domains. 
@param value - Value to check whether it is an email or not. 
@returns {boolean} 
@constructor
```

### ISURL 

```
  Returns true if the input is a valid URL. 
@param value - Value to check 
@returns {boolean} 
@constructor
```

### N 

```
  Returns the value as a number. 
@param value - value to return. 
@returns {number} 
@constructor
```

### ISREF 

```
  Tests if the content of one or several cells is a reference. Verifies the type of references in a cell or a range of cells. If an error occurs, the function returns a logical or numerical value. 
@param value - The value to be tested, to determine whether it is a reference. 
@returns {boolean} 
@constructor
```

### ERRORTYPE 

```
  Returns the number corresponding to an error value occurring in a different cell. With the aid of this number, an error message text can be generated. If an error occurs, the function returns a logical or numerical value. 
@param value - Contains either the address/reference of the cell in which the error occurs, or the error directly. Eg: `=ERRORTYPE(NA())` 
@constructor
```

### ISBLANK 

```
  Returns TRUE if the reference to a cell is blank. This function is used to determine if the content of a cell is empty. A cell with a formula inside is not empty. If an error occurs, the function returns a logical or numerical value. 
@param value - The content to be tested. 
@returns {boolean} 
@constructor
```

### ISERR 

```
  Returns TRUE if the value refers to any error value except #N/A. You can use this function to control error values in certain cells. If an error occurs, the function returns a logical or numerical value. 
@param value - Any value or expression in which a test is performed to determine whether an error value not equal to #N/A is present. 
@returns {boolean} 
@constructor
```

### ISERROR 

```
  Tests if the cells contain general error values. ISERROR recognizes the #N/A error value. If an error occurs, the function returns a logical or numerical value. 
@param value - is any value where a test is performed to determine whether it is an error value. 
@returns {boolean} 
@constructor
```

### ISNA 

```
  Returns TRUE if a cell contains the #N/A (value not available) error value. If an error occurs, the function returns a logical or numerical value. 
@param value - The value or expression to be tested. 
@returns {boolean} 
@constructor
```

### IFERROR 

```
  Returns the first argument if no error value is present, otherwise returns the second argument if provided, or a blank if the second argument is absent. Blank value is `null`. 
@param value - Value to check for error. 
@param valueIfError - [OPTIONAL] - Value to return if no error is present in the first argument. 
@returns {any} 
@constructor
```

### TYPE 

```
  Returns a number corresponding to the type of data passed into the function. 1 = number, 2 = text, 4 = boolean, 16 = error, 64 = array/range, 128 = any other type of cell. 
@param value - Value for which the type will be determined. 
@returns {number} 
@constructor
```

### COLUMN 

```
  Returns the column number of a specified cell, starting with column 1 for A. 
@param cell - Cell, defaults to the cell calling this formula, when used in the context of a spreadsheet. 
@constructor
```

### ROW 

```
  Returns the row number of a specified cell, starting with row 1 for A1. 
@param cell - Cell, defaults to the cell calling this formula, when used in the context of a spreadsheet. 
@constructor
```

### ISFORMULA 

```
  Returns TRUE if a cell is a formula cell. Must be given a reference. 
@param value - To check. 
@returns {boolean} 
@constructor
```
## Logical


### AND 

```
  Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false. 
@param values At least one expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value. 
@returns {boolean} if all values are logically true. 
@constructor
```

### EXACT 

```
  Tests whether two strings are identical, returning true if they are. 
@param one - The first string to compare 
@param two - The second string to compare 
@returns {boolean} 
@constructor
```

### TRUE 

```
  Returns true. 
@returns {boolean} true boolean 
@constructor
```

### FALSE 

```
  Returns false. 
@returns {boolean} false boolean 
@constructor
```

### NOT 

```
  Returns the opposite of a logical value - NOT(TRUE) returns FALSE; NOT(FALSE) returns TRUE. 
@param value - An expression or reference to a cell holding an expression that represents some logical value. 
@returns {boolean} opposite of a logical value input 
@constructor
```

### OR 

```
  Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false. 
@param values An expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value. 
@returns {boolean} 
@constructor
```

### XOR 

```
  Exclusive or or exclusive disjunction is a logical operation that outputs true only when inputs differ. 
@param values to check for exclusivity. 
@returns {boolean} returns true if only one input is considered logically true. 
@constructor
```
## Lookup


### CHOOSE 

```
  Returns an element from a list of choices based on index. 
@param index - Which choice to return. Index starts at 1. 
@param values -  Array of potential value to return. Required. May be a reference to a cell or an individual value. 
@constructor
```

### ADDRESS 

```
  Returns a text representation of a cell address based on the row, column, and sheet. 
@param row - Row of cell address. 
@param column - Column of cell address 
@param {number} absoluteVsRelativeMode - [OPTIONAL - default is 1] Should return a relative(A1, vs $A$1) or absolute address. 1 is row and column absolute (e.g. $A$1), 2 is row absolute and column relative (e.g. A$1), 3 is row relative and column absolute (e.g. $A1), 4 is row and column relative (e.g. A1). 
@param {boolean} useA1Notation - [OPTIONAL - default is TRUE] Should use A1 notation. 
@param sheet - [OPTIONAL] Sheet name to use in address. 
@returns {string} 
@constructor
```

### COLUMNS 

```
  Gets the number of columns in a specified array or range. 
@param value - The array of range to consider. 
@returns {number} 
@constructor
```
## Math


### GCD 

```
  Returns the greatest common divisor of one or more integers. 
@param values - The values or ranges whose factors to consider in a calculation to find the greatest common divisor. 
@returns {number} greatest common divisor. 
@constructor
```

### LCM 

```
  Returns the least common multiple of one or more integers. 
@param values - The values or range whose factors to consider in a calculation to find the least common multiple. 
@returns {number} 
@constructor
```

### GAMMALN 

```
  Returns the the logarithm of a specified Gamma function, base e (Euler's number). 
@param value - The input number. The natural logarithm of Gamma (value) will be returned. Must be positive. 
@returns {number} 
@constructor
```

### ABS 

```
  Returns the absolute value of a number. 
@param value to get the absolute value of. 
@returns {number} absolute value 
@constructor
```

### ACOS 

```
  Returns the inverse cosine of a value, in radians. 
@param value The value for which to calculate the inverse cosine. Must be between -1 and 1, inclusive. 
@returns {number} inverse cosine of value 
@constructor
```

### ACOSH 

```
  Returns the inverse hyperbolic cosine of a number. 
@param value The value for which to calculate the inverse hyperbolic cosine. Must be greater than or equal to 1. 
@returns {number} to find the inverse hyperbolic cosine for. 
@constructor
```

### ACOTH 

```
  Calculate the hyperbolic arc-cotangent of a value 
@param value number not between -1 and 1 inclusively. 
@returns {number} hyperbolic arc-cotangent 
@constructor
```

### ASIN 

```
  Returns the inverse sine of a value, in radians. 
@param value The value for which to calculate the inverse sine. Must be between -1 and 1, inclusive. 
@returns {number} inverse sine of input value 
@constructor
```

### ASINH 

```
  Returns the inverse hyperbolic sine of a number. 
@param value The value for which to calculate the inverse hyperbolic sine. 
@returns {number} inverse hyperbolic sine of input 
@constructor
```

### ATAN 

```
  Returns the inverse tangent of a value, in radians. 
@param value The value for which to calculate the inverse tangent. 
@returns {number} inverse tangent of input value 
@constructor
```

### ATAN2 

```
  Returns the angle between the x-axis and a line segment from the origin (0,0) to specified coordinate pair (x,y), in radians. 
@param x The x coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis. 
@param y The y coordinate of the endpoint of the line segment for which to calculate the angle from the x-axis. 
@returns {number} angle in radians 
@constructor
```

### ATANH 

```
  Returns the inverse hyperbolic tangent of a number. 
@param value The value for which to calculate the inverse hyperbolic tangent. Must be between -1 and 1, exclusive. 
@returns {number} inverse hyperbolic tangent of input 
@constructor
```

### EVEN 

```
  Rounds a number up to the nearest even integer. 
@param value The value to round to the next greatest even number. 
@returns {number} next greatest even number 
@constructor
```

### MOD 

```
  Returns the result of the modulo operator, the remainder after a division operation. 
@param dividend The number to be divided to find the remainder. 
@param divisor The number to divide by. 
@returns {number} 
@constructor
```

### ODD 

```
  Rounds a number up to the nearest odd integer. 
@param value The value to round to the next greatest odd number. 
@returns {number} value to round up to next greatest odd number. 
@constructor
```

### POWER 

```
  Returns a number raised to a power. 
@param base - The number to raise to the exponent power. 
@param exponent - The exponent to raise base to. 
@returns {number} resulting number 
@constructor
```

### SUM 

```
  Returns the sum of a series of numbers and/or cells. 
@param values The first number or range to add together. 
@returns {number} The sum of the series 
@constructor
```

### SQRT 

```
  Returns the positive square root of a positive number. 
@param value - The number for which to calculate the positive square root. 
@returns {number} square root 
@constructor
```

### SQRTPI 

```
  Returns the positive square root of the product of Pi and the given positive number. 
@param value - The number which will be multiplied by Pi and have the product's square root returned 
@returns {number} the positive square root of the product of Pi and the given positive number. 
@constructor
```

### COS 

```
  Returns the cosine of an angle provided in radians. 
@param value - The angle to find the cosine of, in radians. 
@returns {number} cosine of angle 
@constructor
```

### COSH 

```
  Returns the hyperbolic cosine of any real number. 
@param value - Any real value to calculate the hyperbolic cosine of. 
@returns {number} the hyperbolic cosine of the input 
@constructor
```

### COT 

```
  Returns the cotangent of any real number. Defined as cot(x) = 1 / tan(x). 
@param value - number to calculate the cotangent for 
@returns {number} cotangent 
@constructor
```

### COTH 

```
  Return the hyperbolic cotangent of a value, defined as coth(x) = 1 / tanh(x). 
@param value - value to calculate the hyperbolic cotangent value of 
@returns {number} hyperbolic cotangent 
@constructor
```

### INT 

```
  Rounds a number down to the nearest integer that is less than or equal to it. 
@param value -  The value to round down to the nearest integer. 
@returns {number} Rounded number 
@constructor
```

### ISEVEN 

```
  Checks whether the provided value is even. 
@param value - The value to be verified as even. 
@returns {boolean} whether this value is even or not 
@constructor
```

### ISODD 

```
  Checks whether the provided value is odd. 
@param value - The value to be verified as odd. 
@returns {boolean} whether this value is odd or not 
@constructor
```

### SIN 

```
  Returns the sine of an angle provided in radians. 
@param value - The angle to find the sine of, in radians. 
@returns {number} Sine of angle. 
@constructor
```

### SINH 

```
  Returns the hyperbolic sine of any real number. 
@param value - real number to find the hyperbolic sine of 
@returns {number} hyperbolic sine 
@constructor
```

### PI 

```
  The value Pi. 
@returns {number} Pi. 
@constructor
```

### LOG10 

```
  Returns the the logarithm of a number, base 10. 
@param value - The value for which to calculate the logarithm, base 10. 
@returns {number} logarithm of the number, in base 10. 
@constructor
```

### LOG 

```
  Returns the the logarithm of a number given a base. 
@param value - The value for which to calculate the logarithm given base. 
@param base - The base to use for calculation of the logarithm. Defaults to 10. 
@returns {number} 
@constructor
```

### LN 

```
  Returns the logarithm of a number, base e (Euler's number). 
@param value - The value for which to calculate the logarithm, base e. 
@returns {number} logarithm calculated 
@constructor
```

### TAN 

```
  Returns the tangent of an angle provided in radians. 
@param value - The angle to find the tangent of, in radians. 
@returns {number} tangent in radians 
@constructor
```

### TANH 

```
  Returns the hyperbolic tangent of any real number. 
@param value - Any real value to calculate the hyperbolic tangent of. 
@returns {number} hyperbolic tangent 
@constructor
```

### CEILING 

```
  Rounds a number up to the nearest integer multiple of specified significance. 
@param value The value to round up to the nearest integer multiple of factor. 
@param factor - [ OPTIONAL ] The number to whose multiples value will be rounded. 
@returns {number} 
@constructor
```

### FLOOR 

```
  Rounds a number down to the nearest integer multiple of specified significance. 
@param value - The value to round down to the nearest integer multiple of factor. 
@param factor - The number to whose multiples value will be rounded. 
@returns {number} 
@constructor
```

### IF 

```
  Returns one value if a logical expression is TRUE and another if it is FALSE. 
@param logicalExpression - An expression or reference to a cell containing an expression that represents some logical value, i.e. TRUE or FALSE. 
@param valueIfTrue - The value the function returns if logical_expression is TRUE 
@param valueIfFalse - The value the function returns if logical_expression is FALSE. 
@returns one value if a logical expression is TRUE and another if it is FALSE. 
@constructor
```

### COUNTIF 

```
  Returns a conditional count across a range. 
@param range - The range that is tested against criterion., value[1]; 
@param criteria - The pattern or test to apply to range. If the range to check against contains text, this must be a string. It can be a comparison based string (e.g. "=1", "<1", ">=1") or it can be a wild-card string, in which  matches any number of characters, and ? matches the next character. Both ? and  can be escaped by placing a ~ in front of them. If it is neither, it will compared with values in the range using equality comparison. 
@returns {number} 
@constructor
```

### COUNTIFS 

```
  Returns the count of a range depending on multiple criteria. 
@param values[0] criteria_range1 - The range to check against criterion1. 
@param values[1] criterion1 - The pattern or test to apply to criteria_range1. 
@param values[2...N] Repeated sets of ranges and criterion to check. 
@returns {number} count 
@constructor
```

### ROUND 

```
  Rounds a number to a certain number of decimal places according to standard rules. 
@param value - The value to round to places number of places. 
@param places - The number of decimal places to which to round. 
@returns {number} 
@constructor
```

### ROUNDDOWN 

```
  Rounds a number to a certain number of decimal places, always rounding down to the next valid increment. 
@param value - The value to round to places number of places, always rounding down. 
@param places - (optional) The number of decimal places to which to round. 
@returns {number} 
@constructor
```

### ROUNDUP 

```
  Rounds a number to a certain number of decimal places, always rounding up to the next valid increment. 
@param value - The value to round to places number of places, always rounding up. 
@param places - (optional) The number of decimal places to which to round. 
@returns {number} 
@constructor
```

### SUMIF 

```
  Returns a conditional sum across a range. 
@param range -  The range which is tested against criterion. 
@param criteria - The pattern or test to apply to range. If the range to check against contains text, this must be a tring. It can be a comparison based string (e.g. "=1", "<1", ">=1") or it can be a wild-card string, in which  matches any number of characters, and ? matches the next character. Both ? and  can be escaped by placing a ~ in front of them. 
@param sumRange - (optional) The range to be summed, if different from range. 
@returns {number} 
@constructor
```

### SUMSQ 

```
  Returns the sum of the squares of a series of numbers and/or cells. 
@param values  The values or range(s) whose squares to add together. 
@returns {number} the sum of the squares if the input. 
@constructor
```

### MULTIPLY 

```
  Returns the product of two numbers. Equivalent to the `` operator. 
@param factor1 - The first multiplicand. 
@param factor2 - The second multiplicand. 
@constructor
```

### MINUS 

```
  Returns the result of the first number minus the second number. Equivalent to the `-` operator. 
@param one - The first number. 
@param two - the second number. 
@returns {number} 
@constructor
```

### EQ 

```
  Returns true if two specified values are equal and true otherwise. Equivalent to the "=" operator. 
@param one - First value to check. 
@param two - Second value to check. 
@returns {boolean} true if values are equal, false if they are not equal. 
@constructor
```

### GT 

```
  Returns true if the first argument is strictly greater than the second, and false otherwise. Equivalent to the `>` operator. 
@param one - The value to test as being greater than `two`. 
@param two - The second value. 
@returns {boolean} 
@constructor
```

### GTE 

```
  Returns true if the first argument is greater than or equal to the second, and false otherwise. Equivalent to the `>=` operator. 
@param one - The value to test as being greater than or equal to `two`. 
@param two -The second value. 
@returns {boolean} 
@constructor
```

### LT 

```
  Returns true if the first argument is strictly less than the second, and false otherwise. Equivalent to the `<` operator. 
@param one - The value to test as being less than `two`. 
@param two - The second value. 
@returns {boolean} 
@constructor
```

### LTE 

```
  Returns true if the first argument is less than or equal to the second, and true otherwise. Equivalent to the `<=` operator. 
@param one - The value to test as being less than or equal to `two`. 
@param two - The second value. 
@constructor
```

### NE 

```
  Returns "TRUE" if two specified values are not equal and "FALSE" otherwise. Equivalent to the "<>" operator. 
@param one - The value to test as being not equal to `two`. 
@param two - The second valud. 
@returns {boolean} 
@constructor
```

### DIVIDE 

```
  Returns one number divided by another. Equivalent to the `/` operator. 
@param dividend - The number to be divided. 
@param divisor - The number to divide by, cannot be 0. 
@returns {number} result of dividend / divisor. 
@constructor
```

### RAND 

```
  Returns a random number between 0 inclusive and 1 exclusive. 
@returns {number} 
@constructor
```

### RANDBETWEEN 

```
  Returns a uniformly random integer between two values, inclusive on high and low. Values with decimal parts may be used for low and/or high; this will cause the least and greatest possible values to be the next integer greater than low and/or the next integer less than high, respectively. 
@param low - lowest value 
@param high - highest value 
@returns {number} between low and high. 
@constructor
```

### SIGN 

```
  Given an input number, returns `-1` if it is negative, `1` if positive, and `0` if it is zero. 
@param value - The value to check the sign for 
@returns {number} `-1` if it is negative, `1` if positive, and `0` if it is zero. 
@constructor
```

### TRUNC 

```
  Truncates a number to a certain number of significant digits by omitting less significant digits. 
@param value - The value to be truncated. 
@param places - [ OPTIONAL - 0 by default ] - The number of significant digits to the right of the decimal point to retain. If places is greater than the number of significant digits in value, value is returned without modification. places may be negative, in which case the specified number of digits to the left of the decimal place are changed to zero. All digits to the right of the decimal place are discarded. If all digits of value are changed to zero, TRUNC imply returns 0. 
@returns {number} after truncation 
@constructor
```

### RADIANS 

```
  Converts an angle value in degrees to radians. 
@param angle - The angle to convert from degrees to radians. 
@returns {number} radians 
@constructor
```

### DEGREES 

```
  Converts an angle value in radians to degrees. 
@param angle - The angle to convert from radians to degrees. 
@returns {number} degrees 
@constructor
```

### ERFC 

```
  Returns the complementary Gauss error function of a value. 
@param value - The number for which to calculate the complementary Gauss error function. 
@returns {number} complementary Gauss error function of a value 
@constructor
```

### ERF 

```
  Returns the error function integrated between lower_limit and upper_limit. 
@param lowerLimit - The lower bound for integrating ERF. 
@param upperLimit - [Optional]. The upper bound for integrating ERF. If omitted, ERF integrates between zero and lower_limit. 
@returns {number} error function integrated between lower_limit and upper_limit 
@constructor
```

### SUMX2PY2 

```
  Calculates the sum of the sums of the squares of values in two arrays. 
@param arrayX - The array or range of values whose squares will be added to the squares of corresponding entries in arrayY and added together. 
@param arrayY - The array or range of values whose squares will be added to the squares of corresponding entries in arrayX and added together. 
@returns {number} sum of the sums of the squares 
@constructor
```

### SUMX2MY2 

```
  Calculates the sum of the differences of the squares of values in two arrays. 
@param arrayX - The array or range of values whose squares will be reduced by the squares of corresponding entries in array_y and added together. 
@param arrayY - The array or range of values whose squares will be subtracted from the squares of corresponding entries in array_x and added together. 
@returns {number} sum of the differences of the squares 
@constructor
```

### COUNTUNIQUE 

```
  Counts the number of unique values in a list of specified values and ranges. 
@param values The values or ranges to consider for uniqueness. Supports an arbitrary number of arguments for this function. 
@returns {number} of unique values passed in. 
@constructor
```

### SUMPRODUCT 

```
  Calculates the sum of the products of corresponding entries in two equal-sized arrays or ranges. 
@param values Arrays or ranges whose entries will be multiplied with corresponding entries in the second such array or range. 
@returns {number} sum of the products 
@constructor
```

### COMBIN 

```
  Returns the number of ways to choose some number of objects from a pool of a given size of objects. 
@param m - The size of the pool of objects to choose from. 
@param k - The number of objects to choose. 
@returns {number} number of ways 
@constructor
```

### PRODUCT 

```
  Multiply a series of numbers together. 
@param values - values or range of values to multiply by each other. 
@constructor
```

### QUOTIENT 

```
  Divide one number by another 
@param dividend - number to be divided by the divisor. 
@param divisor - number to divide the dividend. 
@returns {number} 
@constructor
```

### UPLUS 

```
  Returns a value, but does nothing to it. If given a range, will return first value. 
@param value to return 
@returns any value 
@constructor
```

### UMINUS 

```
  Returns the same number, but with the sign reversed. 
@param value to reverse the sign on 
@returns {number} 
@constructor
```

### MROUND 

```
  Rounds a number to the nearest integer multiple of another. 
@param value - value to round. 
@param factor - multiple. 
@returns {number} 
@constructor
```

### FACTDOUBLE 

```
  Calculates the double-factorial of a number. 
@param value - value or reference to calculate. 
@returns {number} 
@constructor
```

### UNARY_PERCENT 

```
  Returns a value as a percentage where 100 is 1.0, and 0 is 0. 
@param value - To convert. 
@returns {number} 
@constructor
```

### MULTINOMIAL 

```
  Returns the factorial of the sum of the arguments divided by the product of the factorials of the arguments. 
@param values - Range of numbers. 
@returns {number} 
@constructor
```

### SERIESSUM 

```
  Returns a sum of powers of the number x in accordance with the following formula. 
@param x - The number as an independent variable. 
@param n - The starting power. 
@param m - The number to increment by 
@param coefficients - A series of coefficients. For each coefficient the series sum is extended by one section. You can only enter coefficients using cell references. 
@returns {number} 
@constructor
```

### SUBTOTAL 

```
  Calculates subtotals. If a range already contains subtotals, these are not used for further calculations. 
@param functionCode - A value that stands for another function: 1=AVERAGE, 2=COUNT, 3=COUNTA, 4=MAX, 5=MIN, 6=PRODUCT, 7=STDEV, 8=STDEVP, 9=SUM, 10=VAR, 11=VARP. 
@param values - The ranges whose cells are included. 
@returns {Array} 
@constructor
```
## Range


### FREQUENCY 

```
  Calculates the frequency distribution of a range into specified classes or "bins". 
@param range - to get frequency for. 
@param bins - or classes. 
@returns {Array<number>} 
@constructor TODO: Returns ColumnArray (values stacked in Y-direction)
```

### GROWTH 

```
  Given partial data with exponential growth, fits and ideal exponential growth trend, and predicts future values. For more information see: https://xkcd.com/1102 
@param knownY - The range or array containing the dependent, y, values that are known, and will be used to fit an ideal exponential growth curve. 
@param knownX - OPTIONAL - The range or values of the independent variables that correspond to knownY. 
@param newX - OPTIONAL - The range, values, or data-points to return the y-values on the ideal curve fit. 
@param shouldUseConstant - OPTIONAL - True by default. Given an exponential function y = bm^x, should this function calculate b? 
@returns {Array} 
@constructor TODO: Returns RowArray (values stacked in X-direction)
```

### LINEST 

```
  Returns the parameters of a linear trend. 
@param dataY - The range of data representing Y values. 
@param dataX - The range of data representing X values. 
@returns {number[]} 
@constructor
```
## Statistical


### DEVSQ 

```
  Calculates the sum of squares of deviations based on a sample. 
@param values - The values or ranges of the sample. 
@returns {number} sum of squares of deviations 
@constructor
```

### MEDIAN 

```
  Returns the median value in a numeric dataset. 
@param values - The value(s) or range(s) to consider when calculating the median value. 
@returns {number} the median value of the dataset 
@constructor
```

### AVERAGE 

```
  Returns the numerical average value in a dataset, ignoring text. 
@param values - The values or ranges to consider when calculating the average value. 
@returns {number} the average value of this dataset. 
@constructor
```

### AVEDEV 

```
  Calculates the average of the magnitudes of deviations of data from a dataset's mean. 
@param values - The value(s) or range(s) 
@returns {number} average of the magnitudes of deviations of data from a dataset's mean 
@constructor
```

### AVERAGEA 

```
  Returns the numerical average value in a dataset, coercing text values in ranges to 0 values. 
@param values - value(s) or range(s) to consider when calculating the average value. 
@returns {number} the numerical average value in a dataset 
@constructor
```

### CORREL 

```
  Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments will be ignored. CORREL is synonymous with PEARSON. 
@param dataY - The range representing the array or matrix of dependent data. 
@param dataX - The range representing the array or matrix of independent data. 
@returns {number} the Pearson product-moment correlation coefficient. 
@constructor
```

### PEARSON 

```
  Calculates r, the Pearson product-moment correlation coefficient of a dataset. Any text encountered in the arguments will be ignored. PEARSON is synonymous with CORREL. 
@param dataY - The range representing the array or matrix of dependent data. 
@param dataX - The range representing the array or matrix of independent data. 
@returns {number} the Pearson product-moment correlation coefficient. 
@constructor
```

### EXPONDIST 

```
  Returns the value of the exponential distribution function with a specified lambda at a specified value. 
@param x - The input to the exponential distribution function. If cumulative is TRUE then EXPONDIST returns the cumulative probability of all values up to x. 
@param lambda - The lambda to specify the exponential distribution function. 
@param cumulative - Whether to use the exponential cumulative distribution. 
@returns {number} value of the exponential distribution function. 
@constructor
```

### IST$LEFTTAILED 

```
  Calculates the left-tailed F probability distribution (degree of diversity) for two data sets with given input x. Alternately called Fisher-Snedecor distribution or Snecdor's F distribution. 
@param x - The input to the F probability distribution function. The value at which to evaluate the function. Must be a positive number. 
@param degreesFreedom1 - The numerator degrees of freedom. 
@param degreesFreedom2 - The denominator degrees of freedom. 
@param cumulative - Logical value that determines the form of the function. If true returns the cumulative distribution function. If false returns the probability density function. 
@returns {number|boolean} left-tailed F probability distribution 
@constructor TODO: This function should be stricter in its return type.
```

### FINV 

```
  Returns the inverse of the (right-tailed) F probability distribution. If p = FDIST(x,...), then FINV(p,...) = x. The F distribution can be used in an F-test that compares the degree of variability in two data sets. 
@param probability - A probability associated with the F cumulative distribution. 
@param degFreedom1 - Required. The numerator degrees of freedom. 
@param degFreedom2 - Required. The denominator degrees of freedom. 
@returns {number} inverse of the (right-tailed) F probability distribution 
@constructor
```

### FISHER 

```
  Returns the Fisher transformation of a specified value. 
@param value - The value for which to calculate the Fisher transformation. 
@returns {number} Fisher transformation 
@constructor
```

### FISHERINV 

```
  Returns the inverse Fisher transformation of a specified value. 
@param value - The value for which to calculate the inverse Fisher transformation. 
@returns {number} inverse Fisher transformation 
@constructor
```

### MAX 

```
  Returns the maximum value in a numeric dataset. 
@param values - The values or range(s) to consider when calculating the maximum value. 
@returns {number} the maximum value of the dataset 
@constructor
```

### MAXA 

```
  Returns the maximum numeric value in a dataset. 
@param values - The value(s) or range(s) to consider when calculating the maximum value. 
@returns {number} maximum value of the dataset 
@constructor
```

### MIN 

```
  Returns the minimum value in a numeric dataset. 
@param values - The value(s) or range(s) to consider when calculating the minimum value. 
@returns {number} the minimum value of the dataset 
@constructor
```

### MINA 

```
  Returns the minimum numeric value in a dataset. 
@param values - The value(s) or range(s) to consider when calculating the minimum value. 
@returns {number} the minimum value in the dataset 
@constructor
```

### AVERAGEIF 

```
  Returns the average of a range depending on criteria. 
@param criteriaRange - The range to check against criterion. 
@param criterion - The pattern or test to apply to criteria_range. 
@param averageRange - [optional] The range to average. If not included, criteria_range is used for the average instead. 
@returns {number} 
@constructor TODO: This needs to also accept a third parameter "average_range"
```

### COUNT 

```
  Returns the a count of the number of numeric values in a dataset. 
@param values - The values or ranges to consider when counting. 
@returns {number} number of numeric values in a dataset. 
@constructor
```

### COUNTA 

```
  Returns the a count of the number of values in a dataset. 
@param values - The values or ranges to consider when counting. 
@returns {number} number of values in a dataset. 
@constructor
```

### PERCENTILE 

```
  Returns the value at a given percentile of a set of data. 
@param data -  The array or range containing the dataset to consider. 
@param percent - percentile to be calculated and returned. 
@returns {number} 
@constructor
```

### QUARTILE 

```
  Returns a value nearest to a specified quartile of a set of data. 
@param data -  The array or range containing the set of data to consider. 
@param quartile - Which quartile value to return. 0 returns 0 percent mark, 1 returns 25 percent mark, 2 returns 50 percent mark, 3 returns 75 percent mark, 4 returns 100 percent mark. 
@constructor
```

### STDEV 

```
  Calculates the standard deviation of a range, ignoring string values, regardless of whether they can be converted to numbers. 
@param values - Range of sample. 
@returns {number} 
@constructor
```

### STDEVA 

```
  Calculates the standard deviation of a range, converting string values to numbers, if possible. If a value cannot be converted to a number, formula will throw a value error. 
@param values - Range of sample. 
@returns {number} 
@constructor
```

### STDEVP 

```
  Calculates the standard deviation of an entire population, ignoring string values, regardless of whether they can be converted to numbers. 
@param values - Entire sample. 
@returns {number} 
@constructor
```

### STDEVPA 

```
  Calculates the standard deviation of an entire population, including text and boolean values, if possible. If a value cannot be converted to a number, formula will throw a value error. 
@param values - Entire sample. 
@returns {number} 
@constructor
```

### TRIMMEAN 

```
  Returns the mean value of a range excluding some percentage of the range on the high and low ends of the range. 
@param range - Array or range to consider. 
@param percent - The portion of the data to exclude on both ends of the range. 
@returns {number} 
@constructor
```

### SLOPE 

```
  Returns the slope of the line calculated from linear regression of a range. Any text values passed in will be ignored 
@param rangeY - The range or array representing the dependent data. 
@param rangeX - The range or array representing the independent data. 
@constructor
```

### STANDARDIZE 

```
  Returns the normalized equivalent of a random variable given mean and standard deviation of the distribution. 
@param value - Value to be standardized. 
@param meanValue - Arithmetic mean of the distribution 
@param std - The standard deviation of the distribution or range. 
@returns {number} 
@constructor
```

### SMALL 

```
  Returns the Nth smallest value in the range, ignoring text values. 
@param range -  Range or data-set to consider. 
@param n - N in 'Nth'. 
@constructor
```

### LARGE 

```
  Returns the Nth largest value in the range, ignoring text values. 
@param range -  Range or data-set to consider. 
@param n - N in 'Nth'. 
@constructor
```

### KURT 

```
  Returns the kurtosis of a data set or range. Ignores text values. 
@param values - data set or range to calculate. Must be at least 4 values. 
@returns {number} 
@constructor
```

### INTERCEPT 

```
  Calculates the y-value at which a line will intersect the y-axis by using known x-values and y-values. Any text values will be ignored. 
@param rangeY - Dependent range of values. 
@param rangeX - Independent range of values. 
@returns {number} 
@constructor
```

### FORECAST 

```
  Calculates the a future value using existing x-values and y-values. Any text values will be ignored. 
@param x - The data point for which you would like to predict the value. 
@param rangeY - Dependent range of values. 
@param rangeX - Independent range of values. 
@returns {number} 
@constructor TODO: This formula will fail to parse since the first argument is followed by an argument that is an array. TODO (continued) This is a known issue.
```

### POISSON 

```
  Returns the Poisson distribution for the given number. Functions the same as POISSON.DIST. 
@param x - Number to use. 
@param meanValue - The middle value for the Poisson distribution. 
@param cumulative - [OPTIONAL] - 0 calculates the density function, 1 calculates the distribution. Defaults to 0. 
@returns {number} 
@constructor
```

### PERCENTRANK 

```
  Returns the percentage rank (percentile) of the given value in a sample. Functions the same as PERCENTRANK.INC. 
@param data - The array or range of data in the sample. 
@param x - The value. 
@param significance - [OPTIONAL] - The number of significant digits to use in the calculation. Defaults to 3. 
@returns {number} 
@constructor
```

### ERCENTRANK$EXC 

```
  Returns the percentage rank (percentile) from 0 to 1 exclusive for a value in a sample. 
@param data - The array or range of data in the sample. 
@param x - The value 
@param significance - [OPTIONAL] - The number of significant digits to use in the calculation. Defaults to 3. 
@returns {number} 
@constructor
```

### NORMSINV 

```
  Returns the inverse of the standard normal distribution for the given number. 
@param probability - The probability value. 
@returns {number} 
@constructor
```

### NORMSDIST 

```
  Returns the standard normal cumulative distribution for the given number. 
@param z - Value to use in calculation. 
@returns {number} 
@constructor
```

### NORMDIST 

```
  Returns the normal distribution for the given number in the distribution. 
@param x - Value to use. 
@param meanValue - The mean value of the distribution. 
@param standDev - The standard deviation of the distribution. 
@param cumulative - 0 calculates the density function, 1 calculates the distribution. 
@returns {number} 
@constructor
```

### NORMINV 

```
  Returns the inverse of the normal distribution for the given number in the distribution. 
@param probability - Number in the distribution. 
@param meanVal - The mean value in the normal distribution. 
@param standDev - The standard deviation of the normal distribution. 
@returns {number} 
@constructor
```

### NEGBINOMDIST 

```
  Returns the negative binomial distribution. 
@param k - The value returned for unsuccessful tests. 
@param r - The value returned for successful tests. 
@param p - The probability of the success of an attempt, between 0 and 1 inclusively. 
@returns {number} 
@constructor
```

### GEOMEAN 

```
  Returns the geometric mean of a sample. 
@param values - The numerical arguments or ranges that represent a random sample. 
@returns {number} 
@constructor
```

### HARMEAN 

```
  Returns the harmonic mean of a data set. 
@param values - The numerical arguments or ranges that represent a sample. 
@returns {number} 
@constructor
```

### CONFIDENCE 

```
  Returns the (1-alpha) confidence interval for a normal distribution. 
@param alpha - The level of the confidence interval 
@param standDev - The standard deviation for the total population 
@param size - The size of the population. 
@returns {number} 
@constructor
```

### BINOMDIST 

```
  Returns the individual term binomial distribution probability. 
@param successes - The number of successes in a set of trials. 
@param trials - The number of independent trials. 
@param probability - The probability of success on each trial. 
@param cumulative - 0 calculates the probability of a single event, 1 calculates the cumulative probability. 
@returns {number} 
@constructor
```

### COVAR 

```
  Returns the covariance of the product of paired deviations. 
@param dataY - The first range of data. 
@param dataX - The second range of data. 
@returns {number} 
@constructor
```

### WEIBULL 

```
  Returns the values of the Weibull distribution for the given number. 
@param x - Number to use in calculation. 
@param shape - The Alpha parameter of the Weibull distribution. Should be greater than 0. 
@param scale - The Beta parameter of the Weibull distribution. Should be greater than 0. 
@param cumulative - Indicates the type of function: If 0 the form of the function is calculated, if 1 then the distribution is calculated. 
@returns {number} 
@constructor
```

### VARPA 

```
  Estimate the variance based on the entire population. Text will be converted to numbers, if possible. 
@param values - Values of population. 
@returns {number} 
@constructor
```

### VARP 

```
  Estimate the variance based on the entire population. 
@param values - Values of entire population. 
@returns {number} 
@constructor
```

### VARA 

```
  Estimate the variance based on a sample. 
@param values 
@returns {number} 
@constructor
```

### VAR 

```
  Estimate the variance based on a sample. 
@param values - Values in sample. 
@constructor
```

### PERMUT 

```
  Returns the number of permutations for a given number of objects. 
@param total - The total number of objects 
@param objects - The number of objects in each permutation. 
@returns {number} 
@constructor
```

### RSQ 

```
  Returns the square of the Pearson correlation coefficient based on the given values. 
@param rangeY - An array or range of data points. 
@param rangeX - An array or range of data points. 
@returns {number} 
@constructor
```

### SKEW 

```
  Returns the skewness of a distribution. 
@param values - The numerical values or range. 
@returns {number} 
@constructor
```

### STEYX 

```
  Returns the standard error of the predicted y value for each x in the regression. Text values will be ignored. 
@param rangeY - An array or range of data points. 
@param rangeX - An array or range of data points. 
@returns {number} 
@constructor
```

### PROB 

```
  Returns the probability that values in a range are between two limits. Data is the array or range of data in the ample. 
@param range - The array or range of data in the sample. 
@param probability - The array or range of the corresponding probabilities 
@param start - The start value of the interval whose probabilities are to be summed. 
@param end - [OPTIONAL] - The end value of the interval whose probabilities are to be summed. If this parameter is missing, the probability for the start value is calculated 
@returns {number} 
@constructor
```

### MODE 

```
  Returns the most commonly occurring value in a range. 
@param values - Range(s) or values to consider. 
@returns {number} 
@constructor
```

### RANK 

```
  Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top. 
@param value - Value to find the rank of. 
@param data - Values or range of the data-set. 
@param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to 0. 
@returns {number} 
@constructor
```

### RANK$AVG 

```
  Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top. If more than one value exists in the same data-set, the average range of the values will be returned. 
@param value - Value to find the rank of. 
@param data - Values or range of the data-set. 
@param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to 0. 
@returns {number} 
@constructor
```

### RANK$EQ 

```
  Returns the position of a given entry in the entire list, measured either from top to bottom or bottom to top. If there is more than one entry of the same value in the dataset, the top rank of the entries will be returned. 
@param value - Value to find the rank of. 
@param data - Values or range of the data-set. 
@param isAscending - [OPTIONAL] The type of rank: 0 to rank from the highest, 1 to rank from the lowest. Defaults to 0. 
@returns {number} 
@constructor
```

### LOGNORMDIST 

```
  Returns the cumulative lognormal distribution for the given number. 
@param x - The probability value. 
@param meanValue - The mean value of the standard logarithmic distribution. 
@param standardDev - The standard deviation of the standard logarithmic distribution. 
@returns {number} 
@constructor
```

### TDIST 

```
  Returns the t-distribution for the given number. 
@param x - Value to use in calculation. 
@param degreesOfFreedom - The number of degrees of freedom for the t-distribution. 
@param tails - 1 returns the one-tailed test, 2 returns the two-tailed test. 
@returns {number} 
@constructor
```

### HYPGEOMDIST 

```
  Returns the hypergeometric distribution. X is the number of results achieved in the random sample. 
@param numberOfSuccesses - The number of results achieved in the random sample. 
@param numberOfDraws - The size of the random sample. 
@param successesInPop - The number of possible results in the total population. 
@param populationSize - The size of the total population. 
@returns {number} 
@constructor
```

### ZTEST 

```
  Returns the two-tailed P value of a z test with standard distribution. 
@param range - Te array of the data. 
@param value - The value to be tested. 
@param stdDev - [OPTIONAL] The standard deviation of the total population. If this argument is missing, the standard deviation of the sample is processed. 
@returns {number} 
@constructor
```
## Text


### ARABIC 

```
  Computes the value of a Roman numeral. 
@param text - The Roman numeral to format, whose value must be between 1 and 3999, inclusive. 
@returns {number} value in integer format 
@constructor
```

### CHAR 

```
  Convert a number into a character according to the current Unicode table. 
@param value - The number of the character to look up from the current Unicode table in decimal format. 
@returns {string} character corresponding to Unicode number 
@constructor
```

### CODE 

```
  Returns the numeric Unicode map value of the first character in the string provided. 
@param value - The string whose first character's Unicode map value will be returned. 
@returns {number} number of the first character's Unicode value 
@constructor
```

### SPLIT 

```
  Divides text around a specified character or string, and puts each fragment into a separate cell in the row. 
@param text - The text to divide. 
@param delimiter - The character or characters to use to split text. 
@param splitByEach - [optional] Whether or not to divide text around each character contained in delimiter. 
@returns {Array<string>} containing the split 
@constructor TODO: At some point this needs to return a more complex type than Array. Needs to return a type that has a dimension.
```

### CONCATENATE 

```
  Appends strings to one another. 
@param values - to append to one another. Must contain at least one value 
@returns {string} concatenated string 
@constructor
```

### CONVERT 

```
  Converts a numeric value to a different unit of measure. 
@param value - the numeric value in start_unit to convert to end_unit. 
@param startUnit - The starting unit, the unit currently assigned to value. 
@param endUnit - The unit of measure into which to convert value. 
@returns {number} 
@constructor TODO: Looking up units is not efficient at all. We should use an object instead of iterating through an array.
```

### TRIM 

```
  Removes leading and trailing spaces in a specified string. 
@param value - The string or reference to a cell containing a string to be trimmed. 
@returns {string} 
@constructor
```

### LOWER 

```
  Converts text to lowercase. 
@param value - Text to convert. 
@constructor
```

### UPPER 

```
  Converts text to uppercase. 
@param value - Text to convert. 
@constructor
```

### T 

```
  Returns string arguments as text, or the empty string if the value is not text. 
@param value - Value to return. 
@constructor
```

### ROMAN 

```
  Converts a number into a Roman numeral. 
@param value - The value to convert. Must be between 0 and 3999. 
@constructor TODO: Second parameter should be 'rule_relaxation'.
```

### TEXT 

```
  Converts a number into text according to a given format. 
@param value - The value to be converted. 
@param format - Text which defines the format. "0" forces the display of zeros, while "#" suppresses the display of zeros. For example TEXT(22.1,"000.00") produces 022.10, while TEXT(22.1,"###.##") produces 22.1, and TEXT(22.405,"00.00") results in 22.41. To format days: "dddd" indicates full name of the day of the week, "ddd" hort name of the day of the week, "dd" indicates the day of the month as two digits, "d" indicates day of the month as one or two digits, "mmmmm" indicates the first letter in the month of the year, "mmmm" indicates the full name of the month of the year, "mmm" indicates short name of the month of the year, "mm" indicates month of the year as two digits or the number of minutes in a time, depending on whether it follows yy or dd, or if it follows hh, "m" month of the year as one or two digits or the number of minutes in a time, depending on whether it follows yy or dd, or if it follows hh, "yyyy" indicates year as four digits, "yy" and "y" indicate year as two digits, "hh" indicates hour on a 24-hour clock, "h" indicates hour on a 12-hour clock, "ss.000" indicates milliseconds in a time, "ss" indicates econds in a time, "AM/PM" or "A/P" indicate displaying hours based on a 12-hour clock and showing AM or PM depending on the time of day. Eg: `TEXT("01/09/2012 10:04:33AM", "mmmm-dd-yyyy, hh:mm AM/PM")` would result in "January-09-2012, 10:04 AM". 
@constructor
```

### 

```
  Converts a number into text according to a given format.  
@param value - The value to be converted.  
@param format - Text which defines the format. "0" forces the display of zeros, while "#" suppresses the display of zeros. For example TEXT(22.1,"000.00") produces 022.10, while TEXT(22.1,"###.##") produces 22.1, and TEXT(22.405,"00.00") results in 22.41. To format days: "dddd" indicates full name of the day of the week, "ddd" hort name of the day of the week, "dd" indicates the day of the month as two digits, "d" indicates day of the month as one or two digits, "mmmmm" indicates the first letter in the month of the year, "mmmm" indicates the full name of the month of the year, "mmm" indicates short name of the month of the year, "mm" indicates month of the year as two digits or the number of minutes in a time, depending on whether it follows yy or dd, or if it follows hh, "m" month of the year as one or two digits or the number of minutes in a time, depending on whether it follows yy or dd, or if it follows hh, "yyyy" indicates year as four digits, "yy" and "y" indicate year as two digits, "hh" indicates hour on a 24-hour clock, "h" indicates hour on a 12-hour clock, "ss.000" indicates milliseconds in a time, "ss" indicates econds in a time, "AM/PM" or "A/P" indicate displaying hours based on a 12-hour clock and showing AM or PM depending on the time of day. Eg: `TEXT("01/09/2012 10:04:33AM", "mmmm-dd-yyyy, hh:mm AM/PM")` would result in "January-09-2012, 10:04 AM".  
@constructor if (format.match(/^.(d|D|M|m|yy|Y|HH|hh|h|s|S|AM|PM|am|pm|A\/P|\).$/g)) { const POUND_SIGN_FORMAT_CAPTURE = /^([$
```

### FIND 

```
  Looks for a string of text within another string. Where to begin the search can also be defined. The search term can be a number or any string of characters. The search is case-sensitive. 
@param searchFor - The text to be found. 
@param searchIn - The text where the search takes place. 
@param startAt - [OPTIONAL defaults to 1] - The position in the text from which the search starts. 
@returns {number} 
@constructor
```

### JOIN 

```
  Concatenates the values of one or more arrays using a specified delimiter. 
@param delimiter - The string to place between the values. 
@param values - The values to be appended using the delimiter. 
@returns {string} 
@constructor
```

### LEN 

```
  Returns the length of a string including spaces. 
@param value - The text whose length is to be determined. 
@constructor
```

### LEFT 

```
  Returns the first character or characters in a text string. 
@param text - The text where the initial partial words are to be determined. 
@param numberOfCharacters [OPTIONAL] - The number of characters for the start text. If this parameter is not defined, one character is returned. 
@returns {string} 
@constructor
```

### RIGHT 

```
  Defines the last character or characters in a text string. 
@param text - The text where the initial partial words are to be determined. 
@param numberOfCharacters [OPTIONAL] - The number of characters for the start text. If this parameter is not defined, one character is returned. 
@returns {string} 
@constructor
```

### SEARCH 

```
  Returns the position of a text segment within a character string. The start of the search can be set as an option. The search text can be a number or any sequence of characters. The search is not case-sensitive. 
@param findText - The text to be searched for. 
@param withinText - The text where the search will take place 
@param position - [OPTIONAL default 1] The position in the text where the search is to start. 
@constructor
```

### REPT 

```
  Repeats a character string by the given number of copies. 
@param text - The text to be repeated. 
@param numberOfReps - The number of repetitions 
@constructor
```

### VALUE 

```
  Converts a value into a number if possible. 
@param value - The value to convert to a number. 
@returns {number} 
@constructor
```

### CLEAN 

```
  Removes all non-printing characters from the string. 
@param text - The text from which to remove all non-printable characters. 
@returns {string} 
@constructor
```

### MID 

```
  Returns a text segment of a character string. The parameters specify the starting position and the number of characters. 
@param text - The text containing the characters to extract. 
@param start - The position of the first character in the text to extract. 
@param number - The number of characters in the part of the text. 
@returns {string} 
@constructor
```

### REPLACE 

```
  Replaces part of a text string with a different text string. This function can be used to replace both characters and numbers (which are automatically converted to text). The result of the function is always displayed as text. 
@param text - The text of which a part will be replaced. 
@param position - The position within the text where the replacement will begin. 
@param length - The number of characters in text to be replaced. 
@param newText - The text which replaces text. 
@constructor
```

### SUBSTITUTE 

```
  Substitutes new text for old text in a string. 
@param text - The text in which text segments are to be exchanged. 
@param searchFor - The text segment that is to be replaced (a number of times) 
@param replaceWith - The text that is to replace the text segment. 
@param occurrence - [OPTIONAL] - Indicates how many occurrences of the search text are to be replaced. If this parameter is missing, the search text is replaced throughout. 
@returns {string} 
@constructor
```
