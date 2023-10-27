<script setup>
import { computed, useAttrs } from 'vue'
import { Descriptions, DescriptionsItem } from 'ant-design-vue'

// 寻找label
const findLabelByValue = (options, value) => {
  return options.find(item => item.value === value).label
}

const ObjectIsNull = object => {
  if (object) {
    return Object.keys(object).length <= 0
  }
}

defineOptions({
  name: 'YJDesc'
})
// todo 等之后改成请求格式 先使用对象格式
const props = defineProps({
  bordered: {
    type: Boolean,
    default: true
  },
  data: {
    type: Object,
    required: true
  },
  map: Object,
  titleMap: Object,
  addOther: Function
})

const attrs = useAttrs()

const items = computed(() => {
  const { map, titleMap, data, addOther } = props || {}
  const res = Object.keys(data).map(key => {
    let children = null
    if (key in map && Array.isArray(map[key])) {
      children = findLabelByValue(map[key], data[key])
    } else if (key in map && typeof map[key] === 'function') {
      children = map[key](data[key])
    } else if (typeof data[key] === 'object') {
      children = '-'
    } else {
      children = data[key]
    }

    return {
      label: titleMap[key] || '-',
      children
    }
  })

  let other = []
  if (!ObjectIsNull(data)) {
    other = addOther(data) || []
  }
  return [...res, ...other]
})
</script>

<template>
  <Descriptions
    :bordered="bordered"
    :="{ ...attrs }"
  >
    <DescriptionsItem
      v-for="(item, index) in items"
      :key="index"
      :label="item.label"
    >
      {{ item.children }}
    </DescriptionsItem>
  </Descriptions>
</template>
