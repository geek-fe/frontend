# MyStorage

封装`localStorage`，`sessionStorage`的库，增加过期时间设置，支持存取对象数组

## API

### MyStorage.setStorage(storage)
  >设置作用对象
  * `storage` 可以是`localStorage`，也可以是`sessionStorage`， 默认是 `localStorage`

### MyStorage.set(key, value, expires)
  >往`Storage`里面存入单个值
  * `key (String)` 存入`Storage`的键
  * `value (any)` 存入`Storage`的值，支持对象数组
  * `expires (Number)` 设置过期时间（单位：天） 默认永远不过期

### MyStorage.set(options)
  >批量往`Storgae`里面设置值
  * `options (Object)`
    * `expires (Number)` 设置这一组值的统一过期时间（单位： 天）

  其余都按照键值对的方式一一对应，存入到`Storage`中，如果值是一个对象并且值也包含`expires`属性，则值的`expires`值将覆盖外面的`expires`值

### MyStorgae.get(key)
  >根据`key`获取值
  * `key (String)` 需要获取值的键

  **注意：** 如果该值设置了过期时间，并且已经过期，则该方法返回`undefined`

返回该键对应的值

### Mystorage.get()
  >获取`Storage`里面所有的值
  其中包括不是通过`MyStorage.set()`方法设置的值，他们的值都是字符串。返回一个对象

  **注意：** 如果该值设置了过期时间，并且已经过期，则该方法返回`undefined`

### MyStorgae.remove(key)
  >根据`key`移除值
  * `key (String)` 需要移除的键名

### MyStorage.remove()
  > 移除`Storage`里面的所有值

### MyStorage.each(callback)
  > 遍历`Storgae`里面可用的值
  * `callback(key, value)` 遍历回调函数

    * `key` 键
    * `value` 值

## Usage

```typescript
import MyStorage from "MyStorage";

// 设置一个值到Storage里面
MyStorage.set("a", 1);
// 设置一个值到Storage里面，并设置过期时间为1天
MyStorgae.set("b", { b: 2 }, 1);
// 批量设置值到Storage里面
MyStorage.set({
  a: 1,
  b: {
    b: 2
  }
});
// 批量设置值到Storage里面，并设置统一过期时间为3天
MyStorage.set({
  a: 1,
  b: {
    b: 2
  },
  expires: 3
});
// 批量设置值到Storage里面，并每一个值过期时间不一样
// 其中a的值是1，过期时间是1天； b的值是{b:2}，过期时间是2天；c的值是"cc"，过期时间是3天
MyStorage.set({
  a: {
    value: 1,
    expires: 1
  },
  b: {
    value: {
      b: 2
    },
    expires: 2
  },
  c: "cc",
  expires: 3
});
// 根据key获取值
MyStorage.get("a");
// 获取所有值
MyStorage.get();
// 根据key移除值
MyStorage.remove("a");
// 移除所有值
MyStorage.remove();
// 遍历storage里面的值
MyStorage.each((key, value) => {
  console.log(`${key} 对应的值为：${value}`);
})
```
