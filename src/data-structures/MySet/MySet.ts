import { ISet } from "./interface";

export default class MySet<T> implements ISet<T> {
  private items: Record<string, T> = {};

  /**
   * @description 向集合添加一个新元素
   * @author fengshaojian
   * @param {T} value
   * @returns {boolean}
   * @memberof MySet
   */
  add(value: T): boolean {
    if (!this.has(value)) {
      this.items[JSON.stringify(value)] = value;
      return true;
    }
    return false;
  }

  /**
   * @description  移除集合中的所有元素
   * @author fengshaojian
   * @memberof MySet
   */
  clear(): void {
    this.items = {};
  }

  /**
   * @description 从集合移除一个元素
   * @author fengshaojian
   * @param {T} value
   * @returns {boolean}
   * @memberof MySet
   */
  delete(value: T): boolean {
    if (this.has(value)) {
      delete this.items[JSON.stringify(value)];
      return true;
    }
    return false;
  }

  /**
   * @description 遍历集合
   * @author fengshaojian
   * @param {(value: T, value2: T, set: MySet<T>) => void} callbackfn
   * @param {*} [thisArg]
   * @memberof MySet
   */
  forEach(callbackfn: (value: T, value2: T, set: MySet<T>) => void, thisArg?: any): void {
    this.values().forEach(el => {
      callbackfn.call(thisArg, el, el, this);
    });
  }

  /**
   * @description 如果元素在集合中，返回 true，否则返回 false
   * @author fengshaojian
   * @param {T} value
   * @returns {boolean}
   * @memberof MySet
   */
  has(value: T): boolean {
    if (Object.prototype.hasOwnProperty.call(this.items, JSON.stringify(value))) {
      return true;
    }
    return false;
  }

  /**
   * @description 返回一个包含集合中所有值(元素)的数组
   * @author fengshaojian
   * @returns
   * @memberof MySet
   */
  values() {
    return Object.values(this.items);
  }

  /**
 * @description 返回集合所包含元素的数量。它与数组的 length 属性类似
 * @memberof MySet
 */
  size() {
    return Object.keys(this.items).length;
  };

  /**
   * @description 返回集合是否为空
   * @author fengshaojian
   * @returns
   * @memberof MySet
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * @description 转为字符串
   * @author fengshaojian
   * @memberof MySet
   */
  toString() {
    if (this.isEmpty()) {
      return "";
    }
    const values = this.values();
    let str = `${values[0]}`;
    for (let i = 1; i < values.length; i++) {
      str = `${str},${(values[i] as any).toString()}`;
    }
    return str;
  }

  /**
   * @description 并集
   * @author fengshaojian
   * @param {MySet<T>} set
   * @memberof MySet
   */
  union(set: MySet<T>) {
    const unionSet = new MySet<T>();
    set.forEach(v => unionSet.add(v));
    this.forEach(v => unionSet.add(v));
    return unionSet;
  }

  /**
   * @description 交集
   * @author fengshaojian
   * @param {MySet<T>} set
   * @returns
   * @memberof MySet
   */
  intersect(set: MySet<T>) {
    let smallSet: MySet<T>, largeSet: MySet<T>;
    const intersectionSet = new MySet<T>();
    if (this.size() > set.size()) {
      smallSet = set;
      largeSet = this;
    } else {
      smallSet = this;
      largeSet = set;
    }
    smallSet.forEach(v => {
      if (largeSet.has(v)) {
        intersectionSet.add(v);
      }
    });
    return intersectionSet;
  }

  /**
   * @description 差集
   * @author fengshaojian
   * @param {MySet<T>} set
   * @returns
   * @memberof MySet
   */
  difference(set: MySet<T>) {
    const differenceSet = new MySet<T>();
    this.forEach(el => {
      if (!set.has(el)) {
        differenceSet.add(el);
      }
    });
    return differenceSet;
  }

  /**
   * @description 子集
   * @author fengshaojian
   * @param {MySet<T>} set
   * @returns
   * @memberof MySet
   */
  isSubsetOf(set: MySet<T>) {
    if (this.size() > set.size()) {
      return false;
    }
    let isSubset = true;
    this.forEach(v => {
      if (!set.has(v)) {
        isSubset = false;
      }
    });
    return isSubset;
  }
}
