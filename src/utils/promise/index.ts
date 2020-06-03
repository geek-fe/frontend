//                       .::::.
//                     .::::::::.
//                    :::::::::::
//                 ..:::::::::::'
//              '::::::::::::'
//                .::::::::::
//           '::::::::::::::..
//                ..::::::::::::.
//              ``::::::::::::::::
//               ::::``:::::::::'        .:::.
//              ::::'   ':::::'       .::::::::.
//            .::::'      ::::     .:::::::'::::.
//           .:::'       :::::  .:::::::::' ':::::.
//          .::'        :::::.:::::::::'      ':::::.
//         .::'         ::::::::::::::'         ``::::.
//     ...:::           ::::::::::::'              ``::.
//    ````':.          ':::::::::'                  ::::..
//                       '.:::::'                    ':'````..
//

import { getType } from "../utils";
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function resolvePromise(promise: MyPromise<any>, x: any, resolve: (v?: any) => void, reject: (r?: any) => void) {
  if (promise === x) return reject(new TypeError("循环引用了"));
  if (x instanceof MyPromise) { // eslint-disable-line
    if (x.status === PENDING) { // 如果是pending状态有可能被resolve掉, resolve的值得重新走一遍流程
      x.then(function (v) {
        resolvePromise(promise, v, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    let then;
    let called: boolean = false;
    try {
      then = x.then; // because x.then could be a getter
      if (typeof then === "function") { // 2.3.3.3
        try {
          then.call(x, (y: any) => { // 2.3.3.3.1
            if (called) return; // 2.3.3.3.3
            called = true;
            return resolvePromise(promise, y, resolve, reject);
          }, (r: any) => { // 2.3.3.3.2
            if (called) return; // 2.3.3.3.3
            called = true;
            return reject(r);
          });
        } catch (error) {// 2.3.3.3.4
          if (called) return; // 2.3.3.3.4.1
          called = true;
          return reject(error); // 2.3.3.3.4.2
        }
      } else {
        return resolve(x);
      }
    } catch (error) {
      return reject(error);
    }
  } else {
    return resolve(x);
  }
}
function defaultFulfilled(v?: any) { return v; }
function defaultRejected(r: any) { throw r; }

/**
 * @description 手写一个符合promise A+规范的promise
 * @author fengshaojian
 * @export
 * @class MyPromise
 * @template T
 */
export default class MyPromise<T> {
  public status: "pending" | "fulfilled" | "rejected" = PENDING;
  private value: T | PromiseLike<T> | undefined = undefined;
  private reason: any = undefined;
  private resolveCallbacks: any[] = [];
  private rejectCallbacks: any[] = [];
  constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    const resolve = (value?: T | PromiseLike<T>) => {
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = FULFILLED;
          this.value = value;
          this.resolveCallbacks.forEach(fn => fn()); // 发布
        }
      }, 0);
    };
    const reject = (reason?: any) => {
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = REJECTED;
          this.reason = reason;
          if (this.rejectCallbacks.length === 0) {
            console.error(reason);
          }
          this.rejectCallbacks.forEach(fn => fn()); // 发布
        }
      }, 0);
      
    };
    try {
      // 用户可能在executor直接抛出一个错误
      executor(resolve, reject);
    } catch (error) {
      // 如果出错直接reject
      reject(error);
    }
  }

  /**
   * @description then 方法接受两个参数 成功回调和失败回调，都是可选，如果不传，默认传递上一个then的返回值
   * @author fengshaojian
   * @param {((value?: any) => any)} [onFulfilled=defaultFulfilled]
   * @param {((reason: any) => any)} [onRejected=defaultRejected]
   * @returns
   * @memberof MyPromise
   */
  then(onFulfilled: ((value?: any) => any) = defaultFulfilled, onRejected: ((reason: any) => any) = defaultRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : defaultFulfilled;
    onRejected = typeof onRejected === "function" ? onRejected : defaultRejected;
    let promise2: MyPromise<any>;
    if (this.status === FULFILLED) { // 只有在fulfilled状态下才调用onFulfilled方法
      promise2 = new MyPromise<any>((resolve, reject) => {
        setTimeout(() => { // 规范上定义then方法里面最佳实践是异步执行的, 刚好这里resolvePromise方法里面的promise2参数需要整个promise创建完毕才能拿到
          try {
            // x 可能有多种值，或许是个普通的值，或许是一个promise或许是一个带有then
            // 方法的对象 所以需要一个辅助函数来做处理, 调用onFulfilled也有可能报错
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    } else if (this.status === REJECTED) { // 只有在rejected状态下才调用onRejected方法
      promise2 = new MyPromise<any>((resolve, reject) => {
        setTimeout(() => { // 规范上定义then方法里面最佳实践是异步执行的, 刚好这里resolvePromise方法里面的promise2参数需要整个promise创建完毕才能拿到
          try {
            // x 可能有多种值，或许是个普通的值，或许是一个promise或许是一个带有then
            // 方法的对象 所以需要一个辅助函数来做处理, 调用onRejected也有可能报错
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    } else {
      // 走到这里说明他是pending状态，考虑这种情况 new MyPromise((resolve, reject) => setTimeout(() => resolve(1) , 10000)).then(() => {}, () => {})
      // 10秒之后才resolve，此时需要把这个onFulfilled放到一个数组里面，等到真正resolve的时候再去执行，同理reject也是
      promise2 = new MyPromise<any>((resolve, reject) => {
        this.resolveCallbacks.push(() => { // 订阅
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
          } catch (error) {
            reject(error);
          }
        });
        this.rejectCallbacks.push(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
          } catch (error) {
            reject(error);
          }
        });
      });
    }
    return promise2;
  }

  /**
   * @description catch 方法只是 then 方法的一个语法糖
   * @author fengshaojian
   * @param {(e: any) => void} onRejected
   * @returns
   * @memberof MyPromise
   */
  catch(onRejected: (e: any) => void) {
    return this.then(undefined, onRejected);
  }

  /**
   * @description finally 方法跟try catch finally 语法的 finally 方法一样，不管成功与失败都会执行回调函数
   * @author fengshaojian
   * @param {() => void} callback
   * @returns
   * @memberof MyPromise
   */
  finally(callback: any) {
    if (getType(callback) === "Function") {
      // 不管成功与失败都会去执行callback, 并将前面得值传到下一个promise中，而callback没有任何参数，所以在finally里面执行的是与状态无关的代码
      return this.then(
        value => MyPromise.resolve(callback()).then(() => value),
        reason => MyPromise.resolve(callback()).then(() => { throw reason; })
      );
    }
    return this.then(callback, callback);
  }

  /**
   * @description done方法链到Promise链的最后，它就能够捕获前面未处理的错误，
   * @author fengshaojian
   * @returns
   * @memberof MyPromise
   */
  done() {
    return this.catch(function (e) { // 此处一定要确保这个函数不能再出错
      console.error(e);
    });
  }

  /**
   * @description 静态resolve方法
   * @author fengshaojian
   * @static
   * @param {*} value
   * @returns
   * @memberof MyPromise
   */
  static resolve(value: any): MyPromise<any> {
    if (value instanceof MyPromise) {
      return value;
    }
    try {
      if (getType(value) === "Object" || getType(value) === "Function") {
        const then = value.then; // 注意：如果then是个属性，只允许调用一次。
        if (getType(then) === "Function") {
          return new MyPromise(then.bind(value)); // 调用then
        }
      }
    } catch (e) {
      return MyPromise.reject(e);
    }
    return new MyPromise(resolve => resolve(value));
  }

  /**
   * @description 静态reject
   * @author fengshaojian
   * @static
   * @param {*} reason
   * @returns
   * @memberof MyPromise
   */
  static reject(reason: any) {
    return new MyPromise((_, reject) => reject(reason));
  }

  /**
   * @description all传递一个promise数组，必须等所有promise都resolve了，返回的promise才resolve，其余情况返回的promise都是reject
   * @author fengshaojian
   * @static
   * @param {MyPromise<any>[]} promises
   * @returns
   * @memberof MyPromise
   */
  static all(promises: MyPromise<any>[]) {
    if (getType(promises) !== "Array") {
      return new MyPromise((_, reject) =>
        reject(new TypeError("You must pass an array to all."))
      );
    }
    return new MyPromise<any>((resolve, reject) => {
      let resolvedCount = 0;
      const len = promises.length;
      const resoledValues: any[] = Array(len);
      for (let i = 0; i < len; i++) {
        const p = promises[i];
        MyPromise.resolve(p).then(v => {
          resolvedCount++;
          resoledValues[i] = v;
          if (resolvedCount === len) { // 必须等所有promise都resolve了才能返回resolve
            return resolve(resoledValues);
          }
        }, reason => { // 一旦又一个失败就退出循环，函数返回
          return reject(reason);
        });
      }
    });
  }

  /**
   * @description race传递一个promise数组，必须等只要有一个promise状态改变了，返回的promise的状态就确定了
   * @author fengshaojian
   * @static
   * @memberof MyPromise
   */
  static race(promises: MyPromise<any>[]) {
    if (getType(promises) !== "Array") {
      return new MyPromise((_, reject) =>
        reject(new TypeError("You must pass an array to all."))
      );
    }
    return new MyPromise<any>((resolve, reject) => {
      // 状态锁，一旦某个promise改变了，就直接将返回的 promise 置为resolved 或者 rejected
      let sealed = false;
      for (let i = 0; i < promises.length; i++) {
        const p = promises[i];
        MyPromise.resolve(p).then(v => {
          if (sealed) return;
          sealed = true;
          return resolve(v);
        }, reason => {
          if (sealed) return;
          return reject(reason);
        });
      }
    });
  }

  /**
   * @description 错误重试
   * @author fengshaojian
   * @static
   * @param {MyPromise<any>} promise
   * @param {number} count
   * @param {number} [delay=2000]
   * @returns
   * @memberof MyPromise
   */
  static retry(callback: (...args: any[]) => MyPromise<any> | PromiseLike<any>, count: number, delay: number = 2000) {
    return new MyPromise<any>((resolve, reject) => {
      function fn () {
        callback().then((v: any) => {
          resolve(v);
        }, (e: any) => {
          if (count === 0) {
            reject(e);
          } else {
            count--;
            setTimeout(fn, delay);
          }
        });
      }
      fn();
    });
  }
  /**
   * @description 取消promise链
   * @author fengshaojian
   * @static
   * @memberof MyPromise
   */
  static cancel () {
    return new MyPromise<any>(function(){});
  }
  /**
   * @description 取消promise链
   * @author fengshaojian
   * @static
   * @memberof MyPromise
   */
  static stop() {
    return new MyPromise<any>(function () { });
  }
}
// MyPromise.deferred = MyPromise.defer = function () {
//   var dfd = {}
//   dfd.promise = new MyPromise(function (resolve, reject) {
//     dfd.resolve = resolve
//     dfd.reject = reject
//   })
//   return dfd
// }

// module.exports = MyPromise;
