"use strict";
exports.__esModule = true;
// var utils_1 = require("../utils");
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";

function getType(value) {
	return ({}).toString.call(value).slice(8, -1);
}
function resolvePromise(promise, x, resolve, reject) {
	if (promise === x)
		return reject(new TypeError("循环引用了"));
	if (x instanceof MyPromise) { // eslint-disable-line
		if (x.status === PENDING) { // 如果是pending状态有可能被resolve掉, resolve的值得重新走一遍流程
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
				try {
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
		catch (error) {
			return reject(error);
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
			setTimeout(function () {
				if (_this.status === PENDING) {
					_this.status = FULFILLED;
					_this.value = value;
					_this.resolveCallbacks.forEach(function (fn) { return fn(); }); // 发布
				}
			}, 0);
		};
		var reject = function (reason) {
			setTimeout(function () {
				if (_this.status === PENDING) {
					_this.status = REJECTED;
					_this.reason = reason;
					if (_this.rejectCallbacks.length === 0) {
						console.error(reason);
					}
					_this.rejectCallbacks.forEach(function (fn) { return fn(); }); // 发布
				}
			}, 0);
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
					try {
						var x = onFulfilled(_this.value);
						resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
					}
					catch (error) {
						reject(error);
					}
				});
				_this.rejectCallbacks.push(function () {
					try {
						var x = onRejected(_this.reason);
						resolvePromise(promise2, x, resolve, reject); // 处理then的返回值
					}
					catch (error) {
						reject(error);
					}
				});
			});
		}
		return promise2;
	};
	/**
	 * @description catch 方法只是 then 方法的一个语法糖
	 * @author fengshaojian
	 * @param {(e: any) => void} onRejected
	 * @returns
	 * @memberof MyPromise
	 */
	MyPromise.prototype["catch"] = function (onRejected) {
		return this.then(undefined, onRejected);
	};
	/**
	 * @description finally 方法跟try catch finally 语法的 finally 方法一样，不管成功与失败都会执行回调函数
	 * @author fengshaojian
	 * @param {() => void} callback
	 * @returns
	 * @memberof MyPromise
	 */
	MyPromise.prototype["finally"] = function (callback) {
		if (getType(callback) === "Function") {
			// 不管成功与失败都会去执行callback, 并将前面得值传到下一个promise中，而callback没有任何参数，所以在finally里面执行的是与状态无关的代码
			return this.then(function (value) { return MyPromise.resolve(callback()).then(function () { return value; }); }, function (reason) { return MyPromise.resolve(callback()).then(function () { throw reason; }); });
		}
		return this.then(callback, callback);
	};
	/**
	 * @description done方法链到Promise链的最后，它就能够捕获前面未处理的错误，
	 * @author fengshaojian
	 * @returns
	 * @memberof MyPromise
	 */
	MyPromise.prototype.done = function () {
		return this["catch"](function (e) {
			console.error(e);
		});
	};
	/**
	 * @description 静态resolve方法
	 * @author fengshaojian
	 * @static
	 * @param {*} value
	 * @returns
	 * @memberof MyPromise
	 */
	MyPromise.resolve = function (value) {
		if (value instanceof MyPromise) {
			return value;
		}
		try {
			if (getType(value) === "Object" || getType(value) === "Function") {
				var then = value.then; // 注意：如果then是个属性，只允许调用一次。
				if (getType(then) === "Function") {
					return new MyPromise(then.bind(value)); // 调用then
				}
			}
		}
		catch (e) {
			return MyPromise.reject(e);
		}
		return new MyPromise(function (resolve) { return resolve(value); });
	};
	/**
	 * @description 静态reject
	 * @author fengshaojian
	 * @static
	 * @param {*} reason
	 * @returns
	 * @memberof MyPromise
	 */
	MyPromise.reject = function (reason) {
		return new MyPromise(function (_, reject) { return reject(reason); });
	};
	/**
	 * @description all传递一个promise数组，必须等所有promise都resolve了，返回的promise才resolve，其余情况返回的promise都是reject
	 * @author fengshaojian
	 * @static
	 * @param {MyPromise<any>[]} promises
	 * @returns
	 * @memberof MyPromise
	 */
	MyPromise.all = function (promises) {
		if (getType(promises) !== "Array") {
			return new MyPromise(function (_, reject) {
				return reject(new TypeError("You must pass an array to all."));
			});
		}
		return new MyPromise(function (resolve, reject) {
			var resolvedCount = 0;
			var len = promises.length;
			var resoledValues = Array(len);
			var _loop_1 = function (i) {
				var p = promises[i];
				MyPromise.resolve(p).then(function (v) {
					resolvedCount++;
					resoledValues[i] = v;
					if (resolvedCount === len) { // 必须等所有promise都resolve了才能返回resolve
						return resolve(resoledValues);
					}
				}, function (reason) {
					return reject(reason);
				});
			};
			for (var i = 0; i < len; i++) {
				_loop_1(i);
			}
		});
	};
	/**
	 * @description race传递一个promise数组，必须等只要有一个promise状态改变了，返回的promise的状态就确定了
	 * @author fengshaojian
	 * @static
	 * @memberof MyPromise
	 */
	MyPromise.race = function (promises) {
		if (getType(promises) !== "Array") {
			return new MyPromise(function (_, reject) {
				return reject(new TypeError("You must pass an array to all."));
			});
		}
		return new MyPromise(function (resolve, reject) {
			// 状态锁，一旦某个promise改变了，就直接将返回的 promise 置为resolved 或者 rejected
			var sealed = false;
			for (var i = 0; i < promises.length; i++) {
				var p = promises[i];
				MyPromise.resolve(p).then(function (v) {
					if (sealed)
						return;
					sealed = true;
					return resolve(v);
				}, function (reason) {
					if (sealed)
						return;
					return reject(reason);
				});
			}
		});
	};
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
	MyPromise.retry = function (callback, count, delay) {
		if (delay === void 0) { delay = 2000; }
		return new MyPromise(function (resolve, reject) {
			function fn() {
				callback().then(function (v) {
					resolve(v);
				}, function (e) {
					if (count === 0) {
						reject(e);
					}
					else {
						count--;
						setTimeout(fn, delay);
					}
				});
			}
			fn();
		});
	};
	/**
	 * @description 取消promise链
	 * @author fengshaojian
	 * @static
	 * @memberof MyPromise
	 */
	MyPromise.cancel = function () {
		return new MyPromise(function () { });
	};
	/**
	 * @description 取消promise链
	 * @author fengshaojian
	 * @static
	 * @memberof MyPromise
	 */
	MyPromise.stop = function () {
		return new MyPromise(function () { });
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
