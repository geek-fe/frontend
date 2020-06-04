# Dictionary(字典)

`Dictionary`字典表示一组互不相同的元素(不重复的元素)。在字典中，存储的是[键，值] 对，其中键名是用来查询特定元素的。字典和集合很相似，集合以[值，值]的形式存储元素，字 典则是以[键，值]的形式来存储元素。字典也称作映射、符号表或关联数组。

## API

>`set(key,value)`: 向字典中添加新元素。如果 `key` 已经存在，那么已存在的 `value` 会 被新的值覆盖。

>`remove(key)`: 通过使用键值作为参数来从字典中移除键值对应的数据值。

>`hasKey(key)`: 如果某个键值存在于该字典中，返回 `true`，否则返回 `false`。

>`get(key)`: 通过以键值作为参数查找特定的数值并返回。

>`clear()`: 删除该字典中的所有值。

>`size()`: 返回字典所包含值的数量。与数组的 `length` 属性类似。

>`isEmpty()`: 在 `size` 等于零的时候返回 `true`，否则返回 `false`。

>`keys()`: 将字典所包含的所有键名以数组形式返回。

>`values()`: 将字典所包含的所有数值以数组形式返回。

>`entries()`: 将字典中所有[键，值]对返回。

>`forEach(callback)`: 迭代字典中所有的键值对，该方法有两个参数，第一个参数是一个回调，第二个参数是可选的回调上下文。`callback` 有三个参数: `key` 、
`value`和当前字典`dict`。

### UseAge

```typescript
  const dict = new Dictionary<string, number>();
  dict.isEmpty(); // true
  dict.set("a", 1);
  dict.set("b", 2);
  dict.set("c", 3);
  dict.set("d", 4);
  dict.toString(); // "[#a: 1],[#b: 2],[#c: 3],[#d: 4]"
  dict.keys(); // ["a", "b", "c", "d"]
  dict.values(); // [1, 2, 3, 4];
  dict.entries(); // xxx
  dict.hasKey("a"); // true
```
