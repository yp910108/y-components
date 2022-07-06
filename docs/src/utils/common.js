/**
 * 将首字母转化为大写开头
 * @param {*} str
 * @returns
 */
export function toUpperCase(str) {
  const strs = str.split('-').filter((s) => !!s)
  return strs.map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`).join('')
}
