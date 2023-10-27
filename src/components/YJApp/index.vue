<script setup>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { computed, useAttrs } from 'vue'

defineOptions({
  name: 'YJApp'
})
const props = defineProps({
  token: Object,
  language: Object
})

const locale = computed(() => {
  return language ?? zhCN
})

const attrs = useAttrs()
</script>

<template>
  <ConfigProvider
    :="{ ...attrs }"
    :local="locale"
    :theme="{ token }"
  >
    <slot />
  </ConfigProvider>
</template>
