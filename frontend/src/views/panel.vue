<template>
  <div class="panel-container">
    <headerComponent>
      <template #center
        >这里是画板名称
        <el-button
          link
          @click="
            () => {
              toggle(mode == 'view' ? 'edit' : 'view')
            }
          "
        >
          <span
            ><el-tooltip
              class="box-item"
              effect="light"
              :content="`切换为${mode == 'edit' ? '查看' : '编辑'}`"
              placement="bottom"
              ><viewIcon v-if="mode == 'edit'" /><editIcon v-else /> </el-tooltip
          ></span>
          <!-- {{ mode == 'edit' ? '查看' : '编辑' }} -->
        </el-button>
      </template>
    </headerComponent>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@logicflow/core/dist/style/index.css"
    />
    <el-empty :description="loading.text" v-if="loading.state" />
    <logicFlow ref="logicFlowRef" :mode="mode" :data="data" v-else></logicFlow>
  </div>
</template>
<script setup>
import headerComponent from '@/components/Header/index.vue'
import logicFlow from '@/components/LogicFlow/index.vue'
import viewIcon from '@/assets/icons/view.svg?component'
import editIcon from '@/assets/icons/edit.svg?component'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getPanelData } from '@/api/panel'
const route = useRoute()
const panelId = route.params.panelId
const loading = reactive({ state: true, text: '正在努力加载画板中，请稍后' })
const data = ref({})
const mode = ref('view')
const toggle = (type) => {
  mode.value = type
}
const initBoard = () => {
  getPanelData(panelId)
    .then((result) => {
      data.value = result
      loading.state = false
    })
    .catch(() => {
      loading.text = '流程图画板加载失败，请刷新重试'
    })
}
initBoard()
</script>
<style lang='less' scoped>
.panel-container {
  width: 100%;
  height: 100%;
}
</style>