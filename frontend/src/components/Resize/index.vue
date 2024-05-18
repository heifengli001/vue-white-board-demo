<template>
  <div
    class="resize-component-container"
    ref="containerRef"
    :style="{ width: option.containerWidth + 'px', height: option.containerHeight + 'px' }"
  >
    <div
      class="left"
      :style="{ width: option.leftWidth ? option.leftWidth + 'px' : 'auto' }"
      ref="leftRef"
    >
      <slot name="left"></slot>
    </div>
    <div class="drag" @mousedown="mouseDown">||</div>
    <div class="right" :style="{ width: rightWidth + 'px' }" ref="rightRef">
      <slot name="right"></slot>
    </div>
  </div>
</template>
  <script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { debounce } from 'lodash-es'
const containerRef = ref('')
const leftRef = ref()
const rightRef = ref()
const props = defineProps({
  width: Number,
  minLeftWidth: Number,
  minRightWidth: Number,
  offsetX: {
    type: Number,
    default: () => {
      return 0
    }
  },
  offsetY: {
    type: Number,
    default: () => {
      return 60
    }
  }
})
const emits = defineEmits(['winResize', 'dragEnd', 'drag', 'initSize'])

const dragWidth = 8
// 定义左侧宽度
const option = reactive({
  leftWidth: 0,
  containerWidth: 0,
  containerHeight: 0
})
// 静态配置
const constOption = {
  isDrag: false,
  startClientX: 0,
  startLeftWidth: 0
}
// 右侧宽度由左侧宽度计算
const rightWidth = computed(() => {
  return option.containerWidth - option.leftWidth - dragWidth
})

const mouseDown = (e) => {
  constOption.isDrag = true
  constOption.startClientX = e.clientX
  constOption.startLeftWidth = unref(option.leftWidth)
}
const mouseUp = (e) => {
  if (!constOption.isDrag) return
  constOption.isDrag = false
  console.log('mouseUp', e)
  emits('dragEnd', {
    ...option,
    rightWidth: rightWidth.value,
    dragWidth
  })
}

const mouseMove = (e) => {
  if (!constOption.isDrag) return
  //   console.log('mouseMove', e)
  option.leftWidth = e.clientX - constOption.startClientX + constOption.startLeftWidth

  emits('drag', {
    ...option,
    rightWidth: rightWidth.value,
    dragWidth
  })
}

const mouseMove_Debounce = debounce(mouseMove, 6)
const winResize = () => {
  const parentRef = containerRef.parent || document.body
  let { clientWidth, clientHeight } = parentRef
  const scale = clientWidth / option.containerWidth
  option.containerWidth = clientWidth - props.offsetX
  option.containerHeight = clientHeight - props.offsetY
  option.leftWidth = option.leftWidth * scale
  emits('winResize', {
    ...option,
    rightWidth: rightWidth.value,
    dragWidth,
    scale
  })
}
const winResize_Debounce = debounce(winResize, 200)

onMounted(() => {
  // 如果未设置外尺寸宽度，或者外尺寸宽度小于当前窗体尺寸宽度时，以窗体尺寸为准
  const parentRef = containerRef.parent || document.body
  let { clientWidth, clientHeight } = parentRef
  if (!props.width || props.width > clientWidth) {
    option.containerWidth = clientWidth - props.offsetX
    option.containerHeight = clientHeight - props.offsetY
  }
  const leftElWidth = leftRef.value.clientWidth
  const rightElWidth = rightRef.value.clientWidth
  console.log(leftElWidth, rightElWidth)
  if (!leftElWidth) {
    option.leftWidth = clientWidth - rightElWidth - dragWidth
  }
  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
  window.addEventListener('resize', winResize_Debounce)

  // 抛出事件告知外部尺寸
  emits('initSize', { ...option, rightWidth: rightWidth.value, dragWidth })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', mouseUp)
  window.removeEventListener('resize', winResize_Debounce)
})
</script>
  <style lang='less' scoped>
.resize-component-container {
  height: 100%;
  display: flex;
  //   overflow: hidden;
  .drag {
    width: 8px;
    height: 100%;
    background: #dddddd;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #999;
  }
  .left {
    display: inline-block;
    height: 100%;
    background-color: #f0f0f0;
  }
  .right {
    display: inline-block;
    height: 100%;
    background-color: #f0f0f0;
  }
}
</style>