export interface IStack<T> {
  items: T[];
  push(...elements: T[]): void;
  pop (element: T): T | undefined;
  peek(): T;
  isEmpty(): boolean;
  clear(): void;
  size(): number;
}
// export abstract class Stack<T> {
//   abstract push(...elements: T[]): void;
//   abstract pop (element: T): T | undefined;
//   abstract peek(): T;
//   abstract isEmpty(): boolean;
//   abstract clear(): void;
//   abstract size(): number;
// }
