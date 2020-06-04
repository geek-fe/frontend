import { IDictionary, DictionaryKeyValuePair } from "./interface";
import { defaultToString } from "../../utils/utils";

export default class Dictionary<K, V> implements IDictionary<K, V> {
  private table: Record<string, DictionaryKeyValuePair<K, V>> = {};

  constructor(private keyToString: (key: K) => string = defaultToString) {} //eslint-disable-line
  /**
   * @description 向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会 被新的值覆盖
   * @author fengshaojian
   * @param {K} key
   * @param {V} value
   * @returns {boolean}
   * @memberof Dictionary
   */
  set(key: K, value: V): boolean {
    if (key && value) {
      const tableKey = this.keyToString(key);
      this.table[tableKey] = new DictionaryKeyValuePair(key, value);
      return true;
    }
    return false;
  }

  /**
   * @description 通过使用键值作为参数来从字典中移除键值对应的数据值。
   * @author fengshaojian
   * @param {K} key
   * @returns {boolean}
   * @memberof Dictionary
   */
  remove(key: K): boolean {
    if (this.hasKey(key)) {
      delete this.table[this.keyToString(key)];
      return true;
    }
    return false;
  }

  /**
   * @description 如果某个键值存在于该字典中，返回 true，否则返回 false
   * @author fengshaojian
   * @param {K} key
   * @returns {boolean}
   * @memberof Dictionary
   */
  hasKey(key: K): boolean {
    return this.table[this.keyToString(key)] !== undefined;
  }

  /**
   * @description 通过以键值作为参数查找特定的数值并返回
   * @author fengshaojian
   * @param {K} key
   * @returns {(V | undefined)}
   * @memberof Dictionary
   */
  get(key: K): V | undefined {
    const tableKey = this.keyToString(key);
    const dictKeyValuePair = this.table[tableKey];
    return dictKeyValuePair && dictKeyValuePair.value;
  }

  /**
   * @description 删除该字典中的所有值
   * @author fengshaojian
   * @memberof Dictionary
   */
  clear(): void {
    this.table = {};
  }

  /**
   * @description 返回字典所包含值的数量。与数组的 length 属性类似
   * @author fengshaojian
   * @returns {number}
   * @memberof Dictionary
   */
  size(): number {
    return Object.keys(this.table).length;
  }

  /**
   * @description  在 size 等于零的时候返回 true，否则返回 false
   * @author fengshaojian
   * @returns {boolean}
   * @memberof Dictionary
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @description 将字典所包含的所有键名以数组形式返回。
   * @author fengshaojian
   * @returns {K[]}
   * @memberof Dictionary
   */
  keys(): K[] {
    return this.entries().map(v => v.key);
  }

  /**
   * @description 将字典所包含的所有数值以数组形式返回
   * @author fengshaojian
   * @returns {V[]}
   * @memberof Dictionary
   */
  values(): V[] {
    return this.entries().map(v => v.value);
  }

  /**
   * @description 将字典中所有[键，值]对返回
   * @author fengshaojian
   * @returns {DictionaryKeyValuePair<K, V>[]}
   * @memberof Dictionary
   */
  entries(): DictionaryKeyValuePair<K, V>[] {
    return Object.values(this.table);
  }

  /**
   * @description 迭代字典中所有的键值对。callback 有三个参数: key 和 value, 当前字典，
   * 可以提供一个context来指定callback的上下文
   * @author fengshaojian
   * @param {(key: K, value: V, dictionary: IDictionary<K, V>) => void} callback
   * @param {*} [thisArg]
   * @memberof Dictionary
   */
  forEach(callback: (key: K, value: V, dictionary: IDictionary<K, V>) => void, thisArg?: any): void {
    this.entries().forEach(keyValuePair => {
      callback.call(thisArg, keyValuePair.key, keyValuePair.value, this);
    });
  }

  /**
   * @description 将字典转为字符串
   * @author fengshaojian
   * @returns {string}
   * @memberof Dictionary
   */
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
