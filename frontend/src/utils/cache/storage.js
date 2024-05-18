// 这里是浏览器缓存的帮助文件
const cachePrefix = 'XT-DEMO'

const storage = localStorage

// 拼接统一格式的Key
const buildKey = (key) => {
  return `${cachePrefix}_${key}`
}

// 获取缓存
export const getStorage = (key) => {
  if (key) {
    key = buildKey(key)
    const data = localStorage.getItem(key)
    if (data === null || data === undefined) {
      return null
    } else {
      try {
        return JSON.parse(data)
      } catch {
        return data
      }
    }
  } else {
    throw new Error('key不能为空')
  }
}

// 设置缓存
export const setStorage = (key, data) => {
  if (key) {
    key = buildKey(key)
    if (data === null || data === undefined) {
      localStorage.removeItem(key)
      return null
    } else {
      const dataType = typeof data
      // 尝试Json对象化
      if (dataType == 'object') {
        try {
          const jsonStr = JSON.stringify(data)
          localStorage.setItem(key, jsonStr)
          return jsonStr
        } catch {
          throw new Error('对象数据在JSON转化时遇到错误')
        }
      } else if (dataType == 'function') {
        throw new Error('数据类型不支持')
      } else {
        localStorage.setItem(key, data)
        return data
      }
    }
  } else {
    throw new Error('key不能为空')
  }
}

// 删除缓存
export const delStorage = (key) => {
  key = buildKey(key)
  localStorage.removeItem(key)
}
