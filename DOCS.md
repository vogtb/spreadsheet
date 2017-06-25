# Documentation

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
@returns {number} of days since 190011, inclusively. 
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
  Returns the number of years, including fractional years, between two dates using a specified day count convention.  Further reading:  http:christian-fries.deblogfile2013-yearfrac.html  http:finmath.netfinmath-lib  
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
@param time - The time from which to calculate the hour component. Must be a reference to a cell containing a datetime, a function returning a datetime type, or a number. 
@returns {number} 
@constructor
```

### MINUTE 

```
  Returns the minute component of a specific time, in numeric format. 
@param time - The time from which to calculate the minute component. Must be a reference to a cell containing a datetime, a function returning a datetime type, or a number. 
@returns {number} minute of the time passed in. 
@constructor
```

### SECOND 

```
  Returns the second component of a specific time, in numeric format. 
@param time - The time from which to calculate the second component. Must be a reference to a cell containing a datetime, a function returning a datetime type, or a number. 
@returns {number} second component of a specific time. 
@constructor
```

### TWORKDAYS 

```
  Returns the number of net working days between two provided days. 
@param startDate - The start date of the period from which to calculate the number of net working days. 
@param endDate - The end date of the period from which to calculate the number of net working days. 
@param holidays - [ OPTIONAL ] - A range or array constant containing the date serial numbers to consider holidays. The values provided within an array for holidays must be date serial number values, as returned by N or date values, as returned by DATE, DATEVALUE or TO_DATE. Values specified by a range should be standard date values or date serial numbers. 
@returns {number} the number of net working days between two provided dates. 
@constructor
```

### INTL 

```
  Returns the number of networking days between two provided days excluding specified weekend days and holidays. 
@param startDate - The start date of the period from which to calculate the number of net working days. 
@param endDate - The end date of the period from which to calculate the number of net working days. 
@param weekend - [ OPTIONAL - 1 by default ] - A number or string representing which days of the week are considered weekends. String method: weekends can be specified using seven 0’s and 1’s, where the first number in the et represents Monday and the last number is for Sunday. A zero means that the day is a work day, a 1 means that the day is a weekend. For example, “0000011” would mean Saturday and Sunday are weekends. Number method: instead of using the string method above, a single number can be used. 1 = SaturdaySunday are weekends, 2 = SundayMonday, and this pattern repeats until 7 = FridaySaturday. 11 = Sunday is the only weekend, 12 = Monday is the only weekend, and this pattern repeats until 17 = Saturday is the only weekend. 
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

### INTL 

```
  Calculates the date after a specified number of workdays excluding specified weekend days and holidays. 
@param startDate - The date from which to begin counting. 
@param numberOfDays - The number of working days to advance from start_date. If negative, counts backwards. 
@param weekend - [ OPTIONAL - 1 by default ] - A number or string representing which days of the week are considered weekends. String method: weekends can be specified using seven 0’s and 1’s, where the first number in the et represents Monday and the last number is for Sunday. A zero means that the day is a work day, a 1 means that the day is a weekend. For example, “0000011” would mean Saturday and Sunday are weekends. Number method: instead of using the string method above, a single number can be used. 1 = SaturdaySunday are weekends, 2 = SundayMonday, and this pattern repeats until 7 = FridaySaturday. 11 = Sunday is the only weekend, 12 = Monday is the only weekend, and this pattern repeats until 17 = Saturday is the only weekend. 
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
@param unit - The units of the fraction, e.g. 8 for 18ths or 32 for 132nds. 
@returns {number} decimal value. 
@constructor
```

### DOLLARFR 

```
  Converts a price quotation given as a decimal value into a decimal fraction. 
@param decimalPrice - The price quotation given as a decimal value. 
@param unit - The units of the desired fraction, e.g. 8 for 18ths or 32 for 132nds 
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
  Calculates the accrued interest of a security that has periodic payments. WARNING: This function has been implemented to specifications as outlined in Google Spreadsheets, LibreOffice, and OpenOffice. It functions much the same as MSExcel's ACCRINT, but there are several key differences. Below are links to illustrate the differences. Please see the source code for more information on differences. Links: https:quant.stackexchange.comquestion7040whats-the-algorithm-behind-excels-accrint, https:upport.office.comen-uarticleACCRINT-function-fe45d089-6722-4fb3-9379-e1f911d8dc74, https:quant.stackexchange.comquestion7040whats-the-algorithm-behind-excels-accrint, https:upport.google.comdocanswer3093200 . 
@param issue - The date the security was initially issued. 
@param firstPayment - The first date interest will be paid. 
@param settlement - The settlement date of the security, the date after issuance when the security is delivered to the buyer. Is the maturity date of the security if it is held until maturity rather than sold. 
@param rate - The annualized rate of interest. 
@param redemption - The redemption amount per 100 face value, or par. 
@param frequency - The number of coupon payments per year. For annual payments, frequency = 1; for emiannual, frequency = 2; for quarterly, frequency = 4. 
@param dayCountConvention - [ OPTIONAL - 0 by default ] - An indicator of what day count method to use. 0 or omitted = US (NASD) 30360, 1 = Actualactual, 2 = Actual360, 3 = Actual365, 4 = European 30360. 
@returns {number} 
@constructor TODO: This function is based off of the open-source versions I was able to dig up online. We should implement a TODO:     second version that is closer to what MSExcel does and is named something like `ACCRINT.MS`.
```
## Info


### NA 

```
  Returns the "value not available" error, "#NA". 
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
@param index - Which choice to return. 
@param values -  Array of potential value to return. Required. May be a reference to a cell or an individual value. 
@constructor TODO: This does not currently work with the parser. See TODO.md for more information.
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
  Returns the sum of a series of numbers andor cells. 
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
  Returns the cotangent of any real number. Defined as cot(x) = 1  tan(x). 
@param value - number to calculate the cotangent for 
@returns {number} cotangent 
@constructor
```

### COTH 

```
  Return the hyperbolic cotangent of a value, defined as coth(x) = 1  tanh(x). 
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
  Returns the sum of the squares of a series of numbers andor cells. 
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
  Returns one number divided by another. Equivalent to the `` operator. 
@param dividend - The number to be divided. 
@param divisor - The number to divide by, cannot be 0. 
@returns {number} result of dividend  divisor. 
@constructor
```

### RAND 

```
  Returns a random number between 0 inclusive and 1 exclusive. 
@returns {number} 
@constructor
```

### NDBETWEEN 

```
  Returns a uniformly random integer between two values, inclusive on high and low. Values with decimal parts may be used for low andor high; this will cause the least and greatest possible values to be the next integer greater than low andor the next integer less than high, respectively. 
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

### UNTUNIQUE 

```
  Counts the number of unique values in a list of specified values and ranges. 
@param values The values or ranges to consider for uniqueness. Supports an arbitrary number of arguments for this function. 
@returns {number} of unique values passed in. 
@constructor
```

### UMPRODUCT 

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

### ACTDOUBLE 

```
  Calculates the double-factorial of a number. 
@param value - value or reference to calculate. 
@returns {number} 
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
  Given partial data with exponential growth, fits and ideal exponential growth trend, and predicts future values. For more information see: https:xkcd.com1102 
@param knownY - The range or array containing the dependent, y, values that are known, and will be used to fit an ideal exponential growth curve. 
@param knownX - OPTIONAL - The range or values of the independent variables that correspond to knownY. 
@param newX - OPTIONAL - The range, values, or data-points to return the y-values on the ideal curve fit. 
@param shouldUseConstant - OPTIONAL - True by default. Given an exponential function y = bm^x, should this function calculate b? 
@returns {Array} 
@constructor TODO: Returns RowArray (values stacked in X-direction)
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

### EFTTAILED 

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

### ERCENTILE 

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

### ANDARDIZE 

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

### NCATENATE 

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
