import { ABS, ACOS, ACOSH, ACOTH, AND, ARABIC, ASIN, ASINH, ATAN, ATAN2, ATANH, AVEDEV, AVERAGE,
    AVERAGEA, AVERAGEIF, BASE, BIN2DEC, BESSELI, BESSELJ, BESSELK, BESSELY, BETADIST, BETAINV,
    BITAND, BITLSHIFT, BITOR, BITRSHIFT, BITXOR, BIN2HEX, BIN2OCT, DECIMAL, CEILING,
    CEILINGMATH, CEILINGPRECISE, CHAR, CODE, COMBIN, COMBINA, COMPLEX, CONCATENATE, CONVERT,
    CORREL, COS, PI, COSH, COT, COTH, COUNT, COUNTA, COUNTIF, COUNTIFS } from "../src/RawFormulas"
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

assertEquals(BESSELI(1, 2), 0.13574766658069928);

assertEquals(BESSELJ(1, 2), 0.11490348499246938);

assertEquals(BESSELK(1, 2), 1.6248388844172295);

assertEquals(BESSELY(1, 2), -1.6506826133039476);

assertEquals(BETADIST(2, 8, 10, true, 1, 3), 0.6854705810117458);

assertEquals(BETAINV(0.6854705810117458, 8, 10, 1, 3), 1.9999999999999996);

assertEquals(BITAND(42, 24), 8);

assertEquals(BITLSHIFT(42, 24), 704643072);

assertEquals(BITOR(42, 24), 58);

assertEquals(BITRSHIFT(42, 2), 10);

assertEquals(BITXOR(42, 24), 50);

assertEquals(BIN2HEX(1010101010), "fffffffeaa");

assertEquals(BIN2OCT(1010101010), "7777777252");

assertEquals(DECIMAL(199.99999), 199);

assertEquals(CEILING(22.22, 0.1), 22.3);

assertEquals(CEILINGMATH(1001.112131), 1002);

assertEquals(CEILINGPRECISE(1001.112131), 1002);

assertEquals(CHAR(97), "a");

assertEquals(CODE('a'), 97);

assertEquals(COMBIN(4, 2), 6);

assertEquals(COMBINA(4, 3), 20);

assertEquals(COMPLEX(3, 4), '3+4i');

assertEquals(CONCATENATE("hey", " ", "there"), "hey there");

assertEquals(CONVERT(5.1, "mm", "m"), 0.0050999999999999995);

assertEquals(CORREL([9, 5],[10, 4]), 1);

assertEquals(COS(PI()), -1);

assertEquals(COSH(PI()), 11.591953275521522);

assertEquals(COT(30), -0.15611995216165922);

assertEquals(COTH(2), 1.0373147207275482);

assertEquals(COUNT([1, 5, 10]), 3);

assertEquals(COUNTA(10, 10, 22), 3);

assertEquals(COUNTIF([1, 5, 10], ">4"), 2);

assertEquals(COUNTIFS([1, 5, 10], ">4", [1, 5, 10], ">4"), 2);
