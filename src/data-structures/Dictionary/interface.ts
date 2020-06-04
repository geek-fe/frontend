export interface IDictionary<K, V> {
/**
 * @description 向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会 被新的值覆盖
 * @author fengshaojian
 * @param {K} key
 * @param {V} DictionaryKeyValuePair<K, V>
 * @returns {boolean}
 * @memberof IDictionary
 */
  set(key: K, value: V): boolean;
  /**
 * @description 通过使用键值作为参数来从字典中移除键值对应的数据值。
 * @author fengshaojian
 * @param {K} key
 * @memberof IDictionary
 */
  remove(key: K): boolean;
  /**
 * @description 如果某个键值存在于该字典中，返回 true，否则返回 false
 * @author fengshaojian
 * @param {K} key
 * @returns {boolean}
 * @memberof IDictionary
 */
  hasKey(key: K): boolean;
  /**
 * @description 通过以键值作为参数查找特定的数值并返回
 * @author fengshaojian
 * @param {*} key
 * @returns {T}
 * @memberof IDictionary
 */
  get(key: K): V | undefined;
  /**
 * @description 删除该字典中的所有值
 * @author fengshaojian
 * @memberof IDictionary
 */
  clear(): void;
  /**
 * @description 返回字典所包含值的数量。与数组的 length 属性类似
 * @author fengshaojian
 * @returns {number}
 * @memberof IDictionary
 */
  size(): number;
  /**
 * @description 在 size 等于零的时候返回 true，否则返回 false
 * @author fengshaojian
 * @returns {boolean}
 * @memberof IDictionary
 */
  isEmpty(): boolean;
  /**
 * @description 将字典所包含的所有键名以数组形式返回。
 * @author fengshaojian
 * @returns {string[]}
 * @memberof IDictionary
 */
  keys(): K[];
  /**
 * @description 将字典所包含的所有数值以数组形式返回
 * @author fengshaojian
 * @returns {DictionaryKeyValuePair<K, V>[]}
 * @memberof IDictionary
 */
  values(): V[];
  /**
 * @description 将字典中所有[键，值]对返回
 * @author fengshaojian
 * @returns {any[]}
 * @memberof IDictionary
 */
  entries(): DictionaryKeyValuePair<K, V>[];
  /**
 * @description 迭代字典中所有的键值对。callback 有三个参数: key 和 value, 当前字典，
 * 可以提供一个context来指定callback的上下文
 * @author fengshaojian
 * @param {*} callback
 * @memberof IDictionary
 */
  forEach(callback: (key: K, value: V, dictionary: IDictionary<K, V>) => void, thisArg?: any): void;

  /**
   * @description 将字典转为字符串
   * @author fengshaojian
   * @returns {string}
   * @memberof IDictionary
   */
  toString(): string;
}

export class DictionaryKeyValuePair<K, V> {
  constructor(public key: K, public value: V) { // eslint-disable-line
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
