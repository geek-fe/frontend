import { IStack } from "./interface";
export default class Stack<T> implements IStack<T> {
  private count: number = 0;
  private items: Record<number, T> = {};
  push(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return;
    }
    this.count--;
    const deleteValue = this.items[this.count];
    delete this.items[this.count];
    return deleteValue;
  }

  peek() {
    if (this.isEmpty()) return;
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    while (!this.isEmpty()) {
      this.pop();
    }
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let str = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      str = `${str},${this.items[i]}`;
    }
    return str;
  }

  toArray() {
    const arr: T[] = [];
    for (let i = 0; i < this.count; i++) {
      arr.push(this.items[i]);
    }
    return arr;
  }
}
