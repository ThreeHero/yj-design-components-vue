<script setup>
import { onMounted, reactive, useAttrs } from 'vue'
import {
  CheckboxGroup,
  DatePicker,
  Input,
  InputNumber,
  InputPassword,
  InputSearch,
  RadioGroup,
  RangePicker,
  Rate,
  Select,
  Slider,
  Textarea,
  TimePicker,
  TimeRangePicker,
  Form,
  FormItem,
  Row,
  Col,
  Space
} from 'ant-design-vue'

defineOptions({
  name: 'YJForm'
})

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  layout: String,
  data: Object
})

// todo Switch upload
const FormItemComponents = {
  input: Input,
  password: InputPassword,
  textarea: Textarea,
  search: InputSearch,
  number: InputNumber,
  select: Select,
  checkbox: CheckboxGroup,
  date: DatePicker,
  dateRange: RangePicker,
  radio: RadioGroup,
  rate: Rate,
  slider: Slider,
  time: TimePicker,
  timeRage: TimeRangePicker
}

const state = reactive(Object.fromEntries(props.items.map(item => [item.name, null])))
const rules = reactive(Object.fromEntries(props.items.map(item => [item.name, item.rules])))

const { resetFields, validate, validateInfos } = Form.useForm(state, rules)
const attrs = useAttrs()

// 数据回显
onMounted(() => {
  if (props.data) {
    Object.keys(props.data).forEach(key => {
      state[key] = props.data[key]
    })
  }
})

// 绑定ref后 ref.value.state 获取值
defineExpose({
  resetFields,
  validate,
  state
})
</script>

<template>
  <Form
    :="{ ...attrs }"
    :layout="layout"
    :style="{ display: 'block' }"
    autocomplete="off"
  >
    <Row v-if="layout === 'inline'">
      <Col :span="18">
        <Space wrap>
          <form-item
            v-for="(item, index) in items"
            :key="index"
            :="{ ...item }"
            v-bind="validateInfos[item.name]"
          >
            <component
              :is="FormItemComponents[item.element.type]"
              :="{ ...item.element }"
              v-model:value="state[item.name]"
            />
          </form-item>
        </Space>
      </Col>
      <Col
        :span="6"
        :style="{
          textAlign: 'right'
        }"
      >
        <slot></slot
      ></Col>
    </Row>

    <template v-else>
      <form-item
        v-for="(item, index) in items"
        :key="index"
        :="{ ...item }"
        v-bind="validateInfos[item.name]"
      >
        <component
          :is="FormItemComponents[item.element.type]"
          :="{ ...item.element }"
          v-model:value="state[item.name]"
        />
      </form-item>
      <slot></slot>
    </template>
  </Form>
</template>

<!-- 属性 -->
<!-- items 渲染的表单项 todo 样式好像有点问题 因为vue的scoped -->
<!-- layout 布局方式 非必要不要传 -->
<!-- data 初始化数据 -->

<!-- 暴露的属性 可以使用ref获取 -->
<!-- resetFields 重置数据 -->
<!-- validate 校验 -->
<!-- state 表单数据 -->

<!-- 插槽 -->
<!-- 剩余表单项的补充 -->

<!-- 表单项内部的插槽问题 -->
