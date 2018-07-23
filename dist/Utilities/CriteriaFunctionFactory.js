"use strict";
exports.__esModule = true;
/**
 * Converts wild-card style expressions (in which * matches zero or more characters, and ? matches exactly one character)
 * to regular expressions. * and ? can be escaped by prefixing with ~.
 * For future reference, something like this might be better
 * http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex.
 * @param c input
 * @returns {RegExp} resulting regex
 */
function wildCardRegex(c) {
    var a = c.split("~?");
    for (var i = 0; i < a.length; i++) {
        a[i] = a[i].split("?").join(".{1}");
    }
    var b = a.join("\\\?");
    var d = b.split("~*");
    for (var i = 0; i < d.length; i++) {
        d[i] = d[i].split("*").join(".*");
    }
    return new RegExp("^" + d.join(".*") + "$", "g");
}
/**
 * Creates a criteria function to evaluate elements in a range in an *IF function.
 */
var CriteriaFunctionFactory = /** @class */ (function () {
    function CriteriaFunctionFactory() {
    }
    /**
     * If the criteria is a number, use strict equality checking.
     * If the criteria is a string, check to see if it is a comparator.
     * If the criteria is a string, and it is not a comparator, check for regex.
     * If the criteria is a string and has not matched the above, finally use strict equality checking as a fallback.
     * If the criteria has not been set, default to false-returning criteria function.
     * @param criteria
     * @returns {(x:any)=>boolean}
     */
    CriteriaFunctionFactory.createCriteriaFunction = function (criteria) {
        // Default criteria does nothing
        var criteriaEvaluation = function (x) {
            return false;
        };
        if (typeof criteria === "number" || typeof criteria === "boolean") {
            criteriaEvaluation = function (x) {
                return x === criteria;
            };
        }
        else if (typeof criteria === "string") {
            var comparisonMatches_1 = criteria.match(/^\s*(<=|>=|=|<>|>|<)\s*(-)?\s*(\$)?\s*([0-9]+([,.][0-9]+)?)\s*$/);
            if (comparisonMatches_1 !== null && comparisonMatches_1.length >= 6 && comparisonMatches_1[4] !== undefined) {
                criteriaEvaluation = function (x) {
                    return eval(x + comparisonMatches_1[1] + (comparisonMatches_1[2] === undefined ? "" : "-") + comparisonMatches_1[4]);
                };
                if (comparisonMatches_1[1] === "=") {
                    criteriaEvaluation = function (x) {
                        return eval(x + "===" + (comparisonMatches_1[2] === undefined ? "" : "-") + comparisonMatches_1[4]);
                    };
                }
                if (comparisonMatches_1[1] === "<>") {
                    criteriaEvaluation = function (x) {
                        return eval(x + "!==" + (comparisonMatches_1[2] === undefined ? "" : "-") + comparisonMatches_1[4]);
                    };
                }
            }
            else if (criteria.match(/\*|\~\*|\?|\~\?/) !== null) {
                // Regular string
                var matches = criteria.match(/\*|\~\*|\?|\~\?/);
                if (matches !== null) {
                    criteriaEvaluation = function (x) {
                        try {
                            // http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
                            return wildCardRegex(criteria).test(x);
                        }
                        catch (e) {
                            return false;
                        }
                    };
                }
                else {
                    criteriaEvaluation = function (x) {
                        return x === criteria;
                    };
                }
            }
            else {
                criteriaEvaluation = function (x) {
                    return x === criteria;
                };
            }
        }
        return criteriaEvaluation;
    };
    return CriteriaFunctionFactory;
}());
exports.CriteriaFunctionFactory = CriteriaFunctionFactory;
