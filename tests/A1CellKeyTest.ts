import { A1CellKey } from "../src/A1CellKey"
import { assertEquals } from "./utils/Asserts"

//Test constructor
var one = new A1CellKey("A1");
assertEquals(0, one.getX());
assertEquals(0, one.getY());
assertEquals("A1", one.toString());
var two = new A1CellKey("Z4563534");
assertEquals(25, two.getX());
assertEquals(4563533, two.getY());
assertEquals("Z4563534", two.toString());


//Test static constructor
var one = A1CellKey.of(0, 0);
assertEquals(0, one.getX());
assertEquals(0, one.getY());
assertEquals("A1", one.toString());
var two = A1CellKey.of(25, 4563533);
assertEquals(25, two.getX());
assertEquals(4563533, two.getY());
assertEquals("Z4563534", two.toString());