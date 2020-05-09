# 节流函数

> 在事件被触发后，以固定频率执行函数

## API

`throttle(fn, wait, options)`
  * `fn (Function)` 执行具体逻辑的函数如：事件的回调逻辑
  * `wait (Number)` 至少延迟多少秒，执行一次`fn` 默认`200ms`
  * `options (Object)` 
    * `leading (Boolean)` 是否立即执行一次
    * `trailing (Boolean)` 是否在结束后在执行一次

返回一个节流后的函数`throttledFn`，该函数有一个方法`cancel`方法:
    * `throttledFn.cancel()` 取消这次函数执行

## usage

```typescript
import throttle from "throttle";
let i = 0;
function add() {
  consoole.log(i++);
}
const throttledAdd = throttle(add, 2000, true);
btn.addEventListener("mousemove", throttledAdd, false); // 2秒执行一次函数
cancelBtn.addEventListener("click", throttledAdd.cancel, false); // 取消后续的函数执行

```

## 应用场景

  * DOM 元素的拖拽功能实现（mousemove）
  * 搜索联想（keyup）
  * 计算鼠标移动的距离（mousemove）
  * Canvas 模拟画板功能（mousemove）
  * 滚动加载，加载更多或滚到底部监听
  * 谷歌搜索框，搜索联想功能
  * 高频点击提交，表单重复提交
 