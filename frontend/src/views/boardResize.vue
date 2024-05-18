<template>
  <div class="panel-container">
    <headerComponent>
      <template #center>{{ data && data.title }} </template>
    </headerComponent>

    <el-empty :description="loading.text" v-if="loading.state" />
    <konva ref="konvaRef" :data="data" v-else></konva>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import headerComponent from '@/components/Header/index.vue'
import konva from '@/components/Konva/indexResize.vue'
import { getBoardData } from '@/api/board'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const route = useRoute()
const boardId = route.params.boardId

const loading = reactive({ state: true, text: '正在努力加载画板中，请稍后' })
const data = ref({})
const initBoard = () => {
  getBoardData(boardId)
    .then((result) => {
      data.value = result
      loading.state = false
    })
    .catch(() => {
      loading.text = '画板加载失败，请刷新重试'
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