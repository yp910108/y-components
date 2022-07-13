/**
 * 判断是否存在类名，如果当前节点不存在，则会查询父节点
 * @param {*} dom
 * @param {*} className
 * @param {*} deep
 * @returns
 */
export function hasClassName(dom, className, deep) {
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
export function getParentDom(dom, className, deep) {
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

const requestAnimFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function requestAnimFrame(callback) {
    window.setTimeout(callback, 1000 / 60)
  }

function easingFun(t, b, c, d) {
  if ((t /= d / 2) < 1) {
    return (c / 2) * t * t + b
  }
  return (-c / 2) * (--t * (t - 2) - 1) + b
}
/**
 * 滚动页面到指定位置
 * @param {*} el
 * @param {*} top
 * @param {*} duration
 * @returns
 */
export function scrollTo(el, top = 0, duration = 200) {
  const { scrollTop } = el
  const startTime = Date.now()
  if (scrollTop <= top) return
  function scroll() {
    const currentTime = Date.now() - startTime
    const _scrollTop = scrollTop - easingFun(currentTime, 0, scrollTop - top, duration)
    el.scrollTop = _scrollTop
    if (currentTime < duration) {
      requestAnimFrame(scroll)
    } else {
      if (_scrollTop !== top) {
        el.scrollTop = top
      }
    }
  }
  scroll()
}
