"use strict";
exports.__esModule = true;
var Errors_1 = require("../Errors");
var Formulas_1 = require("../Formulas");
var ParserConstants_1 = require("./ParserConstants");
var MoreUtils_1 = require("../Utilities/MoreUtils");
var TypeConverter_1 = require("../Utilities/TypeConverter");
var Math_1 = require("../Formulas/Math");
var Parser = (function () {
    var parser = {
        lexer: undefined,
        Parser: undefined,
        trace: function trace() { },
        yy: {},
        /**
         * Perform a reduce action on the given virtual stack. Basically, fetching, deriving, or calculating a value.
         * @param rawValueOfReduceOriginToken - Some actions require the origin token to perform a reduce action. For
         * example, when reducing the cell reference A1 to it's actual value this value would be "A1".
         * @param sharedStateYY - the shared state that has all helpers, and current working object.
         * @param reduceActionToPerform - the ReduceAction to perform with the current virtual stack. Since this function
         * is only called in one place, this should always be action[1] in that context.
         * @param virtualStack - Array of values to use in action.
         * @param catchOnFailure - If we are performing an action that could result in a failure, and we cant to catch and
         * assign the error thrown, this should be set to true.
         * @returns {number|boolean|string}
         */
        performAction: function (rawValueOfReduceOriginToken, sharedStateYY, reduceActionToPerform, virtualStack, catchOnFailure) {
            // For context, this function is only called with `apply`, so `this` is `yyval`.
            var vsl = virtualStack.length - 1;
            try {
                switch (reduceActionToPerform) {
                    case 1 /* RETURN_LAST */:
                        return virtualStack[vsl - 1];
                    case 2 /* CALL_VARIABLE */:
                        this.$ = sharedStateYY.handler.callVariable.call(this, virtualStack[vsl]);
                        break;
                    case 5 /* AS_NUMBER */:
                        this.$ = TypeConverter_1.TypeConverter.valueToNumber(virtualStack[vsl]);
                        break;
                    case 6 /* AS_STRING */:
                        this.$ = MoreUtils_1.string(virtualStack[vsl]);
                        break;
                    case 7 /* AMPERSAND */:
                        this.$ = TypeConverter_1.TypeConverter.valueToString(virtualStack[vsl - 2]) + TypeConverter_1.TypeConverter.valueToString(virtualStack[vsl]);
                        break;
                    case 8 /* EQUALS */:
                        this.$ = Math_1.EQ(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 9 /* PLUS */:
                        this.$ = Math_1.SUM(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 10 /* LAST_NUMBER */:
                        this.$ = TypeConverter_1.TypeConverter.valueToNumber(virtualStack[vsl - 1]);
                        break;
                    case 11 /* LTE */:
                        this.$ = Math_1.LTE(virtualStack[vsl - 3], virtualStack[vsl]);
                        break;
                    case 12 /* GTE */:
                        this.$ = Math_1.GTE(virtualStack[vsl - 3], virtualStack[vsl]);
                        break;
                    case 13 /* NOT_EQ */:
                        this.$ = !Math_1.EQ(virtualStack[vsl - 3], virtualStack[vsl]);
                        break;
                    case 15 /* GT */:
                        this.$ = Math_1.GT(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 16 /* LT */:
                        this.$ = Math_1.LT(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 17 /* MINUS */:
                        this.$ = Math_1.MINUS(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 18 /* MULTIPLY */:
                        this.$ = Math_1.MULTIPLY(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 19 /* DIVIDE */:
                        this.$ = Math_1.DIVIDE(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 20 /* TO_POWER */:
                        this.$ = Math_1.POWER(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 21 /* INVERT_NUM */:
                        this.$ = TypeConverter_1.TypeConverter.valueToInvertedNumber(virtualStack[vsl]);
                        if (isNaN(this.$)) {
                            this.$ = 0;
                        }
                        break;
                    case 22 /* TO_NUMBER_NAN_AS_ZERO */:
                        this.$ = TypeConverter_1.TypeConverter.valueToNumber(virtualStack[vsl]);
                        if (isNaN(this.$)) {
                            this.$ = 0;
                        }
                        break;
                    case 23 /* CALL_FUNCTION_LAST_BLANK */:
                        this.$ = sharedStateYY.handler.callFunction.call(this, virtualStack[vsl - 2], '');
                        break;
                    case 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */:
                        this.$ = sharedStateYY.handler.callFunction.call(this, virtualStack[vsl - 3], virtualStack[vsl - 1]);
                        break;
                    case 28 /* FIXED_CELL_VAL */:
                        this.$ = sharedStateYY.handler.fixedCellValue(sharedStateYY.originCellId, virtualStack[vsl]);
                        break;
                    case 29 /* FIXED_CELL_RANGE_VAL */:
                        this.$ = sharedStateYY.handler.fixedCellRangeValue(sharedStateYY.originCellId, virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 30 /* CELL_VALUE */:
                        this.$ = sharedStateYY.handler.cellValue(sharedStateYY.originCellId, virtualStack[vsl]);
                        break;
                    case 31 /* CELL_RANGE_VALUE */:
                        this.$ = sharedStateYY.handler.cellRangeValue(sharedStateYY.originCellId, virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 32 /* ENSURE_IS_ARRAY */:
                        if (MoreUtils_1.isArray(virtualStack[vsl])) {
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
                        this.$ = (MoreUtils_1.isArray(virtualStack[vsl - 2]) ? virtualStack[vsl - 2] : [virtualStack[vsl - 2]]);
                        this.$.push(virtualStack[vsl]);
                        break;
                    case 38 /* REFLEXIVE_REDUCE */:
                        this.$ = virtualStack[vsl];
                        break;
                    case 39 /* REDUCE_FLOAT */:
                        this.$ = TypeConverter_1.TypeConverter.valueToNumber(virtualStack[vsl - 2] + '.' + virtualStack[vsl]);
                        break;
                    case 40 /* REDUCE_PREV_AS_PERCENT */:
                        this.$ = virtualStack[vsl - 1] * 0.01;
                        break;
                    case 41 /* REDUCE_LAST_THREE_A */:
                    case 42 /* REDUCE_LAST_THREE_B */:
                        this.$ = virtualStack[vsl - 2] + virtualStack[vsl - 1] + virtualStack[vsl];
                        break;
                    case 43 /* AS_ERROR */:
                        this.$ = Errors_1.constructErrorByName(virtualStack[vsl]);
                        break;
                }
            }
            catch (e) {
                if (catchOnFailure) {
                    // NOTE: I'm not sure if some of these ReduceAction map correctly in the case of an error.
                    switch (reduceActionToPerform) {
                        case 1 /* RETURN_LAST */:
                            return virtualStack[vsl - 1];
                        case 2 /* CALL_VARIABLE */:
                        case 5 /* AS_NUMBER */:
                        case 6 /* AS_STRING */:
                        case 7 /* AMPERSAND */:
                        case 8 /* EQUALS */:
                        case 9 /* PLUS */:
                        case 10 /* LAST_NUMBER */:
                        case 11 /* LTE */:
                        case 12 /* GTE */:
                        case 13 /* NOT_EQ */:
                        case 15 /* GT */:
                        case 16 /* LT */:
                        case 17 /* MINUS */:
                        case 18 /* MULTIPLY */:
                        case 19 /* DIVIDE */:
                        case 20 /* TO_POWER */:
                        case 23 /* CALL_FUNCTION_LAST_BLANK */:
                        case 24 /* CALL_FUNCTION_LAST_TWO_IN_STACK */:
                        case 28 /* FIXED_CELL_VAL */:
                        case 29 /* FIXED_CELL_RANGE_VAL */:
                        case 30 /* CELL_VALUE */:
                        case 31 /* CELL_RANGE_VALUE */:
                            this.$ = e;
                            break;
                        case 21 /* INVERT_NUM */:
                            this.$ = e;
                            if (isNaN(this.$)) {
                                this.$ = 0;
                            }
                            break;
                        case 22 /* TO_NUMBER_NAN_AS_ZERO */:
                            this.$ = e;
                            if (isNaN(this.$)) {
                                this.$ = 0;
                            }
                            break;
                        case 32 /* ENSURE_IS_ARRAY */:
                            if (MoreUtils_1.isArray(virtualStack[vsl])) {
                                this.$ = virtualStack[vsl];
                            }
                            else {
                                this.$ = [virtualStack[vsl]];
                            }
                            break;
                        case 33 /* ENSURE_YYTEXT_ARRAY */:
                            var result_2 = [], arr = eval("[" + rawValueOfReduceOriginToken + "]");
                            arr.forEach(function (item) {
                                result_2.push(item);
                            });
                            this.$ = result_2;
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
                            this.$ = (MoreUtils_1.isArray(virtualStack[vsl - 2]) ? virtualStack[vsl - 2] : [virtualStack[vsl - 2]]);
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
                }
                else {
                    throw e;
                }
            }
        },
        defaultActions: { 19: [ParserConstants_1.REDUCE, 1 /* RETURN_LAST */] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                throw new Errors_1.ParseError(str);
            }
        },
        parse: function parse(input) {
            var stack = [0], semanticValueStack = [null], locationStack = [], yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
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
                    token = ParserConstants_1.SYMBOL_NAME_TO_INDEX[token] || token;
                }
                return token;
            }
            var symbol, preErrorSymbol, state, action, result, yyval = {
                $: undefined,
                _$: undefined
            }, p, newState, expected, catchFailuresOn = false;
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
                    action = ParserConstants_1.ACTION_TABLE[state] && ParserConstants_1.ACTION_TABLE[state][symbol];
                }
                // console.log({
                //   text: lexer.match,
                //   token: SYMBOL_INDEX_TO_NAME[symbol] || symbol,
                //   tokenIndex: symbol,
                //   line: lexer.yylineno,
                //   loc: yyloc,
                //   state: state,
                //   stack: stack,
                //   semanticValueStack: semanticValueStack
                // });
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
                            if (MoreUtils_1.isUndefined(state)) {
                                return false;
                            }
                            // check for error recovery rule in this state
                            if ((TERROR.toString()) in ParserConstants_1.ACTION_TABLE[state]) {
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
                        var tableState = ParserConstants_1.ACTION_TABLE[state];
                        for (p in ParserConstants_1.ACTION_TABLE[state]) {
                            if (ParserConstants_1.SYMBOL_INDEX_TO_NAME[p] && p > TERROR) {
                                expected.push(ParserConstants_1.SYMBOL_INDEX_TO_NAME[p]);
                                expectedIndexes.push(p);
                            }
                        }
                        if (lexer.showPosition) {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ":  " + lexer.showPosition() + "  Expecting " + expected.join(', ') + ", got '" + (ParserConstants_1.SYMBOL_INDEX_TO_NAME[symbol] || symbol) + "'";
                        }
                        else {
                            errStr = 'Parse error on line ' + (yylineno + 1) + ": Unexpected " +
                                (symbol == EOF ? "end of input" :
                                    ("'" + (ParserConstants_1.SYMBOL_INDEX_TO_NAME[symbol] || symbol) + "'"));
                        }
                        this.parseError(errStr, {
                            text: lexer.match,
                            token: ParserConstants_1.SYMBOL_INDEX_TO_NAME[symbol] || symbol,
                            tokenIndex: symbol,
                            line: lexer.yylineno,
                            loc: yyloc,
                            expected: expected,
                            expectedIndexes: expectedIndexes,
                            state: state,
                            tableState: tableState,
                            stack: stack,
                            semanticValueStack: semanticValueStack,
                            recoverable: (error_rule_depth !== false)
                        });
                    }
                    else if (preErrorSymbol !== EOF) {
                        error_rule_depth = this.locateNearestErrorRecoveryRule(state);
                    }
                    // just recovered from another error
                    if (recovering == 3) {
                        if (symbol === EOF || preErrorSymbol === EOF) {
                            throw new Errors_1.ParseError(errStr || 'Parsing halted while starting to recover from another error.');
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
                        throw new Errors_1.ParseError(errStr || 'Parsing halted. No suitable error recovery rule available.');
                    }
                    popStack(error_rule_depth);
                    preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
                    symbol = TERROR; // insert generic error symbol as new lookahead
                    state = stack[stack.length - 1];
                    action = ParserConstants_1.ACTION_TABLE[state] && ParserConstants_1.ACTION_TABLE[state][TERROR];
                    recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
                }
                // this shouldn't happen, unless resolve defaults are off
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Errors_1.ParseError('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                // Available actions:
                //   Shift: continue to process tokens.
                //   Reduce: enough tokens have been gathered to reduce input through evaluation.
                //   Accept: return.
                switch (action[0]) {
                    case ParserConstants_1.SHIFT:// Shift
                        stack.push(symbol);
                        semanticValueStack.push(lexer.yytext);
                        locationStack.push(lexer.yylloc);
                        stack.push(action[1]); // push state
                        // console.log("SHIFT", "literal", lexer.yytext, "   symbol", symbol, "   symbol name", SYMBOL_INDEX_TO_NAME[symbol], "   action", action,
                        //     "   stack", stack, "   semanticValueStack", semanticValueStack);
                        symbol = null;
                        if (Formulas_1.Formulas.isTryCatchFormula(lexer.yytext)) {
                            catchFailuresOn = true;
                        }
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
                    case ParserConstants_1.REDUCE:// Reduce
                        // console.log("REDUCE", "literal", lexer.yytext, "   symbol", symbol, "   symbol name", SYMBOL_INDEX_TO_NAME[symbol], "   action", action,
                        //     "   stack", stack, "   semanticValueStack", semanticValueStack);
                        var currentProduction = ParserConstants_1.PRODUCTIONS[action[1]];
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
                        // If we are inside of a formula that should catch errors, then catch and return them.
                        result = this.performAction.apply(yyval, [yytext, sharedState.yy, action[1], semanticValueStack, catchFailuresOn].concat(args));
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
                        stack.push(currentProduction.getReplacementSymbol());
                        semanticValueStack.push(yyval.$);
                        locationStack.push(yyval._$);
                        newState = ParserConstants_1.ACTION_TABLE[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case ParserConstants_1.ACCEPT:
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
                    throw new Errors_1.ParseError(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this.yy.parseError = function (str, hash) {
                    throw new Errors_1.ParseError(JSON.stringify({
                        name: 'Parser error',
                        message: str,
                        prop: hash
                    }));
                };
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
            testMatch: function (match, indexed_rule) {
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
                token = this.mapRuleIndexToSymbolEnumeration(indexed_rule);
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
                    tempMatch = this._input.match(ParserConstants_1.RULES[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.testMatch(tempMatch, rules[i]);
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
                    token = this.testMatch(match, rules[index]);
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
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions.INITIAL.rules;
                }
            },
            options: {},
            mapRuleIndexToSymbolEnumeration: function (ruleIndex) {
                switch (ruleIndex) {
                    case 0 /* WHITE_SPACE */:
                        // skip whitespace
                        break;
                    case 1 /* DOUBLE_QUOTES */:
                        return ParserConstants_1.Symbol.STRING;
                    case 2 /* SINGLE_QUOTES */:
                        return ParserConstants_1.Symbol.STRING;
                    case 3 /* FORMULA_NAME */:
                        return ParserConstants_1.Symbol.FUNCTION;
                    case 6 /* $_A1_CELL */:
                        return ParserConstants_1.Symbol.FIXEDCELL;
                    case 7 /* A1_CELL */:
                        return ParserConstants_1.Symbol.CELL_UPPER;
                    case 8 /* FORMULA_NAME_SIMPLE */:
                        return ParserConstants_1.Symbol.FUNCTION;
                    case 9 /* VARIABLE */:
                        return ParserConstants_1.Symbol.VARIABLE;
                    case 10 /* SIMPLE_VARIABLE */:
                        return ParserConstants_1.Symbol.VARIABLE;
                    case 11 /* INTEGER */:
                        return ParserConstants_1.Symbol.NUMBER_UPPER;
                    case 12 /* OPEN_AND_CLOSE_OF_ARRAY */:
                        return ParserConstants_1.Symbol.ARRAY;
                    case 13 /* DOLLAR_SIGN */:
                        // skip whitespace??
                        break;
                    case 14 /* AMPERSAND_SIGN */:
                        return ParserConstants_1.Symbol.AMPERSAND;
                    case 15 /* SINGLE_WHITESPACE */:
                        return ' ';
                    case 16 /* PERIOD */:
                        return ParserConstants_1.Symbol.DECIMAL;
                    case 17 /* COLON */:
                        return ParserConstants_1.Symbol.COLON;
                    case 18 /* SEMI_COLON */:
                        return ParserConstants_1.Symbol.SEMI_COLON;
                    case 19 /* COMMA */:
                        return ParserConstants_1.Symbol.COMMA;
                    case 20 /* ASTERISK */:
                        return ParserConstants_1.Symbol.ASTERISK;
                    case 21 /* FORWARD_SLASH */:
                        return ParserConstants_1.Symbol.DIVIDE;
                    case 22 /* MINUS_SIGN */:
                        return ParserConstants_1.Symbol.MINUS;
                    case 23 /* PLUS_SIGN */:
                        return ParserConstants_1.Symbol.PLUS;
                    case 24 /* CARET_SIGN */:
                        return ParserConstants_1.Symbol.CARROT;
                    case 25 /* OPEN_PAREN */:
                        return ParserConstants_1.Symbol.LEFT_PAREN;
                    case 26 /* CLOSE_PAREN */:
                        return ParserConstants_1.Symbol.RIGHT_PAREN;
                    case 27 /* GREATER_THAN_SIGN */:
                        return ParserConstants_1.Symbol.GREATER_THAN;
                    case 28 /* LESS_THAN_SIGN */:
                        return ParserConstants_1.Symbol.LESS_THAN;
                    case 30 /* OPEN_DOUBLE_QUOTE */:
                        return '"';
                    case 31 /* OPEN_SINGLE_QUITE */:
                        return "'";
                    case 32 /* EXCLAMATION_POINT_RULE */:
                        return "!";
                    case 33 /* EQUALS_SIGN */:
                        return ParserConstants_1.Symbol.EQUALS;
                    case 34 /* PERCENT_SIGN */:
                        return ParserConstants_1.Symbol.PERCENT;
                    case 35 /* FULL_ERROR */:
                        return ParserConstants_1.Symbol.FULL_ERROR;
                    case 36 /* END_OF_STRING */:
                        return ParserConstants_1.Symbol.EOF;
                }
            },
            conditions: {
                INITIAL: {
                    rules: [
                        0 /* WHITE_SPACE */,
                        1 /* DOUBLE_QUOTES */,
                        2 /* SINGLE_QUOTES */,
                        3 /* FORMULA_NAME */,
                        6 /* $_A1_CELL */,
                        7 /* A1_CELL */,
                        8 /* FORMULA_NAME_SIMPLE */,
                        9 /* VARIABLE */,
                        10 /* SIMPLE_VARIABLE */,
                        11 /* INTEGER */,
                        12 /* OPEN_AND_CLOSE_OF_ARRAY */,
                        13 /* DOLLAR_SIGN */,
                        14 /* AMPERSAND_SIGN */,
                        15 /* SINGLE_WHITESPACE */,
                        16 /* PERIOD */,
                        17 /* COLON */,
                        18 /* SEMI_COLON */,
                        19 /* COMMA */,
                        20 /* ASTERISK */,
                        21 /* FORWARD_SLASH */,
                        22 /* MINUS_SIGN */,
                        23 /* PLUS_SIGN */,
                        24 /* CARET_SIGN */,
                        25 /* OPEN_PAREN */,
                        26 /* CLOSE_PAREN */,
                        27 /* GREATER_THAN_SIGN */,
                        28 /* LESS_THAN_SIGN */,
                        30 /* OPEN_DOUBLE_QUOTE */,
                        31 /* OPEN_SINGLE_QUITE */,
                        32 /* EXCLAMATION_POINT_RULE */,
                        33 /* EQUALS_SIGN */,
                        34 /* PERCENT_SIGN */,
                        35 /* FULL_ERROR */,
                        36 /* END_OF_STRING */,
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
/**
 * Creates a new FormulaParser, which parses formulas, and does minimal error handling.
 *
 * @param handler should be a Sheet, since the parser needs access to fixedCellValue, cellValue, cellRangeValue, and
 * fixedCellRangeValue
 * @returns formula parser instance for use with parser.js
 * @constructor
 */
var FormulaParser = function (handler) {
    var formulaLexer = function () { };
    formulaLexer.prototype = Parser.lexer;
    var formulaParser = function () {
        this.lexer = new formulaLexer();
        this.yy = {};
    };
    formulaParser.prototype = Parser;
    var newParser = new formulaParser;
    newParser.yy.handler = handler;
    return newParser;
};
exports.FormulaParser = FormulaParser;
