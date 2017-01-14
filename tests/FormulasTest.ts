import { ABS, ACOS } from "../src/RawFormulas"
import { assertEquals } from "./utils/Asserts"

// Test ABS formula
assertEquals(ABS(-10), 10);
assertEquals(ABS(0), 0);

// Test ACOS formula
assertEquals(ACOS(0), 1.5707963267948966);
