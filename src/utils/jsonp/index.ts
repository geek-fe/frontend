type Options = {
  url: string;
  param?: string;
  name?: string;
  timeout?: number;
  data?: Record<string, any>;
  prefix?: string;
}

function noop() {};
let count = 0;

/**
 * @description 快捷方法跨域请求
 * @author fengshaojian
 * @export
 * @param {string} options
 * @returns {Promise<any>}
 */
export function jsonp (options: string): Promise<any>;
/**
 * @description 提供更细腻度的跨域请求
 * @author fengshaojian
 * @export
 * @param {Options} options
 * @returns {Promise<any>}
 */
export function jsonp(options: Options): Promise<any>;
export function jsonp(options: string | Options): Promise<any> {
  return new Promise((resolve, reject) => {
    let timeout: number = 60000;
    let prefix: string = "__jp";
    let id: string = prefix + (count++);
    let param: string = "callback";
    const target = document.getElementsByTagName("script")[0] || document.head;
    let data: Record<string, any> = {};
    let url: string = "";
    let script: HTMLScriptElement; // eslint-disable-line
    let timer: NodeJS.Timeout;
    if (typeof options === "object") {
      options.timeout && (timeout = options.timeout);
      options.prefix && (prefix = options.prefix);
      options.name && (id = options.name);
      options.param && (param = options.param);
      options.data && (data = options.data);
      url = options.url;
    } else {
      url = options;
    }
    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      // @ts-ignore
      window[id] = noop;
      if (timer) clearTimeout(timer);
    }

    if (timeout) {
      timer = setTimeout(function () {
        cleanup();
        reject(new Error("Timeout"));
      }, timeout);
    }

    // @ts-ignore
    window[id] = function (data: any) {
      cleanup();
      resolve(data);
    };
    url += (~url.indexOf("?") ? "&" : "?") + param + "=" + encodeURIComponent(id);
    url = url.replace("?&", "?");
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const val = data[key];
        url += "&" + key + "=" + encodeURIComponent(val);
      }
    }
    script = document.createElement("script");
    script.src = url;
    target.parentNode && (target.parentNode.insertBefore(script, target));
  });
}
