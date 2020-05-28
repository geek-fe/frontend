import Singleton from "../Singleton"

test("test Singleton pattern", () => {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();
  expect(s1 === s2).toBeTruthy();
});
