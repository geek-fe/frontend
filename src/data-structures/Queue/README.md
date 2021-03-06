# Queue(队列)

`Queue`是一种遵从先进先出(`FIFO`)原则的有序集合。只能在队尾添加元素，在对头移除元素

## API

>`enqueue(element(s))`: 添加一个(或几个)新元素到队尾。

>`dequeue()`: 移除队头的元素，同时返回被移除的元素。

>`peek()`: 返回队头的元素，不对队列做任何修改(该方法不会移除队头的元素，仅仅返回它)。

>`isEmpty()`: 如果队列里没有任何元素就返回 `true`，否则返回 `false`。

>`clear()`: 移除队列里的所有元素。

>`size()`: 返回队列里的元素个数。该方法和数组的 length 属性很类似。

### UseAge

```typescript
  const queue = new Queue<number>();
  queue.isEmpty(); // true
  queue.enqueue(1, 2);
  queue.size(); // 2
  queue.peek(); // 1
  queue.isEmpty(); // false
  queue.enqueue(3);
  queue.peek(); // 1
  queue.size(); // 3
  queue.dequeue(); // 1
  queue.size(); // 2
  queue.peek(); // 2
  queue.clear();
  queue.isEmpty(); // true;
  queue.size(); // 0
```

## DoubleEndedQueue(双端队列)

`DoubleEndedQueue`是一种允许我们同时从前端和后端添加和移除元素的特殊队列。

## API

>`enqueue(element(s))`: 添加一个(或几个)新元素到队尾。

>`addFront(element)`: 向队列前端添加元素

>`dequeue()`: 移除队头的元素，同时返回被移除的元素。

>`removeBack()`: 移除队尾的元素，同时返回被移除的元素。

>`peek()`: 返回队头的元素，不对队列做任何修改(该方法不会移除队头的元素，仅仅返回它)。

>`peekBack()`: 返回队尾的元素，不对队列做任何修改(该方法不会移除队尾的元素，仅仅返回它)。

>`isEmpty()`: 如果队列里没有任何元素就返回 `true`，否则返回 `false`。

>`clear()`: 移除队列里的所有元素。

>`size()`: 返回队列里的元素个数。该方法和数组的 length 属性很类似。

### UseAge

```typescript
  const doubleEndedQueue = new DoubleEndedQueue<number>();
  doubleEndedQueue.isEmpty(); // true
  doubleEndedQueue.enqueue(1, 2);
  doubleEndedQueue.size(); // 2
  doubleEndedQueue.peek(); // 1
  doubleEndedQueue.peekBack(); // 2
  doubleEndedQueue.addFront(44);
  doubleEndedQueue.size(); // 3
  doubleEndedQueue.peek(); // 44
  doubleEndedQueue.peekBack(); // 2
  doubleEndedQueue.isEmpty(); // false
  doubleEndedQueue.enqueue(3);
  doubleEndedQueue.peek(); // 44
  doubleEndedQueue.peekBack(); // 3
  doubleEndedQueue.size(); // 4
  doubleEndedQueue.dequeue(); // 44
  doubleEndedQueue.size(); // 3
  doubleEndedQueue.peek(); // 1
  doubleEndedQueue.peekBack(); // 3
  doubleEndedQueue.removeBack(); // 3
  doubleEndedQueue.size(); // 2
  doubleEndedQueue.peek(); // 1
  doubleEndedQueue.peekBack(); // 2
  doubleEndedQueue.clear();
  doubleEndedQueue.isEmpty(); // true;
  doubleEndedQueue.size(); // 0
```
