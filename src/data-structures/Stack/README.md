# Stack(栈)

`Stack`是一种遵从后进先出(`LIFO`)原则的有序集合。新添加或待删除的元素都保存在栈的同
一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

## API

>`push(element(s))`:添加一个(或几个)新元素到栈顶。

>`pop()`:移除栈顶的元素，同时返回被移除的元素。

>`peek()`:返回栈顶的元素，不对栈做任何修改(该方法不会移除栈顶的元素，仅仅返回它)。

>`isEmpty()`:如果栈里没有任何元素就返回 `true`，否则返回 `false`。

>`clear()`:移除栈里的所有元素。

>`size()`:返回栈里的元素个数。该方法和数组的 length 属性很类似。

### UseAge

```typescript
  const stack = new Stack<number>();
  stack.isEmpty(); // true
  stack.push(1, 2);
  stack.size(); // 2
  stack.peek(); // 2
  stack.isEmpty(); // false
  stack.push(3);
  stack.peek(); // 3
  stack.size(); // 3
  stack.pop(); // 3
  stack.size(); // 2
  stack.peek(); // 2
  stack.clear();
  stack.isEmpty(); // true;
  stack.size(); // 0
```
