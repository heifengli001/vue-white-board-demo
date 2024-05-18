let instance = null
const changeList = []
// 用来注册监听事件
export const bindEvents = (_instance) => {
  instance = _instance
  instance.logicFlow.on(
    'node:dbclick,node:delete,node:add,node:drop,edge:dbclick,edge:add,edge:delete,edge:adjust,edge:exchange-node,anchor:dragstart,text:update',
    (event) => {
      if (instance.mode == 'edit') {
        // 这些事件是强制推送更新
        const graphData = instance.logicFlow.getGraphData()
        console.log('panel-changed', event, graphData)
        changeList.push(event)
      }
    }
  )
}

// 注销监听
export const unBindEvents = (_instance) => {
  _instance.logicFlow.off(
    'node:dbclick,node:delete,node:add,node:drop,edge:dbclick,edge:add,edge:delete,edge:adjust,edge:exchange-node,anchor:dragstart,text:update'
  )
}
