import DoubleEndedQueue from "../../data-structures/Queue/DoubleEndedQueue";
/**
 * @description 用双端队列检测是不是回文字符串
 * @author fengshaojian
 * @export
 * @param {string} str
 * @returns {boolean}
 */
export function palindromeChecker(str: string): boolean {
  if (str === undefined || str === null || (str !== null && str.length === 0)) { // 检测是不是有效的字符串
    return false;
  }
  let isEqual = true;
  str = str.toLowerCase().split(" ").join("");
  let firstChar: string;

  let lastChar: string;
  const doubleEndedQueue = new DoubleEndedQueue<string>();
  for (let i = 0; i < str.length; i++) {
    doubleEndedQueue.enqueue(str.charAt(i)); // 入队
  }
  while (isEqual && doubleEndedQueue.size() > 1) {
    firstChar = doubleEndedQueue.dequeue() as string; // 从头取
    lastChar = doubleEndedQueue.removeBack() as string; // 从尾取
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}
