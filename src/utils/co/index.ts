import { isPromise, isGeneratorFunction, isGenerator, getType } from "../utils";

/**
 * @description generator 自执行函数
 * @author fengshaojian
 * @export
 * @param {*} this
 * @param {(...args: any[]) => Generator<any, any, any>} gen
 * @param {...any[]} rest
 * @returns { Promise<any> }
 */
export default function co(this: any, gen: (...args: any[]) => Generator<any, any, any>, ...rest: any[]): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const it = gen.apply(this, rest);

    onFulfilled(); // eslint-disable-line
    function onFulfilled(res?: any) {
      let ret: any;
      try {
        ret = it.next(res);
      } catch (error) {
        return reject(error);
      }
      next(ret); // eslint-disable-line
    }
    function onRejected(error: Error) {
      let ret: any;
      try {
        ret = it.throw(error);
      } catch (error) {
        return reject(error);
      }
      next(ret); //eslint-disable-line
    }
    function next(this: any, ret: IteratorResult<any>) {
      if (ret.done) return resolve(ret.value);
      const value = toPromise.call(this, ret.value); // eslint-disable-line
      if (value) value.then(onFulfilled, onRejected); // 递归调用，将上一个promise返回的值，当作参数传给下一次迭代
    }

    function toPromise(this: any, value: any) {
      const type = getType(value);
      if (!value) return value;
      if (isPromise(value)) return value;
      if (isGeneratorFunction(value) || isGenerator(value)) return co.call(this, value);
      if (typeof value === "function") return thunkToPromise.call(this, value); // eslint-disable-line
      if (type === "Array") return arrayToPromise.call(this, value);  // eslint-disable-line
      if (type === "Object") return objectToPromise.call(this, value);  // eslint-disable-line
      return Promise.resolve(value);
    }
    function thunkToPromise(this: any, fn: Function) {
      return new Promise((resolve, reject) => {
        fn.call(this, (err: Error, res: any) => {
          if (err) return reject(err);
          resolve(res);
        });
      });
    }
    function arrayToPromise(this: any, value: any[]): Promise<any> {
      return Promise.all(value.map(toPromise, this));
    }
    function objectToPromise(this: any, value: Record<string, any>) {
      const results: Record<string, any> = {};
      const keys = Object.keys(value);
      const promises: Promise<any>[] = [];
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const promise = toPromise.call(this, value[key]);
        if (promise && isPromise(promise)) defer(promise, key); // eslint-disable-line
        else results[key] = value[key];
      }
      return Promise.all(promises).then(function () {
        return results;
      });

      function defer(promise: Promise<any>, key: string) {
        // predefine the key in the result
        results[key] = undefined;
        promises.push(promise.then(function (res) {
          results[key] = res;
        }));
      }
    }
  });
}
