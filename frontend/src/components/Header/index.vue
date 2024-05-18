<template>
  <el-header class="component-header-container">
    <div class="left" @click="router.push('/')">
      <logoSvg />
      DEMO
    </div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right">
      你好，<span>{{ user.nickName }}</span>
    </div>
  </el-header>
</template>
<script setup>
import logoSvg from '@/assets/icons/logo-blue.svg?component'
import { reactive } from 'vue'
import { getUserInfo } from '@/utils/user'
import {useRouter} from 'vue-router'
const router = useRouter()
const user = reactive(getUserInfo())
</script>
<style lang='less' scoped>
.component-header-container {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cccccc;
  font-size: 24px;
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666666;
    font-size: 18px;
    svg {
      height: 32px;
      width: 32px;
      fill: #ffffff;
      margin-right: 4px;;
    }
  }
  .center{

  }
  .right{
    font-size: 12px;
    color: #fff;
    padding: 4px 8px;
    border-radius: 10px;
    background: linear-gradient(
        230.47deg,
        #ffbf1c -0.87%,
        #ff3a3a 25.89%,
        #ff123d 77.87%,
        #ff27c3 97.94%
      ),
      #e73828;
    span {
      font-weight: bolder;
    }
  }
}
</style>