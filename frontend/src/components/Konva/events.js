// 触发changed事件，用来上传改变队列和缓存内容
export function onChanged(event) {
  postChange(event)
}

export const changeList = []
const postChange = (event) => {
  const { type, data } = event
  if (type == 'back' && changeList.length) {
    let index = changeList.findIndex((item) => item.data.attrs.id === data.attrs.id)
    if (index > -1) {
      return
    }
  }
  changeList.push(event)
}




