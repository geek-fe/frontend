# MySet(集合)

`MySet`集合是由一组无序且唯一(即不能重复)的项组成的。

## API

>`add(element)`: 向集合添加一个新元素。

>`delete(element)`: 从集合移除一个元素。

>`has(element)`: 如果元素在集合中，返回 `true`，否则返回 `false`。

>`clear()`: 移除集合中的所有元素。

>`size()`: 返回集合所包含元素的数量。它与数组的 `length` 属性类似。

>`isEmpty()`: 在 `size` 等于零的时候返回 `true`，否则返回 `false`。

>`values()`: 返回一个包含集合中所有值(元素)的数组。

>`forEach(callback)`: 迭代集合中所有的键值对，该方法有两个参数，第一个参数是一个回调，第二个参数是可选的回调上下文。`callback` 有三个参数: `value` 、
`value2`和当前集合`set`。

### UseAge

```typescript
  const set = new MySet<number>();
  set.isEmpty(); // true
  set.add(1);
  set.add(2);
  set.add(3);
  set.add( 4);
  set.toString(); // "1,2,3,4"
  set.values(); // [1, 2, 3, 4];
  set.has(1); // true
  set.forEach((v, v2, set) => console.log(v, v2), thisArg);
```
