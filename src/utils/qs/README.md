# qs
 > 一个简化查询参数操作的库

## API

`qs.get()`
    
  >获取当前浏览器`url`的所有查询参数

`qs.get(url)`
  * `url (String)` 获取指定`url`的所有查询参数 默认为当前浏览器的`url`

`qs.get(url, name)`
  * `url (String)` 需要获取查询参数的`url` 默认为当前浏览器的`url`
  * `name (String)` 指定需要获取查询参数的`key`

`qs.set(value)`
  > 在当前浏览器`url`的基础上添加新的查询参数，如果原来`url`已经有这个参数会覆盖原来的值
  * `value (Object)` 需要添加到`url`上的查询参数键值对

返回一个新的链接

`qs.set(value, url)`
  > 给指定`url`添加新的查询参数，如果原来`url`已经有这个参数会覆盖原来的值
  * `value (Object)` 需要添加到`url`上的查询参数键值对
  * `url (String)` 指定的`url`

返回一个新的链接

## Useage

```typescript
import qs from "qs";
// 获取当前浏览器链接的所有查询参数
qs.get();
// 获取指定url的查询参数
qs.get("http://www.example.com/#/profile?a=1&b=2");
// 根据指定查询参数名，及指定url获取其值
qs.get("http://www.example.com/#/profile?a=1&b=2", "a");
// 根据当前浏览器url添加新的查询参数，如果原来url已经有这个参数会覆盖原来的值
qs.set({ a: 1, b: 2 });
// 根据指定url，添加查询参数，如果原来url已经有这个参数会覆盖原来的值
qs.set({ a: 1, bb: { c: 3} }, "http://www.example.com/#/profile?a=1&b=2");
```