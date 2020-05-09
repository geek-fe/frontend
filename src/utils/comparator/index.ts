export type ComparatorFunction<T> = (a: T, b: T) => number;

export default class Comparator<T> {
  private compare: ComparatorFunction<T>;
  /**
   *Creates an instance of Comparator.
   * @author fengshaojian
   * @param {comparatorFunction<T>} comparatorFunction
   * @memberof Comparator
   */
  constructor(comparatorFunction?: ComparatorFunction<T>) {
    this.compare = comparatorFunction || Comparator.defaultcomparatorFunction;
  }

  /**
   * @description 默认比较函数 我只假设他是string或者number
   * @author fengshaojian
   * @static
   * @param {string|number} a
   * @param {string|number} b
   * @returns
   * @memberof Comparator
   */
  static defaultcomparatorFunction (a: any, b: any) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }

  /**
   * @description 比较a是否等于b
   * @author fengshaojian
   * @param {T} a
   * @param {T} b
   * @returns {boolean}
   * @memberof Comparator
   */
  equal(a: T, b: T) {
    return this.compare(a, b) === 0;
  }

  /**
   * @description 比较a是否小于b
   * @author fengshaojian
   * @param {T} a
   * @param {T} b
   * @returns {boolean}
   * @memberof Comparator
   */
  lessThan(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  /**
   * @description 比较a是否大于b
   * @author fengshaojian
   * @param {T} a
   * @param {T} b
   * @returns
   * @memberof Comparator
   */
  greaterThan(a: T, b: T) {
    return this.compare(a, b) > 0;
  }

  /**
   * @description 比较a是否小于等于b
   * @author fengshaojian
   * @param {T} a
   * @param {T} b
   * @returns
   * @memberof Comparator
   */
  lessThanOrEqual(a: T, b: T) {
    return this.lessThan(a, b) || this.equal(a, b);
  }

  /**
   * @description 比较a是否大于等于b
   * @author fengshaojian
   * @param {T} a
   * @param {T} b
   * @returns
   * @memberof Comparator
   */
  greaterThanOrEqual(a: T, b: T) {
    return this.greaterThan(a, b) || this.equal(a, b);
  }

  /**
   * @description 交换比较顺序
   * @author fengshaojian
   * @memberof Comparator
   */
  reverse() {
    const compareOriginal = this.compare;
    this.compare = (a, b) => compareOriginal(b, a);
  }
}
