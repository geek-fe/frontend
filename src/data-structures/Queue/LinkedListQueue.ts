import { IQueue } from "./interface";
import LinkedList from "../LinkedList/LinkedList";

export default class LinkedListQueue<T> implements IQueue<T> {
  private items: LinkedList<T>;
  constructor() {
    this.items = new LinkedList<T>();
  }

  enqueue(...element: T[]): void {
    element.forEach(el => {
      this._add(el);
    });
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.removeAt(0);
  }

  peek(): T | undefined {
    const head = this.items.getHead();
    return head && head.element;
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  size(): number {
    return this.items.size();
  }

  clear(): void {
    this.items.clear();
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
