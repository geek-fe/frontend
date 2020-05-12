import { IQueue } from "./interface";

export default class Queue<T> implements IQueue<T> {
  private items: Record<number, T> = {};
  private count: number = 0;
  private head: number = 0;
  enqueue(...element: T[]): void {
    element.forEach(el => {
      this._add(el);
    });
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return;
    const deleteElement = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return deleteElement;
  }

  peek(): T | undefined {
    if (this.isEmpty()) return;
    return this.items[this.head];
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count - this.head;
  }

  clear(): void {
    this.items = {};
    this.head = 0;
    this.count = 0;
  }

  toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    let str = `${this.items[this.head]}`;
    for (let i = this.head + 1; i < this.count; i++) {
      str = `${str},${this.items[i]}`;
    }
    return str;
  }

  toArray(): T[] {
    const arr: T[] = [];
    for (let i = this.head; i < this.count; i++) {
      arr.push(this.items[i]);
    }
    return arr;
  }

  private _add(element: T) {
    this.items[this.count] = element;
    this.count++;
  }
}
