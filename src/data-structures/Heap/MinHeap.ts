import { IHeap } from "./interface";
import Comparator, { ComparatorFunction } from "@/utils/comparator";
import { swap } from "@/utils/utils";

export class MinHeap<T> implements IHeap<T> {
  protected heap: T[] = [];
  /**
* @description 比较树的方法
* @protected
* @type {ComparatorFunction<T>}
* @memberof LinkedList
*/
  protected compare: Comparator<T>;
  constructor(compareFunction?: ComparatorFunction<T>) {
    this.compare = new Comparator<T>(compareFunction);
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.size() <= 0;
  }

  clear(): void {
    this.heap = [];
  }

  insert(value: T): boolean {
    if (value) {
      const index = this.heap.length;
      this.heap.push(value);
      this.siftUp(index);
      return true;
    }
    return false;
  }

  extract(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop() as T;
    this.siftDown(0);
    return removedValue;
  }

  findMinimum(): T | undefined {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  toArray(): T[] {
    return this.heap;
  }

  heapify(arr: T[]): T[] {
    if (arr) {
      this.heap = arr;
    }

    const maxIndex = Math.floor(this.size() / 2) - 1;

    for (let i = 0; i <= maxIndex; i++) {
      this.siftDown(i);
    }

    return this.heap;
  }

  private siftUp(index: number) {
    let parent = this.getParentIndex(index);
    while (index > 0 && parent && this.compare.lessThan(this.heap[index], this.heap[parent])) {
      swap(this.heap, parent, index); // 如果小于则交换位置
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  private siftDown(index: number) {
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    let element = index;
    const size = this.size();
    if (left < size && this.compare.greaterThan(this.heap[element], this.heap[left])) {
      element = left;
    }
    if (right < size && this.compare.greaterThan(this.heap[element], this.heap[right])) {
      element = right;
    }
    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }

  private getParentIndex(index: number) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  private getLeftIndex(index: number) {
    return 2 * index + 1;
  }

  private getRightIndex(index: number) {
    return 2 * index + 2;
  }
}
