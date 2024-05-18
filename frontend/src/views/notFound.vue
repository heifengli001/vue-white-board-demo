<template>
  <div class="not-found-container">
    <el-empty description="当前页面不存在">
      <el-button type="primary" @click="router.replace('/')">回到首页</el-button>
    </el-empty>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<style lang='less' scoped>
.not-found-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
</style>