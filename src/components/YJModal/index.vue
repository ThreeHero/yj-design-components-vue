<script setup>
import { Drawer, Modal, Button, Space } from 'ant-design-vue'
import { computed, ref, useAttrs } from 'vue'
import YJForm from '../YJForm'

defineOptions({
  name: 'YJModal'
})
const props = defineProps({
  // 弹窗还是抽屉
  isM: {
    type: Boolean,
    default: true
  },
  title: String,
  items: Object
})

const emits = defineEmits(['finish'])

const attrs = useAttrs()

const formRef = ref(null)

const component = props.isM ? Modal : Drawer
const o = ref(false)

const changeOpen = flag => {
  o.value = flag
}

const open = () => changeOpen(true)
const close = () => changeOpen(false)

const t = computed(() => {
  return props.title ?? (props.items?.r ? '编辑' : '新增')
})

const finish = async () => {
  try {
    const values = await formRef.value.validate()
    emits('finish', values)
    close()
  } catch (e) {
    console.error(e)
  }
}

defineExpose({
  open,
  close
})
</script>

<template>
  <component
    :="{ ...attrs }"
    :is="component"
    :open="o"
    @cancel="close"
    @close="close"
    :title="t"
    cancelText="取消"
    okText="完成"
    destroyOnClose
    @ok="finish"
  >
    <YJForm
      :items="items?.data || []"
      ref="formRef"
      :data="items?.r || {}"
    />
    <template #extra>
      <Space>
        <Button @click="close">取消</Button>
        <Button
          @click="finish"
          type="primary"
        >
          完成
        </Button>
      </Space>
    </template>
  </component>
</template>

<!-- 事件 -->
<!-- finish 完成提交时的事件 -->

<!-- 属性 -->
<!-- isM 判断是使用 弹窗 还是 抽屉 默认 true 弹窗 -->
<!-- title 标题 -->
<!-- items 是一个对象 里面包含和form的items一致的r 和数据data -->

<!-- 暴露的属性 可以使用ref获取 -->
<!-- open 打开 -->
<!-- close 关闭 -->
