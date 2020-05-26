import { ILinkedList } from "../LinkedList/interface";
import LinkedListNode from "../LinkedList/LinkedListNode";

/**
 * @description 双向链表接口
 * @author fengshaojian
 * @export
 * @interface IDoublyLinkedList
 * @template T
 */
export interface IDoublyLinkedList<T> extends ILinkedList<T> {

  getTail(): LinkedListNode<T> | undefined;
}
