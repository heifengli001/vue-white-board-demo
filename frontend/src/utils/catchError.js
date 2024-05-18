// 定义一个统一的错误收集方法，能够收集 window.onerror 和 promise.reject 的错误
//
export const catchError = () => {
  return 
  window.onerror = (msg, url, line, col, error) => {
    console.log(msg)
    console.log('收集错误：',{ type: 'onerror', message:msg })
  }
  window.addEventListener('unhandledrejection', (e) => {
    e.preventDefault()
    console.log('收集错误：',{ type: 'promise', message: e.reason.message })
  })
  window.addEventListener('error', (e) => {
    e.preventDefault()
    console.log('收集错误：',{ type: 'listener', message: e.message })
  })
}
