<script setup>
import { ref } from 'vue'
import YJForm from '../YJForm'
import { Button } from 'ant-design-vue'

defineOptions({
  name: 'YJLogin'
})

const props = defineProps({
  background: {
    type: String,
    default: 'linear-gradient(to right, #c6ffdd, #fbd786, #f7797d)'
  }
})

const emits = defineEmits(['login'])

const login = async () => {
  try {
    const values = await formRef.value.validate()
    const { username, password } = values
    emits('login', { username, password })
  } catch (e) {
    console.error(e)
  }
}

const formRef = ref()

const items = [
  {
    name: 'username',
    rules: [{ required: true, message: '用户名不能为空' }],
    class: 'login-form-item',
    element: {
      type: 'input',
      class: 'login-ipt',
      onPressEnter: login,
      placeholder: '请输入用户名',
      bordered: false
    }
  },
  {
    name: 'password',
    rules: [{ required: true, message: '密码不能为空' }],
    class: 'login-form-item',
    element: {
      type: 'password',
      class: 'login-ipt',
      placeholder: '请输入密码',
      bordered: false,
      onPressEnter: login
    }
  }
]
</script>

<template>
  <div
    class="yj-login-page"
    :style="{ background }"
  >
    <div class="yj-login-box">
      <YJForm
        class="yj-login-form"
        :items="items"
        ref="formRef"
      >
        <Button
          class="login-btn"
          @click="login"
        >
          登录
        </Button>
      </YJForm>
    </div>
  </div>
</template>

<style lang="less">
.yj-login-page {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  position: relative;

  .ant-form-item-explain-error {
    margin-top: 5px;
    margin-left: 1px;
    font-size: 12px;
    letter-spacing: 2px;
    user-select: none;
  }

  .yj-login-box {
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
    border-radius: 20px;
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;

    .yj-login-form {
      margin-top: 60px;
      padding: 0 50px;
      width: 100%;

      .login-form-item {
        padding-bottom: 5px;
        border-bottom: 1px solid rgb(146, 143, 143);

        .login-ipt {
          margin-top: 30px;

          .ant-input {
            letter-spacing: 2px;
          }

          .login-icon {
            color: #919396;
          }
        }
      }

      /* 登录按钮 */
      .login-btn {
        width: 100%;
        height: 44px;
        margin-top: 40px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 2.5px;
        font-weight: 500;
        color: #000;
        background-color: #fff;
        border: none;
        border-radius: 45px;
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
      }

      .login-btn:hover {
        background-color: #0aa;
        box-shadow: 0px 15px 20px rgba(51, 76, 98, 0.4);
        color: #fff;
        transform: translateY(-7px);
      }

      .login-btn:active {
        transform: translateY(-1px);
      }
    }
  }
}
</style>

<!-- 事件 -->
<!-- login 登陆事件 -->

<!-- 属性 -->
<!-- background 背景色 -->
