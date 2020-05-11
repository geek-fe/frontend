import Stack from "../data-structures/Stack/Stack";

/**
 * @description 将10进制转化为任意进制
 * @author fengshaojian
 * @export
 * @param {number} decNumber 输入的10进制数
 * @param {number} base 要转化为的进制
 * @returns {string}
 */
export default function baseConverter(decNumber: number, base: number): string {
  const stack = new Stack<number>();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let rem;
  let baseString = "";
  if (!(base >= 2 && base <= 36)) return "";
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    stack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!stack.isEmpty()) {
    const popNumber = stack.pop();
    if (typeof popNumber === "number") {
      baseString += digits[popNumber];
    }
  }
  return baseString;
}
