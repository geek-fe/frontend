import DoublyLinkedListNode from "./DoublyLinkedListNode";
import { ILinkedList } from "../LinkedList/interface";

/**
 * @description 链表接口
 * @author fengshaojian
 * @export
 * @interface IDoublyLinkedList
 * @template T
 */
export interface IDoublyLinkedList<T> extends ILinkedList<T> {
  /**
   * @description 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined
   * @author fengshaojian
   * @param {number} index
   * @returns {(DoublyLinkedListNode<T> | undefined)}
   * @memberof IDoublyLinkedList
   */
  getElementAt(index: number): DoublyLinkedListNode<T> | undefined;

  /**
   * @description 获取链表的第一个元素
   * @author fengshaojian
   * @returns {(DoublyLinkedListNode<T> | undefined)}
   * @memberof IDoublyLinkedList
   */
  getHead(): DoublyLinkedListNode<T> | undefined;

  /**
   * @description 获取链表的最后一个元素
   * @author fengshaojian
   * @returns {(DoublyLinkedListNode<T> | undefined)}
   * @memberof IDoublyLinkedList
   */
  getTail(): DoublyLinkedListNode<T> | undefined;

  /**
   * @description 将链表转为数组形式
   * @author fengshaojian
   * @returns {T[]}
   * @memberof IDoublyLinkedList
   */
  toArray(): DoublyLinkedListNode<T>[];
}
