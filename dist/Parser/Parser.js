"use strict";
exports.__esModule = true;
var ObjectFromPairs_1 = require("../Utilities/ObjectFromPairs");
// Rules represent the Regular Expressions that will be used in sequence to match a given input to the Parser.
var WHITE_SPACE_RULE = /^(?:\s+)/; // rule 0
var DOUBLE_QUOTES_RULE = /^(?:"(\\["]|[^"])*")/; // rule 1
var SINGLE_QUOTES_RULE = /^(?:'(\\[']|[^'])*')/; // rule 2
var FORMULA_NAME_RULE = /^(?:[A-Za-z.]{1,}[A-Za-z_0-9]+(?=[(]))/; // Changed from /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+(?=[(]))/ // rule 3
var DATE_RULE = /^(?:([0]?[1-9]|1[0-2])[:][0-5][0-9]([:][0-5][0-9])?[ ]?(AM|am|aM|Am|PM|pm|pM|Pm))/; // rule 4
var TIME_RULE = /^(?:([0]?[0-9]|1[0-9]|2[0-3])[:][0-5][0-9]([:][0-5][0-9])?)/; // rule 5
var $_A1_CELL_RULE = /^(?:\$[A-Za-z]+\$[0-9]+)/; // rule 6
var A1_CELL_RULE = /^(?:[A-Za-z]+[0-9]+)/; // rules 7
var FORMULA_NAME_SIMPLE_RULE = /^(?:[A-Za-z.]+(?=[(]))/; // rule 8
var VARIABLE_RULE = /^(?:[A-Za-z]{1,}[A-Za-z_0-9]+)/; // rule 9
var SIMPLE_VARIABLE_RILE = /^(?:[A-Za-z_]+)/; //rule 10
var INTEGER_RULE = /^(?:[0-9]+(?:(?:[eE])(?:[\+-])?[0-9]+)?)/; // Changed from /^(?:[0-9]+)/ // rule 11
var OPEN_AND_CLOSE_OF_ARRAY_RULE = /^(?:\[(.*)?\])/; // rule 12
var DOLLAR_SIGN_RULE = /^(?:\$)/; // rule 13
var AMPERSAND_SIGN_RULE = /^(?:&)/; //rule 14
var SINGLE_WHITESPACE_RULE = /^(?: )/; // rule 15
var PERIOD_RULE = /^(?:[.])/; // rule 16
var COLON_RULE = /^(?::)/; //rule 17
var SEMI_COLON_RULE = /^(?:;)/; // rule 18
var COMMA_RULE = /^(?:,)/; // rule 19
var ASTERISK_RULE = /^(?:\*)/; //rule 20
var FORWARD_SLASH_RULE = /^(?:\/)/; // rule 21
var MINUS_SIGN_RULE = /^(?:-)/; // rule 22
var PLUS_SIGN_RULE = /^(?:\+)/; // rule 23
var CARET_SIGN_RULE = /^(?:\^)/; //rule 24
var OPEN_PAREN_RULE = /^(?:\()/; // rule 25
var CLOSE_PAREN_RULE = /^(?:\))/; // rule 26
var GREATER_THAN_SIGN_RULE = /^(?:>)/; // rule 27
var LESS_THAN_SIGN_RULE = /^(?:<)/; // rule 28
var NOT_RULE = /^(?:NOT\b)/; // rule 29
var OPEN_DOUBLE_QUOTE = /^(?:")/; // rule 30
var OPEN_SINGLE_QUITE = /^(?:')/; // rule 31
var EXCLAMATION_POINT_RULE = /^(?:!)/; // rule 32
var EQUALS_SIGN_RULE = /^(?:=)/; // rule 33
var PERCENT_SIGN_RULE = /^(?:%)/; // rule 34
var HASH_SIGN_RULE = /^(?:[#])/; // rule 35
var END_OF_STRING_RULE = /^(?:$)/; // rule 36
// Sequential rules to use when parsing a given input.
var RULES = [
    WHITE_SPACE_RULE,
    DOUBLE_QUOTES_RULE,
    SINGLE_QUOTES_RULE,
    FORMULA_NAME_RULE,
    DATE_RULE,
    TIME_RULE,
    $_A1_CELL_RULE,
    A1_CELL_RULE,
    FORMULA_NAME_SIMPLE_RULE,
    VARIABLE_RULE,
    SIMPLE_VARIABLE_RILE,
    INTEGER_RULE,
    OPEN_AND_CLOSE_OF_ARRAY_RULE,
    DOLLAR_SIGN_RULE,
    AMPERSAND_SIGN_RULE,
    SINGLE_WHITESPACE_RULE,
    PERIOD_RULE,
    COLON_RULE,
    SEMI_COLON_RULE,
    COMMA_RULE,
    ASTERISK_RULE,
    FORWARD_SLASH_RULE,
    MINUS_SIGN_RULE,
    PLUS_SIGN_RULE,
    CARET_SIGN_RULE,
    OPEN_PAREN_RULE,
    CLOSE_PAREN_RULE,
    GREATER_THAN_SIGN_RULE,
    LESS_THAN_SIGN_RULE,
    NOT_RULE,
    OPEN_DOUBLE_QUOTE,
    OPEN_SINGLE_QUITE,
    EXCLAMATION_POINT_RULE,
    EQUALS_SIGN_RULE,
    PERCENT_SIGN_RULE,
    HASH_SIGN_RULE,
    END_OF_STRING_RULE
];
/**
 * Represents the length to reduce the stack by, and the token index value that will replace those tokens in the stack.
 */
var ReductionPair = (function () {
    function ReductionPair(replacementTokenIndex, length) {
        this.lengthToReduceStackBy = length;
        this.replacementTokenIndex = replacementTokenIndex;
    }
    /**
     * Get the number representing the length to reduce the stack by.
     * @returns {number}
     */
    ReductionPair.prototype.getLengthToReduceStackBy = function () {
        return this.lengthToReduceStackBy;
    };
    /**
     * Get the replacement token index.
     * @returns {number}
     */
    ReductionPair.prototype.getReplacementTokenIndex = function () {
        return this.replacementTokenIndex;
    };
    return ReductionPair;
}());
/**
 * Productions is used to look up both the number to use when reducing the stack (productions[x][1]) and the semantic
 * value that will replace the tokens in the stack (productions[x][0]).
 * @type {Array<ReductionPair>}
 */
var productions = [];
productions[0 /* NO_ACTION */] = null;
productions[1 /* RETURN_LAST */] = new ReductionPair(3, 2);
productions[2 /* CALL_VARIABLE */] = new ReductionPair(4, 1);
productions[3 /* TIME_CALL_TRUE */] = new ReductionPair(4, 1);
productions[4 /* TIME_CALL */] = new ReductionPair(4, 1);
productions[5 /* AS_NUMBER */] = new ReductionPair(4, 1);
productions[6 /* AS_STRING */] = new ReductionPair(4, 1);
productions[7 /* AMPERSAND */] = new ReductionPair(4, 3);
productions[8 /* EQUALS */] = new ReductionPair(4, 3);
productions[9 /* PLUS */] = new ReductionPair(4, 3);
productions[10 /* LAST_NUMBER */] = new ReductionPair(4, 3);
productions[11 /* LTE */] = new ReductionPair(4, 4);
productions[12 /* GTE */] = new ReductionPair(4, 4);
productions[13 /* NOT_EQ */] = new ReductionPair(4, 4);
productions[14 /* NOT */] = new ReductionPair(4, 3);
productions[15 /* GT */] = new ReductionPair(4, 3);
productions[16 /* LT */] = new ReductionPair(4, 3);
productions[17 /* MINUS */] = new ReductionPair(4, 3);
productions[18 /* MULTIPLY */] = new ReductionPair(4, 3);
productions[19 /* DIVIDE */] = new ReductionPair(4, 3);
productions[20 /* TO_POWER */] = new ReductionPair(4, 3);
productions[21 /* INVERT_NUM */] = new ReductionPair(4, 2);
productions[22 /* TO_NUMBER_NAN_AS_ZERO */] = new ReductionPair(4, 2);
productions[23 /* CALL_FUNCTION_LAST_BLANK */] = new ReductionPair(4, 3);
productions[24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */] = new ReductionPair(4, 4);
productions[25 /* I25 */] = new ReductionPair(4, 1);
productions[26 /* I26 */] = new ReductionPair(4, 1);
productions[27 /* I27 */] = new ReductionPair(4, 2);
productions[28 /* FIXED_CELL_VAL */] = new ReductionPair(25, 1);
productions[29 /* FIXED_CELL_RANGE_VAL */] = new ReductionPair(25, 3);
productions[30 /* CELL_VALUE */] = new ReductionPair(25, 1);
productions[31 /* CELL_RANGE_VALUE */] = new ReductionPair(25, 3);
productions[32 /* ENSURE_IS_ARRAY */] = new ReductionPair(24, 1);
productions[33 /* ENSURE_YYTEXT_ARRAY */] = new ReductionPair(24, 1);
productions[34 /* REDUCE_INT */] = new ReductionPair(24, 3);
productions[35 /* REDUCE_PERCENT */] = new ReductionPair(24, 3);
productions[36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */] = new ReductionPair(6, 1);
productions[37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */] = new ReductionPair(6, 3);
productions[38 /* REFLEXIVE_REDUCE */] = new ReductionPair(9, 1);
productions[39 /* REDUCE_FLOAT */] = new ReductionPair(9, 3);
productions[40 /* REDUCE_PREV_AS_PERCENT */] = new ReductionPair(9, 2);
productions[41 /* REDUCE_LAST_THREE_A */] = new ReductionPair(2, 3);
productions[42 /* REDUCE_LAST_THREE_B */] = new ReductionPair(2, 4);
var PRODUCTIONS = productions;
/**
 * Parser initially generated by jison 0.4.15, but modified for readability and extensibility.
 */
var Parser = (function () {
    /**
     * Extend object obj by keys k, and values v for each k.
     * @param k - keys to extend object by.
     * @param v - value set for each key k.
     * @param obj - object to extend.
     * @param l
     * @returns {Object}
     */
    var extendRules = function (k, v, obj, l) {
        for (obj = obj || {}, l = k.length; l--; obj[k[l]] = v) { }
        return obj;
    };
    var $V0 = [1 /* SHIFT */, 4];
    var $V1 = [1 /* SHIFT */, 5];
    var $V2 = [1 /* SHIFT */, 7];
    var $V3 = [1 /* SHIFT */, 10];
    var $V4 = [1 /* SHIFT */, 8];
    var $V5 = [1 /* SHIFT */, 9];
    var $V6 = [1 /* SHIFT */, 11];
    var $V7 = [1 /* SHIFT */, 16];
    var $V8 = [1 /* SHIFT */, 17];
    var $V9 = [1 /* SHIFT */, 14];
    var $Va = [1 /* SHIFT */, 15];
    var $Vb = [1 /* SHIFT */, 18];
    var $Vc = [1 /* SHIFT */, 20];
    var $Vd = [1 /* SHIFT */, 21];
    var $Ve = [1 /* SHIFT */, 22];
    var $Vf = [1 /* SHIFT */, 23];
    var $Vg = [1 /* SHIFT */, 24];
    var $Vh = [1 /* SHIFT */, 25];
    var $Vi = [1 /* SHIFT */, 26];
    var $Vj = [1 /* SHIFT */, 27];
    var $Vk = [1 /* SHIFT */, 28];
    var $Vl = [1 /* SHIFT */, 29];
    var $Vm = [
        5,
        11,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        30,
        31
    ];
    var $Vn = [
        5,
        11,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        30,
        31,
        33
    ];
    var $Vo = [1 /* SHIFT */, 38];
    var $Vp = [
        5,
        11,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        30,
        31,
        35,
        38
    ];
    var $Vq = [
        5,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        30,
        31
    ];
    var $Vr = [
        5,
        12,
        15,
        16,
        17,
        18,
        30,
        31
    ];
    var $Vs = [
        5,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        30,
        31
    ];
    var $Vt = [
        15,
        30,
        31
    ];
    var $Vu = [
        5,
        11,
        12,
        13,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        30,
        31,
        32,
        36
    ];
    var parser = {
        lexer: undefined,
        Parser: undefined,
        trace: function trace() { },
        yy: {},
        symbols: {
            "error": 2,
            "expressions": 3,
            "expression": 4,
            "EOF": 5,
            "variableSequence": 6,
            "TIME_AMPM": 7,
            "TIME_24": 8,
            "number": 9,
            "STRING": 10,
            "&": 11,
            "=": 12,
            "+": 13,
            "(": 14,
            ")": 15,
            "<": 16,
            ">": 17,
            "NOT": 18,
            "-": 19,
            "*": 20,
            "/": 21,
            "^": 22,
            "FUNCTION": 23,
            "expseq": 24,
            "cell": 25,
            "FIXEDCELL": 26,
            ":": 27,
            "CELL": 28,
            "ARRAY": 29,
            ";": 30,
            ",": 31,
            "VARIABLE": 32,
            "DECIMAL": 33,
            "NUMBER": 34,
            "%": 35,
            "#": 36,
            "!": 37,
            "$accept": 0,
            "$end": 1
        },
        terminals: {
            5: "EOF",
            7: "TIME_AMPM",
            8: "TIME_24",
            10: "STRING",
            11: "&",
            12: "=",
            13: "+",
            14: "(",
            15: ")",
            16: "<",
            17: ">",
            18: "NOT",
            19: "-",
            20: "*",
            21: "/",
            22: "^",
            23: "FUNCTION",
            26: "FIXEDCELL",
            27: ":",
            28: "CELL",
            29: "ARRAY",
            30: ";",
            31: ",",
            32: "VARIABLE",
            33: "DECIMAL",
            34: "NUMBER",
            35: "%",
            36: "#",
            37: "!"
        },
        /**
         * Maps a ProductionRule to the appropriate number of previous tokens to use in a reduction action.
         */
        productions: PRODUCTIONS,
        /**
         * Perform a reduce action on the given virtual stack. Basically, fetching, deriving, or calculating a value.
         * @param rawValueOfReduceOriginToken - Some actions require the origin token to perform a reduce action. For
         * example, when reducing the cell reference A1 to it's actual value this value would be "A1".
         * @param sharedStateYY - the shared state that has all helpers, and current working object.
         * @param reduceActionToPerform - the ReduceAction to perform with the current virtual stack. Since this function
         * is only called in one place, this should always be action[1] in that context.
         * @param virtualStack - Array of values to use in action.
         * @returns {number|boolean|string}
         */
        performAction: function (rawValueOfReduceOriginToken, sharedStateYY, reduceActionToPerform, virtualStack) {
            // For context, this function is only called with `apply`, so `this` is `yyval`.
            var vsl = virtualStack.length - 1;
            switch (reduceActionToPerform) {
                case 1 /* RETURN_LAST */:
                    return virtualStack[vsl - 1];
                case 2 /* CALL_VARIABLE */:
                    this.$ = sharedStateYY.handler.helper.callVariable.call(this, virtualStack[vsl]);
                    break;
                case 3 /* TIME_CALL_TRUE */:
                    this.$ = sharedStateYY.handler.time.call(sharedStateYY.obj, virtualStack[vsl], true);
                    break;
                case 4 /* TIME_CALL */:
                    this.$ = sharedStateYY.handler.time.call(sharedStateYY.obj, virtualStack[vsl]);
                    break;
                case 5 /* AS_NUMBER */:
                    this.$ = sharedStateYY.handler.helper.number(virtualStack[vsl]);
                    break;
                case 6 /* AS_STRING */:
                    this.$ = sharedStateYY.handler.helper.string(virtualStack[vsl]);
                    break;
                case 7 /* AMPERSAND */:
                    this.$ = sharedStateYY.handler.helper.specialMatch('&', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 8 /* EQUALS */:
                    this.$ = sharedStateYY.handler.helper.logicMatch('=', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 9 /* PLUS */:
                    this.$ = sharedStateYY.handler.helper.mathMatch('+', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 10 /* LAST_NUMBER */:
                    this.$ = sharedStateYY.handler.helper.number(virtualStack[vsl - 1]);
                    break;
                case 11 /* LTE */:
                    this.$ = sharedStateYY.handler.helper.logicMatch('<=', virtualStack[vsl - 3], virtualStack[vsl]);
                    break;
                case 12 /* GTE */:
                    this.$ = sharedStateYY.handler.helper.logicMatch('>=', virtualStack[vsl - 3], virtualStack[vsl]);
                    break;
                case 13 /* NOT_EQ */:
                    this.$ = sharedStateYY.handler.helper.logicMatch('<>', virtualStack[vsl - 3], virtualStack[vsl]);
                    break;
                case 14 /* NOT */:
                    this.$ = sharedStateYY.handler.helper.logicMatch('NOT', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 15 /* GT */:
                    this.$ = sharedStateYY.handler.helper.logicMatch('>', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 16 /* LT */:
                    this.$ = sharedStateYY.handler.helper.logicMatch('<', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 17 /* MINUS */:
                    this.$ = sharedStateYY.handler.helper.mathMatch('-', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 18 /* MULTIPLY */:
                    this.$ = sharedStateYY.handler.helper.mathMatch('*', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 19 /* DIVIDE */:
                    this.$ = sharedStateYY.handler.helper.mathMatch('/', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 20 /* TO_POWER */:
                    this.$ = sharedStateYY.handler.helper.mathMatch('^', virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 21 /* INVERT_NUM */:
                    this.$ = sharedStateYY.handler.helper.numberInverted(virtualStack[vsl]);
                    if (isNaN(this.$)) {
                        this.$ = 0;
                    }
                    break;
                case 22 /* TO_NUMBER_NAN_AS_ZERO */:
                    this.$ = sharedStateYY.handler.helper.number(virtualStack[vsl]);
                    if (isNaN(this.$)) {
                        this.$ = 0;
                    }
                    break;
                case 23 /* CALL_FUNCTION_LAST_BLANK */:
                    this.$ = sharedStateYY.handler.helper.callFunction.call(this, virtualStack[vsl - 2], '');
                    break;
                case 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */:
                    this.$ = sharedStateYY.handler.helper.callFunction.call(this, virtualStack[vsl - 3], virtualStack[vsl - 1]);
                    break;
                case 28 /* FIXED_CELL_VAL */:
                    this.$ = sharedStateYY.handler.helper.fixedCellValue.call(sharedStateYY.obj, virtualStack[vsl]);
                    break;
                case 29 /* FIXED_CELL_RANGE_VAL */:
                    this.$ = sharedStateYY.handler.helper.fixedCellRangeValue.call(sharedStateYY.obj, virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 30 /* CELL_VALUE */:
                    this.$ = sharedStateYY.handler.helper.cellValue.call(sharedStateYY.obj, virtualStack[vsl]);
                    break;
                case 31 /* CELL_RANGE_VALUE */:
                    this.$ = sharedStateYY.handler.helper.cellRangeValue.call(sharedStateYY.obj, virtualStack[vsl - 2], virtualStack[vsl]);
                    break;
                case 32 /* ENSURE_IS_ARRAY */:
                    if (sharedStateYY.handler.utils.isArray(virtualStack[vsl])) {
                        this.$ = virtualStack[vsl];
                    }
                    else {
                        this.$ = [virtualStack[vsl]];
                    }
                    break;
                case 33 /* ENSURE_YYTEXT_ARRAY */:
                    var result_1 = [], arr = eval("[" + rawValueOfReduceOriginToken + "]");
                    arr.forEach(function (item) {
                        result_1.push(item);
                    });
                    this.$ = result_1;
                    break;
                case 34 /* REDUCE_INT */:
                case 35 /* REDUCE_PERCENT */:
                    virtualStack[vsl - 2].push(virtualStack[vsl]);
                    this.$ = virtualStack[vsl - 2];
                    break;
                case 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */:
                    this.$ = [virtualStack[vsl]];
                    break;
                case 37 /* ENSURE_LAST_TWO_IN_ARRAY_AND_PUSH */:
                    this.$ = (sharedStateYY.handler.utils.isArray(virtualStack[vsl - 2]) ? virtualStack[vsl - 2] : [virtualStack[vsl - 2]]);
                    this.$.push(virtualStack[vsl]);
                    break;
                case 38 /* REFLEXIVE_REDUCE */:
                    this.$ = virtualStack[vsl];
                    break;
                case 39 /* REDUCE_FLOAT */:
                    this.$ = parseFloat(virtualStack[vsl - 2] + '.' + virtualStack[vsl]);
                    break;
                case 40 /* REDUCE_PREV_AS_PERCENT */:
                    this.$ = virtualStack[vsl - 1] * 0.01;
                    break;
                case 41 /* REDUCE_LAST_THREE_A */:
                case 42 /* REDUCE_LAST_THREE_B */:
                    this.$ = virtualStack[vsl - 2] + virtualStack[vsl - 1] + virtualStack[vsl];
                    break;
            }
        },
        /**
         * The `table` is an array of objects that map {@link RULES} to LexActions and tokens.
         */
        table: [
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                3, 1,
                4, 2,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                1, [3]
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                5, [1 /* SHIFT */, 19],
                11, $Vc,
                12, $Vd,
                13, $Ve,
                16, $Vf,
                17, $Vg,
                18, $Vh,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ]),
            extendRules($Vm, [2 /* REDUCE */, 2], ObjectFromPairs_1.ObjectFromPairs.of([33, [1 /* SHIFT */, 30]])),
            extendRules($Vm, [2 /* REDUCE */, 3]),
            extendRules($Vm, [2 /* REDUCE */, 4]),
            extendRules($Vm, [2 /* REDUCE */, 5], ObjectFromPairs_1.ObjectFromPairs.of([35, [1 /* SHIFT */, 31]])),
            extendRules($Vm, [2 /* REDUCE */, 6]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 32,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 33,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 34,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                14, [1 /* SHIFT */, 35]
            ]),
            extendRules($Vm, [2 /* REDUCE */, 25]),
            extendRules($Vm, [2 /* REDUCE */, 26], ObjectFromPairs_1.ObjectFromPairs.of([2 /* REDUCE */, 36, 32, [1 /* SHIFT */, 37], 36, $Vb])),
            extendRules($Vn, [2 /* REDUCE */, 36], ObjectFromPairs_1.ObjectFromPairs.of([36, $Vo])),
            extendRules($Vp, [2 /* REDUCE */, 38], ObjectFromPairs_1.ObjectFromPairs.of([33, [1 /* SHIFT */, 39]])),
            extendRules($Vm, [2 /* REDUCE */, 28], ObjectFromPairs_1.ObjectFromPairs.of([27, [1 /* SHIFT */, 40]])),
            extendRules($Vm, [2 /* REDUCE */, 30], ObjectFromPairs_1.ObjectFromPairs.of([27, [1 /* SHIFT */, 41]])),
            ObjectFromPairs_1.ObjectFromPairs.of([32, [1 /* SHIFT */, 42]]),
            ObjectFromPairs_1.ObjectFromPairs.of([1, [3 /* ACCEPT */, 1]]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 43,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 44,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 45,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 48,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                12, [1, 46],
                13, $V3,
                14, $V4,
                17, [1, 47],
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 50,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                12, [1, 49],
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 51,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 52,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 53,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 54,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 55,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([[1 /* SHIFT */, 56]]),
            extendRules($Vp, [2 /* REDUCE */, 40]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                12, $Vd,
                13, $Ve,
                15, [1 /* SHIFT */, 57],
                16, $Vf,
                17, $Vg,
                18, $Vh,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ]),
            extendRules($Vq, [2 /* REDUCE */, 21], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vq, [2 /* REDUCE */, 22], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 60,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                15, [1 /* SHIFT */, 58],
                19, $V5,
                23, $V6,
                24, 59,
                25, 12,
                26, $V7,
                28, $V8,
                29, [1 /* SHIFT */, 61],
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            extendRules($Vm, [2 /* REDUCE */, 27]),
            ObjectFromPairs_1.ObjectFromPairs.of([36, $Vo]),
            ObjectFromPairs_1.ObjectFromPairs.of([32, [1 /* SHIFT */, 62]]),
            ObjectFromPairs_1.ObjectFromPairs.of([34, [1 /* SHIFT */, 63]]),
            ObjectFromPairs_1.ObjectFromPairs.of([26, [1 /* SHIFT */, 64]]),
            ObjectFromPairs_1.ObjectFromPairs.of([28, [1 /* SHIFT */, 65]]),
            ObjectFromPairs_1.ObjectFromPairs.of([37, [1 /* SHIFT */, 66]]),
            extendRules($Vm, [2 /* REDUCE */, 7]),
            extendRules([5, 12, 15, 30, 31], [2 /* REDUCE */, 8], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                13, $Ve,
                16, $Vf,
                17, $Vg,
                18, $Vh,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vq, [2 /* REDUCE */, 9], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 67,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 68,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            extendRules($Vr, [2 /* REDUCE */, 16], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                13, $Ve,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 69,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb
            ]),
            extendRules($Vr, [2 /* REDUCE */, 15], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                13, $Ve,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules([5, 12, 15, 18, 30, 31], [2 /* REDUCE */, 14], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                13, $Ve,
                16, $Vf,
                17, $Vg,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vq, [2 /* REDUCE */, 17], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vs, [2 /* REDUCE */, 18], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                22, $Vl
            ])),
            extendRules($Vs, [2 /* REDUCE */, 19], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                22, $Vl
            ])),
            extendRules([5, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 30, 31], [2 /* REDUCE */, 20], ObjectFromPairs_1.ObjectFromPairs.of([11, $Vc])),
            extendRules($Vn, [2 /* REDUCE */, 37]),
            extendRules($Vm, [2 /* REDUCE */, 10]),
            extendRules($Vm, [2 /* REDUCE */, 23]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                15, [1 /* SHIFT */, 70],
                30, [1 /* SHIFT */, 71],
                31, [1 /* SHIFT */, 72]
            ]),
            extendRules($Vt, [2 /* REDUCE */, 32], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                12, $Vd,
                13, $Ve,
                16, $Vf,
                17, $Vg,
                18, $Vh,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vt, [2 /* REDUCE */, 33]), ObjectFromPairs_1.ObjectFromPairs.of([
                37, [1 /* SHIFT */, 73]
            ]),
            extendRules($Vp, [2 /* REDUCE */, 39]),
            extendRules($Vm, [2 /* REDUCE */, 29]),
            extendRules($Vm, [2 /* REDUCE */, 31]),
            extendRules($Vu, [2 /* REDUCE */, 41]),
            extendRules($Vr, [2 /* REDUCE */, 11], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                13, $Ve,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vr, [2 /* REDUCE */, 13], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                13, $Ve,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vr, [2 /* REDUCE */, 12], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                13, $Ve,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vm, [2 /* REDUCE */, 24]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 74,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb,
                12, $Vd,
            ]),
            ObjectFromPairs_1.ObjectFromPairs.of([
                2, 13,
                4, 75,
                6, 3,
                7, $V0,
                8, $V1,
                9, 6,
                10, $V2,
                13, $V3,
                14, $V4,
                19, $V5,
                23, $V6,
                25, 12,
                26, $V7,
                28, $V8,
                32, $V9,
                34, $Va,
                36, $Vb,
                12, $Vd,
            ]),
            extendRules($Vu, [2 /* REDUCE */, 42]),
            extendRules($Vt, [2 /* REDUCE */, 34], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                12, $Vd,
                13, $Ve,
                16, $Vf,
                17, $Vg,
                18, $Vh,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ])),
            extendRules($Vt, [2 /* REDUCE */, 35], ObjectFromPairs_1.ObjectFromPairs.of([
                11, $Vc,
                12, $Vd,
                13, $Ve,
                16, $Vf,
                17, $Vg,
                18, $Vh,
                19, $Vi,
                20, $Vj,
                21, $Vk,
                22, $Vl
            ]))
        ],
        defaultActions: ObjectFromPairs_1.ObjectFromPairs.of([19, [2 /* REDUCE */, 1]]),
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                throw new Error(str);
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], semanticValueStack = [null], locationStack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = locationStack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = {
                yy: {
                    parseError: undefined,
                    lexer: {
                        parseError: undefined
                    },
                    parser: {
                        parseError: undefined
                    }
                }
            };
            // copy state
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            locationStack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                semanticValueStack.length = semanticValueStack.length - n;
                locationStack.length = locationStack.length - n;
            }
            function lex() {
                var token = lexer.lex() || EOF;
                // if token isn't its numeric value, convert
                if (typeof token !== 'number') {
                    token = self.symbols[token] || token;
                }
                return token;
            }
            var symbol, preErrorSymbol, state, action, result, yyval = {
                $: undefined,
                _$: undefined
            }, p, newState, expected;
            while (true) {
                // retrieve state number from top of stack
                state = stack[stack.length - 1];
                // use default actions if available
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (typeof symbol == 'undefined' || symbol === null) {
                        symbol = lex();
                    }
                    // read action for current state and first input
                    action = table[state] && table[state][symbol];
                }
                // handle parse error
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var error_rule_depth = void 0;
                    var errStr = '';
                    // Return the rule stack depth where the nearest error rule can be found.
                    // Return FALSE when no error recovery rule was found.
                    this.locateNearestErrorRecoveryRule = function (state) {
                        var stack_probe = stack.length - 1;
                        var depth = 0;
                        // try to recover from error
                        for (;;) {
                            // check for error recovery rule in this state
                            if ((TERROR.toString()) in table[state]) {
                                return depth;
                            }
                            if (state === 0 || stack_probe < 2) {
                                return false; // No suitable error recovery rule available.
                            }
                            stack_probe -= 2; // popStack(1): [symbol, action]
                            state = stack[stack_probe];
                            ++depth;
                        }
                    };
                    if (!recovering) {
                        // first see if there's any chance at hitting an error recovery rule:
                        error_rule_depth = this.locateNearestErrorRecoveryRule(state);
                        // Report error
                        expected = [];
                        var expectedIndexes = [];
                        var tableState = table[state];
                        for (p in table[state]) {
                            if (this.terminals[p] && p > TERROR) {
                                expected.push(this.terminals[p]);
                                expectedIndexes.push(p);
                            }
                        }
                        if (lexer.showPosition) {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ":\n" + lexer.showPosition() + "\nExpecting " + expected.join(', ') + ", got '" + (this.terminals[symbol] || symbol) + "'";
                        }
                        else {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " +
                                (symbol == EOF ? "end of input" :
                                    ("'" + (this.terminals[symbol] || symbol) + "'"));
                        }
                        this.parseError(errStr, {
                            text: lexer.match,
                            token: this.terminals[symbol] || symbol,
                            line: lexer.yylineno,
                            loc: yyloc,
                            expected: expected,
                            expectedIndexes: expectedIndexes,
                            state: state,
                            tableState: tableState,
                            recoverable: (error_rule_depth !== false)
                        });
                    }
                    else if (preErrorSymbol !== EOF) {
                        error_rule_depth = this.locateNearestErrorRecoveryRule(state);
                    }
                    // just recovered from another error
                    if (recovering == 3) {
                        if (symbol === EOF || preErrorSymbol === EOF) {
                            throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                        }
                        // discard current lookahead and grab another
                        yyleng = lexer.yyleng;
                        yytext = lexer.yytext;
                        yylineno = lexer.yylineno;
                        yyloc = lexer.yylloc;
                        symbol = lex();
                    }
                    // try to recover from error
                    if (error_rule_depth === false) {
                        throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
                    }
                    popStack(error_rule_depth);
                    preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
                    symbol = TERROR; // insert generic error symbol as new lookahead
                    state = stack[stack.length - 1];
                    action = table[state] && table[state][TERROR];
                    recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
                }
                // this shouldn't happen, unless resolve defaults are off
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                // LexActions are always:
                //   Shift: continue to process tokens.
                //   Reduce: enough tokens have been gathered to reduce input through evaluation.
                //   Accept: return.
                switch (action[0]) {
                    case 1 /* SHIFT */:
                        stack.push(symbol);
                        semanticValueStack.push(lexer.yytext);
                        locationStack.push(lexer.yylloc);
                        stack.push(action[1]); // push state
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            // error just occurred, resume old lookahead f/ before error
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2 /* REDUCE */:
                        var currentProduction = this.productions[action[1]];
                        var lengthToReduceStackBy = currentProduction.getLengthToReduceStackBy();
                        // perform semantic action
                        yyval.$ = semanticValueStack[semanticValueStack.length - lengthToReduceStackBy]; // default to $$ = $1
                        // default location, uses first token for firsts, last for lasts
                        yyval._$ = {
                            first_line: locationStack[locationStack.length - (lengthToReduceStackBy || 1)].first_line,
                            last_line: locationStack[locationStack.length - 1].last_line,
                            first_column: locationStack[locationStack.length - (lengthToReduceStackBy || 1)].first_column,
                            last_column: locationStack[locationStack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [locationStack[locationStack.length - (lengthToReduceStackBy || 1)].range[0], locationStack[locationStack.length - 1].range[1]];
                        }
                        result = this.performAction.apply(yyval, [yytext, sharedState.yy, action[1], semanticValueStack].concat(args));
                        if (typeof result !== 'undefined') {
                            return result;
                        }
                        // pop off stack
                        if (lengthToReduceStackBy) {
                            stack = stack.slice(0, -1 * lengthToReduceStackBy * 2);
                            semanticValueStack = semanticValueStack.slice(0, -1 * lengthToReduceStackBy);
                            locationStack = locationStack.slice(0, -1 * lengthToReduceStackBy);
                        }
                        // push non-terminal (reduce)
                        stack.push(currentProduction.getReplacementTokenIndex());
                        semanticValueStack.push(yyval.$);
                        locationStack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3 /* ACCEPT */:
                        // Accept
                        return true;
                }
            }
        }
    };
    parser.lexer = (function () {
        return ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.mapActionToActionIndex(indexed_rule);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                // rule action called reject() implying a rule mis-match.
                                // implied `continue`
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            options: {},
            mapActionToActionIndex: function (ruleIndex) {
                switch (ruleIndex) {
                    case 0:
                        // skip whitespace
                        break;
                    case 1:
                        return 10 /* LAST_NUMBER */;
                    case 2:
                        return 10 /* LAST_NUMBER */;
                    case 3:
                        return 23 /* CALL_FUNCTION_LAST_BLANK */;
                    case 4:
                        return 7 /* AMPERSAND */;
                    case 5:
                        return 8 /* EQUALS */;
                    case 6:
                        return 26 /* I26 */;
                    case 7:
                        return 28 /* FIXED_CELL_VAL */;
                    case 8:
                        return 23 /* CALL_FUNCTION_LAST_BLANK */;
                    case 9:
                        return 32 /* ENSURE_IS_ARRAY */;
                    case 10:
                        return 32 /* ENSURE_IS_ARRAY */;
                    case 11:
                        return 34 /* REDUCE_INT */;
                    case 12:
                        return 29 /* FIXED_CELL_RANGE_VAL */;
                    case 13:
                        // skip whitespace??
                        break;
                    case 14:
                        return 11 /* LTE */;
                    case 15:
                        return ' ';
                    case 16:
                        return 33 /* ENSURE_YYTEXT_ARRAY */;
                    case 17:
                        return 27 /* I27 */;
                    case 18:
                        return 30 /* CELL_VALUE */;
                    case 19:
                        return 31 /* CELL_RANGE_VALUE */;
                    case 20:
                        return 20 /* TO_POWER */;
                    case 21:
                        return 21 /* INVERT_NUM */;
                    case 22:
                        return 19 /* DIVIDE */;
                    case 23:
                        return 13 /* NOT_EQ */;
                    case 24:
                        return 22 /* TO_NUMBER_NAN_AS_ZERO */;
                    case 25:
                        return 14 /* NOT */;
                    case 26:
                        return 15 /* GT */;
                    case 27:
                        return 17 /* MINUS */;
                    case 28:
                        return 16 /* LT */;
                    case 29:
                        return 18 /* MULTIPLY */;
                    case 30:
                        return '"';
                    case 31:
                        return "'";
                    case 32:
                        return "!";
                    case 33:
                        return 12 /* GTE */;
                    case 34:
                        return 35 /* REDUCE_PERCENT */;
                    case 35:
                        return 36 /* WRAP_CURRENT_INDEX_TOKEN_AS_ARRAY */;
                    case 36:
                        return 5 /* AS_NUMBER */;
                }
            },
            rules: RULES,
            conditions: {
                "INITIAL": {
                    "rules": [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7,
                        8,
                        9,
                        10,
                        11,
                        12,
                        13,
                        14,
                        15,
                        16,
                        17,
                        18,
                        19,
                        20,
                        21,
                        22,
                        23,
                        24,
                        25,
                        26,
                        27,
                        28,
                        29,
                        30,
                        31,
                        32,
                        33,
                        34,
                        35,
                        36,
                        37
                    ],
                    "inclusive": true
                }
            }
        });
    })();
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
exports.Parser = Parser;
