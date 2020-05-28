import Queue from '../LinkedListQueue';
describe("test Queue methods", () => {
  test('test queue enqueue isEmpty size peek methods', () => {
    const queue = new Queue<number>();
    expect(queue.isEmpty()).toBeTruthy();
    queue.enqueue(12, 34, 56);
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.size()).toBe(3);
    expect(queue.peek()).toBe(12);
  });
  test('test queue dequeue isEmpty size peek methods', () => {
    const queue = new Queue<number>();
    queue.enqueue(12, 34, 56);
    expect(queue.isEmpty()).toBeFalsy();
    queue.dequeue();
    expect(queue.isEmpty()).toBeFalsy();
    expect(queue.size()).toBe(2);
    expect(queue.peek()).toBe(34);
  });
  test('test queue toString toArray methods', () => {
    const queue = new Queue<number>();
    queue.enqueue(12, 34, 56);
    expect(queue.toString()).toEqual('12,34,56');
    expect(queue.toArray()).toEqual([12, 34, 56]);
  });
  test("test queue clear size isEmpty peek methods", () => {
    const queue = new Queue<number>();
    queue.enqueue(12, 34, 56);
    queue.clear();
    expect(queue.isEmpty()).toBeTruthy();
    expect(queue.size()).toBe(0);
    expect(queue.peek()).toBeUndefined();
  });
})
