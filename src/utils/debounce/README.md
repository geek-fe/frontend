# 防抖函数

> 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

# API
`debounce(fn, wait, immediate)`
  * `fn (Function)` 执行具体逻辑的函数如：事件的回调逻辑
  * `wait (Number)` 至少延迟多少秒，执行一次`fn` 默认`200ms`
  * `immediate (Boolean)` 是否立即执行一次 默认`false`
返回一个经过防抖的函数`debouncedFn`，该函数有3个方法分别是:
    * `debouncedFn.cancel()` 取消这次函数执行
    * `debouncedFn.flush()` 强制执行一次`fn`
    * `debouncedFn.pending()` 是否在执行中，返回一个`bolean`值
# usage
```typescript
import debounce from "debounce";
let i = 0;
function add() {
  consoole.log(i++);
}
const debouncedAdd = debounce(add, 2000, true);
btn.addEventListener("mousemove", debouncedAdd, false); // 2秒执行一次函数，2秒内如果又触发事件，则重新计时
cancelBtn.addEventListener("click", debouncedAdd.cancel, false); // 取消后续的函数执行
flushBtn.addEventListener("click", debouncedAdd.flush, false); // 执行一次函数

```
# 应用场景
  * 每次 `resize/scroll` 触发统计事件
  * 文本输入的验证（连续输入文字后发送 `AJAX` 请求进行验证，验证一次就好）
  * 搜索框搜索输入。只需用户最后一次输入完，再发送请求
  * 手机号、邮箱验证输入检测
  * 窗口大小`resize`。只需窗口调整完成后，计算窗口大小。防止重复渲染。
  * 限制按钮提交等