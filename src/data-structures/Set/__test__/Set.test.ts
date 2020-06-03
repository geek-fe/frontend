import MySet from "../Set";

const mockCallback = jest.fn();

describe("test MySet", () => {
  test("test MySet methods", () => {
    const set = new MySet<number>();
    expect(set.size()).toBe(0);
    expect(set.add(1)).toBeTruthy();
    expect(set.add(1)).toBeFalsy();
    expect(set.add(2)).toBeTruthy();
    expect(set.add(3)).toBeTruthy();
    expect(set.add(4)).toBeTruthy();
    expect(set.add(5)).toBeTruthy();
    expect(set.size()).toBe(5);
    expect(set.values()).toStrictEqual([1, 2, 3, 4, 5]);
    expect(set.has(1)).toBeTruthy();
    set.forEach(mockCallback);
    // 此模拟函数被调用了5次
    expect(mockCallback.mock.calls.length).toBe(5);
    // 第一次调用函数时的第一个参数是 1
    expect(mockCallback.mock.calls[0][0]).toBe(1);
    expect(set.delete(1)).toBeTruthy();
    expect(set.delete(6)).toBeFalsy();
    expect(set.has(1)).toBeFalsy();
    expect(set.size()).toBe(4);
    expect(set.values()).toStrictEqual([2, 3, 4, 5]);
    set.forEach(mockCallback);
    // 此模拟函数被调用了9次
    expect(mockCallback.mock.calls.length).toBe(9);
    // 第6次调用函数时的第一个参数是 2
    expect(mockCallback.mock.calls[5][0]).toBe(2);
  });
  test("union method", () => {
    const s1 = new MySet<number>();
    s1.add(1);
    s1.add(2);
    s1.add(3);
    s1.add(4);
    s1.add(5);

    const s2 = new MySet<number>();
    s2.add(1);
    s2.add(3);
    s2.add(5);
    s2.add(7);
    s2.add(9);
    const s3 = new MySet<number>();
    s3.add(1);
    s3.add(2);
    s3.add(3);
    s3.add(4);
    s3.add(5);
    s3.add(6);

    expect(s1.union(s2).values()).toStrictEqual([1, 2, 3, 4, 5, 7, 9]);
    expect(s1.intersect(s2).values()).toStrictEqual([1, 3, 5]);
    expect(s1.difference(s2).values()).toStrictEqual([2, 4]);
    expect(s1.isSubsetOf(s2)).toBeFalsy();
    expect(s1.isSubsetOf(s3)).toBeTruthy();
  })
});




