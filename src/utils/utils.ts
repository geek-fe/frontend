// 判断是否是浏览器环境
export const inBrowser = typeof window !== "undefined";
// 判断微信
export function isWeiXin(): boolean {
  return /microMessenger/ig.test(navigator.userAgent);
}
// 判断ios
export function isIos(): boolean {
  return /iPad|iPhone|iPod/g.test(navigator.userAgent);
}
// 判断android
export function isAndroid(): boolean {
  return /android/gi.test(navigator.userAgent);
}

// 判断电话号码
export function isTel(phone: string): boolean {
  return /^1[0-9]{10}$/g.test(phone);
}
// 获取传入值的类型
export function getType(value: any): string {
  return ({}).toString.call(value).slice(8, -1);
}

// 判断是否是generator
export function isGenerator(value: any) {
  return value && typeof value.next === "function" && typeof value.throw === "function";
}
// 判断是否是generator函数
export function isGeneratorFunction(value: any) {
  if (!value) return false;
  const constructor = value.constructor;
  if (!constructor) return false;
  if (constructor.name === "GeneratorFunction" || constructor.displayName === "GeneratorFunction") return true;
  return isGenerator(constructor.prototype);
}
// 判断是否是promise
export function isPromise(value: any) {
  return value instanceof Promise || (value && typeof value.then === "function");
}
// 默认转为字符串

export function defaultToString(value: any): string {
  if (value === null) {
    return "NULL";
  } else if (value === undefined) {
    return "UNDEFINED";
  } else if (typeof value === "string" || value instanceof String) {
    return `${value}`;
  }
  return value.toString();
}

export function swap(arr: any[], a: number, b: number) {
  [arr[b], arr[a]] = [arr[a], arr[b]];
}
