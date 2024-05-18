import { setStorage, getStorage } from './storage'
const cachePrefix = 'konva-data'
const buildCacheKey = (panelId) => {
  return `${cachePrefix}-${panelId}`
}
export const setCache = (panelId,data) => {
  setStorage(buildCacheKey(panelId), data)
}

export const getCache = (panelId) => {
  return getStorage(buildCacheKey(panelId))
}
