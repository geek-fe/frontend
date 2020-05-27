import LinkedListNode from "../LinkedList/LinkedListNode";

export default class DoublyLinkedListNode<T> extends LinkedListNode<T> {
  constructor(public element: T, public next?: DoublyLinkedListNode<T>, public prev?: DoublyLinkedListNode<T>) {
    super(element, next);
    this.prev = prev;
  }
}
