/**
 * 判断是否存在类名，如果当前节点不存在，则会查询父节点
 * @param {*} dom
 * @param {*} className
 * @param {*} deep
 * @returns
 */
export const hasClassName = (dom, className, deep) => {
  if (dom) {
    let classNames = dom.classList
    if (classNames.contains(className)) {
      return true
    }
    if (deep) {
      dom = dom.parentElement
      while (dom) {
        classNames = dom.classList
        if (classNames.contains(className)) {
          return true
        }
        dom = dom.parentElement
      }
    }
  }
  return false
}

/**
 * 获取父节点
 * @param {*} dom
 * @param {*} className
 * @param {*} deep
 * @returns
 */
export const getParentDom = (dom, className, deep) => {
  if (dom) {
    let classNames = dom.classList
    if (classNames.contains(className)) {
      return dom
    }
    if (deep) {
      dom = dom.parentElement
      while (dom) {
        classNames = dom.classList
        if (classNames.contains(className)) {
          return dom
        }
        dom = dom.parentElement
      }
    }
  }
}
