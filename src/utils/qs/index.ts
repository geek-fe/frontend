const inBrowser = typeof window !== "undefined";

/**
 * @description 获取当前浏览器链接的所有查询参数
 * @author fengshaojian
 * @returns {Record<string, any>}
 */
function get(): Record<string, any>;
/**
 * @description 获取指定链接的所有查询参数
 * @author fengshaojian
 * @param {string} url
 * @returns {Record<string, any>}
 */
function get(url: string): Record<string, any>;
/**
 * @description 根据查询参数名获取指定链接的参数值
 * @author fengshaojian
 * @param {string} url
 * @param {string} name
 * @returns {string}
 */
function get(url: string, name: string): string;
function get(url: string = window.location.href, name?: string): Record<string, any> | string {
  let search = "";
  const query: Record<string, any> = {};
  const originalUrl = url || (inBrowser ? window.location.href : "");
  const queryIndex = originalUrl.indexOf("?");
  const hashIndex = originalUrl.indexOf("#");
  if (hashIndex < queryIndex) {
    search = originalUrl.slice(queryIndex);
  } else if (hashIndex > queryIndex) {
    search = originalUrl.slice(queryIndex, hashIndex);
  }
  if (search) {
    search = search.slice(1);
    const queryArray: string[] = search.split("&");
    for (let i = 0, len = queryArray.length; i < len; i++) {
      const item = queryArray[i];
      const itemArray = item.split("=");
      query[itemArray[0]] = itemArray[1];
    }
  }
  return name ? query[name] : query;
}
/**
 * @description 根据当前浏览器链接添加新的查询参数，返回一个新的链接
 * @author fengshaojian
 * @param {Record<string, any>} query
 * @returns {string}
 */
function set(query: Record<string, any>): string;
/**
 * @description 根据指定url添加新的查询参数，返回一个新的链接
 * @author fengshaojian
 * @param {Record<string, any>} query
 * @param {string} url
 * @returns {string}
 */
function set(query: Record<string, any>, url: string): string;
function set(query: Record<string, any> = {}, url?: string): string {
  const originalUrl = url || (inBrowser ? window.location.href : "");
  const queryIndex = originalUrl.indexOf("?");
  const hashIndex = originalUrl.indexOf("#");
  const originalQuery = get(originalUrl) as Record<string, any>;
  let uri = "";
  const hash = originalUrl.slice(hashIndex);
  if (queryIndex > hashIndex) {
    uri = originalUrl.slice(0, queryIndex);
  } else if (queryIndex < hashIndex) {
    if (queryIndex === -1) {
      uri = originalUrl;
    } else {
      uri = originalUrl.slice(0, queryIndex);
    }
  } else {
    uri = originalUrl;
  }
  for (const key in query) {
    const value = JSON.stringify(query[key]);
    originalQuery[key] = value;
  }
  for (const key in originalQuery) {
    const value = originalQuery[key];
    const hasQuery = uri.indexOf("?") >= 0;
    uri += hasQuery ? `&${key}=${value}` : `?${key}=${value}`;
  }
  if (queryIndex < hashIndex && queryIndex !== -1) {
    uri += hash;
  }
  return uri;
}
export default {
  get,
  set
};
