/**
 * Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are
 * logically false.
 * @param values At least one expression or reference to a cell containing an expression that represents some logical
 * value, i.e. TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean} if all values are logically true.
 * @constructor
 */
declare let AND: (...values: any[]) => boolean;
/**
 * Tests whether two strings are identical, returning true if they are.
 * @param one - The first string to compare
 * @param two - The second string to compare
 * @returns {boolean}
 * @constructor
 */
declare let EXACT: (one: any, two: any) => boolean;
/**
 * Returns true.
 * @returns {boolean} true boolean
 * @constructor
 */
declare let TRUE: () => boolean;
/**
 * Returns false.
 * @returns {boolean} false boolean
 * @constructor
 */
declare let FALSE: () => boolean;
/**
 * Returns the opposite of a logical value - NOT(TRUE) returns FALSE; NOT(FALSE) returns TRUE.
 * @param value - An expression or reference to a cell holding an expression that represents some logical value.
 * @returns {boolean} opposite of a logical value input
 * @constructor
 */
declare let NOT: (value: any) => boolean;
/**
 * Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are
 * logically false.
 * @param values An expression or reference to a cell containing an expression that represents some logical value, i.e.
 * TRUE or FALSE, or an expression that can be coerced to a logical value.
 * @returns {boolean}
 * @constructor
 */
declare let OR: (...values: any[]) => boolean;
/**
 * Exclusive or or exclusive disjunction is a logical operation that outputs true only when inputs differ.
 * @param values to check for exclusivity.
 * @returns {boolean} returns true if only one input is considered logically true.
 * @constructor
 */
declare let XOR: (...values: any[]) => boolean;
export { AND, EXACT, TRUE, FALSE, NOT, OR, XOR };
