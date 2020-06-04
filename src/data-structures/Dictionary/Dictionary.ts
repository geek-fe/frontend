import { IDictionary, DictionaryKeyValuePair } from "./interface";
import { defaultToString } from "../../utils/utils";

export default class Dictionary<K, V> implements IDictionary<K, V> {
  private table: Record<string, DictionaryKeyValuePair<K, V>> = {};

  constructor(private keyToString: (key: K) => string = defaultToString) {} //eslint-disable-line
  set(key: K, value: V): boolean {
    if (key && value) {
      const tableKey = this.keyToString(key);
      this.table[tableKey] = new DictionaryKeyValuePair(key, value);
      return true;
    }
    return false;
  }

  remove(key: K): boolean {
    if (this.hasKey(key)) {
      delete this.table[this.keyToString(key)];
      return true;
    }
    return false;
  }

  hasKey(key: K): boolean {
    return this.table[this.keyToString(key)] !== undefined;
  }

  get(key: K): V | undefined {
    const tableKey = this.keyToString(key);
    const dictKeyValuePair = this.table[tableKey];
    return dictKeyValuePair && dictKeyValuePair.value;
  }

  clear(): void {
    this.table = {};
  }

  size(): number {
    return Object.keys(this.table).length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  keys(): K[] {
    return this.entries().map(v => v.key);
  }

  values(): V[] {
    return this.entries().map(v => v.value);
  }

  entries(): DictionaryKeyValuePair<K, V>[] {
    return Object.values(this.table);
  }

  forEach(callback: (key: K, value: V, dictionary: IDictionary<K, V>) => void, thisArg?: any): void {
    this.entries().forEach(keyValuePair => {
      callback.call(thisArg, keyValuePair.key, keyValuePair.value, this);
    });
  }

  toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    const keyValuePairs = this.entries();
    let str = `${keyValuePairs[0].toString()}`;
    for (let i = 1; i < keyValuePairs.length; i++) {
      str = `${str},${keyValuePairs[i].toString()}`;
    }
    return str;
  }
}
