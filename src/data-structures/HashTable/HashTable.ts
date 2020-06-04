import { DictionaryKeyValuePair } from "../Dictionary/interface";
import { defaultToString } from "../../utils/utils";
import { IHashTTable } from "./interface";

export default class HashTable<K, V> implements IHashTTable<K, V> {
  protected table: Record<string, DictionaryKeyValuePair<K, V>> = {};
  constructor(protected keyToString: (key: K) => string = defaultToString) { } //eslint-disable-line

  /**
   * @description hashCode 算法
   * @author fengshaojian
   * @private
   * @param {K} key
   * @returns
   * @memberof HashTable
   */
  private loseloseHashCode(key: K) {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.keyToString(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  /**
   * @description hashCode 算法
   * @author fengshaojian
   * @private
   * @param {K} key
   * @returns
   * @memberof HashTable
   */
  private djb2HashCode(key: K) {
    const tableKey = this.keyToString(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }

  /**
   * @description 返回散列值
   * @author fengshaojian
   * @param {K} key
   * @returns
   * @memberof HashTable
   */
  hashCode(key: K) {
    return this.djb2HashCode(key);
  }

  /**
   * @description 向散列表中添加新元素。如果 key 已经存在，那么已存在的 value 会 被新的值覆盖
   * @author fengshaojian
   * @param {K} key
   * @param {V} value
   * @returns
   * @memberof HashTable
   */
  put(key: K, value: V) {
    if (key && value) {
      this.table[this.hashCode(key)] = new DictionaryKeyValuePair<K, V>(key, value);
      return true;
    }
    return false;
  }

  /**
   * @description 通过以键值作为参数查找特定的数值并返回
   * @author fengshaojian
   * @param {K} key
   * @returns
   * @memberof HashTable
   */
  get(key: K) {
    const keyValuePair = this.table[this.hashCode(key)];

    return keyValuePair && keyValuePair.value;
  }

  /**
   * @description 通过使用键值作为参数来从散列表中移除键值对应的数据值。
   * @author fengshaojian
   * @param {K} key
   * @returns
   * @memberof HashTable
   */
  remove(key: K) {
    const hash = this.hashCode(key);
    const keyValuePair = this.table[hash];
    if (keyValuePair) {
      delete this.table[hash];
      return true;
    }
    return false;
  }

  /**
   * @description 返回散列表
   * @author fengshaojian
   * @returns
   * @memberof HashTable
   */
  getTable() {
    return this.table;
  }

  /**
   * @description 在 size 等于零的时候返回 true，否则返回 false
   * @author fengshaojian
   * @returns
   * @memberof HashTable
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * @description 返回散列表所包含值的数量。与数组的 length 属性类似
   * @author fengshaojian
   * @returns
   * @memberof HashTable
   */
  size() {
    return Object.keys(this.table).length;
  }

  /**
   * @description 删除该散列表中的所有值
   * @author fengshaojian
   * @memberof HashTable
   */
  clear() {
    this.table = {};
  }

  /**
   * @description 将散列表转为字符串
   * @author fengshaojian
   * @returns
   * @memberof HashTable
   */
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const keys = Object.keys(this.table);
    let str = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      str = `${str},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
    }
    return str;
  }
}
