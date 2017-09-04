/**
 * Converts wild-card style expressions (in which * matches zero or more characters, and ? matches exactly one character)
 * to regular expressions. * and ? can be escaped by prefixing with ~.
 * For future reference, something like this might be better
 * http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex.
 * @param c input
 * @returns {RegExp} resulting regex
 */
function wildCardRegex(c: string) {
  let a = c.split("~?");
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i].split("?").join(".{1}");
  }
  let b = a.join("\\\?");
  let d = b.split("~*");
  for (let i = 0; i < d.length; i++) {
    d[i] = d[i].split("*").join(".*");
  }
  return new RegExp("^"+d.join(".*")+"$", "g");
}




/**
 * Creates a criteria function to evaluate elements in a range in an *IF function.
 */
class CriteriaFunctionFactory {
  /**
   * If the criteria is a number, use strict equality checking.
   * If the criteria is a string, check to see if it is a comparator.
   * If the criteria is a string, and it is not a comparator, check for regex.
   * If the criteria is a string and has not matched the above, finally use strict equality checking as a fallback.
   * If the criteria has not been set, default to false-returning criteria function.
   * @param criteria
   * @returns {(x:any)=>boolean}
   */
  static createCriteriaFunction(criteria: string) : Function {
    // Default criteria does nothing
    let criteriaEvaluation = function (x) : boolean {
      return false;
    };

    if (typeof criteria === "number" || typeof criteria === "boolean") {
      criteriaEvaluation = function (x) : boolean {
        return x === criteria;
      };
    } else if (typeof criteria === "string") {
      let comparisonMatches = criteria.match(/^\s*(<=|>=|=|<>|>|<)\s*(-)?\s*(\$)?\s*([0-9]+([,.][0-9]+)?)\s*$/);
      if (comparisonMatches !== null && comparisonMatches.length >= 6 && comparisonMatches[4] !== undefined) {
        criteriaEvaluation = function (x) : boolean {
          return eval(x + comparisonMatches[1] + (comparisonMatches[2] === undefined ? "" : "-") +  comparisonMatches[4]);
        };
        if (comparisonMatches[1] === "=") {
          criteriaEvaluation = function (x) : boolean {
            return eval(x + "===" + (comparisonMatches[2] === undefined ? "" : "-") +  comparisonMatches[4]);
          };
        }
        if (comparisonMatches[1] === "<>") {
          criteriaEvaluation = function (x) : boolean {
            return eval(x + "!==" + (comparisonMatches[2] === undefined ? "" : "-") +  comparisonMatches[4]);
          };
        }
      } else if (criteria.match(/\*|\~\*|\?|\~\?/) !== null) {
        // Regular string
        let matches = criteria.match(/\*|\~\*|\?|\~\?/);
        if (matches !== null) {
          criteriaEvaluation = function (x) : boolean {
            try {
              // http://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
              return wildCardRegex(criteria).test(x);
            } catch (e) {
              return false;
            }
          };
        } else {
          criteriaEvaluation = function (x) : boolean {
            return x === criteria;
          };
        }
      } else {
        criteriaEvaluation = function (x) : boolean {
          return x === criteria;
        };
      }
    }
    return criteriaEvaluation;
  }
}

export {
  CriteriaFunctionFactory
}