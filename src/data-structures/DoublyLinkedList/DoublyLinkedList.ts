import { IDoublyLinkedList } from "./interface";
import LinkedList from "../LinkedList/LinkedList";
import DoublyLinkedListNode from "./DoublyLinkedListNode";

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

  getTail(): DoublyLinkedListNode<T> | undefined {
    return this.tail;
  }

  clear () {
    super.clear();
    this.tail = undefined;
  }
}
