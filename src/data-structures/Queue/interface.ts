/**
 * @description 定义队列的接口
 * @author fengshaojian
 * @export
 * @interface IQueue
 * @template T
 */
export interface IQueue<T> {
  /**
   * @description 在队尾添加一个或多个元素
   * @author fengshaojian
   * @param {...T[]} element
   * @memberof IQueue
   */
  enqueue(...element: T[]): void;
  /**
   * @description 从对头移除一个元素，并返回移除的元素
   * @author fengshaojian
   * @returns {(T | undefined)}
   * @memberof IQueue
   */
  dequeue(): T | undefined;
  /**
   * @description 返回对头的元素
   * @author fengshaojian
   * @returns {(T | undefined)}
   * @memberof IQueue
   */
  peek(): T | undefined;
  /**
   * @description 判断队列是否为空
   * @author fengshaojian
   * @returns {boolean}
   * @memberof IQueue
   */
  isEmpty(): boolean;
  /**
   * @description 返回队列的长度
   * @author fengshaojian
   * @returns {number}
   * @memberof IQueue
   */
  size(): number;

  /**
   * @description 清空队列
   * @author fengshaojian
   * @memberof IQueue
   */
  clear(): void;
  /**
   * @description 将队列转为字符串
   * @author fengshaojian
   * @returns {string}
   * @memberof IQueue
   */
  toString(): string;
  /**
   * @description 将队列转为数组
   * @author fengshaojian
   * @returns {T[]}
   * @memberof IQueue
   */
  toArray(): T[];
}
