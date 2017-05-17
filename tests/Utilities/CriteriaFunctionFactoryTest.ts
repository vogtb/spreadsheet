import {
  assertEquals,
  test
} from "../Utils/Asserts";
import {
  CriteriaFunctionFactory
} from "../../src/Utilities/CriteriaFunctionFactory";


test("CriteriaFunctionFactory.createCriteriaFunction", function () {
  assertEquals(CriteriaFunctionFactory.createCriteriaFunction("=10")(10), true);
  assertEquals(CriteriaFunctionFactory.createCriteriaFunction("=10")(0), false);
  assertEquals(CriteriaFunctionFactory.createCriteriaFunction(">2")(3), true);
  assertEquals(CriteriaFunctionFactory.createCriteriaFunction(">2")(2), false);
  assertEquals(CriteriaFunctionFactory.createCriteriaFunction(">2")(1), false);
  assertEquals(CriteriaFunctionFactory.createCriteriaFunction("<>2")(1), true);
  assertEquals(CriteriaFunctionFactory.createCriteriaFunction("<>2")(2), false);
  assertEquals(CriteriaFunctionFactory.createCriteriaFunction("?o?")("top"), true);
});
