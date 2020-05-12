import ArrayStack from '../ArrayStack';

describe("test ArrayStack", () => {
  const stack = new ArrayStack<number>();
  test("test stack push isEmpty size peek methods", () => {
    expect(stack.isEmpty()).toBeTruthy();
    stack.push(1, 2);
    expect(stack.isEmpty()).toBeFalsy();
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(2);
  });
  test("test stack pop isEmpty size peek methods", () => {
    stack.pop();
    expect(stack.isEmpty()).toBeFalsy();
    expect(stack.size()).toBe(1);
    expect(stack.peek()).toBe(1);
  });
  test('test stack toString and toArray methods', () => {
    expect(stack.toString()).toEqual("1");
    expect(stack.toArray()).toEqual([1]);
  });
  test("test stack clear isEmpty size methods", () => {
    stack.clear();
    expect(stack.isEmpty()).toBeTruthy();
    expect(stack.size()).toBe(0);
  });
})
