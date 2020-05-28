import LinkedList from "../LinkedList/LinkedList";
import LinkedListNode from "../LinkedList/LinkedListNode";

/**
 * @description 循环链表
 * @author fengshaojian
 * @export
 * @class CircularLinkedList
 * @extends {LinkedList<T>}
 * @template T
 */
export default class CircularLinkedList<T> extends LinkedList<T> {
  /**
   * @description 向链表尾部添加元素
   * @author fengshaojian
   * @param {T} element
   * @memberof CircularLinkedList
   */
  push(element: T) {
    const node = new LinkedListNode<T>(element);
    if (!this.head) {
      this.head = node;
    } else {
      (this.tail as LinkedListNode<T>).next = node;
    }
    node.next = this.head;
    this.tail = node;
    this.count++;
  }

  /**
   * @description 向链表任意位置插入元素
   * @author fengshaojian
   * @param {T} element
   * @param {number} index
   * @memberof CircularLinkedList
   */
  insert(element: T, index: number): boolean {
    if (index >= 0 && index < this.count) {
      const node = new LinkedListNode<T>(element);
      if (index === 0) {
        if (!this.head) {
          this.head = node;
          node.next = this.head;
          this.tail = node;
        } else {
          node.next = this.head;
          (this.tail as LinkedListNode<T>).next = node;
          this.head = node;
        }
      } else {
        const prev = this.getElementAt(index - 1) as LinkedListNode<T>;
        node.next = prev.next;
        prev.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  /**
   * @description 移除链表任意位置的元素
   * @author fengshaojian
   * @param {number} index
   * @returns {(T | undefined)}
   * @memberof CircularLinkedList
   */
  removeAt(index: number): T | undefined {
    if (index >= 0 && index < this.count) {
      let current = this.head as LinkedListNode<T>;
      if (index === 0) {
        this.head = current.next;
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          (this.tail as LinkedListNode<T>).next = this.head;
        }
      } else {
        const prev = this.getElementAt(index - 1) as LinkedListNode<T>;
        current = prev.next as LinkedListNode<T>;
        prev.next = current.next;
        if (index === this.count - 1) {
          this.tail = prev;
        }
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  reverse() {
    super.reverse();
    if (this.tail) {
      this.tail.next = this.head;
    }
  }
}
