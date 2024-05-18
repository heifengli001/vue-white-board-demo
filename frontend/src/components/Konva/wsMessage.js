// 这里处理所有的message消息
import { initWebSocket, sendWebsocket, closeWebsocket } from '@/utils/request/ws'
import { changeList } from './events'
import { unref } from 'vue'
let instance = null
// 获取socket消息
const getSocketData = ({ detail }) => {
  const message = detail && detail.data
  if (instance && message && message.type) {
    {
      const { type, data, user } = message
      instance.messageHandler[type] && instance.messageHandler[type](data, user)
    }
  }
}
// 初始化消息连接
// 并发送用户加入绘图消息
export const install = (_instance) => {
  instance = _instance
  const { user } = instance
  initWebSocket(null, [instance.user.id])
  sendWebsocket({ type: 'join', data: unref(user) })
  window.addEventListener('onmessageWS', getSocketData)

  // 定时器发送数据

  // 为什么做这一步，也是考虑尽量少的网络请求
  // 在changeList的生成阶段，有过对新增+撤销动作的抵消处理
  // 如果后台支持，可以考虑增加合并请求
  setInterval(() => {
    if (changeList && changeList.length) {
      sendWebsocket(changeList.shift())
    }
  }, 200)
}

// 关闭连接
export const destory = () => {
  window.removeEventListener('onmessageWS', getSocketData)
  closeWebsocket()
}
