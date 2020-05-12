# Queue(队列)

`Queue`是一种遵从先进先出(`FIFO`)原则的有序集合。只能在队尾添加元素，在对头移除元素

## API

>`enqueue(element(s))`:添加一个(或几个)新元素到队尾。

>`dequeue()`:移除对头的元素，同时返回被移除的元素。

>`peek()`:返回对头的元素，不对队列做任何修改(该方法不会移除对头的元素，仅仅返回它)。

>`isEmpty()`:如果队列里没有任何元素就返回 `true`，否则返回 `false`。

>`clear()`:移除队列里的所有元素。

>`size()`:返回队列里的元素个数。该方法和数组的 length 属性很类似。

### UseAge

```typescript
  const queue = new Queue<number>();
  queue.isEmpty(); // true
  queue.enqueue(1, 2);
  queue.size(); // 2
  queue.peek(); // 2
  queue.isEmpty(); // false
  queue.enqueue(3);
  queue.peek(); // 3
  queue.size(); // 3
  queue.dequeue(); // 1
  queue.size(); // 2
  queue.peek(); // 2
  queue.clear();
  queue.isEmpty(); // true;
  queue.size(); // 0
```
