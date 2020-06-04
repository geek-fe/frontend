export interface IHashTTable<K, V> {

  /**
 * @description 向散列表中添加新元素。如果 key 已经存在，那么已存在的 value 会 被新的值覆盖
 * @author fengshaojian
 * @param {K} key
 * @param {V} DictionaryKeyValuePair<K, V>
 * @returns {boolean}
 * @memberof IHashTTable
 */
  put(key: K, value: V): boolean;
  /**
 * @description 通过使用键值作为参数来从散列表中移除键值对应的数据值。
 * @author fengshaojian
 * @param {K} key
 * @memberof IHashTTable
 */
  remove(key: K): boolean;
  /**
* @description 通过以键值作为参数查找特定的数值并返回
* @author fengshaojian
* @param {*} key
* @returns {T}
* @memberof IHashTTable
*/
  get(key: K): V | undefined;
  /**
 * @description 删除该散列表中的所有值
 * @author fengshaojian
 * @memberof IHashTTable
 */
  clear(): void;
  /**
 * @description 返回散列表所包含值的数量。与数组的 length 属性类似
 * @author fengshaojian
 * @returns {number}
 * @memberof IHashTTable
 */
  size(): number;
  /**
 * @description 在 size 等于零的时候返回 true，否则返回 false
 * @author fengshaojian
 * @returns {boolean}
 * @memberof IHashTTable
 */
  isEmpty(): boolean;
  /**
 * @description 返回散列值
 * @author fengshaojian
 * @returns {boolean}
 * @memberof IHashTTable
 */
  hashCode(key: K): number;
  /**
   * @description 将散列表转为字符串
   * @author fengshaojian
   * @returns {string}
   * @memberof IHashTTable
   */
  toString(): string;
}
