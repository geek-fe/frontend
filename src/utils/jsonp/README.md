## API

### jsonp(url)
  * `url (String)` 请求的`url`
  * 返回一个`Promise`
### jsonp(options)
  * `options (Object)`
    * `url (String)` 设置请求的`url` 必传
    * `timeout (Number)` 设置超时时间 默认`60000ms`
    * `prefix (String)` 设置响应回调函数名前缀 默认 `__jp`
    * `name (String)` 设置响应回调函数名 默认 `prefix` + 一个自增数字
    * `param (String)` 设置查询参数名 默认 `callback`
    * `data (Record<string, any>)` 设置额外的查询参数 默认 `{}`
  * 返回一个`Promise`

## useage
  * 快速请求
```typescript
  import jsonp from "jsonp";
  jsonp("https://www.baidu.com")
    .then(data => console.log(data))
    .catch(e => console.log(e))
```
* 自定义请求超时时间，查询参数名，回调函数名，额外参数等
```typescript
  import jsonp from "jsonp";
  jsonp({
    url: "https://www.baidu.com",
    timeout: 6000,
    name: "show",
    param: "cb",
    data: {
      a: 1,
      b: 2
    }
  }).then(data => console.log(data))
    .catch(e => console.log(e))
```