/**
 * 获取原始类型的值
 * @param {*} val
 */
export function toRawType(val) {
  return {}.toString.call(val).slice(8, -1)
}

/**
 * 将中划线转化为驼峰
 * @param {*} str
 * @returns
 */
const camelizeRE = /-(\w)/g
export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * 函数截流
 * @param {*} func
 * @param {*} delay
 * @returns
 */
export function debounce(func, delay) {
  let timer
  return function _debounce(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
