import Dictionary from '../Dictionary';
import { DictionaryKeyValuePair } from "../interface";

const mockCallback = jest.fn();
describe("test Dictionary", () => {
  test("test Dictionary methods", () => {
    const dict = new Dictionary<string, number>();
    expect(dict.size()).toBe(0);
    expect(dict.isEmpty()).toBeTruthy();
    expect(dict.set("a", 1)).toBeTruthy();
    expect(dict.set("b", 2)).toBeTruthy();
    expect(dict.set("c", 3)).toBeTruthy();
    expect(dict.set("d", 4)).toBeTruthy();
    expect(dict.set("e", 5)).toBeTruthy();
    expect(dict.set("f", 6)).toBeTruthy();
    expect(dict.isEmpty()).toBeFalsy();
    expect(dict.size()).toBe(6);
    expect(dict.toString()).toEqual("[#a: 1],[#b: 2],[#c: 3],[#d: 4],[#e: 5],[#f: 6]");
    expect(dict.keys()).toStrictEqual(["a", "b", "c", "d", "e", "f"]);
    expect(dict.values()).toStrictEqual([1, 2, 3, 4, 5, 6]);
    expect(dict.entries()).toStrictEqual([
      new DictionaryKeyValuePair("a", 1),
      new DictionaryKeyValuePair("b", 2),
      new DictionaryKeyValuePair("c", 3),
      new DictionaryKeyValuePair("d", 4),
      new DictionaryKeyValuePair("e", 5),
      new DictionaryKeyValuePair("f", 6)
    ]);
    expect(dict.hasKey("e")).toBeTruthy();
    dict.forEach(mockCallback);
    // 此模拟函数被调用了6次
    expect(mockCallback.mock.calls.length).toBe(6);
    // 第一次调用函数时的第一个参数是 "a"
    expect(mockCallback.mock.calls[0][0]).toBe("a");
    expect(dict.remove("a")).toBeTruthy();
    expect(dict.remove("z")).toBeFalsy();
    expect(dict.hasKey("a")).toBeFalsy();
    expect(dict.size()).toBe(5);
    expect(dict.toString()).toEqual("[#b: 2],[#c: 3],[#d: 4],[#e: 5],[#f: 6]");
    expect(dict.keys()).toStrictEqual(["b", "c", "d", "e", "f"]);
    expect(dict.values()).toStrictEqual([2, 3, 4, 5, 6]);
    expect(dict.entries()).toStrictEqual([
      new DictionaryKeyValuePair("b", 2), 
      new DictionaryKeyValuePair("c", 3), 
      new DictionaryKeyValuePair("d", 4), 
      new DictionaryKeyValuePair("e", 5), 
      new DictionaryKeyValuePair("f", 6)
    ]);
    dict.forEach(mockCallback);
    // 此模拟函数被调用了11次
    expect(mockCallback.mock.calls.length).toBe(11);
    // 第6次调用函数时的第一个参数是 "b"
    expect(mockCallback.mock.calls[6][0]).toBe("b");
    dict.clear();
    expect(dict.isEmpty()).toBeTruthy();
    expect(dict.size()).toBe(0);
  });
});
