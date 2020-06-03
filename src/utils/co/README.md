# co

一个自动执行`generator`的库，返回一个`promise`

## co(gen, args)

```typescript
  function get(val: any, err?: any, error?: any) {
    return function (done: any) {
      if (error) throw error;
      setTimeout(function () {
        done(err, val);
      }, 10);
    }
  }
  co(function* () {
    const a = yield get(1);
    const b = yield get(2);
    const c = yield get(3);
    console.log([a, b, c]); // [[1], [2], [3]]
  });
```
