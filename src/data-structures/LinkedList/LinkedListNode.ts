export default class LinkedListNode<T> {
  public element: T;
  public next: LinkedListNode<T> | undefined;
  constructor(element: T) {
    this.element = element;
    this.next = undefined;
  }
}
