import { palindromeChecker } from "../palindromeChecker"

test("palindromeChecker method", () => {
  expect(palindromeChecker("a")).toBeTruthy();
  expect(palindromeChecker("aa")).toBeTruthy();
  expect(palindromeChecker("level")).toBeTruthy();
  expect(palindromeChecker("kayak")).toBeTruthy();
  expect(palindromeChecker("Was it a car or a cat I saw")).toBeTruthy();
  expect(palindromeChecker("Step on no pets")).toBeTruthy();
  expect(palindromeChecker("abcdcab")).toBeFalsy();
});
