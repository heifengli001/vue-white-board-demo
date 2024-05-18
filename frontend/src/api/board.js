import axios from '@/utils/request/axios'

// 加入画板
export const joinBoard = (id) => {
  return axios.post(`/board/${id}/join`)
}

// 获取画板
export const getBoardData = (id) => {
  return axios.get(`/board/${id}/data`)
}

// 
export const action = (id, data) => {
  return axios.post(`/board/${id}/data`, { data })
}
