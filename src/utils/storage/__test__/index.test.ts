import MyStorage from "../index";
const mockCallback = jest.fn();

MyStorage.set("a", 1);
MyStorage.set("b", {b: 2});
MyStorage.set("c", { c: 3 }, 1/86400000);
MyStorage.set({ k1: "aaa", k2: 2 });
MyStorage.set({ k3: 1, k4: 2, expires: 1 });
MyStorage.set({ k5: { value: 1, expires: 1 }, k6: { value: 2, expires: 2 } });

describe("test MyStorage ", () => {
  test('test set/get method', () => {
    expect(MyStorage.get("a")).toBe(1);
    expect(MyStorage.get("b")).toEqual({ b: 2 });
    expect(MyStorage.get("c")).toBeUndefined();
    expect(MyStorage.get("k1")).toBe("aaa");
    expect(MyStorage.get("k2")).toBe(2);
    expect(MyStorage.get("k3")).toBe(1);
    expect(MyStorage.get("k4")).toBe(2);
    expect(MyStorage.get("k5")).toBe(1);
    expect(MyStorage.get("k6")).toBe(2);
    expect(MyStorage.get()).toEqual({ a: 1, b: { b: 2 }, k1: "aaa", k2: 2, k3: 1,k4: 2,k5: 1,k6: 2 });
  });
  
  test("test remove method", () => {
    MyStorage.remove("a");
    expect(MyStorage.get("a")).toBeUndefined();
  });

  test("test each method", () => {
    MyStorage.each(mockCallback);
    // 此模拟函数被调用了7次
    expect(mockCallback.mock.calls.length).toBe(7);
    // 第一次调用函数时的第一个参数是 "b"
    expect(mockCallback.mock.calls[0][0]).toBe("b");
  })
})