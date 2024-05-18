import axios from '@/utils/request/axios'

// 加入画板
export const joinPanel = (id) => {
  return axios.post(`/panel/${id}/join`)
}

// 获取画板
export const getPanelData = (id) => {
  return axios.get(`/panel/${id}/data`)
}

