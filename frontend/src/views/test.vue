<<template>
  <div class="test-container">
    <resize @winResize="winResizeHandler" @drag="dragHandler" @dragEnd="dragEndHandler">
      <template #left><div style="width:100px">这里是左边</div></template>
      <template #right>这里是右边</template>
    </resize>
  </div>
</template>
<script setup>
import resize from '@/components/Resize/index.vue'
const winResizeHandler = (data) => {
  console.log('winResizeHandler', data)
}
const dragHandler = (data) => {
  console.log('dragHandler', data)
}
const dragEndHandler = (data) => {
  console.log('dragEndHandler', data)
}
</script>
<style lang='less' scoped>
.test-container {
}
</style>>