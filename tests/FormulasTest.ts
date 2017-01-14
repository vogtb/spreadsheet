import { ABS, ACOS, ACOSH, ACOTH, AND, ARABIC, ASIN, ASINH, ATAN, ATAN2, ATANH, AVEDEV, AVERAGE,
  AVERAGEA, AVERAGEIF, BASE, BIN2DEC } from "../src/RawFormulas"
import { assertEquals } from "./utils/Asserts"

assertEquals(ABS(-10), 10);
assertEquals(ABS(0), 0);

assertEquals(ACOS(0), 1.5707963267948966);

assertEquals(ACOSH(22), 3.783672704329451);

assertEquals(ACOTH(22), 0.04548588910286339);

assertEquals(AND(10, 10), true);
assertEquals(AND(10, 0), false);

assertEquals(ARABIC("XIV"), 14);

assertEquals(ASIN(0.1), 0.1001674211615598);

assertEquals(ASINH(0.1), 0.09983407889920758);

assertEquals(ATAN(0.1), 0.09966865249116204);

assertEquals(ATAN2(4, 3), 0.6435011087932844);

assertEquals(ATANH(0.44), 0.47223080442042564);

assertEquals(AVEDEV(1, 2, 4, 56.7), 20.3875);

assertEquals(AVERAGE(10, 20, 4.1), 11.366666666666667);

assertEquals(AVERAGEA(10, 20, 4.1), 11.366666666666667);

assertEquals(AVERAGEIF([1, 5, 10], '>2'), 7.5);

assertEquals(BASE(15, 2, 10), '0000001111');

assertEquals(BIN2DEC(1010101010), -342);
