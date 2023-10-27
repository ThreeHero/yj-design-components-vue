# vue 组件库

```shell
npm i yj-design-components-vue
```

或

```shell
yarn add yj-design-components-vue
```

来安装工具库函数

- v1.0.2
  包含组件

  - App 包裹组件
  - Layout 后台布局组件
  - Button 按钮
  - Desc 描述列表
  - Table 表格
  - List 列表
  - Form 表单
  - SearchBar 搜索条
  - Modal 抽屉
  - Login 登录页

# 组件介绍

## App 包裹组件

#### 属性

- token 样式
- language 语言

## Layout 布局组件

- bgColor 侧边栏和头部的背景色
- triggerPosition 触发位置 `bottom` 默认值 `header`
- logo logo 位置 需要包含 ellipsis complete 属性
- slideMenu 侧边栏菜单配置

#### 插槽

- headerLeftContent 头部左侧部分 触发器在底部时可用
- headerRightContent 头部右侧位置
- default 内容部分

## Button

#### 事件

- click 点击按钮的事件

#### 属性

- confirm 用于配置气泡弹窗
- modal 用于配置弹窗

#### 插槽

- default 按钮内文字

## Desc 描述列表

#### 属性

- bordered 边框 默认值 `true`
- data 描述列表数据
- map 字段映射 下拉选项和函数
- titleMap 名字映射
- addOther 添加其他项的函数

## Table 表格

#### 事件

- pageChange 修改分页的事件

#### 属性

- request 请求分页函数 必传 需要返回一个带有 list 和 total 的对象
- columns 列
- rowKey 每行数据唯一值 默认值 `id`
- bordered 边框 默认值 `true`
- initParams 默认的请求参数
- align 表格对其方式 `left` `right` 默认值`center`
- seral 序号列
- ellipsis 表格内容太长自动省略 默认值 `true`

## List 列表

#### 事件

- pageChange 修改分页的事件

#### 属性

- request 请求分页函数 必传 需要返回一个带有 list 和 total 的对象
- rowKey 每行数据唯一值 默认值 `id`
- bordered 边框 默认值 `true`
- initParams 默认的请求参数

#### 插槽

- render 渲染的内容

## Form 表单

#### 属性

- items 渲染的表单项 todo 样式好像有点问题 因为 vue 的 scoped
- layout 布局方式 非必要不要传
- data 初始化数据

#### 暴露的属性 可以使用 ref 获取

- resetFields 重置数据
- validate 校验
- state 表单数据

#### 插槽

- default 剩余表单项的补充

## SearchBar 搜索条

#### 事件

- setInitParams 设置初始的搜索参数 和表格配合用于刷新

#### 属性

- items 和表单 items 一致
- searchHidden 搜索按钮隐藏
- resetHidden 重置按钮隐藏

#### 暴露的属性 可以使用 ref 获取

- search 搜索
- reset 重置

#### 插槽

- extra 更多操作的位置 用于新增按钮

## Modal 弹窗

#### 事件

- finish 完成提交时的事件

#### 属性

- isM 判断是使用 弹窗 还是 抽屉 默认 true 弹窗
- title 标题
- items 是一个对象 里面包含和 form 的 items 一致的 r 和数据 data

#### 暴露的属性 可以使用 ref 获取

- open 打开
- close 关闭

## Login 登录页

#### 事件

- login 登录

#### 属性

- background 背景色
