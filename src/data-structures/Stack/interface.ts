/**
 * @description 栈的接口定义
 * @author fengshaojian
 * @export
 * @interface IStack
 * @template T
 */
export interface IStack<T> {
  /**
   * @description 添加一个(或几个)新元素到栈顶。
   * @author fengshaojian
   * @param {...T[]} elements
   * @memberof IStack
   */
  push(...elements: T[]): void;
  /**
   * @description 移除栈顶的元素，同时返回被移除的元素。
   * @author fengshaojian
   * @param {T} element
   * @returns {(T | undefined)}
   * @memberof IStack
   */
  pop (): T | undefined;
  /**
   * @description 返回栈顶的元素，不对栈做任何修改(该方法不会移除栈顶的元素，仅仅返回它)。
   * @author fengshaojian
   * @returns {T}
   * @memberof IStack
   */
  peek(): T | undefined;
  /**
   * @description 如果栈里没有任何元素就返回 true，否则返回 false。
   * @author fengshaojian
   * @returns {boolean}
   * @memberof IStack
   */
  isEmpty(): boolean;
  /**
   * @description 移除栈里的所有元素。
   * @author fengshaojian
   * @memberof IStack
   */
  clear(): void;
  /**
   * @description 返回栈里的元素个数。该方法和数组的 length 属性很类似。
   * @author fengshaojian
   * @returns {number}
   * @memberof IStack
   */
  size(): number;
  /**
   * @description 返回栈的字符串展现形式
   * @author fengshaojian
   * @returns {string}
   * @memberof IStack
   */
  toString(): string;
  /**
   * @description 将栈转化为数组
   * @author fengshaojian
   * @returns {string}
   * @memberof IStack
   */
  toArray(): T[];
}
// export abstract class Stack<T> {
//   abstract push(...elements: T[]): void;
//   abstract pop (element: T): T | undefined;
//   abstract peek(): T;
//   abstract isEmpty(): boolean;
//   abstract clear(): void;
//   abstract size(): number;
// }
