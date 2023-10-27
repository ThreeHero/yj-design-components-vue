<script setup>
import { List } from 'ant-design-vue'
import { useAttrs, computed, ref, watchEffect } from 'vue'

defineOptions({
  name: 'YJList'
})

const props = defineProps({
  rowKey: {
    type: String,
    default: 'id'
  },
  bordered: {
    type: Boolean,
    default: true
  },
  request: {
    type: Function,
    required: true
  },
  initParams: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['pageChange'])

const attrs = useAttrs()

const list = ref([])
const total = ref(0)
const loading = ref(false)

const requestParams = computed(() => {
  return {
    page: 1,
    pageSize: 10,
    ...props.initParams
  }
})

const getList = async params => {
  loading.value = true
  try {
    const { list: l, total: t } = await props.request(params)
    list.value = l
    total.value = t
  } finally {
    loading.value = false
  }
}

watchEffect(() => {
  getList(requestParams.value)
})
const onChange = pagination => {
  const { current: page, pageSize } = pagination || {}
  emits('pageChange', { ...requestParams.value, page, pageSize })
}
</script>

<template>
  <List
    :bordered="bordered"
    :="{ ...attrs }"
    :data-source="list"
    :row-key="rowKey"
    :loading="loading"
    :pagination="{
      defaultPageSize: requestParams.pageSize,
      total,
      showSizeChanger: true,
      showTotal: total => `共 ${total} 条`,
      pageSizeOptions: [
        requestParams.pageSize * 1,
        requestParams.pageSize * 2,
        requestParams.pageSize * 3,
        requestParams.pageSize * 4
      ]
    }"
    @change="onChange"
  >
    <template #renderItem="data">
      <slot
        name="render"
        :data="data"
      />
    </template>
  </List>
</template>
