import { toRawType } from './util'

/**
 * 处理传入的 data 并返回
 * 会改变当前传入的 data
 * @param {*} data
 */
export function filterData(data) {
  if (toRawType(data) !== 'Object') {
    return data
  }
  Object.keys(data).forEach((key) => {
    const val = data[key]
    if (!val && val !== 0) {
      delete data[key]
    } else if (toRawType(val) === 'Array') {
      if (!val.length) {
        delete data[key]
      }
    }
  })
  return data
}

/**
 * 树形结构，通过子节点查找父节点组成的数组（包含自身）
 * @param {*} props
 * @param {*} originList
 * @param {*} originValue
 */
export function getParents(originList, originValue, props) {
  props = { value: 'value', parentValue: 'parentValue', children: 'children', ...props }
  const ret = []
  const { value: attrValue, parentValue: attrParentValue, children: attrChildren } = props
  const temp = (list, value) => {
    for (const item of list) {
      const currValue = item[attrValue]
      const parentValue = item[attrParentValue]
      if (value === currValue) {
        const newItem = { ...item }
        delete newItem[attrChildren]
        ret.unshift(newItem)
        temp(originList, parentValue)
        break
      }
      const children = item[attrChildren]
      if (children && children.length) {
        temp(children, value)
      }
    }
  }
  temp(originList, originValue)
  return ret
}
