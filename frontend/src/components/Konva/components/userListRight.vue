<template>
  <div class="konva-user-list-right-container">
    <div class="title">
      当前在线成员<span>({{ userCount }}人)</span>
    </div>
    <ul class="user-list">
      <li v-for="item in userList" :key="item.id">
        <el-avatar
          class="avatar"
          :size="25"
          :src="item.avatar"
          :style="{ backgroundColor: hexColors[Math.floor(Math.random() * hexColors.length)] }"
        >
          <span>{{ item.nickName[0] }}</span>
        </el-avatar>
        <span class="name">{{ item.nickName }}</span>
      </li>
      <li class="more" key="more" v-if="props.users && props.users.length > maxLength">...</li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps(['users'])
const maxLength = 6
const hexColors = [
  '#C0C0C0',
  '#808080',
  '#800000',
  '#808000',
  '#008000',
  '#800080',
  '#008080',
  '#000080',
  '#FFA500',
  '#FFC0CB',
  '#FF69B4',
  '#EB8C00'
]

const userCount = computed(() => {
  const len = (props.users && props.users.length) || 1
  return len > 99 ? '99+' : len
})

const userList = computed(() => {
  return props.users && props.users.length ? props.users.slice(0, maxLength) : []
})
</script>
<style lang='less' scoped>
.konva-user-list-right-container {

  background-color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  padding: 10px 0;
  box-sizing: border-box;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  .title {
    font-size: 14px;
    color: #333333;
    border-bottom: 1px solid #ddd;
    padding: 0 8px 4px 8px;
    text-align: center;
    span {
      font-size: 12px;
      color: #999999;
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    li {
      width: 100%;
      padding: 0 12px;
      height:42px;
      line-height: 42px;
      border-bottom: 1px solid #e6e6e6;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #666666;
      .avatar {
        margin-right: 6px;
        flex-shrink: 0;
        flex-grow: 0;
      }
      .name {
        display: inline-block;
        word-break: break-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &:last-child {
        border-bottom: none;
      }
    }
    .more {
      height: 12px;
      line-height: 12px;
      color: #999999;
    }
  }
}
</style>