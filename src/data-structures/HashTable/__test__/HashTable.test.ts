import HashTable from "../HashTable";

describe("test HashTable", () => {
  test("test HashTable methods", () => {
    const hash = new HashTable<string, string>(); 
    expect(hash.isEmpty()).toBeTruthy();
    expect(hash.size()).toBe(0);
    hash.put('Gandalf', 'gandalf@email.com');
    hash.put('John', 'johnsnow@email.com'); 
    hash.put('Tyrion', 'tyrion@email.com');
    expect(hash.isEmpty()).toBeFalsy();
    expect(hash.size()).toBe(3);
    expect(hash.get("John")).toEqual("johnsnow@email.com");
    expect(hash.get("Gandalf")).toEqual("gandalf@email.com");
    expect(hash.get("Tyrion")).toEqual("tyrion@email.com");
    expect(hash.get("Tyrion22")).toBeUndefined();
    expect(hash.remove("John")).toBeTruthy();
    expect(hash.get("John")).toBeUndefined();
    expect(hash.size()).toBe(2);
    hash.clear()
    expect(hash.isEmpty()).toBeTruthy();
    expect(hash.size()).toBe(0);
  });
});
