import { IQueue } from "./interface";

/**
 * @description 双端队列
 * @author fengshaojian
 * @export
 * @class DoubleEndedQueue
 * @template T
 */
export default class DoubleEndedQueue<T> implements IQueue<T> {
  private items: Record<number, T> = {};
  private count: number = 0;
  private head: number = 0;

  /**
   * @description 向队尾添加一个或多个元素
   * @author fengshaojian
   * @param {...T[]} element
   * @memberof DoubleEndedQueue
   */
  enqueue(...element: T[]): void {
    element.forEach(el => {
      this._add(el);
    });
  }

  /**
   * @description 向队头添加元素
   * @author fengshaojian
   * @param {T} element
   * @memberof DoubleEndedQueue
   */
  addFront(element: T): void {
    if (this.isEmpty()) { // 如果队列为空直接调用_add方法
      this._add(element);
    } else if (this.head > 0) { // 如果有元素被移除过队列，则直接在现在的队头前添加元素
      this.head--;
      this.items[this.head] = element;
    } else { // 如果当前队头指针为0，则所有元素向后移一位，然后更新。也可以给head设置一个负值
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.head = 0;
      this.count++;
      this.items[0] = element;
    }
  }

  /**
   * @description 移除队头元素
   * @author fengshaojian
   * @returns {(T | undefined)}
   * @memberof DoubleEndedQueue
   */
  dequeue(): T | undefined {
    if (this.isEmpty()) return;
    const deleteElement = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return deleteElement;
  }

  /**
   * @description 从队尾移除元素
   * @author fengshaojian
   * @returns {(T | undefined)}
   * @memberof DoubleEndedQueue
   */
  removeBack(): T | undefined {
    if (this.isEmpty()) return;
    this.count--;
    const deleteElement = this.items[this.count];
    delete this.items[this.count];
    return deleteElement;
  }

  /**
   * @description 返回队头元素
   * @author fengshaojian
   * @returns {(T | undefined)}
   * @memberof DoubleEndedQueue
   */
  peek(): T | undefined {
    if (this.isEmpty()) return;
    return this.items[this.head];
  }

  /**
   * @description 返回队尾元素
   * @author fengshaojian
   * @returns {(T | undefined)}
   * @memberof DoubleEndedQueue
   */
  peekBack(): T | undefined {
    if (this.isEmpty()) return;
    return this.items[this.count - 1];
  }

  /**
   * @description 判断队列是否为空
   * @author fengshaojian
   * @returns {boolean}
   * @memberof DoubleEndedQueue
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @description 返回队列的长度
   * @author fengshaojian
   * @returns {number}
   * @memberof DoubleEndedQueue
   */
  size(): number {
    return this.count - this.head;
  }

  /**
   * @description 清空队列
   * @author fengshaojian
   * @memberof DoubleEndedQueue
   */
  clear(): void {
    this.items = {};
    this.count = 0;
    this.head = 0;
  }

  /**
   * @description 将队列转为字符串
   * @author fengshaojian
   * @returns {string}
   * @memberof DoubleEndedQueue
   */
  toString(): string {
    if (this.isEmpty()) return "";
    let str = `${this.items[this.head]}`;
    for (let i = this.head + 1; i < this.count; i++) {
      str = `${str},${this.items[i]}`;
    }
    return str;
  }

  /**
   * @description 将队列转为转为数组
   * @author fengshaojian
   * @returns {T[]}
   * @memberof DoubleEndedQueue
   */
  toArray(): T[] {
    const arr: T[] = [];
    for (let i = this.head; i < this.count; i++) {
      arr.push(this.items[i]);
    }
    return arr;
  }

  private _add(element: T) {
    this.items[this.count] = element;
    this.count++;
  }
}
