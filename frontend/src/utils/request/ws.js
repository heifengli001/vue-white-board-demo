let socket = null // 存储 WebSocket 连接.

let isConnecting = false // 是否正在连接

const pingTimeout = 10000 // 心跳时间 暂定10s
let pintTimeoutObj = null // 心跳定时器

const maxReconnectTimes = 5 // 重连次数
let reconnectTimes = 0
const socketConfig = {
  url: 'ws://localhost:7788'
}
// 初始化ws服务
export const initWebSocket = function (url, portocol) {
  let weburl = url || socketConfig.url
  if (!WebSocket) {
    console.log('您的浏览器不支持websocket')
    return
  }
  if (!socket || socket.readyState !== 1) {
    socket && socket.close()

    socket = new WebSocket(weburl, [portocol])

    socket.onopen = socketOnOpen
    socket.onclose = socketOnClose
    socket.onerror = socketOnError
    socket.onmessage = socketOnMessage

    isConnecting = true
  } else {
    console.log('ws已经连接了')
  }
}

// 发送消息
export const sendWebsocket = function (message) {
  let messageStr = ''
  try {
    messageStr = JSON.stringify(message)
  } catch {
    messageStr = message
  }
  if (!socket || socket.readyState === 2 || socket.readyState === 3) {
    reconnect()
    setTimeout(() => {
      sendWebsocket(messageStr)
    }, 500)
    return
  }
  if (socket.readyState === 0) {
    // 如果连接未准备好，等待500ms后重新发送
    setTimeout(() => {
      sendWebsocket(messageStr)
    }, 500)
  } else {
    socket.send(messageStr)
  }
}

/**
 * 关闭websocket函数
 */
export const closeWebsocket = function () {
  if (socket) {
    socket.close()
  }
  clearTimeout(pintTimeoutObj)
}

// websocket连接打开监听，此时开启心跳
function socketOnOpen() {
  isConnecting = false
  reconnectTimes = 0
  start()
}
// 开启心跳
function start() {
  pintTimeoutObj && clearTimeout(pintTimeoutObj)
  pintTimeoutObj = setInterval(() => {
    // 这里发送一个心跳，后端收到后返回一个心跳消息
    if (socket.readyState === 1) {
      socket.send('ping')
    } else {
      // 重连
      reconnect()
    }
  }, pingTimeout)
}
// 重连
function reconnect() {
  if (isConnecting || reconnectTimes >= maxReconnectTimes) {
    return
  }
  isConnecting = true
  reconnectTimes++
  initWebSocket()
}
function socketOnClose() {
  console.log('socket已经关闭')
}

function socketOnError() {
  reconnect()
  console.log('socket 连接失败')
}

// ws接收消息时，发送自定义事件，使用时监听此事件
function socketOnMessage({ data }) {
  let recMessage = ''
  try {
    recMessage = JSON.parse(data)
  } catch {
    recMessage = data
  }
  window.dispatchEvent(
    new CustomEvent('onmessageWS', {
      detail: { data: recMessage }
    })
  )
}
// 重置心跳
