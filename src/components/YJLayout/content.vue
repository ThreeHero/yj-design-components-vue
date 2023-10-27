<script setup>
import { LayoutContent } from 'ant-design-vue'

defineOptions({
  name: 'YJContent'
})
</script>

<template>
  <LayoutContent class="yj-content">
    <div className="yj-container">
      <slot />
    </div>
  </LayoutContent>
</template>

<style lang="less" scoped>
.yj-content {
  box-sizing: border-box;
  padding: 40px;
  background-color: #f5f5f5;

  /* 滚动条 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  /* 滑轨背景色 */
  ::-webkit-scrollbar-track {
    background-color: rgba(73, 177, 245, 0.2);
  }

  /* 滑块颜色 */
  ::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.4) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.4) 75%,
      transparent 75%,
      transparent
    );
    border-radius: 1em;
  }

  .yj-container {
    overflow-y: auto;
    max-height: calc(100vh - 64px - 80px);
    padding: 40px;
    background-color: #fff;
  }
}
</style>
