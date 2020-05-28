import Stack from '../LinkedListStack';

describe("test Stack", () => {
  
  test("test stack push isEmpty size peek methods", () => {
    const stack = new Stack<number>();
    expect(stack.isEmpty()).toBeTruthy();
    stack.push(1, 2, 3, 4, 5);
    expect(stack.isEmpty()).toBeFalsy();
    expect(stack.size()).toBe(5);
    expect(stack.peek()).toBe(5);
  });
  test("test stack pop isEmpty size peek methods", () => {
    const stack = new Stack<number>();
    stack.push(1, 2, 3, 4, 5);
    stack.pop();
    expect(stack.isEmpty()).toBeFalsy();
    expect(stack.size()).toBe(4);
    expect(stack.peek()).toBe(4);
  });
  test('test stack toString and toArray methods', () => {
    const stack = new Stack<number>();
    stack.push(1,2,3,4,5)
    expect(stack.toString()).toEqual("1,2,3,4,5");
    expect(stack.toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test("test stack clear isEmpty size methods", () => {
    const stack = new Stack<number>();
    stack.push(1, 2, 3, 4)
    stack.clear();
    expect(stack.isEmpty()).toBeTruthy();
    expect(stack.size()).toBe(0);
  })
})
