import Stack from "../../data-structures/Stack/Stack";

/**
 * @description 将10进制转化为任意进制
 * @author fengshaojian
 * @export
 * @param {number} decNumber 输入的10进制数
 * @param {number} base 要转化为的进制
 * @returns {string}
 */
export default function baseConverter(decNumber: number, base: number): string {
  // 用栈来存储数据
  const stack = new Stack<number>();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let rem;
  let baseString = "";
  // 超出范围返回空串
  if (!(base >= 2 && base <= 36)) return "";
  while (decNumber > 0) {
    // 向下取整
    rem = Math.floor(decNumber % base);
    // 将余数压入栈
    stack.push(rem);
    // 更新数字
    decNumber = Math.floor(decNumber / base);
  }
  while (!stack.isEmpty()) {
    // 依次取栈顶元素，组合得到结果
    const popNumber = stack.pop();
    if (typeof popNumber === "number") {
      baseString += digits[popNumber];
    }
  }
  return baseString;
}
