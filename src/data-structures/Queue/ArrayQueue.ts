import { IQueue } from "./interface";

export default class ArrayQueue<T> implements IQueue<T> {
  private items: T[] = [];
  enqueue(...element: T[]): void {
    this.items.push(...element);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    if (this.isEmpty()) return;
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toString(): string {
    return this.items.toString();
  }

  toArray(): T[] {
    return this.items;
  }
}
