"use strict";
exports.__esModule = true;
var Errors_1 = require("../Errors");
var Formulas_1 = require("../Formulas");
var Symbols_1 = require("./Symbols");
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
                    case 1 /* ReturnLast */:
                        return virtualStack[vsl - 1];
                    case 2 /* CallVariable */:
                        this.$ = sharedStateYY.handler.callVariable.call(this, virtualStack[vsl]);
                        break;
                    case 5 /* AsNumber */:
                        this.$ = TypeConverter_1.TypeConverter.valueToNumber(virtualStack[vsl]);
                        break;
                    case 6 /* AsString */:
                        this.$ = MoreUtils_1.string(virtualStack[vsl]);
                        break;
                    case 7 /* Ampersand */:
                        this.$ = TypeConverter_1.TypeConverter.valueToString(virtualStack[vsl - 2]) + TypeConverter_1.TypeConverter.valueToString(virtualStack[vsl]);
                        break;
                    case 8 /* Equals */:
                        this.$ = Math_1.EQ(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 9 /* Plus */:
                        this.$ = Math_1.SUM(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 10 /* LastExpression */:
                        this.$ = virtualStack[vsl - 1];
                        break;
                    case 11 /* LTE */:
                        this.$ = Math_1.LTE(virtualStack[vsl - 3], virtualStack[vsl]);
                        break;
                    case 12 /* GTE */:
                        this.$ = Math_1.GTE(virtualStack[vsl - 3], virtualStack[vsl]);
                        break;
                    case 13 /* NotEqual */:
                        this.$ = !Math_1.EQ(virtualStack[vsl - 3], virtualStack[vsl]);
                        break;
                    case 15 /* GT */:
                        this.$ = Math_1.GT(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 16 /* LT */:
                        this.$ = Math_1.LT(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 17 /* Minus */:
                        this.$ = Math_1.MINUS(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 18 /* Multiply */:
                        this.$ = Math_1.MULTIPLY(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 19 /* Divide */:
                        this.$ = Math_1.DIVIDE(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 20 /* ToPower */:
                        this.$ = Math_1.POWER(virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 21 /* InvertNumber */:
                        this.$ = TypeConverter_1.TypeConverter.valueToInvertedNumber(virtualStack[vsl]);
                        if (isNaN(this.$)) {
                            this.$ = 0;
                        }
                        break;
                    case 22 /* ToNumberNANAsZero */:
                        this.$ = TypeConverter_1.TypeConverter.valueToNumber(virtualStack[vsl]);
                        if (isNaN(this.$)) {
                            this.$ = 0;
                        }
                        break;
                    case 23 /* CallFunctionLastBlank */:
                        this.$ = sharedStateYY.handler.callFunction.call(this, virtualStack[vsl - 2], '');
                        break;
                    case 24 /* CallFunctionLastTwoInStack */:
                        this.$ = sharedStateYY.handler.callFunction.call(this, virtualStack[vsl - 3], virtualStack[vsl - 1]);
                        break;
                    case 28 /* FixedCellValue */:
                        this.$ = sharedStateYY.handler.fixedCellValue(sharedStateYY.originCellId, virtualStack[vsl]);
                        break;
                    case 29 /* FixedCellRangeValue */:
                        this.$ = sharedStateYY.handler.fixedCellRangeValue(sharedStateYY.originCellId, virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 30 /* CellValue */:
                        this.$ = sharedStateYY.handler.cellValue(sharedStateYY.originCellId, virtualStack[vsl]);
                        break;
                    case 31 /* CellRangeValue */:
                        this.$ = sharedStateYY.handler.cellRangeValue(sharedStateYY.originCellId, virtualStack[vsl - 2], virtualStack[vsl]);
                        break;
                    case 32 /* EnsureIsArray */:
                        if (MoreUtils_1.isArray(virtualStack[vsl])) {
                            this.$ = virtualStack[vsl];
                        }
                        else {
                            this.$ = [virtualStack[vsl]];
                        }
                        break;
                    case 33 /* EnsureYYTextIsArray */:
                        var result_1 = [], arr = eval("[" + rawValueOfReduceOriginToken + "]");
                        arr.forEach(function (item) {
                            result_1.push(item);
                        });
                        this.$ = result_1;
                        break;
                    case 34 /* ReduceInt */:
                    case 35 /* ReducePercent */:
                        virtualStack[vsl - 2].push(virtualStack[vsl]);
                        this.$ = virtualStack[vsl - 2];
                        break;
                    case 36 /* WrapCurrentTokenAsArray */:
                        this.$ = [virtualStack[vsl]];
                        break;
                    case 37 /* EnsureLastTwoINArrayAndPush */:
                        this.$ = (MoreUtils_1.isArray(virtualStack[vsl - 2]) ? virtualStack[vsl - 2] : [virtualStack[vsl - 2]]);
                        this.$.push(virtualStack[vsl]);
                        break;
                    case 38 /* ReflexiveReduce */:
                        this.$ = virtualStack[vsl];
                        break;
                    case 39 /* ReduceFloat */:
                        this.$ = TypeConverter_1.TypeConverter.valueToNumber(virtualStack[vsl - 2] + '.' + virtualStack[vsl]);
                        break;
                    case 40 /* ReducePrevAsPercent */:
                        this.$ = virtualStack[vsl - 1] * 0.01;
                        break;
                    case 41 /* ReduceLastThreeA */:
                    case 42 /* ReduceLastThreeB */:
                        this.$ = virtualStack[vsl - 2] + virtualStack[vsl - 1] + virtualStack[vsl];
                        break;
                    case 43 /* AsError */:
                        this.$ = Errors_1.constructErrorByName(virtualStack[vsl]);
                        break;
                }
            }
            catch (e) {
                if (catchOnFailure) {
                    // NOTE: I'm not sure if some of these ReduceAction map correctly in the case of an error.
                    switch (reduceActionToPerform) {
                        case 1 /* ReturnLast */:
                            return virtualStack[vsl - 1];
                        case 2 /* CallVariable */:
                        case 5 /* AsNumber */:
                        case 6 /* AsString */:
                        case 7 /* Ampersand */:
                        case 8 /* Equals */:
                        case 9 /* Plus */:
                        case 10 /* LastExpression */:
                        case 11 /* LTE */:
                        case 12 /* GTE */:
                        case 13 /* NotEqual */:
                        case 15 /* GT */:
                        case 16 /* LT */:
                        case 17 /* Minus */:
                        case 18 /* Multiply */:
                        case 19 /* Divide */:
                        case 20 /* ToPower */:
                        case 23 /* CallFunctionLastBlank */:
                        case 24 /* CallFunctionLastTwoInStack */:
                        case 28 /* FixedCellValue */:
                        case 29 /* FixedCellRangeValue */:
                        case 30 /* CellValue */:
                        case 31 /* CellRangeValue */:
                            this.$ = e;
                            break;
                        case 21 /* InvertNumber */:
                            this.$ = e;
                            if (isNaN(this.$)) {
                                this.$ = 0;
                            }
                            break;
                        case 22 /* ToNumberNANAsZero */:
                            this.$ = e;
                            if (isNaN(this.$)) {
                                this.$ = 0;
                            }
                            break;
                        case 32 /* EnsureIsArray */:
                            if (MoreUtils_1.isArray(virtualStack[vsl])) {
                                this.$ = virtualStack[vsl];
                            }
                            else {
                                this.$ = [virtualStack[vsl]];
                            }
                            break;
                        case 33 /* EnsureYYTextIsArray */:
                            var result_2 = [], arr = eval("[" + rawValueOfReduceOriginToken + "]");
                            arr.forEach(function (item) {
                                result_2.push(item);
                            });
                            this.$ = result_2;
                            break;
                        case 34 /* ReduceInt */:
                        case 35 /* ReducePercent */:
                            virtualStack[vsl - 2].push(virtualStack[vsl]);
                            this.$ = virtualStack[vsl - 2];
                            break;
                        case 36 /* WrapCurrentTokenAsArray */:
                            this.$ = [virtualStack[vsl]];
                            break;
                        case 37 /* EnsureLastTwoINArrayAndPush */:
                            this.$ = (MoreUtils_1.isArray(virtualStack[vsl - 2]) ? virtualStack[vsl - 2] : [virtualStack[vsl - 2]]);
                            this.$.push(virtualStack[vsl]);
                            break;
                        case 38 /* ReflexiveReduce */:
                            this.$ = virtualStack[vsl];
                            break;
                        case 39 /* ReduceFloat */:
                            this.$ = parseFloat(virtualStack[vsl - 2] + '.' + virtualStack[vsl]);
                            break;
                        case 40 /* ReducePrevAsPercent */:
                            this.$ = virtualStack[vsl - 1] * 0.01;
                            break;
                        case 41 /* ReduceLastThreeA */:
                        case 42 /* ReduceLastThreeB */:
                            this.$ = virtualStack[vsl - 2] + virtualStack[vsl - 1] + virtualStack[vsl];
                            break;
                    }
                }
                else {
                    throw e;
                }
            }
        },
        defaultActions: { 19: [ParserConstants_1.REDUCE, 1 /* ReturnLast */] },
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
                    case ParserConstants_1.SHIFT: // Shift
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
                        if (!preErrorSymbol) { // normal execution/no error
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
                    case ParserConstants_1.REDUCE: // Reduce
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
            options: {
            // backtrack_lexer?
            // ranges?
            // flex?
            },
            mapRuleIndexToSymbolEnumeration: function (ruleIndex) {
                switch (ruleIndex) {
                    case 0 /* WhiteSpace */:
                        // skip whitespace
                        break;
                    case 1 /* DoubleQuotes */:
                        return Symbols_1.Symbol.String;
                    case 2 /* SingleQuotes */:
                        return Symbols_1.Symbol.String;
                    case 3 /* FormulaName */:
                        return Symbols_1.Symbol.Function;
                    case 6 /* $A1Cell */:
                        return Symbols_1.Symbol.FixedCell;
                    case 7 /* A1Cell */:
                        return Symbols_1.Symbol.CellUpper;
                    case 8 /* FormulaNameSimple */:
                        return Symbols_1.Symbol.Function;
                    case 9 /* Variable */:
                        return Symbols_1.Symbol.Variable;
                    case 10 /* SimpleVariable */:
                        return Symbols_1.Symbol.Variable;
                    case 11 /* Integer */:
                        return Symbols_1.Symbol.NumberUpper;
                    case 12 /* SelfContainedArray */:
                        return Symbols_1.Symbol.Array;
                    case 13 /* DollarSign */:
                        // skip whitespace??
                        break;
                    case 14 /* Ampersand */:
                        return Symbols_1.Symbol.Ampersand;
                    case 15 /* SingleWhitespace */:
                        return ' ';
                    case 16 /* Period */:
                        return Symbols_1.Symbol.Decimal;
                    case 17 /* Colon */:
                        return Symbols_1.Symbol.Colon;
                    case 18 /* Semicolon */:
                        return Symbols_1.Symbol.Semicolon;
                    case 19 /* Comma */:
                        return Symbols_1.Symbol.Comma;
                    case 20 /* Asterisk */:
                        return Symbols_1.Symbol.Asterisk;
                    case 21 /* ForwardSlash */:
                        return Symbols_1.Symbol.Divide;
                    case 22 /* Minus */:
                        return Symbols_1.Symbol.Minus;
                    case 23 /* Plus */:
                        return Symbols_1.Symbol.Plus;
                    case 24 /* Caret */:
                        return Symbols_1.Symbol.Carrot;
                    case 25 /* OpenParen */:
                        return Symbols_1.Symbol.LeftParen;
                    case 26 /* CloseParen */:
                        return Symbols_1.Symbol.RightParen;
                    case 27 /* GreaterThan */:
                        return Symbols_1.Symbol.GreaterThan;
                    case 28 /* LessThanSign */:
                        return Symbols_1.Symbol.LessThan;
                    case 30 /* OpenDoubleQuote */:
                        return '"';
                    case 31 /* OpenSingleQuote */:
                        return "'";
                    case 32 /* ExclamationPoint */:
                        return "!";
                    case 33 /* Equals */:
                        return Symbols_1.Symbol.Equals;
                    case 34 /* Percent */:
                        return Symbols_1.Symbol.Percent;
                    case 35 /* FullError */:
                        return Symbols_1.Symbol.FullError;
                    case 36 /* EndOfString */:
                        return Symbols_1.Symbol.EOF;
                }
            },
            conditions: {
                INITIAL: {
                    rules: [
                        0 /* WhiteSpace */,
                        1 /* DoubleQuotes */,
                        2 /* SingleQuotes */,
                        3 /* FormulaName */,
                        6 /* $A1Cell */,
                        7 /* A1Cell */,
                        8 /* FormulaNameSimple */,
                        9 /* Variable */,
                        10 /* SimpleVariable */,
                        11 /* Integer */,
                        12 /* SelfContainedArray */,
                        13 /* DollarSign */,
                        14 /* Ampersand */,
                        15 /* SingleWhitespace */,
                        16 /* Period */,
                        17 /* Colon */,
                        18 /* Semicolon */,
                        19 /* Comma */,
                        20 /* Asterisk */,
                        21 /* ForwardSlash */,
                        22 /* Minus */,
                        23 /* Plus */,
                        24 /* Caret */,
                        25 /* OpenParen */,
                        26 /* CloseParen */,
                        27 /* GreaterThan */,
                        28 /* LessThanSign */,
                        30 /* OpenDoubleQuote */,
                        31 /* OpenSingleQuote */,
                        32 /* ExclamationPoint */,
                        33 /* Equals */,
                        34 /* Percent */,
                        35 /* FullError */,
                        36 /* EndOfString */,
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
