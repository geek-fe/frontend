import { IStack } from "./interface";
import LinkedList from "../LinkedList/LinkedList";

export default class LinkedListStack<T> implements IStack<T> {
  private items: LinkedList<T>;
  constructor() {
    this.items = new LinkedList<T>();
  }

  push(...elements: T[]): void {
    for (let i = 0; i < elements.length; i++) {
      this._add(elements[i]);
    }
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.removeAt(this.size() - 1);
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const el = this.items.getTail();
    return el && el.element;
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  clear(): void {
    this.items.clear();
  }

  size(): number {
    return this.items.size();
  }

  toString(): string {
    return this.items.toString();
  }

  toArray(): T[] {
    return this.items.toArray().map(item => item.element);
  }

  private _add(element: T) {
    this.items.push(element);
  }
}
