<script setup>
import { Button, Popconfirm } from 'ant-design-vue'
import { useAttrs, computed, ref } from 'vue'
import YJModal from '../YJModal'

defineOptions({
  name: 'YJButton'
})
const props = defineProps({
  confirm: Object | Boolean,
  modal: Object
})

const emits = defineEmits(['click'])
// props剩余属性
const attrs = useAttrs()

// 气泡弹窗属性
const confirmProps = computed(() => {
  if (typeof props.confirm === 'object') {
    return props.confirm
  }
  return {
    cancelText: '取消',
    okText: '确定',
    title: '确定删除'
  }
})

const modalRef = ref()
const open = () => {
  modalRef.value.open()
}

const click = e => {
  emits('click', e)
}
</script>

<template>
  <!-- 气泡弹窗 -->
  <Popconfirm
    v-if="props.confirm"
    :="{ ...confirmProps }"
    @confirm="click"
  >
    <Button :="{ ...attrs }">
      <slot />
    </Button>
  </Popconfirm>

  <template v-else-if="props.modal">
    <Button
      :="{ ...attrs }"
      @click="open"
    >
      <slot />
    </Button>
    <YJModal
      ref="modalRef"
      :="{ ...props.modal }"
      @finish="click"
    />
  </template>

  <Button
    v-else
    :="{ ...attrs }"
    @click="click"
  >
    <slot />
  </Button>
</template>

<!-- 事件 -->
<!-- click -->

<!-- 可配置 -->
<!-- 属性 -->
<!-- confirm -->
<!-- modal -->

<!-- 插槽 -->
<!-- 按钮内文字 -->
