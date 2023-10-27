<script setup>
import { computed, ref, useAttrs, watchEffect } from 'vue'
import { Table } from 'ant-design-vue'
defineOptions({
  name: 'YJTable'
})
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  initParams: {
    type: Object,
    default: () => ({})
  },
  bordered: {
    type: Boolean,
    default: true
  },
  request: {
    type: Function,
    required: true
  },
  align: {
    type: String,
    default: 'center'
  },
  seral: {
    type: Boolean
  },
  ellipsis: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['pageChange'])

const attrs = useAttrs()

const list = ref([])
const total = ref(0)
const loading = ref(false)

const c = computed(() => {
  const columns = [...props.columns]

  if (props.seral) {
    columns.unshift({
      title: '序号',
      width: 100,
      customRender: ({ index }) => {
        return index + 1
      }
    })
  }

  const e = props.ellipsis
    ? {
        ellipsis: {
          showTitle: true
        }
      }
    : {}
  return columns.map(item => ({
    ...e,
    ...item,
    title: item.title || item.label || item.text,
    dataIndex: item.dataIndex || item.name || item.value,
    align: props.align
  }))
})

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
  <Table
    :bordered="bordered"
    :="{ ...attrs }"
    :columns="c"
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
  />
</template>

<!-- 事件 -->
<!-- pageChange 修改分页事件 -->

<!-- 为什么 request请求不写在事件里 因为 请求异步 -->

<!-- 属性 -->
<!-- request 请求分页函数 必传 需要返回一个带有list 和 total的对象 -->
<!-- columns 列 -->
<!-- rowKey 每行数据唯一id 默认值 id -->
<!-- bordered 边框 默认值 true -->
<!-- initParams 默认的请求参数  -->
<!-- align 表格对其方式 默认是center -->
<!-- seral 序号列 -->
<!-- ellipsis 表格内容太长自动省略 默认值 true -->
