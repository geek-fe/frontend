
import { flowerDrumTransfer } from '../FlowerDrumTransfer';
test("flowerDrumTransfer method", () => {
  const children = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const number = 5;
  const res = flowerDrumTransfer(children, number);
  expect(res.winner === "D");
})