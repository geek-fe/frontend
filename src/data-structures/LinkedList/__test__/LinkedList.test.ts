import LinkedList from "../LinkedList";
describe("test LinkedList methods", () => {
  const linkedList = new LinkedList<number>();
  linkedList.push(10);
  linkedList.push(20);
  linkedList.push(30);
  test("test linkedList push insert size isEmpty getElementAt getHead indexOf method", () => {
    expect(linkedList.isEmpty()).toBeFalsy();
    expect(linkedList.size()).toBe(3);
    expect(linkedList.getElementAt(0)?.element).toBe(10);
    expect(linkedList.getHead()?.element).toEqual(10);
    expect(linkedList.indexOf(20)).toBe(1);
    linkedList.insert(40, 1);
    expect(linkedList.size()).toBe(4);
    expect(linkedList.indexOf(20)).toBe(2);

  });
  test("test linkedList remove removeAt getElementAt size isEmpty getHead indexOf method", () => {
    linkedList.remove(10);
    expect(linkedList.size()).toBe(3);
    expect(linkedList.indexOf(10)).toBe(-1);
    expect(linkedList.getElementAt(1)?.element).toBe(20);
    expect(linkedList.getHead()?.element).toEqual(40);
    linkedList.removeAt(2);
    expect(linkedList.size()).toBe(2);
    expect(linkedList.indexOf(30)).toBe(-1);
  });
  test("test linkedList toString toArray method", () => {
    expect(linkedList.toString()).toEqual("40,20");
    expect(linkedList.toArray().length).toBe(2);
  });
});
