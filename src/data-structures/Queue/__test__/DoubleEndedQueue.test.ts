import DoubleEndedQueue from "../DoubleEndedQueue";

describe("test DoubleEndedQueue methods", () => {
  const doubleEndedQueue = new DoubleEndedQueue<number>();
  test('test doubleEndedQueue enqueue addFront isEmpty size peek peekBack methods', () => {
    expect(doubleEndedQueue.isEmpty()).toBeTruthy();
    doubleEndedQueue.enqueue(12, 34, 56);
    expect(doubleEndedQueue.isEmpty()).toBeFalsy();
    expect(doubleEndedQueue.size()).toBe(3);
    expect(doubleEndedQueue.peek()).toBe(12);
    expect(doubleEndedQueue.peekBack()).toBe(56);
    doubleEndedQueue.addFront(88);
    expect(doubleEndedQueue.size()).toBe(4);
    expect(doubleEndedQueue.peek()).toBe(88);
  });
  test('test doubleEndedQueue dequeue removeBack isEmpty size peek peekBack methods', () => {
    expect(doubleEndedQueue.isEmpty()).toBeFalsy();
    doubleEndedQueue.dequeue();
    expect(doubleEndedQueue.isEmpty()).toBeFalsy();
    expect(doubleEndedQueue.size()).toBe(3);
    expect(doubleEndedQueue.peek()).toBe(12);
    expect(doubleEndedQueue.removeBack()).toBe(56);
    expect(doubleEndedQueue.size()).toBe(2);
    expect(doubleEndedQueue.peekBack()).toBe(34);
  });
  test('test doubleEndedQueue toString toArray methods', () => {
    expect(doubleEndedQueue.toString()).toEqual('12,34');
    expect(doubleEndedQueue.toArray()).toEqual([12, 34]);
  });
  test("test doubleEndedQueue clear size isEmpty peek methods", () => {
    doubleEndedQueue.clear();
    expect(doubleEndedQueue.isEmpty()).toBeTruthy();
    expect(doubleEndedQueue.size()).toBe(0);
    expect(doubleEndedQueue.peek()).toBeUndefined();
  });
});
