import LinkedList from "../SortedLinkedList";
describe("test LinkedList methods", () => {
  test("test linkedList push insert size isEmpty getElementAt getHead getTail indexOf method", () => {
    const linkedList = new LinkedList<number>();
    expect(linkedList.isEmpty()).toBeTruthy();
    expect(linkedList.size()).toBe(0);
    linkedList.push(10);
    expect(linkedList.getElementAt(0)?.next).toBeUndefined();
    expect(linkedList.getElementAt(0)?.element).toBe(10);
    expect(linkedList.getHead()?.element).toBe(10);
    expect(linkedList.getTail()?.element).toBe(10);
    expect(linkedList.indexOf(10)).toBe(0);
    expect(linkedList.size()).toBe(1);
    linkedList.push(9);
    expect(linkedList.getElementAt(0)?.element).toBe(9);
    expect(linkedList.getElementAt(0)?.next?.element).toBe(10);
    expect(linkedList.getElementAt(1)?.element).toBe(10);
    expect(linkedList.getHead()?.element).toBe(9);
    expect(linkedList.getTail()?.element).toBe(10);
    expect(linkedList.indexOf(10)).toBe(1);
    expect(linkedList.indexOf(9)).toBe(0);
    expect(linkedList.size()).toBe(2);
    // 因为升序所以下面代码不会 被添加到链表中
    linkedList.insert(30, 1);
    expect(linkedList.size()).toBe(2);
  });
});
