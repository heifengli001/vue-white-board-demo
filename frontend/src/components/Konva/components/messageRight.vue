<template>
  <div class="message-container">
    <div class="title">画板消息({{ messageCount }})</div>
    <div class="message-list" v-if="props.messages">
      <div class="message-list-item" v-for="item in reverseMessages" :key="item.time">
        {{ item.text }}
        <div class="time">{{ formatTime(item.time) }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from '@vue/reactivity'
import dayjs from 'dayjs'
const props = defineProps({
  messages: Array
})
const messageCount = computed(() => {
  const len = (props.messages && props.messages.length) || 0
  return len > 999 ? '999+' : len
})

const formatTime = (time) => {
  return dayjs(time).format('HH:mm:ss')
}
const reverseMessages = computed(() => {
  return props.messages && props.messages.slice().reverse()
})
</script>
<style lang='less' scoped>
.message-container {
  background: #ffffff;
  border-top: 3px solid #eeeeee;
  text-align: center;
  box-sizing: border-box;
  font-size: 14px;
  color: #333333;
  .title {
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #eeeeee;
  }
  .message-list {
    padding: 10px;
    font-size: 13px;
    color: #666666;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    text-align: left;
    &-item {
      padding: 2px 12px;
      .time{
        font-size: 12px;
        color:#999999;
        transform: scale(0.8);
        transform-origin:left top;
      }
    }
  }
}
</style>