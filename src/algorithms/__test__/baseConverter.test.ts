import baseConverter from '../baseConverter';

test("test baseConverter method", () => {
  expect(baseConverter(10, 2)).toEqual("1010");
  expect(baseConverter(1234, 2)).toEqual("10011010010");
  expect(baseConverter(10, 8)).toEqual("12");
  expect(baseConverter(1234, 8)).toEqual("2322");
  expect(baseConverter(10, 16)).toEqual("A");
  expect(baseConverter(1234, 16)).toEqual("4D2");
  expect(baseConverter(10, 32)).toEqual("A");
  expect(baseConverter(1234, 32)).toEqual("16I");
})
