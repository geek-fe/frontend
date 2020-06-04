import { IHashTTable } from "./interface";
import { DictionaryKeyValuePair } from "../Dictionary/interface";
import { defaultToString } from "../../utils/utils";
import LinkedList from "../LinkedList/LinkedList";

/**
 * @description 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。它是解决冲突的
 * 最简单的方法，但是在 HashTable 实例之外还需要额外的存储空间。
 * @author fengshaojian
 * @export
 * @class HashTableSeparateChaining
 * @implements {IHashTTable<K, V>}
 * @template K
 * @template V
 */
export default class HashTableSeparateChaining<K, V> implements IHashTTable<K, V> {
  protected table: Record<string, LinkedList<DictionaryKeyValuePair<K, V>>> = {};
  constructor(protected keyToString: (key: K) => string = defaultToString) { } //eslint-disable-line

  /**
   * @description hashCode 算法
   * @author fengshaojian
   * @private
   * @param {K} key
   * @returns
   * @memberof HashTableSeparateChaining
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
   * @memberof HashTableSeparateChaining
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
   * @memberof HashTableSeparateChaining
   */
  hashCode(key: K) {
    return this.loseloseHashCode(key);
  }

  /**
   * @description 向散列表中添加新元素。如果 key 已经存在，那么已存在的 value 会 被新的值覆盖
   * @author fengshaojian
   * @param {K} key
   * @param {V} value
   * @returns
   * @memberof HashTableSeparateChaining
   */
  put(key: K, value: V) {
    if (key && value) {
      const index = this.hashCode(key);
      if (!this.table[index]) {
        this.table[index] = new LinkedList<DictionaryKeyValuePair<K, V>>();
      }
      this.table[index].push(new DictionaryKeyValuePair<K, V>(key, value));
      return true;
    }
    return false;
  }

  /**
   * @description 通过以键值作为参数查找特定的数值并返回
   * @author fengshaojian
   * @param {K} key
   * @returns
   * @memberof HashTableSeparateChaining
   */
  get(key: K) {
    const index = this.hashCode(key);
    const linkedList = this.table[index];
    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  /**
   * @description 通过使用键值作为参数来从散列表中移除键值对应的数据值。
   * @author fengshaojian
   * @param {K} key
   * @returns
   * @memberof HashTableSeparateChaining
   */
  remove(key: K) {
    const index = this.hashCode(key);
    const linkedList = this.table[index];
    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[index];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  /**
   * @description 返回散列表
   * @author fengshaojian
   * @returns
   * @memberof HashTableSeparateChaining
   */
  getTable() {
    return this.table;
  }

  /**
   * @description 在 size 等于零的时候返回 true，否则返回 false
   * @author fengshaojian
   * @returns
   * @memberof HashTableSeparateChaining
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * @description 返回散列表所包含值的数量。与数组的 length 属性类似
   * @author fengshaojian
   * @returns
   * @memberof HashTableSeparateChaining
   */
  size() {
    let count = 0;
    Object.values(this.table).forEach(linkedList => { count += linkedList.size(); });
    return count;
  }

  /**
   * @description 删除该散列表中的所有值
   * @author fengshaojian
   * @memberof HashTableSeparateChaining
   */
  clear() {
    this.table = {};
  }

  /**
   * @description 将散列表转为字符串
   * @author fengshaojian
   * @returns
   * @memberof HashTableSeparateChaining
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
