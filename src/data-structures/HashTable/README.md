# HashTable(散列表)

`HashTable`它是 `Dictionary` 类的一种散列表 实现方式。

## API

>`put(key,value)`: 向散列表中添加新元素。如果 `key` 已经存在，那么已存在的 `value` 会 被新的值覆盖。

>`remove(key)`: 通过使用键值作为参数来从散列表中移除键值对应的数据值。

>`get(key)`: 通过以键值作为参数查找特定的数值并返回。

>`clear()`: 删除该散列表中的所有值。

>`size()`: 返回散列表所包含值的数量。与数组的 `length` 属性类似。

>`isEmpty()`: 在 `size` 等于零的时候返回 `true`，否则返回 `false`。

### UseAge

```typescript
  const hash = new HashTable<string, number>();
  hash.isEmpty(); // true
  hash.put("a", 1);
  hash.put("b", 2);
  hash.put("c", 3);
  hash.put("d", 4);
```
