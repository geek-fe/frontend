import LinkedListNode from "../LinkedList/LinkedListNode";
export default class DoublyLinkedListNode<T> extends LinkedListNode<T> {
  constructor(element: T, public next?: DoublyLinkedListNode<T>, public prev?: DoublyLinkedListNode<T>) {
    super(element);
  }
}
