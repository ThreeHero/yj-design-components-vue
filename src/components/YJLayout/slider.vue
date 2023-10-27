<script setup>
import { LayoutSider, Menu } from 'ant-design-vue'
import { computed } from 'vue'

defineOptions({
  name: 'YJSlider'
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
  },
  logo: {
    type: Object,
    required: true
  },
  slideMenu: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['changeFold'])
const changeFold = () => {
  emits('changeFold', !props.isFold)
}

const yjLogo = computed(() => {
  return props.isFold ? props.logo.ellipsis : props.logo.complete
})
</script>

<template>
  <LayoutSider
    class="yj-slide"
    :collapsed="isFold"
    :style="{ background: bgColor }"
    :collapsible="triggerPosition === 'bottom'"
    @collapse="changeFold"
  >
    <div class="yj-logo">{{ yjLogo }}</div>
    <Menu
      mode="inline"
      :="{ ...slideMenu }"
    />
  </LayoutSider>
</template>

<style lang="less" scoped>
.yj-slide {
  background-color: transparent;

  .yj-logo {
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 18px;
    font-weight: 700;
    overflow: hidden;
  }

  /deep/.ant-layout-sider-trigger {
    background: transparent;
    position: absolute;
  }

  .ant-menu {
    background-color: transparent;
  }
  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      background-color: #fff;
    }
  }
}
</style>
