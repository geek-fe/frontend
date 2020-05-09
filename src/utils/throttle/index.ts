type ThrottleOptions = {
  leading?: boolean;
  trailing?: boolean;
}

interface IThrottledFunction extends EventListener, Function {
  cancel: () => void;
}
/**
 * @description 节流函数，以固定频率来执行高频触发事件的回调函数
 * @author fengshaojian
 * @export
 * @param {*} fn
 * @param {number} wait
 * @param {ThrottleOptions} options
 * @returns {IThrottledFunction}
 */
export default function throttle(fn: any, wait: number, options: ThrottleOptions): IThrottledFunction {
  let fnArgs: any;
  let fnContext: any;
  let lastCallTime = 0;
  let result: any;
  let timer: NodeJS.Timer | undefined;
  function later () {
    lastCallTime = options.leading ? 0 : Date.now();
    timer = undefined;
    result = fn.apply(fnContext, fnArgs);
    if (!timer) fnArgs = fnContext = undefined;
  }
  function cancel () {
    clearTimeout(timer as NodeJS.Timer);
    timer = fnArgs = fnContext = undefined;
    lastCallTime = 0;
  }
  function throttled (this: any, ...args: any[]) {
    fnContext = this;
    fnArgs = args;
    const now = Date.now();
    if (!options.leading && lastCallTime === 0) lastCallTime = now;
    const remainingTime = wait - (now - lastCallTime);
    if (remainingTime <= 0 || remainingTime > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
      lastCallTime = now;
      result = fn.apply(fnContext, fnArgs);
      fnContext = fnArgs = undefined;
    } else if (!timer && options.trailing) {
      timer = setTimeout(later, wait);
    }
    return result;
  }
  throttled.cancel = cancel;
  return throttled;
}
