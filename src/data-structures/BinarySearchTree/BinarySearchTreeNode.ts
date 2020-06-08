export default class BinarySearchTreeNode<T> {
  private left: BinarySearchTreeNode<T> | null = null;
  private right: BinarySearchTreeNode<T> | null = null;
  constructor(public value: T) {} // eslint-disable-line
}
