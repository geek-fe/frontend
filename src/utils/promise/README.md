# 手写Promise（符合 promise A+规范）并扩展一些常用方法

> [规范文档](https://promisesaplus.com/)

## API

### then(onFulfilled, onRejected)

`Promise`核心方法，规范中也只有该方法，该方法接受两个参数，`onFulfilled`回调是能接收到`Promise`成功后的值，`onRejected`能接收到`Promise``reject`后的值 使用方法同`es6`中的`Promise`一样

```typescript
  const p = new MyPromise((resolve, reject) => resolve(1));
  p.then(data => console.log(data)) // 1

```

### catch(callback)

`catch`方法只是`then`方法的语法糖而已

```typescript
catch(callback) = this.then(null, callback)
```

### finally(callback)

无论`promise`成功还是失败，都要调用的方法

### done()

`done`方法链到`Promise`链的最后，它就能够捕获前面未处理的错误

### MyPromise.all() 同 es6 Promise.all()

### MyPromise.race() 同 es6 Promise.race()

### MyPromise.resolve() 同 es6 Promise.resolve()

### MyPromise.reject() 同 es6 Promise.reject()

### MyPromise.retry(fn, count, delay)

当一个返回`promise`的方法失败后，允许其每隔`delay`毫秒重试一次，最多`count`次

### MyPromise.stop() MyPromise.cancel()

取消`Promise`链

如何测试`MyPromise`

```shell
npm i - g promises-aplus-tests
promises-aplus-tests index.js
```
全部绿色代表测试通过


>[es6文档](https://es6.ruanyifeng.com/#docs/promise)
