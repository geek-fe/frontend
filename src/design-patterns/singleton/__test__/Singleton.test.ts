import Signleton from "../Singleton"

test("test signleton pattern", () => {
  const s1 = Signleton.getInstance();
  const s2 = Signleton.getInstance();
  expect(s1 === s2).toBeTruthy();
});
