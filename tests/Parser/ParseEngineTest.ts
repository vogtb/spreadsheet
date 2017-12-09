import {
  Parser
} from "../../src/Parser/ParseEngine";


let FormulaParser = function(handler) {
  let formulaLexer = function () {};
  formulaLexer.prototype = Parser.lexer;

  let formulaParser = function () {
    this.lexer = new formulaLexer();
    this.yy = {};
  };

  formulaParser.prototype = Parser;
  let newParser = new formulaParser;
  newParser.setObj = function(obj: string) {
    newParser.yy.obj = obj;
  };

  newParser.yy.parseError = function (str, hash) {
    throw new Error(JSON.stringify({
      name: 'Parser error',
      message: str,
      prop: hash
    }));
  };

  newParser.yy.handler = handler;

  return newParser;
};

let parser = FormulaParser({});
parser.setObj("A1");

console.log(parser.parse('5'));