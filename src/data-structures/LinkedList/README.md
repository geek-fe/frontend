# LinkedList(链表)

`LinkedList`链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个 元素由一个存储元素本身的节点和一个指向下一个元素的引用(也称指针或链接)组成。下图展 示了一个链表的结构。

相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然 而，链表需要使用指针，因此实现链表时需要额外注意。在数组中，我们可以直接访问任何位置 的任何元素，而要想访问链表中间的一个元素，则需要从起点(表头)开始迭代链表直到找到所 需的元素。

## 分类

`LinkedList` 可以分为很多类，常见的有以下几种：

[LinkedList(单向链表)](./LinkedList.ts) 节只有指向它下一个节点的引用

[DoublyLinkedList(双向链表)](../DoublyLinkedList/DoublyLinkedList.ts) 是指一个节点同时拥有指向它上一个节点的引用，和指向下一个节点的引用

[CircularLinkedList(循环链表)](../CircularLinkedList/CircularLinkedList.ts) 是指尾节点的下一个节点指向头节点

[SortedLinkedList(有序链表)](../SortedLinkedList/SortedLinkedList.ts) 插入时有序的插入来保证整个链表有序

## API

>`push(element(s))`: 向链表尾部添加一个新元素。

>`insert(element, index)`: 向链表的特定位置插入一个新元素。

>`getElementAt(index)`: 返回链表中特定位置的元素。如果链表中不存在这样的元素，
则返回 undefined。

>`remove(element)`: 从链表中移除一个元素。

> `indexOf(element)`: 返回元素在链表中的索引。如果链表中没有该元素则返回`-1`。

> `removeAt(index)`: 从链表的特定位置移除一个元素。

> `getHead()`: 获取链表头部元素。

> `getTail()`: 获取链表尾部元素。

> `reverse()`: 反转链表。

>`isEmpty()`: 如果链表中不包含任何元素，返回 `true`，如果链表长度大于 `0` 则返回 `false`。

>`clear()`: 移除链表里的所有元素。

>`size()`: 返回链表包含的元素个数，与数组的 `length` 属性类似。属性很类似。

> `toString()`: 返回表示整个链表的字符串。由于列表项使用了 `Node` 类，就需要重写继
承自 `JavaScript` 对象默认的 `toString` 方法，让其只输出元素的值。

> `toArray()`: 将链表的节点组合成一个数组并返回


### UseAge

```typescript
  const linkedList = new LinkedList<number>();
  
```
