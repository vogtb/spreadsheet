/**
 * Build a regular expression step by step, to make it easier to build and read the resulting regular expressions.
 */
declare class DateRegExBuilder {
    private regexString;
    private static ZERO_OR_MORE_SPACES;
    static DateRegExBuilder(): DateRegExBuilder;
    /**
     * Start the regular expression builder by matching the start of a line and zero or more spaces.
     * @returns {DateRegExBuilder} builder
     */
    start(): DateRegExBuilder;
    /**
     * End the regular expression builder by matching the end of the line.
     * @returns {DateRegExBuilder} builder
     */
    end(): DateRegExBuilder;
    /**
     * Capture all month full name and short names to the regular expression.
     * @returns {DateRegExBuilder} builder
     */
    MONTHNAME(): DateRegExBuilder;
    /**
     * Capture all month full name and short names to the regular expression, in addition to any followed by one or more
     * spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    MONTHNAME_W_SPACE(): DateRegExBuilder;
    /**
     * Add capture group for optionally capturing day names.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    OPTIONAL_DAYNAME(): DateRegExBuilder;
    /**
     * Add capture group for optionally capturing a comma followed by one or more spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    OPTIONAL_COMMA(): DateRegExBuilder;
    /**
     * Add capture group for capturing month digits between 01 and 12, inclusively.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    MM(): DateRegExBuilder;
    /**
     * Add capture group for capturing month digits between 01 and 12, inclusively, in addition to any followed by one or
     * more spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    MM_W_SPACE(): DateRegExBuilder;
    /**
     * Add capture group for capturing day digits between 01 and 31, inclusively.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DD(): DateRegExBuilder;
    /**
     * Add capture group for capturing day digits between 01 and 31, inclusively, in addition to any followed by one or
     * more spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    DD_W_SPACE(): DateRegExBuilder;
    /**
     * Add capture group for capturing 4 digits or 3 digits starting with 0-9.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    YYYY(): DateRegExBuilder;
    /**
     * Add capture group for capturing 1 through 4 digits.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    YYYY14(): DateRegExBuilder;
    /**
     * Add capture group for capturing 1 through 4 digits, in addition to any followed by one or more spaces.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    YYYY14_W_SPACE(): DateRegExBuilder;
    YYYY2_OR_4_W_SPACE(): DateRegExBuilder;
    /**
     * Add capture group for a flexible delimiter, including ", ", " ", ". ", "\", "-".
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    FLEX_DELIMITER(): DateRegExBuilder;
    /**
     * Add capture group for a flexible delimiter, including ", ", " ", ".", "\", "-". Different from FLEX_DELIMITER
     * in that it will match periods with zero or more spaces on either side.
     * For reference: https://regex101.com/r/q1fp1z/1/
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    FLEX_DELIMITER_LOOSEDOT(): DateRegExBuilder;
    /**
     * Add an optional capture group for capturing timestamps including: "10am", "10:10", "10:10pm", "10:10:10",
     * "10:10:10am", along with zero or more spaces after semi colons, AM or PM, and unlimited number of digits per unit.
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    OPTIONAL_TIMESTAMP_CAPTURE_GROUP(): DateRegExBuilder;
    /**
     * Add a capture group for capturing timestamps including: "10am", "10:10", "10:10pm", "10:10:10",
     * "10:10:10am", along with zero or more spaces after semi colons, AM or PM, and unlimited number of digits per unit.
     * See https://regex101.com/r/0bmj5n/1/ for more information of 9-digit maximum. One series, "12:00001989198298am",
     * has a maximum of 10 digits: "0*(?:[1-9]{1}[0-9]{0,9})?"
     * @returns {DateRegExBuilder} builder
     * @constructor
     */
    TIMESTAMP_UNITS_CAPTURE_GROUP(): DateRegExBuilder;
    /**
     * Build the regular expression and ignore case.
     * @returns {RegExp}
     */
    build(): RegExp;
}
export { DateRegExBuilder };
