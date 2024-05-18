<template>
  <div class="logic-flow-component-container">
    <div id="logic-flow-container" ref="logicFlowRef"></div>
  </div>
</template>
<script setup>
import LogicFlow from '@logicflow/core'
import { Control, Menu, DndPanel, SelectionSelect, Group } from '@logicflow/extension'
import { registerNodes } from './nodes/index'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import { onMounted, reactive, onUnmounted, ref, watch } from 'vue'
import { editConfig, silentConfig, styleConfig } from './config'
import { bindEvents, unBindEvents } from './events'
import { debounce } from 'lodash-es'
const logicFlowRef = ref()
const props = defineProps({ mode: String, data: Object })
const mode = toRef(props, 'mode')
const panel = reactive({ ref: logicFlowRef, logicFlow: null, mode })
watch(mode, (val) => {
  toggleMode(val)
})
const toggleMode = (type = 'view') => {
  if (panel.logicFlow) {
    if (type == 'edit') {
      panel.logicFlow.updateEditConfig(editConfig)
      registerNodes(panel.logicFlow)
    } else {
      panel.logicFlow.updateEditConfig(silentConfig)
      panel.logicFlow.extension.dndPanel.setPatternItems([])
    }
  }
}

const handlerWindowResize = () => {
  let { clientWidth: width, clientHeight: height } = document.body
  height = height - 60
  panel.logicFlow.resize(width, height)
  panel.logicFlow.translateCenter()
}

const initPanle = () => {
  let { clientWidth: width, clientHeight: height } = document.body
  panel.logicFlow = new LogicFlow({
    container: logicFlowRef.value,
    grid: true,
    width,
    height,
    ...silentConfig,
    ...styleConfig,
    plugins: [Control, Menu, DndPanel, Group, SelectionSelect]
  })

  // 加载数据
  if (props.data && props.data.panelData) {
    panel.logicFlow.render(JSON.parse(props.data.panelData))
  } else {
    panel.logicFlow.render()
  }
  panel.logicFlow.translateCenter()

  bindEvents(panel)
}

// 此处监听防抖处理，优化
const handlerWindowResize_Debounce = debounce(handlerWindowResize, 200)
onMounted(() => {
  initPanle()

  handlerWindowResize()
  window.addEventListener('resize', handlerWindowResize_Debounce)
})

// 组件被卸载时移除监听
onUnmounted(() => {
  window.removeEventListener('resize', handlerWindowResize_Debounce)

  unBindEvents(panel)
})
defineExpose({ toggleMode })
</script>
<style lang='less' scoped>
.logic-flow-component-container {
  width: 100%;
  height: 100%;
}
</style>