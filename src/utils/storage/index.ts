type ValueType = {
  value: any;
  expires: number;
}
const toMillisecond = (day: number) => day * 24 * 60 * 60 * 1000;

export default class MyStorage {
  private static storage: Storage = window.localStorage;
  /**
   * @description 判断一个时间是否过期
   * @author fengshaojian
   * @private
   * @static
   * @param {number} time
   * @returns {boolean}
   * @memberof MyStorage
   */
  private static isExpired(time: number): boolean {
    const now = Date.now();
    return time < now;
  }

  /**
   * @description 设置作用对象
   * @author fengshaojian
   * @static
   * @param {Storage} storage
   * @memberof MyStorage
   */
  public static setStorage(storage: Storage) {
    MyStorage.storage = storage;
  }

  /**
   * @description 往Storage里面存入一个值
   * @author fengshaojian
   * @static
   * @param {string} arg
   * @param {*} value
   * @param {number} [expires]
   * @memberof MyStorage
   */
  public static set(arg: string, value: any, expires?: number): void;
  /**
   * @description 批量往Storage里面存入值
   * @author fengshaojian
   * @static
   * @param {Record<string, any>} arg
   * @memberof MyStorage
   */
  public static set(arg: Record<string, any>): void;
  public static set(arg: string | Record<string, any>, ...rest: any[]): void {
    const now = Date.now();
    if (typeof arg === "string") {
      if (!rest.length) throw new Error("你必须提供第二个参数来作为值使用");
      if (rest.length === 2 && (typeof rest[1] !== "number" || isNaN(rest[1]))) throw new Error("第二个参数必须是一个数值来作为过期时间");
      if (rest.length === 2 && rest[1] <= 0) throw new Error("你设置了一个过期的时间");
      if (rest.length > 2) throw new Error("最多只能传入3个参数");
      const value = rest[0];
      const expires = rest[1];
      const val: ValueType = { value, expires: expires ? now + toMillisecond(expires) : -1 };
      MyStorage.storage.setItem(arg, JSON.stringify(val));
    } else {
      const outerExpires = arg.expires as number;
      delete arg.expires;
      for (const k in arg) {
        const value = arg[k];
        const realVal = value.value || value;
        const expires = value.expires || outerExpires;
        if (expires && expires <= 0) {
          console.warn("你设置了一个过期的时间");
          continue;
        }
        const val: ValueType = { value: realVal, expires: expires ? now + toMillisecond(expires) : -1 };
        MyStorage.storage.setItem(k, JSON.stringify(val));
      }
    }
  }

  /**
   * @description 获取Storgae里面的所有值
   * @author fengshaojian
   * @static
   * @returns {*}
   * @memberof MyStorage
   */
  public static get(): any;
  /**
   * @description 根据key获取Storage里面的值
   * @author fengshaojian
   * @static
   * @param {string} key
   * @returns {*}
   * @memberof MyStorage
   */
  public static get(key: string): any;
  public static get(key?: string): any {
    if (key) {
      let value = MyStorage.storage.getItem(key) as any;
      if (value) {
        if (value[0] === "{" && value[value.length - 1] === "}" && value.indexOf("value") === 2 && value.includes("expires")) {
          value = JSON.parse(value) as ValueType;
          const expires = value.expires;
          if (expires !== -1 && MyStorage.isExpired(expires)) {
            MyStorage.storage.removeItem(key);
            console.warn("The key " + key + " has been expired");
            return;
          } else {
            return value.value;
          }
        }
        return value;
      }
    } else {
      const allValue: Record<string, any> = {};
      for (let i = 0; i < MyStorage.storage.length; i++) {
        const key = MyStorage.storage.key(i) as string;
        const val = MyStorage.storage.getItem(key) as string;
        let itemValue;
        if (val[0] === "{" && val[val.length - 1] === "}" && val.indexOf("value") === 2 && val.includes("expires")) {
          itemValue = JSON.parse(val);
        } else {
          itemValue = val;
        }
        if (typeof itemValue === "string") {
          allValue[key] = itemValue;
        } else {
          const expires = itemValue.expires as number;
          if (expires !== -1 && MyStorage.isExpired(expires)) {
            MyStorage.storage.removeItem(key);
            console.warn("The key " + key + " has been expired");
          } else {
            allValue[key] = itemValue.value;
          }
        }
      }
      return allValue;
    }
  }

  /**
   * @description 移除Storage里面所有的值
   * @author fengshaojian
   * @static
   * @memberof MyStorage
   */
  public static remove(): void;
  /**
   * @description 根据key移除Storage里面的值
   * @author fengshaojian
   * @static
   * @param {string} key
   * @memberof MyStorage
   */
  public static remove(key: string): void;
  public static remove(key?: string) {
    if (!key && key !== "") {
      MyStorage.storage.clear();
    } else {
      MyStorage.storage.removeItem(key);
    }
  }

  /**
   * @description 遍历整个Storage
   * @author fengshaojian
   * @static
   * @param {(key: string, value: any) => void} callback
   * @memberof MyStorage
   */
  public static each(callback: (key: string, value: any) => void): void {
    const allValue = MyStorage.get();
    for (const key in allValue) {
      callback(key, allValue[key]);
    }
  }
}
