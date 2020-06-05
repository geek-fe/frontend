import HashTable from "../HashTableLinearProbing";
describe("HashTable", () => {

  it("test HashTable methods", () => {
    const hashTable = new HashTable<string, string>();
    hashTable.put("Ygritte", "ygritte@email.com");
    hashTable.put("Jonathan", "jonathan@email.com");
    hashTable.put("Jamie", "jamie@email.com");
    hashTable.put("Jack", "jack@email.com");
    hashTable.put("Jasmine", "jasmine@email.com");
    hashTable.put("Jake", "jake@email.com");
    hashTable.put("Nathan", "nathan@email.com");
    hashTable.put("Athelstan", "athelstan@email.com");
    hashTable.put("Sue", "sue@email.com");
    hashTable.put("Aethelwulf", "aethelwulf@email.com");
    hashTable.put("Sargeras", "sargeras@email.com");
    expect(hashTable.get("Jamie")).toBe("jamie@email.com");
    expect(hashTable.get("Jonathan")).toBe("jonathan@email.com");
    expect(hashTable.get("Sue")).toBe("sue@email.com");
    expect(hashTable.get("Aethelwulf")).toBe("aethelwulf@email.com");
    const hashCode = hashTable.hashCode("Jonathan")
    expect(hashTable.hashCode("Jonathan")).toBe(hashCode);
    expect(hashTable.hashCode("Jamie")).toBe(hashCode);
    expect(hashTable.hashCode("Aethelwulf")).toBe(hashCode);
    expect(hashTable.hashCode("Sue")).toBe(hashCode);
    expect(hashTable.getTable()[hashCode]).toBeDefined();
    expect(hashTable.remove("Jamie")).toBeTruthy();
    expect(hashTable.remove("Jonathan")).toBeTruthy();
    expect(hashTable.remove("Sue")).toBeTruthy();
    expect(hashTable.remove("Aethelwulf")).toBeTruthy();
    expect(hashTable.getTable()[hashCode]).toBeUndefined();
  });
});