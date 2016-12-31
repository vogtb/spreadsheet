import { Sheet } from "./Sheet"

var input = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "=SUM(A1:D1, H1)"],
  [-1, -10, 2, 4, 100, 1, 50, 20, 200, -100, "=MAX(A2:J2)"],
  [-1, -40, -53, 1, 10, 30, 10, 301, -1, -20, "=MIN(A3:J3)"],
  [20, 50, 100, 20, 1, 5, 15, 25, 45, 23, "=AVERAGE(A4:J4)"],
  [0, 10, 1, 10, 2, 10, 3, 10, 4, 10, "=SUMIF(A5:J5,'>5')"],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "=SUM(K1, K2, K3, K4)"]
];
var sheet = new Sheet();
sheet.load(input);
console.log(sheet.toString());
