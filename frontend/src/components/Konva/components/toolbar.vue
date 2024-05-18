<template>
  <div class="konva-toolbar">
    <div class="konva-toolbar-item">
      <el-tooltip class="box-item" effect="light" content="使用画笔" placement="bottom">
        <el-button
          link
          :icon="brushIcon"
          @click="useBrush"
          :class="toolsOption.mode == 'brush' ? 'is-active' : ''"
        ></el-button>
      </el-tooltip>
    </div>
    <div class="konva-toolbar-item">
      <el-tooltip class="box-item" effect="light" content="使用橡皮擦" placement="bottom">
        <el-button
          link
          :icon="eraserIcon"
          @click="useEraser"
          :class="toolsOption.mode == 'eraser' ? 'is-active' : ''"
        ></el-button>
      </el-tooltip>
    </div>
    <div class="konva-toolbar-item">
      <el-popover
        placement="bottom"
        title="修改画笔/橡皮尺寸"
        :width="200"
        trigger="hover"
      >
        <template #reference>
          <el-button link :icon="brushSizeIcon" ></el-button>
        </template>
        <template #default>
          <el-slider :min="1" :max="50" v-model="toolsOption.brushSize"  @change="brushSizeChange" />
        </template>
      </el-popover>
    </div>
    <div class="konva-toolbar-item">
      <el-tooltip class="box-item" effect="light" content="画笔颜色" placement="bottom">
        <span><el-color-picker v-model="toolsOption.brushColor" @change="colorChange" /></span>
      </el-tooltip>
    </div>

    <div class="konva-toolbar-item">
      <el-tooltip class="box-item" effect="light" content="拖拽" placement="bottom">
        <el-button
          link
          :icon="dragMoveIcon"
          @click="drag"
          :class="toolsOption.isDrag ? 'is-active' : ''"
        ></el-button>
      </el-tooltip>
    </div>
    <div class="konva-toolbar-item">
      <el-tooltip class="box-item" effect="light" content="后退" placement="bottom">
        <el-button link :icon="gobackIcon" @click="back"></el-button>
      </el-tooltip>
    </div>
    <div class="konva-toolbar-item">
      <el-tooltip class="box-item" effect="light" content="清空画布" placement="bottom">
        <el-button link :icon="clearIcon" @click="del"></el-button>
      </el-tooltip>
    </div>
 
  </div>
</template>
<script setup>
import brushIcon from '@/assets/icons/brush.svg?component'
import eraserIcon from '@/assets/icons/eraser.svg?component'
import brushSizeIcon from '@/assets/icons/brush-size.svg?component'
import gobackIcon from '@/assets/icons/goback.svg?component'
import clearIcon from '@/assets/icons/clear.svg?component'
import dragMoveIcon from '@/assets/icons/drag-move.svg?component'
import { nextTick } from 'vue'
const props = defineProps({ instance: Object, user: Object })
const toolsOption = reactive({
  mode: 'brush', //brush 画笔 eraser
  brushColor: '#df4b26',
  isDrag: false,
  brushSize: 5
})
const { instance, user } = props
// 定义工具栏方法

// 清空画布
function del() {
  ElMessageBox.confirm('清空画布将会影响所有绘画的人哦。', '确认要清空画布？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      const { layer } = instance
      layer.destroyChildren()
      layer.draw()
      useBrush()
      nextTick(() => {
        instance.onChanged({ type: 'destory' })
      })
    })
    .catch(() => {})
}
// 后退
// 后退删除 做了name过滤 仅允许后退自己的操作
function back() {
  const { layer } = instance
  const items = layer.children
  if (items.length) {
    let myItems = items.filter((item) => item.attrs.name === 'u' + user.id)
    if (myItems && myItems.length > 0) {
      let lastItem = myItems[myItems.length - 1]
      lastItem.destroy()
      layer.draw()
      nextTick(() => {
        instance.onChanged({ type: 'back', data: { id: lastItem.attrs.id } })
      })
    }
  }
}
// 修改画笔颜色
function colorChange(color) {
  // 修改画笔颜色
  const { options } = instance
  options.line.stroke = color

  options.line.globalCompositeOperation = 'source-over'
}
// 使用笔刷
function useBrush() {
  const { options } = instance

  toolsOption.mode = 'brush'
  options.line.globalCompositeOperation = 'source-over'
}
// 使用橡皮擦
function useEraser() {
  const { options } = instance
  toolsOption.mode = 'eraser'
  options.line.globalCompositeOperation = 'destination-out'
}
function brushSizeChange(size){
  const { options } = instance
  options.line.strokeWidth = size

}
// 拖拽
function drag() {
  const { stage, options } = instance
  options.isEdit = !options.isEdit
  toolsOption.isDrag = !toolsOption.isDrag

  stage.draggable(toolsOption.isDrag)
}
</script>
<style lang='less' scoped>
.konva-toolbar {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 999;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  display: flex;
  :deep(.el-button) {
    color: #666666;
    font-size: 24px;
  }
  .konva-toolbar-item {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .is-active {
    color: #1a5ef7;
  }
  :deep(.el-color-picker__trigger) {
    border: none;
    width: 24px;
    height: 24px;
  }
}
</style>