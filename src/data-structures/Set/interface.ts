/**
 * @description Set接口
 * @author fengshaojian
 * @export
 * @interface ISet
 * @template T
 */
export interface ISet<T> {
  /**
   * @description 向集合添加一个新元素
   * @author fengshaojian
   * @param {T} value
   * @returns {boolean}
   * @memberof ISet
   */
  add(value: T): boolean;
  /**
   * @description 移除集合中的所有元素
   * @author fengshaojian
   * @memberof ISet
   */
  clear(): void;
  /**
   * @description 从集合移除一个元素
   * @author fengshaojian
   * @param {T} value
   * @returns {boolean}
   * @memberof ISet
   */
  delete(value: T): boolean;
  /**
   * @description 遍历集合
   * @author fengshaojian
   * @param {(value: T, value2: T, set: ISet<T>) => void} callbackfn
   * @param {*} [thisArg]
   * @memberof ISet
   */
  forEach(callbackfn: (value: T, value2: T, set: ISet<T>) => void, thisArg?: any): void;
  /**
   * @description 如果元素在集合中，返回 true，否则返回 false
   * @author fengshaojian
   * @param {T} value
   * @returns {boolean}
   * @memberof ISet
   */
  has(value: T): boolean;
  /**
   * @description 返回一个包含集合中所有值(元素)的数组
   * @author fengshaojian
   * @returns {T[]}
   * @memberof ISet
   */
  values(): T[];
  /**
   * @description 返回集合所包含元素的数量。它与数组的 length 属性类似
   * @type {number}
   * @memberof ISet
   */
  size(): number;
}
