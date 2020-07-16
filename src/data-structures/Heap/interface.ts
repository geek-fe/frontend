export interface IHeap<T> {
  /**
* @description 返回堆所包含值的数量。与数组的 length 属性类似
* @author fengshaojian
* @returns {number}
* @memberof IHeap
*/
  size(): number;
  /**
 * @description 在 size 等于零的时候返回 true，否则返回 false
 * @author fengshaojian
 * @returns {boolean}
 * @memberof IHeap
 */
  isEmpty(): boolean;

  /**
* @description 删除该堆中的所有值
* @author fengshaojian
* @memberof IHeap
*/
  clear(): void;

  /**
   * @description 像堆中插入值
   * @author fengshaojian
   * @param {T} value
   * @returns {boolean}
   * @memberof IHeap
   */
  insert(value: T): boolean;
  /**
   * @description 移出堆中的最小值（最小堆）或者最大值（最大堆）
   * @author fengshaojian
   * @returns {T}
   * @memberof IHeap
   */
  extract(): T | undefined;
  /**
   * @description 查找堆中最小值（最小堆）或者最大值（最大堆）
   * @author fengshaojian
   * @returns {T}
   * @memberof IHeap
   */
  findMinimum(): T | undefined;
  /**
   * @description 将堆转为数组
   * @author fengshaojian
   * @returns {T[]}
   * @memberof IHeap
   */
  toArray(): T[];
  /**
   * @description 将数组堆化
   * @author fengshaojian
   * @returns {T[]}
   * @memberof IHeap
   */
  heapify(arr: T[]): T[];
}
