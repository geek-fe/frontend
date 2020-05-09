import { IStack } from "./interface";

export default class ArrayStack<T> implements IStack<T> {
  private items: T[];
  constructor() {
    this.items = [];
  }

  push(...element: T[]) {
    this.items.push(...element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  toString() {
    return this.items.toString();
  }

  toArray() {
    return this.items;
  }
}
