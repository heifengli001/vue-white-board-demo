import axios from 'axios'
import { getUserInfo } from '@/utils/user'
import { ElMessage } from 'element-plus'

let userId = null
const instance = axios.create({
  baseURL: 'http://test.demo.com/api/',
  timeout: 1000,
  headers: {}
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 这里是示例，除了无需登录的接口，其他接口自定义头部追加用户Id
    if (!config.noAuth) {
      // 在发送请求之前做些什么
      config.headers = config.headers || {}
      config.headers['X-AUTH-USER'] = userId || getUserInfo().id
      config.headers
    }
    return config
  },
  function (error) {
    ElMessage.error('请求错误:' + error.message)
    // 对请求错误做些什么
    // return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    console.log(response)
    if (response.data.status === 200) {
      return response.data.data
    } else {
      ElMessage.error(response.data.errorMessage)
      return Promise.reject(response.data.errorMessage)
    }
  },
  function (error) {
    // 对响应错误做点什么
    ElMessage.error('请求响应错误:' + error.message)
    return Promise.reject(error)
  }
)

export default instance
