import { IBinarySearchTree } from "./interface";
import BinarySearchTreeNode from "./BinarySearchTreeNode";
import Comparator, { ComparatorFunction } from "../../utils/comparator";

export default class BinarySearchTree<T> implements IBinarySearchTree<T> {
  private root: BinarySearchTreeNode<T> | null;
  /**
 * @description 比较树的方法
 * @protected
 * @type {ComparatorFunction<T>}
 * @memberof LinkedList
 */
  protected compare: Comparator<T>;
  constructor(compareFunction?: ComparatorFunction<T>) {
    this.root = null;
    this.compare = new Comparator<T>(compareFunction);
  }

  insert(value: T): void {
    throw new Error("Method not implemented.");
  }

  search(value: T): boolean {
    throw new Error("Method not implemented.");
  }

  inOrderTraverse(): void {
    throw new Error("Method not implemented.");
  }

  preOrderTraverse(): void {
    throw new Error("Method not implemented.");
  }

  postOrderTraverse(): void {
    throw new Error("Method not implemented.");
  }

  min(): T {
    throw new Error("Method not implemented.");
  }

  max(): T {
    throw new Error("Method not implemented.");
  }

  remove(value: T): void {
    throw new Error("Method not implemented.");
  }
}
