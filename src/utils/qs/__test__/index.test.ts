import qs from "../index";

describe(" test qs", () => {
  test("get method", () => {
    const url = "https://www.example.com/#/profile?a=1&b=2&c=3";
    expect(qs.get(url)).toEqual({ a: "1", b: "2", c: "3" });
  });
  test("set method", () => {
    const url = "https://www.example.com/#/profile?a=1&b=2&c=3";
    const newUrl = qs.set({ aa: 222, bb: { c: 2 }, c: 33 }, url);
    expect(qs.get(newUrl)).toEqual({ a: "1", b: "2", c: "33", aa: "222", bb : "{\"c\":2}" })
    expect(newUrl).toBe("https://www.example.com/#/profile?a=1&b=2&c=33&aa=222&bb={\"c\":2}")
  })
});
