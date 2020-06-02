"use strict";
exports.__esModule = true;
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
function resolvePromise(promise, x, resolve, reject) {
    if (promise === x)
        return reject(new TypeError("循环引用了"));
    if (x instanceof MyPromise) { // eslint-disable-line
        if (x.status === PENDING) {
            x.then(function (v) {
                resolvePromise(promise, v, resolve, reject);
            }, reject);
        }
        else {
            x.then(resolve, reject);
        }
        return;
    }
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
        var then = void 0;
        var called_1 = false;
        try {
            then = x.then; // because x.then could be a getter
            if (typeof then === "function") { // 2.3.3.3
                then.call(x, function (y) {
                    if (called_1)
                        return; // 2.3.3.3.3
                    called_1 = true;
                    return resolvePromise(promise, y, resolve, reject);
                }, function (r) {
                    if (called_1)
                        return; // 2.3.3.3.3
                    called_1 = true;
                    return reject(r);
                });
            }
            else {
                return resolve(x);
            }
        }
        catch (error) { // 2.3.3.3.4
            if (called_1)
                return; // 2.3.3.3.4.1
            called_1 = true;
            return reject(error); // 2.3.3.3.4.2
        }
    }
    else {
        return resolve(x);
    }
}
function defaultFulfilled(v) { return v; }
function defaultRejected(r) { throw r; }
/**
 * @description 手写一个符合promise A+规范的promise
 * @author fengshaojian
 * @export
 * @class MyPromise
 * @template T
 */
var MyPromise = /** @class */ (function () {
    function MyPromise(executor) {
        var _this = this;
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        var resolve = function (value) {
            if (_this.status !== PENDING)
                return;
            _this.status = FULFILLED;
            _this.value = value;
            _this.resolveCallbacks.forEach(function (fn) { return fn(); }); // 发布
        };
        var reject = function (reason) {
            if (_this.status !== PENDING)
                return;
            _this.status = REJECTED;
            _this.reason = reason;
            if (_this.rejectCallbacks.length === 0) {
                console.error(reason);
            }
            _this.rejectCallbacks.forEach(function (fn) { return fn(); }); // 发布
        };
        try {
            // 用户可能在executor直接抛出一个错误
            executor(resolve, reject);
        }
        catch (error) {
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
    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        if (onFulfilled === void 0) { onFulfilled = defaultFulfilled; }
        if (onRejected === void 0) { onRejected = defaultRejected; }
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : defaultFulfilled;
        onRejected = typeof onRejected === "function" ? onRejected : defaultRejected;
        var promise2;
        if (this.status === FULFILLED) { // 只有在fulfilled状态下才调用onFulfilled方法
            promise2 = new MyPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        // x 可能有多种值，或许是个普通的值，或许是一个promise或许是一个带有then
                        // 方法的对象 所以需要一个辅助函数来做处理, 调用onFulfilled也有可能报错
                        var x = onFulfilled(_this.value);
                        resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
                    }
                    catch (error) {
                        reject(error);
                    }
                }, 0);
            });
        }
        else if (this.status === REJECTED) { // 只有在rejected状态下才调用onRejected方法
            promise2 = new MyPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        // x 可能有多种值，或许是个普通的值，或许是一个promise或许是一个带有then
                        // 方法的对象 所以需要一个辅助函数来做处理, 调用onRejected也有可能报错
                        var x = onRejected(_this.reason);
                        resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
                    }
                    catch (error) {
                        reject(error);
                    }
                }, 0);
            });
        }
        else {
            // 走到这里说明他是pending状态，考虑这种情况 new MyPromise((resolve, reject) => setTimeout(() => resolve(1) , 10000)).then(() => {}, () => {})
            // 10秒之后才resolve，此时需要把这个onFulfilled放到一个数组里面，等到真正resolve的时候再去执行，同理reject也是
            promise2 = new MyPromise(function (resolve, reject) {
                _this.resolveCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this.value);
                            resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
                        }
                        catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                _this.rejectCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.reason);
                            resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
                        }
                        catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            });
        }
        return promise2;
    };
    return MyPromise;
}());
// exports["default"] = MyPromise;
MyPromise.deferred = MyPromise.defer = function () {
  var dfd = {}
  dfd.promise = new MyPromise(function (resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = MyPromise;
