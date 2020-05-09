interface IDebouncedFunction extends EventListener, Function {
  cancel: () => void;
  flush: () => any;
  pending: () => boolean;
}
/**
 * @description 防抖函数，用于优化高频触发事件，频繁调用回调函数的函数
 * @author fengshaojian
 * @export
 * @param {*} fn
 * @param {number} [wait=200]
 * @param {boolean} [immediate]
 * @returns {IDebouncedFunction}
 */
export default function debounce(fn: any, wait: number = 200, immediate?: boolean): IDebouncedFunction {
  let lastCallTime = 0;
  let fnArgs: any;
  let fnContext: any;
  let timer: NodeJS.Timer | undefined;
  let result: any;
  function invokeFn() {
    const context = fnContext;
    const args = fnArgs;
    fnArgs = fnContext = undefined;
    result = fn.apply(context, args);
  }
  function later () {
    const now = Date.now();
    const diff = now - lastCallTime;
    if (diff < wait || diff >= 0) {
      timer = setTimeout(later, diff);
    } else {
      timer = undefined;
      if (!immediate) {
        invokeFn();
        if (!timer) fnArgs = fnContext = undefined;
      }
    }
  }
  function cancel () {
    clearTimeout(timer as NodeJS.Timer);
    fnArgs = fnContext = timer = undefined;
  }
  function flush () {
    return timer === undefined ? result : invokeFn();
  }
  function pending () {
    return timer !== undefined;
  }
  function debounced (this: any, ...args: any[]) {
    lastCallTime = Date.now();
    fnContext = this;
    fnArgs = args;
    const callNow = !timer && immediate;
    if (!timer) timer = setTimeout(later, wait);
    if (callNow) {
      invokeFn();
      fnArgs = fnContext = undefined;
    }
    return result;
  };
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}
