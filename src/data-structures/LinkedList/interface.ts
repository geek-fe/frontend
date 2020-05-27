import LinkedListNode from "./LinkedListNode";

/**
 * @description 链表接口
 * @author fengshaojian
 * @export
 * @interface ILinkedList
 * @template T
 */
export interface ILinkedList<T> {

  /**
   * @description 向链表尾部添加一个新元素
   * @author fengshaojian
   * @param {T} element
   * @memberof ILinkedList
   */
  push(element: T): void;

  /**
   * @description 向链表的特定位置插入一个新元素
   * @author fengshaojian
   * @param {*} element
   * @param {*} index
   * @memberof ILinkedList
   */
  insert(element: T, index: number): boolean;

  /**
   * @description 返回链表中特定位置的元素。如果链表中不存在这样的元素，
   * 则返回 undefined
   * @author fengshaojian
   * @param {number} index
   * @returns {(LinkedListNode<T> | undefined)}
   * @memberof ILinkedList
   */
  getElementAt(index: number): LinkedListNode<T> | undefined;

  /**
   * @description 从链表移除一个元素
   * @author fengshaojian
   * @param {T} element
   * @memberof ILinkedList
   */
  remove(element: T): T | undefined;

  /**
   * @description 返回元素在链表中的索引。如果链表中没有该元素则返回-1
   * @author fengshaojian
   * @param {T} element
   * @returns {number}
   * @memberof ILinkedList
   */
  indexOf(element: T): number;

  /**
   * @description 从链表的特定位置移除一个元素
   * @author fengshaojian
   * @param {number} index
   * @returns {T}
   * @memberof ILinkedList
   */
  removeAt(index: number): T | undefined;
  /**
   * @description 如果链表中不包含任何元素，返回 true，如果链表长度大于 0 则返回 false
   * @author fengshaojian
   * @returns {boolean}
   * @memberof ILinkedList
   */
  isEmpty(): boolean;
  /**
   * @description 返回链表包含的元素个数，与数组的 length 属性类似。
   * @author fengshaojian
   * @returns {number}
   * @memberof ILinkedList
   */
  size(): number;

  /**
   * @description 获取链表的第一个元素
   * @author fengshaojian
   * @returns {(LinkedListNode<T> | undefined)}
   * @memberof ILinkedList
   */
  getHead(): LinkedListNode<T> | undefined;

  /**
   * @description 获取链表的最后一个元素
   * @author fengshaojian
   * @returns {(LinkedListNode<T> | undefined)}
   * @memberof ILinkedList
   */
  getTail(): LinkedListNode<T> | undefined;
  /**
   * @description 反转链表
   * @author fengshaojian
   * @memberof ILinkedList
   */
  reverse(): void;
  /**
   * @description 清空链表
   * @author fengshaojian
   * @memberof ILinkedList
   */
  clear(): void;

  /**
   * @description 返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继
   *  承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。
   * @author fengshaojian
   * @returns {string}
   * @memberof ILinkedList
   */
  toString(): string;
  /**
   * @description 将链表转为数组形式
   * @author fengshaojian
   * @returns {T[]}
   * @memberof ILinkedList
   */
  toArray(): LinkedListNode<T>[];
}
