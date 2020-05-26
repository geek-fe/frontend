import Comparator, { ComparatorFunction } from "../../utils/comparator";
import { ILinkedList } from "./interface";
import LinkedListNode from "./LinkedListNode";

export default class LinkedList<T> implements ILinkedList<T> {
  /**
   * @description 指向链表的头
   * @protected
   * @type {(LinkedListNode<T> | undefined)}
   * @memberof LinkedList
   */
  protected head: LinkedListNode<T> | undefined;
  /**
   * @description 记录链表的长度
   * @protected
   * @type {number}
   * @memberof LinkedList
   */
  protected count: number;
  /**
   * @description 比较链表的方法
   * @protected
   * @type {ComparatorFunction<T>}
   * @memberof LinkedList
   */
  protected compare: Comparator<T>;
  constructor(compareFunction?: ComparatorFunction<T>) {
    this.head = undefined;
    this.count = 0;
    this.compare = new Comparator<T>(compareFunction);
  }

  /**
   * @description 向链表尾部添加元素
   * @author fengshaojian
   * @param {T} element
   * @memberof LinkedList
   */
  push(element: T): void {
    // 创建节点
    const node = new LinkedListNode<T>(element);
    if (!this.head) { // 如果是空链表，实则添加的是第一个元素
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) { // 找到最后一个元素
        current = current.next;
      }
      current.next = node; // 将其 next 赋为新元素，建立链接
    }
    this.count++; // 更新链表长度
  }

  /**
   * @description 向链表的特定位置插入一个新元素
   * @author fengshaojian
   * @param {T} element
   * @param {number} index
   * @returns {boolean}
   * @memberof LinkedList
   */
  insert(element: T, index: number): boolean {
    if (index >= 0 && index < this.count) { // 边界判断
      const node = new LinkedListNode<T>(element);
      if (index === 0) { // 如果插入在链表头，直接更新head字段
        node.next = this.head;
        this.head = node;
      } else {
        // 拿到当前要插入位置的前一个元素的引用
        const prev = this.getElementAt(index - 1) as LinkedListNode<T>;
        // 当前插入位置的元素
        const current = prev.next;
        // 新插入的next指向当前要插入位置的元素
        node.next = current;
        // 前一个引用的next指向新插入的元素
        prev.next = node;
        // 更新链表长度
        this.count++;
        return true;
      }
    }
    return false;
  }

  /**
   * @description 返回链表中特定位置的元素。如果链表中不存在这样的元素返回undefined
   * @author fengshaojian
   * @param {number} index
   * @returns {(LinkedListNode<T> | undefined)}
   * @memberof LinkedList
   */
  getElementAt(index: number): LinkedListNode<T> | undefined {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      for (let i = 0; i < index && current; i++) {
        current = current.next;
      }
      return current;
    }
    return undefined;
  }

  remove(element: T): T | undefined {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  /**
   * @description 返回元素在链表中的索引。如果链表中没有该元素则返回-1
   * @author fengshaojian
   * @param {T} element
   * @returns {number}
   * @memberof LinkedList
   */
  indexOf(element: T): number {
    let current = this.head; // 获取第一个元素
    for (let i = 0; i < this.count && current; i++) {
      if (this.compare.equal(current.element, element)) {
        return i;
      }
      current = current.next; // 迭代
    }
    return -1;
  }

  /**
   * @description 从链表的特定位置移除一个元素
   * @author fengshaojian
   * @param {number} index
   * @returns {(T | undefined)}
   * @memberof LinkedList
   */
  removeAt(index: number): T | undefined {
    if (index >= 0 && index < this.count) { // 检查边界值
      let current = this.head as LinkedListNode<T>;
      if (index === 0) { // 移除第一项
        this.head = current.next;
      } else {
        const prev = this.getElementAt(index - 1) as LinkedListNode<T>; // 保存要移除元素的上一个值
        current = prev.next as LinkedListNode<T>; // 要移除的元素
        (prev as LinkedListNode<T>).next = current.next; // 将要移除的上一个元素的next更新为要移除元素的next
      }
      this.count--; // 更新链表长度
      return current.element;
    }
    return undefined;
  }

  /**
   * @description 判断链表是否为空
   * @author fengshaojian
   * @returns {boolean}
   * @memberof LinkedList
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @description 获取链表的长度
   * @author fengshaojian
   * @returns {number}
   * @memberof LinkedList
   */
  size(): number {
    return this.count;
  }

  /**
   * @description 获取链表的第一个元素
   * @author fengshaojian
   * @returns
   * @memberof LinkedList
   */
  getHead() {
    return this.head;
  }

  clear() {
    this.head = undefined;
    this.count = 0;
  }

  /**
   * @description 链表的字符串展现形式
   * @author fengshaojian
   * @returns {string}
   * @memberof LinkedList
   */
  toString(): string {
    if (!this.head) {
      return "";
    }
    let str = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current; i++) {
      str = `${str},${current.element}`;
      current = current.next;
    }
    return str;
  }

  /**
   * @description 将链表转为数组
   * @author fengshaojian
   * @returns {T[]}
   * @memberof LinkedList
   */
  toArray(): LinkedListNode<T>[] {
    const arr: LinkedListNode<T>[] = [];
    let current = this.head;
    while (current) {
      arr.push(current);
      current = current.next;
    }
    return arr;
  }
}
