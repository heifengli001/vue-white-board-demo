
<template>
  <div class="home-container">
    <headerComponent />
    <div class="home-container-main">
      <div class="slogan">让思维流动，让协作更简单</div>
      <div class="slogan-en">Let Thoughts Flow, Make Collaboration Easier</div>
      <div class="start-input">
        <el-input size="large" v-model="panelId" placeholder="输入画板Id加入画板">
          <template #append
            ><el-button type="danger" @click="joinPanel"> 开始加入</el-button></template
          >
        </el-input>
      </div>
      <div class="banner-image">
        
        <img :src="homeImg" />
      </div>
    </div>
    <div class="home-container-footer">
      这是一个Demo | Code: vue3、vite、Element-Plus、logic-flow(绘图开源组件) | Design灵感:
      花瓣，Coze(GPT4),墨刀 | 取名逻辑：协作画图 | Auther: IvanYang
    </div>
  </div>
</template>
<script setup>
import headerComponent from '@/components/Header/index.vue'

import homeImg from '@/assets/images/banner2.png'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { debounce } from 'lodash-es'
import { useRouter } from 'vue-router'
import { joinBoard } from '@/api/board'
const router = useRouter()
const panelId = ref(null)

const joinPanel = debounce(function () {
  if (panelId.value) {
    joinBoard(panelId.value)
      .then((data) => {
        console.log(data);
        router.push({ path: `/boardResize/${panelId.value}` })
      })
      .catch()
  } else {
    ElMessage({ type: 'error', message: '请输入画板Id' })
  }
}, 500)
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  &-main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 60px;
    min-height: calc(100vh - 120px);
    box-sizing: border-box;
    .slogan {
      font-weight: 700 !important;
      font-size: 3rem;
    }
    .slogan-en {
      margin-top: 20px;
      color: #6b707b;
      font-size: 1.25rem;
    }
    .start-input {
      margin-top: 20px;
      :deep(.el-input) {
        width: 320px;
      }
      :deep(.el-input-group__append) {
        background-image: linear-gradient(270deg, #ff8c19 0%, #ff3333 45.67%, #ff2776 98.5%);
        color: #ffffff;
      }
    }
    .banner-image {
      width: 100%;
      height: 50%;
      margin-top: 40px;
      border-radius: 40px;
      overflow: hidden;
      img {
        width: 100%;
        height: 50%;
      }
    }
  }
  &-footer {
    width: 100%;
    height: 60px;
    background-color: #000;
    color: #a8a8a8;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (min-width: 576px) {
  .home-container-main {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .home-container-main {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .home-container-main {
    max-width: 960px;
  }
}
@media (min-width: 1280px) {
  .home-container-main {
    max-width: 1200px;
  }
}
</style>