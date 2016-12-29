import { A1CellKey } from "../src/A1CellKey"
import { assertEquals } from "./utils/Asserts"

//Test constructor
var one = new A1CellKey("A1");
assertEquals("A", one.getColumn());
assertEquals(1, one.getRow());
assertEquals(0, one.getX());
assertEquals(0, one.getY());
var two = new A1CellKey("Z4563534");
assertEquals("Z", two.getColumn());
assertEquals(4563534, two.getRow());
assertEquals(25, two.getX());
assertEquals(4563533, two.getY());

//Test static constructor
var one = A1CellKey.of(0, 0);
assertEquals("A", one.getColumn());
assertEquals(1, one.getRow());
assertEquals(0, one.getX());
assertEquals(0, one.getY());
var two = A1CellKey.of(25, 4563533);
assertEquals("Z", two.getColumn());
assertEquals(4563534, two.getRow());
assertEquals(25, two.getX());
assertEquals(4563533, two.getY());