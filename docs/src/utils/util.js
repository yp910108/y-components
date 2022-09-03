/**
 * 将首字母转化为大写开头
 * @param {*} str
 * @returns
 */
export function toUpperCase(str) {
  const strs = str.split('-').filter((s) => !!s)
  return strs.map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`).join('')
}

export function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

export function stripTemplate(content) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}
