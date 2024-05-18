<template>
  <div class="konva-component-container">
    <div id="konva-container" ref="konvaRef"></div>
    <toolbar :instance="instance" :user="user"></toolbar>
    <userList :users="users"></userList>
  </div>
</template>
<script setup>
import Konva from 'konva'
import toolbar from './components/toolbar.vue'
import userList from './components/userList.vue'
import { ref, onMounted, watch, nextTick, reactive } from 'vue'
import { debounce } from 'lodash-es'
import { onChanged } from './events'
import { getUserInfo } from '@/utils/user'
import { useRoute } from 'vue-router'
import { install as installWs, destory as destoryWs } from './wsMessage'
import { setCache } from '@/utils/cache/konva'
// vue3获取路由参数的id
const route = useRoute()
const boardId = route.params.boardId
// 用户信息
const user = reactive(getUserInfo())
// 画板中的用户列表
const konvaRef = ref()
const props = defineProps(['data'])
const users = reactive([user, ...props.data.userList])
const defaultWidth = 1200
const instance = reactive({
  id: boardId,
  ref: konvaRef,
  layer: null,
  stage: null,
  user,
  users,
  onChanged: function (data) {
    // 此处带上user
    setCache(boardId, instance.layer.toJSON()), onChanged({ user, ...data })
  },
  options: {
    isEdit: true,
    line: {
      stroke: '#df4b26',
      strokeWidth: 5,
      globalCompositeOperation: 'source-over',
      lineCap: 'round',
      lineJoin: 'round'
    }
  }
})

let lastWinSize = null
// 该方法必须在onMounted中调用，否则无法获取到dom元素
// 初始化画板
const initKonva = () => {
  lastWinSize = getWinSize()
  instance.stage = new Konva.Stage({
    container: konvaRef.value,
    ...lastWinSize,
    scaleX: lastWinSize.width / defaultWidth,
    scaleY: lastWinSize.width / defaultWidth
  })
  instance.layer = new Konva.Layer()

  instance.stage.container().style.backgroundColor = '#eeeeee'
  // 数据填充
  nextTick(() => {
    const { data } = props
    const boardData = data && data.boardData && JSON.parse(data.boardData)
    if (boardData && boardData.children && boardData.children.length) {
      boardData.children.forEach((item) => {
        const lineNode = new Konva.Line(item)
        instance.layer.add(lineNode)
      })
    }
  })
}
// 监听画布修改事件
// 初始化笔刷
const initBrush = () => {
  let isPaint = false
  const { stage, layer, options } = instance
  // 因为user属于异步请求结果，务必使用toRef保持绑定关系
  let lastLine = null
  stage.on('mousedown touchstart', function (e) {
    if (options.isEdit === false) return
    isPaint = true
    var pos = stage.getRelativePointerPosition()
    lastLine = new Konva.Line({
      ...options.line,
      id: user.id + '-' + Number(Date.now()),
      name: 'u' + user.id,
      points: [pos.x, pos.y, pos.x, pos.y]
    })
    layer.add(lastLine)
  })

  stage.on('mouseup touchend', function () {
    if (options.isEdit === false) return
    isPaint = false
    nextTick(() => {
      instance.onChanged({ type: 'paint', data: lastLine.attrs })
    })
  })
  // and core function - drawing
  stage.on('mousemove touchmove', function (e) {
    if (options.isEdit === false) return
    if (!isPaint) {
      return
    }
    // prevent scrolling on touch devices
    e.evt.preventDefault()
    const pos = stage.getRelativePointerPosition()
    var newPoints = lastLine.points().concat([pos.x, pos.y])
    lastLine.points(newPoints)
  })
}

const initZoom = () => {
  const { stage } = instance
  var scaleBy = 1.1
  stage.on('wheel', (e) => {
    // stop default scrolling
    e.evt.preventDefault()

    var oldScale = stage.scaleX()
    var pointer = stage.getPointerPosition()

    var mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale
    }

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? 1 : -1
    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction
    }

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

    stage.scale({ x: newScale, y: newScale })

    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale
    }
    stage.position(newPos)
  })
}

/**  监听窗体变化，变化后调整画布尺寸和居中 **/
// 此操作会造成再次重绘，所以调用前务必使用防抖
const getWinSize = () => {
  let { clientWidth: width, clientHeight: height } = document.body
  return {
    width,
    height: height - 60
  }
}
const handlerWinResize = () => {
  const { width, height } = getWinSize()

  const { stage } = instance
  // 计算比例尺，将图片缩小
  const scale = width / lastWinSize.width
  var oldScale = stage.scaleX()
  var newScale = oldScale * scale
  stage.scale({ x: newScale, y: newScale })

  instance.stage.width(width)
  instance.stage.height(height)
  instance.stage.draw()
  // 将画布居中
  instance.stage.position({
    x: 20,
    y: 20
  })
  lastWinSize = { width, height }
}
// 此处监听防抖处理，优化
const handlerWinResize_Debounce = debounce(handlerWinResize, 200)

onMounted(() => {
  initKonva()
  initBrush()
  initZoom()
  const { stage, layer } = instance
  stage.add(layer)
  window.addEventListener('resize', handlerWinResize_Debounce)
  // 注册websocket事件
  installWs(instance)
  instance.messageHandler = {
    // 用户加入事件处理
    join: (data) => {
      // 将 data 添加到user数组的第一个
      if (users.find((item) => item.id === data.id)) return
      {
        users.unshift(data)
        ElNotification({
          title: `${data.nickName} 加入画板咯`
          // message: h('i', { style: 'color: teal' }, 'This is a reminder')
        })
      }
    },
    // 用户离开事件处理
    leave: (data) => {
      // todo sth
      let index = users.findIndex((t) => t.id === data.id)
      if (index > -1) {
        users.splice(index, 1)
        ElNotification({
          title: `${data.nickName} 离开画板咯`
        })
      }
    },
    // 绘图动作的处理
    paint: (data) => {
      const lineNode = new Konva.Line(data)
      layer.add(lineNode)
      layer.draw()
    },

    // 回退动作处理
    back: (data) => {
      // todo sth
      const { layer } = instance
      const items = layer.children
      if (items.length) {
        let delItem = items.find((item) => item.attrs.id === data.id)
        if (delItem) {
          delItem.destroy()
          layer.draw()
        }
      }
    },
    // 清空画布处理
    destory: () => {
      const { layer } = instance
      layer.destroyChildren()
      layer.draw()
    }
  }
})

// 组件被卸载时移除监听
onUnmounted(() => {
  window.removeEventListener('resize', handlerWinResize_Debounce)
  destoryWs()
  // 还需移除其他监听
})
</script>
<style lang='less' scoped>
.konva-component-container {
  position: relative;
}
</style>