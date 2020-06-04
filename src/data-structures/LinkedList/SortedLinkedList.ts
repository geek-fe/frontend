import LinkedList from "./LinkedList";

/**
 * @description 升序链表
 * @author fengshaojian
 * @export
 * @class SortedLinkedList
 * @extends {LinkedList<T>}
 * @template T
 */
export default class SortedLinkedList<T> extends LinkedList<T> {
  /**
   * @description 向链表尾部添加元素
   * @author fengshaojian
   * @param {T} element
   * @memberof SortedLinkedList
   */
  push(element: T) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      this.insert(element, index);
    }
  }

  /**
   * @description 向链表任意正确位置插入元素
   * @author fengshaojian
   * @param {T} element
   * @param {number} index
   * @returns {boolean}
   * @memberof SortedLinkedList
   */
  insert(element: T, index: number = 0): boolean {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    index = this.getIndexNextSortedElement(element);
    return super.insert(element, index);
  }

  /**
   * @description 通过传入的元素值与现有值对比，返回正确的位置
   * @author fengshaojian
   * @private
   * @param {T} element
   * @returns
   * @memberof SortedLinkedList
   */
  private getIndexNextSortedElement(element: T) {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
      if (this.compare.lessThan(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
}
