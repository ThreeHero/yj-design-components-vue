<script setup>
import { Layout } from 'ant-design-vue'
import Slider from './slider.vue'
import Header from './header.vue'
import Content from './content.vue'
import { computed, ref } from 'vue'

defineOptions({
  name: 'YJLayout'
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
  logo: {
    type: Object,
    default: () => ({ ellipsis: '后台', complete: '后台管理系统' })
  },
  slideMenu: {
    type: Object,
    required: true
  }
})

const isFold = ref(false)
const changeFold = v => {
  isFold.value = v
}

const params = computed(() => {
  return {
    bgColor: props.bgColor,
    isFold: isFold.value,
    triggerPosition: props.triggerPosition
  }
})
</script>

<template>
  <Layout class="yj-layout">
    <Slider
      :="{ ...params }"
      :logo="logo"
      :slideMenu="slideMenu"
      @change-fold="changeFold"
    />
    <Layout>
      <Header
        :="{ ...params }"
        @change-fold="changeFold"
      >
        <template #headerLeftContent>
          <slot name="headerLeftContent" />
        </template>
        <template #headerRightContent>
          <slot name="headerRightContent" />
        </template>
      </Header>
      <Content>
        <slot />
      </Content>
    </Layout>
  </Layout>
</template>

<style lang="less" scoped>
.yj-layout {
  min-height: 100vh;
  user-select: none;
}
</style>

<!-- 属性 -->
<!-- bgColor 侧边栏和头部背景色 -->
<!-- triggerPosition 触发器位置 bottom header 默认header -->
<!-- logo logo位置 需要包含ellipsis complete 属性 -->
<!-- slideMenu 侧边栏菜单配置 -->

<!-- 插槽 -->
<!-- 内容部分 -->
<!-- headerLeftContent 头部左侧部分 触发器在底部时可用 -->
<!-- headerRightContent 头部右侧位置 -->
