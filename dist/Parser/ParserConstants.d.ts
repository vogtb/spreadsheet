import { Symbol } from "./Symbols";
import { ReductionPair } from "./ReductionPair";
import { RULES } from "./Rules";
/**
 * Actions to take when processing tokens one by one. We're always either taking the next token, reducing our current
 * tokens, or accepting and returning.
 */
declare const SHIFT = 1;
declare const REDUCE = 2;
declare const ACCEPT = 3;
declare const PRODUCTIONS: ReductionPair[];
declare const SYMBOL_NAME_TO_INDEX: {
    "$accept": Symbol;
    "$end": Symbol;
    "error": Symbol;
    "expressions": Symbol;
    "expression": Symbol;
    "EOF": Symbol;
    "variableSequence": Symbol;
    "number": Symbol;
    "STRING": Symbol;
    "&": Symbol;
    "=": Symbol;
    "+": Symbol;
    "(": Symbol;
    ")": Symbol;
    "<": Symbol;
    ">": Symbol;
    "-": Symbol;
    "*": Symbol;
    "/": Symbol;
    "^": Symbol;
    "FUNCTION": Symbol;
    "expseq": Symbol;
    "cell": Symbol;
    "FIXEDCELL": Symbol;
    ":": Symbol;
    "CELL": Symbol;
    "ARRAY": Symbol;
    ";": Symbol;
    ",": Symbol;
    "VARIABLE": Symbol;
    "DECIMAL": Symbol;
    "NUMBER": Symbol;
    "%": Symbol;
    "#": Symbol;
    "!": Symbol;
};
declare const SYMBOL_INDEX_TO_NAME: {};
declare const ACTION_TABLE: any[];
export { ACTION_TABLE, RULES, REDUCE, ACCEPT, SHIFT, SYMBOL_INDEX_TO_NAME, SYMBOL_NAME_TO_INDEX, PRODUCTIONS };
