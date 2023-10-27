<script setup>
import { Space, Button } from 'ant-design-vue'
import YJForm from '../YJForm'
import { ref } from 'vue'

defineOptions({
  name: 'YJSearchBar'
})

const props = defineProps({
  items: Object,
  searchHidden: Boolean,
  resetHidden: Boolean
})

const emits = defineEmits(['setInitParams'])

const formRef = ref(null)

const search = () => {
  const flied = formRef.value.state
  emits('setInitParams', flied)
}

const reset = () => {
  formRef.value.resetFields()
  search()
}

defineExpose({
  search,
  reset
})
</script>

<template>
  <YJForm
    :items="items"
    layout="inline"
    ref="formRef"
    style="margin-bottom: 20px"
  >
    <Space>
      <Button
        type="primary"
        v-if="!searchHidden"
        @click="search"
      >
        搜索
      </Button>
      <Button
        v-if="!resetHidden"
        @click="reset"
      >
        重置
      </Button>
      <slot name="extra"></slot>
    </Space>
  </YJForm>
</template>

<!-- 事件 -->
<!-- setInitParams 设置初始的搜索参数 和表格配合用于刷新 -->

<!-- 属性 -->
<!-- items 和表单items一致 -->
<!-- searchHidden 搜索按钮隐藏 -->
<!-- resetHidden 重置按钮隐藏 -->

<!-- 暴露的属性 可以使用ref获取 -->
<!-- search 搜索 -->
<!-- reset 重置 -->

<!-- 插槽 -->
<!-- extra 更多操作的位置 用于新增按钮 -->
