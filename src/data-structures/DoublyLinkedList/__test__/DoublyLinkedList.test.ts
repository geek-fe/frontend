import DoublyLinkedList from "../DoublyLinkedList";
describe("test doublyLinkedList methods", () => {
  const doublyLinkedList = new DoublyLinkedList<number>();
  doublyLinkedList.push(10);
  doublyLinkedList.push(20);
  doublyLinkedList.push(30);
  test("test doublyLinkedList push insert size isEmpty getElementAt getHead indexOf method", () => {
    expect(doublyLinkedList.isEmpty()).toBeFalsy();
    expect(doublyLinkedList.size()).toBe(3);
    expect(doublyLinkedList.getTail()?.element).toBe(30);
    expect(doublyLinkedList.getElementAt(0)?.element).toBe(10);
    expect(doublyLinkedList.getHead()?.element).toEqual(10);
    expect(doublyLinkedList.indexOf(20)).toBe(1);
    doublyLinkedList.insert(40, 1);
    expect(doublyLinkedList.size()).toBe(4);
    expect(doublyLinkedList.indexOf(20)).toBe(2);

  });
  test("test doublyLinkedList remove removeAt getElementAt size isEmpty getHead indexOf method", () => {
    doublyLinkedList.remove(10);
    expect(doublyLinkedList.size()).toBe(3);
    expect(doublyLinkedList.indexOf(10)).toBe(-1);
    expect(doublyLinkedList.getElementAt(1)?.element).toBe(20);
    expect(doublyLinkedList.getHead()?.element).toEqual(40);
    doublyLinkedList.removeAt(2);
    expect(doublyLinkedList.size()).toBe(2);
    expect(doublyLinkedList.indexOf(30)).toBe(-1);
  });
  test("test doublyLinkedList toString toArray method", () => {
    expect(doublyLinkedList.toString()).toEqual("40,20");
    expect(doublyLinkedList.toArray().length).toBe(2);
  });
});
