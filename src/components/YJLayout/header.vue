<script setup>
import { LayoutHeader } from 'ant-design-vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
defineOptions({
  name: 'YJHeader'
})

const props = defineProps({
  bgColor: {
    type: String,
    default: '#fff'
  },
  triggerPosition: {
    type: String,
    default: 'header'
  },
  isFold: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['changeFold'])
const changeFold = () => {
  emits('changeFold', !props.isFold)
}
</script>

<template>
  <LayoutHeader
    class="yj-header"
    :style="{ background: bgColor, opacity: 0.95 }"
  >
    <!-- 控制器在头部 -->
    <template v-if="triggerPosition === 'header'">
      <menu-unfold-outlined
        class="yj-icon-fold"
        v-if="isFold"
        @click="changeFold"
      />
      <menu-fold-outlined
        class="yj-icon-fold"
        v-else
        @click="changeFold"
      />
    </template>
    <template v-else-if="triggerPosition === 'bottom'">
      <slot name="headerLeftContent" />
    </template>
    <div v-else></div>
    <slot name="headerRightContent" />
  </LayoutHeader>
</template>

<style lang="less" scoped>
.yj-header {
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .yj-icon-fold {
    cursor: pointer;
    font-size: 18px;
  }
}
</style>
