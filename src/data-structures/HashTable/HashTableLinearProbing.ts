import { IHashTTable } from "./interface";
import { DictionaryKeyValuePair } from "../Dictionary/interface";
import { defaultToString } from "../../utils/utils";

/**
 * @description 另一种解决冲突的方法是线性探查。之所以称作线性，是因为它处理冲突的方法是将元素直
 * 接存储到表中，而不是在单独的数据结构中。
 * @author fengshaojian
 * @export
 * @class HashTableLinearProbing
 * @implements {IHashTTable<K, V>}
 * @template K
 * @template V
 */
export default class HashTableLinearProbing<K, V> implements IHashTTable<K, V> {
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
    return this.loseloseHashCode(key);
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
      const index = this.hashCode(key);
      if (this.table[index] === undefined) { // 第一次直接插入正确位置
        this.table[index] = new DictionaryKeyValuePair<K, V>(key, value);
      } else { // 如果位置被占用了继续向后面寻找，直到找到空闲位置
        let pos = index + 1;
        while (this.table[pos]) {
          pos++;
        }
        this.table[pos] = new DictionaryKeyValuePair<K, V>(key, value); // 找到位置插入
      }
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
    const index = this.hashCode(key);
    if (this.table[index]) {
      if (this.table[index].key === key) { // 如果恰好找到
        return this.table[index].value;
      }
      let pos = index + 1;
      while (this.table[pos] && this.table[pos].key !== key) { // 没找到尝试往后找
        pos++;
      }
      if (this.table[pos] && this.table[pos].key === key) { // 找到最后，找到并返回
        return this.table[pos].value;
      }
    }
    return undefined; // 找不到直接返回undefined
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
    if (this.table[hash]) {
      if (this.table[hash].key === key) { // 刚好找到删除它，并查看这个删除是否有副作用
        delete this.table[hash];
        this.verifyRemoveSideEffect(key, hash);
        return true;
      }
      let index = hash + 1; // 没找到就开始迭代
      while (this.table[index] && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index); // 删除时，要看看此次删除是否有副作用
        return true;
      }
    }
    return false;
  }

  verifyRemoveSideEffect(key: K, removedPosition: number) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1; // 删除位置的下一个位置开始迭代
    while (this.table[index]) {
      const posHash = this.hashCode(this.table[index].key);
      // 因为同一个hash可能有很多个位置
      // 如果下一个值hash值比要删除的hash值要小或者他在删元素的位置后面，就把它复制到删除的位置，并删除原来那个位置
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
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
