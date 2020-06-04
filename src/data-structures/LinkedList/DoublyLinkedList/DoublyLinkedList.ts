import LinkedList from "../LinkedList";
import DoublyLinkedListNode from "./DoublyLinkedListNode";
import { IDoublyLinkedList } from "./interface";

export default class DoublyLinkedList<T> extends LinkedList<T> implements IDoublyLinkedList<T> {
  protected tail: DoublyLinkedListNode<T> | undefined;
  protected head: DoublyLinkedListNode<T> | undefined;

  push(element: T) {
    const node = new DoublyLinkedListNode<T>(element);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      (this.tail as DoublyLinkedListNode<T>).next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.count++;
  }

  insert(element: T, index: number): boolean {
    if (index >= 0 && index < this.count) {
      const node = new DoublyLinkedListNode<T>(element);
      if (index === 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = this.head;
          this.head.prev = node;
          this.head = node;
        }
      } else if (index === this.count) {
        node.prev = this.tail;
        (this.tail as DoublyLinkedListNode<T>).next = node;
        this.tail = node;
      } else {
        const prev = this.getElementAt(index - 1) as DoublyLinkedListNode<T>;
        const current = prev.next as DoublyLinkedListNode<T>;
        node.next = current;
        node.prev = prev;
        prev.next = node;
        current.prev = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index: number): T | undefined {
    if (index >= 0 && index < this.count) {
      let current = this.head;
      if (index === 0) {
        this.head = (this.head as DoublyLinkedListNode<T>).next;
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          (this.head as DoublyLinkedListNode<T>).prev = undefined;
        }
      } else if (index === this.count - 1) {
        current = this.tail as DoublyLinkedListNode<T>;
        this.tail = current.prev;
        this.tail && (this.tail.next = undefined);
      } else {
        current = this.getElementAt(index) as DoublyLinkedListNode<T>;
        (current.prev as DoublyLinkedListNode<T>).next = current.next;
        (current.next as DoublyLinkedListNode<T>).prev = current.prev;
      }
      this.count--;
      return current && current.element;
    }
    return undefined;
  }

  getElementAt(index: number): DoublyLinkedListNode<T> | undefined {
    return super.getElementAt(index);
  }

  getHead(): DoublyLinkedListNode<T> | undefined {
    return super.getHead();
  }

  getTail(): DoublyLinkedListNode<T> | undefined {
    return super.getTail();
  }

  toArray(): DoublyLinkedListNode<T>[] {
    return super.toArray();
  }

  reverse(): void {
    let current = this.head;
    let prev: DoublyLinkedListNode<T> | undefined;

    let next: DoublyLinkedListNode<T> | undefined;

    while (current) {
      // 存储当前元素的下一个引用
      next = current.next;
      // 存储当前元素的上一个引用
      prev = current.prev;
      // 更新当前元素的上一个下一个引用
      current.next = prev;
      current.prev = next;
      // 迭代
      prev = current;
      current = next;
    }
    // 重置首尾
    this.tail = this.head;
    this.head = prev;
  }
}
