import { Helpers } from "../src/Helpers";
import {assertEquals,} from "./utils/Asserts"

// Test Helpers.number
assertEquals(-1, Helpers.number("-1"));
assertEquals(1, Helpers.number("+1"));
assertEquals(1.8239817293871983e+28, Helpers.number("18239817293871982379817157562"));
assertEquals(1.8239817293871983e+28, Helpers.number("+18239817293871982379817157562"));
assertEquals(-1.8239817293871983e+28, Helpers.number("-18239817293871982379817157562"));
assertEquals(0, Helpers.number("10."));
assertEquals(111, Helpers.number("000111"));
assertEquals("10 + 10", Helpers.number("10 + 10"));
assertEquals("10/10", Helpers.number("10/10"));
assertEquals("10*10", Helpers.number("10*10"));
assertEquals(10.18239817293872, Helpers.number("10.18239817293871982379817157562"));
