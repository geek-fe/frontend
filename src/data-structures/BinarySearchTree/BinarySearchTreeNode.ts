export default class BinarySearchTreeNode<T> {
  public left: BinarySearchTreeNode<T> | null = null;
  public right: BinarySearchTreeNode<T> | null = null;
  constructor(public value: T) {} // eslint-disable-line
}
